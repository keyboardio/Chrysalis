/* chrysalis-keymap -- Chrysalis keymap library
 * Copyright (C) 2018  Gergely Nagy
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

export default class Keymap {
    constructor(layerSize) {
        this._layerSize = layerSize
        this._keyTransformers = [{
            parse: parseInt,
            serialize: function (k) {
                return k.toString()
            }
        }]
    }

    _chunk(a, chunkSize) {
        var R = []
        for (var i = 0; i < a.length; i += chunkSize)
            R.push(a.slice(i, i + chunkSize))
        return R
    }

    addKeyTransformers(transformers) {
        this._keyTransformers = this._keyTransformers.concat(transformers)
    }

    _parseKey(k) {
        return this._keyTransformers.reduce((value, transformer) => {
            return transformer.parse(value)
        }, k)
    }

    focus(s) {
        return new Promise((resolve) => {
            s.request("keymap.map").then((data) => {
                let keymap = data.split(" ").filter(v => v.length > 0).map(k => this._parseKey(k))
                resolve(this._chunk(keymap, this._layerSize))
            })
        })
    }
}
