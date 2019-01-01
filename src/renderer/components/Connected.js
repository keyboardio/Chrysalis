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
import Button from "@material-ui/core/Button";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import CssBaseline from "@material-ui/core/CssBaseline";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import HighlightIcon from "@material-ui/icons/Highlight";
import IconButton from "@material-ui/core/IconButton";
import InfoIcon from "@material-ui/icons/Info";
import KeyboardIcon from "@material-ui/icons/Keyboard";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import MenuIcon from "@material-ui/icons/Menu";
import SettingsIcon from "@material-ui/icons/Settings";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";

import ColormapEditor from "./ColormapEditor";
import FirmwareUpdate from "./FirmwareUpdate";
import LayoutEditor from "./LayoutEditor";
import Settings from "./Settings";
import Welcome from "./Welcome";
import logo from "../logo-small.png";

const styles = theme => ({
  root: {
    display: "flex",
    flexDirection: "column"
  },
  content: {
    flexGrow: 1,
    overflow: "auto"
  },
  pageMenu: {
    marginLeft: theme.spacing.unit * 2
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  },
  grow: {
    flexGrow: 1
  },
  drawer: {
    width: 250
  },
  toolbarIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "0 8px",
    ...theme.mixins.toolbar
  }
});

class Connected extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      boardAnchor: null,
      pageMenu: false,
      Page: props.pages.keymap ? LayoutEditor : Welcome
    };
  }

  disconnect = () => {
    this.props.onDisconnect();
  };

  boardMenu = event => {
    this.setState({ boardAnchor: event.currentTarget });
  };
  boardClose = () => {
    this.setState({ boardAnchor: null });
  };

  pageMenu = () => {
    this.setState({ pageMenu: true });
  };

  closePageMenu = () => {
    this.setState({ pageMenu: false });
  };

  openURL = url => {
    const shell = Electron.remote.shell;

    return () => {
      shell.openExternal(url);
      this.boardClose();
    };
  };

  openPage = page => {
    this.setState({ Page: page });
  };

  render() {
    const { classes, pages } = this.props;
    const { Page } = this.state;

    let focus = new Focus(),
      device = focus.device.info;

    const { boardAnchor } = this.state;
    const boardOpen = Boolean(boardAnchor);
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

    const welcomeMenu = !pages.keymap && !pages.colormap && (
      <ListItem
        button
        selected={this.state.Page == Welcome}
        onClick={() => {
          this.setState({ Page: Welcome });
        }}
      >
        <ListItemIcon>
          <InfoIcon />
        </ListItemIcon>
        <ListItemText primary="Welcome!" />
      </ListItem>
    );

    const keymapMenuItem = pages.keymap && (
      <ListItem
        button
        selected={this.state.Page == LayoutEditor}
        onClick={() => {
          this.setState({ Page: LayoutEditor });
        }}
      >
        <ListItemIcon>
          <KeyboardIcon />
        </ListItemIcon>
        <ListItemText primary="Layout editor" />
      </ListItem>
    );

    const colormapMenuItem = pages.colormap && (
      <ListItem
        button
        selected={this.state.Page == ColormapEditor}
        onClick={() => {
          this.setState({ Page: ColormapEditor });
        }}
      >
        <ListItemIcon>
          <HighlightIcon />
        </ListItemIcon>
        <ListItemText primary="Colormap editor" />
      </ListItem>
    );

    const flashMenuItem = (
      <ListItem
        button
        selected={this.state.Page == FirmwareUpdate}
        onClick={() => {
          this.setState({ Page: FirmwareUpdate });
        }}
      >
        <ListItemIcon>
          <CloudUploadIcon />
        </ListItemIcon>
        <ListItemText primary="Firmware update" />
      </ListItem>
    );

    const settingsMenuItem = (
      <ListItem
        button
        selected={this.state.Page == Settings}
        onClick={() => {
          this.setState({ Page: Settings });
        }}
      >
        <ListItemIcon>
          <SettingsIcon />
        </ListItemIcon>
        <ListItemText primary="Settings" />
      </ListItem>
    );

    const disconnectMenuItem = (
      <ListItem button onClick={this.disconnect}>
        <ListItemIcon>
          <ExitToAppIcon />
        </ListItemIcon>
        <ListItemText primary="Disconnect" />
      </ListItem>
    );

    return (
      <div className={classes.root}>
        <CssBaseline />
        <AppBar position="static" color="inherit" id="appbar">
          <Toolbar variant="dense">
            <Button
              className={classes.menuButton}
              color="inherit"
              onClick={this.pageMenu}
            >
              <MenuIcon />
              <Typography
                variant="h6"
                color="inherit"
                className={classes.pageMenu}
                id="page-title"
              />
            </Button>
            <div className={classes.grow} />
            <Button
              onClick={this.boardMenu}
              disabled={!boardMenu}
              color="inherit"
              className={classes.button}
            >
              Device: {device.vendor} {device.product}
            </Button>
            {boardMenu}
          </Toolbar>
        </AppBar>
        <main className={classes.content}>
          <Page
            appBarElement={() => document.querySelector("#appbar")}
            titleElement={() => document.querySelector("#page-title")}
            onDisconnect={this.disconnect}
            openPage={this.openPage}
            toggleFlashing={this.props.toggleFlashing}
          />
        </main>
        <Drawer open={this.state.pageMenu} onClose={this.closePageMenu}>
          <div
            onClick={this.closePageMenu}
            role="button"
            onKeyDown={this.closePageMenu}
          >
            <div className={classes.toolbarIcon}>
              <IconButton
                onClick={() => {
                  this.openPage(
                    this.props.pages.keymap ? LayoutEditor : Welcome
                  );
                }}
              >
                <img src={logo} />
              </IconButton>
            </div>
            <List className={classes.drawer}>
              {welcomeMenu}
              {keymapMenuItem}
              {colormapMenuItem}
              {flashMenuItem}
            </List>
            <Divider />
            <List className={classes.drawer}>
              {settingsMenuItem}
              {disconnectMenuItem}
            </List>
          </div>
        </Drawer>
      </div>
    );
  }
}

export default withStyles(styles)(Connected);
