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

import Skeleton from "@mui/material/Skeleton";
import TextField from "@mui/material/TextField";

import usePluginEffect from "@renderer/hooks/usePluginEffect";
import React, { useState, useContext } from "react";
import { useTranslation } from "react-i18next";
import { GlobalContext } from "@renderer/components/GlobalContext";

import PreferenceWithHeading from "../../components/PreferenceWithHeading";

const DefaultLedMode = (props) => {
  // The lowest LED mode index we can set
  const minIndex = 0;
  // The highest LED mode index we can set. This is *not* 255, because 255 is
  // the uninitialized EEPROM byte, and Kaleidoscope treats that differently,
  // the same as 0.
  const maxIndex = 254;

  const { t } = useTranslation();
  const { onSaveChanges } = props;

  const [ledModeDefault, setLedModeDefault] = useState(0);
  const [activeDevice] = useContext(GlobalContext).state.activeDevice;

  const initialize = async () => {
    const def = await activeDevice.led_mode_default();

    setLedModeDefault(parseInt(def));
  };
  const loaded = usePluginEffect(initialize);

  const onLedModeChange = async (event) => {
    const v = event.target.value;
    const mode = Math.max(minIndex, Math.min(maxIndex, v == "" ? minIndex : parseInt(v)));
    await setLedModeDefault(mode);
    await onSaveChanges("led_mode.default", function () {
      activeDevice.led_mode_default(mode);
    });
  };

  return (
    <PreferenceWithHeading
      heading={t("preferences.keyboard.led.default.label")}
      subheading={t("preferences.keyboard.led.default.help")}
    >
      {loaded ? (
        <TextField
          sx={{ width: "10em" }}
          size="small"
          type="number"
          min={minIndex}
          max={maxIndex}
          value={ledModeDefault}
          onChange={onLedModeChange}
          InputLabelProps={{
            shrink: true,
          }}
        />
      ) : (
        <Skeleton variant="rectangle" width="10em" height={40} />
      )}
    </PreferenceWithHeading>
  );
};

export { DefaultLedMode as default };
