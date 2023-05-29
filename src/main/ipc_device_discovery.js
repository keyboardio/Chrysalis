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

import { insideFlatpak, listUsbDevices } from "@renderer/utils/flatpak";
import { ipcMain } from "electron";
import fs from "fs";
import { findByIds, getDeviceList, WebUSB } from "usb";
import { sendToRenderer } from "./utils";

const webusb = new WebUSB({
  allowAllDevices: true,
});
export const notifyUsbDisconnect = (event) => {
  const vendor_id = event?.device?.vendorId;
  const product_id = event?.device?.productId;
  sendToRenderer("usb.device-disconnected", vendor_id, product_id);
};
export const notifyUsbConnect = (event) => {
  const vendor_id = event?.device?.vendorId;
  const product_id = event?.device?.productId;
  sendToRenderer("usb.device-connected", vendor_id, product_id);
};

export const addUsbEventListeners = () => {
  webusb.addEventListener("connect", notifyUsbConnect);
  webusb.addEventListener("disconnect", notifyUsbDisconnect);
};

export const removeUsbEventListeners = () => {
  webusb.removeEventListener("connect", notifyUsbConnect);
  webusb.removeEventListener("disconnect", notifyUsbDisconnect);
};

export const registerDeviceDiscoveryHandlers = () => {
  // We're relying on webusb to send us notifications about device
  // connect/disconnect events, but it only sends disconnect events for devices
  // it knows. If there are devices connected when we start up, we need to scan
  // them first to notice disconnects. We do that here.
  webusb.getDevices();

  ipcMain.handle("usb.scan-for-devices", (event) => {
    const webContents = event.sender;
    const devices = getDeviceList();
    // let devices = [];
    // if (insideFlatpak()) {
    //   devices = listUsbDevices();
    // } else {
    //   devices = getDeviceList();
    // }
    return devices;
  });
  ipcMain.handle("usb.is-device-connected", (event, vid, pid) => {
    if (insideFlatpak()) {
      const devices = listUsbDevices();
      for (const device of devices) {
        if (
          device.deviceDescriptor.idVendor === vid &&
          device.deviceDescriptor.idProduct === pid
        ) {
          return true;
        }
      }
      return false;
    }

    const device = findByIds(vid, pid);
    if (device) {
      return true;
    } else {
      return false;
    }
  });
  ipcMain.on("udev.isAvailable", (event) => {
    if (process.platform == "linux") {
      try {
        fs.accessSync("/run/udev");
      } catch (_) {
        event.returnValue = false;
        return;
      }
      event.returnValue = true;
    } else {
      event.returnValue = false;
    }
  });
};
