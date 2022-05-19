import { ipcMain, dialog } from "electron";
import fs from "fs";

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
};
