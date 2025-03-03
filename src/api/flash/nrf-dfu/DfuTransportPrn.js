/**
 * Adapted from Nordic Semiconductor's nRF DFU JavaScript implementation:
 * 
 * copyright (c) 2015 - 2018, Nordic Semiconductor ASA
 *
 * all rights reserved.
 *
 * redistribution and use in source and binary forms, with or without modification,
 * are permitted provided that the following conditions are met:
 *
 * 1. redistributions of source code must retain the above copyright notice, this
 *    list of conditions and the following disclaimer.
 *
 * 2. redistributions in binary form, except as embedded into a nordic
 *    semiconductor asa integrated circuit in a product or a software update for
 *    such product, must reproduce the above copyright notice, this list of
 *    conditions and the following disclaimer in the documentation and/or other
 *    materials provided with the distribution.
 *
 * 3. neither the name of Nordic Semiconductor ASA nor the names of its
 *    contributors may be used to endorse or promote products derived from this
 *    software without specific prior written permission.
 *
 * 4. this software, with or without modification, must only be used with a
 *    Nordic Semiconductor ASA integrated circuit.
 *
 * 5. any software provided in binary form under this license must not be reverse
 *    engineered, decompiled, modified and/or disassembled.
 *
 * this software is provided by Nordic Semiconductor ASA "as is" and any express
 * or implied warranties, including, but not limited to, the implied warranties
 * of merchantability, noninfringement, and fitness for a particular purpose are
 * disclaimed. in no event shall Nordic Semiconductor ASA or contributors be
 * liable for any direct, indirect, incidental, special, exemplary, or
 * consequential damages (including, but not limited to, procurement of substitute
 * goods or services; loss of use, data, or profits; or business interruption)
 * however caused and on any theory of liability, whether in contract, strict
 * liability, or tort (including negligence or otherwise) arising in any way out
 * of the use of this software, even if advised of the possibility of such damage.
 *
 * Adapted for WebSerial and Chrysalis:
 * 
 * chrysalis-flash -- Keyboard flash helpers for Chrysalis
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

import crc32 from "./util/crc32";
import { DfuError, ErrorCode, ResponseErrorMessages, ExtendedErrorMessages } from "./DfuError";
import DfuAbstractTransport from "./DfuAbstractTransport";
import logger from "@renderer/utils/Logger";

/**
 * PRN-capable abstract DFU transport.
 *
 * This abstract class inherits from DfuAbstractTransport, and implements
 * PRN (Packet Receive Notification) and the splitting of a page of data
 * into smaller chunks.
 */
export default class DfuTransportPrn extends DfuAbstractTransport {
  /**
   * Creates a new PRN transport
   * @param {number} packetReceiveNotification - PRN value (default: 16)
   */
  constructor(packetReceiveNotification = 16) {
    super();

    if (this.constructor === DfuTransportPrn) {
      throw new DfuError(ErrorCode.ERROR_CAN_NOT_INIT_PRN_TRANSPORT);
    }

    if (packetReceiveNotification > 0xFFFF) { // Ensure it fits in 16 bits
      throw new DfuError(ErrorCode.ERROR_CAN_NOT_USE_HIGHER_PRN);
    }

    this.prn = packetReceiveNotification;

    // Store *one* message waiting to be read()
    this.lastReceivedPacket = undefined;

    // Store *one* reference to a read() callback function
    this.waitingForPacket = undefined;

    // Maximum Transmission Unit. The maximum amount of bytes that can be sent to a
    // writeData() call. Its value **must** be filled in by the concrete subclasses
    // before any data is sent.
    this.mtu = undefined;
  }

  // Abstract methods to be implemented by subclasses

  /**
   * Sends the bytes into the wire/air.
   * @param {Uint8Array} bytes - Command bytes to send (includes opcode and payload)
   * @returns {Promise<void>}
   */
  writeCommand(bytes) {
    throw new Error("writeCommand must be implemented by subclass");
  }

  /**
   * Sends data bytes into the wire/air.
   * @param {Uint8Array} bytes - Data bytes to send
   * @returns {Promise<void>}
   */
  writeData(bytes) {
    throw new Error("writeData must be implemented by subclass");
  }

  /**
   * Prepares the connection for a DFU operation.
   * @returns {Promise<void>}
   */
  ready() {
    throw new Error("ready must be implemented by subclass");
  }

  /**
   * Requests a parsed packet/message.
   * @returns {Promise<Array>} - Promise to [opcode, Uint8Array]
   */
  read() {
    if (this.waitingForPacket) {
      throw new DfuError(ErrorCode.ERROR_READ_CONFLICT);
    }

    if (this.lastReceivedPacket) {
      const packet = this.lastReceivedPacket;
      delete this.lastReceivedPacket;
      return Promise.resolve(packet);
    }

    // Store the callback so it can be called as soon as the wire packet is
    // ready. Add a 5sec timeout while we're at it; remove that timeout
    // when data is actually received.
    return new Promise((res, rej) => {
      let timeout;

      const readCallback = (data => {
        clearTimeout(timeout);
        res(data);
      });

      timeout = setTimeout(() => {
        if (this.waitingForPacket && this.waitingForPacket === readCallback) {
          delete this.waitingForPacket;
        }
        rej(new DfuError(ErrorCode.ERROR_TIMEOUT_READING_SERIAL));
      }, 5000);

      this.waitingForPacket = readCallback;
    });
  }

