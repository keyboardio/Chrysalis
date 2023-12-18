/* Original copyright:

https://devanlai.github.io/webdfu/dfu-util

Copyright (c) 2016, Devan Lai

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted, provided that the above
copyright notice and this permission notice appear in all copies.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.

*/

const DFUDeviceState = {
  appIDLE: 0, // Device is running its normal application.
  appDETACH: 1, // Device is running its normal application, has received the DFU_DETACH request, and is waiting for a USB reset.
  dfuIDLE: 2, // Device is operating in the DFU mode and is waiting for requests.
  dfuDNLOAD_SYNC: 3, // Device has received a block and is waiting for the host to solicit the status via DFU_GETSTATUS.
  dfuDNBUSY: 4, // Device is programming a control-write block into its nonvolatile memories.
  dfuDNLOAD_IDLE: 5, // Device is processing a download operation. Expecting DFU_DNLOAD requests.
  dfuMANIFEST_SYNC: 6, // Device has received the final block of firmware from the host and is waiting for receipt of DFU_GETSTATUS to begin the Manifestation phase; or device has completed the Manifestation phase and is waiting for receipt of DFU_GETSTATUS. (Devices that can enter this state after the Manifestation phase set bmAttributes bit bitManifestationTolerant to 1.)
  dfuMANIFEST: 7, // Device is in the Manifestation phase. (Not all devices will be able to respond to DFU_GETSTATUS when in this state.)
  dfuMANIFEST_WAIT_RESET: 8, // Device has programmed its memories and is waiting for a USB reset or a power on reset. (Devices that must enter this state clear bitManifestationTolerant to 0.)
  dfuUPLOAD_IDLE: 9, // The device is processing an upload operation. Expecting DFU_UPLOAD requests.
  dfuERROR: 10, // An error has occurred. Awaiting the DFU_CLRSTATUS request.
};

const USBTransferResult = {
  OK: "ok",
};

const DFUDescriptorType = {
  DEVICE: 1,
  CONFIGURATION: 2,
  STRING: 3,
  INTERFACE: 4,
  ENDPOINT: 5,
  DFU_FUNCTIONAL: 0x21,
};
const USBRequest = {
  GET_DESCRIPTOR: 0x06,
};

const USBRequestType = {
  STANDARD: "standard",
  CLASS: "class",
  VENDOR: "vendor",
  RESERVED: "reserved",
};

const USBRecipient = {
  DEVICE: "device",
  INTERFACE: "interface",
  ENDPOINT: "endpoint",
  OTHER: "other",
};

const USBClass = {
  APP_SPECIFIC: 0xfe,
};

const USBSubclass = {
  DFU: 0x01,
};

const DFUCommand = {
  DETACH: 0,
  DNLOAD: 1,
  UPLOAD: 2,
  GETSTATUS: 3,
  CLRSTATUS: 4,
  GETSTATE: 5,
  ABORT: 6,
};

const DFUDeviceStatus = {
  OK: 0x00, // No error condition is present.
  errTARGET: 0x01, // File is not targeted for use by this device.
  errFILE: 0x02, // File is for this device but fails some vendor-specific verification test.
  errWRITE: 0x03, // Device is unable to write memory.
  errERASE: 0x04, // Memory erase function failed.
  errCHECK_ERASED: 0x05, // Memory erase check failed.
  errPROG: 0x06, // Program memory function failed.
  errVERIFY: 0x07, // Programmed memory failed verification.
  errADDRESS: 0x08, // Cannot program memory due to received address that is out of range.
  errNOTDONE: 0x09, // Received DFU_DNLOAD with wLength = 0, but device does not think it has all of the data yet.
  errFIRMWARE: 0x0a, // Device’s firmware is corrupt. It cannot return to run-time (non-DFU) operations.
  errVENDOR: 0x0b, // iString indicates a vendor-specific error.
  errUSBR: 0x0c, // Device detected unexpected USB reset signaling.
  errPOR: 0x0d, // Device detected unexpected power on reset.
  errUNKNOWN: 0x0e, // Something went wrong, but the device does not know what it was.
  errSTALLEDPKT: 0x0f, // Device stalled an unexpected request.
};

