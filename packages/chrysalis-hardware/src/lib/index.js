/* chrysalis-hardware -- Chrysalis Hardware library collection
 * Copyright (C) 2019  Keyboardio, Inc.
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

import { Model01, Model01Bootloader } from "@chrysalis-api/hardware-keyboardio-model01"
import { Atreus } from "@chrysalis-api/hardware-technomancy-atreus"
import { Raise } from "@chrysalis-api/hardware-dygma-raise"
import { ErgoDox } from "@chrysalis-api/hardware-ez-ergodox"
import { Planck } from "@chrysalis-api/hardware-olkb-planck"
import { KBD4x } from "@chrysalis-api/hardware-kbdfans-kbd4x"
import { GenericTeensy } from "@chrysalis-api/hardware-pjrc-teensy"

const Hardware = {
  serial: [Model01, Raise, ErgoDox, Atreus, Planck, KBD4x],
  nonSerial: [Model01Bootloader, ErgoDox, Atreus, Planck, KBD4x, GenericTeensy]
}

export { Hardware as default }
