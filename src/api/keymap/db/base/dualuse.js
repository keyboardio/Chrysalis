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

import { baseCodeTable } from "../us/qwerty";
import { miscellaneous } from "./misc";
import { fx } from "./fx";
import { navigation } from "./navigation";
import { numpad } from "./numpad";
import { spacing } from "./spacing";
import { GuiLabel } from "./gui";

const keySet = []
  .concat(baseCodeTable)
  .concat(miscellaneous)
  .concat(fx)
  .concat(navigation)
  .concat(numpad)
  .concat(spacing);

const addDUL = (key, layer) => ({
  code: 51218 + layer * 256 + key.code,
  baseCode: key.code,
  label: {
    hint: "Layer #" + layer.toString() + "/",
    base: key.label.base
  },
  target: layer,
  rangeStart: 51218,
  categories: ["layer", "dualuse"]
});

const duMods = {
  ctrl: {
    index: 0,
    name: "Control"
  },
  shift: {
    index: 1,
    name: "Shift"
  },
  alt: {
    index: 2,
    name: "Alt"
  },
  gui: {
    index: 3,
    name: GuiLabel.full
  },
  altgr: {
    index: 6,
    name: "AltGr"
  }
};

const addDUM = (key, mod) => ({
  code: 49169 + duMods[mod].index * 256 + key.code,
  baseCode: key.code,
  label: {
    hint: duMods[mod].name + "/",
    base: key.label.base
  },
  modifier: duMods[mod].name,
  rangeStart: 49169,
  categories: ["modifier", "dualuse", mod]
});

const dul = () => {
  let l = [];

  for (let k of keySet) {
    // We only want to augment the base set, but `keySet` contains
    // modifier-augmented variants too. We don't want to add dual-use layer
    // augmentation to those, because that messes up the labels badly.
    if (k.code > 255) continue;

    for (let layer = 0; layer < 8; layer++) {
      l.push(addDUL(k, layer));
    }
  }

  return l;
};

const dum = mod => {
  let m = [];

  for (let k of keySet) {
    // We only want to augment the base set, but `keySet` contains
    // modifier-augmented variants too. We don't want to add dual-use modifier
    // augmentation to those, because that messes up the labels badly.
    if (k.code > 255) continue;

    m.push(addDUM(k, mod));
  }

  return m;
};

const dualuse = []
  .concat(dul())

  .concat(dum("ctrl"))
  .concat(dum("shift"))
  .concat(dum("alt"))
  .concat(dum("gui"))
  .concat(dum("altgr"));

export { dualuse, addDUM, addDUL };
