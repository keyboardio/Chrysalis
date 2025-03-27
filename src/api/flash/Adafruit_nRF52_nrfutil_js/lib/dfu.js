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
 * Main DFU implementation for the nRF52 DFU tool
 * Ported from the Python implementation
 */

import { Package } from './package.js';
import { HexType, DfuEvent } from './models.js';

/**
 * Class to handle the DFU upgrade process
 */
class Dfu {
  /**
   * Constructor
   * @param {ArrayBuffer} zipFileData - The DFU package data
   * @param {DfuTransportSerial} dfuTransport - DFU transport to use
   */
  constructor(zipFileData, dfuTransport) {
    this.zipFileData = zipFileData;
    this.dfuTransport = dfuTransport;
    this.manifest = null;
    this.files = null;
    
    // Register event handlers
    this.dfuTransport.registerEventsCallback(DfuEvent.TIMEOUT_EVENT, this.timeoutEventHandler.bind(this));
    this.dfuTransport.registerEventsCallback(DfuEvent.ERROR_EVENT, this.errorEventHandler.bind(this));
    
    // Bind progress event to show in UI
    this.dfuTransport.registerEventsCallback(DfuEvent.PROGRESS_EVENT, this.progressEventHandler.bind(this));
  }
  
  /**
   * Initialize the DFU process
   * @returns {Promise<void>}
   */
  async initialize() {
    // Unpack the ZIP package
    const result = await Package.unpackPackage(this.zipFileData);
    this.manifest = result.manifest;
    this.files = result.files;
    
    console.log('DFU package initialized', this.manifest);
  }
  
  /**
   * Error event handler
   * @param {Object} data - Event data
   */
  errorEventHandler(data = {}) {
    const message = data.message || "Unknown error occurred";
    console.error(`[DFU ERROR] ${message}`);
    
    // Close transport if open
    if (this.dfuTransport && this.dfuTransport.isOpen()) {
      this.dfuTransport.close();
    }
  }
  
  /**
   * Timeout event handler
   * @param {Object} data - Event data
   */
  timeoutEventHandler(data = {}) {
    const message = data.message || "Operation timed out";
    console.error(`[DFU TIMEOUT] ${message}`);
    
    // Close transport if open
    if (this.dfuTransport && this.dfuTransport.isOpen()) {
      this.dfuTransport.close();
    }
  }
  
  /**
   * Progress event handler
   * @param {Object} data - Event data
   */
  progressEventHandler(data = {}) {
    if (data.progress !== undefined) {
      // Forward progress to any listeners
      this.dfuTransport._sendEvent(DfuEvent.PROGRESS_EVENT, {
        progress: data.progress,
        done: data.done || false
      });
    }
  }
  
  /**
   * Execute the DFU process
   * @returns {Promise<void>}
   */
  async executeDfu() {
    try {
      console.log('[DFU] Starting executeDfu - beginning DFU process');
      
      // Open the transport if not already open
      if (!this.dfuTransport.isOpen()) {
        console.log('[DFU] Transport not open, opening now...');
        await this.dfuTransport.open();
        await this.dfuTransport.waitForOpen();
        console.log('[DFU] Transport opened successfully');
      } else {
        console.log('[DFU] Transport already open');
      }
      
      // First try to ping the device to ensure it's responsive
      console.log('[DFU] Sending ping to test device responsiveness');
      const pingResult = await this.dfuTransport.sendPing().catch(err => {
        console.log('[DFU] Ping failed:', err);
        return false;
      });
      
      if (!pingResult) {
        console.error('[DFU] Ping failed, device may not be in DFU mode');
        throw new Error('Device not responding to ping. Ensure it is in DFU mode.');
      }
      
      console.log('[DFU] Ping successful, device is responsive');
      
      // Check if we have any firmware in the manifest
      if (!this.manifest) {
        throw new Error('No manifest available. Package initialization failed.');
      }
      
      console.log('[DFU] Manifest contents:', this.manifest);
      
      // Log firmware details
      if (this.manifest.application) {
        console.log('[DFU] Found application firmware in manifest');
      }
      if (this.manifest.bootloader) {
        console.log('[DFU] Found bootloader firmware in manifest');
      }
      if (this.manifest.softdevice) {
        console.log('[DFU] Found softdevice firmware in manifest');
      }
      if (this.manifest.softdevice_bootloader) {
        console.log('[DFU] Found combined softdevice_bootloader firmware in manifest');
      }
      
      console.log('[DFU] Starting firmware transfer process...');
      
      // Send firmware images with reconnection handling
      await this.dfuSendImagesWithReconnection();
      
      console.log('[DFU] All firmware images sent successfully');
      
      // Report full completion via event
      this.dfuTransport._sendEvent(DfuEvent.PROGRESS_EVENT, {
        progress: 100,
        done: true,
        message: "DFU process completed successfully"
      });
      
      // Close the transport
      console.log('[DFU] Closing transport...');
      await this.dfuTransport.close().catch(err => {
        console.log('[DFU] Error closing transport:', err);
        // Non-fatal error, continue
      });
      console.log('[DFU] Transport closed');
      
    } catch (error) {
      console.error('[DFU] DFU process failed:', error);
      
      // Ensure transport is closed
      if (this.dfuTransport && this.dfuTransport.isOpen()) {
        console.log('[DFU] Closing transport after error...');
        await this.dfuTransport.close().catch(err => {
          console.log('[DFU] Error closing transport after failure:', err);
        });
      }
      
      throw error;
    }
  }
  
