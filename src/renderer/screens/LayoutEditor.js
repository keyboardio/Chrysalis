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
import Divider from "@material-ui/core/Divider";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Fade from "@material-ui/core/Fade";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import IconButton from "@material-ui/core/IconButton";
import LinearProgress from "@material-ui/core/LinearProgress";
import LockIcon from "@material-ui/icons/Lock";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import MoreVerticalIcon from "@material-ui/icons/MoreVert";
import Portal from "@material-ui/core/Portal";
import Slide from "@material-ui/core/Slide";
import Switch from "@material-ui/core/Switch";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import ToggleButton from "@material-ui/lab/ToggleButton";
import Toolbar from "@material-ui/core/Toolbar";
import VisibilityIcon from "@material-ui/icons/Visibility";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";
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
  },
  defaultLayer: {
    whiteSpace: "nowrap"
  },
  tabWrapper: {
    flexDirection: "row",
    "& svg": {
      position: "relative",
      top: -theme.spacing.unit / 2
    }
  },
  tabLabelContainer: {
    width: "auto",
    padding: `6px ${theme.spacing.unit}px`
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
    keymap: {
      custom: [],
      default: [],
      onlyCustom: false
    },
    showDefaults: true
  };
  keymapDB = new KeymapDB();

  scanKeyboard = async () => {
    let focus = new Focus();

    try {
      let defLayer = await focus.command("settings.defaultLayer");
      defLayer = parseInt(defLayer) || 0;

      let keymap = await focus.command("keymap");

      let empty = true;
      for (let layer of keymap.custom) {
        for (let i of layer) {
          if (i.keyCode != 65535) {
            empty = false;
            break;
          }
        }
      }

      if (empty && !keymap.onlyCustom) {
        console.log("Custom keymap is empty, copying defaults");
        for (let i = 0; i < keymap.default.length; i++) {
          keymap.custom[i] = keymap.default[i].slice();
        }
        keymap.onlyCustom = true;
        await focus.command("keymap", keymap);
      }

      this.setState({
        defaultLayer: defLayer,
        keymap: keymap,
        showDefaults: !keymap.onlyCustom
      });
    } catch (e) {
      this.props.enqueueSnackbar(e, { variant: "error" });
      this.props.onDisconnect();
    }
  };

  getCurrentKey() {
    if (this.state.currentKeyIndex < 0) return -1;

    let layer = parseInt(this.state.currentLayer),
      keyIndex = parseInt(this.state.currentKeyIndex);

    if (this.state.keymap.useCustom) {
      if (layer < 0) {
        layer += this.state.keymap.default.length;
        return this.state.keymap.default[layer][keyIndex].keyCode;
      }

      return this.state.keymap.custom[layer][keyIndex].keyCode;
    } else {
      const offset = this.state.keymap.default.length;
      if (layer < this.state.keymap.default.length)
        return this.state.keymap.default[layer][keyIndex].keyCode;

      return this.state.keymap.custom[layer - offset][keyIndex].keyCode;
    }
  }

  onKeyChange = keyCode => {
    // Keys can only change on the custom layers

    let layer = this.state.currentLayer,
      keyIndex = this.state.currentKeyIndex;

    if (keyIndex === -1) {
      return;
    }

    this.setState(state => {
      let keymap = state.keymap.custom.slice();
      const l = state.keymap.useCustom
        ? layer
        : layer - state.keymap.default.length;
      keymap[l][keyIndex] = this.keymapDB.parse(keyCode);
      return {
        keymap: {
          default: state.keymap.default,
          onlyCustom: state.keymap.onlyCustom,
          custom: keymap
        },
        modified: true
      };
    });
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
    const defLayer = event.target.checked ? event.target.value : 126;
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
        currentLayer: state.defaultLayer >= 126 ? 0 : state.defaultLayer
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

  copyFromLayerMenu = () => {
    this.setState(state => ({
      copyMenuExpanded: !state.copyMenuExpanded
    }));
  };

  copyFromLayer = layer => {
    this.setState(state => {
      let newKeymap;

      if (state.keymap.onlyCustom) {
        newKeymap =
          layer < 0
            ? state.keymap.default.slice()
            : state.keymap.custom.slice();
        newKeymap[state.currentLayer] =
          layer < 0
            ? state.keymap.default[layer + state.keymap.default.length].slice()
            : state.keymap.custom[layer].slice();
      } else {
        newKeymap =
          layer < state.keymap.default.length
            ? state.keymap.default.slice()
            : state.keymap.custom.slice();
        newKeymap[state.currentLayer] =
          layer < state.keymap.default.length
            ? state.keymap.default[layer].slice()
            : state.keymap.custom[layer - state.keymap.default.length].slice();
      }

      this.props.startContext();
      return {
        keymap: {
          default: state.keymap.default,
          onlyCustom: state.keymap.onlyCustom,
          custom: newKeymap
        },
        copyMenuExpanded: false,
        moreAnchorEl: null,
        modified: true
      };
    });
  };

  clearLayer = () => {
    this.setState(state => {
      let newKeymap = state.keymap.custom.slice();
      const idx = state.keymap.onlyCustom
        ? state.currentLayer
        : state.currentLayer - state.keymap.default.length;
      newKeymap[idx] = Array(newKeymap[0].length)
        .fill()
        .map(() => ({ keyCode: 0xffff }));
      this.props.startContext();
      return {
        keymap: {
          default: state.keymap.default,
          onlyCustom: state.keymap.onlyCustom,
          custom: newKeymap
        },
        modified: true,
        moreAnchorEl: null
      };
    });
  };

  toggleShowDefaults = () => {
    this.setState(state => {
      let newCurrentLayer = state.currentLayer;
      if (state.keymap.onlyCustom) {
        if (newCurrentLayer < 0) newCurrentLayer = 0;
      } else {
        if (newCurrentLayer < state.keymap.default.length)
          newCurrentLayer = state.keymap.default.length;
      }

      return {
        currentLayer: newCurrentLayer,
        showDefaults: !state.showDefaults
      };
    });
  };

  toggleUseCustom = async event => {
    let focus = new Focus();

    event.preventDefault();

    const onlyCustom = !this.state.keymap.onlyCustom;
    await focus.command("keymap.onlyCustom", onlyCustom);

    this.setState(state => {
      let newCurrentLayer = state.currentLayer;
      if (!onlyCustom) {
        newCurrentLayer = newCurrentLayer + state.keymap.default.length;
      } else {
        newCurrentLayer = newCurrentLayer - state.keymap.default.length;
      }

      return {
        currentLayer: newCurrentLayer,
        moreAnchorEl: null,
        keymap: {
          custom: state.keymap.custom,
          default: state.keymap.default,
          onlyCustom: onlyCustom
        }
      };
    });
  };

  render() {
    const { classes } = this.props;
    const {
      currentLayer,
      defaultLayer,
      moreAnchorEl,
      keymap,
      showDefaults
    } = this.state;

    let focus = new Focus();
    const Layer = focus.device.components.keymap;

    let layerData, isReadOnly;
    if (keymap.onlyCustom) {
      isReadOnly = currentLayer < 0;
      layerData = isReadOnly
        ? keymap.default[currentLayer + keymap.default.length]
        : keymap.custom[currentLayer];
    } else {
      isReadOnly = currentLayer < keymap.default.length;
      layerData = isReadOnly
        ? keymap.default[currentLayer]
        : keymap.custom[currentLayer - keymap.default.length];
    }

    const layer = (
      <Fade in appear key={currentLayer}>
        <div className={classes.editor}>
          <Layer
            readOnly={isReadOnly}
            index={currentLayer}
            keymap={layerData}
            onKeySelect={this.onKeySelect}
            selectedKey={this.state.currentKeyIndex}
          />
        </div>
      </Fade>
    );

    const tabClasses = {
      wrapper: classes.tabWrapper,
      labelContainer: classes.tabLabelContainer
    };

    let defaultTabs =
      showDefaults &&
      keymap.default.map((_, index) => {
        const idx = index - (keymap.onlyCustom ? keymap.default.length : 0),
          tabKey = "tab-layer-" + idx.toString();

        const label = (
          <span> {i18n.formatString(i18n.components.layer, idx)} </span>
        );
        const icon = <LockIcon />;

        return (
          <Tab
            label={label}
            key={tabKey}
            value={idx}
            icon={icon}
            classes={tabClasses}
          />
        );
      });
    let customTabs = keymap.custom.map((_, index) => {
      const idx = index + (keymap.onlyCustom ? 0 : keymap.default.length);
      const label = (
          <span>{i18n.formatString(i18n.components.layer, idx)}</span>
        ),
        tabKey = "tab-layer-" + idx.toString();

      const icon = <div />;

      return (
        <Tab
          label={label}
          key={tabKey}
          value={idx}
          icon={icon}
          classes={tabClasses}
        />
      );
    });

    let tabs = (defaultTabs || []).concat(customTabs);

    const defaultLayerSwitch = (
      <FormControlLabel
        className={classes.defaultLayer}
        label={i18n.layoutEditor.defaultLayer}
        control={
          <Switch
            disabled={currentLayer < 0}
            checked={currentLayer == defaultLayer}
            onChange={this.onDefaultLayerChange}
            value={currentLayer}
            color="secondary"
          />
        }
      />
    );

    const copyCustomItems = this.state.keymap.custom.map((_, index) => {
      const idx = index + (keymap.onlyCustom ? 0 : keymap.default.length);
      const label = i18n.formatString(i18n.components.layer, idx),
        key = "copy-layer-" + idx.toString();

      return (
        <MenuItem
          className={classes.layerItem}
          key={key}
          disabled={idx == currentLayer}
          onClick={() => this.copyFromLayer(idx)}
        >
          {label}
        </MenuItem>
      );
    });
    const copyDefaultItems =
      showDefaults &&
      keymap.default.map((_, index) => {
        const idx = index - (keymap.onlyCustom ? keymap.default.length : 0),
          label = i18n.formatString(i18n.components.layer, idx),
          key = "copy-layer-" + idx.toString();

        return (
          <MenuItem
            className={classes.layerItem}
            key={key}
            onClick={() => this.copyFromLayer(idx)}
          >
            {label}
          </MenuItem>
        );
      });
    const copyItems = (copyDefaultItems || []).concat(copyCustomItems);

    const copyMenuExpanded =
      this.state.copyMenuExpanded && this.state.currentLayer >= 0;

    const useCustomSwitch = <Switch checked={keymap.onlyCustom} />;
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
          <MenuItem onClick={this.clearLayer} disabled={currentLayer < 0}>
            {i18n.layoutEditor.clearLayer}
          </MenuItem>
          <MenuItem
            onClick={this.copyFromLayerMenu}
            disabled={currentLayer < 0}
          >
            <span style={{ marginRight: "1em" }}>
              {i18n.layoutEditor.copyFrom}
            </span>
            {copyMenuExpanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </MenuItem>
          <Collapse in={copyMenuExpanded}>{copyItems}</Collapse>
          <Divider />
          <MenuItem onClick={this.toggleUseCustom}>
            <FormControlLabel
              control={useCustomSwitch}
              label={i18n.layoutEditor.useCustom}
            />
          </MenuItem>
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
            <ToggleButton
              onClick={this.toggleShowDefaults}
              selected={showDefaults}
              value="showDefaults"
            >
              {showDefaults ? <VisibilityIcon /> : <VisibilityOffIcon />}
            </ToggleButton>
            <Tabs
              className={classes.tabs}
              value={this.state.currentLayer}
              variant={keymap.custom.length != 0 ? "scrollable" : "standard"}
              scrollButtons="auto"
              onChange={this.selectLayer}
            >
              {tabs}
            </Tabs>
            {defaultLayerSwitch}
            {moreMenu}
          </Toolbar>
        </Portal>
        {this.state.keymap.custom.length == 0 && (
          <LinearProgress variant="query" />
        )}
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
