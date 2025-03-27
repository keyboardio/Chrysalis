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
 * SLIP (Serial Line Internet Protocol) encoding and decoding
 * Based on the Python implementation in the nRF52 DFU tool
 */

const SLIP = {
  // SLIP special character definitions
  SLIP_END: 0xC0,      // End of packet indicator
  SLIP_ESC: 0xDB,      // Escape character
  SLIP_ESC_END: 0xDC,  // Escaped END character
  SLIP_ESC_ESC: 0xDD,  // Escaped ESC character
  
  /**
   * Encode data using SLIP protocol
   * @param {Uint8Array} data - Data to encode
   * @returns {Uint8Array} SLIP encoded data
   */
  encode: function(data) {
    // Pre-calculate the length of the encoded data to avoid reallocations
    let encodedLength = data.length;
    
    // Count how many special characters will need escaping
    for (const byte of data) {
      if (byte === this.SLIP_END || byte === this.SLIP_ESC) {
        encodedLength++;  // Add one for each special character
      }
    }
    
    // Create the result array with correct size
    const result = new Uint8Array(encodedLength);
    let resultIndex = 0;
    
    // Encode each byte
    for (const byte of data) {
      if (byte === this.SLIP_END) {
        result[resultIndex++] = this.SLIP_ESC;
        result[resultIndex++] = this.SLIP_ESC_END;
      } else if (byte === this.SLIP_ESC) {
        result[resultIndex++] = this.SLIP_ESC;
        result[resultIndex++] = this.SLIP_ESC_ESC;
      } else {
        result[resultIndex++] = byte;
      }
    }
    
    return result;
  },
  
  /**
   * Decode SLIP encoded data
   * @param {Uint8Array} data - SLIP encoded data
   * @returns {Uint8Array} Decoded data
   */
  decode: function(data) {
    if (!(data instanceof Uint8Array)) {
      throw new Error("SLIP.decode requires Uint8Array input");
    }
    
    const result = [];
    let i = 0;
    
    while (i < data.length) {
      const byte = data[i++];
      
      if (byte === this.SLIP_ESC) {
        if (i >= data.length) {
          throw new Error('SLIP decode error: ESC character at end of data with no following byte');
        }
        
        const nextByte = data[i++];
        
        if (nextByte === this.SLIP_ESC_END) {
          result.push(this.SLIP_END);
        } else if (nextByte === this.SLIP_ESC_ESC) {
          result.push(this.SLIP_ESC);
        } else {
          throw new Error(`SLIP decode error: Invalid escape sequence ESC + ${nextByte}`);
        }
      } else {
        result.push(byte);
      }
    }
    
    return new Uint8Array(result);
  },
  
  /**
   * Add SLIP framing to a packet (add END bytes)
   * @param {Uint8Array} data - Data to frame 
   * @returns {Uint8Array} Framed data
   */
  frame: function(data) {
    const encoded = this.encode(data);
    const framed = new Uint8Array(encoded.length + 2);
    
    framed[0] = this.SLIP_END;
    framed.set(encoded, 1);
    framed[framed.length - 1] = this.SLIP_END;
    
    return framed;
  },
  
  /**
   * Remove SLIP framing from a packet and decode
   * @param {Uint8Array} framedData - Framed SLIP data
   * @returns {Uint8Array} Original data
   */
  unframe: function(framedData) {
    // Check if proper framing exists
    if (framedData.length < 2 || 
        framedData[0] !== this.SLIP_END || 
        framedData[framedData.length - 1] !== this.SLIP_END) {
      throw new Error('SLIP unframe error: Data is not properly framed');
    }
    
    // Remove framing END bytes
    const encodedData = framedData.slice(1, framedData.length - 1);
    
    // Return the decoded data
    return this.decode(encodedData);
  },
  
  /**
   * Creates a 4-byte header from SLIP packet parameters
   * Port of slip_parts_to_four_bytes from Python implementation
   * @param {number} sequence_number - Packet sequence number (0-7)
   * @param {number} data_integrity - Data integrity check present (0-1)
   * @param {number} reliable - Reliable packet (0-1)
   * @param {number} packet_type - Type of packet (0-15)
   * @param {number} payload_length - Length of payload
   * @returns {Uint8Array} 4-byte SLIP header
   */
  createHeader: function(sequence_number, data_integrity, reliable, packet_type, payload_length) {
    // Validate parameters
    if (sequence_number < 0 || sequence_number > 7) {
      throw new Error("Sequence number must be between 0 and 7");
    }
    if (data_integrity < 0 || data_integrity > 1) {
      throw new Error("Data integrity must be 0 or 1");
    }
    if (reliable < 0 || reliable > 1) {
      throw new Error("Reliable must be 0 or 1");
    }
    if (packet_type < 0 || packet_type > 15) {
      throw new Error("Packet type must be between 0 and 15");
    }
    if (payload_length < 0) {
      throw new Error("Payload length must be non-negative");
    }
    
    // Create the header bytes
    const header = new Uint8Array(4);
    
    // First byte: [reliable (1b)] [data_integrity (1b)] [seq_num (6b)]
    // In the nRF DFU protocol, seq_num is only 3 bits, with 3 bits for ack_num, but we set ack bits to 0
    header[0] = (reliable << 7) | (data_integrity << 6) | (sequence_number & 0x07);
    
    // Second byte: [packet_type (4b)] [data_length_low_nibble (4b)]
    // IMPORTANT: This is different from what's documented! The packet type is in the LOW nibble!
    header[1] = (packet_type & 0x0F) | ((payload_length & 0x0F) << 4);
    
    // Third byte: [data_length_high_bits (8b)]
    header[2] = (payload_length >> 4) & 0xFF;
    
    // Fourth byte: Header checksum
    // Calculated as (~(header[0] + header[1] + header[2]) + 1) & 0xFF
    // This is one's complement of sum + 1
    header[3] = (~(header[0] + header[1] + header[2]) + 1) & 0xFF;
    
    // Debug log the header format
    console.log(`SLIP header created: ${Array.from(header).map(b => b.toString(16).padStart(2, '0')).join(' ')}`);
    console.log(`First byte: seq=${sequence_number}, di=${data_integrity}, rel=${reliable}`);
    console.log(`Second byte: type=${packet_type}, len_low=${payload_length & 0x0F}`);
    console.log(`Third byte: len_high=${(payload_length >> 4) & 0xFF}`);
    console.log(`Fourth byte: checksum=${header[3].toString(16).padStart(2, '0')}`);
    
    return header;
  },
  
  /**
   * Extracts packet information from a decoded SLIP header
   * @param {Uint8Array} header - 4-byte SLIP header
   * @returns {Object} Header information
   */
  parseHeader: function(header) {
    if (header.length < 4) {
      throw new Error("Header must be at least 4 bytes");
    }
    
    const byte0 = header[0];
    const byte1 = header[1];
    const byte2 = header[2];
    const byte3 = header[3];
    
    // Verify header checksum
    const calculatedChecksum = (~(byte0 + byte1 + byte2) + 1) & 0xFF;
    if (byte3 !== calculatedChecksum) {
      throw new Error(`Header checksum mismatch. Expected: ${calculatedChecksum}, got: ${byte3}`);
    }
    
    // Extract header fields
    return {
      sequenceNumber: byte0 & 0x07,
      ackNumber: (byte0 >> 3) & 0x07,
      dataIntegrity: (byte0 >> 6) & 0x01,
      reliable: (byte0 >> 7) & 0x01,
      packetType: (byte1 >> 4) & 0x0F,
      payloadLength: ((byte1 & 0x0F) << 8) | byte2,
      headerChecksum: byte3
    };
  }
};

// Export for ES6 modules
export { SLIP };