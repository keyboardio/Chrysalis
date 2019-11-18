/* Bazecor keymap library
 * Copyright (C) 2019  DygmaLab SE
 *
 * This program is free software: you can redistribute it and/or modify it under
 * the terms of the GNU General Public License as published by the Free Software
 * Foundation, version 3.
 *
 * This program is distributed in the hope that it will be useful, but WITHOUT
 * ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS
 * FOR A PARTICULAR PURPOSE. See the GNU General Public License for more
 * details.
 *
 * You should have received a copy of the GNU General Public License along with
 * this program. If not, see <http://www.gnu.org/licenses/>.
 */

/**
 * Is an Array of objects of values that have to be modified.
 */

import { withModifiers } from "../../db/utils"

const deutschLetters = [
    {
        code: 28,
        labels: {
            primary: "Z"
        }
    },
    {
        code: 47,
        labels: {
            primary: "Ü",
        },
        newGroupName: "Letters"
    },
    {
        code: 51,
        labels: {
            primary: "Ö"
        },
        newGroupName: "Letters"
    },
    {
        code: 52,
        labels: {
            primary: "Ä"
        },
        newGroupName: "Letters"
    },
    {
        code: 29,
        labels: {
            primary: "Y"
        }
    }
];

const deutschModifierKeys = [
    {
        code: 53,
        labels: {
            primary: "^"
        }
    },
    {
        code: 45,
        labels: {
            primary: "ß"
        },
        newGroupName: "Letters"
    },
    {
        code: 46,
        labels: {
            primary: "´"
        }
    },
    {
        code: 48,
        labels: {
            primary: "+"
        }
    },
    {
        code: 49,
        labels: {
            primary: "<"
        }
    },
    {
        code: 56,
        labels: {
            primary: "-"
        }
    },
];

const altCtrlDeutsch = {
    groupName: "AltCtrl Deutsch",
    keys: [
        {
            code: 799,
            labels: {
                primary: "²"
            }
        },
        {
            code: 800,
            labels: {
                primary: "³"
            }
        },
        {
            code: 804,
            labels: {
                primary: "{"
            }
        },
        {
            code: 805,
            labels: {
                primary: "["
            }
        },
        {
            code: 806,
            labels: {
                primary: "]"
            }
        },
        {
            code: 807,
            labels: {
                primary: "}"
            }
        },
        {
            code: 813,
            labels: {
                primary: "\\"
            }
        },
        {
            code: 788,
            labels: {
                primary: "@"
            }
        },
        {
            code: 776,
            labels: {
                primary: "€"
            }
        },
        {
            code: 816,
            labels: {
                primary: "~"
            }
        },
        {
            code: 817,
            labels: {
                primary: "|"
            }
        },
        {
            code: 784,
            labels: {
                primary: "µ"
            }
        },
    ]
};

const shiftModifierDeutsch = {
    groupName: "Shifted Deutsch",
    keys: [
        {
            code: 2101,
            labels: {
                primary: "°"
            }
        },
        {
            code: 2079,
            labels: {
                primary: "\""
            }
        },
        {
            code: 2080,
            labels: {
                primary: "§"
            }
        },
        {
            code: 2083,
            labels: {
                primary: "&"
            }
        },
        {
            code: 2084,
            labels: {
                primary: "/"
            }
        },
        {
            code: 2085,
            labels: {
                primary: "("
            }
        },
        {
            code: 2086,
            labels: {
                primary: ")"
            }
        },
        {
            code: 2087,
            labels: {
                primary: "="
            }
        },
        {
            code: 2093,
            labels: {
                primary: "?"
            }
        },
        {
            code: 2094,
            labels: {
                primary: "`"
            }
        },
        {
            code: 2096,
            labels: {
                primary: "*"
            }
        },
        {
            code: 2097,
            labels: {
                primary: ">"
            }
        },
        {
            code: 2102,
            labels: {
                primary: ";"
            }
        },
        {
            code: 2103,
            labels: {
                primary: ":"
            }
        },
        {
            code: 2104,
            labels: {
                primary: "_"
            }
        }
    ]
}

const deutsch = deutschLetters.concat(deutschModifierKeys);

const table = {keys: deutsch};
const tableWithoutModifier = {keys: deutschLetters};

