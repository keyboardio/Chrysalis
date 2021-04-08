// -*- mode: js-jsx -*-
/* Bazecor -- Kaleidoscope Command Center
 * Copyright (C) 2018, 2019  Keyboardio, Inc.
 * Copyright (C) 2019  DygmaLab SE
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
import Electron, { app } from "electron";

import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import ArrowDropUpIcon from "@material-ui/icons/ArrowDropUp";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Collapse from "@material-ui/core/Collapse";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Portal from "@material-ui/core/Portal";
import MenuItem from "@material-ui/core/MenuItem";
import FilledInput from "@material-ui/core/FilledInput";
import Select from "@material-ui/core/Select";
import Switch from "@material-ui/core/Switch";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import { toast } from "react-toastify";
import {
  ComputerRounded,
  Brightness3Rounded,
  WbSunnyRounded
} from "@material-ui/icons";

import {
  KeyboardSettings,
  AdvancedKeyboardSettings
} from "./Preferences/KeyboardSettings";
import ColorSettings from "./Preferences/ColorSettings";
import i18n from "../i18n";

import Focus from "../../api/focus";
import settings from "electron-settings";

const { ipcRenderer } = require("electron");

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    margin: `0px ${theme.spacing(8)}px`
  },
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
  selectDarkMode: {
    paddingTop: theme.spacing(),
    width: 30
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

class Preferences extends React.Component {
  state = {
    devTools: false,
    advanced: false,
    verboseFocus: false,
    darkMode: "system"
  };

  componentDidMount() {
    const webContents = Electron.remote.getCurrentWebContents();
    this.setState({ devTools: webContents.isDevToolsOpened() });
    webContents.on("devtools-opened", () => {
      this.setState({ devTools: true });
    });
    webContents.on("devtools-closed", () => {
      this.setState({ devTools: false });
    });

    let focus = new Focus();
    this.setState({ verboseFocus: focus.debug });

    let darkModeSetting = settings.getSync("ui.darkModePref");
    console.log("bleep!:", darkModeSetting);
    if (darkModeSetting === undefined) {
      darkModeSetting = "system";
    }
    this.setState({ darkMode: darkModeSetting });
  }

  toggleDevTools = event => {
    this.setState({ devTools: event.target.checked });
    if (event.target.checked) {
      Electron.remote.getCurrentWebContents().openDevTools();
    } else {
      Electron.remote.getCurrentWebContents().closeDevTools();
    }
  };

  setLanguage = async event => {
    i18n.setLanguage(event.target.value);
    await this.setState({});
    await settings.set("ui.language", event.target.value);
  };

  toggleAdvanced = () => {
    this.setState(state => ({
      advanced: !state.advanced
    }));
  };

  selectDarkMode = event => {
    this.setState({ darkMode: event.target.value });
    const darkMode = event.target.value;
    ipcRenderer.invoke("dark-mode:set", darkMode);

    // TODO this needs to be fixed to change the settings without requiring a restart
    if (darkMode === "system") {
      toast.info(
        <div>
          <ComputerRounded />
          <p>
            <b>Dark mode preferences updated!</b>
          </p>
          <p>Please restart BAZECOR for the changes to take effect</p>
        </div>
      );
    } else if (darkMode === "dark") {
      toast.info(
        <div>
          <Brightness3Rounded />
          <p>
            <b>Dark mode preferences updated!</b>
          </p>
          <p>Please restart BAZECOR for the changes to take effect</p>
        </div>
      );
    } else {
      toast.info(
        <div>
          <WbSunnyRounded />
          <p>
            <b>Blues brothers mode enabled!</b>
          </p>
          <p>Please restart BAZECOR when your have you sunglasses ready!</p>
        </div>
      );
    }
  };

  toggleVerboseFocus = event => {
    this.setState({ verboseFocus: event.target.checked });
    let focus = new Focus();
    focus.debug = event.target.checked;
  };

  render() {
    const { classes } = this.props;

    const darkModeSwitch = (
      <Select
        onChange={this.selectDarkMode}
        value={this.state.darkMode}
        variant="filled"
        input={
          <FilledInput
            classes={{
              root: classes.selectContainer,
              input: classes.selectDarkMode
            }}
          />
        }
      >
        <MenuItem value={"system"}>
          <ComputerRounded />
        </MenuItem>
        <MenuItem value={"dark"}>
          <Brightness3Rounded />
        </MenuItem>
        <MenuItem value={"light"}>
          <WbSunnyRounded />
        </MenuItem>
      </Select>
    );
    const devToolsSwitch = (
      <Switch
        checked={this.state.devTools}
        onChange={this.toggleDevTools}
        value="devtools"
      />
    );

    const verboseSwitch = (
      <Switch
        checked={this.state.verboseFocus}
        onChange={this.toggleVerboseFocus}
        value="verboseFocus"
      />
    );

    return (
      <div className={classes.root}>
        <Portal container={this.props.titleElement}>
          {i18n.app.menu.preferences}
        </Portal>
        {this.props.connected && (
          <KeyboardSettings
            startContext={this.props.startContext}
            cancelContext={this.props.cancelContext}
            inContext={this.props.inContext}
          />
        )}
        {this.props.connected && false && (
          <ColorSettings
            startContext={this.props.startContext}
            cancelContext={this.props.cancelContext}
            inContext={this.props.inContext}
            balance={this.props.balance}
            setBalance={this.props.setBalance}
            testBalance={this.props.testBalance}
            startTestBalance={this.props.startTestBalance}
            stopTestBalance={this.props.stopTestBalance}
          />
        )}
        <div className={classes.advanced}>
          <Button onClick={this.toggleAdvanced}>
            {i18n.preferences.advanced}
            {this.state.advanced ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
          </Button>
        </div>
        <Collapse in={this.state.advanced} timeout="auto" unmountOnExit>
          <Typography
            variant="subtitle1"
            component="h2"
            className={classes.title}
          >
            {i18n.preferences.devtools}
          </Typography>
          <Card>
            <CardContent>
              <FormControlLabel
                className={classes.control}
                classes={{ label: classes.grow }}
                control={darkModeSwitch}
                labelPlacement="start"
                label={i18n.preferences.darkMode.label}
              />
              <FormControlLabel
                className={classes.control}
                classes={{ label: classes.grow }}
                control={devToolsSwitch}
                labelPlacement="start"
                label={i18n.preferences.devtools}
              />
              <FormControlLabel
                className={classes.control}
                classes={{ label: classes.grow }}
                control={verboseSwitch}
                labelPlacement="start"
                label={i18n.preferences.verboseFocus}
              />
            </CardContent>
          </Card>
          {this.props.connected && (
            <AdvancedKeyboardSettings
              startContext={this.props.startContext}
              cancelContext={this.props.cancelContext}
              inContext={this.props.inContext}
            />
          )}
        </Collapse>
      </div>
    );
  }
}

Preferences.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Preferences);
