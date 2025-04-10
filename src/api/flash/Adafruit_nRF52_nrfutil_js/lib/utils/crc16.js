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
 * CRC16 calculation for the nRF52 DFU tool
 * Ported from the Python implementation
 */

const CRC16 = {
  /**
   * Calculates CRC16 on binary data
   * @param {Uint8Array} binaryData - Array with data to run CRC16 calculation on
   * @param {number} crc - CRC value to start calculation with (default: 0xFFFF)
   * @returns {number} Calculated CRC value of binary data
   */
  calculate: function (binaryData, crc = 0xffff) {
    if (!(binaryData instanceof Uint8Array)) {
      throw new Error("CRC16.calculate requires Uint8Array input");
    }

    for (const b of binaryData) {
      crc = ((crc >> 8) & 0x00ff) | ((crc << 8) & 0xff00);
      crc ^= b;
      crc ^= (crc & 0x00ff) >> 4;
      crc ^= (crc << 8) << 4;
      crc ^= ((crc & 0x00ff) << 4) << 1;
    }

    return crc & 0xffff;
  },

  /**
   * Calculates CRC16 on a file
   * @param {ArrayBuffer} fileData - File data as ArrayBuffer
   * @param {number} crc - CRC value to start calculation with (default: 0xFFFF)
   * @returns {number} Calculated CRC value of file
   */
  calculateFromFile: async function (fileData, crc = 0xffff) {
    const CHUNK_SIZE = 65536; // Process in 64KB chunks
    const data = new Uint8Array(fileData);

    // Process file in chunks to avoid memory issues with large files
    for (let offset = 0; offset < data.length; offset += CHUNK_SIZE) {
      const chunk = data.slice(offset, Math.min(offset + CHUNK_SIZE, data.length));
      crc = this.calculate(chunk, crc);
    }

    return crc;
  },
};

// Export for ES6 modules
export { CRC16 };
