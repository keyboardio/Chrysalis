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
 * ZIP file handling utilities for the nRF52 DFU tool
 * Uses JSZip library loaded from CDN
 */

// Dynamically load JSZip library if needed
function loadJSZip() {
  return new Promise((resolve, reject) => {
    if (window.JSZip) {
      resolve(window.JSZip);
      return;
    }
    
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/jszip/3.10.1/jszip.min.js';
    script.integrity = 'sha512-XMVd28F1oH/O71fzwBnV7HucLxVwtxf26XV8P4wPk26EDxuGZ91N8bsOttmnomcCD3CS5ZMRL50H0GgOHvegtg==';
    script.crossOrigin = 'anonymous';
    script.onload = () => resolve(window.JSZip);
    script.onerror = () => reject(new Error('Failed to load JSZip library'));
    document.head.appendChild(script);
  });
}

const ZipUtils = {
  /**
   * Extract a ZIP file to memory
   * @param {ArrayBuffer} zipData - ZIP file data as ArrayBuffer
   * @returns {Promise<Object>} Object containing the extracted files as { filename: Uint8Array }
   */
  extractZip: async function(zipData) {
    try {
      console.log('[ZIP] Loading JSZip library...');
      const JSZip = await loadJSZip();
      console.log('[ZIP] JSZip library loaded successfully');
      
      console.log(`[ZIP] Loading ZIP data (${zipData.byteLength} bytes)...`);
      const zip = await JSZip.loadAsync(zipData);
      console.log('[ZIP] ZIP data loaded successfully');
      
      // Get file list
      const fileList = [];
      zip.forEach((path, file) => {
        fileList.push({
          path: path,
          isDirectory: file.dir,
          size: file.dir ? 0 : file._data.uncompressedSize
        });
      });
      
      console.log('[ZIP] Files in ZIP archive:');
      fileList.forEach(file => {
        console.log(`[ZIP] - ${file.path} ${file.isDirectory ? '(directory)' : `(${file.size} bytes)`}`);
      });
      
      const files = {};
      
      // Process each file in the zip
      const extractPromises = [];
      
      console.log('[ZIP] Extracting files...');
      zip.forEach((path, file) => {
        if (!file.dir) {
          console.log(`[ZIP] Extracting ${path} (${file._data.uncompressedSize} bytes)...`);
          const promise = file.async('uint8array').then(content => {
            console.log(`[ZIP] Extracted ${path} (${content.byteLength} bytes)`);
            files[path] = content;
          }).catch(err => {
            console.error(`[ZIP] Error extracting ${path}: ${err.message}`);
            throw err;
          });
          extractPromises.push(promise);
        }
      });
      
      // Wait for all files to be extracted
      await Promise.all(extractPromises);
      console.log('[ZIP] All files extracted successfully');
      
      return files;
    } catch (error) {
      console.error('[ZIP] Error extracting ZIP data:', error);
      throw new Error(`Failed to extract ZIP data: ${error.message}`);
    }
  },
  
  /**
   * Parse the manifest.json file from extracted ZIP files
   * @param {Object} files - Object containing extracted files
   * @returns {Object} Parsed manifest object
   */
  parseManifest: function(files) {
    console.log('[ZIP] Parsing manifest.json...');
    
    if (!files['manifest.json']) {
      console.error('[ZIP] Error: manifest.json not found in files');
      console.log('[ZIP] Available files:', Object.keys(files).join(', '));
      throw new Error('Manifest file not found in firmware package');
    }
    
    const manifestBytes = files['manifest.json'];
    console.log(`[ZIP] Manifest file size: ${manifestBytes.byteLength} bytes`);
    
    const manifestText = new TextDecoder().decode(manifestBytes);
    
    try {
      const manifest = JSON.parse(manifestText);
      console.log('[ZIP] Manifest parsed successfully');
      
      // Additional validation
      if (!manifest.manifest) {
        console.error('[ZIP] Error: Invalid manifest structure, missing "manifest" key');
        throw new Error('Invalid manifest structure, missing "manifest" key');
      }
      
      return manifest.manifest;
    } catch (error) {
      console.error('[ZIP] Error parsing manifest:', error);
      console.error('[ZIP] Manifest content:', manifestText);
      throw new Error(`Failed to parse manifest: ${error.message}`);
    }
  },
  
  /**
   * Create a new ZIP file with the given files
   * @param {Object} files - Object containing files to add { filename: Uint8Array }
   * @returns {Promise<Blob>} ZIP file as a Blob
   */
  createZip: async function(files) {
    const JSZip = await loadJSZip();
    const zip = new JSZip();
    
    // Add files to zip
    for (const [filename, content] of Object.entries(files)) {
      zip.file(filename, content);
    }
    
    // Generate zip file
    return await zip.generateAsync({
      type: 'blob',
      compression: 'DEFLATE',
      compressionOptions: { level: 6 }
    });
  }
};