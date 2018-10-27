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

import Focus from "chrysalis-focus";
import Keymap from "chrysalis-keymap";
import { Model01 } from "chrysalis-hardware-keyboardio-model01";

import "rc-tabs/assets/index.css";

import KeyLayout from "./KeyLayout";

import "./keymap.css";
import DisplayTransformer from "./keymap-transformer";
import ErrorMessages from "../errors/errors";

class App extends React.Component {
  focus = new Focus();
  displayTransformer = new DisplayTransformer();

  constructor(props) {
    super(props);
    this.state = {
      device: {},
      keymap: []
    };

    let keymap = new Keymap().setLayerSize(Model01);
    keymap.addKeyTransformers([this.displayTransformer]);

    this.focus.addCommands({ keymap: keymap });
    this.openKeyboard = this.openKeyboard.bind(this);
    this.onKeyChange = this.onKeyChange.bind(this);
    this.onApply = this.onApply.bind(this);
  }

  onKeyChange(layer, keyIndex, value) {
    if (keyIndex === -1) {
      console.warn(ErrorMessages.noKeySelected); // eslint-disable-line
      return;
    }

    this.setState(state => {
      let keymap = state.keymap.slice();
      keymap[layer][keyIndex] = this.displayTransformer.parse(value);
      return keymap;
    });
  }

  onApply(event) {
    event.preventDefault();
    console.log("Starting keymap update, this might take a while...", this.state.keymap); // eslint-disable-line
    this.focus.command("keymap", this.state.keymap).then(() => {
      console.log("keymap update finished!"); // eslint-disable-line
    });
  }

  openKeyboard(event) {
    console.log("Probing the keyboard..."); // eslint-disable-line
    event.preventDefault();

    this.focus.close();
    this.focus
      .open(Model01)
      .then(port => {
        this.setState({ device: port });
        console.log("Pulling the keymap..."); // eslint-disable-line
        this.focus.command("keymap").then(keymap => {
          console.log("Keymap pulled!"); // eslint-disable-line
          this.setState({ keymap: keymap });
        });
      })
      .catch(() => {
        console.log(ErrorMessages.firmware); // eslint-disable-line
      });
  }

  render() {
    return (
      <main>
        <KeyLayout
          keymap={this.state.keymap}
          onKeyChange={this.onKeyChange}
          onApply={this.onApply}
        />

        <div>
          <button onClick={this.openKeyboard}>Probe for Model01</button>
        </div>
        {this.state.device === null && (
          <div style={{ color: "red" }}>Please connect your Model01</div>
        )}
      </main>
    );
  }
}

export default App;
