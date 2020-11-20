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
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Paper from "@material-ui/core/Paper";
import Select from "@material-ui/core/Select";
import { withStyles } from "@material-ui/core/styles";

import { NewKeymapDB } from "../../../../../api/keymap";

const styles = theme => ({
  form: {
    margin: theme.spacing(1),
    minWidth: 120
  }
});

const db = new NewKeymapDB();

const LayerSwitch = withStyles(styles)(props => {
  const { classes } = props;

  const key = db.lookup(props.keyCode);
  const type = key.categories[1];
  const layerIndex = props.keyCode - key.rangeStart;

  const onTargetLayerChange = event => {
    props.onKeySelect(parseInt(event.target.value) + key.rangeStart);
  };

  const typeStarts = {
    locktolayer: 17408,
    shifttolayer: 17450,
    movetolayer: 17492
  };

  const onTypeChange = event => {
    props.onKeySelect(typeStarts[event.target.value] + layerIndex);
  };

  return (
    <Paper elevation={0}>
      <FormControl className={classes.form}>
        <InputLabel>Type</InputLabel>
        <Select value={type} onChange={onTypeChange}>
          <MenuItem value="shifttolayer" selected={type == "shifttolayer"}>
            Shift to Layer
          </MenuItem>
          <MenuItem value="locktolayer" selected={type == "locktolayer"}>
            Lock Layer
          </MenuItem>
          <MenuItem value="movetolayer" selected={type == "movetolayer"}>
            Move to Layer
          </MenuItem>
        </Select>
      </FormControl>
      <FormControl className={classes.form}>
        <InputLabel>Target Layer</InputLabel>
        <Input
          type="number"
          min={0}
          max={31}
          value={layerIndex}
          onChange={onTargetLayerChange}
        />
      </FormControl>
    </Paper>
  );
});

export default LayerSwitch;
