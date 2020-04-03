// -*- mode: js-jsx -*-
/* Chrysalis -- Kaleidoscope Command Center
 * Copyright (C) 2018, 2019, 2020  Keyboardio, Inc.
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

import Focus from "../../api/focus";

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

import { withSnackbar } from "notistack";

import i18n from "../i18n";
import { navigate } from "../routerHistory";

const styles = theme => ({
  root: {
    display: "flex",
    justifyContent: "center"
  },
  card: {
    margin: theme.spacing.unit * 4,
    maxWidth: "50%"
  },
  grow: {
    flexGrow: 1
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

  reconnect = async () => {
    let focus = new Focus();
    const device = {
      path: focus._port.path,
      device: focus.device
    };

    try {
      await this.props.onConnect(device);
    } catch (err) {
      this.props.enqueueSnackbar(err.toString(), { variant: "error" });
    }
  };

  render() {
    let focus = new Focus();
    const { classes } = this.props;

    const device = this.props.device || focus.device;

    const reconnectButton = focus._port && (
      <Button color="secondary" onClick={this.reconnect}>
        {i18n.t("welcome.reconnect")}
      </Button>
    );
    const reconnectText = focus._port && (
      <Typography component="p" gutterBottom>
        {i18n.t("welcome.reconnectDescription", {
          buttonName: i18n.t("welcome.reconnect")
        })}
      </Typography>
    );

    return (
      <div className={classes.root}>
        <Portal container={this.props.titleElement}>
          {i18n.t("welcome.title")}
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
              {i18n.t("welcome.contents", {
                buttonName: i18n.t("app.menu.firmwareUpdate")
              })}
            </Typography>
            {reconnectText}
          </CardContent>
          <CardActions>
            {reconnectButton}
            <div className={classes.grow} />
            <Button
              color="primary"
              variant="outlined"
              onClick={async () => {
                await navigate("/firmware-update");
              }}
            >
              {i18n.t("welcome.gotoUpdate", {
                buttonName: i18n.t("app.menu.firmwareUpdate")
              })}
            </Button>
          </CardActions>
        </Card>
      </div>
    );
  }
}

export default withSnackbar(withStyles(styles)(Welcome));
