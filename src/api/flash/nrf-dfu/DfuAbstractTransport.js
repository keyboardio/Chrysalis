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
import { DfuError, ErrorCode } from "./DfuError";
import logger from "@renderer/utils/Logger";

/**
 * Implements the logic common to all transports, but not the transport itself.
 *
 * This is an abstract class, so do not instantiate directly. Subclass,
 * and complete the functionality of the needed methods with the actual transport
 * logic.
 */
export default class DfuAbstractTransport {
  constructor() {
    if (this.constructor === DfuAbstractTransport) {
      throw new DfuError(ErrorCode.ERROR_CAN_NOT_INIT_ABSTRACT_TRANSPORT);
    }
  }

  /**
   * Restarts the DFU procedure by sending a create command of
   * type 1 (init payload / "command object").
   * @returns {Promise<void>}
   */
  restart() {
    logger.debug("Forcefully restarting DFU procedure");
    return this.createObject(1, 0x10);
  }

  /**
   * Abort the DFU procedure, which means exiting the bootloader mode
   * and trying to switch back to the app mode
   * @returns {Promise<void>}
   */
  abort() {
    logger.debug("Exit Bootloader Mode");
    return this.abortObject();
  }

  /**
   * Sends an init payload / "command object".
   * @param {Uint8Array} bytes - Init packet data
   * @returns {Promise<void>}
   */
  sendInitPacket(bytes) {
    return this.sendPayload(0x01, bytes);
  }

  /**
   * Sends the main payload / "data object".
   * @param {Uint8Array} bytes - Firmware image data
   * @returns {Promise<void>}
   */
  sendFirmwareImage(bytes) {
    return this.sendPayload(0x02, bytes);
  }

  /**
   * Sends either an init payload or a data payload
   * @param {number} type - Payload type (1: command, 2: data)
   * @param {Uint8Array} bytes - Payload data
   * @param {boolean} resumeAtChunkBoundary - Whether to resume at chunk boundary
   * @returns {Promise<void>}
   */
  sendPayload(type, bytes, resumeAtChunkBoundary = false) {
    logger.debug(`Sending payload of type ${type}`);
    return this.selectObject(type).then(([offset, crcSoFar, chunkSize]) => {
      if (offset !== 0) {
        logger.debug(`Offset is not zero (${offset}). Checking if graceful continuation is possible.`);
        const crc = crc32(bytes.subarray(0, offset));

        if (crc === crcSoFar) {
          logger.debug("CRC match");
          if (offset === bytes.length) {
            logger.debug("Payload already transferred successfully, sending execute command just in case.");

            // Send an exec command, just in case the previous connection broke
            // just before the exec command. An extra exec command will have no
            // effect.
            return this.executeObject(type, chunkSize);
          }
          if (offset % chunkSize === 0 && !resumeAtChunkBoundary) {
            // Edge case: when an exact multiple of the chunk size has
            // been transferred, the host side cannot be sure if the last
            // chunk has been marked as ready ("executed") or not.
            // Fortunately, if an "execute" command is sent right after
            // another "execute" command, the second one will do nothing
            // and yet receive an "OK" response code.
            logger.debug(
              "Edge case: payload transferred up to page boundary; previous execute command might have been lost, re-sending."
            );

            return this.executeObject(type, chunkSize).then(() => this.sendPayload(type, bytes, true));
          }
          logger.debug(`Payload partially transferred successfully, continuing from offset ${offset}.`);

          // Send the remainder of a half-finished chunk
          const end = Math.min(bytes.length, offset + chunkSize - (offset % chunkSize));

          return this.sendAndExecutePayloadChunk(type, bytes, offset, end, chunkSize, crc);
        }

        // Note that these are CRC mismatches at a chunk level, not at a
        // transport level. Individual transports might decide to roll back
        // parts of a chunk (re-creating it) on PRN CRC failures.
        // But here it means that there is a CRC mismatch while trying to
        // continue an interrupted DFU, and the behavior in this case is to panic.
        logger.debug(`CRC mismatch: expected/actual 0x${crc.toString(16)}/0x${crcSoFar.toString(16)}`);

        return Promise.reject(new DfuError(ErrorCode.ERROR_PRE_DFU_INTERRUPTED));
      }
      const end = Math.min(bytes.length, chunkSize);

      return this.createObject(type, end).then(() => this.sendAndExecutePayloadChunk(type, bytes, 0, end, chunkSize));
    });
  }

