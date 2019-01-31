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
import {
  createMemorySource,
  createHistory,
  LocationProvider,
  Router,
  navigate
} from "@reach/router";

import CssBaseline from "@material-ui/core/CssBaseline";
import { withStyles } from "@material-ui/core/styles";

import usb from "usb";
import { withSnackbar } from "notistack";

import KeyboardSelect from "./screens/KeyboardSelect";
import ColormapEditor from "./screens/ColormapEditor";
import FirmwareUpdate from "./screens/FirmwareUpdate";
import LayoutEditor from "./screens/LayoutEditor";
import Settings from "./screens/Settings";
import Welcome from "./screens/Welcome";
import i18n from "./i18n";

import Header from "./components/Header";

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

const source = createMemorySource("/keyboard-select");
const history = createHistory(source);

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
        keymap:
          commands.includes("keymap.custom") > 0 ||
          commands.includes("keymap.map") > 0,
        colormap:
          commands.includes("colormap.map") > 0 &&
          commands.includes("palette") > 0
      },
      Page:
        commands.includes("keymap.custom") > 0 ||
        commands.includes("keymap.map") > 0
          ? LayoutEditor
          : Welcome
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
    navigate("/firmware-update");
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
    const { connected, pages, contextBar } = this.state;

    let focus = new Focus(),
      device =
        (focus.device && focus.device.info) ||
        (this.state.device && this.state.device.info);

    const homePage = connected
      ? this.state.pages.keymap
        ? "/layout-editor"
        : "/welcome"
      : "/keyboard-select";

    return (
      <div className={classes.root}>
        <LocationProvider history={history}>
          <CssBaseline />
          <Header
            contextBar={contextBar}
            homePage={homePage}
            connected={connected}
            pages={pages}
            device={device}
            openURL={this.openURL}
            cancelContext={this.cancelContext}
            openPageMenu={this.pageMenu}
            pageMenu={this.state.pageMenu}
            closePageMenu={this.closePageMenu}
            boardAnchor={this.state.boardAnchor}
            boardClose={this.boardClose}
            openBoardMenu={this.boardMenu}
          />
          <main className={classes.content}>
            <Router>
              <Welcome
                path="/welcome"
                device={this.state.device}
                onConnect={this.onKeyboardConnect}
                titleElement={() => document.querySelector("#page-title")}
                openPage={this.openPage}
              />
              <KeyboardSelect
                path="/keyboard-select"
                onConnect={this.onKeyboardConnect}
                onDisconnect={this.onKeyboardDisconnect}
                titleElement={() => document.querySelector("#page-title")}
              />
              <LayoutEditor
                path="/layout-editor"
                onDisconnect={this.onKeyboardDisconnect}
                startContext={this.startContext}
                cancelContext={this.cancelContext}
                inContext={this.state.contextBar}
                titleElement={() => document.querySelector("#page-title")}
                appBarElement={() => document.querySelector("#appbar")}
              />
              <ColormapEditor
                path="/colormap-editor"
                device={this.state.device}
                startContext={this.startContext}
                cancelContext={this.cancelContext}
                inContext={this.state.contextBar}
                titleElement={() => document.querySelector("#page-title")}
                appBarElement={() => document.querySelector("#appbar")}
              />
              <FirmwareUpdate
                path="/firmware-update"
                device={this.state.device}
                toggleFlashing={this.toggleFlashing}
                onDisconnect={this.onKeyboardDisconnect}
                titleElement={() => document.querySelector("#page-title")}
              />
              <Settings
                path="/settings"
                titleElement={() => document.querySelector("#page-title")}
              />
            </Router>
          </main>
        </LocationProvider>
      </div>
    );
  }
}

export default withSnackbar(withStyles(styles)(App));
