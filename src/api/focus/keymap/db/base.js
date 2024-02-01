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

import { withModifiers } from "./modifiers";
import { GuiLabel } from "./gui";

// Most of these numbers come from the Kaleidoscope-Ranges plugin
// They represent the offsets of eeprom-stored key codes for various types of key.

const KEYCODE_OFFSET = {
  LAYER: 17408, // 0x4400,
  LED: 17152, // 0x4300,
  CONSUMER: 18432, // 0x4800,
  MOUSE: 20480, // 0x5000,
  MACRO: 24576, // 0x6000,
  OS: 49153, // 0xc001
  OSM: 49153, // 0xc001
  OSM_LAST: 49160, // 0xc008
  OSL: 49161, // 0xc009
  OSL_LAST: 49168, // 0xc010
  OS_LAST: 49168, // 0xc010
  DU: 49169, // 0xc011
  DUM: 49169, // 0xc011
  DUM_LAST: 51217, // 0xc811
  DUL: 51218, // 0xc812
  DUL_LAST: 53266, // 0xd012
  DU_LAST: 53266, // 0xd012
  TD: 53267, // 0xd013
  TD_LAST: 53282, // 0xd022
  LEAD: 53283, // 0xd023
  LEAD_LAST: 53290, // 0xd02a
  CYCLE: 53291, // 0xd02b
  SYSTER: 53292, // 0xd02c
  TT: 53293, // 0xd02d
  TT_LAST: 53548, // 0xd12c
  STENO: 53549, // 0xd12d
  STENO_LAST: 53591, // 0xd16f
  SC: 53592, // 0xd170
  SC_LAST: 53593, // 0xd171
  REDIAL: 53594, // 0xd172
  TURBO: 53595, // 0xd173
  DYNAMIC_MACRO: 53596, // 0xd174
  DYNAMIC_MACRO_LAST: 53627, // 0xd192
  OS_META_STICKY: 53628, // 0xd193
  OS_ACTIVE_STICKY: 53629, // 0xd194
  OS_CANCEL: 53630, // 0xd195
  CS: 53631, // 0xd196
  CS_LAST: 53695, // 0xd1d3
  SAFE_START: 53696, // 0xd1d4
};

