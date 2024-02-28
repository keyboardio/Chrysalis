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
import logger from "@renderer/utils/Logger";

const rebootToApplicationMode = async (port, device) => {
  logger.debug("rebooting to application mode");
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

const flash = async (selectedDevice, filecontents) => {
  var enc = new TextDecoder("utf-8");

  // todo - i think that for 'selecteddevice' below, we want the port we passed in above.

  var firmwareFile = filecontents; //enc.decode(filecontents);
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
  let device;
  let transferSize = 1024;
  let manifestationTolerant = true;

  logger.log(" Selected device: ", selectedDevice);
  const interfaces = DFU.findDeviceDfuInterfaces(selectedDevice);
  logger.log(selectedDevice.productId);

  // XXX TODO -

  if (selectedDevice.productId === 0x0006) {
    logger.log(selectedDevice);
    logger.log("Your Model 100 is in keyboard mode");
  } else if (interfaces.length === 0) {
    logger.log(selectedDevice);
    logger.error("The selected device does not have any USB DFU interfaces.");
  } else {
    device = new DFUUSBDevice(selectedDevice, interfaces[0]);
    await device.fixInterfaceNames(interfaces);

    logger.log(device);
    if (interfaces.length === 1) {
      try {
        await device.open();
      } catch (error) {
        logger.log(error);
        // onDisconnect(error);
        throw error;
      }

      // Attempt to parse the DFU functional descriptor
      let desc = {};
      try {
        desc = await device.getDFUDescriptorProperties();
      } catch (error) {
        logger.log(error);

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
      logger.error("Multiple interfaces found, please write code that lets the user select one.");
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
        logger.log("Downloading firmware");
        logger.log("Transfer size:", transferSize);
        logger.log("Manifestation tolerant:", manifestationTolerant);
        logger.log("Firmware file:", firmwareFile);
        await device.do_download(transferSize, firmwareFile, manifestationTolerant);
        if (!manifestationTolerant) {
          try {
            await device.waitDisconnected(5000);
            // XXX TOOD onDisconnect();
            device = null;
          } catch (error) {
            logger.log("Device unexpectedly tolerated manifestation.");
          }
        } else {
          device.detach();
        }
      } catch (error) {
        logger.error(error);
      }
    } catch (error) {
      logger.error("Failed to clear status");
    }
  } else {
    logger.log("No device or firmware file", device, firmwareFile);
  }
};

const connect = async (device) => {
  return device;
};
export const WebDFUFlasher = { rebootToApplicationMode, flash };
