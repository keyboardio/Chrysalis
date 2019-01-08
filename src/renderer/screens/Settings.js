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

import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import FilledInput from "@material-ui/core/FilledInput";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Portal from "@material-ui/core/Portal";
import Select from "@material-ui/core/Select";
import Switch from "@material-ui/core/Switch";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";

import i18n from "../i18n";

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
    width: "100%"
  },
  grow: {
    flexGrow: 1
  },
  select: {
    paddingTop: theme.spacing.unit * 1,
    width: 200
  }
});

class Settings extends React.Component {
  state = {
    devTools: false
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
  }

  toggleDevTools = event => {
    this.setState({ devTools: event.target.checked });
    if (event.target.checked) {
      Electron.remote.getCurrentWebContents().openDevTools();
    } else {
      Electron.remote.getCurrentWebContents().closeDevTools();
    }
  };

  setLanguage = event => {
    i18n.setLanguage(event.target.value);
    this.setState({});
  };

  render() {
    const { classes } = this.props;

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

    const devToolsSwitch = (
      <Switch
        checked={this.state.devTools}
        onChange={this.toggleDevTools}
        value="devtools"
      />
    );

    return (
      <div className={classes.root}>
        <Portal container={this.props.titleElement}>
          {i18n.app.menu.settings}
        </Portal>
        <Typography
          variant="subtitle1"
          component="h2"
          className={classes.title}
        >
          {i18n.settings.interface}
        </Typography>
        <Card>
          <CardContent>
            <FormControlLabel
              className={classes.control}
              classes={{ label: classes.grow }}
              control={languageSelect}
              labelPlacement="start"
              label={i18n.settings.language}
            />
          </CardContent>
        </Card>
        <Typography
          variant="subtitle1"
          component="h2"
          className={classes.title}
        >
          {i18n.settings.devtools}
        </Typography>
        <Card>
          <CardContent>
            <FormControlLabel
              className={classes.control}
              classes={{ label: classes.grow }}
              control={devToolsSwitch}
              labelPlacement="start"
              label={i18n.settings.devtools}
            />
          </CardContent>
        </Card>
      </div>
    );
  }
}

Settings.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Settings);
