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
import PropTypes from "prop-types";

import Collapse from "@material-ui/core/Collapse";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Fade from "@material-ui/core/Fade";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import IconButton from "@material-ui/core/IconButton";
import LinearProgress from "@material-ui/core/LinearProgress";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import MoreVerticalIcon from "@material-ui/icons/MoreVert";
import Portal from "@material-ui/core/Portal";
import Slide from "@material-ui/core/Slide";
import Switch from "@material-ui/core/Switch";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import Toolbar from "@material-ui/core/Toolbar";
import { withStyles } from "@material-ui/core/styles";

import { withSnackbar } from "notistack";

import Focus from "@chrysalis-api/focus";
import { KeymapDB } from "@chrysalis-api/keymap";

import KeySelector from "./LayoutEditor/KeySelector";
import SaveChangesButton from "../components/SaveChangesButton";
import i18n from "../i18n";

const styles = theme => ({
  tabs: {
    flexGrow: 1
  },
  grow: {
    flexGrow: 1
  },
  editor: {
    margin: theme.spacing.unit * 3,
    marginBottom: 150,
    textAlign: "center"
  },
  moreMenu: {
    marginTop: theme.spacing.unit * 4
  },
  layerItem: {
    paddingLeft: theme.spacing.unit * 4
  }
});

class LayoutEditor extends React.Component {
  state = {
    currentLayer: 0,
    currentKeyIndex: -1,
    modified: false,
    saving: false,
    moreAnchorEl: null,
    copyMenuExpanded: false,
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
    this.props.startContext();
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
    this.props.cancelContext();
  };

  onDefaultLayerChange = async event => {
    const defLayer = event.target.checked ? event.target.value : 255;
    this.setState({
      defaultLayer: defLayer
    });
    let focus = new Focus();
    focus.command("settings.defaultLayer", defLayer);
    console.log("default layer set to", defLayer);
  };

  componentDidMount() {
    this.scanKeyboard().then(() => {
      this.setState(state => ({
        currentLayer:
          state.defaultLayer < state.keymap.length ? state.defaultLayer : 0
      }));
    });
  }

  UNSAFE_componentWillReceiveProps = nextProps => {
    if (this.props.inContext && !nextProps.inContext) {
      this.scanKeyboard();
      this.setState({ modified: false });
    }
  };

  moreMenu = event => {
    this.setState({ moreAnchorEl: event.currentTarget });
  };
  moreMenuClose = () => {
    this.setState({ moreAnchorEl: null });
  };

  copyToLayerMenu = () => {
    this.setState(state => ({
      copyMenuExpanded: !state.copyMenuExpanded
    }));
  };

  copyToLayer = layer => {
    this.setState(state => {
      let newKeymap = state.keymap.slice();
      newKeymap[layer] = state.keymap[state.currentLayer].slice();
      this.props.startContext();
      return {
        keymap: newKeymap,
        copyMenuExpanded: false,
        moreAnchorEl: null,
        currentLayer: layer,
        modified: true
      };
    });
  };

  clearLayer = () => {
    this.setState(state => {
      let newKeymap = state.keymap.slice();
      newKeymap[state.currentLayer] = Array(newKeymap[0].length)
        .fill()
        .map(() => ({ keyCode: 0 }));
      this.props.startContext();
      return {
        keymap: newKeymap,
        modified: true,
        moreAnchorEl: null
      };
    });
  };

  render() {
    const { classes } = this.props;
    const {
      currentLayer,
      defaultLayer,
      moreAnchorEl,
      copyMenuExpanded
    } = this.state;

    let focus = new Focus();
    const Layer = focus.device.components.keymap;

    let layerIndex = this.state.currentLayer,
      isReadOnly = layerIndex < this.state.roLayers,
      layerData = this.state.keymap[layerIndex],
      layer = (
        <Fade in appear key={layerIndex}>
          <div className={classes.editor}>
            <Layer
              readOnly={isReadOnly}
              index={layerIndex}
              keymap={layerData}
              onKeySelect={this.onKeySelect}
              selectedKey={this.state.currentKeyIndex}
            />
          </div>
        </Fade>
      );

    let tabs = this.state.keymap.map((_, index) => {
      let label = i18n.formatString(i18n.components.layer, index),
        tabKey = "tab-layer-" + index.toString(),
        isReadOnly = index < this.state.roLayers;

      if (isReadOnly) {
        label = <em>{label} (RO)</em>;
      }
      return <Tab label={label} key={tabKey} />;
    });

    const defaultLayerSwitch = (
      <FormControlLabel
        label={i18n.layoutEditor.defaultLayer}
        control={
          <Switch
            checked={currentLayer == defaultLayer}
            onChange={this.onDefaultLayerChange}
            value={currentLayer}
            color="secondary"
          />
        }
      />
    );

    let copyItems = this.state.keymap.map((_, index) => {
      const label = i18n.formatString(i18n.components.layer, index),
        key = "copy-layer-" + index.toString();

      if (index < this.state.roLayers) return null;

      return (
        <MenuItem
          className={classes.layerItem}
          key={key}
          disabled={index == currentLayer}
          onClick={() => this.copyToLayer(index)}
        >
          {label}
        </MenuItem>
      );
    });
    const moreMenu = (
      <React.Fragment>
        <IconButton onClick={this.moreMenu}>
          <MoreVerticalIcon />
        </IconButton>
        <Menu
          anchorEl={moreAnchorEl}
          open={Boolean(moreAnchorEl)}
          onClose={this.moreMenuClose}
        >
          <MenuItem
            onClick={this.clearLayer}
            disabled={currentLayer < this.state.roLayers}
          >
            {i18n.layoutEditor.clearLayer}
          </MenuItem>
          <MenuItem onClick={this.copyToLayerMenu}>
            <span style={{ marginRight: "1em" }}>
              {i18n.layoutEditor.copyTo}
            </span>
            {copyMenuExpanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </MenuItem>
          <Collapse in={copyMenuExpanded}>{copyItems}</Collapse>
        </Menu>
      </React.Fragment>
    );

    return (
      <React.Fragment>
        <Portal container={this.props.titleElement}>
          {i18n.app.menu.layoutEditor}
        </Portal>
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
            {defaultLayerSwitch}
            {moreMenu}
          </Toolbar>
        </Portal>
        {this.state.keymap.length == 0 && <LinearProgress variant="query" />}
        {layer}
        <Slide in={this.getCurrentKey() != -1} direction="up" unmountOnExit>
          <KeySelector
            disabled={isReadOnly}
            onKeySelect={this.onKeyChange}
            currentKeyCode={this.getCurrentKey()}
          />
        </Slide>
        <SaveChangesButton
          floating
          onClick={this.onApply}
          disabled={!this.state.modified}
        >
          {i18n.components.save.saveChanges}
        </SaveChangesButton>
      </React.Fragment>
    );
  }
}

LayoutEditor.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withSnackbar(withStyles(styles)(LayoutEditor));
