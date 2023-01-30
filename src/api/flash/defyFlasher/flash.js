/* bazecor-flash-raise -- Dygma Raise flash helper for Bazecor
 * Copyright (C) 2019, 2020  DygmaLab SE
 *
 * This program is free software: you can redistribute it and/or modify it under
 * the terms of the GNU General Public License as published by the Free Software
 * Foundation, version 3.
 *
 * This program is distributed in the hope that it will be useful, but WITHOUT
 * ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS
 * FOR A PARTICULAR PURPOSE. See the GNU General Public License for more
 * details.
 *
 * You should have received a copy of the GNU General Public License along with
 * this program. If not, see <http://www.gnu.org/licenses/>.
 */

import fs from "fs";
import path from "path";
import Focus from "../../focus";
import Hardware from "../../hardware";
import rp2040 from "./rp2040-flasher";
import NRf52833 from "./NRf52833-flasher";

/**
 * Create a new flash raise object.
 * @class FlashRaise
 * @param {object} port - serial port object for the "path"
 * @param {object} device - device data from SerailPort.list()
 * @property {object} backupFileData Object with settings from raise keyboard EEPROM, logging data, keyboard serial number and file with firmware
 * @emits backupSettings
 * @emits resetKeyboard
 * @emits updateFirmware
 */
export class FlashDefyWired {
  constructor(device) {
    this.device = device.device;
    this.currentPort = null;
    this.backupFileName = null;
    this.backupFileData = {
      backup: {},
      log: ["Neuron detected"],
      serialNumber: device.serialNumber,
      firmwareFile: "File has not being selected"
    };
    this.backup = [];
    this.delay = ms => new Promise(res => setTimeout(res, ms));
  }

  /**
   * Formats date for create name of backup file.
   * @returns {string} formate date for example "2019-07-12-19_40_56"
   */
  formatedDate() {
    const date = new Date();
    const firstFind = /, /gi;
    const secondFind = /:/gi;
    const formatterDate = date.toLocaleString("en-CA", { hour12: false }).replace(firstFind, "-").replace(secondFind, "_");
    return formatterDate;
  }

  /**
   * Founds device what connected from Bazecor Hardware api.
   * @param {array} hardware - Array of supported devices by Bazecor api.
   * @param {string} message - Message for backup file.
   * @returns {boolean} if device found - true, if no - false
   */
  async foundDevices(hardware, message, bootloader) {
    let focus = new Focus();
    let isFindDevice = false;
    await focus.find(...hardware).then(devices => {
      for (const device of devices) {
        console.log(
          "DATA CHECKER: ",
          device,
          this.device,
          device.device.bootloader,
          bootloader,
          this.device.info.keyboardType,
          device.device.info.keyboardType
        );
        if (
          bootloader
            ? device.device.bootloader != undefined &&
              device.device.bootloader == bootloader &&
              this.device.info.keyboardType == device.device.info.keyboardType
            : this.device.info.keyboardType == device.device.info.keyboardType
        ) {
          console.log(message);
          this.currentPort = { ...device };
          isFindDevice = true;
        }
      }
    });
    return isFindDevice;
  }

  /**
   * Takes backup settings from keyboard and writes its in backupfile.
   */
  async backupSettings() {
    let focus = new Focus();

    const commands = [
      "hardware.keyscan",
      "led.mode",
      "keymap.custom",
      "keymap.default",
      "keymap.onlyCustom",
      "led.theme",
      "palette",
      "colormap.map",
      "macros.map",
      "settings.defaultLayer",
      "led.brightness",
      "idleleds.time_limit",
      "qukeys.holdTimeout",
      "qukeys.overlapThreshold",
      "mouse.speed",
      "mouse.speedDelay",
      "mouse.accelSpeed",
      "mouse.accelDelay",
      "mouse.wheelSpeed",
      "mouse.wheelDelay",
      "mouse.speedLimit",
      "mouse.speedDelay",
      "superkeys.map",
      "superkeys.holdstart",
      "superkeys.waitfor",
      "superkeys.timeout",
      "superkeys.repeat",
      "superkeys.overlap"
    ];
    this.backupFileName = `defy-backup-${this.formatedDate()}.json`;

    let errorFlag = false;
    const errorMessage = "Firmware update failed, because the settings could not be saved";
    try {
      for (let command of commands) {
        // Ignore the command if it's not supported
        if (!focus.isCommandSupported(command)) {
          this.backupFileData.log.push("Unsupported command " + command);
          continue;
        }

        let res = await focus.command(command);
        this.backupFileData.backup[command] = typeof res === "string" ? res.trim() : res;
        if (res === undefined || res === "") {
          this.backupFileData.log.push(`Get backup settings ${command}: Error: ${errorMessage}`);
          errorFlag = true;
        }
      }
      if (errorFlag) throw new Error(errorMessage);
      this.backupFileData.log.push("Settings backed up OK");
    } catch (e) {
      console.warn(errorMessage);
      console.error(e);
      this.saveBackupFile();
      throw e;
    }
  }

