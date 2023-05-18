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

const japaneseLetters = [
  {
    code: 53,
    labels: {
      primary: "半角/全角 漢字"
    }
  },
  {
    code: 30,
    labels: {
      primary: "ぬ"
    },
    newGroupName: "Letters"
  },
  {
    code: 31,
    labels: {
      primary: "ふ"
    },
    newGroupName: "Letters"
  },
  {
    code: 32,
    labels: {
      primary: "あ"
    },
    newGroupName: "Letters"
  },
  {
    code: 33,
    labels: {
      primary: "う"
    },
    newGroupName: "Letters"
  },
  {
    code: 34,
    labels: {
      primary: "え"
    },
    newGroupName: "Letters"
  },
  {
    code: 35,
    labels: {
      primary: "お"
    },
    newGroupName: "Letters"
  },
  {
    code: 36,
    labels: {
      primary: "や"
    },
    newGroupName: "Letters"
  },
  {
    code: 37,
    labels: {
      primary: "ゆ"
    },
    newGroupName: "Letters"
  },
  {
    code: 38,
    labels: {
      primary: "よ"
    },
    newGroupName: "Letters"
  },
  {
    code: 39,
    labels: {
      primary: "わ"
    },
    newGroupName: "Letters"
  },
  {
    code: 45,
    labels: {
      primary: "ほ"
    }
  },
  {
    code: 46,
    labels: {
      primary: "へ"
    }
  },
  {
    code: 20,
    labels: {
      primary: "た"
    }
  },
  {
    code: 26,
    labels: {
      primary: "て"
    }
  },
  {
    code: 8,
    labels: {
      primary: "い"
    }
  },
  {
    code: 21,
    labels: {
      primary: "す"
    }
  },
  {
    code: 23,
    labels: {
      primary: "か"
    }
  },
  {
    code: 28,
    labels: {
      primary: "ん"
    }
  },
  {
    code: 24,
    labels: {
      primary: "な"
    }
  },
  {
    code: 12,
    labels: {
      primary: "に"
    }
  },
  {
    code: 18,
    labels: {
      primary: "ら"
    }
  },
  {
    code: 19,
    labels: {
      primary: "せ"
    }
  },
  {
    code: 49,
    labels: {
      primary: "む"
    },
    newGroupName: "Letters"
  },
  {
    code: 4,
    labels: {
      primary: "ち"
    }
  },
  {
    code: 22,
    labels: {
      primary: "と"
    }
  },
  {
    code: 7,
    labels: {
      primary: "し"
    }
  },
  {
    code: 9,
    labels: {
      primary: "は"
    }
  },
  {
    code: 10,
    labels: {
      primary: "き"
    }
  },
  {
    code: 11,
    labels: {
      primary: "く"
    }
  },
  {
    code: 13,
    labels: {
      primary: "ま"
    }
  },
  {
    code: 14,
    labels: {
      primary: "の"
    }
  },
  {
    code: 15,
    labels: {
      primary: "り"
    }
  },
  {
    code: 51,
    labels: {
      primary: "れ"
    }
  },
  {
    code: 52,
    labels: {
      primary: "け"
    }
  },
  {
    code: 29,
    labels: {
      primary: "つ"
    }
  },
  {
    code: 27,
    labels: {
      primary: "さ"
    }
  },
  {
    code: 6,
    labels: {
      primary: "そ"
    }
  },
  {
    code: 25,
    labels: {
      primary: "ひ"
    }
  },
  {
    code: 5,
    labels: {
      primary: "こ"
    }
  },
  {
    code: 17,
    labels: {
      primary: "み"
    }
  },
  {
    code: 16,
    labels: {
      primary: "も"
    }
  },
  {
    code: 54,
    labels: {
      primary: "ね"
    }
  },
  {
    code: 55,
    labels: {
      primary: "る"
    }
  },
  {
    code: 56,
    labels: {
      primary: "め"
    }
  },
  {
    code: 135,
    labels: {
      primary: "\\ろ"
    },
    newGroupName: "Punctuation"
  },
  {
    code: 136,
    labels: {
      primary: "Hiragana",
      verbose: "カタカナ/ひらがな/ローマ字"
    },
    newGroupName: "Punctuation"
  },
  {
    code: 137,
    labels: {
      primary: "¥"
    },
    newGroupName: "Punctuation"
  },
  {
    code: 138,
    labels: {
      primary: "変換"
    },
    newGroupName: "Punctuation"
  },
  {
    code: 139,
    labels: {
      primary: "無変換"
    },
    newGroupName: "Punctuation"
  }
];

