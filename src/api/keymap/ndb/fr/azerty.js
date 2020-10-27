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
    code: 4,
    label: {
      base: "q",
      shifted: "Q"
    }
  },
  {
    code: 8,
    label: {
      altgr: "€"
    }
  },
  {
    code: 16,
    label: {
      base: ",",
      shifted: "?"
    }
  },
  {
    code: 20,
    label: {
      base: "a",
      shifted: "A"
    }
  },
  {
    code: 26,
    label: {
      base: "z",
      shifted: "Z"
    }
  },
  {
    code: 29,
    label: {
      base: "w",
      shifted: "Z"
    }
  },
  {
    code: 47,
    label: {
      base: "^",
      shifted: "¨"
    }
  },
  {
    code: 48,
    label: {
      base: "$",
      shifted: "£",
      altgr: "&"
    }
  },
  {
    code: 49,
    label: {
      base: "=",
      shifted: "+",
      altgr: "}"
    }
  },
  {
    code: 53,
    label: {
      base: "²"
    }
  },
  {
    code: 30,
    label: {
      base: "&",
      shifted: "1"
    }
  },
  {
    code: 31,
    label: {
      base: "é",
      shifted: "2",
      altgr: "~"
    }
  },
  {
    code: 32,
    label: {
      base: '"',
      shifted: "3",
      altgr: "#"
    }
  },
  {
    code: 33,
    label: {
      base: "'",
      shifted: "4",
      altgr: "{"
    }
  },
  {
    code: 34,
    label: {
      base: "(",
      shifted: "5",
      altgr: "["
    }
  },
  {
    code: 35,
    label: {
      base: "-",
      shifted: "6",
      altgr: "|"
    }
  },
  {
    code: 36,
    label: {
      base: "è",
      shifted: "7",
      altgr: "`"
    }
  },
  {
    code: 37,
    label: {
      base: "_",
      shifted: "8",
      altgr: "\\"
    }
  },
  {
    code: 38,
    label: {
      base: "ç",
      shifted: "9",
      altgr: "^"
    }
  },
  {
    code: 39,
    label: {
      base: "à",
      shifted: "0",
      altgr: "@"
    }
  },
  {
    code: 45,
    label: {
      base: ")",
      shifted: "°",
      altgr: "]"
    }
  },
  {
    code: 46,
    label: {
      altgr: "}"
    }
  },
  {
    code: 51,
    label: {
      base: "m",
      shifted: "M"
    }
  },
  {
    code: 52,
    label: {
      base: "ù",
      shifted: "%"
    }
  },
  {
    code: 54,
    label: {
      base: ";",
      shifted: "."
    }
  },
  {
    code: 55,
    label: {
      base: ":",
      shifted: "/"
    }
  },
  {
    code: 56,
    label: {
      base: "!",
      shifted: "§"
    }
  }
];

const FRAzerty = {
  name: "fr-azerty",
  codetable: keyCodeTable
};

export { FRAzerty };
