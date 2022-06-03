// -*- mode: js-jsx -*-
/* Chrysalis -- Kaleidoscope Command Center
 * Copyright (C) 2022  Keyboardio, Inc.
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
import { logger } from "@api/log";

const deviceReset = async () => {
  const focus = new Focus();
  const timeouts = {
    dtrToggle: 500, // Time to wait (ms) between toggling DTR
    bootLoaderUp: 4000, // Time to wait for the boot loader to come up
  };
  const port = focus._port;

  const delay = (ms) => new Promise((res) => setTimeout(res, ms));

  const baudUpdate = () => {
    return new Promise((resolve) => {
      logger("focus").debug("baud update");
      port.update({ baudRate: 1200 }, async () => {
        await delay(timeouts.dtrToggle);
        resolve();
      });
    });
  };

  const dtrToggle = (state) => {
    return new Promise((resolve) => {
      logger("focus").debug(`dtr ${state ? "on" : "off"}`);
      port.set({ dtr: state }, async () => {
        await delay(timeouts.dtrToggle);
        resolve();
      });
    });
  };

  // Attempt calling device.reset first.
  // If the firmware supports it, we'll reboot quickly. If it does not, we'll
  // fall back to the serial HUP below.
  await focus.command("device.reset");

  // Attempt to reset the device with a serial HUP.
  // If the device supports `device.reset`, this will be a no-op, because we're
  // likely rebooting already. Worst case, we'll reboot twice. If the device
  // does not support `device.reset`, then this will hopefully do the trick.
  await baudUpdate();
  await dtrToggle(true);
  await dtrToggle(false);
};

export { deviceReset as default };
