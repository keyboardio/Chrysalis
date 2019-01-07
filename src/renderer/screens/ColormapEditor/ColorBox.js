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
import classNames from "classnames";

import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  box: {
    height: "30px",
    width: "30px",
    borderRadius: "50%",
    margin: theme.spacing.unit,
    transform: "scale(1)",
    transition: "200ms transform ease",
    "&:hover": {
      transform: "scale(1.2)",
      cursor: "pointer",
      borderRadius: "25%"
    }
  },
  selected: {
    transform: "scale(1.2)",
    borderRadius: "25%",
    boxShadow: "0 0 8px 0px #aaa"
  }
});

class ColorBox extends React.Component {
  onClick = colorIndex => {
    this.props.onColorSelect(colorIndex);
  };

  render() {
    const { classes, color, colorIndex, selected } = this.props;

    return (
      <div
        className={classNames(classes.box, selected && classes.selected)}
        style={{ backgroundColor: color.rgb }}
        onClick={() => {
          this.onClick(colorIndex);
        }}
      />
    );
  }
}

ColorBox.propTypes = {
  classes: PropTypes.object.isRequired,
  color: PropTypes.object.isRequired
};

export default withStyles(styles)(ColorBox);
