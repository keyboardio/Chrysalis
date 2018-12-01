// -*- mode: js-jsx -*-
/* chrysalis-bundle-keyboardio -- Chrysalis Bundle for Keyboard.io
 * Copyright (C) 2018  Keyboardio, Inc.
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

import { app, BrowserWindow, Menu } from "electron";
import { format as formatUrl } from "url";
import * as path from "path";

const isDevelopment = process.env.NODE_ENV !== "production";

let mainWindow;

function createMainWindow() {
  const window = new BrowserWindow({
    minHeight: 800,
    minWidth: 1400,
    resizable: true
  });

  if (isDevelopment) {
    window.webContents.openDevTools();
  }

  if (isDevelopment) {
    window.loadURL(`http://localhost:${process.env.ELECTRON_WEBPACK_WDS_PORT}`);
  } else {
    window.loadURL(
      formatUrl({
        pathname: path.join(__dirname, "index.html"),
        protocol: "file",
        slashes: true
      })
    );
  }

  window.on("closed", () => {
    mainWindow = null;
  });

  window.webContents.on("devtools-opened", () => {
    window.focus();
    setImmediate(() => {
      window.focus();
    });
  });

  Menu.setApplicationMenu(null);

  return window;
}

// quit application when all windows are closed
app.on("window-all-closed", () => {
  // on macOS it is common for applications to stay open until the user explicitly quits
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  // on macOS it is common to re-create a window even after all windows have been closed
  if (mainWindow === null) {
    mainWindow = createMainWindow();
  }
});

// create main BrowserWindow when electron is ready
app.on("ready", () => {
  mainWindow = createMainWindow();
});
