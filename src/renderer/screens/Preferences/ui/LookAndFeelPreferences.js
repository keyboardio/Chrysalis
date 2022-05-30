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

import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { GlobalContext } from "@renderer/components/GlobalContext";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";

import PreferenceSection from "../components/PreferenceSection";
import PreferenceSwitch from "../components/PreferenceSwitch";

const Store = require("electron-store");
const settings = new Store();

function LookAndFeelPreferences(props) {
  const { t, i18n } = useTranslation();
  const globalContext = React.useContext(GlobalContext);
  const [darkMode, setDarkMode] = globalContext.state.darkMode;
  const [language, setLanguage] = useState(i18n.language);

  const toggleDarkMode = async () => {
    settings.set("ui.darkMode", !darkMode);
    setDarkMode(!darkMode);
  };

  const updateLanguage = async (event) => {
    i18n.changeLanguage(event.target.value);
    await settings.set("ui.language", event.target.value);
    // We stick language in the state system to get rerenders when it changes
    if (i18n.language !== event.target.value) {
      setLanguage(event.target.value);
    }
  };

  const languages = Object.keys(i18n.options.resources).map((code) => {
    const t = i18n.getFixedT(code);
    return (
      <MenuItem value={code} key={code}>
        {t("language")}
      </MenuItem>
    );
  });

  return (
    <PreferenceSection name="ui.lookNFeel">
      <FormControl sx={{ minWidth: "20em" }}>
        <InputLabel>{t("preferences.ui.language.label")}</InputLabel>
        <Select
          value={language}
          onChange={updateLanguage}
          label={t("preferences.ui.language.label")}
        >
          {languages}
        </Select>
        <FormHelperText>{t("preferences.ui.language.help")}</FormHelperText>
      </FormControl>
      <Box sx={{ my: 1 }}>
        <PreferenceSwitch
          option="ui.darkMode"
          checked={darkMode}
          onChange={toggleDarkMode}
        />
      </Box>
    </PreferenceSection>
  );
}

export { LookAndFeelPreferences as default };
