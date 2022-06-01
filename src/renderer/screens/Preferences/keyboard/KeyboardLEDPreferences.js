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

import useCheckDeviceSupportsPlugins from "@renderer/hooks/useCheckDeviceSupportsPlugins";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";

import Brightness from "./leds/Brightness";
import DefaultLedMode from "./leds/DefaultLedMode";
import IdleTimeLimit from "./leds/IdleTimeLimit";
import PreferenceSection from "../components/PreferenceSection";

const delay = (ms) => new Promise((res) => setTimeout(res, ms));

const KeyboardLEDPreferences = (props) => {
  const { t } = useTranslation();
  const { registerModifications } = props;

  const [loaded, plugins] = useCheckDeviceSupportsPlugins([
    "PersistentIdleLEDs",
    "PersistentLEDMode",
    "led.brightness",
  ]);

  const foundSomePlugins = Object.values(plugins).filter((v) => v).length > 0;
  if (loaded && !foundSomePlugins) return null;

  return (
    <PreferenceSection name="keyboard.led" loaded={loaded}>
      {plugins["PersistentLEDMode"] && (
        <DefaultLedMode registerModifications={registerModifications} />
      )}
      {plugins["PersistentLEDMode"] &&
        (plugins["PersistentIdleLEDs"] || plugins["led.brightness"]) && (
          <Divider sx={{ mx: -2, my: 2 }} />
        )}
      {plugins["PersistentIdleLEDs"] && (
        <IdleTimeLimit registerModifications={registerModifications} />
      )}
      {plugins["led.brightness"] &&
        (plugins["PersistentIdleLEDs"] || plugins["PersistentLEDMode"]) && (
          <Divider sx={{ mx: -2, my: 2 }} />
        )}
      {plugins["led.brightness"] && (
        <Brightness registerModifications={registerModifications} />
      )}
    </PreferenceSection>
  );
};

export { KeyboardLEDPreferences as default };
