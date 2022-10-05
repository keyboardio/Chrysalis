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
import { delay, toStep } from "./flash/utils";

import { AVRGirlFlasher } from "./flash/AVRGirlFlasher";
import { DFUUtilFlasher } from "./flash/DFUUtilFlasher";
import { DFUProgrammerFlasher } from "./flash/DFUProgrammerFlasher";
import { TeensyFlasher } from "./flash/TeensyFlasher";

const NOTIFY_THRESHOLD = 5;

export const flashers = {
  avr109: AVRGirlFlasher,
  dfuUtil: DFUUtilFlasher,
  dfuProgrammer: DFUProgrammerFlasher,
  teensy: TeensyFlasher,
};

export const RebootMessage = {
  enter: {
    stillNormal: "ENTER_STILL_NORMAL",
    notFound: "ENTER_NOT_FOUND",
  },
  reconnect: {
    stillBootloader: "RECONNECT_STILL_BOOTLOADER",
    notFound: "RECONNECT_NOT_FOUND",
  },
  clear: "CLEAR",
};

export const flash = async (flasher, board, port, filename, options) => {
  const focusCommands = new FocusCommands(options);
  const device = options.device;
  const startFromBootloader = device.bootloader;
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

  /***
   * If we're already in bootloader mode, skip the preparations.
   */
  let saveKey;
  if (!startFromBootloader) {
    /***
     * Preparations before flashing:
     * - If not doing a factory reset, save a structured eeprom backup.
     * - Otherwise proceed.
     ***/
    if (!options.factoryReset) {
      await toStep(callback)("saveEEPROM");
      saveKey = await focusCommands.saveEEPROM();
    }

    /***
     * Enter programmable mode:
     * - Attempt rebooting the device
     * - Check for the bootloader every 2s
     * - If found, we're done
     * - If not found, try again
     * - If not found for N attempts, show a notification
     ***/
    await toStep(callback)("bootloader");
    let bootloaderFound = false;
    let attempts = 0;
    while (!bootloaderFound) {
      const normalDevice = await options.focus.checkSerialDevice(
        options.device,
        options.device.usb
      );

      try {
        await focusCommands.reboot(normalDevice, options.device);
      } catch (_) {
        // ignore any errors here
      }
      await delay(2000);

      bootloaderFound = await options.focus.checkBootloader(options.device);
      attempts += 1;

      if (bootloaderFound) break;

      if (attempts == NOTIFY_THRESHOLD) {
        if (normalDevice) {
          onError(RebootMessage.enter.stillNormal);
        } else {
          onError(RebootMessage.enter.notFound);
        }
      }
    }
    onError(RebootMessage.clear);

    // When we rebooted into programmable mode, close our previous port, it is not
    // needed anymore.
    if (port.isOpen) {
      try {
        await port.close();
      } catch (_) {
        /* ignore the error */
      }
    }
  }

  /***
   * Flash new firmware
   ***/
  await flasher.flash(board, port, filename, options);

  // If we were in bootloader mode, and aren't doing a factory reset, we're done here.
  if (startFromBootloader && !options.factoryReset) {
    return;
  }

  /**
   * Reconnect to the keyboard
   * - Periodically scan for the keyboard
   * - If found, we're done with the step
   * - If not found, see if we have a bootloader.
   * - If we do, try to reboot to normal mode.
   * - In either case, wait and try again.
   ***/
  await toStep(callback)("reconnect");

  const doReconnect = async () => {
    let kb = false;
    let attempts = 0;
    while (!kb) {
      kb = await options.focus.reconnectToKeyboard(device);
      if (kb) break;
      attempts += 1;

      const bootloaderFound = await options.focus.checkBootloader(
        options.device
      );

      if (attempts == NOTIFY_THRESHOLD) {
        if (bootloaderFound) {
          onError(RebootMessage.reconnect.stillBootloader);
        } else {
          onError(RebootMessage.reconnect.notFound);
        }
      }

      if (bootloaderFound) {
        flasher.rebootToNormal(bootloaderFound, options.device);
      }

      await delay(2000);
    }
    onError(RebootMessage.clear);
  };

  await doReconnect();

  /***
   * When the keyboard is back up:
   * - clear the eeprom
   * - reconnect again
   * - restore the structured EEPROM save.
   ***/
  if (options.factoryReset) {
    await toStep(callback)("factoryRestore");
  } else {
    await toStep(callback)("restoreEEPROM");
  }

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

  // If we were doing a factory reset, we're done now.
  if (options.factoryReset) return;

  await doReconnect();
  await delay(2000);
  await focusCommands.restoreEEPROM(saveKey);
};
