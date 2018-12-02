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
import PropTypes from "prop-types";
import Electron from "electron";
import AvrGirl from "avrgirl-arduino";

import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import LinearProgress from "@material-ui/core/LinearProgress";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";

import { withSnackbar } from "notistack";

import Focus from "chrysalis-focus";

import SaveChangesButton from "./SaveChangesButton";

const styles = theme => ({
  root: {
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    display: "flex"
  },
  card: {
    margin: theme.spacing.unit * 2
  }
});

class KeyboardInfo extends React.Component {
  state = {
    firmwareFile: "",
    version: "",
    inProgress: false
  };

  updateVersion = async () => {
    await this.setState({ inProgress: true });

    let focus = new Focus(),
      version = await focus.command("version");

    this.setState({
      version: version,
      inProgress: false
    });
  };

  componentDidMount() {
    this.updateVersion();
  }

  selectFirmware = () => {
    let files = Electron.remote.dialog.showOpenDialog({
      title: "Select a firmware",
      filters: [
        {
          name: "Firmware files",
          extensions: ["hex"]
        },
        {
          name: "All files",
          extensions: ["*"]
        }
      ]
    });
    if (files) this.setState({ firmwareFile: files[0] });
  };

  _flashDebug = (message, ...args) => {
    if (message == "found port on") {
      this._portName = args[0];
    }
    console.log(message, ...args);
  };

  _flash = () => {
    let avrgirl = new AvrGirl({
      board: {
        name: "Keyboard.io Model 01",
        baud: 9600,
        productId: ["0x2300", "0x2301"],
        protocol: "avr109",
        signature: new Buffer.from([0x43, 0x41, 0x54, 0x45, 0x52, 0x49, 0x4e])
      },
      debug: this._flashDebug
    });
    avrgirl.connection.debug = this._flashDebug;

    return new Promise((resolve, reject) => {
      avrgirl.flash(this.state.firmwareFile, error => {
        if (error) {
          avrgirl.connection.serialPort.close();
          reject(error);
        } else {
          setTimeout(() => {
            resolve();
          }, 2000);
        }
      });
    });
  };

  upload = async () => {
    let focus = new Focus();

    await focus.close();

    try {
      await this._flash();
    } catch (e) {
      this.props.enqueueSnackbar("Error flashing the firmware", {
        variant: "error"
      });
      this.props.onDisconnect();
      return;
    }

    console.log("Reattaching to", this._portName);
    await focus.open(this._portName);
    await this.updateVersion();
  };

  render() {
    const { classes } = this.props;

    let filename = this.state.firmwareFile.split(/[\\/]/);
    filename = filename[filename.length - 1];

    let version;
    if (this.state.version) {
      version = (
        <Card className={classes.card}>
          <CardHeader title="Firmware" />
          <CardContent>
            <Typography component="code" variant="body2" color="textSecondary">
              {this.state.version}
            </Typography>
          </CardContent>
        </Card>
      );
    }

    return (
      <div>
        {this.state.inProgress && <LinearProgress variant="query" />}
        <div className={classes.root}>
          <Card className={classes.card}>
            <CardHeader title="Flashing" />
            <CardContent>
              <List>
                <ListItem button onClick={this.selectFirmware}>
                  <ListItemText
                    primary="Selected firmware"
                    secondary={filename}
                  />
                </ListItem>
              </List>
            </CardContent>
            <CardActions>
              <SaveChangesButton
                onClick={this.upload}
                disabled={this.state.firmwareFile.length == 0}
                successMessage="Uploaded!"
              >
                Upload
              </SaveChangesButton>
            </CardActions>
          </Card>
          {version}
        </div>
      </div>
    );
  }
}

KeyboardInfo.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withSnackbar(withStyles(styles)(KeyboardInfo));
