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
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import ColorButton from "./ColorButton";

ColorButtonsArea.propTypes = {
  classes: PropTypes.object.isRequired,
  colorFocusButton: PropTypes.object.isRequired,
  indexFocusButton: PropTypes.number.isRequired,
  setIsFocus: PropTypes.func.isRequired,
  palette: PropTypes.array.isRequired,
  disabled: PropTypes.bool.isRequired
};

const styles = theme => ({
  palette: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    [theme.breakpoints.down("sm")]: {
      padding: 7
    }
  }
});

const isIdentity = (a, b) => {
  if (a === b) return true;
  return false;
};

const fullArrayLength = 16;

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
   * This is Hook that lets add React state "innerWidth" to functional components
   * @param {array} [state] Value of window.innerWidth
   */
  const [innerWidth, setInnerWidth] = useState(window.innerWidth);

  /**
   * This is Hook that lets add React state "grids" to functional components
   * @param {number} [state] Amount of grids
   */
  const [grids, setGrids] = useState(innerWidth < 960 ? 2 : 1);

  // /**
  //  * Change "innerWidth"
  //  */
  useEffect(() => {
    setInnerWidth(window.innerWidth);
  });

  /**
   * Change "grids", if prop "innerWidth" is different
   */
  useEffect(() => {
    setGrids(innerWidth < 960 ? 2 : 1);
  }, [innerWidth]);

  /**
   * Change "colorButtonsAmount", if prop "colorFocusButton" is different
   */
  useEffect(() => {
    const color = {
      r: colorFocusButton.r,
      g: colorFocusButton.g,
      b: colorFocusButton.b,
      rgb: `rgb(${colorFocusButton.r}, ${colorFocusButton.g}, ${
        colorFocusButton.b
      })`
    };
    colorButtonsAmount[indexFocusButton] = { ...color };
    setColorButtonsAmount(colorButtonsAmount);
  }, [colorFocusButton]);

  /**
   * Use variable to reduce the amount of code
   */
  const propsToChild = {
    setIsFocus,
    disabled
  };

  /**
   * Render color buttons area
   * @param {number} grids Amount of grids (from 1 to 2)
   */
  const displayGrids = grids => {
    const gridsArray = new Array(grids).fill(0);
    const arrayLength = fullArrayLength / grids;
    return gridsArray.map((_, i) => {
      const firstIndex = i * arrayLength;
      const lastIndex = arrayLength + firstIndex;
      return (
        <Grid item sm={grids === 1 ? 12 : 6} key={i}>
          {colorButtonsAmount
            .slice(firstIndex, lastIndex)
            .map((colorButton, j) => {
              const buttonIndex = i === 1 ? j + arrayLength : j;
              return (
                <ColorButton
                  key={buttonIndex}
                  isFocus={isIdentity(buttonIndex, indexFocusButton)}
                  index={buttonIndex}
                  color={
                    isIdentity(buttonIndex, indexFocusButton)
                      ? colorFocusButton
                      : colorButton
                  }
                  {...propsToChild}
                />
              );
            })}
        </Grid>
      );
    });
  };

  return (
    <Paper className={classes.palette}>
      <Grid container alignContent="center">
        {displayGrids(grids)}
      </Grid>
    </Paper>
  );
}

export default withStyles(styles)(ColorButtonsArea);
