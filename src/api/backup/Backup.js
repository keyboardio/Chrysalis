import React, { Component } from "react";
import Focus from "../focus";
import path from "path";
import settings from "electron-settings";

export default class Backup extends Component {
  constructor(props) {
    super(props);

    this.focus = new Focus();

    this.Commands = this.Commands.bind(this);
    this.DoBackup = this.DoBackup.bind(this);
    this.SaveBackup = this.SaveBackup.bind(this);
  }

  async Commands() {
    const notRequired = [
      "eeprom",
      "hardware",
      "settings.valid?",
      "settings.version",
      "settings.crc",
      "layer",
      "help",
      "version",
      "led.at",
      "led.setAll",
      "macros.trigger",
      "qukeys"
    ];
    let commands = await this.focus.command("help");
    return commands.filter(c => !notRequired.some(v => c.includes(v)));
  }

  async DoBackup(commands) {
    let backup = [];
    for (let i = 0; i < commands.length; i++) {
      let command = commands[i];
      console.log(command);
      let data = await this.focus.command(command);
      backup.push({ command, data });
    }
    return backup;
  }

  SaveBackup(backup) {
    const d = new Date();
    const folder = settings.getSync("backupFolder");
    try {
      const fullPath = path.join(
        folder,
        `RaiseBackup-${
          ("0" + d.getDate()).slice(-2) +
          ("0" + (d.getMonth() + 1)).slice(-2) +
          d.getFullYear() +
          ("0" + d.getHours()).slice(-2) +
          ("0" + d.getMinutes()).slice(-2) +
          ("0" + d.getSeconds()).slice(-2)
        }.json`
      );
      console.log(fullPath);
      require("fs").writeFileSync(fullPath, JSON.stringify(backup, null, 2));
      return true;
    } catch (error) {
      console.log("Error ocurred", d, folder, error);
      return false;
    }
  }
  // saveBackup = backup => {
  //   let options = {
  //     title: "Full Backup file",
  //     defaultPath: "FlashBackup.json",
  //     buttonLabel: "Backup",
  //     filters: [
  //       { name: "Json", extensions: ["json"] },
  //       { name: "All Files", extensions: ["*"] }
  //     ]
  //   };
  //   const remote = require("electron").remote;
  //   const WIN = remote.getCurrentWindow();
  //   remote.dialog
  //     .showSaveDialog(WIN, options)
  //     .then(resp => {
  //       if (!resp.canceled) {
  //         // console.log(resp.filePath, backup);
  //         require("fs").writeFileSync(
  //           resp.filePath,
  //           JSON.stringify(backup, null, 2)
  //         );
  //         toast.success(i18n.firmwareUpdate.backupSuccessful, {
  //           autoClose: 2000
  //         });
  //       } else {
  //         console.log("user closed Save Dialog");
  //       }
  //     })
  //     .catch(err => {
  //       console.error(err);
  //       toast.error(i18n.errors.exportError + err, {
  //         autoClose: 2000
  //       });
  //     });
  // };
}
