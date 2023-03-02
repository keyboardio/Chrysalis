/* Chrysalis -- Kaleidoscope Command Center
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

import { ipcMain } from "electron";
import si from "systeminformation";
import { v4 as uuidv4 } from "uuid";
import pkg from "../../package.json";
const version = pkg.version;

export const registerSystemInfoHandlers = () => {
  ipcMain.on("system-info.get", async (event) => {
    let sysInfo;

    try {
      sysInfo = {
        timestamp: new Date(),
        uuid: uuidv4(),
        chrysalis: {
          version: version,
        },
        os: await si.osInfo(),
        usb: await si.usb(),
      };
    } catch (_) {
      console.log("Error getting system info", _);
      event.returnValue = [];
      return;
    }

    event.returnValue = sysInfo;
    return;
  });
};
