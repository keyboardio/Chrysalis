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

import Focus from "@chrysalis-api/focus";
import { getStaticPath } from "../../config";

const styles = theme => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper
  },
  button: {
    margin: 15,
    width: 170,
    padding: "5px 5px 0"
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
 * @param {string} currentLanguageLayout String value, that passes the state of Editor of saved language
 * @param {string} onChangeLanguageLayout String value, that passes the state of Editor of new language layout to compare it with currentLanguageLayout  
 
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
      currentLanguageLayout,
      onChangeLanguageLayout
    } = this.props;
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);
    let focus = new Focus();
    const isISO = focus.device && focus.device.info.keyboardType === "ISO";
    const childrenItems = item => {
      let name = item;
      if (item === "english") {
        name = isISO ? `${item}-UK` : `${item}-US`;
      }
      return (
        <Grid container>
          <Grid item xs={3}>
            <img
              src={
                this.isDevelopment
                  ? `./${name}.png`
                  : path.join(getStaticPath(), `${name}.png`)
              }
              className={classes.img}
              alt="flag"
            />
          </Grid>
          <Grid item xs={9}>
            {name}
          </Grid>
        </Grid>
      );
    };
    const languageList = Object.keys(languagesDB).map(item => (
      <div key={item.toString()}>
        <LanguageItem
          language={item}
          onClose={this.handleCloseLanguage}
          scanKeyboard={scanKeyboard}
          selected={item === currentLanguageLayout}
          currentLanguageLayout={currentLanguageLayout}
          onChangeLanguageLayout={onChangeLanguageLayout}
        >
          {childrenItems(item)}
        </LanguageItem>
        <Divider />
      </div>
    ));

    return (
      <React.Fragment>
        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          onClick={this.handleOpenLanguage}
        >
          <Grid container>
            <Grid item xs={10}>
              {childrenItems(currentLanguageLayout)}
            </Grid>
            <Grid item xs={2}>
              <TranslateIcon />
            </Grid>
          </Grid>
        </Button>
        <Popper open={open} anchorEl={anchorEl} placement="top">
          <ClickAwayListener onClickAway={this.handleCloseLanguage}>
            <List component="nav" className={classes.root}>
              {languageList}
            </List>
          </ClickAwayListener>
        </Popper>
      </React.Fragment>
    );
  }
}

SelectLanguage.propTypes = {
  classes: PropTypes.object.isRequired,
  scanKeyboard: PropTypes.func.isRequired,
  onChangeLanguageLayout: PropTypes.func.isRequired,
  currentLanguageLayout: PropTypes.string.isRequired
};

export default withStyles(styles)(SelectLanguage);
