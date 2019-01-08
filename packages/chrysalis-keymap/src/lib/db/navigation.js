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

const NavigationTable = {
    groupName: "Navigation",
    keys: [
        {
            code: 75,
            labels: {
                primary: "PgUp",
                verbose: "Page Up"
            }
        },
        {
            code: 78,
            labels: {
                primary: "PgDn",
                verbose: "Page Down"
            }
        },
        {
            code: 74,
            labels: {
                primary: "Home"
            }
        },
        {
            code: 77,
            labels: {
                primary: "End"
            }
        },
        {
            code: 80,
            labels: {
                primary: "Left"
            }
        },
        {
            code: 81,
            labels: {
                primary: "Down"
            }
        },
        {
            code: 82,
            labels: {
                primary: "Up"
            }
        },
        {
            code: 79,
            labels: {
                primary: "Right"
            }
        },
        {
            code: 101,
            labels: {
                primary: "App"
            }
        }
    ]
}

const ModifiedNavigationTables = [
    // Single
    withModifiers(NavigationTable, "Control +", "C+", 256),
    withModifiers(NavigationTable, "Alt +", "A+", 512),
    withModifiers(NavigationTable, "AltGr +", "AGr+", 1024),
    withModifiers(NavigationTable, "Shift +", "S+", 2048),
    withModifiers(NavigationTable, "Gui +", "G+", 4096),

    // Double
    withModifiers(NavigationTable, "Control + Alt +", "C+A+", 768),
    withModifiers(NavigationTable, "Control + AltGr +", "C+AGr+", 1280),
    withModifiers(NavigationTable, "Control + Shift +", "C+S+", 2304),
    withModifiers(NavigationTable, "Control + Gui +", "C+G+", 4352),
    withModifiers(NavigationTable, "Alt + AltGr +", "A+AGr+", 1536),
    withModifiers(NavigationTable, "Alt + Shift +", "A+S+", 2560),
    withModifiers(NavigationTable, "Alt + Gui +", "A+G+", 4608),
    withModifiers(NavigationTable, "AltGr + Shift +", "AGr+S+", 3072),
    withModifiers(NavigationTable, "AltGr + Gui +", "AGr+G+", 5120),

    // Triple
    withModifiers(NavigationTable, "Control + Alt + AltGr +", "C+A+AGr+", 1792),
    withModifiers(NavigationTable, "Meh +", "Meh+", 2816),
    withModifiers(NavigationTable, "Control + Alt + Gui +", "C+A+G+", 4864),
    withModifiers(NavigationTable, "Control + AltGr + Shift +", "C+AGr+S+", 3328),
    withModifiers(NavigationTable, "Control + AltGr + Gui +", "C+AGr+G+", 5376),
    withModifiers(NavigationTable, "Control + Shift + Gui +", "C+S+G+", 6400),
    withModifiers(NavigationTable, "Alt + AltGr + Shift +", "A+AGr+S+", 3584),
    withModifiers(NavigationTable, "Alt + AltGr + Gui +", "A+AGr+G+", 5632),
    withModifiers(NavigationTable, "Alt + Shift + Gui +", "A+S+G+", 6656),
    withModifiers(NavigationTable, "AltGr + Shift + Gui +", "AGr+S+G+", 7168),

    // Quad
    withModifiers(
        NavigationTable,
        "Control + Alt + AltGr + Shift +",
        "C+A+AGr+S+",
        3840
    ),
    withModifiers(
        NavigationTable,
        "Control + Alt + AltGr + Gui +",
        "C+A+AGr+G+",
        5888
    ),
    withModifiers(NavigationTable, "Hyper+", "Hyper+", 6912),
    withModifiers(NavigationTable, "Alt + AltGr + Shift + Gui +", "A+AGr+S+G+", 7680),

    // All
    withModifiers(
        NavigationTable,
        "Control + Alt + AltGr + Shift + Gui +",
        "C+A+AGr+S+G+",
        7936
    )
]

export { NavigationTable as default, ModifiedNavigationTables }
