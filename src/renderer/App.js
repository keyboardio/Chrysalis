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
import { spawn } from "child_process";

import Focus from "@chrysalis-api/focus";
import "@chrysalis-api/keymap";
import "@chrysalis-api/colormap";

import usb from "usb";
import { withSnackbar } from "notistack";

import KeyboardSelect from "./components/KeyboardSelect";
import Connected from "./components/Connected";

let focus = new Focus();

class App extends React.Component {
  state = {
    keyboardOpen: false
  };
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
        this.props.enqueueSnackbar("Device disconnected.", {
          variant: "warning"
        });
        focus.close();
        this.setState({ keyboardOpen: false });
      }
    });
  }

  toggleFlashing = () => {
    this.flashing = !this.flashing;
    if (!this.flashing) {
      this.setState({ keyboardOpen: false });
    }
  };

  onKeyboardConnect = async port => {
    focus.close();

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
      keyboardOpen: true,
      supportedPages: {
        info: true,
        keymap: commands.includes("keymap.map") > 0,
        colormap:
          commands.includes("colormap.map") > 0 &&
          commands.includes("palette") > 0
      }
    });
  };

  onKeyboardDisconnect = () => {
    focus.close();
    this.setState({ keyboardOpen: false });
  };

  render() {
    if (!this.state.keyboardOpen) {
      return <KeyboardSelect onConnect={this.onKeyboardConnect} />;
    } else {
      return (
        <Connected
          pages={this.state.supportedPages}
          onDisconnect={this.onKeyboardDisconnect}
          toggleFlashing={this.toggleFlashing}
        />
      );
    }
  }
}

export default withSnackbar(App);
