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

import { app, ipcMain } from "electron";
import fs from "fs";
import path from "path";

const backupDir = (deviceInfo) => {
  return path.join(
    app.getPath("userData"),
    "eeprom-backup",
    deviceInfo.vendor,
    deviceInfo.product
  );
};

export const registerBackupHandlers = () => {
  ipcMain.on("backups.list-library", async (event, deviceInfo) => {
    try {
      fs.accessSync(backupDir(deviceInfo));
    } catch (_) {
      event.returnValue = [];
      return;
    }

    const library = fs
      .readdirSync(backupDir(deviceInfo), { encoding: "utf-8" })
      .filter((name) => name.match(/^[0-9]+\.json$/))
      .map((name) => path.basename(name, ".json"))
      .sort((a, b) => {
        if (a > b) return -1;
        if (a < b) return 1;
        return 0;
      });

    event.returnValue = library;
  });

  ipcMain.on("backups.load-file", async (event, deviceInfo, stamp) => {
    const fileName = path.join(
      backupDir(deviceInfo),
      stamp.toString() + ".json"
    );

    let data;
    try {
      data = fs.readFileSync(fileName);
    } catch (e) {
      event.returnValue = [null, e];
      return;
    }

    event.returnValue = [data];
  });

  ipcMain.on("backups.save-file", async (event, deviceInfo, stamp, data) => {
    const fileName = path.join(
      backupDir(deviceInfo),
      stamp.toString() + ".json"
    );

    try {
      fs.mkdirSync(backupDir(deviceInfo), { recursive: true });
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
