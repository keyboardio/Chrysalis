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

// TODO:
//  - Macros (dial, or limited to 32)
//  - Unknown keys (number input, special group)
//  - Modifier agumented keys

import React from "react";
import classNames from "classnames";

import Button from "@material-ui/core/Button";
import Checkbox from "@material-ui/core/Checkbox";
import Divider from "@material-ui/core/Divider";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
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
    height: "100%"
  },
  keygroup: {
    margin: theme.spacing.unit
  },
  centered: {
    textAlign: "center"
  }
});

import { baseKeyCodeTable } from "chrysalis-keymap-transformer-core";

const keyGroups = baseKeyCodeTable.map(item => {
  return item.groupName;
});

const moddableGroups = [
  "Letters",
  "Digits",
  "Punctuation",
  "Spacing",
  "Navigation",
  "Fx keys",
  "Numpad"
];

const KeyGroupMouseButtons = props => {
  const mouseKeys = baseKeyCodeTable[props.group].keys;
  const items = [mouseKeys[0], mouseKeys[2], mouseKeys[1]];
  return <KeyGroupGrid items={items} {...props} />;
};

const KeyGroupMouseWarp = withStyles(styles)(props => {
  const warpKeys = baseKeyCodeTable[props.group].keys;
  const items = [
    warpKeys[1],
    warpKeys[3],
    warpKeys[2],
    warpKeys[4],
    warpKeys[0]
  ];
  return (
    <KeyGroupGrid
      className={props.classes.centered}
      cols={2}
      items={items}
      {...props}
    />
  );
});

const KeyButton = props => {
  const { keyInfo, selectedKey, onKeySelect } = props;

  return (
    <Button
      size="small"
      color={keyInfo.code == selectedKey ? "primary" : "default"}
      variant={keyInfo.code == selectedKey ? "outlined" : "text"}
      onClick={() => onKeySelect(keyInfo.code)}
    >
      {keyInfo.labels.verbose || keyInfo.labels.primary}
    </Button>
  );
};

const KeyGroupGrid = withStyles(styles)(props => {
  const {
    group,
    items,
    selectedKey,
    onKeySelect,
    className,
    cols,
    withModifiers
  } = props;

  const itemList = items || baseKeyCodeTable[group].keys;
  let centered = (itemList.length - 1) % (cols || 3) == 0 && (cols || 3) > 1;

  const keyList = itemList.map((key, index) => {
    let itemCols = 1;

    if (index == itemList.length - 1 && centered) {
      itemCols = cols || 3;
    }

    return (
      <GridListTile key={key.code} cols={itemCols}>
        <KeyButton
          keyInfo={key}
          selectedKey={selectedKey}
          onKeySelect={onKeySelect}
        />
      </GridListTile>
    );
  });

  const centeredClass = centered ? props.classes.centered : null;

  let modSelector;
  if (withModifiers) {
    modSelector = (
      <div>
        <Divider variant="middle" />
        <FormControl component="fieldset" className={props.classes.keygroup}>
          <GridList cellHeight="auto" cols={2}>
            <GridListTile>
              <FormControlLabel control={<Checkbox />} label="Control" />
            </GridListTile>
            <GridListTile>
              <FormControlLabel control={<Checkbox />} label="Shift" />
            </GridListTile>
            <GridListTile>
              <FormControlLabel control={<Checkbox />} label="Alt" />
            </GridListTile>
            <GridListTile>
              <FormControlLabel control={<Checkbox />} label="Gui" />
            </GridListTile>
            <GridListTile>
              <FormControlLabel control={<Checkbox />} label="AltGr" />
            </GridListTile>
          </GridList>
        </FormControl>
      </div>
    );
  }

  return (
    <div>
      <GridList
        cellHeight="auto"
        cols={cols || 3}
        className={classNames(className, centeredClass)}
      >
        {keyList}
      </GridList>
      {modSelector}
    </div>
  );
});

