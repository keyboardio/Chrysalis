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

var dfu = {};

(function () {
  "use strict";

  dfu.DETACH = 0x00;
  dfu.DNLOAD = 0x01;
  dfu.UPLOAD = 0x02;
  dfu.GETSTATUS = 0x03;
  dfu.CLRSTATUS = 0x04;
  dfu.GETSTATE = 0x05;
  dfu.ABORT = 6;

  dfu.appIDLE = 0;
  dfu.appDETACH = 1;
  dfu.dfuIDLE = 2;
  dfu.dfuDNLOAD_SYNC = 3;
  dfu.dfuDNBUSY = 4;
  dfu.dfuDNLOAD_IDLE = 5;
  dfu.dfuMANIFEST_SYNC = 6;
  dfu.dfuMANIFEST = 7;
  dfu.dfuMANIFEST_WAIT_RESET = 8;
  dfu.dfuUPLOAD_IDLE = 9;
  dfu.dfuERROR = 10;

  dfu.STATUS_OK = 0x0;

  dfu.Device = function (device, settings) {
    this.device_ = device;
    this.settings = settings;
    this.intfNumber = settings["interface"].interfaceNumber;
  };

  dfu.findDeviceDfuInterfaces = function (device) {
    const interfaces = [];
    for (const conf of device.configurations) {
      for (const intf of conf.interfaces) {
        for (const alt of intf.alternates) {
          if (
            alt.interfaceClass == 0xfe &&
            alt.interfaceSubclass == 0x01 &&
            (alt.interfaceProtocol == 0x01 || alt.interfaceProtocol == 0x02)
          ) {
            const settings = {
              configuration: conf,
              interface: intf,
              alternate: alt,
              name: alt.interfaceName,
            };
            interfaces.push(settings);
          }
        }
      }
    }

    return interfaces;
  };

  dfu.findAllDfuInterfaces = function () {
    return navigator.usb.getDevices().then((devices) => {
      const matches = [];
      for (const device of devices) {
        const interfaces = dfu.findDeviceDfuInterfaces(device);
        for (const interface_ of interfaces) {
          matches.push(new dfu.Device(device, interface_));
        }
      }
      return matches;
    });
  };

  dfu.Device.prototype.logDebug = function (msg) {
    console.log("Debug: ", msg);
  };

  dfu.Device.prototype.logInfo = function (msg) {
    console.log(msg);
  };

  dfu.Device.prototype.logWarning = function (msg) {
    console.log(msg);
  };

  dfu.Device.prototype.logError = function (msg) {
    console.log(msg);
  };

  dfu.Device.prototype.logProgress = function (done, total) {
    if (typeof total === "undefined") {
      console.log(done);
    } else {
      console.log(done + "/" + total);
    }
  };

  dfu.Device.prototype.open = async function () {
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
    let intf = this.device_.configuration.interfaces[intfNumber];
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
          this.logWarning(
            `Redundant SET_INTERFACE request to select altSetting ${altSetting} failed`
          );
        } else {
          throw error;
        }
      }
    }
  };

  dfu.Device.prototype.close = async function () {
    try {
      await this.device_.close();
    } catch (error) {
      console.log(error);
    }
  };

  dfu.Device.prototype.readDeviceDescriptor = function () {
    const GET_DESCRIPTOR = 0x06;
    const DT_DEVICE = 0x01;
    const wValue = DT_DEVICE << 8;

    return this.device_
      .controlTransferIn(
        {
          requestType: "standard",
          recipient: "device",
          request: GET_DESCRIPTOR,
          value: wValue,
          index: 0,
        },
        18
      )
      .then((result) => {
        if (result.status == "ok") {
          return Promise.resolve(result.data);
        } else {
          return Promise.reject(result.status);
        }
      });
  };

  dfu.Device.prototype.readStringDescriptor = async function (index, langID) {
    if (typeof langID === "undefined") {
      langID = 0;
    }

    const GET_DESCRIPTOR = 0x06;
    const DT_STRING = 0x03;
    const wValue = (DT_STRING << 8) | index;

    const request_setup = {
      requestType: "standard",
      recipient: "device",
      request: GET_DESCRIPTOR,
      value: wValue,
      index: langID,
    };

    // Read enough for bLength
    var result = await this.device_.controlTransferIn(request_setup, 1);

    if (result.status == "ok") {
      // Retrieve the full descriptor
      const bLength = result.data.getUint8(0);
      result = await this.device_.controlTransferIn(request_setup, bLength);
      if (result.status == "ok") {
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
  };

  dfu.Device.prototype.readInterfaceNames = async function () {
    const DT_INTERFACE = 4;

    const configs = {};
    const allStringIndices = new Set();
    for (
      let configIndex = 0;
      configIndex < this.device_.configurations.length;
      configIndex++
    ) {
      const rawConfig = await this.readConfigurationDescriptor(configIndex);
      const configDesc = dfu.parseConfigurationDescriptor(rawConfig);
      const configValue = configDesc.bConfigurationValue;
      configs[configValue] = {};

      // Retrieve string indices for interface names
      for (const desc of configDesc.descriptors) {
        if (desc.bDescriptorType == DT_INTERFACE) {
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
  };

  dfu.parseDeviceDescriptor = function (data) {
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
  };

  dfu.parseConfigurationDescriptor = function (data) {
    const descriptorData = new DataView(data.buffer.slice(9));
    const descriptors = dfu.parseSubDescriptors(descriptorData);
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
  };

  dfu.parseInterfaceDescriptor = function (data) {
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
  };

  dfu.parseFunctionalDescriptor = function (data) {
    return {
      bLength: data.getUint8(0),
      bDescriptorType: data.getUint8(1),
      bmAttributes: data.getUint8(2),
      wDetachTimeOut: data.getUint16(3, true),
      wTransferSize: data.getUint16(5, true),
      bcdDFUVersion: data.getUint16(7, true),
    };
  };

  dfu.parseSubDescriptors = function (descriptorData) {
    const DT_INTERFACE = 4;
    const DT_ENDPOINT = 5;
    const DT_DFU_FUNCTIONAL = 0x21;
    const USB_CLASS_APP_SPECIFIC = 0xfe;
    const USB_SUBCLASS_DFU = 0x01;
    let remainingData = descriptorData;
    const descriptors = [];
    let currIntf;
    let inDfuIntf = false;
    while (remainingData.byteLength > 2) {
      const bLength = remainingData.getUint8(0);
      const bDescriptorType = remainingData.getUint8(1);
      const descData = new DataView(remainingData.buffer.slice(0, bLength));
      if (bDescriptorType == DT_INTERFACE) {
        currIntf = dfu.parseInterfaceDescriptor(descData);
        if (
          currIntf.bInterfaceClass == USB_CLASS_APP_SPECIFIC &&
          currIntf.bInterfaceSubClass == USB_SUBCLASS_DFU
        ) {
          inDfuIntf = true;
        } else {
          inDfuIntf = false;
        }
        descriptors.push(currIntf);
      } else if (inDfuIntf && bDescriptorType == DT_DFU_FUNCTIONAL) {
        const funcDesc = dfu.parseFunctionalDescriptor(descData);
        descriptors.push(funcDesc);
        currIntf.descriptors.push(funcDesc);
      } else {
        const desc = {
          bLength: bLength,
          bDescriptorType: bDescriptorType,
          data: descData,
        };
        descriptors.push(desc);
        if (currIntf) {
          currIntf.descriptors.push(desc);
        }
      }
      remainingData = new DataView(remainingData.buffer.slice(bLength));
    }

    return descriptors;
  };

  dfu.Device.prototype.readConfigurationDescriptor = function (index) {
    const GET_DESCRIPTOR = 0x06;
    const DT_CONFIGURATION = 0x02;
    const wValue = (DT_CONFIGURATION << 8) | index;

    return this.device_
      .controlTransferIn(
        {
          requestType: "standard",
          recipient: "device",
          request: GET_DESCRIPTOR,
          value: wValue,
          index: 0,
        },
        4
      )
      .then((result) => {
        if (result.status == "ok") {
          // Read out length of the configuration descriptor
          let wLength = result.data.getUint16(2, true);
          return this.device_.controlTransferIn(
            {
              requestType: "standard",
              recipient: "device",
              request: GET_DESCRIPTOR,
              value: wValue,
              index: 0,
            },
            wLength
          );
        } else {
          return Promise.reject(result.status);
        }
      })
      .then((result) => {
        if (result.status == "ok") {
          return Promise.resolve(result.data);
        } else {
          return Promise.reject(result.status);
        }
      });
  };

  dfu.Device.prototype.requestOut = function (bRequest, data, wValue = 0) {
    return this.device_
      .controlTransferOut(
        {
          requestType: "class",
          recipient: "interface",
          request: bRequest,
          value: wValue,
          index: this.intfNumber,
        },
        data
      )
      .then(
        (result) => {
          if (result.status == "ok") {
            return Promise.resolve(result.bytesWritten);
          } else {
            return Promise.reject(result.status);
          }
        },
        (error) => {
          return Promise.reject("ControlTransferOut failed: " + error);
        }
      );
  };

  dfu.Device.prototype.requestIn = function (bRequest, wLength, wValue = 0) {
    return this.device_
      .controlTransferIn(
        {
          requestType: "class",
          recipient: "interface",
          request: bRequest,
          value: wValue,
          index: this.intfNumber,
        },
        wLength
      )
      .then(
        (result) => {
          if (result.status == "ok") {
            return Promise.resolve(result.data);
          } else {
            return Promise.reject(result.status);
          }
        },
        (error) => {
          return Promise.reject("ControlTransferIn failed: " + error);
        }
      );
  };

  dfu.Device.prototype.detach = function () {
    return this.requestOut(dfu.DETACH, undefined, 1000);
  };

  dfu.Device.prototype.waitDisconnected = async function (timeout) {
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
  };

  dfu.Device.prototype.erase = function () {
    return this.requestOut(dfu.ERASE);
  };
  dfu.Device.prototype.download = function (data, blockNum) {
    return this.requestOut(dfu.DNLOAD, data, blockNum);
  };

  dfu.Device.prototype.dnload = dfu.Device.prototype.download;

  dfu.Device.prototype.upload = function (length, blockNum) {
    return this.requestIn(dfu.UPLOAD, length, blockNum);
  };

  dfu.Device.prototype.clearStatus = function () {
    return this.requestOut(dfu.CLRSTATUS);
  };

  dfu.Device.prototype.clrStatus = dfu.Device.prototype.clearStatus;

  dfu.Device.prototype.getStatus = function () {
    return this.requestIn(dfu.GETSTATUS, 6).then(
      (data) =>
        Promise.resolve({
          status: data.getUint8(0),
          pollTimeout: 5, // data.getUint32(1, true) & 0xFFFFFF,
          state: data.getUint8(4),
        }),
      (error) => Promise.reject("DFU GETSTATUS failed: " + error)
    );
  };

  dfu.Device.prototype.getState = function () {
    return this.requestIn(dfu.GETSTATE, 1).then(
      (data) => Promise.resolve(data.getUint8(0)),
      (error) => Promise.reject("DFU GETSTATE failed: " + error)
    );
  };

  dfu.Device.prototype.abort = function () {
    return this.requestOut(dfu.ABORT);
  };

  dfu.Device.prototype.abortToIdle = async function () {
    await this.abort();
    let state = await this.getState();
    if (state == dfu.dfuERROR) {
      await this.clearStatus();
      state = await this.getState();
    }
    if (state != dfu.dfuIDLE) {
      throw "Failed to return to idle state after abort: state " + state.state;
    }
  };

  dfu.Device.prototype.do_upload = async function (
    xfer_size,
    max_size = Infinity,
    first_block = 0
  ) {
    let transaction = first_block;
    const blocks = [];
    let bytes_read = 0;

    this.logInfo("Copying data from DFU device to browser");
    // Initialize progress to 0
    this.logProgress(0);

    let result;
    let bytes_to_read;
    do {
      bytes_to_read = Math.min(xfer_size, max_size - bytes_read);
      result = await this.upload(bytes_to_read, transaction++);
      this.logDebug("Read " + result.byteLength + " bytes");
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
      await this.abortToIdle();
    }

    this.logInfo(`Read ${bytes_read} bytes`);

    return new Blob(blocks, { type: "application/octet-stream" });
  };

  dfu.Device.prototype.poll_until = async function (state_predicate) {
    let dfu_status = await this.getStatus();

    const device = this;
    function async_sleep(duration_ms) {
      return new Promise(function (resolve, reject) {
        device.logDebug("Sleeping for " + duration_ms + "ms");
        setTimeout(resolve, duration_ms);
      });
    }

    while (
      !state_predicate(dfu_status.state) &&
      dfu_status.state != dfu.dfuERROR
    ) {
      await async_sleep(dfu_status.pollTimeout);
      dfu_status = await this.getStatus();
    }

    return dfu_status;
  };

  dfu.Device.prototype.poll_until_idle = function (idle_state) {
    return this.poll_until((state) => state == idle_state);
  };

  dfu.Device.prototype.do_download = async function (
    xfer_size,
    data,
    manifestationTolerant
  ) {
    let bytes_sent = 0;
    const expected_size = data.byteLength;
    let transaction = 0;

    this.logInfo("Copying data from browser to DFU device");

    // Initialize progress to 0
    this.logProgress(bytes_sent, expected_size);

    while (bytes_sent < expected_size) {
      const bytes_left = expected_size - bytes_sent;
      const chunk_size = Math.min(bytes_left, xfer_size);

      let bytes_written = 0;
      let dfu_status;
      try {
        bytes_written = await this.download(
          data.slice(bytes_sent, bytes_sent + chunk_size),
          transaction++
        );
        this.logDebug("Sent " + bytes_written + " bytes");
        dfu_status = await this.poll_until_idle(dfu.dfuDNLOAD_IDLE);
      } catch (error) {
        throw "Error during DFU download: " + error;
      }

      if (dfu_status.status != dfu.STATUS_OK) {
        throw `DFU DOWNLOAD failed state=${dfu_status.state}, status=${dfu_status.status}`;
      }

      this.logDebug("Wrote " + bytes_written + " bytes");
      bytes_sent += bytes_written;

      this.logProgress(bytes_sent, expected_size);
    }

    this.logDebug("Sending empty block");
    try {
      await this.download(new ArrayBuffer([]), transaction++);
    } catch (error) {
      throw "Error during final DFU download: " + error;
    }

    this.logInfo("Wrote " + bytes_sent + " bytes");
    this.logInfo("Manifesting new firmware");

    if (manifestationTolerant) {
      this.logInfo("Manifestation tolerant");
      // Transition to MANIFEST_SYNC state
      let dfu_status;
      try {
        // Wait until it returns to idle.
        // If it's not really manifestation tolerant, it might transition to MANIFEST_WAIT_RESET
        dfu_status = await this.poll_until(
          (state) => state == dfu.dfuIDLE || state == dfu.dfuMANIFEST_WAIT_RESET
        );
        if (dfu_status.state == dfu.dfuMANIFEST_WAIT_RESET) {
          this.logDebug(
            "Device transitioned to MANIFEST_WAIT_RESET even though it is manifestation tolerant"
          );
        }
        if (dfu_status.status != dfu.STATUS_OK) {
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
          this.logWarning("Unable to poll final manifestation status");
        } else {
          throw "Error during DFU manifest: " + error;
        }
      }
    } else {
      this.logInfo("manifestation not tolerant");
      // Try polling once to initiate manifestation
      try {
        const final_status = await this.getStatus();
        this.logDebug(
          `Final DFU status: state=${final_status.state}, status=${final_status.status}`
        );
      } catch (error) {
        this.logDebug("Manifest GET_STATUS poll error: " + error);
      }
    }

    // Reset to exit MANIFEST_WAIT_RESET
    try {
      this.logInfo("Attempting a device reset");
      await this.device_.reset();
      this.logInfo("Done waiting;");
    } catch (error) {
      if (
        error == "NetworkError: Unable to reset the device." ||
        error == "NotFoundError: Device unavailable." ||
        error == "NotFoundError: The device was disconnected."
      ) {
        this.logDebug("Ignored reset error ", error);
      } else {
        throw "Error during reset for manifestation: " + error;
      }
    }

    return;
  };
})();
