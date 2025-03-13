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
 * Main controller for the nRF52 DFU tool UI
 */

// Global state
const App = {
  transport: null,
  dfuInstance: null,
  selectedFile: null,
  firmwareData: null,
  
  // Element references
  elements: {
    connectButton: null,
    updateButton: null,
    fileInput: null,
    deviceInfo: null,
    progressContainer: null,
    console: null
  },
  
  /**
   * Initialize the application
   */
  init: function() {
    // Cache elements
    this.elements.connectButton = document.getElementById('connect-button');
    this.elements.updateButton = document.getElementById('update-button');
    this.elements.fileInput = document.getElementById('firmware-file');
    this.elements.deviceInfo = document.getElementById('device-info');
    this.elements.progressContainer = document.getElementById('progress-container');
    this.elements.console = document.getElementById('console');
    
    // Add event listeners
    this.elements.connectButton.addEventListener('click', this.handleConnect.bind(this));
    this.elements.updateButton.addEventListener('click', this.handleUpdate.bind(this));
    this.elements.fileInput.addEventListener('change', this.handleFileSelect.bind(this));
    
    // Check for WebSerial API
    if (!navigator.serial) {
      this.log('WebSerial API is not available. Please use Chrome or Edge browser.', 'error');
      this.elements.connectButton.disabled = true;
      this.elements.updateButton.disabled = true;
    }
    
    this.log('DFU tool initialized. Select a firmware package (.zip) and connect to a device.', 'info');
  },
  
  /**
   * Handle connect button click
   */
  handleConnect: async function() {
    try {
      // Check if transport is already open
      if (this.transport && this.transport.isOpen()) {
        this.log('Disconnecting from device...', 'info');
        
        // Close the connection
        await this.transport.close();
        this.transport = null;
        
        // Update UI
        this.elements.connectButton.textContent = 'Connect';
        this.elements.deviceInfo.style.display = 'none';
        this.elements.updateButton.disabled = true;
        
        this.log('Device disconnected', 'info');
        return;
      }
      
      // Toggle button state
      this.elements.connectButton.disabled = true;
      this.elements.connectButton.textContent = 'Connecting...';
      
      // Create transport
      this.transport = new DfuTransportSerial({
        baudRate: 115200,
        flowControl: false,
        singleBank: false
      });
      
      // Try to open the connection
      await this.transport.open();
      
      // Update UI
      this.elements.connectButton.disabled = false;
      this.elements.connectButton.textContent = 'Disconnect';
      this.elements.deviceInfo.style.display = 'block';
      this.elements.deviceInfo.textContent = 'Device connected. Ready for firmware update.';
      
      // Enable update button if file is selected
      if (this.selectedFile) {
        this.elements.updateButton.disabled = false;
      }
      
      this.log('Device connected successfully', 'success');
      
    } catch (error) {
      this.log(`Connection failed: ${error.message}`, 'error');
      this.elements.connectButton.disabled = false;
      this.elements.connectButton.textContent = 'Connect';
      
      // Close transport if it was created
      if (this.transport && this.transport.isOpen()) {
        await this.transport.close();
      }
      this.transport = null;
    }
  },
  
  /**
   * Handle file selection
   * @param {Event} event - Change event
   */
  handleFileSelect: async function(event) {
    const file = event.target.files[0];
    if (!file) return;
    
    try {
      // Check if it's a ZIP file
      if (!file.name.toLowerCase().endsWith('.zip')) {
        throw new Error('Selected file must be a .zip package');
      }
      
      // Store file reference
      this.selectedFile = file;
      
      // Read file as ArrayBuffer
      this.firmwareData = await this.readFileAsArrayBuffer(file);
      
      this.log(`Firmware package selected: ${file.name} (${(file.size / 1024).toFixed(1)} KB)`, 'info');
      
      // Enable update button if device is connected
      if (this.transport && this.transport.isOpen()) {
        this.elements.updateButton.disabled = false;
      }
      
    } catch (error) {
      this.log(`File selection error: ${error.message}`, 'error');
      this.selectedFile = null;
      this.firmwareData = null;
      this.elements.updateButton.disabled = true;
      
      // Reset file input
      this.elements.fileInput.value = '';
    }
  },
  
  /**
   * Handle update button click
   */
  handleUpdate: async function() {
    if (!this.transport || !this.transport.isOpen() || !this.firmwareData) {
      this.log('No device connected or firmware selected', 'error');
      return;
    }
    
    try {
      // Disable update button and connect button
      this.elements.updateButton.disabled = true;
      this.elements.updateButton.textContent = 'Updating...';
      this.elements.connectButton.disabled = true;
      
      // Show progress container
      this.elements.progressContainer.style.display = 'block';
      
      // Reset progress display
      const progressFill = document.getElementById('progress-fill');
      const progressPercentage = document.getElementById('progress-percentage');
      if (progressFill && progressPercentage) {
        progressFill.style.width = '0%';
        progressPercentage.textContent = '0%';
      }
      
      this.log('Starting DFU process with firmware package...', 'info');
      
      // Initialize DFU instance
      this.dfuInstance = new Dfu(this.firmwareData, this.transport);
      
      this.log('Unpacking firmware package...', 'info');
      await this.dfuInstance.initialize();
      
      this.log('Beginning firmware update...', 'info');
      
      // Execute DFU process
      await this.dfuInstance.executeDfu();
      
      // Update UI
      this.elements.updateButton.textContent = 'Update Complete';
      this.elements.connectButton.disabled = false;
      this.elements.connectButton.textContent = 'Connect';
      
      this.log('Firmware update completed successfully', 'success');
      
      // Clear transport reference since it's closed after DFU
      this.transport = null;
      
    } catch (error) {
      this.log(`Update failed: ${error.message}`, 'error');
      this.elements.updateButton.disabled = false;
      this.elements.updateButton.textContent = 'Update Firmware';
      this.elements.connectButton.disabled = false;
      
      // Close transport if it's still open
      if (this.transport && this.transport.isOpen()) {
        await this.transport.close();
      }
      
      // Reset state
      this.transport = null;
    }
  },
  
  /**
   * Read file as ArrayBuffer
   * @param {File} file - File to read
   * @returns {Promise<ArrayBuffer>} File content as ArrayBuffer
   */
  readFileAsArrayBuffer: function(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      
      reader.onload = () => {
        resolve(reader.result);
      };
      
      reader.onerror = () => {
        reject(new Error('Failed to read file'));
      };
      
      reader.readAsArrayBuffer(file);
    });
  },
  
  /**
   * Log message to console
   * @param {string} message - Message to log
   * @param {string} type - Log type (info, success, error, warning)
   */
  log: function(message, type = 'info') {
    // Create log element
    const logElement = document.createElement('div');
    logElement.className = `log log-${type}`;
    logElement.textContent = message;
    
    // Add to console
    if (this.elements.console) {
      this.elements.console.appendChild(logElement);
      this.elements.console.scrollTop = this.elements.console.scrollHeight;
    }
    
    // Also log to browser console
    switch (type) {
      case 'error':
        console.error(message);
        break;
      case 'warning':
        console.warn(message);
        break;
      case 'success':
        console.info(message);
        break;
      default:
        console.log(message);
    }
  }
};

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  App.init();
});