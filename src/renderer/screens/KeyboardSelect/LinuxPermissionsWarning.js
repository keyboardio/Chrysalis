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

export const LinuxPermissionsWarning = (props) => {
  const selectedDevicePort = props.selectedDevicePort;
  const platform = process.platform;

  const doInstallUdevRules = async () => {
    try {
      await installUdevRules(selectedDevicePort.path);
    } catch (err) {
      toast.error(err.toString());
      return;
    }
  };

  if (platform == "linux" && !selectedDevicePort?.accessible) {
    const fixitButton = (
      <Button onClick={doInstallUdevRules} variant="outlined">
        {i18n.t("keyboardSelect.installUdevRules")}
      </Button>
    );
    return (
      <Alert severity="error" action={fixitButton}>
        <Typography component="p" gutterBottom>
          {i18n.t("keyboardSelect.permissionError", {
            path: selectedDevicePort?.path,
          })}
        </Typography>
        <Typography component="p">
          {i18n.t("keyboardSelect.permissionErrorSuggestion")}
        </Typography>
      </Alert>
    );
  } else {
    return <div />;
  }
};
