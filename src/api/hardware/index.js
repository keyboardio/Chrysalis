/* Bazecor-hardware -- Bazecor Hardware library collection
 * Copyright (C) 2018, 2019  Keyboardio, Inc.
 * Copyright (C) 2019, 2020  DygmaLab SE
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

import { Raise_ANSI, Raise_ANSIBootloader } from "../hardware-dygma-raise-ansi";
import { Raise_ISO, Raise_ISOBootloader } from "../hardware-dygma-raise-iso";
import { Defy_wired, Defy_wiredBootloader } from "../hardware-dygma-defy-wired";
import { Defy_wireless, Defy_wirelessBootloader } from "../hardware-dygma-defy-wireless";

// const Hardware = {
//   serial: [Raise_ANSI, Raise_ISO, Raise_ANSIBootloader, Raise_ISOBootloader],
//   nonSerial: [],
//   bootloader: [Raise_ANSIBootloader, Raise_ISOBootloader]
// };

const Hardware = {
  serial: [Raise_ISO, Raise_ANSI, Defy_wired, Defy_wireless, Raise_ANSIBootloader, Raise_ISOBootloader, Defy_wirelessBootloader],
  nonSerial: [Defy_wiredBootloader],
  bootloader: [Raise_ANSIBootloader, Raise_ISOBootloader, Defy_wiredBootloader, Defy_wirelessBootloader]
};

export { Hardware as default };