  /**
   * Saves backup file in directory:
   * windows: C:\Users\<Your_User_Namer>\AppData\Local\Programs\bazecor,
   * linux: in directory, where the app is located.
   */
  saveBackupFile() {
    const route = path.join(require("electron").remote.app.getPath("userData"), this.backupFileName + ".json");
    console.log("saving file to: " + route);
    fs.writeFile(route, JSON.stringify(this.backupFileData), err => {
      if (err) throw err;
      this.backupFileData.log.push("Backup file is created successfully");
    });
  }

  /**
   * Update the baud rate of the port with a Promise
   * @param {*} port Port to be updated
   * @param {*} baud BaudRate to be set
   * @returns {promise} Promise to be returned, that will resolve when the operation is done
   */
  updatePort = (port, baud) => {
    return new Promise(function (resolve, reject) {
      port.update({ baudRate: baud }, function () {
        console.log(`Port update started at: ${new Date(Date.now()).toISOString()}`);
        resolve();
      });
    });
  };

  /**
   * Resets keyboard at the baud rate of 1200bps. Keyboard is restarted with the bootloader
   * @param {object} port - serial port object for the "path".
   * @returns {promise}
   */
  async resetKeyboard(port, backup, stateUpdate) {
    console.log("reset start", port);
    const errorMessage =
      "The firmware update couldn't start because the Defy Bootloader wasn't found. Please check our Help Center for more details or schedule a video call with us.";
    let timeouts = {
      dtrToggle: 1000, // Time to wait (ms) between toggling DTR
      waitingClose: 2000, // Time to wait for boot loader
      bootLoaderUp: 1000 // Time to wait for the boot loader to come up
    };
    console.log("loaded backup: ", backup);
    this.backup = backup;
    return new Promise(async (resolve, reject) => {
      await this.updatePort(port, 1200);
      console.log("resetting neuron");
      this.backupFileData.log.push("Resetting neuron");
      await this.delay(timeouts.dtrToggle);
      console.log("waiting for bootloader");
      this.backupFileData.log.push("Waiting for bootloader");
      stateUpdate(2, 20);
      try {
        await this.delay(timeouts.waitingClose);
        let bootCount = 10;
        while (bootCount > 0) {
          if (await this.foundDevices(Hardware.bootloader, "Bootloader detected", true)) {
            resolve("Detected Bootloader mode");
            bootCount = true;
            stateUpdate(3, 30);
            break;
          }
          await this.delay(timeouts.bootLoaderUp);
          bootCount--;
        }
        if (bootCount != true) {
          stateUpdate(4, 100);
          this.backupFileData.log.push("Bootloader wasn't detected");
          reject(errorMessage);
        }
      } catch (e) {
        this.backupFileData.log.push(`Reset keyboard: Error: ${e.message}`);
        // this.saveBackupFile();
        reject(e);
      }
    });
  }

