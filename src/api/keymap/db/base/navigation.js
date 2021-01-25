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

const navigation = withModifiers([
  {
    code: 74,
    label: {
      base: "Home"
    }
  },
  {
    code: 75,
    label: {
      base: {
        full: "Page Up",
        "1u": "PgUp"
      }
    }
  },
  {
    code: 77,
    label: {
      base: "End"
    }
  },
  {
    code: 78,
    label: {
      base: {
        full: "Page Down",
        "1u": "PgDn"
      }
    }
  },
  {
    code: 79,
    label: {
      base: {
        full: "Right Arrow",
        "1u": "→"
      }
    }
  },
  {
    code: 80,
    label: {
      base: {
        full: "Left Arrow",
        "1u": "←"
      }
    }
  },
  {
    code: 81,
    label: {
      base: {
        full: "Down Arrow",
        "1u": "↓"
      }
    }
  },
  {
    code: 82,
    label: {
      base: {
        full: "Up Arrow",
        "1u": "↑"
      }
    }
  }
]);

export { navigation };
