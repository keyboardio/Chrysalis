// -*- mode: js-jsx -*-
/* Chrysalis -- Kaleidoscope Command Center
 * Copyright (C) 2018-2022  Keyboardio, Inc.
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
import { ipcRenderer } from "electron";

import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import ListItemIcon from "@mui/material/ListItemIcon";

import logo from "../../logo-small.png";
import i18n from "../../i18n";

import { version } from "../../../../package.json";

import UpgradeMenuItem from "./UpgradeMenuItem";
import openURL from "../../utils/openURL";
import ChatIcon from "@mui/icons-material/Chat";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import InfoIcon from "@mui/icons-material/Info";
import ListIcon from "@mui/icons-material/List";
import SettingsIcon from "@mui/icons-material/Settings";
import KeyboardIcon from "@mui/icons-material/Keyboard";

import ExitToAppIcon from "@mui/icons-material/ExitToApp";

import { history } from "../../routerHistory";

function MainMenu({ open, closeMenu, classes, connected, pages }) {
  const drawerWidth = 350;
  const currentPage = history.location.pathname;
  const setCurrentPage = (page) => {
    history.navigate(page);
    closeMenu();
  };

  const openExternalPage = (page) => {
    openURL(page)();
    closeMenu();
  };

  const homePage = connected
    ? pages.keymap
      ? "/editor"
      : "/welcome"
    : "/keyboard-select";

  return (
    <Drawer
      open={open}
      onClose={closeMenu}
      sx={{
        "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
        "& a": { textDecoration: "none", color: "text.primary" },
        "& .toolbarIcon": {
          display: "flex",
          justifyContent: "center",
        },
      }}
    >
      <div className="toolbarIcon">
        <IconButton onClick={() => setCurrentPage(homePage)} size="large">
          <img src={logo} alt={i18n.t("components.logo.altText")} />
        </IconButton>
      </div>
      {connected && (
        <List
          subheader={
            <ListSubheader disableSticky>
              {i18n.t("app.menu.keyboardSection")}
            </ListSubheader>
          }
        >
          {!pages.keymap && !pages.colormap && (
            <ListItem
              button
              selected={currentPage == "/welcome"}
              onClick={() => setCurrentPage("/welcome")}
            >
              <ListItemIcon>
                <InfoIcon />
              </ListItemIcon>
              <ListItemText primary={i18n.t("app.menu.welcome")} />
            </ListItem>
          )}
          {pages.keymap && (
            <ListItem
              button
              selected={currentPage == "/editor"}
              onClick={() => setCurrentPage("/editor")}
            >
              <ListItemIcon>
                <KeyboardIcon />
              </ListItemIcon>
              <ListItemText primary={i18n.t("app.menu.editor")} />
            </ListItem>
          )}
          <ListItem
            button
            selected={currentPage == "/firmware-update"}
            onClick={() => setCurrentPage("/firmware-update")}
          >
            <ListItemIcon>
              <CloudUploadIcon />
            </ListItemIcon>
            <ListItemText primary={i18n.t("app.menu.firmwareUpdate")} />
          </ListItem>
        </List>
      )}
      {connected && <Divider />}
      <List
        subheader={
          <ListSubheader disableSticky>
            {i18n.t("app.menu.chrysalisSection")}
          </ListSubheader>
        }
      >
        <ListItem
          button
          selected={currentPage == "/keyboard-select"}
          onClick={() => setCurrentPage("/keyboard-select")}
        >
          <ListItemIcon>
            <KeyboardIcon />
          </ListItemIcon>
          <ListItemText
            primary={
              connected
                ? i18n.t("app.menu.selectAnotherKeyboard")
                : i18n.t("app.menu.selectAKeyboard")
            }
          />
        </ListItem>

        <ListItem
          button
          selected={currentPage == "/preferences"}
          onClick={() => setCurrentPage("/preferences")}
        >
          <ListItemIcon>
            <SettingsIcon />
          </ListItemIcon>
          <ListItemText primary={i18n.t("app.menu.preferences")} />
        </ListItem>
      </List>
      <Divider />
      <List
        subheader={
          <ListSubheader disableSticky>
            {i18n.t("app.menu.miscSection")}
          </ListSubheader>
        }
      >
        <ListItem
          button
          onClick={() => openExternalPage("https://keyboard.io/discord-invite")}
        >
          <ListItemIcon>
            <ChatIcon />
          </ListItemIcon>
          <ListItemText primary={i18n.t("app.menu.chat")} />
        </ListItem>

        <ListItem
          button
          selected={currentPage == "/system-info"}
          onClick={() => setCurrentPage("/system-info")}
        >
          <ListItemIcon>
            <InfoIcon />
          </ListItemIcon>
          <ListItemText primary={i18n.t("app.menu.systemInfo")} />
        </ListItem>

        <ListItem
          button
          selected={currentPage == "/changelog"}
          onClick={() => setCurrentPage("/changelog")}
        >
          <ListItemIcon>
            <ListIcon />
          </ListItemIcon>
          <ListItemText primary={i18n.t("app.menu.changelog")} />
        </ListItem>
        <ListItem button onClick={() => ipcRenderer.send("app-exit")}>
          <ListItemIcon>
            <ExitToAppIcon />
          </ListItemIcon>
          <ListItemText primary={i18n.t("app.menu.exit")} />
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem disabled>
          <ListItemText
            primary={`Chrysalis ${version}`}
            sx={{ textAlign: "right" }}
          />
        </ListItem>
        <UpgradeMenuItem />
      </List>
    </Drawer>
  );
}

export default MainMenu;
