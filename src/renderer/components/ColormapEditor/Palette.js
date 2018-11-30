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

import { withStyles } from "@material-ui/core/styles";

import ColorBox from "./ColorBox";

const styles = () => ({
  palette: {
    display: "flex"
  }
});

class Palette extends React.Component {
  state = {
    selectedColor: -1
  };

  onColorSelect = colorIndex => {
    if (colorIndex == this.state.selectedColor) colorIndex = -1;
    this.setState({ selectedColor: colorIndex });
    this.props.onColorSelect(colorIndex);
  };

  render() {
    if (!this.props.palette) return null;

    let palette = this.props.palette.map((color, index) => {
      let itemKey = "palette-index-" + index.toString();
      return (
        <ColorBox
          selected={index == this.state.selectedColor}
          key={itemKey}
          color={color}
          colorIndex={index}
          onColorSelect={this.onColorSelect}
          onColorPick={this.props.onColorPick}
        />
      );
    });

    const { classes } = this.props;

    return (
      <div className={classNames(classes.palette, this.props.className)}>
        {palette}
      </div>
    );
  }
}

Palette.propTypes = {
  classes: PropTypes.object.isRequired,
  palette: PropTypes.array.isRequired
};

export default withStyles(styles)(Palette);
