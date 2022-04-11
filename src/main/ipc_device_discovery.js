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

import { ipcMain, BrowserWindow } from "electron";
import { findByIds, getDeviceList, WebUSB } from "usb";
// Focus
import Focus from "../api/focus";
import Hardware from "../api/hardware";
const focus = new Focus();

const webusb = new WebUSB({
  allowAllDevices: true,
});
export const notifyUsbDisconnect = (event) => {
  let vendor_id = event?.device?.vendorId;
  let product_id = event?.device?.productId;
  BrowserWindow.getAllWindows().forEach((win) => {
    if (win) {
      win.send("usb-device-disconnected", vendor_id, product_id);
    }
  });
};
export const notifyUsbConnect = (event) => {
  let vendor_id = event?.device?.vendorId;
  let product_id = event?.device?.productId;
  BrowserWindow.getAllWindows().forEach((win) => {
    if (win) {
      win.send("usb-device-connected", vendor_id, product_id);
    }
  });
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
  ipcMain.handle("usb-scan-for-devices", (event) => {
    const webContents = event.sender;
    const devices = getDeviceList();
    return devices;
  });
  ipcMain.handle("usb-is-device-connected", (event, vid, pid) => {
    const device = findByIds(vid, pid);
    if (device) {
      return true;
    } else {
      return false;
    }
  });

  ipcMain.handle("focus-find-serial-devices", (event) => {
    return focus.find(Hardware.serial);
  });
};