  /**
   * Send all firmware images with reconnection handling
   * This is a special version of dfuSendImages that handles
   * device reset and reconnection during the DFU process
   * @returns {Promise<void>}
   */
  async dfuSendImagesWithReconnection() {
    console.log('[DFU] Beginning dfuSendImagesWithReconnection process');
    
    let sentAnyImages = false;
    let requiresReconnection = false;
    
    try {
      // Phase 1: Start DFU Process - This may cause device reset
      console.log('[DFU] Phase 1: Sending DFU start command');
      this.dfuTransport._sendEvent(DfuEvent.PROGRESS_EVENT, { progress: 10, message: "Initializing DFU process" });
      
      // Find a firmware image to send
      let firmwareManifest = null;
      let firmwareType = null;
      
      if (this.manifest.application) {
        firmwareManifest = this.manifest.application;
        firmwareType = HexType.APPLICATION;
      } else if (this.manifest.bootloader) {
        firmwareManifest = this.manifest.bootloader;
        firmwareType = HexType.BOOTLOADER;
      } else if (this.manifest.softdevice) {
        firmwareManifest = this.manifest.softdevice;
        firmwareType = HexType.SOFTDEVICE;
      } else if (this.manifest.softdevice_bootloader) {
        firmwareManifest = this.manifest.softdevice_bootloader;
        firmwareType = HexType.SD_BL;
      } else {
        throw new Error("No firmware found in manifest");
      }
      
      console.log(`[DFU] Preparing to send firmware type ${firmwareType}`);
      
      // Get firmware files
      const binFilePath = firmwareManifest.bin_file;
      const datFilePath = firmwareManifest.dat_file;
      
      if (!this.files[binFilePath] || !this.files[datFilePath]) {
        throw new Error(`Missing firmware files: ${binFilePath} or ${datFilePath}`);
      }
      
      const firmware = this.files[binFilePath];
      const initPacket = this.files[datFilePath];
      
      console.log(`[DFU] Firmware binary size: ${firmware.byteLength} bytes`);
      
      try {
        // Try to send DFU start command
        this.dfuTransport._sendEvent(DfuEvent.PROGRESS_EVENT, { progress: 15, message: "Sending DFU start command" });
        await this.dfuTransport.sendStartDfu(
          firmwareType, 
          firmwareType === HexType.SOFTDEVICE ? firmware.byteLength : 0,
          firmwareType === HexType.BOOTLOADER ? firmware.byteLength : 0,
          firmwareType === HexType.APPLICATION ? firmware.byteLength : 0
        );
        
        // If successful, we can continue without reconnection
        console.log('[DFU] DFU start command sent successfully');
        requiresReconnection = false;
        
      } catch (error) {
        console.log('[DFU] Device lost connection after DFU start, which is expected');
        console.log('[DFU] Error was:', error.message);
        requiresReconnection = true;
      }
      
      // Phase 2: Reconnect if needed
      if (requiresReconnection) {
        console.log('[DFU] Phase 2: Device reconnection required');
        
        // Close the current connection if it's still open
        try {
          await this.dfuTransport.close();
        } catch (err) {
          console.log('[DFU] Error closing transport before reconnection:', err);
          // Non-fatal, continue
        }
        
        this.dfuTransport._sendEvent(DfuEvent.PROGRESS_EVENT, { 
          progress: 20, 
          message: "Device has reset. Waiting for reconnection..." 
        });
        
        // Wait 3 seconds for device to reboot
        await new Promise(resolve => setTimeout(resolve, 3000));
        
        // Try to reopen the connection
        try {
          // Open the transport again
          await this.dfuTransport.open();
          await this.dfuTransport.waitForOpen();
        } catch (error) {
          console.error('[DFU] Failed to reconnect:', error);
          throw new Error(`Failed to reconnect to device: ${error.message}`);
        }
        
        // Connection reestablished
        console.log('[DFU] Device successfully reconnected');
        this.dfuTransport._sendEvent(DfuEvent.PROGRESS_EVENT, { 
          progress: 25, 
          message: "Device reconnected successfully" 
        });
        
        // Ping to verify connection
        try {
          await this.dfuTransport.sendPing();
          console.log('[DFU] Ping after reconnection successful');
        } catch (error) {
          console.error('[DFU] Ping after reconnection failed:', error);
          throw new Error('Failed to communicate with device after reconnection');
        }
      }
      
      // Phase 3: Send init packet
      console.log('[DFU] Phase 3: Sending init packet');
      this.dfuTransport._sendEvent(DfuEvent.PROGRESS_EVENT, { 
        progress: 30, 
        message: "Sending initialization packet" 
      });
      await this.dfuTransport.sendInitPacket(initPacket);
      
      // Phase 4: Send firmware data
      console.log('[DFU] Phase 4: Sending firmware data');
      this.dfuTransport._sendEvent(DfuEvent.PROGRESS_EVENT, { 
        progress: 40, 
        message: "Sending firmware data" 
      });
      await this.dfuTransport.sendFirmware(new Uint8Array(firmware));
      
      // Phase 5: Validate and activate (if device is still connected)
      console.log('[DFU] Phase 5: Validating and activating firmware');
      
      // Check if device is still connected
      const deviceStillConnected = this.dfuTransport.isOpen();
      
      if (deviceStillConnected) {
        // Device is still connected, try to validate and activate
        this.dfuTransport._sendEvent(DfuEvent.PROGRESS_EVENT, { 
          progress: 90, 
          message: "Validating firmware" 
        });
        
        try {
          await this.dfuTransport.sendValidateFirmware();
          
          this.dfuTransport._sendEvent(DfuEvent.PROGRESS_EVENT, { 
            progress: 95, 
            message: "Activating new firmware" 
          });
          
          await this.dfuTransport.sendActivateFirmware();
        } catch (error) {
          // If validation or activation fails because device disconnected, that's fine
          console.log('[DFU] Device disconnected during validation/activation, which is expected:', error.message);
          this.dfuTransport._sendEvent(DfuEvent.PROGRESS_EVENT, { 
            progress: 95, 
            message: "Device is resetting with new firmware" 
          });
        }
      } else {
        // Device already disconnected after STOP_DATA_PACKET, which is fine!
        console.log('[DFU] Device already disconnected after firmware transfer (expected behavior)');
        this.dfuTransport._sendEvent(DfuEvent.PROGRESS_EVENT, { 
          progress: 95, 
          message: "Device is resetting with new firmware" 
        });
      }
      
      // Success! If we made it this far, the transfer was successful
      sentAnyImages = true;
      console.log('[DFU] Firmware sent successfully');
      
      // Final progress update
      this.dfuTransport._sendEvent(DfuEvent.PROGRESS_EVENT, { 
        progress: 98, 
        message: "Firmware update completed" 
      });
      
    } catch (error) {
      console.error('[DFU] Error during DFU process:', error);
      throw error;
    }
    
    if (!sentAnyImages) {
      throw new Error('No firmware images were sent');
    }
    
    console.log('[DFU] DFU process completed successfully');
  }
  
