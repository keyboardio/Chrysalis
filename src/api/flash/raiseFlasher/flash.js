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
import { arduino } from "./arduino-flasher";

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
export class FlashRaise {
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
            : this.device.info.keyboardType == device.device.info.keyboardType && device.serialNumber.includes("raiseD")
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
    this.backupFileName = `Raise-backup-${this.formatedDate()}.json`;

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
      "The firmware update couldn't start because the Raise Bootloader wasn't found. Please check our Help Center for more details or schedule a video call with us.";
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
    console.log("Begin update firmware with arduino-flasher");
    console.log(JSON.stringify(focus));
    // this.backupFileData.log.push("Begin update firmware with arduino-flasher");
    this.backupFileData.firmwareFile = filename;
    return new Promise(async (resolve, reject) => {
      try {
        if (focus.closed) await focus.open(this.currentPort.path, this.currentPort.device, null);
        await arduino.flash(filename, stateUpdate, async (err, result) => {
          if (err) throw new Error(`Flash error ${result}`);
          else {
            stateUpdate(3, 70);
            console.log("End update firmware with arduino-flasher");
            // this.backupFileData.log.push("End update firmware with arduino-flasher");
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
  async restoreSettings() {
    let focus = new Focus();
    const errorMessage = "Firmware update failed, because the settings could not be restored";
    let backup = this.backup.backup;
    console.log(this.backup, backup);
    if (backup === undefined || backup.length === 0) {
      await focus.open(this.currentPort.path, this.currentPort.device.info, null);
      return true;
    }
    try {
      await focus.open(this.currentPort.path, this.currentPort.device.info, null);
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
