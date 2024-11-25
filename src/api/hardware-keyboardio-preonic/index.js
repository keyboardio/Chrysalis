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

import { flash, flashers } from "@api/flash";

import Keymap from "./components/Keymap";


const Preonic = {
  info: {
    vendor: "Keyboardio",
    product: "Preonic",
    firmwareType: "bin",
    displayName: "Keyboardio Preonic",
    urls: [
      {
        name: "Homepage",
        url: "https://shop.keyboard.io/",
      },
      {
        name: "Forum",
        url: "https://community.keyboard.io/",
      },
      {
        name: "Chat",
        url: "https://keyboard.io/discord-invite",
      },
    ],
  },
  usb: {
    vendorId: 0x3496,
    productId: 0x00A0,
    bootloader: {
      vendorId: 0x3496,
      productId: 0x00A1,
      protocol: "nrfdfu",
    },
  },
  keyboard: {
    rows: 5,
    columns: 12,
  },
  components: {
    keymap: Keymap,
  },

  flash: async (port, filename, options) => {
    return flash(flashers.dfuUtil, null, port, filename, options);
  },
};

export { Preonic };
