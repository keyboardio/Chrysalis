/* chrysalis-keymap -- Chrysalis keymap library
 * Copyright (C) 2019  DygmaLab SE
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
import settings from "electron-settings";
import BlankTable from "./db/blanks"
import LetterTable, { ModifiedLetterTables } from "./db/letters"
import DigitTable, { ModifiedDigitTables } from "./db/digits"
import { LockLayerTable, ShiftToLayerTable } from "./db/layerswitch"
import PunctuationTable, {
    ModifiedPunctuationTables
} from "./db/punctuation"
import SpacingTable, { ModifiedSpacingTables } from "./db/spacing"
import ModifiersTable, {
    ModifiedModifiersTables,
    HyperMehTable
} from "./db/modifiers"
import NavigationTable, {
    ModifiedNavigationTables
} from "./db/navigation"
import LEDEffectsTable from "./db/ledeffects"
import NumpadTable, {
    ModifiedNumpadTables
} from "./db/numpad"
import FunctionKeyTable, {
    ModifiedFunctionKeyTables
} from "./db/fxs"

import MediaControlTable from "./db/mediacontrols"
import {
    MouseMovementTable,
    MouseWheelTable,
    MouseButtonTable,
    MouseWarpTable
} from "./db/mousecontrols"
import MiscellaneousTable from "./db/miscellaneous"

import { OneShotModifierTable, OneShotLayerTable } from "./db/oneshot"
import { DualUseModifierTables, DualUseLayerTables } from "./db/dualuse"
import LeaderTable from "./db/leader"
import StenoTable from "./db/steno"
import SpaceCadetTable from "./db/spacecadet"

// Spanish - is an Array of objects of values that have to be modified
import spanish from "./languages/spanish/spanish";

// German - is an Array of objects of values that have to be modified
import german, {deutschModifiedTables} from "./languages/deutsch/deutsch";

// French - is an Array of objects of values that have to be modified
import french, {frenchModifiedTables} from "./languages/french/french";

// Nordic - is an Array of objects of values that have to be modified
import nordic, {nordicModifiedTables} from "./languages/nordic/nordic";

// Japanese - is an Array of objects of values that have to be modified
import japanese, {japaneseModifiedTables} from "./languages/japanese/japanese";

// newLanguageLayout - is a function that modify language layout
import newLanguageLayout from "./languages/newLanguageLayout";

const defaultBaseKeyCodeTable = [
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
    MediaControlTable,
    MouseMovementTable,
    MouseButtonTable,
    MouseWheelTable,
    MouseWarpTable,

    OneShotModifierTable,
    OneShotLayerTable,
    LeaderTable,
    StenoTable,
    SpaceCadetTable,

    BlankTable
]

const supportModifiedTables = {
    german: deutschModifiedTables,
    french: frenchModifiedTables,
    nordic: nordicModifiedTables,
    japanese: japaneseModifiedTables
}

const defaultKeyCodeTable = defaultBaseKeyCodeTable
    .concat(ModifiedLetterTables)
    .concat(ModifiedDigitTables)
    .concat(ModifiedPunctuationTables)
    .concat(ModifiedSpacingTables)
    .concat(ModifiedNavigationTables)
    .concat(ModifiedModifiersTables)
    .concat(HyperMehTable)
    .concat(ModifiedFunctionKeyTables)
    .concat(ModifiedNumpadTables)
    .concat(DualUseModifierTables)
    .concat(DualUseLayerTables)

// DataBase of languages
const languagesDB = {
    english: "english",
    spanish,
    german,
    french,
    nordic,
    japanese
};
// Create cache for language layout
const map = new Map();

let baseKeyCodeTable, keyCodeTable;

class KeymapDB {
    constructor() {
        this.keymapCodeTable = []
        //create variable that get language from the local storage
        this.language = settings.get("keyboard.language");

        //Modify our baseKeyCodeTable, depending on the language selected by the static methods and by inside function newLanguageLayout
        baseKeyCodeTable = KeymapDB.updateBaseKeyCode();
        const keyCodeTableWithModifiers = this.language !== "english" && supportModifiedTables[this.language]
            ? defaultKeyCodeTable.concat(supportModifiedTables[this.language])
            : defaultKeyCodeTable;
        //Modify our baseKeyCodeTable, depending on the language selected through function newLanguageLayout
        keyCodeTable = baseKeyCodeTable.concat(newLanguageLayout(
            keyCodeTableWithModifiers.slice(defaultBaseKeyCodeTable.length),
            this.language,
            languagesDB[this.language]
        ));

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
            extraLabel: key.labels.top,
            verbose: key.labels.verbose
        }
    }

    serialize(key) {
        return key.keyCode
    }

    static updateBaseKeyCode() {
        this.language = settings.get("keyboard.language") || "english";
        //Checking language in the cache
        if(map.has(this.language)){
           //Return language layout from the cache
            return map.get(this.language);
        } else {
            //Creating language layout and add it into cache
            const newBase = newLanguageLayout(
                defaultBaseKeyCodeTable,
                this.language,
                languagesDB[this.language]
            );
            map.set(this.language, newBase);
            //Return new language layout
            return newBase;
        }

    }
}

export { KeymapDB as default, baseKeyCodeTable, keyCodeTable, languagesDB }
