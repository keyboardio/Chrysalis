/* Chrysalis -- Kaleidoscope Command Center
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

import { app, ipcMain } from "electron";
import { autoUpdater, CancellationToken } from "electron-updater";
import { sendToRenderer } from "./utils";
import pkg from "../../package.json";

const version = pkg.version;

export const registerAutoUpdaterHandlers = () => {
  autoUpdater.on("update-available", (info) => {
    sendToRenderer("auto-update.update-available", info);
  });
  autoUpdater.on("error", (err) => {
    sendToRenderer("auto-update.error", err);
  });
  autoUpdater.on("update-downloaded", (info) => {
    sendToRenderer("auto-update.update-downloaded", info);
  });

  ipcMain.handle("auto-update.check-for-updates", async (sender, mode) => {
    autoUpdater.autoDownload = mode == "automatic";

    // If we're a snapshot version, set up the autoUpdater accordingly.
    if (version.match(/-snapshot/)) {
      autoUpdater.allowPrerelease = true;
      autoUpdater.channel = "snapshot";
    }

    await autoUpdater.checkForUpdates();
  });

  ipcMain.on("app.restart", () => {
    autoUpdater.quitAndInstall(true, true);
  });
};
