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

import Focus from "chrysalis-focus";
import Keymap from "chrysalis-keymap";
import Colormap from "chrysalis-colormap";
import CoreTransformer from "chrysalis-keymap-transformer-core";
import { Model01 } from "chrysalis-hardware-keyboardio-model01";

import Fab from "@material-ui/core/Fab";
import CodeIcon from "@material-ui/icons/Code";
import { withStyles } from "@material-ui/core/styles";

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

const styles = theme => ({
  tools: {
    position: "fixed",
    bottom: theme.spacing.unit * 2,
    right: theme.spacing.unit * 2
  }
});

class App extends React.Component {
  state = {
    keyboardOpen: false
  };

  onKeyboardConnect = async port => {
    focus.close();

    console.log("Connecting to", port.comName);
    await focus.open(port.comName, port.device);
    console.log("Probing for Focus support...");
    let commands = await focus.probe();

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

    let toolsButton = null;
    if (process.env.NODE_ENV !== "production") {
      toolsButton = (
        <Fab
          color="primary"
          className={classes.tools}
          onClick={this.toggleDevTools}
        >
          <CodeIcon />
        </Fab>
      );
    }

    return (
      <div>
        {content}
        {toolsButton}
      </div>
    );
  }
}

export default withStyles(styles)(App);