const japaneseModifierKeys = [
  {
    code: 47,
    labels: {
      primary: "゛"
    }
  },
  {
    code: 48,
    labels: {
      primary: "゜"
    }
  }
];

const altCtrlJapanese = {
  groupName: "AltCtrl Japanese",
  keys: [
    {
      code: 821,
      labels: {
        primary: "ロ"
      }
    },
    {
      code: 798,
      labels: {
        primary: "ヌ"
      }
    },
    {
      code: 799,
      labels: {
        primary: "フ"
      }
    },
    {
      code: 800,
      labels: {
        primary: "ア"
      }
    },
    {
      code: 801,
      labels: {
        primary: "ウ"
      }
    },
    {
      code: 802,
      labels: {
        primary: "エ"
      }
    },
    {
      code: 803,
      labels: {
        primary: "オ"
      }
    },
    {
      code: 804,
      labels: {
        primary: "ヤ"
      }
    },
    {
      code: 805,
      labels: {
        primary: "ユ"
      }
    },
    {
      code: 806,
      labels: {
        primary: "ヨ"
      }
    },
    {
      code: 807,
      labels: {
        primary: "ワ"
      }
    },
    {
      code: 813,
      labels: {
        primary: "ホ"
      }
    },
    {
      code: 814,
      labels: {
        primary: "ヘ"
      }
    },
    {
      code: 788,
      labels: {
        primary: "タ"
      }
    },
    {
      code: 794,
      labels: {
        primary: "テ"
      }
    },
    {
      code: 776,
      labels: {
        primary: "イ"
      }
    },
    {
      code: 789,
      labels: {
        primary: "ス"
      }
    },
    {
      code: 791,
      labels: {
        primary: "カ"
      }
    },
    {
      code: 796,
      labels: {
        primary: "ン"
      }
    },
    {
      code: 792,
      labels: {
        primary: "ナ"
      }
    },
    {
      code: 780,
      labels: {
        primary: "ニ"
      }
    },
    {
      code: 786,
      labels: {
        primary: "ラ"
      }
    },
    {
      code: 787,
      labels: {
        primary: "セ"
      }
    },
    {
      code: 817,
      labels: {
        primary: "ム"
      },
      newGroupName: "Letters"
    },
    {
      code: 772,
      labels: {
        primary: "チ"
      }
    },
    {
      code: 790,
      labels: {
        primary: "ト"
      }
    },
    {
      code: 775,
      labels: {
        primary: "シ"
      }
    },
    {
      code: 777,
      labels: {
        primary: "ハ"
      }
    },
    {
      code: 778,
      labels: {
        primary: "キ"
      }
    },
    {
      code: 779,
      labels: {
        primary: "ク"
      }
    },
    {
      code: 781,
      labels: {
        primary: "マ"
      }
    },
    {
      code: 782,
      labels: {
        primary: "ノ"
      }
    },
    {
      code: 783,
      labels: {
        primary: "リ"
      }
    },
    {
      code: 819,
      labels: {
        primary: "レ"
      }
    },
    {
      code: 820,
      labels: {
        primary: "ケ"
      }
    },
    {
      code: 797,
      labels: {
        primary: "ツ"
      }
    },
    {
      code: 795,
      labels: {
        primary: "サ"
      }
    },
    {
      code: 774,
      labels: {
        primary: "ソ"
      }
    },
    {
      code: 793,
      labels: {
        primary: "ヒ"
      }
    },
    {
      code: 773,
      labels: {
        primary: "コ"
      }
    },
    {
      code: 785,
      labels: {
        primary: "ミ"
      }
    },
    {
      code: 784,
      labels: {
        primary: "モ"
      }
    },
    {
      code: 822,
      labels: {
        primary: "ネ"
      }
    },
    {
      code: 823,
      labels: {
        primary: "ル"
      }
    },
    {
      code: 824,
      labels: {
        primary: "メ"
      }
    }
  ]
};

