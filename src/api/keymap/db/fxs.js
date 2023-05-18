/* Bazecor-keymap -- Bazecor keymap library
 *  Copyright (C) 2018, 2019  Keyboardio, Inc.
 * Copyright (C) 2019  DygmaLab SE
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
    },
    {
      code: 104,
      labels: {
        primary: "F13"
      }
    },
    {
      code: 105,
      labels: {
        primary: "F14"
      }
    },
    {
      code: 106,
      labels: {
        primary: "F15"
      }
    },
    {
      code: 107,
      labels: {
        primary: "F16"
      }
    },
    {
      code: 108,
      labels: {
        primary: "F17"
      }
    },
    {
      code: 109,
      labels: {
        primary: "F18"
      }
    },
    {
      code: 110,
      labels: {
        primary: "F19"
      }
    },
    {
      code: 111,
      labels: {
        primary: "F20"
      }
    },
    {
      code: 112,
      labels: {
        primary: "F21"
      }
    },
    {
      code: 113,
      labels: {
        primary: "F22"
      }
    },
    {
      code: 114,
      labels: {
        primary: "F23"
      }
    },
    {
      code: 115,
      labels: {
        primary: "F24"
      }
    }
  ]
};

const ModifiedFunctionKeyTables = [
  // Single
  withModifiers(FunctionKeyTable, "Control +", "C+", 256),
  withModifiers(FunctionKeyTable, "Alt +", "A+", 512),
  withModifiers(FunctionKeyTable, "AltGr +", "AGr+", 1024),
  withModifiers(FunctionKeyTable, "Shift +", "S+", 2048),
  withModifiers(FunctionKeyTable, "Os+", "O+", 4096),

  // Double
  withModifiers(FunctionKeyTable, "Control + Alt +", "C+A+", 768),
  withModifiers(FunctionKeyTable, "Control + AltGr +", "C+AGr+", 1280),
  withModifiers(FunctionKeyTable, "Control + Shift +", "C+S+", 2304),
  withModifiers(FunctionKeyTable, "Control + Os +", "C+O+", 4352),
  withModifiers(FunctionKeyTable, "Alt + AltGr +", "A+AGr+", 1536),
  withModifiers(FunctionKeyTable, "Alt + Shift +", "A+S+", 2560),
  withModifiers(FunctionKeyTable, "Alt + Os +", "A+O+", 4608),
  withModifiers(FunctionKeyTable, "AltGr + Shift +", "AGr+S+", 3072),
  withModifiers(FunctionKeyTable, "AltGr + Os +", "AGr+O+", 5120),
  withModifiers(FunctionKeyTable, "Shift + Os +", "S+O+", 6144),

  // Triple
  withModifiers(FunctionKeyTable, "Control + Alt + AltGr +", "C+A+AGr+", 1792),
  withModifiers(FunctionKeyTable, "Meh +", "Meh+", 2816),
  withModifiers(FunctionKeyTable, "Control + Alt + Os +", "C+A+O+", 4864),
  withModifiers(FunctionKeyTable, "Control + AltGr + Shift +", "C+AGr+S+", 3328),
  withModifiers(FunctionKeyTable, "Control + AltGr + Os +", "C+AGr+O+", 5376),
  withModifiers(FunctionKeyTable, "Control + Shift + Os +", "C+S+O+", 6400),
  withModifiers(FunctionKeyTable, "Alt + AltGr + Shift +", "A+AGr+S+", 3584),
  withModifiers(FunctionKeyTable, "Alt + AltGr + Os +", "A+AGr+O+", 5632),
  withModifiers(FunctionKeyTable, "Alt + Shift + Os +", "A+S+O+", 6656),
  withModifiers(FunctionKeyTable, "AltGr + Shift + Os +", "AGr+S+O+", 7168),

  // Quad
  withModifiers(FunctionKeyTable, "Meh + AltGr +", "M+AGr+", 3840),
  withModifiers(FunctionKeyTable, "Control + Alt + AltGr + Os +", "C+A+AGr+O+", 5888),
  withModifiers(FunctionKeyTable, "Hyper +", "Hyper+", 6912),
  withModifiers(FunctionKeyTable, "Control + AltGr + Shift + Os +", "C+AGr+S+O+", 7424),
  withModifiers(FunctionKeyTable, "Alt + AltGr + Shift + Os +", "A+AGr+S+O+", 7680),

  // All
  withModifiers(FunctionKeyTable, "Hyper + AltGr +", "H+AGr+", 7936)
];

export { FunctionKeyTable as default, ModifiedFunctionKeyTables };
