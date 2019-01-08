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

const FunctionKeyTable = {
    groupName: "Fx keys",
    keys: [
        {
            code: 58,
            labels: {
                primary: "F1"
            }
        },
        {
            code: 59,
            labels: {
                primary: "F2"
            }
        },
        {
            code: 60,
            labels: {
                primary: "F3"
            }
        },
        {
            code: 61,
            labels: {
                primary: "F4"
            }
        },
        {
            code: 62,
            labels: {
                primary: "F5"
            }
        },
        {
            code: 63,
            labels: {
                primary: "F6"
            }
        },
        {
            code: 64,
            labels: {
                primary: "F7"
            }
        },
        {
            code: 65,
            labels: {
                primary: "F8"
            }
        },
        {
            code: 66,
            labels: {
                primary: "F9"
            }
        },
        {
            code: 67,
            labels: {
                primary: "F10"
            }
        },
        {
            code: 68,
            labels: {
                primary: "F11"
            }
        },
        {
            code: 69,
            labels: {
                primary: "F12"
            }
        }
    ]
}

const ModifiedFunctionKeyTables = [
    // Single
    withModifiers(FunctionKeyTable, "Control +", "C+", 256),
    withModifiers(FunctionKeyTable, "Alt +", "A+", 512),
    withModifiers(FunctionKeyTable, "AltGr +", "AGr+", 1024),
    withModifiers(FunctionKeyTable, "Shift +", "S+", 2048),
    withModifiers(FunctionKeyTable, "Gui +", "G+", 4096),

    // Double
    withModifiers(FunctionKeyTable, "Control + Alt +", "C+A+", 768),
    withModifiers(FunctionKeyTable, "Control + AltGr +", "C+AGr+", 1280),
    withModifiers(FunctionKeyTable, "Control + Shift +", "C+S+", 2304),
    withModifiers(FunctionKeyTable, "Control + Gui +", "C+G+", 4352),
    withModifiers(FunctionKeyTable, "Alt + AltGr +", "A+AGr+", 1536),
    withModifiers(FunctionKeyTable, "Alt + Shift +", "A+S+", 2560),
    withModifiers(FunctionKeyTable, "Alt + Gui +", "A+G+", 4608),
    withModifiers(FunctionKeyTable, "AltGr + Shift +", "AGr+S+", 3072),
    withModifiers(FunctionKeyTable, "AltGr + Gui +", "AGr+G+", 5120),

    // Triple
    withModifiers(FunctionKeyTable, "Control + Alt + AltGr +", "C+A+AGr+", 1792),
    withModifiers(FunctionKeyTable, "Meh +", "Meh+", 2816),
    withModifiers(FunctionKeyTable, "Control + Alt + Gui +", "C+A+G+", 4864),
    withModifiers(FunctionKeyTable, "Control + AltGr + Shift +", "C+AGr+S+", 3328),
    withModifiers(FunctionKeyTable, "Control + AltGr + Gui +", "C+AGr+G+", 5376),
    withModifiers(FunctionKeyTable, "Control + Shift + Gui +", "C+S+G+", 6400),
    withModifiers(FunctionKeyTable, "Alt + AltGr + Shift +", "A+AGr+S+", 3584),
    withModifiers(FunctionKeyTable, "Alt + AltGr + Gui +", "A+AGr+G+", 5632),
    withModifiers(FunctionKeyTable, "Alt + Shift + Gui +", "A+S+G+", 6656),
    withModifiers(FunctionKeyTable, "AltGr + Shift + Gui +", "AGr+S+G+", 7168),

    // Quad
    withModifiers(
        FunctionKeyTable,
        "Meh + AltGr +",
        "M+AGr+",
        3840
    ),
    withModifiers(
        FunctionKeyTable,
        "Control + Alt + AltGr + Gui +",
        "C+A+AGr+G+",
        5888
    ),
    withModifiers(FunctionKeyTable, "Hyper +", "Hyper+", 6912),
    withModifiers(FunctionKeyTable, "Alt + AltGr + Shift + Gui +", "A+AGr+S+G+", 7680),

    // All
    withModifiers(
        FunctionKeyTable,
        "Hyper + AltGr +",
        "H+AGr+",
        7936
    )
]

export { FunctionKeyTable as default, ModifiedFunctionKeyTables }
