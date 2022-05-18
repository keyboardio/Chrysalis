/* chrysalis-focus -- Chrysalis Focus protocol library
 * Copyright (C) 2018, 2019, 2020  Keyboardio, Inc.
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

const { ipcRenderer } = require("electron");
const { SerialPort } = require("serialport");
const { DelimiterParser } = require("@serialport/parser-delimiter");
import fs from "fs";

import Log from "../log";

global.chrysalis_focus_instance = null;

class Focus {
  constructor() {
    if (!global.chrysalis_focus_instance) {
      global.chrysalis_focus_instance = this;
      this.commands = {
        help: this._help,
      };
      this.timeout = 5000;
      this.debug = false;
      this.logger = new Log();
    }

    return global.chrysalis_focus_instance;
  }

  debugLog(...args) {
    if (!this.debug) return;
    this.logger.debug(...args);
  }

  async waitForSerialBootloader(device) {
    const delay = (ms) => new Promise((res) => setTimeout(res, ms));

    for (let attempt = 0; attempt < 10; attempt++) {
      let portList = await SerialPort.list();
      this.debugLog(
        "focus.waitForBootloader: portList:",
        portList,
        "device:",
        device
      );

      for (let port of portList) {
        const pid = parseInt("0x" + port.productId),
          vid = parseInt("0x" + port.vendorId),
          bootloader = device.usb.bootloader;

        if (pid == bootloader.productId && vid == bootloader.vendorId) {
          let newPort = Object.assign({}, port);
          newPort.device = device;
          newPort.device.bootloader = true;
          this.debugLog("focus.waitForBootloader: found!", newPort);
          return newPort;
        }
      }
      this.debugLog("focus.waitForBootloader: not found, waiting 2s");
      await delay(2000);
    }

    this.debugLog("focus.waitForBootloader: none found");
    return null;
  }

  async waitForDFUBootloader(device) {
    const delay = (ms) => new Promise((res) => setTimeout(res, ms));
    const bootloader = device.usb.bootloader;

    for (let attempt = 0; attempt < 10; attempt++) {
      const found = await ipcRenderer.invoke(
        "usb-scan-for-devices",
        bootloader.productId,
        bootloader.vendorId
      );
      if (found) {
        this.debugLog(
          "focus.waitForBootloader: found!",
          bootloader.ProductId,
          bootloader.vendorId
        );
        return true;
      }

      this.debugLog("focus.waitForBootloader: not found, waiting 2s");
      await delay(2000);
    }

    this.debugLog("focus.waitForBootloader: none found");
    return false;
  }

  async waitForBootloader(device) {
    this.debugLog("In waitForBootloader", device);
    if (!device.usb.bootloader) {
      this.debugLog("No bootloader defined in the device descriptor.");
      return null;
    }

    if (device.usb.bootloader.type == "dfu") {
      return await this.waitForDFUBootloader(device);
    } else {
      return await this.waitForSerialBootloader(device);
    }
  }

  async find(...devices) {
    let portList = await SerialPort.list();

    let found_devices = [];

    this.debugLog("focus.find: portList:", portList);

    for (let port of portList) {
      for (let device of devices) {
        const pid = parseInt("0x" + port.productId),
          vid = parseInt("0x" + port.vendorId);

        if (pid == device.usb.productId && vid == device.usb.vendorId) {
          let newPort = Object.assign({}, port);
          newPort.device = device;
          newPort.device.bootloader = false;
          found_devices.push(newPort);
        }
        if (
          device.usb.bootloader &&
          pid == device.usb.bootloader.productId &&
          vid == device.usb.bootloader.vendorId
        ) {
          let newPort = Object.assign({}, port);
          newPort.device = device;
          newPort.device.bootloader = true;
          found_devices.push(newPort);
        }
      }
    }

    // We do not wish to have the device SVG data appear in logs, that's not
    // useful information, and just clutters the log. So we filter them out.
    const logged_devices = found_devices.map((d) => {
      let device = Object.assign({}, d);
      device.device = Object.assign({}, d.device);
      delete device.device["components"];
      return device;
    });

    this.debugLog("focus.find: found_devices:", logged_devices);

    return found_devices;
  }

  async open(device, info) {
    if (typeof device == "string") {
      if (!info) throw new Error("Device descriptor argument is mandatory");
      this._port = new SerialPort({
        path: device,
        baudRate: 9600,
      });
    } else if (typeof device == "object") {
      if (device.hasOwnProperty("binding")) {
        if (!info) throw new Error("Device descriptor argument is mandatory");
        this._port = device;
      } else {
        let devices = await this.find(device);
        if (devices && devices.length >= 1) {
          this._port = new SerialPort({
            path: devices[0].path,
            baudRate: 9600,
          });
        }
        info = device;
      }
    } else {
      throw new Error("Invalid argument");
    }

    this.device = info;
    this.parser = this._port.pipe(new DelimiterParser({ delimiter: "\r\n" }));
    this.result = "";
    this.callbacks = [];
    this.parser.on("data", (data) => {
      data = data.toString("utf-8");
      this.debugLog("focus: incoming data:", data);

      if (data == ".") {
        let result = this.result,
          resolve = this.callbacks.shift();

        this.result = "";
        if (resolve) {
          resolve(result);
        }
      } else {
        if (this.result.length == 0) {
          this.result = data;
        } else {
          this.result += "\r\n" + data;
        }
      }
    });

    return this._port;
  }

  close() {
    if (this._port && this._port.isOpen) {
      this._port.close();
    }
    this._port = null;
    this.device = null;
  }

  async isDeviceAccessible(port) {
    if (process.platform !== "linux") return true;

    try {
      fs.accessSync(port.path, fs.constants.R_OK | fs.constants.W_OK);
    } catch (e) {
      return false;
    }
    return true;
  }

  async isDeviceSupported(port) {
    if (!port.device.isDeviceSupported) {
      return true;
    }
    const supported = await port.device.isDeviceSupported(port);
    this.debugLog(
      "focus.isDeviceSupported: port=",
      port,
      "supported=",
      supported
    );
    return supported;
  }

  async probe() {
    return await this.request("help");
  }

  async _write_parts(request) {
    for (let index = 0; index < request.length; index += 32) {
      this._port.write(request.slice(index, index + 32));
      await new Promise((timeout) => setTimeout(timeout, 50));
      await this._port.drain();
    }
  }

  request(cmd, ...args) {
    this.debugLog("focus.request:", cmd, ...args);
    return new Promise((resolve, reject) => {
      let timer = setTimeout(() => {
        reject("Communication timeout");
      }, this.timeout);
      this._request(cmd, ...args).then((data) => {
        clearTimeout(timer);
        resolve(data);
      });
    });
  }

  async _request(cmd, ...args) {
    if (!this._port) throw "Device not connected!";

    let request = cmd;
    if (args && args.length > 0) {
      request = request + " " + args.join(" ");
    }
    request += "\n";
    return new Promise((resolve) => {
      this.callbacks.push(resolve);
      if (process.platform == "darwin") {
        /*
         * On macOS, we need to stagger writes, otherwise we seem to overwhelm the
         * system, and the host will receive garbage. If we send in smaller
         * chunks, with a slight delay between them, we can avoid this problem.
         *
         * We may be able to do this smarter, if we figure out the rough chunk
         * size that is safe to send. That'd speed up writes on macOS. Until then,
         * we split at each space, and send tiny chunks.
         */
        this._write_parts(request);
      } else {
        this._port.write(request);
      }
    });
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

  async _help(s) {
    let data = await s.request("help");
    return data.split(/\r?\n/).filter((v) => v.length > 0);
  }

  eepromBackupCommands = [
    "keymap.custom",
    "settings.defaultLayer",
    "escape_oneshot.cancel_key",
    "keymap.onlyCustom",
    "keymap.default",
    "help",
    "plugins",
    "eeprom.contents",
    "eeprom.free",
    "settings.valid?",
    "settings.version",
    "settings.crc",
  ];
  eepromRestoreCommands = [
    "keymap.custom",
    "settings.defaultLayer",
    "escape_oneshot.cancel_key",
    "keymap.onlyCustom",
  ];
  async readKeyboardConfiguration(s) {
    let backup = {};
    for (const cmd of this.eepromBackupCommands) {
      const dump = await s.request(cmd);
      backup[cmd] = dump;
    }
    console.log(backup);

    //const key = ".internal." + uuidv4();
    // sessionStorage.setItem(key, JSON.stringify(backup));
    //return key;
  }
}

export default Focus;
