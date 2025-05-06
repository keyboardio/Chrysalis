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
      this._request_id = 0;
      this.chunked_writes = true;
      this.in_bootloader = false;
      this._reader = null;  // Track the current reader
      this._writer = null;  // Track the current writer

      this.resetDeviceState();
    }

    return global.chrysalis_focus_instance;
  }

  resetDeviceState() {
    logger.debug("Resetting device state");
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

  async releaseLocks() {
    // If port is not defined, nothing to do
    if (!this._port) {
      logger.debug("[Focus.releaseLocks] No port to release locks from");
      return;
    }

    // Helper function to safely release stream locks
    const releaseStreamLock = async (stream, type, currentLocker /* reader or writer */) => {
      if (!stream) {
        logger.debug(`[Focus.releaseLocks] No ${type} stream to release lock from`);
        return;
      }

      if (!stream.locked) {
        logger.debug(`[Focus.releaseLocks] ${type} stream is not locked, nothing to release`);
        // If the stream isn't locked, ensure our tracked locker is null
        if (type === 'readable') this._reader = null;
        if (type === 'writable') this._writer = null;
        return;
      }

      // If stream is locked, we MUST have a tracked locker (reader/writer)
      if (!currentLocker) {
          logger.error(`[Focus.releaseLocks] ${type} stream is locked, but no ${type} locker was tracked. Cannot release lock.`);
          // We cannot get a new reader/writer here as it would throw the error we're seeing.
          // This indicates a logic error elsewhere where a lock was acquired without tracking.
          return; 
      }

      logger.debug(`[Focus.releaseLocks] Attempting to release lock for ${type} stream using tracked locker.`);
      try {
        // Use the tracked reader/writer to cancel and release the lock
        logger.debug(`[Focus.releaseLocks] Canceling ${type} stream via tracked locker`);
        await currentLocker.cancel(); 
      } catch (cancelError) {
        // Log cancel errors, but proceed to releaseLock
        logger.warn(`[Focus.releaseLocks] Error canceling ${type} stream:`, cancelError);
      } finally {
        try {
          logger.debug(`[Focus.releaseLocks] Releasing ${type} stream lock via tracked locker`);
          currentLocker.releaseLock();
        } catch (releaseError) {
            logger.error(`[Focus.releaseLocks] Error releasing ${type} stream lock:`, releaseError);
        }
      }
    };

    // Release readable stream lock
    logger.debug("[Focus.releaseLocks] Releasing readable stream lock...");
    await releaseStreamLock(this._port?.readable, 'readable', this._reader);
    this._reader = null; // Ensure tracked reader is cleared
    

    // Release writable stream lock
    logger.debug("[Focus.releaseLocks] Releasing writable stream lock...");
    await releaseStreamLock(this._port?.writable, 'writable', this._writer);
    this._writer = null; // Ensure tracked writer is cleared

    logger.debug("[Focus.releaseLocks] Finished releasing locks.");
  }

  async closePort() {
    // If port is not defined, nothing to close
    if (!this._port) {
      return;
    }

    // First release any locks
    await this.releaseLocks();

    try {
      // Then close the port
      await this._port.close();
      this._port = null;
    } catch (error) {
      logger.error("Failed to safely close the port:", error);
      // Still clear the port reference even if close fails
      this._port = null;
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

  isInApplicationMode() {
    if (!this.focusDeviceDescriptor || this.in_bootloader == true) {
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

    // Check if device is in bootloader mode
    let in_bootloader = false;

    // Check bootloaders array first
    if (deviceDescriptor.usb?.bootloaders) {
      in_bootloader = deviceDescriptor.usb.bootloaders.some(
        (bootloader) => dPid === bootloader.productId && dVid === bootloader.vendorId
      );
    }

    // If not found in bootloaders array, check legacy bootloader configuration
    if (!in_bootloader && deviceDescriptor.usb?.bootloader) {
      in_bootloader =
        dPid === deviceDescriptor.usb.bootloader.productId && dVid === deviceDescriptor.usb.bootloader.vendorId;
    }

    this.in_bootloader = in_bootloader;
    this.focusDeviceDescriptor = deviceDescriptor;

    this.resetDeviceState();
    return this._port;
  }

  async close() {
    if (!this._port) {
      this.focusDeviceDescriptor = null;
      this.in_bootloader = false;
      this.resetDeviceState();
      return;
    }

    await this.closePort();
    this._port = null;
    this._parser = null;
    this.focusDeviceDescriptor = null;
    this.in_bootloader = false;
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
      const supported_commands = await this.supported_commands();
      if (supported_commands.includes("plugins")) {
        this._plugins = await this.request("plugins");
      }
    }
    return this._plugins;
  }

  request(cmd, ...args) {
    if (!this.isInApplicationMode()) return undefined;

    if (this._supported_commands?.length > 0 && !this._supported_commands.includes(cmd)) {
      logger.debug(`request for ${cmd} (unsupported command)`, {
        command: cmd,
        args: args,
      });
      return new Promise((resolve) => {
        resolve("");
      });
    }

    const rid = this._request_id;
    this._request_id += 1;
    logger.debug(`enqueueing request: ${cmd}`, {
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
    if (!this._port) throw new Error("Device not connected!");
    if (!this._port.writable || !this._port.readable) throw new Error("Port streams not available!");

    logger.info("[Focus._sendRequest] Sending request", { cmd, args });
    let request = cmd;
    if (args && args.length > 0) {
      request = request + " " + args.join(" ");
    }
    request += "\n";

    // TODO(anyone): This is a temporary measure until #985 gets fixed.
    await delay(250);

    const encoder = new TextEncoder();
    let writerAcquired = false;
    try {
        logger.debug("[Focus._sendRequest] Acquiring writable stream lock...");
        if (this._port.writable.locked) {
            logger.warn("[Focus._sendRequest] Writable stream was already locked before acquiring. Releasing existing lock first.");
            // Attempt to release potentially stale lock
            await this.releaseLocks(); // This might clear _writer if it was stale
        }
        this._writer = this._port.writable.getWriter();
        writerAcquired = true;
        logger.debug("[Focus._sendRequest] Writable stream lock acquired.");
        const data = encoder.encode(request);
        await this._writer.write(data);
        logger.debug("[Focus._sendRequest] Data written.");
    } catch (writeError) {
        logger.error("[Focus._sendRequest] Error during write:", writeError);
        throw writeError; // Rethrow after logging
    } finally {
        if (this._writer) {
            try {
                logger.debug("[Focus._sendRequest] Releasing writable stream lock after write.");
                this._writer.releaseLock();
            } catch (releaseError) {
                logger.error("[Focus._sendRequest] Error releasing writer lock:", releaseError);
            }
            this._writer = null; // Clear tracked writer
        }
    }
    
    let response = "";
    const decoder = new TextDecoder();
    let readerAcquired = false;
    try {
        logger.debug("[Focus._sendRequest] Acquiring readable stream lock...");
        if (this._port.readable.locked) {
             logger.warn("[Focus._sendRequest] Readable stream was already locked before acquiring. Releasing existing lock first.");
             // Attempt to release potentially stale lock
             await this.releaseLocks(); // This might clear _reader if it was stale
        }
        this._reader = this._port.readable.getReader();
        readerAcquired = true;
        logger.debug("[Focus._sendRequest] Readable stream lock acquired.");

        while (true) {
            const { value, done } = await this._reader.read();
            if (value) {
                response += decoder.decode(value);
            }
            if (done) {
                logger.debug("[Focus._sendRequest] Reader reported done.");
                break;
            }
            if (response.endsWith("\r\n.\r\n")) {
                response = response.slice(0, -5); // Remove the trailing \r\n.\r\n
                logger.debug("[Focus._sendRequest] End marker found.");
                break;
            }
        }
    } catch (readError) {
        logger.error("[Focus._sendRequest] Error during read:", readError);
        throw readError; // Rethrow after logging
    } finally {
        if (this._reader) {
            try {
                logger.debug("[Focus._sendRequest] Releasing readable stream lock after read.");
                // We don't cancel here as the read should complete naturally or via error
                this._reader.releaseLock(); 
            } catch (releaseError) {
                logger.error("[Focus._sendRequest] Error releasing reader lock:", releaseError);
            }
            this._reader = null; // Clear tracked reader
        }
    }

    response = response.trim();
    logger.info("[Focus._sendRequest] Request complete, response trimmed.");
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
    "layernames",
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
    "eeprom.free",
    "settings.valid?",
    "settings.version",
    "settings.crc",
  ];
  async readKeyboardConfiguration() {
    const backup = {};
    for (const cmd of this.eepromBackupCommands) {
      const dump = await this.command(cmd);
      if (dump !== undefined && dump !== "") {
        backup[cmd] = dump;
      }
    }
    return backup;
  }
  async writeKeyboardConfiguration(backup) {
    for (const cmd of this.eepromRestoreCommands) {
      if (backup[cmd] !== undefined) {
        await this.command(cmd, backup[cmd]);
      }
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
