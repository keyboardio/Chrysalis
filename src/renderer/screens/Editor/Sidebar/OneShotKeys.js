// -*- mode: js-jsx -*-
/* Chrysalis -- Kaleidoscope Command Center
 * Copyright (C) 2020-2022  Keyboardio, Inc.
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
import usePluginVisibility from "@renderer/hooks/usePluginVisibility";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Collapsible from "../components/Collapsible";
import KeyButton from "../components/KeyButton";

const db = new KeymapDB();

const cancelKeyCode = 53630;

const OneShotKeys = (props) => {
  const { t } = useTranslation();

  const pluginVisible = usePluginVisibility("OneShot");
  if (!pluginVisible) return null;

  const { currentKey: key } = props;

  return (
    <React.Fragment>
      <Collapsible
        expanded={key.code == cancelKeyCode || key.code == 41}
        title={t("editor.sidebar.oneshot.title")}
        help={t("editor.sidebar.oneshot.help")}
      >
        <KeyButton
          keyObj={db.lookup(cancelKeyCode)}
          onKeyChange={props.onKeyChange}
        />
      </Collapsible>
    </React.Fragment>
  );
};

export { OneShotKeys as default };
