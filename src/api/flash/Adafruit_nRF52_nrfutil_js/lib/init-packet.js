/**
 * Copyright (c) 2015, Nordic Semiconductor
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 * * Redistributions of source code must retain the above copyright notice, this
 *   list of conditions and the following disclaimer.
 *
 * * Redistributions in binary form must reproduce the above copyright notice,
 *   this list of conditions and the following disclaimer in the documentation
 *   and/or other materials provided with the distribution.
 *
 * * Neither the name of Nordic Semiconductor ASA nor the names of its
 *   contributors may be used to endorse or promote products derived from
 *   this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
 * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE
 * FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
 * DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
 * SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
 * CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,
 * OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
 * OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 *
 * Mechanically translated from Python to JavaScript by Keyboardio in March, 2025.
 *
 * Init packet handling for the nRF52 DFU tool
 * Ported from the Python implementation
 */

import { PacketField, PacketExtension } from "./models.js";

/**
 * Class for generating init packets for DFU
 */
class InitPacket {
  /**
   * Constructor
   * @param {Object} initPacketData - Initial packet data
   */
  constructor(initPacketData) {
    this.initPacketData = initPacketData || {};
  }

  /**
   * Generate an init packet based on the format
   * @returns {Uint8Array} The generated init packet
   */
  generatePacket() {
    // Check for required fields based on the format version
    if (
      this.initPacketData[PacketField.NORDIC_PROPRIETARY_OPT_DATA_EXT_PACKET_ID] ===
      PacketExtension.INIT_PACKET_USES_HASH
    ) {
      this._validateFieldPresence([
        PacketField.DEVICE_TYPE,
        PacketField.DEVICE_REVISION,
        PacketField.APP_VERSION,
        PacketField.REQUIRED_SOFTDEVICES_ARRAY,
        PacketField.NORDIC_PROPRIETARY_OPT_DATA_FIRMWARE_LENGTH,
        PacketField.NORDIC_PROPRIETARY_OPT_DATA_FIRMWARE_HASH,
      ]);

      return this._generateInitPacketWithHash();
    } else if (
      this.initPacketData[PacketField.NORDIC_PROPRIETARY_OPT_DATA_EXT_PACKET_ID] ===
      PacketExtension.INIT_PACKET_EXT_USES_ECDS
    ) {
      this._validateFieldPresence([
        PacketField.DEVICE_TYPE,
        PacketField.DEVICE_REVISION,
        PacketField.APP_VERSION,
        PacketField.REQUIRED_SOFTDEVICES_ARRAY,
        PacketField.NORDIC_PROPRIETARY_OPT_DATA_FIRMWARE_LENGTH,
        PacketField.NORDIC_PROPRIETARY_OPT_DATA_FIRMWARE_HASH,
      ]);

      return this._generateInitPacketWithEcds();
    } else if (
      this.initPacketData[PacketField.NORDIC_PROPRIETARY_OPT_DATA_EXT_PACKET_ID] ===
      PacketExtension.INIT_PACKET_USES_CRC16
    ) {
      this._validateFieldPresence([
        PacketField.DEVICE_TYPE,
        PacketField.DEVICE_REVISION,
        PacketField.APP_VERSION,
        PacketField.REQUIRED_SOFTDEVICES_ARRAY,
        PacketField.NORDIC_PROPRIETARY_OPT_DATA_FIRMWARE_CRC16,
      ]);

      return this._generateInitPacketWithCrc();
    } else {
      // Default to legacy format
      this._validateFieldPresence([
        PacketField.DEVICE_TYPE,
        PacketField.DEVICE_REVISION,
        PacketField.APP_VERSION,
        PacketField.REQUIRED_SOFTDEVICES_ARRAY,
        PacketField.NORDIC_PROPRIETARY_OPT_DATA_FIRMWARE_CRC16,
      ]);

      return this._generateLegacyInitPacket();
    }
  }

