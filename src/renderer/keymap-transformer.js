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

class DisplayTransformer {
  constructor() {
    this.hid_code_map = [
      "",
      undefined,
      undefined,
      undefined,
      "A",
      "B",
      "C",
      "D",
      "E",
      "F",
      "G",
      "H",
      "I",
      "J",
      "K",
      "L",
      "M",
      "N",
      "O",
      "P",
      "Q",
      "R",
      "S",
      "T",
      "U",
      "V",
      "W",
      "X",
      "Y",
      "Z",
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "0",
      "Enter",
      "Esc",
      "BSpc",
      "Tab",
      "Space",
      "-",
      "=",
      "[",
      "]",
      "\\",
      "NonUsPound",
      ";",
      "'",
      "\`",
      ",",
      ".",
      "/",
      "CapsLock",
      "F1",
      "F2",
      "F3",
      "F4",
      "F5",
      "F6",
      "F7",
      "F8",
      "F9",
      "F10",
      "F11",
      "F12",
      "PrintScreen",
      "ScrlLK",
      "Pause",
      "Insert",
      "Home",
      "PgUp",
      "Del",
      "End",
      "PgDn",
      "→",
      "←",
      "↓",
      "↑",
      "KeypadNumLock",
      "KeypadDivide",
      "KeypadMultiply",
      "KeypadSubtract",
      "KeypadAdd",
      "KeypadEnter",
      "Keypad1",
      "Keypad2",
      "Keypad3",
      "Keypad4",
      "Keypad5",
      "Keypad6",
      "Keypad7",
      "Keypad8",
      "Keypad9",
      "Keypad0",
      "KeypadDot",
      "KeypadNonUsBackslashAndPipe",
      "PcApplication",
      "Power",
      "KeypadEquals",
      "F13",
      "F14",
      "F15",
      "F16",
      "F17",
      "F18",
      "F19",
      "F20",
      "F21",
      "F22",
      "F23",
      "F24",
      "Execute",
      "Help",
      "Menu",
      "Select",
      "Stop",
      "Again",
      "Undo",
      "Cut",
      "Copy",
      "Paste",
      "Find",
      "Mute",
      "VolumeUp",
      "VolumeDown",
      "LockingCapsLock",
      "LockingNumLock",
      "LockingScrollLock",
      "KeypadComma",
      "KeypadEqualSign",
      "International1",
      "International2",
      "International3",
      "International4",
      "International5",
      "International6",
      "International7",
      "International8",
      "International9",
      "Lang1",
      "Lang2",
      "Lang3",
      "Lang4",
      "Lang5",
      "Lang6",
      "Lang7",
      "Lang8",
      "Lang9",
      "AlternateErase",
      "Sysreq",
      "Cancel",
      "Clear",
      "Prior",
      "Return",
      "Separator",
      "Out",
      "Oper",
      "ClearSlashAgain",
      "CrselSlashProps",
      "Exsel",
      undefined, // 0xA5
      undefined, // 0xA6
      undefined, // 0xA7
      undefined, // 0xA8
      undefined, // 0xA9
      undefined, // 0xAA
      undefined, // 0xAB
      undefined, // 0xAC
      undefined, // 0xAD
      undefined, // 0xAE
      undefined, // 0xAF
      "Keypad00",
      "Keypad000",
      "KeypadThousandsSeparator",
      "DecimalSeparator",
      "CurrencyUnit",
      "CurrencySubunit",
      "KeypadLeftParen",
      "KeypadRightParen",
      "KeypadLeftCurlyBrace",
      "KeypadRightCurlyBrace",
      "KeypadTab",
      "KeypadBackspace",
      "KeypadA",
      "KeypadB",
      "KeypadC",
      "KeypadD",
      "KeypadE",
      "KeypadF",
      "KeypadXor",
      "KeypadCarat",
      "KeypadPercent",
      "KeypadLessThan",
      "KeypadGreaterThan",
      "KeypadAmpersand",
      "KeypadDoubleampersand",
      "KeypadPipe",
      "KeypadDoublepipe",
      "KeypadColon",
      "KeypadPoundSign",
      "KeypadSpace",
      "KeypadAtSign",
      "KeypadExclamationPoint",
      "KeypadMemoryStore",
      "KeypadMemoryRecall",
      "KeypadMemoryClear",
      "KeypadMemoryAdd",
      "KeypadMemorySubtract",
      "KeypadMemoryMultiply",
      "KeypadMemoryDivide",
      "KeypadPlusSlashMinus",
      "KeypadClear",
      "KeypadClearEntry",
      "KeypadBinary",
      "KeypadOctal",
      "KeypadDecimal",
      "KeypadHexadecimal",
      undefined, // 0xDE
      undefined, // 0xDF
      "LCtrl",
      "LShift",
      "LAlt",
      "LGui",
      "RCtrl",
      "RShift",
      "RAlt",
      "RGui"
    ];
  }