const deutschCtrlTable = withModifiers(table, "Control +", "C+", 256)
const deutschLAltTable = withModifiers(table, "Alt +", "A+", 512)
const deutschRAltTable = withModifiers(table, "AltGr +", "AGr+", 1024)
const deutschShiftTable = withModifiers(tableWithoutModifier, "Shift +", "S+", 2048)
const deutschGuiTable = withModifiers(table, "Gui +", "G+", 4096)
// Double

const deutschCATable = withModifiers(
    table,
    "Control + Alt +",
    "C+A+",
    768
)

const deutschCAGrTable = withModifiers(
    table,
    "Control + AltGr +",
    "C+AGr+",
    1280
)

const deutschCSTable = withModifiers(
    table,
    "Control + Shift +",
    "C+S+",
    2304
)

const deutschCGTable = withModifiers(
    table,
    "Control + Gui +",
    "C+G+",
    4352
)

const deutschAAGrTable = withModifiers(
    table,
    "Alt + AltGr +",
    "A+AGr+",
    1536
)

const deutschASTable = withModifiers(table, "Alt + Shift +", "A+S+", 2560)

const deutschAGTable = withModifiers(table, "Alt + Gui +", "A+G+", 4608)

const deutschAGrSTable = withModifiers(
    table,
    "AltGr + Shift +",
    "AGr+S+",
    3072
)

const deutschAGrGTable = withModifiers(
    table,
    "AltGr + Gui +",
    "AGr+G+",
    5120
)

// Triple

const deutschCAAGTable = withModifiers(
    table,
    "Control + Alt + AltGr +",
    "C+A+AGr+",
    1792
)

const deutschCASTable = withModifiers(table, "Meh +", "Meh+", 2816)

const deutschCAGTable = withModifiers(
    table,
    "Control + Alt + Gui +",
    "C+A+G+",
    4864
)

const deutschCAGSTable = withModifiers(
    table,
    "Control + AltGr + Shift +",
    "C+AGr+S+",
    3328
)

const deutschCAGGTable = withModifiers(
    table,
    "Control + AltGr + Gui +",
    "C+AGr+G+",
    5376
)

const deutschCSGTable = withModifiers(
    table,
    "Control + Shift + Gui +",
    "C+S+G+",
    6400
)

const deutschAAGSTable = withModifiers(
    table,
    "Alt + AltGr + Shift +",
    "A+AGr+S+",
    3584
)

const deutschAAGGTable = withModifiers(
    table,
    "Alt + AltGr + Gui +",
    "A+AGr+G+",
    5632
)

const deutschASGTable = withModifiers(
    table,
    "Alt + Shift + Gui +",
    "A+S+G+",
    6656
)

const deutschAGSGTable = withModifiers(
    table,
    "AltGr + Shift + Gui +",
    "AGr+S+G+",
    7168
)

// Quad

const deutschCAAGrSTable = withModifiers(
    table,
    "Meh + AltGr +",
    "M+AGr+",
    3840
)

const deutschCAAGrGTable = withModifiers(
    table,
    "Control + Alt + AltGr + Gui +",
    "C+A+AGr+G+",
    5888
)

const deutschAAGrSGTable = withModifiers(
    table,
    "Alt + AltGr + Shift + Gui +",
    "A+AGr+S+G+",
    7680
)

const deutschAllModTable = withModifiers(
    table,
    "Hyper + AltGr +",
    "H+AGr+",
    7936
)

const deutschModifiedTables = [
    shiftModifierDeutsch,
    deutschCtrlTable,
    deutschLAltTable,
    deutschRAltTable,
    deutschShiftTable,
    deutschGuiTable,
    deutschCATable,
    altCtrlDeutsch,
    deutschCAGrTable,
    deutschCSTable,
    deutschCGTable,
    deutschAAGrTable,
    deutschASTable,
    deutschAGTable,
    deutschAGrSTable,
    deutschAGrGTable,
    deutschCAAGTable,
    deutschCASTable,
    deutschCAGTable,
    deutschCAGSTable,
    deutschCAGGTable,
    deutschCSGTable,
    deutschAAGSTable,
    deutschAAGGTable,
    deutschASGTable,
    deutschAGSGTable,
    deutschCAAGrSTable,
    deutschCAAGrGTable,
    withModifiers(table, "Hyper +", "Hyper+", 6912),
    deutschAAGrSGTable,
    deutschAllModTable
]

export { deutsch as default, deutschModifiedTables }
// export default deutsch;