const KeyGroupNav = withStyles(styles)(props => {
  const { group } = props;
  const jumpKeys = baseKeyCodeTable[group].keys.slice(0, 4);
  const navKeys = baseKeyCodeTable[group].keys.slice(4, 8);
  const rest = baseKeyCodeTable[group].keys.slice(8);

  return (
    <div>
      <KeyGroupT items={jumpKeys} {...props} />
      <Divider light />
      <KeyGroupT items={navKeys} {...props} />
      <Divider light />
      <KeyGroupGrid items={rest} {...props} />
    </div>
  );
});

const KeyGroupT = withStyles(styles)(props => {
  const { group, className, selectedKey, onKeySelect, classes, items } = props;
  const keys = items || baseKeyCodeTable[group].keys;

  return (
    <GridList
      cellHeight="auto"
      cols={3}
      className={classNames(className, classes.centered)}
    >
      <GridListTile cols={3}>
        <KeyButton
          keyInfo={keys[0]}
          selectedKey={selectedKey}
          onKeySelect={onKeySelect}
        />
      </GridListTile>
      <GridListTile>
        <KeyButton
          keyInfo={keys[2]}
          selectedKey={selectedKey}
          onKeySelect={onKeySelect}
        />
      </GridListTile>
      <GridListTile>
        <KeyButton
          keyInfo={keys[1]}
          selectedKey={selectedKey}
          onKeySelect={onKeySelect}
        />
      </GridListTile>
      <GridListTile>
        <KeyButton
          keyInfo={keys[3]}
          selectedKey={selectedKey}
          onKeySelect={onKeySelect}
        />
      </GridListTile>
    </GridList>
  );
});

class KeyGroupDial extends React.Component {
  render() {
    const { group, className } = this.props;

    let keyList = (
      <TextField
        className={className}
        type="number"
        inputProps={{ min: 0, max: baseKeyCodeTable[group].keys.length - 1 }}
      />
    );

    return keyList;
  }
}

class KeyGroup extends React.Component {
  render() {
    const { group, className, keyCode, onKeySelect } = this.props;

    const groupName = keyGroups[group],
      withModifiers = moddableGroups.includes(groupName);
    let cols = 3;

    switch (groupName) {
      case "Macros": {
        return (
          <KeyGroupDial
            group={group}
            selectedKey={keyCode}
            className={className}
            onKeySelect={onKeySelect}
          />
        );
      }
      case "Punctuation":
      case "Spacing": {
        cols = 2;
        break;
      }
      case "Mouse movement":
      case "Mouse wheel": {
        return (
          <KeyGroupT
            group={group}
            selectedKey={keyCode}
            className={className}
            onKeySelect={onKeySelect}
          />
        );
      }
      case "Navigation": {
        return (
          <KeyGroupNav
            group={group}
            selectedKey={keyCode}
            className={className}
            onKeySelect={onKeySelect}
          />
        );
      }
      case "Mouse button": {
        return (
          <KeyGroupMouseButtons
            group={group}
            selectedKey={keyCode}
            className={className}
            onKeySelect={onKeySelect}
          />
        );
      }
      case "Mouse warp": {
        return (
          <KeyGroupMouseWarp
            group={group}
            selectedKey={keyCode}
            className={className}
            onKeySelect={onKeySelect}
          />
        );
      }
      case "Modifiers":
      case "Media":
      case "OneShot modifiers":
      case "Miscellaneous":
      case "Blank": {
        cols = 1;
      }
    }

    return (
      <KeyGroupGrid
        withModifiers={withModifiers}
        group={group}
        selectedKey={keyCode}
        className={className}
        cols={cols}
        onKeySelect={onKeySelect}
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
    const { classes, currentKeyCode } = this.props;
    const { anchorEl, selectedGroup } = this.state;

    if (currentKeyCode == -1) {
      return <Paper className={classes.root} />;
    }

    let groupIndex = selectedGroup;
    if (groupIndex == -1) {
      groupIndex = 0; // FIXME: Handle modified stuff here
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
        <List>
          <ListItem button>
            <ListItemText
              onClick={this.onListItemClick}
              primary="Key type"
              secondary={keyGroups[groupIndex]}
            />
          </ListItem>
        </List>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.onMenuClose}
        >
          {keyGroupItems}
        </Menu>
        <Divider variant="middle" />
        <div className={classes.keygroup}>
          <KeyGroup
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