  /**
   * Updates firmware of bootloader
   * @param {object} port - serial port object for the "path".
   * @param {string} filename - path to file with firmware.
   * @returns {promise}
   */
  async updateFirmware(filename, filenameSides, stateUpdate) {
    let focus = new Focus();
    console.log("Begin update firmware with rp2040");
    console.log(JSON.stringify(focus));
    // this.backupFileData.log.push("Begin update firmware with rp2040");
    this.backupFileData.firmwareFile = filename;
    await this.delay(250);
    return new Promise(async (resolve, reject) => {
      try {
        await rp2040.flashSides(filenameSides, stateUpdate, async (err, result) => {
          /**
           * Procedure to flash the sides of the keyboard
           *
           * b'upgrade.start\n'
           * Can start upgrading
           * b'upgrade.keyscanner.beginRight\n'
           * b'upgrade.keyscanner.getInfo\n'
           * This is the info
           * InfoAction(hardwareVersion=1, flashStart=20480, programVersion=16777217, programCrc=3782824883)
           * Seal(hardwareVersion=SealHeader(deviceId=1263747922, version=1, size=32, crc=197434883), programStart=20736, programSize=57552, programCrc=3782824883, programVersion=16777217)
           * No need to update!
           * Writing 0 of 57856
           * b'upgrade.keyscanner.sendWrite \x00P\x00\x00\x00\x01\x00\x00RCSK\x01\x00\x00\x00 \x00\x00\x00\x03\x9e\xc4\x0b\x00Q\x00\x00\xd0\xe0\x00\x00\xb3Sy\xe1\x01\x00\x00\x01\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00=\xb6\xab\xcd'
           * Writing 256 of 57856
           * b'upgrade.keyscanner.sendWrite \x00Q\x00\x00\x00\x01\x00\x00\x00\xb52K! X`\x98h\x02!\x88C\x98`\xd8`\x18aXa.K\x00!\x99`\x02!Ya\x01!\xf0"\x99P+I\x19`\x01!\x99`5 \x00\xf0D\xf8\x02"\x90B\x14\xd0\x06!\x19f\x00\xf04\xf8\x19n\x01!\x19f\x00 \x18f\x1af\x00\xf0,\xf8\x19n\x19n\x19n\x05 \x00\xf0/\xf8\x01!\x08B\xf9\xd1\x00!\x99`\x1bI\x19`\x00!Y`\x1aI\x1bH\x01`\x01!\x99`\xeb!\x19f\xa0!\x19f\x00\xf0\x12\xf8\x00!\x99`\x16I\x14H\x01`\x01!\x99`\x01\xbc\x00(\x00\xd0\x00G\x12H\x13I\x08`\x03\xc8\x80\xf3\x08\x88\x08G\x03\xb5\x99j\x04 \x01B\xfb\xd0\x01 \x01B\xf8\xd1\x03\xbd\x02\xb5\x18f\x18f\xff\xf7\xf2\xff\x18n\x18n\x02\xbd\x00\x00\x02@\x00\x00\x00\x18\x00\x00\x07\x00\x00\x03_\x00!"\x00\x00\xf4\x00\x00\x18" \x00\xa0\x00\x01\x00\x10\x08\xed\x00\xe0\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00t\xb2Nz\x036\xfa0'
           * Writing 512 of 57856
           * b'upgrade.keyscanner.sendWrite \x00R\x00\x00\x00\x01\x00\x00\x00 \x04 \xf7R\x00\x10\xc3R\x00\x10\xc5R\x00\x10\xc1R\x00\x10\xc1R\x00\x10\xc1R\x00\x10\xc1R\x00\x10\xc1R\x00\x10\xc1R\x00\x10\xc1R\x00\x10\xc7R\x00\x10\xc1R\x00\x10\xc1R\x00\x10\xc9R\x00\x10\xcbR\x00\x10\xcdR\x00\x10\xcdR\x00\x10\xcdR\x00\x10\xcdR\x00\x10\xcdR\x00\x10\xcdR\x00\x10\xcdR\x00\x10\xcdR\x00\x10\xcdR\x00\x10\xcdR\x00\x10\xcdR\x00\x10\xcdR\x00\x10\xcdR\x00\x10\xcdR\x00\x10\xcdR\x00\x10\xcdR\x00\x10\xcdR\x00\x10\xcdR\x00\x10\xcdR\x00\x10\xcdR\x00\x10\xcdR\x00\x10\xcdR\x00\x10\xcdR\x00\x10\xcdR\x00\x10\xcdR\x00\x10\xcdR\x00\x10\xcdR\x00\x10\xcdR\x00\x10\xcdR\x00\x10\xcdR\x00\x10\xcdR\x00\x10\xcdR\x00\x10\x00\xbe\x00\xbe\x00\xbe\x00\xbe\x00\xbe\x00\xbe\x00\xf0K\xf8\x108\x00\xbe\xf2\xeb\x88q\xa4\x14\x01\x10\xc8\x14\x01\x104S\x00\x10\x90\xa3\x1a\xe7\x00 !I\x08`\x06\xc8\x81\xf3\x08\x88\x10G\x1fH\x00h\x00(/\xd1\r\xa4\xfc\x9b\xa0\xe9'
           * Writing 768 of 57856
           * b'upgrade.keyscanner.sendWrite \x00S\x00\x00\x00\x01\x00\x00\x0e\xcc\x00)\x02\xd0\x00\xf0\x12\xf8\xf9\xe7\x1aI\x1bJ\x00 \x00\xe0\x01\xc1\x91B\xfc\xd1\x19I\x88G\x19I\x88G\x19I\x88G\x00\xbe\xfd\xe7\x01\xc9\x01\xc2\x9aB\xfb\xd3pG\xc8\x14\x01\x10\xc0\x00\x00 \xc8\x1d\x00 \xd01\x01\x10\x00\x00\x04 \x00\x00\x04 \xd01\x01\x10\x00\x10\x04 \x00\x10\x04 \x00\x00\x00\x00pG\x0bH\x03\xf0\xd6\xfb\x00G\xef\xf3\x05\x80\xc0\xb2pG\x00\x00\x08\xed\x00\xe0\x00\x00\x00\xd0\xc8\x1d\x00 0/\x00 \xf5n\x00\x10\x95T\x00\x10\x1dp\x00\x10WV\x00\x00\x06\x00RP\xab\xb3`S\x94\x07\x01\x10\x06\x00RP\x86\x1c\x03\x02\xa4\x07\x01\x10\x06\x00RPT"\xa2\x9d\xb0\x07\x01\x10\x05\x00RP\xdee\xf4h\xd01\x01\x10\xf8\xb5\xc0F\x04H\x05K\x10\xb5\x83B\x03\xd0\x04K\x00+\x00\xd0\x98G\x10\xbd\xc8\x1d\x00 \xc8\x1d\x00 \x00\x00\x00\x00\x06H\x07I\t\x1a\x8b\x10\xc9\x0f\xc9\x18\x10\xb5I\x10\x03\xd0\x04K\x00+\x00\xd0\x98G\x10\xbd\xecnl\xb9'
           * Writing 1024 of 57856
           *
           *  */

          let sideBin = fs.readFileSync("./KeyScanner_WithHeader.bin", "hex");
          const seal = rp2040.recoverSeal(sideBin.slice(0, 64));
          const blocks = rp2040.binToFW(sideBin);

          //TODO: FINISH THIS COMMANDS
          let krStatus = await focus.command("upgrade.keyscanner.beginRight");
          if (krStatus == "true") {
            krStatus = await focus.command("upgrade.keyscanner.getInfo").split(" ");
            krStatus = {
              hardwareVersion: krStatus[0],
              flashStart: krStatus[1],
              programVersion: krStatus[2],
              programCrc: krStatus[3],
              validation: krStatus[4]
            };
          }
          let klStatus = await focus.command("upgrade.keyscanner.beginLeft");
          if (klStatus == "true") {
            klStatus = await focus.command("upgrade.keyscanner.getInfo").split(" ");
            klStatus = {
              hardwareVersion: klStatus[0],
              flashStart: klStatus[1],
              programVersion: klStatus[2],
              programCrc: klStatus[3],
              validation: klStatus[4]
            };
          }
          if (krStatus !== "false" && krStatus.programVersion != sfwCRC) {
            // The firmware has to be updated
          } else {
            resolve();
          }
        });
        await rp2040.flash(filename, stateUpdate, async (err, result) => {
          if (err) throw new Error(`Flash error ${result}`);
          else {
            stateUpdate(3, 70);
            console.log("End update firmware with rp2040");
            // this.backupFileData.log.push("End update firmware with rp2040");
            await this.delay(1500);
            await this.detectKeyboard();
            resolve();
          }
        });
      } catch (e) {
        this.backupFileData.log.push(e);
        reject(e);
      }
    });
  }

