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
 * Package handling for the nRF52 DFU tool
 * Ported from the Python implementation
 */

/**
 * Nordic DFU Package class
 * Handles packaging and unpackaging of Nordic DFU packages
 */
class Package {
  /**
   * Constructor
   * @param {Object} options - Options for creating a package
   * @param {number} options.devType - Device type
   * @param {number} options.devRev - Device revision
   * @param {number} options.appVersion - Application version
   * @param {Array<number>} options.sdReq - Softdevice requirements
   * @param {string} options.appFw - Path to application firmware file
   * @param {string} options.bootloaderFw - Path to bootloader firmware file
   * @param {string} options.softdeviceFw - Path to softdevice firmware file
   * @param {number} options.dfuVer - DFU version
   * @param {string} options.keyFile - Path to signing key file
   */
  constructor(options = {}) {
    this.dfuVer = options.dfuVer || PackageDefaults.DFU_VER;
    this.keyFile = options.keyFile || null;
    
    this.initPacketData = {};
    
    // Set init packet fields from options
    if (options.devType !== undefined) {
      this.initPacketData[PacketField.DEVICE_TYPE] = options.devType;
    } else {
      this.initPacketData[PacketField.DEVICE_TYPE] = PackageDefaults.DEV_TYPE;
    }
    
    if (options.devRev !== undefined) {
      this.initPacketData[PacketField.DEVICE_REVISION] = options.devRev;
    } else {
      this.initPacketData[PacketField.DEVICE_REVISION] = PackageDefaults.DEV_REV;
    }
    
    if (options.appVersion !== undefined) {
      this.initPacketData[PacketField.APP_VERSION] = options.appVersion;
    } else {
      this.initPacketData[PacketField.APP_VERSION] = PackageDefaults.APP_VERSION;
    }
    
    if (options.sdReq !== undefined) {
      this.initPacketData[PacketField.REQUIRED_SOFTDEVICES_ARRAY] = options.sdReq;
    } else {
      this.initPacketData[PacketField.REQUIRED_SOFTDEVICES_ARRAY] = PackageDefaults.SD_REQ;
    }
    
    // Will hold firmware data
    this.firmwaresData = {};
    
    // Process firmware files if provided
    if (options.appFw) {
      this.addFirmware(HexType.APPLICATION, options.appFw);
    }
    
    if (options.bootloaderFw) {
      this.addFirmware(HexType.BOOTLOADER, options.bootloaderFw);
    }
    
    if (options.softdeviceFw) {
      this.addFirmware(HexType.SOFTDEVICE, options.softdeviceFw);
    }
    
    // Special case for signed packages
    if (options.keyFile) {
      this.dfuVer = 0.8;
    }
  }
  
  /**
   * Add firmware to the package
   * @param {number} firmwareType - Type of firmware from HexType
   * @param {ArrayBuffer} firmwareData - Firmware data
   * @param {Object} extraData - Extra data to include (optional)
   * @returns {void}
   */
  addFirmware(firmwareType, firmwareData, extraData = {}) {
    // Create a copy of the init packet data
    const initData = { ...this.initPacketData };
    
    // Add the firmware to the package
    this.firmwaresData[firmwareType] = {
      [FirmwareKeys.FIRMWARE_FILENAME]: null,  // Not using filenames in JS version
      [FirmwareKeys.INIT_PACKET_DATA]: initData,
      [FirmwareKeys.BIN_FILENAME]: null,       // Will be set during package creation
      [FirmwareKeys.DAT_FILENAME]: null        // Will be set during package creation
    };
    
    // Store the actual firmware data
    this.firmwaresData[firmwareType].firmwareData = firmwareData;
    
    // Add any extra data
    for (const key in extraData) {
      this.firmwaresData[firmwareType][key] = extraData[key];
    }
  }
  
