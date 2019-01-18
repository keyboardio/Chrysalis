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
import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import MenuItem from "@material-ui/core/MenuItem";
import Portal from "@material-ui/core/Portal";
import Select from "@material-ui/core/Select";
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
  },
  dropdown: {
    display: "flex"
  },
  custom: {
    marginTop: "auto",
    marginBottom: "auto"
  },
  repo: {
    textAlign: "center"
  }
});

class FirmwareUpdate extends React.Component {
  constructor(props) {
    super(props);

    let focus = new Focus();

    this.state = {
      firmwareFilename: "",
      device: props.device || focus.device
    };
  }

  selectFirmware = event => {
    if (event.target.value != "custom") {
      return this.setState({ firmwareFilename: "" });
    }

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
      this.setState({ firmwareFilename: files[0] });
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
        this.props.onDisconnect();
        resolve();
      }, 1000);
    });
  };

  render() {
    const { classes } = this.props;
    const { firmwareFilename } = this.state;

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
        value="default"
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

    const firmwareSelect = (
      <FormControl>
        <InputLabel shrink htmlFor="selected-firmware">
          {i18n.firmwareUpdate.selected}
        </InputLabel>
        <Select
          classes={{ select: classes.dropdown }}
          value={firmwareFilename ? "custom" : "default"}
          input={<Input id="selected-firmware" />}
          onChange={this.selectFirmware}
        >
          {hasDefaultFirmware && defaultFirmwareItem}
          <MenuItem selected={firmwareFilename != ""} value="custom">
            <ListItemIcon className={classes.custom}>
              <BuildIcon />
            </ListItemIcon>
            <ListItemText
              primary={i18n.firmwareUpdate.custom}
              secondary={filename}
            />
          </MenuItem>
        </Select>
      </FormControl>
    );

    return (
      <div className={classes.root}>
        <Portal container={this.props.titleElement}>
          {i18n.app.menu.firmwareUpdate}
        </Portal>
        <Card className={classes.card}>
          <CardContent>
            <Typography component="p" gutterBottom>
              {i18n.firmwareUpdate.description}
            </Typography>
            <Typography component="p" gutterBottom className={classes.repo}>
              <a href="https://github.com/keyboardio/Chrysalis-Firmware-Bundle#readme">
                Chrysalis-Firmware-Bundle
              </a>
            </Typography>
            <Typography component="p" gutterBottom>
              {i18n.firmwareUpdate.postUpload}
            </Typography>
          </CardContent>
          <Divider variant="middle" />
          <CardActions>
            {firmwareSelect}
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
