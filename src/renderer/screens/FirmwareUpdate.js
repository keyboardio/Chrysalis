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
import Electron from "electron";
import path from "path";
import fs from "fs";
import { version } from "../../../package.json";

import Focus from "@chrysalis-api/focus";

import BuildIcon from "@material-ui/icons/Build";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
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
import SaveChangesButton from "../components/SaveChangesButton";
import i18n from "../i18n";

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
  constructor(props) {
    super(props);

    let focus = new Focus();

    this.state = {
      anchorEl: null,
      firmwareFilename: "",
      device: props.device || focus.device
    };
  }

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
      title: i18n.firmwareUpdate.dialog.selectFirmware,
      filters: [
        {
          name: i18n.firmwareUpdate.dialog.firmwareFiles,
          extensions: ["hex"]
        },
        {
          name: i18n.firmwareUpdate.dialog.allFiles,
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

  _defaultFirmwareFilename = () => {
    const { vendor, product } = this.state.device.info;
    return path.join(getStaticPath(), vendor, product, "default.hex");
  };

  _flash = async () => {
    let focus = new Focus();
    const filename =
      this.state.firmwareFilename || this._defaultFirmwareFilename();

    return this.state.device.flash(focus._port, filename);
  };

  upload = async () => {
    await this.props.toggleFlashing();

    try {
      await this._flash();
    } catch (e) {
      console.error(e);
      this.props.enqueueSnackbar(i18n.firmwareUpdate.flashing.error, {
        variant: "error"
      });
      this.props.toggleFlashing();
      this.props.onDisconnect();
      return;
    }

    return new Promise(resolve => {
      setTimeout(() => {
        this.props.enqueueSnackbar(i18n.firmwareUpdate.flashing.success, {
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
    let focus = new Focus();

    let filename = null;
    if (firmwareFilename) {
      filename = firmwareFilename.split(/[\\/]/);
      filename = filename[filename.length - 1];
    }

    const defaultFirmwareItemText = i18n.formatString(
      i18n.firmwareUpdate.defaultFirmware,
      version
    );
    const defaultFirmwareItem = (
      <MenuItem
        selected={firmwareFilename == ""}
        onClick={this.selectDefaultFirmware}
      >
        <ListItemIcon>
          <SettingsBackupRestoreIcon />
        </ListItemIcon>
        <ListItemText primary={defaultFirmwareItemText} />
      </MenuItem>
    );
    let hasDefaultFirmware = true;
    try {
      fs.accessSync(this._defaultFirmwareFilename(), fs.constants.R_OK);
    } catch (_) {
      hasDefaultFirmware = false;
    }

    const selectedFirmware =
      filename || (hasDefaultFirmware ? defaultFirmwareItemText : "");

    const tooling = focus.device && focus.device.flashTool && (
      <Typography component="p" gutterBottom>
        {i18n.formatString(i18n.firmwareUpdate.tooling, focus.device.flashTool)}
      </Typography>
    );

    return (
      <div className={classes.root}>
        <Portal container={this.props.titleElement}>
          {i18n.app.menu.firmwareUpdate}
        </Portal>
        <Card className={classes.card}>
          <CardContent>
            <Typography variant="h5" component="h2" gutterBottom>
              {i18n.firmwareUpdate.updatingTitle}
            </Typography>
            <Typography component="p" gutterBottom>
              {i18n.formatString(
                i18n.firmwareUpdate.description,
                i18n.firmwareUpdate.flashing.button
              )}
            </Typography>
            {tooling}
            <Typography component="p" gutterBottom>
              {i18n.firmwareUpdate.postUpload}
            </Typography>
            <Typography component="p">
              {i18n.formatString(
                i18n.firmwareUpdate.repo,
                <a href="https://github.com/keyboardio/Chrysalis-Firmware-Bundle#readme">
                  Chrysalis-Firmware-Bundle
                </a>
              )}
            </Typography>
          </CardContent>
          <Divider variant="middle" />
          <CardActions>
            <List component="nav">
              <ListItem button onClick={this.openFirmwareMenu}>
                <ListItemText
                  primary={i18n.firmwareUpdate.selected}
                  secondary={selectedFirmware}
                />
              </ListItem>
            </List>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={this.closeFirmwareMenu}
            >
              {hasDefaultFirmware && defaultFirmwareItem}
              <MenuItem
                selected={firmwareFilename != ""}
                onClick={this.selectCustomFirmware}
              >
                <ListItemIcon>
                  <BuildIcon />
                </ListItemIcon>
                <ListItemText primary={i18n.firmwareUpdate.custom} />
              </MenuItem>
            </Menu>
            <div className={classes.grow} />
            <SaveChangesButton
              icon={<CloudUploadIcon />}
              onClick={this.upload}
              successMessage={i18n.firmwareUpdate.flashing.buttonSuccess}
            >
              {i18n.firmwareUpdate.flashing.button}
            </SaveChangesButton>
          </CardActions>
        </Card>
      </div>
    );
  }
}

export default withSnackbar(withStyles(styles)(FirmwareUpdate));
