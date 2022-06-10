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
import { removeUsbEventListeners } from "./ipc_device_discovery";
import { sendToRenderer } from "./utils";

export const registerExitHandlers = (mainWindow) => {
  let readyToQuit = false;
  let quitTimer = null;

  ipcMain.on("app.exit", (event, arg) => {
    app.quit();
  });

  // quit application when all windows are closed
  app.on("window-all-closed", () => {
    removeUsbEventListeners();

    // on macOS it is common for applications to stay open until the user explicitly quits
    if (process.platform !== "darwin") {
      app.quit();
    }
  });

  /*
   * Our quit procedure is a bit involved, because if we have unsaved changes in
   * the renderer, we want to offer a chance for the user to save those. So when
   * we receive a "before-quit" event (initiated either from the main or the
   * renderer process, or even from outside), we check if we have received a
   * confirm-quit yet (readyToQuit will be true then, it's false by default). If
   * we did, then we return early, and let the normal shutdown process commence.
   *
   * If we did not, then we set an 1s timer that'll automatically flip
   * readyToQuit to true, and try to shut us down again. We do this so that if
   * the renderer is unable to function correctly (because it crashed, or is
   * showing an error screen or something), we can still quit.
   *
   * Once we have a timer rolling, we send an `app.quit-requested` message to
   * all windows. They can, in turn, do an IPC call back: either
   * `app.confirm-quit` to quit immediately, or `app.stop-quit` to prevent the
   * process. Both of them clear the timer. The first sets readyToQuit and
   * restarts the process, which will now quit immediately. The latter just
   * cancels the timer, and then it's up to the application to handle the
   * process further: ask the user, and then initiate another shutdown as
   * necessary.
   *
   * To support macOS, we also need to handle the main window's close event, and
   * be able to re-attach the handler when a new window is created. To achieve
   * that, we return a createCloseHandler function, and the main process can
   * use that to attach a close handler to new windows.
   */

  const createCloseHandler = (mainWindow) => (e) => {
    if (readyToQuit) return;

    if (quitTimer) {
      clearTimeout(quitTimer);
    }
    quitTimer = setTimeout(() => {
      readyToQuit = true;
      mainWindow.close();
    }, 1000);

    sendToRenderer("app.window-close-requested");

    e.returnValue = false;
    e.preventDefault();
  };

  mainWindow.on("close", createCloseHandler(mainWindow));

  app.on("before-quit", (e) => {
    // If we're already ready to quit, proceeed.
    if (readyToQuit) return;

    if (quitTimer) {
      clearTimeout(quitTimer);
    }
    quitTimer = setTimeout(() => {
      readyToQuit = true;
      app.quit();
    }, 1000);

    // Before we quit, ask the renderer if we're ready.
    sendToRenderer("app.quit-requested");

    e.preventDefault();
  });

  ipcMain.handle("app.confirm-quit", () => {
    clearTimeout(quitTimer);
    readyToQuit = true;
    app.quit();
  });

  ipcMain.handle("app.confirm-close", () => {
    clearTimeout(quitTimer);
    readyToQuit = true;
    mainWindow.close();
  });

  ipcMain.handle("app.stop-quit", () => {
    clearTimeout(quitTimer);
  });

  return createCloseHandler;
};
