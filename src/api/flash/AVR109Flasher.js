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

import { parseIntelHex } from "./IntelHexParser";
import { flashDevice, rebootToApplicationMode } from "./flashDevice";

const oldflash = async (board, port, filename, options) => {
  const callback = options
    ? options.callback
    : function () {
        return;
      };

  /*
  return new Promise((resolve, reject) => {
    try {
      if (port.isOpen) {
        port.close();
      }
      avrgirl.flash(filename, async (error) => {
        if (error) {
          console.error("Error during flash", { error: error });
          if (avrgirl.connection.serialPort.isOpen) {
            try {
              avrgirl.connection.serialPort.close();
            } catch (_) {
              // ignore the error
            }
          }
          reject(error);
        } else {
          console.debug("flashing done");
          resolve();
        }
      });
    } catch (e) {
      console.error("Error during flash", { error: e });
      reject(e);
    }
  });
*/
};

const flash = async (port, filecontents, options) => {
  return new Promise((resolve, reject) => {
    try {
      //parse intel hex
      const flashData = parseIntelHex(filecontents);

      //open & close
      // Wait for the serial port to open.
      port.open({ baudRate: 57600 });

      //open writing facilities
      const writer = port.writable.getWriter();
      //open reading stream
      const reader = port.readable.getReader();
      flashDevice(writer, reader, flashData);
    } catch (e) {
      console.error("Error during flash", { error: e });
      reject(e);
    } finally {
      port.close();
    }
  });
};

export const AVR109Flasher = { flash, rebootToApplicationMode };
