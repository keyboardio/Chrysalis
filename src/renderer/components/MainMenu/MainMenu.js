// -*- mode: js-jsx -*-
/* Bazecor -- Kaleidoscope Command Center
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
import Electron from "electron";
import { Link } from "@reach/router";

import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItemText from "@material-ui/core/ListItemText";
import ListSubheader from "@material-ui/core/ListSubheader";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

import i18n from "../../i18n";

import { version } from "../../../../package.json";
import WelcomeMenu from "./WelcomeMenu";
import EditorMenuItem from "./EditorMenuItem";
import FlashMenuItem from "./FlashMenuItem";
import FeedbackMenuItem from "./FeedbackMenuItem";
import ExitMenuItem from "./ExitMenuItem";
import KeyboardMenuItem from "./KeyboardSelectMenuItem";
import PreferencesMenuItem from "./PreferencesMenuItem";
import KeyboardSettingsMenuItem from "./KeyboardSettingsMenuItem";
import SupportPage from "./SupportPage";
import openURL from "../../utils/openURL";

import { history } from "../../routerHistory";
import { darkTheme } from "../../../styles/darkTheme";

const styles = theme => ({
  drawer: {
    width: 350
  },
  version: {
    textAlign: "right",
    paddingTop: 20
  },
  toolbarIcon: {
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    flexDirection: "column",
    ...theme.mixins.toolbar
  },
  link: {
    textDecoration: "none"
  },
  menuItem: {
    paddingLeft: theme.spacing.unit * 4
  },
  keyboardTitleLight: {
    display: "block",
    width: 350,
    margin: "0 auto",
    padding: "30px 20px 30px 35px",
    borderBottom: "1px solid silver",
    fontSize: 18,
    textAlign: "left",
    lineHeight: "150%",
    letterSpacing: "0.25em"
  },
  keyboardTitleDark: {
    display: "block",
    width: 350,
    margin: "0 auto",
    padding: "30px 20px 30px 35px",
    borderTop: "1px solid rgba(0, 0, 0, 0.87)",
    borderBottom: "1px solid rgba(0, 0, 0, 0.87)",
    fontSize: 18,
    textAlign: "left",
    lineHeight: "150%",
    letterSpacing: "0.25em"
  }
});

function MainMenu({ open, closeMenu, classes, connected, pages, themeDark }) {
  const currentPage = history.location.pathname,
    setCurrentPage = history.navigate;

  const homePage = connected
    ? pages.keymap
      ? "/editor"
      : "/welcome"
    : "/keyboard-select";

  return (
    <Drawer open={open} onClose={closeMenu}>
      <div onClick={closeMenu} role="button" onKeyDown={closeMenu}>
        <div className={classes.toolbarIcon}>
          <Link to={homePage} style={{ textDecoration: "none", width: "100%" }}>
            <List
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "flex-start",
                width: "100%",
                padding: 0
              }}
            />
          </Link>
          <div
            className={
              darkTheme ? classes.keyboardTitleLight : classes.keyboardTitleDark
            }
          >
            <Typography
              style={{ padding: 0, letterSpacing: "0.1em", fontSize: 17 }}
            >
              {i18n.app.menu.keyboardTitle}
            </Typography>
            <Typography
              style={{ padding: 0, letterSpacing: "0.1em", fontSize: 17 }}
            >
              {i18n.app.menu.keyboardTitleSecondary}
            </Typography>
          </div>
        </div>
        {connected && (
          <List
            className={classes.drawer}
            subheader={
              <ListSubheader disableSticky>
                {i18n.app.menu.keyboardSection}
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
              <Link
                to="/editor"
                style={{
                  textDecoration: "none"
                }}
              >
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
                themeDark={themeDark}
              />
            </Link>
            <Link to="/keyboard-settings" className={classes.link}>
              <KeyboardSettingsMenuItem
                selected={currentPage == "/keyboard-settings"}
                className={classes.menuItem}
                onClick={() => setCurrentPage("/keyboard-settings")}
              />
            </Link>
          </List>
        )}
        {connected && <Divider />}
        <List
          className={classes.drawer}
          subheader={
            <ListSubheader disableSticky>
              {i18n.app.menu.chrysalisSection}
            </ListSubheader>
          }
        >
          <Link
            to="/#"
            className={classes.link}
            onClick={event => event.stopPropagation()}
          >
            <KeyboardMenuItem
              className={classes.menuItem}
              keyboardSelectText={i18n.app.menu.softwareUpdate}
              selected={currentPage == "/editor"}
              onClick={event => event.stopPropagation()}
              themeDark={themeDark}
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
              {i18n.app.menu.miscSection}
            </ListSubheader>
          }
        >
          <SupportPage
            className={classes.menuItem}
            onClick={openURL("https://github.com/keyboardio/Chrysalis/issues")}
            themeDark={themeDark}
          />
          <FeedbackMenuItem
            className={classes.menuItem}
            onClick={openURL("https://www.dygma.com/contact/")}
          />
          <ExitMenuItem
            className={classes.menuItem}
            onClick={() => Electron.remote.app.exit(0)}
          />
        </List>
        <Divider />
        <ListItemText
          primary={`Bazecor ${version}`}
          className={classes.version}
        />
      </div>
    </Drawer>
  );
}

export default withStyles(styles)(MainMenu);
