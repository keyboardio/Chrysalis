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
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import ListItemText from "@material-ui/core/ListItemText";
import ListSubheader from "@material-ui/core/ListSubheader";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

import logo from "../../DygmaLogo.png";
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
import UpgradeMenuItem from "./UpgradeMenuItem";
import openURL from "../../utils/openURL";

import { history } from "../../routerHistory";

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
  keyboardTitle: {
    display: "block",
    width: 350,
    margin: "0 auto",
    padding: "30px 20px 30px 35px",
    borderTop: "1px solid rgba(0, 0, 0, 0.14)",
    borderBottom: "1px solid rgba(0, 0, 0, 0.14)",
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
          <Link
            to={homePage}
            style={{
              display: "flex",
              textDecoration: "none",
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <IconButton
              onClick={() => {
                setCurrentPage(homePage);
              }}
            >
              <img src={logo} style={{ width: 20, padding: "0, 0, 12px, 0" }} />
            </IconButton>
            <List>
              <ListItemText primary={`Bazecor`} />
              <UpgradeMenuItem />
            </List>
          </Link>
          <div className={classes.keyboardTitle}>
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
          <Link to="/keyboard-select" className={classes.link}>
            <KeyboardMenuItem
              className={classes.menuItem}
              keyboardSelectText={
                connected
                  ? i18n.app.menu.selectAnotherKeyboard
                  : i18n.app.menu.selectAKeyboard
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
              {i18n.app.menu.miscSection}
            </ListSubheader>
          }
        >
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
