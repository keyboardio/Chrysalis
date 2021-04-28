// -*- mode: js-jsx -*-
/* Bazecor -- Kaleidoscope Command Center
 * Copyright (C) 2019  Keyboardio, Inc.
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
import React, { Component } from "react";

import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import Grid from "@material-ui/core/Grid";
import Fab from "@material-ui/core/Fab";
import IconButton from "@material-ui/core/IconButton";
import KeyboardIcon from "@material-ui/icons/KeyboardRounded";
import SearchIcon from "@material-ui/icons/SearchRounded";
import CloseIcon from "@material-ui/icons/Close";
import { Modal, InputAdornment } from "@material-ui/core";

import { KeymapDB } from "../../../api/keymap";
import GroupItem from "./GroupItem";
import { TextField } from "@material-ui/core";
import classNames from "classnames";
import i18n from "../../i18n";

const styles = theme => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    border: "none",
    outline: "none"
  },
  wrapper: {
    height: "90vh",
    width: "90vw",
    position: "relative",
    outline: "none"
  },
  root: {
    width: "100%",
    height: "100%",
    backgroundColor: theme.palette.background.default,
    boxShadow: "0 30px 50px rgba(0, 0, 0, 0.7)",
    padding: "0px 4px 4px 2px",
    outline: "none",
    spacing: theme.spacing(),
    alignItems: "flex-start"
  },
  close: {
    position: "absolute",
    right: 15,
    top: 15
  },
  margin: {
    display: "flex",
    justifyContent: "start",
    margin: "0 0 15px 30px",
    width: 170,
    height: 34,
    borderRadius: 3,
    padding: 0
  },
  extendedIcon: {
    marginRight: 19,
    marginLeft: 26
  },
  groups: {
    flex: 1,
    backgroundColor: theme.palette.background.default,
    overflowY: "auto",
    [theme.breakpoints.down("lg")]: {
      overflowY: "scroll"
    }
  },
  searchField: {
    margin: "10px 10px",
    width: "70vw",
    color: theme.palette.text.primary
  }
});

const disabledGroups = ["Leader", "Space Cadet", "Steno"];

const orderArray = [
  { group: "Letters", isUnite: false, displayName: "Letters" },
  { group: "Digits & Spacing", isUnite: true, displayName: "Digits & Spacing" },
  { group: "Fx keys", isUnite: false, displayName: "Fx keys" },
  {
    group: "Punctuation",
    isUnite: false,
    displayName: "Punctuation & special letters"
  },
  { group: "Navigation", isUnite: false, displayName: "Navigation" },
  { group: "Numpad", isUnite: false, displayName: "Number pad" },
  { group: "Modifiers", isUnite: false, displayName: "Modifiers" },
  { group: "Shift to layer", isUnite: false, displayName: "Shift to layer" },
  { group: "Move to layer", isUnite: false, displayName: "Move to layer" },
  { group: "Media", isUnite: false, displayName: "Media" },
  { group: "Miscellaneous", isUnite: false, displayName: "Miscellaneous" },
  {
    group: "OneShot modifiers",
    isUnite: false,
    displayName: "One shot modifiers"
  },
  { group: "LED Effect", isUnite: false, displayName: "Led effects" },
  { group: "OneShot layers", isUnite: false, displayName: "One shot layers" },
  { group: "Blank", isUnite: false, displayName: "Blanks" },
  {
    group: "Mouse configuration options",
    isUnite: true,
    displayName: "Mouse configuration options"
  },
  { group: "Macros", isUnite: false, displayName: "Macros" }
];

function hasKeysInGroup(group) {
  if (group.innerGroup) {
    return group.innerGroup.some(ig => hasKeysInGroup(ig));
  } else {
    return group.keys.length > 0;
  }
}

function containsSearchString(name, searchString) {
  return name && name.toLowerCase().includes(searchString.toLowerCase());
}

function filterKeysInGroup(group, filter) {
  if (
    containsSearchString(group.groupName, filter) ||
    containsSearchString(group.displayName, filter)
  ) {
    return group;
  }
  if (group.innerGroup) {
    return {
      ...group,
      innerGroup: group.innerGroup
        .map(ig => filterKeysInGroup(ig, filter))
        .filter(ig => hasKeysInGroup(ig))
    };
  } else if (group.keys) {
    return {
      ...group,
      keys: group.keys.filter(key => {
        const {
          labels: { primary, verbose }
        } = key;
        return (
          containsSearchString(primary, filter) ||
          containsSearchString(verbose, filter)
        );
      })
    };
  }
}

function filterGroups(groups, filter) {
  if (filter.length === 0) {
    return groups;
  }
  return groups
    .map(group => filterKeysInGroup(group, filter))
    .filter(group => hasKeysInGroup(group));
}

/**
 * Reactjs component that creates menu for choise key from all keys list
 * @param {object} classes Property that sets up CSS classes that adding to HTML elements
 * @param {function} onKeySelect Callback function from Editor component that changes key's value on the keyboard layout and closes modal window
 * @param {number} currentKeyCode Property that shows current key's value
 * @param {static method} KeymapDB.updateBaseKeyCode Callback function from KeymapDB to set valid state of baseKeyCodeTable
 */

