/* chrysalis-hardware-dygma-raise -- Chrysalis support for Dygma Raise
 * Copyright (C) 2018-2019  Keyboardio, Inc.
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

import KeymapISO from "./components/Keymap-ISO";
import Focus from "@chrysalis-api/focus";

const Raise_ISO = {
  info: {
    vendor: "Dygma",
    product: "Raise",
    keyboardType: "ISO",
    displayName: "Dygma Raise ISO",
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
    keymap: KeymapISO
  },

  flash: async () => {
    console.log("Not implemented yet.");
  },

  isDeviceSupported: async port => {
    let focus = new Focus();
    await focus.open(port.comName);
    const layout = await focus.command("hardware.layout");
    focus.close();
    if (layout == "iso") {
      return true;
    }
    return false;
  }
};

export { Raise_ISO };
