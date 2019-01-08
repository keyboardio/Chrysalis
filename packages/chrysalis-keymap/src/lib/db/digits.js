/* chrysalis-keymap -- Chrysalis keymap library
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

import { withModifiers } from "./utils"

const DigitTable = {
    groupName: "Digits",
    keys: [
        {
            code: 30,
            labels: {
                primary: "1"
            }
        },
        {
            code: 31,
            labels: {
                primary: "2"
            }
        },
        {
            code: 32,
            labels: {
                primary: "3"
            }
        },
        {
            code: 33,
            labels: {
                primary: "4"
            }
        },
        {
            code: 34,
            labels: {
                primary: "5"
            }
        },
        {
            code: 35,
            labels: {
                primary: "6"
            }
        },
        {
            code: 36,
            labels: {
                primary: "7"
            }
        },
        {
            code: 37,
            labels: {
                primary: "8"
            }
        },
        {
            code: 38,
            labels: {
                primary: "9"
            }
        },
        {
            code: 39,
            labels: {
                primary: "0"
            }
        }
    ]
}

const ShiftedDigitTable = {
    groupName: "Shifted Digits",
    keys: [
        {
            code: 2078,
            labels: {
                primary: "!"
            }
        },
        {
            code: 2079,
            labels: {
                primary: "@"
            }
        },
        {
            code: 2080,
            labels: {
                primary: "#"
            }
        },
        {
            code: 2081,
            labels: {
                primary: "$"
            }
        },
        {
            code: 2082,
            labels: {
                primary: "%"
            }
        },
        {
            code: 2083,
            labels: {
                primary: "^"
            }
        },
        {
            code: 2084,
            labels: {
                primary: "&"
            }
        },
        {
            code: 2085,
            labels: {
                primary: "*"
            }
        },
        {
            code: 2086,
            labels: {
                primary: "("
            }
        },
        {
            code: 2087,
            labels: {
                primary: ")"
            }
        }
    ]
}

const ModifiedDigitTables = [
    // Single
    withModifiers(DigitTable, "Control +", "C+", 256),
    withModifiers(DigitTable, "Alt +", "A+", 512),
    withModifiers(DigitTable, "AltGr +", "AGr+", 1024),
    ShiftedDigitTable,
    withModifiers(DigitTable, "Gui +", "G+", 4096),

    // Double
    withModifiers(DigitTable, "Control + Alt +", "C+A+", 768),
    withModifiers(DigitTable, "Control + AltGr +", "C+AGr+", 1280),
    withModifiers(DigitTable, "Control + Shift +", "C+S+", 2304),
    withModifiers(DigitTable, "Control + Gui +", "C+G+", 4352),
    withModifiers(DigitTable, "Alt + AltGr +", "A+AGr+", 1536),
    withModifiers(DigitTable, "Alt + Shift +", "A+S+", 2560),
    withModifiers(DigitTable, "Alt + Gui +", "A+G+", 4608),
    withModifiers(DigitTable, "AltGr + Shift +", "AGr+S+", 3072),
    withModifiers(DigitTable, "AltGr + Gui +", "AGr+G+", 5120),

    // Triple
    withModifiers(DigitTable, "Control + Alt + AltGr +", "C+A+AGr+", 1792),
    withModifiers(DigitTable, "Meh +", "Meh+", 2816),
    withModifiers(DigitTable, "Control + Alt + Gui +", "C+A+G+", 4864),
    withModifiers(DigitTable, "Control + AltGr + Shift +", "C+AGr+S+", 3328),
    withModifiers(DigitTable, "Control + AltGr + Gui +", "C+AGr+G+", 5376),
    withModifiers(DigitTable, "Control + Shift + Gui +", "C+S+G+", 6400),
    withModifiers(DigitTable, "Alt + AltGr + Shift +", "A+AGr+S+", 3584),
    withModifiers(DigitTable, "Alt + AltGr + Gui +", "A+AGr+G+", 5632),
    withModifiers(DigitTable, "Alt + Shift + Gui +", "A+S+G+", 6656),
    withModifiers(DigitTable, "AltGr + Shift + Gui +", "AGr+S+G+", 7168),

    // Quad
    withModifiers(
        DigitTable,
        "Meh + AltGr +",
        "M+AGr+",
        3840
    ),
    withModifiers(
        DigitTable,
        "Control + Alt + AltGr + Gui +",
        "C+A+AGr+G+",
        5888
    ),
    withModifiers(DigitTable, "Hyper +", "Hyper+", 6912),
    withModifiers(DigitTable, "Alt + AltGr + Shift + Gui +", "A+AGr+S+G+", 7680),

    // All
    withModifiers(
        DigitTable,
        "Hyper + AltGr +",
        "H+AGr",
        7936
    )
]

export { DigitTable as default, ModifiedDigitTables }
