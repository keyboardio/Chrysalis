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

import Divider from "@mui/material/Divider";

import { GlobalContext } from "@renderer/components/GlobalContext";
import React, { useEffect, useState, useContext } from "react";
import { useTranslation } from "react-i18next";

import Brightness from "./leds/Brightness";
import DefaultLedMode from "./leds/DefaultLedMode";
import IdleTimeLimit from "./leds/IdleTimeLimit";
import PreferenceSection from "../components/PreferenceSection";

const delay = (ms) => new Promise((res) => setTimeout(res, ms));

const KeyboardLEDPreferences = (props) => {
  const { t } = useTranslation();
  const globalContext = useContext(GlobalContext);
  const [activeDevice] = globalContext.state.activeDevice;
  const [hasBrightness, setHasBrightness] = useState(false);
  const [hasIdleTime, setHasIdleTime] = useState(false);
  const [hasPersistentLedMode, setHasPersistentLedMode] = useState(false);
  const [initialized, setInitialized] = useState(false);

  const { registerModifications } = props;

  // Do the initial loading
  useEffect(() => {
    const initialize = async () => {
      const plugins = await activeDevice.plugins();
      const commands = await activeDevice.supported_commands();

      if (plugins.includes("PersistentIdleLEDs")) {
        setHasIdleTime(true);
      }
      if (plugins.includes("PersistentLEDMode")) {
        setHasPersistentLedMode(true);
      }
      if (commands.includes("led.brightness")) {
        setHasBrightness(true);
      }

      setInitialized(true);
    };

    if (!initialized) initialize();
  }, [activeDevice, initialized]);

  if (initialized && !hasIdleTime && !hasBrightness && !hasPersistentLedMode)
    return null;

  return (
    <PreferenceSection name="keyboard.led">
      {hasPersistentLedMode && (
        <DefaultLedMode registerModifications={registerModifications} />
      )}
      {hasPersistentLedMode && (hasIdleTime || hasBrightness) && (
        <Divider sx={{ mx: -2, my: 2 }} />
      )}
      {hasIdleTime && (
        <IdleTimeLimit registerModifications={registerModifications} />
      )}
      {hasBrightness && (hasIdleTime || hasPersistentLedMode) && (
        <Divider sx={{ mx: -2, my: 2 }} />
      )}
      {hasBrightness && (
        <Brightness registerModifications={registerModifications} />
      )}
    </PreferenceSection>
  );
};

export { KeyboardLEDPreferences as default };
