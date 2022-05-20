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

import { ipcMain, app } from "electron";
import fs from "fs";
import path from "path";

export const registerBackupHandlers = () => {
  ipcMain.on("backups.list-library", async (event) => {
    const dirName = path.join(app.getPath("userData"), "eeprom-backup");
    const library = fs
      .readdirSync(dirName, { encoding: "utf-8" })
      .map((name) => path.basename(name, ".json"))
      .sort((a, b) => {
        if (a > b) return -1;
        if (a < b) return 1;
        return 0;
      });

    event.returnValue = library;
  });

  ipcMain.on("backups.load-backup", async (event, stamp) => {
    const dirName = path.join(app.getPath("userData"), "eeprom-backup");
    const fileName = path.join(dirName, stamp.toString() + ".json");

    let data;
    try {
      data = fs.readFileSync(fileName);
    } catch (e) {
      event.returnValue = [null, e];
      return;
    }

    event.returnValue = [data];
  });

  ipcMain.on("eeprom-backup", async (event, stamp, data) => {
    const dirName = path.join(app.getPath("userData"), "eeprom-backup");
    const fileName = path.join(dirName, stamp.toString() + ".json");

    try {
      fs.mkdirSync(dirName, { recursive: true });
    } catch (e) {
      event.returnValue = [null, e];
      return;
    }

    try {
      fs.writeFileSync(fileName, data);
    } catch (e) {
      event.returnValue = [null, e];
      return;
    }
    event.returnValue = [fileName];
  });
};
