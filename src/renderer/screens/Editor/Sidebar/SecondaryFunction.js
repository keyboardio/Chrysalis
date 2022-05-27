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

import { KeymapDB } from "@api/keymap";
import { addDUL, addDUM } from "@api/keymap/db/base/dualuse";
import { GuiLabel } from "@api/keymap/db/base/gui";
import FormControl from "@mui/material/FormControl";
import FormGroup from "@mui/material/FormGroup";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import usePluginVisibility from "@renderer/hooks/usePluginVisibility";
import React from "react";
import { useTranslation } from "react-i18next";
import Collapsible from "../components/Collapsible";

const db = new KeymapDB();

const SecondaryFunction = (props) => {
  const { t } = useTranslation();
  const onTargetLayerChange = (event) => {
    const { keymap, selectedKey, layer } = props;
    const key = keymap.custom[layer][selectedKey];
    const maxLayer = Math.min(keymap.custom.length, 7);
    let target = parseInt(event.target.value) || 0;
    const code = key.baseCode || key.code;

    if (target < 0) target = maxLayer;
    if (target > maxLayer) target = 0;

    props.onKeyChange(addDUL(db.lookup(code), target).code);
  };

  const onModifierChange = (event) => {
    const { keymap, selectedKey, layer } = props;
    const key = keymap.custom[layer][selectedKey];
    const modifier = event.target.value;
    const code = key.baseCode || key.code;

    props.onKeyChange(addDUM(db.lookup(code), modifier).code);
  };

  const onTypeChange = (event) => {
    const { keymap, selectedKey, layer } = props;
    const key = keymap.custom[layer][selectedKey];
    const code = key.baseCode || key.code;
    const type = event.target.value;

    if (type == "none") {
      return props.onKeyChange(code);
    }
    if (type == "layer") {
      const newKey = addDUL(db.lookup(code), 0);
      return props.onKeyChange(newKey.code);
    }
    if (type == "modifier") {
      const newKey = addDUM(db.lookup(code), "ctrl");
      return props.onKeyChange(newKey.code);
    }
  };

  const keySupportsSecondaryAction = (key) => {
    return (
      (key.code >= 4 &&
        key.code <= 255 &&
        !db.isInCategory(key.code, "modifier")) ||
      db.isInCategory(key.code, "dualuse")
    );
  };

  const pluginVisible = usePluginVisibility("Qukeys");
  if (!pluginVisible) return null;

  const { classes, keymap, selectedKey, layer } = props;
  const key = keymap.custom[layer][selectedKey];
  const maxLayer = Math.min(keymap.custom.length, 7);

  let type = "none",
    targetLayer = -1,
    modifier = "ctrl";

  let actionTarget;
  if (db.isInCategory(key.code, "dualuse")) {
    type = key.categories[0];

    if (db.isInCategory(key.code, "modifier")) {
      modifier = key.categories[2];

      actionTarget = (
        <FormControl>
          <FormGroup row>
            <InputLabel>{t("editor.sidebar.secondary.modifier")}</InputLabel>
            <Select value={modifier} onChange={onModifierChange}>
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
              <MenuItem value="altgr" selected={modifier == "altgr"}>
                AltGr
              </MenuItem>
            </Select>
          </FormGroup>
        </FormControl>
      );
    } else if (db.isInCategory(key.code, "layer")) {
      targetLayer = key.target;

      actionTarget = (
        <FormControl>
          <InputLabel>{t("editor.sidebar.secondary.targetLayer")}</InputLabel>
          <Input
            type="number"
            min={0}
            max={maxLayer}
            value={targetLayer < 0 ? "" : targetLayer}
            disabled={targetLayer < 0}
            onChange={onTargetLayerChange}
          />
        </FormControl>
      );
    }
  }

  return (
    <React.Fragment>
      <Collapsible
        title={t("editor.sidebar.secondary.title")}
        help={t("editor.sidebar.secondary.help")}
        expanded={keySupportsSecondaryAction(key)}
      >
        <div>
          <FormControl disabled={!keySupportsSecondaryAction(key)}>
            <FormGroup row>
              <InputLabel>{t("editor.sidebar.secondary.whenHeld")}</InputLabel>
              <Select value={type} onChange={onTypeChange}>
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
      </Collapsible>
    </React.Fragment>
  );
};

export { SecondaryFunction as default };
