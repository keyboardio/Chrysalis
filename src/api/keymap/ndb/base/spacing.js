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

const spacing = [
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
      base: "Space"
    }
  },
  {
    code: 40,
    label: {
      base: "Enter"
    }
  },
  {
    code: 42,
    label: {
      base: {
        full: "Backspace",
        "1u": "Bksp"
      }
    }
  },
  {
    code: 73,
    label: {
      base: {
        full: "Insert",
        "1u": "Ins"
      }
    }
  },
  {
    code: 76,
    label: {
      base: {
        full: "Delete",
        "1u": "Del"
      }
    }
  }
];

export { spacing };
