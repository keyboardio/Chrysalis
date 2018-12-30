/* chrysalis-hardware-technomancy-Atreus -- Chrysalis Atreus support
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

import Keymap from "./components/Keymap"

const Atreus = {
    info: {
        vendor: "Technomancy",
        product: "Atreus",
        urls: [
            {
                name: "Homepage",
                url: "https://atreus.technomancy.us/"
            }
        ]
    },
    usb: {
        vendorId: 0x1209,
        productId: 0xa1e5
    },
    keyboard: {
        rows: 4,
        columns: 11
    },
    components: {
        keymap: Keymap
    },
    messages: {},

    flash: async () => {
        console.log("Not implemented yet.")
    }
}

export { Atreus }
