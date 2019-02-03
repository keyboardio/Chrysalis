import React, { useState } from "react";
import Electron from "electron";
import { Link } from "@reach/router";

import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { withStyles } from "@material-ui/core/styles";

import logo from "../logo-small.png";
import i18n from "../i18n";

import { version } from "../../../package.json";
import WelcomeMenu from "./WelcomeMenu";
import KeymapMenuItem from "./KeymapMenuItem";
import ColormapMenuItem from "./ColormapMenuItem";
import FlashMenuItem from "./FlashMenuItem";
import ChatMenuItem from "./ChatMenuItem";
import FeedbackMenuItem from "./FeedbackMenuItem";
import ExitMenuItem from "./ExitMenuItem";
import KeyboardMenuItem from "./KeyboardSelectMenuItem";
import SettingsMenuItem from "./SettingsMenuItem";
import openURL from "../utils/openURL";

const styles = theme => ({
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
  },
  link: {
    textDecoration: "none"
  }
});

function MainMenu({ open, closeMenu, classes, connected, pages }) {
  const [currentPage, setCurrentPage] = useState("/keyboard-select");

  const homePage = connected
    ? pages.keymap
      ? "/layout-editor"
      : "/welcome"
    : "/keyboard-select";

  return (
    <Drawer open={open} onClose={closeMenu}>
      <div onClick={closeMenu} role="button" onKeyDown={closeMenu}>
        <div className={classes.toolbarIcon}>
          <Link to={homePage}>
            <IconButton
              onClick={() => {
                setCurrentPage(homePage);
              }}
            >
              <img src={logo} />
            </IconButton>
          </Link>
        </div>
        <List className={classes.drawer}>
          {connected && !pages.keymap && !pages.colormap && (
            <Link to="/welcome" className={classes.link}>
              <WelcomeMenu
                selected={currentPage == "/welcome"}
                onClick={() => setCurrentPage("/welcome")}
              />
            </Link>
          )}
          {pages.keymap && (
            <Link
              to="/layout-editor"
              style={{
                textDecoration: "none"
              }}
            >
              <KeymapMenuItem
                selected={currentPage == "/layout-editor"}
                onClick={() => setCurrentPage("/layout-editor")}
              />
            </Link>
          )}
          {pages.colormap && (
            <Link to="/colormap-editor" className={classes.link}>
              <ColormapMenuItem
                selected={currentPage == "/colormap-editor"}
                onClick={() => setCurrentPage("/colormap-editor")}
              />
            </Link>
          )}
          {connected && (
            <Link to="firmware-update" className={classes.link}>
              <FlashMenuItem
                selected={currentPage == "firmware-update"}
                onClick={() => setCurrentPage("firmware-update")}
              />
            </Link>
          )}
        </List>
        <Divider />
        <List className={classes.drawer}>
          <Link to="/keyboard-select" className={classes.link}>
            <KeyboardMenuItem
              keyboardSelectText={
                connected
                  ? i18n.app.menu.selectAnotherKeyboard
                  : i18n.app.menu.selectAKeyboard
              }
              selected={currentPage == "/keyboard-select"}
              onClick={() => setCurrentPage("/keyboard-select")}
            />
          </Link>
          <Link to="/settings" className={classes.link}>
            <SettingsMenuItem
              selected={currentPage == "/settings"}
              onClick={() => setCurrentPage("/settings")}
            />
          </Link>
        </List>
        <Divider />
        <List className={classes.drawer}>
          <ChatMenuItem onClick={openURL("https://discord.gg/GP473Fv")} />
          <FeedbackMenuItem
            onClick={openURL("https://github.com/keyboardio/Chrysalis/issues")}
          />
          <ExitMenuItem onClick={() => Electron.remote.app.exit(0)} />
        </List>
        <Divider />
        <List>
          <ListItem disabled>
            <ListItemText
              primary={`Chrysalis ${version}`}
              className={classes.version}
            />
          </ListItem>
        </List>
      </div>
    </Drawer>
  );
}

export default withStyles(styles)(MainMenu);
