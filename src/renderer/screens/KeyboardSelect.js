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

import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import CircularProgress from "@material-ui/core/CircularProgress";
import Divider from "@material-ui/core/Divider";
import green from "@material-ui/core/colors/green";
import KeyboardIcon from "@material-ui/icons/Keyboard";
import LinearProgress from "@material-ui/core/LinearProgress";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import Portal from "@material-ui/core/Portal";
import Typography from "@material-ui/core/Typography";
import withStyles from "@material-ui/core/styles/withStyles";

import { withSnackbar } from "notistack";

import Focus from "@chrysalis-api/focus";
import { Model01 } from "@chrysalis-api/hardware-keyboardio-model01";
import { Atreus } from "@chrysalis-api/hardware-technomancy-atreus";
import { Raise } from "@chrysalis-api/hardware-dygma-raise";
import { ErgoDox } from "@chrysalis-api/hardware-ez-ergodox";

import usb from "usb";

import i18n from "../i18n";

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
    marginTop: theme.spacing.unit * 2,
    marginBottom: theme.spacing.unit * 2,
    textAlign: "center"
  },
  found: {
    color: green[500]
  }
});

class KeyboardSelect extends React.Component {
  state = {
    anchorEl: null,
    selectedPortIndex: 0,
    opening: false,
    devices: null,
    loading: false
  };

  findNonSerialKeyboards = deviceList => {
    const devices = usb.getDeviceList().map(device => device.deviceDescriptor);
    const supportedDevices = [Atreus, ErgoDox];
    devices.forEach(desc => {
      supportedDevices.forEach(device => {
        if (
          desc.idVendor == device.usb.vendorId &&
          desc.idProduct == device.usb.productId
        ) {
          let found = false;
          deviceList.forEach(sDevice => {
            if (
              sDevice.device.usb.vendorId == desc.idVendor &&
              sDevice.device.usb.productId == desc.idProduct
            ) {
              found = true;
            }
          });
          if (!found) deviceList.push({ device: device });
        }
      });
    });
    return deviceList;
  };

  findKeyboards = async () => {
    this.setState({ loading: true });
    let focus = new Focus();

    return new Promise(resolve => {
      focus
        .find(Model01, Atreus, Raise, ErgoDox)
        .then(devices => {
          const list = this.findNonSerialKeyboards(devices);
          this.setState({
            loading: false,
            devices: list
          });
          resolve(list.length > 0);
        })
        .catch(() => {
          const list = this.findNonSerialKeyboards([]);
          this.setState({
            loading: false,
            devices: list
          });
          resolve(list.length > 0);
        });
    });
  };

  scanDevices = async () => {
    let found = await this.findKeyboards();
    this.setState({ scanFoundDevices: found });
    setTimeout(() => {
      this.setState({ scanFoundDevices: undefined });
    }, 1000);
  };

  componentDidMount() {
    this.finder = () => {
      this.findKeyboards();
    };
    usb.on("attach", this.finder);
    usb.on("detach", this.finder);

    this.findKeyboards().then(() => {
      let focus = new Focus();
      if (!focus._port) return;

      for (let device of this.state.devices) {
        if (!device.comName) continue;

        if (device.comName == focus._port.path) {
          this.setState(state => ({
            selectedPortIndex: state.devices.indexOf(device)
          }));
          break;
        }
      }
    });
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

    const { devices } = this.state;

    try {
      await this.props.onConnect(devices[this.state.selectedPortIndex]);
    } catch (err) {
      this.setState({
        opening: false
      });
      this.props.enqueueSnackbar(err.toString(), { variant: "error" });
    }
  };

  render() {
    const { classes } = this.props;
    const { anchorEl, scanFoundDevices, devices } = this.state;

    let loader = null;
    if (this.state.loading) {
      loader = <LinearProgress variant="query" className={classes.loader} />;
    }

    let deviceItems = null;
    let port = null;
    if (devices && devices.length > 0) {
      deviceItems = devices.map((option, index) => {
        let label = option.comName;
        if (option.device && option.device.info) {
          label = (
            <ListItemText
              primary={option.device.info.displayName}
              secondary={option.comName || i18n.keyboardSelect.unknown}
            />
          );
        } else if (option.info) {
          label = <ListItemText primary={option.info.displayName} />;
        }
        return (
          <MenuItem
            key={`device-${index}`}
            selected={index === this.state.selectedPortIndex}
            onClick={event => this.handleMenuItemClick(event, index)}
          >
            {label}
          </MenuItem>
        );
      });

      let portDesc = devices[this.state.selectedPortIndex],
        portInfo = portDesc.device ? portDesc.device.info : portDesc.info;

      port = (
        <React.Fragment>
          <List component="nav">
            <ListItem button onClick={this.handleClickListItem}>
              <ListItemText
                primary={portInfo.displayName}
                secondary={portDesc.comName || i18n.keyboardSelect.unknown}
              />
            </ListItem>
          </List>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={this.handleClose}
          >
            <MenuItem disabled>{i18n.keyboardSelect.selectPrompt}</MenuItem>
            {deviceItems}
          </Menu>
        </React.Fragment>
      );
    }

    if (devices && devices.length == 0) {
      port = (
        <Typography variant="body1" color="error" className={classes.error}>
          {i18n.keyboardSelect.noDevices}
        </Typography>
      );
    }

    let connectContent = i18n.keyboardSelect.connect;
    if (this.state.opening) {
      connectContent = <CircularProgress color="secondary" size={16} />;
    }

    const avatar = (
      <Avatar className={classes.avatar}>
        <KeyboardIcon />
      </Avatar>
    );

    const scanDevicesButton = (
      <Button
        variant={devices && devices.length ? "outlined" : "contained"}
        color={devices && devices.length ? "default" : "primary"}
        className={scanFoundDevices && classes.found}
        onClick={scanFoundDevices ? null : this.scanDevices}
      >
        {i18n.keyboardSelect.scan}
      </Button>
    );

    let connectionButton;
    let focus = new Focus();
    const selectedDevice = devices && devices[this.state.selectedPortIndex];

    if (
      focus._port &&
      selectedDevice &&
      selectedDevice.comName == focus._port.path
    ) {
      connectionButton = (
        <Button
          disabled={
            this.state.opening ||
            (this.state.devices && this.state.devices.length == 0)
          }
          variant="outlined"
          color="secondary"
          onClick={this.props.onDisconnect}
        >
          {i18n.keyboardSelect.disconnect}
        </Button>
      );
    } else {
      connectionButton = (
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
      );
    }

    return (
      <div className={classes.main}>
        <Portal container={this.props.titleElement}>
          {i18n.app.menu.selectAKeyboard}
        </Portal>
        {loader}
        <Card className={classes.card}>
          <CardHeader className={classes.content} avatar={avatar} />
          <CardContent className={classes.content}>{port}</CardContent>
          <Divider variant="middle" />
          <CardActions className={classes.cardActions}>
            {scanDevicesButton}
            <div className={classes.grow} />
            {connectionButton}
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
