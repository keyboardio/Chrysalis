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

import fs from "fs";
import stream from "stream";

import { logger } from "@api/log";

import Colormap from "./focus/colormap";
import Macros from "./focus/macros";
import Keymap, { OnlyCustom } from "./focus/keymap";
import LayerNames from "./focus/layernames";

global.chrysalis_focus_instance = null;

const delay = (ms) => new Promise((res) => setTimeout(res, ms));

class FocusParser extends stream.Transform {
  constructor({ interval, ...transformOptions }) {
    super(transformOptions);

    if (!interval) {
      throw new TypeError('"interval" is required');
    }

    if (typeof interval !== "number" || Number.isNaN(interval)) {
      throw new TypeError('"interval" is not a number');
    }

    if (interval < 1) {
      throw new TypeError('"interval" is not greater than 0');
    }

    this.interval = interval;
    this.stopSignal = Buffer.from("\r\n.\r\n");
    this.buffer = Buffer.alloc(0);
  }

  startTimer() {
    this.endTimer();
    this.timerId = setTimeout(() => {
      this.emit("timeout");
    }, this.interval);
  }

  endTimer() {
    if (this.timerId) {
      clearTimeout(this.timerId);
      this.timerId = null;
    }
  }

  _transform(chunk, encoding, cb) {
    this.endTimer();

    let data = Buffer.concat([this.buffer, chunk]);
    let position;
    while ((position = data.indexOf(this.stopSignal)) !== -1) {
      const pushData = data.slice(0, position);
      if (pushData.length == 0) {
        this.push(".");
      } else {
        this.push(pushData);
      }
      data = data.slice(position + this.stopSignal.length);
    }
    this.buffer = data;

    if (this.buffer.length != 0) {
      this.startTimer();
    }
    cb();
  }

  _flush(cb) {
    this.push(this.buffer);
    this.buffer = Buffer.alloc(0);
    cb;
  }
}

class Focus {
  constructor() {
    if (!global.chrysalis_focus_instance) {
      global.chrysalis_focus_instance = this;
      this.commands = {
        help: this._help,
      };
      this.timeout = 30000;
      this.resetDeviceState();
      this._request_id = 0;
      this.chunked_writes = true;
    }

    return global.chrysalis_focus_instance;
  }

  resetDeviceState() {
    this._supported_commands = [];
    this._plugins = [];
  }

