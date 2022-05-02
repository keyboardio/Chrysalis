/* Chrysalis -- Kaleidoscope Command Center
 * Copyright (C) 2018-2021  Keyboardio, Inc.
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
import { Avr109, Avr109Bootloader, DFUUtil, DFUUtilBootloader } from "../flash";

const Model01 = {
  info: {
    vendor: "Keyboardio",
    product: "Model01",
    displayName: "Keyboardio Model01",
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
    vendorId: 0x1209,
    productId: 0x2301,
    bootloader: {
      vendorId: 0x1209,
      productId: 0x2300,
    },
  },
  keyboard: {
    rows: 4,
    columns: 16,
  },
  components: {
    keymap: Keymap,
  },

  flashSteps: ["bootloaderTrigger", "bootloaderWait", "flash"],
  externalFlasher: "avrdude",
  flash: async (port, filename, options) => {
    const board = {
      name: "Keyboardio Model 01",
      baud: 9600,
      productId: ["0x2300", "0x2301"],
      protocol: "avr109",
      signature: new Buffer.from([0x43, 0x41, 0x54, 0x45, 0x52, 0x49, 0x4e]),
    };
    if (options.device && options.device.bootloader) {
      return Avr109Bootloader(board, port, filename, options);
    } else {
      return Avr109(board, port, filename, options);
    }
  },
};

const Model100 = {
  info: {
    vendor: "Keyboardio",
    product: "Model100",
    displayName: "Keyboardio Model100",
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
    productId: 0x0006,
    bootloader: {
      vendorId: 0x3496,
      productId: 0x0005,
      type: "dfu",
    },
  },
  keyboard: {
    rows: 4,
    columns: 16,
  },
  components: {
    keymap: Keymap,
  },

  flashSteps: [
    "saveEEPROM",
    "bootloaderTrigger",
    "bootloaderWait",
    "flash",
    "restoreEEPROM",
    "reboot",
  ],
  flash: async (port, filename, options) => {
    return DFUUtil(port, filename, options);
  },
};

const Model100Bootloader = {
  info: {
    vendor: "Keyboardio",
    product: "Model100",
    firmwareType: "bin",
    displayName: "Keyboardio Model100",
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
    productId: 0x0005,
    bootloader: {
      vendorId: 0x3496,
      productId: 0x0005,
      type: "dfu",
    },
  },
  keyboard: {
    rows: 4,
    columns: 16,
  },
  components: {
    keymap: Keymap,
  },

  flashSteps: ["flash"],
  flash: async (port, filename, options) => {
    return DFUUtilBootloader(port, filename, options);
  },
};

export { Model01, Model100, Model100Bootloader };
