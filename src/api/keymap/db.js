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
import BlankTable from "./db/blanks";
import LetterTable, { ModifiedLetterTables } from "./db/letters";
import DigitTable, { ModifiedDigitTables } from "./db/digits";
import { LockLayerTable, ShiftToLayerTable, MoveToLayerTable } from "./db/layerswitch";
import PunctuationTable, { ModifiedPunctuationTables } from "./db/punctuation";
import SpacingTable, { ModifiedSpacingTables } from "./db/spacing";
import ModifiersTable, { ModifiedModifiersTables, HyperMehTable } from "./db/modifiers";
import NavigationTable, { ModifiedNavigationTables } from "./db/navigation";
import LEDEffectsTable from "./db/ledeffects";
import MacrosTable from "./db/macros";
import SuperKeyTable from "./db/superkeys";
import TapDanceTable from "./db/tapdance";
import NumpadTable, { ModifiedNumpadTables } from "./db/numpad";
import FunctionKeyTable, { ModifiedFunctionKeyTables } from "./db/fxs";

import MediaControlTable from "./db/mediacontrols";
import { MouseMovementTable, MouseWheelTable, MouseButtonTable } from "./db/mousecontrols";
import MiscellaneousTable, { ModifiedMiscellaneousTables } from "./db/miscellaneous";

import { OneShotModifierTable, OneShotLayerTable } from "./db/oneshot";
import { DualUseModifierTables, DualUseLayerTables } from "./db/dualuse";
import LeaderTable from "./db/leader";
import StenoTable from "./db/steno";
import SpaceCadetTable from "./db/spacecadet";

// Spanish - is an Array of objects of values that have to be modified
import spanish, { spanishModifiedTables } from "./languages/spanish/spanish";

// German - is an Array of objects of values that have to be modified
import german, { germanModifiedTables } from "./languages/german/german";

// French - is an Array of objects of values that have to be modified
import french, { frenchModifiedTables } from "./languages/french/french";

// Norwegian - is an Array of objects of values that have to be modified
import norwegian, { norwegianModifiedTables } from "./languages/norwegian/norwegian";

// Swedish - is an Array of objects of values that have to be modified
import swedish, { swedishModifiedTables } from "./languages/swedish/swedish";

// Danish - is an Array of objects of values that have to be modified
import danish, { danishModifiedTables } from "./languages/danish/danish";

// Icelandic - is an Array of objects of values that have to be modified
import icelandic, { icelandicModifiedTables } from "./languages/icelandic/icelandic";

// Japanese - is an Array of objects of values that have to be modified
import japanese, { japaneseModifiedTables } from "./languages/japanese/japanese";

// Swiss German - is an Array of objects of values that have to be modified
import swissGerman, { swissGermanModifiedTables } from "./languages/swissGerman/swissGerman";

// newLanguageLayout - is a function that modify language layout
import newLanguageLayout from "./languages/newLanguageLayout";

const Store = require("electron-store");
const store = new Store();

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
  spanish: spanishModifiedTables,
  german: germanModifiedTables,
  french: frenchModifiedTables,
  norwegian: norwegianModifiedTables,
  swedish: swedishModifiedTables,
  danish: danishModifiedTables,
  icelandic: icelandicModifiedTables,
  japanese: japaneseModifiedTables,
  swissGerman: swissGermanModifiedTables
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
  norwegian,
  swedish,
  danish,
  icelandic,
  japanese,
  swissGerman
};
// Create cache for language layout
const map = new Map();

let baseKeyCodeTable, keyCodeTable;

