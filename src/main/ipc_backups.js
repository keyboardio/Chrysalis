import { ipcMain, app } from "electron";
import fs from "fs";
import path from "path";

const backupDir = (deviceInfo) => {
  return path.join(
    app.getPath("userData"),
    "eeprom-backup",
    deviceInfo.vendor,
    deviceInfo.product
  );
};

export const registerBackupHandlers = () => {
  ipcMain.on("backups.list-library", async (event, deviceInfo) => {
    try {
      fs.accessSync(backupDir(deviceInfo));
    } catch (_) {
      event.returnValue = [];
      return;
    }

    const library = fs
      .readdirSync(backupDir(deviceInfo), { encoding: "utf-8" })
      .map((name) => path.basename(name, ".json"))
      .sort((a, b) => {
        if (a > b) return -1;
        if (a < b) return 1;
        return 0;
      });

    event.returnValue = library;
  });

  ipcMain.on("backups.load-file", async (event, deviceInfo, stamp) => {
    const fileName = path.join(
      backupDir(deviceInfo),
      stamp.toString() + ".json"
    );

    let data;
    try {
      data = fs.readFileSync(fileName);
    } catch (e) {
      event.returnValue = [null, e];
      return;
    }

    event.returnValue = [data];
  });

  ipcMain.on("backups.save-file", async (event, deviceInfo, stamp, data) => {
    const fileName = path.join(
      backupDir(deviceInfo),
      stamp.toString() + ".json"
    );

    try {
      fs.mkdirSync(backupDir(deviceInfo), { recursive: true });
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
