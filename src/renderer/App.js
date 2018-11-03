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

import KeyLayout from "./KeyLayout";

import "./keymap.css";
import DisplayTransformer from "./keymap-transformer";
import ErrorMessages from "../errors/errors";

import { css } from "react-emotion";
import { BarLoader } from "react-spinners";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

class App extends React.Component {
  focus = new Focus();
  displayTransformer = new DisplayTransformer();

  constructor(props) {
    super(props);
    this.state = {
      device: {},
      keymap: [],
      roLayers: 0,
      defaultLayer: 0,
      loading: false
    };

    let keymap = new Keymap().setLayerSize(Model01);
    keymap.addKeyTransformers([this.displayTransformer]);

    this.focus.addCommands({ keymap: keymap });
    this.openKeyboard = this.openKeyboard.bind(this);
    this.onKeyChange = this.onKeyChange.bind(this);
    this.onApply = this.onApply.bind(this);
    this.onSelectDefaultLayer = this.onSelectDefaultLayer.bind(this);
  }

  onKeyChange(layer, keyIndex, value) {
    if (keyIndex === -1) {
      toast(ErrorMessages.noKeySelected, {
        type: toast.TYPE.WARNING,
        autoClose: 5000,
        toastId: "noKeySelected"
      });
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
    this.setState({ loading: true });
    let toastId = toast("Updating the keymap...");
    this.focus.command("keymap", this.state.keymap).then(() => {
      this.setState({ loading: false });
      toast.update(toastId, {
        render: "✓ Keymap updated",
        type: toast.TYPE.SUCCESS,
        autoClose: 1000
      });
    });
  }

  onSelectDefaultLayer(option) {
    this.setState({
      defaultLayer: option.value,
      loading: true
    });
    let toastId = toast("Setting the default layer...");
    this.focus.command("settings.defaultLayer", option.value).then(() => {
      this.setState({ loading: false });
      toast.update(toastId, {
        render: "✓ Default layer set to #" + option.value.toString(),
        type: toast.TYPE.SUCCESS,
        autoClose: 1000
      });
    });
  }

  openKeyboard(event) {
    event.preventDefault();

    this.setState({ loading: true });
    let searchToast = toast("Searching for the keyboard...", {
      type: toast.TYPE.INFO,
      position: toast.POSITION.BOTTOM_CENTER,
      closeButton: false
    });

    this.focus.close();
    this.focus
      .open(Model01)
      .then(port => {
        this.setState({ device: port });
        setTimeout(() => {
          toast.update(searchToast, {
            render: "Probing for Focus support..."
          });
          this.focus
            .probe().then(() => { // eslint-disable-line
              toast.update(searchToast, {
                render: "Pulling the keymap..."
              });
              setTimeout(() => {
                this.focus.command("keymap").then(keymap => {
                  this.setState({ keymap: keymap });
                  toast.update(searchToast, {
                    render: "Checking for read-only layers..."
                  });
                  setTimeout(() => {
                    this.focus.command("keymap.roLayers").then(roLayers => {
                      if (roLayers == ".") roLayers = "0";
                      this.setState({
                        roLayers: parseInt(roLayers)
                      });
                      toast.update(searchToast, {
                        render: "Checking which layer is the default..."
                      });
                      setTimeout(() => {
                        this.focus
                          .command("settings.defaultLayer")
                          .then(defLayer => {
                            if (defLayer == ".") defLayer = "0";
                            this.setState({
                              loading: false,
                              defaultLayer: parseInt(defLayer)
                            });
                            toast.update(searchToast, {
                              type: toast.TYPE.SUCCESS,
                              render: "✓ Keyboard found",
                              position: toast.POSITION.BOTTOM_RIGHT,
                              autoClose: 1000
                            });
                          });
                      }, 500);
                    });
                  }, 500);
                });
              }, 500);
            })
            .catch(() => {
              this.setState({ loading: false });
              toast.dismiss(searchToast);
              toast(ErrorMessages.firmware, {
                type: toast.TYPE.ERROR
              });
            });
        }, 500);
      })
      .catch(() => {
        this.setState({ loading: false });
        toast.dismiss(searchToast);

        toast(ErrorMessages.firmware, {
          type: toast.TYPE.ERROR
        });
      });
  }

  render() {
    const override = css`
      position: fixed !important;
      bottom: 0;
      left: 0;
      right: 0;
    `;

    return (
      <main>
        <BarLoader
          className={override}
          widthUnit={"%"}
          width={100}
          height={8}
          color={"#ef5022"}
          loading={this.state.loading}
        />

        <KeyLayout
          keymap={this.state.keymap}
          roLayers={this.state.roLayers}
          defaultLayer={this.state.defaultLayer}
          onKeyChange={this.onKeyChange}
          onSelectDefaultLayer={this.onSelectDefaultLayer}
          onApply={this.onApply}
        />

        <div>
          <button onClick={this.openKeyboard} disabled={this.state.loading}>
            Probe for Model01
          </button>
        </div>
        {this.state.device === null && (
          <div style={{ color: "red" }}>Please connect your Model01</div>
        )}

        <ToastContainer autoClose={false} />
      </main>
    );
  }
}

export default App;
