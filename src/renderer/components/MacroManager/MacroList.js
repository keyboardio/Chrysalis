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
import classNames from "classnames";

import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import ListItemText from "@material-ui/core/ListItemText";
import FormControl from "@material-ui/core/FormControl";
import i18n from "../../i18n";

const styles = theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap"
  },
  margin: {
    margin: theme.spacing(),
    marginBottom: "0px"
  },
  textField: {
    padding: "0px",
    margin: "0px",
    minWidth: "200px"
  }
});

class MacroList extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { classes, macros, selected, changeSelected } = this.props;

    return (
      <FormControl className={classes.formControl}>
        <TextField
          key={selected}
          select
          variant="outlined"
          value={selected}
          className={classNames(classes.margin, classes.textField)}
          label={i18n.editor.macros.selectMacro}
          onChange={e => {
            changeSelected(e.target.value);
          }}
        >
          {macros.map(item => (
            <MenuItem value={item.id} key={`item-${item.id}`}>
              <div style={{ display: "flex" }}>
                <ListItemText
                  inset
                  primary={`${("0" + item.id).substr(-2)} - ${item.name}`}
                  secondary={item.macro}
                />
              </div>
            </MenuItem>
          ))}
        </TextField>
      </FormControl>
    );
  }
}

export default withStyles(styles)(MacroList);
