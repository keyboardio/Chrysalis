// -*- mode: js-jsx -*-
/* chrysalis-bundle-keyboardio -- Chrysalis Bundle for Keyboard.io
 * Copyright (C) 2018  Keyboardio, Inc.
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
const GuiLetterTable = withModifiers(LetterTable, "Gui +", "G+", 4096);

// Double

const CALetterTable = withModifiers(
  LetterTable,
  "Control + Alt +",
  "C+A+",
  768
);

const CAGrLetterTable = withModifiers(
  LetterTable,
  "Control + AltGr +",
  "C+AGr+",
  1280
);

const CSLetterTable = withModifiers(
  LetterTable,
  "Control + Shift +",
  "C+S+",
  2304
);

const CGLetterTable = withModifiers(
  LetterTable,
  "Control + Gui +",
  "C+G+",
  4352
);

const AAGrLetterTable = withModifiers(
  LetterTable,
  "Alt + AltGr +",
  "A+AGr+",
  1536
);

const ASLetterTable = withModifiers(LetterTable, "Alt + Shift +", "A+S+", 2560);

const AGLetterTable = withModifiers(LetterTable, "Alt + Gui +", "A+G+", 4608);

const AGrSLetterTable = withModifiers(
  LetterTable,
  "AltGr + Shift +",
  "AGr+S+",
  3072
);

const AGrGLetterTable = withModifiers(
  LetterTable,
  "AltGr + Gui +",
  "AGr+G+",
  5120
);

// Triple

const CAAGLetterTable = withModifiers(
  LetterTable,
  "Control + Alt + AltGr +",
  "C+A+AGr+",
  1792
);

const CASLetterTable = withModifiers(
  LetterTable,
  "Control + Alt + Shift +",
  "C+A+S+",
  2816
);

const CAGLetterTable = withModifiers(
  LetterTable,
  "Control + Alt + Gui +",
  "C+A+G+",
  4864
);

const CAGSLetterTable = withModifiers(
  LetterTable,
  "Control + AltGr + Shift +",
  "C+AGr+S+",
  3328
);

const CAGGLetterTable = withModifiers(
  LetterTable,
  "Control + AltGr + Gui +",
  "C+AGr+G+",
  5376
);

const CSGLetterTable = withModifiers(
  LetterTable,
  "Control + Shift + Gui +",
  "C+S+G+",
  6400
);

const AAGSLetterTable = withModifiers(
  LetterTable,
  "Alt + AltGr + Shift +",
  "A+AGr+S+",
  3584
);

const AAGGLetterTable = withModifiers(
  LetterTable,
  "Alt + AltGr + Gui +",
  "A+AGr+G+",
  5632
);

const ASGLetterTable = withModifiers(
  LetterTable,
  "Alt + Shift + Gui +",
  "A+S+G+",
  6656
);

const AGSGLetterTable = withModifiers(
  LetterTable,
  "AltGr + Shift + Gui +",
  "AGr+S+G+",
  7168
);

// Quad

const CAAGrSLetterTable = withModifiers(
  LetterTable,
  "Control + Alt + AltGr + Shift +",
  "C+A+AGr+S+",
  3840
);

const CAAGrGLetterTable = withModifiers(
  LetterTable,
  "Control + Alt + AltGr + Gui +",
  "C+A+AGr+G+",
  5888
);

const AAGrSGLetterTable = withModifiers(
  LetterTable,
  "Alt + AltGr + Shift + Gui +",
  "A+AGr+S+G+",
  7680
);

const AllModLetterTable = withModifiers(
  LetterTable,
  "Control + Alt + AltGr + Shift + Gui +",
  "C+A+AGr+S+G+",
  7936
);

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
  AAGrSGLetterTable,
  AllModLetterTable
];

export { LetterTable as default, ModifiedLetterTables };