const addCategories = (categories, keys) => {
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

const blanks = addCategories(
  ["blanks"],
  [
    { code: 0, label: { base: { full: "Blocked", "1u": "Blkd" } } },
    { code: 65535, label: { base: { full: "Transparent", "1u": " " } } },
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
const consumer = addCategories(
  ["consumer"],
  [
    { code: 0xe2 + KEYCODE_OFFSET.CONSUMER, label: { base: "Mute" } },
    { code: 0xb5 + KEYCODE_OFFSET.CONSUMER, label: { base: { full: "Next track", "1u": "⏭" } } },
    { code: 0xb6 + KEYCODE_OFFSET.CONSUMER, label: { base: { full: "Previous track", "1u": "⏮" } } },
    { code: 0xb7 + KEYCODE_OFFSET.CONSUMER, label: { base: "Stop" } },
    { code: 0xcd + KEYCODE_OFFSET.CONSUMER, label: { base: { full: "Play / pause", "1u": "⏯" } } },
    {
      code: 0xe9 + KEYCODE_OFFSET.CONSUMER,
      label: { hint: { full: "Volume", "1u": "Vol." }, base: { full: "Up", "1u": "🔊" } },
    },
    {
      code: 0xea + KEYCODE_OFFSET.CONSUMER,
      label: { hint: { full: "Volume", "1u": "Vol." }, base: { full: "Down", "1u": "🔉" } },
    },
    {
      code: 0x6f + KEYCODE_OFFSET.CONSUMER,
      label: { hint: { full: "Brightness", "1u": "Brght." }, base: { full: "Up", "1u": "🔆" } },
    },
    {
      code: 0x70 + KEYCODE_OFFSET.CONSUMER,
      label: { hint: { full: "Brightness", "1u": "Brght." }, base: { full: "Down", "1u": "🔅" } },
    },
  ]
);

const mousekeys = addCategories(
  ["mousekeys"],
  [
    // Mouse movement
    { code: KEYCODE_OFFSET.MOUSE + 1, label: { hint: "Mouse", base: "Up" } },
    { code: KEYCODE_OFFSET.MOUSE + 2, label: { hint: "Mouse", base: "Down" } },
    { code: KEYCODE_OFFSET.MOUSE + 4, label: { hint: "Mouse", base: "Left" } },
    { code: KEYCODE_OFFSET.MOUSE + 8, label: { hint: "Mouse", base: "Right" } },
    // Mouse wheel
    { code: KEYCODE_OFFSET.MOUSE + 17, label: { hint: { full: "Mouse Wheel", "1u": "M.Whl" }, base: "Up" } },
    { code: KEYCODE_OFFSET.MOUSE + 18, label: { hint: { full: "Mouse Wheel", "1u": "M.Whl" }, base: "Down" } },
    { code: KEYCODE_OFFSET.MOUSE + 20, label: { hint: { full: "Mouse Wheel", "1u": "M.Whl" }, base: "Left" } },
    { code: KEYCODE_OFFSET.MOUSE + 24, label: { hint: { full: "Mouse Wheel", "1u": "M.Whl" }, base: "Right" } },
    // Mouse buttons
    { code: KEYCODE_OFFSET.MOUSE + 65, label: { hint: { full: "Mouse Button", "1u": "M.Btn" }, base: "Left" } },
    { code: KEYCODE_OFFSET.MOUSE + 66, label: { hint: { full: "Mouse Button", "1u": "M.Btn" }, base: "Right" } },
    { code: KEYCODE_OFFSET.MOUSE + 68, label: { hint: { full: "Mouse Button", "1u": "M.Btn" }, base: "Middle" } },
    { code: KEYCODE_OFFSET.MOUSE + 72, label: { hint: { full: "Mouse Button", "1u": "M.Btn" }, base: "Back" } },
    { code: KEYCODE_OFFSET.MOUSE + 80, label: { hint: { full: "Mouse Button", "1u": "M.Btn" }, base: "Forward" } },
    // Mouse warp
    { code: KEYCODE_OFFSET.MOUSE + 96, label: { hint: { full: "Mouse Warp", "1u": "Warp" }, base: "End" } },
    {
      code: KEYCODE_OFFSET.MOUSE + 33,
      label: { hint: { full: "Mouse Warp", "1u": "Warp" }, base: { full: "North", "1u": "North" } },
    },
    {
      code: KEYCODE_OFFSET.MOUSE + 34,
      label: { hint: { full: "Mouse Warp", "1u": "Warp" }, base: { full: "South", "1u": "South" } },
    },
    {
      code: KEYCODE_OFFSET.MOUSE + 35,
      label: { hint: { full: "Mouse Warp", "1u": "Warp" }, base: { full: "Zoom", "1u": "Zoom" } },
    },
    {
      code: KEYCODE_OFFSET.MOUSE + 36,
      label: { hint: { full: "Mouse Warp", "1u": "Warp" }, base: { full: "West", "1u": "West" } },
    },
    {
      code: KEYCODE_OFFSET.MOUSE + 37,
      label: { hint: { full: "Mouse Warp", "1u": "Warp" }, base: { full: "North-West", "1u": "NW" } },
    },
    {
      code: KEYCODE_OFFSET.MOUSE + 38,
      label: { hint: { full: "Mouse Warp", "1u": "Warp" }, base: { full: "South-West", "1u": "SW" } },
    },
    {
      code: KEYCODE_OFFSET.MOUSE + 40,
      label: { hint: { full: "Mouse Warp", "1u": "Warp" }, base: { full: "East", "1u": "East" } },
    },
    {
      code: KEYCODE_OFFSET.MOUSE + 41,
      label: { hint: { full: "Mouse Warp", "1u": "Warp" }, base: { full: "North-East", "1u": "NE" } },
    },
    {
      code: KEYCODE_OFFSET.MOUSE + 42,
      label: { hint: { full: "Mouse Warp", "1u": "Warp" }, base: { full: "South-East", "1u": "SE" } },
    },
  ]
);

const macro = (index) => ({
  code: KEYCODE_OFFSET.MACRO + index,
  label: { hint: "Macro", base: "#" + index.toString() },
  rangeStart: KEYCODE_OFFSET.MACRO,
  categories: ["macros"],
});
const macros = Array(32)
  .fill()
  .map((_, index) => macro(index));

const dynmacro = (index) => ({
  code: KEYCODE_OFFSET.DYNAMIC_MACRO + index,
  label: { hint: { full: "Dynamic Macro", "1u": "DM" }, base: "#" + index.toString() },
  rangeStart: KEYCODE_OFFSET.DYNAMIC_MACRO,
  categories: ["dynmacros"],
});
const dynmacros = Array(32)
  .fill()
  .map((_, index) => dynmacro(index));

const leader = (index) => ({
  code: KEYCODE_OFFSET.LEAD + index,
  label: { hint: "Leader ", base: "#" + index.toString() },
  rangeStart: KEYCODE_OFFSET.LEAD,
  categories: ["leader"],
});
const leaders = Array(8)
  .fill()
  .map((_, index) => leader(index));

const tapdance = (index) => ({
  code: KEYCODE_OFFSET.TD + index,
  label: { hint: { full: "TapDance", "1u": "TD" }, base: "#" + index.toString() },
  rangeStart: KEYCODE_OFFSET.TD,
  categories: ["tapdance"],
});
const tapdances = Array(16)
  .fill()
  .map((_, index) => tapdance(index));

const stenokeys = addCategories(
  ["steno"],
  [
    { code: KEYCODE_OFFSET.STENO + 0, label: { hint: "Steno", base: "FN" } },
    { code: KEYCODE_OFFSET.STENO + 1, label: { hint: "Steno", base: "N1" } },
    { code: KEYCODE_OFFSET.STENO + 2, label: { hint: "Steno", base: "N2" } },
    { code: KEYCODE_OFFSET.STENO + 3, label: { hint: "Steno", base: "N3" } },
    { code: KEYCODE_OFFSET.STENO + 4, label: { hint: "Steno", base: "N4" } },
    { code: KEYCODE_OFFSET.STENO + 5, label: { hint: "Steno", base: "N5" } },
    { code: KEYCODE_OFFSET.STENO + 6, label: { hint: "Steno", base: "N6" } },
    { code: KEYCODE_OFFSET.STENO + 7, label: { hint: "Steno", base: "S1" } },
    { code: KEYCODE_OFFSET.STENO + 8, label: { hint: "Steno", base: "S2" } },
    { code: KEYCODE_OFFSET.STENO + 9, label: { hint: "Steno", base: "TL" } },
    { code: KEYCODE_OFFSET.STENO + 10, label: { hint: "Steno", base: "KL" } },
    { code: KEYCODE_OFFSET.STENO + 11, label: { hint: "Steno", base: "PL" } },
    { code: KEYCODE_OFFSET.STENO + 12, label: { hint: "Steno", base: "WL" } },
    { code: KEYCODE_OFFSET.STENO + 13, label: { hint: "Steno", base: "HL" } },
    { code: KEYCODE_OFFSET.STENO + 14, label: { hint: "Steno", base: "RL" } },
    { code: KEYCODE_OFFSET.STENO + 15, label: { hint: "Steno", base: "A" } },
    { code: KEYCODE_OFFSET.STENO + 16, label: { hint: "Steno", base: "O" } },
    { code: KEYCODE_OFFSET.STENO + 17, label: { hint: "Steno", base: "ST1" } },
    { code: KEYCODE_OFFSET.STENO + 18, label: { hint: "Steno", base: "ST2" } },
    { code: KEYCODE_OFFSET.STENO + 19, label: { hint: "Steno", base: "RE1" } },
    { code: KEYCODE_OFFSET.STENO + 20, label: { hint: "Steno", base: "RE2" } },
    { code: KEYCODE_OFFSET.STENO + 21, label: { hint: "Steno", base: "PWR" } },
    { code: KEYCODE_OFFSET.STENO + 22, label: { hint: "Steno", base: "ST3" } },
    { code: KEYCODE_OFFSET.STENO + 23, label: { hint: "Steno", base: "ST4" } },
    { code: KEYCODE_OFFSET.STENO + 24, label: { hint: "Steno", base: "E" } },
    { code: KEYCODE_OFFSET.STENO + 25, label: { hint: "Steno", base: "U" } },
    { code: KEYCODE_OFFSET.STENO + 26, label: { hint: "Steno", base: "FR" } },
    { code: KEYCODE_OFFSET.STENO + 27, label: { hint: "Steno", base: "RR" } },
    { code: KEYCODE_OFFSET.STENO + 28, label: { hint: "Steno", base: "PR" } },
    { code: KEYCODE_OFFSET.STENO + 29, label: { hint: "Steno", base: "BR" } },
    { code: KEYCODE_OFFSET.STENO + 30, label: { hint: "Steno", base: "LR" } },
    { code: KEYCODE_OFFSET.STENO + 31, label: { hint: "Steno", base: "GR" } },
    { code: KEYCODE_OFFSET.STENO + 32, label: { hint: "Steno", base: "TR" } },
    { code: KEYCODE_OFFSET.STENO + 33, label: { hint: "Steno", base: "SR" } },
    { code: KEYCODE_OFFSET.STENO + 34, label: { hint: "Steno", base: "DR" } },
    { code: KEYCODE_OFFSET.STENO + 35, label: { hint: "Steno", base: "N7" } },
    { code: KEYCODE_OFFSET.STENO + 36, label: { hint: "Steno", base: "N8" } },
    { code: KEYCODE_OFFSET.STENO + 37, label: { hint: "Steno", base: "N9" } },
    { code: KEYCODE_OFFSET.STENO + 38, label: { hint: "Steno", base: "NA" } },
    { code: KEYCODE_OFFSET.STENO + 39, label: { hint: "Steno", base: "NB" } },
    { code: KEYCODE_OFFSET.STENO + 40, label: { hint: "Steno", base: "NC" } },
    { code: KEYCODE_OFFSET.STENO + 41, label: { hint: "Steno", base: "ZR" } },
  ]
);
const ledkeys = addCategories(
  ["ledkeys"],
  [
    { code: KEYCODE_OFFSET.LED + 0, label: { hint: { full: "LEDEffect", "1u": "LED" }, base: "Next" } },
    {
      code: KEYCODE_OFFSET.LED + 1,
      label: { hint: { full: "LEDEffect", "1u": "LED" }, base: { full: "Previous", "1u": "Prev." } },
    },
    {
      code: KEYCODE_OFFSET.LED + 2,
      label: { hint: { full: "LEDEffect", "1u": "LED" }, base: { full: "Toggle", "1u": "Togg." } },
    },
  ]
);
const spacecadet = addCategories(
  ["spacecadet"],
  [
    {
      code: KEYCODE_OFFSET.SC + 0,
      label: { hint: { full: "SpaceCadet", "1u": "SC" }, base: { full: "Enable", "1u": "On" } },
    },
    {
      code: KEYCODE_OFFSET.SC + 1,
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
  .map((_, index) => layer(KEYCODE_OFFSET.LAYER + 42, "ShiftTo", "shifttolayer", index));
const lockToLayer = Array(32)
  .fill()
  .map((_, index) => layer(KEYCODE_OFFSET.LAYER, "LockTo", "locktolayer", index));
const moveToLayer = Array(32)
  .fill()
  .map((_, index) => layer(KEYCODE_OFFSET.LAYER + 84, "MoveTo", "movetolayer", index));
const layers = shiftToLayer.concat(lockToLayer).concat(moveToLayer);

const platform_apple = addCategories(
  ["platform_apple"],
  [
    {
      code: KEYCODE_OFFSET.CONSUMER + 0x29d,
      label: { base: { full: "Globe", "1u": "🌐" } },
    },
    {
      code: KEYCODE_OFFSET.CONSUMER + 0x19e,
      label: { base: { full: "Lock Screen", "1u": "Lock" } },
    },
    {
      code: KEYCODE_OFFSET.CONSUMER + 0x2a2,
      label: { base: { full: "Mission Control", "1u": "Mission" } },
    },
    {
      code: KEYCODE_OFFSET.CONSUMER + 0x29f,
      label: { base: { full: "Exposé" } },
    },
  ]
);
const lang_intl = addCategories(
  ["lang_intl"],
  [
    { code: 144, label: { base: { full: "Lang1" } } },
    { code: 145, label: { base: { full: "Lang2" } } },
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
  addCategories(
    ["modifier"],
    [
      { code: 224, label: { base: { full: "Control", "1u": "Ctrl" } }, location: "left" },
      { code: 225, label: { base: "Shift" }, location: "left" },
      { code: 226, label: { base: "Alt" }, location: "left" },
      { code: 227, label: { base: GuiLabel }, location: "left" },
      { code: 228, label: { base: { full: "Control", "1u": "Ctrl" } }, location: "right" },
      { code: 229, label: { base: "Shift" }, location: "right" },
      { code: 230, label: { base: { full: "AltGr", "1u": "AGr" } }, location: "right" },
      { code: 231, label: { base: GuiLabel }, location: "right" },
    ]
  )
).concat([
  // Custom modifier combos
  { code: 2530, baseCode: 226, categories: ["ctrl", "shift"], label: { base: "Meh" } },
  { code: 3043, baseCode: 227, categories: ["ctrl", "shift", "alt"], label: { base: "Hyper" } },
]);
const oneshot_modifier = (index, mod) => ({
  code: KEYCODE_OFFSET.OSM + index,
  label: { hint: { full: "OneShot", "1u": "OSM" }, base: mod },
  rangeStart: KEYCODE_OFFSET.OSM,
  categories: ["oneshot", "modifier"],
});
const oneshot_layer = (index) => ({
  code: KEYCODE_OFFSET.OSL + index,
  label: { hint: { full: "OneShot", "1u": "OSL" }, base: "#" + index.toString() },
  target: index,
  rangeStart: KEYCODE_OFFSET.OSL,
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
    code: KEYCODE_OFFSET.OS_META_STICKY,
    label: { hint: { full: "OneShot Sticky", "1u": "Sticky" }, base: "Next" },
    categories: ["oneshot"],
  },
  {
    code: KEYCODE_OFFSET.OS_ACTIVE_STICKY,
    label: { hint: { full: "OneShot Sticky", "1u": "Sticky" }, base: "Active" },
    categories: ["oneshot"],
  },
  {
    code: KEYCODE_OFFSET.OS_CANCEL,
    label: { hint: { full: "OneShot", "1u": "OS" }, base: "Cancel" },
    categories: ["oneshot"],
  },
];

const keySet = []
  .concat(baseKeyCodeTable)
  .concat(miscellaneous)
  .concat(numbered_f_keys)
  .concat(navigation)
  .concat(numpad)
  .concat(spacing);

const addDualUseLayer = (key, layer) => ({
  code: KEYCODE_OFFSET.DUL + layer * 256 + key.code,
  baseCode: key.code,
  label: { hint: "Layer #" + layer.toString() + "/", base: key.label.base },
  target: layer,
  rangeStart: KEYCODE_OFFSET.DUL,
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
  code: KEYCODE_OFFSET.DUM + dualUseModifiers[mod].index * 256 + key.code,
  baseCode: key.code,
  label: { hint: dualUseModifiers[mod].name + "/", base: key.label.base },
  modifier: dualUseModifiers[mod].name,
  rangeStart: KEYCODE_OFFSET.DUM,
  categories: ["modifier", "dualuse", mod],
});
const dual_use_layers = () => {
  const l = [];
  for (const k of keySet) {
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
  for (const k of keySet) {
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
  .concat(spacecadet)
  .concat(oneshot)
  .concat(dualuse)
  .concat(layers)
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

export { Base, USQwerty, addDualUseModifier, addDualUseLayer };
