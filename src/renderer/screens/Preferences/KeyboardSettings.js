// -*- mode: js-jsx -*-
/* Chrysalis -- Kaleidoscope Command Center
 * Copyright (C) 2018, 2019, 2020  Keyboardio, Inc.
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

import React, { useEffect, useState } from "react";

import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import FilledInput from "@mui/material/FilledInput";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import InputLabel from "@mui/material/InputLabel";
import LinearProgress from "@mui/material/LinearProgress";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Slider from "@mui/material/Slider";
import Switch from "@mui/material/Switch";
import Typography from "@mui/material/Typography";

import Focus from "../../../api/focus";

import ConfirmationDialog from "../../components/ConfirmationDialog";
import SaveChangesButton from "../../components/SaveChangesButton";
import i18n from "../../i18n";
import clearEEPROM from "../../utils/clearEEPROM";
import deviceReset from "../../utils/deviceReset";
import checkExternalFlasher from "../../utils/checkExternalFlasher";

import {
  showContextBar,
  hideContextBar,
} from "@renderer/components/ContextBar";

const Store = require("electron-store");
const settings = new Store();

const KeyboardSettings = (props) => {
  const [keymap, setKeymap] = useState({
    custom: [],
    default: [],
    onlyCustom: false,
  });
  const [defaultLayer, setDefaultLayer] = useState(126);
  const [ledBrightness, setLedBrightness] = useState(255);
  const [ledIdleTimeLimit, setLedIdleTimeLimit] = useState(0);

  const [modified, setModified] = useState(false);
  const [working, setWorking] = useState(false);
  const focus = new Focus();

  const initState = async () => {
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
  });

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
    setModified(false);
    hideContextBar();
  };

  const layers = keymap.custom.map((_, index) => {
    return (
      <MenuItem value={index} key={index}>
        {i18n.t("components.layer", { index: index })}
      </MenuItem>
    );
  });

  return (
    <React.Fragment>
      {working && <LinearProgress variant="query" />}
      <Typography
        variant="subtitle1"
        component="h2"
        sx={{
          marginTop: 4,
          marginBottom: 1,
        }}
      >
        {i18n.t("keyboardSettings.keymap.title")}
      </Typography>
      <Card>
        <CardContent>
          <FormGroup
            sx={{
              display: "block",
            }}
          >
            <FormControl variant="standard" fullWidth={true}>
              <InputLabel>
                {i18n.t("keyboardSettings.keymap.defaultLayer")}
              </InputLabel>
              <Select
                onChange={selectDefaultLayer}
                sx={{ mb: 2 }}
                value={defaultLayer}
                variant="filled"
                input={<FilledInput sx={{}} />}
              >
                <MenuItem value={126}>
                  {i18n.t("keyboardSettings.keymap.noDefault")}
                </MenuItem>
                {layers}
              </Select>
            </FormControl>

            {ledIdleTimeLimit >= 0 && (
              <FormControl variant="standard" fullWidth={true}>
                <InputLabel>
                  {i18n.t("keyboardSettings.led.idleTimeLimit")}
                </InputLabel>
                <Select
                  onChange={selectIdleLEDTime}
                  value={ledIdleTimeLimit}
                  variant="filled"
                  input={<FilledInput sx={{}} />}
                >
                  <MenuItem value={0}>
                    {i18n.t("keyboardSettings.led.idleDisabled")}
                  </MenuItem>
                  <MenuItem value={60}>
                    {i18n.t("keyboardSettings.led.idle.oneMinute")}
                  </MenuItem>
                  <MenuItem value={120}>
                    {i18n.t("keyboardSettings.led.idle.twoMinutes")}
                  </MenuItem>
                  <MenuItem value={180}>
                    {i18n.t("keyboardSettings.led.idle.threeMinutes")}
                  </MenuItem>
                  <MenuItem value={240}>
                    {i18n.t("keyboardSettings.led.idle.fourMinutes")}
                  </MenuItem>
                  <MenuItem value={300}>
                    {i18n.t("keyboardSettings.led.idle.fiveMinutes")}
                  </MenuItem>
                  <MenuItem value={600}>
                    {i18n.t("keyboardSettings.led.idle.tenMinutes")}
                  </MenuItem>
                  <MenuItem value={900}>
                    {i18n.t("keyboardSettings.led.idle.fifteenMinutes")}
                  </MenuItem>
                  <MenuItem value={1200}>
                    {i18n.t("keyboardSettings.led.idle.twentyMinutes")}
                  </MenuItem>
                  <MenuItem value={1800}>
                    {i18n.t("keyboardSettings.led.idle.thirtyMinutes")}
                  </MenuItem>
                  <MenuItem value={3600}>
                    {i18n.t("keyboardSettings.led.idle.sixtyMinutes")}
                  </MenuItem>
                </Select>
              </FormControl>
            )}
            {ledBrightness >= 0 && (
              <FormControl variant="standard" fullWidth={true}>
                <Typography variant="caption" gutterBottom>
                  {i18n.t("keyboardSettings.led.brightness")}
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
        </CardContent>
        <CardActions sx={{ flexGrow: 1 }}>
          <SaveChangesButton onClick={saveKeymapChanges} disabled={!modified}>
            {i18n.t("components.save.saveChanges")}
          </SaveChangesButton>
        </CardActions>
      </Card>
    </React.Fragment>
  );
};

const AdvancedKeyboardSettings = () => {
  const [EEPROMResetConfirmationOpen, setEEPROMResetConfirmationOpen] =
    useState(false);
  const [externalFlasherAvailable, setExternalFlasherAvailable] =
    useState(false);
  const [preferExternalFlasher, _setPreferExternalFlasher] = useState(false);
  const [working, setWorking] = useState(false);
  const resetEEPROM = async () => {
    setWorking(true);
    closeEEPROMResetConfirmation();

    await clearEEPROM();
    await deviceReset();
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
    <React.Fragment>
      {working && <LinearProgress variant="query" />}
      <Typography
        variant="subtitle1"
        component="h2"
        sx={{
          marginTop: 4,
          marginBottom: 1,
        }}
      >
        {i18n.t("keyboardSettings.advancedOps")}
      </Typography>
      <Card>
        {externalFlasherAvailable && (
          <CardContent>
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
                label={i18n.t("keyboardSettings.flash.preferExternal")}
              />
            </FormControl>
          </CardContent>
        )}
        <CardActions>
          <Button
            disabled={working}
            variant="contained"
            color="secondary"
            onClick={openEEPROMResetConfirmation}
          >
            {i18n.t("keyboardSettings.resetEEPROM.button")}
          </Button>
        </CardActions>
      </Card>
      <ConfirmationDialog
        title={i18n.t("keyboardSettings.resetEEPROM.dialogTitle")}
        open={EEPROMResetConfirmationOpen}
        onConfirm={resetEEPROM}
        onCancel={closeEEPROMResetConfirmation}
      >
        {i18n.t("keyboardSettings.resetEEPROM.dialogContents")}
      </ConfirmationDialog>
    </React.Fragment>
  );
};

export { KeyboardSettings, AdvancedKeyboardSettings };
