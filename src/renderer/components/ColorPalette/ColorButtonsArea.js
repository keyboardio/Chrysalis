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
 * This is Reactjs functional component that create area for color buttons
 */
import React, { useState, useEffect } from "react";
import { v4 as uuid } from "uuid";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import ColorButton from "./ColorButton";

ColorButtonsArea.propTypes = {
  classes: PropTypes.object.isRequired,
  colorFocusButton: PropTypes.object,
  indexFocusButton: PropTypes.any,
  setIsFocus: PropTypes.func.isRequired,
  palette: PropTypes.array.isRequired,
  disabled: PropTypes.bool.isRequired
};

const styles = theme => ({
  palette: {
    padding: "5px 0",
    [theme.breakpoints.down("sm")]: {
      padding: 0
    }
  }
});

/**
 * Reactjs functional component that create area for color buttons
 * @param {object} classes Property that sets up CSS classes that adding to HTML elements
 * @param {object} colorFocusButton Object with keys that defining colors using the Red-green-blue-alpha (RGBA) model for focus button
 * @param {number} indexFocusButton Number of focus button (from 0 to 15)
 * @param {function} setIsFocus Callback function from ColorPalette component. Parameters are: first - index of color button in palette (from 0 to 15), second - object with keys that defining colors using the Red-green-blue-alpha (RGBA) model, third - event
 * @param {array} palette Array of colors. Format [{r: 200, g: 200, b: 200, rgb: "rgb(200, 200, 200)"}, ...]
 * @param {boolean} disabled Property that disable component
 */
function ColorButtonsArea(props) {
  const {
    classes,
    colorFocusButton,
    indexFocusButton,
    setIsFocus,
    palette,
    disabled
  } = props;

  /**
   * This is Hook that lets add React state "colorButtonsAmount" to functional components
   * @param {array} [state] Array with color elements
   */
  const [colorButtonsAmount, setColorButtonsAmount] = useState(palette);

  /**
   * Change "colorButtonsAmount", if prop "colorFocusButton" is different
   */
  useEffect(() => {
    if (indexFocusButton !== null) {
      colorButtonsAmount[indexFocusButton] = { ...colorFocusButton };
      setColorButtonsAmount(colorButtonsAmount);
    }
  }, [colorFocusButton]);

  /**
   * Render color buttons area by two arrays from prop "pallete"
   */
  const displayGrids = () => {
    return (
      <Grid item>
        {palette.map((colorButton, i) => (
          <ColorButton
            key={uuid()}
            isFocus={i === indexFocusButton}
            index={i}
            color={i === indexFocusButton ? colorFocusButton : colorButton}
            setIsFocus={setIsFocus}
            disabled={disabled}
          />
        ))}
      </Grid>
    );
  };

  return (
    <div className={classes.palette}>
      <Grid container>{displayGrids()}</Grid>
    </div>
  );
}

export default withStyles(styles)(ColorButtonsArea);
