import { ipcMain } from "electron";

export const registerDevtoolsHandlers = () => {
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
};
