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
    const { x, y, label, row, col, layer, onClick } = this.props;
    const keyIndex = parseInt(row) * 11 + parseInt(col);
    const stroke = this.props.active ? "#f3b3b3" : "#b3b3b3";
    const height = this.props.height || 52;
    const bottom = y + height - 16;

    return (
      <g
        onClick={onClick}
        className="key"
        data-key-index={keyIndex}
        data-layer={layer}
      >
        <rect x={x} y={y}
              width="52" height={height}
              rx="5" fill={stroke} />
        <rect x={x} y={y}
              width="52" height={height}
              rx="5" fill={stroke} />
        <rect x={x + 6} y={y + 3}
              width="40" height={height - 12}
              rx="5" fill="#fcfcfc"/>
        <g>
          <rect x={x + 6} y={y + 3}
                width="40" height={height - 12}
                rx="5" fill="#ffffff"/>
          <text x={x + 12} y={bottom - 16}>{label.extraLabel}</text>
          <text x={x + 12} y={bottom}>{label.label}</text>
        </g>
      </g>
    );
  }
}

export default Key;
