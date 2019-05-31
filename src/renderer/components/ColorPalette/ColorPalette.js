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
 * This is Reactjs functional component that create palette for change buttons color on keyboard
 */
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import ColorButtonsArea from "./ColorButtonsArea";
import PickerColorButton from "./PickerColorButton";
import { setColorTamplate } from "../../../renderer/utils/setTemplates";

ColorPalette.propTypes = {
  classes: PropTypes.object.isRequired,
  onColorSelect: PropTypes.func.isRequired,
  palette: PropTypes.array.isRequired,
  onColorPick: PropTypes.func.isRequired,
  disabled: PropTypes.bool.isRequired,
  selected: PropTypes.number.isRequired
};

const styles = theme => ({
  root: {
    display: "flex",
    position: "fixed",
    left: 0,
    right: 0,
    bottom: 0,
    height: 150,
    justifyContent: "center",
    alignItems: "flex-start"
  },
  palette: {
    display: "flex",
    alignItems: "center",
    padding: 10,
    minHeight: 80,
    [theme.breakpoints.down("sm")]: {
      width: 455
    }
  }
});

/**
 * Reactjs functional component that create palette for change buttons color on keyboard
 * @param {object} classes Property that sets up CSS classes that adding to HTML elements
 * @param {function} onColorSelect Callback function from Editor component for change color of buttons in keyboard. Parameter is index of color button in palette (from 0 to 15)
 * @param {array} palette Array of colors. Format [{r: 200, g: 200, b: 200, rgb: "rgb(200, 200, 200)"}, ...]
 * @param {function} onColorPick Callback function from Editor component for change color of buttons in ColorPalette. Parameters are: first - index of color button in palette (from 0 to 15), second - index of color (r: from 0 to 255), third - index of color (g: from 0 to 255), fourth - index of color (b: from 0 to 255)
 * @param {boolean} disabled Property that disable component
 * @param {number} selected Number of selected color button in palette (from 0 to 15)
 */
function ColorPalette(props) {
  const {
    classes,
    onColorSelect,
    palette,
    onColorPick,
    disabled,
    selected
  } = props;

  /**
   * This is Hook that lets add React state "indexFocusButton" to functional components
   * @param {object} [initialState=selected] - Sets initial state for "indexFocusButton"
   */
  const [indexFocusButton, setIndexFocusButton] = useState(selected);

  /**
   * This is Hook that lets add React state "colorFocusButton" to functional components
   * @param {object} [initialState] - Sets initial state for "colorFocusButton" (selected element in palette or in keyboard)
   */
  const [colorFocusButton, setColorFocusButton] = useState({
    ...palette[selected]
  });

  /**
   * Change "indexFocusButton" and "colorFocusButton", if prop "selected" is different
   */
  useEffect(() => {
    setIndexFocusButton(selected);
    setColorFocusButton({
      ...palette[selected]
    });
  }, [selected]);

  /**
   * Change "colorFocusButton" and pick color of button from PickerColorButton component in functional component state
   * @param {object} color Object with keys that defining colors using the Red-green-blue-alpha (RGBA) model
   */
  const toSetColorFocusButton = color => {
    setColorFocusButton(setColorTamplate(color));
    onColorPick(indexFocusButton, color.r, color.g, color.b);
  };

  /**
   * Change "indexFocusButton" in its state, "colorFocusButton" in ColorPalette's state, and call function onColorSelect from props, if ctrl or shift key is clicked.
   * @param {number} index Number of value in array that focusing by mouse
   * @param {object} color Object with keys that defining colors using the Red-green-blue-alpha (RGBA) model
   */
  const setIsFocus = (index, color) => {
    setIndexFocusButton(index);
    setColorFocusButton(setColorTamplate(color));
    onColorSelect(index);
  };

  const propsToChild = {
    colorFocusButton,
    indexFocusButton,
    setIsFocus,
    palette,
    disabled
  };

  return (
    <div className={classes.root}>
      <Paper className={classes.palette}>
        <ColorButtonsArea {...propsToChild} />
        <PickerColorButton
          setColorFocusButton={toSetColorFocusButton}
          colorFocusButton={colorFocusButton}
          disabled={disabled}
        />
      </Paper>
    </div>
  );
}

export default withStyles(styles)(ColorPalette);
