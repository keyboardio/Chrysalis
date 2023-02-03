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

import KeymapDEFY from "./components/Keymap";
import Focus from "../focus";

const Defy_wired = {
  info: {
    vendor: "Dygma",
    product: "Defy",
    keyboardType: "wired",
    displayName: "Dygma Defy wired",
    urls: [
      {
        name: "Homepage",
        url: "https://www.dygma.com/defy/"
      }
    ]
  },
  usb: {
    vendorId: 0xffff,
    productId: 0x800a
  },
  keyboard: {
    rows: 5,
    columns: 16
  },
  keyboardUnderglow: {
    rows: 2,
    columns: 89
  },
  RGBWMode: true,
  components: {
    keymap: KeymapDEFY
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
    // let focus = new Focus();
    // let layout = localStorage.getItem(port.serialNumber);
    // if (!layout) {
    //   focus._port && focus._port.path === port.path
    //     ? await focus.open(focus._port, port.device)
    //     : await focus.open(port.path, port.device);
    //   layout = await focus.command("hardware.layout");
    //   focus.close();
    //   localStorage.setItem(port.serialNumber, layout);
    // }
    // return layout.trim() === "ANSI";
    return 1;
  }
};

const Defy_wiredBootloader = {
  info: {
    vendor: "Dygma",
    product: "Defy",
    keyboardType: "wired",
    displayName: "Dygma Defy wired",
    urls: [
      {
        name: "Homepage",
        url: "https://www.dygma.com/defy/"
      }
    ]
  },
  usb: {
    vendorId: 0xffff,
    productId: 0x800b
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

export { Defy_wired, Defy_wiredBootloader };
