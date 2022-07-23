/* Chrysalis -- Kaleidoscope Command Center
 * Copyright (C) 2022  Keyboardio, Inc.
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

global.chrysalis_layernames_instance = null;

export default class LayerNames {
  constructor(opts) {
    if (!global.chrysalis_layernames_instance) {
      global.chrysalis_layernames_instance = this;
    }

    return global.chrysalis_layernames_instance;
  }

  async _pull(s) {
    const data = (await s.request("keymap.layerNames"))
      .split(/\n/)
      .map((x) => x.split(/^(\d+) /).slice(1));

    const storageSize = data.pop()[1].split(/=/).pop();
    return {
      storageSize: parseInt(storageSize),
      names: data.map((x) => x[1]),
    };
  }

  async _push(s, data) {
    const serialized =
      data.names.flatMap((n) => [n.length, n]).join(" ") + " 0";
    await s.request("keymap.layerNames", serialized);
  }

  async focus(s, data) {
    if (!data) {
      return this._pull(s);
    }

    return this._push(s, data);
  }
}
