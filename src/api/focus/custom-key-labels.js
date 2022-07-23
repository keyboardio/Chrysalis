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

global.chrysalis_custom_key_labels_instance = null;

export default class CustomKeyLabels {
  constructor(opts) {
    if (!global.chrysalis_custom_key_labels_instance) {
      global.chrysalis_custom_key_labels_instance = this;
    }

    return global.chrysalis_custom_key_labels_instance;
  }

  async _pull(s) {
    const data = await s.request("keymap.labels");
    if (!data) return { storageSize: 0, labels: [] };

    const labelMap = data
      .split(/\n/)
      .map((x) => x.split(/^(\d+) (\d+) /).slice(1));
    const storageSize = labelMap.pop()[2].split(/=/).pop();

    return {
      storageSize: storageSize,
      labels: labelMap.map(([_, code, label]) => {
        let l;
        try {
          l = JSON.parse(label);
        } catch (e) {
          console.log("error parsing:", label);
        }
        return {
          code: code,
          label: l,
        };
      }),
    };
  }

  async _push(s, data) {
    /*
    const serialized =
      data.names.flatMap((n) => [n.length, n]).join(" ") + " 0";
    await s.request("keymap.layerNames", serialized);
    */
  }

  async focus(s, data) {
    if (!data) {
      return this._pull(s);
    }

    return this._push(s, data);
  }
}
