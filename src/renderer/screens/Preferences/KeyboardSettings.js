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
import CardHeader from "@material-ui/core/CardHeader";
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
    marginBottom: theme.spacing(),
    fontWeight: 600
  },
  subtitle: {
    marginBottom: theme.spacing.uni
  },
  subtitle2: {
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing()
  },
  greytext: {
    color: theme.palette.text.hint
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
    width: 300,
    minWidth: 300,
    marginTop: theme.spacing(2)
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

  setHoldTimeout = (event, value) => {
    this.setState({
      qukeysHoldTimeout: value,
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

  setSpeed = (event, value) => {
    this.setState({
      mouseSpeed: value,
      modified: true
    });
    this.props.startContext();
  };

  setSpeedDelay = (event, value) => {
    this.setState({
      mouseSpeedDelay: value,
      modified: true
    });
    this.props.startContext();
  };

  setAccelSpeed = (event, value) => {
    this.setState({
      mouseAccelSpeed: value,
      modified: true
    });
    this.props.startContext();
  };

  setAccelDelay = (event, value) => {
    this.setState({
      mouseAccelDelay: value,
      modified: true
    });
    this.props.startContext();
  };

  setWheelSpeed = (event, value) => {
    this.setState({
      mouseWheelSpeed: value,
      modified: true
    });
    this.props.startContext();
  };

  setWheelDelay = (event, value) => {
    this.setState({
      mouseWheelDelay: value,
      modified: true
    });
    this.props.startContext();
  };

  setSpeedLimit = (event, value) => {
    this.setState({
      mouseSpeedLimit: value,
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
        valueLabelDisplay="auto"
        marks={[{ value: 255, label: i18n.keyboardSettings.defaultLabel }]}
      />
    );
    const holdT = (
      <Slider
        min={0}
        max={65534}
        value={qukeysHoldTimeout}
        className={classes.slider}
        onChange={this.setHoldTimeout}
        valueLabelDisplay="auto"
        marks={[{ value: 65530, label: i18n.keyboardSettings.defaultLabel }]}
      />
    );
    const overlapT = (
      <Slider
        max={100}
        value={qukeysOverlapThreshold}
        className={classes.slider}
        onChange={this.setOverlapThreshold}
        valueLabelDisplay="auto"
        marks={[{ value: 80, label: i18n.keyboardSettings.defaultLabel }]}
      />
    );
    const mSpeed = (
      <Slider
        min={0}
        max={254}
        id="mouseSpeed"
        value={mouseSpeed}
        className={classes.slider}
        onChange={this.setSpeed}
        valueLabelDisplay="auto"
        marks={[{ value: 1, label: i18n.keyboardSettings.defaultLabel }]}
      />
    );
    const mSpeedD = (
      <Slider
        min={0}
        max={65534}
        id="mouseSpeedDelay"
        value={mouseSpeedDelay}
        className={classes.slider}
        onChange={this.setSpeedDelay}
        valueLabelDisplay="auto"
        marks={[{ value: 65281, label: i18n.keyboardSettings.defaultLabel }]}
      />
    );
    const mAccelS = (
      <Slider
        min={0}
        max={254}
        id="mouseAccelSpeed"
        value={mouseAccelSpeed}
        className={classes.slider}
        onChange={this.setAccelSpeed}
        valueLabelDisplay="auto"
        marks={[{ value: 1, label: i18n.keyboardSettings.defaultLabel }]}
      />
    );
    const maccelD = (
      <Slider
        min={0}
        max={65534}
        id="mouseAccelDelay"
        value={mouseAccelDelay}
        className={classes.slider}
        onChange={this.setAccelDelay}
        valueLabelDisplay="auto"
        marks={[{ value: 65344, label: i18n.keyboardSettings.defaultLabel }]}
      />
    );
    const mWheelS = (
      <Slider
        min={0}
        max={254}
        id="mouseWheelSpeed"
        value={mouseWheelSpeed}
        className={classes.slider}
        onChange={this.setWheelSpeed}
        valueLabelDisplay="auto"
        marks={[{ value: 1, label: i18n.keyboardSettings.defaultLabel }]}
      />
    );
    const mWheelD = (
      <Slider
        min={0}
        max={65534}
        id="mouseWheelDelay"
        value={mouseWheelDelay}
        className={classes.slider}
        onChange={this.setWheelDelay}
        valueLabelDisplay="auto"
        marks={[{ value: 65330, label: i18n.keyboardSettings.defaultLabel }]}
      />
    );
    const mSpeedL = (
      <Slider
        min={0}
        max={254}
        id="mouseSpeedLimit"
        value={mouseSpeedLimit}
        className={classes.slider}
        onChange={this.setSpeedLimit}
        valueLabelDisplay="auto"
        marks={[{ value: 127, label: i18n.keyboardSettings.defaultLabel }]}
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
        <FormControl className={classes.group}>
          <Card>
            <CardContent>
              <FormControlLabel
                className={classes.control}
                control={showDefaultLayersSwitch}
                classes={{ label: classes.grow }}
                labelPlacement="start"
                label={i18n.keyboardSettings.keymap.showHardcoded}
              />
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
            </CardContent>
          </Card>
          <Typography
            variant="subtitle1"
            component="h2"
            className={classes.title}
          >
            {i18n.keyboardSettings.led.title}
          </Typography>
          <Card>
            <CardContent>
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
                  label={
                    <p>
                      {i18n.keyboardSettings.led.brightness}
                      <i className={classes.greytext}>
                        {i18n.keyboardSettings.led.brightnesssub}
                      </i>
                    </p>
                  }
                />
              )}
            </CardContent>
          </Card>
          <Typography
            variant="subtitle1"
            component="h2"
            className={classes.title}
          >
            {i18n.keyboardSettings.qukeys.title}
          </Typography>
          <Card>
            <CardContent>
              {qukeysHoldTimeout >= 0 && (
                <FormControlLabel
                  className={classes.control}
                  classes={{ label: classes.grow }}
                  control={holdT}
                  labelPlacement="start"
                  label={
                    <p>
                      {i18n.keyboardSettings.qukeys.holdTimeout}
                      <i className={classes.greytext}>
                        {i18n.keyboardSettings.qukeys.holdTimeoutsub}
                      </i>
                    </p>
                  }
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
                  label={
                    <p>
                      {i18n.keyboardSettings.qukeys.overlapThreshold}
                      <i className={classes.greytext}>
                        {i18n.keyboardSettings.qukeys.overlapThresholdsub}
                      </i>
                    </p>
                  }
                />
              )}
            </CardContent>
          </Card>
          <Typography
            variant="subtitle1"
            component="h2"
            className={classes.title}
          >
            {i18n.keyboardSettings.mouse.title}
          </Typography>
          <Card>
            <CardContent>
              <Typography
                variant="subtitle1"
                component="h2"
                className={classes.subtitle}
              >
                {i18n.keyboardSettings.mouse.subtitle1}
              </Typography>
              {mouseSpeed >= 0 && (
                <FormControlLabel
                  className={classes.control}
                  classes={{ label: classes.grow }}
                  control={mSpeed}
                  labelPlacement="start"
                  label={
                    <p>
                      {i18n.keyboardSettings.mouse.speed}
                      <i className={classes.greytext}>
                        {i18n.keyboardSettings.mouse.speedsub}
                      </i>
                    </p>
                  }
                />
              )}
              {mouseSpeedDelay >= 0 && (
                <FormControlLabel
                  className={classes.control}
                  classes={{ label: classes.grow }}
                  control={mSpeedD}
                  labelPlacement="start"
                  label={
                    <p>
                      {i18n.keyboardSettings.mouse.speedDelay}
                      <i className={classes.greytext}>
                        {i18n.keyboardSettings.mouse.speedDelaysub}
                      </i>
                    </p>
                  }
                />
              )}
              {mouseSpeedLimit >= 0 && (
                <FormControlLabel
                  className={classes.control}
                  classes={{ label: classes.grow }}
                  control={mSpeedL}
                  labelPlacement="start"
                  label={
                    <p>
                      {i18n.keyboardSettings.mouse.speedLimit}
                      <i className={classes.greytext}>
                        {i18n.keyboardSettings.mouse.speedLimitsub}
                      </i>
                    </p>
                  }
                />
              )}
              <Divider className={classes.subtitle2} />
              <Typography
                variant="subtitle1"
                component="h2"
                className={classes.subtitle2}
              >
                {i18n.keyboardSettings.mouse.subtitle2}
              </Typography>
              {mouseAccelSpeed >= 0 && (
                <FormControlLabel
                  className={classes.control}
                  classes={{ label: classes.grow }}
                  control={mAccelS}
                  labelPlacement="start"
                  label={
                    <p>
                      {i18n.keyboardSettings.mouse.accelSpeed}
                      <i className={classes.greytext}>
                        {i18n.keyboardSettings.mouse.accelSpeedsub}
                      </i>
                    </p>
                  }
                />
              )}
              {mouseAccelDelay >= 0 && (
                <FormControlLabel
                  className={classes.control}
                  classes={{ label: classes.grow }}
                  control={maccelD}
                  labelPlacement="start"
                  label={
                    <p>
                      {i18n.keyboardSettings.mouse.accelDelay}
                      <i className={classes.greytext}>
                        {i18n.keyboardSettings.mouse.accelDelaysub}
                      </i>
                    </p>
                  }
                />
              )}
              <Divider className={classes.subtitle2} />
              <Typography
                variant="subtitle1"
                component="h2"
                className={classes.subtitle2}
              >
                {i18n.keyboardSettings.mouse.subtitle3}
              </Typography>
              {mouseWheelSpeed >= 0 && (
                <FormControlLabel
                  className={classes.control}
                  classes={{ label: classes.grow }}
                  control={mWheelS}
                  labelPlacement="start"
                  label={
                    <p>
                      {i18n.keyboardSettings.mouse.wheelSpeed}
                      <i className={classes.greytext}>
                        {i18n.keyboardSettings.mouse.wheelSpeedsub}
                      </i>
                    </p>
                  }
                />
              )}
              {mouseWheelDelay >= 0 && (
                <FormControlLabel
                  className={classes.control}
                  classes={{ label: classes.grow }}
                  control={mWheelD}
                  labelPlacement="start"
                  label={
                    <p>
                      {i18n.keyboardSettings.mouse.wheelDelay}
                      <i className={classes.greytext}>
                        {i18n.keyboardSettings.mouse.wheelDelaysub}
                      </i>
                    </p>
                  }
                />
              )}
            </CardContent>
          </Card>
        </FormControl>
        <SaveChangesButton
          onClick={this.saveKeymapChanges}
          disabled={!modified}
        >
          {i18n.components.save.saveChanges}
        </SaveChangesButton>
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
