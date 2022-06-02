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
import { GuiLabel } from "@api/focus/keymap/db/base/gui";
import { addModifier, removeModifier } from "@api/focus/keymap/db/modifiers";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import Switch from "@mui/material/Switch";
import Tooltip from "@mui/material/Tooltip";
import usePluginVisibility from "@renderer/hooks/usePluginVisibility";
import React from "react";
import { useTranslation } from "react-i18next";
import Collapsible from "../components/Collapsible";

const db = new KeymapDB();

const KeyPicker = (props) => {
  const { t } = useTranslation();
  const oneShotVisible = usePluginVisibility("OneShot");

  const isStandardKey = (props) => {
    const { currentKey: key } = props;
    const code = key.baseCode || key.code;
    const stdRange = db.constants.ranges.standard;

    return (
      code >= stdRange.start &&
      code <= stdRange.end &&
      !db.isInCategory(key.code, "dualuse")
    );
  };

  const isOSM = () => {
    const { currentKey: key } = props;

    return (
      db.isInCategory(key.code, "modifier") &&
      db.isInCategory(key.code, "oneshot")
    );
  };

  const isDualUse = () => {
    const { currentKey: key } = props;

    return db.isInCategory(key.code, "dualuse");
  };

  const toggleModifier = (mod) => (event) => {
    const { currentKey: key } = props;

    if (event.target.checked) {
      props.onKeyChange(addModifier(key.code, mod));
    } else {
      props.onKeyChange(removeModifier(key.code, mod));
    }
  };

  const toggleOneShot = (event) => {
    const { currentKey: key } = props;
    const c = db.constants.codes;

    if (event.target.checked) {
      props.onKeyChange(key.code - c.FIRST_MODIFIER + c.FIRST_ONESHOT_MODIFIER);
    } else {
      props.onKeyChange(key.code - key.rangeStart + c.FIRST_MODIFIER);
    }
  };

  const makeSwitch = (mod) => {
    const { currentKey: key } = props;

    return (
      <Switch
        checked={db.isInCategory(key, mod)}
        color="primary"
        onChange={toggleModifier(mod)}
      />
    );
  };

  const { currentKey: key } = props;

  let oneShot;
  if (oneShotVisible && db.isInCategory(key.baseCode || key.code, "modifier")) {
    const osmControl = (
      <Switch
        checked={db.isInCategory(key, "oneshot")}
        color="primary"
        onChange={toggleOneShot}
      />
    );

    oneShot = (
      <FormControl
        component="fieldset"
        sx={{ mt: 1 }}
        disabled={
          !db.isInCategory(key.code, "modifier") ||
          db.isInCategory(key.code, "dualuse")
        }
      >
        <FormGroup row>
          <Tooltip title={t("editor.sidebar.keypicker.oneshot.tooltip")}>
            <FormControlLabel
              control={osmControl}
              label={t("editor.sidebar.keypicker.oneshot.label")}
            />
          </Tooltip>
        </FormGroup>
      </FormControl>
    );
  }

  const isDU = db.isInCategory(key.code, "dualuse");
  const isMod = (key, mod) => key.baseCode == mod || key.code == mod;
  const c = db.constants.codes;

  return (
    <Collapsible
      expanded={isStandardKey(props) || isOSM() || isDualUse()}
      title={t("editor.sidebar.keypicker.mods")}
      help={t("editor.sidebar.keypicker.modsHelp")}
    >
      <Box sx={{ margin: "2 0" }}>
        <FormControl
          component="fieldset"
          sx={{ mt: 1 }}
          disabled={!isStandardKey(props)}
        >
          <FormGroup row>
            <FormControlLabel
              control={makeSwitch("shift")}
              label="Shift"
              disabled={isMod(key, c.LEFT_SHIFT) || isDU}
            />
            <FormControlLabel
              control={makeSwitch("ctrl")}
              label="Control"
              disabled={isMod(key, c.LEFT_CONTROL) || isDU}
            />
            <FormControlLabel
              control={makeSwitch("alt")}
              label="Alt"
              disabled={isMod(key, c.LEFT_ALT) || isDU}
            />
            <FormControlLabel
              control={makeSwitch("gui")}
              label={GuiLabel.full}
              disabled={isMod(key, c.LEFT_GUI) || isDU}
            />
            <FormControlLabel
              control={makeSwitch("altgr")}
              label="AltGr"
              disabled={isMod(key, c.RIGHT_ALT) || isDU}
            />
          </FormGroup>
        </FormControl>
        {oneShot}
      </Box>
    </Collapsible>
  );
};

export { KeyPicker as default };
