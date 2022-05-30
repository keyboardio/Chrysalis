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

import {
  hideContextBar,
  showContextBar,
} from "@renderer/components/ContextBar";
import { GlobalContext } from "@renderer/components/GlobalContext";
import SaveChangesButton from "@renderer/components/SaveChangesButton";
import React, { useState, useContext } from "react";
import { useTranslation } from "react-i18next";

import AdvancedKeyboardPreferences from "./keyboard/AdvancedKeyboardPreferences";
import KeyboardLayerPreferences from "./keyboard/KeyboardLayerPreferences";
import KeyboardLEDPreferences from "./keyboard/KeyboardLEDPreferences";

const MyKeyboardPreferences = (props) => {
  const [modified, setModified] = useState(false);
  const [defaultLayer, setDefaultLayer] = useState(126);
  const [ledBrightness, setLedBrightness] = useState(255);
  const [ledIdleTimeLimit, setLedIdleTimeLimit] = useState(0);

  const { t } = useTranslation();
  const globalContext = useContext(GlobalContext);
  const [activeDevice] = globalContext.state.activeDevice;

  const saveKeymapChanges = async () => {
    await activeDevice.focus.command("settings.defaultLayer", defaultLayer);
    await activeDevice.focus.command("led.brightness", ledBrightness);
    await activeDevice.focus.command("idleleds.time_limit", ledIdleTimeLimit);

    await setModified(false);
    await hideContextBar();
  };

  return (
    <>
      <KeyboardLayerPreferences
        setModified={setModified}
        defaultLayer={defaultLayer}
        setDefaultLayer={setDefaultLayer}
      />
      <KeyboardLEDPreferences
        modified={modified}
        setModified={setModified}
        ledBrightness={ledBrightness}
        setLedBrightness={setLedBrightness}
        ledIdleTimeLimit={ledIdleTimeLimit}
        setLedIdleTimeLimit={setLedIdleTimeLimit}
      />
      <AdvancedKeyboardPreferences />

      <SaveChangesButton
        floating
        onClick={saveKeymapChanges}
        disabled={!modified}
      >
        {t("components.save.saveChanges")}
      </SaveChangesButton>
    </>
  );
};

export { MyKeyboardPreferences };