  /**
   * Detects keyboard after firmware of bootloader
   */
  async detectKeyboard() {
    const timeouts = 2500; //time to wait for keyboard
    const findTimes = 5;
    const errorMessage =
      "The firmware update has failed during the flashing process. Please unplug and replug the keyboard and try again";
    console.log("Waiting for keyboard");
    //wait until the bootloader serial port disconnects and the keyboard serial port reconnects
    const findKeyboard = async () => {
      return new Promise(async resolve => {
        await this.delay(timeouts);
        if (await this.foundDevices(Hardware.serial, "Keyboard detected", false)) {
          resolve(true);
        } else {
          resolve(false);
        }
      });
    };
    try {
      await this.runnerFindKeyboard(findKeyboard, findTimes, errorMessage);
    } catch (e) {
      console.error(`Detect keyboard: Error: ${e.message}`);
      throw e;
    }
  }

  /**
   * Runs the function several times
   * @param {function} findKeyboard - function that will run several times.
   * @param {number} times - how many times function runs.
   * @param {string} errorMessage - error message if error is.
   */
  async runnerFindKeyboard(findKeyboard, times, errorMessage) {
    if (!times) {
      console.error(errorMessage);
      return false;
    }
    if (await findKeyboard()) {
      console.log("Ready to restore");
      return true;
    } else {
      console.log(`Keyboard not detected, trying again for ${times} times`);
      await this.runnerFindKeyboard(findKeyboard, times - 1, errorMessage);
    }
  }