const USBParser = {
  parseFunctionalDescriptor: function (data) {
    return {
      bLength: data.getUint8(0),
      bDescriptorType: data.getUint8(1),
      bmAttributes: data.getUint8(2),
      wDetachTimeOut: data.getUint16(3, true),
      wTransferSize: data.getUint16(5, true),
      bcdDFUVersion: data.getUint16(7, true),
    };
  },
  parseInterfaceDescriptor: function (data) {
    return {
      bLength: data.getUint8(0),
      bDescriptorType: data.getUint8(1),
      bInterfaceNumber: data.getUint8(2),
      bAlternateSetting: data.getUint8(3),
      bNumEndpoints: data.getUint8(4),
      bInterfaceClass: data.getUint8(5),
      bInterfaceSubClass: data.getUint8(6),
      bInterfaceProtocol: data.getUint8(7),
      iInterface: data.getUint8(8),
      descriptors: [],
    };
  },

  parseConfigurationDescriptor: function (data) {
    const descriptorData = new DataView(data.buffer.slice(9));
    const descriptors = this.parseSubDescriptors(descriptorData); // Updated reference
    return {
      bLength: data.getUint8(0),
      bDescriptorType: data.getUint8(1),
      wTotalLength: data.getUint16(2, true),
      bNumInterfaces: data.getUint8(4),
      bConfigurationValue: data.getUint8(5),
      iConfiguration: data.getUint8(6),
      bmAttributes: data.getUint8(7),
      bMaxPower: data.getUint8(8),
      descriptors: descriptors,
    };
  },

  parseDeviceDescriptor: function (data) {
    return {
      bLength: data.getUint8(0),
      bDescriptorType: data.getUint8(1),
      bcdUSB: data.getUint16(2, true),
      bDeviceClass: data.getUint8(4),
      bDeviceSubClass: data.getUint8(5),
      bDeviceProtocol: data.getUint8(6),
      bMaxPacketSize: data.getUint8(7),
      idVendor: data.getUint16(8, true),
      idProduct: data.getUint16(10, true),
      bcdDevice: data.getUint16(12, true),
      iManufacturer: data.getUint8(14),
      iProduct: data.getUint8(15),
      iSerialNumber: data.getUint8(16),
      bNumConfigurations: data.getUint8(17),
    };
  },

  parseSubDescriptors: function (descriptorData) {
    let remainingData = descriptorData;
    const descriptors = [];
    let currentInterface;
    let inDfuInterface = false;
    while (remainingData.byteLength > 2) {
      const bLength = remainingData.getUint8(0);
      const bDescriptorType = remainingData.getUint8(1);
      const descriptorData = new DataView(
        remainingData.buffer.slice(0, bLength)
      );
      if (bDescriptorType == DFUDescriptorType.INTERFACE) {
        currentInterface = this.parseInterfaceDescriptor(descriptorData);
        if (
          currentInterface.bInterfaceClass == USBClass.APP_SPECIFIC &&
          currentInterface.bInterfaceSubClass == USBSubclass.DFU
        ) {
          inDfuInterface = true;
        } else {
          inDfuInterface = false;
        }
        descriptors.push(currentInterface);
      } else if (
        inDfuInterface &&
        bDescriptorType == DFUDescriptorType.DFU_FUNCTIONAL
      ) {
        const functionalDescriptor =
          this.parseFunctionalDescriptor(descriptorData);
        descriptors.push(functionalDescriptor);
        currentInterface.descriptors.push(functionalDescriptor);
      } else {
        const descriptor = {
          bLength: bLength,
          bDescriptorType: bDescriptorType,
          data: descriptorData,
        };
        descriptors.push(descriptor);
        if (currentInterface) {
          currentInterface.descriptors.push(descriptor);
        }
      }
      remainingData = new DataView(remainingData.buffer.slice(bLength));
    }

    return descriptors;
  },
};

