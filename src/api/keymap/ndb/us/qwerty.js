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
      base: "Blocked",
      short: "Blkd"
    }
  },
  {
    code: 4,
    label: {
      base: "a",
      shifted: "A"
    }
  },
  {
    code: 5,
    label: {
      base: "b",
      shifted: "B"
    }
  },
  {
    code: 6,
    label: {
      base: "c",
      shifted: "C"
    }
  },
  {
    code: 7,
    label: {
      base: "d",
      shifted: "D"
    }
  },
  {
    code: 8,
    label: {
      base: "e",
      shifted: "E"
    }
  },
  {
    code: 9,
    label: {
      base: "f",
      shifted: "F"
    }
  },
  {
    code: 10,
    label: {
      base: "g",
      shifted: "G"
    }
  },
  {
    code: 11,
    label: {
      base: "h",
      shifted: "H"
    }
  },
  {
    code: 12,
    label: {
      base: "i",
      shifted: "I"
    }
  },
  {
    code: 13,
    label: {
      base: "j",
      shifted: "J"
    }
  },
  {
    code: 14,
    label: {
      base: "k",
      shifted: "K"
    }
  },
  {
    code: 15,
    label: {
      base: "l",
      shifted: "L"
    }
  },
  {
    code: 16,
    label: {
      base: "m",
      shifted: "M"
    }
  },
  {
    code: 17,
    label: {
      base: "n",
      shifted: "N"
    }
  },
  {
    code: 18,
    label: {
      base: "o",
      shifted: "O"
    }
  },
  {
    code: 19,
    label: {
      base: "p",
      shifted: "P"
    }
  },
  {
    code: 20,
    label: {
      base: "q",
      shifted: "Q"
    }
  },
  {
    code: 21,
    label: {
      base: "r",
      shifted: "R"
    }
  },
  {
    code: 22,
    label: {
      base: "s",
      shifted: "S"
    }
  },
  {
    code: 23,
    label: {
      base: "t",
      shifted: "T"
    }
  },
  {
    code: 24,
    label: {
      base: "u",
      shifted: "U"
    }
  },
  {
    code: 25,
    label: {
      base: "v",
      shifted: "V"
    }
  },
  {
    code: 26,
    label: {
      base: "w",
      shifted: "W"
    }
  },
  {
    code: 27,
    label: {
      base: "x",
      shifted: "X"
    }
  },
  {
    code: 28,
    label: {
      base: "y",
      shifted: "Y"
    }
  },
  {
    code: 29,
    label: {
      base: "z",
      shifted: "Z"
    }
  },
  {
    code: 41,
    label: {
      base: "Esc"
    }
  },
  {
    code: 43,
    label: {
      base: "Tab"
    }
  },
  {
    code: 44,
    label: {
      base: "Space",
      short: "Spc"
    }
  },
  {
    code: 47,
    label: {
      base: "[",
      shifted: "{"
    }
  },
  {
    code: 48,
    label: {
      base: "]",
      shifted: "}"
    }
  },
  {
    code: 49,
    label: {
      base: "\\",
      shifted: "|"
    }
  },
  {
    code: 50,
    label: {
      base: "Alt. #",
      shifted: "~"
    }
  },
  {
    code: 53,
    label: {
      base: "`",
      shifted: "~"
    }
  },
  {
    code: 30,
    label: {
      base: "1",
      shifted: "!"
    }
  },
  {
    code: 31,
    label: {
      base: "2",
      shifted: "@"
    }
  },
  {
    code: 32,
    label: {
      base: "3",
      shifted: "#"
    }
  },
  {
    code: 33,
    label: {
      base: "4",
      shifted: "$"
    }
  },
  {
    code: 34,
    label: {
      base: "5",
      shifted: "%"
    }
  },
  {
    code: 35,
    label: {
      base: "6",
      shifted: "^"
    }
  },
  {
    code: 36,
    label: {
      base: "7",
      shifted: "&"
    }
  },
  {
    code: 37,
    label: {
      base: "8",
      shifted: "*"
    }
  },
  {
    code: 38,
    label: {
      base: "9",
      shifted: "("
    }
  },
  {
    code: 39,
    label: {
      base: "0",
      shifted: ")"
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
      base: "-",
      shifted: "_"
    }
  },
  {
    code: 46,
    label: {
      base: "=",
      shifted: "+"
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
      base: ";",
      shifted: ":"
    }
  },
  {
    code: 52,
    label: {
      base: "'",
      shifted: '"'
    }
  },
  {
    code: 54,
    label: {
      base: ",",
      shifted: "<"
    }
  },
  {
    code: 55,
    label: {
      base: ".",
      shifted: ">"
    }
  },
  {
    code: 56,
    label: {
      base: "/",
      shifted: "?"
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
    code: 100,
    label: {
      base: "Alt. \\",
      shifted: "|"
    }
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
  },
  {
    code: 65535,
    label: {
      base: ""
    }
  }
];

const layout = [
  [
    41,
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
    86,
    58,
    59,
    60,
    61
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
    87,
    62,
    63,
    64,
    65
  ],
  [
    57,
    4,
    22,
    7,
    9,
    10,
    11,
    13,
    14,
    15,
    51,
    52,
    50,
    40,
    92,
    93,
    94,
    66,
    67,
    68,
    69
  ],
  [225, 100, 29, 27, 6, 25, 5, 17, 16, 54, 55, 56, 229, 82, 89, 90, 91, 88],
  [224, 227, 226, 44, 230, 231, 101, 228, 80, 81, 79, 98, 99]
];

const USQwerty = {
  name: "us-qwerty",
  codetable: keyCodeTable,
  layout: layout
};

export { USQwerty };
