/* chrysalis-focus -- Chrysalis Focus protocol library
 * Copyright (C) 2018-2022  Keyboardio, Inc.
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
import { logger } from "@api/log";

import Colormap from "./focus/colormap";
import Macros from "./focus/macros";
import Keymap, { OnlyCustom } from "./focus/keymap";

global.chrysalis_focus_instance = null;

class Focus {
  constructor() {
    if (!global.chrysalis_focus_instance) {
      global.chrysalis_focus_instance = this;
      this.commands = {
        help: this._help,
      };
      this.timeout = 30000;
      this._supported_commands = [];
      this._plugins = [];
    }

    return global.chrysalis_focus_instance;
  }

  async waitForSerialDevice(focusDeviceDescriptor, usbInfo) {
    const delay = (ms) => new Promise((res) => setTimeout(res, ms));

    for (let attempt = 0; attempt < 10; attempt++) {
      const portList = await SerialPort.list();
      logger("focus").debug("serial port list obtained", {
        portList: portList,
        device: usbInfo,
        function: "waitForSerialDevice",
      });

      for (const port of portList) {
        const pid = parseInt("0x" + port.productId),
          vid = parseInt("0x" + port.vendorId);

        if (pid == usbInfo.productId && vid == usbInfo.vendorId) {
          const newPort = Object.assign({}, port);
          newPort.focusDeviceDescriptor = focusDeviceDescriptor;
          newPort.focusDeviceDescriptor.bootloader = true;
          logger("focus").info("serial port found", {
            port: newPort,
            function: "waitForSerialDevice",
          });
          return newPort;
        }
      }
      logger("focus").debug("serial device not found, waiting 2s", {
        function: "waitForSerialDevice",
      });
      await delay(2000);
    }

    logger("focus").warn("serial device not found after 10 attempts", {
      function: "waitForSerialDevice",
    });
    return null;
  }

  async waitForSerialBootloader(focusDeviceDescriptor) {
    return await this.waitForSerialDevice(
      focusDeviceDescriptor,
      focusDeviceDescriptor.usb.bootloader
    );
  }

  async waitForDFUBootloader(focusDeviceDescriptor) {
    const delay = (ms) => new Promise((res) => setTimeout(res, ms));
    const bootloader = focusDeviceDescriptor.usb.bootloader;

    for (let attempt = 0; attempt < 10; attempt++) {
      const found = await ipcRenderer.invoke(
        "usb.scan-for-devices",
        bootloader.productId,
        bootloader.vendorId
      );
      if (found) {
        logger("focus").info("bootloader found", {
          vid: bootloader.vendorId,
          pid: bootloader.productId,
          function: "waitForDFUBootloader",
        });
        return true;
      }

      logger("focus").debug("bootloader not found, waiting 2s", {
        function: "waitForDFUBootloader",
      });
      await delay(2000);
    }

    logger("focus").warn("bootloader not found after 10 attempts", {
      function: "waitForDFUBootloader",
    });
    return false;
  }

  async waitForBootloader(focusDeviceDescriptor) {
    if (!focusDeviceDescriptor.usb.bootloader) {
      this.logger.warn("No bootloader defined in the device descriptor", {
        descriptor: focusDeviceDescriptor,
      });
      return null;
    }
    logger("focus").info("waiting for bootloader", {
      descriptor: focusDeviceDescriptor,
    });

    if (focusDeviceDescriptor.usb.bootloader.type == "dfu") {
      return await this.waitForDFUBootloader(focusDeviceDescriptor);
    } else {
      return await this.waitForSerialBootloader(focusDeviceDescriptor);
    }
  }

  async reconnectToKeyboard(focusDeviceDescriptor) {
    logger("focus").info("reconnecting to keyboard", {
      descriptor: focusDeviceDescriptor,
    });
    const d = await this.waitForSerialDevice(
      focusDeviceDescriptor,
      focusDeviceDescriptor.usb
    );
    await this.open(d.path, d);
    await this.supported_commands();
    await this.plugins();
  }

  async find(...device_descriptors) {
    const portList = await SerialPort.list();

    const found_devices = [];

    logger("focus").debug("serial port list obtained", {
      portList: portList,
      function: "find",
    });

    for (const port of portList) {
      for (const device_descriptor of device_descriptors) {
        const pid = parseInt("0x" + port.productId),
          vid = parseInt("0x" + port.vendorId);

        if (
          pid == device_descriptor.usb.productId &&
          vid == device_descriptor.usb.vendorId
        ) {
          const newPort = Object.assign({}, port);
          newPort.focusDeviceDescriptor = device_descriptor;
          newPort.focusDeviceDescriptor.bootloader = false;
          found_devices.push(newPort);
        }
        if (
          device_descriptor.usb.bootloader &&
          pid == device_descriptor.usb.bootloader.productId &&
          vid == device_descriptor.usb.bootloader.vendorId
        ) {
          const newPort = Object.assign({}, port);
          newPort.focusDeviceDescriptor = device_descriptor;
          newPort.focusDeviceDescriptor.bootloader = true;
          found_devices.push(newPort);
        }
      }
    }

    // We do not wish to have the device SVG data appear in logs, that's not
    // useful information, and just clutters the log. So we filter them out.
    const logged_devices = found_devices.map((d) => {
      const device = Object.assign({}, d);
      device.focusDeviceDescriptor = Object.assign({}, d.focusDeviceDescriptor);
      delete device.focusDeviceDescriptor["components"];
      return device;
    });

    if (logged_devices.length > 0) {
      logger("focus").debug("supported devices found", {
        devices: logged_devices,
        function: "find",
      });
    } else {
      logger("focus").warn("no supported devices found", {
        function: "find",
      });
    }

    return found_devices;
  }

  async open(device_identifier, info) {
    if (typeof device_identifier == "string") {
      if (!info) throw new Error("Device descriptor argument is mandatory");
      this._port = new SerialPort({
        path: device_identifier,
        baudRate: 9600,
      });
    } else if (typeof device_identifier == "object") {
      if (device_identifier.hasOwnProperty("binding")) {
        if (!info) throw new Error("Device descriptor argument is mandatory");
        this._port = device_identifier;
      } else {
        const devices = await this.find(device_identifier);
        if (devices && devices.length >= 1) {
          this._port = new SerialPort({
            path: devices[0].path,
            baudRate: 9600,
          });
        }
        info = device_identifier;
      }
    } else {
      throw new Error("Invalid argument");
    }

    this.focusDeviceDescriptor = info;
    this.parser = this._port.pipe(new DelimiterParser({ delimiter: "\r\n" }));
    this.result = "";
    this.callbacks = [];
    this.parser.on("data", (data) => {
      data = data.toString("utf-8");
      logger("focus").verbose("incoming data", { data: data });

      if (data == ".") {
        const result = this.result,
          resolve = this.callbacks.shift();

        this.result = "";
        if (resolve) {
          resolve(result.trim());
        }
      } else {
        if (this.result.length == 0) {
          this.result = data;
        } else {
          this.result += "\r\n" + data;
        }
      }
    });

    this._supported_commands = [];
    this._plugins = [];
    return this._port;
  }

  close() {
    if (this._port && this._port.isOpen) {
      this._port.close();
    }
    this._port = null;
    this.focusDeviceDescriptor = null;
    this._supported_commands = [];
    this._plugins = [];
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
    if (!port.focusDeviceDescriptor.isDeviceSupported) {
      return true;
    }
    const supported = await port.focusDeviceDescriptor.isDeviceSupported(port);
    logger("focus").debug("isDeviceSupported?", {
      port: port,
      supported: supported,
    });
    return supported;
  }

  async supported_commands() {
    if (this._supported_commands.length == 0) {
      this._supported_commands = await this.request("help");
    }
    return this._supported_commands;
  }

  async plugins() {
    if (this._plugins.length == 0) {
      this._plugins = await this.request("plugins");
    }
    return this._plugins;
  }

  async _write_parts(request) {
    for (let index = 0; index < request.length; index += 32) {
      this._port.write(request.slice(index, index + 32));
      await new Promise((timeout) => setTimeout(timeout, 50));
      await this._port.drain();
    }
  }

  request(cmd, ...args) {
    if (
      this._supported_commands.length > 0 &&
      !this._supported_commands.includes(cmd)
    ) {
      logger("focus").verbose("request (noop)", {
        command: cmd,
        args: args,
      });
      return new Promise((resolve) => {
        resolve("");
      });
    }

    logger("focus").verbose("request", { command: cmd, args: args });
    return new Promise((resolve, reject) => {
      const timer = setTimeout(() => {
        logger("focus").error("Connection timeout");
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
      const tmp = this[methodName];
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
    const data = await s.request("help");
    return data.split(/\r?\n/).filter((v) => v.length > 0);
  }

  eepromRestoreCommands = [
    "keymap",
    "colormap",
    "settings.defaultLayer",
    "escape_oneshot.cancel_key",
    "idleleds.time_limit",
    "led.brightness",
    "led_mode.auto_save",
    "led_mode.default",
    "macros",
    "tapdance.map",
    "hostos.type",
    "autoshift.enabled",
    "autoshift.timeout",
    "autoshift.categories",
    "typingbreaks.idleTimeLimit",
    "typingbreaks.lockTimeOut",
    "typingbreaks.lockLength",
    "typingbreaks.leftMaxKeys",
    "typingbreaks.rightMaxKeys",
  ];

  eepromBackupCommands = [
    ...this.eepromRestoreCommands,
    "help",
    "plugins",
    "eeprom.contents",
    "eeprom.free",
    "settings.valid?",
    "settings.version",
    "settings.crc",
  ];
  async readKeyboardConfiguration() {
    const backup = {};
    for (const cmd of this.eepromBackupCommands) {
      const dump = await this.command(cmd);
      backup[cmd] = dump;
    }
    return backup;
  }
  async writeKeyboardConfiguration(backup) {
    for (const cmd of this.eepromRestoreCommands) {
      await this.command(cmd, backup[cmd]);
    }
  }
}

const focus = new Focus();
focus.addCommands({ colormap: new Colormap() });
focus.addMethod("setLayerSize", "colormap");
focus.addCommands({ macros: new Macros() });
focus.addCommands({
  keymap: new Keymap(),
  "keymap.onlyCustom": new OnlyCustom(),
});
focus.addMethod("setLayerSize", "keymap");

export default Focus;
