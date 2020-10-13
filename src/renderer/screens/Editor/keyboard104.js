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
import Paper from "@material-ui/core/Paper";
import { withStyles } from "@material-ui/core/styles";

import { NewKeymapDB } from "../../../api/keymap";

const db = new NewKeymapDB();

const styles = () => ({
  svg: {
    fontFamily: '"Source Code Pro", "monospace"',
    fontWeight: 700,
    fontSize: "12px"
  },
  root: {
    display: "block",
    position: "fixed",
    left: 0,
    right: 0,
    bottom: 0,
    height: 240,
    textAlign: "center"
  }
});

class KeymapBase extends React.Component {
  render() {
    const keymap = db.getStandardLayout();
    const { currentKeyCode, onKeySelect } = this.props;

    const keySpacingY = 48;
    const keySpacingX = 48;

    const rowOffset = [0, 20, 20, 20, 20, 20];
    const keyOffsetX = [
      [0, 48, 0, 0, 0, 24, 0, 0, 0, 24, 0, 0, 0, 24, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 24, 0, 0, 24, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 24, 0, 0, 24, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 192],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 72, 72],
      [0, 0, 0, 0, 0, 0, 0, 0, 24, 0, 0, 24]
    ];

    const keySizeX = [
      [],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1],
      [1.5, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1.5],
      [1.75, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2.25],
      [2.25, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2.75],
      [1.25, 1.25, 1.25, 6.25, 1.25, 1.25, 1.25, 1.25, 1, 1, 1, 2]
    ];
    let keySizeY = [[], [], [], [], []];
    keySizeY[2][20] = 2;
    keySizeY[4][16] = 2;

    let getKeySizeX = (row, col) => {
      if (keySizeX[row] && keySizeX[row][col]) {
        return keySizeX[row][col];
      } else {
        return 1;
      }
    };
    let getKeySizeY = (row, col) => {
      if (keySizeY[row] && keySizeY[row][col]) {
        return keySizeY[row][col];
      } else {
        return 1;
      }
    };

    let getKey = (row, col) => {
      if (keymap[row]) {
        return db.lookup(keymap[row][col]);
      } else {
        return { label: {} };
      }
    };

    let getX = (row, col) => {
      let offset = 0;

      if (col == 0) return 0;

      for (let i = 0; i < col; i++) {
        offset += getKeySizeX(row, i) * keySpacingX;
        if (keyOffsetX[row] && keyOffsetX[row][i]) {
          offset += keyOffsetX[row][i];
        }
      }
      if (keyOffsetX[row] && keyOffsetX[row][col]) {
        offset += keyOffsetX[row][col];
      }

      return offset;
    };

    let getY = row => {
      return keySpacingY * row + rowOffset[row];
    };

    let getKeyWidth = (row, col) => {
      const size = getKeySizeX(row, col);
      return 42 * size;
    };

    let getKeyHeight = (row, col) => {
      return 42 * getKeySizeY(row, col);
    };

    const Key = props => {
      const { row, col } = props;
      const x = getX(row, col),
        y = getY(row, col),
        key = getKey(row, col),
        active = key.code == currentKeyCode;
      const strokeColor = "#b3b3b3";
      const stroke = active ? "#f3b3b3" : strokeColor;
      const height = getKeyHeight(row, col);
      const width = getKeyWidth(row, col);
      const bottom = y + height - 5;
      let textColor = "#000000";
      const buttonColor = "#ffffff";
      const sizeX = getKeySizeX(row, col);

      const onClick = event => {
        return onKeySelect(event.currentTarget.getAttribute("data-key-code"));
      };

      return (
        <g onClick={onClick} className="key" data-key-code={key.code}>
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
            {key.label.shifted}
          </text>
          <text x={x + 5} y={bottom} fill={textColor}>
            {sizeX < 1.5 && key.label.short ? key.label.short : key.label.base}
          </text>
          <text x={width - 15} y={bottom} fill={textColor}>
            {key.label.altgr}
          </text>
        </g>
      );
    };

    const { classes } = this.props;

    return (
      <svg
        viewBox="0 0 1120 330"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMin meet"
        width="100%"
        height="100%"
        className={classNames(classes.svg, this.props.className)}
      >
        <g transform="translate(10, 10)">
          <g>
            <Key row={0} col={0} />

            <Key row={0} col={1} />
            <Key row={0} col={2} />
            <Key row={0} col={3} />
            <Key row={0} col={4} />

            <Key row={0} col={5} />
            <Key row={0} col={6} />
            <Key row={0} col={7} />
            <Key row={0} col={8} />

            <Key row={0} col={9} />
            <Key row={0} col={10} />
            <Key row={0} col={11} />
            <Key row={0} col={12} />

            <Key row={0} col={13} />
            <Key row={0} col={14} />
            <Key row={0} col={15} />
          </g>

          <g>
            <Key row={1} col={0} />
            <Key row={1} col={1} />
            <Key row={1} col={2} />
            <Key row={1} col={3} />
            <Key row={1} col={4} />
            <Key row={1} col={5} />
            <Key row={1} col={6} />
            <Key row={1} col={7} />
            <Key row={1} col={8} />
            <Key row={1} col={9} />
            <Key row={1} col={10} />
            <Key row={1} col={11} />
            <Key row={1} col={12} />
            <Key row={1} col={13} />

            <Key row={1} col={14} />
            <Key row={1} col={15} />
            <Key row={1} col={16} />

            <Key row={1} col={17} />
            <Key row={1} col={18} />
            <Key row={1} col={19} />
            <Key row={1} col={20} />
          </g>

          <g>
            <Key row={2} col={0} />
            <Key row={2} col={1} />
            <Key row={2} col={2} />
            <Key row={2} col={3} />
            <Key row={2} col={4} />
            <Key row={2} col={5} />
            <Key row={2} col={6} />
            <Key row={2} col={7} />
            <Key row={2} col={8} />
            <Key row={2} col={9} />
            <Key row={2} col={10} />
            <Key row={2} col={11} />
            <Key row={2} col={12} />
            <Key row={2} col={13} />

            <Key row={2} col={14} />
            <Key row={2} col={15} />
            <Key row={2} col={16} />

            <Key row={2} col={17} />
            <Key row={2} col={18} />
            <Key row={2} col={19} />
            <Key row={2} col={20} />
          </g>

          <g>
            <Key row={3} col={0} />
            <Key row={3} col={1} />
            <Key row={3} col={2} />
            <Key row={3} col={3} />
            <Key row={3} col={4} />
            <Key row={3} col={5} />
            <Key row={3} col={6} />
            <Key row={3} col={7} />
            <Key row={3} col={8} />
            <Key row={3} col={9} />
            <Key row={3} col={10} />
            <Key row={3} col={11} />
            <Key row={3} col={12} />

            <Key row={3} col={13} />
            <Key row={3} col={14} />
            <Key row={3} col={15} />
          </g>

          <g>
            <Key row={4} col={0} />
            <Key row={4} col={1} />
            <Key row={4} col={2} />
            <Key row={4} col={3} />
            <Key row={4} col={4} />
            <Key row={4} col={5} />
            <Key row={4} col={6} />
            <Key row={4} col={7} />
            <Key row={4} col={8} />
            <Key row={4} col={9} />
            <Key row={4} col={10} />
            <Key row={4} col={11} />

            <Key row={4} col={12} />

            <Key row={4} col={13} />
            <Key row={4} col={14} />
            <Key row={4} col={15} />
            <Key row={4} col={16} />
          </g>

          <g>
            <Key row={5} col={0} />
            <Key row={5} col={1} />
            <Key row={5} col={2} />

            <Key row={5} col={3} />

            <Key row={5} col={4} />
            <Key row={5} col={5} />
            <Key row={5} col={6} />
            <Key row={5} col={7} />

            <Key row={5} col={8} />
            <Key row={5} col={9} />
            <Key row={5} col={10} />

            <Key row={5} col={11} />
            <Key row={5} col={12} />
          </g>
        </g>
      </svg>
    );
  }
}

const Keymap = withStyles(styles, { withTheme: true })(KeymapBase);

class KeySelector extends React.Component {
  render() {
    const { classes } = this.props;

    return (
      <Paper className={classes.root}>
        <Keymap {...this.props} />
      </Paper>
    );
  }
}

export default withStyles(styles, { withTheme: true })(KeySelector);