class DFUUSBDevice {
  constructor(device, settings) {
    this.device_ = device;
    this.settings = settings;
    this.intfNumber = settings["interface"].interfaceNumber;
  }

  logProgress(done, total) {
    if (typeof total === "undefined") {
      console.log(done);
    } else {
      console.log(`${done}/${total}`);
    }
  }

  async open() {
    await this.device_.open();
    const confValue = this.settings.configuration.configurationValue;
    if (
      this.device_.configuration === null ||
      this.device_.configuration.configurationValue != confValue
    ) {
      await this.device_.selectConfiguration(confValue);
    }

    const intfNumber = this.settings["interface"].interfaceNumber;
    if (!this.device_.configuration.interfaces[intfNumber].claimed) {
      await this.device_.claimInterface(intfNumber);
    }

    const altSetting = this.settings.alternate.alternateSetting;
    const intf = this.device_.configuration.interfaces[intfNumber];
    if (
      intf.alternate === null ||
      intf.alternate.alternateSetting != altSetting ||
      intf.alternates.length > 1
    ) {
      try {
        await this.device_.selectAlternateInterface(intfNumber, altSetting);
      } catch (error) {
        if (
          intf.alternate.alternateSetting == altSetting &&
          error.endsWith("Unable to set device interface.")
        ) {
          console.warn(
            `Redundant SET_INTERFACE request to select altSetting ${altSetting} failed`
          );
        } else {
          throw error;
        }
      }
    }
  }

  async close() {
    try {
      await this.device_.close();
    } catch (error) {
      console.log(error);
    }
  }
  async readDeviceDescriptor() {
    const wValue = DFUDescriptorType.DEVICE << 8;

    const result = await this.device_.controlTransferIn(
      {
        requestType: USBRequestType.STANDARD,
        recipient: USBRecipient.DEVICE,
        request: USBRequest.GET_DESCRIPTOR,
        value: wValue,
        index: 0,
      },
      18
    );

    if (result.status == USBTransferResult.OK) {
      return result.data;
    } else {
      throw new Error(result.status);
    }
  }

  async readStringDescriptor(index, langID = 0) {
    const wValue = (DFUDescriptorType.STRING << 8) | index;

    const request_setup = {
      requestType: USBRequestType.STANDARD,
      recipient: USBRecipient.DEVICE,
      request: USBRequest.GET_DESCRIPTOR,
      value: wValue,
      index: langID,
    };

    // Read enough for bLength
    var result = await this.device_.controlTransferIn(request_setup, 1);

    if (result.status == USBTransferResult.OK) {
      // Retrieve the full descriptor
      const bLength = result.data.getUint8(0);
      result = await this.device_.controlTransferIn(request_setup, bLength);
      if (result.status == USBTransferResult.OK) {
        const len = (bLength - 2) / 2;
        const u16_words = [];
        for (let i = 0; i < len; i++) {
          u16_words.push(result.data.getUint16(2 + i * 2, true));
        }
        if (langID == 0) {
          // Return the langID array
          return u16_words;
        } else {
          // Decode from UCS-2 into a string
          return String.fromCharCode.apply(String, u16_words);
        }
      }
    }

    throw `Failed to read string descriptor ${index}: ${result.status}`;
  }

