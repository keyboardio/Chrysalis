/* Chrysalis -- Kaleidoscope Command Center
 * Copyright (C) 2020-2022  Keyboardio, Inc.
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

import { logger } from "@api/log";
import { FocusCommands } from "./flash/FocusCommands";
import { delay, reportUpdateStatus } from "./flash/utils";

import { AVR109Flasher } from "./flash/AVR109Flasher";

import { WebDFUFlasher } from "./flash/WebDFUFlasher";

const NOTIFICATION_THRESHOLD = 5;

export const flashers = {
  avr109: AVR109Flasher,
  dfu: WebDFUFlasher,
};

export const RebootMessage = {
  enter: {
    stillApplication: "ENTER_STILL_APPLICATION",
    notFound: "ENTER_NOT_FOUND",
  },
  reconnect: {
    stillBootloader: "RECONNECT_STILL_BOOTLOADER",
    notFound: "RECONNECT_NOT_FOUND",
  },
  clear: "CLEAR",
};

const getFlasher = (device) => {
  return flashers[device.usb.bootloader.protocol];
};

export const factoryReset = async (filename, options) => {
  const port = options.focus._port;

  const startingFromBootloader = options.device.bootloader;
  const callback = options
    ? options.callback
    : function () {
        return;
      };

  if (!startingFromBootloader) {
    await enterBootloader(options);
  }

  await getFlasher(options.device).flash(port, filename, options);

  await reconnectAfterFlashing(options);
  await reportUpdateStatus(callback)("factoryRestore");

  await eraseEEPROM(options);

  return;
};

export const updateDeviceFirmware = async (filename, options) => {
  const port = options.focus._port;

  const startingFromBootloader = options.device.bootloader;

  let saveKey;
  if (!startingFromBootloader) {
    saveKey = await saveEEPROM();

    await enterBootloader(options);
  }

  await getFlasher(options.device).flash(port, filename, options);

  if (startingFromBootloader) {
    await getFlasher(options.device).rebootToApplicationMode(
      port,
      options.device
    );
    return;
  }

  await reconnectAfterFlashing(options);
  await eraseEEPROM(options);
  await reconnectAfterFlashing(options);
  await restoreEEPROM(saveKey, options);
};

export const restoreEEPROM = async (saveKey, options) => {
  const callback = options
    ? options.callback
    : function () {
        return;
      };
  const focusCommands = new FocusCommands(options);

  await reportUpdateStatus(callback)("restoreEEPROM");

  await focusCommands.restoreEEPROM(saveKey);
};

export const saveEEPROM = async (options) => {
  const callback = options
    ? options.callback
    : function () {
        return;
      };
  const focusCommands = new FocusCommands(options);
  await reportUpdateStatus(callback)("saveEEPROM");

  const saveKey = await focusCommands.saveEEPROM();
  return saveKey;
};

export const eraseEEPROM = async (options) => {
  const focusCommands = new FocusCommands(options);

  // Clear the EEPROM before restoring. We do this so that if the layout
  // changed, any space that changed owners will not have garbage in it, but
  // either uninitialized bytes, or whatever the restore later restores.
  try {
    await focusCommands.eraseEEPROM();
  } catch (e) {
    if (e != "Communication timeout") {
      throw new Error(e);
    }
  }
};

const reconnectAfterFlashing = async (options) => {
  /**
   * Reconnect to the keyboard
   * - Periodically scan for the keyboard
   * - If found, we're done with the step
   * - If not found, see if we have a bootloader.
   * - If we do, try to reboot to application mode.
   * - In either case, wait and try again.
   ***/

  const onError = options
    ? options.onError
    : function () {
        return;
      };

  const callback = options
    ? options.callback
    : function () {
        return;
      };

  const device = options.device;
  await reportUpdateStatus(callback)("reconnect");

  // Wait a few seconds to let the keyboard settle, in case it was rebooting after a flash.
  await delay(2000);

  let device_detected = false;
  let attempts = 0;
  while (!device_detected) {
    device_detected = await options.focus.reconnectToKeyboard(device);
    if (device_detected) break;
    attempts += 1;

    const bootloaderFound = await options.focus.checkBootloader(options.device);

    if (attempts == NOTIFICATION_THRESHOLD) {
      if (bootloaderFound) {
        onError(RebootMessage.reconnect.stillBootloader);
      } else {
        onError(RebootMessage.reconnect.notFound);
      }
    }

    if (bootloaderFound) {
      getFlasher(options.device).rebootToApplicationMode(
        bootloaderFound,
        options.device
      );
    }

    // Wait a few seconds to not overwhelm the system with rapid reboot
    // attempts.
    await delay(2000);
  }
  onError(RebootMessage.clear);

  // Wait a few seconds after rebooting too, to let the keyboard come back up
  // fully.
  await delay(2000);
};

export const enterBootloader = async (options) => {
  /***
   * Enter programmable mode:
   * - Attempt rebooting the device;  Check for the bootloader every 2s
   * - If not found, try again
   * - If not found for N attempts, show a notification
   ***/

  const callback = options
    ? options.callback
    : function () {
        return;
      };

  const onError = options
    ? options.onError
    : function () {
        return;
      };

  await reportUpdateStatus(callback)("bootloader");
  let bootloaderFound = false;
  let attempts = 0;
  while (!bootloaderFound) {
    const deviceInApplicationMode = await options.focus.checkSerialDevice(
      options.device,
      options.device.usb
    );

    try {
      await options.focus.reboot();
      console.log("should have rebooted");
    } catch (e) {
      // Log the error, but otherwise ignore it.
      logger("flash").error("Error during reboot", { error: e });
    }
    // Wait a few seconds to let the device properly reboot into bootloader
    // mode, and enumerate.
    const handleSerialRequest = () => {
      navigator.serial
        .requestPort()
        .then((port) => {
          console.log("Port received:", port);
          // Handle the port as needed
        })
        .catch((err) => {
          console.error("Failed to get port:", err);
        });
    };
    //   requestInteraction("press a button", handleSerialRequest);

    // TODO - from here, we need to go back to the UI and let the user explicitly connect to the keyboard
    await delay(2000);

    bootloaderFound = await options.focus.checkBootloader(options.device);
    attempts += 1;

    if (bootloaderFound) break;

    if (attempts == NOTIFICATION_THRESHOLD) {
      if (deviceInApplicationMode) {
        onError(RebootMessage.enter.stillApplication);
      } else {
        onError(RebootMessage.enter.notFound);
      }
    }
  }
  onError(RebootMessage.clear);

  // When we rebooted into programmable mode, close our previous port, it is not
  // needed anymore.
  if (options.focus._port.isOpen) {
    try {
      await options.focus._port.close();
    } catch (_) {
      /* empty */
    } // Ignore the error
  }
};
