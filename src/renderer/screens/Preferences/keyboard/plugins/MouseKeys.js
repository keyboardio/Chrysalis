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
import { PluginSliderWithInput } from "../../components/PluginSliderWithInput";
import PreferenceSwitch from "../../components/PreferenceSwitch";
import PreferenceWithHeading from "../../components/PreferenceWithHeading";
import { GlobalContext } from "@renderer/components/GlobalContext";
import React, { useState, useContext } from "react";
import { useTranslation } from "react-i18next";

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
      <PluginSliderWithInput
        plugin="mousekeys"
        setting="init_speed"
        value={initSpeed}
        setValue={setInitSpeed}
        max={255}
        loaded={loaded}
        onSaveChanges={onSaveChanges}
      />
      <PluginSliderWithInput
        plugin="mousekeys"
        setting="base_speed"
        value={baseSpeed}
        setValue={setBaseSpeed}
        max={255}
        loaded={loaded}
        onSaveChanges={onSaveChanges}
      />
      <PluginSliderWithInput
        plugin="mousekeys"
        setting="accel_duration"
        value={accelDuration}
        setValue={setAccelDuration}
        max={65535}
        loaded={loaded}
        onSaveChanges={onSaveChanges}
        in_ms
      />
      <Divider sx={{ my: 1 }} />
      <PluginSliderWithInput
        plugin="mousekeys"
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
