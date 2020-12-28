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

import Drawer from "@material-ui/core/Drawer";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";

import Layout from "./Sidebar/Layout";
import Configuration from "./Sidebar/Configuration";
import KeyPicker from "./Sidebar/KeyPicker";

import { KeymapDB } from "../../../api/keymap";

const sidebarWidth = 360;

const styles = theme => ({
  drawer: {
    width: sidebarWidth,
    flexShrink: 0
  },
  drawerPaper: {
    width: sidebarWidth
  },
  drawerContainer: {
    overflow: "auto",
    padding: theme.spacing(3)
  }
});

class Sidebar extends React.Component {
  render() {
    const { classes, keymap, selectedKey, layer, layout } = this.props;

    const db = new KeymapDB();
    const label = db.format(keymap.custom[layer][selectedKey], "full").main;

    return (
      <Drawer
        className={classes.drawer}
        variant="permanent"
        anchor="right"
        classes={{
          paper: classes.drawerPaper
        }}
      >
        <Toolbar />
        <div className={classes.drawerContainer}>
          <Typography variant="h6">
            Key {label} (#{selectedKey}) - Layer {layer}
          </Typography>
          <Layout layout={layout} setLayout={this.props.setLayout} />
          <Configuration
            keymap={keymap}
            selectedKey={selectedKey}
            layer={layer}
            setLayer={this.props.setLayer}
          />
          <KeyPicker
            keymap={keymap}
            selectedKey={selectedKey}
            layer={layer}
            onKeyChange={this.props.onKeyChange}
          />
        </div>
      </Drawer>
    );
  }
}

const StyledSidebar = withStyles(styles, { withTheme: true })(Sidebar);

export { StyledSidebar as default, sidebarWidth };
