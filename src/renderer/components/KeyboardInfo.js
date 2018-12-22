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
import path from "path";

import Button from "@material-ui/core/Button";
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

import Focus from "@chrysalis-api/focus";

import { getStaticPath } from "../config";
import UploadDialog from "./KeyboardInfo/UploadDialog";

const styles = theme => ({
  root: {
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    display: "flex"
  },
  card: {
    margin: theme.spacing.unit * 2,
    display: "flex",
    flexDirection: "column"
  },
  cardContent: {
    display: "block",
    "& p": {
      marginTop: theme.spacing.unit * 2
    }
  }
});

class KeyboardInfo extends React.Component {
  state = {
    firmwareFile: "",
    version: "",
    inProgress: false,
    uploadInitiated: false
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

  initiateUpload = () => {
    this.setState({ uploadInitiated: true });
  };

  cleanupUpload = () => {
    this.setState({ uploadInitiated: false });
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

    let focus = new Focus(),
      device = focus.device.info;

    let urls =
      device.urls &&
      device.urls.map(({ name, url }) => {
        return (
          <Button color="primary" key={name} href={url}>
            {name}
          </Button>
        );
      });

    let factoryFirmware = path.join(getStaticPath(), "/Model01-Firmware.hex");

    return (
      <div>
        {this.state.inProgress && <LinearProgress variant="query" />}
        <div className={classes.root}>
          <Card className={classes.card}>
            <CardHeader title={`${device.vendor} ${device.product}`} />
            <CardContent className={classes.cardContent}>
              <Typography color="textSecondary">
                Open on {focus._port.path}
              </Typography>
              <Typography>
                <Button
                  color="secondary"
                  variant="outlined"
                  onClick={this.initiateUpload}
                >
                  Flash factory firmware
                </Button>
                <UploadDialog
                  onClose={this.cleanupUpload}
                  onDisconnect={this.props.onDisconnect}
                  toggleFlashing={this.props.toggleFlashing}
                  filename={factoryFirmware}
                  open={this.state.uploadInitiated}
                />
              </Typography>
            </CardContent>
            {urls && <CardActions>{urls}</CardActions>}
          </Card>
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
              <Button
                color="primary"
                variant="contained"
                onClick={this.initiateUpload}
                disabled={
                  this.state.firmwareFile.length == 0 ||
                  this.state.uploadInitiated
                }
              >
                Upload
              </Button>
              <UploadDialog
                onClose={this.cleanupUpload}
                onDisconnect={this.props.onDisconnect}
                toggleFlashing={this.props.toggleFlashing}
                filename={this.state.firmwareFile}
                open={this.state.uploadInitiated}
              />
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
