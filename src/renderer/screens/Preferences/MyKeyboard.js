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

import { hideContextBar, showContextBar } from "@renderer/components/ContextBar";
import { GlobalContext } from "@renderer/components/GlobalContext";
import SaveChangesButton from "@renderer/components/SaveChangesButton";
import { toast } from "@renderer/components/Toast";

import React, { useState, useContext, useEffect } from "react";
import { useTranslation } from "react-i18next";

import AdvancedKeyboardPreferences from "./keyboard/AdvancedKeyboardPreferences";
import KeyboardLayerPreferences from "./keyboard/KeyboardLayerPreferences";
import KeyboardLEDPreferences from "./keyboard/KeyboardLEDPreferences";
import PluginPreferences from "./keyboard/PluginPreferences";
import logger from "@renderer/utils/Logger";

const MyKeyboardPreferences = (props) => {
  const [modified, setModified] = useState(false);
  const [changes, setChanges] = useState({});

  const { t } = useTranslation();
  const globalContext = useContext(GlobalContext);
  const [activeDevice] = globalContext.state.activeDevice;

  const onSaveChanges = (command, args) => {
    const newChanges = Object.assign({}, changes);
    newChanges[command] = args;
    setChanges(newChanges);

    props.setInContext(true);
    setModified(true);
    showContextBar();
  };

  const onError = async (error) => {
    logger.error("Error applying keyboard preferences", {
      error: error,
    });
    toast.error(error);

    hideContextBar();
    props.onDisconnect();
  };

  const saveChanges = async () => {
    for (const cmd of Object.keys(changes)) {
      const content = changes[cmd];
      // If the change was a function, run the function
      // otherwise assume it's a focus command
      if (content instanceof Function) {
        await content();
      } else {
        logger.error(
          "Unable to save changes because an onSaveChanges no longer takes strings that are focus commands",
          { cmd, content }
        );
      }
    }
    setChanges({});

    await props.setInContext(false);
    await setModified(false);
    await hideContextBar();
  };

  useEffect(() => {
    const channel = new BroadcastChannel("context_bar");
    channel.onmessage = async (event) => {
      if (event.data === "changes-discarded") {
        setChanges({});
        setModified(false);
        props.setInContext(false);
      }
    };
    return () => {
      channel.close();
    };
  });

  return (
    <>
      <KeyboardLayerPreferences onSaveChanges={onSaveChanges} />
      <KeyboardLEDPreferences onSaveChanges={onSaveChanges} />
      <PluginPreferences onSaveChanges={onSaveChanges} />
      <AdvancedKeyboardPreferences onDisconnect={props.onDisconnect} />

      <SaveChangesButton onClick={saveChanges} onError={onError} disabled={!modified} />
    </>
  );
};

export { MyKeyboardPreferences };
