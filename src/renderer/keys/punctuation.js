// -*- mode: js-jsx -*-
/* chrysalis-bundle-keyboardio -- Chrysalis Bundle for Keyboard.io
 * Copyright (C) 2018  Keyboardio, Inc.
 *
 * This program is free software: you can redistribute it and/or modify it under
 * the terms of the GNU General Public License as published by the Free Software
 * Foundation, version 3.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

const PunctuationTable = {
  groupName: "Punctuation",
  keys: [
    {
      code: 45,
      labels: {
        primary: "-"
      }
    },
    {
      code: 46,
      labels: {
        primary: "="
      }
    },
    {
      code: 47,
      labels: {
        primary: "["
      }
    },
    {
      code: 48,
      labels: {
        primary: "]"
      }
    },
    {
      code: 49,
      labels: {
        primary: "\\"
      }
    },
    {
      code: 51,
      labels: {
        primary: ";"
      }
    },
    {
      code: 52,
      labels: {
        primary: "'"
      }
    },
    {
      code: 53,
      labels: {
        primary: "`"
      }
    },
    {
      code: 54,
      labels: {
        primary: ","
      }
    },
    {
      code: 55,
      labels: {
        primary: "."
      }
    },
    {
      code: 56,
      labels: {
        primary: "/"
      }
    },
    {
      code: 57,
      labels: {
        primary: "CapsLK",
        verbose: "Caps Lock"
      }
    }
  ]
};

const ShiftedPunctuationTable = {
  groupName: "Shifted Punctuation",
  keys: [
    {
      code: 2093,
      labels: {
        primary: "_"
      }
    },
    {
      code: 2094,
      labels: {
        primary: "+"
      }
    },
    {
      code: 2095,
      labels: {
        primary: "{"
      }
    },
    {
      code: 2096,
      labels: {
        primary: "}"
      }
    },
    {
      code: 2097,
      labels: {
        primary: "|"
      }
    },
    {
      code: 2098,
      labels: {
        primary: ":"
      }
    },
    {
      code: 2099,
      labels: {
        primary: '"'
      }
    },
    {
      code: 2100,
      labels: {
        primary: "~"
      }
    },
    {
      code: 2101,
      labels: {
        primary: "<"
      }
    },
    {
      code: 2102,
      labels: {
        primary: ">"
      }
    },
    {
      code: 2103,
      labels: {
        primary: "?"
      }
    }
  ]
};

export { PunctuationTable as default, ShiftedPunctuationTable };
