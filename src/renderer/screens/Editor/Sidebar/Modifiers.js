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
import Typography from "@mui/material/Typography";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import Switch from "@mui/material/Switch";
import Tooltip from "@mui/material/Tooltip";
import usePluginAvailable from "@renderer/hooks/usePluginVisibility";
import React from "react";
import { useTranslation } from "react-i18next";
import FKPCategorySelector from "../components/FKPCategorySelector";
import Box from "@mui/material/Box";
const db = new KeymapDB();

const KeyPicker = (props) => {
  const { t } = useTranslation();
  const oneShotAvailable = usePluginAvailable("OneShot");

  const isStandardKey = (props) => {
    const { currentKey: key } = props;
    const code = key.baseCode || key.code;
    const stdRange = db.constants.ranges.standard;

    return code >= stdRange.start && code <= stdRange.end && !db.isInCategory(key.code, "dualuse");
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
        checked={db.isInCategory(key, mod) && !db.isInCategory(key.code, "dualuse")}
        color="primary"
        onChange={toggleModifier(mod)}
      />
    );
  };

  const { currentKey: key } = props;

  const disableOneShot = !oneShotAvailable || !db.isInCategory(key.baseCode || key.code, "modifier");
  const osmControl = (
    <Switch
      checked={db.isInCategory(key, "oneshot")}
      color="primary"
      onChange={toggleOneShot}
      disabled={disableOneShot || db.isInCategory(key.code, "dualuse")}
    />
  );

  const isDualUse = db.isInCategory(key.code, "dualuse");
  const isShifted = db.isInCategory(key.code, "shift");
  const isTopsyTurvy = db.isInCategory(key.code, "topsyturvy");

  const isOSM = () => {
    const { currentKey: key } = props;

    return db.isInCategory(key.code, "modifier") && db.isInCategory(key.code, "oneshot");
  };
  const isMod = (key, mod) => key.baseCode == mod || key.code == mod;

  const c = db.constants.codes;
  const topsyTurvyAvailable = usePluginAvailable("TopsyTurvy");

  return (
    <>
      <Box sx={{ margin: "2 0" }}>
        <FormGroup row>
          <FormControl component="fieldset" sx={{ mt: 1 }} disabled={!isStandardKey(props)}>
            <Typography>{t("editor.sidebar.keypicker.modsHelp")}</Typography>

            <FormGroup column>
              <FormControlLabel
                control={makeSwitch("shift")}
                label="Shift"
                disabled={isMod(key, c.LEFT_SHIFT) || isTopsyTurvy || isDualUse}
              />
              <FormControlLabel
                control={makeSwitch("ctrl")}
                label="Control"
                disabled={isMod(key, c.LEFT_CONTROL) || isDualUse}
              />
              <FormControlLabel
                control={makeSwitch("alt")}
                label="Alt"
                disabled={isMod(key, c.LEFT_ALT) || isDualUse}
              />
              <FormControlLabel
                control={makeSwitch("gui")}
                label={GuiLabel.full}
                disabled={isMod(key, c.LEFT_GUI) || isDualUse}
              />
              <FormControlLabel
                control={makeSwitch("altgr")}
                label="AltGr"
                disabled={isMod(key, c.RIGHT_ALT) || isDualUse}
              />
            </FormGroup>
          </FormControl>
          <FormGroup column>
            <Typography>{t("editor.sidebar.keypicker.specialModsHelp")}</Typography>

            <FormControl component="fieldset" sx={{ mt: 1 }} disabled={!isStandardKey(props)}>
              <Tooltip title={t("editor.sidebar.keypicker.topsyturvy.tooltip")}>
                <FormControlLabel
                  control={makeSwitch("topsyturvy")}
                  label={t("editor.sidebar.keypicker.topsyturvy.label")}
                  disabled={!topsyTurvyAvailable || isMod(key, c.LEFT_SHIFT) || isShifted || isDualUse}
                />
              </Tooltip>

              <Tooltip title={t("editor.sidebar.keypicker.oneshot.tooltip")}>
                <FormControlLabel control={osmControl} label={t("editor.sidebar.keypicker.oneshot.label")} />
              </Tooltip>
            </FormControl>
          </FormGroup>
        </FormGroup>
      </Box>
    </>
  );
};

export { KeyPicker as default };
