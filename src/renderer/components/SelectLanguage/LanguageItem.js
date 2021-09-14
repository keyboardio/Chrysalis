// -*- mode: js-jsx -*-
/* Bazecor -- Kaleidoscope Command Center
 * Copyright (C) 2019  Keyboardio, Inc.
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
import settings from "electron-settings";

import { withStyles } from "@material-ui/core/styles";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

const styles = () => ({
  root: {
    minWidth: 130,
    maxWidth: 360,
    textTransform: "uppercase"
  },
  languagesText: {
    fontSize: "0.875rem",
    // fontFamily: "'Source Code Pro', monospace",
    letterSpacing: "0.02857em",
    fontWeight: 500,
    lineHeight: 1.75
  }
});

/**
 * Reactjs functional component that create language button
 * @param {object} classes Property that sets up CSS classes that adding to HTML elements
 * @param {string} language String value, that become new language layout and set local storage
 * @param {function} onClose Callback function from SelectLanguage component. Close current language list.
 * @param {function} scanKeyboard Callback function from Editor -> KeySelector components. Without parametrs, this function call KeymapDB in Keymap and modify languagu layout
 * @param {string} onChangeLanguageLayout Callback function from Editor -> KeySelector components to to set State of new Language
 */

function LanguageItem(props) {
  const {
    classes,
    language,
    onClose,
    scanKeyboard,
    onChangeLanguageLayout,
    selected
  } = props;
  const onItemClick = () => {
    settings.setSync("keyboard.language", `${language}`);
    scanKeyboard(language);
    //Callback to change state of chosen language is Editor.js
    onChangeLanguageLayout();
    onClose();
  };
  return (
    <ListItem
      selected={selected}
      button
      onClick={onItemClick}
      className={classes.root}
    >
      <ListItemText className={classes.root}>
        <span className={classes.languagesText}>{props.children}</span>
      </ListItemText>
    </ListItem>
  );
}

LanguageItem.propTypes = {
  classes: PropTypes.object.isRequired,
  language: PropTypes.any,
  onClose: PropTypes.func.isRequired,
  onChangeLanguageLayout: PropTypes.func.isRequired,
  scanKeyboard: PropTypes.func.isRequired,
  currentLanguageLayout: PropTypes.string.isRequired
};

export default withStyles(styles)(LanguageItem);
