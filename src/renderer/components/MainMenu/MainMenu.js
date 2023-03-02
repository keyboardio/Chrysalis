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

import ChatIcon from "@mui/icons-material/Chat";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import InfoIcon from "@mui/icons-material/Info";
import KeyboardIcon from "@mui/icons-material/Keyboard";
import ListIcon from "@mui/icons-material/List";
import SettingsIcon from "@mui/icons-material/Settings";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import { GlobalContext } from "@renderer/components/GlobalContext";
import logo from "@renderer/logo-small.png";
import { history } from "@renderer/routerHistory";
import openURL from "@renderer/utils/openURL";
import pkg from "@root/package.json";
import { ipcRenderer } from "electron";
import React, { useContext } from "react";
import { useTranslation } from "react-i18next";

const version = pkg.version;

function MainMenu({ open, closeMenu, classes }) {
  const drawerWidth = 350;
  const currentPage = history.location.pathname;
  const globalContext = useContext(GlobalContext);

  const [connected, setConnected] = globalContext.state.connected;
  const [updateAvailable] = globalContext.state.updateAvailable;
  const [activeDevice, setActiveDevice] = globalContext.state.activeDevice;

  const { t } = useTranslation();

  const setCurrentPage = (page) => {
    history.navigate(page);
    closeMenu();
  };

  const openExternalPage = (page) => {
    openURL(page)();
    closeMenu();
  };

  const homePage = connected
    ? activeDevice?.hasCustomizableKeymaps()
      ? "/editor"
      : "/focus-not-detected"
    : "/keyboard-select";

  const listItem = (icon, label, page, callback) => {
    if (callback === undefined) {
      callback = () => {
        setCurrentPage(page);
      };
    }
    return (
      <ListItem button selected={currentPage == page} onClick={callback}>
        <ListItemIcon>{icon}</ListItemIcon>
        <ListItemText primary={label} />
      </ListItem>
    );
  };

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
          <img src={logo} alt={t("components.logo.altText")} />
        </IconButton>
      </div>
      {connected && (
        <List
          subheader={
            <ListSubheader disableSticky>
              {t("app.menu.keyboardSection")}
            </ListSubheader>
          }
        >
          {activeDevice &&
            !activeDevice.focusDetected() &&
            listItem(
              <InfoIcon />,
              t("app.menu.focus-not-detected"),
              "/focus-not-detected"
            )}
          {activeDevice?.hasCustomizableKeymaps() &&
            listItem(
              <KeyboardIcon />,
              activeDevice?.hasCustomizableLEDMaps()
                ? t("app.menu.editor")
                : t("app.menu.layoutEditor"),

              "/editor"
            )}
          {activeDevice &&
            listItem(<InfoIcon />, t("app.menu.layoutCard"), "/layout-card")}

          {listItem(
            <CloudUploadIcon />,
            t("app.menu.firmwareUpdate"),
            "/firmware-update"
          )}
        </List>
      )}
      {connected && <Divider />}
      <List
        subheader={
          <ListSubheader disableSticky>
            {t("app.menu.chrysalisSection")}
          </ListSubheader>
        }
      >
        {listItem(
          <KeyboardIcon />,
          connected
            ? t("app.menu.selectAnotherKeyboard")
            : t("app.menu.selectAKeyboard"),
          "/keyboard-select"
        )}
        {listItem(<SettingsIcon />, t("app.menu.preferences"), "/preferences")}
      </List>
      <Divider />
      <List
        subheader={
          <ListSubheader disableSticky>
            {t("app.menu.miscSection")}
          </ListSubheader>
        }
      >
        {listItem(<ChatIcon />, t("app.menu.chat"), null, () =>
          openExternalPage("https://keyboard.io/discord-invite")
        )}

        {listItem(<InfoIcon />, t("app.menu.systemInfo"), "/system-info")}
        {listItem(<ListIcon />, t("app.menu.changelog"), "/changelog")}
        {updateAvailable &&
          listItem(<RestartAltIcon />, t("app.menu.restart"), null, () => {
            ipcRenderer.send("app.restart");
          })}
        {listItem(<ExitToAppIcon />, t("app.menu.exit"), null, () =>
          ipcRenderer.send("app.exit")
        )}
      </List>
      <Divider />
      <List>
        <ListItem disabled>
          <ListItemText
            primary={`Chrysalis ${version}`}
            sx={{ textAlign: "right" }}
          />
        </ListItem>
      </List>
    </Drawer>
  );
}

export default MainMenu;
