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
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  key: {
    fontFamily: '"Source Code Pro", monospace',
    margin: theme.spacing(0.5),
    padding: "4px 8px",
    minWidth: "auto",
    minHeight: "auto",
    whiteSpace: "nowrap"
  }
});

const KeyButton = withStyles(styles)(props => {
  const { label, selected, classes, ...other } = props;

  return (
    <Button
      className={classes.key}
      color={selected ? "primary" : "default"}
      variant={selected ? "contained" : "outlined"}
      {...other}
    >
      {label}
    </Button>
  );
});

export default KeyButton;
