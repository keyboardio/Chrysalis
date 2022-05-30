// -*- mode: js-jsx -*-
/* Chrysalis -- Kaleidoscope Command Center
 * Copyright (C) 2020-2022  Keyboardio, Inc.
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
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import TextField from "@mui/material/TextField";
import React from "react";
import { useTranslation } from "react-i18next";

const db = new KeymapDB();

const LayoutSelect = (props) => {
  const { layout, setLayout, ...rest } = props;
  const { t } = useTranslation();
  const platforms = {
    linux: "Linux",
    win32: "Windows",
    darwin: "macOS",
  };
  const hostos = platforms[process.platform];
  const label = t("preferences.ui.host.layout", {
    hostos: hostos,
  });

  const changeLayout = (_, value) => {
    setLayout(value || props.layout);
  };

  return (
    <FormControl {...rest}>
      <Autocomplete
        value={layout}
        groupBy={(option) => db.getLayoutLanguage(option)}
        onChange={changeLayout}
        options={db.getSupportedLayouts()}
        getOptionLabel={(option) => option}
        disableClearable
        renderInput={(params) => (
          <TextField {...params} label={label} variant="outlined" />
        )}
      />
      <FormHelperText>{t("preferences.ui.host.help")}</FormHelperText>
    </FormControl>
  );
};

export { LayoutSelect as default };
