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
import { logger } from "@api/log";
import Hardware from "@api/hardware";
import { ipcRenderer } from "electron";

export const findKeyboards = async () => {
  const focus = new Focus();
  const devices = await focus.listDevices();

  const keyboards = devices.map((device) => {
    const n = Object.assign({}, device);
    if (device.connectionType === "kaleidoscope") {
      focus.isDeviceAccessible(device).then((r) => {
        n.accessible = r;
      });
    } else {
      n.accessible = true;
    }
    n.focusDeviceDescriptor = Hardware.getDeviceDescriptorByUsbIds(
      device.vendorId,
      device.productId
    );
    return n;
  });

  // We log the devices here, rather than the keyboards, because we don't want
  // to log the focusDeviceDescriptors all the time.
  logger().info("connected keyboards", { devices });
  return keyboards;
};
