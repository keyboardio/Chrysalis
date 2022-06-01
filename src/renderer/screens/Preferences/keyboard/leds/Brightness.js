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

import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";
import Slider from "@mui/material/Slider";
import Typography from "@mui/material/Typography";

import usePluginEffect from "@renderer/hooks/usePluginEffect";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";

const Brightness = (props) => {
  const { t } = useTranslation();
  const { onSaveChanges } = props;

  const [ledBrightness, setLedBrightness] = useState(255);

  const initialize = async (focus) => {
    let brightness = await focus.command("led.brightness");
    brightness = parseInt(brightness);

    setLedBrightness(brightness);
  };
  const loaded = usePluginEffect(initialize);

  const formatValue = (value) => {
    return ((value / 255) * 100).toFixed(0) + "%";
  };

  const onChange = async (event) => {
    const brightness = event.target.value;
    await setLedBrightness(brightness);
    await onSaveChanges("led.brightness", brightness);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <Box>
        <Typography variant="body1">
          {t("preferences.keyboard.led.brightness.label")}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {t("preferences.keyboard.led.brightness.help")}
        </Typography>
      </Box>
      <span style={{ flexGrow: 1 }} />
      {loaded ? (
        <Slider
          max={255}
          step={16}
          marks
          valueLabelDisplay="auto"
          valueLabelFormat={formatValue}
          value={ledBrightness}
          onChange={onChange}
          sx={{ width: "20em", mr: 1 }}
        />
      ) : (
        <Skeleton variant="rectangle" width="20em" height={30} />
      )}
    </Box>
  );
};

export { Brightness as default };
