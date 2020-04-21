//@ts-check
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

import React from "react";
import { Button, CircularProgress } from "@material-ui/core";
import i18n from "../../i18n";

export const ConnectionButton = ({
  selectedDevice,
  selectedDeviceIsConnectedDevice,
  opening,
  devices,
  onKeyboardConnect,
  buttonClasses,
  onDisconnect
}) =>
  selectedDeviceIsConnectedDevice ? (
    <Button
      disabled={opening || devices.length == 0}
      variant="outlined"
      color="secondary"
      onClick={onDisconnect}
    >
      {i18n.t("keyboardSelect.disconnect")}
    </Button>
  ) : (
    <Button
      disabled={
        (selectedDevice ? !selectedDevice.accessible : false) ||
        opening ||
        (devices && devices.length == 0)
      }
      variant="contained"
      color="primary"
      onClick={onKeyboardConnect}
      className={buttonClasses}
    >
      {opening ? (
        <CircularProgress color="secondary" size={16} />
      ) : (
        i18n.t("keyboardSelect.connect")
      )}
    </Button>
  );
