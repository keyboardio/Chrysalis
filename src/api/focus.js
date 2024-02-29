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
import logger from "@renderer/utils/Logger";
import Colormap from "./focus/colormap";
import Keymap, { OnlyCustom } from "./focus/keymap";
import LayerNames from "./focus/layernames";
import Macros from "./focus/macros";

global.chrysalis_focus_instance = null;

export const delay = (ms) => new Promise((res) => setTimeout(res, ms));

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
      this._requestQueue = [];
      this._processingRequest = false;
    }

    return global.chrysalis_focus_instance;
  }

  resetDeviceState() {
    this._supported_commands = [];
    this._plugins = [];
    this._requestQueue = [];
    this._processingRequest = false;
  }

  async checkSerialDevice(focusDeviceDescriptor, usbInfo) {
    logger.log("in checkSerialDevice", focusDeviceDescriptor, usbInfo);
    const portList = await navigator.serial.getPorts();
    logger.log("portList", portList);
    logger.debug("serial port list obtained", {
      portList: portList,
      device: usbInfo,
      function: "checkForSerialDevice",
    });

    for (const port of portList) {
      const pid = port.productId;
      const vid = port.vendorId;

      if (pid == usbInfo.productId && vid == usbInfo.vendorId) {
        const newPort = Object.assign({}, port);
        newPort.focusDeviceDescriptor = focusDeviceDescriptor;
        newPort.focusDeviceDescriptor.bootloader = true;
        logger.info("serial port found", {
          port: newPort,
          device: usbInfo,
          function: "checkForSerialDevice",
        });
        return newPort;
      }
    }
    logger.debug("serial device not found", {
      function: "checkForSerialDevice",
      device: usbInfo,
    });

    return null;
  }

  async checkSerialBootloader(focusDeviceDescriptor) {
    return await this.checkSerialDevice(focusDeviceDescriptor, focusDeviceDescriptor.usb.bootloader);
  }

  async checkNonSerialBootloader(focusDeviceDescriptor) {
    const bootloader = focusDeviceDescriptor.usb.bootloader;

    const deviceList = navigator.usb.getDevices();

    for (const device of deviceList) {
      const pid = device.deviceDescriptor.idProduct,
        vid = device.deviceDescriptor.idVendor;

      if (pid == bootloader.productId && vid == bootloader.vendorId) {
        const newPort = Object.assign({}, device);
        newPort.focusDeviceDescriptor = focusDeviceDescriptor;
        newPort.focusDeviceDescriptor.bootloader = true;

        logger.info("bootloader found", {
          device: bootloader,
          function: "checkNonSerialBootloader",
        });
        return newPort;
      }
    }

    logger.debug("bootloader not found", {
      function: "checkNonSerialBootloader",
      device: bootloader,
    });

    return null;
  }

  async checkBootloader(focusDeviceDescriptor) {
    logger.log("in checkBootloader", focusDeviceDescriptor);
    if (!focusDeviceDescriptor.usb.bootloader) {
      logger.warn("No bootloader defined in the device descriptor", {
        descriptor: focusDeviceDescriptor,
      });
      return false;
    }
    logger.info("checking bootloader presence", {
      descriptor: focusDeviceDescriptor,
    });

    if (focusDeviceDescriptor.usb.bootloader.protocol !== "avr109") {
      logger.log("checking a non-serial bootloader");
      return await this.checkNonSerialBootloader(focusDeviceDescriptor);
    } else {
      logger.log("Checking a serial bootloader");
      return await this.checkSerialBootloader(focusDeviceDescriptor);
    }
  }

  async reconnectToKeyboard(focusDeviceDescriptor) {
    logger.info("reconnecting to keyboard", {
      descriptor: focusDeviceDescriptor,
    });
    const usbDeviceDescriptor = await this.checkSerialDevice(focusDeviceDescriptor, focusDeviceDescriptor.usb);
    if (!usbDeviceDescriptor) return false;

    await this.open(usbDeviceDescriptor.path, usbDeviceDescriptor);
    await this.supported_commands();
    await this.plugins();

    return true;
  }

  async closePort() {
    // Attempt to cancel and release any existing reader locks
    if (this._port.readable && this._port.readable.locked) {
      const reader = this._port.readable.getReader();
      await reader.cancel();
      reader.releaseLock();
    }

    // Attempt to close and release any existing writer locks
    if (this._port.writable && this._port.writable.locked) {
      const writer = this._port.writable.getWriter();
      await writer.close();
      writer.releaseLock();
    }

    try {
      await this._port.close();
    } catch (error) {
      logger.error("Failed to safely close the port:", error);
    }
  }

  async reboot(withDeviceReset) {
    const port = this._port;

    const timeouts = {
      dtrToggle: 500, // Time to wait (ms) between toggling DTR
    };

    const baudUpdate = async () => {
      logger.debug("reboot: baud update");
      await this.closePort();

      await port.open({ baudRate: 1200 });
      await delay(timeouts.dtrToggle);
    };

    const dtrToggle = async (state) => {
      logger.debug(`reboot: dtr ${state ? "on" : "off"}`);

      await port.setSignals({ dataTerminalReady: state });
      await delay(timeouts.dtrToggle);
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
          logger.error("Error while calling `device.reset`", {
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
    try {
      await baudUpdate();
      await dtrToggle(true);
      await dtrToggle(false);
    } catch (e) {
      logger.log("Unable to baud-update and dtr toggle. This is probably because the orginal reboot worked", e);
    }
  }

  async find(...device_descriptors) {
    // This will only show devices the user has previously authorized.
    logger.log("in focus.find");
    const portList = await navigator.serial.getPorts();

    logger.log("portList", portList);
    const found_devices = [];

    logger.debug("serial port list obtained", {
      portList: portList,
      function: "find",
    });

    for (const port of portList) {
      for (const device_descriptor of device_descriptors) {
        const pid = port.productId;
        const vid = port.vendorId;

        if (pid == device_descriptor.usb.productId && vid == device_descriptor.usb.vendorId) {
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
      logger.debug("supported devices found", {
        devices: logged_devices,
        function: "find",
      });
    } else {
      logger.warn("no supported devices found", {
        function: "find",
      });
    }

    return found_devices;
  }

  isInApplicationMode() {
    if (!this.focusDeviceDescriptor || this.focusDeviceDescriptor.bootloader == true) {
      return false;
    } else {
      return true;
    }
  }

  async open(port, deviceDescriptor) {
    this._port = port;
    if (!deviceDescriptor) throw new Error("Device descriptor argument is mandatory");

    const info = this._port.getInfo();

    const dVid = info.usbVendorId;
    const dPid = info.usbProductId;

    if (
      deviceDescriptor.usb.bootloader &&
      dPid == deviceDescriptor.usb.bootloader.productId &&
      dVid == deviceDescriptor.usb.bootloader.vendorId
    ) {
      deviceDescriptor.bootloader = true;
    }
    this.focusDeviceDescriptor = deviceDescriptor;

    this.resetDeviceState();
    return this._port;
  }

  async close() {
    await this.closePort();
    this._port = null;
    this._parser = null;
    this.focusDeviceDescriptor = null;
    this.resetDeviceState();
  }

  async isDeviceAccessible(port) {
    if (port?.readable && port?.writable) {
      return true;
    }
    return false; // TODO
  }

  async isDeviceSupported(port) {
    if (!port.focusDeviceDescriptor.isDeviceSupported) {
      return true;
    }
    const supported = await port.focusDeviceDescriptor.isDeviceSupported(port);
    logger.debug("isDeviceSupported?", {
      port: port,
      supported: supported,
    });
    return supported;
  }

  supported_commands() {
    if (this._supported_commands?.length == 0) {
      // _request to do it immediately to avoid a race
      this._supported_commands = this._request("help");
    }
    return this._supported_commands;
  }

  async plugins() {
    if (this._plugins.length == 0) {
      this._plugins = await this.request("plugins");
    }
    return this._plugins;
  }

  request(cmd, ...args) {
    if (!this.isInApplicationMode()) return undefined;

    if (this._supported_commands?.length > 0 && !this._supported_commands.includes(cmd)) {
      logger.debug("request (noop)", {
        command: cmd,
        args: args,
      });
      return new Promise((resolve) => {
        resolve("");
      });
    }

    const rid = this._request_id;
    this._request_id += 1;
    logger.debug("request", {
      request: {
        id: rid,
        command: cmd,
        args: args,
      },
    });

    return this._request(cmd, ...args);
  }

  async _processQueue() {
    if (this._processingRequest || this._requestQueue.length === 0) return;
    this._processingRequest = true;

    const { cmd, args, resolve } = this._requestQueue.shift();

    try {
      const response = await this._sendRequest(cmd, args);
      resolve(response);
    } catch (error) {
      logger.log("Error", error);
    } finally {
      this._processingRequest = false;
      this._processQueue(); // Check if there are more requests to process
    }
  }

  _request(cmd, ...args) {
    return new Promise((resolve) => {
      this._requestQueue.push({ cmd, args, resolve });
      this._processQueue();
    });
  }

  async _sendRequest(cmd, args) {
    if (!this._port) throw "Device not connected!";

    let request = cmd;
    if (args && args.length > 0) {
      request = request + " " + args.join(" ");
    }
    request += "\n";

    // TODO(anyone): This is a temporary measure until #985 gets fixed.
    await delay(250);
    logger.debug("Making a request", request);

    // Send a line of text
    const encoder = new TextEncoder();
    const writer = this._port.writable.getWriter();
    const data = encoder.encode(request);
    await writer.write(data);
    writer.releaseLock();
    let response = "";

    // Read the response up to a single line containing only a .
    const decoder = new TextDecoder();
    const reader = this._port.readable.getReader();
    try {
      // eslint-disable-next-line no-constant-condition
      while (true) {
        const { value, done } = await reader.read();
        if (value) {
          response += decoder.decode(value);
        }
        if (done) break;

        if (response.endsWith("\r\n.\r\n")) {
          response = response.slice(0, -5); // Remove the trailing \r\n.\r\n
          break;
        }
      }
    } finally {
      logger.debug("Returning response", response);
      reader.releaseLock();
    }

    response = response.trim();
    return response; // Return the response string
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
    "version",
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
