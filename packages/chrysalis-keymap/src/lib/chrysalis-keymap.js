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

import Focus from "@chrysalis-api/focus"

import KeymapDB from "./db"

let instance = null

class Keymap {
    constructor(opts) {
        if (!instance) {
            instance = this
            this.db = new KeymapDB()
        }
        instance.setLayerSize(opts)

        return instance
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
        if (keymap && keymap.custom && keymap.custom.length > 0) {
            const flatten = (arr) => {
                return [].concat(...arr)
            }
            const args = flatten(keymap.custom)
                .map(k => this.db.serialize(k))

            await s.request("keymap.onlyCustom", keymap.onlyCustom ? "1" : "0")
            return await s.request("keymap.custom", ...args)
        } else {
            const defaults = await s.request("keymap.default")
            const custom = await s.request("keymap.custom")
            const onlyCustom = Boolean(parseInt(await s.request("keymap.onlyCustom")))

            const defaultKeymap = defaults
                .split(" ")
                .filter(v => v.length > 0)
                .map(k => this.db.parse(parseInt(k)))
            const customKeymap = custom
                .split(" ")
                .filter(v => v.length > 0)
                .map(k => this.db.parse(parseInt(k)))

            return {
                onlyCustom: onlyCustom,
                custom: this._chunk(customKeymap, this._layerSize),
                default: this._chunk(defaultKeymap, this._layerSize)
            }
        }
    }
}

class OnlyCustom {
    async focus (s, onlyCustom) {
        if (onlyCustom === undefined) {
            return Boolean(parseInt(await s.request("keymap.onlyCustom")))
        }

        return await s.request("keymap.onlyCustom", onlyCustom ? "1" : "0")
    }
}

let focus = new Focus()
focus.addCommands({
    keymap: new Keymap(),
    "keymap.onlyCustom": new OnlyCustom()
})
focus.addMethod("setLayerSize", "keymap")

export { Keymap as default }