  /**
   * Validates that required fields are present
   * @param {Array} requiredFields - List of required field keys
   * @private
   */
  _validateFieldPresence(requiredFields) {
    for (const field of requiredFields) {
      if (this.initPacketData[field] === undefined) {
        throw new Error(`Missing required field in init packet: ${field}`);
      }
    }
  }

  /**
   * Generates a legacy init packet with CRC16
   * @returns {Uint8Array} The generated init packet
   * @private
   */
  _generateLegacyInitPacket() {
    // Legacy init packet format (pre 0.5)
    const buffer = new ArrayBuffer(14); // Fixed size for legacy packet
    const view = new DataView(buffer);

    // First comes device type (2 bytes, little endian)
    view.setUint16(0, this.initPacketData[PacketField.DEVICE_TYPE], true);

    // Then device revision (2 bytes, little endian)
    view.setUint16(2, this.initPacketData[PacketField.DEVICE_REVISION], true);

    // Then application version (4 bytes, little endian)
    view.setUint32(4, this.initPacketData[PacketField.APP_VERSION], true);

    // Then array of softdevice requirements (2 bytes each, little endian)
    const sdReq = this.initPacketData[PacketField.REQUIRED_SOFTDEVICES_ARRAY];
    view.setUint16(8, sdReq.length, true); // Number of softdevices

    // Only include the first softdevice requirement
    if (sdReq.length > 0) {
      view.setUint16(10, sdReq[0], true);
    } else {
      view.setUint16(10, 0, true);
    }

    // Finally CRC16
    view.setUint16(12, this.initPacketData[PacketField.NORDIC_PROPRIETARY_OPT_DATA_FIRMWARE_CRC16], true);

    return new Uint8Array(buffer);
  }

  /**
   * Generates an init packet with CRC16 (format 0.6)
   * @returns {Uint8Array} The generated init packet
   * @private
   */
  _generateInitPacketWithCrc() {
    const sdReq = this.initPacketData[PacketField.REQUIRED_SOFTDEVICES_ARRAY];

    // Calculate buffer size:
    // 12 bytes header + 2 bytes per sd + 4 bytes for ext data
    const bufferSize = 12 + sdReq.length * 2 + 4;
    const buffer = new ArrayBuffer(bufferSize);
    const view = new DataView(buffer);

    // First comes device type (2 bytes, little endian)
    view.setUint16(0, this.initPacketData[PacketField.DEVICE_TYPE], true);

    // Then device revision (2 bytes, little endian)
    view.setUint16(2, this.initPacketData[PacketField.DEVICE_REVISION], true);

    // Then application version (4 bytes, little endian)
    view.setUint32(4, this.initPacketData[PacketField.APP_VERSION], true);

    // Then array of softdevice requirements
    view.setUint16(8, sdReq.length, true); // Number of softdevices

    // Include all softdevice requirements
    let offset = 10;
    for (let i = 0; i < sdReq.length; i++) {
      view.setUint16(offset, sdReq[i], true);
      offset += 2;
    }

    // Extension data length (2 bytes for ext ID, 2 bytes for CRC16)
    view.setUint16(offset, 4, true);
    offset += 2;

    // Extension ID
    view.setUint16(offset, PacketExtension.INIT_PACKET_USES_CRC16, true);
    offset += 2;

    // CRC16
    view.setUint16(offset, this.initPacketData[PacketField.NORDIC_PROPRIETARY_OPT_DATA_FIRMWARE_CRC16], true);

    return new Uint8Array(buffer);
  }

