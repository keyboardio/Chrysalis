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
 * Data models and constants for the nRF52 DFU tool
 */

// HexType enumeration - type of firmware images
const HexType = {
  SOFTDEVICE: 1,
  BOOTLOADER: 2,
  SD_BL: 3,     // Combined Softdevice and Bootloader
  APPLICATION: 4
};

// DFU protocol constants
const DfuProtocol = {
  // Packet type identifiers
  INIT_PACKET: 1,
  PING_PACKET: 2,         // Added ping packet for testing
  START_PACKET: 3,
  DATA_PACKET: 4,
  STOP_DATA_PACKET: 5,
  VALIDATE_FIRMWARE: 7,   // Added validation command
  ACTIVATE_AND_RESET: 6,  // Added missing activate and reset command
  
  // Update modes
  UPDATE_MODE_NONE: 0,
  UPDATE_MODE_SD: 1,
  UPDATE_MODE_BL: 2,
  UPDATE_MODE_APP: 4,
  
  // HCI packet settings
  DATA_INTEGRITY_CHECK_PRESENT: 1,
  RELIABLE_PACKET: 1,
  HCI_PACKET_TYPE: 14,
  
  // Default settings
  DEFAULT_SERIAL_PORT_TIMEOUT: 1.0,
  SERIAL_PORT_OPEN_WAIT_TIME: 0.1,
  TOUCH_RESET_WAIT_TIME: 1.5,
  DTR_RESET_WAIT_TIME: 0.1,
  ACK_PACKET_TIMEOUT: 5.0,  // Increased timeout for better reliability
  
  // Flash parameters
  FLASH_PAGE_SIZE: 4096,
  FLASH_PAGE_ERASE_TIME: 0.0897,
  FLASH_WORD_WRITE_TIME: 0.000100,
  // Calculated as FLASH_PAGE_SIZE/4 * FLASH_WORD_WRITE_TIME:
  FLASH_PAGE_WRITE_TIME: 0.1024,  
  
  // Maximum DFU packet size
  DFU_PACKET_MAX_SIZE: 512
};

// Firmware package fields for the manifest
const FirmwareKeys = {
  FIRMWARE_FILENAME: 'firmware_filename',
  BIN_FILENAME: 'bin_filename',
  DAT_FILENAME: 'dat_filename',
  INIT_PACKET_DATA: 'init_packet_data',
  SD_SIZE: 'sd_size',
  BL_SIZE: 'bl_size'
};

// Init packet fields
const PacketField = {
  DEVICE_TYPE: 'device_type',
  DEVICE_REVISION: 'device_revision',
  APP_VERSION: 'app_version',
  REQUIRED_SOFTDEVICES_ARRAY: 'softdevice_req',
  NORDIC_PROPRIETARY_OPT_DATA_FIRMWARE_LENGTH: 'firmware_length',
  NORDIC_PROPRIETARY_OPT_DATA_FIRMWARE_HASH: 'firmware_hash',
  NORDIC_PROPRIETARY_OPT_DATA_FIRMWARE_CRC16: 'firmware_crc16',
  NORDIC_PROPRIETARY_OPT_DATA_EXT_PACKET_ID: 'ext_packet_id',
  NORDIC_PROPRIETARY_OPT_DATA_INIT_PACKET_ECDS: 'init_packet_ecds'
};

// Init packet extension field values
const PacketExtension = {
  INIT_PACKET_USES_CRC16: 0,
  INIT_PACKET_USES_HASH: 1,
  INIT_PACKET_EXT_USES_ECDS: 2
};

// DFU Events
const DfuEvent = {
  PROGRESS_EVENT: 'progress',
  TIMEOUT_EVENT: 'timeout',
  ERROR_EVENT: 'error'
};

// Package Default Values
const PackageDefaults = {
  DEV_TYPE: 0xFFFF,
  DEV_REV: 0xFFFF,
  APP_VERSION: 0xFFFFFFFF,
  SD_REQ: [0xFFFE],
  DFU_VER: 0.5,
  MANIFEST_FILENAME: 'manifest.json'
};

// Export for ES6 modules
export {
  HexType,
  DfuProtocol,
  FirmwareKeys,
  PacketField,
  PacketExtension,
  DfuEvent,
  PackageDefaults
};