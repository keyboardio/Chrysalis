// -*- mode: js-jsx -*-
/* Chrysalis -- Kaleidoscope Command Center
 * Copyright (C) 2018, 2019, 2020  Keyboardio, Inc.
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
import { spawn } from "child_process";
import settings from "electron-settings";

import Focus from "../api/focus";
import Log from "../api/log";
import "../api/keymap";
import "../api/colormap";
import "typeface-roboto/index.css";
import "typeface-source-code-pro/index.css";
import { LocationProvider, Router } from "@reach/router";

import CssBaseline from "@material-ui/core/CssBaseline";
import { withStyles } from "@material-ui/core/styles";
import { MuiThemeProvider } from "@material-ui/core/styles";
import { lightTheme } from "../styles/lightTheme";
import { darkTheme } from "../styles/darkTheme";

import usb from "usb";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import KeyboardSelect from "./screens/KeyboardSelect";
import FirmwareUpdate from "./screens/FirmwareUpdate";
import Editor from "./screens/Editor/Editor";
import Preferences from "./screens/Preferences";
import Welcome from "./screens/Welcome";
import SystemInfo from "./screens/SystemInfo";
import ChangeLog from "./screens/ChangeLog";
import StorageAndSharing from "./screens/StorageAndSharing";
import i18n from "./i18n";

import Header from "./components/Header";
import ConfirmationDialog from "./components/ConfirmationDialog";
import { history, navigate } from "./routerHistory";

import { isDevelopment } from "./config";

let focus = new Focus();
if (isDevelopment) {
  focus.debug = true;
}

const settingsLanguage = settings.getSync("ui.language");
if (settingsLanguage) i18n.changeLanguage(settingsLanguage);

const styles = () => ({
  root: {
    display: "flex",
    flexDirection: "column"
  },
  content: {
    flexGrow: 1,
    overflow: "auto"
  }
});

class App extends React.Component {
  constructor(props) {
    super(props);

    this.logger = new Log();

    this.state = {
      darkMode: settings.getSync("ui.darkMode"),
      connected: false,
      device: null,
      pages: {},
      contextBar: false,
      cancelPendingOpen: false
    };
    localStorage.clear();

    toast.configure({
      position: "bottom-left",
      autoClose: false,
      newestOnTop: true,
      draggable: false,
      closeOnClick: false
    });
  }
  flashing = false;

  componentDidMount() {
    usb.on("detach", async device => {
      if (!focus.device) return;
      if (this.flashing) return;

      if (
        focus.device.usb.vendorId != device.deviceDescriptor.idVendor ||
        focus.device.usb.productId != device.deviceDescriptor.idProduct
      ) {
        return;
      }

      // Must await this to stop re-render of components reliant on `focus.device`
      // However, it only renders a blank screen. New route is rendered below.
      await navigate("./");

      if (!focus._port.isOpen) {
        toast.warning(i18n.t("errors.deviceDisconnected"));
      }

      await focus.close();
      await this.setState({
        contextBar: false,
        cancelPendingOpen: false,
        connected: false,
        device: null,
        pages: {}
      });

      // Second call to `navigate` will actually render the proper route
      await navigate("/keyboard-select");
    });
  }

  toggleDarkMode = async () => {
    const nextDarkModeState = !this.state.darkMode;
    this.setState({
      darkMode: nextDarkModeState
    });
    await settings.set("ui.darkMode", nextDarkModeState);
  };

  toggleFlashing = async () => {
    this.flashing = !this.flashing;
    if (!this.flashing) {
      this.setState({
        connected: false,
        device: null,
        pages: {}
      });
      await navigate("/keyboard-select");
    }
  };

  onKeyboardConnect = async port => {
    focus.close();

    if (!port.path) {
      this.setState({
        connected: true,
        pages: {},
        device: port.device
      });
      await navigate("/welcome");
      return [];
    }

    this.logger.log("Connecting to", port.path);
    await focus.open(port.path, port.device);
    if (process.platform == "darwin") {
      await spawn("stty", ["-f", port.path, "clocal"]);
    }

    let commands = [];
    let pages = [];
    if (!port.device.bootloader) {
      this.logger.log("Probing for Focus support...");
      try {
        commands = await focus.probe();
      } catch (e) {
        commands = [];
      }

      focus.setLayerSize(focus.device);
      pages = {
        keymap:
          commands.includes("keymap.custom") > 0 ||
          commands.includes("keymap.map") > 0,
        colormap:
          commands.includes("colormap.map") > 0 &&
          commands.includes("palette") > 0
      };
    }

    this.setState({
      connected: true,
      device: null,
      pages: pages
    });
    await navigate(pages.keymap || pages.colormap ? "/editor" : "/welcome");
    return commands;
  };

  onKeyboardDisconnect = async () => {
    focus.close();
    this.setState({
      connected: false,
      device: null,
      pages: {}
    });
    localStorage.clear();
    await navigate("/keyboard-select");
  };

  cancelContext = dirty => {
    if (dirty) {
      this.setState({ cancelPendingOpen: true });
    } else {
      this.doCancelContext();
    }
  };
  doCancelContext = () => {
    this.setState({
      contextBar: false,
      cancelPendingOpen: false
    });
  };
  cancelContextCancellation = () => {
    this.setState({ cancelPendingOpen: false });
  };
  startContext = () => {
    this.setState({ contextBar: true });
  };

  render() {
    const { classes } = this.props;
    const { connected, pages, contextBar } = this.state;

    let focus = new Focus();
    let device =
      (focus.device && focus.device.info) ||
      (this.state.device && this.state.device.info);

    return (
      <MuiThemeProvider theme={this.state.darkMode ? darkTheme : lightTheme}>
        <div className={classes.root}>
          <LocationProvider history={history}>
            <CssBaseline />
            <Header
              contextBar={contextBar}
              connected={connected}
              pages={pages}
              device={device}
              cancelContext={this.cancelContext}
            />
            <main className={classes.content}>
              <Router>
                <Welcome
                  path="/welcome"
                  device={this.state.device}
                  onConnect={this.onKeyboardConnect}
                  titleElement={() => document.querySelector("#page-title")}
                />
                <KeyboardSelect
                  path="/keyboard-select"
                  onConnect={this.onKeyboardConnect}
                  onDisconnect={this.onKeyboardDisconnect}
                  titleElement={() => document.querySelector("#page-title")}
                />
                <Editor
                  path="/editor"
                  onDisconnect={this.onKeyboardDisconnect}
                  startContext={this.startContext}
                  cancelContext={this.cancelContext}
                  inContext={this.state.contextBar}
                  titleElement={() => document.querySelector("#page-title")}
                  appBarElement={() => document.querySelector("#appbar")}
                />
                <StorageAndSharing
                  connected={connected}
                  path="/storage-and-sharing"
                  onDisconnect={this.onKeyboardDisconnect}
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
                <Preferences
                  connected={connected}
                  path="/preferences"
                  titleElement={() => document.querySelector("#page-title")}
                  darkMode={this.state.darkMode}
                  toggleDarkMode={this.toggleDarkMode}
                  startContext={this.startContext}
                  cancelContext={this.cancelContext}
                  inContext={this.state.contextBar}
                />
                <SystemInfo
                  connected={connected}
                  path="/system-info"
                  titleElement={() => document.querySelector("#page-title")}
                />
                <ChangeLog
                  connected={connected}
                  path="/changelog"
                  titleElement={() => document.querySelector("#page-title")}
                />
              </Router>
            </main>
          </LocationProvider>
          <ConfirmationDialog
            title={i18n.t("app.cancelPending.title")}
            open={this.state.cancelPendingOpen}
            onConfirm={this.doCancelContext}
            onCancel={this.cancelContextCancellation}
          >
            {i18n.t("app.cancelPending.content")}
          </ConfirmationDialog>
        </div>
      </MuiThemeProvider>
    );
  }
}

//export default withSnackbar(withStyles(styles)(App));
//export default withStyles(styles)(withSnackbar(App));
export default withStyles(styles)(App);
