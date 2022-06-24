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

import { dialog, ipcMain } from "electron";
import fs from "fs";

export const registerFileIoHandlers = () => {
  ipcMain.on("file.read", (event, fileName) => {
    let fileData, error;
    try {
      fileData = fs.readFileSync(fileName).toString();
    } catch (e) {
      fileData = null;
      error = e;
    }
    event.returnValue = [fileData, error];
  });

  ipcMain.on("file.save-with-dialog", (event, data) => {
    const options = {
      title: data.title,
      defaultPath: data.defaultPath,
      filters: data.filters,
    };
    dialog.showSaveDialog(options).then((filename) => {
      const { canceled, filePath } = filename;
      if (!canceled) {
        try {
          fs.writeFileSync(filePath, data.content);
        } catch (err) {
          event.returnValue = err;
        }
      }
      event.returnValue = null;
    });
  });

  ipcMain.on("file.open-with-dialog", (event, data) => {
    const options = {
      title: data.title,
      filters: data.filters,
    };
    dialog.showOpenDialog(options).then((result) => {
      const { canceled, filePaths } = result;
      if (!canceled) {
        let fileData;
        let error;
        try {
          fileData = fs.readFileSync(filePaths[0]);
        } catch (e) {
          fileData = null;
          error = e;
        }
        event.returnValue = [filePaths[0], fileData, error];
      } else {
        event.returnValue = [null, null, null];
      }
    });
  });
};
