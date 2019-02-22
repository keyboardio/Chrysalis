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
import { spawn } from "child_process";

import Focus from "@chrysalis-api/focus";
import "@chrysalis-api/keymap";
import "@chrysalis-api/colormap";
import "typeface-roboto/index.css";
import "typeface-source-code-pro/index.css";
import { LocationProvider, Router } from "@reach/router";

import CssBaseline from "@material-ui/core/CssBaseline";
import { withStyles } from "@material-ui/core/styles";

import usb from "usb";
import { withSnackbar } from "notistack";

import KeyboardSelect from "./screens/KeyboardSelect";
import FirmwareUpdate from "./screens/FirmwareUpdate";
import Editor from "./screens/Editor";
import Preferences from "./screens/Preferences";
import Welcome from "./screens/Welcome";
import KeyboardSettings from "./screens/KeyboardSettings";
import i18n from "./i18n";

import Header from "./components/Header";
import ConfirmationDialog from "./components/ConfirmationDialog";
import { history, navigate } from "./routerHistory";

let focus = new Focus();

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

    this.state = {
      connected: false,
      device: null,
      pages: {},
      contextBar: false,
      cancelPendingOpen: false
    };
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
        this.props.enqueueSnackbar(i18n.errors.deviceDisconnected, {
          variant: "warning"
        });
        focus.close();
        this.setState({
          connected: false,
          device: null,
          pages: {}
        });
        // Second call to `navigate` will actually render the proper route
        await navigate("/keyboard-select");
      }
    });
  }

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

    if (!port.comName) {
      this.setState({
        connected: true,
        pages: {},
        device: port.device
      });
      return [];
    }

    console.log("Connecting to", port.comName);
    await focus.open(port.comName, port.device);
    if (process.platform == "darwin") {
      await spawn("stty", ["-f", port.comName, "clocal"]);
    }
    console.log("Probing for Focus support...");
    let commands;
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
      }
    });
    await navigate("./");
    return commands;
  };

  onKeyboardDisconnect = async () => {
    focus.close();
    this.setState({
      connected: false,
      device: null,
      pages: {}
    });
    await navigate("/keyboard-select");
  };

  cancelContext = () => {
    this.setState({ cancelPendingOpen: true });
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
              <FirmwareUpdate
                path="/firmware-update"
                device={this.state.device}
                toggleFlashing={this.toggleFlashing}
                onDisconnect={this.onKeyboardDisconnect}
                titleElement={() => document.querySelector("#page-title")}
              />
              <KeyboardSettings
                path="/keyboard-settings"
                titleElement={() => document.querySelector("#page-title")}
              />
              <Preferences
                path="/preferences"
                titleElement={() => document.querySelector("#page-title")}
              />
            </Router>
          </main>
        </LocationProvider>
        <ConfirmationDialog
          title={i18n.app.cancelPending.title}
          open={this.state.cancelPendingOpen}
          onConfirm={this.doCancelContext}
          onCancel={this.cancelContextCancellation}
        >
          {i18n.app.cancelPending.content}
        </ConfirmationDialog>
      </div>
    );
  }
}

export default withSnackbar(withStyles(styles)(App));
