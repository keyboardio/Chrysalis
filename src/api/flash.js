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

import { delay, reportUpdateStatus } from "./flash/utils";

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

const NOTIFICATION_THRESHOLD = 5;

export const factoryReset = async (filename, options) => {
  if (!options.activeDevice.bootloaderDetected()) {
    await enterBootloader(options);
  }
  await options.activeDevice
    .getFlasher()
    .flash(options.activeDevice.port, filename, options);
  await reconnectAfterFlashing(options);
  await reportUpdateStatus(options.callback)("factoryRestore");
  await options.activeDevice.clearEEPROM();

  return;
};

export const updateDeviceFirmware = async (filename, options) => {
  console.log(" updateDeviceFirmware", filename, options);

  const flasher = options.activeDevice.getFlasher();

  const startingFromBootloader = options.activeDevice.bootloaderDetected();

  let saveKey;

  if (startingFromBootloader) {
    await flasher.flash(options.activeDevice.port, filename, options);
    await flasher.rebootToApplicationMode(
      options.activeDevice.port,
      options.activeDevice.focusDeviceDescriptor()
    );
    return;
  } else {
    await reportUpdateStatus(options.callback)("saveEEPROM");
    saveKey = await options.activeDevice.saveEEPROM();
    await enterBootloader(options);
    await flasher.flash(options.activeDevice.port, filename, options);
    await reconnectAfterFlashing(options);
    await options.activeDevice.clearEEPROM();
    await reconnectAfterFlashing(options);
    await reportUpdateStatus(options.callback)("restoreEEPROM");
    await options.activeDevice.restoreEEPROM(saveKey);
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

  await reportUpdateStatus(options.callback)("reconnect");

  // Wait a few seconds to let the keyboard settle, in case it was rebooting after a flash.
  await delay(2000);

  let device_detected = false;
  let attempts = 0;
  while (!device_detected) {
    device_detected = await options.activeDevice.focus.reconnectToKeyboard(
      options.activeDevice.focusDeviceDescriptor()
    );
    if (device_detected) break;
    attempts += 1;

    const bootloaderFound = await options.activeDevice.bootloaderDetected();

    if (attempts == NOTIFICATION_THRESHOLD) {
      if (bootloaderFound) {
        options.onError(RebootMessage.reconnect.stillBootloader);
      } else {
        options.onError(RebootMessage.reconnect.notFound);
      }
    }

    if (bootloaderFound) {
      options.activeDevice
        .getFlasher()
        .rebootToApplicationMode(
          bootloaderFound,
          options.activeDevice.focusDeviceDescriptor()
        );
    }

    // Wait a few seconds to not overwhelm the system with rapid reboot
    // attempts.
    await delay(2000);
  }
  options.onError(RebootMessage.clear);

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

  await reportUpdateStatus(options.callback)("bootloader");
  let bootloaderFound = false;
  let attempts = 0;
  while (!bootloaderFound) {
    const deviceInApplicationMode = await options.activeDevice.focusDetected();
    try {
      await options.activeDevice.focus.reboot();
      console.log("should have rebooted");
    } catch (e) {
      // Log the error, but otherwise ignore it.
      console.error("Error during reboot", { error: e });
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

    bootloaderFound = await options.activeDevice.focus.checkBootloader(
      options.activeDevice.focusDeviceDescriptor()
    );
    attempts += 1;

    if (bootloaderFound) break;

    if (attempts == NOTIFICATION_THRESHOLD) {
      if (deviceInApplicationMode) {
        options.onError(RebootMessage.enter.stillApplication);
      } else {
        options.onError(RebootMessage.enter.notFound);
      }
    }
  }
  options.onError(RebootMessage.clear);
};
