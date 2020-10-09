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

import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import FilledInput from "@material-ui/core/FilledInput";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import LinearProgress from "@material-ui/core/LinearProgress";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import Slider from "@material-ui/core/Slider";
import Switch from "@material-ui/core/Switch";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";

import Focus from "../../../api/focus";

import ConfirmationDialog from "../../components/ConfirmationDialog";
import SaveChangesButton from "../../components/SaveChangesButton";
import i18n from "../../i18n";
import clearEEPROM from "../../utils/clearEEPROM";
import checkExternalFlasher from "../../utils/checkExternalFlasher";

import settings from "electron-settings";

const styles = theme => ({
  title: {
    marginTop: theme.spacing.unit * 4,
    marginBottom: theme.spacing.unit
  },
  control: {
    display: "flex",
    marginRight: theme.spacing.unit * 2
  },
  group: {
    display: "block"
  },
  grow: {
    flexGrow: 1
  },
  flex: {
    display: "flex"
  },
  select: {
    paddingTop: theme.spacing.unit * 1,
    width: 200
  },
  selectContainer: {
    marginTop: theme.spacing.unit * 2
  },
  slider: {
    width: 300
  },
  sliderContainer: {
    marginTop: theme.spacing.unit * 2
  },
  advanced: {
    display: "flex",
    justifyContent: "center",
    marginTop: theme.spacing.unit * 4,
    "& button": {
      textTransform: "none",
      "& span svg": {
        marginLeft: "1.5em"
      }
    }
  }
});

class KeyboardSettings extends React.Component {
  state = {
    keymap: {
      custom: [],
      default: [],
      onlyCustom: false
    },
    ledBrightness: 255,
    ledIdleTimeLimit: 0,
    defaultLayer: 126,
    modified: false,
    working: false
  };

  componentDidMount() {
    const focus = new Focus();
    focus.command("keymap").then(keymap => {
      this.setState({ keymap: keymap });
    });
    focus.command("settings.defaultLayer").then(layer => {
      layer = layer ? parseInt(layer) : 126;
      this.setState({ defaultLayer: layer <= 126 ? layer : 126 });
    });
    focus.command("led.brightness").then(brightness => {
      brightness = brightness ? parseInt(brightness) : -1;
      this.setState({ ledBrightness: brightness });
    });
    focus.command("idleleds.time_limit").then(limit => {
      limit = limit ? parseInt(limit) : -1;
      this.setState({ ledIdleTimeLimit: limit });
    });
  }

  UNSAFE_componentWillReceiveProps = nextProps => {
    if (this.props.inContext && !nextProps.inContext) {
      this.componentDidMount();
      this.setState({ modified: false });
    }
  };

  selectDefaultLayer = event => {
    this.setState({
      defaultLayer: event.target.value,
      modified: true
    });
    this.props.startContext();
  };

  selectIdleLEDTime = event => {
    this.setState({
      ledIdleTimeLimit: event.target.value,
      modified: true
    });
    this.props.startContext();
  };

  setBrightness = (event, value) => {
    this.setState({
      ledBrightness: value,
      modified: true
    });
    this.props.startContext();
  };

  saveKeymapChanges = async () => {
    const focus = new Focus();

    const { defaultLayer, ledBrightness, ledIdleTimeLimit } = this.state;

    await focus.command("settings.defaultLayer", defaultLayer);
    await focus.command("led.brightness", ledBrightness);
    if (ledIdleTimeLimit >= 0)
      await focus.command("idleleds.time_limit", ledIdleTimeLimit);
    this.setState({ modified: false });
    this.props.cancelContext();
  };

