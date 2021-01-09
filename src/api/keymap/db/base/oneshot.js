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

import { GuiLabel } from "./gui";

const osm = (index, mod) => ({
  code: 49153 + index,
  label: {
    hint: {
      full: "OneShot",
      "1u": "OSM"
    },
    base: mod
  },
  rangeStart: 49153,
  categories: ["oneshot", "modifier"]
});

const osl = index => ({
  code: 49161 + index,
  label: {
    hint: {
      full: "OneShot",
      "1u": "OSL"
    },
    base: "#" + index.toString()
  },
  target: index,
  rangeStart: 49161,
  categories: ["layer", "oneshot"]
});

const oneshot = [
  osm(0, {
    full: "Left Control",
    "1u": "LCtrl"
  }),
  osm(1, {
    full: "Left Shift",
    "1u": "LSft"
  }),
  osm(2, "Alt"),
  osm(3, {
    full: "Left " + GuiLabel.full,
    "1u": "L" + GuiLabel["1u"]
  }),
  osm(4, {
    full: "Right Control",
    "1u": "RCtrl"
  }),
  osm(5, {
    full: "Right Shift",
    "1u": "RSft"
  }),
  osm(6, "AltGr"),
  osm(7, {
    full: "Right " + GuiLabel.full,
    "1u": "R" + GuiLabel["1u"]
  }),

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
