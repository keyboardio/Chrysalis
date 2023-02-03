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

const germanLetters = [
  {
    code: 28,
    labels: {
      primary: "Z"
    }
  },
  {
    code: 47,
    labels: {
      primary: "Ü"
    },
    newGroupName: "Letters"
  },
  {
    code: 51,
    labels: {
      primary: "Ö"
    },
    newGroupName: "Letters"
  },
  {
    code: 52,
    labels: {
      primary: "Ä"
    },
    newGroupName: "Letters"
  },
  {
    code: 29,
    labels: {
      primary: "Y"
    }
  }
];

const germanModifierKeys = [
  {
    code: 53,
    labels: {
      primary: "^"
    }
  },
  {
    code: 45,
    labels: {
      primary: "ß"
    },
    newGroupName: "Letters"
  },
  {
    code: 46,
    labels: {
      primary: "´"
    }
  },
  {
    code: 48,
    labels: {
      primary: "+"
    }
  },
  {
    code: 49,
    labels: {
      primary: "#"
    }
  },
  {
    code: 56,
    labels: {
      primary: "-"
    }
  },
  {
    code: 100,
    labels: {
      primary: "<"
    }
  }
];

const germanNumpad = [
  {
    code: 99,
    labels: {
      top: "Num",
      primary: ","
    }
  }
];

