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
import { ipcRenderer } from "electron";
import { v4 as uuidv4 } from "uuid";

import { delay } from "./utils";

export function FocusCommands(options) {
  this.reboot = async (devicePort, focusDeviceDescriptor) => {
    const focus = options.focus;
    const timeouts = options?.timeouts || {
      dtrToggle: 500, // Time to wait (ms) between toggling DTR
      bootLoaderUp: 4000, // Time to wait for the boot loader to come up
    };
    let port = focus._port;

    if (devicePort && focusDeviceDescriptor) {
      port = await focus.open(devicePort.path, focusDeviceDescriptor);
    }

    const baudUpdate = () => {
      return new Promise((resolve) => {
        logger("flash").debug("baud update");
        port.update({ baudRate: 1200 }, async () => {
          await delay(timeouts.dtrToggle);
          resolve();
        });
      });
    };

    const dtrToggle = (state) => {
      return new Promise((resolve) => {
        logger("flash").debug(`dtr ${state ? "on" : "off"}`);
        port.set({ dtr: state }, async () => {
          await delay(timeouts.dtrToggle);
          resolve();
        });
      });
    };

    // Attempt calling device.reset first, if present.
    let commands;
    try {
      commands = await focus.supported_commands();
    } catch (_) {
      commands = [];
    }
    if (commands.includes("device.reset")) {
      try {
        await focus.request("device.reset");
      } catch (e) {
        // If there's a comms timeout, that's exactly what we want. the keyboard is rebooting.
        if ("Communication timeout" !== e) {
          logger("flash").error("Error while calling `device.reset`", {
            error: e,
          });
          throw e;
        }
      }
    }

    // Attempt to reset the device with a serial HUP.
    // If the device supports `device.reset`, this will be a no-op, because we're
    // likely rebooting already. Worst case, we'll reboot twice. If the device
    // does not support `device.reset`, then this will hopefully do the trick.

    await baudUpdate();
    await dtrToggle(true);
    await dtrToggle(false);
  };

  this.eraseEEPROM = async () => {
    const focus = options.focus;

    const commands = await focus.command("help");
    if (commands.includes("eeprom.erase")) {
      return await focus.command("eeprom.erase");
    }

    let eeprom = await focus.command("eeprom.contents");
    eeprom = eeprom
      .split(" ")
      .filter((v) => v.length > 0)
      .map(() => 255)
      .join(" ");
    await focus.command("eeprom.contents", eeprom);
    await this.reboot();
  };

  // Saves the data from the keyboard's EEPROM using eeprom.contents, in one,
  // unstructured blob.
  this.saveEEPROMContents = async () => {
    const focus = options.focus;
    const dump = focus.command("eeprom.contents");
    const key = ".internal." + uuidv4();
    logger("flash").debug("Saving EEPROM to session storage", {
      key: key,
      eeprom: dump,
    });

    return key;
  };

  // Restores `eeprom.contents` in full, not caring about structure.
  this.restoreEEPROMContents = async (key) => {
    const focus = options.focus;
    const dump = sessionStorage.getItem(key);

    logger("flash").debug("Restoring EEPROM from session storage", {
      key: key,
      eeprom: dump,
    });
    sessionStorage.setItem(key, dump);
    return key;
  };

  // Saves the data from the keyboard's EEPROM using
  // focus.readKeyboardConfiguration, which saves each known slot in the EEPROM
  // using individual focus commands.
  // Use restoreEEPROM() to restore the data saved by this function.
  this.saveEEPROM = async () => {
    const focus = options.focus;
    const structured_dump = await focus.readKeyboardConfiguration();
    const json_dump = JSON.stringify(structured_dump);

    const key = ".internal." + uuidv4();
    logger("flash").debug("Writing structured EEPROM data to session storage", {
      key: key,
      eeprom: structured_dump,
    });
    sessionStorage.setItem(key, json_dump);

    const r = ipcRenderer.sendSync(
      "backups.save-file",
      focus.focusDeviceDescriptor.info,
      Date.now(),
      json_dump
    );

    return key;
  };

  // Restores the data the keyboard's EEPROM using focus.writeKeyboardConfiguration, which
  // updates each known slot in the EEPROM using individual focus commands.
  // This method is more able to handle changes to the keyboard's EEPROM layout.
  this.restoreEEPROM = async (key) => {
    const focus = options.focus;
    const structured_dump = JSON.parse(sessionStorage.getItem(key));

    logger("flash").debug(
      "Restoring structured EEPROM data from session storage",
      { key: key, eeprom: structured_dump }
    );
    await focus.writeKeyboardConfiguration(structured_dump);
    sessionStorage.removeItem(key);
  };
}
