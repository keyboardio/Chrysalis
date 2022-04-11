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
 * This is Reactjs functional component that create color button
 */
import React from "react";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";

ColorButton.propTypes = {
  isFocus: PropTypes.bool.isRequired,
  setIsFocus: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
  color: PropTypes.object.isRequired,
  disabled: PropTypes.bool.isRequired,
  isSelected: PropTypes.bool,
};

const styleDisabled = {
  background: "rgb(155, 155, 155)",
  pointerEvents: "none",
  cursor: "default",
};

///Minimum value for rendering border on white button
const minWhiteColorValue = 140;

/**
 * Reactjs functional component that create color button
 * @param {boolean} isFocus Change CSS styles
 * @param {function} setIsFocus Callback function from ColorPalette component. Parameters are: first - index of color button in palette (from 0 to 15), second - object with keys that defining colors using the Red-green-blue-alpha (RGBA) model, third - event
 * @param {number} index Current index of button
 * @param {object} color Current color of button
 * @param {boolean} disabled Property that disable component
 */
function ColorButton(props) {
  const { setIsFocus, isFocus, index, color, disabled } = props;

  ///Checks background is white or not
  const isWhiteColor =
    color.r >= minWhiteColorValue &&
    color.g >= minWhiteColorValue &&
    color.b >= minWhiteColorValue;

  const style = {
    background: `rgb(${color.r}, ${color.g}, ${color.b})`,
  };

  const styleInFocus = {
    ...style,
    boxShadow: !isWhiteColor
      ? `0px 0px 26px 4px rgb(${color.r}, ${color.g}, ${color.b})`
      : `0px 0px 26px 4px rgb(155, 155, 155)`,
  };

  return (
    <Button
      variant="contained"
      sx={{
        margin: 5,
        borderRadius: 5,
        cursor: "pointer",
        minWidth: { sm: 35, lg: 40 },
        minHeight: { sm: 35, lg: 40 },
        maxWidth: { sm: 35, lg: 40 },
        maxHeight: { sm: 35, lg: 40 },
      }}
      style={disabled ? styleDisabled : isFocus ? styleInFocus : style}
      onClick={setIsFocus.bind(this, index, color)}
    >
      {""}
    </Button>
  );
}

export default ColorButton;
