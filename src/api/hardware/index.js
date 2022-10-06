/* chrysalis-hardware -- Chrysalis Hardware library collection
 * Copyright (C) 2019-2022  Keyboardio, Inc.
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

import { ErgoDox } from "@api/hardware-ez-ergodox";
import { Atreus2 } from "@api/hardware-keyboardio-atreus2";
import { Model01, Model100 } from "@api/hardware-keyboardio-model01";
import { Splitography } from "@api/hardware-softhruf-splitography";
import { Atreus } from "@api/hardware-technomancy-atreus";

// We have two arrays here: the `serial` array contains hardware descriptors
// where a serial device is to be used in either application or bootloader mode.
// Similarly, the `nonSerial` array contains hardware descriptors where either
// the application or the bootloader mode is without a serial port.
//
// For example, in the case of the Model01 and the Keyboardio Atreus, both the
// bootloader and the application mode are accessed through a serial port, so
// they only appear in the `serial` array.
//
// In case of the Model100, the bootloader is *not* accessed via a serial port,
// but the application mode is, so it's in both.
//
// The non-keyboardio boards are in both arrays, to support discovering them
// when they're not running Kaleidoscope, and thus, do not expose a serial port.
const Hardware = {
  serial: [Model01, Model100, Atreus2, ErgoDox, Atreus, Splitography],
  nonSerial: [Model100, ErgoDox, Atreus, Splitography],
};

export { Hardware as default };
