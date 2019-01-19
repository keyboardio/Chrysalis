/* chrysalis-hardware-pjrc-teensy -- A Chrysalis hardware library
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

import { teensy } from "@chrysalis-api/flash"

const GenericTeensy = {
    info: {
        vendor: "PJRC",
        product: "Teensy",
        displayName: "Generic Teensy",
        urls: [
            {
                name: "Homepage",
                url: "https://www.pjrc.com/teensy/"
            }
        ]
    },
    usb: {
        vendorId: 0x16c0,
        productId: 0x0478
    },

    flash: async (_, filename) => {
        return teensy(filename)
    }
}

export { GenericTeensy }
