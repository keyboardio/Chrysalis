/* chrysalis-hardware-keyboardio-model01 -- Chrysalis Keyboardio Model01 support
 * Copyright (C) 2018  Gergely Nagy
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

/**
 * [Keyboardio Model01][m01] hardware descriptor.
 *
 * Can be used with `Focus.find()`, `Focus.open()`, and so on. Describes the
 * Model01.
 *
 * Supports the `chrysalis-keymap` package too.
 *
 * [m01]: https://shop.keyboard.io/
 */
const Model01 = {
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
