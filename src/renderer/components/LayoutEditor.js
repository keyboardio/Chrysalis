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
import PropTypes from "prop-types";

import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import LinearProgress from "@material-ui/core/LinearProgress";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";

import { withSnackbar } from "notistack";

import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

import Focus from "chrysalis-focus";
import CoreTransformer from "chrysalis-keymap-transformer-core";

import Layer from "./LayoutEditor/Layer";
import KeySelector from "./LayoutEditor/KeySelector";

const styles = theme => ({
  tabs: {
    flexGrow: 1
  },
  editor: {
    display: "flex",
    margin: theme.spacing.unit * 3
  },
  editorControls: {
    marginLeft: "2em"
  },
  selectDefaultLayer: {
    color: theme.palette.common.white
  },
  layerRoot: {
    width: "100%"
  }
});

class LayoutEditor extends React.Component {
  state = {
    currentLayer: 0,
    currentKeyIndex: -1,
    modified: false,
    saving: false,
    keymap: []
  };
  coreTransformer = new CoreTransformer();

  clickAway = () => {
    this.setState({ currentKeyIndex: -1 });
  };

  scanKeyboard = async () => {
    let focus = new Focus();

    try {
      console.log("Looking for read-only layers...");
      let roLayers = await focus.command("keymap.roLayers");
      roLayers = parseInt(roLayers) || 0;

      console.log("Retrieving the default layer index...");
      let defLayer = await focus.command("settings.defaultLayer");
      defLayer = parseInt(defLayer) || 0;

      console.log("Pulling the keymap...");
      let keymap = await focus.command("keymap");

      this.setState({
        roLayers: roLayers,
        defaultLayer: defLayer,
        keymap: keymap
      });

      console.log("done!");
    } catch (e) {
      this.props.enqueueSnackbar(e, { variant: "error" });
      this.props.onDisconnect();
    }
  };

  getCurrentKey() {
    if (this.state.currentLayer < 0 || this.state.currentKeyIndex < 0)
      return "";

    let layer = parseInt(this.state.currentLayer),
      keyIndex = parseInt(this.state.currentKeyIndex);

    return this.state.keymap[layer][keyIndex].keyCode;
  }

  onChange = option => {
    let layer = this.state.currentLayer,
      keyIndex = this.state.currentKeyIndex;

    if (keyIndex === -1) {
      return;
    }

    this.setState(state => {
      let keymap = state.keymap.slice();
      keymap[layer][keyIndex] = this.coreTransformer.parse(option.code);
      return keymap;
    });
    this.setState({ modified: true });
  };

  onKeySelect = event => {
    event.preventDefault();
    let layer = parseInt(event.currentTarget.getAttribute("data-layer")),
      keyIndex = parseInt(event.currentTarget.getAttribute("data-key-index"));

    if (keyIndex == this.state.currentKeyIndex) {
      this.setState({ currentKeyIndex: -1 });
      return;
    }

    this.setState({
      currentLayer: layer,
      currentKeyIndex: keyIndex
    });
    document.getElementById("keyselector-search").focus();
  };

  selectLayer = (event, value) => {
    this.setState({
      currentLayer: value,
      currentKeyIndex: -1
    });
  };

  onApply = async event => {
    event.preventDefault();
    this.setState({ saving: true });
    let focus = new Focus();
    await focus.command("keymap", this.state.keymap);
    this.setState({
      modified: false,
      saving: false
    });
    console.log("keymap updated");
  };

  onDefaultLayerChange = async event => {
    const defLayer = event.target.value;
    this.setState({
      defaultLayer: defLayer
    });
    let focus = new Focus();
    focus.command("settings.defaultLayer", defLayer);
    console.log("default layer set to", defLayer);
  };

  render() {
    if (this.state.keymap.length == 0) {
      this.scanKeyboard();
      return (
        <main>
          <LinearProgress variant="query" />
        </main>
      );
    }

    const { classes } = this.props;

    let layerIndex = this.state.currentLayer,
      isReadOnly = layerIndex < this.props.roLayers,
      layerData = this.state.keymap[layerIndex],
      layer = (
        <Typography component="div" className={classes.layerRoot}>
          <ClickAwayListener onClickAway={this.clickAway}>
            <Layer
              readOnly={isReadOnly}
              index={layerIndex}
              keymap={layerData}
              onKeySelect={this.onKeySelect}
              selectedKey={this.state.currentKeyIndex}
            />
          </ClickAwayListener>
        </Typography>
      );

    let tabs = this.state.keymap.map((_, index) => {
      let label = "Layer #" + index.toString(),
        tabKey = "tab-layer-" + index.toString();
      return <Tab label={label} key={tabKey} />;
    });

    let layerMenu = this.state.keymap.map((_, index) => {
      let itemKey = "deflayer-item-" + index.toString();
      return (
        <MenuItem value={index} key={itemKey}>
          Layer #{index}
        </MenuItem>
      );
    });

    let saveButtonContent = "Save changes";
    if (this.state.saving) {
      saveButtonContent = (
        <div>
          <CircularProgress color="inherit" size={16} />
          &nbsp; Saving...
        </div>
      );
    }

    return (
      <div>
        <AppBar position="static">
          <Toolbar>
            <Tabs
              className={classes.tabs}
              value={this.state.currentLayer}
              scrollable
              scrollButtons="auto"
              onChange={this.selectLayer}
            >
              {tabs}
            </Tabs>
            <FormControl>
              <Select
                value={this.state.defaultLayer}
                onChange={this.onDefaultLayerChange}
                displayEmpty
                className={classes.selectDefaultLayer}
              >
                {layerMenu}
              </Select>
              <FormHelperText className={classes.selectDefaultLayer}>
                Default layer
              </FormHelperText>
            </FormControl>
          </Toolbar>
        </AppBar>
        <div className={classes.editor}>
          {layer}
          <div className={classes.editorControls}>
            <KeySelector
              className="select-keycode"
              isDisabled={isReadOnly}
              onChange={this.onChange}
              currentKeyCode={this.getCurrentKey()}
            />
          </div>
        </div>
        <Button
          className={classes.editor}
          onClick={this.onApply}
          variant="contained"
          color="secondary"
          disabled={!this.state.modified}
        >
          {saveButtonContent}
        </Button>
      </div>
    );
  }
}

LayoutEditor.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withSnackbar(withStyles(styles)(LayoutEditor));
