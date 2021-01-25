/* Chrysalis -- Kaleidoscope Command Center
 * Copyright (C) 2020-2021  Keyboardio, Inc.
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

const miscellaneous = withModifiers([
  {
    code: 57,
    label: {
      base: {
        full: "Caps Lock",
        "1u": "CpLK"
      }
    }
  },
  {
    code: 70,
    label: {
      base: {
        full: "Print Screen",
        "1u": "PrSc"
      }
    }
  },
  {
    code: 71,
    label: {
      base: {
        full: "Scroll Lock",
        "1u": "ScLk"
      }
    }
  },
  {
    code: 72,
    label: {
      base: "Pause"
    }
  },
  {
    code: 101,
    label: {
      base: "Menu"
    }
  }
]);

export { miscellaneous };
