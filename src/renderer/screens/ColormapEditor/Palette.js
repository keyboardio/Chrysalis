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

import React from "react";
import PropTypes from "prop-types";

import Paper from "@material-ui/core/Paper";
import { withStyles } from "@material-ui/core/styles";

import { MaterialPicker } from "react-color";

import ColorBox from "./ColorBox";

const styles = theme => ({
  root: {
    display: "flex",
    position: "fixed",
    left: 0,
    right: 0,
    bottom: 0,
    height: 150,
    padding: theme.spacing.unit * 2,
    justifyContent: "center"
  },
  picker: {
    width: 124,
    display: "flex",
    justifyContent: "center"
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

  onColorPick = ({ rgb: { r, g, b } }) => {
    this.props.onColorPick(this.state.selectedColor, r, g, b);
  };

  render() {
    if (!this.props.palette) return null;

    const { classes, palette } = this.props;

    const [lowHalf, highHalf] = [palette.slice(0, 8), palette.slice(8)];
    const lowWidget = lowHalf.map((color, index) => {
      const itemKey = "palette-index-" + index.toString();
      return (
        <ColorBox
          selected={index == this.state.selectedColor}
          key={itemKey}
          color={color}
          colorIndex={index}
          onColorSelect={this.onColorSelect}
        />
      );
    });
    const highWidget = highHalf.map((color, index) => {
      const itemKey = "palette-index-" + (index + 8).toString();
      return (
        <ColorBox
          selected={index + 8 == this.state.selectedColor}
          key={itemKey}
          color={color}
          colorIndex={index + 8}
          onColorSelect={this.onColorSelect}
        />
      );
    });

    const color = this.props.palette[this.state.selectedColor];
    const picker = this.state.selectedColor != -1 && (
      <MaterialPicker color={color} onChangeComplete={this.onColorPick} />
    );

    return (
      <Paper className={classes.root} square>
        {lowWidget}
        <div className={classes.picker}>{picker}</div>
        {highWidget}
      </Paper>
    );
  }
}

Palette.propTypes = {
  classes: PropTypes.object.isRequired,
  palette: PropTypes.array.isRequired
};

export default withStyles(styles)(Palette);
