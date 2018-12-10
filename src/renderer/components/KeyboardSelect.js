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
import Electron from "electron";

import Avatar from "@material-ui/core/Avatar";
import Badge from "@material-ui/core/Badge";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import Button from "@material-ui/core/Button";
import BugReportIcon from "@material-ui/icons/BugReport";
import CircularProgress from "@material-ui/core/CircularProgress";
import CssBaseline from "@material-ui/core/CssBaseline";
import KeyboardIcon from "@material-ui/icons/Keyboard";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import withStyles from "@material-ui/core/styles/withStyles";

import { withSnackbar } from "notistack";

import Focus from "chrysalis-focus";
import { Model01 } from "chrysalis-hardware-keyboardio-model01";

import usb from "usb";

const styles = theme => ({
  main: {
    width: "auto",
    display: "block",
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: "auto",
      marginRight: "auto"
    }
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px
 ${theme.spacing.unit * 3}px`
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main
  },
  exit: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: theme.spacing.unit * 2
  },
  error: {
    color: theme.palette.error.dark
  },
  bugReport: {
    margin: theme.spacing.unit * 1.5
  },
  bugReportIcon: {
    width: "16px",
    height: "16px"
  },
  bottom: {
    position: "absolute",
    bottom: theme.spacing.unit * 2,
    right: theme.spacing.unit * 2
  }
});

class KeyboardSelect extends React.Component {
  state = {
    anchorEl: null,
    selectedPortIndex: 1,
    opening: false,
    devices: null
  };

  findKeyboards() {
    let focus = new Focus();
    focus
      .find(Model01)
      .then(devices => {
        if (devices.length == 0) {
          this.setState({ devices: devices });
          return;
        }
        this.setState({
          devices: [{ comName: "Please select a port:" }].concat(devices)
        });
      })
      .catch(() => {
        this.setState({ devices: [] });
      });
  }

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

  exit = () => {
    Electron.remote.app.exit(0);
  };

  toggleDevTools = () => {
    const webContents = Electron.remote.getCurrentWebContents();

    if (webContents.isDevToolsOpened()) {
      webContents.closeDevTools();
    } else {
      webContents.openDevTools();
    }
  };

  render() {
    const { classes } = this.props;
    const { anchorEl } = this.state;

    let port = null;
    if (this.state.devices && this.state.devices.length > 0) {
      let portDesc = this.state.devices[this.state.selectedPortIndex],
        portInfo = portDesc.device.info;
      port = (
        <div>
          <Typography component="h1" variant="h5">
            Select a keyboard
          </Typography>
          <List component="nav">
            <ListItem button onClick={this.handleClickListItem}>
              <ListItemText
                primary={`${portInfo.vendor} ${portInfo.product}`}
                secondary={portDesc.comName}
              />
            </ListItem>
          </List>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={this.handleClose}
          >
            {this.state.devices.map((option, index) => (
              <MenuItem
                key={option.comName}
                disabled={index === 0}
                selected={index === this.state.selectedPortIndex}
                onClick={event => this.handleMenuItemClick(event, index)}
              >
                {option.comName}
              </MenuItem>
            ))}
          </Menu>
        </div>
      );
    }

    if (this.state.devices && this.state.devices.length == 0) {
      port = <p className={classes.error}> No devices found! </p>;
    }

    let connectContent = "Connect";
    if (this.state.opening) {
      connectContent = <CircularProgress color="secondary" size={16} />;
    }

    return (
      <main className={classes.main}>
        <CssBaseline />
        <Paper className={classes.paper}>
          <Badge
            component="a"
            href="https://github.com/keyboardio/chrysalis-bundle-keyboardio/issues"
            badgeContent={<BugReportIcon className={classes.bugReportIcon} />}
            color="primary"
            classes={{ badge: classes.bugReport }}
          >
            <Avatar className={classes.avatar}>
              <KeyboardIcon />
            </Avatar>
          </Badge>
          {port}
          <Button
            disabled={
              this.state.opening ||
              (this.state.devices && this.state.devices.length == 0)
            }
            fullWidth
            variant="contained"
            color="primary"
            onClick={this.onKeyboardConnect}
          >
            {connectContent}
          </Button>
        </Paper>
        <div className={classes.exit}>
          <Button onClick={this.exit}>Exit</Button>
        </div>
        <BottomNavigation
          showLabels
          onChange={this.toggleDevTools}
          className={classes.bottom}
        >
          <BottomNavigationAction label="Developer Tools" />
        </BottomNavigation>
      </main>
    );
  }
}

KeyboardSelect.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withSnackbar(withStyles(styles)(KeyboardSelect));
