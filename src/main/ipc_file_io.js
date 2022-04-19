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
};
