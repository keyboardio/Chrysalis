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

import LinearProgress from "@material-ui/core/LinearProgress";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Portal from "@material-ui/core/Portal";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";

import { withSnackbar } from "notistack";

import Focus from "@chrysalis-api/focus";
import { KeymapDB } from "@chrysalis-api/keymap";

import KeySelector from "./LayoutEditor/KeySelector";
import SaveChangesButton from "../components/SaveChangesButton";

const styles = theme => ({
  tabs: {
    flexGrow: 1
  },
  grow: {
    flexGrow: 1
  },
  editor: {
    display: "flex",
    margin: theme.spacing.unit * 3
  },
  editorControls: {
    marginLeft: "2em",
    width: "100%"
  },
  layerRoot: {
    width: "100%"
  },
  menu: {
    marginTop: theme.spacing.unit * 6,
    marginLeft: theme.spacing.unit * 6
  }
});

class LayerTabUnwrapped extends React.Component {
  state = {
    anchorEl: null
  };

  menu = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  closeMenu = () => {
    this.setState({ anchorEl: null });
  };

  setDefault = () => {
    this.closeMenu();
    this.props.onSetDefault(this.props.layer);
  };

  render() {
    const {
      readOnly,
      layer,
      isDefault,
      classes,
      onSetDefault, // eslint-disable-line
      ...props
    } = this.props;
    const { anchorEl } = this.state;
    const ro = readOnly ? " (RO)" : "";
    const def = isDefault ? "*" : "";
    const label = `Layer #${layer}${def}${ro}`;

    return (
      <React.Fragment>
        <Tab label={label} onContextMenu={this.menu} {...props} />
        <Menu
          className={classes.menu}
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.closeMenu}
        >
          <MenuItem onClick={this.setDefault}>Set as default</MenuItem>
        </Menu>
      </React.Fragment>
    );
  }
}
const LayerTab = withStyles(styles)(LayerTabUnwrapped);

class LayoutEditor extends React.Component {
  state = {
    currentLayer: 0,
    currentKeyIndex: -1,
    modified: false,
    saving: false,
    keymap: []
  };
  keymapDB = new KeymapDB();

  scanKeyboard = async () => {
    let focus = new Focus();

    try {
      let roLayers = await focus.command("keymap.roLayers");
      roLayers = parseInt(roLayers) || 0;

      let defLayer = await focus.command("settings.defaultLayer");
      defLayer = parseInt(defLayer) || 0;

      let keymap = await focus.command("keymap");

      this.setState({
        roLayers: roLayers,
        defaultLayer: defLayer,
        keymap: keymap
      });
    } catch (e) {
      this.props.enqueueSnackbar(e, { variant: "error" });
      this.props.onDisconnect();
    }
  };

  getCurrentKey() {
    if (this.state.currentLayer < 0 || this.state.currentKeyIndex < 0)
      return -1;

    let layer = parseInt(this.state.currentLayer),
      keyIndex = parseInt(this.state.currentKeyIndex);

    return this.state.keymap[layer][keyIndex].keyCode;
  }

  onKeyChange = keyCode => {
    let layer = this.state.currentLayer,
      keyIndex = this.state.currentKeyIndex;

    if (keyIndex === -1) {
      return;
    }

    this.setState(state => {
      let keymap = state.keymap.slice();
      keymap[layer][keyIndex] = this.keymapDB.parse(keyCode);
      return keymap;
    });
    this.setState({ modified: true });
  };

  onKeySelect = event => {
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
  };

  selectLayer = (event, value) => {
    this.setState({
      currentLayer: value,
      currentKeyIndex: -1
    });
  };

  onApply = async () => {
    this.setState({ saving: true });
    let focus = new Focus();
    await focus.command("keymap", this.state.keymap);
    this.setState({
      modified: false,
      saving: false
    });
    console.log("keymap updated");
  };

  onDefaultLayerChange = layer => {
    this.setState({
      defaultLayer: layer
    });
    let focus = new Focus();
    focus.command("settings.defaultLayer", layer);
    console.log("default layer set to", layer);
  };

  componentDidMount() {
    this.scanKeyboard();
  }

  render() {
    const { classes } = this.props;
    let focus = new Focus();
    const Layer = focus.device.components.keymap;

    let layerIndex = this.state.currentLayer,
      isReadOnly = layerIndex < this.state.roLayers,
      layerData = this.state.keymap[layerIndex],
      layer = (
        <Typography component="div" className={classes.layerRoot}>
          <Layer
            readOnly={isReadOnly}
            index={layerIndex}
            keymap={layerData}
            onKeySelect={this.onKeySelect}
            selectedKey={this.state.currentKeyIndex}
          />
        </Typography>
      );

    let tabs = this.state.keymap.map((_, index) => {
      const tabKey = "tab-layer-" + index.toString(),
        isReadOnly = index < this.state.roLayers;
      return (
        <LayerTab
          isDefault={this.state.defaultLayer == index}
          onSetDefault={this.onDefaultLayerChange}
          layer={index}
          key={tabKey}
          readOnly={isReadOnly}
        />
      );
    });

    return (
      <React.Fragment>
        <Portal container={this.props.titleElement}> Layout Editor </Portal>
        <Portal container={this.props.appBarElement}>
          <Toolbar>
            <Tabs
              className={classes.tabs}
              value={this.state.currentLayer}
              scrollable={this.state.keymap.length != 0}
              scrollButtons="auto"
              onChange={this.selectLayer}
            >
              {tabs}
            </Tabs>
          </Toolbar>
        </Portal>
        {this.state.keymap.length == 0 && <LinearProgress variant="query" />}
        <div className={classes.editor}>
          {layer}
          <div className={classes.editorControls}>
            <KeySelector
              className="select-keycode"
              disabled={isReadOnly}
              onKeySelect={this.onKeyChange}
              currentKeyCode={this.getCurrentKey()}
            />
          </div>
        </div>
        <SaveChangesButton
          floating
          onClick={this.onApply}
          disabled={!this.state.modified}
        >
          Save Changes
        </SaveChangesButton>
      </React.Fragment>
    );
  }
}

LayoutEditor.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withSnackbar(withStyles(styles)(LayoutEditor));
