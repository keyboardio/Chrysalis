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

var device = null;

(function () {
  "use strict";

  function hex4(n) {
    let s = n.toString(16);
    while (s.length < 4) {
      s = "0" + s;
    }
    return s;
  }

  function hexAddr8(n) {
    let s = n.toString(16);
    while (s.length < 8) {
      s = "0" + s;
    }
    return "0x" + s;
  }

  function niceSize(n) {
    const gigabyte = 1024 * 1024 * 1024;
    const megabyte = 1024 * 1024;
    const kilobyte = 1024;
    if (n >= gigabyte) {
      return n / gigabyte + "GiB";
    } else if (n >= megabyte) {
      return n / megabyte + "MiB";
    } else if (n >= kilobyte) {
      return n / kilobyte + "KiB";
    } else {
      return n + "B";
    }
  }

  function formatDFUSummary(device) {
    const vid = hex4(device.device_.vendorId);
    const pid = hex4(device.device_.productId);
    const name = device.device_.productName;

    let mode = "Unknown";
    if (device.settings.alternate.interfaceProtocol == 0x01) {
      mode = "Runtime";
    } else if (device.settings.alternate.interfaceProtocol == 0x02) {
      mode = "DFU";
    }

    const cfg = device.settings.configuration.configurationValue;
    const intf = device.settings["interface"].interfaceNumber;
    const alt = device.settings.alternate.alternateSetting;
    const serial = device.device_.serialNumber;
    let info = `${mode}: [${vid}:${pid}] cfg=${cfg}, intf=${intf}, alt=${alt}, name="${name}" serial="${serial}"`;
    return info;
  }

  function formatDFUInterfaceAlternate(settings) {
    let mode = "Unknown";
    if (settings.alternate.interfaceProtocol == 0x01) {
      mode = "Runtime";
    } else if (settings.alternate.interfaceProtocol == 0x02) {
      mode = "DFU";
    }

    const cfg = settings.configuration.configurationValue;
    const intf = settings["interface"].interfaceNumber;
    const alt = settings.alternate.alternateSetting;
    const name = settings.name ? settings.name : "UNKNOWN";

    return `${mode}: cfg=${cfg}, intf=${intf}, alt=${alt}, name="${name}"`;
  }

  async function fixInterfaceNames(device_, interfaces) {
    // Check if any interface names were not read correctly
    if (interfaces.some((intf) => intf.name == null)) {
      // Manually retrieve the interface name string descriptors
      let tempDevice = new dfu.Device(device_, interfaces[0]);
      await tempDevice.device_.open();
      await tempDevice.device_.selectConfiguration(1);
      let mapping = await tempDevice.readInterfaceNames();
      await tempDevice.close();

      for (let intf of interfaces) {
        if (intf.name === null) {
          let configIndex = intf.configuration.configurationValue;
          let intfNumber = intf["interface"].interfaceNumber;
          let alt = intf.alternate.alternateSetting;
          intf.name = mapping[configIndex][intfNumber][alt];
        }
      }
    }
  }

  function populateInterfaceList(form, device_, interfaces) {
    let old_choices = Array.from(form.getElementsByTagName("div"));
    for (let radio_div of old_choices) {
      form.removeChild(radio_div);
    }

    let button = form.getElementsByTagName("button")[0];

    for (let i = 0; i < interfaces.length; i++) {
      let radio = document.createElement("input");
      radio.type = "radio";
      radio.name = "interfaceIndex";
      radio.value = i;
      radio.id = "interface" + i;
      radio.required = true;

      let label = document.createElement("label");
      label.textContent = formatDFUInterfaceAlternate(interfaces[i]);
      label.className = "radio";
      label.setAttribute("for", "interface" + i);

      let div = document.createElement("div");
      div.appendChild(radio);
      div.appendChild(label);
      form.insertBefore(div, button);
    }
  }

  function getDFUDescriptorProperties(device) {
    // Attempt to read the DFU functional descriptor
    // TODO: read the selected configuration's descriptor
    return device.readConfigurationDescriptor(0).then(
      (data) => {
        let configDesc = dfu.parseConfigurationDescriptor(data);
        let funcDesc = null;
        let configValue = device.settings.configuration.configurationValue;
        if (configDesc.bConfigurationValue == configValue) {
          for (let desc of configDesc.descriptors) {
            if (
              desc.bDescriptorType == 0x21 &&
              desc.hasOwnProperty("bcdDFUVersion")
            ) {
              funcDesc = desc;
              break;
            }
          }
        }

        if (funcDesc) {
          return {
            WillDetach: (funcDesc.bmAttributes & 0x08) != 0,
            ManifestationTolerant: (funcDesc.bmAttributes & 0x04) != 0,
            CanUpload: (funcDesc.bmAttributes & 0x02) != 0,
            CanDnload: (funcDesc.bmAttributes & 0x01) != 0,
            TransferSize: funcDesc.wTransferSize,
            DetachTimeOut: funcDesc.wDetachTimeOut,
            DFUVersion: funcDesc.bcdDFUVersion,
          };
        } else {
          return {};
        }
      },
      (error) => {}
    );
  }

  // Current log div element to append to
  let logContext = null;

  function setLogContext(div) {
    logContext = div;
  }

  function clearLog(context) {
    if (typeof context === "undefined") {
      context = logContext;
    }
    if (context) {
      context.innerHTML = "";
    }
  }

  function logDebug(msg) {
    console.log(msg);
  }

  function logInfo(msg) {
    console.log(msg);

    if (logContext) {
      let info = document.createElement("p");
      info.className = "info";
      info.textContent = msg;
      logContext.appendChild(info);
    }
  }

  function logWarning(msg) {
    console.log(msg);

    if (logContext) {
      let warning = document.createElement("p");
      warning.className = "warning";
      warning.textContent = msg;
      logContext.appendChild(warning);
    }
  }

  function logError(msg) {
    console.log(msg);

    if (logContext) {
      let error = document.createElement("p");
      error.className = "error";
      error.textContent = msg;
      logContext.appendChild(error);
    }
  }

  function logProgress(done, total) {
    if (logContext) {
      let progressBar;
      if (logContext.lastChild.tagName.toLowerCase() == "progress") {
        progressBar = logContext.lastChild;
      }
      if (!progressBar) {
        progressBar = document.createElement("progress");
        logContext.appendChild(progressBar);
      }
      progressBar.value = done;
      if (typeof total !== "undefined") {
        progressBar.max = total;
      }
    }
  }

  document.addEventListener("DOMContentLoaded", (event) => {
    let connectButton = document.querySelector("#connect");
    let downloadButton = document.querySelector("#download");
    let statusDisplay = document.querySelector("#status");
    let infoDisplay = document.querySelector("#usbInfo");
    let dfuDisplay = document.querySelector("#dfuInfo");
    let vidField = document.querySelector("#vid");
    let interfaceDialog = document.querySelector("#interfaceDialog");
    let interfaceForm = document.querySelector("#interfaceForm");

    let searchParams = new URLSearchParams(window.location.search);
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
        vidField.value = "0x" + hex4(vid).toUpperCase();
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

    let configForm = document.querySelector("#configForm");

    let transferSize = 1024;

    let firmwareFile = null;
    let downloadLog = document.querySelector("#downloadLog");
    let firmwareVersionSelect = document.getElementById("firmwareVersion");

    let manifestationTolerant = true;

    async function fetchSelectedFirmware() {
      let firmwareVersion =
        firmwareVersionSelect.options[firmwareVersionSelect.selectedIndex]
          .value;

      console.log("Firmware filename is ", firmwareVersion);
      const response = await fetch(
        "firmware/" + firmwareVersion + "/Keyboardio/Model100/default.bin"
      );
      const firmware = await response.arrayBuffer();
      console.log(firmware);
      return firmware;
    }
    //let device;

    function onDisconnect(reason) {
      if (reason) {
        statusDisplay.textContent = reason;
      }

      connectButton.textContent = "Connect";
      infoDisplay.textContent = "";
      dfuDisplay.textContent = "";
      downloadButton.disabled = true;
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

    function detach() {
      if (device) {
        device.detach().then(
          async (len) => {
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
              // Wait a few seconds and try reconnecting
              setTimeout(autoConnect, 5000);
            }
          },
          async (error) => {
            await device.close();
            onDisconnect(error);
            device = null;
          }
        );
      }
    }

    async function connect(device) {
      try {
        await device.open();
      } catch (error) {
        onDisconnect(error);
        throw error;
      }

      // Attempt to parse the DFU functional descriptor
      let desc = {};
      try {
        desc = await getDFUDescriptorProperties(device);
      } catch (error) {
        onDisconnect(error);
        throw error;
      }

      let memorySummary = "";
      if (desc && Object.keys(desc).length > 0) {
        device.properties = desc;
        let info = `WillDetach=${desc.WillDetach}, ManifestationTolerant=${
          desc.ManifestationTolerant
        }, CanUpload=${desc.CanUpload}, CanDnload=${
          desc.CanDnload
        }, TransferSize=${desc.TransferSize}, DetachTimeOut=${
          desc.DetachTimeOut
        }, Version=${hex4(desc.DFUVersion)}`;
        dfuDisplay.textContent += "\n" + info;
        transferSize = desc.TransferSize;
        if (desc.CanDnload) {
          manifestationTolerant = desc.ManifestationTolerant;
        }

        if (device.settings.alternate.interfaceProtocol == 0x02) {
          if (!desc.CanDnload) {
            dnloadButton.disabled = true;
          }
        }
      }

      // Bind logging methods
      device.logDebug = logDebug;
      device.logInfo = logInfo;
      device.logWarning = logWarning;
      device.logError = logError;
      device.logProgress = logProgress;

      // Clear logs
      clearLog(downloadLog);

      // Display basic USB information
      statusDisplay.textContent = "";
      connectButton.textContent = "Disconnect";
      infoDisplay.textContent =
        "Name: " +
        device.device_.productName +
        "\n" +
        "MFG: " +
        device.device_.manufacturerName +
        "\n" +
        "Serial: " +
        device.device_.serialNumber +
        "\n";

      // Display basic dfu-util style info
      dfuDisplay.textContent = formatDFUSummary(device) + "\n" + memorySummary;

      // Update buttons based on capabilities
      if (device.settings.alternate.interfaceProtocol == 0x01) {
        // Runtime
        downloadButton.disabled = true;
      } else {
        // DFU
        downloadButton.disabled = false;
      }
      return device;
    }

    function autoConnect(vid, serial) {
      dfu.findAllDfuInterfaces().then(async (dfu_devices) => {
        let matching_devices = [];
        for (let dfu_device of dfu_devices) {
          if (serial) {
            if (dfu_device.device_.serialNumber == serial) {
              matching_devices.push(dfu_device);
            }
          } else if (dfu_device.device_.vendorId == vid) {
            matching_devices.push(dfu_device);
          }
        }

        if (matching_devices.length == 0) {
          statusDisplay.textContent = "No device found.";
        } else {
          if (matching_devices.length == 1) {
            statusDisplay.textContent = "Connecting...";
            device = matching_devices[0];
            console.log(device);
            device = await connect(device);
          } else {
            statusDisplay.textContent = "Multiple DFU interfaces found.";
          }
          vidField.value =
            "0x" + hex4(matching_devices[0].device_.vendorId).toUpperCase();
          vid = matching_devices[0].device_.vendorId;
        }
      });
    }

    vidField.addEventListener("change", function () {
      vid = parseInt(vidField.value, 16);
    });

    connectButton.addEventListener("click", function () {
      if (device) {
        device.close().then(onDisconnect);
        device = null;
      } else {
        let filters = [];
        if (serial) {
          filters.push({ serialNumber: serial });
        } else if (vid) {
          filters.push({ vendorId: vid });
        }
        navigator.usb
          .requestDevice({ filters: filters })
          .then(async (selectedDevice) => {
            let interfaces = dfu.findDeviceDfuInterfaces(selectedDevice);
            console.log(selectedDevice.productId);

            if (selectedDevice.productId == 0x0006) {
              console.log(selectedDevice);
              document.getElementById("found-device-need-bootloader").set;
              statusDisplay.textContent = "Your Model 100 is in keyboard mode";
            } else if (interfaces.length == 0) {
              console.log(selectedDevice);
              statusDisplay.textContent =
                "The sxelected device does not have any USB DFU interfaces.";
            } else if (interfaces.length == 1) {
              await fixInterfaceNames(selectedDevice, interfaces);
              device = await connect(
                new dfu.Device(selectedDevice, interfaces[0])
              );
            } else {
              await fixInterfaceNames(selectedDevice, interfaces);
              populateInterfaceList(interfaceForm, selectedDevice, interfaces);
              async function connectToSelectedInterface() {
                interfaceForm.removeEventListener("submit", this);
                const index = interfaceForm.elements["interfaceIndex"].value;
                device = await connect(
                  new dfu.Device(selectedDevice, interfaces[index])
                );
              }

              interfaceForm.addEventListener(
                "submit",
                connectToSelectedInterface
              );

              interfaceDialog.addEventListener("cancel", function () {
                interfaceDialog.removeEventListener("cancel", this);
                interfaceForm.removeEventListener(
                  "submit",
                  connectToSelectedInterface
                );
              });

              interfaceDialog.showModal();
            }
          })
          .catch((error) => {
            statusDisplay.textContent = error;
          });
      }
    });

    downloadButton.addEventListener("click", async function (event) {
      event.preventDefault();
      event.stopPropagation();
      if (!configForm.checkValidity()) {
        configForm.reportValidity();
        return false;
      }

      firmwareFile = await fetchSelectedFirmware();
      if (device && firmwareFile != null) {
        setLogContext(downloadLog);
        clearLog(downloadLog);
        try {
          let status = await device.getStatus();
          if (status.state == dfu.dfuERROR) {
            await device.clearStatus();
          }
        } catch (error) {
          device.logWarning("Failed to clear status");
        }
        await device
          .do_download(transferSize, firmwareFile, manifestationTolerant)
          .then(
            () => {
              logInfo("Done!");
              setLogContext(null);
              if (!manifestationTolerant) {
                device.waitDisconnected(5000).then(
                  (dev) => {
                    onDisconnect();
                    device = null;
                  },
                  (error) => {
                    // It didn't reset and disconnect for some reason...
                    console.log("Device unexpectedly tolerated manifestation.");
                  }
                );
              } else {
                detach();
              }
            },
            (error) => {
              logError(error);
              setLogContext(null);
            }
          );
      } else {
        console.log("No device or firmware file", device, firmwareFile);
      }

      //return false;
    });

    // Check if WebUSB is available
    if (typeof navigator.usb !== "undefined") {
      navigator.usb.addEventListener("disconnect", onUnexpectedDisconnect);
      // Try connecting automatically
      if (fromLandingPage) {
        autoConnect(vid, serial);
      }
    } else {
      statusDisplay.textContent = "WebUSB not available.";
      connectButton.disabled = true;
    }
  });
})();
