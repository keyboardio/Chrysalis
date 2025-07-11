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

import Backdrop from "@mui/material/Backdrop";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import ConfirmationDialog from "@renderer/components/ConfirmationDialog";
import Divider from "@mui/material/Divider";
import { GlobalContext } from "@renderer/components/GlobalContext";
import React, { useState, useContext } from "react";
import { useTranslation } from "react-i18next";
import jsonStringify from "json-stringify-pretty-compact";

import PreferenceSection from "../components/PreferenceSection";
import { FileUpload } from "../../../components/FileUpload";
import { contextBarChangesDiscarded } from "../../../components/ContextBar";

const AdvancedKeyboardPreferences = (props) => {
  const { t } = useTranslation();
  const globalContext = useContext(GlobalContext);

  const [activeDevice] = globalContext.state.activeDevice;
  const [EEPROMResetConfirmationOpen, setEEPROMResetConfirmationOpen] = useState(false);
  const [working, setWorking] = useState(false);

  const resetEEPROM = async () => {
    await setWorking(true);
    closeEEPROMResetConfirmation();

    await activeDevice.clearEEPROM();
    try {
      activeDevice.focus.reboot();
    } catch (_) {
      /* ignore any errors */
    }

    setWorking(false);
    props.onDisconnect();
  };
  const openEEPROMResetConfirmation = () => {
    setEEPROMResetConfirmationOpen(true);
  };
  const closeEEPROMResetConfirmation = () => {
    setEEPROMResetConfirmationOpen(false);
  };

  const exportEEPROMToFile = async () => {
    setWorking(true);
    const backupData = await activeDevice.focus.readKeyboardConfiguration();
    const content = jsonStringify(backupData);
    const blob = new Blob([content], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, "0"); // Months are 0-based
    const day = String(currentDate.getDate()).padStart(2, "0");
    const hours = String(currentDate.getHours()).padStart(2, "0");
    const minutes = String(currentDate.getMinutes()).padStart(2, "0");
    const seconds = String(currentDate.getSeconds()).padStart(2, "0");

    const device_name = activeDevice.focus.focusDeviceDescriptor.info.displayName.replace(/ /g, "-");

    link.download = `Chrysalis_${device_name}_EEPROM_${year}-${month}-${day}_${hours}-${minutes}-${seconds}.json`;
    link.click();

    URL.revokeObjectURL(url);
    setWorking(false);
  };
  const loadEEPROMFromFile = async (text) => {
    const config = JSON.parse(text);
    await activeDevice.focus.writeKeyboardConfiguration(config, activeDevice);
    contextBarChangesDiscarded();
    setWorking(false);
  };

  return (
    <PreferenceSection name="keyboard.advanced">
      <FileUpload  disabled={working} variant="outlined" color="primary" onLoad={loadEEPROMFromFile} onError={() => setWorking(false)} onClick={() => setWorking(true)}>
        {t("preferences.keyboard.EEPROMBackup.restore")}
      </FileUpload>
      <Divider sx={{ my: 2, mx: -2 }} />
      <Button disabled={working} variant="outlined" color="primary" onClick={exportEEPROMToFile}>
        {t("preferences.keyboard.EEPROMBackup.backup")}
      </Button>
      <Divider sx={{ my: 2, mx: -2 }} />
      <Button disabled={working} variant="outlined" color="secondary" onClick={openEEPROMResetConfirmation}>
        {t("preferences.keyboard.factoryReset.button")}
      </Button>
      <ConfirmationDialog
        title={t("preferences.keyboard.factoryReset.dialog.title")}
        open={EEPROMResetConfirmationOpen}
        onConfirm={resetEEPROM}
        onCancel={closeEEPROMResetConfirmation}
      >
        {t("preferences.keyboard.factoryReset.dialog.contents")}
      </ConfirmationDialog>
      <Backdrop sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }} open={working}>
        <CircularProgress />
      </Backdrop>
    </PreferenceSection>
  );
};

export { AdvancedKeyboardPreferences as default };
