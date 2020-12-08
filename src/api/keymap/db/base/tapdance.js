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

const tapdance = index => ({
  code: 53267 + index,
  label: {
    hint: {
      full: "TapDance",
      "1u": "TD"
    },
    base: "#" + index.toString()
  },
  rangeStart: 53267,
  categories: ["tapdance"]
});

const tapdances = Array(16)
  .fill()
  .map((_, index) => tapdance(index));

export { tapdances };
