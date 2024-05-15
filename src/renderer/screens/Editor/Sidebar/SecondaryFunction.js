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
 * along with  this program.  If not, see <http://www.gnu.org/licenses/>.
 */

import KeymapDB from "@api/focus/keymap/db";
import { addDualUseLayer, addDualUseModifier } from "@api/focus/keymap/db/base";
import { GuiLabel } from "@api/focus/keymap/db/gui";
import FormControl from "@mui/material/FormControl";
import FormGroup from "@mui/material/FormGroup";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Tooltip from "@mui/material/Tooltip";
import React from "react";
import { useTranslation } from "react-i18next";
import FKPCategorySelector from "../components/FKPCategorySelector";
const db = new KeymapDB();

const SecondaryFunction = (props) => {
  const { t } = useTranslation();
  const onTargetLayerChange = (event, maxLayer) => {
    const { currentKey: key } = props;
    let target = parseInt(event.target.value) || 0;
    const code = key.baseCode || key.code;

    if (target < 0) target = maxLayer;
    if (target > maxLayer) target = 0;

    props.onKeyChange(addDualUseLayer(db.lookup(code), target).code);
  };

  const onModifierChange = (event) => {
    const { currentKey: key } = props;
    const modifier = event.target.value;
    const code = key.baseCode || key.code;

    props.onKeyChange(addDualUseModifier(db.lookup(code), modifier).code);
  };

  const onTypeChange = (event) => {
    const { currentKey: key } = props;
    const code = key.baseCode || key.code;
    const type = event.target.value;

    if (type == "none") {
      return props.onKeyChange(code);
    }
    if (type == "layer") {
      const newKey = addDualUseLayer(db.lookup(code), 0);
      return props.onKeyChange(newKey.code);
    }
    if (type == "modifier") {
      const newKey = addDualUseModifier(db.lookup(code), "ctrl");
      return props.onKeyChange(newKey.code);
    }
  };

  const keySupportsSecondaryAction = (key) => {
    const stdRange = db.constants.ranges.standard;
    return (
      (key.code >= stdRange.start && key.code <= stdRange.end && !db.isInCategory(key.code, "modifier")) ||
      db.isInCategory(key.code, "dualuse")
    );
  };

  const { currentKey: key, keymap } = props;
  const maxLayer = keymap.custom.length;

  let type = "none",
    targetLayer = -1,
    modifier = "ctrl";

  let actionTarget;
  if (db.isInCategory(key.code, "dualuse")) {
    type = key.categories[0];

    if (db.isInCategory(key.code, "modifier")) {
      modifier = key.categories[2];

      actionTarget = (
        <FormControl sx={{ mx: 1 }}>
          <FormGroup row>
            <InputLabel>{t("editor.sidebar.secondary.modifier")}</InputLabel>
            <Select value={modifier} onChange={onModifierChange} label={t("editor.sidebar.secondary.modifier")}>
              <MenuItem value="ctrl" selected={modifier == "ctrl"}>
                Control
              </MenuItem>
              <MenuItem value="shift" selected={modifier == "shift"}>
                Shift
              </MenuItem>
              <MenuItem value="alt" selected={modifier == "alt"}>
                Alt
              </MenuItem>
              <MenuItem value="gui" selected={modifier == "gui"}>
                {GuiLabel.full}
              </MenuItem>
              <MenuItem value="rctrl" selected={modifier == "rctrl"}>
                Right Control
              </MenuItem>
              <MenuItem value="rshift" selected={modifier == "rshift"}>
                Right Shift
              </MenuItem>
              <MenuItem value="altgr" selected={modifier == "altgr"}>
                AltGr
              </MenuItem>
              <MenuItem value="rgui" selected={modifier == "rgui"}>
                Right {GuiLabel.full}
              </MenuItem>
            </Select>
          </FormGroup>
        </FormControl>
      );
    } else if (db.isInCategory(key.code, "layer")) {
      targetLayer = key.target;

      let layerLimitText = "";
      if (maxLayer > db.constants.limits.secondaryActionLayerLimit) {
        layerLimitText = t("editor.sidebar.secondary.help-layerLimit", {
          layer7: props.layerNames?.names[db.constants.limits.secondaryActionLayerLimit],
        });
      }

      actionTarget = (
        <FormControl sx={{ mx: 1 }} size="small">
          <InputLabel id="editor.sidebar.secondary.targetLayer">
            {t("editor.sidebar.secondary.targetLayer")}{" "}
          </InputLabel>
          <Tooltip title={maxLayer > db.constants.limits.secondaryActionLayerLimit && layerLimitText}>
            <Select
              labelId="editor.sidebar.secondary.targetLayer"
              value={targetLayer}
              onChange={(event) => onTargetLayerChange(event, maxLayer)}
              label={t("editor.sidebar.secondary.targetLayer")}
              disabled={targetLayer < 0}
            >
              <MenuItem value="-1" disabled></MenuItem>
              {[...Array(maxLayer)].map((x, i) => (
                <MenuItem
                  name={i}
                  key={`dualuse-dropdown-${i}`}
                  value={i}
                  disabled={i > db.constants.limits.secondaryActionLayerLimit}
                >
                  {props.layerNames?.names[i]}
                </MenuItem>
              ))}
            </Select>
          </Tooltip>
        </FormControl>
      );
    }
  }

  return (
    <FKPCategorySelector category="secondary" plugin="Qukeys" disabledInMacroEditor={true}>
      <div>
        <FormControl disabled={!keySupportsSecondaryAction(key)} size="small">
          <FormGroup row>
            <InputLabel>{t("editor.sidebar.secondary.whenHeld")}</InputLabel>
            <Select value={type} onChange={onTypeChange} label={t("editor.sidebar.secondary.whenHeld")}>
              <MenuItem value="none" selected={type == "none"}>
                {t("editor.sidebar.secondary.type.none")}
              </MenuItem>
              <MenuItem value="modifier" selected={type == "modifier"}>
                {t("editor.sidebar.secondary.type.modifier")}
              </MenuItem>
              <MenuItem value="layer" selected={type == "layer"}>
                {t("editor.sidebar.secondary.type.layer")}
              </MenuItem>
            </Select>
          </FormGroup>
        </FormControl>
        {actionTarget}
      </div>
    </FKPCategorySelector>
  );
};

export { SecondaryFunction as default };
