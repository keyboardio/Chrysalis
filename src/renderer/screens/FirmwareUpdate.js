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
import { updateDeviceFirmware, RebootMessage } from "@api/flash";
import CheckIcon from "@mui/icons-material/Check";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import Paper from "@mui/material/Paper";
import Switch from "@mui/material/Switch";
import Typography from "@mui/material/Typography";
import ConfirmationDialog from "@renderer/components/ConfirmationDialog";
import { PageTitle } from "@renderer/components/PageTitle";
import { toast } from "@renderer/components/Toast";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";

import BootloaderWarning from "./FirmwareUpdate/BootloaderWarning";
import FirmwareSelect from "./FirmwareUpdate/FirmwareSelect";
import FirmwareUpdateWarning from "./FirmwareUpdate/FirmwareUpdateWarning";
import FirmwareVersion from "./FirmwareUpdate/FirmwareVersion";
import { FlashNotification } from "./FirmwareUpdate/FlashNotification";
import FlashSteps from "./FirmwareUpdate/FlashSteps";
import UpdateDescription from "./FirmwareUpdate/UpdateDescription";

const FirmwareUpdate = (props) => {
  const focus = new Focus();

  const [firmwareFilename, setFirmwareFilename] = useState("");
  const [selectedFirmwareType, setSelectedFirmwareType] = useState("default");

  const [flashNotificationOpen, setFlashNotificationOpen] = useState(false);
  const [flashNotificationMsg, setFlashNotificationMsg] = useState(null);

  const focusDeviceDescriptor =
    props.focusDeviceDescriptor || focus.focusDeviceDescriptor;
  const isBootloader = focusDeviceDescriptor.bootloader;

  const [factoryConfirmationOpen, setFactoryConfirmationOpen] = useState(false);
  const [confirmationOpen, setConfirmationOpen] = useState(false);
  const [activeStep, setActiveStep] = useState(-1);
  const [flashSteps, setFlashSteps] = useState([]);
  const [progress, setProgress] = useState("idle");
  const [factoryReset, setFactoryReset] = useState(isBootloader);

  const { t } = useTranslation();

  const toggleFactoryReset = () => {
    setFactoryReset(!factoryReset);
  };

  const defaultFirmwareFilename = () => {
    const { vendor, product } = focusDeviceDescriptor.info;
    const firmwareType = focusDeviceDescriptor.info.firmwareType || "hex";
    const cVendor = vendor.replace("/", ""),
      cProduct = product.replace("/", "");
    return cVendor + "/" + cProduct + "/default." + firmwareType;
  };
  const _flash = async (options, steps) => {
    const focus = new Focus();

    const nextStep = async (desiredState) => {
      setActiveStep(Math.min(activeStep + 1, steps.length));
      steps.forEach((step, index) => {
        if (step == desiredState) {
          setActiveStep(index);
        }
      });
    };

    const onError = (msg) => {
      if (msg !== RebootMessage.clear) {
        setFlashNotificationMsg(msg);
      }
      setFlashNotificationOpen(msg !== RebootMessage.clear);
    };

    console.log("About to call flash.flash()  ");
    return updateDeviceFirmware(
      "file",
      Object.assign({}, options, {
        device: focusDeviceDescriptor,
        focus: focus,
        callback: nextStep,
        onError: onError,
      })
    );
  };

  const upload = async (options) => {
    let steps;

    if (focusDeviceDescriptor?.bootloader) {
      if (options?.factoryReset) {
        steps = ["flash", "reconnect", "factoryRestore"];
      } else {
        steps = ["flash"];
      }
    } else {
      if (options?.factoryReset) {
        steps = ["bootloader", "flash", "reconnect", "factoryRestore"];
      } else {
        steps = [
          "saveEEPROM",
          "bootloader",
          "flash",
          "reconnect",
          "restoreEEPROM",
        ];
      }
    }
    setFlashSteps(steps);

    setConfirmationOpen(false);
    setFactoryConfirmationOpen(false);

    await props.toggleFlashing();
    setProgress("flashing");

    logger().info("Starting to flash");
    try {
      await _flash(options, steps);
      setActiveStep(steps.length);
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
    (selectedFirmwareType == "custom" && !firmwareFilename);

  const onUpdateClick = () => {
    if (factoryReset) {
      setFactoryConfirmationOpen(true);
    } else {
      setConfirmationOpen(true);
    }
  };

  const uploadVariant = isBootloader ? "outlined" : "contained";
  const uploadLabel = isBootloader
    ? t("firmwareUpdate.flashing.anywayButton")
    : t("firmwareUpdate.flashing.button");

  return (
    <>
      <PageTitle title={t("app.menu.firmwareUpdate")} />
      <FirmwareUpdateWarning />
      <Container sx={{ my: 4, minWidth: "600px", width: "80%" }}>
        <Typography variant="h6" gutterBottom>
          {t("firmwareUpdate.yourFirmware")}
        </Typography>
        <Paper sx={{ p: 2 }}>
          <UpdateDescription />
          <Divider sx={{ my: 2 }} />
          {isBootloader ? <BootloaderWarning /> : <FirmwareVersion />}
          <FirmwareSelect
            selectedFirmware={[selectedFirmwareType, setSelectedFirmwareType]}
            firmwareFilename={[firmwareFilename, setFirmwareFilename]}
          />

          <Box sx={{ mb: 2 }}>
            <Typography variant="h6">
              {t("firmwareUpdate.factoryResetTitle")}
            </Typography>
            <Typography sx={{ ml: 3 }}>
              <Switch checked={factoryReset} onChange={toggleFactoryReset} />
              {t("firmwareUpdate.factoryResetDescription")}
            </Typography>
          </Box>

          <Divider sx={{ my: 2 }} />
          <Box sx={{ p: 2, display: "flex" }}>
            <Box sx={{ flexGrow: 1 }} />
            <Button
              startIcon={
                progress == "success" ? <CheckIcon /> : <CloudUploadIcon />
              }
              variant={uploadVariant}
              onClick={onUpdateClick}
              disabled={buttonsDisabled}
              color={
                ((progress == "success" || progress == "error") && progress) ||
                "primary"
              }
            >
              {uploadLabel}
            </Button>
            {isBootloader && (
              <Button
                onClick={props.onDisconnect}
                variant="contained"
                disabled={buttonsDisabled}
                color="primary"
                sx={{ ml: 2 }}
              >
                {t("firmwareUpdate.flashing.cancelAndDisconnectButton")}
              </Button>
            )}
          </Box>
        </Paper>
      </Container>
      <FlashSteps steps={flashSteps} activeStep={activeStep} />

      <ConfirmationDialog
        title={t("firmwareUpdate.factoryConfirmDialog.title")}
        open={factoryConfirmationOpen}
        onConfirm={() => upload({ factoryReset: true })}
        onCancel={() => setFactoryConfirmationOpen(false)}
        confirmLabel={t("dialog.continue")}
      >
        <Typography component="p" sx={{ mb: 2 }}>
          {t("firmwareUpdate.factoryConfirmDialog.contents")}
        </Typography>
        {instructions}
      </ConfirmationDialog>

      <ConfirmationDialog
        title={t("firmwareUpdate.confirmDialog.title")}
        open={confirmationOpen}
        onConfirm={() => upload()}
        onCancel={() => setConfirmationOpen(false)}
        confirmLabel={t("dialog.continue")}
      >
        <Typography component="p" sx={{ mb: 2 }}>
          {t("firmwareUpdate.confirmDialog.description")}
        </Typography>
        {instructions}
      </ConfirmationDialog>
      <FlashNotification
        open={flashNotificationOpen}
        message={flashNotificationMsg}
      />
    </>
  );
};

export default FirmwareUpdate;
