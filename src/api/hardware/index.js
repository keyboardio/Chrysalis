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

import {
  Model01,
  Model100,
  Model100Bootloader,
} from "@api/hardware-keyboardio-model01";
import { Atreus } from "@api/hardware-technomancy-atreus";
import { Atreus2 } from "@api/hardware-keyboardio-atreus2";
import { Raise_ANSI } from "@api/hardware-dygma-raise-ansi";
import { Raise_ISO } from "@api/hardware-dygma-raise-iso";
import { ErgoDox } from "@api/hardware-ez-ergodox";
import { Planck } from "@api/hardware-olkb-planck";
import { KBD4x } from "@api/hardware-kbdfans-kbd4x";
import { Splitography } from "@api/hardware-softhruf-splitography";
import { GenericTeensy } from "@api/hardware-pjrc-teensy";

const Hardware = {
  serial: [
    Model01,
    Model100,
    Atreus2,
    Raise_ANSI,
    Raise_ISO,
    ErgoDox,
    Atreus,
    Planck,
    Splitography,
    KBD4x,
  ],
  nonSerial: [
    Model100Bootloader,
    ErgoDox,
    Atreus,
    Planck,
    Splitography,
    KBD4x,
    GenericTeensy,
  ],
};

export { Hardware as default };
