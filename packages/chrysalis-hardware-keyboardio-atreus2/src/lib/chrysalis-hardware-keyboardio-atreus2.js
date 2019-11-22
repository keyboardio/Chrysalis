/* chrysalis-hardware-keyboardio-atreus2 -- Chrysalis Atreus2 support
 * Copyright (C) 2019  Keyboardio, Inc.
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
import { Avr109, Avr109Bootloader } from "@chrysalis-api/flash"

const Atreus2 = {
    info: {
        vendor: "Keyboard.io",
        product: "Atreus",
        displayName: "Keyboardio Atreus",
        urls: [
            {
                name: "Homepage",
                url: "https://atreus.technomancy.us/"
            }
        ]
    },
    usb: {
        vendorId: 0x1209,
        productId: 0x2301
    },
    keyboard: {
        rows: 4,
        columns: 12
    },
    components: {
        keymap: Keymap
    },

    flash: async (port, filename) => {
      const board = {
        name: "Keyboardio Atreus",
        baud: 9600,
        productId: ["0x2302", "0x2301"],
        protocol: "avr109",
        signature: new Buffer.from([0x43, 0x41, 0x54, 0x45, 0x52, 0x49, 0x4e])
      }
      return Avr109(board, port, filename)
    }
}

const Atreus2Bootloader = {
    info: {
        vendor: "Keyboard.io",
        product: "Atreus",
        displayName: "Atreus",
        urls: [
            {
                name: "Homepage",
                url: "https://atreus.technomancy.us/"
            }
        ]
    },
    usb: {
        vendorId: 0x1209,
        productId: 0x2302
    },
    keyboard: {
        rows: 4,
        columns: 12
    },
    components: {
        keymap: Keymap
    },

    flash: async (port, filename) => {
        const board = {
            name: "Keyboardio Atreus",
            baud: 9600,
            productId: ["0x2302"],
            protocol: "avr109",
            signature: new Buffer.from([0x43, 0x41, 0x54, 0x45, 0x52, 0x49, 0x4e])
        }
        return Avr109Bootloader(board, port, filename)
    }
}

export { Atreus2, Atreus2Bootloader }
