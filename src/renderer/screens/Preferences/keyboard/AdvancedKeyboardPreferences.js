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

import { FocusCommands } from "@api/flash";
import Backdrop from "@mui/material/Backdrop";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import ConfirmationDialog from "@renderer/components/ConfirmationDialog";
import { GlobalContext } from "@renderer/components/GlobalContext";
import checkExternalFlasher from "@renderer/utils/checkExternalFlasher";
import clearEEPROM from "@renderer/utils/clearEEPROM";
import React, { useEffect, useState, useContext } from "react";
import { useTranslation } from "react-i18next";

import PreferenceSection from "../components/PreferenceSection";
import PreferenceSwitch from "../components/PreferenceSwitch";

const Store = require("electron-store");
const settings = new Store();

const AdvancedKeyboardPreferences = (props) => {
  const { t } = useTranslation();
  const globalContext = useContext(GlobalContext);

  const [activeDevice] = globalContext.state.activeDevice;
  const [EEPROMResetConfirmationOpen, setEEPROMResetConfirmationOpen] =
    useState(false);
  const [externalFlasherAvailable, setExternalFlasherAvailable] =
    useState(false);
  const [preferExternalFlasher, _setPreferExternalFlasher] = useState(false);
  const [working, setWorking] = useState(false);

  const focusCommands = new FocusCommands({ focus: activeDevice.focus });

  const resetEEPROM = async () => {
    await setWorking(true);
    closeEEPROMResetConfirmation();

    await clearEEPROM();
    await focusCommands.reboot();

    setWorking(false);
  };
  const openEEPROMResetConfirmation = () => {
    setEEPROMResetConfirmationOpen(true);
  };
  const closeEEPROMResetConfirmation = () => {
    setEEPROMResetConfirmationOpen(false);
  };

  const setPreferExternalFlasher = async (event) => {
    settings.set("flash.preferExternalFlasher", event.target.checked);
    _setPreferExternalFlasher(event.target.checked);
  };

  useEffect(() => {
    const check = async () => {
      const descriptor = activeDevice.focus.focusDeviceDescriptor;
      const available = await checkExternalFlasher(descriptor);

      setExternalFlasherAvailable(available);
      _setPreferExternalFlasher(
        await settings.get("flash.preferExternalFlasher")
      );
    };

    check();
  }, [activeDevice]);

  return (
    <PreferenceSection name="keyboard.advanced">
      {externalFlasherAvailable && (
        <PreferenceSwitch
          option="keyboard.flash.preferExternal"
          checked={preferExternalFlasher}
          onChange={setPreferExternalFlasher}
        />
      )}
      <Button
        sx={{ my: 2 }}
        disabled={working}
        variant="contained"
        color="secondary"
        onClick={openEEPROMResetConfirmation}
      >
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
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={working}
      >
        <CircularProgress />
      </Backdrop>
    </PreferenceSection>
  );
};

export { AdvancedKeyboardPreferences as default };