  /**
   * Called when a complete packet/message is received.
   * @param {Uint8Array} bytes - Message bytes
   * @returns {void}
   */
  onData(bytes) {
    if (this.lastReceivedPacket) {
      throw new DfuError(ErrorCode.ERROR_RECEIVE_TWO_MESSAGES);
    }

    if (this.waitingForPacket) {
      const callback = this.waitingForPacket;
      delete this.waitingForPacket;
      return callback(this.parse(bytes));
    }

    this.lastReceivedPacket = this.parse(bytes);
    return undefined;
  }

  /**
   * Parses a received DFU response packet/message.
   * @param {Uint8Array} bytes - Message bytes
   * @returns {Promise<Array>} - Promise to [opcode, payload]
   */
  parse(bytes) {
    if (bytes[0] !== 0x60) {
      return Promise.reject(new DfuError(ErrorCode.ERROR_RESPONSE_NOT_START_WITH_0x60));
    }
    const opcode = bytes[1];
    const resultCode = bytes[2];
    if (resultCode === 1) { // SUCCESS
      logger.debug("Parsed DFU response packet: opcode ", opcode, ", payload: ", bytes.subarray(3));
      return Promise.resolve([opcode, bytes.subarray(3)]);
    }

    let errorCode;
    let errorStr;
    const extCode = ErrorCode.ERROR_RSP_EXT_ERROR - (ErrorCode.ERROR_MESSAGE_RSP << 8);
    const resultCodeRsp = (ErrorCode.ERROR_MESSAGE_RSP << 8) + resultCode;
    if (resultCodeRsp in ResponseErrorMessages) {
      errorCode = resultCodeRsp;
    } else if (resultCode === extCode) {
      const extendedErrorCode = bytes[3];
      const resultCodeExt = (ErrorCode.ERROR_MESSAGE_EXT << 8) + extendedErrorCode;
      if (resultCodeExt in ExtendedErrorMessages) {
        errorCode = resultCodeExt;
      } else {
        errorStr = `0x0B 0x${extendedErrorCode.toString(16)}`;
        errorCode = ErrorCode.ERROR_EXT_ERROR_CODE_UNKNOWN;
      }
    } else {
      errorStr = `0x${resultCode.toString(16)}`;
      errorCode = ErrorCode.ERROR_RSP_OPCODE_UNKNOWN;
    }

    logger.debug("Error:", errorCode, errorStr);
    return Promise.reject(new DfuError(errorCode, errorStr));
  }

  /**
   * Returns a function that checks a [opcode, bytes] parameter against the given
   * opcode and byte length, and returns only the bytes.
   * @param {number} expectedOpcode - Expected opcode
   * @param {number} expectedLength - Expected payload length
   * @returns {Function} - Function that asserts the packet format
   */
  assertPacket(expectedOpcode, expectedLength) {
    return response => {
      if (!response) {
        logger.debug("Tried to assert an empty parsed response!");
        throw new DfuError(ErrorCode.ERROR_ASSERT_EMPTY_RESPONSE);
      }
      const [opcode, bytes] = response;

      if (opcode !== expectedOpcode) {
        throw new DfuError(ErrorCode.ERROR_UNEXPECTED_RESPONSE_OPCODE, `Expected opcode ${expectedOpcode}, got ${opcode} instead.`);
      }

      if (bytes.length !== expectedLength) {
        throw new DfuError(ErrorCode.ERROR_UNEXPECTED_RESPONSE_BYTES, `Expected ${expectedLength} bytes in response to opcode ${expectedOpcode}, got ${bytes.length} bytes instead.`);
      }

      return bytes;
    };
  }

  /**
   * Creates a new Object in the DFU target.
   * @param {number} type - Object type (1: command, 2: data)
   * @param {number} size - Object size in bytes
   * @returns {Promise<void>}
   */
  createObject(type, size) {
    logger.debug(`CreateObject type ${type}, size ${size}`);

    return this.ready().then(() => (
      this.writeCommand(new Uint8Array([
        0x01, // "Create object" opcode
        type,
        size & 0xFF,
        (size >> 8) & 0xFF,
        (size >> 16) & 0xFF,
        (size >> 24) & 0xFF,
      ]))
        .then(this.read.bind(this))
        .then(this.assertPacket(0x01, 0))
    ));
  }

