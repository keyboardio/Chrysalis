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

const LetterTable = {
  groupName: "Letters",
  keys: [
    {
      code: 4,
      labels: {
        primary: "A"
      }
    },
    {
      code: 5,
      labels: {
        primary: "B"
      }
    },
    {
      code: 6,
      labels: {
        primary: "C"
      }
    },
    {
      code: 7,
      labels: {
        primary: "D"
      }
    },
    {
      code: 8,
      labels: {
        primary: "E"
      }
    },
    {
      code: 9,
      labels: {
        primary: "F"
      }
    },
    {
      code: 10,
      labels: {
        primary: "G"
      }
    },
    {
      code: 11,
      labels: {
        primary: "H"
      }
    },
    {
      code: 12,
      labels: {
        primary: "I"
      }
    },
    {
      code: 13,
      labels: {
        primary: "J"
      }
    },
    {
      code: 14,
      labels: {
        primary: "K"
      }
    },
    {
      code: 15,
      labels: {
        primary: "L"
      }
    },
    {
      code: 16,
      labels: {
        primary: "M"
      }
    },
    {
      code: 17,
      labels: {
        primary: "N"
      }
    },
    {
      code: 18,
      labels: {
        primary: "O"
      }
    },
    {
      code: 19,
      labels: {
        primary: "P"
      }
    },
    {
      code: 20,
      labels: {
        primary: "Q"
      }
    },
    {
      code: 21,
      labels: {
        primary: "R"
      }
    },
    {
      code: 22,
      labels: {
        primary: "S"
      }
    },
    {
      code: 23,
      labels: {
        primary: "T"
      }
    },
    {
      code: 24,
      labels: {
        primary: "U"
      }
    },
    {
      code: 25,
      labels: {
        primary: "V"
      }
    },
    {
      code: 26,
      labels: {
        primary: "W"
      }
    },
    {
      code: 27,
      labels: {
        primary: "X"
      }
    },
    {
      code: 28,
      labels: {
        primary: "Y"
      }
    },
    {
      code: 29,
      labels: {
        primary: "Z"
      }
    }
  ]
};

/* Modifier tables */

// Single
const CtrlLetterTable = withModifiers(LetterTable, "Control +", "C+", 256);
const LAltLetterTable = withModifiers(LetterTable, "Alt +", "A+", 512);
const RAltLetterTable = withModifiers(LetterTable, "AltGr +", "AGr+", 1024);
const ShiftLetterTable = withModifiers(LetterTable, "Shift +", "S+", 2048);
const GuiLetterTable = withModifiers(LetterTable, "Os+", "O+", 4096);

// Double

const CALetterTable = withModifiers(LetterTable, "Control + Alt +", "C+A+", 768);

const CAGrLetterTable = withModifiers(LetterTable, "Control + AltGr +", "C+AGr+", 1280);

const CSLetterTable = withModifiers(LetterTable, "Control + Shift +", "C+S+", 2304);

const CGLetterTable = withModifiers(LetterTable, "Control + Os +", "C+O+", 4352);

const AAGrLetterTable = withModifiers(LetterTable, "Alt + AltGr +", "A+AGr+", 1536);
const SGLetterTable = withModifiers(LetterTable, "Shift + Os +", "S+O+", 6144);

const ASLetterTable = withModifiers(LetterTable, "Alt + Shift +", "A+S+", 2560);

const AGLetterTable = withModifiers(LetterTable, "Alt + Os +", "A+O+", 4608);

const AGrSLetterTable = withModifiers(LetterTable, "AltGr + Shift +", "AGr+S+", 3072);

const AGrGLetterTable = withModifiers(LetterTable, "AltGr + Os +", "AGr+O+", 5120);

// Triple

const CAAGLetterTable = withModifiers(LetterTable, "Control + Alt + AltGr +", "C+A+AGr+", 1792);

const CASLetterTable = withModifiers(LetterTable, "Meh +", "Meh+", 2816);

const CAGLetterTable = withModifiers(LetterTable, "Control + Alt + Os +", "C+A+O+", 4864);

const CAGSLetterTable = withModifiers(LetterTable, "Control + AltGr + Shift +", "C+AGr+S+", 3328);

const CAGGLetterTable = withModifiers(LetterTable, "Control + AltGr + Os +", "C+AGr+O+", 5376);

const CSGLetterTable = withModifiers(LetterTable, "Control + Shift + Os +", "C+S+O+", 6400);

const AAGSLetterTable = withModifiers(LetterTable, "Alt + AltGr + Shift +", "A+AGr+S+", 3584);

const AAGGLetterTable = withModifiers(LetterTable, "Alt + AltGr + Os +", "A+AGr+O+", 5632);

const ASGLetterTable = withModifiers(LetterTable, "Alt + Shift + Os +", "A+S+O+", 6656);

const AGSGLetterTable = withModifiers(LetterTable, "AltGr + Shift + Os +", "AGr+S+O+", 7168);

// Quad

const CAAGrSLetterTable = withModifiers(LetterTable, "Meh + AltGr +", "M+AGr+", 3840);

const CAAGrGLetterTable = withModifiers(LetterTable, "Control + Alt + AltGr + Os +", "C+A+AGr+O+", 5888);

const CAGrSGLetterTable = withModifiers(LetterTable, "Control + AltGr + Shift + Os +", "C+AGr+S+O+", 7424);

const AAGrSGLetterTable = withModifiers(LetterTable, "Alt + AltGr + Shift + Os +", "A+AGr+S+O+", 7680);

const AllModLetterTable = withModifiers(LetterTable, "Hyper + AltGr +", "H+AGr+", 7936);

const ModifiedLetterTables = [
  CtrlLetterTable,
  LAltLetterTable,
  RAltLetterTable,
  ShiftLetterTable,
  GuiLetterTable,
  CALetterTable,
  CAGrLetterTable,
  CSLetterTable,
  CGLetterTable,
  ASLetterTable,
  AGLetterTable,
  SGLetterTable,
  AAGrLetterTable,
  AGrSLetterTable,
  AGrGLetterTable,
  CAAGLetterTable,
  CASLetterTable,
  CAGLetterTable,
  CAGSLetterTable,
  CAGGLetterTable,
  CSGLetterTable,
  AAGSLetterTable,
  AAGGLetterTable,
  ASGLetterTable,
  AGSGLetterTable,
  CAAGrSLetterTable,
  CAAGrGLetterTable,
  withModifiers(LetterTable, "Hyper +", "Hyper+", 6912),
  CAGrSGLetterTable,
  AAGrSGLetterTable,
  AllModLetterTable
];

export { LetterTable as default, ModifiedLetterTables };
