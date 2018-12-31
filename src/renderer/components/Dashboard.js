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
import classNames from "classnames";

import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import CssBaseline from "@material-ui/core/CssBaseline";
import Drawer from "@material-ui/core/Drawer";
import Divider from "@material-ui/core/Divider";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import HighlightIcon from "@material-ui/icons/Highlight";
import IconButton from "@material-ui/core/IconButton";
import InfoIcon from "@material-ui/icons/Info";
import KeyboardIcon from "@material-ui/icons/Keyboard";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import SettingsIcon from "@material-ui/icons/Settings";

import { withStyles } from "@material-ui/core/styles";

import ColormapEditor from "./ColormapEditor";
import LayoutEditor from "./LayoutEditor";
import Settings from "./Settings";
import Welcome from "./Welcome";

const drawerWidth = 240;

const styles = theme => ({
  root: {
    display: "flex"
  },
  toolbar: {
    paddingRight: 24 // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar
  },
  drawerPaper: {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  drawerPaperClose: {
    overflowX: "hidden",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    width: theme.spacing.unit * 7,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing.unit * 9
    }
  },
  content: {
    flexGrow: 1,
    height: "100vh",
    overflow: "auto"
  }
});

class Dashboard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
      page: props.pages.keymap ? "keymap" : "welcome"
    };
  }

  handleDrawerToggle = () => {
    this.setState({ open: !this.state.open });
  };

  disconnect = () => {
    this.props.onDisconnect();
  };

  render() {
    const { classes, pages } = this.props;

    let chevron = <ChevronLeftIcon />;
    if (!this.state.open) {
      chevron = <ChevronRightIcon />;
    }

    let page;
    if (this.state.page == "keymap") {
      page = (
        <LayoutEditor
          onDisconnect={this.disconnect}
          toggleFlashing={this.props.toggleFlashing}
        />
      );
    }
    if (this.state.page == "colormap") {
      page = (
        <ColormapEditor
          onDisconnect={this.disconnect}
          toggleFlashing={this.props.toggleFlashing}
        />
      );
    }
    if (this.state.page == "settings") {
      page = <Settings />;
    }
    if (this.state.page == "welcome") {
      page = (
        <Welcome
          onDisconnect={this.disconnect}
          toggleFlashing={this.props.toggleFlashing}
        />
      );
    }

    const welcomeMenu = !pages.keymap && !pages.colormap && (
      <ListItem
        button
        selected={this.state.page == "welcome"}
        onClick={() => {
          this.setState({ page: "welcome" });
        }}
      >
        <ListItemIcon>
          <InfoIcon />
        </ListItemIcon>
        <ListItemText primary="Welcome!" />
      </ListItem>
    );

    return (
      <div className={classes.root}>
        <CssBaseline />
        <Drawer
          variant="permanent"
          classes={{
            paper: classNames(
              classes.drawerPaper,
              !this.state.open && classes.drawerPaperClose
            )
          }}
          open={this.state.open}
        >
          <div className={classes.toolbarIcon}>
            <IconButton onClick={this.handleDrawerToggle}>{chevron}</IconButton>
          </div>
          <Divider />
          {welcomeMenu}
          <List>
            {pages.keymap && (
              <ListItem
                button
                selected={this.state.page == "keymap"}
                onClick={() => {
                  this.setState({ page: "keymap" });
                }}
              >
                <ListItemIcon>
                  <KeyboardIcon />
                </ListItemIcon>
                <ListItemText primary="Layout editor" />
              </ListItem>
            )}
            {pages.colormap && (
              <ListItem
                button
                selected={this.state.page == "colormap"}
                onClick={() => {
                  this.setState({ page: "colormap" });
                }}
              >
                <ListItemIcon>
                  <HighlightIcon />
                </ListItemIcon>
                <ListItemText primary="Colormap editor" />
              </ListItem>
            )}
          </List>
          <Divider />
          <List>
            <ListItem
              button
              selected={this.state.page == "settings"}
              onClick={() => {
                this.setState({ page: "settings" });
              }}
            >
              <ListItemIcon>
                <SettingsIcon />
              </ListItemIcon>
              <ListItemText primary="Settings" />
            </ListItem>
            <ListItem button onClick={this.disconnect}>
              <ListItemIcon>
                <ExitToAppIcon />
              </ListItemIcon>
              <ListItemText primary="Disconnect" />
            </ListItem>
          </List>
        </Drawer>
        <main className={classes.content}> {page} </main>
      </div>
    );
  }
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Dashboard);
