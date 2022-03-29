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
import { Link } from "@reach/router";

import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import withStyles from "@mui/styles/withStyles";

import logo from "../../logo-small.png";
import i18n from "../../i18n";

import { version } from "../../../../package.json";
import WelcomeMenu from "./WelcomeMenu";
import SystemInfoMenuItem from "./SystemInfoMenuItem";
import EditorMenuItem from "./EditorMenuItem";
import FlashMenuItem from "./FlashMenuItem";
import ChatMenuItem from "./ChatMenuItem";
import ExitMenuItem from "./ExitMenuItem";
import KeyboardMenuItem from "./KeyboardSelectMenuItem";
import PreferencesMenuItem from "./PreferencesMenuItem";
import UpgradeMenuItem from "./UpgradeMenuItem";
import ChangeLogMenuItem from "./ChangeLogMenuItem";
import openURL from "../../utils/openURL";

import { history } from "../../routerHistory";

const styles = (theme) => ({
  drawer: {
    width: 350,
  },
  version: {
    textAlign: "right",
  },
  toolbarIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "0 8px",
    ...theme.mixins.toolbar,
  },
  link: {
    textDecoration: "none",
    color: theme.palette.text.primary,
  },
  menuItem: {
    paddingLeft: theme.spacing(4),
  },
});

function MainMenu({ open, closeMenu, classes, connected, pages }) {
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
    <Drawer open={open} onClose={closeMenu}>
      <div className={classes.toolbarIcon}>
        <Link to={homePage}>
          <IconButton onClick={() => setCurrentPage(homePage)} size="large">
            <img src={logo} alt={i18n.t("components.logo.altText")} />
          </IconButton>
        </Link>
      </div>
      {connected && (
        <List
          className={classes.drawer}
          subheader={
            <ListSubheader disableSticky>
              {i18n.t("app.menu.keyboardSection")}
            </ListSubheader>
          }
        >
          {!pages.keymap && !pages.colormap && (
            <Link to="/welcome" className={classes.link}>
              <WelcomeMenu
                selected={currentPage == "/welcome"}
                className={classes.menuItem}
                onClick={() => setCurrentPage("/welcome")}
              />
            </Link>
          )}
          {pages.keymap && (
            <Link to="/editor" className={classes.link}>
              <EditorMenuItem
                selected={currentPage == "/editor"}
                className={classes.menuItem}
                onClick={() => setCurrentPage("/editor")}
              />
            </Link>
          )}
          <Link to="/firmware-update" className={classes.link}>
            <FlashMenuItem
              selected={currentPage == "/firmware-update"}
              className={classes.menuItem}
              onClick={() => setCurrentPage("/firmware-update")}
            />
          </Link>
        </List>
      )}
      {connected && <Divider />}
      <List
        className={classes.drawer}
        subheader={
          <ListSubheader disableSticky>
            {i18n.t("app.menu.chrysalisSection")}
          </ListSubheader>
        }
      >
        <Link to="/keyboard-select" className={classes.link}>
          <KeyboardMenuItem
            className={classes.menuItem}
            keyboardSelectText={
              connected
                ? i18n.t("app.menu.selectAnotherKeyboard")
                : i18n.t("app.menu.selectAKeyboard")
            }
            selected={currentPage == "/keyboard-select"}
            onClick={() => setCurrentPage("/keyboard-select")}
          />
        </Link>
        <Link to="/preferences" className={classes.link}>
          <PreferencesMenuItem
            className={classes.menuItem}
            selected={currentPage == "/preferences"}
            onClick={() => setCurrentPage("/preferences")}
          />
        </Link>
      </List>
      <Divider />
      <List
        className={classes.drawer}
        subheader={
          <ListSubheader disableSticky>
            {i18n.t("app.menu.miscSection")}
          </ListSubheader>
        }
      >
        <ChatMenuItem
          className={classes.menuItem}
          onClick={() => openExternalPage("https://keyboard.io/discord-invite")}
        />
        <Link to="/system-info" className={classes.link}>
          <SystemInfoMenuItem
            className={classes.menuItem}
            selected={currentPage == "/system-info"}
            onClick={() => setCurrentPage("/system-info")}
          />
        </Link>
        <Link to="/changelog" className={classes.link}>
          <ChangeLogMenuItem
            className={classes.menuItem}
            selected={currentPage == "/changelog"}
            onClick={() => setCurrentPage("/changelog")}
          />
        </Link>
        <ExitMenuItem
          className={classes.menuItem}
          onClick={() => ipcRenderer.send("app-exit")}
        />
      </List>
      <Divider />
      <List>
        <ListItem disabled>
          <ListItemText
            primary={`Chrysalis ${version}`}
            className={classes.version}
          />
        </ListItem>
        <UpgradeMenuItem />
      </List>
    </Drawer>
  );
}

export default withStyles(styles)(MainMenu);
