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
import Focus from "@api/focus";

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
import { connectToDfuUsbPort } from "../utils/connectToDfuUsbPort";
import BootloaderWarning from "./FirmwareUpdate/BootloaderWarning";
import FirmwareSelect from "./FirmwareUpdate/FirmwareSelect";
import FirmwareUpdateWarning from "./FirmwareUpdate/FirmwareUpdateWarning";
import FirmwareVersion from "./FirmwareUpdate/FirmwareVersion";
import { FlashNotification } from "./FirmwareUpdate/FlashNotification";
import FlashSteps from "./FirmwareUpdate/FlashSteps";
import UpdateDescription from "./FirmwareUpdate/UpdateDescription";

const delay = (ms) => new Promise((res) => setTimeout(res, ms));

const FirmwareUpdate = (props) => {
  const focus = new Focus();
  const globalContext = useContext(GlobalContext);
  const [activeDevice, setActiveDevice] = globalContext.state.activeDevice;

  const [usbDevice, setUsbDevice] = useState(null);
  const [firmwareFilename, setFirmwareFilename] = useState("");
  const [selectedFirmwareType, setSelectedFirmwareType] = useState("default");
  const [firmwareContent, setFirmwareContent] = useState(null);

  const [flashNotificationMsg, setFlashNotificationMsg] = useState(RebootMessage.clear);

  const focusDeviceDescriptor = props.focusDeviceDescriptor || focus.focusDeviceDescriptor;
  const isBootloader = focusDeviceDescriptor.bootloader;
  const [bootloaderProtocol, setbootloaderProtocol] = useState(focus.focusDeviceDescriptor.usb.bootloader.protocol);

  const [confirmationOpen, setConfirmationOpen] = useState(false);
  const [activeStep, setActiveStep] = useState(-1);
  const [flashSteps, setFlashSteps] = useState([]);
  const [progress, setProgress] = useState("idle");
  const [factoryReset, setFactoryReset] = useState(!!isBootloader);
  const [promptForBootloaderConnection, setPromptForBootloaderConnection] = useState(false);

  const [afterBootloaderConnectCallback, setAfterBootloaderConnectCallback] = useState(null);

  const [promptForFocusConnection, setPromptForFocusConnection] = useState(false);

  const [afterFocusConnectCallback, setAfterFocusConnectCallback] = useState(null);

  const { t } = useTranslation();

  const NOTIFICATION_THRESHOLD = 5;

  const loadDefaultFirmwareContent = async () => {
    const { vendor, product } = focusDeviceDescriptor.info;
    const firmwareType = focusDeviceDescriptor.info.firmwareType || "hex";
    const cVendor = vendor.replace("/", ""),
      cProduct = product.replace("/", "");
    const firmwareURL = `/assets/firmware/${cVendor}/${cProduct}/default.${firmwareType}`;

    let defaultFirmwareContent;
    try {
      const response = await fetch(firmwareURL);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const firmwareBlob = await response.blob();
      defaultFirmwareContent = await firmwareBlob.arrayBuffer();
    } catch (err) {
      console.error(`Failed to fetch firmware file from ${firmwareURL}:`, err);
      throw err;
    }
    console.log("Firmware content", defaultFirmwareContent);

    setFirmwareContent(defaultFirmwareContent);
    return defaultFirmwareContent;
  };

  const doFactoryReset = async () => {
    const tasksInBootloaderMode = async (port) => {
      console.log("TasksinBootloaderMode for doFactoryReset, port is ", port);
      await flashDeviceFirmwareFromBootloader(port);

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

  const flashDeviceFirmwareFromBootloader = async (port) => {
    const flasher = activeDevice.getFlasher();
    await onStepChange("flash");
    let firmwareToSend = firmwareContent;
    console.log(focus);
    if (selectedFirmwareType == "default") {
      firmwareToSend = await loadDefaultFirmwareContent();
    }
    console.log("about to flash");
    console.log(" the usb device is ", port);

    console.log(" firmware content is ", firmwareToSend);
    if (bootloaderProtocol == "avr109") {
      await flasher.flash(focus._port, firmwareToSend);
    } else if (bootloaderProtocol == "dfu") {
      await flasher.flash(port, firmwareToSend);
    }
  };

  const updateDeviceFirmware = async () => {
    // If the user selected the factory firmware, we need to fetch it from the
    // server. Otherwise, we'll use the file the user uploaded.
    if (activeDevice.bootloaderDetected()) {
      // This path only works if we have a device with a serial bootloader, so we abuse focus._port
      await flashDeviceFirmwareFromBootloader(focus._port);
      return;
    } else {
      console.log("about to save eeprom");
      await onStepChange("saveEEPROM");
      const saveKey = await activeDevice.saveEEPROM();
      console.log("Done saving eeprom");
      await onStepChange("bootloader");
      console.log("done saving eeprom");

      const tasksInBootloaderMode = async (port) => {
        console.log("TasksinBootloaderMode for updateDeviceFirmware, port is ", port);

        console.trace();
        console.log("Runing tasks in bootloader mode");
        await flashDeviceFirmwareFromBootloader(port);
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
      console.log("About to reboot to bootloader");
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

  const connectToBootloaderPort = async () => {
    if (bootloaderProtocol == "avr109") {
      const focus = await connectToSerialport();
      return focus;
    } else if (bootloaderProtocol == "dfu") {
      const usb = await connectToDfuUsbPort();
      return usb;
    }
  };

  const connectToBootloader = async (callback) => {
    /***
     * Enter programmable mode:
     * - Attempt rebooting the device;  Check for the bootloader every 2s
     * - If not found, try again
     * - If not found for N attempts, show a notification
     ***/

    setAfterBootloaderConnectCallback((port) => callback);
    setPromptForBootloaderConnection(true);
  };

  const connectToFocus = async (callback) => {
    console.log("In connectToFocus");
    setAfterFocusConnectCallback(() => callback);
    setPromptForFocusConnection(true);
  };

  const onStepChange = async (desiredState) => {
    console.info("executing step", {
      step: desiredState,
      flashSteps: flashSteps,
    });
    setActiveStep(Math.min(activeStep + 1, flashSteps.length));
    flashSteps.forEach((step, index) => {
      console.log("Considering ", { step, index });
      if (step == desiredState) {
        console.log("Found the step we're looking for:" + step);
        setActiveStep(index);
        // exit the foreach
        return;
      }
    });
  };

  useEffect(() => {
    let steps;
    if (focusDeviceDescriptor?.bootloader) {
      if (factoryReset) {
        steps = ["flash", "reconnect", "factoryRestore"];
      } else {
        steps = ["flash"];
      }
    } else {
      if (factoryReset) {
        steps = ["bootloader", "flash", "reconnect", "factoryRestore"];
      } else {
        steps = ["saveEEPROM", "bootloader", "flash", "reconnect", "restoreEEPROM"];
      }
    }
    setFlashSteps(steps);
  }, [factoryReset, focusDeviceDescriptor]);

  const upload = async () => {
    setConfirmationOpen(false);

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

  const buttonsDisabled = progress == "flashing" || (selectedFirmwareType == "custom" && !firmwareFilename);

  return (
    <>
      <PageTitle title={t("app.menu.firmwareUpdate")} />
      <FirmwareUpdateWarning />
      <Typography component="p" sx={{ mb: 2 }}>
        Bootloader type: {bootloaderProtocol} / {focus.focusDeviceDescriptor.usb.bootloader.protocol}
      </Typography>

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
            <Typography variant="h6">{t("firmwareUpdate.factoryResetTitle")}</Typography>
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
              startIcon={progress == "success" ? <CheckIcon /> : <CloudUploadIcon />}
              onClick={() => {
                setConfirmationOpen(true);
              }}
              disabled={buttonsDisabled}
              color={((progress == "success" || progress == "error") && progress) || "primary"}
            >
              {isBootloader ? t("firmwareUpdate.flashing.anywayButton") : t("firmwareUpdate.flashing.button")}
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
        title={t("firmwareUpdate.bootloaderConnectDialog.title")}
        onConfirm={() => {
          connectToBootloaderPort().then((success) => {
            if (success) {
              setPromptForBootloaderConnection(false);
              console.log(afterBootloaderConnectCallback);
              afterBootloaderConnectCallback(success);
            } else {
              console.log("We need to try that connect again");
            }
          });
        }}
      >
        <Typography component="p" sx={{ mb: 2 }}>
          {t("firmwareUpdate.bootloaderConnectDialog.contents")}
        </Typography>
      </ConfirmationDialog>
      <ConfirmationDialog
        open={promptForFocusConnection}
        title={t("firmwareUpdate.reconnectDialog.title")}
        onConfirm={() => {
          connectToSerialport().then((focus) => {
            if (focus) {
              console.debug("connected to serial port");
              setPromptForFocusConnection(false);
              console.log("Runnign in onconfirm");
              console.log(afterFocusConnectCallback);
              afterFocusConnectCallback();
            } else {
              console.log("We need to try that connect again");
            }
          });
        }}
      >
        <Typography component="p" sx={{ mb: 2 }}>
          {t("firmwareUpdate.reconnectDialog.contents")}
        </Typography>
      </ConfirmationDialog>
      <ConfirmationDialog
        title={factoryReset ? t("firmwareUpdate.factoryConfirmDialog.title") : t("firmwareUpdate.confirmDialog.title")}
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

      <FlashNotification open={flashNotificationMsg !== RebootMessage.clear} message={flashNotificationMsg} />
    </>
  );
};

export default FirmwareUpdate;
