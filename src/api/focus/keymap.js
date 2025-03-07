/* chrysalis-keymap -- Chrysalis keymap library
 * Copyright (C) 2018-2022  Keyboardio, Inc.
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

import KeymapDB from "./keymap/db";

global.chrysalis_keymap_instance = null;
const db = new KeymapDB();

class Keymap {
  constructor(opts) {
    if (!global.chrysalis_keymap_instance) {
      global.chrysalis_keymap_instance = this;
      this.unsupportedFirmware = false;
    }
    global.chrysalis_keymap_instance.setLayerSize(opts);

    return global.chrysalis_keymap_instance;
  }

  setLayerSize(opts) {
    if (!opts || opts == undefined) return;

    if (typeof opts == "number") {
      this._layerSize = opts;
    } else if (typeof opts == "object") {
      this._layerSize = opts.keyboard.rows * opts.keyboard.columns;
    }

    return this;
  }

  _chunk(a, chunkSize) {
    var R = [];
    for (var i = 0; i < a.length; i += chunkSize) R.push(a.slice(i, i + chunkSize));
    return R;
  }

  hasLegacyCodes(keymap) {
    for (const layer of keymap) {
      for (const key of layer) {
        if (key.legacy) return true;
      }
    }
    return false;
  }

  migrateLegacyCodes(keymap) {
    const newKeymap = [];
    for (const layer of keymap) {
      const newLayer = [];
      for (let key of layer) {
        if (key.legacy) {
          key = db.lookup(key.code);
        }
        newLayer.push(key);
      }
      newKeymap.push(newLayer);
    }
    return newKeymap;
  }

  async focus(s, keymap) {
    if (keymap && keymap.custom && keymap.custom.length > 0) {
      const flatten = (arr) => {
        return [].concat(...arr);
      };

      const args = flatten(keymap.custom).map((k) => db.serialize(k));

      await s.request("keymap.onlyCustom", keymap.onlyCustom ? "1" : "0");
      return await s.request("keymap.custom", ...args);
    } else {
      let defaults, custom, onlyCustom;

      if (!this.unsupportedFirmware) {
        defaults = await s.request("keymap.default");
        custom = await s.request("keymap.custom");
        onlyCustom = Boolean(parseInt(await s.request("keymap.onlyCustom")));
      }

      if (!defaults && !custom) {
        onlyCustom = false;
        this.unsupportedFirmware = true;
      } else if (!custom) {
        custom = defaults;
      }
      const defaultKeymap = defaults
        ?.split(" ")
        .filter((v) => v.length > 0)
        .map((k) => db.lookup(parseInt(k)));
      const customKeymap = custom
        ?.split(" ")
        .filter((v) => v.length > 0)
        .map((k) => db.lookup(parseInt(k)));

      if (customKeymap.length == 0) {
        onlyCustom = false;
      }

      return {
        onlyCustom: onlyCustom,
        unsupportedFirmware: this.unsupportedFirmware,
        custom: this._chunk(customKeymap, this._layerSize),
        default: this._chunk(defaultKeymap, this._layerSize),
      };
    }
  }
}

class OnlyCustom {
  async focus(s, onlyCustom) {
    if (onlyCustom === undefined) {
      return Boolean(parseInt(await s.request("keymap.onlyCustom")));
    }

    return await s.request("keymap.onlyCustom", onlyCustom ? "1" : "0");
  }
}

export { OnlyCustom, Keymap as default };
