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
import Paper from "@material-ui/core/Paper";
import { withStyles } from "@material-ui/core/styles";

import { KeymapDB } from "../../../../api/keymap";

const styles = theme => ({
  root: {
    flexGrow: 1,
    margin: theme.spacing.unit
  },
  button: {
    margin: theme.spacing.unit
  }
});

const db = new KeymapDB();

const KeyButtonList = withStyles(styles)(props => {
  const { classes, keys, onKeyChange } = props;

  const onClick = keyCode => {
    return () => {
      onKeyChange(keyCode);
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

  return (
    <div className={classes.root}>
      <Paper elevation={0}>{buttons}</Paper>
    </div>
  );
});

export default KeyButtonList;
