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

import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { toast } from "@renderer/components/Toast";
import { insideFlatpak } from "@renderer/utils/flatpak";
import { installUdevRules } from "@renderer/utils/installUdevRules";
import { ipcRenderer } from "electron";
import React from "react";
import { useTranslation } from "react-i18next";

export const LinuxPermissionsWarning = (props) => {
  const selectedDevicePort = props.selectedDevicePort;
  const platform = process.platform;

  const { t } = useTranslation();
  const doInstallUdevRules = async () => {
    try {
      await installUdevRules(selectedDevicePort.path);
    } catch (err) {
      toast.error(err.toString());
      return;
    }
  };

  if (platform !== "linux") return null;

  // If /run/udev is unavailable, we can't do a scan. Let the user know that.
  if (!insideFlatpak() && !ipcRenderer.sendSync("udev.isAvailable")) {
    return (
      <Alert severity="error">
        <Typography component="p">{t("keyboardSelect.noUdev")}</Typography>
      </Alert>
    );
  }

  // We do explicitly want to check selectedDevicePort for truthiness, do NOT
  // combine it with the .accessible check into selectedDevicePort?.accessible,
  // as that defeats the purpose.
  if (selectedDevicePort && !selectedDevicePort.accessible) {
    const fixitButton = (
      <Button onClick={doInstallUdevRules} variant="outlined">
        {t("keyboardSelect.installUdevRules")}
      </Button>
    );
    return (
      <Alert severity="error" action={fixitButton}>
        <Typography component="p" gutterBottom>
          {t("keyboardSelect.permissionError", {
            path: selectedDevicePort?.path,
          })}
        </Typography>
        <Typography component="p">
          {t("keyboardSelect.permissionErrorSuggestion")}
        </Typography>
      </Alert>
    );
  }

  return null;
};
