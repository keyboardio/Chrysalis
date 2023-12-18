/* chrysalis-flash -- Keyboard flash helpers for Chrysalis
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

const rebootToApplicationMode = async (port, device) => {
  console.debug("rebooting to application mode");
  /* TODO

  try {
    await runDFUUtil([
      "--device",
      formatDeviceUSBId(device.usb) +
        "," +
        formatDeviceUSBId(device.usb.bootloader),
      "--detach",
    ]);
  } catch (e) {
    if (e == runDFUError.HARD_FAIL) {
      throw e;
    }
  }
  */
};

const flash = async (board, port, filename, options) => {
  const callback = options
    ? options.callback
    : function () {
        return;
      };
  const device = options.device;

  /* TODO

  await runDFUUtil([
    "--device",
    formatDeviceUSBId(device.usb) +
      "," +
      formatDeviceUSBId(device.usb.bootloader),
    "--alt",
    "0",
    "--intf",
    "0",
    "--download",
    filename,
  ]);
  */
};

export const WebDFUFlasher = { rebootToApplicationMode, flash };
