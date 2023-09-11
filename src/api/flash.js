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

import { delay } from "./flash/utils";

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
  const activeDevice = options.activeDevice;
  const onStepChange = options.onStepChange;
  const onError = options.onError;

  if (!activeDevice.bootloaderDetected()) {
    await onStepChange("bootloader");

    await enterBootloader(activeDevice, onError);
  }
  await onStepChange("flash");

  await activeDevice.getFlasher().flash(activeDevice.port, filename, options);
  await onStepChange("reconnect");

  await reconnectAfterFlashing(activeDevice, onError);
  await onStepChange("factoryRestore");
  await activeDevice.clearEEPROM();

  return;
};

export const updateDeviceFirmware = async (filename, options) => {
  const activeDevice = options.activeDevice;
  const onStepChange = options.onStepChange;
  const onError = options.onError;

  const flasher = activeDevice.getFlasher();

  if (activeDevice.bootloaderDetected()) {
    await onStepChange("flash");

    await flasher.flash(activeDevice.port, filename, options);
    await flasher.rebootToApplicationMode(
      activeDevice.port,
      activeDevice.focusDeviceDescriptor()
    );
    return;
  } else {
    await onStepChange("saveEEPROM");
    const saveKey = await activeDevice.saveEEPROM();
    await onStepChange("bootloader");

    await enterBootloader(activeDevice, onError);
    await onStepChange("flash");

    await flasher.flash(activeDevice.port, filename, options);
    await onStepChange("reconnect");

    await reconnectAfterFlashing(activeDevice, onError);
    await activeDevice.clearEEPROM();
    await reconnectAfterFlashing(activeDevice, onError);
    await onStepChange("restoreEEPROM");
    await activeDevice.restoreEEPROM(saveKey);
  }
};

const reconnectAfterFlashing = async (activeDevice, onError) => {
  /**
   * Reconnect to the keyboard
   * - Periodically scan for the keyboard
   * - If found, we're done with the step
   * - If not found, see if we have a bootloader.
   * - If we do, try to reboot to application mode.
   * - In either case, wait and try again.
   ***/

  // Wait a few seconds to let the keyboard settle, in case it was rebooting after a flash.
  await delay(2000);

  let device_detected = false;
  let attempts = 0;
  while (!device_detected) {
    device_detected = await activeDevice.reconnect();
    if (device_detected) break;
    attempts += 1;

    const bootloaderFound = await activeDevice.bootloaderDetected();

    if (attempts == NOTIFICATION_THRESHOLD) {
      onError(
        bootloaderFound
          ? RebootMessage.reconnect.stillBootloader
          : RebootMessage.reconnect.notFound
      );
    }

    if (bootloaderFound) {
      activeDevice
        .getFlasher()
        .rebootToApplicationMode(
          bootloaderFound,
          activeDevice.focusDeviceDescriptor()
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

export const enterBootloader = async (activeDevice, onError) => {
  /***
   * Enter programmable mode:
   * - Attempt rebooting the device;  Check for the bootloader every 2s
   * - If not found, try again
   * - If not found for N attempts, show a notification
   ***/

  let bootloaderFound = false;
  let attempts = 0;
  while (!bootloaderFound) {
    const deviceInApplicationMode = await activeDevice.focusDetected();
    try {
      await activeDevice.focus.reboot();
    } catch (e) {
      // Log the error, but otherwise ignore it.
      console.error("Error during reboot", { error: e });
    }
    // Wait a few seconds to let the device properly reboot into bootloadermode, and enumerate.

    await delay(2000);

    bootloaderFound = await activeDevice.bootloaderDetected();
    attempts += 1;

    if (bootloaderFound) break;

    if (attempts == NOTIFICATION_THRESHOLD) {
      onError(
        deviceInApplicationMode
          ? RebootMessage.enter.stillApplication
          : RebootMessage.enter.notFound
      );
    }
  }
  onError(RebootMessage.clear);
};
