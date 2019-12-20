/* Bazecor-hardware -- Bazecor Hardware library collection
 * Copyright (C) 2018, 2019  Keyboardio, Inc.
 * Copyright (C) 2019  DygmaLab SE
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

import { Model01, Model01Bootloader } from "@bazecor-api/hardware-keyboardio-model01"
import { Atreus } from "@bazecor-api/hardware-technomancy-atreus"
import { Raise_ANSI, Raise_ANSIBootloader } from "@bazecor-api/hardware-dygma-raise-ansi";
import { Raise_ISO, Raise_ISOBootloader } from "@bazecor-api/hardware-dygma-raise-iso";
import { ErgoDox } from "@bazecor-api/hardware-ez-ergodox"
import { Planck } from "@bazecor-api/hardware-olkb-planck"
import { KBD4x } from "@bazecor-api/hardware-kbdfans-kbd4x"
import { Splitography } from "@bazecor-api/hardware-softhruf-splitography"
import { GenericTeensy } from "@bazecor-api/hardware-pjrc-teensy"

const Hardware = {
  serial: [Model01, Raise_ANSI, Raise_ISO, ErgoDox, Atreus, Planck, Splitography, KBD4x],
  nonSerial: [Model01Bootloader, Raise_ANSIBootloader, Raise_ISOBootloader, ErgoDox, Atreus, Planck, Splitography, KBD4x, GenericTeensy]
}

export { Hardware as default }
