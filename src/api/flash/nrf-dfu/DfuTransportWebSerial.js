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

import { DfuError, ErrorCode } from "./DfuError";
import DfuTransportSerial from "./DfuTransportSerial";
import * as slip from "./util/slip";
import logger from "@renderer/utils/Logger";

/**
 * WebSerial DFU transport for Nordic devices. This implementation is designed to work
 * with the Web Serial API available in modern browsers.
 */
export default class DfuTransportWebSerial extends DfuTransportSerial {
  /**
   * Progress callback function
   * Called during operations with progress information
   * @param {Object} info - Object with progress information: { offset, total }
   */
  onProgressChange = null;

  /**
   * Creates a new WebSerial DFU transport
   * @param {SerialPort} serialPort - The WebSerial port object
   * @param {number} packetReceiveNotification - PRN value (default: 16)
   */
  constructor(serialPort, packetReceiveNotification = 16) {
    super(serialPort, packetReceiveNotification);
    this.port = serialPort;
    this.reader = null;
    this.writer = null;
    this.readBuffer = [];
    this.slipDecoder = new slip.Decoder(this.onData.bind(this));
    this.isClosing = false;
  }

  /**
   * Opens the serial port and sets up readers/writers
   * @returns {Promise<void>}
   */
  async open() {
    logger.debug("Opening WebSerial transport");

    if (this.reader || this.writer) {
      logger.debug("Port already open");
      return Promise.resolve();
    }

    try {
      // Ensure port is open
      if (!this.port.readable || !this.port.writable) {
        await this.port.open({ baudRate: 115200 });
      }

      // Get the reader and writer
      this.reader = this.port.readable.getReader();
      this.writer = this.port.writable.getWriter();

      // Start the reading loop
      this.startReading();

      logger.debug("WebSerial transport opened successfully");
      return Promise.resolve();
    } catch (error) {
      logger.error("Error opening WebSerial transport:", error);
      return Promise.reject(new DfuError(ErrorCode.ERROR_UNABLE_FIND_PORT, error.message));
    }
  }

  /**
   * Starts the continuous reading loop from the serial port
   */
  async startReading() {
    if (this.isClosing) return;

    try {
      while (this.reader) {
        const { value, done } = await this.reader.read();

        if (done || this.isClosing) {
          break;
        }

        // Feed data to the SLIP decoder
        this.onRawData(value);
      }
    } catch (error) {
      if (!this.isClosing) {
        logger.error("Error in read loop:", error);
      }
    }
  }

  /**
   * Processes incoming raw data from the serial port
   * @param {Uint8Array} data - Raw data from the serial port
   */
  onRawData(data) {
    logger.debug("Received data:", new Uint8Array(data));
    this.slipDecoder.decode(data);
  }

  /**
   * Writes data to the serial port
   * @param {Uint8Array} data - Data to write
   * @returns {Promise<void>}
   */
  async writeToSerial(data) {
    if (!this.writer) {
      await this.open();
    }

    try {
      await this.writer.write(data);
      return Promise.resolve();
    } catch (error) {
      logger.error("Error writing to serial:", error);
      return Promise.reject(error);
    }
  }

  /**
   * Override of the writeCommand method to use WebSerial
   * @param {Uint8Array} bytes - Command bytes to send
   * @returns {Promise<void>}
   */
  async writeCommand(bytes) {
    let encoded = slip.encode(bytes);

    // Strip the heading 0xC0 character, as to avoid a bug in the nRF SDK implementation
    encoded = encoded.subarray(1);

    logger.debug("Sending command:", Array.from(bytes));

    return this.open().then(() => this.writeToSerial(encoded));
  }

  /**
   * Closes the serial port and releases all resources
   * @returns {Promise<void>}
   */
  async close() {
    logger.debug("Closing WebSerial transport");
    this.isClosing = true;

    // Close everything in reverse order
    if (this.reader) {
      try {
        await this.reader.cancel();
        this.reader.releaseLock();
        this.reader = null;
      } catch (error) {
        logger.error("Error closing reader:", error);
      }
    }

    if (this.writer) {
      try {
        this.writer.releaseLock();
        this.writer = null;
      } catch (error) {
        logger.error("Error closing writer:", error);
      }
    }

    if (this.port && this.port.readable) {
      try {
        await this.port.close();
      } catch (error) {
        logger.error("Error closing port:", error);
      }
    }

    this.isClosing = false;
    logger.debug("WebSerial transport closed");
    return Promise.resolve();
  }
}
