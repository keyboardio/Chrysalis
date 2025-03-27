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

// Import from Adafruit implementation
import { DfuTransportSerial } from "./Adafruit_nRF52_nrfutil_js/lib/transport/serial.js";
import { Package } from "./Adafruit_nRF52_nrfutil_js/lib/package.js";
import { Dfu } from "./Adafruit_nRF52_nrfutil_js/lib/dfu.js";
import { DfuEvent } from "./Adafruit_nRF52_nrfutil_js/lib/models.js";

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
 * Creates a DfuTransportSerial instance configured for WebSerial
 * @param {SerialPort} port - WebSerial port object
 * @returns {DfuTransportSerial} - Configured transport
 */
const createDfuTransport = (port, skipDtrReset = false) => {
  const transport = new DfuTransportSerial({
    port: port,         // Pass the WebSerial port
    baudRate: NORDIC_BAUD_RATE,
    flowControl: false,
    singleBank: false,
    packetReceiptNotification: DEFAULT_PRN,
    skipDtrReset: skipDtrReset // Skip DTR reset if requested (when already in bootloader mode)
  });
  
  return transport;
};

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
    const transport = createDfuTransport(port, true);
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
 * @param {Function} onProgress - Optional callback for progress updates (0-100)
 * @returns {Promise<void>}
 */
const flash = async (port, fileContents, onProgress) => {
  logger.info("Starting NRF DFU flash process");

  // Report initial progress
  if (onProgress) {
    onProgress(0);
  }

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

        // Report progress - connection established
        if (onProgress) {
          onProgress(5);
        }

        // Create DFU transport - device is already in bootloader mode, so skip DTR reset
        const transport = createDfuTransport(port, true);
        
        // Set up progress reporting
        let lastProgress = 20;
        
        // Register for DFU progress events
        transport.registerEventsCallback(DfuEvent.PROGRESS_EVENT, (data) => {
          if (onProgress && data.progress !== undefined) {
            // Map the 0-100 progress to our 20-90 range
            const overallProgress = Math.floor(20 + data.progress * 0.7);
            
            // Only report if progress has increased
            if (overallProgress > lastProgress) {
              lastProgress = overallProgress;
              onProgress(Math.min(90, overallProgress));
            }
          }
        });
        
        // Register error events
        transport.registerEventsCallback(DfuEvent.ERROR_EVENT, (data) => {
          logger.error("DFU error event:", data.message || "Unknown error");
        });
        
        // Register timeout events
        transport.registerEventsCallback(DfuEvent.TIMEOUT_EVENT, (data) => {
          logger.error("DFU timeout event:", data.message || "Operation timed out");
        });

        // Open port with Nordic settings
        try {
          await transport.open();
          logger.debug("Port opened successfully");
        } catch (e) {
          logger.error("Error opening port", { error: e });
          reject(e);
          return;
        }

        // Report progress - port opened
        if (onProgress) {
          onProgress(10);
        }

        // Unpack firmware file (expecting a Nordic DFU .zip file)
        let packageInfo;
        try {
          packageInfo = await Package.unpackPackage(fileContents);
          logger.debug("Firmware file parsed successfully");
        } catch (e) {
          logger.error("Error parsing firmware file", { error: e });
          reject(new Error("Invalid firmware file format. Expected a Nordic DFU .zip package."));
          await transport.close();
          return;
        }

        // Report progress - firmware file parsed
        if (onProgress) {
          onProgress(20);
        }

        // Create DFU instance
        const dfuInstance = new Dfu(fileContents, transport);
        
        // Initialize DFU with unpacked data (this just unpacks the package again internally)
        await dfuInstance.initialize();

        // Start the update
        try {
          logger.info("Starting firmware update...");
          await dfuInstance.executeDfu();
          logger.info("Firmware update successful!");
          
          // Wait for device to reboot
          await delay(2000);

          // Transport should be closed by the DFU process already, but just in case
          if (transport.isOpen()) {
            await transport.close();
          }

          // Report progress - firmware update complete
          if (onProgress) {
            onProgress(95);
          }

          // Report progress - process complete
          if (onProgress) {
            onProgress(100);
          }

          resolve();
        } catch (error) {
          logger.error("Error during firmware update", { error });

          // Try to close the port even if the update failed
          try {
            if (transport.isOpen()) {
              await transport.close();
            }
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