  render() {
    const { classes } = this.props;
    const {
      keymap,
      defaultLayer,
      modified,
      ledBrightness,
      ledIdleTimeLimit
    } = this.state;

    const layers = keymap.custom.map((_, index) => {
      return (
        <MenuItem value={index} key={index}>
          {i18n.t("components.layer", { index: index })}
        </MenuItem>
      );
    });
    const defaultLayerSelect = (
      <Select
        onChange={this.selectDefaultLayer}
        value={defaultLayer}
        variant="filled"
        input={<FilledInput classes={{ input: classes.select }} />}
      >
        <MenuItem value={126}>
          {i18n.t("keyboardSettings.keymap.noDefault")}
        </MenuItem>
        {layers}
      </Select>
    );
    const brightnessControl = (
      <Slider
        max={255}
        value={ledBrightness}
        className={classes.slider}
        onChange={this.setBrightness}
      />
    );
    const idleControl = (
      <Select
        onChange={this.selectIdleLEDTime}
        value={ledIdleTimeLimit}
        variant="filled"
        input={
          <FilledInput
            classes={{
              root: classes.selectContainer,
              input: classes.select
            }}
          />
        }
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
    );

    return (
      <React.Fragment>
        {this.state.working && <LinearProgress variant="query" />}
        <Typography
          variant="subtitle1"
          component="h2"
          className={classes.title}
        >
          {i18n.t("keyboardSettings.keymap.title")}
        </Typography>
        <Card>
          <CardContent>
            <FormControl className={classes.group}>
              <FormControlLabel
                className={classes.control}
                classes={{ label: classes.grow }}
                control={defaultLayerSelect}
                labelPlacement="start"
                label={i18n.t("keyboardSettings.keymap.defaultLayer")}
              />
              {ledIdleTimeLimit >= 0 && (
                <FormControlLabel
                  className={classes.control}
                  classes={{ label: classes.grow }}
                  control={idleControl}
                  labelPlacement="start"
                  label={i18n.t("keyboardSettings.led.idleTimeLimit")}
                />
              )}
              {ledBrightness >= 0 && (
                <FormControlLabel
                  className={classes.control}
                  classes={{
                    label: classes.grow,
                    root: classes.sliderContainer
                  }}
                  control={brightnessControl}
                  labelPlacement="start"
                  label={i18n.t("keyboardSettings.led.brightness")}
                />
              )}
            </FormControl>
          </CardContent>
          <CardActions className={classes.flex}>
            <span className={classes.grow} />
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

KeyboardSettings.propTypes = {
  classes: PropTypes.object.isRequired
};

class AdvancedKeyboardSettings extends React.Component {
  state = {
    EEPROMResetConfirmationOpen: false,
    externalFlasherAvailable: false,
    preferExternalFlasher: false
  };

  resetEEPROM = async () => {
    await this.setState({ working: true });
    this.closeEEPROMResetConfirmation();

    await clearEEPROM();
    this.setState({ working: false });
  };
  openEEPROMResetConfirmation = () => {
    this.setState({ EEPROMResetConfirmationOpen: true });
  };
  closeEEPROMResetConfirmation = () => {
    this.setState({ EEPROMResetConfirmationOpen: false });
  };

  setPreferExternalFlasher = event => {
    settings.set("flash.preferExternalFlasher", event.target.checked);
    this.setState({
      preferExternalFlasher: event.target.checked
    });
  };

  componentDidMount() {
    const focus = new Focus();
    checkExternalFlasher(focus.device).then(available => {
      this.setState({
        externalFlasherAvailable: available,
        preferExternalFlasher: settings.get("flash.preferExternalFlasher")
      });
    });
  }

  render() {
    const { classes } = this.props;
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
          className={classes.title}
        >
          {i18n.t("keyboardSettings.advancedOps")}
        </Typography>
        <Card>
          {externalFlasherAvailable && (
            <CardContent>
              <FormControl className={classes.group}>
                <FormControlLabel
                  className={classes.control}
                  control={preferExternalSwitch}
                  classes={{ label: classes.grow }}
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

AdvancedKeyboardSettings.propTypes = {
  classes: PropTypes.object.isRequired
};

const StyledKeyboardSettings = withStyles(styles)(KeyboardSettings);
const StyledAdvancedKeyboardSettings = withStyles(styles)(
  AdvancedKeyboardSettings
);

export {
  StyledKeyboardSettings as KeyboardSettings,
  StyledAdvancedKeyboardSettings as AdvancedKeyboardSettings
};
