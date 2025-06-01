/* Chrysalis -- Kaleidoscope Command Center
 * Copyright (C) 2020-2022  Keyboardio, Inc.
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

import { constants } from "./constants";
import { GuiLabel } from "./gui";
import { withModifiers } from "./modifiers";

const assignKeysToCategory = (categories, keys) => {
  const newKeys = [];

  for (const key of keys) {
    newKeys.push(Object.assign({}, key, { categories: categories }));
  }

  return newKeys;
};
// Base keycodes as seen on the US QWERTY layout

const baseKeyCodeTable = [
  { code: 4, label: { base: "a", shifted: "A" } },
  { code: 5, label: { base: "b", shifted: "B" } },
  { code: 6, label: { base: "c", shifted: "C" } },
  { code: 7, label: { base: "d", shifted: "D" } },
  { code: 8, label: { base: "e", shifted: "E" } },
  { code: 9, label: { base: "f", shifted: "F" } },
  { code: 10, label: { base: "g", shifted: "G" } },
  { code: 11, label: { base: "h", shifted: "H" } },
  { code: 12, label: { base: "i", shifted: "I" } },
  { code: 13, label: { base: "j", shifted: "J" } },
  { code: 14, label: { base: "k", shifted: "K" } },
  { code: 15, label: { base: "l", shifted: "L" } },
  { code: 16, label: { base: "m", shifted: "M" } },
  { code: 17, label: { base: "n", shifted: "N" } },
  { code: 18, label: { base: "o", shifted: "O" } },
  { code: 19, label: { base: "p", shifted: "P" } },
  { code: 20, label: { base: "q", shifted: "Q" } },
  { code: 21, label: { base: "r", shifted: "R" } },
  { code: 22, label: { base: "s", shifted: "S" } },
  { code: 23, label: { base: "t", shifted: "T" } },
  { code: 24, label: { base: "u", shifted: "U" } },
  { code: 25, label: { base: "v", shifted: "V" } },
  { code: 26, label: { base: "w", shifted: "W" } },
  { code: 27, label: { base: "x", shifted: "X" } },
  { code: 28, label: { base: "y", shifted: "Y" } },
  { code: 29, label: { base: "z", shifted: "Z" } },
  { code: 47, label: { base: "[", shifted: "{" } },
  { code: 48, label: { base: "]", shifted: "}" } },
  { code: 49, label: { base: "\\", shifted: "|" } },
  { code: 50, label: { hint: { full: "Alternate", "1u": "Alt." }, base: "#", shifted: "~" } },
  { code: 53, label: { base: "`", shifted: "~" } },
  { code: 30, label: { base: "1", shifted: "!" } },
  { code: 31, label: { base: "2", shifted: "@" } },
  { code: 32, label: { base: "3", shifted: "#" } },
  { code: 33, label: { base: "4", shifted: "$" } },
  { code: 34, label: { base: "5", shifted: "%" } },
  { code: 35, label: { base: "6", shifted: "^" } },
  { code: 36, label: { base: "7", shifted: "&" } },
  { code: 37, label: { base: "8", shifted: "*" } },
  { code: 38, label: { base: "9", shifted: "(" } },
  { code: 39, label: { base: "0", shifted: ")" } },
  { code: 45, label: { base: "-", shifted: "_" } },
  { code: 46, label: { base: "=", shifted: "+" } },
  { code: 51, label: { base: ";", shifted: ":" } },
  { code: 52, label: { base: "'", shifted: '"' } },
  { code: 54, label: { base: ",", shifted: "<" } },
  { code: 55, label: { base: ".", shifted: ">" } },
  { code: 56, label: { base: "/", shifted: "?" } },
  { code: 100, label: { hint: { full: "Alternate", "1u": "Alt." }, base: "\\", shifted: "|" } },
];

const USQwerty = {
  name: "English (US)",
  default: true,
  group: "en",
  codetable: withModifiers(baseKeyCodeTable),
};

const blanks = assignKeysToCategory(
  ["blanks"],
  [
    { code: constants.codes.BLOCKED, label: { base: { full: "Blocked", "1u": "Blkd" } } },
    { code: constants.codes.TRANSPARENT, label: { base: { full: "Transparent", "1u": " " } } },
  ]
);

const numpad = withModifiers([
  { code: 83, label: { base: { full: "Num Lock", "1u": "Num" } } },
  { code: 84, label: { base: "/" }, location: "numpad" },
  { code: 85, label: { base: "*" }, location: "numpad" },
  { code: 86, label: { base: "-" }, location: "numpad" },
  { code: 87, label: { base: "+" }, location: "numpad" },
  { code: 88, label: { base: { full: "Enter", "1u": "Ent" } }, location: "numpad" },
  { code: 89, label: { base: "1" }, location: "numpad" },
  { code: 90, label: { base: "2" }, location: "numpad" },
  { code: 91, label: { base: "3" }, location: "numpad" },
  { code: 92, label: { base: "4" }, location: "numpad" },
  { code: 93, label: { base: "5" }, location: "numpad" },
  { code: 94, label: { base: "6" }, location: "numpad" },
  { code: 95, label: { base: "7" }, location: "numpad" },
  { code: 96, label: { base: "8" }, location: "numpad" },
  { code: 97, label: { base: "9" }, location: "numpad" },
  { code: 98, label: { base: "0" }, location: "numpad" },
  { code: 99, label: { base: "." }, location: "numpad" },
]);

const navigation = withModifiers([
  { code: 74, label: { base: "Home" } },
  { code: 75, label: { base: { full: "Page Up", "1u": "PgUp" } } },
  { code: 77, label: { base: "End" } },
  { code: 78, label: { base: { full: "Page Down", "1u": "PgDn" } } },
  { code: 79, label: { base: { full: "Right Arrow", "1u": "→" } } },
  { code: 80, label: { base: { full: "Left Arrow", "1u": "←" } } },
  { code: 81, label: { base: { full: "Down Arrow", "1u": "↓" } } },
  { code: 82, label: { base: { full: "Up Arrow", "1u": "↑" } } },
]);

const numbered_f_keys = withModifiers([
  { code: 58, label: { base: "F1" } },
  { code: 59, label: { base: "F2" } },
  { code: 60, label: { base: "F3" } },
  { code: 61, label: { base: "F4" } },
  { code: 62, label: { base: "F5" } },
  { code: 63, label: { base: "F6" } },
  { code: 64, label: { base: "F7" } },
  { code: 65, label: { base: "F8" } },
  { code: 66, label: { base: "F9" } },
  { code: 67, label: { base: "F10" } },
  { code: 68, label: { base: "F11" } },
  { code: 69, label: { base: "F12" } },
  { code: 104, label: { base: "F13" } },
  { code: 105, label: { base: "F14" } },
  { code: 106, label: { base: "F15" } },
  { code: 107, label: { base: "F16" } },
  { code: 108, label: { base: "F17" } },
  { code: 109, label: { base: "F18" } },
  { code: 110, label: { base: "F19" } },
  { code: 111, label: { base: "F20" } },
  { code: 112, label: { base: "F21" } },
  { code: 113, label: { base: "F22" } },
  { code: 114, label: { base: "F23" } },
  { code: 115, label: { base: "F24" } },
]);

const spacing = withModifiers([
  { code: 41, label: { base: "Esc" } },
  { code: 43, label: { base: "Tab" } },
  { code: 44, label: { base: "Space" } },
  { code: 40, label: { base: "Enter" } },
  { code: 42, label: { base: { full: "Backspace", "1u": "Bksp" } } },
  { code: 73, label: { base: { full: "Insert", "1u": "Ins" } } },
  { code: 76, label: { base: { full: "Delete", "1u": "Del" } } },
]);

const miscellaneous = withModifiers([
  { code: 57, label: { base: { full: "Caps Lock", "1u": "Caps" } } },
  { code: 70, label: { base: { full: "Print Screen", "1u": "PrSc" } } },
  { code: 71, label: { base: { full: "Scroll Lock", "1u": "ScLk" } } },
  { code: 72, label: { base: { full: "Pause / Break", "1u": "Brk" } } },
  { code: 101, label: { base: "Menu" } },
]);
const consumer = assignKeysToCategory(
  ["consumer"],
  [
    { code: 0xe2 + constants.ranges.consumer.start, label: { base: "Mute" } },
    { code: 0xb5 + constants.ranges.consumer.start, label: { base: { full: "Next track", "1u": "⏭" } } },
    { code: 0xb6 + constants.ranges.consumer.start, label: { base: { full: "Previous track", "1u": "⏮" } } },
    { code: 0xb7 + constants.ranges.consumer.start, label: { base: "Stop" } },
    { code: 0xcd + constants.ranges.consumer.start, label: { base: { full: "Play / pause", "1u": "⏯" } } },
    {
      code: 0xe9 + constants.ranges.consumer.start,
      label: { hint: { full: "Volume", "1u": "Vol." }, base: { full: "Up", "1u": "🔊" } },
    },
    {
      code: 0xea + constants.ranges.consumer.start,
      label: { hint: { full: "Volume", "1u": "Vol." }, base: { full: "Down", "1u": "🔉" } },
    },
    {
      code: 0x6f + constants.ranges.consumer.start,
      label: { hint: { full: "Brightness", "1u": "Brght." }, base: { full: "Up", "1u": "🔆" } },
    },
    {
      code: 0x70 + constants.ranges.consumer.start,
      label: { hint: { full: "Brightness", "1u": "Brght." }, base: { full: "Down", "1u": "🔅" } },
    },
  ]
);

const mousekeys = assignKeysToCategory(
  ["mousekeys"],
  [
    // Mouse movement
    { code: constants.ranges.mouse.start + 1, label: { hint: "Mouse", base: "Up" } },
    { code: constants.ranges.mouse.start + 2, label: { hint: "Mouse", base: "Down" } },
    { code: constants.ranges.mouse.start + 4, label: { hint: "Mouse", base: "Left" } },
    { code: constants.ranges.mouse.start + 8, label: { hint: "Mouse", base: "Right" } },
    // Mouse wheel
    { code: constants.ranges.mouse.start + 17, label: { hint: { full: "Mouse Wheel", "1u": "M.Whl" }, base: "Up" } },
    { code: constants.ranges.mouse.start + 18, label: { hint: { full: "Mouse Wheel", "1u": "M.Whl" }, base: "Down" } },
    { code: constants.ranges.mouse.start + 20, label: { hint: { full: "Mouse Wheel", "1u": "M.Whl" }, base: "Left" } },
    { code: constants.ranges.mouse.start + 24, label: { hint: { full: "Mouse Wheel", "1u": "M.Whl" }, base: "Right" } },
    // Mouse buttons
    { code: constants.ranges.mouse.start + 65, label: { hint: { full: "Mouse Button", "1u": "M.Btn" }, base: "Left" } },
    {
      code: constants.ranges.mouse.start + 66,
      label: { hint: { full: "Mouse Button", "1u": "M.Btn" }, base: "Right" },
    },
    {
      code: constants.ranges.mouse.start + 68,
      label: { hint: { full: "Mouse Button", "1u": "M.Btn" }, base: "Middle" },
    },
    { code: constants.ranges.mouse.start + 72, label: { hint: { full: "Mouse Button", "1u": "M.Btn" }, base: "Back" } },
    {
      code: constants.ranges.mouse.start + 80,
      label: { hint: { full: "Mouse Button", "1u": "M.Btn" }, base: "Forward" },
    },
    // Mouse warp
    { code: constants.ranges.mouse.start + 96, label: { hint: { full: "Mouse Warp", "1u": "Warp" }, base: "End" } },
    {
      code: constants.ranges.mouse.start + 33,
      label: { hint: { full: "Mouse Warp", "1u": "Warp" }, base: { full: "North", "1u": "North" } },
    },
    {
      code: constants.ranges.mouse.start + 34,
      label: { hint: { full: "Mouse Warp", "1u": "Warp" }, base: { full: "South", "1u": "South" } },
    },
    {
      code: constants.ranges.mouse.start + 35,
      label: { hint: { full: "Mouse Warp", "1u": "Warp" }, base: { full: "Zoom", "1u": "Zoom" } },
    },
    {
      code: constants.ranges.mouse.start + 36,
      label: { hint: { full: "Mouse Warp", "1u": "Warp" }, base: { full: "West", "1u": "West" } },
    },
    {
      code: constants.ranges.mouse.start + 37,
      label: { hint: { full: "Mouse Warp", "1u": "Warp" }, base: { full: "North-West", "1u": "NW" } },
    },
    {
      code: constants.ranges.mouse.start + 38,
      label: { hint: { full: "Mouse Warp", "1u": "Warp" }, base: { full: "South-West", "1u": "SW" } },
    },
    {
      code: constants.ranges.mouse.start + 40,
      label: { hint: { full: "Mouse Warp", "1u": "Warp" }, base: { full: "East", "1u": "East" } },
    },
    {
      code: constants.ranges.mouse.start + 41,
      label: { hint: { full: "Mouse Warp", "1u": "Warp" }, base: { full: "North-East", "1u": "NE" } },
    },
    {
      code: constants.ranges.mouse.start + 42,
      label: { hint: { full: "Mouse Warp", "1u": "Warp" }, base: { full: "South-East", "1u": "SE" } },
    },
  ]
);

const macro = (index) => ({
  code: constants.ranges.macro.start + index,
  label: { hint: "Macro", base: "#" + index.toString() },
  rangeStart: constants.ranges.macro.start,
  categories: ["macros"],
});
const macros = Array(32)
  .fill()
  .map((_, index) => macro(index));

const dynmacro = (index) => ({
  code: constants.ranges.dynamic_macro.start + index,
  label: { hint: { full: "Dynamic Macro", "1u": "DM" }, base: "#" + index.toString() },
  rangeStart: constants.ranges.dynamic_macro.start,
  categories: ["dynmacros"],
});
const dynmacros = Array(32)
  .fill()
  .map((_, index) => dynmacro(index));

const leader = (index) => ({
  code: constants.ranges.leader.start + index,
  label: { hint: "Leader ", base: "#" + index.toString() },
  rangeStart: constants.ranges.leader.start,
  categories: ["leader"],
});
const leaders = Array(8)
  .fill()
  .map((_, index) => leader(index));

const tapdance = (index) => ({
  code: constants.ranges.tapdance.start + index,
  label: { hint: { full: "TapDance", "1u": "TD" }, base: "#" + index.toString() },
  rangeStart: constants.ranges.tapdance.start,
  categories: ["tapdance"],
});
const tapdances = Array(16)
  .fill()
  .map((_, index) => tapdance(index));

const stenokeys = assignKeysToCategory(
  ["steno"],
  [
    { code: constants.ranges.steno.start + 0, label: { hint: "Steno", base: "FN" } },
    { code: constants.ranges.steno.start + 1, label: { hint: "Steno", base: "N1" } },
    { code: constants.ranges.steno.start + 2, label: { hint: "Steno", base: "N2" } },
    { code: constants.ranges.steno.start + 3, label: { hint: "Steno", base: "N3" } },
    { code: constants.ranges.steno.start + 4, label: { hint: "Steno", base: "N4" } },
    { code: constants.ranges.steno.start + 5, label: { hint: "Steno", base: "N5" } },
    { code: constants.ranges.steno.start + 6, label: { hint: "Steno", base: "N6" } },
    { code: constants.ranges.steno.start + 7, label: { hint: "Steno", base: "S1" } },
    { code: constants.ranges.steno.start + 8, label: { hint: "Steno", base: "S2" } },
    { code: constants.ranges.steno.start + 9, label: { hint: "Steno", base: "TL" } },
    { code: constants.ranges.steno.start + 10, label: { hint: "Steno", base: "KL" } },
    { code: constants.ranges.steno.start + 11, label: { hint: "Steno", base: "PL" } },
    { code: constants.ranges.steno.start + 12, label: { hint: "Steno", base: "WL" } },
    { code: constants.ranges.steno.start + 13, label: { hint: "Steno", base: "HL" } },
    { code: constants.ranges.steno.start + 14, label: { hint: "Steno", base: "RL" } },
    { code: constants.ranges.steno.start + 15, label: { hint: "Steno", base: "A" } },
    { code: constants.ranges.steno.start + 16, label: { hint: "Steno", base: "O" } },
    { code: constants.ranges.steno.start + 17, label: { hint: "Steno", base: "ST1" } },
    { code: constants.ranges.steno.start + 18, label: { hint: "Steno", base: "ST2" } },
    { code: constants.ranges.steno.start + 19, label: { hint: "Steno", base: "RE1" } },
    { code: constants.ranges.steno.start + 20, label: { hint: "Steno", base: "RE2" } },
    { code: constants.ranges.steno.start + 21, label: { hint: "Steno", base: "PWR" } },
    { code: constants.ranges.steno.start + 22, label: { hint: "Steno", base: "ST3" } },
    { code: constants.ranges.steno.start + 23, label: { hint: "Steno", base: "ST4" } },
    { code: constants.ranges.steno.start + 24, label: { hint: "Steno", base: "E" } },
    { code: constants.ranges.steno.start + 25, label: { hint: "Steno", base: "U" } },
    { code: constants.ranges.steno.start + 26, label: { hint: "Steno", base: "FR" } },
    { code: constants.ranges.steno.start + 27, label: { hint: "Steno", base: "RR" } },
    { code: constants.ranges.steno.start + 28, label: { hint: "Steno", base: "PR" } },
    { code: constants.ranges.steno.start + 29, label: { hint: "Steno", base: "BR" } },
    { code: constants.ranges.steno.start + 30, label: { hint: "Steno", base: "LR" } },
    { code: constants.ranges.steno.start + 31, label: { hint: "Steno", base: "GR" } },
    { code: constants.ranges.steno.start + 32, label: { hint: "Steno", base: "TR" } },
    { code: constants.ranges.steno.start + 33, label: { hint: "Steno", base: "SR" } },
    { code: constants.ranges.steno.start + 34, label: { hint: "Steno", base: "DR" } },
    { code: constants.ranges.steno.start + 35, label: { hint: "Steno", base: "N7" } },
    { code: constants.ranges.steno.start + 36, label: { hint: "Steno", base: "N8" } },
    { code: constants.ranges.steno.start + 37, label: { hint: "Steno", base: "N9" } },
    { code: constants.ranges.steno.start + 38, label: { hint: "Steno", base: "NA" } },
    { code: constants.ranges.steno.start + 39, label: { hint: "Steno", base: "NB" } },
    { code: constants.ranges.steno.start + 40, label: { hint: "Steno", base: "NC" } },
    { code: constants.ranges.steno.start + 41, label: { hint: "Steno", base: "ZR" } },
  ]
);

const ledkeys = assignKeysToCategory(
  ["ledkeys"],
  [
    { code: constants.ranges.led.start + 0, label: { hint: { full: "LEDEffect", "1u": "LED" }, base: "Next" } },
    {
      code: constants.ranges.led.start + 1,
      label: { hint: { full: "LEDEffect", "1u": "LED" }, base: { full: "Previous", "1u": "Prev." } },
    },
    {
      code: constants.ranges.led.start + 2,
      label: { hint: { full: "LEDEffect", "1u": "LED" }, base: { full: "Toggle", "1u": "Togg." } },
    },
  ]
);
const ledbrightnesskeys = assignKeysToCategory(
  ["ledbrightnesskeys"],
  [
    {
      code: constants.codes.LED_BRIGHTNESS_UP,
      label: { hint: { full: "LED Brightness", "1u": "LED" }, base: { full: "Brighter", "1u": "Bright" } }
    },
    {
      code: constants.codes.LED_BRIGHTNESS_DOWN,
      label: { hint: { full: "LED Brightness", "1u": "LED" }, base: { full: "Dimmer", "1u": "Dim" } }
    },
  ],
);
const spacecadet = assignKeysToCategory(
  ["spacecadet"],
  [
    {
      code: constants.ranges.spacecadet.start + 0,
      label: { hint: { full: "SpaceCadet", "1u": "SC" }, base: { full: "Enable", "1u": "On" } },
    },
    {
      code: constants.ranges.spacecadet.start + 1,
      label: { hint: { full: "SpaceCadet", "1u": "SC" }, base: { full: "Disable", "1u": "Off" } },
    },
  ]
);

const layer = (base, hint, type, index) => ({
  code: base + index,
  label: { hint: hint, base: "#" + index.toString() },
  target: index,
  rangeStart: base,
  categories: ["layer", type],
});
const shiftToLayer = Array(32)
  .fill()
  .map((_, index) => layer(constants.ranges.layer_shift.start, "ShiftTo", "shifttolayer", index));
const lockToLayer = Array(32)
  .fill()
  .map((_, index) => layer(constants.ranges.layer_lock.start, "LockTo", "locktolayer", index));
const moveToLayer = Array(32)
  .fill()
  .map((_, index) => layer(constants.ranges.layer_move.start, "MoveTo", "movetolayer", index));
const layers = shiftToLayer.concat(lockToLayer).concat(moveToLayer);

const platform_apple = assignKeysToCategory(
  ["platform_apple"],
  [
    {
      code: constants.ranges.consumer.start + 0x29d,
      label: { base: { full: "Globe", "1u": "🌐" } },
    },
    {
      code: constants.ranges.consumer.start + 0x19e,
      label: { base: { full: "Lock Screen", "1u": "Lock" } },
    },
    {
      code: constants.ranges.consumer.start + 0x2a2,
      label: { base: { full: "Mission Control", "1u": "Mission" } },
    },
    {
      code: constants.ranges.consumer.start + 0x29f,
      label: { base: { full: "Exposé" } },
    },
  ]
);

// Bluetooth Low Energy (BLE) keys - based on Kaleidoscope firmware key_defs/ble.h
const blekeys = assignKeysToCategory(
  ["blekeys"],
  [
    { 
      code: constants.codes.BLE_TOGGLE,
      label: { hint: { full: "Bluetooth", "1u": "BLE" }, base: { full: "Toggle", "1u": "Togg" } } 
    },
    { 
      code: constants.codes.BLE_OFF,
      label: { hint: { full: "Bluetooth", "1u": "BLE" }, base: { full: "Off", "1u": "Off" } } 
    },
    { 
      code: constants.codes.BLE_PAIR,
      label: { hint: { full: "Bluetooth", "1u": "BLE" }, base: { full: "Pair", "1u": "Pair" } } 
    },
    { 
      code: constants.codes.BLE_SELECT_DEVICE_1,
      label: { hint: { full: "Bluetooth", "1u": "BLE" }, base: { full: "Device 1", "1u": "BT 1" } } 
    },
    { 
      code: constants.codes.BLE_SELECT_DEVICE_2,
      label: { hint: { full: "Bluetooth", "1u": "BLE" }, base: { full: "Device 2", "1u": "BT 2" } } 
    },
    { 
      code: constants.codes.BLE_SELECT_DEVICE_3,
      label: { hint: { full: "Bluetooth", "1u": "BLE" }, base: { full: "Device 3", "1u": "BT 3" } } 
    },
    { 
      code: constants.codes.BLE_SELECT_DEVICE_4,
      label: { hint: { full: "Bluetooth", "1u": "BLE" }, base: { full: "Device 4", "1u": "BT 4" } } 
    },
  ]
);
const lang_intl = assignKeysToCategory(
  ["lang_intl"],
  [
    { code: 144, label: { base: { full: "Lang1/Kana/Hangul" } } },
    { code: 145, label: { base: { full: "Lang2/Eisuu/Hanja" } } },
    { code: 146, label: { base: { full: "Lang3" } } },
    { code: 147, label: { base: { full: "Lang4" } } },
    { code: 148, label: { base: { full: "Lang5" } } },
    { code: 149, label: { base: { full: "Lang6" } } },
    { code: 150, label: { base: { full: "Lang7" } } },
    { code: 151, label: { base: { full: "Lang8" } } },
    { code: 152, label: { base: { full: "Lang9" } } },
    { code: 135, label: { base: { full: "Intl1" } } },
    { code: 136, label: { base: { full: "Intl2" } } },
    { code: 137, label: { base: { full: "Intl3" } } },
    { code: 138, label: { base: { full: "Intl4" } } },
    { code: 139, label: { base: { full: "Intl5" } } },
    { code: 140, label: { base: { full: "Intl6" } } },
    { code: 141, label: { base: { full: "Intl7" } } },
    { code: 142, label: { base: { full: "Intl8" } } },
    { code: 143, label: { base: { full: "Intl9" } } },
  ]
);

const modifiers = withModifiers(
  assignKeysToCategory(
    ["modifier"],
    [
      {
        code: constants.ranges.modifiers.start + 0,
        label: { base: { full: "Control", "1u": "Ctrl" } },
        location: "left",
      },
      { code: constants.ranges.modifiers.start + 1, label: { base: "Shift" }, location: "left" },
      { code: constants.ranges.modifiers.start + 2, label: { base: "Alt" }, location: "left" },
      { code: constants.ranges.modifiers.start + 3, label: { base: GuiLabel }, location: "left" },
      {
        code: constants.ranges.modifiers.start + 4,
        label: { base: { full: "Control", "1u": "Ctrl" } },
        location: "right",
      },
      { code: constants.ranges.modifiers.start + 5, label: { base: "Shift" }, location: "right" },
      {
        code: constants.ranges.modifiers.start + 6,
        label: { base: { full: "AltGr", "1u": "AGr" } },
        location: "right",
      },
      { code: constants.ranges.modifiers.start + 7, label: { base: GuiLabel }, location: "right" },
    ]
  )
).concat([
  // Custom modifier combos
  { code: 2530, baseCode: 226, categories: ["ctrl", "shift"], label: { base: "Meh" } },
  { code: 3043, baseCode: 227, categories: ["ctrl", "shift", "alt"], label: { base: "Hyper" } },
]);
const oneshot_modifier = (index, mod) => ({
  code: constants.ranges.oneshot_modifier.start + index,
  baseCode: constants.ranges.modifiers.start + index,
  label: { hint: { full: "OneShot", "1u": "OSM" }, base: mod },
  rangeStart: constants.ranges.oneshot_modifier.start,
  categories: ["oneshot", "modifier"],
});
const oneshot_layer = (index) => ({
  code: constants.ranges.oneshot_layer.start + index,
  label: { hint: { full: "OneShot", "1u": "OSL" }, base: "#" + index.toString() },
  target: index,
  rangeStart: constants.ranges.oneshot_layer.start,
  categories: ["layer", "oneshot"],
});

const oneshot = [
  oneshot_modifier(0, { full: "Left Control", "1u": "LCtrl" }),
  oneshot_modifier(1, { full: "Left Shift", "1u": "LSft" }),
  oneshot_modifier(2, "Alt"),
  oneshot_modifier(3, { full: "Left " + GuiLabel.full, "1u": "L" + GuiLabel["1u"] }),
  oneshot_modifier(4, { full: "Right Control", "1u": "RCtrl" }),
  oneshot_modifier(5, { full: "Right Shift", "1u": "RSft" }),
  oneshot_modifier(6, "AltGr"),
  oneshot_modifier(7, { full: "Right " + GuiLabel.full, "1u": "R" + GuiLabel["1u"] }),
  oneshot_layer(0),
  oneshot_layer(1),
  oneshot_layer(2),
  oneshot_layer(3),
  oneshot_layer(4),
  oneshot_layer(5),
  oneshot_layer(6),
  oneshot_layer(7),
  {
    code: constants.codes.ONESHOT_META_STICKY,
    label: { hint: { full: "OneShot Sticky", "1u": "Sticky" }, base: "Next" },
    categories: ["oneshot"],
  },
  {
    code: constants.codes.ONESHOT_ACTIVE_STICKY,
    label: { hint: { full: "OneShot Sticky", "1u": "Sticky" }, base: "Active" },
    categories: ["oneshot"],
  },
  {
    code: constants.codes.ONESHOT_CANCEL,
    label: { hint: { full: "OneShot Sticky", "1u": "Sticky" }, base: "Cancel" },
    categories: ["oneshot"],
  },
];

const keysAvailableForDualUse = []
  .concat(baseKeyCodeTable)
  .concat(miscellaneous)
  .concat(numbered_f_keys)
  .concat(navigation)
  .concat(numpad)
  .concat(spacing);

const addDualUseLayer = (key, layer) => ({
  code: constants.ranges.dual_use_layer.start + layer * 256 + key.code,
  baseCode: key.code,
  label: { hint: "Layer #" + layer.toString() + "/", base: key.label.base },
  target: layer,
  rangeStart: constants.ranges.dual_use_layer.start,
  categories: ["layer", "dualuse"],
});
const dualUseModifiers = {
  ctrl: { index: 0, name: "Control" },
  shift: { index: 1, name: "Shift" },
  alt: { index: 2, name: "Alt" },
  gui: { index: 3, name: GuiLabel.full },
  rctrl: { index: 4, name: "Right Control" },
  rshift: { index: 5, name: "Right Shift" },
  altgr: { index: 6, name: "AltGr" },
  rgui: { index: 7, name: `Right ${GuiLabel.full}` },
};
const addDualUseModifier = (key, mod) => ({
  code: constants.ranges.dual_use_modifier.start + dualUseModifiers[mod].index * 256 + key.code,
  baseCode: key.code,
  label: { hint: dualUseModifiers[mod].name + "/", base: key.label.base },
  modifier: dualUseModifiers[mod].name,
  rangeStart: constants.ranges.dual_use_modifier.start,
  categories: ["modifier", "dualuse", mod],
});
const dual_use_layers = () => {
  const l = [];
  for (const k of keysAvailableForDualUse) {
    // We only want to augment the base set, but `keySet` contains
    // modifier-augmented variants too. We don't want to add dual-use layer
    // augmentation to those, because that messes up the labels badly.
    if (k.code > 255) continue;
    for (let layer = 0; layer < 8; layer++) {
      l.push(addDualUseLayer(k, layer));
    }
  }
  return l;
};
const dual_use_modifier = (mod) => {
  const m = [];
  for (const k of keysAvailableForDualUse) {
    // We only want to augment the base set, but `keySet` contains
    // modifier-augmented variants too. We don't want to add dual-use modifier
    // augmentation to those, because that messes up the labels badly.
    if (k.code > 255) continue;
    m.push(addDualUseModifier(k, mod));
  }
  return m;
};
const dualuse = []
  .concat(dual_use_layers())
  .concat(dual_use_modifier("ctrl"))
  .concat(dual_use_modifier("shift"))
  .concat(dual_use_modifier("alt"))
  .concat(dual_use_modifier("gui"))
  .concat(dual_use_modifier("rctrl"))
  .concat(dual_use_modifier("rshift"))
  .concat(dual_use_modifier("altgr"))
  .concat(dual_use_modifier("rgui"));

const keyCodeTable = []
  .concat(blanks)
  .concat(modifiers)
  .concat(numpad)
  .concat(navigation)
  .concat(numbered_f_keys)
  .concat(spacing)
  .concat(miscellaneous)
  .concat(consumer)
  .concat(mousekeys)
  .concat(macros)
  .concat(dynmacros)
  .concat(leaders)
  .concat(tapdances)
  .concat(stenokeys)
  .concat(ledkeys)
  .concat(ledbrightnesskeys)
  .concat(spacecadet)
  .concat(oneshot)
  .concat(dualuse)
  .concat(layers)
  .concat(blekeys)
  .concat(platform_apple)
  .concat(lang_intl);

const key_layout_104key = [
  [41, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69],
  [53, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 45, 46, 42, 70, 71, 72, 83, 84, 85, 86],
  [43, 20, 26, 8, 21, 23, 28, 24, 12, 18, 19, 47, 48, 49, 73, 74, 75, 95, 96, 97, 87],
  [57, 4, 22, 7, 9, 10, 11, 13, 14, 15, 51, 52, 40, 76, 77, 78, 92, 93, 94],
  [225, 100, 29, 27, 6, 25, 5, 17, 16, 54, 55, 56, 229, 82, 89, 90, 91, 88],
  [224, 227, 226, 44, 230, 231, 101, 228, 80, 81, 79, 98, 99],
];
const Base = {
  codetable: keyCodeTable,
  layout: key_layout_104key,
};

export { Base, USQwerty, addDualUseLayer, addDualUseModifier };
