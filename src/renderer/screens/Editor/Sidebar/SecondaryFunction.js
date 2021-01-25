// -*- mode: js-jsx -*-
/* Chrysalis -- Kaleidoscope Command Center
 * Copyright (C) 2020  Keyboardio, Inc.
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

import React from "react";
import i18n from "i18next";

import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import { withStyles } from "@material-ui/core/styles";

import Collapsible from "../components/Collapsible";
import { KeymapDB } from "../../../../api/keymap";
import { addDUM, addDUL } from "../../../../api/keymap/db/base/dualuse";
import { GuiLabel } from "../../../../api/keymap/db/base/gui";

const db = new KeymapDB();

const styles = () => ({});

class SecondaryFunctionBase extends React.Component {
  onTargetLayerChange = event => {
    const { keymap, selectedKey, layer } = this.props;
    const key = keymap.custom[layer][selectedKey];
    const target = parseInt(event.target.value) || 0;
    const code = key.baseCode || key.code;

    this.props.onKeyChange(addDUL(db.lookup(code), target));
  };

  onModifierChange = event => {
    const { keymap, selectedKey, layer } = this.props;
    const key = keymap.custom[layer][selectedKey];
    const modifier = event.target.value;
    const code = key.baseCode || key.code;

    this.props.onKeyChange(addDUM(db.lookup(code), modifier));
  };

  onTypeChange = event => {
    const { keymap, selectedKey, layer } = this.props;
    const key = keymap.custom[layer][selectedKey];
    const code = key.baseCode || key.code;
    const type = event.target.value;

    if (type == "none") {
      return this.props.onKeyChange(code);
    }
    if (type == "layer") {
      const newKey = addDUL(db.lookup(code), 0);
      return this.props.onKeyChange(newKey.code);
    }
    if (type == "modifier") {
      const newKey = addDUM(db.lookup(code), "ctrl");
      return this.props.onKeyChange(newKey.code);
    }
  };

  keySupportsSecondaryAction = key => {
    return (
      (key.code >= 4 &&
        key.code <= 255 &&
        !db.isInCategory(key.code, "modifier")) ||
      db.isInCategory(key.code, "dualuse")
    );
  };

  render() {
    const { classes, keymap, selectedKey, layer } = this.props;
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
          <FormControl className={classes.form}>
            <FormGroup row>
              <InputLabel>
                {i18n.t("editor.sidebar.secondary.modifier")}
              </InputLabel>
              <Select value={modifier} onChange={this.onModifierChange}>
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
          <FormControl className={classes.form}>
            <InputLabel>
              {i18n.t("editor.sidebar.secondary.targetLayer")}
            </InputLabel>
            <Input
              type="number"
              min={0}
              max={maxLayer}
              value={targetLayer < 0 ? "" : targetLayer}
              disabled={targetLayer < 0}
              onChange={this.onTargetLayerChange}
            />
          </FormControl>
        );
      }
    }

    return (
      <React.Fragment>
        <Collapsible
          title={i18n.t("editor.sidebar.secondary.title")}
          help={i18n.t("editor.sidebar.secondary.help")}
          expanded={this.keySupportsSecondaryAction(key)}
        >
          <div>
            <FormControl
              className={classes.form}
              disabled={!this.keySupportsSecondaryAction(key)}
            >
              <FormGroup row>
                <InputLabel>{i18n.t("components.type")}</InputLabel>
                <Select value={type} onChange={this.onTypeChange}>
                  <MenuItem value="none" selected={type == "none"}>
                    {i18n.t("editor.sidebar.secondary.type.none")}
                  </MenuItem>
                  <MenuItem value="modifier" selected={type == "modifier"}>
                    {i18n.t("editor.sidebar.secondary.type.modifier")}
                  </MenuItem>
                  <MenuItem value="layer" selected={type == "layer"}>
                    {i18n.t("editor.sidebar.secondary.type.layer")}
                  </MenuItem>
                </Select>
              </FormGroup>
            </FormControl>
            {actionTarget}
          </div>
        </Collapsible>
      </React.Fragment>
    );
  }
}
const SecondaryFunction = withStyles(styles, { withTheme: true })(
  SecondaryFunctionBase
);

export { SecondaryFunction as default };
