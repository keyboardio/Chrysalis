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

export const flashers = {
  avr109: AVRGirlFlasher,
  dfuUtil: DFUUtilFlasher,
  dfuProgrammer: DFUProgrammerFlasher,
  teensy: TeensyFlasher,
};

export const flash = async (flasher, board, port, filename, options) => {
  const focusCommands = new FocusCommands(options);
  const device = options.device;
  const callback = options
    ? options.callback
    : function () {
        return;
      };

  if (device.bootloader) {
    return await flasher(board, port, filename, options);
  }

  let saveKey;
  if (!options.factoryReset) {
    await toStep(callback)("saveEEPROM");
    saveKey = await focusCommands.saveEEPROM();

    if (!options.noBootloaderTrigger) {
      await toStep(callback)("bootloaderTrigger");
      await focusCommands.reboot();
    }
  } else {
    await toStep(callback)("factoryRestore");
    try {
      await focusCommands.eraseEEPROM();
    } catch (e) {
      if (e != "Communication timeout") {
        throw new Error(e);
      }
    }

    if (!options.noBootloaderTrigger) {
      // We do not need to trigger the bootloader here, the erase above did a
      // reset for us already. Do wait a little, for a smoother transition.
      await toStep(callback)("bootloaderTrigger");
      await delay(500);
    }
  }

  if (!options.noBootloaderTrigger) {
    await toStep(callback)("bootloaderWait");
    const bootloaderFound = await options.focus.waitForBootloader(
      options.device
    );

    if (!bootloaderFound) {
      logger("flash").error("bootloader not found");
      throw new Error("Bootloader not found");
    }
    if (port.isOpen) {
      try {
        await port.close();
      } catch (_) {
        /* ignore the error */
      }
    }

    await delay(1000);
  }

  await flasher(board, port, filename, options);

  if (!options.factoryReset) {
    await toStep(callback)("reconnect");
    await options.focus.reconnectToKeyboard(device);

    await toStep(callback)("restoreEEPROM");
    await focusCommands.restoreEEPROM(saveKey);
  }
};
