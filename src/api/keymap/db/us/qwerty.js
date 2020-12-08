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

import { withModifiers } from "../modifiers";

const keyCodeTable = [
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
      hint: {
        full: "Alternate",
        "1u": "Alt."
      },
      base: "#",
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
    code: 100,
    label: {
      hint: {
        full: "Alternate",
        "1u": "Alt."
      },
      base: "\\",
      shifted: "|"
    }
  }
];

const USQwerty = {
  name: "English (US)",
  codetable: withModifiers(keyCodeTable)
};

export { USQwerty, keyCodeTable as baseCodeTable };
