// -*- mode: js-jsx -*-
/* Chrysalis -- Kaleidoscope Command Center
 * Copyright (C) 2018-2022  Keyboardio, Inc.
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

import Focus from "@api/focus";
import BuildIcon from "@mui/icons-material/Build";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import ExploreIcon from "@mui/icons-material/ExploreOutlined";
import SettingsBackupRestoreIcon from "@mui/icons-material/SettingsBackupRestore";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Divider from "@mui/material/Divider";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Stepper from "@mui/material/Stepper";
import Switch from "@mui/material/Switch";
import Typography from "@mui/material/Typography";
import ConfirmationDialog from "@renderer/components/ConfirmationDialog";
import { PageTitle } from "@renderer/components/PageTitle";
import SaveChangesButton from "@renderer/components/SaveChangesButton";
import { getStaticPath } from "@renderer/config";
import checkExternalFlasher from "@renderer/utils/checkExternalFlasher";
import clearEEPROM from "@renderer/utils/clearEEPROM";
import { version } from "@root/package.json";
import { Electron, ipcRenderer } from "electron";
import fs from "fs";
import path from "path";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";

const Store = require("electron-store");
const settings = new Store();

const FirmwareUpdate = (props) => {
  const focus = new Focus();

  const [firmwareFilename, setFirmwareFilename] = useState("");
  const [selected, setSelected] = useState("default");
  const [confirmationOpen, setConfirmationOpen] = useState(false);
  const [resetOnFlash, setResetOnFlash] = useState(false);
  const [activeStep, setActiveStep] = useState(-1);
  const { t } = useTranslation();
  const focusDeviceDescriptor =
    props.focusDeviceDescriptor || focus.focusDeviceDescriptor;

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
      return setFirmwareFilename("");
    }

    const [fileName, fileData] = ipcRenderer.sendSync("file-open", {
      title: t("firmwareUpdate.dialog.selectFirmware"),
      filters: [
        {
          name: t("firmwareUpdate.dialog.firmwareFiles"),
          extensions: ["hex", "bin"],
        },
        {
          name: t("firmwareUpdate.dialog.allFiles"),
          extensions: ["*"],
        },
      ],
    });

    if (fileName) {
      setFirmwareFilename(fileName);
    }
  };

  const _defaultFirmwareFilename = () => {
    const { vendor, product } = focusDeviceDescriptor.info;
    const firmwareType = focusDeviceDescriptor.info.firmwareType || "hex";
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
    const { vendor, product } = focusDeviceDescriptor.info;
    const firmwareType = focusDeviceDescriptor.info.firmwareType || "hex";
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
    const focus = new Focus();
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
      focusDeviceDescriptor.flashSteps.forEach((step, index) => {
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
      (await checkExternalFlasher(focusDeviceDescriptor));
    return focusDeviceDescriptor.flash(focus._port, filename, {
      preferExternalFlasher: preferExternalFlasher,
      device: focusDeviceDescriptor,
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
      toast.error(t("firmwareUpdate.flashing.error"), {
        closeButton: action,
      });
      props.toggleFlashing();
      props.onDisconnect();
      return;
    }

    return new Promise((resolve) => {
      setTimeout(() => {
        toast.success(t("firmwareUpdate.flashing.success"));

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

  const experimentalFirmwareItemText = t(
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
        secondary={t("firmwareUpdate.experimentalFirmwareDescription")}
      />
    </MenuItem>
  );
  let hasExperimentalFirmware = true;

  try {
    fs.accessSync(_experimentalFirmwareFilename(), fs.constants.R_OK);
  } catch (_) {
    hasExperimentalFirmware = false;
  }

  const defaultFirmwareItemText = t("firmwareUpdate.defaultFirmware", {
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
          t("firmwareUpdate.defaultFirmwareDescription")
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
        {t("firmwareUpdate.selected")}
      </InputLabel>
      <Select
        sx={{
          display: "flex",
          minWidth: "15em",
          "& .MuiInputBase-input": { display: "flex" },
          "& .MuiListItemIcon-root": {
            marginTop: "auto",
            marginBottom: "auto",
            marginLeft: 1,
            marginRight: 2,
          },
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
            primary={t("firmwareUpdate.custom")}
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
  if (focusDeviceDescriptor?.flashSteps) {
    steps = steps.concat(focusDeviceDescriptor.flashSteps);
  } else {
    steps = steps.concat(["flash"]);
  }

  steps = steps.map((step) => {
    return t("firmwareUpdate.flashing.steps." + step);
  });

  const stepsWidget = (
    <Stepper activeStep={activeStep} alternativeLabel>
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
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
      }}
    >
      <PageTitle title={t("app.menu.firmwareUpdate")} />
      <Card
        sx={{
          my: 4,
          mx: "auto",
          maxWidth: "50%",
        }}
      >
        <CardContent>
          <Typography component="p" gutterBottom>
            {t("firmwareUpdate.description")}
          </Typography>
          <Typography component="p" gutterBottom sx={{ textAlign: "center" }}>
            <a href="https://github.com/keyboardio/Chrysalis-Firmware-Bundle#readme">
              Chrysalis-Firmware-Bundle
            </a>
          </Typography>
          <Typography component="p" gutterBottom>
            {t("hardware.updateInstructions")}
          </Typography>
          <Typography component="p" gutterBottom>
            {t("firmwareUpdate.postUpload")}
          </Typography>
        </CardContent>
        <Divider variant="middle" />
        <CardContent>
          <Typography variant="subtitle1">
            {t("firmwareUpdate.options.title")}
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
              label={t("firmwareUpdate.options.onFlash")}
            />
          </FormControl>
        </CardContent>
        <Divider variant="middle" />
        <CardActions>
          {firmwareSelect}
          <Box sx={{ flexGrow: 1 }} />
          <SaveChangesButton
            icon={<CloudUploadIcon />}
            onClick={resetOnFlash ? openConfirmationDialog : upload}
            successMessage={t("firmwareUpdate.flashing.buttonSuccess")}
          >
            {t("firmwareUpdate.flashing.button")}
          </SaveChangesButton>
        </CardActions>
        {activeStep >= 0 && <CardContent>{stepsWidget}</CardContent>}
      </Card>
      <ConfirmationDialog
        title={t("firmwareUpdate.confirmDialog.title")}
        open={confirmationOpen}
        onConfirm={replace}
        onCancel={closeConfirmationDialog}
      >
        {t("firmwareUpdate.confirmDialog.contents")}
      </ConfirmationDialog>
    </Box>
  );
};

export default FirmwareUpdate;
