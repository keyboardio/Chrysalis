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

import SerialPort from "serialport";
import Delimiter from "@serialport/parser-delimiter";
import fs from "fs";
import { spawn } from "child_process";
import { inspect } from "util";

global.focus_instance = null;

class Focus {
  constructor() {
    this.delay = ms => new Promise(res => setTimeout(res, ms));
    if (!global.focus_instance) {
      global.focus_instance = this;
      this.commands = {
        help: this._help
      };
      this.timeout = 5000;
      this.debug = false;
      this.closed = true;
      this.file = false;
    }
    return global.focus_instance;
  }

  debugLog(...args) {
    if (!this.debug) return;
    console.log(...args);
  }

  async find(...devices) {
    let portList = await SerialPort.list();

    let found_devices = [];

    this.debugLog("focus.find: portList:", portList, "devices:", devices);

    for (let port of portList) {
      for (let device of devices) {
        if (parseInt("0x" + port.productId) == device.usb.productId && parseInt("0x" + port.vendorId) == device.usb.vendorId) {
          let newPort = Object.assign({}, port);
          newPort.device = device;
          found_devices.push(newPort);
        }
      }
    }

    this.debugLog("focus.find: found_devices:", found_devices);

    return found_devices;
  }

  async fileOpen(info, file) {
    // console.log("DATA!!", info, file);
    this.device = file.device;
    this.result = "";
    this.callbacks = [];
    this.closed = false;
    this.file = true;
    this.fileData = file;
    this.supportedCommands = await this.command("help");
  }

  async open(device, info, file) {
    if (file !== null) {
      await this.fileOpen(info, file);
      return true;
    }

    console.warn("Warning! device being opened", device.isOpen, device, info);
    let count = 0;
    while (device._eventsCount < 5 && count < 8) {
      console.log("waiting for device");
      await this.delay(250);
      count++;
    }
    if (count == 8) return;
    if (typeof device == "string") {
      if (!info) throw new Error("Device descriptor argument is mandatory");
      this._port = new SerialPort(
        device,
        {
          baudRate: 115200,
          lock: true
        },
        err => {
          if (err !== null) {
            console.error(err);
          }
        }
      );
    } else if (typeof device == "object") {
      if (device.hasOwnProperty("binding")) {
        if (!info) throw new Error("Device descriptor argument is mandatory");
        const path = device.path;
        await device.close();
        this._port = new SerialPort(
          path,
          {
            baudRate: 115200,
            lock: true
          },
          err => {
            if (err !== null) {
              console.error(err);
            }
          }
        );
      } else {
        let devices = await this.find(device);
        if (devices && devices.length >= 1) {
          this._port = new SerialPort(
            devices[0].path,
            {
              baudRate: 115200,
              lock: true
            },
            err => {
              if (err !== null) {
                console.error(err);
              }
            }
          );
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
    this.supportedCommands = [];
    this.parser.on("data", data => {
      data = data.toString("utf-8");
      this.debugLog("focus: incoming data:", data);

      if (data == "." || data.endsWith(".")) {
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

    if (process.platform == "darwin") {
      await spawn("stty", ["-f", this._port.path, "clocal"]);
    }

    // It's not necessary to retreive the supported commands in bootloader mode
    if (!this.device.bootloader) {
      try {
        this.supportedCommands = await this.command("help");
      } catch (e) {
        console.warn(e);
        // Ignore
      }
    }

    // Setup close port alert
    this._port.on("close", function (error) {
      if (error !== null && error.disconnected === true) {
        console.error("Error: device disconnected without control");
        this.closed = true;
      } else {
        console.warn("Warning: device disconnected by user interaction");
        this.closed = true;
      }
    });
    // Setup error port alert
    this._port.on("error", function (err) {
      console.error("Error on SerialPort: " + err);
    });
    this.closed = false;
    return this._port;
  }

  async close() {
    // if (this._port) {
    //   console.log("closing port data >>");
    //   console.log(inspect(this._port));
    //   console.log(this._port._eventsCount);
    //   console.log(
    //     "Port State: ",
    //     this._port ? this._port.isOpen : "unable to open"
    //   );
    // }
    try {
      console.log("CLOSING!!", this._port);
      if (this._port && this._port.isOpen) {
        await this._port.close();
      }
    } catch (error) {
      console.log(error);
    }

    this.result = "";
    this.callbacks = [];
    this._port = null;
    this.device = null;
    this.supportedCommands = [];
    this.closed = true;
    this.file = false;
    this.fileData = null;
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
    this.debugLog("focus.isDeviceSupported: port=", port, "supported=", supported);
    return supported;
  }

  isCommandSupported(cmd) {
    return this.supportedCommands.indexOf(cmd) != -1;
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
    console.log("performing request");
    if (this.file === true) {
      if (args.length > 0 && this.fileData.virtual[cmd].eraseable) {
        this.fileData.virtual[cmd].data = args.join(" ");
      }
      console.log("reading data");
      console.log(this.fileData.virtual[cmd].data);
      return this.fileData.virtual[cmd].data;
    }
    if (!this._port) throw "Device not connected!";

    let request = cmd;
    if (args && args.length > 0) {
      request = request + " " + args.join(" ");
    }
    request += "\n";

    return new Promise(resolve => {
      this.callbacks.push(resolve);
      this._port.write(request);
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
    return data.split(/\r?\n/).filter(v => v.length > 0);
  }
}

export default Focus;