class SearchKeyBox extends Component {
  state = {
    open: false,
    orderArrayWithKeys: [],
    filter: ""
  };

  //import on methods from KeymapDB to update to the valid state of baseKeyCodeTable
  baseKeyCodeTable = KeymapDB.updateBaseKeyCode();

  componentDidMount() {
    this.setState({
      orderArrayWithKeys: this.toOrderArrayWithKeys(this.baseKeyCodeTable)
    });
  }

  shouldComponentUpdate(nextProps, nextState) {
    return (
      nextState.open !== this.state.open ||
      nextState.filter !== this.state.filter
    );
  }

  /**
   * Creates array for render keys list
   * The first argument is valid state of baseKeyCodeTable
   */

  toOrderArrayWithKeys = baseKeyCodeTable => {
    let codeTable = baseKeyCodeTable.filter(
      item => !disabledGroups.includes(item.groupName)
    );
    return orderArray.map(item =>
      !item.isUnite
        ? {
            // Change baseKeyCodeTable from props to local variable
            ...codeTable.filter(group => item.group === group.groupName)[0],
            displayName: item.displayName
          }
        : {
            groupName: item.group,
            displayName: item.displayName,
            //Change baseKeyCodeTable from props to local variable
            innerGroup: codeTable.filter(
              group =>
                item.group.includes(
                  group.groupName.slice(0, group.groupName.indexOf(" "))
                ) ||
                (item.group === "Navigation & Miscellaneous" &&
                  group.groupName === "Blank")
            )
          }
    );
  };

  /**
   * Opens modal window with keys list
   * Update state of current baseKeyCodeTable and pass it to the state orderArrayWithKeys
   */
  handleOpen = () => {
    this.baseKeyCodeTable = KeymapDB.updateBaseKeyCode();
    this.setState({
      open: true,
      orderArrayWithKeys: this.toOrderArrayWithKeys(this.baseKeyCodeTable)
    });
  };

  /**
   * Closes modal window with keys list
   */
  handleClose = () => {
    this.setState({
      open: false,
      filter: ""
    });
  };

  /**
   * Changes state of component and calls function from Editor
   * @param {number} code Unique number from keymap database
   */
  keySelect = code => {
    this.handleClose();
    this.props.onKeySelect(code);
  };

  onFilterChange = event => {
    this.setState({
      filter: event.target.value
    });
  };

  render() {
    const { classes, currentKeyCode } = this.props;
    const { open, orderArrayWithKeys } = this.state;
    const filter = this.state.filter.toLowerCase();
    const filteredGroups = filterGroups(orderArrayWithKeys, filter);
    const groupeList = filteredGroups.map((group, index) => {
      if (group.groupName !== "Macros") {
        return (
          <GroupItem
            key={group.groupName}
            group={group}
            keySelect={this.keySelect}
            isUnited={Boolean(group.innerGroup)}
            selectedKeyCode={currentKeyCode}
            numderContGrids={filteredGroups.length === index + 1 ? 8 : 4}
            numderLgItemsGrids={filteredGroups.length === index + 1 ? 1 : 2}
            numderMdItemsGrids={filteredGroups.length === index + 1 ? 2 : 3}
          />
        );
      } else {
        return (
          <GroupItem
            key={group.groupName}
            group={{
              groupName: group.groupName,
              displayName: group.displayName,
              keys: [
                {
                  code: group.keys[0].code,
                  labels: { primary: "Add Macro" }
                }
              ]
            }}
            keySelect={this.keySelect}
            isUnited={Boolean(group.innerGroup)}
            selectedKeyCode={currentKeyCode}
            numderContGrids={filteredGroups.length === index + 1 ? 8 : 4}
            numderLgItemsGrids={filteredGroups.length === index + 1 ? 1 : 2}
            numderMdItemsGrids={filteredGroups.length === index + 1 ? 2 : 3}
          />
        );
      }
    });

    return (
      <React.Fragment>
        <Fab
          variant="extended"
          color="primary"
          aria-label="add"
          className={classes.margin}
          onClick={this.handleOpen}
        >
          <KeyboardIcon className={classes.extendedIcon} />
          {i18n.editor.keyConfig}
        </Fab>
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          className={classes.modal}
          open={open}
          onClose={this.handleClose}
          closeAfterTransition
        >
          <div className={classes.wrapper}>
            <IconButton
              aria-label="Close"
              onClick={this.handleClose}
              className={classes.close}
            >
              <CloseIcon />
            </IconButton>
            <Grid container direction="column" className={classes.root}>
              <TextField
                id="SearchFilter"
                className={(classNames(classes.textField), classes.searchField)}
                label={i18n.editor.searchForKeyOrCategory}
                value={this.state.filter}
                onChange={this.onFilterChange}
                variant="outlined"
                color="secondary"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  )
                }}
                autoFocus
              />
              <Grid
                container
                className={classes.groups}
                alignItems="flex-start"
              >
                {groupeList}
              </Grid>
            </Grid>
          </div>
        </Modal>
      </React.Fragment>
    );
  }
}

SearchKeyBox.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string.isRequired).isRequired,
  onKeySelect: PropTypes.func.isRequired,
  currentKeyCode: PropTypes.number.isRequired
};

export default withStyles(styles)(SearchKeyBox);
