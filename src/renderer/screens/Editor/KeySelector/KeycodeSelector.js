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

import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import Paper from "@material-ui/core/Paper";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  root: {
    flexGrow: 1,
    margin: theme.spacing.unit
  }
});

const KeycodeSelector = withStyles(styles)(props => {
  const { classes, onKeySelect, currentKeyCode } = props;
  const [value, setValue] = React.useState(currentKeyCode);

  const onValueChange = event => {
    const newValue = parseInt(event.target.value);
    setValue(newValue);
  };

  const onChange = () => {
    onKeySelect(value);
  };

  return (
    <div className={classes.root}>
      <Paper elevation={0}>
        <FormControl className={classes.form}>
          <InputLabel>Keycode</InputLabel>
          <Input
            type="number"
            min={0}
            max={65535}
            value={value}
            onChange={onValueChange}
          />
          <Button onClick={onChange}>Ok</Button>
        </FormControl>
      </Paper>
    </div>
  );
});

export default KeycodeSelector;
