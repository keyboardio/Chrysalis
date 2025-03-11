/* chrysalis-flash -- Keyboard flash helpers for Chrysalis
 * Copyright (C) 2022-2025  Keyboardio, Inc.
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

import logger from "@renderer/utils/Logger";
import DfuUpdates from "./nrf-dfu/DfuUpdates";
import DfuOperation from "./nrf-dfu/DfuOperation";
import DfuTransportWebSerial from "./nrf-dfu/DfuTransportWebSerial";
import { DfuError } from "./nrf-dfu/DfuError";

// Constants
const NORDIC_BAUD_RATE = 115200;
const DEFAULT_PRN = 16; // Packet Receipt Notification interval

/**
 * Delay helper function
 * @param {number} ms - Milliseconds to delay
 * @returns {Promise} - Promise that resolves after specified delay
 */
const delay = (ms) => new Promise((res) => setTimeout(res, ms));

/**
 * Reboots the device to application mode
 * @param {SerialPort} port - WebSerial port object
 * @param {Object} device - Device information object
 * @returns {Promise<void>}
 */
const rebootToApplicationMode = async (port, device) => {
  logger.debug("Rebooting to application mode");

  // In Nordic DFU, the device will automatically reset to application mode
  // after a successful firmware update, but we can force it here if needed
  try {
    const transport = new DfuTransportWebSerial(port, DEFAULT_PRN);
    await transport.open();
    await transport.abort();
    await transport.close();
    logger.debug("Successfully exited bootloader");
  } catch (error) {
    logger.error("Error exiting bootloader:", error);
    // Still try to close port in case of error
    try {
      await port.close();
    } catch (e) {
      logger.error("Error closing port:", e);
    }
  }
};

/**
 * Flash firmware to a Nordic device using DFU protocol
 * @param {SerialPort} port - WebSerial port object
 * @param {ArrayBuffer} fileContents - Firmware file contents as ArrayBuffer
 * @returns {Promise<void>}
 */
const flash = async (port, fileContents) => {
  logger.info("Starting NRF DFU flash process");

  return new Promise((resolve, reject) => {
    (async () => {
      try {
        // Ensure port is closed first
        if (port.readable || port.writable) {
          try {
            await port.close();
            await delay(500); // Give port time to close properly
          } catch (e) {
            logger.error("Error closing port", { error: e });
          }
        }

        // Open port with Nordic settings
        try {
          await port.open({ baudRate: NORDIC_BAUD_RATE });
          logger.debug("Port opened successfully");
        } catch (e) {
          logger.error("Error opening port", { error: e });
          reject(e);
          return;
        }

        // Parse firmware file (expecting a Nordic DFU .zip file)
        let dfuUpdates;
        try {
          dfuUpdates = await DfuUpdates.fromZipFile(fileContents);
          logger.debug("Firmware file parsed successfully");
        } catch (e) {
          logger.error("Error parsing firmware file", { error: e });
          reject(new Error("Invalid firmware file format. Expected a Nordic DFU .zip package."));
          await port.close();
          return;
        }

        // Create transport and DFU operation
        const transport = new DfuTransportWebSerial(port, DEFAULT_PRN);
        const operation = new DfuOperation(dfuUpdates, transport);

        // Start the update
        try {
          logger.info("Starting firmware update...");
          await operation.start();
          logger.info("Firmware update successful!");
          
          // Wait for device to reboot
          await delay(2000);
          
          // Close the port
          await transport.close();
          
          resolve();
        } catch (error) {
          logger.error("Error during firmware update", { error });

          // Try to close the port even if the update failed
          try {
            await transport.close();
          } catch (e) {
            logger.error("Error closing port after failed update", { error: e });
          }
          
          reject(error);
        }
      } catch (e) {
        logger.error("Unexpected error during flash process", { error: e });
        reject(e);
      }
    })();
  });
};

export const NRFDFUFlasher = { rebootToApplicationMode, flash };
