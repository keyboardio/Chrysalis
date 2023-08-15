// -*- mode: js-jsx -*-
/* Chrysalis -- Kaleidoscope Command Center
 * Copyright (C) 2018-2022  Keyboardio, Inc.
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

import Focus from "@api/focus";
import { logger } from "@api/log";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import LinearProgress from "@mui/material/LinearProgress";
import { GlobalContext } from "@renderer/components/GlobalContext";
import { PageTitle } from "@renderer/components/PageTitle";
import { toast } from "@renderer/components/Toast";
import logo from "@renderer/logo-small.png";
import { findKeyboards } from "@renderer/utils/findKeyboards";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { ConnectionButton } from "./KeyboardSelect/ConnectionButton";
import { DeviceImage } from "./KeyboardSelect/DeviceImage";

import { Firmware0_90_1 } from "@renderer/breaking-news";

const KeyboardSelect = (props) => {
  const [opening, setOpening] = useState(false);
  const [loading, setLoading] = useState(false);
  const [devices, setDevices] = useState(null);
  const [tryAutoConnect, setTryAutoConnect] = useState(false);

  const globalContext = React.useContext(GlobalContext);
  const [activeDevice, _] = globalContext.state.activeDevice;

  const { t } = useTranslation();
  const focus = new Focus();

  const scanDevices = async () => {
    setLoading(true);
    console.log("scanDevices");
    const device = await findKeyboards();
    props.onConnect(device);
  };

  const onDisconnect = () => {
    setTryAutoConnect(false);
    props.onDisconnect();
  };

  useEffect(() => {
    // TODO ipcRenderer.on("usb.device-connected", scanDevices);
    // TODO ipcRenderer.on("usb.device-disconnected", scanDevices);

    // Specify how to clean up after this effect:
    return function cleanup() {
      // TODO   ipcRenderer.removeListener("usb.device-connected", scanDevices);
      // TODO   ipcRenderer.removeListener("usb.device-disconnected", scanDevices);
    };
  });

  const onKeyboardConnect = async () => {
    setOpening(true);

    try {
      await scanDevices();
    } catch (err) {
      logger().error("error while trying to connect", {
        error: err,
        device: activeDevice,
      });
      setOpening(false);
      toast.error(err.toString());
    }
  };

  return (
    <React.Fragment>
      {" "}
      <Box sx={{ paddingBottom: 3 }}>
        <PageTitle title={t("app.menu.selectAKeyboard")} />
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
        <Firmware0_90_1 devices={devices} />
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
            {focus.focusDeviceDescriptor ? (
              <DeviceImage
                focusDeviceDescriptor={focus.focusDeviceDescriptor}
              />
            ) : (
              <Grid container justifyContent="center">
                <img src={logo} alt={t("components.logo.altText")} />
              </Grid>
            )}
          </CardContent>
          <CardActions sx={{ justifyContent: "center", pt: 2, pb: 3 }}>
            <ConnectionButton
              disabled={opening}
              connected={
                focus.focusDeviceDescriptor &&
                activeDevice?.focusDeviceDescriptor ==
                  focus.focusDeviceDescriptor
              }
              opening={opening}
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
