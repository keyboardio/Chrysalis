/* chrysalis-hardware-keyboardio-atreus2 -- Chrysalis Preonic support
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

import Keymap from "./components/Keymap";

const Preonic = {
  info: {
    vendor: "Keyboardio",
    product: "Preonic",
    displayName: "Keyboardio Preonic",
    urls: [
      {
        name: "Homepage",
        url: "https://shop.keyboard.io/products/keyboardio-atreus",
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
    vendorId: 0x1209,
    productId: 0x2303,
    bootloader: {
      vendorId: 0x1209,
      productId: 0x2302,
      protocol: "avr109",
    },
  },
  keyboard: {
    rows: 4,
    columns: 12,
  },
  components: {
    keymap: Keymap,
  },
};

export { Preonic };
