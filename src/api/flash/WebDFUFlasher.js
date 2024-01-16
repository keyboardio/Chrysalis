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
import { DFU, DFUUSBDevice, DFUDeviceState } from "./dfu";

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

const decoder = new TextDecoder();
const encoder = new TextEncoder();

const flash = async (port, filecontents) => {
  var enc = new TextDecoder("utf-8");

  // todo - i think that for 'selecteddevice' below, we want the port we passed in above.

  var firmwareFile = enc.decode(filecontents);
  /*
  if (device) {
    await device.close();
    onDisconnect();
    device = null;
  } else {
    const filters = [];
    if (serial) {
      filters.push({ serialNumber: serial });
    } else if (vid) {
      filters.push({ vendorId: vid });
    }
*/
  const filters = [];
  const selectedDevice = await navigator.usb.requestDevice({ filters });
  let device;
  let transferSize = 1024;
  let manifestationTolerant = true;

  const interfaces = DFU.findDeviceDfuInterfaces(selectedDevice);
  console.log(selectedDevice.productId);

  // XXX TODO -

  if (selectedDevice.productId === 0x0006) {
    console.log(selectedDevice);
    console.log("Your Model 100 is in keyboard mode");
  } else if (interfaces.length === 0) {
    console.log(selectedDevice);
    console.error("The selected device does not have any USB DFU interfaces.");
  } else {
    await DFU.fixInterfaceNames(interfaces);

    if (interfaces.length === 1) {
      try {
        await device.open();
      } catch (error) {
        console.log(error);
        // onDisconnect(error);
        throw error;
      }

      // Attempt to parse the DFU functional descriptor
      let desc = {};
      try {
        desc = await device.getDFUDescriptorProperties();
      } catch (error) {
        console.log(error);

        // onDisconnect(error);
        throw error;
      }

      if (desc && Object.keys(desc).length > 0) {
        device.properties = desc;

        transferSize = desc.TransferSize;
        if (desc.CanDnload) {
          manifestationTolerant = desc.ManifestationTolerant;
        }
      }
    } else {
      console.error(
        "Multiple interfaces found, please write code that lets the user select one."
      );
      /* populateInterfaceList(interfaceForm, selectedDevice, interfaces);
        interfaceForm.addEventListener("submit", async (event) => {
          event.preventDefault();
          const index = interfaceForm.elements["interfaceIndex"].value;
          device = await connect(
            new DFUUSBDevice(selectedDevice, interfaces[index])
          );
        });

        interfaceDialog.showModal();
        */
    }
  }

  if (device && firmwareFile != null) {
    try {
      const status = await device.getStatus();
      if (status.state === DFUDeviceState.dfuERROR) {
        await device.clearStatus();
      }

      try {
        await device.do_download(
          transferSize,
          firmwareFile,
          manifestationTolerant
        );
        if (!manifestationTolerant) {
          try {
            await device.waitDisconnected(5000);
            onDisconnect();
            device = null;
          } catch (error) {
            console.log("Device unexpectedly tolerated manifestation.");
          }
        } else {
          detach();
        }
      } catch (error) {
        console.error(error);
      }
    } catch (error) {
      console.error("Failed to clear status");
    }
  } else {
    console.log("No device or firmware file", device, firmwareFile);
  }
};

const connect = async (device) => {
  return device;
};
export const WebDFUFlasher = { rebootToApplicationMode, flash };
