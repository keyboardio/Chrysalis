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

import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Paper from "@material-ui/core/Paper";
import Select from "@material-ui/core/Select";

//import { NewKeymapDB } from "../../../../../api/keymap";
//const db = new NewKeymapDB();

import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  form: {
    margin: theme.spacing(1),
    minWidth: 120
  }
});

const LayerSwitch = withStyles(styles)(props => {
  const { classes } = props;
  //const { selected, keyCode, classes } = props;

  //const key = db.lookup(keyCode);
  //const label = key.label.hint + " " + key.label.base;

  return (
    <Paper elevation={0}>
      <FormControl className={classes.form}>
        <InputLabel>Type</InputLabel>
        <Select value="shiftto">
          <MenuItem value="shiftto" selected>
            Shift to Layer
          </MenuItem>
          <MenuItem value="lockto">Lock Layer</MenuItem>
          <MenuItem value="moveto">Move to Layer</MenuItem>
        </Select>
      </FormControl>
      <FormControl className={classes.form}>
        <InputLabel>Target Layer</InputLabel>
        <Select value={1}>
          <MenuItem value={0}>0</MenuItem>
          <MenuItem value={1} selected>
            1
          </MenuItem>
        </Select>
      </FormControl>
    </Paper>
  );
});

export default LayerSwitch;
