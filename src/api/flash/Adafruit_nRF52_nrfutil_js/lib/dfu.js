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
    
    // Update UI
    this.updateStatusMessage(`Error: ${message}`, 'error');
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
    
    // Update UI
    this.updateStatusMessage(`Timeout: ${message}`, 'error');
  }
  
  /**
   * Progress event handler
   * @param {Object} data - Event data
   */
  progressEventHandler(data = {}) {
    if (data.progress !== undefined) {
      // Update progress bar
      this.updateProgress(data.progress);
    }
    
    if (data.message) {
      // Update status message
      this.updateStatusMessage(data.message);
    }
  }
  
  /**
   * Update progress in the UI
   * @param {number} progress - Progress percentage (0-100)
   */
  updateProgress(progress) {
    const progressFill = document.getElementById('progress-fill');
    const progressPercentage = document.getElementById('progress-percentage');
    
    if (progressFill && progressPercentage) {
      progressFill.style.width = `${progress}%`;
      progressPercentage.textContent = `${progress}%`;
    }
  }
  
  /**
   * Update status message in the UI
   * @param {string} message - Status message
   * @param {string} type - Message type (info, success, error, warning)
   */
  updateStatusMessage(message, type = 'info') {
    const statusMessage = document.getElementById('status-message');
    
    if (statusMessage) {
      statusMessage.textContent = message;
      statusMessage.className = `status-${type}`;
    }
  }
  
  /**
   * Execute the DFU process
   * @returns {Promise<void>}
   */
  async executeDfu() {
    try {
      console.log('[DFU] Starting executeDfu - beginning DFU process');
      
      // Update UI to show progress container
      document.getElementById('progress-container').style.display = 'block';
      this.updateStatusMessage('Starting DFU process...');
      
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
      this.updateStatusMessage('Testing device connection...');
      const pingResult = await this.dfuTransport.sendPing().catch(err => {
        console.log('[DFU] Ping failed:', err);
        return false;
      });
      
      if (!pingResult) {
        console.error('[DFU] Ping failed, device may not be in DFU mode');
        this.updateStatusMessage('Device not responding. Ensure it is in DFU mode.', 'error');
        throw new Error('Device not responding to ping. Ensure it is in DFU mode.');
      }
      
      console.log('[DFU] Ping successful, device is responsive');
      this.updateStatusMessage('Device connection confirmed');
      
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
      
      // Update UI
      this.updateStatusMessage('DFU process completed successfully', 'success');
      this.updateProgress(100);
      
      // Close the transport
      console.log('[DFU] Closing transport...');
      await this.dfuTransport.close().catch(err => {
        console.log('[DFU] Error closing transport:', err);
        // Non-fatal error, continue
      });
      console.log('[DFU] Transport closed');
      
    } catch (error) {
      console.error('[DFU] DFU process failed:', error);
      this.updateStatusMessage(`DFU failed: ${error.message}`, 'error');
      
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
   * Add CSS for the reconnection dialog
   * @private
   */
  _addReconnectionDialogStyles() {
    // Check if styles are already added
    if (document.getElementById('reconnection-dialog-styles')) {
      return;
    }
    
    // Create style element
    const style = document.createElement('style');
    style.id = 'reconnection-dialog-styles';
    style.textContent = `
    /* Reconnection Dialog Styles */
    .reconnect-dialog {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.7);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 1000;
    }
    
    .reconnect-dialog-content {
      background-color: white;
      padding: 25px;
      border-radius: 8px;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
      max-width: 500px;
      width: 90%;
    }
    
    .reconnect-dialog-content h2 {
      margin-top: 0;
      color: #0066cc;
      font-size: 22px;
    }
    
    .reconnect-dialog-content p {
      margin-bottom: 20px;
      font-size: 16px;
      line-height: 1.5;
    }
    
    .reconnect-dialog-content ol {
      margin-bottom: 25px;
      padding-left: 25px;
    }
    
    .reconnect-dialog-content li {
      margin-bottom: 10px;
      font-size: 15px;
    }
    
    .primary-button {
      background-color: #4CAF50;
      color: white;
      border: none;
      border-radius: 4px;
      padding: 10px 20px;
      font-size: 16px;
      cursor: pointer;
      transition: background-color 0.2s;
    }
    
    .primary-button:hover {
      background-color: #3e8e41;
    }
    
    .error-message {
      color: #f44336;
      font-size: 14px;
      margin-top: 15px;
      padding: 10px;
      background-color: #ffebee;
      border-radius: 4px;
    }
    `;
    
    // Add to document head
    document.head.appendChild(style);
  }
  
  /**
   * Send all firmware images with reconnection handling
   * This is a special version of dfuSendImages that handles
   * device reset and reconnection during the DFU process
   * @returns {Promise<void>}
   */
  async dfuSendImagesWithReconnection() {
    console.log('[DFU] Beginning dfuSendImagesWithReconnection process');
    
    // Add CSS styles for reconnection dialog
    this._addReconnectionDialogStyles();
    
    let sentAnyImages = false;
    let requiresReconnection = false;
    
    try {
      // Phase 1: Start DFU Process - This may cause device reset
      console.log('[DFU] Phase 1: Sending DFU start command');
      this.updateStatusMessage('Initializing DFU process...');
      
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
        this.updateStatusMessage('Sending DFU start command...');
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
        
        // Show reconnection UI
        this.updateStatusMessage('Device has reset. Please reconnect...', 'info');
        
        // Create a dialog to guide the user through reconnection
        const reconnectDialog = document.createElement('div');
        reconnectDialog.className = 'reconnect-dialog';
        reconnectDialog.innerHTML = `
          <div class="reconnect-dialog-content">
            <h2>Device Reconnection Required</h2>
            <p>The device has reset as part of the DFU process. Please reconnect:</p>
            <ol>
              <li>Wait a few seconds for the device to reboot</li>
              <li>Click the "Reconnect" button when ready</li>
            </ol>
            <button id="reconnect-button" class="primary-button">Reconnect</button>
          </div>
        `;
        document.body.appendChild(reconnectDialog);
        
        // Wait for user to reconnect
        await new Promise((resolve) => {
          document.getElementById('reconnect-button').addEventListener('click', async () => {
            // Button clicked, try to reconnect
            this.updateStatusMessage('Reconnecting to device...', 'info');
            
            try {
              // Open the transport again
              await this.dfuTransport.open();
              await this.dfuTransport.waitForOpen();
              
              // Remove the dialog
              document.body.removeChild(reconnectDialog);
              
              // Resolve the promise
              resolve();
            } catch (error) {
              // Show error message, but keep dialog open for retry
              const errorMessage = document.createElement('p');
              errorMessage.className = 'error-message';
              errorMessage.textContent = `Failed to reconnect: ${error.message}. Please try again.`;
              document.querySelector('.reconnect-dialog-content').appendChild(errorMessage);
            }
          });
        });
        
        // Connection reestablished
        console.log('[DFU] Device successfully reconnected');
        this.updateStatusMessage('Device reconnected successfully');
        
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
      this.updateStatusMessage('Sending initialization packet...');
      await this.dfuTransport.sendInitPacket(initPacket);
      
      // Phase 4: Send firmware data
      console.log('[DFU] Phase 4: Sending firmware data');
      this.updateStatusMessage('Sending firmware...');
      await this.dfuTransport.sendFirmware(new Uint8Array(firmware));
      
      // Phase 5: Validate and activate (if device is still connected)
      console.log('[DFU] Phase 5: Validating and activating firmware');
      
      // Check if device is still connected
      const deviceStillConnected = this.dfuTransport.isOpen();
      
      if (deviceStillConnected) {
        // Device is still connected, try to validate and activate
        this.updateStatusMessage('Validating firmware...');
        try {
          await this.dfuTransport.sendValidateFirmware();
          
          this.updateStatusMessage('Activating new firmware...');
          await this.dfuTransport.sendActivateFirmware();
        } catch (error) {
          // If validation or activation fails because device disconnected, that's fine
          console.log('[DFU] Device disconnected during validation/activation, which is expected:', error.message);
          this.updateStatusMessage('Device is resetting with new firmware...');
        }
      } else {
        // Device already disconnected after STOP_DATA_PACKET, which is fine!
        console.log('[DFU] Device already disconnected after firmware transfer (expected behavior)');
        this.updateStatusMessage('Device is resetting with new firmware...');
      }
      
      // Success! If we made it this far, the transfer was successful
      sentAnyImages = true;
      console.log('[DFU] Firmware sent successfully');
      
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
    this.updateStatusMessage(`Starting firmware transfer (${(firmware.byteLength / 1024).toFixed(1)} KB)...`);
    
    // Send DFU start packet
    try {
      console.log('[DFU] Sending start DFU packet...');
      await this.dfuTransport.sendStartDfu(programMode, softdeviceSize, bootloaderSize, applicationSize);
      console.log('[DFU] Start DFU packet sent successfully');
      
      // Send init packet
      console.log("[DFU] Sending DFU init packet...");
      this.updateStatusMessage("Sending initialization packet...");
      await this.dfuTransport.sendInitPacket(initPacket);
      console.log('[DFU] Init packet sent successfully');
      
      // Send firmware
      console.log("[DFU] Sending firmware file...");
      this.updateStatusMessage("Sending firmware data...");
      await this.dfuTransport.sendFirmware(new Uint8Array(firmware));
      console.log('[DFU] Firmware sent successfully');
      
      // Validate firmware
      console.log("[DFU] Validating firmware...");
      this.updateStatusMessage("Validating firmware...");
      await this.dfuTransport.sendValidateFirmware();
      console.log('[DFU] Firmware validated successfully');
      
      // Activate firmware
      console.log("[DFU] Activating new firmware...");
      this.updateStatusMessage("Activating new firmware...");
      await this.dfuTransport.sendActivateFirmware();
      console.log('[DFU] Firmware activation command sent');
      
      // Wait after activating
      const activateWaitTime = this.dfuTransport.getActivateWaitTime();
      console.log(`[DFU] Waiting ${(activateWaitTime/1000).toFixed(1)} seconds after activating`);
      this.updateStatusMessage(`Waiting for device to activate firmware (${(activateWaitTime/1000).toFixed(1)}s)...`);
      await new Promise(resolve => setTimeout(resolve, activateWaitTime));
      console.log('[DFU] Finished waiting for activation');
      
      // Calculate total time
      const endTime = Date.now();
      const totalTime = (endTime - startTime) / 1000;
      console.log(`[DFU] DFU upgrade completed in ${totalTime.toFixed(1)}s`);
      this.updateStatusMessage(`Firmware update completed in ${totalTime.toFixed(1)} seconds`, 'success');
      
    } catch (error) {
      console.error("[DFU] Error during DFU process:", error);
      console.error("[DFU] Error stack:", error.stack);
      this.updateStatusMessage(`Error during firmware update: ${error.message}`, 'error');
      throw error;
    }
  }
}