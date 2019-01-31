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

import "@chrysalis-api/keymap";
import "@chrysalis-api/colormap";
import "typeface-roboto/index.css";
import "typeface-source-code-pro/index.css";

import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import CloseIcon from "@material-ui/icons/Close";
import MenuIcon from "@material-ui/icons/Menu";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";

import DeviceMenu from "./DeviceMenu";
import BoardMenu from "./BoardMenu";
import MainMenu from "./MainMenu";

const styles = theme => ({
  root: {
    display: "flex",
    flexDirection: "column"
  },
  content: {
    flexGrow: 1,
    overflow: "auto"
  },
  pageMenu: {
    marginLeft: theme.spacing.unit * 2
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  },
  grow: {
    flexGrow: 1
  },
  drawer: {
    width: 350
  },
  version: {
    textAlign: "right"
  },
  toolbarIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "0 8px",
    ...theme.mixins.toolbar
  }
});

function Header({
  classes,
  contextBar,
  homePage,
  connected,
  pages,
  device,
  cancelContext,
  openPageMenu,
  pageMenu,
  closePageMenu,
  openURL,
  openBoardMenu,
  boardAnchor,
  boardClose
}) {
  console.log("TCL: device", device);

  return (
    <AppBar
      position="static"
      color={contextBar ? "primary" : "inherit"}
      id="appbar"
    >
      <Toolbar variant="dense">
        <Button
          className={classes.menuButton}
          color="inherit"
          onClick={contextBar ? cancelContext : openPageMenu}
        >
          {contextBar ? <CloseIcon /> : <MenuIcon />}
          <Typography
            variant="h6"
            color="inherit"
            className={classes.pageMenu}
            id="page-title"
          />
        </Button>
        <MainMenu
          homePage={homePage}
          connected={connected}
          pages={pages}
          open={pageMenu}
          closeMenu={closePageMenu}
          openURL={openURL}
        />
        <div className={classes.grow} />
        {device && <DeviceMenu openBoardMenu={openBoardMenu} device={device} />}
        {device && device.urls && (
          <BoardMenu
            boardAnchor={boardAnchor}
            boardClose={boardClose}
            device={device}
          />
        )}
      </Toolbar>
    </AppBar>
  );
}

export default withStyles(styles)(Header);
