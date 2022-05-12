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

import React, { useState } from "react";
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

const FirmwareUpdate = (props) => {
  let focus = new Focus();

  const [firmwareFilename, setFirmwareFilename] = useState("");
  const [selected, setSelected] = useState("default");
  const [device, setDevice] = useState(
    props.device || focus.focusDeviceDescriptor
  );
  const [confirmationOpen, setConfirmationOpen] = useState(false);
  const [resetOnFlash, setResetOnFlash] = useState(false);
  const [activeStep, setActiveStep] = useState(-1);

  const toggleResetOnFlash = (event) => {
    setResetOnFlash(event.target.checked);
  };

  const openConfirmationDialog = () => {
    setConfirmationOpen(true);
  };
  const closeConfirmationDialog = () => {
    setConfirmationOpen(false);
  };

  const selectFirmware = (event) => {
    setSelected(event.target.value);
    if (event.target.value != "custom") {
      setFirmwareFilename("");
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
      setFirmwareFilename(result.filePaths[0]);
    });
  };

  const _defaultFirmwareFilename = () => {
    const { vendor, product } = device.info;
    const firmwareType = device.info.firmwareType || "hex";
    const cVendor = vendor.replace("/", ""),
      cProduct = product.replace("/", "");
    return path.join(
      getStaticPath(),
      cVendor,
      cProduct,
      "default." + firmwareType
    );
  };
  const _experimentalFirmwareFilename = () => {
    const { vendor, product } = device.info;
    const firmwareType = device.info.firmwareType || "hex";
    const cVendor = vendor.replace("/", ""),
      cProduct = product.replace("/", "");
    return path.join(
      getStaticPath(),
      cVendor,
      cProduct,
      "experimental." + firmwareType
    );
  };

  const _flash = async () => {
    let focus = new Focus();
    let filename;

    if (selected == "default") {
      filename = _defaultFirmwareFilename();
    } else if (selected == "experimental") {
      filename = _experimentalFirmwareFilename();
    } else {
      filename = firmwareFilename;
    }

    const nextStep = async (desiredState) => {
      setActiveStep(activeStep + 1);
      device.flashSteps.forEach((step, index) => {
        if (step == desiredState) {
          setActiveStep(index);
        }
      });
      return {
        activeStep: activeStep,
      };
    };

    const preferExternalFlasher =
      (await settings.get("flash.preferExternalFlasher")) &&
      (await checkExternalFlasher(device));
    return device.flash(focus._port, filename, {
      preferExternalFlasher: preferExternalFlasher,
      device: device,
      focus: focus,
      callback: nextStep,
    });
  };

  const upload = async () => {
    await props.toggleFlashing();

    try {
      await _flash();
      setActiveStep(activeStep + 1);
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
      setActiveStep(-1);
      toast.error(i18n.t("firmwareUpdate.flashing.error"), {
        closeButton: action,
      });
      props.toggleFlashing();
      props.onDisconnect();
      return;
    }

    return new Promise((resolve) => {
      setTimeout(() => {
        toast.success(i18n.t("firmwareUpdate.flashing.success"));

        props.toggleFlashing();
        props.onDisconnect();
        resolve();
      }, 1000);
    });
  };

  const replace = async () => {
    closeConfirmationDialog();
    setActiveStep(0);
    await clearEEPROM();
    return await upload();
  };

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
    <MenuItem value="experimental" selected={selected == "experimental"}>
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
    fs.accessSync(_experimentalFirmwareFilename(), fs.constants.R_OK);
  } catch (_) {
    hasExperimentalFirmware = false;
  }

  const defaultFirmwareItemText = i18n.t("firmwareUpdate.defaultFirmware", {
    version: version,
  });

  const defaultFirmwareItem = (
    <MenuItem value="default" selected={selected == "default"}>
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
    fs.accessSync(_defaultFirmwareFilename(), fs.constants.R_OK);
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
        value={selected}
        input={<Input id="selected-firmware" />}
        onChange={selectFirmware}
      >
        {hasDefaultFirmware && defaultFirmwareItem}
        {hasExperimentalFirmware && experimentalFirmwareItem}
        <MenuItem selected={selected == "custom"} value="custom">
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
      checked={resetOnFlash}
      value="resetOnFlash"
      onClick={toggleResetOnFlash}
    />
  );

  let steps = [];
  if (resetOnFlash) {
    steps = ["factoryRestore"];
  }
  if (device.flashSteps) {
    steps = steps.concat(device.flashSteps);
  } else {
    steps = steps.concat(["flash"]);
  }

  steps = steps.map((step) => {
    return i18n.t("firmwareUpdate.flashing.steps." + step);
  });

  const stepsWidget = (
    <Stepper activeStep={activeStep}>
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
            onClick={resetOnFlash ? openConfirmationDialog : upload}
            successMessage={i18n.t("firmwareUpdate.flashing.buttonSuccess")}
          >
            {i18n.t("firmwareUpdate.flashing.button")}
          </SaveChangesButton>
        </CardActions>
        {activeStep >= 0 && <CardContent>{stepsWidget}</CardContent>}
      </Card>
      <ConfirmationDialog
        title={i18n.t("firmwareUpdate.confirmDialog.title")}
        open={confirmationOpen}
        onConfirm={replace}
        onCancel={closeConfirmationDialog}
      >
        {i18n.t("firmwareUpdate.confirmDialog.contents")}
      </ConfirmationDialog>
    </div>
  );
};

export default FirmwareUpdate;
