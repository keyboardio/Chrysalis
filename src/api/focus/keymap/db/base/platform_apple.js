/* Chrysalis -- Kaleidoscope Command Center
 * Copyright (C) 2020-2022  Keyboardio, Inc.
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

const platform_apple = addCategories(
  ["platform_apple"],
  [
    {
      code: 19101, // 0x29D
      label: {
        base: { full: "Globe", "1u": "🌐" },
      },
    },
    {
      code: 18846, // 0x19E
      label: {
        base: { full: "Lock Screen", "1u": "Lock" },
      },
    },
    {
      code: 19106, // 0x2A2
      label: {
        base: { full: "Mission Control", "1u": "Mission" },
      },
    },
    {
      code: 19103, // 0x29F
      label: {
        base: { full: "Exposé" },
      },
    },
  ]
);

export { platform_apple };
