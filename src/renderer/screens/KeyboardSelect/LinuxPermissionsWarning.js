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

import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import React from "react";
import { toast } from "react-toastify";
import i18n from "../../i18n";
import { installUdevRules } from "../../utils/installUdevRules";

export const PermissionsWarning = (props) => {
  const platform = props.platform;
  const deviceInaccessible = props.deviceInacessible;
  const selectedDevice = props.selectedDevice;
  const scanDevices = props.scanDevices;

  installUdevRules = async () => {
    try {
      await installUdevRules(selectedDevice.path);
    } catch (err) {
      toast.error(err.toString());
      return;
    }

    await scanDevices();
  };

  if (platform == "linux" && deviceInaccessible) {
    const fixitButton = (
      <Button onClick={this.installUdevRules} variant="outlined">
        {i18n.t("keyboardSelect.installUdevRules")}
      </Button>
    );
    return (
      <Alert severity="error" action={fixitButton}>
        <Typography component="p" gutterBottom>
          {i18n.t("keyboardSelect.permissionError", {
            path: selectedDevice.path,
          })}
        </Typography>
        <Typography component="p">
          {i18n.t("keyboardSelect.permissionErrorSuggestion")}
        </Typography>
      </Alert>
    );
  } else {
    return null;
  }
};
