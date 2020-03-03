// -*- mode: js-jsx -*-
/* chrysalis-hardware-keyboardio-atreus2 -- Chrysalis Atreus2 support
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
    const { x, y, label, row, col, layer, onClick } = this.props;
    const keyIndex = parseInt(row) * 12 + parseInt(col);
    const strokeColor = "transparent" || "#b3b3b3";
    const stroke = this.props.active ? "#f3b3b3" : strokeColor;
    const height = this.props.height || 44;
    const bottom = y + height - 16;
    /*
    const textColor = "#000000";
    const buttonColor = "#ffffff";
    */
    const textColor = "#ffffff";
    const buttonColor = "transparent";

    return (
      <g
        onClick={onClick}
        className="key"
        data-key-index={keyIndex}
        data-layer={layer}
      >
        <rect
          x={x}
          y={y}
          rx={3}
          width="44"
          height={height}
          stroke={stroke}
          strokeWidth={1.55}
          fill={buttonColor}
        />
        <text x={x + 5} y={y + 14} fill={textColor}>
          {label.extraLabel}
        </text>
        <text x={x + 5} y={bottom} fill={textColor}>
          {label.label}
        </text>
      </g>
    );
  }
}

export default Key;
