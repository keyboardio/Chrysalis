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

import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import Slider from "@mui/material/Slider";
import Typography from "@mui/material/Typography";

import PreferenceSwitch from "../../components/PreferenceSwitch";

import React from "react";
import { useTranslation } from "react-i18next";

const EscapeOneShotPreferences = (props) => {
  const { t } = useTranslation();
  const { value, onChange, visible } = props;

  if (!visible) return null;

  return (
    <PreferenceSwitch
      option="keyboard.plugins.escOneShot"
      checked={value}
      onChange={onChange}
    />
  );
};

export { EscapeOneShotPreferences as default };
