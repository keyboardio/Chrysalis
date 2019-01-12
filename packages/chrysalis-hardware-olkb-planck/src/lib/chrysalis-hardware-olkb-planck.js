/* chrysalis-hardware-olkb-planck -- Chrysalis OLKB Planck library
 * Copyright (C) 2019  Keyboard.io, Inc.
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

import Keymap from "./components/Keymap"

const Planck = {
  info: {
    vendor: "OLKB",
    product: "Planck",
    displayName: "Planck",
    urls: [
      {
        name: "Homepage",
        url: "https://olkb.com/planck"
      }
    ]
  },
  usb: {
    vendorId: 0xfeed,
    productId: 0x6060
  },
  keyboard: {
    rows: 4,
    columns: 12
  },
  components: {
    keymap: Keymap
  },

  flash: async () => {
    console.log("Not implemented yet.")
  }
}

export { Planck }
