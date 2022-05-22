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

const dynmacro = (index) => ({
  code: 53596 + index,
  label: {
    hint: {
      full: "Dynamic Macro",
      "1u": "DM",
    },
    base: "#" + index.toString(),
  },
  rangeStart: 53596,
  categories: ["dynmacros"],
});

const dynmacros = Array(32)
  .fill()
  .map((_, index) => dynmacro(index));

export { dynmacros };
