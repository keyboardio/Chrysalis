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

import { RebootMessage } from "@api/flash";
import { delay } from "@api/flash/utils";
import Focus from "@api/focus";
import { ActiveDevice } from "../ActiveDevice";

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
import { GlobalContext } from "@renderer/components/GlobalContext";
import { PageTitle } from "@renderer/components/PageTitle";
import { toast } from "@renderer/components/Toast";
import React, { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { connectToSerialport } from "../utils/connectToSerialport";
import BootloaderWarning from "./FirmwareUpdate/BootloaderWarning";
import FirmwareSelect from "./FirmwareUpdate/FirmwareSelect";
import FirmwareUpdateWarning from "./FirmwareUpdate/FirmwareUpdateWarning";
import FirmwareVersion from "./FirmwareUpdate/FirmwareVersion";
import { FlashNotification } from "./FirmwareUpdate/FlashNotification";
import FlashSteps from "./FirmwareUpdate/FlashSteps";
import UpdateDescription from "./FirmwareUpdate/UpdateDescription";

const FirmwareUpdate = (props) => {
  const focus = new Focus();
  const globalContext = useContext(GlobalContext);
  const [activeDevice, setActiveDevice] = globalContext.state.activeDevice;

  const [firmwareFilename, setFirmwareFilename] = useState("");
  const [selectedFirmwareType, setSelectedFirmwareType] = useState("default");
  const [firmwareContent, setFirmwareContent] = useState(null);

  const [flashNotificationMsg, setFlashNotificationMsg] = useState(
    RebootMessage.clear
  );

  const focusDeviceDescriptor =
    props.focusDeviceDescriptor || focus.focusDeviceDescriptor;
  const isBootloader = focusDeviceDescriptor.bootloader;

  const [confirmationOpen, setConfirmationOpen] = useState(false);
  const [activeStep, setActiveStep] = useState(-1);
  const [flashSteps, setFlashSteps] = useState([]);
  const [progress, setProgress] = useState("idle");
  const [factoryReset, setFactoryReset] = useState(!!isBootloader);
  const [promptForBootloaderConnection, setPromptForBootloaderConnection] =
    useState(false);

  const [afterBootloaderConnectCallback, setAfterBootloaderConnectCallback] =
    useState(null);

  const [promptForFocusConnection, setPromptForFocusConnection] =
    useState(false);

  const [afterFocusConnectCallback, setAfterFocusConnectCallback] =
    useState(null);

  const { t } = useTranslation();

  const NOTIFICATION_THRESHOLD = 5;

  const defaultFirmwareFilename = () => {
    const { vendor, product } = focusDeviceDescriptor.info;
    const firmwareType = focusDeviceDescriptor.info.firmwareType || "hex";
    const cVendor = vendor.replace("/", ""),
      cProduct = product.replace("/", "");
    return cVendor + "/" + cProduct + "/default." + firmwareType;
  };

  const doFactoryReset = async () => {
    const tasksInBootloaderMode = async () => {
      await flashDeviceFirmwareFromBootloader(firmwareContent);

      await onStepChange("reconnect");

      await onStepChange("factoryRestore");
      const tasksInFocusMode = async () => {
        await activeDevice.clearEEPROM();
        await reportSuccessfulFlashing();
      };
      await connectToFocus(tasksInFocusMode);
    };

    if (!activeDevice.bootloaderDetected()) {
      await onStepChange("bootloader");
      await rebootToBootloader();
      await connectToBootloader(tasksInBootloaderMode);
    } else {
      console.log("We're already in bootloader mode");
      await tasksInBootloaderMode();
    }

    return;
  };

  const flashDeviceFirmwareFromBootloader = async () => {
    const flasher = activeDevice.getFlasher();
    await onStepChange("flash");
    console.log(focus);
    await flasher.flash(focus._port, firmwareContent);
  };

  const updateDeviceFirmware = async () => {
    if (activeDevice.bootloaderDetected()) {
      await flashDeviceFirmwareFromBootloader(firmwareContent);
      return;
    } else {
      await onStepChange("saveEEPROM");
      const saveKey = await activeDevice.saveEEPROM();
      await onStepChange("bootloader");

      const tasksInBootloaderMode = async () => {
        console.trace();
        console.log("Runing tasks in bootloader mode");
        await flashDeviceFirmwareFromBootloader(firmwareContent);
        console.log("flashed device firmware");
        await onStepChange("reconnect");

        console.log("reconnected after flashing");
        const tasksInFocusMode = async () => {
          await activeDevice.clearEEPROM();
          console.log("cleared eeprom");
          const tasksAfterEepromCleared = async () => {
            console.log("reconnected after clearing eeprom");
            await onStepChange("restoreEEPROM");
            console.log("about to restore eeprom");
            await activeDevice.restoreEEPROM(saveKey);
            console.log("restored eeprom");
            await reportSuccessfulFlashing();
          };
          await connectToFocus(tasksAfterEepromCleared);
        };
        await connectToFocus(tasksInFocusMode);
      };

      await rebootToBootloader();
      console.log("about to connect to bootloader");
      await connectToBootloader(tasksInBootloaderMode);
    }
  };
  const reconnectAfterFlashing = async () => {
    /**
     * Reconnect to the keyboard
     * - Periodically scan for the keyboard
     * - If found, we're done with the step
     * - If not found, see if we have a bootloader.
     * - If we do, try to reboot to application mode.
     * - In either case, wait and try again.
     ***/

    // Wait a few seconds to let the keyboard settle, in case it was rebooting after a flash.
    await delay(2000);

    let device_detected = false;
    let attempts = 0;
    while (!device_detected) {
      console.log(activeDevice);
      const focus = undefined; //; TODO  = connectToSerialport();
      activeDevice.focus = focus;
      device_detected = await activeDevice.reconnect();
      if (device_detected) break;
      attempts += 1;

      const port = focus._port;
      console.log(port);
      // Wait a few seconds to not overwhelm the system with rapid reboot
      // attempts.
      await delay(2000);
    }
    setFlashNotificationMsg(RebootMessage.clear);

    // Wait a few seconds after rebooting too, to let the keyboard come back up
    // fully.
    await delay(2000);
  };

  const rebootToBootloader = async () => {
    const deviceInApplicationMode = await activeDevice.focusDetected();
    try {
      await activeDevice.focus.reboot();
    } catch (e) {
      // Log the error, but otherwise ignore it.
      console.error("Error during reboot", { error: e });
    }
    // Wait a few seconds to let the device properly reboot into bootloadermode, and enumerate.

    await delay(2000);
  };

  const connectToBootloader = async (callback) => {
    /***
     * Enter programmable mode:
     * - Attempt rebooting the device;  Check for the bootloader every 2s
     * - If not found, try again
     * - If not found for N attempts, show a notification
     ***/

    setAfterBootloaderConnectCallback(() => callback);

    setPromptForBootloaderConnection(true);
  };

  const connectToFocus = async (callback) => {
    setAfterFocusConnectCallback(() => callback);
    setPromptForFocusConnection(true);
  };

  const onStepChange = async (desiredState) => {
    console.info("executing step", { step: desiredState });
    setActiveStep(Math.min(activeStep + 1, flashSteps.length));
    flashSteps.forEach((step, index) => {
      if (step == desiredState) {
        setActiveStep(index);
      }
    });
  };

  const setFlashingProcessSteps = () => {
    if (focusDeviceDescriptor?.bootloader) {
      if (factoryReset) {
        return ["flash", "reconnect", "factoryRestore"];
      } else {
        return ["flash"];
      }
    } else {
      if (factoryReset) {
        return ["bootloader", "flash", "reconnect", "factoryRestore"];
      } else {
        return [
          "saveEEPROM",
          "bootloader",
          "flash",
          "reconnect",
          "restoreEEPROM",
        ];
      }
    }
  };

  const upload = async () => {
    setConfirmationOpen(false);
    setFlashSteps(setFlashingProcessSteps());

    await props.toggleFlashing();
    setProgress("flashing");

    try {
      if (factoryReset) {
        await doFactoryReset();
      } else {
        await updateDeviceFirmware();
      }
      //  setActiveStep(flashSteps.length); // set our state to the last step
    } catch (e) {
      console.error("Error while uploading firmware", { error: e });
      setProgress("error");
      setActiveStep(-1);
      toast.error(t("firmwareUpdate.flashing.error"));
      props.toggleFlashing();
      setConfirmationOpen(false);
      return;
    }
  };

  const reportSuccessfulFlashing = () => {
    setProgress("success");
    console.info("Successfully flashed");
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

  const buttonsDisabled =
    progress == "flashing" ||
    (selectedFirmwareType == "custom" && !firmwareFilename);

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
            firmwareContent={[firmwareContent, setFirmwareContent]}
          />

          <Box sx={{ mb: 2 }}>
            <Typography variant="h6">
              {t("firmwareUpdate.factoryResetTitle")}
            </Typography>
            <Typography sx={{ ml: 3 }}>
              <Switch
                checked={factoryReset}
                onChange={() => {
                  setFactoryReset(!factoryReset);
                }}
              />
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
              onClick={() => {
                setConfirmationOpen(true);
              }}
              disabled={buttonsDisabled}
              color={
                ((progress == "success" || progress == "error") && progress) ||
                "primary"
              }
            >
              {isBootloader
                ? t("firmwareUpdate.flashing.anywayButton")
                : t("firmwareUpdate.flashing.button")}
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
        open={promptForBootloaderConnection}
        title={"You need to do something TKTKTK"}
        onConfirm={() => {
          connectToSerialport().then((focus) => {
            console.debug("connected to serial port");
            setPromptForBootloaderConnection(false);
            console.log("Runnign in onconfirm");
            console.log(afterBootloaderConnectCallback);
            afterBootloaderConnectCallback();
          });
        }}
      />
      <ConfirmationDialog
        open={promptForFocusConnection}
        title={"You need to do something TKTKTK"}
        onConfirm={() => {
          connectToSerialport().then((focus) => {
            console.debug("connected to serial port");
            setPromptForFocusConnection(false);
            console.log("Runnign in onconfirm");
            console.log(afterFocusConnectCallback);
            afterFocusConnectCallback();
          });
        }}
      />

      <ConfirmationDialog
        title={
          factoryReset
            ? t("firmwareUpdate.factoryConfirmDialog.title")
            : t("firmwareUpdate.confirmDialog.title")
        }
        open={confirmationOpen}
        onConfirm={() => upload()}
        onCancel={() => setConfirmationOpen(false)}
        confirmLabel={t("dialog.continue")}
      >
        <Typography component="p" sx={{ mb: 2 }}>
          {factoryReset
            ? t("firmwareUpdate.factoryConfirmDialog.contents")
            : t("firmwareUpdate.confirmDialog.description")}
        </Typography>
        <Alert severity="info">
          <AlertTitle>{t("firmwareUpdate.calloutTitle")}</AlertTitle>
          <Typography component="p" gutterBottom>
            {t("hardware.updateInstructions")}
          </Typography>
        </Alert>
      </ConfirmationDialog>

      <FlashNotification
        open={flashNotificationMsg !== RebootMessage.clear}
        message={flashNotificationMsg}
      />
    </>
  );
};

export default FirmwareUpdate;
