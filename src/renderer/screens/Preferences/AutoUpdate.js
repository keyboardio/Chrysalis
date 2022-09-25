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
import React, { useState, useEffect } from "react";
import Divider from "@mui/material/Divider";

import { useTranslation } from "react-i18next";

import PreferenceSection from "./components/PreferenceSection";
import PreferenceSwitch from "./components/PreferenceSwitch";

const Store = require("electron-store");
const settings = new Store();

function AutoUpdatePreferences(props) {
  const { t, i18n } = useTranslation();

  const [autoUpdateMode, setAutoUpdateMode] = useState("manual");
  const [firmwareAutoUpdateMode, setFirmwareAutoUpdateMode] =
    useState("automatic");
  const [loaded, setLoaded] = useState(false);

  const toggleFirmwareAutoUpdateMode = (event) => {
    const mode = event.target.checked ? "automatic" : "manual";

    settings.set("firmwareAutoUpdate.mode", mode);
    setFirmwareAutoUpdateMode(mode);

    if (mode == "automatic") {
      ipcRenderer.invoke("firmware-update.check-for-updates", mode);
    }
  };

  const toggleAutoUpdateMode = (event) => {
    const mode = event.target.checked ? "automatic" : "manual";

    settings.set("autoUpdate.mode", mode);
    setAutoUpdateMode(mode);

    if (mode == "automatic") {
      ipcRenderer.invoke("auto-update.check-for-updates", mode);
    }
  };

  useEffect(() => {
    const initialize = async () => {
      await setAutoUpdateMode(settings.get("autoUpdate.mode", "manual"));
      await setFirmwareAutoUpdateMode(
        settings.get("firmwareAutoUpdate.mode", "automatic")
      );
      await setLoaded(true);
    };

    initialize();
  }, [loaded]);

  return (
    <PreferenceSection name="autoUpdate">
      <PreferenceSwitch
        loaded={loaded}
        option="autoUpdate.mode"
        checked={autoUpdateMode == "automatic"}
        onChange={toggleAutoUpdateMode}
      />
      <Divider sx={{ my: 2, mx: -2 }} />
      <PreferenceSwitch
        loaded={loaded}
        option="autoUpdate.firmwareMode"
        checked={firmwareAutoUpdateMode == "automatic"}
        onChange={toggleFirmwareAutoUpdateMode}
      />
    </PreferenceSection>
  );
}

export { AutoUpdatePreferences };
