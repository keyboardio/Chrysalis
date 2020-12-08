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

import { NewKeymapDB } from "../../../../api/keymap";

const styles = theme => ({
  root: {
    flexGrow: 1,
    margin: theme.spacing.unit
  },
  button: {
    margin: theme.spacing.unit
  }
});

const db = new NewKeymapDB();

const Number = withStyles(styles)(props => {
  const { classes, keys, onKeySelect, name, currentKeyCode } = props;

  const key = db.lookup(currentKeyCode);
  const rangeStart = keys[0].rangeStart;

  const onChange = event => {
    const newValue = parseInt(event.target.value);
    onKeySelect(rangeStart + newValue);
  };

  const value = db.isInCategory(currentKeyCode, keys[0].categories[0])
    ? key.code - rangeStart
    : 0;

  return (
    <FormControl className={classes.form}>
      <InputLabel>{name}</InputLabel>
      <Input
        type="number"
        min={0}
        max={keys.length}
        value={value}
        onChange={onChange}
        onKeyDown={onChange}
      />
    </FormControl>
  );
});

const ButtonGrid = withStyles(styles)(props => {
  const { classes, keys, onKeySelect } = props;

  const onClick = keyCode => {
    return () => {
      onKeySelect(keyCode);
    };
  };

  const buttons = keys.map((k, index) => {
    const key = "key-" + props.category + "-" + index.toString();
    return (
      <Button
        variant="contained"
        key={key}
        className={classes.button}
        onClick={onClick(k.code)}
      >
        {db.format(k, "full").main}
      </Button>
    );
  });

  return buttons;
});

const CategorySelector = withStyles(styles)(props => {
  const { classes, variant, onKeySelect, currentKeyCode } = props;
  const keys = db.selectCategory(props.category);

  let contents;
  if (!variant || variant == "button-grid") {
    contents = <ButtonGrid onKeySelect={onKeySelect} keys={keys} />;
  } else if (variant == "number") {
    contents = (
      <Number
        onKeySelect={onKeySelect}
        keys={keys}
        name={props.name}
        currentKeyCode={currentKeyCode}
      />
    );
  }

  return (
    <div className={classes.root}>
      <Paper elevation={0}>{contents}</Paper>
    </div>
  );
});

export default CategorySelector;
