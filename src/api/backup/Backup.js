import React, { Component } from "react";
import Focus from "../../api/focus";
import path from "path";
import settings from "electron-settings";

class Backup extends Component {
  async doBackup() {
    let backup = [];
    this.setState({ backup });
    const focus = new Focus();
    this.state.commands.map(async command => {
      await focus.command(command).then(data => {
        let bkp = this.state.backup;
        bkp.push({ command, data });
        this.setState({ bkp });
      });
    });
  }

  saveBackup = backup => {
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
  };
}

export default Backup;
