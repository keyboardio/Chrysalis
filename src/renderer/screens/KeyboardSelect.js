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

import KeyboardIcon from "@mui/icons-material/Keyboard";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import FormControl from "@mui/material/FormControl";
import LinearProgress from "@mui/material/LinearProgress";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MenuItem from "@mui/material/MenuItem";
import Portal from "@mui/material/Portal";
import Select from "@mui/material/Select";
import Typography from "@mui/material/Typography";
import React from "react";
import { toast } from "react-toastify";
import Focus from "../../api/focus";
import Hardware from "../../api/hardware";
import Log from "../../api/log";
import i18n from "../i18n";
import { ConnectionButton } from "./KeyboardSelect/ConnectionButton";
import { LinuxPermissionsWarning } from "./KeyboardSelect/LinuxPermissionsWarning";
import { ScanDevicesButton } from "./KeyboardSelect/ScanDevicesButton";
const { ipcRenderer } = require("electron");

class KeyboardSelect extends React.Component {
  state = {
    selectedPortIndex: 0,
    opening: false,
    devices: null,
    loading: false,
  };

  findNonSerialKeyboards = async (deviceList) => {
    const logger = new Log();
    return ipcRenderer
      .invoke("usb-scan-for-devices")
      .then((devicesConnected) => {
        const devices = devicesConnected.map(
          (device) => device.deviceDescriptor
        );
        devices.forEach((desc) => {
          Hardware.nonSerial.forEach((device) => {
            if (
              desc.idVendor == device.usb.vendorId &&
              desc.idProduct == device.usb.productId
            ) {
              let found = false;
              deviceList.forEach((sDevice) => {
                if (
                  sDevice.device.usb.vendorId == desc.idVendor &&
                  sDevice.device.usb.productId == desc.idProduct
                ) {
                  found = true;
                }
              });
              if (!found) {
                deviceList.push({
                  accessible: true,
                  device: device,
                });
              }
            }
          });
        });

        return deviceList;
      });
  };

  findKeyboards = async () => {
    this.setState({ loading: true });
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
          const list = await this.findNonSerialKeyboards(supported_devices);
          this.setState({
            loading: false,
            devices: list,
          });
          resolve(list.length > 0);
        })
        .catch(async (e) => {
          console.error(e);
          const list = await this.findNonSerialKeyboards([]);
          this.setState({
            loading: false,
            devices: list,
          });
          resolve(list.length > 0);
        });
    });
  };

  scanDevices = async () => {
    let found = await this.findKeyboards();
    this.setState({ scanFoundDevices: found });
    setTimeout(() => {
      this.setState({ scanFoundDevices: undefined });
    }, 1000);
  };

  componentDidMount() {
    ipcRenderer.on("usb-device-connected", this.scanDevices);
    ipcRenderer.on("usb-device-disconnected", this.scanDevices);

    this.findKeyboards().then(() => {
      let focus = new Focus();
      if (!focus._port) return;
      for (let device of this.state.devices) {
        if (!device.path) continue;

        if (device.path == focus._port.path) {
          this.setState((state) => ({
            selectedPortIndex: state.devices.indexOf(device),
          }));
          break;
        }
      }
    });
  }

  componentWillUnmount() {
    ipcRenderer.removeListener("usb-device-connected", this.scanDevices);
    ipcRenderer.removeListener("usb-device-disconnected", this.scanDevices);
  }

  selectPort = (event) => {
    this.setState({ selectedPortIndex: event.target.value });
  };

  onKeyboardConnect = async () => {
    this.setState({ opening: true });

    const { devices } = this.state;

    try {
      await this.props.onConnect(devices[this.state.selectedPortIndex]);
    } catch (err) {
      this.setState({
        opening: false,
      });
      toast.error(err.toString());
    }

    i18n.refreshHardware(devices[this.state.selectedPortIndex]);
  };

  render() {
    const { scanFoundDevices, devices } = this.state;

    let loader = null;
    if (this.state.loading) {
      loader = (
        <LinearProgress
          variant="query"
          sx={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
          }}
        />
      );
    }

    let deviceItems = null;
    let port = null;
    if (devices?.length > 0) {
      deviceItems = devices.map((option, index) => {
        let label = option.path;
        if (option.device?.info) {
          label = (
            <ListItemText
              primary={option.device.info.displayName}
              secondary={option.path || i18n.t("keyboardSelect.unknown")}
            />
          );
        } else if (option.info) {
          label = <ListItemText primary={option.info.displayName} />;
        }

        const icon = (
          <ListItemIcon sx={{ marginRight: 2 }}>
            <Avatar>
              <KeyboardIcon />
            </Avatar>
          </ListItemIcon>
        );

        return (
          <MenuItem
            key={`device-${index}`}
            value={index}
            selected={index === this.state.selectedPortIndex}
          >
            {icon}
            {label}
          </MenuItem>
        );
      });

      port = (
        <FormControl sx={{ display: "flex" }}>
          <Select
            value={this.state.selectedPortIndex}
            sx={{ display: "flex" }}
            onChange={this.selectPort}
          >
            {deviceItems}
          </Select>
        </FormControl>
      );
    }

    if (devices?.length == 0) {
      port = (
        <Typography
          variant="body1"
          color="error"
          sx={{ marginTop: 2, marginBottom: 2, textAlign: "center" }}
        >
          {i18n.t("keyboardSelect.noDevices")}
        </Typography>
      );
    }

      }
    };

    let focus = new Focus();
    const selectedDevice = devices?.[this.state.selectedPortIndex];

    let preview;
    if (devices?.[this.state.selectedPortIndex]?.device?.components) {
      const Keymap =
        devices[this.state.selectedPortIndex].device.components.keymap;
      preview = (
        <Box
          sx={{
            display: "flex",
            align: "center",
            mx: "auto",
            maxWidth: "100%",
            marginBottom: 2,
            "& *": {
              color: "#000000",
              stroke: "#000000",
              fill: "#000000",
            },
          }}
        >
          <Keymap index={0} />
        </Box>
      );
    }

    return (
      <React.Fragment>
        {" "}
        <Box sx={{ paddingBottom: 3 }}>
          <Portal container={this.props.titleElement}>
            {i18n.t("app.menu.selectAKeyboard")}
          </Portal>
          {loader}
          <LinuxPermissionsWarning
            deviceInaccessible={selectedDevice?.accessible == false}
            platform={process.platform}
            selectedDevice={selectedDevice}
            scanDevices={this.scanDevices}
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
                display: "inline-block",
                width: "100%",
                textAlign: "center",
              }}
            >
              {preview}
              {port}
            </CardContent>
            <CardActions sx={{ justifyContent: "center" }}>
              <ScanDevicesButton
                scanFoundDevices={scanFoundDevices}
                scanDevices={this.scanDevices}
                devices={devices}
              />

              <Box sx={{ flexGrow: 1 }} />
              <ConnectionButton
                opening={this.state.opening}
                devices={this.state.devices}
                selectedDevice={selectedDevice}
                focusDevice={focus.device}
                onKeyboardConnect={this.onKeyboardConnect}
                onKeyboardDisconnect={this.props.onDisconnect}
              />
            </CardActions>
          </Card>
        </Box>
      </React.Fragment>
    );
  }
}

export default KeyboardSelect;
