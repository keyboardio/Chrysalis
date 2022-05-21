/* chrysalis-hardware-ez-ergodox -- Chrysalis ErgoDox support
 * Copyright (C) 2018-2022  Keyboardio, Inc.
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

import { teensy } from "@api/flash";
import Keymap from "./components/Keymap";

const ErgoDox = {
  info: {
    vendor: "EZ",
    product: "ErgoDox",
    displayName: "ErgoDox EZ",
    urls: [
      {
        name: "Homepage",
        url: "https://ergodox-ez.com/",
      },
    ],
  },
  usb: {
    vendorId: 0xfeed,
    productId: 0x1307,
  },
  keyboard: {
    rows: 14,
    columns: 6,
  },
  components: {
    keymap: Keymap,
  },

  flashSteps: ["saveEEPROM", "flash", "reconnect", "restoreEEPROM"],
  flash: async (_, filename, options) => {
    return teensy(filename, options);
  },
};

export { ErgoDox };
