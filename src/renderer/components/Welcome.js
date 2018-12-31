// -*- mode: js-jsx -*-
/* chrysalis-bundle-keyboardio -- Chrysalis Bundle for Keyboard.io
 * Copyright (C) 2018  Keyboardio, Inc.
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

import Focus from "@chrysalis-api/focus";

import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";

import BottomBar from "./BottomBar";
import UploadDialog from "./UploadDialog";

const styles = theme => ({
  paper: {
    height: "100%",
    padding: theme.spacing.unit * 2
  }
});

class Welcome extends React.Component {
  state = {
    factoryResetStarted: false
  };

  startFactoryReset = () => {
    this.setState({ factoryResetStarted: true });
  };
  cancelFactoryReset = () => {
    this.setState({ factoryResetStarted: false });
  };

  render() {
    let focus = new Focus();
    const { classes } = this.props;
    const { vendor, product } = focus.device.info;

    return (
      <React.Fragment>
        <Paper elevation={0} square className={classes.paper}>
          <Typography variant="h2" gutterBottom>
            Welcome to Chrysalis!
          </Typography>
          <Typography variant="body1" gutterBottom>
            {"Your keyboard ("}
            <em>
              {vendor} {product}
            </em>
            {
              ") is supported by Chrysalis, but the firmware it is using appears to be missing essential features. You can flash a firmware with reasonable defaults - including features essential for Chrysalis - by pressing the button below. By uploading this firmware, the currently used one will be replaced. Before continuing, please make sure you understand the consequences."
            }
          </Typography>
          <Button
            color="primary"
            variant="contained"
            onClick={this.startFactoryReset}
          >
            Flash a firmware update
          </Button>
          <UploadDialog
            onDisconnect={this.props.onDisconnect}
            toggleFlashing={this.props.toggleFlashing}
            onClose={this.cancelFactoryReset}
            open={this.state.factoryResetStarted}
          />
        </Paper>
        <BottomBar
          onDisconnect={this.props.onDisconnect}
          toggleFlashing={this.props.toggleFlashing}
        />
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(Welcome);