  /**
   * Restores settings to keyboard after bootloader flashing
   */
  async restoreSettings(backup) {
    let focus = new Focus();
    const errorMessage = "Firmware update failed, because the settings could not be restored";
    console.log(backup);
    if (backup === undefined || backup.length === 0) {
      await focus.open(this.currentPort.path, this.currentPort.device.info);
      return true;
    }
    try {
      await focus.open(this.currentPort.path, this.currentPort.device.info);
      for (let i = 0; i < backup.length; i++) {
        let val = backup[i].data;
        // Boolean values need to be sent as int
        if (typeof val === "boolean") {
          val = +val;
        }
        console.log(`Going to send ${backup[i].command} to keyboard`);
        await focus.command(`${backup[i].command} ${val}`.trim());
      }
      this.backupFileData.log.push("Restoring all settings");
      this.backupFileData.log.push("Firmware update OK");
      return true;
    } catch (e) {
      this.backupFileData.log.push(`Restore settings: Error: ${e.message}`);
      return false;
    }
  }
}

/**
 * Create a new flash raise object.
 * @class FlashRaise
 * @param {object} port - serial port object for the "path"
 * @param {object} device - device data from SerailPort.list()
 * @property {object} backupFileData Object with settings from raise keyboard EEPROM, logging data, keyboard serial number and file with firmware
 * @emits backupSettings
 * @emits resetKeyboard
 * @emits updateFirmware
 */
export class FlashDefyWireless {
  constructor(device) {
    this.device = device.device;
    this.currentPort = null;
    this.backupFileName = null;
    this.backupFileData = {
      backup: {},
      log: ["Neuron detected"],
      serialNumber: device.serialNumber,
      firmwareFile: "File has not being selected"
    };
    this.backup = [];
    this.delay = ms => new Promise(res => setTimeout(res, ms));
  }

  /**
   * Formats date for create name of backup file.
   * @returns {string} formate date for example "2019-07-12-19_40_56"
   */
  formatedDate() {
    const date = new Date();
    const firstFind = /, /gi;
    const secondFind = /:/gi;
    const formatterDate = date.toLocaleString("en-CA", { hour12: false }).replace(firstFind, "-").replace(secondFind, "_");
    return formatterDate;
  }

  /**
   * Founds device what connected from Bazecor Hardware api.
   * @param {array} hardware - Array of supported devices by Bazecor api.
   * @param {string} message - Message for backup file.
   * @returns {boolean} if device found - true, if no - false
   */
  async foundDevices(hardware, message, bootloader) {
    let focus = new Focus();
    let isFindDevice = false;
    await focus.find(...hardware).then(devices => {
      for (const device of devices) {
        console.log(
          "DATA CHECKER: ",
          device,
          this.device,
          device.device.bootloader,
          bootloader,
          this.device.info.keyboardType,
          device.device.info.keyboardType
        );
        if (
          bootloader
            ? device.device.bootloader != undefined &&
              device.device.bootloader == bootloader &&
              this.device.info.keyboardType == device.device.info.keyboardType
            : this.device.info.keyboardType == device.device.info.keyboardType
        ) {
          console.log(message);
          this.currentPort = { ...device };
          isFindDevice = true;
        }
      }
    });
    return isFindDevice;
  }

