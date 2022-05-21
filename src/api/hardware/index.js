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
import {
  Model01,
  Model100,
  Model100Bootloader,
} from "@api/hardware-keyboardio-model01";
import { Splitography } from "@api/hardware-softhruf-splitography";
import { Atreus } from "@api/hardware-technomancy-atreus";

const Hardware = {
  serial: [Model01, Model100, Atreus2, ErgoDox, Atreus, Splitography],
  nonSerial: [Model100Bootloader, ErgoDox, Atreus, Splitography],
};

export { Hardware as default };
