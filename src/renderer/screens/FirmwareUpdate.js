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
import { logger } from "@api/log";
import CheckIcon from "@mui/icons-material/Check";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import ConfirmationDialog from "@renderer/components/ConfirmationDialog";
import { PageTitle } from "@renderer/components/PageTitle";
import { toast } from "@renderer/components/Toast";
import { getStaticPath } from "@renderer/config";
import useEffectOnce from "@renderer/hooks/useEffectOnce";
import checkExternalFlasher from "@renderer/utils/checkExternalFlasher";
import clearEEPROM from "@renderer/utils/clearEEPROM";
import { ipcRenderer } from "electron";
import fs from "fs";
import path from "path";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";

import FirmwareSelect from "./FirmwareUpdate/FirmwareSelect";
import FlashSteps from "./FirmwareUpdate/FlashSteps";
import UpdateDescription from "./FirmwareUpdate/UpdateDescription";

const Store = require("electron-store");
const settings = new Store();

const FirmwareUpdate = (props) => {
  const focus = new Focus();

  const [firmwareFilename, setFirmwareFilename] = useState("");
  const [selected, setSelected] = useState("current");

  const [factoryConfirmationOpen, setFactoryConfirmationOpen] = useState(false);
  const [confirmationOpen, setConfirmationOpen] = useState(false);
  const [activeStep, setActiveStep] = useState(-1);
  const [flashSteps, setFlashSteps] = useState([]);
  const [progress, setProgress] = useState("idle");
  const { t } = useTranslation();
  const focusDeviceDescriptor =
    props.focusDeviceDescriptor || focus.focusDeviceDescriptor;

  useEffectOnce(() => {
    // We're caching the device-specific flashSteps here, because during the
    // flashing process, we will reboot and reconnect to the keyboard, which can
    // - and often does - turn `focusDeviceDescriptor` into null, at least
    // temporarily.
    //
    // We do not want to fall back to the default `["flash"]` step list, not
    // even temporarily.
    //
    // As such, we cache the steps on mount. We can do that, because the steps
    // are device-specific, but static, and when this component gets first
    // mounted, `props.focusDeviceDescriptor` *will* be available.
    setFlashSteps(focusDeviceDescriptor.flashSteps);
  });

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

  const _flash = async () => {
    const focus = new Focus();
    let filename;

    if (selected == "default") {
      filename = _defaultFirmwareFilename();
    } else {
      filename = firmwareFilename;
    }

    const nextStep = async (desiredState) => {
      if (desiredState == "bootloaderWait") {
        toast.info(t("firmwareUpdate.flashing.releasePROG"), {
          autoHideDuration: 5000,
        });
      }
      setActiveStep(Math.min(activeStep + 1, flashSteps.length));
      flashSteps.forEach((step, index) => {
        if (step == desiredState) {
          setActiveStep(index);
        }
      });
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
    setConfirmationOpen(false);
    await props.toggleFlashing();
    setProgress("flashing");

    logger().info("Starting to flash");
    try {
      await _flash();
      await setActiveStep(flashSteps.length);
    } catch (e) {
      logger().error("Error while uploading firmware", { error: e });
      setProgress("error");
      setActiveStep(-1);
      toast.error(t("firmwareUpdate.flashing.error"));
      props.toggleFlashing();
      props.onDisconnect();
      return;
    }

    setProgress("success");
    logger().info("Successfully flashed");
    return new Promise((resolve) => {
      setTimeout(() => {
        toast.success(t("firmwareUpdate.flashing.success"), {
          autoHideDuration: 10000,
        });
        props.toggleFlashing();
        props.onDisconnect();
        resolve();
      }, 1000);
    });
  };

  const replace = async () => {
    steps = ["factoryRestore"].concat(steps);
    setFactoryConfirmationOpen(false);
    setActiveStep(0);
    await clearEEPROM();
    return await upload();
  };

  let steps = [];
  if (flashSteps) {
    steps = steps.concat(flashSteps);
  } else {
    steps = steps.concat(["flash"]);
  }

  const instructions = (
    <Alert severity="info">
      <AlertTitle>{t("firmwareUpdate.calloutTitle")}</AlertTitle>
      <Typography component="p" gutterBottom>
        {t("hardware.updateInstructions")}
      </Typography>
    </Alert>
  );

  const buttonsDisabled =
    progress == "flashing" ||
    selected == "current" ||
    (selected == "custom" && !firmwareFilename);

  return (
    <>
      <PageTitle title={t("app.menu.firmwareUpdate")} />
      <Container sx={{ my: 4, width: "50%" }}>
        <Typography variant="h6" gutterBottom>
          {t("firmwareUpdate.yourFirmware")}
        </Typography>
        <Paper sx={{ p: 2 }}>
          <UpdateDescription />
          <Divider sx={{ my: 2 }} />
          <FirmwareSelect
            focusDeviceDescriptor={focusDeviceDescriptor}
            selectedFirmware={[selected, setSelected]}
            firmwareFilename={[firmwareFilename, setFirmwareFilename]}
          />
          <Divider sx={{ my: 2 }} />
          <Box sx={{ p: 2, display: "flex" }}>
            <Button
              variant="outlined"
              onClick={() => setFactoryConfirmationOpen(true)}
              disabled={buttonsDisabled}
              color={
                ((progress == "success" || progress == "error") && progress) ||
                "primary"
              }
            >
              {t("firmwareUpdate.flashing.factoryResetButton")}
            </Button>
            <Box sx={{ flexGrow: 1 }} />
            <Button
              startIcon={
                progress == "success" ? <CheckIcon /> : <CloudUploadIcon />
              }
              variant="contained"
              onClick={() => setConfirmationOpen(true)}
              disabled={buttonsDisabled}
              color={
                ((progress == "success" || progress == "error") && progress) ||
                "primary"
              }
            >
              {t("firmwareUpdate.flashing.button")}
            </Button>
          </Box>
        </Paper>
      </Container>
      <FlashSteps steps={steps} activeStep={activeStep} />
      <ConfirmationDialog
        title={t("firmwareUpdate.factoryConfirmDialog.title")}
        open={factoryConfirmationOpen}
        onConfirm={replace}
        onCancel={() => setFactoryConfirmationOpen(false)}
      >
        <Typography component="p" sx={{ mb: 2 }}>
          {t("firmwareUpdate.factoryConfirmDialog.contents")}
        </Typography>
        {instructions}
      </ConfirmationDialog>
      <ConfirmationDialog
        title={t("firmwareUpdate.confirmDialog.title")}
        open={confirmationOpen}
        onConfirm={upload}
        onCancel={() => setConfirmationOpen(false)}
      >
        <Typography component="p" sx={{ mb: 2 }}>
          {t("firmwareUpdate.confirmDialog.description")}
        </Typography>
        {instructions}
      </ConfirmationDialog>
    </>
  );
};

export default FirmwareUpdate;
