/**
 * This is Reactjs functional component that create area for color buttons
 */
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import ColorButton from "./ColorButton";

ColorButtonsArea.propTypes = {
  classes: PropTypes.object.isRequired,
  colorFocusButton: PropTypes.object.isRequired,
  panelNumber: PropTypes.number.isRequired,
  indexFocusButton: PropTypes.number.isRequired,
  setIsFocus: PropTypes.func.isRequired,
  palette: PropTypes.array.isRequired,
  disabled: PropTypes.bool.isRequired
};

const styles = {
  palette: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  }
};

///Number of buttons in one area
const colorButtonsArrayLength = 8;

/**
 * Reactjs functional component that create area for color buttons
 * @param {object} classes Property that sets up CSS classes that adding to HTML elements
 * @param {object} colorFocusButton Object with keys that defining colors using the Red-green-blue-alpha (RGBA) model for focus button
 * @param {number} panelNumber Number of panel (0 or 8)
 * @param {number} indexFocusButton Number of focus button (from 0 to 15)
 * @param {function} setIsFocus Callback function from ColorPalette component. Parameters are: first - index of color button in palette (from 0 to 15), second - object with keys that defining colors using the Red-green-blue-alpha (RGBA) model, third - event
 * @param {array} palette Array of colors. Format [{r: 200, g: 200, b: 200, rgb: "rgb(200, 200, 200)"}, ...]
 * @param {boolean} disabled Property that disable component
 */
function ColorButtonsArea(props) {
  const {
    classes,
    colorFocusButton,
    panelNumber,
    indexFocusButton,
    setIsFocus,
    palette,
    disabled
  } = props;

  /**
   * This is Hook that lets add React state "colorButtonsAmount" to functional components
   * @param {array} [state] Array with eight color elements
   */
  const [colorButtonsAmount] = useState(
    palette.slice(panelNumber, colorButtonsArrayLength + panelNumber)
  );

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
    if (indexFocusButton < colorButtonsArrayLength && panelNumber === 0) {
      colorButtonsAmount.splice(indexFocusButton, 1, { ...color });
    }
    if (indexFocusButton >= colorButtonsArrayLength && panelNumber === 8) {
      colorButtonsAmount.splice(indexFocusButton - colorButtonsArrayLength, 1, {
        ...color
      });
    }
  }, [colorFocusButton]);

  return (
    <div className={classes.palette}>
      {colorButtonsAmount.map((colorButton, i) => {
        const indexButton = i + panelNumber;
        const isIdentity = indexButton === indexFocusButton;
        return (
          <ColorButton
            key={indexButton}
            isFocus={isIdentity}
            setIsFocus={setIsFocus}
            index={indexButton}
            color={isIdentity ? colorFocusButton : colorButton}
            disabled={disabled}
          />
        );
      })}
    </div>
  );
}

export default withStyles(styles)(ColorButtonsArea);