const altGRJapanese = {
  groupName: "AltCtrl Japanese",
  keys: [
    {
      code: 1077,
      labels: {
        primary: "ロ"
      }
    },
    {
      code: 1054,
      labels: {
        primary: "ヌ"
      }
    },
    {
      code: 1055,
      labels: {
        primary: "フ"
      }
    },
    {
      code: 1056,
      labels: {
        primary: "ア"
      }
    },
    {
      code: 1057,
      labels: {
        primary: "ウ"
      }
    },
    {
      code: 1058,
      labels: {
        primary: "エ"
      }
    },
    {
      code: 1059,
      labels: {
        primary: "オ"
      }
    },
    {
      code: 1060,
      labels: {
        primary: "ヤ"
      }
    },
    {
      code: 1061,
      labels: {
        primary: "ユ"
      }
    },
    {
      code: 1062,
      labels: {
        primary: "ヨ"
      }
    },
    {
      code: 1063,
      labels: {
        primary: "ワ"
      }
    },
    {
      code: 1069,
      labels: {
        primary: "ホ"
      }
    },
    {
      code: 1070,
      labels: {
        primary: "ヘ"
      }
    },
    {
      code: 1044,
      labels: {
        primary: "タ"
      }
    },
    {
      code: 1050,
      labels: {
        primary: "テ"
      }
    },
    {
      code: 1032,
      labels: {
        primary: "イ"
      }
    },
    {
      code: 1045,
      labels: {
        primary: "ス"
      }
    },
    {
      code: 1047,
      labels: {
        primary: "カ"
      }
    },
    {
      code: 1052,
      labels: {
        primary: "ン"
      }
    },
    {
      code: 1048,
      labels: {
        primary: "ナ"
      }
    },
    {
      code: 1036,
      labels: {
        primary: "ニ"
      }
    },
    {
      code: 1042,
      labels: {
        primary: "ラ"
      }
    },
    {
      code: 1043,
      labels: {
        primary: "セ"
      }
    },
    {
      code: 1073,
      labels: {
        primary: "ム"
      },
      newGroupName: "Letters"
    },
    {
      code: 1028,
      labels: {
        primary: "チ"
      }
    },
    {
      code: 1046,
      labels: {
        primary: "ト"
      }
    },
    {
      code: 1031,
      labels: {
        primary: "シ"
      }
    },
    {
      code: 1033,
      labels: {
        primary: "ハ"
      }
    },
    {
      code: 1034,
      labels: {
        primary: "キ"
      }
    },
    {
      code: 1035,
      labels: {
        primary: "ク"
      }
    },
    {
      code: 1037,
      labels: {
        primary: "マ"
      }
    },
    {
      code: 1038,
      labels: {
        primary: "ノ"
      }
    },
    {
      code: 1039,
      labels: {
        primary: "リ"
      }
    },
    {
      code: 1075,
      labels: {
        primary: "レ"
      }
    },
    {
      code: 1076,
      labels: {
        primary: "ケ"
      }
    },
    {
      code: 1053,
      labels: {
        primary: "ツ"
      }
    },
    {
      code: 1051,
      labels: {
        primary: "サ"
      }
    },
    {
      code: 1030,
      labels: {
        primary: "ソ"
      }
    },
    {
      code: 1049,
      labels: {
        primary: "ヒ"
      }
    },
    {
      code: 1029,
      labels: {
        primary: "コ"
      }
    },
    {
      code: 1041,
      labels: {
        primary: "ミ"
      }
    },
    {
      code: 1040,
      labels: {
        primary: "モ"
      }
    },
    {
      code: 1078,
      labels: {
        primary: "ネ"
      }
    },
    {
      code: 1079,
      labels: {
        primary: "ル"
      }
    },
    {
      code: 1080,
      labels: {
        primary: "メ"
      }
    }
  ]
};

const shiftModifierJapanese = {
  groupName: "Shifted Japanese",
  keys: [
    {
      code: 2080,
      labels: {
        primary: "ぁ"
      }
    },
    {
      code: 2081,
      labels: {
        primary: "ぅ"
      }
    },
    {
      code: 2082,
      labels: {
        primary: "ぇ"
      }
    },
    {
      code: 2083,
      labels: {
        primary: "ぉ"
      }
    },
    {
      code: 2084,
      labels: {
        primary: "ゃ"
      }
    },
    {
      code: 2085,
      labels: {
        primary: "ゅ"
      }
    },
    {
      code: 2086,
      labels: {
        primary: "ょ"
      }
    },
    {
      code: 2087,
      labels: {
        primary: "を"
      }
    },
    {
      code: 2093,
      labels: {
        primary: "ー"
      }
    },
    {
      code: 2056,
      labels: {
        primary: "ぃ"
      }
    },
    {
      code: 2095,
      labels: {
        primary: "「"
      }
    },
    {
      code: 2096,
      labels: {
        primary: "」"
      }
    },
    {
      code: 2077,
      labels: {
        primary: "っ"
      }
    },
    {
      code: 2102,
      labels: {
        primary: "、"
      }
    },
    {
      code: 2103,
      labels: {
        primary: "。"
      }
    },
    {
      code: 2104,
      labels: {
        primary: "・"
      }
    }
  ]
};

const japanese = japaneseLetters.concat(japaneseModifierKeys);

