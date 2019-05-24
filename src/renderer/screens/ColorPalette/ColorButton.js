/**
 * This is Reactjs functional component that create color button
 */
import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";

ColorButton.propTypes = {
  classes: PropTypes.object.isRequired,
  isFocus: PropTypes.bool.isRequired,
  setIsFocus: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
  color: PropTypes.object.isRequired,
  disabled: PropTypes.bool.isRequired
};

const styles = theme => ({
  root: {
    padding: 5
  },
  button: {
    width: 40,
    height: 40,
    borderRadius: 5,
    cursor: "pointer",
    [theme.breakpoints.down("sm")]: {
      width: 35,
      height: 35
    }
  }
});

const styleDisabled = {
  background: `rgb(155, 155, 155)`,
  pointerEvents: "none",
  cursor: "default"
};

///Minimum value for rendering border on white button
const minWhiteColorValue = 220;

/**
 * Reactjs functional component that create color button
 * @param {object} classes Property that sets up CSS classes that adding to HTML elements
 * @param {boolean} isFocus Change CSS styles
 * @param {function} setIsFocus Callback function from ColorPalette component. Parameters are: first - index of color button in palette (from 0 to 15), second - object with keys that defining colors using the Red-green-blue-alpha (RGBA) model, third - event
 * @param {number} index Current index of button
 * @param {object} color Current color of button
 * @param {boolean} disabled Property that disable component
 */
function ColorButton(props) {
  const { classes, isFocus, setIsFocus, index, color, disabled } = props;

  ///Checks background is white or not
  const isWhiteColor =
    color.r >= minWhiteColorValue &&
    color.g >= minWhiteColorValue &&
    color.b >= minWhiteColorValue;

  const style = {
    background: `rgb(${color.r}, ${color.g}, ${color.b})`,
    border: !isWhiteColor
      ? `1px solid rgb(${color.r}, ${color.g}, ${color.b})`
      : "1px solid rgb(155, 155, 155)"
  };

  const styleInFocus = {
    background: `rgb(${color.r}, ${color.g}, ${color.b})`,
    boxShadow: !isWhiteColor
      ? `0px 0px 26px 4px rgb(${color.r}, ${color.g}, ${color.b})`
      : `0px 0px 26px 4px rgb(155, 155, 155)`
  };

  return (
    <div className={classes.root}>
      <div
        className={classes.button}
        style={disabled ? styleDisabled : isFocus ? styleInFocus : style}
        onClick={setIsFocus.bind(this, index, color)}
      />
    </div>
  );
}

export default withStyles(styles)(ColorButton);
