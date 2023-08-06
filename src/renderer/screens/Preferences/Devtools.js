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
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import PreferenceSection from "./components/PreferenceSection";
import PreferenceSwitch from "./components/PreferenceSwitch";

import { Store } from "@renderer/localStore";
const settings = new Store();

import Focus from "@api/focus";

function DevtoolsPreferences(props) {
  const { t } = useTranslation();

  const [verbose, setVerbose] = useState(false);
  const [chunked, setChunked] = useState(true);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const initialize = async () => {
      setChunked(settings.get("focus.chunked_writes", true));

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
    return () => {};
  });

  const toggleVerbose = (event) => {
    const verbose = event.target.checked;
    setVerbose(verbose);

    setLogLevel(verbose ? "verbose" : "info");
  };

  const toggleChunked = (event) => {
    const chunked = event.target.checked;
    setChunked(chunked);

    settings.set("focus.chunked_writes", chunked);

    // NOTE: We're using Focus here directly, rather than through ActiveDevice,
    // because this is a global focus setting, and we should be setting it even
    // if we have no active device when the option is changed.
    //
    // This is not ideal, but the plan is that this whole setting is a temporary
    // measure only.
    const focus = new Focus();
    focus.chunked_writes = chunked;
  };

  return (
    <PreferenceSection name="devtools.main">
      <Divider sx={{ my: 2, mx: -2 }} />
      <PreferenceSwitch
        loaded={loaded}
        option="devtools.verboseLogging"
        checked={verbose}
        onChange={toggleVerbose}
      />
      <Divider sx={{ my: 2, mx: -2 }} />
      <PreferenceSwitch
        loaded={loaded}
        option="focus.chunked_writes"
        checked={chunked}
        onChange={toggleChunked}
      />
    </PreferenceSection>
  );
}

export { DevtoolsPreferences };
