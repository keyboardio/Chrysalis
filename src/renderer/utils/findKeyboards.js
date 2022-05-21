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
import Hardware from "@api/hardware";
import { ipcRenderer } from "electron";

const findNonSerialKeyboards = async (deviceList) => {
  return ipcRenderer.invoke("usb-scan-for-devices").then((devicesConnected) => {
    const devices = devicesConnected.map((device) => device.deviceDescriptor);
    devices.forEach((desc) => {
      Hardware.nonSerial.forEach((port) => {
        if (
          desc.idVendor == port.usb.vendorId &&
          desc.idProduct == port.usb.productId
        ) {
          let found = false;
          deviceList.forEach((port) => {
            if (
              port.focusDeviceDescriptor.usb.vendorId == desc.idVendor &&
              port.focusDeviceDescriptor.usb.productId == desc.idProduct
            ) {
              found = true;
            }
          });
          if (!found) {
            deviceList.push({
              accessible: true,
              port: port,
            });
          }
        }
      });
    });

    return deviceList;
  });
};

export const findKeyboards = async () => {
  let focus = new Focus();

  return new Promise((resolve) => {
    focus
      .find(...Hardware.serial)
      .then(async (devices) => {
        let supported_devices = [];
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
        console.error(e);
        const list = await findNonSerialKeyboards([]);
        resolve(list);
      });
  });
};
