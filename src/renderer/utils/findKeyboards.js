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

export const findKeyboards = async () => {
  const filters = [
    { usbVendorId: 0x3496, usbProductId: 0x0006 },
    { usbVendorId: 0x1209, usbProductId: 0x2301 },
    { usbVendorId: 0x1209, usbProductId: 0x2303 },
  ];

  let serialPort;

  const openPort = async () => {
    serialPort = await navigator.serial.requestPort({ filters });
    // Wait for the serial port to open.
    await serialPort.open({ baudRate: 9600 });
  };
  await openPort();
  return serialPort;
};
