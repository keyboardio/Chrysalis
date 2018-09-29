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
        ]
    }

    parse(keyCode) {
        let label = keyCode.toString()

        if (keyCode <= this.hid_code_map.length) {
            label = this.hid_code_map[keyCode]
        }
        if (keyCode == 65535) {
            label = "[Trns]"
        }

        return {keyCode: keyCode,
                label: label }
    }

    serialize(key) {
        return key.keyCode
    }
}

export default DisplayTransformer
