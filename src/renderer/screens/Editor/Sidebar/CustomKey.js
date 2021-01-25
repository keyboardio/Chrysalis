// -*- mode: js-jsx -*-
/* Chrysalis -- Kaleidoscope Command Center
 * Copyright (C) 2020-2021  Keyboardio, Inc.
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
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import { withStyles } from "@material-ui/core/styles";

import Collapsible from "../components/Collapsible";
import { KeymapDB } from "../../../../api/keymap";

const db = new KeymapDB();

const styles = () => ({});

class CustomKeyBase extends React.Component {
  onKeyChange = event => {
    let value = event.target.value;
    if (value < 0) {
      value = 65535;
    }
    if (value > 65535) {
      value = 0;
    }
    this.props.onKeyChange(value);
  };

  render() {
    const { classes, keymap, selectedKey, layer } = this.props;
    const key = keymap.custom[layer][selectedKey];

    return (
      <React.Fragment>
        <Collapsible
          title={i18n.t("editor.sidebar.custom.title")}
          help={i18n.t("editor.sidebar.custom.help")}
          expanded={db.isInCategory(key.code, "unknown")}
        >
          <div>
            <FormControl className={classes.form}>
              <InputLabel>{i18n.t("editor.sidebar.custom.label")}</InputLabel>
              <Input
                type="number"
                min={0}
                max={65535}
                value={key.code}
                onChange={this.onKeyChange}
              />
            </FormControl>
          </div>
        </Collapsible>
      </React.Fragment>
    );
  }
}
const CustomKey = withStyles(styles, { withTheme: true })(CustomKeyBase);

export { CustomKey as default };
