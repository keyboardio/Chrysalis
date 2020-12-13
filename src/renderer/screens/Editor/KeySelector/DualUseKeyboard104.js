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

//import Checkbox from "@material-ui/core/Checkbox";
import FormControl from "@material-ui/core/FormControl";
import Grid from "@material-ui/core/Grid";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Paper from "@material-ui/core/Paper";
import Select from "@material-ui/core/Select";
import { withStyles } from "@material-ui/core/styles";

import { KeymapDB } from "../../../../api/keymap";
import { addDUM, addDUL } from "../../../../api/keymap/db/base/dualuse";
import { GuiLabel } from "../../../../api/keymap/db/base/gui";
const db = new KeymapDB();

import Keyboard104 from "./keyboard104";

const styles = theme => ({
  root: {
    margin: theme.spacing.unit
  }
});

class DualUseKeyboard104 extends React.Component {
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
    const mod = event.target.value;
    const baseKC = db.lookup(kc).baseCode || kc;
    const baseKey = db.lookup(baseKC);

    if (mod == "none") {
      return this.props.onKeySelect(baseKey);
    }

    this.props.onKeySelect(addDUM(baseKey, mod));
  };

  onLayerChange = event => {
    const kc = this.props.currentKeyCode;
    const layer = event.target.value;
    const baseKC = db.lookup(kc).baseCode || kc;
    const baseKey = db.lookup(baseKC);

    if (layer == "none") {
      return this.props.onKeySelect(baseKey);
    }

    this.props.onKeySelect(addDUL(baseKey, parseInt(layer)));
  };

  render() {
    const { classes, currentKeyCode } = this.props;

    let keyCode = currentKeyCode;
    let modifier = "none";
    let layer = "none";
    if (db.isInCategory(keyCode, "dualuse")) {
      keyCode = db.lookup(keyCode).baseCode;
      if (db.isInCategory(currentKeyCode, "modifiers")) {
        if (db.isInCategory(currentKeyCode, "ctrl")) {
          modifier = "ctrl";
        } else if (db.isInCategory(currentKeyCode, "shift")) {
          modifier = "shift";
        } else if (db.isInCategory(currentKeyCode, "alt")) {
          modifier = "alt";
        } else if (db.isInCategory(currentKeyCode, "altgr")) {
          modifier = "altgr";
        } else if (db.isInCategory(currentKeyCode, "gui")) {
          modifier = "gui";
        }
      } else {
        layer =
          (currentKeyCode - db.lookup(currentKeyCode).rangeStart - keyCode) /
          256;
      }
    }

    const dualuse = (
      <Paper elevation={0} className={classes.root}>
        <FormControl>
          <InputLabel id="dualuse-mod">Modifier</InputLabel>
          <Select
            labelId="dualuse-mod"
            value={modifier}
            onChange={this.onModChange}
          >
            <MenuItem value="none">None</MenuItem>
            <MenuItem value="ctrl">Control</MenuItem>
            <MenuItem value="shift">Shift</MenuItem>
            <MenuItem value="alt">Alt</MenuItem>
            <MenuItem value="altgr">AltGr</MenuItem>
            <MenuItem value="gui">{GuiLabel.full}</MenuItem>
          </Select>
        </FormControl>

        <FormControl>
          <InputLabel id="dualuse-layer">Layer</InputLabel>
          <Select
            labelId="dualuse-layer"
            value={layer}
            onChange={this.onLayerChange}
          >
            <MenuItem value="none">None</MenuItem>
            <MenuItem value={0}>0</MenuItem>
            <MenuItem value={1}>1</MenuItem>
            <MenuItem value={2}>2</MenuItem>
            <MenuItem value={3}>3</MenuItem>
            <MenuItem value={4}>4</MenuItem>
            <MenuItem value={5}>5</MenuItem>
            <MenuItem value={6}>6</MenuItem>
            <MenuItem value={7}>7</MenuItem>
          </Select>
        </FormControl>
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
          {dualuse}
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(styles, { withTheme: true })(DualUseKeyboard104);
