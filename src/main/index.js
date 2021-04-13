// -*- mode: js-jsx -*-
/* Bazecor -- Kaleidoscope Command Center
 * Copyright (C) 2018, 2019, 2020  Keyboardio, Inc.
 * Copyright (C) 2019, 2020 DygmaLab SE
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

// This is a workaround for the lack of context-awareness in two native modules
// we use, serialport (serialport/node-serialport#2051) and usb
// (tessel/node-usb#380). See electron/electron#18397 for more context.
app.allowRendererProcessReuse = false;

import { app, BrowserWindow, Menu, nativeTheme, ipcMain } from "electron";
import settings from "electron-settings";
import { format as formatUrl } from "url";
import * as path from "path";
import * as fs from "fs";
import * as sudo from "sudo-prompt";
import windowStateKeeper from "electron-window-state";
import installExtension, {
  REACT_DEVELOPER_TOOLS
} from "electron-devtools-installer";
import { getStaticPath } from "../renderer/config";

const isDevelopment = process.env.NODE_ENV !== "production";
let mainWindow;

async function createMainWindow() {
  let mainWindowState = windowStateKeeper({
    defaultWidth: 1200,
    defaultHeight: 900
  });

  const window = new BrowserWindow({
    x: mainWindowState.x,
    y: mainWindowState.y,
    width: mainWindowState.width,
    height: mainWindowState.height,
    minWidth: 650,
    minHeight: 570,
    resizable: true,
    icon: path.join(getStaticPath(), "/logo.png"),
    show: false,
    backgroundColor: "#2e2c29",
    webPreferences: {
      sandbox: false,
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true
    }
  });

  mainWindowState.manage(window);

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

  window.once("ready-to-show", () => {
    window.show();
  });

  ipcMain.handle("dark-mode:set", async (event, darkMode) => {
    settings.setSync("ui.darkModePref", darkMode);
    // Setting nativeTheme at this point in the code is not working, hence the need to restart
    nativeTheme.ThemeSource = darkMode;
    settings.setSync("ui.darkMode", nativeTheme.shouldUseDarkColors);
    return nativeTheme.shouldUseDarkColors;
  });

  nativeTheme.on("updated", function theThemeHasChanged() {
    updateTheme(nativeTheme.shouldUseDarkColors);
  });

  function updateTheme(flag) {
    //updates the  renderer with the dark theme flag
    console.log("dark theme flag", flag);
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

  return window;
}

function checkUdev() {
  let filename = "/etc/udev/rules.d/50-dygma.rules";

  try {
    if (fs.existsSync(filename)) {
      return true;
    }
  } catch (err) {
    console.error(err);
    return false;
  }
}

function installUdev() {
  var options = {
    name: "Install Udev rules",
    icns: "./build/icon.icns"
  };
  sudo.exec(
    'echo "SUBSYSTEMS=="usb", ATTRS{idVendor}=="1209", ATTRS{idProduct}=="2201", GROUP=users, MODE="0666"" > /etc/udev/rules.d/50-dygma.rules && udevadm control --reload-rules',
    options,
    function (error, stdout) {
      if (error) throw error;
      console.log("stdout: " + stdout);
    }
  );
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
  let darkMode = settings.getSync("ui.darkModePref");
  if (darkMode === undefined) {
    darkMode = "system";
    settings.setSync("ui.darkModePref", "system");
  }
  // Setting nativeTheme currently only seems to work at this point in the code
  nativeTheme.themeSource = darkMode;
  settings.setSync("ui.darkMode", nativeTheme.shouldUseDarkColors);

  if (isDevelopment) {
    await installExtension(REACT_DEVELOPER_TOOLS)
      .then(name => console.log(`Added Extension:  ${name}`))
      .catch(err => console.log("An error occurred: ", err));
  }

  Menu.setApplicationMenu(null);
  mainWindow = createMainWindow();

  if (process.platform === "linux") {
    if (!checkUdev()) {
      installUdev();
    }
  }
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
