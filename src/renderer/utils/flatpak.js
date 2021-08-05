// -*- mode: js-jsx -*-
/* Chrysalis -- Kaleidoscope Command Center
 * Copyright (C) 2020-2022  Keyboardio, Inc.
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

import fs from "fs";
import path from "path";
import readline from "readline";

const flatpakInfoPath = "/.flatpak-info";

async function insideFlatpak() {
  return process.platform === "linux" && fs.existsSync(flatpakInfoPath);
}

// Linux example port as reported by udevadm
// {
//   path: '/dev/ttyACM0',
//   manufacturer: 'Arduino (www.arduino.cc)',
//   serialNumber: '752303138333518011C1',
//   pnpId: 'usb-Arduino__www.arduino.cc__0043_752303138333518011C1-if00',
//   locationId: undefined,
//   productId: '2301',
//   vendorId: '1209'
// }
//
// Sample file /sys/class/tty/ttyACM0/device/uevent for Model 01, serial port /dev/ttyACM0
// DEVTYPE=usb_interface
// DRIVER=cdc_acm
// PRODUCT=1209/2301/100
// TYPE=239/2/1
// INTERFACE=2/2/0
// MODALIAS=usb:v1209p2301d0100dcEFdsc02dp01ic02isc02ip00in00

function createReadStreamSafe(filename, options) {
  return new Promise((resolve, reject) => {
    const fileStream = fs.createReadStream(filename, options);
    fileStream.on("error", reject).on("open", () => {
      resolve(fileStream);
    });
  });
}

const ttySysClassPath = "/sys/class/tty";
const productRegex = /^PRODUCT=(?<vendorId>\d+)\/(?<productId>\d+)\/.*/;

function listPorts() {
  return new Promise(async (resolve, reject) => {
    const ports = [];
    let openedDir;
    try {
      openedDir = await fs.promises.opendir(ttySysClassPath);
    } catch (err) {
      console.error(err);
      reject(err);
    }
    for await (const fileDirent of openedDir) {
      const dir = fileDirent.name;
      const dirPath = path.join(ttySysClassPath, dir);

      let stat;
      try {
        stat = await fs.promises.stat(dirPath);
      } catch (err) {
        continue;
      }
      if (!stat.isDirectory()) {
        continue;
      }

      const port = { path: path.join("/dev", dir) };

      let fileStream;
      try {
        fileStream = await createReadStreamSafe(
          path.join(dirPath, "device", "uevent")
        );
      } catch (err) {
        continue;
      }

      const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity,
      });

      for await (const line of rl) {
        const found = line.match(productRegex);
        if (!found) {
          continue;
        }
        port.vendorId = found.groups["vendorId"];
        port.productId = found.groups["productId"];
        ports.push(port);
        break;
      }
    }
    resolve(ports);
  });
}

const UsbBusDevicesPath = "/sys/bus/usb/devices";

function listUsbDevices() {
  return new Promise(async (resolve, reject) => {
    const devices = [];
    let openedDir;
    try {
      openedDir = await fs.promises.opendir(UsbBusDevicesPath);
    } catch (err) {
      console.error(err);
      reject(err);
    }
    for await (const fileDirent of openedDir) {
      const dir = fileDirent.name;
      const dirPath = path.join(UsbBusDevicesPath, dir);

      let stat;
      try {
        stat = await fs.promises.stat(dirPath);
      } catch (err) {
        continue;
      }
      if (!stat.isDirectory()) {
        continue;
      }

      let fileStream;
      try {
        fileStream = await createReadStreamSafe(path.join(dirPath, "uevent"));
      } catch (err) {
        continue;
      }

      const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity,
      });

      for await (const line of rl) {
        const found = line.match(productRegex);
        if (!found) {
          continue;
        }
        const device = {
          deviceDescriptor: {
            idVendor: parseInt(found.groups["vendorId"], 16),
            idProduct: parseInt(found.groups["productId"], 16),
          },
        };
        devices.push(device);
        break;
      }
    }
    resolve(devices);
  });
}

export { insideFlatpak, listPorts, listUsbDevices };
