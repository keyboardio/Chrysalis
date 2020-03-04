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

const styles = () => ({
  svg: {
    background: `url(${Atreus})`,
    backgroundSize: "100%",
    backgroundRepeat: "no-repeat"
  }
});

class Key extends React.Component {
  render() {
    const { x, y, label, row, col, layer, onClick } = this.props;
    const keyIndex = parseInt(row) * 12 + parseInt(col);
    const strokeColor = "transparent" || "#b3b3b3";
    const stroke = this.props.active ? "#f3b3b3" : strokeColor;
    const height = this.props.height || 42;
    const width = this.props.width || 42;
    const bottom = y + height - 5;
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
          rx={2}
          width={width}
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

    let getLabel = (row, col) => {
      let keyIndex = parseInt(row) * 12 + parseInt(col),
        keyCode = keymap[keyIndex];
      return keyCode;
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

    const { classes } = this.props;

    return (
      <svg
        viewBox="0 0 833 335"
        xmlns="http://www.w3.org/2000/svg"
        className={classNames(classes.svg, this.props.className || "layer")}
      >
        <g transform="translate(80,0)">
          <g transform="rotate(10)">
            <Key
              row={0}
              col={0}
              x={getX(0, 0)}
              y={getY(0, 0)}
              layer={this.props.index}
              label={getLabel(0, 0)}
              active={isActive(0, 0)}
              onClick={this.props.onKeySelect}
            />
            <Key
              row={0}
              col={1}
              x={getX(0, 1)}
              y={getY(0, 1)}
              layer={this.props.index}
              label={getLabel(0, 1)}
              active={isActive(0, 1)}
              onClick={this.props.onKeySelect}
            />
            <Key
              row={0}
              col={2}
              x={getX(0, 2)}
              y={getY(0, 2)}
              layer={this.props.index}
              label={getLabel(0, 2)}
              active={isActive(0, 2)}
              onClick={this.props.onKeySelect}
            />
            <Key
              row={0}
              col={3}
              x={getX(0, 3)}
              y={getY(0, 3)}
              layer={this.props.index}
              label={getLabel(0, 3)}
              active={isActive(0, 3)}
              onClick={this.props.onKeySelect}
            />
            <Key
              row={0}
              col={4}
              x={getX(0, 4)}
              y={getY(0, 4)}
              layer={this.props.index}
              label={getLabel(0, 4)}
              active={isActive(0, 4)}
              onClick={this.props.onKeySelect}
            />

            <Key
              row={1}
              col={0}
              x={getX(1, 0)}
              y={getY(1, 0)}
              layer={this.props.index}
              label={getLabel(1, 0)}
              active={isActive(1, 0)}
              onClick={this.props.onKeySelect}
            />
            <Key
              row={1}
              col={1}
              x={getX(1, 1)}
              y={getY(1, 1)}
              layer={this.props.index}
              label={getLabel(1, 1)}
              active={isActive(1, 1)}
              onClick={this.props.onKeySelect}
            />
            <Key
              row={1}
              col={2}
              x={getX(1, 2)}
              y={getY(1, 2)}
              layer={this.props.index}
              label={getLabel(1, 2)}
              active={isActive(1, 2)}
              onClick={this.props.onKeySelect}
            />
            <Key
              row={1}
              col={3}
              x={getX(1, 3)}
              y={getY(1, 3)}
              layer={this.props.index}
              label={getLabel(1, 3)}
              active={isActive(1, 3)}
              onClick={this.props.onKeySelect}
            />
            <Key
              row={1}
              col={4}
              x={getX(1, 4)}
              y={getY(1, 4)}
              layer={this.props.index}
              label={getLabel(1, 4)}
              active={isActive(1, 4)}
              onClick={this.props.onKeySelect}
            />

            <Key
              row={2}
              col={0}
              x={getX(2, 0)}
              y={getY(2, 0)}
              layer={this.props.index}
              label={getLabel(2, 0)}
              active={isActive(2, 0)}
              onClick={this.props.onKeySelect}
            />
            <Key
              row={2}
              col={1}
              x={getX(2, 1)}
              y={getY(2, 1)}
              layer={this.props.index}
              label={getLabel(2, 1)}
              active={isActive(2, 1)}
              onClick={this.props.onKeySelect}
            />
            <Key
              row={2}
              col={2}
              x={getX(2, 2)}
              y={getY(2, 2)}
              layer={this.props.index}
              label={getLabel(2, 2)}
              active={isActive(2, 2)}
              onClick={this.props.onKeySelect}
            />
            <Key
              row={2}
              col={3}
              x={getX(2, 3)}
              y={getY(2, 3)}
              layer={this.props.index}
              label={getLabel(2, 3)}
              active={isActive(2, 3)}
              onClick={this.props.onKeySelect}
            />
            <Key
              row={2}
              col={4}
              x={getX(2, 4)}
              y={getY(2, 4)}
              layer={this.props.index}
              label={getLabel(2, 4)}
              active={isActive(2, 4)}
              onClick={this.props.onKeySelect}
            />
            <Key
              row={2}
              col={5}
              x={getX(2, 5)}
              y={getY(2, 5)}
              layer={this.props.index}
              label={getLabel(2, 5)}
              active={isActive(2, 5)}
              onClick={this.props.onKeySelect}
            />

            <Key
              row={3}
              col={0}
              x={getX(3, 0)}
              y={getY(3, 0)}
              layer={this.props.index}
              label={getLabel(3, 0)}
              active={isActive(3, 0)}
              onClick={this.props.onKeySelect}
            />
            <Key
              row={3}
              col={1}
              x={getX(3, 1)}
              y={getY(3, 1)}
              layer={this.props.index}
              label={getLabel(3, 1)}
              active={isActive(3, 1)}
              onClick={this.props.onKeySelect}
            />
            <Key
              row={3}
              col={2}
              x={getX(3, 2)}
              y={getY(3, 2)}
              layer={this.props.index}
              label={getLabel(3, 2)}
              active={isActive(3, 2)}
              onClick={this.props.onKeySelect}
            />
            <Key
              row={3}
              col={3}
              x={getX(3, 3)}
              y={getY(3, 3)}
              layer={this.props.index}
              label={getLabel(3, 3)}
              active={isActive(3, 3)}
              onClick={this.props.onKeySelect}
            />
            <Key
              row={3}
              col={4}
              x={getX(3, 4)}
              y={getY(3, 4)}
              layer={this.props.index}
              label={getLabel(3, 4)}
              active={isActive(3, 4)}
              onClick={this.props.onKeySelect}
            />

            <Key
              row={3}
              col={5}
              x={getX(3, 5)}
              y={getY(3, 5)}
              layer={this.props.index}
              label={getLabel(3, 5)}
              active={isActive(3, 5)}
              onClick={this.props.onKeySelect}
            />
          </g>

          <g transform="rotate(-10)">
            <g transform="translate(0, 116.75)">
              <Key
                row={0}
                col={7}
                x={getX(0, 7)}
                y={getY(0, 7)}
                layer={this.props.index}
                label={getLabel(0, 7)}
                active={isActive(0, 7)}
                onClick={this.props.onKeySelect}
              />
              <Key
                row={0}
                col={8}
                x={getX(0, 8)}
                y={getY(0, 8)}
                layer={this.props.index}
                label={getLabel(0, 8)}
                active={isActive(0, 8)}
                onClick={this.props.onKeySelect}
              />
              <Key
                row={0}
                col={9}
                x={getX(0, 9)}
                y={getY(0, 9)}
                layer={this.props.index}
                label={getLabel(0, 9)}
                active={isActive(0, 9)}
                onClick={this.props.onKeySelect}
              />
              <Key
                row={0}
                col={10}
                x={getX(0, 10)}
                y={getY(0, 10)}
                layer={this.props.index}
                label={getLabel(0, 10)}
                active={isActive(0, 10)}
                onClick={this.props.onKeySelect}
              />
              <Key
                row={0}
                col={11}
                x={getX(0, 11)}
                y={getY(0, 11)}
                layer={this.props.index}
                label={getLabel(0, 11)}
                active={isActive(0, 11)}
                onClick={this.props.onKeySelect}
              />

              <Key
                row={1}
                col={7}
                x={getX(1, 7)}
                y={getY(1, 7)}
                layer={this.props.index}
                label={getLabel(1, 7)}
                active={isActive(1, 7)}
                onClick={this.props.onKeySelect}
              />
              <Key
                row={1}
                col={8}
                x={getX(1, 8)}
                y={getY(1, 8)}
                layer={this.props.index}
                label={getLabel(1, 8)}
                active={isActive(1, 8)}
                onClick={this.props.onKeySelect}
              />
              <Key
                row={1}
                col={9}
                x={getX(1, 9)}
                y={getY(1, 9)}
                layer={this.props.index}
                label={getLabel(1, 9)}
                active={isActive(1, 9)}
                onClick={this.props.onKeySelect}
              />
              <Key
                row={1}
                col={10}
                x={getX(1, 10)}
                y={getY(1, 10)}
                layer={this.props.index}
                label={getLabel(1, 10)}
                active={isActive(1, 10)}
                onClick={this.props.onKeySelect}
              />
              <Key
                row={1}
                col={11}
                x={getX(1, 11)}
                y={getY(1, 11)}
                layer={this.props.index}
                label={getLabel(1, 11)}
                active={isActive(1, 11)}
                onClick={this.props.onKeySelect}
              />
              <Key
                row={2}
                col={6}
                x={getX(2, 6)}
                y={getY(2, 6)}
                layer={this.props.index}
                label={getLabel(2, 6)}
                active={isActive(2, 6)}
                onClick={this.props.onKeySelect}
              />
              <Key
                row={2}
                col={7}
                x={getX(2, 7)}
                y={getY(2, 7)}
                layer={this.props.index}
                label={getLabel(2, 7)}
                active={isActive(2, 7)}
                onClick={this.props.onKeySelect}
              />
              <Key
                row={2}
                col={8}
                x={getX(2, 8)}
                y={getY(2, 8)}
                layer={this.props.index}
                label={getLabel(2, 8)}
                active={isActive(2, 8)}
                onClick={this.props.onKeySelect}
              />
              <Key
                row={2}
                col={9}
                x={getX(2, 9)}
                y={getY(2, 9)}
                layer={this.props.index}
                label={getLabel(2, 9)}
                active={isActive(2, 9)}
                onClick={this.props.onKeySelect}
              />
              <Key
                row={2}
                col={10}
                x={getX(2, 10)}
                y={getY(2, 10)}
                layer={this.props.index}
                label={getLabel(2, 10)}
                active={isActive(2, 10)}
                onClick={this.props.onKeySelect}
              />
              <Key
                row={2}
                col={11}
                x={getX(2, 11)}
                y={getY(2, 11)}
                layer={this.props.index}
                label={getLabel(2, 11)}
                active={isActive(2, 11)}
                onClick={this.props.onKeySelect}
              />
              <Key
                row={3}
                col={6}
                x={getX(3, 6)}
                y={getY(3, 6)}
                layer={this.props.index}
                label={getLabel(3, 6)}
                active={isActive(3, 6)}
                onClick={this.props.onKeySelect}
              />
              <Key
                row={3}
                col={7}
                x={getX(3, 7)}
                y={getY(3, 7)}
                layer={this.props.index}
                label={getLabel(3, 7)}
                active={isActive(3, 7)}
                onClick={this.props.onKeySelect}
              />
              <Key
                row={3}
                col={8}
                x={getX(3, 8)}
                y={getY(3, 8)}
                layer={this.props.index}
                label={getLabel(3, 8)}
                active={isActive(3, 8)}
                onClick={this.props.onKeySelect}
              />
              <Key
                row={3}
                col={9}
                x={getX(3, 9)}
                y={getY(3, 9)}
                layer={this.props.index}
                label={getLabel(3, 9)}
                active={isActive(3, 9)}
                onClick={this.props.onKeySelect}
              />
              <Key
                row={3}
                col={10}
                x={getX(3, 10)}
                y={getY(3, 10)}
                layer={this.props.index}
                label={getLabel(3, 10)}
                active={isActive(3, 10)}
                onClick={this.props.onKeySelect}
              />
              <Key
                row={3}
                col={11}
                x={getX(3, 11)}
                y={getY(3, 11)}
                layer={this.props.index}
                label={getLabel(3, 11)}
                active={isActive(3, 11)}
                onClick={this.props.onKeySelect}
              />
            </g>
          </g>
        </g>
      </svg>
    );
  }
}

//export default withSnackbar(withStyles(styles, { withTheme: true })(Editor));
//export default Keymap;
export default withStyles(styles, { withTheme: true })(Keymap);
