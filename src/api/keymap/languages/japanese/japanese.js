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
const japaneseShiftTable = withModifiers(
  tableWithoutModifier,
  "Shift +",
  "S+",
  2048
);
const japaneseGuiTable = withModifiers(table, "Gui +", "G+", 4096);
// Double

const japaneseCATable = withModifiers(table, "Control + Alt +", "C+A+", 768);

const japaneseCAGrTable = withModifiers(
  table,
  "Control + AltGr +",
  "C+AGr+",
  1280
);

const japaneseCSTable = withModifiers(table, "Control + Shift +", "C+S+", 2304);

const japaneseCGTable = withModifiers(table, "Control + Gui +", "C+G+", 4352);

const japaneseAAGrTable = withModifiers(table, "Alt + AltGr +", "A+AGr+", 1536);

const japaneseASTable = withModifiers(table, "Alt + Shift +", "A+S+", 2560);

const japaneseAGTable = withModifiers(table, "Alt + Gui +", "A+G+", 4608);

const japaneseAGrSTable = withModifiers(
  table,
  "AltGr + Shift +",
  "AGr+S+",
  3072
);

const japaneseAGrGTable = withModifiers(table, "AltGr + Gui +", "AGr+G+", 5120);

const japaneseSGTable = withModifiers(table, "Shift + Gui +", "S+G+", 6144);

// Triple

const japaneseCAAGTable = withModifiers(
  table,
  "Control + Alt + AltGr +",
  "C+A+AGr+",
  1792
);

const japaneseCASTable = withModifiers(table, "Meh +", "Meh+", 2816);

const japaneseCAGTable = withModifiers(
  table,
  "Control + Alt + Gui +",
  "C+A+G+",
  4864
);

const japaneseCAGSTable = withModifiers(
  table,
  "Control + AltGr + Shift +",
  "C+AGr+S+",
  3328
);

const japaneseCAGGTable = withModifiers(
  table,
  "Control + AltGr + Gui +",
  "C+AGr+G+",
  5376
);

const japaneseCSGTable = withModifiers(
  table,
  "Control + Shift + Gui +",
  "C+S+G+",
  6400
);

const japaneseAAGSTable = withModifiers(
  table,
  "Alt + AltGr + Shift +",
  "A+AGr+S+",
  3584
);

const japaneseAAGGTable = withModifiers(
  table,
  "Alt + AltGr + Gui +",
  "A+AGr+G+",
  5632
);

const japaneseASGTable = withModifiers(
  table,
  "Alt + Shift + Gui +",
  "A+S+G+",
  6656
);

const japaneseAGSGTable = withModifiers(
  table,
  "AltGr + Shift + Gui +",
  "AGr+S+G+",
  7168
);

// Quad

const japaneseCAAGrSTable = withModifiers(
  table,
  "Meh + AltGr +",
  "M+AGr+",
  3840
);

const japaneseCAAGrGTable = withModifiers(
  table,
  "Control + Alt + AltGr + Gui +",
  "C+A+AGr+G+",
  5888
);

const japaneseAAGrSGTable = withModifiers(
  table,
  "Control + AltGr + Shift + Gui +",
  "C+AGr+S+G+",
  7424
);

const japaneseCAGrSGTable = withModifiers(
  table,
  "Alt + AltGr + Shift + Gui +",
  "A+AGr+S+G+",
  7680
);

const japaneseAllModTable = withModifiers(
  table,
  "Hyper + AltGr +",
  "H+AGr+",
  7936
);

const japaneseModifiedTables = [
  japaneseCtrlTable,
  japaneseLAltTable,
  japaneseRAltTable,
  japaneseShiftTable,
  japaneseGuiTable,
  japaneseCATable,
  shiftModifierJapanese,
  altCtrlJapanese,
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
  japaneseAllModTable
];

export { japanese as default, japaneseModifiedTables };
