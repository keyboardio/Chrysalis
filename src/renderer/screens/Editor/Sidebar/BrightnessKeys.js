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
import React from "react";
import { useTranslation } from "react-i18next";
import Collapsible from "../components/Collapsible";
import KeyButton from "../components/KeyButton";

const db = new KeymapDB();

const BrightnessKeys = (props) => {
  const { t } = useTranslation();

  const keys = [
    db.lookup(18543), // up
    db.lookup(18544), // down
  ];

  const keyButtons = keys.map((button, index) => {
    return (
      <KeyButton
        key={`consumer-brightness-${index}`}
        onKeyChange={props.onKeyChange}
        keyObj={button}
        noHint
      />
    );
  });

  return (
    <Collapsible
      expanded={db.isInCategory(props.currentKey.code, "consumer")}
      title={t("editor.sidebar.consumer.brightness")}
    >
      {keyButtons}
    </Collapsible>
  );
};

export default BrightnessKeys;
