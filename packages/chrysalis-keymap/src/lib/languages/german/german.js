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

const germanLetters = [
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

const germanModifierKeys = [
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

const altCtrlGerman = {
    groupName: "AltCtrl German",
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

const shiftModifierGerman = {
    groupName: "Shifted German",
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

const german = germanLetters.concat(germanModifierKeys);

const table = {keys: german};
const tableWithoutModifier = {keys: germanLetters};

const germanCtrlTable = withModifiers(table, "Control +", "C+", 256)
const germanLAltTable = withModifiers(table, "Alt +", "A+", 512)
const germanRAltTable = withModifiers(table, "AltGr +", "AGr+", 1024)
const germanShiftTable = withModifiers(tableWithoutModifier, "Shift +", "S+", 2048)
const germanGuiTable = withModifiers(table, "Gui +", "G+", 4096)
// Double

const germanCATable = withModifiers(
    table,
    "Control + Alt +",
    "C+A+",
    768
)

const germanCAGrTable = withModifiers(
    table,
    "Control + AltGr +",
    "C+AGr+",
    1280
)

const germanCSTable = withModifiers(
    table,
    "Control + Shift +",
    "C+S+",
    2304
)

const germanCGTable = withModifiers(
    table,
    "Control + Gui +",
    "C+G+",
    4352
)

const germanAAGrTable = withModifiers(
    table,
    "Alt + AltGr +",
    "A+AGr+",
    1536
)

const germanASTable = withModifiers(table, "Alt + Shift +", "A+S+", 2560)

const germanAGTable = withModifiers(table, "Alt + Gui +", "A+G+", 4608)

const germanAGrSTable = withModifiers(
    table,
    "AltGr + Shift +",
    "AGr+S+",
    3072
)

const germanAGrGTable = withModifiers(
    table,
    "AltGr + Gui +",
    "AGr+G+",
    5120
)

// Triple

const germanCAAGTable = withModifiers(
    table,
    "Control + Alt + AltGr +",
    "C+A+AGr+",
    1792
)

const germanCASTable = withModifiers(table, "Meh +", "Meh+", 2816)

const germanCAGTable = withModifiers(
    table,
    "Control + Alt + Gui +",
    "C+A+G+",
    4864
)

const germanCAGSTable = withModifiers(
    table,
    "Control + AltGr + Shift +",
    "C+AGr+S+",
    3328
)

const germanCAGGTable = withModifiers(
    table,
    "Control + AltGr + Gui +",
    "C+AGr+G+",
    5376
)

const germanCSGTable = withModifiers(
    table,
    "Control + Shift + Gui +",
    "C+S+G+",
    6400
)

const germanAAGSTable = withModifiers(
    table,
    "Alt + AltGr + Shift +",
    "A+AGr+S+",
    3584
)

const germanAAGGTable = withModifiers(
    table,
    "Alt + AltGr + Gui +",
    "A+AGr+G+",
    5632
)

const germanASGTable = withModifiers(
    table,
    "Alt + Shift + Gui +",
    "A+S+G+",
    6656
)

const germanAGSGTable = withModifiers(
    table,
    "AltGr + Shift + Gui +",
    "AGr+S+G+",
    7168
)

// Quad

const germanCAAGrSTable = withModifiers(
    table,
    "Meh + AltGr +",
    "M+AGr+",
    3840
)

const germanCAAGrGTable = withModifiers(
    table,
    "Control + Alt + AltGr + Gui +",
    "C+A+AGr+G+",
    5888
)

const germanAAGrSGTable = withModifiers(
    table,
    "Alt + AltGr + Shift + Gui +",
    "A+AGr+S+G+",
    7680
)

const germanAllModTable = withModifiers(
    table,
    "Hyper + AltGr +",
    "H+AGr+",
    7936
)

const germanModifiedTables = [
    shiftModifierGerman,
    germanCtrlTable,
    germanLAltTable,
    germanRAltTable,
    germanShiftTable,
    germanGuiTable,
    germanCATable,
    altCtrlGerman,
    germanCAGrTable,
    germanCSTable,
    germanCGTable,
    germanAAGrTable,
    germanASTable,
    germanAGTable,
    germanAGrSTable,
    germanAGrGTable,
    germanCAAGTable,
    germanCASTable,
    germanCAGTable,
    germanCAGSTable,
    germanCAGGTable,
    germanCSGTable,
    germanAAGSTable,
    germanAAGGTable,
    germanASGTable,
    germanAGSGTable,
    germanCAAGrSTable,
    germanCAAGrGTable,
    withModifiers(table, "Hyper +", "Hyper+", 6912),
    germanAAGrSGTable,
    germanAllModTable
]

export { german as default, germanModifiedTables }
// export default german;