  /**
   * Takes backup settings from keyboard and writes its in backupfile.
   */
  async backupSettings() {
    let focus = new Focus();

    const commands = [
      "hardware.keyscan",
      "led.mode",
      "keymap.custom",
      "keymap.default",
      "keymap.onlyCustom",
      "led.theme",
      "palette",
      "colormap.map",
      "macros.map",
      "settings.defaultLayer",
      "led.brightness",
      "idleleds.time_limit",
      "qukeys.holdTimeout",
      "qukeys.overlapThreshold",
      "mouse.speed",
      "mouse.speedDelay",
      "mouse.accelSpeed",
      "mouse.accelDelay",
      "mouse.wheelSpeed",
      "mouse.wheelDelay",
      "mouse.speedLimit",
      "mouse.speedDelay",
      "superkeys.map",
      "superkeys.holdstart",
      "superkeys.waitfor",
      "superkeys.timeout",
      "superkeys.repeat",
      "superkeys.overlap"
    ];
    this.backupFileName = `defy-backup-${this.formatedDate()}.json`;

    try {
      let errorFlag = false;
      const errorMessage = "Firmware update failed, because the settings could not be saved";
      for (let command of commands) {
        // Ignore the command if it's not supported
        if (!focus.isCommandSupported(command)) {
          this.backupFileData.log.push("Unsupported command " + command);
          continue;
        }

        let res = await focus.command(command);
        this.backupFileData.backup[command] = typeof res === "string" ? res.trim() : res;
        if (res === undefined || res === "") {
          this.backupFileData.log.push(`Get backup settings ${command}: Error: ${errorMessage}`);
          errorFlag = true;
        }
      }
      if (errorFlag) throw new Error(errorMessage);
      this.backupFileData.log.push("Settings backed up OK");
    } catch (e) {
      this.saveBackupFile();
      throw e;
    }
  }

  /**
   * Saves backup file in directory:
   * windows: C:\Users\<Your_User_Namer>\AppData\Local\Programs\bazecor,
   * linux: in directory, where the app is located.
   */
  saveBackupFile() {
    const route = path.join(require("electron").remote.app.getPath("userData"), this.backupFileName + ".json");
    console.log("saving file to: " + route);
    fs.writeFile(route, JSON.stringify(this.backupFileData), err => {
      if (err) throw err;
      this.backupFileData.log.push("Backup file is created successfully");
    });
  }

  /**
   * Returns a Promise to be awaited that sets the DTR flag of the port
   * @param {*} port Port to be used on the set dtr function
   * @param {*} state State of the DTR flag to be set on the port
   * @returns {promise} that will resolve when the function has successfully setted the DTR flag
   */
  setDTR = (port, state) => {
    return new Promise(function (resolve, reject) {
      port.set({ dtr: state }, function () {
        console.log(`DTR set to ${state} at ${new Date(Date.now()).toISOString()}`);
        resolve();
      });
    });
  };

  /**
   * Update the baud rate of the port with a Promise
   * @param {*} port Port to be updated
   * @param {*} baud BaudRate to be set
   * @returns {promise} Promise to be returned, that will resolve when the operation is done
   */
  updatePort = (port, baud) => {
    return new Promise(function (resolve, reject) {
      port.update({ baudRate: baud }, function () {
        console.log(`Port update started at: ${new Date(Date.now()).toISOString()}`);
        resolve();
      });
    });
  };

  /**
   * Resets keyboard at the baud rate of 1200bps. Keyboard is restarted with the bootloader
   * @param {object} port - serial port object for the "path".
   * @returns {promise}
   */
  async resetKeyboard(port, backup, stateUpdate) {
    console.log("reset start", port);
    const errorMessage =
      "The firmware update couldn't start because the Defy Bootloader wasn't found. Please check our Help Center for more details or schedule a video call with us.";
    let timeouts = {
      dtrToggle: 1000, // Time to wait (ms) between toggling DTR
      waitingClose: 2000, // Time to wait for boot loader
      bootLoaderUp: 1000 // Time to wait for the boot loader to come up
    };
    console.log("loaded backup: ", backup);
    this.backup = backup;
    return new Promise(async (resolve, reject) => {
      await this.updatePort(port, 1200);
      console.log("resetting neuron");
      this.backupFileData.log.push("Resetting neuron");
      await this.setDTR(port, true);
      await this.delay(timeouts.dtrToggle);
      await this.setDTR(port, false);
      console.log("waiting for bootloader");
      this.backupFileData.log.push("Waiting for bootloader");
      stateUpdate(2, 20);
      try {
        await this.delay(timeouts.waitingClose);
        let bootCount = 10;
        while (bootCount > 0) {
          if (await this.foundDevices(Hardware.bootloader, "Bootloader detected", true)) {
            resolve("Detected Bootloader mode");
            bootCount = true;
            stateUpdate(3, 30);
            break;
          }
          await this.delay(timeouts.bootLoaderUp);
          bootCount--;
        }
        if (bootCount != true) {
          stateUpdate(4, 100);
          this.backupFileData.log.push("Bootloader wasn't detected");
          reject(errorMessage);
        }
      } catch (e) {
        this.backupFileData.log.push(`Reset keyboard: Error: ${e.message}`);
        // this.saveBackupFile();
        reject(e);
      }
    });
  }

