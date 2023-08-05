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
import { v4 as uuidv4 } from "uuid";

import { delay } from "./utils";

export function FocusCommands(options) {
  // We cache whether the device supports the `device.reset` command at creation
  // time, so we do not have to ask it over and over again while trying to
  // reboot the device.
  options.focus.supported_commands().then((data) => {
    this.__deviceResetSupported = data.includes("device.reset");
  });

  this.reboot = async (devicePort, focusDeviceDescriptor) => {
    const focus = options.focus;
    let port = focus._port;

    // Try to close & reopen the device, to make sure we are connected to
    // something.
    if (devicePort && focusDeviceDescriptor) {
      if (port?.isOpen) {
        try {
          await port.close();
        } catch (_) {
          // ignore the error
        }
      }
      focus._port = undefined;
      port = await focus.open(devicePort.path, focusDeviceDescriptor);
      await delay(2000);
    }

    // Try rebooting. No need to catch errors here, the caller will do that
    // anyway.
    await focus.reboot(this.__deviceResetSupported);
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

    const key =
      ".internal.backups.save-file" +
      focus.focusDeviceDescriptor.info +
      Date.now() +
      uuidv4();
    logger("flash").debug("Writing structured EEPROM data to session storage", {
      key: key,
      eeprom: structured_dump,
    });
    sessionStorage.setItem(key, json_dump);

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
