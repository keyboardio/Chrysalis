/* bazecor-hardware-dygma-raise -- Bazecor support for Dygma Raise
 * Copyright (C) 2018-2019 Keyboardio, Inc.
 * Copyright (C) 2019-2020 DygmaLab SE
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

import KeymapANSI from "./components/Keymap-ANSI";
import Focus from "../focus";

const Raise_ANSI = {
  info: {
    vendor: "Dygma",
    product: "Raise",
    keyboardType: "ANSI",
    displayName: "Dygma Raise ANSI",
    urls: [
      {
        name: "Homepage",
        url: "https://www.dygma.com/raise/"
      }
    ]
  },
  usb: {
    vendorId: 0x1209,
    productId: 0x2201
  },
  keyboard: {
    rows: 5,
    columns: 16
  },
  keyboardUnderglow: {
    rows: 6,
    columns: 22
  },
  components: {
    keymap: KeymapANSI
  },

  instructions: {
    en: {
      updateInstructions: `To update the firmware, the keyboard needs a special reset. When the countdown starts, press and hold the Escape key. Soon after the countdown finished, the Neuron's light should start a blue pulsing pattern, and the flashing will proceed. At this point, you should release the Escape key.`
    }
  },

  flash: async (_, filename, flashRaise, stateUpdate) => {
    return new Promise(async (resolve, reject) => {
      try {
        await flashRaise.updateFirmware(filename, stateUpdate);
        resolve();
      } catch (e) {
        reject(e);
      }
      flashRaise.saveBackupFile();
    });
  },

  isDeviceSupported: async port => {
    let focus = new Focus();
    let layout = localStorage.getItem(port.serialNumber);
    if (!layout) {
      focus._port && focus._port.path === port.path
        ? await focus.open(focus._port, port.device, null)
        : await focus.open(port.path, port.device, null);
      layout = await focus.command("hardware.layout");
      focus.close();
      localStorage.setItem(port.serialNumber, layout);
    }
    return layout.trim() === "ANSI";
  }
};

const Raise_ANSIBootloader = {
  info: {
    vendor: "Dygma",
    product: "Raise",
    keyboardType: "ANSI",
    displayName: "Dygma Raise ANSI",
    urls: [
      {
        name: "Homepage",
        url: "https://www.dygma.com/raise/"
      }
    ]
  },
  usb: {
    vendorId: 0x1209,
    productId: 0x2200
  },
  bootloader: true,
  instructions: {
    en: {
      updateInstructions: `To update the firmware, press the button at the bottom. You must not hold any key on the keyboard while the countdown is in progress, nor afterwards, until the flashing is finished. When the countdown reaches zero, the Neuron's light should start a blue pulsing pattern, and flashing will then proceed. `
    }
  },
  flash: async (_, filename, flashRaise, stateUpdate) => {
    return new Promise(async (resolve, reject) => {
      try {
        await flashRaise.updateFirmware(filename, stateUpdate);
        resolve();
      } catch (e) {
        reject(e);
      }
    });
  }
};

export { Raise_ANSI, Raise_ANSIBootloader };
