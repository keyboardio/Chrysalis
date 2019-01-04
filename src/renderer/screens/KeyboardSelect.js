// -*- mode: js-jsx -*-
/* chrysalis-bundle-keyboardio -- Chrysalis Bundle for Keyboard.io
 * Copyright (C) 2018  Keyboardio, Inc.
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

import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import CircularProgress from "@material-ui/core/CircularProgress";
import Divider from "@material-ui/core/Divider";
import KeyboardIcon from "@material-ui/icons/Keyboard";
import LinearProgress from "@material-ui/core/LinearProgress";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import Portal from "@material-ui/core/Portal";
import withStyles from "@material-ui/core/styles/withStyles";

import { withSnackbar } from "notistack";

import Focus from "@chrysalis-api/focus";
import { Model01 } from "@chrysalis-api/hardware-keyboardio-model01";
import { Atreus } from "@chrysalis-api/hardware-technomancy-atreus";
import { Raise } from "@chrysalis-api/hardware-dygma-raise";
import { ErgoDox } from "@chrysalis-api/hardware-ez-ergodox";

import usb from "usb";

const styles = theme => ({
  loader: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0
  },
  main: {
    width: "auto",
    display: "block",
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(500 + theme.spacing.unit * 3 * 2)]: {
      width: 500,
      marginLeft: "auto",
      marginRight: "auto"
    },
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px
 ${theme.spacing.unit * 3}px`
  },
  card: {
    marginTop: theme.spacing.unit * 5,
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px
 ${theme.spacing.unit * 3}px`
  },
  content: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    paddingTop: 0,
    paddingBottom: 0
  },
  avatar: {
    backgroundColor: theme.palette.secondary.main
  },
  grow: {
    flexGrow: 1
  },
  error: {
    color: theme.palette.error.dark
  }
});

class KeyboardSelect extends React.Component {
  state = {
    anchorEl: null,
    selectedPortIndex: 1,
    opening: false,
    devices: null,
    loading: false
  };

  findKeyboards = () => {
    this.setState({ loading: true });
    let focus = new Focus();
    focus
      .find(Model01, Atreus, Raise, ErgoDox)
      .then(devices => {
        if (devices.length == 0) {
          this.setState({
            loading: false,
            devices: devices
          });
          return;
        }
        this.setState({
          loading: false,
          devices: [{ comName: "Please select a keyboard:" }].concat(devices)
        });
      })
      .catch(() => {
        this.setState({
          loading: false,
          devices: []
        });
      });
  };

  componentDidMount() {
    this.finder = () => {
      this.findKeyboards();
    };
    this.findKeyboards();
    usb.on("attach", this.finder);
    usb.on("detach", this.finder);
  }

  componentWillUnmount() {
    usb.off("attach", this.finder);
    usb.off("detach", this.finder);
  }

  handleClickListItem = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleMenuItemClick = (event, index) => {
    this.setState({ selectedPortIndex: index, anchorEl: null });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  onKeyboardConnect = async () => {
    this.setState({ opening: true });
    try {
      await this.props.onConnect(
        this.state.devices[this.state.selectedPortIndex]
      );
    } catch (err) {
      this.setState({
        opening: false
      });
      this.props.enqueueSnackbar(err, { variant: "error" });
    }
  };

  render() {
    const { classes } = this.props;
    const { anchorEl } = this.state;

    let loader = null;
    if (this.state.loading) {
      loader = <LinearProgress variant="query" className={classes.loader} />;
    }

    let port = null;
    if (this.state.devices && this.state.devices.length > 0) {
      let portDesc = this.state.devices[this.state.selectedPortIndex],
        portInfo = portDesc.device.info;
      port = (
        <React.Fragment>
          <List component="nav">
            <ListItem button onClick={this.handleClickListItem}>
              <ListItemText
                primary={portInfo.displayName}
                secondary={portDesc.comName}
              />
            </ListItem>
          </List>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={this.handleClose}
          >
            {this.state.devices.map((option, index) => {
              let label = option.comName;
              if (option.device && option.device.info) {
                label = (
                  <ListItemText
                    primary={option.device.info.displayName}
                    secondary={option.comName}
                  />
                );
              }
              return (
                <MenuItem
                  key={option.comName}
                  disabled={index === 0}
                  selected={index === this.state.selectedPortIndex}
                  onClick={event => this.handleMenuItemClick(event, index)}
                >
                  {label}
                </MenuItem>
              );
            })}
          </Menu>
        </React.Fragment>
      );
    }

    if (this.state.devices && this.state.devices.length == 0) {
      port = <p className={classes.error}> No devices found! </p>;
    }

    let connectContent = "Connect";
    if (this.state.opening) {
      connectContent = <CircularProgress color="secondary" size={16} />;
    }

    const avatar = (
      <Avatar className={classes.avatar}>
        <KeyboardIcon />
      </Avatar>
    );

    return (
      <div className={classes.main}>
        <Portal container={this.props.titleElement}>Select a keyboard</Portal>
        {loader}
        <Card className={classes.card}>
          <CardHeader className={classes.content} avatar={avatar} />
          <CardContent className={classes.content}>{port}</CardContent>
          <Divider variant="middle" />
          <CardActions className={classes.cardActions}>
            <Button onClick={this.findKeyboards}>Scan devices</Button>
            <div className={classes.grow} />
            <Button
              disabled={
                this.state.opening ||
                (this.state.devices && this.state.devices.length == 0)
              }
              variant="contained"
              color="primary"
              onClick={this.onKeyboardConnect}
            >
              {connectContent}
            </Button>
          </CardActions>
        </Card>
      </div>
    );
  }
}

KeyboardSelect.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withSnackbar(withStyles(styles)(KeyboardSelect));
