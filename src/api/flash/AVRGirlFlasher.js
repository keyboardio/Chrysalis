/* chrysalis-flash -- Keyboard flash helpers for Chrysalis
 * Copyright (C) 2018-2022  Keyboardio, Inc.
 *
 * This program is free software: you can redistribute it and/or modify it under
 * the terms of the GNU General Public License as published by the Free Software
 * Foundation, version 3.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

import { logger } from "@api/log";
import { getStaticPath } from "@renderer/config";
import AvrGirl from "avrgirl-arduino";
import path from "path";
import { spawn } from "child_process";

import { FocusCommands } from "./FocusCommands";
import { delay, toStep } from "./utils";

const AvrDudeBootloader = async (_, port, filename, options) => {
  const callback = options
    ? options.callback
    : function () {
        return;
      };
  const device = options.device;
  const timeout = 1000 * 60 * 5;
  const focusCommands = new FocusCommands(options);

  const runCommand = async (args) => {
    await toStep(callback)("flash");
    return new Promise((resolve, reject) => {
      const avrdude = path.join(
        getStaticPath(),
        "avrdude",
        process.platform,
        "avrdude"
      );
      logger("flash").debug("running avrdude", { args: args });
      const child = spawn(avrdude, args);
      child.stdout.on("data", (data) => {
        logger("flash").debug("avrdude:stdout:", { data: data.toString() });
      });
      child.stderr.on("data", (data) => {
        logger("flash").debug("avrdude:stderr:", { data: data.toString() });
      });
      const timer = setTimeout(() => {
        child.kill();
        logger("flash").debug("avrdude timed out");
        reject("avrdude timed out");
      }, timeout);
      child.on("exit", (code) => {
        clearTimeout(timer);
        if (code == 0) {
          logger("flash").debug("avrdude done");
          resolve();
        } else {
          logger("flash").error("avrdude exited abnormally", {
            errorCode: code,
          });
          reject("avrdude exited abnormally");
        }
      });
    });
  };

  try {
    await port.close();
  } catch (_) {
    /* ignore the error */
  }
  await delay(1000);

  const configFile = path.join(getStaticPath(), "avrdude", "avrdude.conf");
  await runCommand([
    "-C",
    configFile,
    "-v",
    "-v",
    "-patmega32u4",
    "-cavr109",
    "-D",
    "-P",
    port.path,
    "-b57600",
    "-Uflash:w:" + filename + ":i",
  ]);
};

export const Avr109Bootloader = async (board, port, filename, options) => {
  // We do not check if the external flasher exists here. The caller is
  // responsible for doing that.
  const preferExternalFlasher = options && options.preferExternalFlasher;
  if (preferExternalFlasher) {
    return AvrDudeBootloader(board, port, filename, options);
  }

  const avrgirl = new AvrGirl({
    board: board,
    debug: true,
    manualReset: true,
  });

  const callback = options
    ? options.callback
    : function () {
        return;
      };

  await toStep(callback)("flash");
  return new Promise((resolve, reject) => {
    try {
      if (port.isOpen) {
        port.close();
      }
      avrgirl.flash(filename, async (error) => {
        if (error) {
          logger("flash").error("Error during flash", { error: error });
          if (avrgirl.connection.serialPort.isOpen) {
            try {
              avrgirl.connection.serialPort.close();
            } catch (_) {
              /* ignore the error */
            }
          }
          reject(error);
        } else {
          logger("flash").debug("flashing done");
          resolve();
        }
      });
    } catch (e) {
      logger("flash").error("Error during flash", { error: e });
      reject(e);
    }
  });
};

export const Avr109 = async (board, port, filename, options) => {
  const callback = options
    ? options.callback
    : function () {
        return;
      };
  const device = options.device;
  const focusCommands = new FocusCommands(options);

  let saveKey;
  if (!options.factoryReset) {
    await toStep(callback)("saveEEPROM");
    saveKey = await focusCommands.saveEEPROM();

    await toStep(callback)("bootloaderTrigger");
    await focusCommands.reboot();
  } else {
    await toStep(callback)("factoryRestore");
    try {
      await focusCommands.eraseEEPROM();
    } catch (e) {
      if (e != "Communication timeout") {
        throw new Error(e);
      }
    }

    // We do not need to trigger the bootloader here, the erase above did a
    // reset for us already. Do wait a little, for a smoother transition.
    await toStep(callback)("bootloaderTrigger");
    await delay(500);
  }

  await toStep(callback)("bootloaderWait");
  const bootloaderFound = await options.focus.waitForBootloader(options.device);
  if (!bootloaderFound) {
    logger("flash").error("bootloader not found");
    throw new Error("Bootloader not found");
  }

  await Avr109Bootloader(board, bootloaderFound, filename, options);

  if (!options.factoryReset) {
    await toStep(callback)("reconnect");
    await options.focus.reconnectToKeyboard(options.device);

    await toStep(callback)("restoreEEPROM");
    await focusCommands.restoreEEPROM(saveKey);
  }
};
