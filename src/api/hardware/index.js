/* chrysalis-hardware -- Chrysalis Hardware library collection
 * Copyright (C) 2019-2022  Keyboardio, Inc.
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

import { Hardware } from "./devices";

export function getDeviceProtocol(vid, pid) {
  for (const device of Object.values(Hardware.devices)) {
    if (device.usb) {
      // Check main USB vid/pid
      if (device.usb.vendorId === vid && device.usb.productId === pid) {
        return "regular"; // Not necessarily serial, but the main USB interface for the device
      }

      // Check bootloader vid/pid
      if (device.usb.bootloader.vendorId === vid && device.usb.bootloader.productId === pid) {
        return device.usb.bootloader.protocol; // Returns 'avr109' or 'dfu' or any other bootloader protocol
      }
    }
  }

  return null; // If no match found
}

function getSerialAndAvr109Devices() {
  const result = [];

  for (const device of Object.values(Hardware.devices)) {
    // For 'main' vid/pid pair (serial devices)
    if (device.usb) {
      result.push({
        vendorId: device.usb.vendorId,
        productId: device.usb.productId,
      });
    }

    // For avr109 devices
    if (device.usb?.bootloader?.protocol === "avr109") {
      result.push({
        vendorId: device.usb.bootloader.vendorId,
        productId: device.usb.bootloader.productId,
      });
    }
  }

  return result;
}

export const supportedDeviceVIDPIDs = () => {
  const result = [];

  for (const device of Object.values(Hardware.devices)) {
    if (device.usb) {
      // For 'main' vid/pid pair
      result.push({
        usbVendorId: device.usb.vendorId,
        usbProductId: device.usb.productId,
        productName: device.info.product,
      });

      // For bootloader vid/pid pair
      if (device.usb.bootloader) {
        result.push({
          usbVendorId: device.usb.bootloader.vendorId,
          usbProductId: device.usb.bootloader.productId,
          productName: device.info.product,
        });
      }
    }
  }
 console.log(result);
  return result;
};

export function getDfuDevices() {
  const result = [];

  for (const device of Object.values(Hardware.devices)) {
    if (device.usb?.bootloader?.protocol === "dfu") {
      result.push({
        vendorId: device.usb.bootloader.vendorId,
        productId: device.usb.bootloader.productId,
      });
    }
  }

  return result;
}

export { Hardware };
