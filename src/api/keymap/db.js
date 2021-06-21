/* bazecor-keymap -- Bazecor keymap library
 * Copyright (C) 2018, 2019  Keyboardio, Inc.
 * Copyright (C) 2019, 2020  DygmaLab SE
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
import BlankTable from "./db/blanks";
import LetterTable, { ModifiedLetterTables } from "./db/letters";
import DigitTable, { ModifiedDigitTables } from "./db/digits";
import {
  LockLayerTable,
  ShiftToLayerTable,
  MoveToLayerTable
} from "./db/layerswitch";
import PunctuationTable, { ModifiedPunctuationTables } from "./db/punctuation";
import SpacingTable, { ModifiedSpacingTables } from "./db/spacing";
import ModifiersTable, {
  ModifiedModifiersTables,
  HyperMehTable
} from "./db/modifiers";
import NavigationTable, { ModifiedNavigationTables } from "./db/navigation";
import LEDEffectsTable from "./db/ledeffects";
import MacrosTable from "./db/macros";
import SuperKeyTable from "./db/superkeys";
import TapDanceTable from "./db/tapdance";
import NumpadTable, { ModifiedNumpadTables } from "./db/numpad";
import FunctionKeyTable, { ModifiedFunctionKeyTables } from "./db/fxs";

import MediaControlTable from "./db/mediacontrols";
import {
  MouseMovementTable,
  MouseWheelTable,
  MouseButtonTable
} from "./db/mousecontrols";
import MiscellaneousTable, {
  ModifiedMiscellaneousTables
} from "./db/miscellaneous";

import { OneShotModifierTable, OneShotLayerTable } from "./db/oneshot";
import { DualUseModifierTables, DualUseLayerTables } from "./db/dualuse";
import LeaderTable from "./db/leader";
import StenoTable from "./db/steno";
import SpaceCadetTable from "./db/spacecadet";

// Spanish - is an Array of objects of values that have to be modified
import spanish from "./languages/spanish/spanish";

// German - is an Array of objects of values that have to be modified
import german, { germanModifiedTables } from "./languages/german/german";

// French - is an Array of objects of values that have to be modified
import french, { frenchModifiedTables } from "./languages/french/french";

// Nordic - is an Array of objects of values that have to be modified
import nordic, { nordicModifiedTables } from "./languages/nordic/nordic";

// Japanese - is an Array of objects of values that have to be modified
import japanese, {
  japaneseModifiedTables
} from "./languages/japanese/japanese";

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
  MoveToLayerTable,

  LEDEffectsTable,
  MacrosTable,
  SuperKeyTable,
  TapDanceTable,
  MediaControlTable,
  MouseMovementTable,
  MouseButtonTable,
  MouseWheelTable,

  OneShotModifierTable,
  OneShotLayerTable,
  LeaderTable,
  StenoTable,
  SpaceCadetTable,

  BlankTable
];

const supportModifiedTables = {
  german: germanModifiedTables,
  french: frenchModifiedTables,
  nordic: nordicModifiedTables,
  japanese: japaneseModifiedTables
};

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
  .concat(ModifiedMiscellaneousTables)
  .concat(DualUseModifierTables)
  .concat(DualUseLayerTables);

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
    this.keymapCodeTable = [];
    //create variable that get language from the local storage
    this.language = settings.getSync("keyboard.language");

    //Modify our baseKeyCodeTable, depending on the language selected by the static methods and by inside function newLanguageLayout
    baseKeyCodeTable = KeymapDB.updateBaseKeyCode();
    const keyCodeTableWithModifiers =
      this.language !== "english" && supportModifiedTables[this.language]
        ? defaultKeyCodeTable.concat(supportModifiedTables[this.language])
        : defaultKeyCodeTable;
    //Modify our baseKeyCodeTable, depending on the language selected through function newLanguageLayout
    keyCodeTable = baseKeyCodeTable.concat(
      newLanguageLayout(
        keyCodeTableWithModifiers.slice(defaultBaseKeyCodeTable.length),
        this.language,
        languagesDB[this.language]
      )
    );
    this.allCodes = keyCodeTable;

    for (let group of keyCodeTable) {
      for (let key of group.keys) {
        let value;

        if (key.labels) {
          value = key;
        } else {
          value = {
            code: key.code,
            labels: {
              primary: "#" + key.code.toString()
            }
          };
        }

        this.keymapCodeTable[key.code] = value;
      }
    }
  }

  parse(keyCode) {
    let key;

    if (!keyCode) keyCode = 0;

    if (keyCode < this.keymapCodeTable.length) {
      key = this.keymapCodeTable[keyCode];
    }

    if (!key) {
      key = {
        code: keyCode,
        labels: {
          primary: "#" + keyCode.toString()
        }
      };
    }

    return {
      keyCode: key.code,
      label: key.labels.primary,
      extraLabel: key.labels.top,
      verbose: key.labels.verbose
    };
  }

  reverse(label) {
    const answ = this.keymapCodeTable
      .filter(Boolean)
      .find(x => x.labels.primary === label);
    return answ !== undefined ? answ.code : 1;
  }

  reverseSub(label, top) {
    const answ = this.keymapCodeTable
      .filter(Boolean)
      .find(x => x.labels.primary === label && x.labels.top === top);
    return answ !== undefined ? answ.code : 1;
  }

  getMap() {
    return this.keymapCodeTable
      .filter(Boolean)
      .filter(x => x.code < 255 && x.code > 0);
  }

  serialize(key) {
    return key.keyCode;
  }

  static updateBaseKeyCode() {
    this.language = settings.getSync("keyboard.language") || "english";
    //Checking language in the cache
    if (map.has(this.language)) {
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

export { KeymapDB as default, baseKeyCodeTable, keyCodeTable, languagesDB };
