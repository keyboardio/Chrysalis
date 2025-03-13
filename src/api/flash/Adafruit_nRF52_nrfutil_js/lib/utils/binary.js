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
 * Binary data manipulation utilities for the nRF52 DFU tool
 */

const BinaryUtils = {
  /**
   * Converts a 16-bit integer to a byte array (little endian)
   * @param {number} value - Integer value to convert
   * @returns {Uint8Array} Byte array containing the value
   */
  int16ToBytes: function(value) {
    return new Uint8Array([
      value & 0xFF,
      (value >> 8) & 0xFF
    ]);
  },

  /**
   * Converts a 32-bit integer to a byte array (little endian)
   * @param {number} value - Integer value to convert
   * @returns {Uint8Array} Byte array containing the value
   */
  int32ToBytes: function(value) {
    return new Uint8Array([
      value & 0xFF,
      (value >> 8) & 0xFF,
      (value >> 16) & 0xFF,
      (value >> 24) & 0xFF
    ]);
  },

  /**
   * Converts a byte array to a 16-bit integer (little endian)
   * @param {Uint8Array} bytes - Byte array to convert
   * @returns {number} The 16-bit integer value
   */
  bytesToInt16: function(bytes) {
    return bytes[0] | (bytes[1] << 8);
  },

  /**
   * Converts a byte array to a 32-bit integer (little endian)
   * @param {Uint8Array} bytes - Byte array to convert
   * @returns {number} The 32-bit integer value
   */
  bytesToInt32: function(bytes) {
    return bytes[0] | (bytes[1] << 8) | (bytes[2] << 16) | (bytes[3] << 24);
  },

  /**
   * Converts a hex string to a byte array
   * @param {string} hexString - Hex string to convert (e.g., "A1B2C3")
   * @returns {Uint8Array} Byte array containing the values
   */
  hexToBytes: function(hexString) {
    // Remove spaces and 0x prefixes
    hexString = hexString.replace(/\s+/g, '').replace(/0x/g, '');
    
    if (hexString.length % 2 !== 0) {
      throw new Error('Hex string must have an even number of characters');
    }
    
    const numBytes = hexString.length / 2;
    const bytes = new Uint8Array(numBytes);
    
    for (let i = 0; i < numBytes; i++) {
      const byteString = hexString.substr(i * 2, 2);
      bytes[i] = parseInt(byteString, 16);
    }
    
    return bytes;
  },

  /**
   * Converts a byte array to a hex string
   * @param {Uint8Array} bytes - Byte array to convert
   * @param {boolean} spaces - Whether to include spaces between bytes
   * @returns {string} Hex string representation of the bytes
   */
  bytesToHex: function(bytes, spaces = false) {
    return Array.from(bytes)
      .map(byte => byte.toString(16).padStart(2, '0'))
      .join(spaces ? ' ' : '');
  },

  /**
   * Converts a string to a byte array
   * @param {string} str - String to convert
   * @returns {Uint8Array} Byte array containing the string values
   */
  stringToBytes: function(str) {
    const bytes = new Uint8Array(str.length);
    for (let i = 0; i < str.length; i++) {
      bytes[i] = str.charCodeAt(i);
    }
    return bytes;
  },

  /**
   * Converts a byte array to a string
   * @param {Uint8Array} bytes - Byte array to convert
   * @returns {string} String representation of the bytes
   */
  bytesToString: function(bytes) {
    return Array.from(bytes).map(byte => String.fromCharCode(byte)).join('');
  },

  /**
   * Merges multiple byte arrays into a single byte array
   * @param  {...Uint8Array} arrays - Arrays to merge
   * @returns {Uint8Array} Combined array
   */
  mergeArrays: function(...arrays) {
    // Calculate total length
    const totalLength = arrays.reduce((acc, arr) => acc + arr.length, 0);
    
    // Create new array and copy data
    const result = new Uint8Array(totalLength);
    let offset = 0;
    
    for (const array of arrays) {
      result.set(array, offset);
      offset += array.length;
    }
    
    return result;
  },

  /**
   * Creates a formatted hex string representation of a byte array
   * @param {Uint8Array} bytes - Byte array to format
   * @returns {string} Formatted string with '0x' prefixes and spaces
   */
  formatBytes: function(bytes) {
    return Array.from(bytes)
      .map(b => `0x${b.toString(16).padStart(2, '0').toUpperCase()}`)
      .join(' ');
  }
};

// Export for ES6 modules
export { BinaryUtils };