  /**
   * Sends one chunk of a payload
   * @param {number} type - Payload type (1: command, 2: data)
   * @param {Uint8Array} bytes - Payload data
   * @param {number} start - Start offset
   * @param {number} end - End offset
   * @param {number} chunkSize - Chunk size
   * @param {number} crcSoFar - CRC of data sent so far
   * @returns {Promise<void>}
   */
  sendAndExecutePayloadChunk(type, bytes, start, end, chunkSize, crcSoFar = undefined) {
    return this.sendPayloadChunk(type, bytes, start, end, chunkSize, crcSoFar)
      .then(() => this.executeObject())
      .then(() => {
        if (end >= bytes.length) {
          logger.debug(`Sent ${end} bytes, this payload type is finished`);
          return Promise.resolve();
        }
        // Send next chunk
        logger.debug(`Sent ${end} bytes, not finished yet (until ${bytes.length})`);
        const nextEnd = Math.min(bytes.length, end + chunkSize);

        return this.createObject(type, nextEnd - end).then(() =>
          this.sendAndExecutePayloadChunk(type, bytes, end, nextEnd, chunkSize, crc32(bytes.subarray(0, end)))
        );
      });
  }

  /**
   * Sends one payload chunk, retrying if necessary
   * @param {number} type - Payload type (1: command, 2: data)
   * @param {Uint8Array} bytes - Payload data
   * @param {number} start - Start offset
   * @param {number} end - End offset
   * @param {number} chunkSize - Chunk size
   * @param {number} crcSoFar - CRC of data sent so far
   * @param {number} retries - Number of retries
   * @returns {Promise<void>}
   */
  sendPayloadChunk(type, bytes, start, end, chunkSize, crcSoFar = undefined, retries = 0) {
    const subarray = bytes.subarray(start, end);
    const crcAtChunkEnd = crc32(subarray, crcSoFar);

    return this.writeObject(subarray, crcSoFar, start)
      .then(() => {
        logger.debug("Payload type fully transferred, requesting explicit checksum");
        return this.crcObject(end, crcAtChunkEnd);
      })
      .then(([offset, crc]) => {
        if (offset !== end) {
          throw new DfuError(
            ErrorCode.ERROR_UNEXPECTED_BYTES,
            `Expected ${end} bytes to have been sent, actual is ${offset} bytes.`
          );
        }

        if (crcAtChunkEnd !== crc) {
          throw new DfuError(
            ErrorCode.ERROR_CRC_MISMATCH,
            `CRC mismatch after ${end} bytes have been sent: expected ${crcAtChunkEnd}, got ${crc}.`
          );
        } else {
          logger.debug(`Explicit checksum OK at ${end} bytes`);
        }
      })
      .catch((err) => {
        if (retries >= 5) {
          return Promise.reject(new DfuError(ErrorCode.ERROR_TOO_MANY_WRITE_FAILURES, `Last failure: ${err}`));
        }
        logger.debug(
          `Chunk write failed (${err}) Re-sending the whole chunk starting at ${start}. Times retried: ${retries}`
        );

        const newStart = start - (start % chunkSize);
        // Rewind to the start of the block
        const rewoundCrc = newStart === 0 ? undefined : crc32(bytes.subarray(0, newStart));

        return this.createObject(type, end - start).then(() =>
          this.sendPayloadChunk(type, bytes, newStart, end, chunkSize, rewoundCrc, retries + 1)
        );
      });
  }

  // The following methods are abstract and must be implemented by subclasses

  /**
   * Creates an object in the DFU target
   * @param {number} type - Object type (1: command, 2: data)
   * @param {number} size - Object size in bytes
   * @returns {Promise<void>}
   */
  createObject(type, size) {
    throw new Error("createObject must be implemented by subclass");
  }

  /**
   * Writes data to the current object
   * @param {Uint8Array} bytes - Data bytes
   * @param {number} crcSoFar - CRC of data sent so far
   * @param {number} offsetSoFar - Offset of data sent so far
   * @returns {Promise<Array>}
   */
  writeObject(bytes, crcSoFar, offsetSoFar) {
    throw new Error("writeObject must be implemented by subclass");
  }

  /**
   * Requests CRC calculation from the target
   * @returns {Promise<Array>}
   */
  crcObject() {
    throw new Error("crcObject must be implemented by subclass");
  }

  /**
   * Executes the current object
   * @returns {Promise<void>}
   */
  executeObject() {
    throw new Error("executeObject must be implemented by subclass");
  }

  /**
   * Selects an object type to operate on
   * @param {number} type - Object type (1: command, 2: data)
   * @returns {Promise<Array>}
   */
  selectObject(type) {
    throw new Error("selectObject must be implemented by subclass");
  }

  /**
   * Aborts the current operation and exits bootloader mode
   * @returns {Promise<void>}
   */
  abortObject() {
    throw new Error("abortObject must be implemented by subclass");
  }
}
