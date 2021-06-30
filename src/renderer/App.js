// -*- mode: js-jsx -*-
/* Bazecor -- Kaleidoscope Command Center
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
import settings from "electron-settings";
import { Switch, Redirect, Route, withRouter } from "react-router-dom";
import { toast } from "react-toastify";
import styled, { ThemeProvider, css } from "styled-components";

import usb from "usb";
import i18n from "./i18n";

import Focus from "../api/focus";
import "../api/keymap";
import "../api/colormap";
import "typeface-roboto/index.css";
import "typeface-source-code-pro/index.css";
import "react-toastify/dist/ReactToastify.css";

import GlobalStyles from "./theme/GlobalStyles";
import Light from "./theme/LightTheme";
import Dark from "./theme/DarkTheme";

import Container from "react-bootstrap/Container";

import KeyboardSelect from "./screens/KeyboardSelect";
import FirmwareUpdate from "./screens/FirmwareUpdate";
import Editor from "./screens/Editor/Editor";
import MacrosConfigurator from "./screens/Macros/MacrosConfigurator";
import Preferences from "./screens/Preferences";
import Welcome from "./screens/Welcome";

import Header from "./components/Header";
// import ConfirmationDialog from "./components/ConfirmationDialog";
// import { history, navigate } from "./routerHistory";

const Store = window.require("electron-store");
const store = new Store();

const { remote, ipcRenderer } = require("electron");

let focus = new Focus();
focus.debug = true;
focus.timeout = 15000;

if (settings.getSync("ui.language"))
  i18n.setLanguage(settings.get("ui.language"));

class App extends React.Component {
  constructor(props) {
    super(props);

    let balance;

    if (store.get("balance") === undefined) {
      balance = { r: 30, g: 0, b: 15 };
      store.set("balance", balance);
    } else {
      balance = store.get("balance");
    }

    let isDark;
    const mode = settings.getSync("ui.darkMode");
    isDark = mode === "dark" ? true : false;
    if (mode === "system") {
      isDark = remote.nativeTheme.shouldUseDarkColors;
    }

    this.state = {
      darkMode: isDark,
      connected: false,
      device: null,
      pages: {},
      contextBar: false,
      cancelPendingOpen: false,
      balance
    };
    localStorage.clear();

    toast.configure({
      position: "bottom-left",
      autoClose: false,
      hideProgressBar: false,
      newestOnTop: true,
      draggable: false,
      closeOnClick: true,
      pauseOnHover: true,
      pauseOnFocusLoss: true
    });

    this.forceDarkMode = this.forceDarkMode.bind(this);
  }
  flashing = false;

  componentDidMount() {
    // Setting up function to receive O.S. dark theme changes
    const self = this;
    ipcRenderer.on("darkTheme-update", function (evt, message) {
      console.log("O.S. DarkTheme Settings changed to ", message);
      let dm = settings.getSync("ui.darkMode");
      if (dm === "system") {
        self.forceDarkMode(message);
      }
    });

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
      this.props.history.push("./");

      if (!focus._port.isOpen) {
        toast.warning(i18n.errors.deviceDisconnected);
      }
      await focus.close();
      await this.setState({
        connected: false,
        device: null,
        pages: {}
      });
      // Second call to `navigate` will actually render the proper route
      this.props.history.push("/keyboard-select");
    });
  }

  forceDarkMode = mode => {
    this.setState({
      darkMode: mode
    });
  };

  toggleDarkMode = async mode => {
    console.log(
      "Dark mode changed to: ",
      mode,
      "NativeTheme says: ",
      remote.nativeTheme.shouldUseDarkColors
    );
    let isDark = mode === "dark" ? true : false;
    if (mode === "system") {
      isDark = remote.nativeTheme.shouldUseDarkColors;
    }
    this.setState({
      darkMode: isDark
    });
    settings.setSync("ui.darkMode", mode);
  };

  toggleFlashing = async () => {
    this.flashing = !this.flashing;
    if (!this.flashing) {
      this.setState({
        connected: false,
        device: null,
        pages: {}
      });
      this.props.history.push("/keyboard-select");
    }
  };

  onKeyboardConnect = async port => {
    focus.close();

    if (!port.path) {
      port.device.device = port.device;

      this.setState({
        connected: true,
        pages: {},
        device: port.device
      });
      this.props.history.push("/welcome");
      return [];
    }

    console.log("Connecting to", port.path);
    await focus.open(port.path, port.device);
    if (focus.device.bootloader) {
      this.setState({
        connected: true,
        pages: {},
        device: port
      });
      this.props.history.push("/welcome");
      return [];
    }

    console.log("Probing for Focus support...");

    focus.setLayerSize(focus.device);
    const pages = {
      keymap:
        focus.isCommandSupported("keymap.custom") ||
        focus.isCommandSupported("keymap.map"),
      colormap:
        focus.isCommandSupported("colormap.map") &&
        focus.isCommandSupported("palette")
    };

    this.setState({
      connected: true,
      device: port,
      pages: pages
    });
    this.props.history.push(pages.keymap ? "/editor" : "/welcome");
    return [];
  };

  onKeyboardDisconnect = async () => {
    focus.close();
    this.setState({
      connected: false,
      device: null,
      pages: {}
    });
    localStorage.clear();
    this.props.history.push("/keyboard-select");
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
  rgbString = color => {
    return `rgb(${color.r},${color.g},${color.b})`;
  };
  whiteBalance = (balance, color, type) => {
    let correction =
      balance[
        Object.keys(balance).reduce((a, b) => (balance[a] > balance[b] ? a : b))
      ];
    if (type === "apply") {
      if (
        correction + 1 < color.r &&
        correction + 1 < color.g &&
        correction + 1 < color.b
      ) {
        let aux = {
          r: color.r - balance.r,
          g: color.g - balance.g,
          b: color.b - balance.b,
          rgb: color.rgb
        };
        aux.rgb = this.rgbString(aux);
        console.log(color, balance, correction, aux);
        return aux;
      }
    }
    if (type === "revert") {
      if (
        color.r + balance.r <= 255 ||
        color.g + balance.g <= 255 ||
        color.b + balance.b <= 255
      ) {
        if (color.r > 1 && color.g > 1 && color.b > 1) {
          let aux = {
            r: color.r + balance.r,
            g: color.g + balance.g,
            b: color.b + balance.b,
            rgb: color.rgb
          };
          aux.rgb = this.rgbString(aux);
          console.log(color, balance, correction, aux);
          return aux;
        }
      }
    }
    return color;
  };
  applyBalance = colors => {
    console.log("applying whitebalance correction");
    return colors.map(color => {
      return this.whiteBalance(this.state.balance, color, "apply");
    });
  };
  revertBalance = colors => {
    console.log("reverting whitebalance correction");
    return colors.map(color => {
      return this.whiteBalance(this.state.balance, color, "revert");
    });
  };
  testBalance = async bal => {
    console.log("testing white balance: ", bal);
    const balance = this.whiteBalance(bal, { r: 255, g: 255, b: 255 }, "apply");
    await focus.command(`led.setAll ${balance.r} ${balance.g} ${balance.b}`);
    return "finished";
  };
  startTestBalance = async () => {
    console.log("current balance", this.state.balance);
    const balance = this.whiteBalance(
      this.state.balance,
      { r: 255, g: 255, b: 255 },
      "apply"
    );
    await focus.command(`led.setAll ${balance.r} ${balance.g} ${balance.b}`);
    return "finished";
  };
  stopTestBalance = async () => {
    console.log("reverting testing mode");
    await focus.command("led.mode 0");
    return "finished";
  };

  setBalance = bal => {
    console.log("setting Balance to:", bal);
    store.set("balance", bal);
    this.setState({ balance: bal });
  };

  render() {
    const { connected, pages, contextBar, darkMode } = this.state;

    let focus = new Focus();
    let device =
      (focus.device && focus.device.info) ||
      (this.state.device &&
        this.state.device.device &&
        this.state.device.device.info) ||
      (this.state.device && this.state.device.info);

    return (
      <ThemeProvider theme={darkMode ? Dark : Light}>
        <GlobalStyles />
        <Header
          contextBar={contextBar}
          connected={connected}
          pages={pages}
          device={device}
          cancelContext={this.cancelContext}
          theme={darkMode}
        />
        <Container fluid className="main-container">
          <Switch>
            <Route exact path="/">
              <Redirect to="/keyboard-select" />
            </Route>
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
              applyBalance={this.applyBalance}
              revertBalance={this.revertBalance}
              inContext={this.state.contextBar}
              titleElement={() => document.querySelector("#page-title")}
              appBarElement={() => document.querySelector("#appbar")}
              darkMode={darkMode}
            />
            <MacrosConfigurator
              path="/macros"
              onDisconnect={this.onKeyboardDisconnect}
              startContext={this.startContext}
              cancelContext={this.cancelContext}
              applyBalance={this.applyBalance}
              revertBalance={this.revertBalance}
              inContext={this.state.contextBar}
              titleElement={() => document.querySelector("#page-title")}
            />
            <FirmwareUpdate
              path="/firmware-update"
              device={this.state.device}
              toggleFlashing={this.toggleFlashing}
              onDisconnect={this.onKeyboardDisconnect}
              titleElement={() => document.querySelector("#page-title")}
              darkMode={darkMode}
            />
            <Preferences
              connected={connected}
              path="/preferences"
              titleElement={() => document.querySelector("#page-title")}
              darkMode={this.state.darkMode}
              setBalance={this.setBalance}
              testBalance={this.testBalance}
              startTestBalance={this.startTestBalance}
              stopTestBalance={this.stopTestBalance}
              balance={this.state.balance}
              toggleDarkMode={this.toggleDarkMode}
              startContext={this.startContext}
              cancelContext={this.cancelContext}
              inContext={this.state.contextBar}
            />
          </Switch>
        </Container>
        {/* <ConfirmationDialog
          title={i18n.app.cancelPending.title}
          open={this.state.cancelPendingOpen}
          onConfirm={this.doCancelContext}
          onCancel={this.cancelContextCancellation}
          text={i18n.app.cancelPending.content}
        /> */}
      </ThemeProvider>
    );
  }
}

export default withRouter(App);
