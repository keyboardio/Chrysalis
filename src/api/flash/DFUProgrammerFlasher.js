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

const rebootToNormal = async (port, _) => {
  logger("flash").debug("rebooting to normal mode");
  await runDFUProgrammer(["atmega32u4", "start"]);
};

const runDFUProgrammer = async (args) => {
  const maxFlashingTime = 1000 * 60 * 5;
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
    }, maxFlashingTime);
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

const flash = async (board, port, filename, options) => {
  const callback = options
    ? options.callback
    : function () {
        return;
      };
  const mcu = options.mcu || "atmega32u4";

  await toStep(callback)("flash");
  for (let i = 0; i < 10; i++) {
    try {
      await runDFUProgrammer([mcu, "erase"]);
    } catch (_) {
      await delay(1000);
      continue;
    }
    break;
  }
  await runDFUProgrammer([mcu, "flash", filename]);
  await runDFUProgrammer([mcu, "start"]);
};

export const DFUProgrammerFlasher = { rebootToNormal, flash };
