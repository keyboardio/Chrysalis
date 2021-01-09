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

const layer = (base, hint, type, index) => ({
  code: base + index,
  label: {
    hint: hint,
    base: "#" + index.toString()
  },
  target: index,
  rangeStart: base,
  categories: ["layer", type]
});

const shiftToLayer = Array(32)
  .fill()
  .map((_, index) => layer(17450, "ShiftTo", "shifttolayer", index));

const lockToLayer = Array(32)
  .fill()
  .map((_, index) => layer(17408, "LockTo", "locktolayer", index));

const moveToLayer = Array(32)
  .fill()
  .map((_, index) => layer(17492, "MoveTo", "movetolayer", index));

const layers = shiftToLayer.concat(lockToLayer).concat(moveToLayer);

export { layers };
