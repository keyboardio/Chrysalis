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

const osm = (index, mod) => ({
  code: 49153 + index,
  label: {
    hint: "OneShot ",
    base: mod
  },
  rangeStart: 49153,
  categories: ["oneshot", "modifier"]
});

const osl = index => ({
  code: 49161 + index,
  label: {
    hint: "OneShot ",
    base: "#" + index.toString()
  },
  rangeStart: 49161,
  categories: ["oneshot", "layer"]
});

const oneshot = [
  osm(0, "Left Control"),
  osm(1, "Left Shift"),
  osm(2, "Left Alt"),
  osm(3, "Left GUI"),
  osm(4, "Right Control"),
  osm(5, "Right Shift"),
  osm(6, "Right Alt"),
  osm(7, "Right GUI"),

  osl(0),
  osl(1),
  osl(2),
  osl(3),
  osl(4),
  osl(5),
  osl(6),
  osl(7)
];

export { oneshot };
