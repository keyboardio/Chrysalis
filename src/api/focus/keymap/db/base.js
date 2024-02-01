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

const fx = withModifiers([
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

const makeConsumer = (keyCode) => {
  return keyCode + 18432;
};

const consumer = addCategories(
  ["consumer"],
  [
    { code: makeConsumer(0xe2), label: { base: "Mute" } },
    { code: makeConsumer(0xb5), label: { base: { full: "Next track", "1u": "⏭" } } },
    { code: makeConsumer(0xb6), label: { base: { full: "Previous track", "1u": "⏮" } } },
    { code: makeConsumer(0xb7), label: { base: "Stop" } },
    { code: makeConsumer(0xcd), label: { base: { full: "Play / pause", "1u": "⏯" } } },
    { code: makeConsumer(0xe9), label: { hint: { full: "Volume", "1u": "Vol." }, base: { full: "Up", "1u": "🔊" } } },
    { code: makeConsumer(0xea), label: { hint: { full: "Volume", "1u": "Vol." }, base: { full: "Down", "1u": "🔉" } } },
    {
      code: makeConsumer(0x6f),
      label: { hint: { full: "Brightness", "1u": "Brght." }, base: { full: "Up", "1u": "🔆" } },
    },
    {
      code: makeConsumer(0x70),
      label: { hint: { full: "Brightness", "1u": "Brght." }, base: { full: "Down", "1u": "🔅" } },
    },
  ]
);

const mousekeys = addCategories(
  ["mousekeys"],
  [
    // Mouse movement
    { code: 20481, label: { hint: "Mouse", base: "Up" } },
    { code: 20482, label: { hint: "Mouse", base: "Down" } },
    { code: 20484, label: { hint: "Mouse", base: "Left" } },
    { code: 20488, label: { hint: "Mouse", base: "Right" } },
    // Mouse wheel
    { code: 20497, label: { hint: { full: "Mouse Wheel", "1u": "M.Whl" }, base: "Up" } },
    { code: 20498, label: { hint: { full: "Mouse Wheel", "1u": "M.Whl" }, base: "Down" } },
    { code: 20500, label: { hint: { full: "Mouse Wheel", "1u": "M.Whl" }, base: "Left" } },
    { code: 20504, label: { hint: { full: "Mouse Wheel", "1u": "M.Whl" }, base: "Right" } },
    // Mouse buttons
    { code: 20545, label: { hint: { full: "Mouse Button", "1u": "M.Btn" }, base: "Left" } },
    { code: 20546, label: { hint: { full: "Mouse Button", "1u": "M.Btn" }, base: "Right" } },
    { code: 20548, label: { hint: { full: "Mouse Button", "1u": "M.Btn" }, base: "Middle" } },
    { code: 20552, label: { hint: { full: "Mouse Button", "1u": "M.Btn" }, base: "Back" } },
    { code: 20560, label: { hint: { full: "Mouse Button", "1u": "M.Btn" }, base: "Forward" } },
    // Mouse warp
    { code: 20576, label: { hint: { full: "Mouse Warp", "1u": "Warp" }, base: "End" } },
    { code: 20513, label: { hint: { full: "Mouse Warp", "1u": "Warp" }, base: { full: "North", "1u": "North" } } },
    { code: 20514, label: { hint: { full: "Mouse Warp", "1u": "Warp" }, base: { full: "South", "1u": "South" } } },
    { code: 20515, label: { hint: { full: "Mouse Warp", "1u": "Warp" }, base: { full: "Zoom", "1u": "Zoom" } } },
    { code: 20516, label: { hint: { full: "Mouse Warp", "1u": "Warp" }, base: { full: "West", "1u": "West" } } },
    { code: 20517, label: { hint: { full: "Mouse Warp", "1u": "Warp" }, base: { full: "North-West", "1u": "NW" } } },
    { code: 20518, label: { hint: { full: "Mouse Warp", "1u": "Warp" }, base: { full: "South-West", "1u": "SW" } } },
    { code: 20520, label: { hint: { full: "Mouse Warp", "1u": "Warp" }, base: { full: "East", "1u": "East" } } },
    { code: 20521, label: { hint: { full: "Mouse Warp", "1u": "Warp" }, base: { full: "North-East", "1u": "NE" } } },
    { code: 20522, label: { hint: { full: "Mouse Warp", "1u": "Warp" }, base: { full: "South-East", "1u": "SE" } } },
  ]
);

const macro = (index) => ({
  code: 24576 + index,
  label: { hint: "Macro", base: "#" + index.toString() },
  rangeStart: 24576,
  categories: ["macros"],
});
const macros = Array(32)
  .fill()
  .map((_, index) => macro(index));

const dynmacro = (index) => ({
  code: 53596 + index,
  label: { hint: { full: "Dynamic Macro", "1u": "DM" }, base: "#" + index.toString() },
  rangeStart: 53596,
  categories: ["dynmacros"],
});
const dynmacros = Array(32)
  .fill()
  .map((_, index) => dynmacro(index));

const leader = (index) => ({
  code: 53283 + index,
  label: { hint: "Leader ", base: "#" + index.toString() },
  rangeStart: 53283,
  categories: ["leader"],
});
const leaders = Array(8)
  .fill()
  .map((_, index) => leader(index));

const tapdance = (index) => ({
  code: 53267 + index,
  label: { hint: { full: "TapDance", "1u": "TD" }, base: "#" + index.toString() },
  rangeStart: 53267,
  categories: ["tapdance"],
});
const tapdances = Array(16)
  .fill()
  .map((_, index) => tapdance(index));

const stenokeys = addCategories(
  ["steno"],
  [
    { code: 53549, label: { hint: "Steno", base: "FN" } },
    { code: 53550, label: { hint: "Steno", base: "N1" } },
    { code: 53551, label: { hint: "Steno", base: "N2" } },
    { code: 53552, label: { hint: "Steno", base: "N3" } },
    { code: 53553, label: { hint: "Steno", base: "N4" } },
    { code: 53554, label: { hint: "Steno", base: "N5" } },
    { code: 53555, label: { hint: "Steno", base: "N6" } },
    { code: 53556, label: { hint: "Steno", base: "S1" } },
    { code: 53557, label: { hint: "Steno", base: "S2" } },
    { code: 53558, label: { hint: "Steno", base: "TL" } },
    { code: 53559, label: { hint: "Steno", base: "KL" } },
    { code: 53560, label: { hint: "Steno", base: "PL" } },
    { code: 53561, label: { hint: "Steno", base: "WL" } },
    { code: 53562, label: { hint: "Steno", base: "HL" } },
    { code: 53563, label: { hint: "Steno", base: "RL" } },
    { code: 53564, label: { hint: "Steno", base: "A" } },
    { code: 53565, label: { hint: "Steno", base: "O" } },
    { code: 53566, label: { hint: "Steno", base: "ST1" } },
    { code: 53567, label: { hint: "Steno", base: "ST2" } },
    { code: 53568, label: { hint: "Steno", base: "RE1" } },
    { code: 53569, label: { hint: "Steno", base: "RE2" } },
    { code: 53570, label: { hint: "Steno", base: "PWR" } },
    { code: 53571, label: { hint: "Steno", base: "ST3" } },
    { code: 53572, label: { hint: "Steno", base: "ST4" } },
    { code: 53573, label: { hint: "Steno", base: "E" } },
    { code: 53574, label: { hint: "Steno", base: "U" } },
    { code: 53575, label: { hint: "Steno", base: "FR" } },
    { code: 53576, label: { hint: "Steno", base: "RR" } },
    { code: 53577, label: { hint: "Steno", base: "PR" } },
    { code: 53578, label: { hint: "Steno", base: "BR" } },
    { code: 53579, label: { hint: "Steno", base: "LR" } },
    { code: 53580, label: { hint: "Steno", base: "GR" } },
    { code: 53581, label: { hint: "Steno", base: "TR" } },
    { code: 53582, label: { hint: "Steno", base: "SR" } },
    { code: 53583, label: { hint: "Steno", base: "DR" } },
    { code: 53584, label: { hint: "Steno", base: "N7" } },
    { code: 53585, label: { hint: "Steno", base: "N8" } },
    { code: 53586, label: { hint: "Steno", base: "N9" } },
    { code: 53587, label: { hint: "Steno", base: "NA" } },
    { code: 53588, label: { hint: "Steno", base: "NB" } },
    { code: 53589, label: { hint: "Steno", base: "NC" } },
    { code: 53590, label: { hint: "Steno", base: "ZR" } },
  ]
);
const ledkeys = addCategories(
  ["ledkeys"],
  [
    { code: 17152, label: { hint: { full: "LEDEffect", "1u": "LED" }, base: "Next" } },
    { code: 17153, label: { hint: { full: "LEDEffect", "1u": "LED" }, base: { full: "Previous", "1u": "Prev." } } },
    { code: 17154, label: { hint: { full: "LEDEffect", "1u": "LED" }, base: { full: "Toggle", "1u": "Togg." } } },
  ]
);
const spacecadet = addCategories(
  ["spacecadet"],
  [
    { code: 53592, label: { hint: { full: "SpaceCadet", "1u": "SC" }, base: { full: "Enable", "1u": "On" } } },
    { code: 53593, label: { hint: { full: "SpaceCadet", "1u": "SC" }, base: { full: "Disable", "1u": "Off" } } },
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
  .map((_, index) => layer(17450, "ShiftTo", "shifttolayer", index));
const lockToLayer = Array(32)
  .fill()
  .map((_, index) => layer(17408, "LockTo", "locktolayer", index));
const moveToLayer = Array(32)
  .fill()
  .map((_, index) => layer(17492, "MoveTo", "movetolayer", index));
const layers = shiftToLayer.concat(lockToLayer).concat(moveToLayer);

const platform_apple = addCategories(
  ["platform_apple"],
  [
    {
      code: 19101, // 0x29D
      label: { base: { full: "Globe", "1u": "🌐" } },
    },
    {
      code: 18846, // 0x19E
      label: { base: { full: "Lock Screen", "1u": "Lock" } },
    },
    {
      code: 19106, // 0x2A2
      label: { base: { full: "Mission Control", "1u": "Mission" } },
    },
    {
      code: 19103, // 0x29F
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
  code: 49153 + index,
  label: { hint: { full: "OneShot", "1u": "OSM" }, base: mod },
  rangeStart: 49153,
  categories: ["oneshot", "modifier"],
});
const oneshot_layer = (index) => ({
  code: 49161 + index,
  label: { hint: { full: "OneShot", "1u": "OSL" }, base: "#" + index.toString() },
  target: index,
  rangeStart: 49161,
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
  { code: 53628, label: { hint: { full: "OneShot Sticky", "1u": "Sticky" }, base: "Next" }, categories: ["oneshot"] },
  { code: 53629, label: { hint: { full: "OneShot Sticky", "1u": "Sticky" }, base: "Active" }, categories: ["oneshot"] },
  { code: 53630, label: { hint: { full: "OneShot", "1u": "OS" }, base: "Cancel" }, categories: ["oneshot"] },
];

const keySet = []
  .concat(baseKeyCodeTable)
  .concat(miscellaneous)
  .concat(fx)
  .concat(navigation)
  .concat(numpad)
  .concat(spacing);

const addDualUseLayer = (key, layer) => ({
  code: 51218 + layer * 256 + key.code,
  baseCode: key.code,
  label: { hint: "Layer #" + layer.toString() + "/", base: key.label.base },
  target: layer,
  rangeStart: 51218,
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
  code: 49169 + dualUseModifiers[mod].index * 256 + key.code,
  baseCode: key.code,
  label: { hint: dualUseModifiers[mod].name + "/", base: key.label.base },
  modifier: dualUseModifiers[mod].name,
  rangeStart: 49169,
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
  .concat(fx)
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
