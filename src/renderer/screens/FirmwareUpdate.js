// -*- mode: js-jsx -*-
/* Chrysalis -- Kaleidoscope Command Center
 * Copyright (C) 2018, 2019, 2020  Keyboardio, Inc.
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

import Focus from "../../api/focus";

import BuildIcon from "@material-ui/icons/Build";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import Divider from "@material-ui/core/Divider";
import ExploreIcon from "@material-ui/icons/ExploreOutlined";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import MenuItem from "@material-ui/core/MenuItem";
import Portal from "@material-ui/core/Portal";
import Select from "@material-ui/core/Select";
import SettingsBackupRestoreIcon from "@material-ui/icons/SettingsBackupRestore";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Switch from "@material-ui/core/Switch";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";

import { toast } from "react-toastify";
import settings from "electron-settings";

import { getStaticPath } from "../config";
import ConfirmationDialog from "../components/ConfirmationDialog";
import SaveChangesButton from "../components/SaveChangesButton";
import i18n from "../i18n";

import clearEEPROM from "../utils/clearEEPROM";
import checkExternalFlasher from "../utils/checkExternalFlasher";

const styles = theme => ({
  root: {
    display: "flex",
    justifyContent: "center"
  },
  card: {
    margin: theme.spacing(4),
    maxWidth: "50%"
  },
  grow: {
    flexGrow: 1
  },
  dropdown: {
    display: "flex",
    minWidth: "15em"
  },
  custom: {
    marginTop: "auto",
    marginBottom: "auto"
  },
  repo: {
    textAlign: "center"
  },
  firmwareSelect: {
    marginLeft: theme.spacing(2)
  },
  control: {
    display: "flex",
    marginRight: theme.spacing(2)
  },
  group: {
    display: "block"
  }
});

class FirmwareUpdate extends React.Component {
  constructor(props) {
    super(props);

    let focus = new Focus();

    this.state = {
      firmwareFilename: "",
      selected: "default",
      device: props.device || focus.device,
      confirmationOpen: false,
      resetOnFlash: false,
      activeStep: -1
    };
  }

  setResetOnFlash = event => {
    this.setState({
      resetOnFlash: event.target.checked
    });
  };

  openConfirmationDialog = () => {
    this.setState({ confirmationOpen: true });
  };
  closeConfirmationDialog = () => {
    this.setState({ confirmationOpen: false });
  };

  selectFirmware = event => {
    this.setState({ selected: event.target.value });
    if (event.target.value != "custom") {
      return this.setState({ firmwareFilename: "" });
    }

    let files = Electron.remote.dialog.showOpenDialog({
      title: i18n.t("firmwareUpdate.dialog.selectFirmware"),
      filters: [
        {
          name: i18n.t("firmwareUpdate.dialog.firmwareFiles"),
          extensions: ["hex"]
        },
        {
          name: i18n.t("firmwareUpdate.dialog.allFiles"),
          extensions: ["*"]
        }
      ]
    });
    files.then(result => {
      this.setState({ firmwareFilename: result.filePaths[0] });
    });
  };

  _defaultFirmwareFilename = () => {
    const { vendor, product } = this.state.device.info;
    const cVendor = vendor.replace("/", ""),
      cProduct = product.replace("/", "");
    return path.join(getStaticPath(), cVendor, cProduct, "default.hex");
  };
  _experimentalFirmwareFilename = () => {
    const { vendor, product } = this.state.device.info;
    const cVendor = vendor.replace("/", ""),
      cProduct = product.replace("/", "");
    return path.join(getStaticPath(), cVendor, cProduct, "experimental.hex");
  };

  _flash = async () => {
    let focus = new Focus();
    let filename;

    if (this.state.selected == "default") {
      filename = this._defaultFirmwareFilename();
    } else if (this.state.selected == "experimental") {
      filename = this._experimentalFirmwareFilename();
    } else {
      filename = this.state.firmwareFilename;
    }

    const _this = this;
    const nextStep = async desiredState => {
      return _this.setState(state => {
        let activeStep = state.activeStep + 1;
        _this.state.device.flashSteps.forEach((step, index) => {
          if (step == desiredState) activeStep = index;
        });
        return {
          activeStep: activeStep
        };
      });
    };

    const preferExternalFlasher =
      settings.get("flash.preferExternalFlasher") &&
      (await checkExternalFlasher(this.state.device));
    return this.state.device.flash(focus._port, filename, {
      preferExternalFlasher: preferExternalFlasher,
      device: this.state.device,
      focus: focus,
      callback: nextStep
    });
  };

  upload = async () => {
    await this.props.toggleFlashing();

    try {
      await this._flash();
      await this.setState(state => ({
        activeStep: state.activeStep + 1
      }));
    } catch (e) {
      console.error(e);
      const action = ({ closeToast }) => (
        <React.Fragment>
          <Button
            variant="contained"
            onClick={() => {
              const shell = Electron.remote && Electron.remote.shell;
              shell.openExternal(
                "https://github.com/keyboardio/Chrysalis/wiki/Troubleshooting"
              );
            }}
          >
            Troubleshooting
          </Button>
          <Button onClick={closeToast}>Dismiss</Button>
        </React.Fragment>
      );
      this.setState({ activeStep: -1 });
      toast.error(i18n.t("firmwareUpdate.flashing.error"), {
        closeButton: action
      });
      this.props.toggleFlashing();
      this.props.onDisconnect();
      return;
    }

    return new Promise(resolve => {
      setTimeout(() => {
        toast.success(i18n.t("firmwareUpdate.flashing.success"));

        this.props.toggleFlashing();
        this.props.onDisconnect();
        resolve();
      }, 1000);
    });
  };

  replace = async () => {
    this.closeConfirmationDialog();
    await this.setState({ activeState: 0 });
    await clearEEPROM();
    return await this.upload();
  };

  render() {
    const { classes } = this.props;
    const { firmwareFilename } = this.state;

    let filename = null;
    if (firmwareFilename) {
      filename = firmwareFilename.split(/[\\/]/);
      filename = filename[filename.length - 1];
    }

    const experimentalFirmwareItemText = i18n.t(
      "firmwareUpdate.experimentalFirmware",
      { version: version }
    );
    const experimentalFirmwareItem = (
      <MenuItem
        value="experimental"
        selected={this.state.selected == "experimental"}
      >
        <ListItemIcon>
          <ExploreIcon />
        </ListItemIcon>
        <ListItemText
          primary={experimentalFirmwareItemText}
          secondary={i18n.t("firmwareUpdate.experimentalFirmwareDescription")}
        />
      </MenuItem>
    );
    let hasExperimentalFirmware = true;

    try {
      fs.accessSync(this._experimentalFirmwareFilename(), fs.constants.R_OK);
    } catch (_) {
      hasExperimentalFirmware = false;
    }

    const defaultFirmwareItemText = i18n.t("firmwareUpdate.defaultFirmware", {
      version: version
    });
    const defaultFirmwareItem = (
      <MenuItem value="default" selected={this.state.selected == "default"}>
        <ListItemIcon>
          <SettingsBackupRestoreIcon />
        </ListItemIcon>
        <ListItemText
          primary={defaultFirmwareItemText}
          secondary={
            hasExperimentalFirmware &&
            i18n.t("firmwareUpdate.defaultFirmwareDescription")
          }
        />
      </MenuItem>
    );
    let hasDefaultFirmware = true;
    try {
      fs.accessSync(this._defaultFirmwareFilename(), fs.constants.R_OK);
    } catch (_) {
      hasDefaultFirmware = false;
    }

    const firmwareSelect = (
      <FormControl className={classes.firmwareSelect}>
        <InputLabel shrink htmlFor="selected-firmware">
          {i18n.t("firmwareUpdate.selected")}
        </InputLabel>
        <Select
          classes={{ select: classes.dropdown }}
          value={this.state.selected}
          input={<Input id="selected-firmware" />}
          onChange={this.selectFirmware}
        >
          {hasDefaultFirmware && defaultFirmwareItem}
          {hasExperimentalFirmware && experimentalFirmwareItem}
          <MenuItem selected={this.state.selected == "custom"} value="custom">
            <ListItemIcon className={classes.custom}>
              <BuildIcon />
            </ListItemIcon>
            <ListItemText
              primary={i18n.t("firmwareUpdate.custom")}
              secondary={filename}
            />
          </MenuItem>
        </Select>
      </FormControl>
    );

    const resetOnFlashSwitch = (
      <Switch
        checked={this.state.resetOnFlash}
        value="resetOnFlash"
        onClick={this.setResetOnFlash}
      />
    );

    let steps = [];
    if (this.state.resetOnFlash) {
      steps = ["factoryRestore"];
    }
    if (this.state.device.flashSteps) {
      steps = steps.concat(this.state.device.flashSteps);
    } else {
      steps = steps.concat(["flash"]);
    }

    steps = steps.map(step => {
      return i18n.t("firmwareUpdate.flashing.steps." + step);
    });

    const stepsWidget = (
      <Stepper activeStep={this.state.activeStep}>
        {steps.map(label => {
          return (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
    );

    return (
      <div className={classes.root}>
        <Portal container={this.props.titleElement}>
          {i18n.t("app.menu.firmwareUpdate")}
        </Portal>
        <Card className={classes.card}>
          <CardContent>
            <Typography component="p" gutterBottom>
              {i18n.t("firmwareUpdate.description")}
            </Typography>
            <Typography component="p" gutterBottom className={classes.repo}>
              <a href="https://github.com/keyboardio/Chrysalis-Firmware-Bundle#readme">
                Chrysalis-Firmware-Bundle
              </a>
            </Typography>
            <Typography component="p" gutterBottom>
              {i18n.t("hardware.updateInstructions")}
            </Typography>
            <Typography component="p" gutterBottom>
              {i18n.t("firmwareUpdate.postUpload")}
            </Typography>
          </CardContent>
          <Divider variant="middle" />
          <CardContent>
            <Typography variant="subtitle1">
              {i18n.t("firmwareUpdate.options.title")}
            </Typography>
            <FormControl className={classes.group}>
              <FormControlLabel
                className={classes.control}
                control={resetOnFlashSwitch}
                classes={{ label: classes.grow }}
                labelPlacement="end"
                label={i18n.t("firmwareUpdate.options.onFlash")}
              />
            </FormControl>
          </CardContent>
          <Divider variant="middle" />
          <CardActions>
            {firmwareSelect}
            <div className={classes.grow} />
            <SaveChangesButton
              icon={<CloudUploadIcon />}
              onClick={
                this.state.resetOnFlash
                  ? this.openConfirmationDialog
                  : this.upload
              }
              successMessage={i18n.t("firmwareUpdate.flashing.buttonSuccess")}
            >
              {i18n.t("firmwareUpdate.flashing.button")}
            </SaveChangesButton>
          </CardActions>
          {this.state.activeStep >= 0 && (
            <CardContent>{stepsWidget}</CardContent>
          )}
        </Card>
        <ConfirmationDialog
          title={i18n.t("firmwareUpdate.confirmDialog.title")}
          open={this.state.confirmationOpen}
          onConfirm={this.replace}
          onCancel={this.closeConfirmationDialog}
        >
          {i18n.t("firmwareUpdate.confirmDialog.contents")}
        </ConfirmationDialog>
      </div>
    );
  }
}

export default withStyles(styles)(FirmwareUpdate);
