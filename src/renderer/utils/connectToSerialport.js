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
import { Hardware, supportedDeviceVIDPIDs } from "@api/hardware";

// returns a promise that resolves to a Focus object
export const connectToSerialport = async () => {
  const filters = supportedDeviceVIDPIDs();
  let serialPort;

  const openPort = async () => {
    serialPort = await navigator.serial.requestPort({ filters: filters });
    // Wait for the serial port to open.
    if (serialPort.readable && serialPort.writable) {
      await serialPort.close();
    }
    await serialPort.open({ baudRate: 9600 });
  };

  await openPort();
  const info = serialPort.getInfo();

  const dVid = info.usbVendorId;
  const dPid = info.usbProductId;

  const focus = new Focus();

  for (const hw of Hardware.devices) {
    console.log("Hardware is", hw);
    let found = false;
    let bootloader = false;
    if (dVid == hw.usb.vendorId && dPid == hw.usb.productId) {
      found = true;
      console.log("Found a keyboard", hw);
      focus.open(serialPort, hw);
    } else if (
      dVid == hw.usb.bootloader?.vendorId &&
      dPid == hw.usb.bootloader?.productId
    ) {
      found = true;
      bootloader = true;
      console.log("Found a bootloader keyboard", hw);

      focus.open(serialPort, hw);
    }
    if (!found) continue;
  }

  console.log(serialPort.getInfo());
  console.log(focus);
  return focus;
};