  /**
   * Generates an init packet with SHA256 hash (format 0.7)
   * @returns {Uint8Array} The generated init packet
   * @private
   */
  _generateInitPacketWithHash() {
    const sdReq = this.initPacketData[PacketField.REQUIRED_SOFTDEVICES_ARRAY];
    const hash = this.initPacketData[PacketField.NORDIC_PROPRIETARY_OPT_DATA_FIRMWARE_HASH];

    if (!(hash instanceof Uint8Array) || hash.length !== 32) {
      throw new Error("Firmware hash must be a 32-byte Uint8Array");
    }

    // Calculate buffer size:
    // 12 bytes header + 2 bytes per sd + 4 bytes ext data header + 4 bytes fw length + 32 bytes hash
    const bufferSize = 12 + sdReq.length * 2 + 4 + 4 + 32;
    const buffer = new ArrayBuffer(bufferSize);
    const view = new DataView(buffer);

    // First comes device type (2 bytes, little endian)
    view.setUint16(0, this.initPacketData[PacketField.DEVICE_TYPE], true);

    // Then device revision (2 bytes, little endian)
    view.setUint16(2, this.initPacketData[PacketField.DEVICE_REVISION], true);

    // Then application version (4 bytes, little endian)
    view.setUint32(4, this.initPacketData[PacketField.APP_VERSION], true);

    // Then array of softdevice requirements
    view.setUint16(8, sdReq.length, true); // Number of softdevices

    // Include all softdevice requirements
    let offset = 10;
    for (let i = 0; i < sdReq.length; i++) {
      view.setUint16(offset, sdReq[i], true);
      offset += 2;
    }

    // Extension data length (2 bytes for ext ID, 4 bytes for fw length, 32 bytes for hash)
    view.setUint16(offset, 38, true);
    offset += 2;

    // Extension ID
    view.setUint16(offset, PacketExtension.INIT_PACKET_USES_HASH, true);
    offset += 2;

    // Firmware size
    view.setUint32(offset, this.initPacketData[PacketField.NORDIC_PROPRIETARY_OPT_DATA_FIRMWARE_LENGTH], true);
    offset += 4;

    // Firmware hash
    const uint8View = new Uint8Array(buffer);
    uint8View.set(hash, offset);

    return uint8View;
  }

  /**
   * Generates an init packet with ECDS signature (format 0.8)
   * @returns {Uint8Array} The generated init packet
   * @private
   */
  _generateInitPacketWithEcds() {
    const sdReq = this.initPacketData[PacketField.REQUIRED_SOFTDEVICES_ARRAY];
    const hash = this.initPacketData[PacketField.NORDIC_PROPRIETARY_OPT_DATA_FIRMWARE_HASH];
    const signature = this.initPacketData[PacketField.NORDIC_PROPRIETARY_OPT_DATA_INIT_PACKET_ECDS];

    if (!(hash instanceof Uint8Array) || hash.length !== 32) {
      throw new Error("Firmware hash must be a 32-byte Uint8Array");
    }

    if (!(signature instanceof Uint8Array)) {
      throw new Error("ECDS signature must be a Uint8Array");
    }

    // Calculate buffer size:
    // 12 bytes header + 2 bytes per sd + 4 bytes ext data header + 4 bytes fw length + 32 bytes hash + signature length
    const bufferSize = 12 + sdReq.length * 2 + 4 + 4 + 32 + signature.length;
    const buffer = new ArrayBuffer(bufferSize);
    const view = new DataView(buffer);

    // First comes device type (2 bytes, little endian)
    view.setUint16(0, this.initPacketData[PacketField.DEVICE_TYPE], true);

    // Then device revision (2 bytes, little endian)
    view.setUint16(2, this.initPacketData[PacketField.DEVICE_REVISION], true);

    // Then application version (4 bytes, little endian)
    view.setUint32(4, this.initPacketData[PacketField.APP_VERSION], true);

    // Then array of softdevice requirements
    view.setUint16(8, sdReq.length, true); // Number of softdevices

    // Include all softdevice requirements
    let offset = 10;
    for (let i = 0; i < sdReq.length; i++) {
      view.setUint16(offset, sdReq[i], true);
      offset += 2;
    }

    // Extension data length (2 bytes for ext ID, 4 bytes for fw length, 32 bytes for hash, signature length)
    view.setUint16(offset, 38 + signature.length, true);
    offset += 2;

    // Extension ID
    view.setUint16(offset, PacketExtension.INIT_PACKET_EXT_USES_ECDS, true);
    offset += 2;

    // Firmware size
    view.setUint32(offset, this.initPacketData[PacketField.NORDIC_PROPRIETARY_OPT_DATA_FIRMWARE_LENGTH], true);
    offset += 4;

    // Firmware hash
    const uint8View = new Uint8Array(buffer);
    uint8View.set(hash, offset);
    offset += 32;

    // Signature
    uint8View.set(signature, offset);

    return uint8View;
  }
}

