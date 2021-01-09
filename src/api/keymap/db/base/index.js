/* Chrysalis -- Kaleidoscope Command Center
 * Copyright (C) 2020  Keyboardio, Inc.
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

import { blanks } from "./blanks";
import { modifiers } from "./modifiers";
import { numpad } from "./numpad";
import { navigation } from "./navigation";
import { fx } from "./fx";
import { spacing } from "./spacing";
import { miscellaneous } from "./misc";
import { consumer } from "./consumer";
import { mousekeys } from "./mousekeys";
import { macros } from "./macros";
import { leaders } from "./leader";
import { tapdances } from "./tapdance";
import { stenokeys } from "./steno";
import { ledkeys } from "./ledkeys";
import { spacecadet } from "./spacecadet";
import { oneshot } from "./oneshot";
import { layers } from "./layers";
import { dualuse } from "./dualuse";

const layout = [
  [
    41,
    53,
    30,
    31,
    32,
    33,
    34,
    35,
    36,
    37,
    38,
    39,
    45,
    46,
    42,
    73,
    74,
    75,
    83,
    84,
    85,
    86,
    58,
    59,
    60
  ],
  [
    43,
    20,
    26,
    8,
    21,
    23,
    28,
    24,
    12,
    18,
    19,
    47,
    48,
    49,
    76,
    77,
    78,
    95,
    96,
    97,
    87,
    61,
    62,
    63
  ],
  [57, 4, 22, 7, 9, 10, 11, 13, 14, 15, 51, 52, 50, 40, 92, 93, 94, 64, 65, 66],
  [
    225,
    100,
    29,
    27,
    6,
    25,
    5,
    17,
    16,
    54,
    55,
    56,
    229,
    82,
    89,
    90,
    91,
    88,
    67,
    68,
    69
  ],
  [224, 227, 226, 44, 230, 231, 101, 228, 80, 81, 79, 98, 99]
];

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
  .concat(leaders)
  .concat(tapdances)
  .concat(stenokeys)
  .concat(ledkeys)
  .concat(spacecadet)
  .concat(oneshot)
  .concat(dualuse)
  .concat(layers);

const Base = {
  codetable: keyCodeTable,
  layout: layout
};

export { Base };
