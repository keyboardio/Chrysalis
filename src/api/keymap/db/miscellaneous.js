/* bazecor-keymap -- Bazecor keymap library
 * Copyright (C) 2018  Keyboardio, Inc.
 * Copyright (C) 2019, 2020  DygmaLab SE
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

import { withModifiers } from "./utils";

const MiscellaneousTable = {
  groupName: "Miscellaneous",
  keys: [
    {
      code: 70,
      labels: {
        primary: "⎙",
        verbose: "Print Screen"
      }
    },
    {
      code: 71,
      labels: {
        primary: "⇳",
        verbose: "Scroll Lock"
      }
    },
    {
      code: 72,
      labels: {
        primary: "⎉",
        verbose: "Pause / Break"
      }
    }
    /* These are disabled for now, since we don't want to display them in
     * Bazecor. */
    /*
        {
            code: 53291,
            labels: {
                primary: "CYCLE"
            }
        },
        {
            code: 53292,
            labels: {
                primary: "SYSTER"
            }
        }
        */
  ]
};

const ModifiedMiscellaneousTables = [
  // Single
  withModifiers(MiscellaneousTable, "Control +", "C+", 256),
  withModifiers(MiscellaneousTable, "Alt +", "A+", 512),
  withModifiers(MiscellaneousTable, "AltGr +", "AGr+", 1024),
  withModifiers(MiscellaneousTable, "Shift +", "S+", 2048),
  withModifiers(MiscellaneousTable, "Gui +", "G+", 4096),
  withModifiers(MiscellaneousTable, "Gui +", "G+", 4096),

  // Double
  withModifiers(MiscellaneousTable, "Control + Alt +", "C+A+", 768),
  withModifiers(MiscellaneousTable, "Control + AltGr +", "C+AGr+", 1280),
  withModifiers(MiscellaneousTable, "Control + Shift +", "C+S+", 2304),
  withModifiers(MiscellaneousTable, "Control + Gui +", "C+G+", 4352),
  withModifiers(MiscellaneousTable, "Alt + AltGr +", "A+AGr+", 1536),
  withModifiers(MiscellaneousTable, "Alt + Shift +", "A+S+", 2560),
  withModifiers(MiscellaneousTable, "Alt + Gui +", "A+G+", 4608),
  withModifiers(MiscellaneousTable, "AltGr + Shift +", "AGr+S+", 3072),
  withModifiers(MiscellaneousTable, "AltGr + Gui +", "AGr+G+", 5120),
  withModifiers(MiscellaneousTable, "Shift + Gui +", "S+G+", 6144),

  // Triple
  withModifiers(
    MiscellaneousTable,
    "Control + Alt + AltGr +",
    "C+A+AGr+",
    1792
  ),
  withModifiers(MiscellaneousTable, "Meh +", "Meh+", 2816),
  withModifiers(MiscellaneousTable, "Control + Alt + Gui +", "C+A+G+", 4864),
  withModifiers(
    MiscellaneousTable,
    "Control + AltGr + Shift +",
    "C+AGr+S+",
    3328
  ),
  withModifiers(
    MiscellaneousTable,
    "Control + AltGr + Gui +",
    "C+AGr+G+",
    5376
  ),
  withModifiers(MiscellaneousTable, "Control + Shift + Gui +", "C+S+G+", 6400),
  withModifiers(MiscellaneousTable, "Alt + AltGr + Shift +", "A+AGr+S+", 3584),
  withModifiers(MiscellaneousTable, "Alt + AltGr + Gui +", "A+AGr+G+", 5632),
  withModifiers(MiscellaneousTable, "Alt + Shift + Gui +", "A+S+G+", 6656),
  withModifiers(MiscellaneousTable, "AltGr + Shift + Gui +", "AGr+S+G+", 7168),

  // Quad
  withModifiers(MiscellaneousTable, "Meh + AltGr +", "M+AGr+", 3840),
  withModifiers(
    MiscellaneousTable,
    "Control + Alt + AltGr + Gui +",
    "C+A+AGr+G+",
    5888
  ),
  withModifiers(MiscellaneousTable, "Hyper+", "Hyper+", 6912),
  withModifiers(
    MiscellaneousTable,
    "Control + AltGr + Shift + Gui +",
    "C+AGr+S+G+",
    7424
  ),
  withModifiers(
    MiscellaneousTable,
    "Alt + AltGr + Shift + Gui +",
    "A+AGr+S+G+",
    7680
  ),

  // All
  withModifiers(MiscellaneousTable, "Hyper + AltGr +", "H+AGr+", 7936)
];

export { MiscellaneousTable as default, ModifiedMiscellaneousTables };
