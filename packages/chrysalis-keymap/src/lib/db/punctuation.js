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

const PunctuationTable = {
    groupName: "Punctuation",
    keys: [
        {
            code: 45,
            labels: {
                primary: "-"
            }
        },
        {
            code: 46,
            labels: {
                primary: "="
            }
        },
        {
            code: 47,
            labels: {
                primary: "["
            }
        },
        {
            code: 48,
            labels: {
                primary: "]"
            }
        },
        {
            code: 49,
            labels: {
                primary: "\\"
            }
        },
        {
            code: 51,
            labels: {
                primary: ";"
            }
        },
        {
            code: 52,
            labels: {
                primary: "'"
            }
        },
        {
            code: 53,
            labels: {
                primary: "`"
            }
        },
        {
            code: 54,
            labels: {
                primary: ","
            }
        },
        {
            code: 55,
            labels: {
                primary: "."
            }
        },
        {
            code: 56,
            labels: {
                primary: "/"
            }
        },
        {
            code: 57,
            labels: {
                primary: "CapsLK",
                verbose: "Caps Lock"
            }
        }
    ]
}

const ShiftedPunctuationTable = {
    groupName: "Shifted Punctuation",
    keys: [
        {
            code: 2093,
            labels: {
                primary: "_"
            }
        },
        {
            code: 2094,
            labels: {
                primary: "+"
            }
        },
        {
            code: 2095,
            labels: {
                primary: "{"
            }
        },
        {
            code: 2096,
            labels: {
                primary: "}"
            }
        },
        {
            code: 2097,
            labels: {
                primary: "|"
            }
        },
        {
            code: 2098,
            labels: {
                primary: ":"
            }
        },
        {
            code: 2099,
            labels: {
                primary: "\""
            }
        },
        {
            code: 2100,
            labels: {
                primary: "~"
            }
        },
        {
            code: 2101,
            labels: {
                primary: "<"
            }
        },
        {
            code: 2102,
            labels: {
                primary: ">"
            }
        },
        {
            code: 2103,
            labels: {
                primary: "?"
            }
        }
    ]
}

const ModifiedPunctuationTables = [
    // Single
    withModifiers(PunctuationTable, "Control +", "C+", 256),
    withModifiers(PunctuationTable, "Alt +", "A+", 512),
    withModifiers(PunctuationTable, "AltGr +", "AGr+", 1024),
    ShiftedPunctuationTable,
    withModifiers(PunctuationTable, "Gui +", "G+", 4096),

    // Double
    withModifiers(PunctuationTable, "Control + Alt +", "C+A+", 768),
    withModifiers(PunctuationTable, "Control + AltGr +", "C+AGr+", 1280),
    withModifiers(PunctuationTable, "Control + Shift +", "C+S+", 2304),
    withModifiers(PunctuationTable, "Control + Gui +", "C+G+", 4352),
    withModifiers(PunctuationTable, "Alt + AltGr +", "A+AGr+", 1536),
    withModifiers(PunctuationTable, "Alt + Shift +", "A+S+", 2560),
    withModifiers(PunctuationTable, "Alt + Gui +", "A+G+", 4608),
    withModifiers(PunctuationTable, "AltGr + Shift +", "AGr+S+", 3072),
    withModifiers(PunctuationTable, "AltGr + Gui +", "AGr+G+", 5120),

    // Triple
    withModifiers(PunctuationTable, "Control + Alt + AltGr +", "C+A+AGr+", 1792),
    withModifiers(PunctuationTable, "Meh +", "Meh+", 2816),
    withModifiers(PunctuationTable, "Control + Alt + Gui +", "C+A+G+", 4864),
    withModifiers(
        PunctuationTable,
        "Control + AltGr + Shift +",
        "C+AGr+S+",
        3328
    ),
    withModifiers(PunctuationTable, "Control + AltGr + Gui +", "C+AGr+G+", 5376),
    withModifiers(PunctuationTable, "Control + Shift + Gui +", "C+S+G+", 6400),
    withModifiers(PunctuationTable, "Alt + AltGr + Shift +", "A+AGr+S+", 3584),
    withModifiers(PunctuationTable, "Alt + AltGr + Gui +", "A+AGr+G+", 5632),
    withModifiers(PunctuationTable, "Alt + Shift + Gui +", "A+S+G+", 6656),
    withModifiers(PunctuationTable, "AltGr + Shift + Gui +", "AGr+S+G+", 7168),

    // Quad
    withModifiers(
        PunctuationTable,
        "Meh + AltGr +",
        "M+AGr+",
        3840
    ),
    withModifiers(
        PunctuationTable,
        "Control + Alt + AltGr + Gui +",
        "C+A+AGr+G+",
        5888
    ),
    withModifiers(PunctuationTable, "Hyper +", "Hyper+", 6912),
    withModifiers(
        PunctuationTable,
        "Alt + AltGr + Shift + Gui +",
        "A+AGr+S+G+",
        7680
    ),

    // All
    withModifiers(
        PunctuationTable,
        "Hyper + AltGr +",
        "H+AGr+",
        7936
    )
]

export { PunctuationTable as default, ModifiedPunctuationTables }
