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

class Key extends React.Component {
  render() {
    let shape,
      stroke = "#b3b3b3";

    if (this.props.palmKey) {
      shape = (
        <ellipse
          fill={this.props.color}
          stroke={stroke}
          strokeWidth="2.73"
          cx="610.765"
          cy="953.469"
          rx="75.6"
          ry="56.001"
          transform={this.props.shape}
        />
      );
    } else {
      shape = (
        <path
          fill={this.props.color}
          stroke={stroke}
          strokeWidth="1.55"
          d={this.props.shape}
        />
      );
    }

    return (
      <g
        onClick={this.props.onClick}
        className="key"
        data-key-row={this.props.row}
        data-key-col={this.props.col}
        data-layer={this.props.layer}
      >
        {shape}
      </g>
    );
  }
}

export default Key;
