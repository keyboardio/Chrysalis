// -*- mode: js-jsx -*-
/* Chrysalis -- Kaleidoscope Command Center
 * Copyright (C) 2022  Keyboardio, Inc.
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

import { ipcRenderer } from "electron";
import Store from "electron-store";
import React, { useEffect, useState, useContext } from "react";
import { useTranslation } from "react-i18next";

import { logger } from "@api/log";
import { GlobalContext } from "@renderer/components/GlobalContext";
import { toast } from "@renderer/components/Toast";

export const useAutoUpdate = () => {
  const { t } = useTranslation();
  const globalContext = useContext(GlobalContext);

  const [updateAvailable, setUpdateAvailable] =
    globalContext.state.updateAvailable;
  const [updateInfo, setUpdateInfo] = useState(null);

  useEffect(() => {
    const settings = new Store();

    const onUpdateAvailable = (event, info) => {
      logger().verbose("Update available", {
        updateInfo: info,
        label: "auto-update",
      });
      setUpdateInfo(info);
      toast.info(t("autoUpdate.available", { version: info.version }));
    };
    const onUpdateDownloaded = (event, info) => {
      logger().verbose("Update downloaded", {
        updateInfo: info,
        label: "auto-update",
      });
      toast.success(t("autoUpdate.downloaded", { version: info.version }));
      setUpdateAvailable(true);
    };
    const onUpdateError = (event, error) => {
      logger().error("Update error", {
        error: error,
        label: "auto-update",
      });
      toast.error(t("autoUpdate.error", { error: error }));
      setUpdateAvailable(false);
    };

    ipcRenderer.invoke(
      "auto-update.check-for-updates",
      settings.get("autoUpdate.mode")
    );

    ipcRenderer.on("auto-update.update-available", onUpdateAvailable);
    ipcRenderer.on("auto-update.update-downloaded", onUpdateDownloaded);
    ipcRenderer.on("auto-update.error", onUpdateError);

    return function cleanup() {
      ipcRenderer.removeListener(
        "auto-update.update-available",
        onUpdateAvailable
      );
      ipcRenderer.removeListener(
        "auto-update.update-downloaded",
        onUpdateDownloaded
      );
      ipcRenderer.removeListener("auto-update.error", onUpdateError);
    };
  }, [setUpdateAvailable, t]);

  return updateInfo;
};
