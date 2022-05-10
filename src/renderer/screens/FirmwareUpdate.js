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

import BuildIcon from "@mui/icons-material/Build";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import Divider from "@mui/material/Divider";
import ExploreIcon from "@mui/icons-material/ExploreOutlined";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import SettingsBackupRestoreIcon from "@mui/icons-material/SettingsBackupRestore";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Switch from "@mui/material/Switch";
import Typography from "@mui/material/Typography";

import { toast } from "react-toastify";
const Store = require("electron-store");
const settings = new Store();

import { getStaticPath } from "../config";
import ConfirmationDialog from "../components/ConfirmationDialog";
import SaveChangesButton from "../components/SaveChangesButton";
import i18n from "../i18n";

import clearEEPROM from "../utils/clearEEPROM";
import checkExternalFlasher from "../utils/checkExternalFlasher";
import { PageTitle } from "../components/PageTitle";

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
      activeStep: -1,
    };
  }

  setResetOnFlash = (event) => {
    this.setState({
      resetOnFlash: event.target.checked,
    });
  };

  openConfirmationDialog = () => {
    this.setState({ confirmationOpen: true });
  };
  closeConfirmationDialog = () => {
    this.setState({ confirmationOpen: false });
  };

  selectFirmware = (event) => {
    this.setState({ selected: event.target.value });
    if (event.target.value != "custom") {
      return this.setState({ firmwareFilename: "" });
    }

    let files = Electron.remote.dialog.showOpenDialog({
      title: i18n.t("firmwareUpdate.dialog.selectFirmware"),
      filters: [
        {
          name: i18n.t("firmwareUpdate.dialog.firmwareFiles"),
          extensions: ["hex", "bin"],
        },
        {
          name: i18n.t("firmwareUpdate.dialog.allFiles"),
          extensions: ["*"],
        },
      ],
    });
    files.then((result) => {
      this.setState({ firmwareFilename: result.filePaths[0] });
    });
  };

  _defaultFirmwareFilename = () => {
    const { vendor, product } = this.state.device.info;
    const firmwareType = this.state.device.info.firmwareType || "hex";
    const cVendor = vendor.replace("/", ""),
      cProduct = product.replace("/", "");
    return path.join(
      getStaticPath(),
      cVendor,
      cProduct,
      "default." + firmwareType
    );
  };
  _experimentalFirmwareFilename = () => {
    const { vendor, product } = this.state.device.info;
    const firmwareType = this.state.device.info.firmwareType || "hex";
    const cVendor = vendor.replace("/", ""),
      cProduct = product.replace("/", "");
    return path.join(
      getStaticPath(),
      cVendor,
      cProduct,
      "experimental." + firmwareType
    );
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
    const nextStep = async (desiredState) => {
      return _this.setState((state) => {
        let activeStep = state.activeStep + 1;
        _this.state.device.flashSteps.forEach((step, index) => {
          if (step == desiredState) activeStep = index;
        });
        return {
          activeStep: activeStep,
        };
      });
    };

    const preferExternalFlasher =
      (await settings.get("flash.preferExternalFlasher")) &&
      (await checkExternalFlasher(this.state.device));
    return this.state.device.flash(focus._port, filename, {
      preferExternalFlasher: preferExternalFlasher,
      device: this.state.device,
      focus: focus,
      callback: nextStep,
    });
  };

  upload = async () => {
    await this.props.toggleFlashing();

    try {
      await this._flash();
      await this.setState((state) => ({
        activeStep: state.activeStep + 1,
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
        closeButton: action,
      });
      this.props.toggleFlashing();
      this.props.onDisconnect();
      return;
    }

    return new Promise((resolve) => {
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
      version: version,
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
      <FormControl
        sx={{
          marginLeft: 2,
        }}
      >
        <InputLabel shrink htmlFor="selected-firmware">
          {i18n.t("firmwareUpdate.selected")}
        </InputLabel>
        <Select
          sx={{
            display: "flex",
            minWidth: "15em",
          }}
          value={this.state.selected}
          input={<Input id="selected-firmware" />}
          onChange={this.selectFirmware}
        >
          {hasDefaultFirmware && defaultFirmwareItem}
          {hasExperimentalFirmware && experimentalFirmwareItem}
          <MenuItem selected={this.state.selected == "custom"} value="custom">
            <ListItemIcon
              sx={{
                marginTop: "auto",
                marginBottom: "auto",
              }}
            >
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

    steps = steps.map((step) => {
      return i18n.t("firmwareUpdate.flashing.steps." + step);
    });

    const stepsWidget = (
      <Stepper activeStep={this.state.activeStep}>
        {steps.map((label) => {
          return (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
    );

    return (
      <div
        sx={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <PageTitle title={i18n.t("app.menu.firmwareUpdate")} />
        <Card
          sx={{
            my: 4,
            mx: "auto",
            maxWidth: "50%",
          }}
        >
          <CardContent>
            <Typography component="p" gutterBottom>
              {i18n.t("firmwareUpdate.description")}
            </Typography>
            <Typography component="p" gutterBottom sx={{ textAlign: "center" }}>
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
            <FormControl sx={{ display: "block" }}>
              <FormControlLabel
                control={resetOnFlashSwitch}
                sx={{
                  flexGrow: 1,
                  display: "flex",
                  marginRight: 2,
                }}
                labelPlacement="end"
                label={i18n.t("firmwareUpdate.options.onFlash")}
              />
            </FormControl>
          </CardContent>
          <Divider variant="middle" />
          <CardActions>
            {firmwareSelect}
            <div sx={{ flexGrow: 1 }} />
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

export default FirmwareUpdate;
