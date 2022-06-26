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
import { spawn } from "child_process";
import path from "path";

import { FocusCommands } from "./FocusCommands";
import { delay, toStep } from "./utils";

export const DFUProgrammer = async (board, port, filename, options) => {
  const callback = options
    ? options.callback
    : function () {
        return;
      };
  const mcu = options.mcu || "atmega32u4";
  const timeout = options.timeout || 10000;
  const device = options.device;
  const focusCommands = new FocusCommands(options);

  const runCommand = async (args) => {
    return new Promise((resolve, reject) => {
      logger("flash").debug("Running dfu-programmer", { args: args });
      const child = spawn("dfu-programmer", args);
      child.stdout.on("data", (data) => {
        logger("flash").debug("dfu-programmer:stdout:", {
          data: data.toString(),
        });
      });
      child.stderr.on("data", (data) => {
        logger("flash").debug("dfu-programmer:stderr:", {
          data: data.toString(),
        });
      });
      const timer = setTimeout(() => {
        child.kill();
        logger("flash").error("dfu-programmer timed out");
        reject("dfu-programmer timed out");
      }, timeout);
      child.on("exit", (code) => {
        clearTimeout(timer);
        if (code == 0) {
          logger("flash").debug("dfu-programmer done");
          resolve();
        } else {
          logger("flash").error("dfu-programmer exited abnormally", {
            errorCode: code,
          });
          reject("dfu-programmer exited abnormally");
        }
      });
    });
  };

  let saveKey;
  if (!options.factoryReset) {
    await toStep(callback)("saveEEPROM");
    saveKey = await focusCommands.saveEEPROM();
  } else {
    await toStep(callback)("factoryRestore");
    try {
      await focusCommands.eraseEEPROM();
    } catch (e) {
      if (e != "Communication timeout") {
        throw new Error(e);
      }
    }
    // Because the factory restore above rebooted the keyboard, wait a little
    // here before starting to flash.
    await delay(1000);
  }

  await toStep(callback)("flash");
  for (let i = 0; i < 10; i++) {
    try {
      await runCommand([mcu, "erase"]);
    } catch (_) {
      await delay(1000);
      continue;
    }
    break;
  }
  await runCommand([mcu, "flash", filename]);
  await runCommand([mcu, "start"]);

  if (!options.factoryReset) {
    await toStep(callback)("reconnect");
    await options.focus.reconnectToKeyboard(device);

    await toStep(callback)("restoreEEPROM");
    await focusCommands.restoreEEPROM(saveKey);
  }
};
