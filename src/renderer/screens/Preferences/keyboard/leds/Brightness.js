// -*- mode: js-jsx -*-
/* Chrysalis -- Kaleidoscope Command Center
 * Copyright (C) 2018-2022  Keyboardio, Inc.
 * Copyright (C) 2020  DygmaLab SE.
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

import React from "react";
import { useTranslation } from "react-i18next";

const Brightness = (props) => {
  const { t } = useTranslation();
  const { value, onChange, visible } = props;

  const formatValue = (value) => {
    return ((value / 255) * 100).toFixed(0) + "%";
  };

  if (!visible) return null;

  return (
    <FormControl sx={{ display: "flex" }}>
      <Typography gutterBottom>
        {t("preferences.keyboard.led.brightness.label")}
      </Typography>
      <Slider
        max={255}
        step={16}
        marks
        valueLabelDisplay="auto"
        valueLabelFormat={formatValue}
        value={value}
        onChange={onChange}
        sx={{ width: "20em" }}
      />
      <FormHelperText>
        {t("preferences.keyboard.led.brightness.help")}
      </FormHelperText>
    </FormControl>
  );
};

export { Brightness as default };
