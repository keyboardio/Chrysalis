// -*- mode: js-jsx -*-
/* Chrysalis -- Kaleidoscope Command Center
 * Copyright (C) 2018-2022  Keyboardio, Inc.
 * Copyright (C) 2020  DygmaLab SE.
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
import Focus from "@api/focus";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import FilledInput from "@mui/material/FilledInput";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Slider from "@mui/material/Slider";
import Switch from "@mui/material/Switch";
import Typography from "@mui/material/Typography";
import ConfirmationDialog from "@renderer/components/ConfirmationDialog";
import {
  hideContextBar,
  showContextBar,
} from "@renderer/components/ContextBar";
import checkExternalFlasher from "@renderer/utils/checkExternalFlasher";
import clearEEPROM from "@renderer/utils/clearEEPROM";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

const Store = require("electron-store");
const settings = new Store();

const MyKeyboardPreferences = (props) => {
  const [keymap, setKeymap] = useState({
    custom: [],
    default: [],
    onlyCustom: false,
  });

  const [defaultLayer, setDefaultLayer] = useState(126);
  const [ledBrightness, setLedBrightness] = useState(255);
  const [ledIdleTimeLimit, setLedIdleTimeLimit] = useState(0);
  const [EEPROMResetConfirmationOpen, setEEPROMResetConfirmationOpen] =
    useState(false);
  const [externalFlasherAvailable, setExternalFlasherAvailable] =
    useState(false);
  const [preferExternalFlasher, _setPreferExternalFlasher] = useState(false);

  const [working, setWorking] = useState(false);
  const [modified, setModified] = useState(false);
  const { t } = useTranslation();

  const focusCommands = new FocusCommands({ focus: new Focus() });

  const initState = async () => {
    const focus = new Focus();

    focus.command("keymap").then((keymap) => {
      setKeymap(keymap);
    });

    focus.command("settings.defaultLayer").then((layer) => {
      layer = layer ? parseInt(layer) : 126;
      setDefaultLayer(layer <= 126 ? layer : 126);
    });
    focus.command("led.brightness").then((brightness) => {
      brightness = brightness ? parseInt(brightness) : -1;
      setLedBrightness(brightness);
    });
    focus.command("idleleds.time_limit").then((limit) => {
      limit = limit ? parseInt(limit) : -1;
      setLedIdleTimeLimit(limit);
    });
  };

  useEffect(() => {
    const context_bar_channel = new BroadcastChannel("context_bar");

    context_bar_channel.onmessage = (event) => {
      if (event.data === "changes-discarded") {
        initState().then(() => setModified(false));
      }
    };
    return () => {
      context_bar_channel.close();
    };
  }, []);

  useEffect(() => {
    initState();
  }, []);

  const selectDefaultLayer = (event) => {
    setDefaultLayer(event.target.value);

    setModified(true);
    showContextBar();
  };

  const selectIdleLEDTime = (event) => {
    setLedIdleTimeLimit(event.target.value);
    setModified(true);
    showContextBar();
  };

  const setBrightness = (event, value) => {
    setLedBrightness(value);
    setModified(true);
    showContextBar();
  };

  const saveKeymapChanges = async () => {
    const focus = new Focus();

    await focus.command("settings.defaultLayer", defaultLayer);
    await focus.command("led.brightness", ledBrightness);
    if (ledIdleTimeLimit >= 0)
      await focus.command("idleleds.time_limit", ledIdleTimeLimit);
    await setModified(false);
    await hideContextBar();
  };

  const layers = keymap.custom.map((_, index) => {
    return (
      <MenuItem value={index} key={index}>
        {t("components.layer", { index: index })}
      </MenuItem>
    );
  });

  const resetEEPROM = async () => {
    setWorking(true);
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
    const focus = new Focus();
    checkExternalFlasher(focus.focusDeviceDescriptor).then(
      async (available) => {
        setExternalFlasherAvailable(available);
        _setPreferExternalFlasher(
          await settings.get("flash.preferExternalFlasher")
        );
      }
    );
  });

  const preferExternalSwitch = (
    <Switch
      checked={preferExternalFlasher}
      value="preferExternalFlasher"
      onClick={setPreferExternalFlasher}
    />
  );

  return (
    <Box sx={{ m: 2 }} component="form">
      <FormGroup
        sx={{
          display: "block",
        }}
      >
        <FormControl variant="standard" fullWidth={true}>
          <InputLabel>{t("keyboardSettings.keymap.defaultLayer")} </InputLabel>
          <Select
            onChange={selectDefaultLayer}
            sx={{ mb: 2 }}
            value={defaultLayer}
            variant="filled"
            input={<FilledInput sx={{}} />}
          >
            <MenuItem value={126}>
              {t("keyboardSettings.keymap.noDefault")}
            </MenuItem>
            {layers}
          </Select>
        </FormControl>

        {ledIdleTimeLimit >= 0 && (
          <FormControl variant="standard" fullWidth={true}>
            <InputLabel>{t("keyboardSettings.led.idleTimeLimit")}</InputLabel>
            <Select
              onChange={selectIdleLEDTime}
              value={ledIdleTimeLimit}
              variant="filled"
              input={<FilledInput sx={{}} />}
            >
              <MenuItem value={0}>
                {t("keyboardSettings.led.idleDisabled")}
              </MenuItem>
              <MenuItem value={60}>
                {t("keyboardSettings.led.idle.oneMinute")}
              </MenuItem>
              <MenuItem value={120}>
                {t("keyboardSettings.led.idle.twoMinutes")}
              </MenuItem>
              <MenuItem value={180}>
                {t("keyboardSettings.led.idle.threeMinutes")}
              </MenuItem>
              <MenuItem value={240}>
                {t("keyboardSettings.led.idle.fourMinutes")}
              </MenuItem>
              <MenuItem value={300}>
                {t("keyboardSettings.led.idle.fiveMinutes")}
              </MenuItem>
              <MenuItem value={600}>
                {t("keyboardSettings.led.idle.tenMinutes")}
              </MenuItem>
              <MenuItem value={900}>
                {t("keyboardSettings.led.idle.fifteenMinutes")}
              </MenuItem>
              <MenuItem value={1200}>
                {t("keyboardSettings.led.idle.twentyMinutes")}
              </MenuItem>
              <MenuItem value={1800}>
                {t("keyboardSettings.led.idle.thirtyMinutes")}
              </MenuItem>
              <MenuItem value={3600}>
                {t("keyboardSettings.led.idle.sixtyMinutes")}
              </MenuItem>
            </Select>
          </FormControl>
        )}
        {ledBrightness >= 0 && (
          <FormControl variant="standard" fullWidth={true}>
            <Typography variant="caption" gutterBottom>
              {t("keyboardSettings.led.brightness")}
            </Typography>
            <Slider
              max={255}
              value={ledBrightness}
              sx={{ width: "300" }}
              onChange={setBrightness}
            />
          </FormControl>
        )}
      </FormGroup>
      <Box sx={{ my: 1, display: "flex" }}>
        <Box sx={{ flexGrow: 1 }} />
        <Button
          onClick={saveKeymapChanges}
          disabled={!modified}
          variant="outlined"
        >
          {t("components.save.saveChanges")}
        </Button>
      </Box>
      <Divider textAlign="left">{t("keyboardSettings.advanced")}</Divider>
      <Box sx={{ my: 2 }}>
        {externalFlasherAvailable && (
          <FormControl
            sx={{
              display: "block",
            }}
          >
            <FormControlLabel
              sx={{
                display: "flex",
                marginRight: 2,
              }}
              control={preferExternalSwitch}
              labelPlacement="start"
              label={t("keyboardSettings.flash.preferExternal")}
            />
          </FormControl>
        )}
        <Button
          disabled={working}
          variant="contained"
          color="secondary"
          onClick={openEEPROMResetConfirmation}
        >
          {t("keyboardSettings.resetEEPROM.button")}
        </Button>
        <ConfirmationDialog
          title={t("keyboardSettings.resetEEPROM.dialogTitle")}
          open={EEPROMResetConfirmationOpen}
          onConfirm={resetEEPROM}
          onCancel={closeEEPROMResetConfirmation}
        >
          {t("keyboardSettings.resetEEPROM.dialogContents")}
        </ConfirmationDialog>
      </Box>
    </Box>
  );
};

export { MyKeyboardPreferences };
