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

import InputAdornment from "@mui/material/InputAdornment";
import Grid from "@mui/material/Grid";
import Slider from "@mui/material/Slider";
import TextField from "@mui/material/TextField";

import PreferenceWithHeading from "./PreferenceWithHeading";
import { GlobalContext } from "@renderer/components/GlobalContext";
import React, { useContext } from "react";
import { useTranslation } from "react-i18next";

export const PluginSliderWithInput = (props) => {
  const { t } = useTranslation();
  const [activeDevice] = useContext(GlobalContext).state.activeDevice;

  const { plugin, value, setValue } = props;

  const updateValue = (newValue) => {
    props.onSaveChanges(`${plugin}.${props.setting}`, function () {
      activeDevice[`${plugin}_${props.setting}`](newValue);
    });
    setValue(newValue);
  };

  const onSliderChange = (_, newValue) => {
    updateValue(newValue);
  };

  const onInputChange = (event) => {
    updateValue(event.target.value === "" ? "" : Number(event.target.value));
  };

  const onBlur = () => {
    if (value < 0) {
      updateValue(0);
    } else if (value > props.max) {
      updateValue(props.max);
    }
  };

  const tPrefix = `preferences.keyboard.plugins.${plugin}`;

  return (
    <PreferenceWithHeading
      heading={t(`${tPrefix}.${props.setting}.label`)}
      subheading={t(`${tPrefix}.${props.setting}.help`)}
    >
      <Grid container spacing={2} sx={{ width: 350 }}>
        <Grid item xs>
          <Slider
            max={props.max}
            value={typeof value === "number" ? value : 0}
            onChange={onSliderChange}
          />
        </Grid>
        <Grid item>
          <TextField
            value={value}
            size="small"
            onChange={onInputChange}
            onBlur={onBlur}
            sx={{ width: "6em" }}
            max={props.max}
            min={0}
            step={1}
            InputProps={{
              endAdornment: props.in_ms && (
                <InputAdornment position="end">
                  {t("units.in_ms")}
                </InputAdornment>
              ),
            }}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>
      </Grid>
    </PreferenceWithHeading>
  );
};
