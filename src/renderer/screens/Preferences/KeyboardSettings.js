// -*- mode: js-jsx -*-
/* Bazecor -- Kaleidoscope Command Center
 * Copyright (C) 2018, 2019  Keyboardio, Inc.
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
import Divider from "@material-ui/core/Divider";
import FilledInput from "@material-ui/core/FilledInput";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import LinearProgress from "@material-ui/core/LinearProgress";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import Slider from "@material-ui/core/Slider";
import Switch from "@material-ui/core/Switch";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";

import Focus from "../../../api/focus";

import ConfirmationDialog from "../../components/ConfirmationDialog";
import SaveChangesButton from "../../components/SaveChangesButton";
import i18n from "../../i18n";

import settings from "electron-settings";

const styles = theme => ({
  title: {
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing()
  },
  control: {
    display: "flex",
    marginRight: theme.spacing(2)
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
    paddingTop: theme.spacing(),
    width: 200
  },
  selectContainer: {
    marginTop: theme.spacing(2)
  },
  slider: {
    width: 300
  },
  textField: {
    marginTop: theme.spacing()
  },
  sliderContainer: {
    marginTop: theme.spacing(2)
  },
  advanced: {
    display: "flex",
    justifyContent: "center",
    marginTop: theme.spacing(4),
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
    qukeysHoldTimeout: 0,
    qukeysOverlapThreshold: 0,
    mouseSpeed: 0,
    mouseSpeedDelay: 0,
    mouseAccelSpeed: 0,
    mouseAccelDelay: 0,
    mouseWheelSpeed: 0,
    mouseWheelDelay: 0,
    mouseSpeedLimit: 0,
    modified: false,
    showDefaults: false,
    working: false
  };

  delay = ms => new Promise(res => setTimeout(res, ms));

  async componentDidMount() {
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

    this.setState({
      showDefaults: settings.getSync("keymap.showDefaults")
    });

    // QUKEYS variables commands
    focus.command("qukeys.holdTimeout").then(holdTimeout => {
      holdTimeout = holdTimeout ? parseInt(holdTimeout) : -1;
      this.setState({ qukeysHoldTimeout: holdTimeout });
    });

    focus.command("qukeys.overlapThreshold").then(overlapThreshold => {
      overlapThreshold = overlapThreshold ? parseInt(overlapThreshold) : -1;
      this.setState({ qukeysOverlapThreshold: overlapThreshold });
    });

    // MOUSE variables commands
    focus.command("mouse.speed").then(speed => {
      speed = speed ? parseInt(speed) : -1;
      this.setState({ mouseSpeed: speed });
    });

    focus.command("mouse.speedDelay").then(speedDelay => {
      speedDelay = speedDelay ? parseInt(speedDelay) : -1;
      this.setState({ mouseSpeedDelay: speedDelay });
    });

    focus.command("mouse.accelSpeed").then(accelSpeed => {
      accelSpeed = accelSpeed ? parseInt(accelSpeed) : -1;
      this.setState({ mouseAccelSpeed: accelSpeed });
    });

    focus.command("mouse.accelDelay").then(accelDelay => {
      accelDelay = accelDelay ? parseInt(accelDelay) : -1;
      this.setState({ mouseAccelDelay: accelDelay });
    });

    focus.command("mouse.wheelSpeed").then(wheelSpeed => {
      wheelSpeed = wheelSpeed ? parseInt(wheelSpeed) : -1;
      this.setState({ mouseWheelSpeed: wheelSpeed });
    });

    focus.command("mouse.wheelDelay").then(wheelDelay => {
      wheelDelay = wheelDelay ? parseInt(wheelDelay) : -1;
      this.setState({ mouseWheelDelay: wheelDelay });
    });

    focus.command("mouse.speedLimit").then(speedLimit => {
      speedLimit = speedLimit ? parseInt(speedLimit) : -1;
      this.setState({ mouseSpeedLimit: speedLimit });
    });
  }

  UNSAFE_componentWillReceiveProps = nextProps => {
    if (this.props.inContext && !nextProps.inContext) {
      this.componentDidMount();
      this.setState({ modified: false });
    }
  };

  setOnlyCustom = event => {
    const checked = event.target.checked;
    this.setState(state => ({
      modified: true,
      keymap: {
        custom: state.keymap.custom,
        default: state.keymap.default,
        onlyCustom: checked
      }
    }));
    this.props.startContext();
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

  setShowDefaults = event => {
    this.setState({
      showDefaults: event.target.checked,
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

  setHoldTimeout = event => {
    this.setState({
      qukeysHoldTimeout: event.target.value,
      modified: true
    });
    this.props.startContext();
  };

  setOverlapThreshold = (event, value) => {
    this.setState({
      qukeysOverlapThreshold: value,
      modified: true
    });
    this.props.startContext();
  };

  setSpeed = event => {
    this.setState({
      mouseSpeed: event.target.value,
      modified: true
    });
    this.props.startContext();
  };

  setSpeedDelay = event => {
    this.setState({
      mouseSpeedDelay: event.target.value,
      modified: true
    });
    this.props.startContext();
  };

  setAccelSpeed = event => {
    this.setState({
      mouseAccelSpeed: event.target.value,
      modified: true
    });
    this.props.startContext();
  };

  setAccelDelay = event => {
    this.setState({
      mouseAccelDelay: event.target.value,
      modified: true
    });
    this.props.startContext();
  };

  setWheelSpeed = event => {
    this.setState({
      mouseWheelSpeed: event.target.value,
      modified: true
    });
    this.props.startContext();
  };

  setWheelDelay = event => {
    this.setState({
      mouseWheelDelay: event.target.value,
      modified: true
    });
    this.props.startContext();
  };

  setSpeedLimit = event => {
    this.setState({
      mouseSpeedLimit: event.target.value,
      modified: true
    });
    this.props.startContext();
  };

  saveKeymapChanges = async () => {
    const focus = new Focus();

    const {
      keymap,
      defaultLayer,
      showDefaults,
      ledBrightness,
      ledIdleTimeLimit,
      qukeysHoldTimeout,
      qukeysOverlapThreshold,
      mouseSpeed,
      mouseSpeedDelay,
      mouseAccelSpeed,
      mouseAccelDelay,
      mouseWheelSpeed,
      mouseWheelDelay,
      mouseSpeedLimit
    } = this.state;

    await focus.command("keymap.onlyCustom", keymap.onlyCustom);
    await focus.command("settings.defaultLayer", defaultLayer);
    await focus.command("led.brightness", ledBrightness);
    if (ledIdleTimeLimit >= 0)
      await focus.command("idleleds.time_limit", ledIdleTimeLimit);
    settings.setSync("keymap.showDefaults", showDefaults);
    // QUKEYS
    await focus.command("qukeys.holdTimeout", qukeysHoldTimeout);
    await focus.command("qukeys.overlapThreshold", qukeysOverlapThreshold);
    // MOUSE KEYS
    await focus.command("mouse.speed", mouseSpeed);
    await focus.command("mouse.speedDelay", mouseSpeedDelay);
    await focus.command("mouse.accelSpeed", mouseAccelSpeed);
    await focus.command("mouse.accelDelay", mouseAccelDelay);
    await focus.command("mouse.wheelSpeed", mouseWheelSpeed);
    await focus.command("mouse.wheelDelay", mouseWheelDelay);
    await focus.command("mouse.speedLimit", mouseSpeedLimit);

    this.setState({ modified: false });
    this.props.cancelContext();
  };

  render() {
    const { classes } = this.props;
    const {
      keymap,
      defaultLayer,
      modified,
      showDefaults,
      ledBrightness,
      ledIdleTimeLimit,
      qukeysHoldTimeout,
      qukeysOverlapThreshold,
      mouseSpeed,
      mouseSpeedDelay,
      mouseAccelSpeed,
      mouseAccelDelay,
      mouseWheelSpeed,
      mouseWheelDelay,
      mouseSpeedLimit
    } = this.state;

    const onlyCustomSwitch = (
      <Switch
        checked={keymap.onlyCustom}
        value="onlyCustom"
        onClick={this.setOnlyCustom}
      />
    );
    const showDefaultLayersSwitch = (
      <Switch
        checked={showDefaults}
        value="showDefaults"
        onClick={this.setShowDefaults}
      />
    );
    let layers;
    if (keymap.onlyCustom) {
      layers = keymap.custom.map((_, index) => {
        return (
          <MenuItem value={index} key={index}>
            {i18n.formatString(i18n.components.layer, index)}
          </MenuItem>
        );
      });
    } else {
      layers = keymap.default.concat(keymap.custom).map((_, index) => {
        return (
          <MenuItem value={index} key={index}>
            {i18n.formatString(i18n.components.layer, index)}
          </MenuItem>
        );
      });
    }
    const defaultLayerSelect = (
      <Select
        onChange={this.selectDefaultLayer}
        value={defaultLayer}
        variant="filled"
        input={<FilledInput classes={{ input: classes.select }} />}
      >
        <MenuItem value={126}>
          {i18n.keyboardSettings.keymap.noDefault}
        </MenuItem>
        {layers}
      </Select>
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
        <MenuItem value={0}>{i18n.keyboardSettings.led.idleDisabled}</MenuItem>
        <MenuItem value={60}>
          {i18n.keyboardSettings.led.idle.oneMinute}
        </MenuItem>
        <MenuItem value={120}>
          {i18n.keyboardSettings.led.idle.twoMinutes}
        </MenuItem>
        <MenuItem value={180}>
          {i18n.keyboardSettings.led.idle.threeMinutes}
        </MenuItem>
        <MenuItem value={240}>
          {i18n.keyboardSettings.led.idle.fourMinutes}
        </MenuItem>
        <MenuItem value={300}>
          {i18n.keyboardSettings.led.idle.fiveMinutes}
        </MenuItem>
        <MenuItem value={600}>
          {i18n.keyboardSettings.led.idle.tenMinutes}
        </MenuItem>
        <MenuItem value={900}>
          {i18n.keyboardSettings.led.idle.fifteenMinutes}
        </MenuItem>
        <MenuItem value={1200}>
          {i18n.keyboardSettings.led.idle.twentyMinutes}
        </MenuItem>
        <MenuItem value={1800}>
          {i18n.keyboardSettings.led.idle.thirtyMinutes}
        </MenuItem>
        <MenuItem value={3600}>
          {i18n.keyboardSettings.led.idle.oneHour}
        </MenuItem>
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
    const holdT = (
      <TextField
        id="holdTimeout"
        lable="Hold Timeout"
        value={qukeysHoldTimeout}
        onChange={this.setHoldTimeout}
        className={classes.textField}
        inputProps={{
          inputProps: {
            min: 0,
            max: 65534
          },
          style: {
            padding: 12
          }
        }}
        variant="filled"
      />
    );
    const overlapT = (
      <Slider
        max={100}
        value={qukeysOverlapThreshold}
        className={classes.slider}
        onChange={this.setOverlapThreshold}
      />
    );
    const mSpeed = (
      <TextField
        id="mouseSpeed"
        lable="Mouse Speed"
        value={mouseSpeed}
        onChange={this.setSpeed}
        className={classes.textField}
        inputProps={{
          inputProps: {
            min: 0,
            max: 254
          },
          style: {
            padding: 12
          }
        }}
        variant="filled"
      />
    );
    const mSpeedD = (
      <TextField
        id="mouseSpeedDelay"
        lable="Mouse Speed Delay"
        value={mouseSpeedDelay}
        onChange={this.setSpeedDelay}
        className={classes.textField}
        inputProps={{
          inputProps: {
            min: 0,
            max: 65534
          },
          style: {
            padding: 12
          }
        }}
        variant="filled"
      />
    );
    const mAccelS = (
      <TextField
        id="mouseAccelSpeed"
        lable="Mouse Acceleration Speed"
        value={mouseAccelSpeed}
        onChange={this.setAccelSpeed}
        className={classes.textField}
        inputProps={{
          inputProps: {
            min: 0,
            max: 254
          },
          style: {
            padding: 12
          }
        }}
        variant="filled"
      />
    );
    const maccelD = (
      <TextField
        id="mouseAccelDelay"
        lable="Mouse Acceleration Delay"
        value={mouseAccelDelay}
        onChange={this.setAccelDelay}
        className={classes.textField}
        inputProps={{
          inputProps: {
            min: 0,
            max: 65534
          },
          style: {
            padding: 12
          }
        }}
        variant="filled"
      />
    );
    const mWheelS = (
      <TextField
        id="mouseWheelSpeed"
        lable="Mouse Wheel Speed"
        value={mouseWheelSpeed}
        onChange={this.setWheelSpeed}
        className={classes.textField}
        inputProps={{
          inputProps: {
            min: 0,
            max: 254
          },
          style: {
            padding: 12
          }
        }}
        variant="filled"
      />
    );
    const mWheelD = (
      <TextField
        id="mouseWheelDelay"
        lable="Mouse Wheel Delay"
        value={mouseWheelDelay}
        onChange={this.setWheelDelay}
        className={classes.textField}
        inputProps={{
          inputProps: {
            min: 0,
            max: 65534
          },
          style: {
            padding: 12
          }
        }}
        variant="filled"
      />
    );
    const mSpeedL = (
      <TextField
        id="mouseSpeedLimit"
        lable="Mouse Speed Limit"
        value={mouseSpeedLimit}
        onChange={this.setSpeedLimit}
        className={classes.textField}
        inputProps={{
          inputProps: {
            min: 0,
            max: 254
          },
          style: {
            padding: 12
          }
        }}
        variant="filled"
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
          {i18n.keyboardSettings.keymap.title}
        </Typography>
        <Card>
          <CardContent>
            <FormControl className={classes.group}>
              <FormControlLabel
                className={classes.control}
                control={showDefaultLayersSwitch}
                classes={{ label: classes.grow }}
                labelPlacement="start"
                label={i18n.keyboardSettings.keymap.showHardcoded}
              />
              <Divider />
              <FormControlLabel
                className={classes.control}
                control={onlyCustomSwitch}
                classes={{ label: classes.grow }}
                labelPlacement="start"
                label={i18n.keyboardSettings.keymap.onlyCustom}
              />
              <FormControlLabel
                className={classes.control}
                classes={{ label: classes.grow }}
                control={defaultLayerSelect}
                labelPlacement="start"
                label={i18n.keyboardSettings.keymap.defaultLayer}
              />
              <Divider />
              {ledIdleTimeLimit >= 0 && (
                <FormControlLabel
                  className={classes.control}
                  classes={{ label: classes.grow }}
                  control={idleControl}
                  labelPlacement="start"
                  label={i18n.keyboardSettings.led.idleTimeLimit}
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
                  label={i18n.keyboardSettings.led.brightness}
                />
              )}
              <Divider />
              {qukeysHoldTimeout >= 0 && (
                <FormControlLabel
                  className={classes.control}
                  classes={{ label: classes.grow }}
                  control={holdT}
                  labelPlacement="start"
                  label={i18n.keyboardSettings.qukeys.holdTimeout}
                />
              )}
              {qukeysOverlapThreshold >= 0 && (
                <FormControlLabel
                  className={classes.control}
                  classes={{
                    label: classes.grow,
                    root: classes.sliderContainer
                  }}
                  control={overlapT}
                  labelPlacement="start"
                  label={i18n.keyboardSettings.qukeys.overlapThreshold}
                />
              )}
              <Divider />
              {mouseSpeed >= 0 && (
                <FormControlLabel
                  className={classes.control}
                  classes={{ label: classes.grow }}
                  control={mSpeed}
                  labelPlacement="start"
                  label={i18n.keyboardSettings.mouse.speed}
                />
              )}
              {mouseSpeedDelay >= 0 && (
                <FormControlLabel
                  className={classes.control}
                  classes={{ label: classes.grow }}
                  control={mSpeedD}
                  labelPlacement="start"
                  label={i18n.keyboardSettings.mouse.speedDelay}
                />
              )}
              {mouseAccelSpeed >= 0 && (
                <FormControlLabel
                  className={classes.control}
                  classes={{ label: classes.grow }}
                  control={mAccelS}
                  labelPlacement="start"
                  label={i18n.keyboardSettings.mouse.accelSpeed}
                />
              )}
              {mouseAccelDelay >= 0 && (
                <FormControlLabel
                  className={classes.control}
                  classes={{ label: classes.grow }}
                  control={maccelD}
                  labelPlacement="start"
                  label={i18n.keyboardSettings.mouse.accelDelay}
                />
              )}
              {mouseWheelSpeed >= 0 && (
                <FormControlLabel
                  className={classes.control}
                  classes={{ label: classes.grow }}
                  control={mWheelS}
                  labelPlacement="start"
                  label={i18n.keyboardSettings.mouse.wheelSpeed}
                />
              )}
              {mouseWheelDelay >= 0 && (
                <FormControlLabel
                  className={classes.control}
                  classes={{ label: classes.grow }}
                  control={mWheelD}
                  labelPlacement="start"
                  label={i18n.keyboardSettings.mouse.wheelDelay}
                />
              )}
              {mouseSpeedLimit >= 0 && (
                <FormControlLabel
                  className={classes.control}
                  classes={{ label: classes.grow }}
                  control={mSpeedL}
                  labelPlacement="start"
                  label={i18n.keyboardSettings.mouse.speedLimit}
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
              {i18n.components.save.saveChanges}
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
    EEPROMClearConfirmationOpen: false
  };

  clearEEPROM = async () => {
    const focus = new Focus();

    await this.setState({ working: true });
    this.closeEEPROMClearConfirmation();

    let eeprom = await focus.command("eeprom.contents");
    eeprom = eeprom
      .split(" ")
      .filter(v => v.length > 0)
      .map(() => 255)
      .join(" ");
    await focus.command("eeprom.contents", eeprom);
    this.setState({ working: false });
  };
  openEEPROMClearConfirmation = () => {
    this.setState({ EEPROMClearConfirmationOpen: true });
  };
  closeEEPROMClearConfirmation = () => {
    this.setState({ EEPROMClearConfirmationOpen: false });
  };

  render() {
    const { classes } = this.props;

    return (
      <React.Fragment>
        {this.state.working && <LinearProgress variant="query" />}
        <Typography
          variant="subtitle1"
          component="h2"
          className={classes.title}
        >
          {i18n.keyboardSettings.advancedOps}
        </Typography>
        <Card>
          <CardActions>
            <Button
              disabled={this.state.working}
              variant="contained"
              color="secondary"
              onClick={this.openEEPROMClearConfirmation}
            >
              {i18n.keyboardSettings.resetEEPROM.button}
            </Button>
          </CardActions>
        </Card>
        <ConfirmationDialog
          title={i18n.keyboardSettings.resetEEPROM.dialogTitle}
          open={this.state.EEPROMClearConfirmationOpen}
          onConfirm={this.clearEEPROM}
          onCancel={this.closeEEPROMClearConfirmation}
        >
          {i18n.keyboardSettings.resetEEPROM.dialogContents}
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
