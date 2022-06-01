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
import Skeleton from "@mui/material/Skeleton";
import Slider from "@mui/material/Slider";
import Typography from "@mui/material/Typography";

import PreferenceSwitch from "../../components/PreferenceSwitch";

import { GlobalContext } from "@renderer/components/GlobalContext";
import React, { useEffect, useState, useContext } from "react";
import { useTranslation } from "react-i18next";

const EscapeOneShotPreferences = (props) => {
  const oneShotCancelKeyCode = 53630;
  const escKeyCode = 41;

  const { t } = useTranslation();
  const globalContext = useContext(GlobalContext);

  const [activeDevice] = globalContext.state.activeDevice;
  const [escOneShot, setEscOneShot] = useState(true);
  const [loaded, setLoaded] = useState(false);

  const { registerModifications } = props;

  useEffect(() => {
    const initialize = async () => {
      const doesEscCancelOneShot = (value) => {
        if (value.length == 0) {
          return false;
        }

        return parseInt(value) == escKeyCode;
      };

      const key = await activeDevice.focus.command("escape_oneshot.cancel_key");
      setEscOneShot(doesEscCancelOneShot(key));
      setLoaded(true);
    };

    const context_bar_channel = new BroadcastChannel("context_bar");
    context_bar_channel.onmessage = async (event) => {
      if (event.data === "changes-discarded") {
        await initialize();
      }
    };

    initialize();

    return () => {
      context_bar_channel.close();
    };
  }, [activeDevice]);

  const onChange = async (event) => {
    const v = event.target.checked;
    await setEscOneShot(v);
    await registerModifications(
      "escape_oneshot.cancel_key",
      v ? escKeyCode : oneShotCancelKeyCode
    );
  };

  if (!loaded) {
    return <Skeleton variant="rectangle" />;
  }

  return (
    <PreferenceSwitch
      option="keyboard.plugins.escOneShot"
      checked={escOneShot}
      onChange={onChange}
    />
  );
};

export { EscapeOneShotPreferences as default };
