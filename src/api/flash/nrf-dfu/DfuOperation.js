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

import logger from "@renderer/utils/Logger";

/**
 * Represents a DFU Operation - the act of updating the firmware on a
 * nRF device.
 * 
 * A firmware update is composed of one or more updates - e.g. bootloader then application,
 * or softdevice then application, or bootloader+softdevice then application, or only
 * one of these pieces.
 */
export default class DfuOperation {
  /**
   * Creates a new DFU operation
   * @param {Object} dfuUpdates - DFU updates object
   * @param {Object} dfuTransport - DFU transport object
   * @param {boolean} autoStart - Whether to start the operation immediately (default: false)
   */
  constructor(dfuUpdates, dfuTransport, autoStart = false) {
    this.updates = dfuUpdates.updates;
    this.transport = dfuTransport;
    
    if (autoStart) {
      this.start();
    }
  }

  /**
   * Starts the DFU operation.
   * 
   * If called with a truthy value for the 'forceful' parameter, then
   * the DFU procedure will skip the steps that detect whether a previous
   * DFU procedure has been interrupted and can be continued.
   * 
   * @param {boolean} forceful - Whether to force restart the DFU procedure (default: false)
   * @returns {Promise<void>}
   */
  start(forceful = false) {
    if (this.finishPromise) {
      return this.finishPromise;
    }
    
    this.finishPromise = this.performNextUpdate(0, forceful);
    return this.finishPromise;
  }

  /**
   * Performs the next update in the sequence
   * @param {number} updateNumber - Update index
   * @param {boolean} forceful - Whether to force restart the DFU procedure
   * @returns {Promise<void>}
   */
  performNextUpdate(updateNumber, forceful) {
    // Check if we've done all updates
    if (this.updates.length <= updateNumber) {
      logger.debug("All updates completed");
      return Promise.resolve();
    }

    let start;
    if (forceful) {
      start = this.transport.restart();
    } else {
      start = Promise.resolve();
    }

    logger.debug(`Starting update ${updateNumber + 1} of ${this.updates.length}`);
    
    return start
      .then(() => {
        logger.debug("Sending init packet");
        return this.transport.sendInitPacket(this.updates[updateNumber].initPacket);
      })
      .then(() => {
        logger.debug("Sending firmware image");
        return this.transport.sendFirmwareImage(this.updates[updateNumber].firmwareImage);
      })
      .then(() => {
        logger.debug(`Update ${updateNumber + 1} completed`);
        // Process the next update
        return this.performNextUpdate(updateNumber + 1, forceful);
      });
  }
}