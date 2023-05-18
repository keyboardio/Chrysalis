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

const frenchLetters = [
  {
    code: 20,
    labels: {
      primary: "A"
    }
  },
  {
    code: 26,
    labels: {
      primary: "Z"
    }
  },
  {
    code: 4,
    labels: {
      primary: "Q"
    }
  },
  {
    code: 51,
    labels: {
      primary: "M"
    },
    newGroupName: "Letters"
  },
  {
    code: 29,
    labels: {
      primary: "W"
    }
  },
  {
    code: 53,
    labels: {
      primary: "²"
    },
    newGroupName: "Letters"
  }
];

const frenchModifierKeys = [
  {
    code: 31,
    labels: {
      primary: "é"
    },
    newGroupName: "Letters"
  },
  {
    code: 36,
    labels: {
      primary: "è"
    },
    newGroupName: "Letters"
  },
  {
    code: 38,
    labels: {
      primary: "ç"
    },
    newGroupName: "Letters"
  },
  {
    code: 39,
    labels: {
      primary: "à"
    },
    newGroupName: "Letters"
  },
  {
    code: 52,
    labels: {
      primary: "ù"
    },
    newGroupName: "Letters"
  },
  {
    code: 30,
    labels: {
      primary: "&"
    },
    newGroupName: "Punctuation"
  },
  {
    code: 32,
    labels: {
      primary: '"'
    },
    newGroupName: "Punctuation"
  },
  {
    code: 33,
    labels: {
      primary: "'"
    },
    newGroupName: "Punctuation"
  },
  {
    code: 34,
    labels: {
      primary: "("
    },
    newGroupName: "Punctuation"
  },
  {
    code: 35,
    labels: {
      primary: "-"
    },
    newGroupName: "Punctuation"
  },
  {
    code: 37,
    labels: {
      primary: "_"
    },
    newGroupName: "Punctuation"
  },
  {
    code: 45,
    labels: {
      primary: ")"
    }
  },

  {
    code: 47,
    labels: {
      primary: "^"
    }
  },
  {
    code: 48,
    labels: {
      primary: "$"
    }
  },
  {
    code: 49,
    labels: {
      primary: "*"
    }
  },
  {
    code: 16,
    labels: {
      primary: ","
    },
    newGroupName: "Punctuation"
  },
  {
    code: 54,
    labels: {
      primary: ";"
    }
  },
  {
    code: 55,
    labels: {
      primary: ":"
    }
  },
  {
    code: 56,
    labels: {
      primary: "!"
    }
  },
  {
    code: 100,
    labels: {
      primary: "<"
    }
  }
];

const altCtrlFrench = {
  groupName: "AltCtrl French",
  keys: [
    {
      code: 799,
      labels: {
        primary: "~"
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
        primary: "{"
      }
    },
    {
      code: 802,
      labels: {
        primary: "["
      }
    },
    {
      code: 803,
      labels: {
        primary: "|"
      }
    },
    {
      code: 804,
      labels: {
        primary: "`"
      }
    },
    {
      code: 805,
      labels: {
        primary: "\\"
      }
    },
    {
      code: 806,
      labels: {
        primary: "^"
      }
    },
    {
      code: 807,
      labels: {
        primary: "@"
      }
    },
    {
      code: 813,
      labels: {
        primary: "]"
      }
    },
    {
      code: 814,
      labels: {
        primary: "}"
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
        primary: "¤"
      }
    }
  ]
};

const altGRFrench = {
  groupName: "AltCtrl French",
  keys: [
    {
      code: 1055,
      labels: {
        primary: "~"
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
        primary: "{"
      }
    },
    {
      code: 1058,
      labels: {
        primary: "["
      }
    },
    {
      code: 1059,
      labels: {
        primary: "|"
      }
    },
    {
      code: 1060,
      labels: {
        primary: "`"
      }
    },
    {
      code: 1061,
      labels: {
        primary: "\\"
      }
    },
    {
      code: 1062,
      labels: {
        primary: "^"
      }
    },
    {
      code: 1063,
      labels: {
        primary: "@"
      }
    },
    {
      code: 1069,
      labels: {
        primary: "]"
      }
    },
    {
      code: 1070,
      labels: {
        primary: "}"
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
        primary: "¤"
      }
    }
  ]
};