  /**
   * Send all firmware images from the manifest
   * @returns {Promise<void>}
   */
  async dfuSendImages() {
    console.log('[DFU] Beginning dfuSendImages - processing firmware from manifest');
    
    let sentAnyImages = false;
    
    // Check for combined Softdevice + Bootloader
    if (this.manifest.softdevice_bootloader) {
      console.log('[DFU] Processing softdevice_bootloader firmware...');
      await this._dfuSendImage(HexType.SD_BL, this.manifest.softdevice_bootloader);
      sentAnyImages = true;
    } else {
      console.log('[DFU] No softdevice_bootloader firmware found in manifest');
    }
    
    // Check for Softdevice
    if (this.manifest.softdevice) {
      console.log('[DFU] Processing softdevice firmware...');
      await this._dfuSendImage(HexType.SOFTDEVICE, this.manifest.softdevice);
      sentAnyImages = true;
    } else {
      console.log('[DFU] No softdevice firmware found in manifest');
    }
    
    // Check for Bootloader
    if (this.manifest.bootloader) {
      console.log('[DFU] Processing bootloader firmware...');
      await this._dfuSendImage(HexType.BOOTLOADER, this.manifest.bootloader);
      sentAnyImages = true;
    } else {
      console.log('[DFU] No bootloader firmware found in manifest');
    }
    
    // Check for Application
    if (this.manifest.application) {
      console.log('[DFU] Processing application firmware...');
      await this._dfuSendImage(HexType.APPLICATION, this.manifest.application);
      sentAnyImages = true;
    } else {
      console.log('[DFU] No application firmware found in manifest');
    }
    
    if (!sentAnyImages) {
      console.error('[DFU] No firmware images found in manifest!');
      throw new Error('No firmware images found in manifest');
    }
    
    console.log('[DFU] Completed sending all firmware images');
  }
  
