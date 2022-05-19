import { ipcMain, dialog, app } from "electron";
import fs from "fs";
import path from "path";

export const registerFileIoHandlers = () => {
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

  ipcMain.on("file-open", (event, data) => {
    let options = {
      title: data.title,
      filters: data.filters,
    };
    dialog.showOpenDialog(options).then((result) => {
      const { canceled, filePaths } = result;
      if (!canceled) {
        let fileData;
        try {
          fileData = fs.readFileSync(filePaths[0]);
        } catch (e) {
          fileData = null;
        }
        event.returnValue = [filePaths[0], fileData];
      } else {
        event.returnValue = [null, null];
      }
    });
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
