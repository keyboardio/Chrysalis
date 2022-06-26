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

export const DFUUtilBootloader = async (port, filename, options) => {
  const callback = options
    ? options.callback
    : function () {
        return;
      };
  const device = options.device;

  const formatID = (desc) => {
    return desc.vendorId.toString(16) + ":" + desc.productId.toString(16);
  };

  const dfuUtil = path.join(
    getStaticPath(),
    "dfu-util",
    `${process.platform}-${process.arch}`,
    "dfu-util"
  );

  let dyld_library_path = "";
  // dfu-util on darwin needs to know where its custom libusb is
  if (process.platform === "darwin") {
    dyld_library_path = path.join(
      getStaticPath(),
      "dfu-util",
      process.platform
    );
  }

  const runCommand = async (args) => {
    const timeout = 1000 * 60 * 5;
    return new Promise((resolve, reject) => {
      logger("flash").debug("running dfu-util", { args: args });
      const child = spawn(dfuUtil, args, {
        env: { ...process.env, DYLD_LIBRARY_PATH: dyld_library_path },
      });
      child.stdout.on("data", (data) => {
        logger("flash").debug("dfu-util:stdout:", { data: data.toString() });
      });
      child.stderr.on("data", (data) => {
        logger("flash").debug("dfu-util:stderr:", { data: data.toString() });
      });
      const timer = setTimeout(() => {
        child.kill();
        logger("flash").error("dfu-util timed out");
        reject("dfu-util timed out");
      }, timeout);
      child.on("exit", (code) => {
        clearTimeout(timer);
        if (code == 0 || code == 251) {
          logger("flash").debug("dfu-util done");
          resolve();
        } else {
          logger("flash").error("dfu-util exited abnormally", {
            exitCode: code,
          });
          reject("dfu-util exited abnormally with an error code of " + code);
        }
      });
    });
  };

  await toStep(callback)("flash");
  await runCommand([
    "--device",
    formatID(device.usb) + "," + formatID(device.usb.bootloader),
    "--alt",
    "0",
    "--intf",
    "0",
    "--reset",
    "--download",
    filename,
  ]);
};

export const DFUUtil = async (port, filename, options) => {
  const focusCommands = new FocusCommands(options);
  const device = options.device;
  const callback = options
    ? options.callback
    : function () {
        return;
      };

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
  if (port.isOpen) {
    try {
      await port.close();
    } catch (_) {
      /* ignore the error */
    }
  }

  await delay(1000);

  await DFUUtilBootloader(port, filename, options);

  if (!options.factoryReset) {
    await toStep(callback)("reconnect");
    await options.focus.reconnectToKeyboard(device);

    await toStep(callback)("restoreEEPROM");
    await focusCommands.restoreEEPROM(saveKey);
  }
};