const shiftModifierFrench = {
  groupName: "Shifted French",
  keys: [
    {
      code: 2078,
      labels: {
        primary: "1"
      },
      newGroupName: "Digits"
    },
    {
      code: 2079,
      labels: {
        primary: "2"
      },
      newGroupName: "Digits"
    },
    {
      code: 2080,
      labels: {
        primary: "3"
      },
      newGroupName: "Digits"
    },
    {
      code: 2081,
      labels: {
        primary: "4"
      },
      newGroupName: "Digits"
    },
    {
      code: 2082,
      labels: {
        primary: "5"
      },
      newGroupName: "Digits"
    },
    {
      code: 2083,
      labels: {
        primary: "6"
      },
      newGroupName: "Digits"
    },
    {
      code: 2084,
      labels: {
        primary: "7"
      },
      newGroupName: "Digits"
    },
    {
      code: 2085,
      labels: {
        primary: "8"
      },
      newGroupName: "Digits"
    },
    {
      code: 2086,
      labels: {
        primary: "9"
      },
      newGroupName: "Digits"
    },
    {
      code: 2087,
      labels: {
        primary: "0"
      },
      newGroupName: "Digits"
    },
    {
      code: 2093,
      labels: {
        primary: "°"
      }
    },
    {
      code: 2095,
      labels: {
        primary: "¨"
      }
    },
    {
      code: 2096,
      labels: {
        primary: "£"
      }
    },
    {
      code: 2097,
      labels: {
        primary: "µ"
      }
    },
    {
      code: 2099,
      labels: {
        primary: "M"
      }
    },
    {
      code: 2100,
      labels: {
        primary: "%"
      }
    },
    {
      code: 2064,
      labels: {
        primary: "?"
      }
    },
    {
      code: 2102,
      labels: {
        primary: "."
      }
    },
    {
      code: 2103,
      labels: {
        primary: "/"
      }
    },
    {
      code: 2104,
      labels: {
        primary: "§"
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

const french = frenchLetters.concat(frenchModifierKeys);

const table = { keys: french };
const tableWithoutModifier = { keys: frenchLetters };

const frenchCtrlTable = withModifiers(table, "Control +", "C+", 256);
const frenchLAltTable = withModifiers(table, "Alt +", "A+", 512);
const frenchRAltTable = withModifiers(table, "AltGr +", "AGr+", 1024);
const frenchShiftTable = withModifiers(tableWithoutModifier, "Shift +", "S+", 2048);
const frenchGuiTable = withModifiers(table, "Os+", "O+", 4096);
// Double

const frenchCATable = withModifiers(table, "Control + Alt +", "C+A+", 768);

const frenchCAGrTable = withModifiers(table, "Control + AltGr +", "C+AGr+", 1280);

const frenchCSTable = withModifiers(table, "Control + Shift +", "C+S+", 2304);

const frenchCGTable = withModifiers(table, "Control + Os +", "C+O+", 4352);

const frenchAAGrTable = withModifiers(table, "Alt + AltGr +", "A+AGr+", 1536);

const frenchASTable = withModifiers(table, "Alt + Shift +", "A+S+", 2560);

const frenchAGTable = withModifiers(table, "Alt + Os +", "A+O+", 4608);

const frenchAGrSTable = withModifiers(table, "AltGr + Shift +", "AGr+S+", 3072);

const frenchAGrGTable = withModifiers(table, "AltGr + Os +", "AGr+O+", 5120);

const frenchSGTable = withModifiers(table, "Shift + Os +", "S+O+", 6144);

// Triple

const frenchCAAGTable = withModifiers(table, "Control + Alt + AltGr +", "C+A+AGr+", 1792);

const frenchCASTable = withModifiers(table, "Meh +", "Meh+", 2816);

const frenchCAGTable = withModifiers(table, "Control + Alt + Os +", "C+A+O+", 4864);

const frenchCAGSTable = withModifiers(table, "Control + AltGr + Shift +", "C+AGr+S+", 3328);

const frenchCAGGTable = withModifiers(table, "Control + AltGr + Os +", "C+AGr+O+", 5376);

const frenchCSGTable = withModifiers(table, "Control + Shift + Os +", "C+S+O+", 6400);

const frenchAAGSTable = withModifiers(table, "Alt + AltGr + Shift +", "A+AGr+S+", 3584);

const frenchAAGGTable = withModifiers(table, "Alt + AltGr + Os +", "A+AGr+O+", 5632);

const frenchASGTable = withModifiers(table, "Alt + Shift + Os +", "A+S+O+", 6656);

const frenchAGSGTable = withModifiers(table, "AltGr + Shift + Os +", "AGr+S+O+", 7168);

// Quad

const frenchCAAGrSTable = withModifiers(table, "Meh + AltGr +", "M+AGr+", 3840);

const frenchCAAGrGTable = withModifiers(table, "Control + Alt + AltGr + Os +", "C+A+AGr+O+", 5888);

const frenchCAGrSGTable = withModifiers(table, "Control + AltGr + Shift + Os +", "C+AGr+S+O+", 7424);

const frenchAAGrSGTable = withModifiers(table, "Alt + AltGr + Shift + Os +", "A+AGr+S+O+", 7680);

const frenchAllModTable = withModifiers(table, "Hyper + AltGr +", "H+AGr+", 7936);

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

const frenchModifiedTables = [
  shiftModifierFrench,
  frenchCtrlTable,
  frenchLAltTable,
  frenchRAltTable,
  frenchShiftTable,
  frenchGuiTable,
  frenchCATable,
  altCtrlFrench,
  altGRFrench,
  frenchCAGrTable,
  frenchCSTable,
  frenchCGTable,
  frenchASTable,
  frenchAGTable,
  frenchAAGrTable,
  frenchSGTable,
  frenchAGrSTable,
  frenchAGrGTable,
  frenchCAAGTable,
  frenchCASTable,
  frenchCAGTable,
  frenchCAGSTable,
  frenchCAGGTable,
  frenchCSGTable,
  frenchAAGSTable,
  frenchAAGGTable,
  frenchASGTable,
  frenchAGSGTable,
  frenchCAAGrSTable,
  frenchCAAGrGTable,
  withModifiers(table, "Hyper +", "Hyper+", 6912),
  frenchCAGrSGTable,
  frenchAAGrSGTable,
  frenchAllModTable,
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

export { french as default, frenchModifiedTables };
