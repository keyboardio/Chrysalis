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

import KeymapDB from "@api/focus/keymap/db";

import usePluginEffect from "@renderer/hooks/usePluginEffect";
import PreferenceSwitch from "../../components/PreferenceSwitch";
import { GlobalContext } from "@renderer/components/GlobalContext";
import React, { useState, useContext } from "react";
import { useTranslation } from "react-i18next";

const db = new KeymapDB();

const EscapeOneShotPreferences = (props) => {
  const { t } = useTranslation();
  const { onSaveChanges } = props;
  const [activeDevice] = useContext(GlobalContext).state.activeDevice;

  const [escOneShot, setEscOneShot] = useState(true);

  const initialize = async () => {
    const doesEscCancelOneShot = (value) => {
      if (value.length == 0) {
        return false;
      }

      return parseInt(value) == db.constants.codes.ESCAPE;
    };

    const key = await activeDevice.escape_oneshot_cancel_key();
    setEscOneShot(doesEscCancelOneShot(key));
  };

  const loaded = usePluginEffect(initialize);

  const onChange = async (event) => {
    const v = event.target.checked;
    const c = db.constants.codes;
    setEscOneShot(v);
    await onSaveChanges("escape_oneshot.cancel_key", function () {
      activeDevice.escape_oneshot_cancel_key(v ? c.ESCAPE : c.ONESHOT_CANCEL);
    });
  };

  return (
    <PreferenceSwitch
      option="keyboard.plugins.escOneShot"
      loaded={loaded}
      checked={escOneShot}
      onChange={onChange}
    />
  );
};

export { EscapeOneShotPreferences as default };
