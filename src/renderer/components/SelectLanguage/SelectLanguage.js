// -*- mode: js-jsx -*-
/* Chrysalis -- Kaleidoscope Command Center
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

import React, { Component } from "react";
import PropTypes from "prop-types";
import path from "path";
import { withStyles } from "@material-ui/core/styles";
// languagesDB is data base, typeof object
import { languagesDB } from "@chrysalis-api/keymap";
import Button from "@material-ui/core/Button";
import TranslateIcon from "@material-ui/icons/Translate";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import LanguageItem from "./LanguageItem";
import Popper from "@material-ui/core/Popper";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";

import { getStaticPath } from "../../config";

const styles = theme => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper
  },
  button: {
    margin: 15,
    minWidth: 145
  },
  rightIcon: {
    marginLeft: theme.spacing.unit * 1
  },
  menu: {
    width: "100%"
  },
  img: {
    width: "70%"
  }
});

/**
 * Reactjs class component that select new language layout
 * @param {object} classes Property that sets up CSS classes that adding to HTML elements
 * @param {HTMLAnchorElement} anchorEl HTMLAnchorElement which is a relative element for our list of languages
 * @param {function} scanKeyboard Callback function from Editor -> KeySelector components. Without parametrs, this function call KeymapDB in Keymap and modify languagu layout
 * @param {function} doCancelContext Callback function from App -> Editor -> KeySelector components. Close ContextBar
 * @param {function} onModified Callback function from Editor -> KeySelector components. Open ContextBar and activate saveButton
 * @param {string} currentLanguageLayout String value, that passes the state of Editor of saved language
 * @param {string} onNewLanguageLayout String value, that passes the state of Editor of new language layout to compare it with currentLanguageLayout  
 
 */

class SelectLanguage extends Component {
  state = {
    anchorEl: null
  };

  isDevelopment = process.env.NODE_ENV !== "production";

  handleOpenLanguage = evt => {
    this.setState({
      anchorEl: evt.currentTarget
    });
  };

  handleCloseLanguage = () => {
    this.setState({
      anchorEl: null
    });
  };

  render() {
    const {
      classes,
      scanKeyboard,
      doCancelContext,
      onModified,
      currentLanguageLayout,
      onNewLanguageLayout
    } = this.props;
    let currentLanguage = localStorage.getItem("language") || "english";
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);
    const childrenItems = item => (
      <Grid container>
        <Grid item sm={4}>
          <img
            src={
              this.isDevelopment
                ? `./${item}.png`
                : path.join(getStaticPath(), `${item}.png`)
            }
            className={classes.img}
            alt="press_esc"
          />
        </Grid>
        <Grid item sm={8}>
          {item}
        </Grid>
      </Grid>
    );
    const languageList = Object.keys(languagesDB).map(item => (
      <div key={item.toString()}>
        <LanguageItem
          language={item}
          onClose={this.handleCloseLanguage}
          scanKeyboard={scanKeyboard}
          selected={item === currentLanguage}
          //doCancelContext/onModified - callbacks  to close/open contextBar and saveButton
          //currentLanguageLayout - is state in Editor of saved language by saveButton
          currentLanguageLayout={currentLanguageLayout}
          onModified={onModified}
          doCancelContext={doCancelContext}
          //Callback to change state of chosen language is Editor.js
          onNewLanguageLayout={onNewLanguageLayout}
        >
          {childrenItems(item)}
        </LanguageItem>
        <Divider />
      </div>
    ));

    return (
      <div>
        <Button
          variant="contained"
          color="default"
          className={classes.button}
          onClick={this.handleOpenLanguage}
        >
          {this.props.newLanguageLayout}
          <TranslateIcon className={classes.rightIcon} />
        </Button>
        <Popper
          open={open}
          anchorEl={anchorEl}
          placement="top-start"
          disablePortal={true}
        >
          <ClickAwayListener onClickAway={this.handleCloseLanguage}>
            <List component="nav" className={classes.root}>
              {languageList}
            </List>
          </ClickAwayListener>
        </Popper>
      </div>
    );
  }
}

SelectLanguage.propTypes = {
  classes: PropTypes.object.isRequired,
  scanKeyboard: PropTypes.func.isRequired,
  onNewLanguageLayout: PropTypes.func.isRequired,
  doCancelContext: PropTypes.func.isRequired,
  onModified: PropTypes.func.isRequired,
  currentLanguageLayout: PropTypes.any,
  newLanguageLayout: PropTypes.any
};

export default withStyles(styles)(SelectLanguage);
