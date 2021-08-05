/* chrysalis-flash -- Keyboard flash helpers for Chrysalis
 * Copyright (C) 2022  Keyboardio, Inc.
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
import { insideFlatpak } from "@renderer/utils/flatpak";
import { spawn } from "child_process";
const { SerialPort } = require("serialport");

import { reportUpdateStatus } from "./utils";

const runAVRDude = async (args) => {
  let avrdude;
  if (insideFlatpak()) {
    avrdude = "/app/bin/avrdude";
  } else {
    avrdude = "avrdude";
  }

  const maxFlashingTime = 1000 * 60 * 5;

  return new Promise((resolve, reject) => {
    logger("flash").debug("running avrdude", { avrdude, args });
    const child = spawn(avrdude, args);
    const timer = setTimeout(() => {
      child.kill();
      logger("flash").error("avrdude timed out");
      reject("avrdude timed out");
    }, maxFlashingTime);
    child.on("error", (err) => {
      clearTimeout(timer);
      logger("flash").error("error starting avrdude", { err: err.toString() });
      reject("error starting avrdude");
    });
    child.stdout.on("data", (data) => {
      logger("flash").debug("avrdude:stdout:", { data: data.toString() });
    });
    child.stderr.on("data", (data) => {
      logger("flash").debug("avrdude:stderr:", { data: data.toString() });
    });
    child.on("exit", (code) => {
      clearTimeout(timer);
      if (code == 0 || code == 251) {
        logger("flash").debug("avrdude done");
        resolve();
      } else {
        logger("flash").error("avrdude exited abnormally", {
          exitCode: code,
        });
        reject("avrdude exited abnormally with an error code of " + code);
      }
    });
  });
};

const rebootToNormal = async (port, _) => {
  logger("flash").debug("rebooting to normal mode");

  // To reboot a device using the AVR109 protocol from bootloader to normal
  // mode, we simply have to exit the bootloader. To do so, we need to connect
  // to the port, and send `E`, the command for "Exit bootloader".
  //
  // Reference: https://ww1.microchip.com/downloads/en/AppNotes/doc1644.pdf, page 9

  try {
    const serial = new SerialPort({
      path: port.path,
      baudRate: 9600,
    });
    serial.write("E");
  } catch (e) {
    logger("flash").error("error while trying to reboot to normal mode", {
      path: port.path,
      error: e,
    });
  }
};

const flash = async (board, port, filename, options) => {
  const callback = options
    ? options.callback
    : function () {
        return;
      };

  await reportUpdateStatus(callback)("flash");
  await runAVRDude([
    "-p",
    "m32u4",
    "-b",
    57600,
    "-c",
    board.protocol,
    "-D",
    "-P",
    port.path,
    "-U",
    "flash:w:" + filename + ":i",
    "-v",
  ]);
};

export const AVRDudeFlasher = { rebootToNormal, flash };