/**
 * Parses an init packet from binary data
 * @param {Uint8Array} data - The binary init packet data
 * @returns {Object} The parsed init packet data
 */
function parseInitPacket(data) {
  if (!(data instanceof Uint8Array)) {
    throw new Error("Init packet data must be a Uint8Array");
  }

  if (data.length < 14) {
    throw new Error("Init packet too short");
  }

  const view = new DataView(data.buffer, data.byteOffset, data.byteLength);
  const result = {};

  // Parse device type
  result[PacketField.DEVICE_TYPE] = view.getUint16(0, true);

  // Parse device revision
  result[PacketField.DEVICE_REVISION] = view.getUint16(2, true);

  // Parse application version
  result[PacketField.APP_VERSION] = view.getUint32(4, true);

  // Parse softdevice requirements
  const sdReqCount = view.getUint16(8, true);
  result[PacketField.REQUIRED_SOFTDEVICES_ARRAY] = [];

  let offset = 10;
  for (let i = 0; i < sdReqCount; i++) {
    if (offset + 2 > data.length) {
      throw new Error("Init packet truncated in softdevice requirements");
    }
    result[PacketField.REQUIRED_SOFTDEVICES_ARRAY].push(view.getUint16(offset, true));
    offset += 2;
  }

  // Check if we have extension data
  if (offset + 2 <= data.length) {
    const extDataLength = view.getUint16(offset, true);
    offset += 2;

    if (offset + extDataLength <= data.length) {
      // Parse extension ID
      const extId = view.getUint16(offset, true);
      result[PacketField.NORDIC_PROPRIETARY_OPT_DATA_EXT_PACKET_ID] = extId;
      offset += 2;

      if (extId === PacketExtension.INIT_PACKET_USES_CRC16) {
        // Parse CRC16
        result[PacketField.NORDIC_PROPRIETARY_OPT_DATA_FIRMWARE_CRC16] = view.getUint16(offset, true);
      } else if (
        extId === PacketExtension.INIT_PACKET_USES_HASH ||
        extId === PacketExtension.INIT_PACKET_EXT_USES_ECDS
      ) {
        // Parse firmware length
        result[PacketField.NORDIC_PROPRIETARY_OPT_DATA_FIRMWARE_LENGTH] = view.getUint32(offset, true);
        offset += 4;

        // Parse hash
        if (offset + 32 <= data.length) {
          result[PacketField.NORDIC_PROPRIETARY_OPT_DATA_FIRMWARE_HASH] = new Uint8Array(
            data.buffer,
            data.byteOffset + offset,
            32,
          );
          offset += 32;

          // If we have an ECDS signature, parse it
          if (extId === PacketExtension.INIT_PACKET_EXT_USES_ECDS && offset < data.length) {
            result[PacketField.NORDIC_PROPRIETARY_OPT_DATA_INIT_PACKET_ECDS] = new Uint8Array(
              data.buffer,
              data.byteOffset + offset,
              data.length - offset,
            );
          }
        }
      }
    }
  } else {
    // Legacy format, parse CRC16
    if (offset + 2 <= data.length) {
      result[PacketField.NORDIC_PROPRIETARY_OPT_DATA_FIRMWARE_CRC16] = view.getUint16(offset, true);
    }
  }

  return result;
}

// Export for ES6 modules
export { InitPacket, parseInitPacket };
