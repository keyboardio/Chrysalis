/* Chrysalis -- Kaleidoscope Command Center
 * Copyright (C) 2020  Keyboardio, Inc.
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

const keyCodeTable = [
  {
    code: 0,
    label: {
      base: "Üres"
    }
  },
  {
    code: 5,
    label: {
      base: "b",
      shifted: "B",
      altgr: "{"
    }
  },
  {
    code: 6,
    label: {
      base: "c",
      shifted: "C",
      altgr: "&"
    }
  },
  {
    code: 7,
    label: {
      base: "d",
      shifted: "D",
      altgr: "Đ"
    }
  },
  {
    code: 9,
    label: {
      base: "f",
      shifted: "F",
      altgr: "["
    }
  },
  {
    code: 10,
    label: {
      base: "g",
      shifted: "G",
      altgr: "]"
    }
  },
  {
    code: 14,
    label: {
      base: "k",
      shifted: "K",
      altgr: "ł"
    }
  },
  {
    code: 15,
    label: {
      base: "l",
      shifted: "L",
      altgr: "Ł"
    }
  },
  {
    code: 17,
    label: {
      base: "n",
      shifted: "N",
      altgr: "}"
    }
  },
  {
    code: 20,
    label: {
      base: "q",
      shifted: "Q",
      altgr: "\\"
    }
  },
  {
    code: 22,
    label: {
      base: "s",
      shifted: "S",
      altgr: "đ"
    }
  },
  {
    code: 24,
    label: {
      base: "u",
      shifted: "U",
      altgr: "€"
    }
  },
  {
    code: 25,
    label: {
      base: "v",
      shifted: "V",
      altgr: "@"
    }
  },
  {
    code: 26,
    label: {
      base: "w",
      shifted: "W",
      altgr: "|"
    }
  },
  {
    code: 27,
    label: {
      base: "x",
      shifted: "X",
      altgr: "#"
    }
  },
  {
    code: 28,
    label: {
      base: "z",
      shifted: "Z"
    }
  },
  {
    code: 29,
    label: {
      base: "y",
      shifted: "Y",
      altgr: ">"
    }
  },
  {
    code: 47,
    label: {
      base: "ő",
      shifted: "Ő"
    }
  },
  {
    code: 48,
    label: {
      base: "ú",
      shifted: "Ú"
    }
  },
  {
    code: 49,
    label: {
      base: "ű",
      shifted: "Ű",
      altgr: "¤"
    }
  },
  {
    code: 53,
    label: {
      base: "0",
      shifted: "§"
    }
  },
  {
    code: 30,
    label: {
      base: "1",
      shifted: "'",
      altgr: "~"
    }
  },
  {
    code: 31,
    label: {
      base: "2",
      shifted: '"',
      altgr: "ˇ"
    }
  },
  {
    code: 32,
    label: {
      base: "3",
      shifted: "+",
      altgr: "^"
    }
  },
  {
    code: 33,
    label: {
      base: "4",
      shifted: "!",
      altgr: "˘"
    }
  },
  {
    code: 34,
    label: {
      base: "5",
      shifted: "%",
      altgr: "°"
    }
  },
  {
    code: 35,
    label: {
      base: "6",
      shifted: "/",
      altgr: "˛"
    }
  },
  {
    code: 36,
    label: {
      base: "7",
      shifted: "=",
      altgr: "`"
    }
  },
  {
    code: 37,
    label: {
      base: "8",
      shifted: "(",
      altgr: "˙"
    }
  },
  {
    code: 38,
    label: {
      base: "9",
      shifted: ")",
      altgr: "'"
    }
  },
  {
    code: 39,
    label: {
      base: "ö",
      shifted: "Ö",
      altgr: "˝"
    }
  },
  {
    code: 40,
    label: {
      base: "Enter"
    }
  },
  {
    code: 45,
    label: {
      base: "ü",
      shifted: "Ü",
      altgr: "¨"
    }
  },
  {
    code: 46,
    label: {
      base: "ó",
      shifted: "Ó",
      altgr: "¸"
    }
  },
  {
    code: 42,
    label: {
      base: "Backspace",
      short: "Bksp"
    }
  },
  {
    code: 51,
    label: {
      base: "é",
      shifted: "É",
      altgr: "$"
    }
  },
  {
    code: 52,
    label: {
      base: "á",
      shifted: "á",
      altgr: "ß"
    }
  },
  {
    code: 54,
    label: {
      base: ",",
      shifted: "?",
      altgr: ";"
    }
  },
  {
    code: 55,
    label: {
      base: ".",
      shifted: ":",
      altgr: ">"
    }
  },
  {
    code: 56,
    label: {
      base: "-",
      shifted: "_",
      altgr: "*"
    }
  },
  {
    code: 57,
    label: {
      base: "Caps Lock",
      short: "CpLK"
    }
  },
  {
    code: 58,
    label: {
      base: "F1"
    }
  },
  {
    code: 59,
    label: {
      base: "F2"
    }
  },
  {
    code: 60,
    label: {
      base: "F3"
    }
  },
  {
    code: 61,
    label: {
      base: "F4"
    }
  },
  {
    code: 62,
    label: {
      base: "F5"
    }
  },
  {
    code: 63,
    label: {
      base: "F6"
    }
  },
  {
    code: 64,
    label: {
      base: "F7"
    }
  },
  {
    code: 65,
    label: {
      base: "F8"
    }
  },
  {
    code: 66,
    label: {
      base: "F9"
    }
  },
  {
    code: 67,
    label: {
      base: "F10"
    }
  },
  {
    code: 68,
    label: {
      base: "F11"
    }
  },
  {
    code: 69,
    label: {
      base: "F12"
    }
  },

  {
    code: 70,
    label: {
      base: "Print Screen",
      short: "PrSc"
    }
  },
  {
    code: 71,
    label: {
      base: "Scroll Lock",
      short: "ScLk"
    }
  },
  {
    code: 72,
    label: {
      base: "Pause"
    }
  },
  {
    code: 73,
    label: {
      base: "Insert",
      short: "Ins"
    }
  },
  {
    code: 74,
    label: {
      base: "Home"
    }
  },
  {
    code: 75,
    label: {
      base: "Page Up",
      short: "PgUp"
    }
  },
  {
    code: 76,
    label: {
      base: "Delete",
      short: "Del"
    }
  },
  {
    code: 77,
    label: {
      base: "Home"
    }
  },
  {
    code: 78,
    label: {
      base: "Page Down",
      short: "PgDn"
    }
  },
  {
    code: 79,
    label: {
      base: "Right Arrow",
      short: "→"
    }
  },
  {
    code: 80,
    label: {
      base: "Left Arrow",
      short: "←"
    }
  },
  {
    code: 81,
    label: {
      base: "Down Arrow",
      short: "↓"
    }
  },
  {
    code: 82,
    label: {
      base: "Up Arrow",
      short: "↑"
    }
  },
  {
    code: 83,
    label: {
      base: "Num Lock",
      short: "NumLK"
    }
  },
  {
    code: 84,
    label: {
      base: "/"
    },
    location: "numpad"
  },
  {
    code: 85,
    label: {
      base: "*"
    },
    location: "numpad"
  },
  {
    code: 86,
    label: {
      base: "-"
    },
    location: "numpad"
  },
  {
    code: 87,
    label: {
      base: "+"
    },
    location: "numpad"
  },
  {
    code: 88,
    label: {
      base: "Enter"
    },
    location: "numpad"
  },
  {
    code: 89,
    label: {
      base: "1"
    },
    location: "numpad"
  },
  {
    code: 90,
    label: {
      base: "2"
    },
    location: "numpad"
  },
  {
    code: 91,
    label: {
      base: "3"
    },
    location: "numpad"
  },
  {
    code: 92,
    label: {
      base: "4"
    },
    location: "numpad"
  },
  {
    code: 93,
    label: {
      base: "5"
    },
    location: "numpad"
  },
  {
    code: 94,
    label: {
      base: "6"
    },
    location: "numpad"
  },
  {
    code: 95,
    label: {
      base: "7"
    },
    location: "numpad"
  },
  {
    code: 96,
    label: {
      base: "8"
    },
    location: "numpad"
  },
  {
    code: 97,
    label: {
      base: "9"
    },
    location: "numpad"
  },
  {
    code: 98,
    label: {
      base: "0"
    },
    location: "numpad"
  },
  {
    code: 99,
    label: {
      base: "."
    },
    location: "numpad"
  },
  {
    code: 101,
    label: {
      base: "Menu"
    }
  },
  {
    code: 224,
    label: {
      base: "Control",
      short: "Ctrl"
    },
    location: "left"
  },
  {
    code: 225,
    label: {
      base: "Shift"
    },
    location: "left"
  },
  {
    code: 226,
    label: {
      base: "Alt"
    },
    location: "left"
  },
  {
    code: 227,
    label: {
      base: "Gui"
    },
    location: "left"
  },
  {
    code: 228,
    label: {
      base: "Control",
      short: "Ctrl"
    },
    location: "right"
  },
  {
    code: 229,
    label: {
      base: "Shift"
    },
    location: "right"
  },
  {
    code: 230,
    label: {
      base: "AltGr",
      short: "AGr"
    },
    location: "right"
  },
  {
    code: 231,
    label: {
      base: "Gui"
    },
    location: "right"
  }
];

const layout = [
  [41, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72],
  [
    53,
    30,
    31,
    32,
    33,
    34,
    35,
    36,
    37,
    38,
    39,
    45,
    46,
    42,
    73,
    74,
    75,
    83,
    84,
    85,
    86
  ],
  [
    43,
    20,
    26,
    8,
    21,
    23,
    28,
    24,
    12,
    18,
    19,
    47,
    48,
    49,
    76,
    77,
    78,
    95,
    96,
    97,
    87
  ],
  [57, 4, 22, 7, 9, 10, 11, 13, 14, 15, 51, 52, 40, 92, 93, 94],
  [225, 29, 27, 6, 25, 5, 17, 16, 54, 55, 56, 229, 82, 89, 90, 91, 88],
  [224, 227, 226, 44, 230, 231, 101, 228, 80, 81, 79, 98, 99]
];

const HUQwertz = {
  codetable: keyCodeTable
};

export { HUQwertz };
