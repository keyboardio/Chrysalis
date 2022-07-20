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

export const useFirmwareAutoUpdate = () => {
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
        label: "firmware-update",
      });
      setUpdateInfo(info);
      toast.info(t("firmwareAutoUpdate.available", { version: info.version }));
      ipcRenderer.invoke("firmware-update.download");
    };
    const onDownloadProgress = (event, progress) => {
      console.log("download-progress", progress);
      toast.progress(progress.percent);
    };
    const onUpdateDownloaded = (event, info) => {
      logger().verbose("Update downloaded", {
        updateInfo: info,
        label: "firmware-update",
      });
      toast.success(
        t("firmwareAutoUpdate.downloaded", { version: info.version })
      );
      setUpdateAvailable(true);
    };
    const onUpdateError = (event, error) => {
      logger().error("Update error", {
        error: error,
        label: "firmware-update",
      });
      toast.error(t("firmwareAutoUpdate.error"));
      setUpdateAvailable(false);
    };
    const onUpdateWarning = (event, error) => {
      logger().warn("Update warning", {
        warning: error,
        label: "firmware-update",
      });
      setUpdateAvailable(false);
    };

    ipcRenderer.invoke(
      "firmware-update.check-for-updates",
      settings.get("firmwareAutoUpdate.mode", "manual")
    );

    ipcRenderer.on("firmware-update.update-available", onUpdateAvailable);
    ipcRenderer.on("firmware-update.download-progress", onDownloadProgress);
    ipcRenderer.on("firmware-update.update-downloaded", onUpdateDownloaded);
    ipcRenderer.on("firmware-update.error", onUpdateError);
    ipcRenderer.on("firmware-update.warning", onUpdateWarning);

    return function cleanup() {
      ipcRenderer.removeListener(
        "firmware-update.update-available",
        onUpdateAvailable
      );
      ipcRenderer.removeListener(
        "firmware-update.download-progress",
        onDownloadProgress
      );
      ipcRenderer.removeListener(
        "firmware-update.update-downloaded",
        onUpdateDownloaded
      );
      ipcRenderer.removeListener("firmware-update.error", onUpdateError);
      ipcRenderer.removeListener("firmware-update.warning", onUpdateWarning);
    };
  }, [setUpdateAvailable, t]);

  return updateInfo;
};
