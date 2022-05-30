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
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

import React from "react";
import { useTranslation } from "react-i18next";

const IdleTimeLimit = (props) => {
  const { t } = useTranslation();

  const { onChange, value, visible } = props;

  if (!visible) return null;

  return (
    <FormControl sx={{ minWidth: "20em", mb: 2 }}>
      <InputLabel>{t("preferences.keyboard.led.idle.label")}</InputLabel>
      <Select
        onChange={onChange}
        value={value}
        label={t("preferences.keyboard.led.idle.label")}
      >
        <MenuItem value={0}>
          {t("preferences.keyboard.led.idle.disabled")}
        </MenuItem>
        <MenuItem value={60}>
          {t("preferences.keyboard.led.idle.oneMinute")}
        </MenuItem>
        <MenuItem value={120}>
          {t("preferences.keyboard.led.idle.twoMinutes")}
        </MenuItem>
        <MenuItem value={180}>
          {t("preferences.keyboard.led.idle.threeMinutes")}
        </MenuItem>
        <MenuItem value={240}>
          {t("preferences.keyboard.led.idle.fourMinutes")}
        </MenuItem>
        <MenuItem value={300}>
          {t("preferences.keyboard.led.idle.fiveMinutes")}
        </MenuItem>
        <MenuItem value={600}>
          {t("preferences.keyboard.led.idle.tenMinutes")}
        </MenuItem>
        <MenuItem value={900}>
          {t("preferences.keyboard.led.idle.fifteenMinutes")}
        </MenuItem>
        <MenuItem value={1200}>
          {t("preferences.keyboard.led.idle.twentyMinutes")}
        </MenuItem>
        <MenuItem value={1800}>
          {t("preferences.keyboard.led.idle.thirtyMinutes")}
        </MenuItem>
        <MenuItem value={3600}>
          {t("preferences.keyboard.led.idle.sixtyMinutes")}
        </MenuItem>
      </Select>
      <FormHelperText>{t("preferences.keyboard.led.idle.help")}</FormHelperText>
    </FormControl>
  );
};

export { IdleTimeLimit as default };
