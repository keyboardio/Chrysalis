// -*- mode: js-jsx -*-
/* Bazecor -- Kaleidoscope Command Center
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
import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Tooltip from "@material-ui/core/Tooltip";
import Button from "@material-ui/core/Button";
import { setButtonSizeTemplate } from "../../../renderer/utils/setTemplates";

UndeglowColorButton.propTypes = {
  classes: PropTypes.object.isRequired,
  colorFocusButton: PropTypes.object,
  indexFocusButton: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.number,
    PropTypes.oneOf([null])
  ]),
  theme: PropTypes.object.isRequired,
  disabled: PropTypes.bool.isRequired,
  toChangeAllUnderglowsColor: PropTypes.func.isRequired
};

const styles = theme => ({
  root: {
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 6
  },
  button: {
    ...setButtonSizeTemplate(40),
    margin: 5,
    borderRadius: 5,
    cursor: "pointer",
    [theme.breakpoints.down("sm")]: {
      ...setButtonSizeTemplate(35)
    }
  }
});

const styleDisabled = {
  background: "rgb(155, 155, 155)",
  pointerEvents: "none",
  cursor: "default"
};

/**
 * This is Reactjs functional component that create button for change color of all undeglow elements
 * @param {object} classes Property that sets up CSS classes that adding to HTML elements
 * @param {boolean} colorFocusButton Set color for UndeglowColorButton if any color button in palette is selected
 * @param {function} indexFocusButton Numder of selected color button in palette from 0 to 15, is not selected - null
 * @param {number} theme To use theme object from Material UI
 * @param {object} toChangeAllUnderglowsColor Callback function from Editor component. Parameter is index of color palette from 0 to 15
 * @param {boolean} disabled Property that disable component
 */
function UndeglowColorButton(props) {
  const {
    classes,
    colorFocusButton,
    indexFocusButton,
    disabled,
    theme,
    toChangeAllUnderglowsColor
  } = props;

  const style = {
    background:
      colorFocusButton !== null &&
      `rgb(${colorFocusButton.r}, ${colorFocusButton.g}, ${colorFocusButton.b})`,
    color:
      colorFocusButton !== null &&
      theme.palette.getContrastText(colorFocusButton.rgb)
  };

  return (
    <Tooltip placement="top-start" title={props.children}>
      <div className={classes.root}>
        <Button
          variant="contained"
          className={classes.button}
          style={
            (!+indexFocusButton && indexFocusButton !== 0) || disabled
              ? styleDisabled
              : style
          }
          onClick={toChangeAllUnderglowsColor.bind(this, indexFocusButton)}
        >
          {"LED"}
        </Button>
      </div>
    </Tooltip>
  );
}

export default withStyles(styles)(UndeglowColorButton);
