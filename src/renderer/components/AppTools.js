// -*- mode: js-jsx -*-
/* chrysalis-bundle-keyboardio -- Chrysalis Bundle for Keyboard.io
 * Copyright (C) 2018  Keyboardio, Inc.
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
import Electron from "electron";

import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { withStyles } from "@material-ui/core/styles";

import { withSnackbar } from "notistack";

import { isDevelopment } from "../config";

const styles = () => ({
  tools: {
    position: "fixed",
    bottom: 0,
    right: 0,
    zIndex: 1200
  }
});

class AppTools extends React.Component {
  state = {
    anchorEl: null
  };

  toggleDevTools = () => {
    const webContents = Electron.remote.getCurrentWebContents();

    if (webContents.isDevToolsOpened()) {
      webContents.closeDevTools();
    } else {
      webContents.openDevTools();
    }
    this.closeMenu();
  };

  openMenu = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  closeMenu = () => {
    this.setState({ anchorEl: null });
  };

  reportBug = () => {
    const shell = Electron.remote.shell;
    shell.openExternal(
      "https://github.com/keyboardio/chrysalis-bundle-keyboardio/issues"
    );
    this.closeMenu();
  };

  saveScreenshot = async () => {
    const w = Electron.remote.getCurrentWindow(),
      fs = Electron.remote.require("fs"),
      fileName = "chrysalis-" + Date.now().toString() + ".png";

    this.closeMenu();

    setTimeout(() => {
      w.capturePage(img => {
        fs.writeFile(fileName, img.toPNG(), () => {
          this.props.enqueueSnackbar("Screenshot saved to " + fileName, {
            variant: "success",
            autoHideDuration: 1000
          });
        });
      });
    }, 1000);
  };

  render() {
    const { classes } = this.props;
    const { anchorEl } = this.state;

    return (
      <div className={classes.tools}>
        <Button onClick={this.openMenu} variant="contained">
          QA Tools
        </Button>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.closeMenu}
        >
          {isDevelopment && (
            <MenuItem onClick={this.toggleDevTools}>Toggle DevTools</MenuItem>
          )}
          <MenuItem onClick={this.reportBug}>Report a bug</MenuItem>
          <MenuItem onClick={this.saveScreenshot}>Save a screenshot</MenuItem>
        </Menu>
      </div>
    );
  }
}

export default withSnackbar(withStyles(styles)(AppTools));
