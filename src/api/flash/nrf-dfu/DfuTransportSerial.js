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

import * as slip from "./util/slip";
import { DfuError, ErrorCode } from "./DfuError";
import DfuTransportPrn from "./DfuTransportPrn";
import logger from "@renderer/utils/Logger";

/**
 * Serial DFU transport. Base class for serial-based DFU transports.
 * This implementation handles the core serial protocol logic.
 */
export default class DfuTransportSerial extends DfuTransportPrn {
  /**
   * Creates a new Serial DFU transport
   * @param {SerialPort} serialPort - The serial port object
   * @param {number} packetReceiveNotification - PRN value (default: 16)
   */
  constructor(serialPort, packetReceiveNotification = 16) {
    super(packetReceiveNotification);
    this.port = serialPort;
  }

  /**
   * Given a command (including opcode), perform SLIP encoding and send it
   * through the wire.
   * @param {Uint8Array} bytes - Command bytes to send
   * @returns {Promise<void>}
   */
  writeCommand(bytes) {
    let encoded = slip.encode(bytes);

    // Strip the heading 0xC0 character, as to avoid a bug in the nRF SDK implementation
    encoded = encoded.subarray(1);

    // Cast the Uint8Array info a Buffer so it works on nodejs v6
    encoded = new Uint8Array(encoded);

    logger.debug("Sending command:", Array.from(bytes));
    
    return this.open().then(() => {
      // This is an abstract method that should be implemented by subclasses
      throw new Error("writeCommand must be implemented by subclass");
    });
  }

  /**
   * Given some payload bytes, pack them into a 0x08 command.
   * @param {Uint8Array} bytes - Data bytes to send
   * @returns {Promise<void>}
   */
  writeData(bytes) {
    const commandBytes = new Uint8Array(bytes.length + 1);
    commandBytes.set([0x08], 0); // "Write" opcode
    commandBytes.set(bytes, 1);
    return this.writeCommand(commandBytes);
  }

  /**
   * Opens the port, sets up the event handlers and logging.
   * @returns {Promise<void>}
   */
  open() {
    if (this.port && this.port.readable && this.port.writable) {
      return Promise.resolve();
    }

    // This is an abstract method that should be implemented by subclasses
    throw new Error("open must be implemented by subclass");
  }

  /**
   * Initializes DFU procedure: sets the PRN and requests the MTU.
   * @returns {Promise<void>}
   */
  ready() {
    if (this.readyPromise) {
      return this.readyPromise;
    }

    this.readyPromise = this.writeCommand(new Uint8Array([
      0x02, // "Set PRN" opcode
      this.prn & 0xFF, // PRN LSB
      (this.prn >> 8) & 0xFF, // PRN MSB
    ]))
      .then(this.read.bind(this))
      .then(this.assertPacket(0x02, 0))
      // Request MTU
      .then(() => this.writeCommand(new Uint8Array([
        0x07, // "Request serial MTU" opcode
      ])))
      .then(this.read.bind(this))
      .then(this.assertPacket(0x07, 2))
      .then(bytes => {
        const mtu = (bytes[1] * 256) + bytes[0];

        // Convert wire MTU into max size of data before SLIP encoding:
        // This takes into account:
        // - SLIP encoding ( /2 )
        // - SLIP end separator ( -1 )
        // - Serial DFU write command ( -1 )
        this.mtu = Math.floor((mtu / 2) - 2);

        // Round down to multiples of 4.
        // This is done to avoid errors while writing to flash memory:
        // writing an unaligned number of bytes will result in an
        // error in most chips.
        this.mtu -= this.mtu % 4;

        logger.debug(`Serial wire MTU: ${mtu}; un-encoded data max size: ${this.mtu}`);
      });

    return this.readyPromise;
  }

