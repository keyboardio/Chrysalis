// -*- mode: js-jsx -*-
/* Bazecor -- Kaleidoscope Command Center
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
import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { SketchPicker } from "react-color";
import Fab from "@material-ui/core/Fab";
import Tooltip from "@material-ui/core/Tooltip";
import Popover from "@material-ui/core/Popover";
import PaletteIcon from "@material-ui/icons/Palette";
import RootRef from "@material-ui/core/RootRef";

PickerColorButton.propTypes = {
  classes: PropTypes.object.isRequired,
  setColorFocusButton: PropTypes.func.isRequired,
  colorFocusButton: PropTypes.object,
  disabled: PropTypes.bool.isRequired
};

const styles = {
  root: {
    textAlign: "center",
    margin: "15px 0"
  },
  fab: {
    width: 70,
    height: 70
  },
  icon: {
    fontSize: 32
  }
};

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
    disabled,
    indexFocusButton
  } = props;

  /**
   * This is Hook that lets add React state "anchorEl" to functional components
   * @param {object} [initialState=null] - Sets initial state for "anchorEl".
   */
  const [anchorEl, setAnchorEl] = useState(null);
  const [underglowOpen, setUnderglowOpen] = useState(indexFocusButton);
  const underGlowButtonOpen = useRef(null);
  const underglowIndex = 14;
  const backlightIndex = 15;
  /**
   * Change "setUnderglowOpen" in functional component state to open Color Palette
   */
  useEffect(() => {
    setUnderglowOpen(indexFocusButton);
  }, [indexFocusButton]);
  /**
   * Change "anchorEl" in functional component state to open Color Picker
   */
  const handleClick = e => {
    setAnchorEl(e.currentTarget);
  };

  /**
   * Change "anchorEl" in functional component state to close Color Picker pick color of button
   */
  const handleClose = () => {
    setAnchorEl(null);
    setUnderglowOpen(null);
  };
  /// Set the value to open (close) Popover element
  const open = Boolean(anchorEl);
  return (
    <Tooltip placement="top-start" title={props.children}>
      <div className={classes.root}>
        <RootRef rootRef={underGlowButtonOpen}>
          <Fab
            color="primary"
            className={classes.fab}
            onClick={handleClick}
            disabled={disabled}
          >
            <PaletteIcon className={classes.icon} />
          </Fab>
        </RootRef>
        <Popover
          id={"simple-popover"}
          open={
            open ||
            underglowOpen === underglowIndex ||
            underglowOpen === backlightIndex
          }
          anchorEl={anchorEl || underGlowButtonOpen.current}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "top",
            horizontal: "left"
          }}
          transformOrigin={{
            vertical: "bottom",
            horizontal: "right"
          }}
        >
          <SketchPicker
            color={color}
            onChange={color => {
              setColorFocusButton(color.rgb);
            }}
          />
        </Popover>
      </div>
    </Tooltip>
  );
}

export default withStyles(styles)(PickerColorButton);
