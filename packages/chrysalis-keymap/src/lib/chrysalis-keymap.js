/* chrysalis-keymap -- Chrysalis keymap library
 * Copyright (C) 2018  Keyboardio, Inc.
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

import KeymapDB from "./db"

export default class Keymap {
    constructor(opts) {
        this.setLayerSize(opts)
        this.db = new KeymapDB()
    }

    setLayerSize(opts) {
        if (!opts || opts == undefined)
            return

        if (typeof opts == "number") {
            this._layerSize = opts
        } else if (typeof opts == "object") {
            this._layerSize = opts.keyboard.rows * opts.keyboard.columns
        }

        return this
    }

    _chunk(a, chunkSize) {
        var R = []
        for (var i = 0; i < a.length; i += chunkSize)
            R.push(a.slice(i, i + chunkSize))
        return R
    }

    async focus(s, keymap) {
        if (keymap && keymap.length > 0) {
            let flatten = (arr) => {
                    return [].concat(...arr)
                },
                args = flatten(keymap)
                    .map(k => this.db.serialize(k))

            return await s.request("keymap.map", ...args)
        } else {
            let data = await s.request("keymap.map")
            let keymap = data
                .split(" ")
                .filter(v => v.length > 0)
                .map(k => this.db.parse(parseInt(k)))
            return this._chunk(keymap, this._layerSize)
        }
    }
}
