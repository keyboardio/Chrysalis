/* chrysalis-keymap -- Chrysalis keymap library
 * Copyright (C) 2018-2021  Keyboardio, Inc.
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

import Focus from "../focus";

import KeymapDB from "./db";

global.chrysalis_keymap_instance = null;

class Keymap {
  constructor(opts) {
    if (!global.chrysalis_keymap_instance) {
      global.chrysalis_keymap_instance = this;
      this.db = new KeymapDB();
      this.legacyInterface = false;
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
    for (var i = 0; i < a.length; i += chunkSize)
      R.push(a.slice(i, i + chunkSize));
    return R;
  }

  hasLegacyCodes(keymap) {
    for (let layer of keymap) {
      for (let key of layer) {
        if (this.db.lookupLegacy(key.code)) return true;
      }
    }
    return false;
  }

  migrateLegacyCodes(keymap) {
    let newKeymap = [];
    for (let layer of keymap) {
      let newLayer = [];
      for (let key of layer) {
        const legacyKey = this.db.lookupLegacy(key.code);
        if (legacyKey) {
          key = this.db.lookup(legacyKey.code);
        }
        newLayer.push(key);
      }
      newKeymap.push(newLayer);
    }
    return newKeymap;
  }

  async focus(s, keymap) {
    if (keymap && keymap.custom && keymap.custom.length > 0) {
      const flatten = arr => {
        return [].concat(...arr);
      };

      if (this.legacyInterface) {
        const args = flatten(keymap.default.concat(keymap.custom)).map(k =>
          this.db.serialize(k)
        );

        return await s.request("keymap.map", ...args);
      }

      const args = flatten(keymap.custom).map(k => this.db.serialize(k));

      await s.request("keymap.onlyCustom", keymap.onlyCustom ? "1" : "0");
      return await s.request("keymap.custom", ...args);
    } else {
      let defaults, custom, onlyCustom;

      if (!this.legacyInterface) {
        defaults = await s.request("keymap.default");
        custom = await s.request("keymap.custom");
        onlyCustom = Boolean(parseInt(await s.request("keymap.onlyCustom")));
      }

      if (!defaults && !custom) {
        const keymap = (await s.request("keymap.map"))
          .split(" ")
          .filter(v => v.length > 0);
        const roLayers = parseInt((await s.request("keymap.roLayers")) || "0");

        defaults = keymap.slice(0, this._layerSize * roLayers).join(" ");
        custom = keymap
          .slice(this._layerSize * roLayers, keymap.length)
          .join(" ");

        onlyCustom = false;
        this.legacyInterface = true;
      }
      const defaultKeymap = defaults
        .split(" ")
        .filter(v => v.length > 0)
        .map(k => this.db.lookup(parseInt(k)));
      const customKeymap = custom
        .split(" ")
        .filter(v => v.length > 0)
        .map(k => this.db.lookup(parseInt(k)));

      if (customKeymap.length == 0) {
        onlyCustom = false;
      }

      return {
        onlyCustom: onlyCustom,
        custom: this._chunk(customKeymap, this._layerSize),
        default: this._chunk(defaultKeymap, this._layerSize)
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

let focus = new Focus();
focus.addCommands({
  keymap: new Keymap(),
  "keymap.onlyCustom": new OnlyCustom()
});
focus.addMethod("setLayerSize", "keymap");

export { Keymap as default };
