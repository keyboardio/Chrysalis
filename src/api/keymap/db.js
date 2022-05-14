/* Chrysalis -- Kaleidoscope Command Center
 * Copyright (C) 2020-2021  Keyboardio, Inc.
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

import { Base } from "./db/base";
import { USQwerty } from "./db/us/qwerty";
import cldr from "./cldr";
import cldr_ from "cldr";
import i18n from "i18next";

global.chrysalis_keymapdb_instance = null;

class KeymapDB {
  constructor() {
    if (!global.chrysalis_keymapdb_instance) {
      global.chrysalis_keymapdb_instance = this;

      this._layouts = {
        "English (US)": USQwerty,
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

  getLayoutLanguage = (layout) => {
    const languageCode = this._layouts[layout].group;
    return cldr_.extractLanguageDisplayNames(i18n.language)[languageCode];
  };

  getSupportedLayouts() {
    let layouts = [];
    for (const layout of Object.entries(this._layouts)) {
      layouts.push(layout[0]);
    }
    layouts.sort((a, b) => {
      const l1 = this._layouts[a];
      const l2 = this._layouts[b];

      // Sort on group first
      if (l1.group < l2.group) return -1;
      if (l1.group > l2.group) return 1;

      // If in the same group, sort the default one higher
      if (l1.default) return -1;
      if (l2.default) return 1;

      // If neither is the default, sort on name.
      const n1 = l1.name.toUpperCase();
      const n2 = l2.name.toUpperCase();

      if (n1 < n2) return -1;
      if (n1 > n2) return 1;

      return 0;
    });
    return layouts;
  }

  resetLayout() {
    this._layout = Base.layout;
    this._codetable = [];

    // Base codetable
    for (const key of Base.codetable) {
      this._codetable[key.code] = Object.assign({}, key);
      if (key.legacyCode) {
        this._codetable[key.legacyCode] = Object.assign({}, key, {
          legacy: true,
        });
      }
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
      table.codetable.then((data) => {
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
          // If there is no dualuse key for this keycode, continue with the next
          // one.
          if (!this._codetable[key.code + 49169]?.baseCode) continue;
          if (key.code >= 256) continue;

          // dual-use modifiers
          for (const m of [0, 1, 2, 3, 6]) {
            const dumCode = key.code + 49169 + m * 256;
            if (this._codetable[dumCode]) {
              const base = this._codetable[dumCode];
              this._codetable[dumCode].label = Object.assign(
                {},
                { hint: base.label.hint, base: key.label.base }
              );
            }
          }

          // dual-use layers
          for (const l of [0, 1, 2, 3, 4, 5, 6, 7]) {
            const dulCode = key.code + 51218 + l * 256;
            if (this._codetable[dulCode]) {
              const base = this._codetable[dulCode];
              this._codetable[dulCode].label = Object.assign(
                {},
                { hint: base.label.hint, base: key.label.base }
              );
            }
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
        // If there is no dualuse key for this keycode, continue with the next
        // one.
        if (!this._codetable[key.code + 49169]?.baseCode) continue;
        if (key.code >= 256) continue;

        // dual-use modifiers
        for (const m of [0, 1, 2, 3, 6]) {
          const dumCode = key.code + 49169 + m * 256;
          if (this._codetable[dumCode]) {
            const base = this._codetable[dumCode];
            this._codetable[dumCode].label = Object.assign(
              {},
              { hint: base.label.hint, base: key.label.base }
            );
          }
        }

        // dual-use layers
        for (const l of [0, 1, 2, 3, 4, 5, 6, 7]) {
          const dulCode = key.code + 51218 + l * 256;
          if (this._codetable[dulCode]) {
            const base = this._codetable[dulCode];
            this._codetable[dulCode].label = Object.assign(
              {},
              { hint: base.label.hint, base: key.label.base }
            );
          }
        }
      }
    }
  }

  _lookupFallback(keyCode) {
    return {
      code: keyCode || 0,
      label: {
        base: "#" + (keyCode || 0).toString(),
      },
      categories: ["unknown"],
    };
  }

  isInCategory(keyCode, category) {
    if (keyCode < 0) return false;

    const key = this.lookup(keyCode);

    return (
      (key && key.categories && key.categories.includes(category)) || false
    );
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

  serialize(key) {
    return key.code;
  }

  getStandardLayout() {
    return this._layout;
  }

  format(key, keycapSize = "1u") {
    let label = key.label.base;
    let shifted = key.label.shifted;
    if (typeof label != "string") {
      label = key.label.base[keycapSize] || key.label.base.full;
    }
    if (label.length == 1) {
      label = label.toUpperCase();
    }

    let hint = key.label.hint;
    if (hint && typeof hint != "string") {
      hint = key.label.hint[keycapSize] || key.label.hint.full;
    }
    if (key.legacy) hint = "Legacy";

    let data = {
      main: label,
      hint: hint,
    };
    if (shifted !== label) {
      data.shifted = shifted;
    }

    return data;
  }
}

export { KeymapDB as default };