  async readInterfaceNames() {
    const configs = {};
    const allStringIndices = new Set();
    for (
      let configIndex = 0;
      configIndex < this.device_.configurations.length;
      configIndex++
    ) {
      const rawConfig = await this.readConfigurationDescriptor(configIndex);
      const configDesc = USBParser.parseConfigurationDescriptor(rawConfig);
      const configValue = configDesc.bConfigurationValue;
      configs[configValue] = {};

      // Retrieve string indices for interface names
      for (const desc of configDesc.descriptors) {
        if (desc.bDescriptorType == DFUDescriptorType.INTERFACE) {
          if (!(desc.bInterfaceNumber in configs[configValue])) {
            configs[configValue][desc.bInterfaceNumber] = {};
          }
          configs[configValue][desc.bInterfaceNumber][desc.bAlternateSetting] =
            desc.iInterface;
          if (desc.iInterface > 0) {
            allStringIndices.add(desc.iInterface);
          }
        }
      }
    }

    const strings = {};
    // Retrieve interface name strings
    for (const index of allStringIndices) {
      try {
        strings[index] = await this.readStringDescriptor(index, 0x0409);
      } catch (error) {
        console.log(error);
        strings[index] = null;
      }
    }

    for (const configValue in configs) {
      for (const intfNumber in configs[configValue]) {
        for (const alt in configs[configValue][intfNumber]) {
          const iIndex = configs[configValue][intfNumber][alt];
          configs[configValue][intfNumber][alt] = strings[iIndex];
        }
      }
    }

    return configs;
  }
  async readConfigurationDescriptor(index) {
    const wValue = (DFUDescriptorType.CONFIGURATION << 8) | index;

    try {
      let result = await this.device_.controlTransferIn(
        {
          requestType: USBRequestType.STANDARD,
          recipient: USBRecipient.DEVICE,
          request: USBRequest.GET_DESCRIPTOR,
          value: wValue,
          index: 0,
        },
        4
      );

      if (result.status !== USBTransferResult.OK) {
        throw new Error(result.status);
      }

      // Read out length of the configuration descriptor
      const wLength = result.data.getUint16(2, true);

      result = await this.device_.controlTransferIn(
        {
          requestType: USBRequestType.STANDARD,
          recipient: USBRecipient.DEVICE,
          request: USBRequest.GET_DESCRIPTOR,
          value: wValue,
          index: 0,
        },
        wLength
      );

      if (result.status !== USBTransferResult.OK) {
        throw new Error(result.status);
      }

      return result.data;
    } catch (error) {
      throw new Error("ControlTransferIn failed: " + error);
    }
  }

  async _requestOut(bRequest, data, wValue = 0) {
    try {
      const result = await this.device_.controlTransferOut(
        {
          requestType: USBRequestType.CLASS,
          recipient: USBRecipient.INTERFACE,
          request: bRequest,
          value: wValue,
          index: this.intfNumber,
        },
        data
      );

      if (result.status === USBTransferResult.OK) {
        return result.bytesWritten;
      } else {
        throw new Error(result.status);
      }
    } catch (error) {
      throw new Error("ControlTransferOut failed: " + error);
    }
  }

  async _requestIn(bRequest, wLength, wValue = 0) {
    try {
      const result = await this.device_.controlTransferIn(
        {
          requestType: USBRequestType.CLASS,
          recipient: USBRecipient.INTERFACE,
          request: bRequest,
          value: wValue,
          index: this.intfNumber,
        },
        wLength
      );

      if (result.status === USBTransferResult.OK) {
        return result.data;
      } else {
        throw new Error(result.status);
      }
    } catch (error) {
      throw new Error("ControlTransferIn failed: " + error);
    }
  }

  detach() {
    return this._requestOut(DFUCommand.DETACH, undefined, 1000);
  }

  async waitDisconnected(timeout) {
    const device = this;
    const usbDevice = this.device_;
    return new Promise(function (resolve, reject) {
      let timeoutID;
      if (timeout > 0) {
        function onTimeout() {
          navigator.usb.removeEventListener("disconnect", onDisconnect);
          if (device.disconnected !== true) {
            reject("Disconnect timeout expired");
          }
        }
        timeoutID = setTimeout(reject, timeout);
      }

      function onDisconnect(event) {
        if (event.device === usbDevice) {
          if (timeout > 0) {
            clearTimeout(timeoutID);
          }
          device.disconnected = true;
          navigator.usb.removeEventListener("disconnect", onDisconnect);
          event.stopPropagation();
          resolve(device);
        }
      }

      navigator.usb.addEventListener("disconnect", onDisconnect);
    });
  }

  erase() {
    // TODO XXX this doesn't exist in the spec?
    return this._requestOut(dfu.ERASE);
  }
  _downloadBytes(data, blockNum) {
    return this._requestOut(DFUCommand.DNLOAD, data, blockNum);
  }

