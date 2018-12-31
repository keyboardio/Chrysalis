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

import Focus from "@chrysalis-api/focus";

import AppBar from "@material-ui/core/AppBar";
import BuildIcon from "@material-ui/icons/Build";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import SettingsBackupRestoreIcon from "@material-ui/icons/SettingsBackupRestore";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";

import { withSnackbar } from "notistack";

import UploadDialog from "./UploadDialog";

const styles = theme => ({
  bottomBar: {
    top: "auto",
    left: theme.spacing.unit * 7,
    bottom: 0
  },
  version: {
    width: "100vh",
    textAlign: "center",
    opacity: 0.6
  },
  button: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit
  }
});

class BottomBar extends React.Component {
  state = {
    version: "",
    boardAnchor: null,
    flashAnchor: null,
    factoryResetStarted: false,
    customFlashStarted: false,
    firmwareFile: ""
  };

  componentDidMount() {
    let focus = new Focus();

    try {
      focus.command("version").then(version => {
        this.setState({ version: version });
      });
    } catch (e) {} // eslint-disable-line
  }

  boardMenu = event => {
    this.setState({ boardAnchor: event.currentTarget });
  };
  boardClose = () => {
    this.setState({ boardAnchor: null });
  };

  flashMenu = event => {
    this.setState({ flashAnchor: event.currentTarget });
  };
  flashClose = () => {
    this.setState({ flashAnchor: null });
  };

  openURL = url => {
    const shell = Electron.remote.shell;

    return () => {
      shell.openExternal(url);
      this.boardClose();
    };
  };

  startFactoryReset = () => {
    this.flashClose();
    this.setState({ factoryResetStarted: true });
  };
  cancelFactoryReset = () => {
    this.setState({ factoryResetStarted: false });
  };

  cancelCustomFlash = () => {
    this.setState({ customFlashStarted: false });
  };
  selectFirmware = () => {
    this.flashClose();
    let files = Electron.remote.dialog.showOpenDialog({
      title: "Select a firmware",
      filters: [
        {
          name: "Firmware files",
          extensions: ["hex"]
        },
        {
          name: "All files",
          extensions: ["*"]
        }
      ]
    });
    if (files) {
      this.setState({
        firmwareFile: files[0],
        customFlashStarted: true
      });
    }
  };

  render() {
    const { classes } = this.props;
    let focus = new Focus(),
      device = focus.device.info;

    const version = this.state.version && (
      <Typography variant="body2" className={classes.version}>
        {this.state.version}
      </Typography>
    );

    const { boardAnchor, flashAnchor } = this.state;
    const boardOpen = Boolean(boardAnchor);
    const flashOpen = Boolean(flashAnchor);

    const boardMenuItems =
      device.urls &&
      device.urls.map(({ name, url }) => {
        return (
          <MenuItem key={name} onClick={this.openURL(url)}>
            {name}
          </MenuItem>
        );
      });
    const boardMenu = boardMenuItems && (
      <Menu anchorEl={boardAnchor} open={boardOpen} onClose={this.boardClose}>
        <MenuItem disabled>
          {device.vendor} {device.product}
        </MenuItem>
        <Divider variant="middle" />
        {boardMenuItems}
      </Menu>
    );

    return (
      <AppBar position="fixed" className={classes.bottomBar} color="default">
        <Toolbar>
          <Button
            onClick={this.boardMenu}
            disabled={!boardMenu}
            color="secondary"
            variant="contained"
            className={classes.button}
          >
            Device: {device.vendor} {device.product}
          </Button>
          {boardMenu}
          <Button
            onClick={this.flashMenu}
            color="secondary"
            variant="contained"
            className={classes.button}
          >
            Update firmware
          </Button>
          <Menu
            anchorEl={flashAnchor}
            open={flashOpen}
            onClose={this.flashClose}
          >
            <MenuItem onClick={this.startFactoryReset}>
              <ListItemIcon>
                <SettingsBackupRestoreIcon />
              </ListItemIcon>
              <ListItemText primary="Restore default firmware" />
            </MenuItem>
            <MenuItem onClick={this.selectFirmware}>
              <ListItemIcon>
                <BuildIcon />
              </ListItemIcon>
              <ListItemText primary="Install custom firmware" />
            </MenuItem>
          </Menu>
          <UploadDialog
            onDisconnect={this.props.onDisconnect}
            toggleFlashing={this.props.toggleFlashing}
            onClose={this.cancelFactoryReset}
            open={this.state.factoryResetStarted}
          />
          <UploadDialog
            onDisconnect={this.props.onDisconnect}
            toggleFlashing={this.props.toggleFlashing}
            onClose={this.cancelCustomFlash}
            open={this.state.customFlashStarted}
            filename={this.state.firmwareFile}
          />
          {version}
        </Toolbar>
      </AppBar>
    );
  }
}

export default withSnackbar(withStyles(styles)(BottomBar));
