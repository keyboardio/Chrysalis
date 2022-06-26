/* chrysalis-flash -- Keyboard flash helpers for Chrysalis
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

import { logger } from "@api/log";
import { getStaticPath } from "@renderer/config";
import TeensyLoader from "teensy-loader";

import { FocusCommands } from "./FocusCommands";
import { delay, toStep } from "./utils";

export const teensy = async (board, port, filename, options) => {
  const callback = options
    ? options.callback
    : function () {
        return;
      };
  const device = options.device;
  const focusCommands = new FocusCommands(options);

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
    // Because the factory restore above rebooted the keyboard, wait a little
    // here before starting to flash.
    await delay(1000);
  }

  await toStep(callback)("flash");
  await TeensyLoader.upload(0x16c0, 0x0478, filename);

  if (!options.factoryReset) {
    await toStep(callback)("reconnect");
    await options.focus.reconnectToKeyboard(device);

    await toStep(callback)("restoreEEPROM");
    await focusCommands.restoreEEPROM(saveKey);
  }
};
