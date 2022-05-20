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
import Grid from "@mui/material/Grid";

import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import LinearProgress from "@mui/material/LinearProgress";
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import Focus from "../../api/focus";
import i18n from "../i18n";
import logo from "../logo-small.png";

import { useIntervalImmediate } from "../utils/useInterval";
import { ConnectionButton } from "./KeyboardSelect/ConnectionButton";
import { LinuxPermissionsWarning } from "./KeyboardSelect/LinuxPermissionsWarning";
import { KeyboardPortSelector } from "./KeyboardSelect/KeyboardPortSelector";
import { DeviceImage } from "./KeyboardSelect/DeviceImage";
const { ipcRenderer } = require("electron");
import { findKeyboards } from "../utils/findKeyboards";

const KeyboardSelect = (props) => {
  const [selectedPortIndex, setSelectedPortIndex] = useState(0);

  const [opening, setOpening] = useState(false);
  const [loading, setLoading] = useState(false);
  const [devices, setDevices] = useState(null);
  const [tryAutoConnect, setTryAutoConnect] = useState(true);

  let focus = new Focus();

  const scanDevices = async () => {
    setLoading(true);
    const deviceList = await findKeyboards();

    if (!focus._port && deviceList.length == 1 && tryAutoConnect) {
      try {
        await props.onConnect(deviceList[0]);
      } catch (err) {
        setOpening(false);
        toast.error(err.toString());
      }
    } else {
      setDevices(deviceList);
      setLoading(false);
    }
  };

  const onDisconnect = () => {
    setTryAutoConnect(false);
    props.onDisconnect();
  };

  useIntervalImmediate(() => {
    // Run once as we start up, then run every 5s.
    scanDevices();
  }, 5000);

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

    try {
      await props.onConnect(devices?.[selectedPortIndex]);
    } catch (err) {
      setOpening(false);
      toast.error(err.toString());
    }
  };

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
        <LinuxPermissionsWarning selectedDevicePort={selectedDevicePort} />
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
            {selectedDevicePort ? (
              <DeviceImage
                focusDeviceDescriptor={
                  selectedDevicePort?.focusDeviceDescriptor
                }
              />
            ) : (
              <Grid container justifyContent="center">
                <img src={logo} alt={i18n.t("components.logo.altText")} />
              </Grid>
            )}

            <KeyboardPortSelector
              devices={devices}
              selectedPortIndex={selectedPortIndex}
              selectPort={selectPort}
            />
          </CardContent>
          <CardActions sx={{ justifyContent: "center", pt: 2, pb: 3 }}>
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
