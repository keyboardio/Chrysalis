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
import { withModifiers } from "../../db/utils";

const spanishLetters = [
  {
    code: 49,
    labels: {
      primary: "Ç"
    },
    newGroupName: "Letters"
  },
  {
    code: 51,
    labels: {
      primary: "Ñ"
    },
    newGroupName: "Letters"
  }
];

const spanishModifierKeys = [
  {
    code: 45,
    labels: {
      primary: "'"
    },
    newGroupName: "Punctuation"
  },
  {
    code: 46,
    labels: {
      primary: "¡"
    },
    newGroupName: "Punctuation"
  },
  {
    code: 47,
    labels: {
      primary: "`"
    },
    newGroupName: "Punctuation"
  },
  {
    code: 48,
    labels: {
      primary: "+"
    }
  },
  {
    code: 52,
    labels: {
      primary: "´"
    },
    newGroupName: "Punctuation"
  },
  {
    code: 53,
    labels: {
      primary: "º"
    },
    newGroupName: "Punctuation"
  },
  {
    code: 56,
    labels: {
      primary: "-"
    },
    newGroupName: "Punctuation"
  },
  {
    code: 100,
    labels: {
      primary: "<"
    }
  }
];
const shiftModifierSpanish = {
  groupName: "AltCtrl Spanish",
  keys: [
    {
      code: 2079,
      labels: {
        primary: '"'
      },
      newGroupName: "Shifted Digits"
    },
    {
      code: 2080,
      labels: {
        primary: "·"
      },
      newGroupName: "Shifted Digits"
    },
    {
      code: 2083,
      labels: {
        primary: "&"
      },
      newGroupName: "Shifted Digits"
    },
    {
      code: 2084,
      labels: {
        primary: "/"
      },
      newGroupName: "Shifted Digits"
    },
    {
      code: 2085,
      labels: {
        primary: "("
      },
      newGroupName: "Shifted Digits"
    },
    {
      code: 2086,
      labels: {
        primary: ")"
      },
      newGroupName: "Shifted Digits"
    },
    {
      code: 2087,
      labels: {
        primary: "="
      },
      newGroupName: "Shifted Digits"
    },
    {
      code: 2093,
      labels: {
        primary: "?"
      },
      newGroupName: "Shifted Digits"
    },
    {
      code: 2094,
      labels: {
        primary: "¿"
      },
      newGroupName: "Shifted Digits"
    },
    {
      code: 2095,
      labels: {
        primary: "^"
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
        primary: "Ç",
        top: "S+"
      }
    },
    {
      code: 2099,
      labels: {
        primary: "Ñ",
        top: "S+"
      }
    },
    {
      code: 2100,
      labels: {
        primary: "¨"
      }
    },
    {
      code: 2101,
      labels: {
        primary: "ª"
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
    },
    {
      code: 2148,
      labels: {
        primary: ">"
      }
    }
  ]
};

const altCtrlSpanish = {
  groupName: "AltCtrl Spanish",
  keys: [
    {
      code: 798,
      labels: {
        primary: "|"
      }
    },
    {
      code: 799,
      labels: {
        primary: "@"
      }
    },
    {
      code: 800,
      labels: {
        primary: "#"
      }
    },
    {
      code: 801,
      labels: {
        primary: "~"
      }
    },
    {
      code: 802,
      labels: {
        primary: "€"
      }
    },
    {
      code: 803,
      labels: {
        primary: "¬"
      }
    },
    {
      code: 776,
      labels: {
        primary: "€"
      }
    },
    {
      code: 815,
      labels: {
        primary: "["
      }
    },
    {
      code: 816,
      labels: {
        primary: "]"
      }
    },
    {
      code: 817,
      labels: {
        primary: "}"
      }
    },
    {
      code: 820,
      labels: {
        primary: "{"
      }
    },
    {
      code: 821,
      labels: {
        primary: "\\"
      }
    }
  ]
};

const altGrSpanish = {
  groupName: "AltCtrl Spanish",
  keys: [
    {
      code: 1054,
      labels: {
        primary: "|"
      }
    },
    {
      code: 1055,
      labels: {
        primary: "@"
      }
    },
    {
      code: 1056,
      labels: {
        primary: "#"
      }
    },
    {
      code: 1057,
      labels: {
        primary: "~"
      }
    },
    {
      code: 1058,
      labels: {
        primary: "€"
      }
    },
    {
      code: 1059,
      labels: {
        primary: "¬"
      }
    },
    {
      code: 1032,
      labels: {
        primary: "€"
      }
    },
    {
      code: 1071,
      labels: {
        primary: "["
      }
    },
    {
      code: 1072,
      labels: {
        primary: "]"
      }
    },
    {
      code: 1073,
      labels: {
        primary: "}"
      }
    },
    {
      code: 1076,
      labels: {
        primary: "{"
      }
    },
    {
      code: 1077,
      labels: {
        primary: "\\"
      }
    }
  ]
};

const spanish = spanishLetters.concat(spanishModifierKeys);

const table = { keys: spanish };
const tableWithoutModifier = { keys: spanishLetters };

const spanishCtrlTable = withModifiers(table, "Control +", "C+", 256);
const spanishLAltTable = withModifiers(table, "Alt +", "A+", 512);
const spanishRAltTable = withModifiers(table, "AltGr +", "AGr+", 1024);
const spanishShiftTable = withModifiers(tableWithoutModifier, "Shift +", "S+", 2048);
const spanishGuiTable = withModifiers(table, "Os+", "O+", 4096);
// Double

const spanishCATable = withModifiers(table, "Control + Alt +", "C+A+", 768);

const spanishCAGrTable = withModifiers(table, "Control + AltGr +", "C+AGr+", 1280);

const spanishCSTable = withModifiers(table, "Control + Shift +", "C+S+", 2304);

const spanishCGTable = withModifiers(table, "Control + Os +", "C+O+", 4352);

const spanishAAGrTable = withModifiers(table, "Alt + AltGr +", "A+AGr+", 1536);

const spanishASTable = withModifiers(table, "Alt + Shift +", "A+S+", 2560);

const spanishAGTable = withModifiers(table, "Alt + Os +", "A+O+", 4608);

const spanishAGrSTable = withModifiers(table, "AltGr + Shift +", "AGr+S+", 3072);

const spanishAGrGTable = withModifiers(table, "AltGr + Os +", "AGr+O+", 5120);

const spanishSGTable = withModifiers(table, "Shift + Os +", "S+O+", 6144);

// Triple

const spanishCAAGTable = withModifiers(table, "Control + Alt + AltGr +", "C+A+AGr+", 1792);

const spanishCASTable = withModifiers(table, "Meh +", "Meh+", 2816);

const spanishCAGTable = withModifiers(table, "Control + Alt + Os +", "C+A+O+", 4864);

const spanishCAGSTable = withModifiers(table, "Control + AltGr + Shift +", "C+AGr+S+", 3328);

const spanishCAGGTable = withModifiers(table, "Control + AltGr + Os +", "C+AGr+O+", 5376);

const spanishCSGTable = withModifiers(table, "Control + Shift + Os +", "C+S+O+", 6400);

const spanishAAGSTable = withModifiers(table, "Alt + AltGr + Shift +", "A+AGr+S+", 3584);

const spanishAAGGTable = withModifiers(table, "Alt + AltGr + Os +", "A+AGr+O+", 5632);

const spanishASGTable = withModifiers(table, "Alt + Shift + Os +", "A+S+O+", 6656);

const spanishAGSGTable = withModifiers(table, "AltGr + Shift + Os +", "AGr+S+O+", 7168);

// Quad

const spanishCAAGrSTable = withModifiers(table, "Meh + AltGr +", "M+AGr+", 3840);

const spanishCAAGrGTable = withModifiers(table, "Control + Alt + AltGr + Os +", "C+A+AGr+O+", 5888);

const spanishCAGrSGTable = withModifiers(table, "Control + AltGr + Shift + Os +", "C+AGr+S+O+", 7424);

const spanishAAGrSGTable = withModifiers(table, "Alt + AltGr + Shift + Os +", "A+AGr+S+O+", 7680);

const spanishAllModTable = withModifiers(table, "Hyper + AltGr +", "H+AGr+", 7936);

const DualUseCtrlTable = withModifiers(table, "Control /", "CTRL/", 49169);
const DualUseShiftTable = withModifiers(table, "Shift /", "SHIFT/", 49425);
const DualUseAltTable = withModifiers(table, "Alt /", "ALT/", 49681);
const DualUseGuiTable = withModifiers(table, "Os /", "OS/", 49937);
const DualUseAltGrTable = withModifiers(table, "AltGr /", "ALTGR/", 50705);
const DualUseLayer1Tables = withModifiers(table, "Layer #1 /", "L#1/", 51218);
const DualUseLayer2Tables = withModifiers(table, "Layer #2 /", "L#2/", 51474);
const DualUseLayer3Tables = withModifiers(table, "Layer #3 /", "L#3/", 51730);
const DualUseLayer4Tables = withModifiers(table, "Layer #4 /", "L#4/", 51986);
const DualUseLayer5Tables = withModifiers(table, "Layer #5 /", "L#5/", 52242);
const DualUseLayer6Tables = withModifiers(table, "Layer #6 /", "L#6/", 52498);
const DualUseLayer7Tables = withModifiers(table, "Layer #7 /", "L#7/", 52754);
const DualUseLayer8Tables = withModifiers(table, "Layer #8 /", "L#8/", 53010);

const spanishModifiedTables = [
  shiftModifierSpanish,
  spanishCtrlTable,
  spanishLAltTable,
  spanishRAltTable,
  altGrSpanish,
  spanishShiftTable,
  spanishGuiTable,
  spanishCATable,
  altCtrlSpanish,
  spanishCAGrTable,
  spanishCSTable,
  spanishCGTable,
  spanishASTable,
  spanishAGTable,
  spanishAAGrTable,
  spanishSGTable,
  spanishAGrSTable,
  spanishAGrGTable,
  spanishCAAGTable,
  spanishCASTable,
  spanishCAGTable,
  spanishCAGSTable,
  spanishCAGGTable,
  spanishCSGTable,
  spanishAAGSTable,
  spanishAAGGTable,
  spanishASGTable,
  spanishAGSGTable,
  spanishCAAGrSTable,
  spanishCAAGrGTable,
  withModifiers(table, "Hyper +", "Hyper+", 6912),
  spanishCAGrSGTable,
  spanishAAGrSGTable,
  spanishAllModTable,
  DualUseCtrlTable,
  DualUseShiftTable,
  DualUseAltTable,
  DualUseGuiTable,
  DualUseAltGrTable,
  DualUseLayer1Tables,
  DualUseLayer2Tables,
  DualUseLayer3Tables,
  DualUseLayer4Tables,
  DualUseLayer5Tables,
  DualUseLayer6Tables,
  DualUseLayer7Tables,
  DualUseLayer8Tables
];

export { spanish as default, spanishModifiedTables };
