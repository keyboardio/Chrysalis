// -*- mode: js-jsx -*-
/* Chrysalis -- Kaleidoscope Command Center
 * Copyright (C) 2020  Keyboardio, Inc.
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

import KeyButton from "../../../../components/KeyButton";

import Divider from "@material-ui/core/Divider";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";

import { NewKeymapDB } from "../../../../../api/keymap";
const db = new NewKeymapDB();

const initialState = {
  mouseX: null,
  mouseY: null
};

const LayerSwitchButton = props => {
  const { selected, keyCode, classes } = props;

  const key = db.lookup(keyCode);
  const label = key.label.hint + " " + key.label.base;

  const [state, setState] = React.useState(initialState);

  const handleClick = event => {
    event.preventDefault();
    setState({
      mouseX: event.clientX - 2,
      mouseY: event.clientY + 4
    });
  };

  const handleClose = () => {
    setState(initialState);
  };

  return (
    <React.Fragment>
      <KeyButton
        label={label}
        selected={selected}
        onContextMenu={handleClick}
      />
      <Menu
        keepMounted
        open={state.mouseY !== null}
        onClose={handleClose}
        anchorReference="anchorPosition"
        anchorPosition={
          state.mouseY !== null && state.mouseX !== null
            ? { top: state.mouseY, left: state.mouseX }
            : undefined
        }
      >
        <MenuItem onClick={handleClose} selected>
          Shift to Layer
        </MenuItem>
        <MenuItem onClick={handleClose}>Lock Layer</MenuItem>
        <MenuItem onClick={handleClose}>Move to Layer</MenuItem>
        <Divider />
        <MenuItem>
          <FormControl fullWidth>
            <InputLabel>Target</InputLabel>
            <Select value={1}>
              <MenuItem value={0}>0</MenuItem>
              <MenuItem value={1} selected>
                1
              </MenuItem>
            </Select>
          </FormControl>
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
};

export default LayerSwitchButton;
