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
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
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
  const [activeDevice] = useContext(GlobalContext).state.activeDevice;

  const { value, setValue } = props;

  const updateValue = (newValue) => {
    props.onSaveChanges(`mousekeys.${props.setting}`, function () {
      activeDevice[`mousekeys_${props.setting}`](newValue);
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
  const [warpGridSize, setWarpGridSize] = useState(2);

  const initialize = async () => {
    const _scrollInterval = await activeDevice.mousekeys_scroll_interval();
    const _initSpeed = await activeDevice.mousekeys_init_speed();
    const _baseSpeed = await activeDevice.mousekeys_base_speed();
    const _accelDuration = await activeDevice.mousekeys_accel_duration();
    const _warpGridSize =
      (await activeDevice.mousekeys_warp_grid_size()) || "0";

    setScrollInterval(parseInt(_scrollInterval));
    setInitSpeed(parseInt(_initSpeed));
    setBaseSpeed(parseInt(_baseSpeed));
    setAccelDuration(parseInt(_accelDuration));
    setWarpGridSize(parseInt(_warpGridSize));
  };

  const updateWarpGridSize = (event) => {
    setWarpGridSize(event.target.value);
    onSaveChanges("mousekeys.warp_grid_size", function () {
      activeDevice.mousekeys_warp_grid_size(event.target.value);
    });
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
        onSaveChanges={onSaveChanges}
      />
      <InputSlider
        setting="base_speed"
        value={baseSpeed}
        setValue={setBaseSpeed}
        max={255}
        loaded={loaded}
        onSaveChanges={onSaveChanges}
      />
      <InputSlider
        setting="accel_duration"
        value={accelDuration}
        setValue={setAccelDuration}
        max={65535}
        loaded={loaded}
        onSaveChanges={onSaveChanges}
        in_ms
      />
      <Divider sx={{ my: 1 }} />
      <InputSlider
        setting="scroll_interval"
        value={scrollInterval}
        setValue={setScrollInterval}
        max={255}
        loaded={loaded}
        onSaveChanges={onSaveChanges}
        in_ms
      />
      {warpGridSize != 0 && (
        <>
          <Divider sx={{ my: 1 }} />
          <PreferenceWithHeading
            heading={t(
              "preferences.keyboard.plugins.mousekeys.warp_grid_size.label"
            )}
            subheading={t(
              "preferences.keyboard.plugins.mousekeys.warp_grid_size.help"
            )}
          >
            <Select
              size="small"
              value={warpGridSize}
              onChange={updateWarpGridSize}
              sx={{ minWidth: "6em" }}
            >
              <MenuItem value={2}>
                {t("preferences.keyboard.plugins.mousekeys.warp_grid_size.2x2")}
              </MenuItem>
              <MenuItem value={3}>
                {t("preferences.keyboard.plugins.mousekeys.warp_grid_size.3x3")}
              </MenuItem>
            </Select>
          </PreferenceWithHeading>
        </>
      )}
    </>
  );
};

export { MouseKeysPreferences as default };
