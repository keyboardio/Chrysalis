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
import { spawn } from "child_process";

import Focus from "chrysalis-focus";
import Keymap from "chrysalis-keymap";
import Colormap from "chrysalis-colormap";
import CoreTransformer from "chrysalis-keymap-transformer-core";
import { Model01 } from "chrysalis-hardware-keyboardio-model01";

import usb from "usb";
import { withSnackbar } from "notistack";

import BugReportIcon from "@material-ui/icons/BugReport";
import CameraIcon from "@material-ui/icons/Camera";
import CodeIcon from "@material-ui/icons/Code";
import SpeedDial from "@material-ui/lab/SpeedDial";
import SpeedDialIcon from "@material-ui/lab/SpeedDialIcon";
import SpeedDialAction from "@material-ui/lab/SpeedDialAction";
import { withStyles } from "@material-ui/core/styles";

import { isDevelopment } from "./config";
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

const styles = theme => ({
  tools: {
    position: "fixed",
    bottom: theme.spacing.unit * 2,
    right: theme.spacing.unit * 2
  }
});

class App extends React.Component {
  state = {
    keyboardOpen: false,
    toolsOpen: false,
    toolsClicked: false
  };

  componentDidMount() {
    usb.on("detach", device => {
      if (!focus.device) return;

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

  toggleDevTools = () => {
    const webContents = Electron.remote.getCurrentWebContents();

    if (webContents.isDevToolsOpened()) {
      webContents.closeDevTools();
    } else {
      webContents.openDevTools();
    }
  };

  onToolsOpen = () => {
    this.setState({ toolsOpen: true });
  };

  onToolsClose = () => {
    if (this.state.toolsClicked) return;

    this.setState({ toolsOpen: false });
  };

  onToolsClick = () => {
    this.setState(state => ({
      toolsOpen: state.toolsClicked ? !state.toolsOpen : true,
      toolsClicked: !state.toolsClicked
    }));
  };

  saveScreenshot = async () => {
    const w = Electron.remote.getCurrentWindow(),
      webContents = Electron.remote.getCurrentWebContents(),
      fs = Electron.remote.require("fs"),
      fileName = "chrysalis-" + Date.now().toString() + ".png",
      devToolsOpen = webContents.isDevToolsOpened();

    if (devToolsOpen) await webContents.closeDevTools();

    setTimeout(() => {
      w.capturePage(img => {
        fs.writeFile(fileName, img.toPNG(), () => {
          this.props.enqueueSnackbar("Screenshot saved to " + fileName, {
            variant: "success",
            autoHideDuration: 1000
          });
          if (devToolsOpen) webContents.openDevTools();
        });
      });
    }, 1000);
  };

  render() {
    const { classes } = this.props;

    let content;
    if (!this.state.keyboardOpen) {
      content = <KeyboardSelect onConnect={this.onKeyboardConnect} />;
    } else {
      content = (
        <Dashboard
          pages={this.state.supportedPages}
          onDisconnect={this.onKeyboardDisconnect}
        />
      );
    }

    return (
      <div>
        {content}
        <SpeedDial
          ariaLabel="Tools"
          className={classes.tools}
          icon={<SpeedDialIcon />}
          open={this.state.toolsOpen}
          direction="up"
          onBlur={this.onToolsClose}
          onClose={this.onToolsClose}
          onMouseLeave={this.onToolsClose}
          onFocus={this.onToolsOpen}
          onMouseEnter={this.onToolsOpen}
          onClick={this.onToolsClick}
        >
          {isDevelopment && (
            <SpeedDialAction
              icon={<CodeIcon />}
              tooltipTitle="Toggle DevTools"
              onClick={this.toggleDevTools}
            />
          )}
          <SpeedDialAction
            icon={<BugReportIcon />}
            tooltipTitle="Report a bug"
            href="https://github.com/keyboardio/chrysalis-bundle-keyboardio/issues"
          />
          <SpeedDialAction
            icon={<CameraIcon />}
            tooltipTitle="Save a screenshot"
            onClick={this.saveScreenshot}
          />
        </SpeedDial>
      </div>
    );
  }
}

export default withSnackbar(withStyles(styles)(App));
