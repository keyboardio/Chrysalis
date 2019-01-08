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

const BasicModifiersTable = {
    groupName: "Modifiers",
    keys: [
        {
            code: 224,
            labels: {
                primary: "LCtrl",
                verbose: "Left Control"
            }
        },
        {
            code: 225,
            labels: {
                primary: "LShift",
                verbose: "Left Shift"
            }
        },
        {
            code: 226,
            labels: {
                primary: "LAlt",
                verbose: "Left Alt"
            }
        },
        {
            code: 227,
            labels: {
                primary: "LGui",
                verbose: "Left Gui"
            }
        },
        {
            code: 228,
            labels: {
                primary: "RCtrl",
                verbose: "Right Control"
            }
        },
        {
            code: 229,
            labels: {
                primary: "RShift",
                verbose: "Right Shift"
            }
        },
        {
            code: 230,
            labels: {
                primary: "RAlt",
                verbose: "AltGr"
            }
        },
        {
            code: 231,
            labels: {
                primary: "RGui",
                verbose: "Right Gui"
            }
        }
    ]
}

let ModifiersTable = BasicModifiersTable
ModifiersTable.keys.push({
    code: 1792,
    labels: {
        primary: "Meh"
    }
})
ModifiersTable.keys.push({
    code: 5888,
    labels: {
        primary: "Hyper"
    }
})

const ModifiedModifiersTables = [
    // Single
    withModifiers(BasicModifiersTable, "Control +", "C+", 256),
    withModifiers(BasicModifiersTable, "Alt +", "A+", 512),
    withModifiers(BasicModifiersTable, "AltGr +", "AGr+", 1024),
    withModifiers(BasicModifiersTable, "Shift +", "S+", 2048),
    withModifiers(BasicModifiersTable, "Gui +", "G+", 4096),

    // Double
    withModifiers(BasicModifiersTable, "Control + Alt +", "C+A+", 768),
    withModifiers(BasicModifiersTable, "Control + AltGr +", "C+AGr+", 1280),
    withModifiers(BasicModifiersTable, "Control + Shift +", "C+S+", 2304),
    withModifiers(BasicModifiersTable, "Control + Gui +", "C+G+", 4352),
    withModifiers(BasicModifiersTable, "Alt + AltGr +", "A+AGr+", 1536),
    withModifiers(BasicModifiersTable, "Alt + Shift +", "A+S+", 2560),
    withModifiers(BasicModifiersTable, "Alt + Gui +", "A+G+", 4608),
    withModifiers(BasicModifiersTable, "AltGr + Shift +", "AGr+S+", 3072),
    withModifiers(BasicModifiersTable, "AltGr + Gui +", "AGr+G+", 5120),

    // Triple
    withModifiers(BasicModifiersTable, "Control + Alt + AltGr +", "C+A+AGr+", 1792),
    withModifiers(BasicModifiersTable, "Meh +", "Meh+", 2816),
    withModifiers(BasicModifiersTable, "Control + Alt + Gui +", "C+A+G+", 4864),
    withModifiers(BasicModifiersTable, "Control + AltGr + Shift +", "C+AGr+S+", 3328),
    withModifiers(BasicModifiersTable, "Control + AltGr + Gui +", "C+AGr+G+", 5376),
    withModifiers(BasicModifiersTable, "Control + Shift + Gui +", "C+S+G+", 6400),
    withModifiers(BasicModifiersTable, "Alt + AltGr + Shift +", "A+AGr+S+", 3584),
    withModifiers(BasicModifiersTable, "Alt + AltGr + Gui +", "A+AGr+G+", 5632),
    withModifiers(BasicModifiersTable, "Alt + Shift + Gui +", "A+S+G+", 6656),
    withModifiers(BasicModifiersTable, "AltGr + Shift + Gui +", "AGr+S+G+", 7168),

    // Quad
    withModifiers(
        BasicModifiersTable,
        "Meh + AltGr +",
        "M+AGr+",
        3840
    ),
    withModifiers(
        BasicModifiersTable,
        "Control + Alt + AltGr + Gui +",
        "C+A+AGr+G+",
        5888
    ),
    withModifiers(BasicModifiersTable, "Hyper+", "Hyper+", 6912),
    withModifiers(BasicModifiersTable, "Alt + AltGr + Shift + Gui +", "A+AGr+S+G+", 7680),

    // All
    withModifiers(
        BasicModifiersTable,
        "Hyper + AltGr +",
        "H+AGr+",
        7936
    )
]

export { ModifiersTable as default, ModifiedModifiersTables }
