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

const norwegianLetters = [
  {
    code: 47,
    labels: {
      primary: "Å"
    },
    newGroupName: "Letters"
  },
  {
    code: 51,
    labels: {
      primary: "Ø"
    },
    newGroupName: "Letters"
  },
  {
    code: 52,
    labels: {
      primary: "Æ"
    },
    newGroupName: "Letters"
  }
];

const norwegianModifierKeys = [
  {
    code: 53,
    labels: {
      primary: "|"
    }
  },
  {
    code: 45,
    labels: {
      primary: "+"
    }
  },
  {
    code: 46,
    labels: {
      primary: "\\"
    }
  },
  {
    code: 48,
    labels: {
      primary: "¨"
    }
  },
  {
    code: 49,
    labels: {
      primary: "'"
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

const altCtrlNorwegian = {
  groupName: "AltCtrl Norwegian",
  keys: [
    {
      code: 799,
      labels: {
        primary: "@"
      }
    },
    {
      code: 800,
      labels: {
        primary: "£"
      }
    },
    {
      code: 801,
      labels: {
        primary: "$"
      }
    },
    {
      code: 802,
      labels: {
        primary: "€"
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
      code: 814,
      labels: {
        primary: "´"
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
      code: 784,
      labels: {
        primary: "µ"
      }
    }
  ]
};

const altGRNorwegian = {
  groupName: "AltCtrl Norwegian",
  keys: [
    {
      code: 1055,
      labels: {
        primary: "@"
      }
    },
    {
      code: 1056,
      labels: {
        primary: "£"
      }
    },
    {
      code: 1057,
      labels: {
        primary: "$"
      }
    },
    {
      code: 1058,
      labels: {
        primary: "€"
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
      code: 1070,
      labels: {
        primary: "´"
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
      code: 1040,
      labels: {
        primary: "µ"
      }
    }
  ]
};

const shiftModifierNorwegian = {
  groupName: "Shifted Norwegian",
  keys: [
    {
      code: 2101,
      labels: {
        primary: "§"
      }
    },
    {
      code: 2079,
      labels: {
        primary: '"'
      }
    },
    {
      code: 2081,
      labels: {
        primary: "¤"
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
        primary: "^"
      }
    },
    {
      code: 2097,
      labels: {
        primary: "*"
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

const norwegian = norwegianLetters.concat(norwegianModifierKeys);

const table = { keys: norwegianModifierKeys };
const tableWithoutModifier = { keys: norwegianLetters };

const norwegianCtrlTable = withModifiers(table, "Control +", "C+", 256);
const norwegianLAltTable = withModifiers(table, "Alt +", "A+", 512);
const norwegianRAltTable = withModifiers(table, "AltGr +", "AGr+", 1024);
const norwegianShiftTable = withModifiers(tableWithoutModifier, "Shift +", "S+", 2048);
const norwegianGuiTable = withModifiers(table, "Os+", "O+", 4096);
// Double

const norwegianCATable = withModifiers(table, "Control + Alt +", "C+A+", 768);

const norwegianCAGrTable = withModifiers(table, "Control + AltGr +", "C+AGr+", 1280);

const norwegianCSTable = withModifiers(table, "Control + Shift +", "C+S+", 2304);

const norwegianCGTable = withModifiers(table, "Control + Os +", "C+O+", 4352);

const norwegianAAGrTable = withModifiers(table, "Alt + AltGr +", "A+AGr+", 1536);

const norwegianASTable = withModifiers(table, "Alt + Shift +", "A+S+", 2560);

const norwegianAGTable = withModifiers(table, "Alt + Os +", "A+O+", 4608);

const norwegianAGrSTable = withModifiers(table, "AltGr + Shift +", "AGr+S+", 3072);

const norwegianAGrGTable = withModifiers(table, "AltGr + Os +", "AGr+O+", 5120);

const norwegianSGTable = withModifiers(table, "Shift + Os +", "S+O+", 6144);

// Triple

const norwegianCAAGTable = withModifiers(table, "Control + Alt + AltGr +", "C+A+AGr+", 1792);

const norwegianCASTable = withModifiers(table, "Meh +", "Meh+", 2816);

const norwegianCAGTable = withModifiers(table, "Control + Alt + Os +", "C+A+O+", 4864);

const norwegianCAGSTable = withModifiers(table, "Control + AltGr + Shift +", "C+AGr+S+", 3328);

const norwegianCAGGTable = withModifiers(table, "Control + AltGr + Os +", "C+AGr+O+", 5376);

const norwegianCSGTable = withModifiers(table, "Control + Shift + Os +", "C+S+O+", 6400);

const norwegianAAGSTable = withModifiers(table, "Alt + AltGr + Shift +", "A+AGr+S+", 3584);

const norwegianAAGGTable = withModifiers(table, "Alt + AltGr + Os +", "A+AGr+O+", 5632);

const norwegianASGTable = withModifiers(table, "Alt + Shift + Os +", "A+S+O+", 6656);

const norwegianAGSGTable = withModifiers(table, "AltGr + Shift + Os +", "AGr+S+O+", 7168);

// Quad

const norwegianCAAGrSTable = withModifiers(table, "Meh + AltGr +", "M+AGr+", 3840);

const norwegianCAAGrGTable = withModifiers(table, "Control + Alt + AltGr + Os +", "C+A+AGr+O+", 5888);

const norwegianCAGrSGTable = withModifiers(table, "Control + AltGr + Shift + Os +", "C+AGr+S+O+", 7424);

const norwegianAAGrSGTable = withModifiers(table, "Alt + AltGr + Shift + Os +", "A+AGr+S+O+", 7680);

const norwegianAllModTable = withModifiers(table, "Hyper + AltGr +", "H+AGr+", 7936);

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

const norwegianModifiedTables = [
  shiftModifierNorwegian,
  norwegianCtrlTable,
  norwegianLAltTable,
  norwegianRAltTable,
  norwegianShiftTable,
  norwegianGuiTable,
  norwegianCATable,
  altCtrlNorwegian,
  altGRNorwegian,
  norwegianCAGrTable,
  norwegianCSTable,
  norwegianCGTable,
  norwegianAAGrTable,
  norwegianASTable,
  norwegianAGTable,
  norwegianAGrSTable,
  norwegianAGrGTable,
  norwegianSGTable,
  norwegianCAAGTable,
  norwegianCASTable,
  norwegianCAGTable,
  norwegianCAGSTable,
  norwegianCAGGTable,
  norwegianCSGTable,
  norwegianAAGSTable,
  norwegianAAGGTable,
  norwegianASGTable,
  norwegianAGSGTable,
  norwegianCAAGrSTable,
  norwegianCAAGrGTable,
  withModifiers(table, "Hyper +", "Hyper+", 6912),
  norwegianCAGrSGTable,
  norwegianAAGrSGTable,
  norwegianAllModTable,
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

export { norwegian as default, norwegianModifiedTables };
// export default norwegian;