  /**
   * Updates firmware of bootloader
   * @param {object} port - serial port object for the "path".
   * @param {string} filename - path to file with firmware.
   * @returns {promise}
   */
  async updateFirmware(filename, stateUpdate) {
    let focus = new Focus();
    console.log("Begin update firmware with NRf52833");
    console.log(JSON.stringify(focus));
    // this.backupFileData.log.push("Begin update firmware with NRf52833");
    this.backupFileData.firmwareFile = filename;
    return new Promise(async (resolve, reject) => {
      try {
        if (focus.closed) await focus.open(this.currentPort.path, this.currentPort.device);
        await NRf52833.flash(filename, stateUpdate, async (err, result) => {
          if (err) throw new Error(`Flash error ${result}`);
          else {
            stateUpdate(3, 70);
            console.log("End update firmware with NRf52833");
            // this.backupFileData.log.push("End update firmware with NRf52833");
            await this.delay(1500);
            await this.detectKeyboard();
            resolve();
          }
        });
      } catch (e) {
        this.backupFileData.log.push(e);
        reject(e);
      }
    });
  }

  /**
   * Detects keyboard after firmware of bootloader
   */
  async detectKeyboard() {
    const timeouts = 2500; //time to wait for keyboard
    const findTimes = 5;
    const errorMessage =
      "The firmware update has failed during the flashing process. Please unplug and replug the keyboard and try again";
    console.log("Waiting for keyboard");
    //wait until the bootloader serial port disconnects and the keyboard serial port reconnects
    const findKeyboard = async () => {
      return new Promise(async resolve => {
        await this.delay(timeouts);
        if (await this.foundDevices(Hardware.serial, "Keyboard detected", false)) {
          resolve(true);
        } else {
          resolve(false);
        }
      });
    };
    try {
      await this.runnerFindKeyboard(findKeyboard, findTimes, errorMessage);
    } catch (e) {
      console.error(`Detect keyboard: Error: ${e.message}`);
      throw e;
    }
  }

  /**
   * Runs the function several times
   * @param {function} findKeyboard - function that will run several times.
   * @param {number} times - how many times function runs.
   * @param {string} errorMessage - error message if error is.
   */
  async runnerFindKeyboard(findKeyboard, times, errorMessage) {
    if (!times) {
      console.error(errorMessage);
      return false;
    }
    if (await findKeyboard()) {
      console.log("Ready to restore");
      return true;
    } else {
      console.log(`Keyboard not detected, trying again for ${times} times`);
      await this.runnerFindKeyboard(findKeyboard, times - 1, errorMessage);
    }
  }

  /**
   * Restores settings to keyboard after bootloader flashing
   */
  async restoreSettings(backup) {
    let focus = new Focus();
    const errorMessage = "Firmware update failed, because the settings could not be restored";
    console.log(backup);
    if (backup === undefined || backup.length === 0) {
      await focus.open(this.currentPort.path, this.currentPort.device.info);
      return true;
    }
    try {
      await focus.open(this.currentPort.path, this.currentPort.device.info);
      for (let i = 0; i < backup.length; i++) {
        let val = backup[i].data;
        // Boolean values need to be sent as int
        if (typeof val === "boolean") {
          val = +val;
        }
        console.log(`Going to send ${backup[i].command} to keyboard`);
        await focus.command(`${backup[i].command} ${val}`.trim());
      }
      this.backupFileData.log.push("Restoring all settings");
      this.backupFileData.log.push("Firmware update OK");
      return true;
    } catch (e) {
      this.backupFileData.log.push(`Restore settings: Error: ${e.message}`);
      return false;
    }
  }
}
