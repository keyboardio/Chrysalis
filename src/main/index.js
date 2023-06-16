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

app.disableHardwareAcceleration();
if (process.platform !== "darwin") {
  app.commandLine.appendSwitch("high-dpi-support", 1);
  app.commandLine.appendSwitch("force-device-scale-factor", 1);
}

import { app, BrowserWindow, Menu, nativeTheme, dialog, ipcMain, shell } from "electron";
import { format as formatUrl } from "url";
import * as path from "path";
import * as fs from "fs";
import * as sudo from "sudo-prompt";
import windowStateKeeper from "electron-window-state";
import installExtension, { REACT_DEVELOPER_TOOLS } from "electron-devtools-installer";
import { getStaticPath } from "../renderer/config";
import { uIOhook, UiohookKey } from "uiohook-napi";

const Store = require("electron-store");
const store = new Store();
const drivelist = require("drivelist");

const isDevelopment = process.env.NODE_ENV !== "production";
let mainWindow;
let globalRecording = false;

function delay(time) {
  return new Promise(resolve => setTimeout(resolve, time));
}

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
      webSecurity: false
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

  const theThemeHasChanged = () => {
    window.webContents.send("darkTheme-update", nativeTheme.shouldUseDarkColors);
  };

  nativeTheme.on("updated", theThemeHasChanged);

  const UiohookToName = Object.fromEntries(Object.entries(UiohookKey).map(([k, v]) => [v, k]));

  // function send webContents event for KeyDown
  const sendkeyDown = async e => {
    let data = { event: e, name: UiohookToName[e.keycode], time: Date.now() };
    await window.webContents.send("recorded-key-down", data);
  };

  // function send webContents event for keyUp
  const sendKeyUp = async e => {
    let data = { event: e, name: UiohookToName[e.keycode], time: Date.now() };
    await window.webContents.send("recorded-key-up", data);
  };

  // function send webContents event for keyUp
  // const sendMouseMove = async e => {
  //   let data = { event: e, name: UiohookToName[e.keycode], time: Date.now() };
  //   await window.webContents.send("recorded-mouse-move", data);
  // };

  // function send webContents event for KeyDown
  const sendMouseClick = async e => {
    let data = { event: e, name: UiohookToName[e.keycode], time: Date.now() };
    await window.webContents.send("recorded-mouse-click", data);
  };

  // function send webContents event for keyUp
  const sendMouseWheel = async e => {
    let data = { event: e, name: UiohookToName[e.keycode], time: Date.now() };
    await window.webContents.send("recorded-mouse-wheel", data);
  };

  ipcMain.on("start-recording", (event, arg) => {
    console.log("start-recording");
    globalRecording = true;
    uIOhook.on("keydown", sendkeyDown);
    uIOhook.on("keyup", sendKeyUp);
    // uIOhook.on("mousemove", sendMouseMove);
    // uIOhook.on("click", sendMouseClick);
    // uIOhook.on("wheel", sendMouseWheel);
    uIOhook.start();
  });

  ipcMain.on("stop-recording", (event, arg) => {
    console.log("stop-recording");
    globalRecording = false;
    uIOhook.off("keydown", sendkeyDown);
    uIOhook.off("keyup", sendKeyUp);
    // uIOhook.off("mousemove", sendMouseMove);
    // uIOhook.off("click", sendMouseClick);
    // uIOhook.off("wheel", sendMouseWheel);
    uIOhook.stop();
  });

  ipcMain.handle("list-drives", async (event, someArgument) => {
    let drives = undefined;
    let result = undefined;
    while (result == undefined) {
      drives = await drivelist.list();
      drives.forEach(async (drive, index) => {
        console.log("drive info", drive.description, drive.mountpoints);
        if (drive.description.includes("RPI RP2") || drive.description.includes("RPI-RP2")) {
          while (drive.mountpoints[0] == undefined || drive.mountpoints.length == 0) {
            delay(100);
            drives = await drivelist.list();
            result = drives[index].mountpoints[0];
            console.log(result);
          }
          if (result == undefined) {
            result = drive.mountpoints[0];
          }
        }
      });
    }
    return result.path;
  });

  //const data = await ipcRenderer.invoke("open-dialog", options);
  ipcMain.handle("open-dialog", async (event, options) => {
    const data = await dialog.showOpenDialog(window, options);
    return data;
  });

  //const newPath = await ipcRenderer.invoke("save-dialog", options);
  ipcMain.handle("save-dialog", async (event, options) => {
    const data = await dialog.showSaveDialogSync(window, options);
    return data;
  });

  //const newPath = await ipcRenderer.invoke("is-devtools-opened", options);
  ipcMain.handle("is-devtools-opened", async (event, someArgument) => {
    const data = window.webContents.isDevToolsOpened();
    return data;
  });

  //await ipcRenderer.invoke("manage-devtools", action);
  ipcMain.handle("manage-devtools", (event, action) => {
    if (action === true) {
      window.webContents.openDevTools();
    } else {
      window.webContents.closeDevTools();
    }
    return;
  });

  //await ipcRenderer.invoke("get-userPath","userData");
  ipcMain.handle("get-userPath", (event, path) => {
    return app.getPath(path);
  });

  // ipcRenderer.invoke("openExternal", URI);
  ipcMain.handle("openExternal", (event, URI) => {
    return shell.openExternal(URI);
  });

  // ipcRenderer.invoke("get-Locale");
  ipcMain.handle("get-Locale", (event, someArgument) => {
    return app.getLocale();
  });

  // ipcRenderer.invoke("get-NativeTheme");
  ipcMain.handle("get-NativeTheme", (event, someArgument) => {
    return nativeTheme.shouldUseDarkColors;
  });

  window.on("closed", () => {
    nativeTheme.off("updated", theThemeHasChanged);
    mainWindow = null;
  });

  window.webContents.on("devtools-opened", () => {
    window.focus();
    setImmediate(() => {
      window.focus();
    });
    window.webContents.send("opened-devtool", true);
  });

  window.webContents.on("devtools-closed", () => {
    window.webContents.send("closed-devtool", false);
  });

  let handleRedirect = (e, url) => {
    if (url != window.webContents.getURL()) {
      e.preventDefault();
      require("electron").shell.openExternal(url);
    }
  };

  window.webContents.on("will-navigate", handleRedirect);
  window.webContents.on("new-window", handleRedirect);

  window.once("ready-to-show", () => {
    window.show();
    if (process.platform === "linux") {
      if (!checkUdev()) {
        installUdev(window);
      }
    }
  });

  return window;
}

