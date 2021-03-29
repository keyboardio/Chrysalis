// -*- mode: js-jsx -*-
/* chrysalis-hardware-keyboardio-atreus2 -- Chrysalis Atreus2 support
 * Copyright (C) 2019, 2020  Keyboardio, Inc.
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

import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import Atreus from "../data/atreus.png";

import { KeymapDB } from "../../keymap";

const db = new KeymapDB();

const styles = () => ({
  svg: {
    background: `url(${Atreus})`,
    backgroundSize: "100%",
    backgroundRepeat: "no-repeat"
  }
});

class Keymap extends React.Component {
  render() {
    const keymap =
      this.props.keymap ||
      Array(48)
        .fill()
        .map(() => 0);

    const KeySpacingY = 63;
    const keySpacingX = 62.5;

    const colOffsetY = [30, 20, 4, 24, 40, 30, 30, 40, 24, 4, 20, 30];
    const colOffsetX = [
      0,
      0,
      0,
      0,
      0,
      0,
      -71.5,
      -71.5,
      -71.5,
      -71.5,
      -71.5,
      -71.5
    ];

    const rowOffsetX = [2, 2, 2, 2];

    let getKey = (row, col) => {
      let keyIndex = parseInt(row) * 12 + parseInt(col),
        key = keymap[keyIndex];
      return key;
    };
    let isActive = (row, col) => {
      let keyIndex = parseInt(row) * 12 + parseInt(col);
      return this.props.selectedKey == keyIndex;
    };

    let getX = (row, col) => {
      return rowOffsetX[row] + keySpacingX * col + colOffsetX[col];
    };

    let getY = (row, col) => {
      return colOffsetY[col] + KeySpacingY * row;
    };

    const Key = props => {
      const { row, col } = props;
      const x = getX(row, col),
        y = getY(row, col),
        active = isActive(row, col),
        layer = this.props.index,
        key = getKey(row, col),
        onClick = this.props.onKeySelect;
      const keyIndex = parseInt(row) * 12 + parseInt(col);
      const strokeColor = "transparent" || "#b3b3b3";
      const stroke = active ? "#f3b3b3" : strokeColor;
      const height = props.height || 42;
      const width = props.width || 42;
      const bottom = y + height - 5;
      /*
        const textColor = "#000000";
        const buttonColor = "#ffffff";
      */
      let textColor = "#ffffff";
      const buttonColor = "transparent";

      let legendClass = "";
      const legend = key && db.format(key);
      if (key && (legend.main || "").length <= 1 && !legend.hint)
        legendClass = "shortLegend";
      if (key && key.code == 0) textColor = "#888888";

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
            rx={2}
            width={width}
            height={height}
            stroke={stroke}
            strokeWidth={1.55}
            fill={buttonColor}
          />
          <text x={x + 5} y={y + 14} fill={textColor} className={legendClass}>
            {key && db.format(key).hint}
          </text>
          <text x={x + 5} y={bottom} fill={textColor} className={legendClass}>
            {key && db.format(key).main}
          </text>
        </g>
      );
    };

    const { classes } = this.props;

    return (
      <svg
        viewBox="0 0 833 335"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMin meet"
        className={classNames(classes.svg, this.props.className || "layer")}
      >
        <g transform="translate(80,0)">
          <g transform="rotate(10)">
            <Key row={0} col={0} />
            <Key row={0} col={1} />
            <Key row={0} col={2} />
            <Key row={0} col={3} />
            <Key row={0} col={4} />

            <Key row={1} col={0} />
            <Key row={1} col={1} />
            <Key row={1} col={2} />
            <Key row={1} col={3} />
            <Key row={1} col={4} />

            <Key row={2} col={0} />
            <Key row={2} col={1} />
            <Key row={2} col={2} />
            <Key row={2} col={3} />
            <Key row={2} col={4} />
            <Key row={2} col={5} />

            <Key row={3} col={0} />
            <Key row={3} col={1} />
            <Key row={3} col={2} />
            <Key row={3} col={3} />
            <Key row={3} col={4} />

            <Key row={3} col={5} />
          </g>

          <g transform="rotate(-10)">
            <g transform="translate(0, 116.75)">
              <Key row={0} col={7} />
              <Key row={0} col={8} />
              <Key row={0} col={9} />
              <Key row={0} col={10} />
              <Key row={0} col={11} />

              <Key row={1} col={7} />
              <Key row={1} col={8} />
              <Key row={1} col={9} />
              <Key row={1} col={10} />
              <Key row={1} col={11} />

              <Key row={2} col={6} />
              <Key row={2} col={7} />
              <Key row={2} col={8} />
              <Key row={2} col={9} />
              <Key row={2} col={10} />
              <Key row={2} col={11} />

              <Key row={3} col={6} />
              <Key row={3} col={7} />
              <Key row={3} col={8} />
              <Key row={3} col={9} />
              <Key row={3} col={10} />
              <Key row={3} col={11} />
            </g>
          </g>
        </g>
      </svg>
    );
  }
}

export default withStyles(styles, { withTheme: true })(Keymap);
