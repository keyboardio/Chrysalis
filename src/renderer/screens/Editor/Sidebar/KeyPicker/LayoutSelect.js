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
import FormHelperText from "@material-ui/core/FormHelperText";
import InputLabel from "@material-ui/core/InputLabel";
import ListItemText from "@material-ui/core/ListItemText";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import { withStyles } from "@material-ui/core/styles";

import { KeymapDB } from "../../../../../api/keymap";

const db = new KeymapDB();

const styles = () => ({});

class LayoutSelectBase extends React.Component {
  setLayout = event => {
    const layout = event.target.value || this.props.layout;
    this.props.setLayout(layout);
  };

  render() {
    const { className, layout, setLayout } = this.props;

    const layoutMenu = db.getSupportedLayouts().map((layout, index) => {
      const menuKey = "layout-menu-" + index.toString();
      return (
        <MenuItem value={layout} key={menuKey}>
          <ListItemText primary={layout} />
        </MenuItem>
      );
    });

    const platforms = {
      linux: "Linux",
      win32: "Windows",
      darwin: "macOS"
    };
    const hostos = platforms[process.platform];

    return (
      <div className={className}>
        <FormControl>
          <InputLabel>
            {i18n.t("editor.sidebar.keypicker.hostLayout", {
              hostos: hostos
            })}
          </InputLabel>
          <Select value={layout} onClick={this.setLayout} autoWidth>
            {layoutMenu}
          </Select>
          <FormHelperText>
            {i18n.t("editor.sidebar.keypicker.hostHelp")}
          </FormHelperText>
        </FormControl>
      </div>
    );
  }
}
const LayoutSelect = withStyles(styles, { withTheme: true })(LayoutSelectBase);

export { LayoutSelect as default };
