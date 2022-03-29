// -*- mode: js-jsx -*-
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

import { Environment } from "./dragons";

// This is a workaround for electron-webpack#275[1]. We need to use backticks
// for NODE_ENV, otherwise the code would fail to compile with webpack. We also
// grab the correct value of NODE_ENV from a separate module, to avoid webpack
// optimizing things out.
//
// [1]: https://github.com/electron-userland/electron-webpack/issues/275
process.env[`NODE_ENV`] = Environment.name;

import { app, BrowserWindow, Menu, ipcMain, dialog } from "electron";
import { format as formatUrl } from "url";
import * as path from "path";
import fs from "fs";
import windowStateKeeper from "electron-window-state";
import installExtension, {
  REACT_DEVELOPER_TOOLS,
} from "electron-devtools-installer";
import { getStaticPath } from "../renderer/config";
import { initialize, enable as enableRemote } from "@electron/remote/main";
initialize();

// Settings storage
const Store = require("electron-store");
Store.initRenderer();

// USB support
import { findByIds, getDeviceList, usb } from "usb";

const isDevelopment = process.env.NODE_ENV !== "production";

let mainWindow;

async function createMainWindow() {
  let mainWindowState = windowStateKeeper({
    defaultWidth: 1200,
    defaultHeight: 900,
  });

  const window = new BrowserWindow({
    x: mainWindowState.x,
    y: mainWindowState.y,
    width: mainWindowState.width,
    height: mainWindowState.height,
    resizable: true,
    icon: path.join(getStaticPath(), "/logo.png"),
    webPreferences: {
      sandbox: false,
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true,
    },
  });
  enableRemote(window.webContents);
  mainWindowState.manage(window);

  if (isDevelopment) {
    window.loadURL(`http://localhost:${process.env.ELECTRON_WEBPACK_WDS_PORT}`);
  } else {
    window.loadURL(
      formatUrl({
        pathname: path.join(__dirname, "index.html"),
        protocol: "file",
        slashes: true,
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

  let handleRedirect = (e, url) => {
    if (url != window.webContents.getURL()) {
      e.preventDefault();
      require("electron").shell.openExternal(url);
    }
  };

  window.webContents.on("will-navigate", handleRedirect);
  window.webContents.on("new-window", handleRedirect);

  window.webContents.on("devtools-opened", () => {
    window.webContents.send("devtools-opened");
  });

  window.webContents.on("devtools-closed", () => {
    window.webContents.send("devtools-closed");
  });

  return window;
}

ipcMain.on("app-exit", (event, arg) => {
  app.quit();
});

ipcMain.on("show-devtools", (event, boolFocus) => {
  const webContents = event.sender;
  if (boolFocus) {
    webContents.openDevTools();
  } else {
    webContents.closeDevTools();
  }
});

ipcMain.handle("devtools-is-open", (event) => {
  const webContents = event.sender;
  return webContents.isDevToolsOpened();
});

ipcMain.handle("usb-scan-for-devices", (event) => {
  const webContents = event.sender;
  const devices = getDeviceList();
  return devices;
});

ipcMain.handle("usb-is-device-connected", (event, vid, pid) => {
  const device = findByIds(vid, pid);
  if (device) {
    return true;
  } else {
    return false;
  }
});

// This is a workaround for the lack of context-awareness in two native modules
// we use, serialport (serialport/node-serialport#2051) and usb
// (tessel/node-usb#380). See electron/electron#18397 for more context.
app.allowRendererProcessReuse = false;

/**
 *
 * Allow remote debugging & set debug parameters on child renderer process.
 * @see: https://github.com/electron-userland/electron-webpack/issues/76#issuecomment-392201080
 *
 * 1. Define an explicit debugger port
 * 2. Create a new Chrome user so that we don't conflict with browser
 *    sessions. (@see: https://github.com/microsoft/vscode-chrome-debug#chrome-user-profile-note-cannot-connect-to-the-target-connect-econnrefused)
 */
if (isDevelopment && process.env.ELECTRON_WEBPACK_APP_DEBUG_PORT) {
  app.commandLine.appendSwitch(
    "remote-debugging-port",
    process.env.ELECTRON_WEBPACK_APP_DEBUG_PORT
  ); /* 1 */
  app.commandLine.appendSwitch("userDataDir", true); /* 2 */
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
app.on("ready", async () => {
  if (isDevelopment) {
    await installExtension(REACT_DEVELOPER_TOOLS)
      .then((name) => console.log(`Added Extension:  ${name}`))
      .catch((err) => console.log("An error occurred: ", err));
  }

  Menu.setApplicationMenu(null);
  mainWindow = createMainWindow();
});

app.on("web-contents-created", (_, wc) => {
  wc.on("before-input-event", (_, input) => {
    if (input.type == "keyDown" && input.control) {
      if (input.shift && input.code == "KeyI") {
        wc.openDevTools();
      }
      if (input.code == "KeyR") {
        wc.reload();
      }
      if (input.code == "KeyQ") {
        app.quit();
      }
    }
  });
});

// Focus
import Focus from "../api/focus";
import Hardware from "../api/hardware";
const focus = new Focus();
ipcMain.handle("focus-find-serial-devices", (event) => {
  return focus.find(Hardware.serial);
});

usb.on("detach", (device) => {
  BrowserWindow.getFocusedWindow().send("usb-disconnected", device);
});

usb.on("attach", (device) => {
  BrowserWindow.getFocusedWindow().send("usb-connected", device);
});

ipcMain.on("file-save", (event, data) => {
  let options = {
    title: data.title,
    defaultPath: data.defaultPath,
    filters: data.filters,
  };
  dialog.showSaveDialog(options).then((filename) => {
    const { canceled, filePath } = filename;
    if (!canceled) {
      fs.writeFileSync(filePath, data.content, (err) => {
        if (err) {
          console.log(err);
        }
      });
    }
  });
});
