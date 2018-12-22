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
import Keymap from "@chrysalis-api/keymap";
import Colormap from "@chrysalis-api/colormap";
import CoreTransformer from "@chrysalis-api/keymap-transformer-core";
import { Model01 } from "@chrysalis-api/hardware-keyboardio-model01";

import usb from "usb";
import { withSnackbar } from "notistack";

import AppTools from "./components/AppTools";
import KeyboardSelect from "./components/KeyboardSelect";
import Dashboard from "./components/Dashboard";

let focus = new Focus();
let keymap = new Keymap().setLayerSize(Model01);
let colormap = new Colormap().setLayerSize(Model01);
let coreTransformer = new CoreTransformer();
keymap.addKeyTransformers([coreTransformer]);
focus.addCommands({
  keymap: keymap,
  colormap: colormap
});
focus.timeout = 15000;

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
    let content;
    if (!this.state.keyboardOpen) {
      content = <KeyboardSelect onConnect={this.onKeyboardConnect} />;
    } else {
      content = (
        <Dashboard
          pages={this.state.supportedPages}
          onDisconnect={this.onKeyboardDisconnect}
          toggleFlashing={this.toggleFlashing}
        />
      );
    }

    return (
      <div>
        {content}
        <AppTools />
      </div>
    );
  }
}

export default withSnackbar(App);
