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
    console.log("DoBackup function", commands);
    let backup = [];
    for (let i = 0; i < commands.length; i++) {
      console.log("calling for data");
      let command = commands[i];
      console.log(command);
      let data = await this.focus.command(command);
      backup.push({ command, data });
    }
    return backup;
  }

  SaveBackup(backup) {
    try {
      const date = new Date();
      const folder = settings.getSync("backupFolder");
      const fullPath = path.join(
        folder,
        `RaiseBackup-${date.toISOString()}.hex`
      );
      require("fs").writeFileSync(fullPath, JSON.stringify(backup, null, 2));
      return true;
    } catch (error) {
      return false;
    }
  }
}
