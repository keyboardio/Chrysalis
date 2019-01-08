/* chrysalis-keymap -- Chrysalis keymap library
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

import { withModifiers } from "./utils"

const NumpadTable = {
    groupName: "Numpad",
    keys: [
        {
            code: 89,
            labels: {
                top: "Numpad",
                primary: "1"
            }
        },
        {
            code: 90,
            labels: {
                top: "Numpad",
                primary: "2"
            }
        },
        {
            code: 91,
            labels: {
                top: "Numpad",
                primary: "3"
            }
        },
        {
            code: 92,
            labels: {
                top: "Numpad",
                primary: "4"
            }
        },
        {
            code: 93,
            labels: {
                top: "Numpad",
                primary: "5"
            }
        },
        {
            code: 94,
            labels: {
                top: "Numpad",
                primary: "6"
            }
        },
        {
            code: 95,
            labels: {
                top: "Numpad",
                primary: "7"
            }
        },
        {
            code: 96,
            labels: {
                top: "Numpad",
                primary: "8"
            }
        },
        {
            code: 97,
            labels: {
                top: "Numpad",
                primary: "9"
            }
        },
        {
            code: 98,
            labels: {
                top: "Numpad",
                primary: "0"
            }
        },
        {
            code: 99,
            labels: {
                top: "Numpad",
                primary: "."
            }
        },
        {
            code: 85,
            labels: {
                top: "Numpad",
                primary: "*"
            }
        },
        {
            code: 86,
            labels: {
                top: "Numpad",
                primary: "-"
            }
        },
        {
            code: 87,
            labels: {
                top: "Numpad",
                primary: "+"
            }
        },
        {
            code: 84,
            labels: {
                top: "Numpad",
                primary: "/"
            }
        }
    ]
}

const ModifiedNumpadTables = [
    // Single
    withModifiers(NumpadTable, "Control +", "C+", 256),
    withModifiers(NumpadTable, "Alt +", "A+", 512),
    withModifiers(NumpadTable, "AltGr +", "AGr+", 1024),
    withModifiers(NumpadTable, "Shift +", "S+", 2048),
    withModifiers(NumpadTable, "Gui +", "G+", 4096),

    // Double
    withModifiers(NumpadTable, "Control + Alt +", "C+A+", 768),
    withModifiers(NumpadTable, "Control + AltGr +", "C+AGr+", 1280),
    withModifiers(NumpadTable, "Control + Shift +", "C+S+", 2304),
    withModifiers(NumpadTable, "Control + Gui +", "C+G+", 4352),
    withModifiers(NumpadTable, "Alt + AltGr +", "A+AGr+", 1536),
    withModifiers(NumpadTable, "Alt + Shift +", "A+S+", 2560),
    withModifiers(NumpadTable, "Alt + Gui +", "A+G+", 4608),
    withModifiers(NumpadTable, "AltGr + Shift +", "AGr+S+", 3072),
    withModifiers(NumpadTable, "AltGr + Gui +", "AGr+G+", 5120),

    // Triple
    withModifiers(NumpadTable, "Control + Alt + AltGr +", "C+A+AGr+", 1792),
    withModifiers(NumpadTable, "Meh +", "Meh+", 2816),
    withModifiers(NumpadTable, "Control + Alt + Gui +", "C+A+G+", 4864),
    withModifiers(
        NumpadTable,
        "Control + AltGr + Shift +",
        "C+AGr+S+",
        3328
    ),
    withModifiers(NumpadTable, "Control + AltGr + Gui +", "C+AGr+G+", 5376),
    withModifiers(NumpadTable, "Control + Shift + Gui +", "C+S+G+", 6400),
    withModifiers(NumpadTable, "Alt + AltGr + Shift +", "A+AGr+S+", 3584),
    withModifiers(NumpadTable, "Alt + AltGr + Gui +", "A+AGr+G+", 5632),
    withModifiers(NumpadTable, "Alt + Shift + Gui +", "A+S+G+", 6656),
    withModifiers(NumpadTable, "AltGr + Shift + Gui +", "AGr+S+G+", 7168),

    // Quad
    withModifiers(
        NumpadTable,
        "Meh + AltGr +",
        "M+AGr+",
        3840
    ),
    withModifiers(
        NumpadTable,
        "Control + Alt + AltGr + Gui +",
        "C+A+AGr+G+",
        5888
    ),
    withModifiers(NumpadTable, "Hyper +", "Hyper+", 6912),
    withModifiers(
        NumpadTable,
        "Alt + AltGr + Shift + Gui +",
        "A+AGr+S+G+",
        7680
    ),

    // All
    withModifiers(
        NumpadTable,
        "Hyper + AltGr +",
        "H+AGr+",
        7936
    )
]

export { NumpadTable as default, ModifiedNumpadTables }
