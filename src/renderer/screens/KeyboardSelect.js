import { PageTitle } from "./../components/PageTitle";
// -*- mode: js-jsx -*-
/* Chrysalis -- Kaleidoscope Command Center
 * Copyright (C) 2018, 2019, 2020  Keyboardio, Inc.
 *
 * This program is free software: you can redistribute it and/or modify it under
 * the terms of the GNU General Public License as published by the Free Software
 * Foundation, version 3.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import LinearProgress from "@mui/material/LinearProgress";
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import Focus from "../../api/focus";
import Hardware from "../../api/hardware";
import i18n from "../i18n";
import { ConnectionButton } from "./KeyboardSelect/ConnectionButton";
import { LinuxPermissionsWarning } from "./KeyboardSelect/LinuxPermissionsWarning";
import { ScanDevicesButton } from "./KeyboardSelect/ScanDevicesButton";
import { KeyboardPortSelector } from "./KeyboardSelect/KeyboardPortSelector";
import { DeviceImage } from "./KeyboardSelect/DeviceImage";
const { ipcRenderer } = require("electron");

const KeyboardSelect = (props) => {
  const [selectedPortIndex, setSelectedPortIndex] = useState(0);
  const [scanFoundDevices, setScanFoundDevices] = useState(undefined);
  const [opening, setOpening] = useState(false);
  const [loading, setLoading] = useState(false);
  const [devices, setDevices] = useState(null);

  const findNonSerialKeyboards = async (deviceList) => {
    return ipcRenderer
      .invoke("usb-scan-for-devices")
      .then((devicesConnected) => {
        const devices = devicesConnected.map(
          (device) => device.deviceDescriptor
        );
        devices.forEach((desc) => {
          Hardware.nonSerial.forEach((port) => {
            if (
              desc.idVendor == port.usb.vendorId &&
              desc.idProduct == port.usb.productId
            ) {
              let found = false;
              deviceList.forEach((port) => {
                if (
                  port.focusDeviceDescriptor.usb.vendorId == desc.idVendor &&
                  port.focusDeviceDescriptor.usb.productId == desc.idProduct
                ) {
                  found = true;
                }
              });
              if (!found) {
                deviceList.push({
                  accessible: true,
                  port: port,
                });
              }
            }
          });
        });

        return deviceList;
      });
  };

  const findKeyboards = async () => {
    setLoading(true);
    let focus = new Focus();

    return new Promise((resolve) => {
      focus
        .find(...Hardware.serial)
        .then(async (devices) => {
          let supported_devices = [];
          for (const device of devices) {
            device.accessible = await focus.isDeviceAccessible(device);
            if (device.accessible && (await focus.isDeviceSupported(device))) {
              supported_devices.push(device);
            } else if (!device.accessible) {
              supported_devices.push(device);
            }
          }
          const list = await findNonSerialKeyboards(supported_devices);
          setLoading(false);
          setDevices(list);
          resolve(list.length > 0);
        })
        .catch(async (e) => {
          console.error(e);
          const list = await findNonSerialKeyboards([]);
          setLoading(false);
          setDevices(list);
          resolve(list.length > 0);
        });
    });
  };

  const scanDevices = async () => {
    let found = await findKeyboards();
    setScanFoundDevices(found);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      scanDevices();
    }, 5000);
    return function cleanup() {
      clearInterval(interval);
    };
  });

  useEffect(() => {
    ipcRenderer.on("usb-device-connected", scanDevices);
    ipcRenderer.on("usb-device-disconnected", scanDevices);

    // Specify how to clean up after this effect:
    return function cleanup() {
      ipcRenderer.removeListener("usb-device-connected", scanDevices);
      ipcRenderer.removeListener("usb-device-disconnected", scanDevices);
    };
  });

  const selectPort = (event) => {
    setSelectedPortIndex(event.target.value);
  };

  const onKeyboardConnect = async () => {
    setOpening(true);
    const selectedDevicePort = devices?.[selectedPortIndex];

    try {
      await props.onConnect(selectedDevicePort);
    } catch (err) {
      setOpening(false);
      toast.error(err.toString());
    }
  };

  let focus = new Focus();

  const selectedDevicePort = devices?.[selectedPortIndex];

  return (
    <React.Fragment>
      {" "}
      <Box sx={{ paddingBottom: 3 }}>
        <PageTitle title={i18n.t("app.menu.selectAKeyboard")} />
        {loading && (
          <LinearProgress
            variant="query"
            sx={{
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
            }}
          />
        )}
        <LinuxPermissionsWarning
          deviceInaccessible={selectedDevicePort?.accessible == false}
          selectedDevicePort={selectedDevicePort}
          scanDevices={scanDevices}
        />
        <Card
          sx={{
            boxShadow: 3,
            width: "auto",
            display: "block",
            marginLeft: "auto",
            marginRight: "auto",
            maxWidth: "70%",
            marginTop: 5,
            padding: "2 3 3",
          }}
        >
          <CardContent
            sx={{
              width: "100%",
              px: 4,
            }}
          >
            <DeviceImage
              focusDeviceDescriptor={selectedDevicePort?.focusDeviceDescriptor}
            />
            <KeyboardPortSelector
              devices={devices}
              selectedPortIndex={selectedPortIndex}
              selectPort={selectPort}
            />
          </CardContent>
          <CardActions sx={{ justifyContent: "center", px: 4, pt: 2, pb: 3 }}>
            <ScanDevicesButton
              scanFoundDevices={scanFoundDevices}
              scanDevices={scanDevices}
              devices={devices}
            />

            <Box sx={{ flexGrow: 1 }} />
            <ConnectionButton
              disabled={
                (selectedDevicePort ? !selectedDevicePort.accessible : false) ||
                opening ||
                devices?.length == 0
              }
              connected={
                focus.focusDeviceDescriptor &&
                selectedDevicePort?.focusDeviceDescriptor ==
                  focus.focusDeviceDescriptor
              }
              opening={opening}
              devices={devices}
              onKeyboardConnect={onKeyboardConnect}
              onKeyboardDisconnect={props.onDisconnect}
            />
          </CardActions>
        </Card>
      </Box>
    </React.Fragment>
  );
};

export default KeyboardSelect;
