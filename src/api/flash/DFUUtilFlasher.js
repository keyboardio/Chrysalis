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

import { delay, toStep } from "./utils";

export const DFUUtilFlasher = async (board, port, filename, options) => {
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