const table = { keys: japanese };
const tableWithoutModifier = { keys: japaneseLetters };

const japaneseCtrlTable = withModifiers(table, "Control +", "C+", 256);
const japaneseLAltTable = withModifiers(table, "Alt +", "A+", 512);
const japaneseRAltTable = withModifiers(table, "AltGr +", "AGr+", 1024);
const japaneseShiftTable = withModifiers(tableWithoutModifier, "Shift +", "S+", 2048);
const japaneseGuiTable = withModifiers(table, "Os+", "O+", 4096);
// Double

const japaneseCATable = withModifiers(table, "Control + Alt +", "C+A+", 768);

const japaneseCAGrTable = withModifiers(table, "Control + AltGr +", "C+AGr+", 1280);

const japaneseCSTable = withModifiers(table, "Control + Shift +", "C+S+", 2304);

const japaneseCGTable = withModifiers(table, "Control + Os +", "C+O+", 4352);

const japaneseAAGrTable = withModifiers(table, "Alt + AltGr +", "A+AGr+", 1536);

const japaneseASTable = withModifiers(table, "Alt + Shift +", "A+S+", 2560);

const japaneseAGTable = withModifiers(table, "Alt + Os +", "A+O+", 4608);

const japaneseAGrSTable = withModifiers(table, "AltGr + Shift +", "AGr+S+", 3072);

const japaneseAGrGTable = withModifiers(table, "AltGr + Os +", "AGr+O+", 5120);

const japaneseSGTable = withModifiers(table, "Shift + Os +", "S+O+", 6144);

// Triple

const japaneseCAAGTable = withModifiers(table, "Control + Alt + AltGr +", "C+A+AGr+", 1792);

const japaneseCASTable = withModifiers(table, "Meh +", "Meh+", 2816);

const japaneseCAGTable = withModifiers(table, "Control + Alt + Os +", "C+A+O+", 4864);

const japaneseCAGSTable = withModifiers(table, "Control + AltGr + Shift +", "C+AGr+S+", 3328);

const japaneseCAGGTable = withModifiers(table, "Control + AltGr + Os +", "C+AGr+O+", 5376);

const japaneseCSGTable = withModifiers(table, "Control + Shift + Os +", "C+S+O+", 6400);

const japaneseAAGSTable = withModifiers(table, "Alt + AltGr + Shift +", "A+AGr+S+", 3584);

const japaneseAAGGTable = withModifiers(table, "Alt + AltGr + Os +", "A+AGr+O+", 5632);

const japaneseASGTable = withModifiers(table, "Alt + Shift + Os +", "A+S+O+", 6656);

const japaneseAGSGTable = withModifiers(table, "AltGr + Shift + Os +", "AGr+S+O+", 7168);

// Quad

const japaneseCAAGrSTable = withModifiers(table, "Meh + AltGr +", "M+AGr+", 3840);

const japaneseCAAGrGTable = withModifiers(table, "Control + Alt + AltGr + Os +", "C+A+AGr+O+", 5888);

const japaneseAAGrSGTable = withModifiers(table, "Control + AltGr + Shift + Os +", "C+AGr+S+O+", 7424);

const japaneseCAGrSGTable = withModifiers(table, "Alt + AltGr + Shift + Os +", "A+AGr+S+O+", 7680);

const japaneseAllModTable = withModifiers(table, "Hyper + AltGr +", "H+AGr+", 7936);

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

const japaneseModifiedTables = [
  japaneseCtrlTable,
  japaneseLAltTable,
  japaneseRAltTable,
  japaneseShiftTable,
  japaneseGuiTable,
  japaneseCATable,
  shiftModifierJapanese,
  altCtrlJapanese,
  altGRJapanese,
  japaneseCAGrTable,
  japaneseCSTable,
  japaneseCGTable,
  japaneseAAGrTable,
  japaneseASTable,
  japaneseAGTable,
  japaneseSGTable,
  japaneseAGrSTable,
  japaneseAGrGTable,
  japaneseCAAGTable,
  japaneseCASTable,
  japaneseCAGTable,
  japaneseCAGSTable,
  japaneseCAGGTable,
  japaneseCSGTable,
  japaneseAAGSTable,
  japaneseAAGGTable,
  japaneseASGTable,
  japaneseAGSGTable,
  japaneseCAAGrSTable,
  japaneseCAAGrGTable,
  withModifiers(table, "Hyper +", "Hyper+", 6912),
  japaneseCAGrSGTable,
  japaneseAAGrSGTable,
  japaneseAllModTable,
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

export { japanese as default, japaneseModifiedTables };
