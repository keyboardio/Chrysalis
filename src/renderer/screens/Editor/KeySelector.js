// -*- mode: js-jsx -*-
/* Chrysalis -- Kaleidoscope Command Center
 * Copyright (C) 2018, 2019, 2020  Keyboardio, Inc.
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

import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import ArrowDropUpIcon from "@material-ui/icons/ArrowDropUp";
import Button from "@material-ui/core/Button";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormGroup from "@material-ui/core/FormGroup";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import Paper from "@material-ui/core/Paper";
import Switch from "@material-ui/core/Switch";
import TextField from "@material-ui/core/TextField";
import { withStyles } from "@material-ui/core/styles";

import i18n from "../../i18n";

const styles = theme => ({
  root: {
    display: "flex",
    position: "fixed",
    left: 0,
    right: 0,
    bottom: 0,
    height: 150
  },
  type: {
    width: 225
  },
  key: {
    fontFamily: '"Source Code Pro", monospace',
    margin: theme.spacing.unit / 2,
    padding: "4px 8px",
    minWidth: "auto",
    minHeight: "auto",
    whiteSpace: "nowrap"
  },
  keygroup: {
    margin: theme.spacing.unit
  },
  keylist: {
    display: "flex",
    flexWrap: "wrap"
  },
  centered: {
    textAlign: "center"
  },
  typeSelector: {
    color: theme.palette.primary.main
  },
  checkbox: {
    marginRight: theme.spacing.unit * 4
  },
  checkboxRoot: {
    padding: "12px 4px 12px 12px"
  }
});

import { baseKeyCodeTable } from "../../../api/keymap";

const keyGroups = baseKeyCodeTable
  .map(item => {
    return item.groupName;
  })
  .concat(["Unknown keycodes"]);

const moddableGroups = [
  "Letters",
  "Digits",
  "Punctuation",
  "Spacing",
  "Modifiers",
  "Navigation",
  "Fx keys",
  "Numpad"
];

class KeyGroupCodeUnwrapped extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      keyCode: props.selectedKey,
      modified: false
    };
  }

  componentWillUnmount() {
    if (this.timer) clearTimeout(this.timer);
  }

  onChange = event => {
    this.setState({
      keyCode: event.target.value,
      modified: true
    });
    if (this.timer) clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      this.setState({ modified: false });
      this.props.onKeySelect(this.state.keyCode);
    }, 2500);
  };

  onKeyDown = event => {
    if (event.key == "Enter") {
      this.props.onKeySelect(event.target.value);
      this.setState({ modified: false });
    }
  };

  render() {
    const { disabled, classes } = this.props;

    const value = this.state.modified
      ? this.state.keyCode
      : this.props.selectedKey;

    return (
      <TextField
        className={classes.keygroup}
        onChange={this.onChange}
        onKeyDown={this.onKeyDown}
        label={i18n.t("editor.keyCode")}
        variant="outlined"
        disabled={disabled}
        type="number"
        value={value}
      />
    );
  }
}
const KeyGroupCode = withStyles(styles)(KeyGroupCodeUnwrapped);

const KeyButton = withStyles(styles)(props => {
  const { keyInfo, selected, onKeySelect, disabled, mask } = props;

  return (
    <Button
      className={props.classes.key}
      color={selected ? "primary" : "default"}
      variant={selected ? "contained" : "outlined"}
      onClick={() => onKeySelect(keyInfo.code | mask)}
      disabled={disabled}
    >
      {keyInfo.labels.verbose || keyInfo.labels.primary}
    </Button>
  );
});

const CTRL_HELD = (1 << 0) << 8;
const LALT_HELD = (1 << 1) << 8;
const RALT_HELD = (1 << 2) << 8;
const SHIFT_HELD = (1 << 3) << 8;
const GUI_HELD = (1 << 4) << 8;

class KeyGroupListUnwrapped extends React.Component {
  getNumLayers = () => {
    const { keymap } = this.props;
    if (keymap) {
      let layers = keymap.custom.length;
      return layers;
    }
  };

  toggleMask = (mask, dualUseModifier) => {
    return () => {
      const { onKeySelect, selectedKey } = this.props;

      let modifier;
      if (dualUseModifier) {
        switch (mask) {
          case CTRL_HELD:
            modifier = 0;
            break;
          case SHIFT_HELD:
            modifier = 1;
            break;
          case LALT_HELD:
            modifier = 2;
            break;
          case GUI_HELD:
            modifier = 3;
            break;
          case RALT_HELD:
            modifier = 6;
            break;
        }

        const result = ((selectedKey - 49169) % 256) + (modifier << 8) + 49169;

        if (result == selectedKey) {
          onKeySelect((selectedKey - 49169) % 256);
        } else {
          onKeySelect(result);
        }
      } else {
        if (selectedKey & mask) {
          onKeySelect(selectedKey & ~mask);
        } else {
          onKeySelect(selectedKey | mask);
        }
      }
    };
  };

  toggleDualUse = () => {
    const { selectedKey } = this.props;

    if (selectedKey >= 49169 && selectedKey <= 51217) {
      const keyCode = (selectedKey - 49169) % 256;
      const modifier = (selectedKey - 49169 - keyCode) >> 8;
      let mask;

      switch (modifier) {
        case 0:
          mask = CTRL_HELD;
          break;
        case 1:
          mask = SHIFT_HELD;
          break;
        case 2:
          mask = LALT_HELD;
          break;
        case 3:
          mask = GUI_HELD;
          break;
        case 6:
          mask = RALT_HELD;
      }
      this.props.onKeySelect(keyCode | mask);
    } else {
      const keyCode = selectedKey % 256 ? selectedKey % 256 : selectedKey;
      const mask = selectedKey - keyCode;
      let modifier;

      switch (mask) {
        case CTRL_HELD:
          modifier = 0;
          break;
        case SHIFT_HELD:
          modifier = 1;
          break;
        case LALT_HELD:
          modifier = 2;
          break;
        case GUI_HELD:
          modifier = 3;
          break;
        case RALT_HELD:
          modifier = 6;
      }
      const result = keyCode + (modifier << 8) + 49169;
      this.props.onKeySelect(result);
    }
  };

  render() {
    const {
      classes,
      group,
      items,
      selectedKey,
      onKeySelect,
      withModifiers,
      disabled
    } = this.props;

    let keyCode = selectedKey;
    let mask = 0;
    let dualUseModifier = false;
    let invalidDualUse = true;
    let dualUseLayer = null;
    let dualUseLayerSwitch = null;

    if (withModifiers) {
      if (keyCode >= 256 && keyCode <= 8191 && keyCode % 256) {
        keyCode = selectedKey % 256 ? selectedKey % 256 : selectedKey;
        if (selectedKey != 65535) {
          mask = selectedKey - keyCode;
        }
        if (
          mask == CTRL_HELD ||
          mask == SHIFT_HELD ||
          mask == LALT_HELD ||
          mask == GUI_HELD ||
          mask == RALT_HELD
        ) {
          invalidDualUse = false;
        }
      }

      if (keyCode >= 49169 && keyCode <= 51217) {
        invalidDualUse = false;
        keyCode = (selectedKey - 49169) % 256;
        const modifier = (selectedKey - 49169 - keyCode) >> 8;
        dualUseModifier = true;
        switch (modifier) {
          case 0:
            mask = CTRL_HELD;
            break;
          case 1:
            mask = SHIFT_HELD;
            break;
          case 2:
            mask = LALT_HELD;
            break;
          case 3:
            mask = GUI_HELD;
            break;
          case 6:
            mask = RALT_HELD;
            break;
        }
      }

      if (keyCode >= 51218 && keyCode <= 53266) {
        keyCode = (selectedKey - 51218) % 256;
        const layer = (selectedKey - 51218) >> 8;
        dualUseLayer = Array(8)
          .fill(0)
          .map((_, index) => {
            const keyInfo = {
              code: 51218 + (index << 8) + keyCode,
              labels: {
                primary: `#${index}`
              }
            };
            return (
              <KeyButton
                disabled={disabled}
                keyInfo={keyInfo}
                mask={0}
                selected={layer == index}
                key={index}
                onKeySelect={onKeySelect}
              />
            );
          });
      }

      dualUseLayerSwitch = (
        <div>
          <FormControlLabel
            disabled={disabled || keyCode == 0 || Boolean(mask)}
            className={classes.checkbox}
            control={<Switch />}
            checked={Boolean(dualUseLayer)}
            onChange={() => {
              if (dualUseLayer) {
                onKeySelect(keyCode);
              } else {
                onKeySelect(keyCode + 51218);
              }
            }}
            label={i18n.t("editor.dualUseLayer")}
          />
        </div>
      );
    }

    const itemList = items || baseKeyCodeTable[group].keys;
    const isLayersGroup =
      group === 9 || group === 10 || group == 11 || group === 20;

    const keyList = itemList
      .slice(0, isLayersGroup ? this.getNumLayers() : undefined)
      .map(key => {
        return (
          <KeyButton
            key={key.code}
            disabled={disabled}
            keyInfo={key}
            selected={key.code == keyCode}
            onKeySelect={onKeySelect}
            mask={mask}
          />
        );
      });

    let modSelector;
    if (withModifiers) {
      modSelector = (
        <FormGroup row>
          <FormControlLabel
            disabled={disabled || keyCode == 0}
            className={classes.checkbox}
            control={<Checkbox classes={{ root: classes.checkboxRoot }} />}
            checked={Boolean(mask & CTRL_HELD)}
            onChange={this.toggleMask(CTRL_HELD, dualUseModifier)}
            label="Control"
          />
          <FormControlLabel
            disabled={disabled || keyCode == 0}
            className={classes.checkbox}
            control={<Checkbox classes={{ root: classes.checkboxRoot }} />}
            checked={Boolean(mask & SHIFT_HELD)}
            onChange={this.toggleMask(SHIFT_HELD, dualUseModifier)}
            label="Shift"
          />
          <FormControlLabel
            disabled={disabled || keyCode == 0}
            className={classes.checkbox}
            control={<Checkbox classes={{ root: classes.checkboxRoot }} />}
            checked={Boolean(mask & LALT_HELD)}
            onChange={this.toggleMask(LALT_HELD, dualUseModifier)}
            label="Alt"
          />
          <FormControlLabel
            disabled={disabled || keyCode == 0 || dualUseModifier}
            className={classes.checkbox}
            control={<Checkbox classes={{ root: classes.checkboxRoot }} />}
            checked={Boolean(mask & RALT_HELD)}
            onChange={this.toggleMask(RALT_HELD, dualUseModifier)}
            label="AltGr"
          />
          <FormControlLabel
            disabled={disabled || keyCode == 0}
            className={classes.checkbox}
            control={<Checkbox classes={{ root: classes.checkboxRoot }} />}
            checked={Boolean(mask & GUI_HELD)}
            onChange={this.toggleMask(GUI_HELD, dualUseModifier)}
            label="Gui"
          />
          <FormControlLabel
            disabled={disabled || keyCode == 0 || invalidDualUse}
            className={classes.checkbox}
            control={<Switch />}
            checked={dualUseModifier}
            onChange={this.toggleDualUse}
            label={i18n.t("editor.dualUse")}
          />
        </FormGroup>
      );
    }

    return (
      <React.Fragment>
        <div className={classes.keylist}> {keyList} </div>
        {dualUseLayer || modSelector}
        {dualUseLayerSwitch}
      </React.Fragment>
    );
  }
}
const KeyGroupList = withStyles(styles)(KeyGroupListUnwrapped);

class KeyGroup extends React.Component {
  render() {
    const { group, keyCode, onKeySelect, ...props } = this.props;

    const groupName = keyGroups[group],
      withModifiers = moddableGroups.includes(groupName);

    if (groupName == "Unknown keycodes") {
      return (
        <KeyGroupCode
          group={group}
          selectedKey={keyCode}
          onKeySelect={onKeySelect}
          {...props}
        />
      );
    }

    return (
      <KeyGroupList
        withModifiers={withModifiers}
        group={group}
        selectedKey={keyCode}
        onKeySelect={onKeySelect}
        {...props}
      />
    );
  }
}

class KeySelector extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      anchorEl: null,
      selectedGroup: -1,
      actualKeycode: props.currentKeyCode
    };
  }

  UNSAFE_componentWillReceiveProps = nextProps => {
    this.setState({
      actualKeycode: nextProps.currentKeyCode,
      selectedGroup: -1
    });
  };

  onListItemClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  onMenuClose = () => {
    this.setState({ anchorEl: null });
  };

  onMenuItemClick = (_, index) => {
    this.setState({
      anchorEl: null,
      selectedGroup: index,
      actualKeycode: 0
    });
  };

  onKeySelect = keyCode => {
    this.props.onKeySelect(keyCode);
  };

  render() {
    const { classes, currentKeyCode, disabled, keymap } = this.props;
    const { anchorEl, selectedGroup, actualKeycode } = this.state;

    let groupIndex = selectedGroup,
      keyCode = currentKeyCode;

    if (groupIndex == -1) {
      // Modified keys
      if (currentKeyCode >= 256 && currentKeyCode <= 8191 && keyCode % 256) {
        keyCode = keyCode % 256;
      }
      // DualUse, Modifiers
      if (currentKeyCode >= 49169 && currentKeyCode <= 51217) {
        keyCode = (keyCode - 49169) % 256;
      }
      // DualUse, layers
      if (currentKeyCode >= 51218 && currentKeyCode <= 53266) {
        keyCode = (keyCode - 51218) % 256;
      }

      groupIndex = keyGroups.length - 1;
      baseKeyCodeTable.forEach((group, index) => {
        for (let key of group.keys) {
          if (key.code == keyCode) {
            groupIndex = index;
            break;
          }
        }
      });
    }

    const keyGroupItems = keyGroups.map((group, index) => {
      return (
        <MenuItem
          key={group}
          selected={index == groupIndex}
          onClick={event => this.onMenuItemClick(event, index)}
        >
          {i18n.t("editor.groups." + group, group)}
        </MenuItem>
      );
    });

    return (
      <Paper className={classes.root}>
        <List className={classes.type}>
          <ListItem button className={classes.typeSelector} disabled={disabled}>
            <ListItemText
              onClick={this.onListItemClick}
              primary={
                <span>
                  {i18n.t("editor.keyType")}
                  <span style={{ float: "right" }}>
                    {anchorEl ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
                  </span>
                </span>
              }
              secondary={i18n.t(
                "editor.groups." + keyGroups[groupIndex],
                keyGroups[groupIndex]
              )}
            />
          </ListItem>
        </List>
        <Menu
          disabled
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.onMenuClose}
        >
          {keyGroupItems}
        </Menu>
        <div className={classes.keygroup}>
          <KeyGroup
            disabled={disabled}
            group={groupIndex}
            keyCode={actualKeycode}
            onKeySelect={this.onKeySelect}
            keymap={keymap}
          />
        </div>
      </Paper>
    );
  }
}

export default withStyles(styles)(KeySelector);
