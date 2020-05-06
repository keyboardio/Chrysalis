/* chrysalis-hardware -- Chrysalis Hardware library collection
 * Copyright (C) 2019, 2020  Keyboardio, Inc.
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

import { Model01 } from "../hardware-keyboardio-model01";
import { Atreus } from "../hardware-technomancy-atreus";
import { Atreus2 } from "../hardware-keyboardio-atreus2";
import { Raise_ANSI } from "../hardware-dygma-raise-ansi";
import { Raise_ISO } from "../hardware-dygma-raise-iso";
import { ErgoDox } from "../hardware-ez-ergodox";
import { Planck } from "../hardware-olkb-planck";
import { KBD4x } from "../hardware-kbdfans-kbd4x";
import { Splitography } from "../hardware-softhruf-splitography";
import { GenericTeensy } from "../hardware-pjrc-teensy";

const Hardware = {
  serial: [
    Model01,
    Atreus2,
    Raise_ANSI,
    Raise_ISO,
    ErgoDox,
    Atreus,
    Planck,
    Splitography,
    KBD4x
  ],
  nonSerial: [ErgoDox, Atreus, Planck, Splitography, KBD4x, GenericTeensy]
};

export { Hardware as default };
