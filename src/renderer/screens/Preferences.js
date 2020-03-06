// -*- mode: js-jsx -*-
/* Chrysalis -- Kaleidoscope Command Center
 * Copyright (C) 2018, 2019  Keyboardio, Inc.
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
import Electron from "electron";

import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import ArrowDropUpIcon from "@material-ui/icons/ArrowDropUp";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Collapse from "@material-ui/core/Collapse";
import FilledInput from "@material-ui/core/FilledInput";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Portal from "@material-ui/core/Portal";
import Select from "@material-ui/core/Select";
import Switch from "@material-ui/core/Switch";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";

import {
  KeyboardSettings,
  AdvancedKeyboardSettings
} from "./Preferences/KeyboardSettings";
import i18n from "../i18n";

import Focus from "../../api/focus";
import settings from "electron-settings";

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    margin: `0px ${theme.spacing.unit * 8}px`
  },
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

class Preferences extends React.Component {
  state = {
    devTools: false,
    advanced: false,
    verboseFocus: false
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
    settings.set("ui.language", event.target.value);
  };

  toggleAdvanced = () => {
    this.setState(state => ({
      advanced: !state.advanced
    }));
  };

  toggleVerboseFocus = event => {
    this.setState({ verboseFocus: event.target.checked });
    let focus = new Focus();
    focus.debug = event.target.checked;
  };

  render() {
    const { classes, darkMode, toggleDarkMode } = this.props;

    const language = i18n.getLanguage();
    const languages = i18n.getAvailableLanguages().map(code => {
      return (
        <MenuItem value={code} key={code}>
          {i18n.getString("language", code)}
        </MenuItem>
      );
    });

    const languageSelect = (
      <Select
        value={language}
        variant="filled"
        onChange={this.setLanguage}
        input={<FilledInput classes={{ input: classes.select }} />}
      >
        {languages}
      </Select>
    );

    const darkModeSwitch = (
      <Switch checked={darkMode} onChange={toggleDarkMode} value="devtools" />
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
        <Typography
          variant="subtitle1"
          component="h2"
          className={classes.title}
        >
          {i18n.preferences.interface}
        </Typography>
        <Card>
          <CardContent>
            <FormControlLabel
              className={classes.control}
              classes={{ label: classes.grow }}
              control={languageSelect}
              labelPlacement="start"
              label={i18n.preferences.language}
            />
            <FormControlLabel
              className={classes.control}
              classes={{ label: classes.grow }}
              control={darkModeSwitch}
              labelPlacement="start"
              label={i18n.preferences.darkMode}
            />
          </CardContent>
        </Card>
        {this.props.connected && (
          <KeyboardSettings
            startContext={this.props.startContext}
            cancelContext={this.props.cancelContext}
            inContext={this.props.inContext}
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