  /**
   * Create a manifest for the package
   * @returns {Object} Manifest object
   */
  createManifest() {
    const manifest = {
      manifest: {}
    };
    
    // Add firmware entries to manifest
    for (const firmwareType in this.firmwaresData) {
      const firmware = this.firmwaresData[firmwareType];
      let manifestKey;
      
      // Set the manifest key based on firmware type
      switch (parseInt(firmwareType)) {
        case HexType.APPLICATION:
          manifestKey = 'application';
          break;
        case HexType.BOOTLOADER:
          manifestKey = 'bootloader';
          break;
        case HexType.SOFTDEVICE:
          manifestKey = 'softdevice';
          break;
        case HexType.SD_BL:
          manifestKey = 'softdevice_bootloader';
          break;
        default:
          continue;  // Skip unknown types
      }
      
      // Create the entry
      manifest.manifest[manifestKey] = {
        bin_file: firmware[FirmwareKeys.BIN_FILENAME],
        dat_file: firmware[FirmwareKeys.DAT_FILENAME],
        init_packet_data: { ...firmware[FirmwareKeys.INIT_PACKET_DATA] }
      };
      
      // Add specific fields for SD_BL
      if (parseInt(firmwareType) === HexType.SD_BL) {
        if (firmware[FirmwareKeys.SD_SIZE]) {
          manifest.manifest[manifestKey].sd_size = firmware[FirmwareKeys.SD_SIZE];
        }
        if (firmware[FirmwareKeys.BL_SIZE]) {
          manifest.manifest[manifestKey].bl_size = firmware[FirmwareKeys.BL_SIZE];
        }
      }
    }
    
    return manifest;
  }
  
  /**
   * Process firmware data to create the necessary init packets
   * @returns {Promise<Object>} Package files
   */
  async generatePackageFiles() {
    const files = {};
    
    // Check for bootloader & softdevice combination
    if (this.firmwaresData[HexType.BOOTLOADER] && this.firmwaresData[HexType.SOFTDEVICE]) {
      // Combine bootloader and softdevice
      this._createCombinedFirmware();
    }
    
    // Process each firmware
    for (const firmwareType in this.firmwaresData) {
      const firmware = this.firmwaresData[firmwareType];
      const firmwareData = firmware.firmwareData;
      
      if (!firmwareData) {
        console.warn(`No data for firmware type ${firmwareType}`);
        continue;
      }
      
      // Generate bin filename
      const binFilename = `type_${firmwareType}.bin`;
      firmware[FirmwareKeys.BIN_FILENAME] = binFilename;
      
      // Store the firmware binary
      files[binFilename] = firmwareData;
      
      // Calculate hash or CRC based on DFU version
      const initPacketData = firmware[FirmwareKeys.INIT_PACKET_DATA];
      
      if (this.dfuVer <= 0.5) {
        // Calculate CRC16
        const crc = await CRC16.calculateFromFile(firmwareData);
        initPacketData[PacketField.NORDIC_PROPRIETARY_OPT_DATA_FIRMWARE_CRC16] = crc;
      } 
      else if (this.dfuVer === 0.6) {
        // DFU 0.6 uses extended packet with CRC16
        initPacketData[PacketField.NORDIC_PROPRIETARY_OPT_DATA_EXT_PACKET_ID] = PacketExtension.INIT_PACKET_USES_CRC16;
        const crc = await CRC16.calculateFromFile(firmwareData);
        initPacketData[PacketField.NORDIC_PROPRIETARY_OPT_DATA_FIRMWARE_CRC16] = crc;
      } 
      else if (this.dfuVer === 0.7) {
        // DFU 0.7 uses extended packet with SHA256 hash
        initPacketData[PacketField.NORDIC_PROPRIETARY_OPT_DATA_EXT_PACKET_ID] = PacketExtension.INIT_PACKET_USES_HASH;
        initPacketData[PacketField.NORDIC_PROPRIETARY_OPT_DATA_FIRMWARE_LENGTH] = firmwareData.byteLength;
        
        // Calculate SHA256 hash
        const hashBuffer = await crypto.subtle.digest('SHA-256', firmwareData);
        initPacketData[PacketField.NORDIC_PROPRIETARY_OPT_DATA_FIRMWARE_HASH] = new Uint8Array(hashBuffer);
      } 
      else if (this.dfuVer === 0.8) {
        // DFU 0.8 uses extended packet with ECDS signature
        initPacketData[PacketField.NORDIC_PROPRIETARY_OPT_DATA_EXT_PACKET_ID] = PacketExtension.INIT_PACKET_EXT_USES_ECDS;
        
        // Calculate SHA256 hash
        const hashBuffer = await crypto.subtle.digest('SHA-256', firmwareData);
        initPacketData[PacketField.NORDIC_PROPRIETARY_OPT_DATA_FIRMWARE_HASH] = new Uint8Array(hashBuffer);
        initPacketData[PacketField.NORDIC_PROPRIETARY_OPT_DATA_FIRMWARE_LENGTH] = firmwareData.byteLength;
        
        // For ECDS signatures, we'd need the key file
        // This is not implemented in this version since it requires Node.js crypto
        // Could be added later with WebCrypto if needed
        if (this.keyFile) {
          console.warn('ECDS signature generation not implemented in browser version');
        }
      }
      
      // Generate init packet
      const initPacket = new InitPacket(initPacketData);
      const packetData = initPacket.generatePacket();
      
      // Generate dat filename
      const datFilename = binFilename.replace('.bin', '.dat');
      firmware[FirmwareKeys.DAT_FILENAME] = datFilename;
      
      // Store the init packet
      files[datFilename] = packetData;
    }
    
    // Create manifest
    const manifest = this.createManifest();
    files[PackageDefaults.MANIFEST_FILENAME] = new TextEncoder().encode(JSON.stringify(manifest, null, 2));
    
    return files;
  }
  
