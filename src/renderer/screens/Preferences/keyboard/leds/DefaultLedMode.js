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

import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

import usePluginEffect from "@renderer/hooks/usePluginEffect";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";

import PreferenceSwitch from "../../components/PreferenceSwitch";

const DefaultLedMode = (props) => {
  const { t } = useTranslation();
  const { registerModifications } = props;

  const [ledModeDefault, setLedModeDefault] = useState(0);
  const [ledModeAutoSave, setLedModeAutoSave] = useState(true);

  const initialize = async (focus) => {
    const def = await focus.command("led_mode.default");
    const autoSave = await focus.command("led_mode.auto_save");

    setLedModeDefault(parseInt(def));
    setLedModeAutoSave(autoSave == "1");
  };
  const loaded = usePluginEffect(initialize);

  if (!loaded) {
    return <Skeleton variant="rectangle" />;
  }

  const onAutoSaveChange = async (event) => {
    const autoSave = event.target.checked;
    await setLedModeAutoSave(autoSave);
    await registerModifications("led_mode.auto_save", autoSave ? 1 : 0);
  };

  const onLedModeChange = async (event) => {
    const v = event.target.value;
    const mode = Math.max(0, Math.min(32, v == "" ? 0 : parseInt(v)));
    await setLedModeDefault(mode);
    await registerModifications("led_mode.default", mode);
  };

  if (!loaded) {
    return <Skeleton variant="rectangle" />;
  }

  return (
    <>
      <PreferenceSwitch
        option="keyboard.led.default.autoSave"
        checked={ledModeAutoSave}
        onChange={onAutoSaveChange}
      />
      <Box sx={{ display: "flex" }}>
        <Box>
          <Typography variant="body1">
            {t("preferences.keyboard.led.default.label")}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t("preferences.keyboard.led.default.help")}
          </Typography>
        </Box>
        <span style={{ flexGrow: 1 }} />
        <TextField
          sx={{ width: "10em" }}
          size="small"
          disabled={ledModeAutoSave}
          type="number"
          min={0}
          max={31}
          value={ledModeDefault}
          onChange={onLedModeChange}
          InputLabelProps={{
            shrink: true,
          }}
        />
      </Box>
    </>
  );
};

export { DefaultLedMode as default };
