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
import InputAdornment from "@mui/material/InputAdornment";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Skeleton from "@mui/material/Skeleton";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

import usePluginEffect from "@renderer/hooks/usePluginEffect";
import PreferenceSwitch from "../../components/PreferenceSwitch";
import PreferenceWithHeading from "../../components/PreferenceWithHeading";
import { GlobalContext } from "@renderer/components/GlobalContext";
import React, { useState, useContext } from "react";
import { useTranslation } from "react-i18next";

const SpaceCadetPreferences = (props) => {
  const { t } = useTranslation();
  const { onSaveChanges } = props;
  const [activeDevice] = useContext(GlobalContext).state.activeDevice;

  const [scMode, setScMode] = useState(0);
  const [scTimeOut, setScTimeOut] = useState(200);

  const initialize = async (focus) => {
    const timeout = await activeDevice.spacecadet_timeout();
    const mode = await activeDevice.spacecadet_mode();

    setScTimeOut(parseInt(timeout));
    setScMode(parseInt(mode));
  };

  const loaded = usePluginEffect(initialize);

  const onModeChange = async (event) => {
    const mode = event.target.checked ? 0 : 1;
    setScMode(mode);
    onSaveChanges("spacecadet.mode", function () {
      activeDevice.spacecadet_mode(mode);
    });
  };

  const onTimeOutChange = async (event) => {
    setScTimeOut(parseInt(event.target.value));
    onSaveChanges("spacecadet.timeout", function () {
      activeDevice.spacecadet_timeout(event.target.value);
    });
  };

  return (
    <>
      <PreferenceSwitch
        option="keyboard.plugins.spacecadet.mode"
        loaded={loaded}
        checked={scMode != 1}
        onChange={onModeChange}
      />
      <PreferenceWithHeading
        heading={t("preferences.keyboard.plugins.spacecadet.timeout.label")}
        subheading={t("preferences.keyboard.plugins.spacecadet.timeout.help")}
      >
        {loaded ? (
          <TextField
            sx={{ width: "8em" }}
            size="small"
            type="number"
            min={0}
            max={65535}
            value={scTimeOut}
            onChange={onTimeOutChange}
            InputLabelProps={{
              shrink: true,
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  {t("units.in_ms")}
                </InputAdornment>
              ),
            }}
          />
        ) : (
          <Skeleton variant="rectangle" width="8em" height={40} />
        )}
      </PreferenceWithHeading>
    </>
  );
};

export { SpaceCadetPreferences as default };