class KeymapDB {
  constructor() {
    this.keymapCodeTable = [];
    //create variable that get language from the local storage
    this.language = store.get("settings.language");
    if (this.language == "finnish") {
      this.language = "swedish";
    }
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

  parseModifs(keycode) {
    let modified = 0;
    if (keycode & 0b100000000) {
      // Ctrl Decoder
      modified += 256;
    }
    if (keycode & 0b1000000000) {
      // Alt Decoder
      modified += 512;
    }
    if (keycode & 0b10000000000) {
      // AltGr Decoder
      modified += 1024;
    }
    if (keycode & 0b100000000000) {
      // Shift Decoder
      modified += 2048;
    }
    if (keycode & 0b1000000000000) {
      // Win Decoder
      modified += 4096;
    }
    if (keycode > 49152) {
      if (keycode < 51218) {
        return modified + 49169;
      }
      return modified + 49169 + 1;
    }
    return modified;
  }

  keySegmentator(keyCode) {
    let code = { base: 0, modified: 0 };
    const modified = this.parseModifs(keyCode);
    switch (true) {
      case keyCode < 256:
      case BlankTable.keys.map(r => r.code).includes(keyCode):
      case MediaControlTable.keys.map(r => r.code).includes(keyCode):
      case MouseMovementTable.keys.map(r => r.code).includes(keyCode):
      case MouseWheelTable.keys.map(r => r.code).includes(keyCode):
      case MouseButtonTable.keys.map(r => r.code).includes(keyCode):
        // Regular keys KeyCode
        code = { base: keyCode, modified: 0 };
        break;
      case keyCode < 8192:
        // Reguar key with Modifier KeyCode
        code = { base: keyCode - modified, modified: modified };
        break;
      case keyCode < 17152:
        // Yet to review
        code = { base: keyCode, modified: 0 };
        break;
      case LEDEffectsTable.keys.map(r => r.code).includes(keyCode):
        // LED effect keys
        code = { base: keyCode, modified: 0 };
        break;
      case ShiftToLayerTable.keys.map(r => r.code).includes(keyCode):
        // Layer switch keys
        code = { base: keyCode - 17450, modified: 17450 };
        break;
      case LockLayerTable.keys.map(r => r.code).includes(keyCode):
        // Layer Move not used keys
        code = { base: keyCode - 17408, modified: 17408 };
        break;
      case MoveToLayerTable.keys.map(r => r.code).includes(keyCode):
        // Layer Lock keys
        code = { base: keyCode - 17492, modified: 17492 };
        break;
      case OneShotModifierTable.keys.map(r => r.code).includes(keyCode):
      case OneShotLayerTable.keys.map(r => r.code).includes(keyCode):
      case keyCode < 49169:
        // Yet to review
        code = { base: 0, modified: keyCode };
        break;
      case keyCode < 53266:
        // Dual Function Keycode
        code = { base: keyCode - modified, modified: modified };
        break;
      case TapDanceTable.keys.map(r => r.code).includes(keyCode):
      case LeaderTable.keys.map(r => r.code).includes(keyCode):
      case StenoTable.keys.map(r => r.code).includes(keyCode):
      case SpaceCadetTable.keys.map(r => r.code).includes(keyCode):
        // Multiple special keys
        code = { base: 0, modified: keyCode };
        break;
      case MacrosTable.keys.map(r => r.code).includes(keyCode):
        // Macros keys
        code = { base: keyCode - 53852, modified: 53852 };
        break;
      case SuperKeyTable.keys.map(r => r.code).includes(keyCode):
        // Superkeys keys
        code = { base: keyCode - 53980, modified: 53980 };
        break;
      default:
        code = { base: keyCode, modified: 0 };
        break;
    }
    return code;
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
    const answ = this.keymapCodeTable.filter(Boolean).find(x => x.labels.primary === label);
    return answ !== undefined ? answ.code : 1;
  }

  reverseSub(label, top) {
    const answ = this.keymapCodeTable.filter(Boolean).find(x => x.labels.primary === label && x.labels.top === top);
    return answ !== undefined ? answ.code : 1;
  }

  getMap() {
    return this.keymapCodeTable.filter(Boolean).filter(x => x.code < 255 && x.code > 0);
  }

  serialize(key) {
    return key.keyCode;
  }

  static updateBaseKeyCode() {
    this.language = store.get("settings.language") || "english";
    if (this.language == "finnish") {
      this.language = "swedish";
    }
    //Checking language in the cache
    if (map.has(this.language)) {
      //Return language layout from the cache
      return map.get(this.language);
    } else {
      //Creating language layout and add it into cache
      const newBase = newLanguageLayout(defaultBaseKeyCodeTable, this.language, languagesDB[this.language]);
      map.set(this.language, newBase);
      //Return new language layout
      return newBase;
    }
  }
}

export { KeymapDB as default, baseKeyCodeTable, keyCodeTable, languagesDB };