  async checkSerialDevice(focusDeviceDescriptor, usbInfo) {
    const portList = await SerialPort.list();
    logger("focus").debug("serial port list obtained", {
      portList: portList,
      device: usbInfo,
      function: "checkForSerialDevice",
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
          device: usbInfo,
          function: "checkForSerialDevice",
        });
        return newPort;
      }
    }
    logger("focus").debug("serial device not found", {
      function: "checkForSerialDevice",
      device: usbInfo,
    });

    return null;
  }

  async checkSerialBootloader(focusDeviceDescriptor) {
    return await this.checkSerialDevice(
      focusDeviceDescriptor,
      focusDeviceDescriptor.usb.bootloader
    );
  }

  async checkNonSerialBootloader(focusDeviceDescriptor) {
    const bootloader = focusDeviceDescriptor.usb.bootloader;

    const deviceList = await ipcRenderer.invoke(
      "usb.scan-for-devices",
      bootloader.productId,
      bootloader.vendorId
    );

    for (const device of deviceList) {
      const pid = device.deviceDescriptor.idProduct,
        vid = device.deviceDescriptor.idVendor;

      if (pid == bootloader.productId && vid == bootloader.vendorId) {
        const newPort = Object.assign({}, device);
        newPort.focusDeviceDescriptor = focusDeviceDescriptor;
        newPort.focusDeviceDescriptor.bootloader = true;

        logger("focus").info("bootloader found", {
          device: bootloader,
          function: "checkNonSerialBootloader",
        });
        return newPort;
      }
    }

    logger("focus").debug("bootloader not found", {
      function: "checkNonSerialBootloader",
      device: bootloader,
    });

    return null;
  }

  async checkBootloader(focusDeviceDescriptor) {
    if (!focusDeviceDescriptor.usb.bootloader) {
      logger().warn("No bootloader defined in the device descriptor", {
        descriptor: focusDeviceDescriptor,
      });
      return false;
    }
    logger("focus").info("checking bootloader presence", {
      descriptor: focusDeviceDescriptor,
    });

    if (focusDeviceDescriptor.usb.bootloader.protocol !== "avr109") {
      return await this.checkNonSerialBootloader(focusDeviceDescriptor);
    } else {
      return await this.checkSerialBootloader(focusDeviceDescriptor);
    }
  }

  async reconnectToKeyboard(focusDeviceDescriptor) {
    logger("focus").info("reconnecting to keyboard", {
      descriptor: focusDeviceDescriptor,
    });
    const usbDeviceDescriptor = await this.checkSerialDevice(
      focusDeviceDescriptor,
      focusDeviceDescriptor.usb
    );
    if (!usbDeviceDescriptor) return false;

    await this.open(usbDeviceDescriptor.path, usbDeviceDescriptor);
    await this.supported_commands();
    await this.plugins();

    return true;
  }

  async reboot(withDeviceReset) {
    const port = this._port;

    const timeouts = {
      dtrToggle: 500, // Time to wait (ms) between toggling DTR
    };

    const baudUpdate = () => {
      return new Promise((resolve) => {
        logger("focus").debug("reboot: baud update");
        port.update({ baudRate: 1200 }, async () => {
          await delay(timeouts.dtrToggle);
          resolve();
        });
      });
    };

    const dtrToggle = (state) => {
      return new Promise((resolve) => {
        logger("focus").debug(`reboot: dtr ${state ? "on" : "off"}`);
        port.set({ dtr: state }, async () => {
          await delay(timeouts.dtrToggle);
          resolve();
        });
      });
    };

    // If the device supports the `device.reset` command, try doing that first.
    // We're intentionally not using `supported_commands()`, because that
    // introduces needless traffic every time we try to reboot.
    if (withDeviceReset) {
      try {
        await this._request("device.reset");
      } catch (e) {
        // If there's a comms timeout, that's exactly what we want. the keyboard is rebooting.
        if ("Device disconnected" !== e) {
          logger("focus").error("Error while calling `device.reset`", {
            error: e,
          });
          throw e;
        } else {
          // If device.reset made the keyboard disconnect, then mission
          // accomplished, we can move on, and do not need to do the 1200 baud
          // tickle.
          return;
        }
      }
    }

    // If we reach this point, then either `device.reset` isn't available, or it
    // failed to reboot the device. Try the 1200 baud tickle.
    await baudUpdate();
    await dtrToggle(true);
    await dtrToggle(false);
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

  isInApplicationMode() {
    if (
      !this.focusDeviceDescriptor ||
      this.focusDeviceDescriptor.bootloader == true
    ) {
      return false;
    } else {
      return true;
    }
  }

  async open(device_identifier, info) {
    if (typeof device_identifier == "string") {
      if (!info) throw new Error("Device descriptor argument is mandatory");
      this._port = new SerialPort({
        path: device_identifier,
        baudRate: 9600,
        autoOpen: false,
      });
      try {
        await this._port.open();
      } catch (error) {
        logger("focus").error("Error opening serial port", { error });
        delete this._port;
        throw new Error("Unable to connect");
      }
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
    this._parser = this._port.pipe(new FocusParser({ interval: this.timeout }));

    this.callbacks = [];
    this._parser.on("data", (data) => {
      data = data.toString("utf-8");
      logger("focus").debug("incoming data", { data: data });

      /*
       * Chrysalis tries its best to serialize requests and responses, but under
       * some circumstances (more on that later), we can end up with receiving
       * data out of band. When that happened, and we did not have a callback
       * set - which we didn't -, then our `data` event handler ended up
       * erroring, which bubbled up as an unhandled exception.
       *
       * This was most noticeable when upgrading a 0.10.4 (or earlier) firmware
       * on a Keyboardio Atreus to 0.11 or later. We dropped one layer in 0.11,
       * so when upgrading and restoring layers, Chrysalis sent a 480 item
       * keymap to the firmware, but the firmware replied with a `.` after 432
       * items. This - for reasons I do not understand at this time - resulted
       * in Chrysalis emitting a number empty responses, not just one, thus,
       * triggering the scenario where we were missing callbacks.
       *
       * In this particular scenario, dropping the data is fine, the keyboard
       * does the right thing, and once we have a callback, things will line up
       * again, and we're all good. I have not found another way to trigger the
       * issue, so I believe that this workaround is safe, but Chrysalis will
       * log it nevertheless, so if it ends up causing issues later, we'll know.
       *
       * TODO(anyone): Figure out *why* we receive multiple end of data markers,
       * and fix the root cause.
       */
      if (this.callbacks.length == 0) {
        logger("focus").warn(
          "Input received while no callbacks are present. Discarding.",
          { data }
        );
        return;
      }
      const [resolve] = this.callbacks.shift();
      this._parser.endTimer();
      if (data == ".") {
        resolve();
      } else {
        resolve(data.trim());
      }
    });
    this._parser.on("timeout", () => {
      while (this.callbacks.length > 0) {
        const [_, reject] = this.callbacks.shift();
        reject("Communication timeout");
      }
      this.close();
    });
    this._port.on("close", (error) => {
      if (this._parser) {
        this._parser.endTimer();
      }
      while (this.callbacks.length > 0) {
        const [_, reject] = this.callbacks.shift();
        reject("Device disconnected");
      }
    });

    this.resetDeviceState();
    return this._port;
  }

  close() {
    if (this._port && this._port.isOpen) {
      this._port.close();
    }
    this._port = null;
    this._parser = null;
    this.focusDeviceDescriptor = null;
    this.resetDeviceState();
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
    }
  }

  request(cmd, ...args) {
    if (!this.isInApplicationMode()) return undefined;

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

    const rid = this._request_id;
    this._request_id += 1;
    logger("focus").verbose("request", {
      request: {
        id: rid,
        command: cmd,
        args: args,
      },
    });

    return new Promise((resolve, reject) => {
      this._request(cmd, ...args)
        .then((data) => {
          logger("focus").verbose("response", {
            request: {
              id: rid,
              command: cmd,
              args: args,
            },
            response: data,
          });
          resolve(data);
        })
        .catch((error) => {
          logger("focus").error("request timed out", {
            request: {
              id: rid,
              command: cmd,
              args: args,
            },
            error: error,
          });
          reject("Communication timeout");
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

    // TODO(anyone): This is a temporary measure until #985 gets fixed.
    await delay(250);

    return new Promise((resolve, reject) => {
      this._parser.startTimer();
      this.callbacks.push([resolve, reject]);
      if (this.chunked_writes) {
        /*
         * For (mostly, hopefully) historical reasons, we default to writing
         * data to the keyboard in 32-byte chunks, for two reasons: as a
         * workaround for early Model 100 firmware that had problems accepting
         * larger sets of data, and as a workaround for a protocol desync issue
         * that we only ever saw on macOS, and never found the root cause of.
         *
         * Until we know better, that's still the default, and this chunking is
         * what we do here.
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
    "autoshift.categories",
    "autoshift.timeout",
    "colormap.map",
    "escape_oneshot.cancel_key",
    "hardware.keyscan",
    "hardware.side_power",
    "hardware.sled_current",
    "hostos.type",
    "idleleds.time_limit",
    "keymap.custom",
    "keymap.layerNames",
    "keymap.onlyCustom",
    "led.brightness",
    "led_mode.default",
    "macros.map",
    "mousekeys.accel_duration",
    "mousekeys.base_speed",
    "mousekeys.init_speed",
    "mousekeys.scroll_interval",
    "oneshot.auto_layers",
    "oneshot.auto_mods",
    "oneshot.double_tap_timeout",
    "oneshot.hold_timeout",
    "oneshot.stickable_keys",
    "oneshot.timeout",
    "palette",
    "settings.defaultLayer",
    "spacecadet.mode",
    "spacecadet.timeout",
    "tapdance.map",
    "typingbreaks.idleTimeLimit",
    "typingbreaks.leftMaxKeys",
    "typingbreaks.lockLength",
    "typingbreaks.lockTimeOut",
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
focus.addCommands({ layernames: new LayerNames() });
focus.addCommands({ macros: new Macros() });
focus.addCommands({
  keymap: new Keymap(),
  "keymap.onlyCustom": new OnlyCustom(),
});
focus.addMethod("setLayerSize", "keymap");

export default Focus;
