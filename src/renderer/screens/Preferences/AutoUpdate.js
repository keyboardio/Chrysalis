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
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

import { useTranslation } from "react-i18next";

import PreferenceSection from "./components/PreferenceSection";
import PreferenceWithHeading from "./components/PreferenceWithHeading";
//import PreferenceSwitch from "./components/PreferenceSwitch";

const Store = require("electron-store");
const settings = new Store();

global.chrysalis_settings = settings;

const AutoUpdateSelector = (props) => {
  const { t } = useTranslation();
  const { what, value, setValue, loaded } = props;

  const tPrefix = `preferences.autoUpdate`;

  return (
    <PreferenceWithHeading heading={t(`${tPrefix}.${what}.title`)}>
      <Select
        size="small"
        value={value}
        onChange={setValue}
        sx={{ minWidth: "10em" }}
      >
        <MenuItem value="automatic">
          {t(`${tPrefix}.channel.automatic`)}
        </MenuItem>
        <MenuItem value="release">{t(`${tPrefix}.channel.release`)}</MenuItem>
        <MenuItem value="snapshot">{t(`${tPrefix}.channel.snapshot`)}</MenuItem>
        <MenuItem value="none">{t(`${tPrefix}.channel.none`)}</MenuItem>
      </Select>
    </PreferenceWithHeading>
  );
};

function AutoUpdatePreferences(props) {
  const { t } = useTranslation();

  const [autoUpdateChannel, setAutoUpdateChannel] = useState("none");
  const [firmwareAutoUpdateChannel, setFirmwareAutoUpdateChannel] =
    useState("automatic");
  const [loaded, setLoaded] = useState(false);

  const toggleChannel = (what) => (event) => {
    const channel = event.target.value;

    if (what === "app") {
      settings.set("autoUpdate.channel", channel);
      setAutoUpdateChannel(channel);
      ipcRenderer.invoke("auto-update.check-for-updates", channel);
    } else if (what === "firmware") {
      settings.set("firmwareAutoUpdate.channel", channel);
      setFirmwareAutoUpdateChannel(channel);
      ipcRenderer.invoke("firmware-update.check-for-updates", channel);
    }
  };

  useEffect(() => {
    const initialize = async () => {
      let app_channel = settings.get("autoUpdate.channel");
      if (!app_channel) {
        const app_update_mode = settings.get("autoUpdate.mode", "manual");
        app_channel = app_update_mode === "manual" ? "none" : "automatic";
      }
      let fw_channel = settings.get("firmwareAutoUpdate.channel");
      if (!fw_channel) {
        const fw_update_mode = settings.get(
          "firmwareAutoUpdate.mode",
          "automatic"
        );
        fw_channel = fw_update_mode === "manual" ? "none" : "automatic";
      }
      setAutoUpdateChannel(app_channel);
      setFirmwareAutoUpdateChannel(fw_channel);

      await setLoaded(true);
    };

    initialize();
  }, [loaded]);

  return (
    <PreferenceSection name="autoUpdate">
      <AutoUpdateSelector
        what="app"
        value={autoUpdateChannel}
        setValue={toggleChannel("app")}
        loaded={loaded}
      />
      <Divider sx={{ my: 2, mx: -2 }} />
      <AutoUpdateSelector
        what="firmware"
        value={firmwareAutoUpdateChannel}
        setValue={toggleChannel("firmware")}
        loaded={loaded}
      />
    </PreferenceSection>
  );
}

export { AutoUpdatePreferences };
