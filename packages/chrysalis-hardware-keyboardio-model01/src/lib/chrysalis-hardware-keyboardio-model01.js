/* chrysalis-hardware-keyboardio-model01 -- Chrysalis Keyboardio Model01 support
 * Copyright (C) 2018  Keyboardio, Inc.
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

const Model01 = {
    info: {
        vendor: "Keyboard.io",
        product: "Model01",
        urls: [
            {
                name: "Homepage",
                url: "https://shop.keyboard.io/"
            },
            {
                name: "Forum",
                url: "https://community.keyboard.io/"
            },
            {
                name: "Chat",
                url: "https://discord.gg/4az77sf"
            }
        ]
    },
    usb: {
        vendorId: 0x1209,
        productId: 0x2301
    },
    keyboard: {
        rows: 4,
        columns: 16
    }
}

export { Model01 }
