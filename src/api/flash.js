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
   * If already in bootloader mode, flash away and we're done.
   ***/
  if (device.bootloader) {
    return await flasher.flash(board, port, filename, options);
  }

  /***
   * Preparations before flashing:
   * - If doing a factory reset, do a factory reset.
   * - If not, save a structured eeprom backup.
   ***/
  let saveKey;
  if (!options.factoryReset) {
    await toStep(callback)("saveEEPROM");
    saveKey = await focusCommands.saveEEPROM();
  } else {
    await toStep(callback)("factoryRestore");
    try {
      await focusCommands.eraseEEPROM();
    } catch (e) {
      if (e != "Communication timeout") {
        throw new Error(e);
      }
    }
  }

  /***
   * Enter programmable mode:
   * - Check for the bootloader every 2s
   * - If found, we're done
   * - If not found, try again
   * - If not found for N attempts, show a notification
   ***/
  await toStep(callback)("bootloader");
  let bootloaderFound = false;
  let attempts = 0;
  while (!bootloaderFound) {
    bootloaderFound = await options.focus.checkBootloader(options.device);
    attempts += 1;

    if (bootloaderFound) break;

    const normalDevice = await options.focus.checkSerialDevice(
      options.device,
      options.device.usb
    );
    if (attempts == NOTIFY_THRESHOLD) {
      if (normalDevice) {
        onError(RebootMessage.enter.stillNormal);
      } else {
        onError(RebootMessage.enter.notFound);
      }
    }

    try {
      await focusCommands.reboot(normalDevice, options.device);
    } catch (_) {
      // ignore any errors here
    }
    await delay(2000);
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

  /***
   * Flash new firmware
   ***/
  await flasher.flash(board, port, filename, options);

  // If we were doing a factory reset, we're done now.
  if (options.factoryReset) return;

  /**
   * Reconnect to the keyboard
   * - Periodically scan for the keyboard
   * - If found, we're done with the step
   * - If not found, see if we have a bootloader.
   * - If we do, try to reboot to normal mode.
   * - In either case, wait and try again.
   ***/
  await toStep(callback)("reconnect");

  let kb = false;
  attempts = 0;
  while (!kb) {
    kb = await options.focus.reconnectToKeyboard(device);
    if (kb) break;
    attempts += 1;

    const bootloaderFound = await options.focus.checkBootloader(options.device);

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

  /***
   * When the keyboard is back up, restore the structured EEPROM save.
   ***/
  await toStep(callback)("restoreEEPROM");
  await focusCommands.restoreEEPROM(saveKey);
};