const altCtrlGerman = {
  groupName: "AltCtrl German",
  keys: [
    {
      code: 799,
      labels: {
        primary: "²"
      }
    },
    {
      code: 800,
      labels: {
        primary: "³"
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
      code: 813,
      labels: {
        primary: "\\"
      }
    },
    {
      code: 788,
      labels: {
        primary: "@"
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
      code: 817,
      labels: {
        primary: "|"
      }
    },
    {
      code: 784,
      labels: {
        primary: "µ"
      }
    },
    {
      code: 868,
      labels: {
        primary: "|"
      }
    }
  ]
};

const altGrGerman = {
  groupName: "AltCtrl German",
  keys: [
    {
      code: 1055,
      labels: {
        primary: "²"
      }
    },
    {
      code: 1056,
      labels: {
        primary: "³"
      }
    },
    {
      code: 1060,
      labels: {
        primary: "{"
      }
    },
    {
      code: 1061,
      labels: {
        primary: "["
      }
    },
    {
      code: 1062,
      labels: {
        primary: "]"
      }
    },
    {
      code: 1063,
      labels: {
        primary: "}"
      }
    },
    {
      code: 1069,
      labels: {
        primary: "\\"
      }
    },
    {
      code: 1044,
      labels: {
        primary: "@"
      }
    },
    {
      code: 1032,
      labels: {
        primary: "€"
      }
    },
    {
      code: 1072,
      labels: {
        primary: "~"
      }
    },
    {
      code: 1073,
      labels: {
        primary: "|"
      }
    },
    {
      code: 1040,
      labels: {
        primary: "µ"
      }
    },
    {
      code: 1124,
      labels: {
        primary: "|"
      }
    }
  ]
};

const shiftModifierGerman = {
  groupName: "Shifted German",
  keys: [
    {
      code: 2101,
      labels: {
        primary: "°"
      }
    },
    {
      code: 2079,
      labels: {
        primary: '"'
      }
    },
    {
      code: 2080,
      labels: {
        primary: "§"
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
        primary: "*"
      }
    },
    {
      code: 2097,
      labels: {
        primary: "'"
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

const german = germanLetters.concat(germanModifierKeys, germanNumpad);

const table = { keys: german };
const tableWithoutModifier = { keys: germanLetters };

const germanCtrlTable = withModifiers(table, "Control +", "C+", 256);
const germanLAltTable = withModifiers(table, "Alt +", "A+", 512);
const germanRAltTable = withModifiers(table, "AltGr +", "AGr+", 1024);
const germanShiftTable = withModifiers(tableWithoutModifier, "Shift +", "S+", 2048);
const germanGuiTable = withModifiers(table, "Gui +", "G+", 4096);
// Double

const germanCATable = withModifiers(table, "Control + Alt +", "C+A+", 768);

const germanCAGrTable = withModifiers(table, "Control + AltGr +", "C+AGr+", 1280);

const germanCSTable = withModifiers(table, "Control + Shift +", "C+S+", 2304);

const germanCGTable = withModifiers(table, "Control + Gui +", "C+G+", 4352);

const germanAAGrTable = withModifiers(table, "Alt + AltGr +", "A+AGr+", 1536);

const germanASTable = withModifiers(table, "Alt + Shift +", "A+S+", 2560);

const germanAGTable = withModifiers(table, "Alt + Gui +", "A+G+", 4608);

const germanAGrSTable = withModifiers(table, "AltGr + Shift +", "AGr+S+", 3072);

const germanAGrGTable = withModifiers(table, "AltGr + Gui +", "AGr+G+", 5120);

const germanSGTable = withModifiers(table, "Shift + Gui +", "S+G+", 6144);

// Triple

const germanCAAGTable = withModifiers(table, "Control + Alt + AltGr +", "C+A+AGr+", 1792);

const germanCASTable = withModifiers(table, "Meh +", "Meh+", 2816);

const germanCAGTable = withModifiers(table, "Control + Alt + Gui +", "C+A+G+", 4864);

const germanCAGSTable = withModifiers(table, "Control + AltGr + Shift +", "C+AGr+S+", 3328);

const germanCAGGTable = withModifiers(table, "Control + AltGr + Gui +", "C+AGr+G+", 5376);

const germanCSGTable = withModifiers(table, "Control + Shift + Gui +", "C+S+G+", 6400);

const germanAAGSTable = withModifiers(table, "Alt + AltGr + Shift +", "A+AGr+S+", 3584);

const germanAAGGTable = withModifiers(table, "Alt + AltGr + Gui +", "A+AGr+G+", 5632);

const germanASGTable = withModifiers(table, "Alt + Shift + Gui +", "A+S+G+", 6656);

const germanAGSGTable = withModifiers(table, "AltGr + Shift + Gui +", "AGr+S+G+", 7168);

// Quad

const germanCAAGrSTable = withModifiers(table, "Meh + AltGr +", "M+AGr+", 3840);

const germanCAAGrGTable = withModifiers(table, "Control + Alt + AltGr + Gui +", "C+A+AGr+G+", 5888);

const germanCAGrSGTable = withModifiers(table, "Control + AltGr + Shift + Gui +", "C+AGr+S+G+", 7424);

const germanAAGrSGTable = withModifiers(table, "Alt + AltGr + Shift + Gui +", "A+AGr+S+G+", 7680);

const germanAllModTable = withModifiers(table, "Hyper + AltGr +", "H+AGr+", 7936);

const DualUseCtrlTable = withModifiers(table, "Control /", "CTRL/", 49169);
const DualUseShiftTable = withModifiers(table, "Shift /", "SHIFT/", 49425);
const DualUseAltTable = withModifiers(table, "Alt /", "ALT/", 49681);
const DualUseGuiTable = withModifiers(table, "Gui /", "GUI/", 49937);
const DualUseAltGrTable = withModifiers(table, "AltGr /", "ALTGR/", 50705);
const DualUseLayer1Tables = withModifiers(table, "Layer #1 /", "L#1/", 51218);
const DualUseLayer2Tables = withModifiers(table, "Layer #2 /", "L#2/", 51474);
const DualUseLayer3Tables = withModifiers(table, "Layer #3 /", "L#3/", 51730);
const DualUseLayer4Tables = withModifiers(table, "Layer #4 /", "L#4/", 51986);
const DualUseLayer5Tables = withModifiers(table, "Layer #5 /", "L#5/", 52242);
const DualUseLayer6Tables = withModifiers(table, "Layer #6 /", "L#6/", 52498);
const DualUseLayer7Tables = withModifiers(table, "Layer #7 /", "L#7/", 52754);
const DualUseLayer8Tables = withModifiers(table, "Layer #8 /", "L#8/", 53010);

const germanModifiedTables = [
  shiftModifierGerman,
  germanCtrlTable,
  germanLAltTable,
  germanRAltTable,
  germanShiftTable,
  germanGuiTable,
  germanCATable,
  altCtrlGerman,
  altGrGerman,
  germanCAGrTable,
  germanCSTable,
  germanCGTable,
  germanAAGrTable,
  germanASTable,
  germanAGTable,
  germanAGrSTable,
  germanAGrGTable,
  germanSGTable,
  germanCAAGTable,
  germanCASTable,
  germanCAGTable,
  germanCAGSTable,
  germanCAGGTable,
  germanCSGTable,
  germanAAGSTable,
  germanAAGGTable,
  germanASGTable,
  germanAGSGTable,
  germanCAAGrSTable,
  germanCAAGrGTable,
  withModifiers(table, "Hyper +", "Hyper+", 6912),
  germanCAGrSGTable,
  germanAAGrSGTable,
  germanAllModTable,
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

export { german as default, germanModifiedTables };
// export default german;
