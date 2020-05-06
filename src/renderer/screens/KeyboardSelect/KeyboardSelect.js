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
 * along with program.  If not, see <http://www.gnu.org/licenses/>.
 */

import React, { useEffect } from "react";
import i18n from "../../i18n";
import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  CircularProgress,
  Divider,
  FormControl,
  Select,
  LinearProgress,
  Portal,
  Typography,
  ListItemText,
  ListItemIcon,
  MenuItem
} from "@material-ui/core";
import { Keyboard as KeyboardIcon } from "@material-ui/icons";
import { withStyles } from "@material-ui/core/styles";
import { withSnackbar } from "notistack";
import { useKeyboards } from "../../hooks/useKeyboards";
import { styles } from "./styles";

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
    findKeyboards,
    selectedDevice,
    onKeyboardConnect,
    opening,
    scanFoundDevices,
    selectedDeviceIsConnectedDevice,
    selectedPortIndex,
    setSelectedPortIndex
  } = useKeyboards({ onConnect });

  useEffect(() => {
    error && enqueueSnackbar(error, { variant: "error" });
  }, [error]);

  let loader = null;
  if (loading) {
    loader = <LinearProgress variant="query" className={classes.loader} />;
  }

  let deviceItems = null;
  let port = null;
  if (devices && devices.length > 0) {
    deviceItems = devices.map((option, index) => {
      let label = option.path;
      if (option.device && option.device.info) {
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
        <ListItemIcon>
          <Avatar className={option.path && classes.supported}>
            <KeyboardIcon />
          </Avatar>
        </ListItemIcon>
      );

      return (
        <MenuItem
          key={`device-${index}`}
          value={index}
          selected={index === selectedPortIndex}
        >
          {icon}
          {label}
        </MenuItem>
      );
    });

    port = (
      <FormControl className={classes.selectControl}>
        <Select
          value={selectedPortIndex}
          classes={{ select: classes.selectControl }}
          onChange={event => setSelectedPortIndex(parseInt(event.target.value))}
        >
          {deviceItems}
        </Select>
      </FormControl>
    );
  }

  if (devices && devices.length == 0) {
    port = (
      <Typography variant="body1" color="error" className={classes.error}>
        {i18n.t("keyboardSelect.noDevices")}
      </Typography>
    );
  }

  let connectContent = i18n.t("keyboardSelect.connect");
  if (opening) {
    connectContent = <CircularProgress color="secondary" size={16} />;
  }

  const scanDevicesButton = (
    <Button
      variant={devices && devices.length ? "outlined" : "contained"}
      color={devices && devices.length ? "default" : "primary"}
      className={scanFoundDevices && classes.found}
      onClick={scanFoundDevices ? null : findKeyboards}
    >
      {i18n.t("keyboardSelect.scan")}
    </Button>
  );

  let connectionButton, permissionWarning;

  if (selectedDevice && !selectedDevice.accessible) {
    permissionWarning = (
      <Typography variant="body1" color="error" className={classes.error}>
        {i18n.t("keyboardSelect.permissionError")}
      </Typography>
    );
  }

  if (selectedDeviceIsConnectedDevice) {
    connectionButton = (
      <Button
        disabled={opening || (devices && devices.length == 0)}
        variant="outlined"
        color="secondary"
        onClick={onDisconnect}
      >
        {i18n.t("keyboardSelect.disconnect")}
      </Button>
    );
  } else {
    connectionButton = (
      <Button
        disabled={
          (selectedDevice ? !selectedDevice.accessible : false) ||
          opening ||
          devices.length == 0
        }
        variant="contained"
        color="primary"
        onClick={onKeyboardConnect}
        className={classes.connect}
      >
        {connectContent}
      </Button>
    );
  }

  let preview;
  if (
    selectedDevice &&
    selectedDevice.device &&
    selectedDevice.device.components
  ) {
    const Keymap = selectedDevice.device.components.keymap;
    preview = <Keymap index={0} className={classes.preview} />;
  }

  return (
    <div className={classes.main}>
      <Portal container={titleElement}>
        {i18n.t("app.menu.selectAKeyboard")}
      </Portal>
      {loader}
      <Card className={classes.card}>
        <CardContent className={classes.content}>
          {preview}
          {port}
          {permissionWarning}
        </CardContent>
        <Divider variant="middle" />
        <CardActions className={classes.cardActions}>
          {scanDevicesButton}
          <div className={classes.grow} />
          {connectionButton}
        </CardActions>
      </Card>
    </div>
  );
};

export const KeyboardSelect = withSnackbar(withStyles(styles)(_KeyboardSelect));
