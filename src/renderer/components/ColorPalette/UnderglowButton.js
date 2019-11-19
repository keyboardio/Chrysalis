// -*- mode: js-jsx -*-
/* Chrysalis -- Kaleidoscope Command Center
 * Copyright (C) 2019  DygmaLab SE
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
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Tooltip from "@material-ui/core/Tooltip";
import Button from "@material-ui/core/Button";

UnderglowColorButton.propTypes = {
  classes: PropTypes.object.isRequired,
  colorFocusButton: PropTypes.object,
  indexFocusButton: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.number,
    PropTypes.oneOf([null])
  ]),
  disabled: PropTypes.bool.isRequired,
  toChangeAllKeysColor: PropTypes.func.isRequired
};

const styles = () => ({
  root: {
    height: "100%",
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "center"
  },
  button: {
    width: 95,
    marginBottom: 35,
    borderRadius: 5,
    fontSize: 10,
    cursor: "pointer"
  }
});

const styleDisabled = {
  background: "rgb(155, 155, 155)",
  color: "white",
  pointerEvents: "none",
  cursor: "default"
};

/**
 * This is Reactjs functional component that create button for change color of all undeglow elements
 * @param {object} classes Property that sets up CSS classes that adding to HTML elements
 * @param {boolean} colorFocusButton Set color for UndeglowColorButton if any color button in palette is selected
 * @param {function} indexFocusButton Numder of selected color button in palette from 0 to 15, is not selected - null
 * @param {number} theme To use theme object from Material UI
 * @param {object} toChangeAllKeysColor Callback function from Editor component. Parameter is index of color palette from 0 to 15
 * @param {boolean} disabled Property that disable component
 */
function UnderglowColorButton(props) {
  const {
    classes,
    colorFocusButton,
    indexFocusButton,
    disabled,
    toChangeAllKeysColor,
    start,
    end,
    value
  } = props;
  const minWhiteColorValue = 140;
  const isWhiteColor =
    colorFocusButton.r >= minWhiteColorValue &&
    (colorFocusButton.g >= minWhiteColorValue &&
      colorFocusButton.b >= minWhiteColorValue);
  const style = {
    background: `${colorFocusButton.rgb}`,
    color: !isWhiteColor ? "white" : "black"
  };
  const enable = {
    cursor: "pointer",
    pointerEvents: "auto",
    color: !isWhiteColor ? "white" : "black"
  };
  const [keyBackground, setKeyBackground] = useState(enable);
  useEffect(() => {
    setKeyBackground(style);
  }, []);

  return (
    <Tooltip placement="top" title={props.children}>
      <div className={classes.root}>
        <Button
          variant="contained"
          className={classes.button}
          style={
            (!+indexFocusButton && indexFocusButton !== 0) || disabled
              ? styleDisabled
              : keyBackground
          }
          onClick={() => {
            toChangeAllKeysColor(indexFocusButton, start, end);
            setKeyBackground(style);
          }}
          value={value}
        >
          {value}
        </Button>
      </div>
    </Tooltip>
  );
}

export default withStyles(styles)(UnderglowColorButton);
