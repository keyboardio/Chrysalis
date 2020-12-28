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

import FormControl from "@material-ui/core/FormControl";
import ListItemText from "@material-ui/core/ListItemText";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import { withStyles } from "@material-ui/core/styles";

import Collapsible from "../components/Collapsible";
import { KeymapDB } from "../../../../api/keymap";
const db = new KeymapDB();

const styles = () => ({});

class LayoutBase extends React.Component {
  setLayout = event => {
    const layout = event.target.value || this.props.layout;
    this.props.setLayout(layout);
  };

  render() {
    const layoutMenu = db.getSupportedLayouts().map((layout, index) => {
      const menuKey = "layout-menu-" + index.toString();
      return (
        <MenuItem value={layout} key={menuKey}>
          <ListItemText primary={layout} />
        </MenuItem>
      );
    });
    const layoutSelect = (
      <FormControl>
        <Select value={this.props.layout} onClick={this.setLayout} autoWidth>
          {layoutMenu}
        </Select>
      </FormControl>
    );

    return (
      <React.Fragment>
        <Collapsible expanded={false} title="Layout">
          {layoutSelect}
        </Collapsible>
      </React.Fragment>
    );
  }
}
const Layout = withStyles(styles, { withTheme: true })(LayoutBase);

export { Layout as default };
