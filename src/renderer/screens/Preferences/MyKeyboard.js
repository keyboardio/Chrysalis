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
import React, { useState, useContext, useEffect } from "react";
import { useTranslation } from "react-i18next";

import AdvancedKeyboardPreferences from "./keyboard/AdvancedKeyboardPreferences";
import KeyboardLayerPreferences from "./keyboard/KeyboardLayerPreferences";
import KeyboardLEDPreferences from "./keyboard/KeyboardLEDPreferences";
import PluginPreferences from "./keyboard/PluginPreferences";

const MyKeyboardPreferences = (props) => {
  const [modified, setModified] = useState(false);
  const [saveCallbacks, setSaveCallbacks] = useState({});

  const { t } = useTranslation();
  const globalContext = useContext(GlobalContext);
  const [activeDevice] = globalContext.state.activeDevice;

  const registerModifications = (command, args) => {
    const newCbs = Object.assign({}, saveCallbacks);
    newCbs[command] = args;
    setSaveCallbacks(newCbs);

    setModified(true);
    showContextBar();
  };

  const saveKeymapChanges = async () => {
    for (const cmd of Object.keys(saveCallbacks)) {
      const args = saveCallbacks[cmd];
      await activeDevice.focus.command(cmd, args);
    }
    setSaveCallbacks({});

    await setModified(false);
    await hideContextBar();
  };

  useEffect(() => {
    const channel = new BroadcastChannel("context_bar");
    channel.onmessage = async (event) => {
      if (event.data === "changes-discarded") {
        setSaveCallbacks({});
        setModified(false);
      }
    };
    return () => {
      channel.close();
    };
  });

  return (
    <>
      <KeyboardLayerPreferences registerModifications={registerModifications} />
      <KeyboardLEDPreferences registerModifications={registerModifications} />
      <PluginPreferences registerModifications={registerModifications} />
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