  _uploadBytes(length, blockNum) {
    return this._requestIn(DFUCommand.UPLOAD, length, blockNum);
  }

  clearStatus() {
    return this._requestOut(DFUCommand.CLRSTATUS);
  }

  async getStatus() {
    try {
      const data = await this._requestIn(DFUCommand.GETSTATUS, 6);
      return {
        status: data.getUint8(0),
        pollTimeout: 5, // data.getUint32(1, true) & 0xFFFFFF,
        state: data.getUint8(4),
      };
    } catch (error) {
      throw new Error("DFU GETSTATUS failed: " + error);
    }
  }

  getState() {
    return this._requestIn(DFUCommand.GETSTATE, 1).then(
      (data) => Promise.resolve(data.getUint8(0)),
      (error) => Promise.reject("DFU GETSTATE failed: " + error)
    );
  }

  _abort() {
    return this._requestOut(DFUCommand.ABORT);
  }

  async _abortToIdle() {
    await this._abort();
    let state = await this.getState();
    if (state == DFUDeviceState.dfuERROR) {
      await this.clearStatus();
      state = await this.getState();
    }
    if (state != DFUDeviceState.dfuIDLE) {
      throw "Failed to return to idle state after abort: state " + state.state;
    }
  }

  async do_upload(xfer_size, max_size = Infinity, first_block = 0) {
    let transaction = first_block;
    const blocks = [];
    let bytes_read = 0;

    console.log("Copying data from DFU device to browser");
    // Initialize progress to 0
    this.logProgress(0);

    let result;
    let bytes_to_read;
    do {
      bytes_to_read = Math.min(xfer_size, max_size - bytes_read);
      result = await this._uploadBytes(bytes_to_read, transaction++);
      console.debug("Read " + result.byteLength + " bytes");
      if (result.byteLength > 0) {
        blocks.push(result);
        bytes_read += result.byteLength;
      }
      if (Number.isFinite(max_size)) {
        this.logProgress(bytes_read, max_size);
      } else {
        this.logProgress(bytes_read);
      }
    } while (bytes_read < max_size && result.byteLength == bytes_to_read);

    if (bytes_read == max_size) {
      await this._abortToIdle();
    }

    console.log(`Read ${bytes_read} bytes`);

    return new Blob(blocks, { type: "application/octet-stream" });
  }

  async _poll_until(state_predicate) {
    let dfu_status = await this.getStatus();

    const device = this;
    function async_sleep(duration_ms) {
      return new Promise(function (resolve, reject) {
        console.debug("Sleeping for " + duration_ms + "ms");
        setTimeout(resolve, duration_ms);
      });
    }

    while (
      !state_predicate(dfu_status.state) &&
      dfu_status.state != DFUDeviceState.dfuERROR
    ) {
      await async_sleep(dfu_status.pollTimeout);
      dfu_status = await this.getStatus();
    }

    return dfu_status;
  }

  _poll_until_idle(idle_state) {
    return this._poll_until((state) => state == idle_state);
  }

