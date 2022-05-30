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
import { showContextBar } from "@renderer/components/ContextBar";
import { GlobalContext } from "@renderer/components/GlobalContext";
import React, { useEffect, useState, useContext } from "react";
import { useTranslation } from "react-i18next";

import PreferenceSection from "../components/PreferenceSection";
import EscapeOneShotPreferences from "./plugins/EscapeOneShot";

const PluginPreferences = (props) => {
  const escKeyCode = 41;

  const { t } = useTranslation();
  const globalContext = useContext(GlobalContext);
  const [activeDevice] = globalContext.state.activeDevice;

  const [loaded, setLoaded] = useState(false);
  const [initialized, setInitialized] = useState(false);
  const [hasEscOneShot, setHasEscOneShot] = useState(false);

  const { setModified, escOneShot, setEscOneShot } = props;

  // Initialize: check for plugins
  useEffect(() => {
    const initialize = async () => {
      const plugins = await activeDevice.plugins();

      if (plugins.includes("EscapeOneShot")) {
        setHasEscOneShot(true);
      }

      setInitialized(true);
    };

    if (!initialized) initialize();
  }, [activeDevice, initialized]);

  const doesEscCancelOneShot = (value) => {
    if (value.length == 0) {
      return false;
    }

    return parseInt(value) == escKeyCode;
  };

  // Fetch data, after initialization
  useEffect(() => {
    const fetchData = async () => {
      const key = await activeDevice.focus.command("escape_oneshot.cancel_key");
      setEscOneShot(doesEscCancelOneShot(key));

      setLoaded(true);
    };

    const context_bar_channel = new BroadcastChannel("context_bar");
    context_bar_channel.onmessage = async (event) => {
      if (event.data === "changes-discarded") {
        await fetchData();
        setModified(false);
      }
    };

    if (initialized) fetchData();

    return () => {
      context_bar_channel.close();
    };
  }, [activeDevice, setEscOneShot, setModified, setLoaded, initialized]);

  const toggleEscOneShot = (event) => {
    setEscOneShot(event.target.checked);

    setModified(true);
    showContextBar();
  };

  if (initialized && !hasEscOneShot) return null;

  return (
    <PreferenceSection name="keyboard.plugins">
      {loaded ? (
        <EscapeOneShotPreferences
          value={escOneShot}
          onChange={toggleEscOneShot}
          visible={hasEscOneShot}
        />
      ) : (
        <Skeleton variant="text" width="100%" height={56} />
      )}
    </PreferenceSection>
  );
};

export { PluginPreferences as default };
