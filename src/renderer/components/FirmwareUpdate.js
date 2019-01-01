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
import Electron from "electron";
import path from "path";

import Focus from "@chrysalis-api/focus";

import BuildIcon from "@material-ui/icons/Build";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Portal from "@material-ui/core/Portal";
import SettingsBackupRestoreIcon from "@material-ui/icons/SettingsBackupRestore";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";

import { withSnackbar } from "notistack";

import { getStaticPath } from "../config";
import SaveChangesButton from "./SaveChangesButton";

const styles = theme => ({
  root: {
    display: "flex",
    justifyContent: "center"
  },
  card: {
    margin: theme.spacing.unit * 4,
    maxWidth: "50%"
  },
  grow: {
    flexGrow: 1
  }
});

class FirmwareUpdate extends React.Component {
  state = {
    anchorEl: null,
    firmwareFilename: ""
  };

  openFirmwareMenu = event => {
    this.setState({ anchorEl: event.currentTarget });
  };
  closeFirmwareMenu = () => {
    this.setState({ anchorEl: null });
  };

  selectDefaultFirmware = () => {
    this.setState({
      anchorEl: null,
      firmwareFilename: ""
    });
  };

  selectCustomFirmware = () => {
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
    if (files) {
      this.setState({
        firmwareFilename: files[0],
        anchorEl: null
      });
    } else {
      this.setState({ anchorEl: null });
    }
  };

  _flash = async () => {
    let focus = new Focus();
    const { vendor, product } = focus.device.info;
    const filename =
      this.state.firmwareFilename ||
      path.join(getStaticPath(), vendor, product, "default.hex");

    return focus.device.flash(focus._port, filename);
  };

  upload = async () => {
    await this.props.toggleFlashing();

    try {
      await this._flash();
    } catch (e) {
      console.error(e);
      this.props.enqueueSnackbar("Error flashing the firmware", {
        variant: "error"
      });
      this.props.toggleFlashing();
      this.props.onDisconnect();
      return;
    }

    return new Promise(resolve => {
      setTimeout(() => {
        this.props.enqueueSnackbar("Firmware flashed successfully!", {
          variant: "success"
        });

        this.props.toggleFlashing();
        resolve();
      }, 1000);
    });
  };

  render() {
    const { classes } = this.props;
    const { anchorEl, firmwareFilename } = this.state;

    let filename = null;
    if (firmwareFilename) {
      filename = firmwareFilename.split(/[\\/]/);
      filename = filename[filename.length - 1];
    }
    const selectedFirmware = filename || "Default firmware";

    let focus = new Focus();

    return (
      <div className={classes.root}>
        <Portal container={this.props.titleElement}>Firmware update</Portal>
        <Card className={classes.card}>
          <CardContent>
            <Typography variant="h5" component="h2" gutterBottom>
              Updating the firmware
            </Typography>
            <Typography component="p" gutterBottom>
              {
                "Updating the firmware is a safe process, it's very hard to brick your keyboard even with bad firmware, as most keyboards provide a way to go stay in bootloader mode, where new firmware can be flashed. Nevertheless, updating the firmware will overwrite the previous one. If you customised your firmware, make sure you're flashing one that you are comfortable with. "
              }
              {focus.device.messages.preFlash}
            </Typography>
            <Typography component="p">
              {
                "Once the upload is finished - either successfully or with errors -, you will be taken back to the initial keyboard selection screen. This is normal."
              }
            </Typography>
          </CardContent>
          <Divider variant="middle" />
          <CardActions>
            <List component="nav">
              <ListItem button onClick={this.openFirmwareMenu}>
                <ListItemText
                  primary="Selected firmware"
                  secondary={selectedFirmware}
                />
              </ListItem>
            </List>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={this.closeFirmwareMenu}
            >
              <MenuItem
                selected={firmwareFilename == ""}
                onClick={this.selectDefaultFirmware}
              >
                <ListItemIcon>
                  <SettingsBackupRestoreIcon />
                </ListItemIcon>
                <ListItemText primary="Default firmware" />
              </MenuItem>
              <MenuItem
                selected={firmwareFilename != ""}
                onClick={this.selectCustomFirmware}
              >
                <ListItemIcon>
                  <BuildIcon />
                </ListItemIcon>
                <ListItemText primary="Custom firmware" />
              </MenuItem>
            </Menu>
            <div className={classes.grow} />
            <SaveChangesButton onClick={this.upload} successMessage="Updated!">
              Update
            </SaveChangesButton>
          </CardActions>
        </Card>
      </div>
    );
  }
}

export default withSnackbar(withStyles(styles)(FirmwareUpdate));
