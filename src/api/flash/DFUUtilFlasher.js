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

const runDFUUtil = async (args) => {
  const dfuUtil = path.join(
    getStaticPath(),
    "dfu-util",
    `${process.platform}-${process.arch}`,
    "dfu-util"
  );

  const maxFlashingTime = 1000 * 60 * 5;

  return new Promise((resolve, reject) => {
    logger("flash").debug("running dfu-util", { dfuUtil, args });
    const child = spawn(dfuUtil, args);
    const timer = setTimeout(() => {
      child.kill();
      logger("flash").error("dfu-util timed out");
      reject("dfu-util timed out");
    }, maxFlashingTime);
    child.on("error", (err) => {
      clearTimeout(timer);
      logger("flash").error("error starting dfu-util", { err: err.toString() });
      reject("error starting dfu-util");
    });
    child.stdout.on("data", (data) => {
      logger("flash").debug("dfu-util:stdout:", { data: data.toString() });
    });
    child.stderr.on("data", (data) => {
      logger("flash").debug("dfu-util:stderr:", { data: data.toString() });
    });
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

const formatDeviceUSBId = (desc) => {
  return desc.vendorId.toString(16) + ":" + desc.productId.toString(16);
};

const rebootToNormal = async (port, device) => {
  logger("flash").debug("rebooting to normal mode");
  await runDFUUtil([
    "--device",
    formatDeviceUSBId(device.usb) +
      "," +
      formatDeviceUSBId(device.usb.bootloader),
    "--reset",
    "--detach",
  ]);
};

const flash = async (board, port, filename, options) => {
  const callback = options
    ? options.callback
    : function () {
        return;
      };
  const device = options.device;

  await toStep(callback)("flash");
  await runDFUUtil([
    "--device",
    formatDeviceUSBId(device.usb) +
      "," +
      formatDeviceUSBId(device.usb.bootloader),
    "--alt",
    "0",
    "--intf",
    "0",
    "--reset",
    "--download",
    filename,
  ]);
};

export const DFUUtilFlasher = { rebootToNormal, flash };