  /**
   * Create a ZIP package with the firmware and manifest
   * @returns {Promise<Blob>} Package ZIP file
   */
  async generatePackage() {
    const files = await this.generatePackageFiles();
    return await ZipUtils.createZip(files);
  }
  
  /**
   * Create combined Softdevice + Bootloader firmware
   * @private
   */
  _createCombinedFirmware() {
    // Not implemented - would require parsing HEX files
    // For browser implementation, we'd likely require pre-combined files
    console.warn('Combined Softdevice+Bootloader not implemented in browser version');
  }
  
  /**
   * Static method to unpack a DFU package
   * @param {ArrayBuffer} packageData - Package data as ArrayBuffer
   * @returns {Promise<Object>} Parsed manifest and files
   */
  static async unpackPackage(packageData) {
    console.log('Unpacking DFU package...');
    
    try {
      // Extract the ZIP
      const files = await ZipUtils.extractZip(packageData);
      console.log(`Extracted ${Object.keys(files).length} files from package`);
      console.log('Files in package:', Object.keys(files).join(', '));
      
      // Check for manifest file
      if (!files[PackageDefaults.MANIFEST_FILENAME]) {
        console.error(`Error: No manifest file (${PackageDefaults.MANIFEST_FILENAME}) found in package`);
        throw new Error(`No manifest.json found in firmware package. The package may be invalid or corrupted.`);
      }
      
      // Parse the manifest
      const manifest = ZipUtils.parseManifest(files);
      console.log('Parsed manifest content:', manifest);
      
      // Validate manifest
      if (!manifest) {
        console.error('Error: Manifest could not be parsed');
        throw new Error('Invalid manifest format in firmware package');
      }
      
      // Check if manifest has any firmware entries
      const hasFirmware = manifest.application || 
                        manifest.bootloader || 
                        manifest.softdevice || 
                        manifest.softdevice_bootloader;
      
      if (!hasFirmware) {
        console.error('Error: No firmware entries found in manifest');
        throw new Error('No firmware entries found in manifest. The package may be invalid.');
      }
      
      // Print firmware information
      if (manifest.application) {
        console.log('Found application firmware:');
        console.log(`- Binary file: ${manifest.application.bin_file}`);
        console.log(`- Binary size: ${files[manifest.application.bin_file]?.byteLength || 'unknown'} bytes`);
        
        // Verify binary and init packet files exist
        if (!files[manifest.application.bin_file]) {
          console.error(`Error: Application binary file '${manifest.application.bin_file}' not found in package`);
          throw new Error(`Application binary file not found in firmware package`);
        }
        
        if (!files[manifest.application.dat_file]) {
          console.error(`Error: Application init packet file '${manifest.application.dat_file}' not found in package`);
          throw new Error(`Application init packet file not found in firmware package`);
        }
      }
      
      if (manifest.bootloader) {
        console.log('Found bootloader firmware:');
        console.log(`- Binary file: ${manifest.bootloader.bin_file}`);
        console.log(`- Binary size: ${files[manifest.bootloader.bin_file]?.byteLength || 'unknown'} bytes`);
        
        // Verify binary and init packet files exist
        if (!files[manifest.bootloader.bin_file]) {
          console.error(`Error: Bootloader binary file '${manifest.bootloader.bin_file}' not found in package`);
          throw new Error(`Bootloader binary file not found in firmware package`);
        }
        
        if (!files[manifest.bootloader.dat_file]) {
          console.error(`Error: Bootloader init packet file '${manifest.bootloader.dat_file}' not found in package`);
          throw new Error(`Bootloader init packet file not found in firmware package`);
        }
      }
      
      if (manifest.softdevice) {
        console.log('Found softdevice firmware:');
        console.log(`- Binary file: ${manifest.softdevice.bin_file}`);
        console.log(`- Binary size: ${files[manifest.softdevice.bin_file]?.byteLength || 'unknown'} bytes`);
        
        // Verify binary and init packet files exist
        if (!files[manifest.softdevice.bin_file]) {
          console.error(`Error: Softdevice binary file '${manifest.softdevice.bin_file}' not found in package`);
          throw new Error(`Softdevice binary file not found in firmware package`);
        }
        
        if (!files[manifest.softdevice.dat_file]) {
          console.error(`Error: Softdevice init packet file '${manifest.softdevice.dat_file}' not found in package`);
          throw new Error(`Softdevice init packet file not found in firmware package`);
        }
      }
      
      if (manifest.softdevice_bootloader) {
        console.log('Found combined softdevice+bootloader firmware:');
        console.log(`- Binary file: ${manifest.softdevice_bootloader.bin_file}`);
        console.log(`- Binary size: ${files[manifest.softdevice_bootloader.bin_file]?.byteLength || 'unknown'} bytes`);
        console.log(`- SD size: ${manifest.softdevice_bootloader.sd_size || 'unknown'} bytes`);
        console.log(`- BL size: ${manifest.softdevice_bootloader.bl_size || 'unknown'} bytes`);
        
        // Verify binary and init packet files exist
        if (!files[manifest.softdevice_bootloader.bin_file]) {
          console.error(`Error: SD+BL binary file '${manifest.softdevice_bootloader.bin_file}' not found in package`);
          throw new Error(`Combined softdevice+bootloader binary file not found in firmware package`);
        }
        
        if (!files[manifest.softdevice_bootloader.dat_file]) {
          console.error(`Error: SD+BL init packet file '${manifest.softdevice_bootloader.dat_file}' not found in package`);
          throw new Error(`Combined softdevice+bootloader init packet file not found in firmware package`);
        }
        
        // Verify SD+BL size info is present
        if (!manifest.softdevice_bootloader.sd_size || !manifest.softdevice_bootloader.bl_size) {
          console.error('Error: Missing sd_size or bl_size in softdevice_bootloader entry');
          throw new Error('Invalid combined softdevice+bootloader firmware entry in manifest');
        }
      }
      
      console.log('Package validation completed successfully.');
      
      return {
        manifest,
        files
      };
      
    } catch (error) {
      console.error('Error unpacking DFU package:', error);
      // Propagate the error to the caller
      throw error;
    }
  }
}

