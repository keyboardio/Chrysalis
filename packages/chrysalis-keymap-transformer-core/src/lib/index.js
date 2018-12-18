/* chrysalis-keymap-transformer-core -- Chrysalis keymap transformer library
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

import BlankTable from "./keys/blanks"
import LetterTable, { ModifiedLetterTables } from "./keys/letters"
import DigitTable, { ModifiedDigitTables } from "./keys/digits"
import { LockLayerTable, ShiftToLayerTable } from "./keys/layerswitch"
import PunctuationTable, {
    ModifiedPunctuationTables
} from "./keys/punctuation"
import SpacingTable, { ModifiedSpacingTables } from "./keys/spacing"
import ModifiersTable from "./keys/modifiers"
import NavigationTable from "./keys/navigation"
import LEDEffectsTable from "./keys/ledeffects"
import MacrosTable from "./keys/macros"
import NumpadTable from "./keys/numpad"
import FunctionKeyTable from "./keys/fxs"

import MediaControlTable from "./keys/mediacontrols"
import {
    MouseMovementTable,
    MouseWheelTable,
    MouseButtonTable,
    MouseWarpTable
} from "./keys/mousecontrols"
import MiscellaneousTable from "./keys/miscellaneous"

import { OneShotModifierTable, OneShotLayerTable } from "./keys/oneshot"
import TapDanceTable from "./keys/tapdance"
import LeaderTable from "./keys/leader"
import StenoTable from "./keys/steno"
import SpaceCadetTable from "./keys/spacecadet"

const baseKeyCodeTable = [
    LetterTable,
    DigitTable,
    PunctuationTable,
    SpacingTable,
    ModifiersTable,
    NavigationTable,
    FunctionKeyTable,
    NumpadTable,
    MiscellaneousTable,

    ShiftToLayerTable,
    LockLayerTable,

    LEDEffectsTable,
    MacrosTable,
    MediaControlTable,
    MouseMovementTable,
    MouseButtonTable,
    MouseWheelTable,
    MouseWarpTable,

    OneShotModifierTable,
    OneShotLayerTable,
    TapDanceTable,
    LeaderTable,
    StenoTable,
    SpaceCadetTable,

    BlankTable
]
const keyCodeTable = baseKeyCodeTable
    .concat(ModifiedLetterTables)
    .concat(ModifiedDigitTables)
    .concat(ModifiedPunctuationTables)
    .concat(ModifiedSpacingTables)

class CoreTransformer {
    constructor() {
        this.keymapCodeTable = []

        for (let group of keyCodeTable) {
            for (let key of group.keys) {
                let value

                if (key.labels) {
                    value = key
                } else {
                    value = {
                        code: key.code,
                        labels: {
                            primary: "#" + key.code.toString()
                        }
                    }
                }

                this.keymapCodeTable[key.code] = value
            }
        }
    }

    parse(keyCode) {
        let key

        if (!keyCode) keyCode = 0

        if (keyCode < this.keymapCodeTable.length) {
            key = this.keymapCodeTable[keyCode]
        }

        if (!key) {
            key = {
                code: keyCode,
                labels: {
                    primary: "#" + keyCode.toString()
                }
            }
        }

        return {
            keyCode: key.code,
            label: key.labels.primary,
            extraLabel: key.labels.top
        }
    }

    serialize(key) {
        return key.keyCode
    }
}

export { CoreTransformer as default, baseKeyCodeTable, keyCodeTable }
