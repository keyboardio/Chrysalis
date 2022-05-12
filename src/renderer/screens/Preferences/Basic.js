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

import React, { useState } from "react";
import { GlobalContext } from "../../components/GlobalContext";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import FilledInput from "@mui/material/FilledInput";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Switch from "@mui/material/Switch";
import Typography from "@mui/material/Typography";

import i18n from "../../i18n";
const Store = require("electron-store");
const settings = new Store();

function BasicPreferences(props) {
  const [language, setLanguage] = useState(i18n.language);

  const globalContext = React.useContext(GlobalContext);

  const [darkMode, setDarkMode] = globalContext.state.darkMode;

  const toggleDarkMode = async () => {
    settings.set("ui.darkMode", !darkMode);
    setDarkMode(!darkMode);
  };

  const updateLanguage = async (event) => {
    i18n.changeLanguage(event.target.value);
    await settings.set("ui.language", event.target.value);
    // We stick language in the state system to get rerenders when it changes
    setLanguage(event.target.value);
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
    <div>
      <Typography
        variant="subtitle1"
        component="h2"
        sx={{
          marginTop: 4,
          marginBottom: 1,
        }}
      >
        {i18n.t("preferences.interface")}
      </Typography>
      <Card>
        <CardContent>
          <FormControl variant="standard" fullWidth={true}>
            <InputLabel>{i18n.t("preferences.language")}</InputLabel>
            <Select
              value={language}
              sx={{ mb: 2 }}
              onChange={updateLanguage}
              label={i18n.t("preferences.language")}
              input={<FilledInput sx={{}} />}
            >
              {languages}
            </Select>
          </FormControl>
          <FormControlLabel
            control={
              <Switch
                checked={darkMode}
                onChange={toggleDarkMode}
                value="devtools"
                sx={{ mx: 3 }}
              />
            }
            sx={{ display: "flex", marginRight: 2 }}
            labelPlacement="end"
            label={i18n.t("preferences.darkMode")}
          />
        </CardContent>
      </Card>
    </div>
  );
}

export { BasicPreferences };
