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

import SerialPort from "serialport";
import Delimiter from "@serialport/parser-delimiter";
import fs from "fs";

global.chrysalis_focus_instance = null;

class Focus {
  constructor() {
    if (!global.chrysalis_focus_instance) {
      global.chrysalis_focus_instance = this;
      this.commands = {
        help: this._help
      };
      this.timeout = 5000;
      this.debug = false;
    }

    return global.chrysalis_focus_instance;
  }

  debugLog(...args) {
    if (!this.debug) return;
    console.log(...args);
  }

  async waitForBootloader(device) {
    if (!device.usb.bootloader) {
      this.debugLog("No bootloader defined in the device descriptor.");
      return null;
    }

    const delay = ms => new Promise(res => setTimeout(res, ms));

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

  async find(...devices) {
    let portList = await SerialPort.list();

    let found_devices = [];

    this.debugLog("focus.find: portList:", portList, "devices:", devices);

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

    this.debugLog("focus.find: found_devices:", found_devices);

    return found_devices;
  }

  async open(device, info) {
    if (typeof device == "string") {
      if (!info) throw new Error("Device descriptor argument is mandatory");
      this._port = new SerialPort(device);
    } else if (typeof device == "object") {
      if (device.hasOwnProperty("binding")) {
        if (!info) throw new Error("Device descriptor argument is mandatory");
        this._port = device;
      } else {
        let devices = await this.find(device);
        if (devices && devices.length >= 1) {
          this._port = new SerialPort(devices[0].path);
        }
        info = device;
      }
    } else {
      throw new Error("Invalid argument");
    }

    this.device = info;
    this.parser = this._port.pipe(new Delimiter({ delimiter: "\r\n" }));
    this.result = "";
    this.callbacks = [];
    this.parser.on("data", data => {
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

  async _write_parts(parts, cb) {
    if (!parts || parts.length == 0) {
      cb();
      return;
    }

    let part = parts.shift();
    part += " ";
    this._port.write(part);
    this._port.drain(async () => {
      await this._write_parts(parts, cb);
    });
  }

  request(cmd, ...args) {
    this.debugLog("focus.request:", cmd, ...args);
    return new Promise((resolve, reject) => {
      let timer = setTimeout(() => {
        reject("Communication timeout");
      }, this.timeout);
      this._request(cmd, ...args).then(data => {
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

    if (process.platform == "darwin") {
      let parts = request.split(" ");
      return new Promise(resolve => {
        setTimeout(async () => {
          await this._port.flush();
          this.callbacks.push(resolve);
          await this._write_parts(parts, () => {});
        }, 500);
      });
    } else {
      return new Promise(resolve => {
        this.callbacks.push(resolve);
        this._port.write(request);
      });
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

  async _help(s) {
    let data = await s.request("help");
    return data.split(/\r?\n/).filter(v => v.length > 0);
  }
}

export default Focus;
