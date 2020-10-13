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

import { USQwerty } from "./ndb/us/qwerty";
import { HUQwertz } from "./ndb/hu/qwertz";

global.chrysalis_keymapdb_instance = null;

class KeymapDB {
  constructor() {
    if (!global.chrysalis_keymapdb_instance) {
      global.chrysalis_keymapdb_instance = this;

      this.setLayout("us-qwerty");
    }

    return global.chrysalis_keymapdb_instance;
  }

  getSupportedLayouts() {
    return ["us-qwerty", "hu-qwertz"];
  }

  setLayout(layout) {
    /* Default to US Qwerty, as a fallback. */
    this._layout = USQwerty.layout;
    this._codetable = [];

    for (let key of USQwerty.codetable) {
      this._codetable[key.code] = key;
    }

    if (layout == "us-qwerty") return;
    if (layout == "hu-qwertz") {
      for (const key of HUQwertz.codetable) {
        this._codetable[key.code] = key;
      }
      return;
    }
  }

  _lookupFallback(keyCode) {
    return {
      code: keyCode || 0,
      label: {
        base: "#" + (keyCode || 0).toString()
      }
    };
  }

  _lookupByKeycode(keyCode) {
    return this._codetable[keyCode];
  }

  _lookupObject(key) {
    for (const k of this._codetable) {
      if (k === undefined) continue;

      let match = true;

      if (key.code !== undefined) {
        match &= key.code == k.code;
      }

      if (key.location !== undefined) {
        match &= key.location == k.location;
      }

      if (key.label && key.label.base) {
        match &= key.label.base == k.label.base;
      }

      if (key.label && key.label.any) {
        match &=
          key.label.any == k.label.base ||
          key.label.any == k.label.shifted ||
          key.label.any == k.label.altgr;
      }

      if (match) return k;
    }
  }

  lookup(key) {
    let code;
    if (typeof key == "object" && key !== undefined) {
      code = this._lookupObject(key);
    } else {
      code = this._lookupByKeycode(key);
    }

    if (code === undefined) {
      code = this._lookupFallback(key);
    }
    return code;
  }

  getStandardLayout() {
    return this._layout;
  }
}

export { KeymapDB };
