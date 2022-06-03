// -*- mode: js-jsx -*-
/* Chrysalis -- Kaleidoscope Command Center
 * Copyright (C) 2018-2022  Keyboardio, Inc.
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

import { getLogLevel, setLogLevel } from "@api/log";
import Divider from "@mui/material/Divider";
import Skeleton from "@mui/material/Skeleton";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
const { ipcRenderer } = require("electron");

import PreferenceSection from "./components/PreferenceSection";
import PreferenceSwitch from "./components/PreferenceSwitch";

function DevtoolsPreferences(props) {
  const { t } = useTranslation();

  const [devConsole, setDevConsole] = useState(false);
  const [verbose, setVerbose] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const initialize = async () => {
      const isOpen = await ipcRenderer.invoke("devtools-is-open");
      await setDevConsole(isOpen);

      ipcRenderer.on("devtools-opened", () => {
        setDevConsole(true);
      });
      ipcRenderer.on("devtools-closed", () => {
        setDevConsole(false);
      });

      const logLevel = getLogLevel();
      if (logLevel == "info") {
        setVerbose(false);
      } else {
        setVerbose(true);
      }

      setLoaded(true);
    };

    initialize();

    // Cleanup when component unmounts.
    return () => {
      ipcRenderer.removeAllListeners("devtools-opened");
      ipcRenderer.removeAllListeners("devtools-closed");
    };
  });

  const toggleDevConsole = (event) => {
    setDevConsole(event.target.checked);
    if (event.target.checked) {
      ipcRenderer.send("show-devtools", true);
    } else {
      ipcRenderer.send("show-devtools", false);
    }
  };

  const toggleVerbose = (event) => {
    const verbose = event.target.checked;
    setVerbose(verbose);

    setLogLevel(verbose ? "verbose" : "info");
  };

  return (
    <PreferenceSection name="devtools.main">
      {loaded ? (
        <PreferenceSwitch
          option="devtools.console"
          checked={devConsole}
          onChange={toggleDevConsole}
        />
      ) : (
        <Skeleton variant="text" width="100%" height={56} />
      )}
      <Divider sx={{ my: 2, mx: -2 }} />
      <PreferenceSwitch
        loaded={loaded}
        option="devtools.verboseLogging"
        checked={verbose}
        onChange={toggleVerbose}
      />
    </PreferenceSection>
  );
}

export { DevtoolsPreferences };
