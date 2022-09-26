// -*- mode: js-jsx -*-
/* Chrysalis -- Kaleidoscope Command Center
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

import Focus from "@api/focus";

const clearEEPROM = async () => {
  const focus = new Focus();

  const commands = await focus.command("help");
  if (commands.includes("eeprom.erase")) {
    try {
      focus.command("eeprom.erase");
    } catch (_) {
      /* ignore any errors */
    }

    // Once we sent the eeprom.erase command, the device will eventually reboot.
    // Wait 10 seconds, and then reboot, to pretend we got something back.
    await new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, 10000);
    });
    return;
  }

  let eeprom = await focus.command("eeprom.contents");
  eeprom = eeprom
    .split(" ")
    .filter((v) => v.length > 0)
    .map(() => 255)
    .join(" ");
  await focus.command("eeprom.contents", eeprom);
};

export { clearEEPROM as default };
