// -*- mode: js-jsx -*-
/* Chrysalis -- Kaleidoscope Command Center
 * Copyright (C) 2018, 2019  Keyboardio, Inc.
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
import { spawn } from "child_process";

import Focus from "@chrysalis-api/focus";
import "@chrysalis-api/keymap";
import "@chrysalis-api/colormap";
import "typeface-roboto/index.css";
import "typeface-source-code-pro/index.css";

import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import CloseIcon from "@material-ui/icons/Close";
import CssBaseline from "@material-ui/core/CssBaseline";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import MenuIcon from "@material-ui/icons/Menu";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";

import usb from "usb";
import { withSnackbar } from "notistack";

import KeyboardSelect from "./screens/KeyboardSelect";
import ColormapEditor from "./screens/ColormapEditor";
import FirmwareUpdate from "./screens/FirmwareUpdate";
import LayoutEditor from "./screens/LayoutEditor";
import Settings from "./screens/Settings";
import Welcome from "./screens/Welcome";
import logo from "./logo-small.png";
import i18n from "./i18n";

import { version } from "../../package.json";
import DeviceMenu from "./components/DeviceMenu";
import BoardMenu from "./components/BoardMenu";
import WelcomeMenu from "./components/WelcomeMenu";
import KeymapMenuItem from "./components/KeymapMenuItem";
import ColormapMenuItem from "./components/ColormapMenuItem";
import FlashMenuItem from "./components/FlashMenuItem";
import ChatMenuItem from "./components/ChatMenuItem";
import FeedbackMenuItem from "./components/FeedbackMenuItem";
import ExitMenuItem from "./components/ExitMenuItem";
import KeyboardMenuItem from "./components/KeyboardSelectMenuItem";
import SettingsMenuItem from "./i18n/SettingsMenuItem";

let focus = new Focus();

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
    width: 350
  },
  version: {
    textAlign: "right"
  },
  toolbarIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "0 8px",
    ...theme.mixins.toolbar
  }
});

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      boardAnchor: null,
      pageMenu: false,
      connected: false,
      device: null,
      pages: {},
      contextBar: false,
      Page: KeyboardSelect
    };
  }
  flashing = false;

  componentDidMount() {
    usb.on("detach", device => {
      if (!focus.device) return;
      if (this.flashing) return;

      if (
        focus.device.usb.vendorId != device.deviceDescriptor.idVendor ||
        focus.device.usb.productId != device.deviceDescriptor.idProduct
      ) {
        return;
      }

      if (!focus._port.isOpen) {
        this.props.enqueueSnackbar(i18n.errors.deviceDisconnected, {
          variant: "warning"
        });
        focus.close();
        this.setState({
          connected: false,
          device: null,
          pages: {},
          Page: KeyboardSelect
        });
      }
    });
  }

  toggleFlashing = () => {
    this.flashing = !this.flashing;
    if (!this.flashing) {
      this.setState({
        connected: false,
        device: null,
        pages: {},
        Page: KeyboardSelect
      });
    }
  };

  onKeyboardConnect = async port => {
    focus.close();

    if (!port.comName) {
      this.setState({
        connected: true,
        pages: {},
        Page: Welcome,
        device: port.device
      });
      return;
    }

    console.log("Connecting to", port.comName);
    await focus.open(port.comName, port.device);
    if (process.platform == "darwin") {
      await spawn("stty", ["-f", port.comName, "clocal"]);
    }
    console.log("Probing for Focus support...");
    let commands = await focus.probe;
    try {
      commands = await focus.probe();
    } catch (e) {
      commands = [];
    }

    focus.setLayerSize(focus.device);

    this.setState({
      connected: true,
      device: null,
      pages: {
        keymap: commands.includes("keymap.map") > 0,
        colormap:
          commands.includes("colormap.map") > 0 &&
          commands.includes("palette") > 0
      },
      Page: commands.includes("keymap.map") > 0 ? LayoutEditor : Welcome
    });
  };

  onKeyboardDisconnect = () => {
    focus.close();
    this.setState({
      connected: false,
      device: null,
      pages: {},
      Page: KeyboardSelect
    });
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

  welcomeMenuOnClick = () => {
    this.setState({ Page: Welcome });
  };

  keymapMenuItemOnClick = () => {
    this.setState({ Page: LayoutEditor });
  };

  colormapMenuItemOnClick = () => {
    this.setState({ Page: ColormapEditor });
  };

  flashMenuItemOnClick = () => {
    this.setState({ Page: FirmwareUpdate });
  };

  keyboardMenuItemOnClick = () => {
    this.setState({ Page: KeyboardSelect });
  };

  settingsMenuItemOnClick = () => {
    this.setState({ Page: Settings });
  };

  openURL = url => {
    const shell = Electron.remote && Electron.remote.shell;

    if (!shell) return;

    return () => {
      shell.openExternal(url);
      this.boardClose();
    };
  };

  openPage = page => {
    this.setState({ Page: page });
  };

  cancelContext = () => {
    this.setState({ contextBar: false });
  };
  startContext = () => {
    this.setState({ contextBar: true });
  };

  render() {
    const { classes } = this.props;
    const { connected, pages, Page, contextBar } = this.state;

    let focus = new Focus(),
      device =
        (focus.device && focus.device.info) ||
        (this.state.device && this.state.device.info);

    const homePage = connected
      ? this.state.pages.keymap
        ? LayoutEditor
        : Welcome
      : KeyboardSelect;

    return (
      <div className={classes.root}>
        <CssBaseline />
        <AppBar
          position="static"
          color={contextBar ? "primary" : "inherit"}
          id="appbar"
        >
          <Toolbar variant="dense">
            <Button
              className={classes.menuButton}
              color="inherit"
              onClick={contextBar ? this.cancelContext : this.pageMenu}
            >
              {contextBar ? <CloseIcon /> : <MenuIcon />}
              <Typography
                variant="h6"
                color="inherit"
                className={classes.pageMenu}
                id="page-title"
              />
            </Button>
            <div className={classes.grow} />
            {device && (
              <DeviceMenu openBoardMenu={this.boardMenu} device={device} />
            )}
            {device && device.urls && (
              <BoardMenu
                boardAnchor={this.state.boardAnchor}
                boardClose={this.boardClose}
                device={device}
              />
            )}
          </Toolbar>
        </AppBar>
        <main className={classes.content}>
          <Page
            device={this.state.device}
            appBarElement={() => document.querySelector("#appbar")}
            titleElement={() => document.querySelector("#page-title")}
            onConnect={this.onKeyboardConnect}
            onDisconnect={this.onKeyboardDisconnect}
            openPage={this.openPage}
            toggleFlashing={this.toggleFlashing}
            inContext={this.state.contextBar}
            startContext={this.startContext}
            cancelContext={this.cancelContext}
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
                  this.openPage(homePage);
                }}
              >
                <img src={logo} />
              </IconButton>
            </div>
            <List className={classes.drawer}>
              {connected && !pages.keymap && !pages.colormap && (
                <WelcomeMenu
                  selected={this.state.Page == Welcome}
                  onClick={this.welcomeMenuOnClick}
                />
              )}
              {pages.keymap && (
                <KeymapMenuItem
                  selected={this.state.Page == LayoutEditor}
                  onClick={this.keymapMenuItemOnClick}
                />
              )}
              {pages.colormap && (
                <ColormapMenuItem
                  selected={this.state.Page == ColormapEditor}
                  onClick={this.colormapMenuItemOnClick}
                />
              )}
              {connected && (
                <FlashMenuItem
                  selected={this.state.Page == FirmwareUpdate}
                  onClick={this.flashMenuItemOnClick}
                />
              )}
            </List>
            <Divider />
            <List className={classes.drawer}>
              <KeyboardMenuItem
                keyboardSelectText={
                  connected
                    ? i18n.app.menu.selectAnotherKeyboard
                    : i18n.app.menu.selectAKeyboard
                }
                selected={this.state.Page == KeyboardSelect}
                onClick={this.keyboardMenuItemOnClick}
              />
              <SettingsMenuItem
                selected={this.state.Page == Settings}
                onClick={this.settingsMenuItemOnClick}
              />
            </List>
            <Divider />
            <List className={classes.drawer}>
              <ChatMenuItem
                onClick={this.openURL("https://discord.gg/GP473Fv")}
              />
              <FeedbackMenuItem
                onClick={this.openURL(
                  "https://github.com/keyboardio/Chrysalis/issues"
                )}
              />
              <ExitMenuItem onClick={() => Electron.remote.app.exit(0)} />
            </List>
            <Divider />
            <List>
              <ListItem disabled>
                <ListItemText
                  primary={`Chrysalis ${version}`}
                  className={classes.version}
                />
              </ListItem>
            </List>
          </div>
        </Drawer>
      </div>
    );
  }
}

export default withSnackbar(withStyles(styles)(App));