  async do_download(xfer_size, data, manifestationTolerant) {
    let bytes_sent = 0;
    const expected_size = data.byteLength;
    let transaction = 0;

    console.log("Copying data from browser to DFU device");

    // Initialize progress to 0
    this.logProgress(bytes_sent, expected_size);

    while (bytes_sent < expected_size) {
      const bytes_left = expected_size - bytes_sent;
      const chunk_size = Math.min(bytes_left, xfer_size);

      let bytes_written = 0;
      let dfu_status;
      try {
        bytes_written = await this._downloadBytes(
          data.slice(bytes_sent, bytes_sent + chunk_size),
          transaction++
        );
        console.debug("Sent " + bytes_written + " bytes");
        dfu_status = await this._poll_until_idle(DFUDeviceState.dfuDNLOAD_IDLE);
      } catch (error) {
        throw "Error during DFU download: " + error;
      }

      if (dfu_status.status != DFUDeviceStatus.OK) {
        throw `DFU DOWNLOAD failed state=${dfu_status.state}, status=${dfu_status.status}`;
      }

      console.debug("Wrote " + bytes_written + " bytes");
      bytes_sent += bytes_written;

      this.logProgress(bytes_sent, expected_size);
    }

    console.debug("Sending empty block");
    try {
      await this._downloadBytes(new ArrayBuffer([]), transaction++);
    } catch (error) {
      throw "Error during final DFU download: " + error;
    }

    console.log("Wrote " + bytes_sent + " bytes. Manifesting new firmware.");

    if (manifestationTolerant) {
      console.log("Manifestation tolerant");
      // Transition to MANIFEST_SYNC state
      let dfu_status;
      try {
        // Wait until it returns to idle.
        // If it's not really manifestation tolerant, it might transition to MANIFEST_WAIT_RESET
        dfu_status = await this._poll_until(
          (state) =>
            state == DFUDeviceState.dfuIDLE ||
            state == DFUDeviceState.dfuMANIFEST_WAIT_RESET
        );
        if (dfu_status.state == DFUDeviceState.dfuMANIFEST_WAIT_RESET) {
          console.debug(
            "Device transitioned to MANIFEST_WAIT_RESET even though it is manifestation tolerant"
          );
        }
        if (dfu_status.status != DFUDeviceStatus.OK) {
          throw `DFU MANIFEST failed state=${dfu_status.state}, status=${dfu_status.status}`;
        }
      } catch (error) {
        if (
          error.endsWith(
            "ControlTransferIn failed: NotFoundError: Device unavailable."
          ) ||
          error.endsWith(
            "ControlTransferIn failed: NotFoundError: The device was disconnected."
          )
        ) {
          console.warn("Unable to poll final manifestation status");
        } else {
          throw "Error during DFU manifest: " + error;
        }
      }
    } else {
      console.log("manifestation not tolerant");
      // Try polling once to initiate manifestation
      try {
        const final_status = await this.getStatus();
        console.debug(
          `Final DFU status: state=${final_status.state}, status=${final_status.status}`
        );
      } catch (error) {
        console.debug("Manifest GET_STATUS poll error: " + error);
      }
    }

    // Reset to exit MANIFEST_WAIT_RESET
    this.resetToApplicationMode();
    return;
  }

  async resetToApplicationMode() {
    try {
      console.log("Attempting a device reset");
      await this.device_.reset();
      console.log("Done waiting;");
    } catch (error) {
      if (
        error == "NetworkError: Unable to reset the device." ||
        error == "NotFoundError: Device unavailable." ||
        error == "NotFoundError: The device was disconnected."
      ) {
        console.debug("Ignored reset error ", error);
      } else {
        throw "Error during reset for manifestation: " + error;
      }
    }
  }
}

const DFU = {
  findDeviceDfuInterfaces: function (device) {
    const interfaces = [];
    for (const configuration of device.configurations) {
      for (const configInterface of configuration.interfaces) {
        for (const alt of configInterface.alternates) {
          if (
            alt.interfaceClass == USBClass.APP_SPECIFIC &&
            alt.interfaceSubclass == USBSubclass.DFU &&
            (alt.interfaceProtocol == 0x01 || alt.interfaceProtocol == 0x02)
          ) {
            const settings = {
              configuration: configuration,
              interface: configInterface,
              alternate: alt,
              name: alt.interfaceName,
            };
            interfaces.push(settings);
          }
        }
      }
    }

    return interfaces;
  },

  findAllDfuInterfaces: function () {
    return navigator.usb.getDevices().then((devices) => {
      const matches = [];
      for (const device of devices) {
        const interfaces = DFU.findDeviceDfuInterfaces(device);
        for (const interface_ of interfaces) {
          matches.push(new DFUUSBDevice(device, interface_));
        }
      }
      return matches;
    });
  },
};

export { DFUDeviceState, DFUDescriptorType, DFUUSBDevice, DFU, USBParser };
