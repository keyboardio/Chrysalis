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

class Settings extends React.Component {
  state = {
    devTools: false,
    advanced: false
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

  toggleAdvanced = () => {
    this.setState(state => ({
      advanced: !state.advanced
    }));
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
        <div className={classes.advanced}>
          <Button onClick={this.toggleAdvanced}>
            {i18n.settings.advanced}
            {this.state.advanced ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
          </Button>
        </div>
        <Collapse in={this.state.advanced} timeout="auto" unmountOnExit>
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
        </Collapse>
      </div>
    );
  }
}

Settings.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Settings);
