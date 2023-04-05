/* bazecor-focus -- Bazecor Focus protocol library
 * Copyright (C) 2018, 2019  Keyboardio, Inc.
 * Copyright (C) 2019, 2020 DygmaLab SE
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

import fs from "fs";
import { spawn } from "child_process";
import { inspect } from "util";
import i18n from "./i18n";

global.focus_instance = null;
global.focus_instance_file = false;

class Filefocus {
  constructor(file) {
    this.delay = ms => new Promise(res => setTimeout(res, ms));
    if (!global.focus_instance_file) {
      this.switchSingleton();
      this.file = file === null ? this.file : file;
      this.closed = true;
      this.commands = {
        help: this._help
      };
      this.debug = true;
    }
    return global.focus_instance;
  }

  debugLog(...args) {
    if (!this.debug) return;
    console.log(...args);
  }

  async open(device, info) {
    //TODO: read a file that is a backup
    let options = {
      title: i18n.keyboardSettings.backupFolder.title,
      buttonLabel: i18n.keyboardSettings.backupFolder.windowButton,
      filters: [
        { name: "Json", extensions: ["json"] },
        { name: i18n.dialog.allFiles, extensions: ["*"] }
      ]
    };
    const remote = require("electron").remote;
    const WIN = remote.getCurrentWindow();
    const data = await remote.dialog.showOpenDialog(WIN, options);
    let filePath;
    if (!data.canceled) {
      filePath = data.filePaths[0];
    } else {
      console.log("user closed file connect dialog");
    }
    console.log("Opening file", filePath);
    //TODO: Open the file and load it's contents
    let file;
    try {
      file = JSON.parse(fs.readFileSync(filePath));
      console.log(
        "loaded backup",
        file.backup == undefined ? file[0].command : file.backup[0].command,
        file.backup == undefined ? file[0].data : file.backup[0].data
      );
    } catch (e) {
      console.error(e);
      alert("The file is not a valid global backup");
      return;
    }
    console.log("Exchange focus for file access");

    this.closed = false;
    this.device = info;
    this.supportedCommands = this._help();
    return;
  }

  close() {
    this.device = null;
    this.supportedCommands = [];
    this.closed = true;
  }

  switchSingleton() {
    if (!global.focus_instance_file) {
      global.focus_instance = this;
      global.focus_instance_file = true;
    }
  }

  async isDeviceAccessible(port) {
    return true;
  }

  async isDeviceSupported(port) {
    return true;
  }

  isCommandSupported(cmd) {
    return this.commands.help.indexOf(cmd) != -1;
  }

  request(cmd, ...args) {
    this.debugLog("focus.request:", cmd, ...args);
    if (cmd === "version") {
      console.log(
        "Checking version! ",
        this.file.versions.bazecor + " " + this.file.versions.kaleidoscope + " " + this.file.versions.firmware
      );
      return this.file.versions.bazecor + " " + this.file.versions.kaleidoscope + " " + this.file.versions.firmware;
    } else {
      console.log("reading data");
      console.log(this.file.backup, cmd);
      console.log(this.file.backup[cmd]);
      return this.file.backup[cmd];
    }
  }

  async command(cmd, ...args) {
    if (typeof this.commands[cmd] == "function") {
      return this.commands[cmd](this, ...args);
    } else if (typeof this.commands[cmd] == "object") {
      return this.commands[cmd].focus(this, ...args);
    } else {
      return this.request(cmd, ...args);
    }
  }

  addCommands(cmds) {
    Object.assign(this.commands, cmds);
  }

  addMethod(methodName, command) {
    if (this[methodName]) {
      let tmp = this[methodName];
      this[methodName] = (...args) => {
        tmp(...args);
        this.commands[command][methodName](...args);
      };
    } else {
      this[methodName] = (...args) => {
        this.commands[command][methodName](...args);
      };
    }
  }

  _help(s) {
    let data = String.raw`version
    keymap.custom
    keymap.default
    keymap.onlyCustom
    settings.defaultLayer
    settings.valid?
    settings.version
    settings.crc
    eeprom.contents
    eeprom.free
    led.at
    led.setAll
    led.mode
    led.brightness
    led.theme
    palette
    colormap.map
    idleleds.time_limit
    hardware.version
    hardware.side_power
    hardware.side_ver
    hardware.sled_ver
    hardware.sled_current
    hardware.layout
    hardware.joint
    hardware.keyscan
    hardware.crc_errors
    hardware.firmware
    hardware.chip_id
    qukeys.holdTimeout
    qukeys.overlapThreshold
    superkeys.map
    superkeys.waitfor
    superkeys.timeout
    superkeys.repeat
    superkeys.holdstart
    superkeys.overlap
    macros.map
    macros.trigger
    help
    mouse.speed
    mouse.speedDelay
    mouse.accelSpeed
    mouse.accelDelay
    mouse.wheelSpeed
    mouse.wheelDelay
    mouse.speedLimit
    layer.activate
    layer.deactivate
    layer.isActive
    layer.moveTo
    layer.state
    
    .`;
    return data
      .split(/\r?\n/)
      .map(x => {
        return x.trim();
      })
      .filter(v => v.length > 0);
  }
}

export default Filefocus;
