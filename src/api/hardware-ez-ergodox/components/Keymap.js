// -*- mode: js-jsx -*-
/* chrysalis-hardware-ez-ergodox -- Chrysalis ErgoDox support
 * Copyright (C) 2019  Keyboardio, Inc.
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

class Keymap extends React.Component {
  render() {
    const keymap =
      this.props.keymap ||
      Array(84)
        .fill()
        .map(() => 0);

    let keyIndex = (row, col) => {
      return row * 6 + col;
    };

    let Key = props => {
      const { x, y, row, col, transform } = props;
      const width = props.width || 1,
        height = props.height || 1,
        bottom = y + height * 40 - 4;

      const labels = keymap[keyIndex(row, col)],
        stroke =
          this.props.selectedKey == keyIndex(row, col) ? "#f3b3b3" : "#b3b3b3";

      return (
        <g
          transform={transform}
          onClick={this.props.onKeySelect}
          data-layer={this.props.index}
          data-key-index={keyIndex(row, col)}
          className="key"
        >
          <rect
            x={x}
            y={y}
            rx={3}
            width={width * 40 + 8}
            height={height * 40 + 8}
            stroke={stroke}
            strokeWidth="1.55"
            fill="#ffffff"
          />
          <text x={x + 3} y={y + 14}>
            {labels.extraLabel}
          </text>
          <text x={x + 3} y={bottom}>
            {width > 1 ? labels.verbose || labels.label : labels.label}
          </text>
        </g>
      );
    };

    return (
      <svg
        viewBox="0 0 1083 434.03074360871943"
        xmlns="http://www.w3.org/2000/svg"
        className={this.props.className || "layer"}
      >
        <g transform="translate(10,10)">
          <g transform="translate(5,5)">
            <Key x={190} y={1} row={3} col={0} />
            <Key x={811} y={1} row={10} col={0} />
            <Key x={136} y={7.75} row={2} col={0} />
            <Key x={244} y={7.75} row={4} col={0} />
            <Key x={757} y={7.75} row={9} col={0} />
            <Key x={865} y={7.75} row={11} col={0} />
            <Key x={298} y={14.5} row={5} col={0} />
            <Key x={352} y={14.5} row={6} col={0} />
            <Key x={649} y={14.5} row={7} col={0} />
            <Key x={703} y={14.5} row={8} col={0} />
            <Key x={1} y={21.25} row={0} col={0} width={1.675} />
            <Key x={82} y={21.25} row={1} col={0} />
            <Key x={919} y={21.25} row={12} col={0} />
            <Key x={973} y={21.25} row={13} col={0} width={1.675} />

            <Key x={190} y={55} row={3} col={1} />
            <Key x={811} y={55} row={10} col={1} />
            <Key x={136} y={61.75} row={2} col={1} />
            <Key x={244} y={61.75} row={4} col={1} />
            <Key x={757} y={61.75} row={9} col={1} />
            <Key x={865} y={61.75} row={11} col={1} />
            <Key x={298} y={68.5} row={5} col={1} />
            <Key x={352} y={68.5} row={6} col={1} height={1.675} />
            <Key x={649} y={68.5} row={7} col={1} height={1.675} />
            <Key x={703} y={68.5} row={8} col={1} />
            <Key x={1} y={75.25} row={0} col={1} width={1.675} />
            <Key x={82} y={75.25} row={1} col={1} />
            <Key x={919} y={75.25} row={12} col={1} />
            <Key x={973} y={75.25} row={13} col={1} width={1.675} />

            <Key x={190} y={109} row={3} col={2} />
            <Key x={811} y={109} row={10} col={2} />
            <Key x={136} y={115.75} row={2} col={2} />
            <Key x={244} y={115.75} row={4} col={2} />
            <Key x={757} y={115.75} row={9} col={2} />
            <Key x={865} y={115.75} row={11} col={2} />
            <Key x={298} y={122.5} row={5} col={2} />
            <Key x={703} y={122.5} row={8} col={2} />
            <Key x={1} y={129.25} row={0} col={2} width={1.675} />
            <Key x={82} y={129.25} row={1} col={2} />
            <Key x={919} y={129.25} row={12} col={2} />
            <Key x={973} y={129.25} row={13} col={2} width={1.675} />
            <Key x={352} y={149.5} row={6} col={3} height={1.675} />
            <Key x={649} y={149.5} row={7} col={3} height={1.675} />

            <Key x={190} y={163} row={3} col={3} />
            <Key x={811} y={163} row={10} col={3} />
            <Key x={136} y={169.75} row={2} col={3} />
            <Key x={244} y={169.75} row={4} col={3} />
            <Key x={757} y={169.75} row={9} col={3} />
            <Key x={865} y={169.75} row={11} col={3} />
            <Key x={298} y={176.5} row={5} col={3} />
            <Key x={703} y={176.5} row={8} col={3} />
            <Key x={1} y={183.25} row={0} col={3} width={1.675} />
            <Key x={82} y={183.25} row={1} col={3} />
            <Key x={919} y={183.25} row={12} col={3} />
            <Key x={973} y={183.25} row={13} col={3} width={1.675} />

            <Key x={190} y={217} row={3} col={4} />
            <Key x={811} y={217} row={10} col={4} />
            <Key x={136} y={223.75} row={2} col={4} />
            <Key x={244} y={223.75} row={4} col={4} />
            <Key x={757} y={223.75} row={9} col={4} />
            <Key x={865} y={223.75} row={11} col={4} />
            <Key x={28} y={237.25} row={0} col={4} />
            <Key x={82} y={237.25} row={1} col={4} />
            <Key x={919} y={237.25} row={12} col={4} />
            <Key x={973} y={237.25} row={13} col={4} />

            <Key
              x={406}
              y={176.5}
              row={5}
              col={5}
              transform="rotate(30 351 229.5)"
            />
            <Key
              x={460}
              y={176.5}
              row={6}
              col={5}
              transform="rotate(30 351 229.5)"
            />
            <Key
              x={352}
              y={230.5}
              row={3}
              col={5}
              transform="rotate(30 351 229.5)"
              height={2.35}
            />
            <Key
              x={406}
              y={230.5}
              row={2}
              col={5}
              transform="rotate(30 351 229.5)"
              height={2.35}
            />
            <Key
              x={460}
              y={230.5}
              row={4}
              col={5}
              transform="rotate(30 351 229.5)"
            />
            <Key
              x={460}
              y={284.5}
              row={1}
              col={5}
              transform="rotate(30 351 229.5)"
            />

            <Key
              x={541}
              y={176.5}
              row={7}
              col={5}
              transform="rotate(-30 702 229.5)"
            />
            <Key
              x={595}
              y={176.5}
              row={8}
              col={5}
              transform="rotate(-30 702 229.5)"
            />
            <Key
              x={541}
              y={230.5}
              row={9}
              col={5}
              transform="rotate(-30 702 229.5)"
            />
            <Key
              x={595}
              y={230.5}
              row={11}
              col={5}
              transform="rotate(-30 702 229.5)"
              height={2.35}
            />
            <Key
              x={649}
              y={230.5}
              row={10}
              col={5}
              transform="rotate(-30 702 229.5)"
              height={2.35}
            />
            <Key
              x={541}
              y={284.5}
              row={12}
              col={5}
              transform="rotate(-30 702 229.5)"
            />
          </g>
        </g>
      </svg>
    );
  }
}

export default Keymap;