  parse(keyCode) {
    let label = keyCode.toString(),
      extraLabel = null;

    if (keyCode <= this.hid_code_map.length) {
      label = this.hid_code_map[keyCode];
    } else if (keyCode == 65535) {
      label = "[Trns]";
    } else if (keyCode & 0b1000000000000000) {
      // Reserved keys

      label = "SPEC";

      if (keyCode >= 0xc001 && keyCode <= 0xc008) {
        // OSM
        let modifier = keyCode - 0xc000 + this.hid_code_map.indexOf("LCtrl");
        label = this.hid_code_map[modifier];
        extraLabel = "OneShot";
      }
      if (keyCode >= 0xc009 && keyCode <= 0xc010) {
        // OSL
        label = "L#" + (keyCode - 0xc009).toString();
        extraLabel = "OneShot";
      }
      if (keyCode >= 0xc011 && keyCode <= 0xc811) {
        // TODO: DUM
        extraLabel = "DualUse";
        label = "??";
      }
      if (keyCode >= 0xc812 && keyCode <= 0xd012) {
        // TODO: DUL
        extraLabel = "DualUse";
        label = "??";
      }
      if (keyCode >= 0xd013 && keyCode <= 0xd022) {
        // TD
        extraLabel = "TD";
        label = "(" + (keyCode - 0xd013).toString() + ")";
      }
      if (keyCode >= 0xd023 && keyCode <= 0xd02a) {
        // LEAD
        extraLabel = "Leader";
        label = "(" + (keyCode - 0xd023).toString() + ")";
      }
      if (keyCode == 0xd02b) {
        // CYCLE
        label = "CYCLE";
      }
      if (keyCode == 0xd02c) {
        // Syster
        label = "SYSTER";
      }
      if (keyCode >= 0xd02d && keyCode <= 0xd12c) {
        // Topsy
        extraLabel = "Topsy";
        let topsyKeyCode = keyCode - 0xd02d;
        label = this.hid_code_map[topsyKeyCode];
      }
      if (keyCode >= 0xd12d && keyCode <= 0xd157) {
        // TODO: Steno
        extraLabel = "Steno";
        label = "??";
      }
      if (keyCode >= 0xd158 && keyCode <= 0xd159) {
        // TODO: SpaceCadet
        extraLabel = "SC";
        label = "??";
      }
    } else {
      // Core keys
      let key = keyCode % 256,
        flags = (keyCode - key) / 256;

      extraLabel = flags.toString();
      label = key.toString();

      if (flags & 0b01000000) {
        // Synthetic
      } else if (flags & 0b00100000) {
        // Macros
      } else {
        // Held keys
        extraLabel = "";

        let hold = mod => {
          if (extraLabel) {
            extraLabel += "+" + mod;
          } else {
            extraLabel = mod;
          }
        };

        if (flags & 0b00000001) {
          hold("Ctrl");
        }
        if (flags & 0b00000010) {
          hold("Alt");
        }
        if (flags & 0b00000100) {
          hold("AltGr");
        }
        if (flags & 0b00001000) {
          hold("Shift");
        }
        if (flags & 0b00010000) {
          hold("GUI");
        }

        label = this.hid_code_map[key];
      }
    }

    return {
      keyCode: keyCode,
      label: label,
      extraLabel: extraLabel
    };
  }

  serialize(key) {
    return key.keyCode;
  }
}

export default DisplayTransformer;
