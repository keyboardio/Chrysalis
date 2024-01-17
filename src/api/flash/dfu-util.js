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

import { DFUDeviceState, DFUUSBDevice, DFUDescriptorType, DFU } from "./dfu";
var device = null;

(function () {
  "use strict";

  function populateInterfaceList(form, device_, interfaces) {
    const old_choices = Array.from(form.getElementsByTagName("div"));
    for (const radio_div of old_choices) {
      form.removeChild(radio_div);
    }

    const button = form.getElementsByTagName("button")[0];

    for (let i = 0; i < interfaces.length; i++) {
      const radio = document.createElement("input");
      radio.type = "radio";
      radio.name = "interfaceIndex";
      radio.value = i;
      radio.id = "interface" + i;
      radio.required = true;

      const label = document.createElement("label");
      label.className = "radio";
      label.setAttribute("for", "interface" + i);

      const div = document.createElement("div");
      div.appendChild(radio);
      div.appendChild(label);
      form.insertBefore(div, button);
    }
  }

  document.addEventListener("DOMContentLoaded", (event) => {
    const connectButton = document.querySelector("#connect");
    const downloadButton = document.querySelector("#download");
    const statusDisplay = document.querySelector("#status");
    const infoDisplay = document.querySelector("#usbInfo");
    const dfuDisplay = document.querySelector("#dfuInfo");
    const interfaceDialog = document.querySelector("#interfaceDialog");
    const interfaceForm = document.querySelector("#interfaceForm");

    const searchParams = new URLSearchParams(window.location.search);
    let fromLandingPage = false;
    let vid; // = parseInt("0x3496"); // Default to keyboardio devices
    // Set the vendor ID from the landing page URL
    if (searchParams.has("vid")) {
      const vidString = searchParams.get("vid");
      try {
        if (vidString.toLowerCase().startsWith("0x")) {
          vid = parseInt(vidString, 16);
        } else {
          vid = parseInt(vidString, 10);
        }
        fromLandingPage = true;
      } catch (error) {
        console.log("Bad VID " + vidString + ":" + error);
      }
    }

    // Grab the serial number from the landing page
    let serial = "";
    if (searchParams.has("serial")) {
      serial = searchParams.get("serial");
      // Workaround for Chromium issue 339054
      if (window.location.search.endsWith("/") && serial.endsWith("/")) {
        serial = serial.substring(0, serial.length - 1);
      }
      fromLandingPage = true;
    }

    let transferSize = 1024;

    let firmwareFile = null;
    const firmwareVersionSelect = document.getElementById("firmwareVersion");

    let manifestationTolerant = true;

    async function fetchSelectedFirmware() {
      const firmwareVersion = firmwareVersionSelect.options[firmwareVersionSelect.selectedIndex].value;

      console.log("Firmware filename is ", firmwareVersion);
      const response = await fetch("firmware/" + firmwareVersion + "/Keyboardio/Model100/default.bin");
      const firmware = await response.arrayBuffer();
      console.log(firmware);
      return firmware;
    }
    //let device;

    function onDisconnect(reason) {
      console.log("Disconnected: " + reason);
    }

    function onUnexpectedDisconnect(event) {
      if (device !== null && device.device_ !== null) {
        if (device.device_ === event.device) {
          device.disconnected = true;
          onDisconnect("Device disconnected");
          device = null;
        }
      }
    }
    async function detach() {
      if (device) {
        try {
          await device.detach();
          let detached = false;

          try {
            await device.close();
            await device.waitDisconnected(5000);
            detached = true;
          } catch (err) {
            console.log("Detach failed: " + err);
          }

          onDisconnect();
          device = null;

          if (detached) {
            setTimeout(autoConnect, 5000); // Wait a few seconds and try reconnecting
          }
        } catch (error) {
          await device.close();
          onDisconnect(error);
          device = null;
        }
      }
    }

    async function autoConnect(vid, serial) {
      try {
        const dfu_devices = await DFU.findAllDfuInterfaces();
        const matching_devices = dfu_devices.filter((dfu_device) => {
          if (serial) {
            return dfu_device.device_.serialNumber === serial;
          } else {
            return dfu_device.device_.vendorId === vid;
          }
        });

        if (matching_devices.length === 0) {
          console.log("No device found.");
        } else {
          if (matching_devices.length === 1) {
            console.log("Connecting");
            device = matching_devices[0];
            console.log(device);
            device = await connect(device);
          } else {
            console.log("Multiple DFU interfaces found.");
          }

          vid = matching_devices[0].device_.vendorId;
        }
      } catch (error) {
        statusDisplay.textContent = `Error in autoConnect: ${error}`;
      }
    }

    connectButton.addEventListener("click", clickConnect);

    const clickConnect = async () => {
      try {
        if (device) {
          await device.close();
          onDisconnect();
          device = null;
        } else {
          const filters = [];
          if (serial) {
            filters.push({ serialNumber: serial });
          } else if (vid) {
            filters.push({ vendorId: vid });
          }

          const selectedDevice = await navigator.usb.requestDevice({ filters });
          const interfaces = DFU.findDeviceDfuInterfaces(selectedDevice);
          console.log(selectedDevice.productId);

          if (selectedDevice.productId === 0x0006) {
            console.log(selectedDevice);
            document.getElementById("found-device-need-bootloader").set;
            statusDisplay.textContent = "Your Model 100 is in keyboard mode";
          } else if (interfaces.length === 0) {
            console.log(selectedDevice);
            console.log("The selected device does not have any USB DFU interfaces.");
          } else {
            await fixInterfaceNames(selectedDevice, interfaces);

            if (interfaces.length === 1) {
              device = await connect(new DFUUSBDevice(selectedDevice, interfaces[0]));
            } else {
              populateInterfaceList(interfaceForm, selectedDevice, interfaces);
              interfaceForm.addEventListener("submit", async (event) => {
                event.preventDefault();
                const index = interfaceForm.elements["interfaceIndex"].value;
                device = await connect(new DFUUSBDevice(selectedDevice, interfaces[index]));
              });

              interfaceDialog.showModal();
            }
          }
        }
      } catch (error) {
        statusDisplay.textContent = error;
      }
    };

    downloadButton.addEventListener("click", clickDownload);
    const clickDownload = async (event) => {
      event.preventDefault();
      event.stopPropagation();

      firmwareFile = await fetchSelectedFirmware();
      if (device && firmwareFile != null) {
        try {
          const status = await device.getStatus();
          if (status.state === DFUDeviceState.dfuERROR) {
            await device.clearStatus();
          }

          try {
            await device.do_download(transferSize, firmwareFile, manifestationTolerant);
            if (!manifestationTolerant) {
              try {
                await device.waitDisconnected(5000);
                onDisconnect();
                device = null;
              } catch (error) {
                console.log("Device unexpectedly tolerated manifestation.");
              }
            } else {
              detach();
            }
          } catch (error) {
            console.error(error);
          }
        } catch (error) {
          console.error("Failed to clear status");
        }
      } else {
        console.log("No device or firmware file", device, firmwareFile);
      }
    };

    // Check if WebUSB is available
    if (typeof navigator.usb === "undefined") {
      statusDisplay.textContent = "WebUSB not available.";
      connectButton.disabled = true;
    } else {
      navigator.usb.addEventListener("disconnect", onUnexpectedDisconnect);
      // Try connecting automatically
      if (fromLandingPage) {
        autoConnect(vid, serial);
      }
    }
  });
})();
