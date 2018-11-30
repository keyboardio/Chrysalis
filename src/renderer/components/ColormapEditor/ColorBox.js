// -*- mode: js-jsx -*-
/* chrysalis-bundle-keyboardio -- Chrysalis Bundle for Keyboard.io
 * Copyright (C) 2018  Keyboardio, Inc.
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
import classNames from "classnames";

import { ChromePicker } from "react-color";

import Popover from "@material-ui/core/Popover";
import { withStyles } from "@material-ui/core/styles";

const styles = () => ({
  box: {
    border: "1px black solid",
    height: "30px",
    width: "30px",
    borderRadius: "5px",
    margin: "3px",
    "&:hover": {
      cursor: "pointer"
    }
  },
  selected: {
    border: "3px red solid"
  }
});

class ColorBox extends React.Component {
  state = {
    picker: false,
    anchorEl: null
  };

  onClick = colorIndex => {
    this.props.onColorSelect(colorIndex);
  };

  onContext = event => {
    this.setState({
      anchorEl: event.currentTarget,
      picker: true
    });
  };

  onColorPick = ({ rgb: { r, g, b } }) => {
    this.props.onColorPick(this.props.colorIndex, r, g, b);
  };

  onPopoverClose = () => {
    this.setState({
      anchorEl: null,
      picker: false
    });
  };

  render() {
    const { classes, color, colorIndex, selected } = this.props;

    let picker = null;
    if (this.state.picker) {
      picker = (
        <Popover
          open={this.state.picker}
          anchorEl={this.state.anchorEl}
          onClose={this.onPopoverClose}
        >
          <ChromePicker
            color={color}
            disableAlpha
            onChangeComplete={this.onColorPick}
          />
        </Popover>
      );
    }

    return (
      <div>
        <div
          className={classNames(classes.box, selected && classes.selected)}
          style={{ backgroundColor: color.rgb }}
          onClick={() => {
            this.onClick(colorIndex);
          }}
          onContextMenu={this.onContext}
        />
        {picker}
      </div>
    );
  }
}

ColorBox.propTypes = {
  classes: PropTypes.object.isRequired,
  color: PropTypes.object.isRequired
};

export default withStyles(styles)(ColorBox);
