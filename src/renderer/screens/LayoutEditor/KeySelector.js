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
import TextField from "@material-ui/core/TextField";
import { withStyles } from "@material-ui/core/styles";

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
    fontFamily: "Input Mono, monospace",
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
  }
});

import { baseKeyCodeTable } from "@chrysalis-api/keymap";

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
        label="Key code"
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
  const { keyInfo, selectedKey, onKeySelect, disabled } = props;

  return (
    <Button
      className={props.classes.key}
      color={keyInfo.code == selectedKey ? "primary" : "default"}
      variant={keyInfo.code == selectedKey ? "contained" : "outlined"}
      onClick={() => onKeySelect(keyInfo.code)}
      disabled={disabled}
    >
      {keyInfo.labels.verbose || keyInfo.labels.primary}
    </Button>
  );
});

const KeyGroupList = withStyles(styles)(props => {
  const {
    group,
    items,
    selectedKey,
    onKeySelect,
    withModifiers,
    disabled
  } = props;

  const itemList = items || baseKeyCodeTable[group].keys;

  const keyList = itemList.map(key => {
    return (
      <KeyButton
        key={key.code}
        disabled={disabled}
        keyInfo={key}
        selectedKey={selectedKey}
        onKeySelect={onKeySelect}
      />
    );
  });

  let modSelector;
  if (withModifiers) {
    modSelector = (
      <FormGroup row>
        <FormControlLabel control={<Checkbox />} label="Control" disabled />
        <FormControlLabel control={<Checkbox />} label="Shift" disabled />
        <FormControlLabel control={<Checkbox />} label="Alt" disabled />
        <FormControlLabel control={<Checkbox />} label="Gui" disabled />
        <FormControlLabel control={<Checkbox />} label="AltGr" disabled />
      </FormGroup>
    );
  }

  return (
    <React.Fragment>
      <div className={props.classes.keylist}> {keyList} </div>
      {modSelector}
    </React.Fragment>
  );
});

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
  state = {
    anchorEl: null,
    selectedGroup: -1
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
      selectedGroup: index
    });
  };

  onKeySelect = keyCode => {
    this.setState({ selectedGroup: -1 });
    this.props.onKeySelect(keyCode);
  };

  render() {
    const { classes, currentKeyCode, disabled } = this.props;
    const { anchorEl, selectedGroup } = this.state;

    if (currentKeyCode == -1) return null;

    let groupIndex = selectedGroup;
    if (groupIndex == -1) {
      groupIndex = keyGroups.length - 1;
      baseKeyCodeTable.forEach((group, index) => {
        for (let key of group.keys) {
          if (key.code == currentKeyCode) {
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
          {group}
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
                  Key type
                  <span style={{ float: "right" }}>
                    {anchorEl ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
                  </span>
                </span>
              }
              secondary={keyGroups[groupIndex]}
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
            keyCode={currentKeyCode}
            onKeySelect={this.onKeySelect}
          />
        </div>
      </Paper>
    );
  }
}

export default withStyles(styles)(KeySelector);