  /**
   * Writes data to the current object.
   * @param {Uint8Array} bytes - Data bytes
   * @param {number} crcSoFar - CRC of data sent so far
   * @param {number} offsetSoFar - Offset of data sent so far
   * @returns {Promise<Array>} - Promise to [offset, crc]
   */
  writeObject(bytes, crcSoFar, offsetSoFar) {
    logger.debug("WriteObject");
    return this.ready().then(() => (
      this.writeObjectPiece(bytes, crcSoFar, offsetSoFar, 0)
    ));
  }

  /**
   * Sends one piece of a data object.
   * @param {Uint8Array} bytes - Data bytes
   * @param {number} crcSoFar - CRC of data sent so far
   * @param {number} offsetSoFar - Offset of data sent so far
   * @param {number} prnCount - PRN counter
   * @returns {Promise<Array>} - Promise to [offset, crc]
   */
  writeObjectPiece(bytes, crcSoFar, offsetSoFar, prnCount) {
    return this.ready().then(() => {
      const sendLength = Math.min(this.mtu, bytes.length);

      const bytesToSend = bytes.subarray(0, sendLength);

      const newOffsetSoFar = offsetSoFar + sendLength;
      const newCrcSoFar = crc32(bytesToSend, crcSoFar);
      let newPrnCount = prnCount + 1;

      return this.writeData(bytesToSend)
        .then(() => {
          if (this.prn > 0 && newPrnCount >= this.prn) {
            logger.debug("PRN hit, expecting CRC");
            // Expect a CRC due to PRN
            newPrnCount = 0;
            return this.readCrc().then(([offset, crc]) => {
              if (newOffsetSoFar === offset && newCrcSoFar === crc) {
                logger.debug(`PRN checksum OK at offset ${offset} (0x${offset.toString(16)}) (0x${crc.toString(16)})`);
                return undefined;
              }
              return Promise.reject(new DfuError(ErrorCode.ERROR_CRC_MISMATCH, `CRC mismatch during PRN at byte ${offset}/${newOffsetSoFar}, expected 0x${newCrcSoFar.toString(16)} but got 0x${crc.toString(16)} instead`));
            });
          }
          return undefined;
        })
        .then(() => {
          if (sendLength < bytes.length) {
            // Send more stuff
            return this.writeObjectPiece(
              bytes.subarray(sendLength),
              newCrcSoFar, newOffsetSoFar, newPrnCount
            );
          }
          return [newOffsetSoFar, newCrcSoFar];
        });
    });
  }

  /**
   * Reads a PRN CRC response.
   * @returns {Promise<Array>} - Promise to [offset, crc]
   */
  readCrc() {
    return this.ready().then(() => (
      this.read()
        .then(this.assertPacket(0x03, 8))
        .then(bytes => {
          // Decode little-endian fields
          const bytesView = new DataView(bytes.buffer, bytes.byteOffset);
          const offset = bytesView.getUint32(0, true);
          const crc = bytesView.getUint32(4, true);

          return [offset, crc];
        })
    ));
  }

  /**
   * Requests CRC calculation from the target.
   * @returns {Promise<Array>} - Promise to [offset, crc]
   */
  crcObject() {
    logger.debug("Request CRC explicitly");

    return this.ready().then(() => (
      this.writeCommand(new Uint8Array([
        0x03, // "CRC" opcode
      ]))
        .then(this.readCrc.bind(this))
    ));
  }

  /**
   * Executes the current object.
   * @returns {Promise<void>}
   */
  executeObject() {
    logger.debug("Execute (mark payload chunk as ready)");
    return this.ready().then(() => (
      this.writeCommand(new Uint8Array([
        0x04, // "Execute" opcode
      ]))
        .then(this.read.bind(this))
        .then(this.assertPacket(0x04, 0))
    ));
  }

  /**
   * Selects an object type to operate on.
   * @param {number} type - Object type (1: command, 2: data)
   * @returns {Promise<Array>} - Promise to [offset, crc, chunkSize]
   */
  selectObject(type) {
    logger.debug("Select (report max size and current offset/crc)");

    return this.ready().then(() => (
      this.writeCommand(new Uint8Array([
        0x06, // "Select object" opcode
        type,
      ]))
        .then(this.read.bind(this))
        .then(this.assertPacket(0x06, 12))
        .then(bytes => {
          // Decode little-endian fields
          const bytesView = new DataView(bytes.buffer);
          const chunkSize = bytesView.getUint32(bytes.byteOffset + 0, true);
          const offset = bytesView.getUint32(bytes.byteOffset + 4, true);
          const crc = bytesView.getUint32(bytes.byteOffset + 8, true);
          logger.debug(`selected ${type}: offset ${offset}, crc ${crc}, max size ${chunkSize}`);
          return [offset, crc, chunkSize];
        })
    ));
  }

  /**
   * Aborts the current operation and exits bootloader mode.
   * @returns {Promise<void>}
   */
  abortObject() {
    logger.debug("Abort (exit bootloader)");
    return this.ready().then(() => (
      this.writeCommand(new Uint8Array([
        0x0C, // "Abort" opcode
      ]))
    ));
  }
}