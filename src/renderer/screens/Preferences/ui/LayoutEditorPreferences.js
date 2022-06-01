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

import KeymapDB from "@api/focus/keymap/db";

import Autocomplete from "@mui/material/Autocomplete";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import Skeleton from "@mui/material/Skeleton";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

import PreferenceSection from "../components/PreferenceSection";
import PreferenceSwitch from "../components/PreferenceSwitch";

const Store = require("electron-store");
const settings = new Store();

const db = new KeymapDB();

const LayoutSelect = (props) => {
  const { layout, setLayout } = props;

  const changeLayout = (_, value) => {
    setLayout(value || props.layout);
  };

  return (
    <Autocomplete
      size="small"
      sx={{ minWidth: "20em" }}
      value={layout}
      groupBy={(option) => db.getLayoutLanguage(option)}
      onChange={changeLayout}
      options={db.getSupportedLayouts()}
      getOptionLabel={(option) => option}
      disableClearable
      renderInput={(params) => <TextField {...params} variant="outlined" />}
    />
  );
};

function LayoutEditorPreferences(props) {
  const { t, i18n } = useTranslation();

  const [layout, setLayout] = useState("English (US)");
  const [hideUnavailableFeatures, setHideUnavailableFeatures] = useState(true);
  const [loaded, setLoaded] = useState(false);

  const initializeHostKeyboardLayout = async () => {
    const layoutSetting = await settings.get("keyboard.layout", "English (US)");
    db.setLayout(layoutSetting);
    setLayout(layoutSetting);
  };

  const changeLayout = async (layout) => {
    db.setLayout(layout);
    setLayout(layout);
    settings.set("keyboard.layout", layout);
  };

  const toggleHideUnavailableFeatures = () => {
    settings.set(
      "ui.hideFeaturesNotAvailableInCurrentFirmware",
      !hideUnavailableFeatures
    );
    setHideUnavailableFeatures(!hideUnavailableFeatures);
  };

  useEffect(() => {
    const initialize = async () => {
      const hideUnavail = settings.get(
        "ui.hideFeaturesNotAvailableInCurrentFirmware",
        true
      );
      await setHideUnavailableFeatures(hideUnavail);
      if (!loaded) {
        await initializeHostKeyboardLayout();
      }

      await setLoaded(true);
    };

    initialize();
  }, [loaded]);

  return (
    <PreferenceSection name="ui.layoutEditor">
      <Box sx={{ display: "flex" }}>
        <Box sx={{ my: "auto" }}>
          <Typography variant="body1">
            {t("preferences.ui.host.label")}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t("preferences.ui.host.help")}
          </Typography>
        </Box>
        <span style={{ flexGrow: 1 }} />
        {loaded ? (
          <LayoutSelect layout={layout} setLayout={changeLayout} />
        ) : (
          <Skeleton variant="rectangular" />
        )}
      </Box>
      <Divider sx={{ my: 2, mx: -2 }} />
      {loaded ? (
        <PreferenceSwitch
          option="ui.hideUnavailableFeatures"
          checked={hideUnavailableFeatures}
          onChange={toggleHideUnavailableFeatures}
        />
      ) : (
        <Skeleton variant="text" width="100%" height={56} />
      )}
    </PreferenceSection>
  );
}

export { LayoutEditorPreferences as default };
