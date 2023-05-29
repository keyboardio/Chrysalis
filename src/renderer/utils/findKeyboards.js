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

const findNonSerialKeyboards = async (deviceList) => {
  const connected = (await ipcRenderer.invoke("usb.scan-for-devices")).map(
    (device) => device.deviceDescriptor
  );

  const deviceList2 = await ipcRenderer.invoke("usb.scan-for-devices");
  for (const device of deviceList2) {
    logger("findNonSerialKeyboards").debug(
      "Vendor ID: " +
        device.deviceDescriptor.idVendor +
        ", Product ID: " +
        device.deviceDescriptor.pid +
        ", Device Address: " +
        device.deviceAddress
    );
  }

  for (const device of connected) {
    const dVid = device.idVendor,
      dPid = device.idProduct;

    for (const hw of Hardware.nonSerial) {
      let found = false;
      let bootloader = false;
      if (dVid == hw.usb.vendorId && dPid == hw.usb.productId) {
        found = true;
      } else if (
        dVid == hw.usb.bootloader?.vendorId &&
        dPid == hw.usb.bootloader?.productId
      ) {
        found = true;
        bootloader = true;
      }
      if (!found) continue;

      if (
        !deviceList.some((d) => {
          const usb = d.focusDeviceDescriptor.usb;
          return usb.vendorId == dVid && usb.productId == dPid;
        })
      ) {
        deviceList.push({
          accessible: true,
          focusDeviceDescriptor: Object.assign({}, hw, { bootloader }),
        });
      }
    }
  }
  return deviceList;
};

export const findKeyboards = async () => {
  const focus = new Focus();

  return new Promise((resolve) => {
    focus
      .find(...Hardware.serial)
      .then(async (devices) => {
        const supported_devices = [];
        for (const device of devices) {
          device.accessible = await focus.isDeviceAccessible(device);
          if (device.accessible && (await focus.isDeviceSupported(device))) {
            supported_devices.push(device);
          } else if (!device.accessible) {
            supported_devices.push(device);
          }
        }
        const list = await findNonSerialKeyboards(supported_devices);
        resolve(list);
      })
      .catch(async (e) => {
        logger().warn("(non-fatal) error while finding keyboards", {
          error: e,
        });
        const list = await findNonSerialKeyboards([]);
        resolve(list);
      });
  });
};
