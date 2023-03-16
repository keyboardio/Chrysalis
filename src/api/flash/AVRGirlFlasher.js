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
import AvrGirl from "avrgirl-arduino";
const { SerialPort } = eval(`require("serialport")`);

import { reportUpdateStatus } from "./utils";

const rebootToApplicationMode = async (port, _) => {
  logger("flash").debug("rebooting to application mode");

  // To reboot a device using the AVR109 protocol from bootloader to application
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
    logger("flash").error("error while trying to reboot to application mode", {
      path: port.path,
      error: e,
    });
  }
};

const flash = async (board, port, filename, options) => {
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

  await reportUpdateStatus(callback)("flash");
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

export const AVRGirlFlasher = { flash, rebootToApplicationMode };
