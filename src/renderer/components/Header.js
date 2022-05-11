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

import React, { useState, useEffect, useContext } from "react";

import "../../api/keymap";
import "../../api/colormap";
import "typeface-roboto/index.css";
import "typeface-source-code-pro/index.css";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import ConfirmationDialog from "@renderer/components/ConfirmationDialog";
import i18n from "@renderer/i18n";

import BoardMenu from "./BoardMenu";
import MainMenu from "./MainMenu/MainMenu";
import { hideContextBar, contextBarChangesDiscarded } from "./ContextBar";

function Header({ pages, device }) {
  const [mainMenu, setMainMenuOpen] = useState(false);
  const [boardAnchor, setBoardMenuAnchor] = useState(null);
  const [contextBarVisibility, setContextBarVisibility] = useState(false);
  const [discardChangesDialogVisibility, setDiscardChangesDialogVisibility] =
    useState(false);

  useEffect(() => {
    const context_bar_channel = new BroadcastChannel("context_bar");

    context_bar_channel.onmessage = (event) => {
      if (event.data === "cancel") {
        setContextBarVisibility(false);
        setDiscardChangesDialogVisibility(false);
      } else if (event.data === "show") {
        setContextBarVisibility(true);
      }
    };

    return function cleanup() {
      context_bar_channel.close();
    };
  });

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
    if (contextBarVisibility) {
      setDiscardChangesDialogVisibility(true);
    } else {
      openMainMenu();
    }
  }

  // TODO - figure out what the heck this naming is meant to imply and change it.
  const contextBarDoNotDiscardChanges = () => {
    setDiscardChangesDialogVisibility(false);
  };

  const contextBarDoDiscardChanges = () => {
    setDiscardChangesDialogVisibility(false);
    contextBarChangesDiscarded();
    setContextBarVisibility(false);
  };

  return (
    <>
      <MainMenu pages={pages} open={mainMenu} closeMenu={closeMainMenu} />
      <AppBar
        position="sticky"
        color={contextBarVisibility ? "secondary" : "primary"}
        id="appbar"
      >
        <Toolbar variant="dense">
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={contextOnClick}
            sx={{ mr: 2 }}
          >
            {contextBarVisibility ? <CloseIcon /> : <MenuIcon />}
          </IconButton>
          <Typography
            variant="h6"
            color="inherit"
            id="page-title"
            component="div"
          />
          <Box sx={{ flexGrow: 1 }} />
          {device && (
            <Button
              onClick={openBoardMenu}
              disabled={!device.urls}
              sx={{ color: "inherit" }}
            >
              {device.displayName}
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
      <ConfirmationDialog
        title={i18n.t("app.cancelPending.title")}
        open={discardChangesDialogVisibility}
        onConfirm={contextBarDoDiscardChanges}
        onCancel={contextBarDoNotDiscardChanges}
      >
        {i18n.t("app.cancelPending.content")}
      </ConfirmationDialog>
    </>
  );
}

export default Header;
