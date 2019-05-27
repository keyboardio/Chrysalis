// -*- mode: js-jsx -*-
/* Chrysalis -- Kaleidoscope Command Center
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
/**
 * This is Reactjs functional component that create button to choose colors from Color Picker
 */
import React, { useState } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { SketchPicker } from "react-color";
import Fab from "@material-ui/core/Fab";
import PaletteIcon from "@material-ui/icons/Palette";

PickerColorButton.propTypes = {
  classes: PropTypes.object.isRequired,
  setColorFocusButton: PropTypes.func.isRequired,
  colorFocusButton: PropTypes.object.isRequired,
  disabled: PropTypes.bool.isRequired
};

const styles = theme => ({
  root: {
    position: "relative",
    marginLeft: 10
  },
  fab: {
    width: 60,
    height: 60
  },
  icon: {
    fontSize: 32
  },
  popover: {
    position: "absolute",
    zIndex: 204,
    bottom: 65,
    left: -130,
    [theme.breakpoints.up(1320)]: {
      bottom: 60,
      left: 60
    },
    [theme.breakpoints.down("sm")]: {
      bottom: 65,
      left: 0
    },
    [theme.breakpoints.down(800)]: {
      top: -300,
      left: -220
    }
  },
  cover: {
    position: "fixed",
    left: 0,
    bottom: 0,
    height: "100vh",
    width: "100vw",
    zIndex: 203
  },
  picker: {
    zIndex: 205,
    position: "relative"
  }
});

/**
 * Reactjs functional component that create button to choose colors from Color Picker
 * @param {object} classes Property that sets up CSS classes that adding to HTML elements
 * @param {function} setColorFocusButton Callback function from ColorPalette component
 * @param {object} colorFocusButton Object with keys that defining colors using the Red-green-blue-alpha (RGBA) model for focus button
 * @param {boolean} disabled Property that disable component
 */
function PickerColorButton(props) {
  const {
    classes,
    setColorFocusButton,
    colorFocusButton: color,
    disabled
  } = props;

  /**
   * This is Hook that lets add React state "displayColorPicker" to functional components
   * @param {boolean} [initialState=false] - Sets initial state for "displayColorPicker".
   */
  const [displayColorPicker, setDisplayColorPicker] = useState(false);

  /**
   * Change "displayColorPicker" in functional component state to open(close) Color Picker
   */
  const handleClick = () => {
    setDisplayColorPicker(!displayColorPicker);
  };

  /**
   * Change "displayColorPicker" in functional component state to close Color Picker
   */
  const handleClose = () => {
    setDisplayColorPicker(false);
  };

  return (
    <div className={classes.root}>
      <Fab
        color="primary"
        aria-label="Add"
        className={classes.fab}
        onClick={handleClick}
        disabled={disabled}
      >
        <PaletteIcon className={classes.icon} />
      </Fab>
      {displayColorPicker ? (
        <div className={classes.popover}>
          <SketchPicker
            className={classes.picker}
            color={color}
            onChange={color => {
              setColorFocusButton(color.rgb);
            }}
          />
          <div className={classes.cover} onClick={handleClose} />
        </div>
      ) : null}
    </div>
  );
}

export default withStyles(styles)(PickerColorButton);
