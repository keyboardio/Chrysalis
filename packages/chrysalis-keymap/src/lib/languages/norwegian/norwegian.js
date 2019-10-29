/* chrysalis-keymap -- Chrysalis keymap library
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

const norwegianLetters = [
    {
        code: 47,
        labels: {
            primary: "Å"
        },
        newGroupName: "Letters"
    },
    {
        code: 51,
        labels: {
            primary: "Ø"
        },
        newGroupName: "Letters"
    },
    {
        code: 52,
        labels: {
            primary: "Æ"
        },
        newGroupName: "Letters"
    }
];

const norwegianModifierKeys = [
    {
        code: 53,
        labels: {
            primary: "|"
        }
    },
    {
        code: 45,
        labels: {
            primary: "+"
        }
    },
    {
        code: 46,
        labels: {
            primary: "\\"
        }
    },
    {
        code: 48,
        labels: {
            primary: "¨"
        }
    },
    {
        code: 49,
        labels: {
            primary: "'"
        }
    },
    {
        code: 56,
        labels: {
            primary: "-"
        }
    }
];

const altCtrlNorwegian = {
    groupName: "AltCtrl Norwegian",
    keys: [
        {
            code: 799,
            labels: {
                primary: "@"
            }
        },
        {
            code: 800,
            labels: {
                primary: "£"
            }
        },
        {
            code: 801,
            labels: {
                primary: "$"
            }
        },
        {
            code: 802,
            labels: {
                primary: "€"
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
            code: 814,
            labels: {
                primary: "´"
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
            code: 784,
            labels: {
                primary: "µ"
            }
        },
    ]
};

const shiftModifierNorwegian = {
    groupName: "Shifted Norwegian",
    keys: [
        {
            code: 2101,
            labels: {
                primary: "§"
            }
        },
        {
            code: 2079,
            labels: {
                primary: "\""
            }
        },
        {
            code: 2081,
            labels: {
                primary: "¤"
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
                primary: "^"
            }
        },
        {
            code: 2097,
            labels: {
                primary: "*"
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
};

const norwegian = norwegianLetters.concat(norwegianModifierKeys);

const table = {keys: norwegianModifierKeys};
const tableWithoutModifier = {keys: norwegianLetters};

const norwegianCtrlTable = withModifiers(table, "Control +", "C+", 256)
const norwegianLAltTable = withModifiers(table, "Alt +", "A+", 512)
const norwegianRAltTable = withModifiers(table, "AltGr +", "AGr+", 1024)
const norwegianShiftTable = withModifiers(tableWithoutModifier, "Shift +", "S+", 2048)
const norwegianGuiTable = withModifiers(table, "Gui +", "G+", 4096)
// Double

const norwegianCATable = withModifiers(
    table,
    "Control + Alt +",
    "C+A+",
    768
)

const norwegianCAGrTable = withModifiers(
    table,
    "Control + AltGr +",
    "C+AGr+",
    1280
)

const norwegianCSTable = withModifiers(
    table,
    "Control + Shift +",
    "C+S+",
    2304
)

const norwegianCGTable = withModifiers(
    table,
    "Control + Gui +",
    "C+G+",
    4352
)

const norwegianAAGrTable = withModifiers(
    table,
    "Alt + AltGr +",
    "A+AGr+",
    1536
)

const norwegianASTable = withModifiers(table, "Alt + Shift +", "A+S+", 2560)

const norwegianAGTable = withModifiers(table, "Alt + Gui +", "A+G+", 4608)

const norwegianAGrSTable = withModifiers(
    table,
    "AltGr + Shift +",
    "AGr+S+",
    3072
)

const norwegianAGrGTable = withModifiers(
    table,
    "AltGr + Gui +",
    "AGr+G+",
    5120
)

// Triple

const norwegianCAAGTable = withModifiers(
    table,
    "Control + Alt + AltGr +",
    "C+A+AGr+",
    1792
)

const norwegianCASTable = withModifiers(table, "Meh +", "Meh+", 2816)

const norwegianCAGTable = withModifiers(
    table,
    "Control + Alt + Gui +",
    "C+A+G+",
    4864
)

const norwegianCAGSTable = withModifiers(
    table,
    "Control + AltGr + Shift +",
    "C+AGr+S+",
    3328
)

const norwegianCAGGTable = withModifiers(
    table,
    "Control + AltGr + Gui +",
    "C+AGr+G+",
    5376
)

const norwegianCSGTable = withModifiers(
    table,
    "Control + Shift + Gui +",
    "C+S+G+",
    6400
)

const norwegianAAGSTable = withModifiers(
    table,
    "Alt + AltGr + Shift +",
    "A+AGr+S+",
    3584
)

const norwegianAAGGTable = withModifiers(
    table,
    "Alt + AltGr + Gui +",
    "A+AGr+G+",
    5632
)

const norwegianASGTable = withModifiers(
    table,
    "Alt + Shift + Gui +",
    "A+S+G+",
    6656
)

const norwegianAGSGTable = withModifiers(
    table,
    "AltGr + Shift + Gui +",
    "AGr+S+G+",
    7168
)

// Quad

const norwegianCAAGrSTable = withModifiers(
    table,
    "Meh + AltGr +",
    "M+AGr+",
    3840
)

const norwegianCAAGrGTable = withModifiers(
    table,
    "Control + Alt + AltGr + Gui +",
    "C+A+AGr+G+",
    5888
)

const norwegianAAGrSGTable = withModifiers(
    table,
    "Alt + AltGr + Shift + Gui +",
    "A+AGr+S+G+",
    7680
)

const norwegianAllModTable = withModifiers(
    table,
    "Hyper + AltGr +",
    "H+AGr+",
    7936
)

const norwegianModifiedTables = [
    shiftModifierNorwegian,
    norwegianCtrlTable,
    norwegianLAltTable,
    norwegianRAltTable,
    norwegianShiftTable,
    norwegianGuiTable,
    norwegianCATable,
    altCtrlNorwegian,
    norwegianCAGrTable,
    norwegianCSTable,
    norwegianCGTable,
    norwegianAAGrTable,
    norwegianASTable,
    norwegianAGTable,
    norwegianAGrSTable,
    norwegianAGrGTable,
    norwegianCAAGTable,
    norwegianCASTable,
    norwegianCAGTable,
    norwegianCAGSTable,
    norwegianCAGGTable,
    norwegianCSGTable,
    norwegianAAGSTable,
    norwegianAAGGTable,
    norwegianASGTable,
    norwegianAGSGTable,
    norwegianCAAGrSTable,
    norwegianCAAGrGTable,
    withModifiers(table, "Hyper +", "Hyper+", 6912),
    norwegianAAGrSGTable,
    norwegianAllModTable
]

export { norwegian as default, norwegianModifiedTables }
// export default norwegian;
