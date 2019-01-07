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

import Focus from "@chrysalis-api/focus";

import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import KeyboardIcon from "@material-ui/icons/Keyboard";
import Portal from "@material-ui/core/Portal";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";

import FirmwareUpdate from "./FirmwareUpdate";
import i18n from "../i18n";

const styles = theme => ({
  root: {
    display: "flex",
    justifyContent: "center"
  },
  card: {
    margin: theme.spacing.unit * 4,
    maxWidth: "50%"
  },
  actions: {
    justifyContent: "center"
  }
});

class Welcome extends React.Component {
  state = {
    factoryResetStarted: false
  };

  startFactoryReset = () => {
    this.setState({ factoryResetStarted: true });
  };
  cancelFactoryReset = () => {
    this.setState({ factoryResetStarted: false });
  };

  render() {
    let focus = new Focus();
    const { classes } = this.props;

    const device = this.props.device || focus.device;

    return (
      <div className={classes.root}>
        <Portal container={this.props.titleElement}>
          {i18n.welcome.title}
        </Portal>
        <Card className={classes.card}>
          <CardHeader
            avatar={
              <Avatar>
                <KeyboardIcon />
              </Avatar>
            }
            title={device.info.displayName}
            subheader={focus._port && focus._port.path}
          />
          <CardContent>
            <Typography component="p" gutterBottom>
              {i18n.formatString(
                i18n.welcome.contents,
                i18n.app.menu.firmwareUpdate
              )}
            </Typography>
          </CardContent>
          <CardActions className={classes.actions}>
            <Button
              color="primary"
              variant="outlined"
              onClick={() => {
                this.props.openPage(FirmwareUpdate);
              }}
            >
              {i18n.formatString(
                i18n.welcome.gotoUpdate,
                i18n.app.menu.firmwareUpdate
              )}
            </Button>
          </CardActions>
        </Card>
      </div>
    );
  }
}

export default withStyles(styles)(Welcome);
