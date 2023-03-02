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

import { getStaticPath } from "@renderer/config";
import { app, BrowserWindow, ipcMain } from "electron";
import installExtension from "electron-devtools-installer"; //  REACT_DEVELOPER_TOOLS,
import windowStateKeeper from "electron-window-state";
import * as path from "path";
import { format as formatUrl } from "url";
import { Environment } from "./dragons";
import { registerAutoUpdaterHandlers } from "./ipc_autoupdate";
import { registerBackupHandlers } from "./ipc_backups";
import {
  addUsbEventListeners,
  registerDeviceDiscoveryHandlers,
} from "./ipc_device_discovery";
import { registerDevtoolsHandlers } from "./ipc_devtools";
import { registerExitHandlers } from "./ipc_exit";
import { registerFileIoHandlers } from "./ipc_file_io";
import { registerFirmwareHandlers } from "./ipc_firmware";
import { registerLoggingHandlers } from "./ipc_logging";
import { registerNativeThemeHandlers } from "./ipc_nativetheme";
import { registerSystemInfoHandlers } from "./ipc_system_info";
import { buildMenu } from "./menu";

// This is a workaround for electron-webpack#275[1]. We need to use backticks
// for NODE_ENV, otherwise the code would fail to compile with webpack. We also
// grab the correct value of NODE_ENV from a separate module, to avoid webpack
// optimizing things out.
//
// [1]: https://github.com/electron-userland/electron-webpack/issues/275
process.env[`NODE_ENV`] = Environment.name;

// Settings storage
const Store = require("electron-store");
Store.initRenderer();

const isDevelopment = process.env.NODE_ENV !== "production";

// Enable Hot Module Reload in dev
if (module.hot) module.hot.accept();

let createCloseHandler;
let mainWindow;
export const windows = [];

async function createMainWindow() {
  const mainWindowState = windowStateKeeper({
    defaultWidth: 1200,
    defaultHeight: 900,
  });

  const window = new BrowserWindow({
    x: mainWindowState.x,
    y: mainWindowState.y,
    width: mainWindowState.width,
    height: mainWindowState.height,
    minWidth: 800,
    minHeight: 600,
    resizable: true,
    icon: path.join(getStaticPath(), "/logo.png"),
    autoHideMenuBar: true,
    webPreferences: {
      sandbox: false,
      nodeIntegration: true,
      contextIsolation: false,
    },
  });
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

  const handleRedirect = (e, url) => {
    if (url != window.webContents.getURL()) {
      e.preventDefault();
      require("electron").shell.openExternal(url);
    }
  };

  window.webContents.on("will-navigate", handleRedirect);
  window.webContents.on("new-window", handleRedirect);

  window.webContents.on("devtools-opened", () => {
    window.webContents.send("devtools.opened");
  });

  window.webContents.on("devtools-closed", () => {
    window.webContents.send("devtools.closed");
  });

  windows.push(window);

  return window;
}

// This is a workaround for the lack of context-awareness in two native modules
// we use, serialport (serialport/node-serialport#2051) and usb
// (tessel/node-usb#380). See electron/electron#18397 for more context.
//app.allowRendererProcessReuse = true;

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

app.on("activate", async () => {
  // on macOS it is common to re-create a window even after all windows have been closed
  if (mainWindow === null) {
    mainWindow = await createMainWindow();
    mainWindow.on("close", createCloseHandler(mainWindow));
  }
});

// create main BrowserWindow when electron is ready
app.whenReady().then(async () => {
  addUsbEventListeners();
  if (isDevelopment) {
    // REACT_DEVELOPER_TOOLS is currently broken https://github.com/facebook/react/issues/25843
    //    await installExtension(REACT_DEVELOPER_TOOLS)
    //      .then((name) => console.log(`Added Extension:  ${name}`))
    //      .catch((err) => console.log("An error occurred: ", err));
  }

  mainWindow = await createMainWindow();
  createCloseHandler = registerExitHandlers(mainWindow);
  buildMenu();
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
    }
  });
});

process.on("uncaughtException", function (error) {
  console.log(error); // Handle the error
});

registerBackupHandlers();
registerDeviceDiscoveryHandlers();
registerDevtoolsHandlers();
registerFileIoHandlers();
registerFirmwareHandlers();
registerLoggingHandlers();
registerNativeThemeHandlers();
registerSystemInfoHandlers();
registerAutoUpdaterHandlers();