function checkUdev() {
  let filename = "/etc/udev/rules.d/10-dygma.rules";

  try {
    if (fs.existsSync(filename)) {
      return true;
    }
  } catch (err) {
    console.error(err);
    return false;
  }
}

function installUdev(mainWindow) {
  var options = {
    name: "Install Udev rules",
    icns: "./build/icon.icns"
  };
  const dialogOpts = {
    type: "question",
    buttons: ["Cancel", "Install"],
    cancelId: 0,
    defaultId: 1,
    title: "Udev rules Installation",
    message: "Bazecor lacks write access to your Raise keyboard",
    detail: "Press install to set up the required Udev Rules, then scan keyboards again."
  };
  dialog.showMessageBox(mainWindow, dialogOpts).then(response => {
    if (response.response === 1) {
      sudo.exec(
        `echo 'SUBSYSTEMS=="usb", ATTRS{idVendor}=="1209", ATTRS{idProduct}=="2201", GROUP="users", MODE="0666"\nSUBSYSTEMS=="usb", ATTRS{idVendor}=="1209", ATTRS{idProduct}=="2200", GROUP="users", MODE="0666"' > /etc/udev/rules.d/10-dygma.rules && udevadm control --reload-rules && udevadm trigger`,
        options,
        error => {
          if (error !== null) {
            console.log("stdout: " + error.message);
            const errorOpts = {
              type: "error",
              buttons: ["Ok"],
              defaultId: 0,
              title: "Error when launching sudo prompt",
              message: "An error happened when launching a sudo prompt window",
              detail:
                "Your linux distribution lacks a polkit agent, installing polkit-1-auth-agent, policykit-1-gnome, or polkit-kde-1 (depending on your desktop manager) will solve this problem\n\n" +
                error.message
            };
            dialog.showMessageBox(mainWindow, errorOpts, null);
          }
        }
      );
    }
  });
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
  let bfolder = store.get("settings.backupFolder");
  console.log("CHECKING BACKUP FOLDER VALUE", bfolder);
  if (bfolder == "" || bfolder == undefined) {
    const defaultPath = path.join(app.getPath("home"), "Dygma", "Backups");
    console.log(defaultPath);
    store.set("settings.backupFolder", defaultPath);
    fs.mkdir(defaultPath, { recursive: true }, err => {
      if (err) {
        console.error(err);
      }
      console.log("Directory created successfully!");
    });
  }

  let darkMode = store.get("settings.darkMode");
  if (typeof darkMode === "boolean" || darkMode === undefined) {
    darkMode = "system";
    store.set("settings.darkMode", "system");
  }
  // Setting nativeTheme currently only seems to work at this point in the code
  nativeTheme.themeSource = darkMode;

  if (isDevelopment) {
    await installExtension(REACT_DEVELOPER_TOOLS)
      .then(name => console.log(`Added Extension:  ${name}`))
      .catch(err => console.log("An error occurred: ", err));
  }

  Menu.setApplicationMenu(null);
  mainWindow = createMainWindow();
});

app.on("web-contents-created", (_, wc) => {
  wc.on("before-input-event", (_, input) => {
    if (!globalRecording && input.type == "keyDown" && input.control) {
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
