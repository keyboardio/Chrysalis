// -*- mode: js-jsx -*-
/* Bazecor -- Kaleidoscope Command Center
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

import Focus from "../../api/focus";

import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import Link from "@material-ui/core/Link";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import KeyboardIcon from "@material-ui/icons/Keyboard";
import Portal from "@material-ui/core/Portal";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";

import { toast } from "react-toastify";

import i18n from "../i18n";
import { navigate } from "../routerHistory";

const styles = theme => ({
  root: {
    display: "flex",
    justifyContent: "center"
  },
  card: {
    margin: theme.spacing(4),
    maxWidth: "60%"
  },
  grow: {
    flexGrow: 1
  },
  cardSub: {
    fontSize: "1rem"
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
      toast.error(err.toString());
    }
  };

  render() {
    let focus = new Focus();
    const { classes } = this.props;

    const device = this.props.device.device || focus.device;

    const reconnectButton = focus._port && (
      <Button color="secondary" onClick={this.reconnect}>
        {i18n.welcome.reconnect}
      </Button>
    );

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
            <div style={{ padding: "1rem" }}>
              <Typography
                variant="h6"
                gutterBottom
                style={{ fontWeight: "500", paddingBottom: "1rem" }}
              >
                {"Your Raise is currently on Bootloader Mode"}
              </Typography>
              <Typography
                component="p"
                gutterBottom
                className={classes.cardSub}
              >
                {
                  "The LED in your Neuron should be pulsing blue and your Raise keyboard won't type."
                }
              </Typography>
              <Typography
                component="span"
                gutterBottom
                className={classes.cardSub}
              >
                <ul style={{ lineHeight: "2rem" }}>
                  <li>
                    {
                      "This process will revert your keyboard's configuration back to factory settings."
                    }
                  </li>
                  <li>
                    {"Before proceeding, we recommend that you "}
                    <Link href="https://support.dygma.com/hc/en-us/articles/360014262298">
                      {"export and save your layers"}
                    </Link>
                    {"."}
                  </li>
                  <li>
                    {
                      "To exit Bootloader Mode, unplug and replug the USB-C cable to your Neuron."
                    }
                  </li>
                </ul>
              </Typography>
            </div>
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
