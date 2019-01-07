// -*- mode: js-jsx -*-
/* Chrysalis -- Kaleidoscope Command Center
 * Copyright (C) 2018, 2019  Keyboardio, Inc.
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
import PropTypes from "prop-types";
import Electron from "electron";

import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Paper from "@material-ui/core/Paper";
import Portal from "@material-ui/core/Portal";
import Switch from "@material-ui/core/Switch";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    margin: theme.spacing.unit * 3
  }
});

class Settings extends React.Component {
  state = {
    devTools: false
  };

  componentDidMount() {
    const webContents = Electron.remote.getCurrentWebContents();
    this.setState({ devTools: webContents.isDevToolsOpened() });
    webContents.on("devtools-opened", () => {
      this.setState({ devTools: true });
    });
    webContents.on("devtools-closed", () => {
      this.setState({ devTools: false });
    });
  }

  toggleDevTools = event => {
    this.setState({ devTools: event.target.checked });
    if (event.target.checked) {
      Electron.remote.getCurrentWebContents().openDevTools();
    } else {
      Electron.remote.getCurrentWebContents().closeDevTools();
    }
  };

  render() {
    const { classes } = this.props;

    return (
      <Paper elevation={1} className={classes.root}>
        <Portal container={this.props.titleElement}>Settings</Portal>
        <FormGroup row>
          <FormControlLabel
            control={
              <Switch
                checked={this.state.devTools}
                onChange={this.toggleDevTools}
                value="devtools"
              />
            }
            label="Developer tools"
          />
        </FormGroup>
      </Paper>
    );
  }
}

Settings.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Settings);
