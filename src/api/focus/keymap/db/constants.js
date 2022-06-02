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
    ONESHOT_CANCEL: 53630,
    BLOCKED: 65535,

    // Aliases
    FIRST_MODIFIER: 224,
    FIRST_ONESHOT_MODIFIER: 49153,
    EMPTY: 65535,
  },
  ranges: {
    standard: {
      start: 4,
      end: 255,
    },
  },
};
