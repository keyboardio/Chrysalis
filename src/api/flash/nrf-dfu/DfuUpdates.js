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

// Use the main jszip package from npm rather than a specific path
import JSZip from "jszip";
import logger from "@renderer/utils/Logger";

/**
 * Represents a set of DFU updates.
 *
 * A DFU update is an update of either:
 * - The bootloader
 * - The SoftDevice
 * - The user application
 * - The bootloader plus the SoftDevice
 */
export default class DfuUpdates {
  /**
   * Create a new DfuUpdates instance
   * @param {Array} updates - Array of updates
   */
  constructor(updates) {
    this.updates = updates || [];
  }

  /**
   * Instantiates a set of DfuUpdates given the *contents* of a .zip file,
   * as an ArrayBuffer, a Uint8Array, or other data type accepted by JSZip.
   *
   * @param {ArrayBuffer|Uint8Array} zipBytes - The .zip file contents
   * @returns {Promise<DfuUpdates>} A Promise to an instance of DfuUpdates
   */
  static async fromZipFile(zipBytes) {
    try {
      logger.debug("Loading ZIP file");

      const zip = new JSZip();
      const zippedFiles = await zip.loadAsync(zipBytes);

      // Get the manifest
      const manifestString = await zippedFiles.file("manifest.json").async("text");
      logger.debug("Unzipped manifest: ", manifestString);

      const manifest = JSON.parse(manifestString).manifest;
      logger.debug("Parsed manifest:", manifest);

      // Process each update in the manifest
      // We need to handle specific structure with application, bootloader, etc.
      const updates = [];

      // Process application update if present
      if (manifest.application) {
        const initPacketPromise = zippedFiles.file(manifest.application.dat_file).async("uint8array");
        const firmwareImagePromise = zippedFiles.file(manifest.application.bin_file).async("uint8array");

        const [initPacketBytes, firmwareImageBytes] = await Promise.all([initPacketPromise, firmwareImagePromise]);

        updates.push({
          initPacket: initPacketBytes,
          firmwareImage: firmwareImageBytes,
        });
      }

      // Process bootloader update if present
      if (manifest.bootloader) {
        const initPacketPromise = zippedFiles.file(manifest.bootloader.dat_file).async("uint8array");
        const firmwareImagePromise = zippedFiles.file(manifest.bootloader.bin_file).async("uint8array");

        const [initPacketBytes, firmwareImageBytes] = await Promise.all([initPacketPromise, firmwareImagePromise]);

        updates.push({
          initPacket: initPacketBytes,
          firmwareImage: firmwareImageBytes,
        });
      }

      // Process softdevice update if present
      if (manifest.softdevice) {
        const initPacketPromise = zippedFiles.file(manifest.softdevice.dat_file).async("uint8array");
        const firmwareImagePromise = zippedFiles.file(manifest.softdevice.bin_file).async("uint8array");

        const [initPacketBytes, firmwareImageBytes] = await Promise.all([initPacketPromise, firmwareImagePromise]);

        updates.push({
          initPacket: initPacketBytes,
          firmwareImage: firmwareImageBytes,
        });
      }

      // Process softdevice_bootloader update if present
      if (manifest.softdevice_bootloader) {
        const initPacketPromise = zippedFiles.file(manifest.softdevice_bootloader.dat_file).async("uint8array");
        const firmwareImagePromise = zippedFiles.file(manifest.softdevice_bootloader.bin_file).async("uint8array");

        const [initPacketBytes, firmwareImageBytes] = await Promise.all([initPacketPromise, firmwareImagePromise]);

        updates.push({
          initPacket: initPacketBytes,
          firmwareImage: firmwareImageBytes,
        });
      }

      logger.debug(`Loaded ${updates.length} update(s)`);

      return new DfuUpdates(updates);
    } catch (error) {
      logger.error("Error parsing DFU ZIP package:", error);
      throw error;
    }
  }
}
