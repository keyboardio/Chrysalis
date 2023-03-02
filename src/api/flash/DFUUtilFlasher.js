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
import { getFilesystemPathForStaticAsset } from "@renderer/config";
import { spawn } from "child_process";
import path from "path";

import { reportUpdateStatus } from "./utils";

const runDFUError = {
  SOFT_FAIL: 1,
  HARD_FAIL: 2,
};

const runDFUUtil = async (args) => {
  const dfuUtil = getFilesystemPathForStaticAsset(
    path.join("dfu-util", `${process.platform}-${process.arch}`, "dfu-util")
  );

  const maxFlashingTime = 1000 * 60 * 5;

  return new Promise((resolve, reject) => {
    logger("flash").debug("running dfu-util", { dfuUtil, args });
    const child = spawn(dfuUtil, args);
    const timer = setTimeout(() => {
      child.kill();
      logger("flash").error("dfu-util timed out");
      reject(runDFUError.HARD_FAIL);
    }, maxFlashingTime);
    child.on("error", (err) => {
      clearTimeout(timer);
      logger("flash").error("error starting dfu-util", { err: err.toString() });
      reject(runDFUError.HARD_FAIL);
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
      } else if (code == 74) {
        logger("flash").error("dfu-util exited abnormally", {
          exitCode: code,
        });
        reject(runDFUError.SOFT_FAIL);
      } else {
        logger("flash").error("dfu-util exited abnormally", {
          exitCode: code,
        });
        reject(runDFUError.HARD_FAIL);
      }
    });
  });
};

const formatDeviceUSBId = (desc) => {
  return desc.vendorId.toString(16) + ":" + desc.productId.toString(16);
};

const rebootToApplicationMode = async (port, device) => {
  logger("flash").debug("rebooting to application mode");
  try {
    await runDFUUtil([
      "--device",
      formatDeviceUSBId(device.usb) +
        "," +
        formatDeviceUSBId(device.usb.bootloader),
      "--detach",
    ]);
  } catch (e) {
    if (e == runDFUError.HARD_FAIL) {
      throw e;
    }
  }
};

const flash = async (board, port, filename, options) => {
  const callback = options
    ? options.callback
    : function () {
        return;
      };
  const device = options.device;

  await reportUpdateStatus(callback)("flash");
  await runDFUUtil([
    "--device",
    formatDeviceUSBId(device.usb) +
      "," +
      formatDeviceUSBId(device.usb.bootloader),
    "--alt",
    "0",
    "--intf",
    "0",
    "--download",
    filename,
  ]);
};

export const DFUUtilFlasher = { rebootToApplicationMode, flash };
