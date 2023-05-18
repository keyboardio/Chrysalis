/* bazecor-keymap -- Bazecor keymap library
 * Copyright (C) 2018, 2019  Keyboardio, Inc.
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

const GuiLabels = {
  linux: "LINUX",
  win32: "WIN",
  darwin: "⌘"
};

const GuiVerboses = {
  linux: "Linux",
  win32: "Windows",
  darwin: "Command"
};

const AltLabels = {
  linux: "ALT",
  win32: "ALT",
  darwin: "⌥"
};

const AltVerboses = {
  linux: "Alt",
  win32: "Alt",
  darwin: "Option"
};

const guiLabel = GuiLabels[process.platform] || "Gui";
const guiVerbose = GuiVerboses[process.platform] || "Gui";
const AltLabel = AltLabels[process.platform] || "ALT";
const AltVerbose = AltVerboses[process.platform] || "Alt";

const ModifiersTable = {
  groupName: "Modifiers",
  keys: [
    {
      code: 224,
      labels: {
        top: "LEFT",
        primary: "CTRL",
        verbose: "Left Control"
      }
    },
    {
      code: 225,
      labels: {
        top: "LEFT",
        primary: "SHIFT",
        verbose: "Left Shift"
      }
    },
    {
      code: 226,
      labels: {
        primary: "LEFT " + AltLabel,
        verbose: "Left " + AltVerbose
      }
    },
    {
      code: 227,
      labels: {
        primary: "LEFT " + guiLabel,
        verbose: "Left " + guiVerbose
      }
    },
    {
      code: 228,
      labels: {
        top: "RIGHT",
        primary: "CTRL",
        verbose: "Right Control"
      }
    },
    {
      code: 229,
      labels: {
        top: "RIGHT",
        primary: "SHIFT",
        verbose: "Right Shift"
      }
    },
    {
      code: 230,
      labels: {
        top: "",
        primary: "RIGHT " + AltLabel,
        verbose: "AltGr"
      }
    },
    {
      code: 231,
      labels: {
        primary: "RIGHT " + guiLabel,
        verbose: "Right " + guiVerbose
      }
    }
  ]
};

const HyperMehTable = {
  groupName: "Hyper & Meh",
  keys: [
    {
      code: 2530,
      labels: {
        primary: "Meh"
      }
    },
    {
      code: 3043,
      labels: {
        primary: "Hyper"
      }
    }
  ]
};

const ModifiedModifiersTables = [
  // Single
  withModifiers(ModifiersTable, "Control +", "C+", 256),
  withModifiers(ModifiersTable, "Alt +", "A+", 512),
  withModifiers(ModifiersTable, "AltGr +", "AGr+", 1024),
  withModifiers(ModifiersTable, "Shift +", "S+", 2048),
  withModifiers(ModifiersTable, "Os+", "O+", 4096),

  // Double
  withModifiers(ModifiersTable, "Control + Alt +", "C+A+", 768),
  withModifiers(ModifiersTable, "Control + AltGr +", "C+AGr+", 1280),
  withModifiers(ModifiersTable, "Control + Shift +", "C+S+", 2304),
  withModifiers(ModifiersTable, "Control + Os +", "C+O+", 4352),
  withModifiers(ModifiersTable, "Alt + AltGr +", "A+AGr+", 1536),
  withModifiers(ModifiersTable, "Alt + Shift +", "A+S+", 2560),
  withModifiers(ModifiersTable, "Alt + Os +", "A+O+", 4608),
  withModifiers(ModifiersTable, "AltGr + Shift +", "AGr+S+", 3072),
  withModifiers(ModifiersTable, "AltGr + Os +", "AGr+O+", 5120),
  withModifiers(ModifiersTable, "Shift + Os +", "S+O+", 6144),

  // Triple
  withModifiers(ModifiersTable, "Control + Alt + AltGr +", "C+A+AGr+", 1792),
  withModifiers(ModifiersTable, "Meh +", "Meh+", 2816),
  withModifiers(ModifiersTable, "Control + Alt + Os +", "C+A+O+", 4864),
  withModifiers(ModifiersTable, "Control + AltGr + Shift +", "C+AGr+S+", 3328),
  withModifiers(ModifiersTable, "Control + AltGr + Os +", "C+AGr+O+", 5376),
  withModifiers(ModifiersTable, "Control + Shift + Os +", "C+S+O+", 6400),
  withModifiers(ModifiersTable, "Alt + AltGr + Shift +", "A+AGr+S+", 3584),
  withModifiers(ModifiersTable, "Alt + AltGr + Os +", "A+AGr+O+", 5632),
  withModifiers(ModifiersTable, "Alt + Shift + Os +", "A+S+O+", 6656),
  withModifiers(ModifiersTable, "AltGr + Shift + Os +", "AGr+S+O+", 7168),

  // Quad
  withModifiers(ModifiersTable, "Meh + AltGr +", "M+AGr+", 3840),
  withModifiers(ModifiersTable, "Control + Alt + AltGr + Os +", "C+A+AGr+O+", 5888),
  withModifiers(ModifiersTable, "Hyper+", "Hyper+", 6912),
  withModifiers(ModifiersTable, "Control + AltGr + Shift + Os +", "C+AGr+S+O+", 7424),
  withModifiers(ModifiersTable, "Alt + AltGr + Shift + Os +", "A+AGr+S+O+", 7680),

  // All
  withModifiers(ModifiersTable, "Hyper + AltGr +", "H+AGr+", 7936)
];

export { ModifiersTable as default, ModifiedModifiersTables, HyperMehTable };