  /**
   * Returns a Promise to the version of the DFU protocol that the target implements, as
   * a single integer between 0 to 255.
   * @returns {Promise<number>}
   */
  getProtocolVersion() {
    logger.debug("GetProtocolVersion");

    return this.writeCommand(new Uint8Array([
      0x00, // "Version Command" opcode
    ]))
      .then(this.read.bind(this))
      .then(this.assertPacket(0x00, 1))
      .then(bytes => bytes[0])
      .then(protocolVersion => {
        logger.debug("ProtocolVersion: ", protocolVersion);
        return protocolVersion;
      });
  }

  /**
   * Returns a Promise to the version of the hardware that the target implements, as
   * an object with descriptive property names.
   * @returns {Promise<Object>}
   */
  getHardwareVersion() {
    logger.debug("GetHardwareVersion");

    return this.writeCommand(new Uint8Array([
      0x0A, // "Hardware Version Command" opcode
    ]))
      .then(this.read.bind(this))
      .then(this.assertPacket(0x0A, 20))
      .then(bytes => {
        // Decode little-endian fields, by using a DataView with the
        // same buffer *and* offset than the Uint8Array for the packet payload
        const dataView = new DataView(bytes.buffer, bytes.byteOffset);
        return {
          part: dataView.getInt32(0, true),
          variant: dataView.getInt32(4, true),
          memory: {
            romSize: dataView.getInt32(8, true),
            ramSize: dataView.getInt32(12, true),
            romPageSize: dataView.getInt32(16, true),
          },
        };
      })
      .then(hwVersion => {
        logger.debug("HardwareVersion part: ", hwVersion.part.toString(16));
        logger.debug("HardwareVersion variant: ", hwVersion.variant.toString(16));
        logger.debug("HardwareVersion ROM: ", hwVersion.memory.romSize);
        logger.debug("HardwareVersion RAM: ", hwVersion.memory.ramSize);
        logger.debug("HardwareVersion ROM page size: ", hwVersion.memory.romPageSize);

        return hwVersion;
      });
  }

  /**
   * Given an image number (0-indexed), returns a Promise to a plain object describing
   * that firmware image, or boolean false if there is no image at that index.
   * @param {number} imageCount - Image index (default: 0)
   * @returns {Promise<Object|boolean>}
   */
  getFirmwareVersion(imageCount = 0) {
    logger.debug("GetFirmwareVersion");

    return this.writeCommand(new Uint8Array([
      0x0B, // "Firmware Version Command" opcode
      imageCount
    ]))
      .then(this.read.bind(this))
      .then(this.assertPacket(0x0B, 13))
      .then(bytes => {
        // Decode little-endian fields
        const dataView = new DataView(bytes.buffer, bytes.byteOffset);
        let imgType = dataView.getUint8(0, true);

        switch (imgType) {
          case 0xFF:
            // Meaning "no image at this index"
            return false;
          case 0:
            imgType = "SoftDevice";
            break;
          case 1:
            imgType = "Application";
            break;
          case 2:
            imgType = "Bootloader";
            break;
          default:
            throw new DfuError(ErrorCode.ERROR_RSP_UNSUPPORTED_TYPE);
        }

        return {
          version: dataView.getUint32(1, true),
          addr: dataView.getUint32(5, true),
          length: dataView.getUint32(9, true),
          imageType: imgType,
        };
      })
      .then(fwVersion => {
        if (fwVersion) {
          logger.debug(`FirmwareVersion: image ${imageCount} is ${fwVersion.imageType} @0x${fwVersion.addr.toString(16)}+0x${fwVersion.length}`);
        } else {
          logger.debug("FirmwareVersion: no more images.");
        }

        return fwVersion;
      });
  }

  /**
   * Returns an array containing information about all available firmware images, by
   * sending several GetFirmwareVersion commands.
   * @param {number} index - Starting index (default: 0)
   * @param {Array} accum - Accumulator array (default: [])
   * @returns {Promise<Array>}
   */
  getAllFirmwareVersions(index = 0, accum = []) {
    return this.getFirmwareVersion(index)
      .then(imageInfo => {
        if (imageInfo) {
          accum.push(imageInfo);
          return this.getAllFirmwareVersions(index + 1, accum);
        }
        return accum;
      });
  }
}