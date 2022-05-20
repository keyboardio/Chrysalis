import { ipcMain, app } from "electron";
import fs from "fs";
import path from "path";

export const registerBackupHandlers = () => {
  ipcMain.on("backups.list-library", async (event) => {
    const dirName = path.join(app.getPath("userData"), "eeprom-backup");
    const library = fs
      .readdirSync(dirName, { encoding: "utf-8" })
      .map((name) => path.basename(name, ".json"))
      .sort((a, b) => {
        if (a > b) return -1;
        if (a < b) return 1;
        return 0;
      });

    event.returnValue = library;
  });

  ipcMain.on("backups.load-backup", async (event, stamp) => {
    const dirName = path.join(app.getPath("userData"), "eeprom-backup");
    const fileName = path.join(dirName, stamp.toString() + ".json");

    let data;
    try {
      data = fs.readFileSync(fileName);
    } catch (e) {
      event.returnValue = [null, e];
      return;
    }

    event.returnValue = [data];
  });

  ipcMain.on("eeprom-backup", async (event, stamp, data) => {
    const dirName = path.join(app.getPath("userData"), "eeprom-backup");
    const fileName = path.join(dirName, stamp.toString() + ".json");

    try {
      fs.mkdirSync(dirName, { recursive: true });
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