/**
 * Manifest class for reading and validating the firmware manifest
 */
class Manifest {
  /**
   * Constructor
   * @param {Object} manifest - Manifest object
   */
  constructor(manifest) {
    this.manifest = manifest;
    this.firmwares = {};
    
    // Parse manifest to extract firmware information
    this._parseManifest();
  }
  
  /**
   * Parse manifest and extract firmware information
   * @private
   */
  _parseManifest() {
    if (!this.manifest || !this.manifest.manifest) {
      throw new Error('Invalid manifest format');
    }
    
    const manifestData = this.manifest.manifest;
    
    // Extract application firmware
    if (manifestData.application) {
      this.application = this._extractFirmwareInfo(manifestData.application);
    }
    
    // Extract bootloader firmware
    if (manifestData.bootloader) {
      this.bootloader = this._extractFirmwareInfo(manifestData.bootloader);
    }
    
    // Extract softdevice firmware
    if (manifestData.softdevice) {
      this.softdevice = this._extractFirmwareInfo(manifestData.softdevice);
    }
    
    // Extract combined softdevice + bootloader firmware
    if (manifestData.softdevice_bootloader) {
      const sdbl = this._extractFirmwareInfo(manifestData.softdevice_bootloader);
      
      // Add SD/BL sizes if available
      if (manifestData.softdevice_bootloader.sd_size) {
        sdbl.sd_size = manifestData.softdevice_bootloader.sd_size;
      }
      if (manifestData.softdevice_bootloader.bl_size) {
        sdbl.bl_size = manifestData.softdevice_bootloader.bl_size;
      }
      
      this.softdevice_bootloader = sdbl;
    }
  }
  
  /**
   * Extract firmware information from manifest entry
   * @param {Object} entry - Manifest entry
   * @returns {Object} Firmware information
   * @private
   */
  _extractFirmwareInfo(entry) {
    return {
      bin_file: entry.bin_file,
      dat_file: entry.dat_file,
      init_packet_data: entry.init_packet_data || {}
    };
  }
  
  /**
   * Create Manifest from JSON string
   * @param {string} json - JSON string
   * @returns {Manifest} Manifest object
   * @static
   */
  static fromJson(json) {
    try {
      const manifest = JSON.parse(json);
      return new Manifest(manifest);
    } catch (e) {
      throw new Error(`Failed to parse manifest JSON: ${e.message}`);
    }
  }
}