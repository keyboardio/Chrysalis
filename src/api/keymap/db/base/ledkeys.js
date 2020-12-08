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

import addCategories from "../addCategories";

const ledkeys = addCategories(
  ["ledkeys"],
  [
    {
      code: 17152,
      label: {
        hint: {
          full: "LEDEffect",
          "1u": "LED"
        },
        base: "Next"
      }
    },
    {
      code: 17153,
      label: {
        hint: {
          full: "LEDEffect",
          "1u": "LED"
        },
        base: {
          full: "Previous",
          "1u": "Prev."
        }
      }
    }
  ]
);

export { ledkeys };
