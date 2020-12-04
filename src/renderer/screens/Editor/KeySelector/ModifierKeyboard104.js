// -*- mode: js-jsx -*-
/* Chrysalis -- Kaleidoscope Command Center
 * Copyright (C) 2019, 2020  Keyboardio, Inc.
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

import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { withStyles } from "@material-ui/core/styles";

import { NewKeymapDB } from "../../../../api/keymap";
import {
  addModifier,
  removeModifier
} from "../../../../api/keymap/ndb/modifiers";
const db = new NewKeymapDB();

import Keyboard104 from "./keyboard104";

const styles = theme => ({
  root: {
    margin: theme.spacing.unit
  }
});

class ModifierKeyboard104 extends React.Component {
  onKeySelect = keyCode => {
    const { currentKeyCode } = this.props;
    const baseCode = db.lookup(currentKeyCode).baseCode;
    let diff = 0;
    if (baseCode) {
      diff = currentKeyCode - baseCode;
    }

    this.props.onKeySelect(diff + parseInt(keyCode));
  };

  onModChange = event => {
    const kc = this.props.currentKeyCode;
    const mod = event.target.name;

    if (event.target.checked) {
      this.props.onKeySelect(addModifier(kc, mod));
    } else {
      this.props.onKeySelect(removeModifier(kc, mod));
    }
  };

  render() {
    const { classes, currentKeyCode } = this.props;

    let keyCode = currentKeyCode;
    if (db.isInCategory(keyCode, "with-modifiers")) {
      keyCode = db.lookup(keyCode).baseCode;
    }

    const mods = (
      <Paper elevation={0} className={classes.root}>
        <FormControlLabel
          label="Shift"
          control={
            <Checkbox
              checked={db.isInCategory(currentKeyCode, "shift") || false}
              name="shift"
              onChange={this.onModChange}
            />
          }
        />
        <FormControlLabel
          label="Control"
          control={
            <Checkbox
              checked={db.isInCategory(currentKeyCode, "ctrl") || false}
              name="ctrl"
              onChange={this.onModChange}
            />
          }
        />

        <FormControlLabel
          label="Alt"
          control={
            <Checkbox
              checked={db.isInCategory(currentKeyCode, "alt") || false}
              name="alt"
              onChange={this.onModChange}
            />
          }
        />

        <FormControlLabel
          label="AltGr"
          control={
            <Checkbox
              checked={db.isInCategory(currentKeyCode, "altgr") || false}
              name="altgr"
              onChange={this.onModChange}
            />
          }
        />

        <FormControlLabel
          label="Gui"
          control={
            <Checkbox
              checked={db.isInCategory(currentKeyCode, "gui") || false}
              name="gui"
              onChange={this.onModChange}
            />
          }
        />
      </Paper>
    );

    return (
      <Grid container spacing={3}>
        <Grid item xs={10}>
          <Keyboard104
            {...this.props}
            currentKeyCode={keyCode}
            onKeySelect={this.onKeySelect}
          />
        </Grid>
        <Grid item xs={1}>
          {mods}
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(styles, { withTheme: true })(ModifierKeyboard104);
