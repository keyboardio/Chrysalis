// -*- mode: js-jsx -*-
/* chrysalis-bundle-keyboardio -- Chrysalis Bundle for Keyboard.io
 * Copyright (C) 2018  Keyboardio, Inc.
 *
 * This program is free software: you can redistribute it and/or modify it under
 * the terms of the GNU General Public License as published by the Free Software
 * Foundation, version 3.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

import BlankTable from "./keys/blanks.js";
import LetterTable, { ModifiedLetterTables } from "./keys/letters.js";
import DigitTable, { ModifiedDigitTables } from "./keys/digits.js";
import { LockLayerTable, ShiftToLayerTable } from "./keys/layerswitch.js";
import PunctuationTable, {
  ModifiedPunctuationTables
} from "./keys/punctuation.js";
import SpacingTable, { ModifiedSpacingTables } from "./keys/spacing.js";
import ModifiersTable from "./keys/modifiers.js";
import NavigationTable from "./keys/navigation.js";
import LEDEffectsTable from "./keys/ledeffects.js";
import MacrosTable from "./keys/macros.js";
import NumpadTable from "./keys/numpad.js";
import FunctionKeyTable from "./keys/fxs.js";

import MediaControlTable from "./keys/mediacontrols.js";
import {
  MouseMovementTable,
  MouseWheelTable,
  MouseButtonTable,
  MouseWarpTable
} from "./keys/mousecontrols.js";
import MiscellaneousTable from "./keys/miscellaneous.js";

import { OneShotModifierTable, OneShotLayerTable } from "./keys/oneshot.js";
import TapDanceTable from "./keys/tapdance.js";
import LeaderTable from "./keys/leader.js";
import StenoTable from "./keys/steno.js";

const keyCodeTable = [
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

  BlankTable
]
  .concat(ModifiedLetterTables)
  .concat(ModifiedDigitTables)
  .concat(ModifiedPunctuationTables)
  .concat(ModifiedSpacingTables);

class DisplayTransformer {
  constructor() {
    this.keymapCodeTable = [];

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
      extraLabel: key.labels.top
    };
  }

  serialize(key) {
    return key.keyCode;
  }
}

export { DisplayTransformer as default, keyCodeTable };
