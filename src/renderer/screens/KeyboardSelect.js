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
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import LinearProgress from "@mui/material/LinearProgress";
import { Firmware0_90_1 } from "@renderer/breaking-news";
import { GlobalContext } from "@renderer/components/GlobalContext";
import { PageTitle } from "@renderer/components/PageTitle";
import { toast } from "@renderer/components/Toast";
import { WebSerialCheck } from "@renderer/components/WebSerialCheck";
import logo from "@renderer/logo-small.png";
import { navigate } from "@renderer/routerHistory";
import logger from "@renderer/utils/Logger";
import { connectToSerialport } from "@renderer/utils/connectToSerialport";
import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { ConnectionButton } from "./KeyboardSelect/ConnectionButton";
import { DeviceImage } from "./KeyboardSelect/DeviceImage";
import { ProductStatus } from "./KeyboardSelect/ProductStatus";
import { connectToDfuUsbPort } from "../utils/connectToDfuUsbPort";
import { getDeviceProtocol } from "@api/hardware";
import urlParameters from "@renderer/utils/URLParameters";
import Button from "@mui/material/Button";

const KeyboardSelect = (props) => {
  const [opening, setOpening] = useState(false);
  const [loading, setLoading] = useState(false);

  const globalContext = React.useContext(GlobalContext);
  const [activeDevice, _] = globalContext.state.activeDevice;

  const { t } = useTranslation();
  const focus = new Focus();

  const onDisconnect = () => {
    props.onDisconnect();
  };

  const connectKeyboard = async () => {
    setOpening(true);

    try {
      setLoading(true);

      // Check if we have URL parameters to determine the connection method
      if (urlParameters.hasDeviceIdentifiers()) {
        const protocol = getDeviceProtocol(urlParameters.vid, urlParameters.pid);
        logger.log("Detected protocol for device:", protocol, { vid: urlParameters.vid, pid: urlParameters.pid });

        if (protocol === "dfu") {
          const bootloaderFocus = await connectToDfuUsbPort(urlParameters.vid, urlParameters.pid);
          if (bootloaderFocus) {
            props.onConnect(bootloaderFocus);
            urlParameters.clear();
            await navigate("/firmware-update");
            return;
          }
        }
      }

      // Fall back to regular connection attempt
      const focus = await connectToSerialport();
      if (focus) {
        props.onConnect(focus);
      } else {
        const bootloaderFocus = await connectToDfuUsbPort();
        if (bootloaderFocus) {
          props.onConnect(bootloaderFocus);
          await navigate("/firmware-update");
        }
      }
    } catch (err) {
      logger.error("error while trying to connect", {
        error: err,
        device: activeDevice,
      });
      await navigate("/help/connection-failed");
      toast.error(t("keyboardSelect.connectionFailed", { error: err.toString() }));
    } finally {
      setOpening(false);
      setLoading(false);
    }
  };

  return (
    <React.Fragment>
      {" "}
      <Box sx={{ paddingBottom: 3 }}>
        <PageTitle title={t("app.menu.connectAKeyboard")} />
        <WebSerialCheck />
        {loading && <LinearProgress variant="query" sx={{ position: "fixed", top: 0, left: 0, right: 0 }} />}
        <Firmware0_90_1 />
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
          <CardContent sx={{ width: "100%", px: 4 }}>
            {focus.focusDeviceDescriptor ? (
              <DeviceImage focusDeviceDescriptor={focus.focusDeviceDescriptor} />
            ) : (
              <Grid container justifyContent="center">
                <img src={logo} alt={t("components.logo.altText")} />
              </Grid>
            )}
            <ProductStatus />
          </CardContent>
          <CardActions sx={{ justifyContent: "center", pt: 2, pb: 3 }}>
            <ConnectionButton
              disabled={opening}
              connected={
                focus.focusDeviceDescriptor && activeDevice?.focusDeviceDescriptor == focus.focusDeviceDescriptor
              }
              opening={opening}
              connectKeyboard={connectKeyboard}
              disconnectKeyboard={props.onDisconnect}
            />
          </CardActions>
        </Card>
      </Box>
    </React.Fragment>
  );
};

export default KeyboardSelect;
