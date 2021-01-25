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

const numpad = withModifiers([
  {
    code: 83,
    label: {
      base: {
        full: "Num Lock",
        "1u": "NumLK"
      }
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
  }
]);

export { numpad };
