/**
 * SLIP encoder/decoder module. Based on slip.js by Colin Clark.
 * Copyright 2017, Colin Clark. Licensed under MIT.
 * 
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

// SLIP protocol constants
const END = 192;     // 0xC0 - Marks the end of a packet
const ESC = 219;     // 0xDB - Escape character
const ESC_END = 220; // 0xDC - ESC ESC_END means END data byte
const ESC_ESC = 221; // 0xDD - ESC ESC_ESC means ESC data byte

/**
 * Converts generic array-like data into a Uint8Array
 * @param {Array|ArrayBuffer|Uint8Array} data - Input data
 * @param {number} offset - Start offset
 * @param {number} length - Data length
 * @returns {Uint8Array} Uint8Array view of the data
 */
export function byteArray(data, offset, length) {
  return data instanceof ArrayBuffer ? new Uint8Array(data, offset, length) : data;
}

/**
 * Creates a new array twice as large as the input array, copying the input data
 * @param {Uint8Array} arr - Input array
 * @returns {Uint8Array} Expanded array (2x length)
 */
export function expandByteArray(arr) {
  const expanded = new Uint8Array(arr.length * 2);
  expanded.set(arr);
  return expanded;
}

/**
 * Slices a byte array to extract a portion
 * @param {Uint8Array} arr - Input array
 * @param {number} start - Start index
 * @param {number} end - End index
 * @returns {Uint8Array} Sliced array
 */
export function sliceByteArray(arr, start, end) {
  const sliced = arr.buffer.slice ? arr.buffer.slice(start, end) : arr.subarray(start, end);
  return new Uint8Array(sliced);
}

/**
 * SLIP encodes a byte array
 * @param {Array|ArrayBuffer|Uint8Array} bytes - Input data
 * @param {Object} options - Encoding options
 * @returns {Uint8Array} SLIP encoded data
 */
export function encode(bytes, options = {}) {
  const o = options;
  o.bufferPadding = o.bufferPadding || 4; // Will be rounded to the nearest 4 bytes.
  const data = byteArray(bytes, o.offset, o.byteLength);

  const bufLen = (data.length + o.bufferPadding + 3) & ~0x03;
  let encoded = new Uint8Array(bufLen);
  let j = 1;

  encoded[0] = END;

  for (let i = 0; i < data.length; i += 1) {
    // We always need enough space for two value bytes plus a trailing END.
    if (j > encoded.length - 3) {
      encoded = expandByteArray(encoded);
    }

    let val = data[i];
    if (val === END) {
      encoded[j] = ESC;
      j += 1;
      val = ESC_END;
    } else if (val === ESC) {
      encoded[j] = ESC;
      j += 1;
      val = ESC_ESC;
    }

    encoded[j] = val;
    j += 1;
  }

  encoded[j] = END;
  return sliceByteArray(encoded, 0, j + 1);
}

/**
 * SLIP Decoder class for decoding SLIP-encoded data
 */
export class Decoder {
  /**
   * Creates a new SLIP Decoder
   * @param {Function|Object} onMessage - Callback function or options object
   */
  constructor(onMessage) {
    const o = typeof onMessage !== 'function' ? onMessage || {} : {
      onMessage,
    };

    this.maxMessageSize = o.maxMessageSize || 10485760; // Defaults to 10 MB.
    this.bufferSize = o.bufferSize || 1024; // Message buffer defaults to 1 KB.
    this.msgBuffer = new Uint8Array(this.bufferSize);
    this.msgBufferIdx = 0;
    this.onMessage = o.onMessage;
    this.onError = o.onError;
    this.escape = false;
  }

  /**
   * Decodes SLIP-encoded data
   * @param {Array|ArrayBuffer|Uint8Array} bytes - Input encoded data
   * @returns {Uint8Array|undefined} Decoded data or undefined
   */
  decode(bytes) {
    const data = byteArray(bytes);

    let msg;
    for (let i = 0; i < data.length; i += 1) {
      let val = data[i];

      if (this.escape) {
        if (val === ESC_ESC) {
          val = ESC;
        } else if (val === ESC_END) {
          val = END;
        }
      } else {
        if (val === ESC) {
          this.escape = true;
          continue;
        }
        if (val === END) {
          msg = this.handleEnd();
          continue;
        }
      }

      const more = this.addByte(val);
      if (!more) {
        this.handleMessageMaxError();
      }
    }

    return msg;
  }

  /**
   * Handles the case when the message size exceeds the maximum
   */
  handleMessageMaxError() {
    if (this.onError) {
      this.onError(
        this.msgBuffer.subarray(0),
        `The message is too large; the maximum message size is ${this.maxMessageSize / 1024}KB.`
      );
    }

    // Reset everything and carry on.
    this.msgBufferIdx = 0;
    this.escape = false;
  }

  /**
   * Adds a byte to the message buffer
   * @param {number} val - Byte value to add
   * @returns {boolean} Whether more bytes can be added
   */
  addByte(val) {
    if (this.msgBufferIdx > this.msgBuffer.length - 1) {
      this.msgBuffer = expandByteArray(this.msgBuffer);
    }

    this.msgBuffer[this.msgBufferIdx] = val;
    this.msgBufferIdx += 1;
    this.escape = false;

    return this.msgBuffer.length < this.maxMessageSize;
  }

  /**
   * Handles the end of a SLIP message
   * @returns {Uint8Array|undefined} The decoded message or undefined
   */
  handleEnd() {
    if (this.msgBufferIdx === 0) {
      return undefined; // Toss opening END byte and carry on.
    }

    const msg = sliceByteArray(this.msgBuffer, 0, this.msgBufferIdx);
    if (this.onMessage) {
      this.onMessage(msg);
    }

    // Clear our pointer into the message buffer.
    this.msgBufferIdx = 0;

    return msg;
  }
}