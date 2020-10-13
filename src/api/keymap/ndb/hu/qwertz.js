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
      altgr: "{"
    }
  },
  {
    code: 6,
    label: {
      altgr: "&"
    }
  },
  {
    code: 7,
    label: {
      altgr: "Đ"
    }
  },
  {
    code: 9,
    label: {
      altgr: "["
    }
  },
  {
    code: 10,
    label: {
      altgr: "]"
    }
  },
  {
    code: 14,
    label: {
      altgr: "ł"
    }
  },
  {
    code: 15,
    label: {
      altgr: "Ł"
    }
  },
  {
    code: 17,
    label: {
      altgr: "}"
    }
  },
  {
    code: 20,
    label: {
      altgr: "\\"
    }
  },
  {
    code: 22,
    label: {
      altgr: "đ"
    }
  },
  {
    code: 24,
    label: {
      altgr: "€"
    }
  },
  {
    code: 25,
    label: {
      altgr: "@"
    }
  },
  {
    code: 26,
    label: {
      altgr: "|"
    }
  },
  {
    code: 27,
    label: {
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
      shifted: "'",
      altgr: "~"
    }
  },
  {
    code: 31,
    label: {
      shifted: '"',
      altgr: "ˇ"
    }
  },
  {
    code: 32,
    label: {
      shifted: "+",
      altgr: "^"
    }
  },
  {
    code: 33,
    label: {
      shifted: "!",
      altgr: "˘"
    }
  },
  {
    code: 34,
    label: {
      altgr: "°"
    }
  },
  {
    code: 35,
    label: {
      shifted: "/",
      altgr: "˛"
    }
  },
  {
    code: 36,
    label: {
      shifted: "=",
      altgr: "`"
    }
  },
  {
    code: 37,
    label: {
      shifted: "(",
      altgr: "˙"
    }
  },
  {
    code: 38,
    label: {
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
