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

import React from "react";
import PropTypes from "prop-types";

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
import { FocusCommands } from "@api/flash";

import ConfirmationDialog from "../../components/ConfirmationDialog";
import SaveChangesButton from "../../components/SaveChangesButton";
import i18n from "../../i18n";
import clearEEPROM from "../../utils/clearEEPROM";
import checkExternalFlasher from "../../utils/checkExternalFlasher";

import {
  showContextBar,
  hideContextBar,
} from "@renderer/components/ContextBar";

const Store = require("electron-store");
const settings = new Store();

class KeyboardSettings extends React.Component {
  state = {
    keymap: {
      custom: [],
      default: [],
      onlyCustom: false,
    },
    ledBrightness: 255,
    ledIdleTimeLimit: 0,
    defaultLayer: 126,
    modified: false,
    working: false,
  };

  componentDidMount() {
    this.context_bar_channel = new BroadcastChannel("context_bar");

    const focus = new Focus();

    focus.command("keymap").then((keymap) => {
      this.setState({ keymap: keymap });
    });
    focus.command("settings.defaultLayer").then((layer) => {
      layer = layer ? parseInt(layer) : 126;
      this.setState({ defaultLayer: layer <= 126 ? layer : 126 });
    });
    focus.command("led.brightness").then((brightness) => {
      brightness = brightness ? parseInt(brightness) : -1;
      this.setState({ ledBrightness: brightness });
    });
    focus.command("idleleds.time_limit").then((limit) => {
      limit = limit ? parseInt(limit) : -1;
      this.setState({ ledIdleTimeLimit: limit });
    });

    this.context_bar_channel.onmessage = (event) => {
      if (event.data === "changes-discarded") {
        this.componentDidMount();

        this.setState({ modified: false });
      }
    };
  }

  componentWillUnmount() {
    this.context_bar_channel.close();
  }

  selectDefaultLayer = (event) => {
    this.setState({
      defaultLayer: event.target.value,
      modified: true,
    });
    showContextBar();
  };

  selectIdleLEDTime = (event) => {
    this.setState({
      ledIdleTimeLimit: event.target.value,
      modified: true,
    });
    showContextBar();
  };

  setBrightness = (event, value) => {
    this.setState({
      ledBrightness: value,
      modified: true,
    });
    showContextBar();
  };

  saveKeymapChanges = async () => {
    const focus = new Focus();

    const { defaultLayer, ledBrightness, ledIdleTimeLimit } = this.state;

    await focus.command("settings.defaultLayer", defaultLayer);
    await focus.command("led.brightness", ledBrightness);
    if (ledIdleTimeLimit >= 0)
      await focus.command("idleleds.time_limit", ledIdleTimeLimit);
    this.setState({ modified: false });
    hideContextBar();
  };

  render() {
    const { keymap, defaultLayer, modified, ledBrightness, ledIdleTimeLimit } =
      this.state;

    const layers = keymap.custom.map((_, index) => {
      return (
        <MenuItem value={index} key={index}>
          {i18n.t("components.layer", { index: index })}
        </MenuItem>
      );
    });

    return (
      <React.Fragment>
        {this.state.working && <LinearProgress variant="query" />}
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
                  onChange={this.selectDefaultLayer}
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
                    onChange={this.selectIdleLEDTime}
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
                    onChange={this.setBrightness}
                  />
                </FormControl>
              )}
            </FormGroup>
          </CardContent>
          <CardActions sx={{ flexGrow: 1 }}>
            <SaveChangesButton
              onClick={this.saveKeymapChanges}
              disabled={!modified}
            >
              {i18n.t("components.save.saveChanges")}
            </SaveChangesButton>
          </CardActions>
        </Card>
      </React.Fragment>
    );
  }
}

class AdvancedKeyboardSettings extends React.Component {
  state = {
    EEPROMResetConfirmationOpen: false,
    externalFlasherAvailable: false,
    preferExternalFlasher: false,
  };

  resetEEPROM = async () => {
    const focusCommands = new FocusCommands({ focus: new Focus() });

    await this.setState({ working: true });
    this.closeEEPROMResetConfirmation();

    await clearEEPROM();
    await focusCommands.reboot();
    this.setState({ working: false });
  };
  openEEPROMResetConfirmation = () => {
    this.setState({ EEPROMResetConfirmationOpen: true });
  };
  closeEEPROMResetConfirmation = () => {
    this.setState({ EEPROMResetConfirmationOpen: false });
  };

  setPreferExternalFlasher = async (event) => {
    await settings.set("flash.preferExternalFlasher", event.target.checked);
    this.setState({
      preferExternalFlasher: event.target.checked,
    });
  };

  componentDidMount() {
    const focus = new Focus();
    checkExternalFlasher(focus.device).then(async (available) => {
      this.setState({
        externalFlasherAvailable: available,
        preferExternalFlasher: await settings.get(
          "flash.preferExternalFlasher"
        ),
      });
    });
  }

  render() {
    const { externalFlasherAvailable, preferExternalFlasher } = this.state;

    const preferExternalSwitch = (
      <Switch
        checked={preferExternalFlasher}
        value="preferExternalFlasher"
        onClick={this.setPreferExternalFlasher}
      />
    );

    return (
      <React.Fragment>
        {this.state.working && <LinearProgress variant="query" />}
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
              disabled={this.state.working}
              variant="contained"
              color="secondary"
              onClick={this.openEEPROMResetConfirmation}
            >
              {i18n.t("keyboardSettings.resetEEPROM.button")}
            </Button>
          </CardActions>
        </Card>
        <ConfirmationDialog
          title={i18n.t("keyboardSettings.resetEEPROM.dialogTitle")}
          open={this.state.EEPROMResetConfirmationOpen}
          onConfirm={this.resetEEPROM}
          onCancel={this.closeEEPROMResetConfirmation}
        >
          {i18n.t("keyboardSettings.resetEEPROM.dialogContents")}
        </ConfirmationDialog>
      </React.Fragment>
    );
  }
}
export { KeyboardSettings, AdvancedKeyboardSettings };
