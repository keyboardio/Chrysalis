/* Chrysalis -- Kaleidoscope Command Center
 * Copyright (C) 2022  Keyboardio, Inc.
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

const keycode_ranges = {
  standard: {
    start: 4,
    end: 255,
  },
  dual_use_layer: {
    start: 0xc812,
    end: 0xd012,
  },
  dual_use_modifier: {
    start: 0xc011,
    end: 0xc811,
  },
  oneshot_layer: {
    start: 0xc009,
    end: 0xc010,
  },
  oneshot_modifier: {
    start: 0xc001,
    end: 0xc008,
  },
  steno: {
    start: 0xd12d,
    end: 0xd16f,
  },
  consumer: {
    start: 0x4800,
  },
  mouse: {
    start: 0x5000,
    warp: 0x20,
    button: 0x40,
    move: 0x00,
    wheel: 0x10,
  },
  macro: { start: 0x6000 },
  leader: { start: 0xd023, end: 0xd02a },
  dynamic_macro: { start: 0xd174, end: 0xd192 },
  led: { start: 0x4300 },
  layer: { start: 0x4400 },
  tapdance: { start: 0xd013, end: 0xd022 },
  spacecadet: { start: 0xd170, end: 0xd171 },
};
export const constants = {
  codes: {
    // Keycodes
    ESCAPE: 41,
    LEFT_CONTROL: 224,
    LEFT_SHIFT: 225,
    LEFT_ALT: 226,
    LEFT_GUI: 227,
    RIGHT_CONTROL: 228,
    RIGHT_SHIFT: 229,
    RIGHT_ALT: 230,
    RIGHT_GUI: 231,
    MOUSE_WARP_NW: keycode_ranges.mouse.start | 0x25,
    MOUSE_WARP_NE: keycode_ranges.mouse.start | 0x29,
    MOUSE_WARP_SW: keycode_ranges.mouse.start | 0x26,
    MOUSE_WARP_SE: keycode_ranges.mouse.start | 0x2a,
    MOUSE_WARP_N: keycode_ranges.mouse.start | 0x21,
    MOUSE_WARP_S: keycode_ranges.mouse.start | 0x22,
    MOUSE_WARP_Z: keycode_ranges.mouse.start | 0x23,
    MOUSE_WARP_W: keycode_ranges.mouse.start | 0x24,
    MOUSE_WARP_E: keycode_ranges.mouse.start | 0x28,
    MOUSE_WARP_END: keycode_ranges.mouse.start | 0x60,
    MOUSE_BUTTON_LEFT: keycode_ranges.mouse.start | 0x41,
    MOUSE_BUTTON_MIDDLE: keycode_ranges.mouse.start | 0x44,
    MOUSE_BUTTON_RIGHT: keycode_ranges.mouse.start | 0x42,
    MOUSE_BUTTON_BACK: keycode_ranges.mouse.start | 0x48,
    MOUSE_BUTTON_FORWARD: keycode_ranges.mouse.start | 0x50,
    MOUSE_MOVE_UP: keycode_ranges.mouse.start | 0x1,
    MOUSE_MOVE_LEFT: keycode_ranges.mouse.start | 0x4,
    MOUSE_MOVE_DOWN: keycode_ranges.mouse.start | 0x2,
    MOUSE_MOVE_RIGHT: keycode_ranges.mouse.start | 0x8,
    MOUSE_WHEEL_UP: keycode_ranges.mouse.start | 0x11,
    MOUSE_WHEEL_DOWN: keycode_ranges.mouse.start | 0x12,
    MOUSE_WHEEL_LEFT: keycode_ranges.mouse.start | 0x14,
    MOUSE_WHEEL_RIGHT: keycode_ranges.mouse.start | 0x18,

    CONSUMER_MEDIA_PREV_TRACK: keycode_ranges.consumer.start | 0x82,
    CONSUMER_MEDIA_NEXT_TRACK: keycode_ranges.consumer.start | 0x81,
    CONSUMER_MEDIA_STOP: keycode_ranges.consumer.start | 0x83,
    CONSUMER_MEDIA_PLAY_PAUSE: keycode_ranges.consumer.start | 0xa5,
    CONSUMER_MEDIA_MUTE: keycode_ranges.consumer.start | 0xda,
    CONSUMER_MEDIA_VOLUME_UP: keycode_ranges.consumer.start | 0xe1,
    CONSUMER_MEDIA_VOLUME_DOWN: keycode_ranges.consumer.start | 0xe2,
    CONSUMER_BRIGHTNESS_UP: keycode_ranges.consumer.start | 0x4b,
    CONSUMER_BRIGHTNESS_DOWN: keycode_ranges.consumer.start | 0x4c,

    ONESHOT_META_STICKY: 53628,
    ONESHOT_ACTIVE_STICKY: 53629,
    ONESHOT_CANCEL: 53630,
    BLOCKED: 65535,
    TRANSPARENT: 0x00,

    // Dual use keycodes
    DUAL_USE_MODIFIER_BASE: 49169,
    DUAL_USE_LAYER_BASE: 51218,
    // Aliases
    FIRST_MODIFIER: 224,
    FIRST_ONESHOT_MODIFIER: 49153,
    EMPTY: 65535,
  },
  ranges: keycode_ranges,
};

// Most of these numbers come from the Kaleidoscope-Ranges plugin
// They represent the offsets of eeprom-stored key codes for various types of key.
// almost all of them are included in the constants range above.
// TODO - once it's verified that they're all in there, delete this range.
/*
const _PRIVATE_KEYCODE_OFFSET_NEVER_INCLUDE_IN_CODE = {
  LAYER: 17408, // 0x4400,
  LED: 17152, // 0x4300,
  CONSUMER: 18432, // 0x4800,
  MOUSE: 20480, // 0x5000,
  MACRO: 24576, // 0x6000,
  OS: 49153, // 0xc001
  ONESHOT_MODIFIER: 49153, // 0xc001
  OSM_LAST: 49160, // 0xc008
  ONESHOT_LAYER: 49161, // 0xc009
  OSL_LAST: 49168, // 0xc010
  OS_LAST: 49168, // 0xc010
  DU: 49169, // 0xc011
  DUAL_USE_MODIFIER: 49169, // 0xc011
  DUM_LAST: 51217, // 0xc811
  DUAL_USE_LAYER: 51218, // 0xc812
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

*/
