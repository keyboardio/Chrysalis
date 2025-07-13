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
import { GlobalContext } from "@renderer/components/GlobalContext";
import React, { useState, useContext } from "react";
import { useTranslation } from "react-i18next";

import PreferenceSection from "../components/PreferenceSection";

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

  return (
    <PreferenceSection name="keyboard.advanced">
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
