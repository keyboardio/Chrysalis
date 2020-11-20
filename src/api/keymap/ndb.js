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

import { Base } from "./ndb/base";
import { USQwerty } from "./ndb/us/qwerty";
import cldr from "./cldr";

global.chrysalis_keymapdb_instance = null;

class KeymapDB {
  constructor() {
    if (!global.chrysalis_keymapdb_instance) {
      global.chrysalis_keymapdb_instance = this;

      this._layouts = {
        "English (US)": USQwerty
      };

      this.setLayout("English (US)");
      this.loadLayouts();
    }

    return global.chrysalis_keymapdb_instance;
  }

  loadLayouts = async () => {
    this._layouts = Object.assign(
      {},
      this._layouts,
      await cldr.loadAllKeymaps()
    );
  };

  getSupportedLayouts() {
    let layouts = [];
    for (const layout of Object.entries(this._layouts)) {
      layouts.push(layout[0]);
    }
    return layouts;
  }

  resetLayout() {
    this._layout = Base.layout;
    this._codetable = [];

    // Base codetable
    for (const key of Base.codetable) {
      this._codetable[key.code] = Object.assign({}, key);
    }

    // Fallback to US QWERTY
    for (const key of USQwerty.codetable) {
      this._codetable[key.code] = Object.assign({}, key);
    }
  }

  setLayout(layout) {
    this.resetLayout();

    if (!this._layouts.hasOwnProperty(layout)) return;

    const table = this._layouts[layout];

    if (table.codetable instanceof Promise) {
      table.codetable.then(data => {
        for (const key of data) {
          if (this._codetable[key.code]) {
            const base = this._codetable[key.code];
            this._codetable[key.code].label = Object.assign(
              {},
              base.label,
              key.label
            );
          } else {
            this._codetable[key.code] = Object.assign({}, key);
          }
        }
      });
    } else {
      for (const key of table.codetable) {
        if (this._codetable[key.code]) {
          const base = this._codetable[key.code];
          this._codetable[key.code].label = Object.assign(
            {},
            base.label,
            key.label
          );
        } else {
          this._codetable[key.code] = Object.assign({}, key);
        }
      }
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

  isInCategory(keyCode, category) {
    if (keyCode < 0) return false;

    const key = this._codetable[keyCode];

    return key && key.categories && key.categories.includes(category);
  }

  selectCategory(category) {
    let cdb = [];

    for (const k of this._codetable) {
      if (k && k.categories && k.categories.includes(category)) {
        cdb.push(k);
      }
    }

    return cdb;
  }

  _lookupShifted(keyCode) {
    if (keyCode >= 2048 && keyCode <= 2303) {
      const unshifted = keyCode - 2048;
      return {
        code: keyCode,
        label: {
          base: this._codetable[unshifted].label.shifted
        }
      };
    }
  }

  _lookupByKeycode(keyCode) {
    return this._lookupShifted(keyCode) || this._codetable[keyCode];
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

  serialize(key) {
    return key.code;
  }

  getStandardLayout() {
    return this._layout;
  }

  format(key) {
    let label = key.label.base;
    if (label.length == 1) {
      label = label.toUpperCase();
    }

    return {
      main: label
    };
  }
}

export { KeymapDB };
