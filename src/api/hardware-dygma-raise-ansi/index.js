/* chrysalis-hardware-dygma-raise -- Chrysalis support for Dygma Raise
 * Copyright (C) 2018-2020  Keyboardio, Inc.
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

import KeymapANSI from "./components/Keymap-ANSI";
import Focus from "../focus";

const Raise_ANSI = {
  info: {
    vendor: "Dygma",
    product: "Raise",
    keyboardType: "ANSI",
    displayName: "Dygma Raise ANSI",
    urls: [
      {
        name: "Homepage",
        url: "https://www.dygma.com/raise/"
      }
    ]
  },
  usb: {
    vendorId: 0x1209,
    productId: 0x2201
  },
  keyboard: {
    rows: 5,
    columns: 16
  },
  components: {
    keymap: KeymapANSI
  },

  flash: async (_, filename, flashRaise) => {
    return new Promise(async (resolve, reject) => {
      try {
        await flashRaise.updateFirmware(filename);
        resolve();
      } catch (e) {
        reject(e);
      }
      flashRaise.saveBackupFile();
    });
  },

  isDeviceSupported: async port => {
    let focus = new Focus();
    let layout = localStorage.getItem(port.serialNumber);
    if (!layout) {
      await focus.open(port.path, port.device);
      layout = await focus.command("hardware.layout");
      focus.close();
      localStorage.setItem(port.serialNumber, layout);
    }
    return layout.trim() === "ANSI";
  }
};

const Raise_ANSIBootloader = {
  info: {
    vendor: "Dygma",
    product: "Raise",
    keyboardType: "ANSI",
    displayName: "Dygma Raise ANSI",
    urls: [
      {
        name: "Homepage",
        url: "https://www.dygma.com/raise/"
      }
    ]
  },
  usb: {
    vendorId: 0x1209,
    productId: 0x2200
  }
};

export { Raise_ANSI, Raise_ANSIBootloader };
