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

import React, { useState } from "react";

import "../../api/keymap";
import "../../api/colormap";
import "typeface-roboto/index.css";
import "typeface-source-code-pro/index.css";

import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import CloseIcon from "@material-ui/icons/Close";
import MenuIcon from "@material-ui/icons/Menu";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";

import i18n from "../i18n";
import BoardMenu from "./BoardMenu";
import MainMenu from "./MainMenu/MainMenu";

const styles = theme => ({
  pageMenu: {
    marginLeft: theme.spacing.unit * 2
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  },
  grow: {
    flexGrow: 1
  }
});

function Header({
  classes,
  contextBar,
  connected,
  pages,
  device,
  cancelContext
}) {
  const [mainMenu, setMainMenuOpen] = useState(false);
  const [boardAnchor, setBoardMenuAnchor] = useState(null);

  function openMainMenu() {
    setMainMenuOpen(true);
  }

  function closeMainMenu() {
    setMainMenuOpen(false);
  }

  function openBoardMenu(event) {
    setBoardMenuAnchor(event.currentTarget);
  }

  function closeBoardMenu() {
    setBoardMenuAnchor(null);
  }

  function contextOnClick() {
    if (contextBar) {
      cancelContext(true);
    } else {
      openMainMenu();
    }
  }

  return (
    <AppBar
      position="static"
      color={contextBar ? "secondary" : "inherit"}
      id="appbar"
    >
      <Toolbar variant="dense">
        <Button
          className={classes.menuButton}
          color="inherit"
          onClick={contextOnClick}
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
          connected={connected}
          pages={pages}
          open={mainMenu}
          closeMenu={closeMainMenu}
        />
        <div className={classes.grow} />
        {device && (
          <Button
            onClick={openBoardMenu}
            disabled={!device.urls}
            color="inherit"
            className="button"
          >
            {i18n.t("app.device")}: {device.displayName}
          </Button>
        )}
        {device && device.urls && (
          <BoardMenu
            boardAnchor={boardAnchor}
            boardClose={closeBoardMenu}
            device={device}
          />
        )}
      </Toolbar>
    </AppBar>
  );
}

export default withStyles(styles)(Header);