  /**
   * Send one firmware image
   * @param {number} programMode - Type of firmware (from HexType)
   * @param {Object} firmwareManifest - Firmware manifest data
   * @returns {Promise<void>}
   */
  async _dfuSendImage(programMode, firmwareManifest) {
    console.log(`[DFU] _dfuSendImage called for firmware type ${programMode}`);
    console.log(`[DFU] Firmware manifest:`, firmwareManifest);
    
    if (!firmwareManifest) {
      console.error('[DFU] Error: firmware_manifest must be provided');
      throw new Error("firmware_manifest must be provided.");
    }
    
    if (!this.dfuTransport.isOpen()) {
      console.error('[DFU] Error: Transport is not open');
      throw new Error("Transport is not open.");
    }
    
    let softdeviceSize = 0;
    let bootloaderSize = 0;
    let applicationSize = 0;
    
    // Get firmware and init packet data from files
    const binFilePath = firmwareManifest.bin_file;
    const datFilePath = firmwareManifest.dat_file;
    
    console.log(`[DFU] Binary file path: ${binFilePath}`);
    console.log(`[DFU] Init packet file path: ${datFilePath}`);
    
    // Check if files exist in the package
    if (!this.files[binFilePath]) {
      console.error(`[DFU] Error: Missing binary firmware file: ${binFilePath}`);
      console.log(`[DFU] Available files in package:`, Object.keys(this.files));
      throw new Error(`Missing firmware binary file: ${binFilePath}`);
    }
    
    if (!this.files[datFilePath]) {
      console.error(`[DFU] Error: Missing init packet file: ${datFilePath}`);
      console.log(`[DFU] Available files in package:`, Object.keys(this.files));
      throw new Error(`Missing init packet file: ${datFilePath}`);
    }
    
    const firmware = this.files[binFilePath];
    const initPacket = this.files[datFilePath];
    
    console.log(`[DFU] Firmware binary size: ${firmware.byteLength} bytes`);
    console.log(`[DFU] Init packet size: ${initPacket.byteLength} bytes`);
    
    // Set sizes based on program mode
    if (programMode === HexType.SD_BL) {
      // Combined Softdevice and Bootloader
      console.log('[DFU] Processing combined Softdevice + Bootloader firmware');
      
      if (!firmwareManifest.sd_size || !firmwareManifest.bl_size) {
        console.error('[DFU] Error: Missing sd_size or bl_size for combined SD+BL firmware');
        throw new Error("Missing sd_size or bl_size for combined SD+BL firmware");
      }
      
      softdeviceSize = firmwareManifest.sd_size;
      bootloaderSize = firmwareManifest.bl_size;
      
      console.log(`[DFU] Softdevice size: ${softdeviceSize} bytes`);
      console.log(`[DFU] Bootloader size: ${bootloaderSize} bytes`);
      
      // Verify sizes
      if (softdeviceSize + bootloaderSize !== firmware.byteLength) {
        console.error(`[DFU] Size mismatch: SD(${softdeviceSize}) + BL(${bootloaderSize}) != FW(${firmware.byteLength})`);
        throw new Error(
          `Size of bootloader (${bootloaderSize} bytes) and softdevice (${softdeviceSize} bytes) ` +
          `is not equal to firmware provided (${firmware.byteLength} bytes)`
        );
      }
    } 
    else if (programMode === HexType.SOFTDEVICE) {
      console.log('[DFU] Processing Softdevice firmware');
      softdeviceSize = firmware.byteLength;
      console.log(`[DFU] Softdevice size: ${softdeviceSize} bytes`);
    } 
    else if (programMode === HexType.BOOTLOADER) {
      console.log('[DFU] Processing Bootloader firmware');
      bootloaderSize = firmware.byteLength;
      console.log(`[DFU] Bootloader size: ${bootloaderSize} bytes`);
    } 
    else if (programMode === HexType.APPLICATION) {
      console.log('[DFU] Processing Application firmware');
      applicationSize = firmware.byteLength;
      console.log(`[DFU] Application size: ${applicationSize} bytes`);
    }
    
    // Start DFU process for this image
    const startTime = Date.now();
    console.log(`[DFU] Starting DFU upgrade of type ${programMode}, SoftDevice size: ${softdeviceSize}, bootloader size: ${bootloaderSize}, application size: ${applicationSize}`);
    
    // Send progress update
    this.dfuTransport._sendEvent(DfuEvent.PROGRESS_EVENT, { 
      progress: 10, 
      message: `Starting firmware transfer (${(firmware.byteLength / 1024).toFixed(1)} KB)` 
    });
    
    // Send DFU start packet
    try {
      console.log('[DFU] Sending start DFU packet...');
      await this.dfuTransport.sendStartDfu(programMode, softdeviceSize, bootloaderSize, applicationSize);
      console.log('[DFU] Start DFU packet sent successfully');
      
      // Send init packet
      console.log("[DFU] Sending DFU init packet...");
      this.dfuTransport._sendEvent(DfuEvent.PROGRESS_EVENT, { 
        progress: 20, 
        message: "Sending initialization packet" 
      });
      await this.dfuTransport.sendInitPacket(initPacket);
      console.log('[DFU] Init packet sent successfully');
      
      // Send firmware
      console.log("[DFU] Sending firmware file...");
      this.dfuTransport._sendEvent(DfuEvent.PROGRESS_EVENT, { 
        progress: 30, 
        message: "Sending firmware data" 
      });
      await this.dfuTransport.sendFirmware(new Uint8Array(firmware));
      console.log('[DFU] Firmware sent successfully');
      
      // Validate firmware
      console.log("[DFU] Validating firmware...");
      this.dfuTransport._sendEvent(DfuEvent.PROGRESS_EVENT, { 
        progress: 90, 
        message: "Validating firmware" 
      });
      await this.dfuTransport.sendValidateFirmware();
      console.log('[DFU] Firmware validated successfully');
      
      // Activate firmware
      console.log("[DFU] Activating new firmware...");
      this.dfuTransport._sendEvent(DfuEvent.PROGRESS_EVENT, { 
        progress: 95, 
        message: "Activating new firmware" 
      });
      await this.dfuTransport.sendActivateFirmware();
      console.log('[DFU] Firmware activation command sent');
      
      // Wait after activating
      const activateWaitTime = this.dfuTransport.getActivateWaitTime();
      console.log(`[DFU] Waiting ${(activateWaitTime/1000).toFixed(1)} seconds after activating`);
      this.dfuTransport._sendEvent(DfuEvent.PROGRESS_EVENT, { 
        progress: 97, 
        message: `Waiting for device to activate firmware (${(activateWaitTime/1000).toFixed(1)}s)` 
      });
      await new Promise(resolve => setTimeout(resolve, activateWaitTime));
      console.log('[DFU] Finished waiting for activation');
      
      // Calculate total time
      const endTime = Date.now();
      const totalTime = (endTime - startTime) / 1000;
      console.log(`[DFU] DFU upgrade completed in ${totalTime.toFixed(1)}s`);
      this.dfuTransport._sendEvent(DfuEvent.PROGRESS_EVENT, { 
        progress: 100, 
        message: `Firmware update completed in ${totalTime.toFixed(1)} seconds` 
      });
      
    } catch (error) {
      console.error("[DFU] Error during DFU process:", error);
      console.error("[DFU] Error stack:", error.stack);
      throw error;
    }
  }
}

// Export for ES6 modules
export { Dfu };