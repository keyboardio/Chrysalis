/* chrysalis-hardware-ez-ergodox -- Chrysalis ErgoDox support
 * Copyright (C) 2018, 2019  Keyboardio, Inc.
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
import { teensy } from "@chrysalis-api/flash"

const ErgoDox = {
    info: {
        vendor: "EZ",
        product: "ErgoDox",
        displayName: "ErgoDox EZ",
        urls: [
            {
                name: "Homepage",
                url: "https://ergodox-ez.com/"
            }
        ]
    },
    usb: {
        vendorId: 0xfeed,
        productId: 0x1307
    },
    keyboard: {
        rows: 14,
        columns: 6
    },
    components: {
        keymap: Keymap
    },

    flash: async (_, filename) => {
        return teensy(filename)
    },
    flashTool: "teensy_loader_cli"
}

export { ErgoDox }
