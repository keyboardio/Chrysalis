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
import { GuiLabel } from "@api/focus/keymap/db/gui";
import { addModifier, removeModifier } from "@api/focus/keymap/db/modifiers";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import Switch from "@mui/material/Switch";
import React from "react";
import { useTranslation } from "react-i18next";
import FKPCategorySelector from "../components/FKPCategorySelector";

const db = new KeymapDB();

const Modifiers = (props) => {
  const { t } = useTranslation();

  const isStandardKey = (props) => {
    const { currentKey: key } = props;
    const code = key.baseCode || key.code;
    const stdRange = db.constants.ranges.standard;

    return code >= stdRange.start && code <= stdRange.end && !db.isInCategory(key.code, "dualuse");
  };

  const { currentKey: key } = props;

  const c = db.constants.codes;

  const modifiers = {
    shift: { label: "Shift", code: c.LEFT_SHIFT },
    ctrl: { label: "Control", code: c.LEFT_CONTROL },
    alt: { label: "Alt", code: c.LEFT_ALT },
    gui: { label: GuiLabel.full, code: c.LEFT_GUI },
    altgr: { label: "AltGr", code: c.RIGHT_ALT },
  };

  const modifierControl = (mod) => {
    const modifier = modifiers[mod];
    return (
      <FormControlLabel
        control={
          <Switch
            size="small"
            checked={db.isInCategory(key.code, mod) && !db.isInCategory(key.code, "dualuse")}
            color="primary"
            onChange={() => {
              props.onKeyChange(event.target.checked ? addModifier(key.code, mod) : removeModifier(key.code, mod));
            }}
          />
        }
        label={modifier.label}
        disabled={
          !db.isStandardKey(key) ||
          key.baseCode == modifier.code ||
          key.code == modifier.code ||
          db.isInCategory(key.code, "dualuse") ||
          (db.isInCategory(key.code, "topsyturvy") && mod == "shift")
        }
      />
    );
  };

  return (
    <FKPCategorySelector help={t("editor.sidebar.keypicker.modsHelp")} disabled={!isStandardKey(props)}>
      <FormControl component="fieldset" sx={{ mt: 1 }} disabled={!isStandardKey(props)}>
        <FormGroup column>{Object.keys(modifiers).map(modifierControl)}</FormGroup>
      </FormControl>
    </FKPCategorySelector>
  );
};
export { Modifiers as default };
