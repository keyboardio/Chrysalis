// -*- mode: js-jsx -*-
//@ts-check
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

import React, { useEffect } from "react";
import i18n from "../../i18n";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  LinearProgress,
  Portal,
  Typography
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { withSnackbar } from "notistack";
import { useKeyboards } from "../../hooks/useKeyboards";
import { styles } from "./styles";
import { Port } from "./Port";
import { Preview } from "./Preview";
import { ConnectionButton } from "./ConnectionButton";

/**
 * @typedef {Object} KeyboardSelectProviderProps
 * @prop {Function} onConnect
 * @prop {Function} onDisconnect
 * @prop {Function} titleElement
 * @prop {Object} classes
 */
/**
 * @typedef {KeyboardSelectProviderProps & import("notistack").WithSnackbarProps} KeyboardSelectProviderPropsWithSnackbar
 */
/**
 * @param {KeyboardSelectProviderPropsWithSnackbar} props
 */
const _KeyboardSelect = ({
  onConnect,
  onDisconnect,
  titleElement,
  classes,
  enqueueSnackbar
}) => {
  const {
    loading,
    devices,
    error,
    selectedDevice,
    onKeyboardConnect,
    opening,
    scanDevices,
    scanFoundDevices,
    selectedDeviceIsConnectedDevice,
    selectedPortIndex,
    setSelectedPortIndex
  } = useKeyboards({ onConnect });

  useEffect(() => {
    error && enqueueSnackbar(error, { variant: "error" });
  }, [error]);

  return (
    <div className={classes.main}>
      <Portal container={titleElement}>
        {i18n.t("app.menu.selectAKeyboard")}
      </Portal>
      {loading ? (
        <LinearProgress variant="query" className={classes.loader} />
      ) : null}
      <Card className={classes.card}>
        <CardContent className={classes.content}>
          {selectedDevice ? (
            <Preview
              selectedDevice={selectedDevice}
              previewClass={classes.preview}
            />
          ) : null}
          <Port
            devices={devices}
            classes={classes}
            selectedPortIndex={selectedPortIndex}
            setSelectedPortIndex={setSelectedPortIndex}
          />
          {selectedDevice && selectedDevice.available ? (
            <Typography variant="body1" color="error" className={classes.error}>
              {i18n.t("keyboardSelect.permissionError")}
            </Typography>
          ) : null}
        </CardContent>
        <Divider variant="middle" />
        <CardActions className={classes.cardActions}>
          <Button
            variant={devices && devices.length ? "outlined" : "contained"}
            color={devices && devices.length ? "default" : "primary"}
            className={scanFoundDevices && classes.found}
            onClick={scanFoundDevices ? null : scanDevices}
          >
            {i18n.t("keyboardSelect.scan")}
          </Button>
          <div className={classes.grow} />
          <ConnectionButton
            selectedDevice={selectedDevice}
            opening={opening}
            selectedDeviceIsConnectedDevice={selectedDeviceIsConnectedDevice}
            onDisconnect={onDisconnect}
            onKeyboardConnect={onKeyboardConnect}
            buttonClasses={classes.connect}
            devices={devices}
          />
        </CardActions>
      </Card>
    </div>
  );
};

export const KeyboardSelect = withSnackbar(withStyles(styles)(_KeyboardSelect));
