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

import Divider from "@mui/material/Divider";
import InputAdornment from "@mui/material/InputAdornment";
import Grid from "@mui/material/Grid";
import Skeleton from "@mui/material/Skeleton";
import Slider from "@mui/material/Slider";
import TextField from "@mui/material/TextField";

import usePluginEffect from "@renderer/hooks/usePluginEffect";
import PreferenceSwitch from "../../components/PreferenceSwitch";
import PreferenceWithHeading from "../../components/PreferenceWithHeading";
import { GlobalContext } from "@renderer/components/GlobalContext";
import React, { useState, useContext } from "react";
import { useTranslation } from "react-i18next";

const InputSlider = (props) => {
  const { t } = useTranslation();

  const { value, setValue } = props;

  const onSliderChange = (_, newValue) => {
    setValue(newValue);
  };

  const onInputChange = (event) => {
    setValue(event.target.value === "" ? "" : Number(event.target.value));
  };

  const onBlur = () => {
    if (value < 0) {
      setValue(0);
    } else if (value > props.max) {
      setValue(props.max);
    }
  };

  const tPrefix = "preferences.keyboard.plugins.mousekeys";

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

const MouseKeysPreferences = (props) => {
  const { t } = useTranslation();
  const { onSaveChanges } = props;
  const [activeDevice] = useContext(GlobalContext).state.activeDevice;

  const [scrollInterval, setScrollInterval] = useState(50);
  const [initSpeed, setInitSpeed] = useState(1);
  const [baseSpeed, setBaseSpeed] = useState(50);
  const [accelDuration, setAccelDuration] = useState(800);

  const initialize = async () => {
    const _scrollInterval = await activeDevice.mousekeys_scroll_interval();
    const _initSpeed = await activeDevice.mousekeys_init_speed();
    const _baseSpeed = await activeDevice.mousekeys_base_speed();
    const _accelDuration = await activeDevice.mousekeys_accel_duration();

    setScrollInterval(parseInt(_scrollInterval));
    setInitSpeed(parseInt(_initSpeed));
    setBaseSpeed(parseInt(_baseSpeed));
    setAccelDuration(parseInt(_accelDuration));
  };

  const loaded = usePluginEffect(initialize);

  return (
    <>
      <InputSlider
        setting="init_speed"
        value={initSpeed}
        setValue={setInitSpeed}
        max={255}
        loaded={loaded}
      />
      <InputSlider
        setting="base_speed"
        value={baseSpeed}
        setValue={setBaseSpeed}
        max={255}
        loaded={loaded}
      />
      <InputSlider
        setting="accel_duration"
        value={accelDuration}
        setValue={setAccelDuration}
        max={65535}
        loaded={loaded}
        in_ms
      />
      <Divider sx={{ my: 1 }} />
      <InputSlider
        setting="scroll_interval"
        value={scrollInterval}
        setValue={setScrollInterval}
        max={255}
        loaded={loaded}
        in_ms
      />
    </>
  );
};

export { MouseKeysPreferences as default };
