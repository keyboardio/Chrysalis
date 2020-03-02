// -*- mode: js-jsx -*-
/* chrysalis-hardware-keyboardio-atreus2 -- Chrysalis Atreus2 support
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
import Key from "./keymap/Key";

class Keymap extends React.Component {
  render() {
    const keymap =
      this.props.keymap ||
      Array(48)
        .fill()
        .map(() => 0);

    let getLabel = (row, col) => {
      let keyIndex = parseInt(row) * 12 + parseInt(col),
        keyCode = keymap[keyIndex];
      return keyCode;
    };
    let isActive = (row, col) => {
      let keyIndex = parseInt(row) * 12 + parseInt(col);
      return this.props.selectedKey == keyIndex;
    };

    return (
      <svg
        viewBox="0 0 833 335"
        xmlns="http://www.w3.org/2000/svg"
        className={this.props.className || "layer"}
      >
        <g transform="translate(45,0)">
          <g transform="rotate(10)">
            <Key
              x={1}
              y={33.4}
              row={0}
              col={0}
              layer={this.props.index}
              label={getLabel(0, 0)}
              active={isActive(0, 0)}
              onClick={this.props.onKeySelect}
            />
            <Key
              x={55}
              y={19.9}
              row={0}
              col={1}
              layer={this.props.index}
              label={getLabel(0, 1)}
              active={isActive(0, 1)}
              onClick={this.props.onKeySelect}
            />
            <Key
              x={109}
              y={1}
              row={0}
              col={2}
              layer={this.props.index}
              label={getLabel(0, 2)}
              active={isActive(0, 2)}
              onClick={this.props.onKeySelect}
            />
            <Key
              x={163}
              y={19.9}
              row={0}
              col={3}
              layer={this.props.index}
              label={getLabel(0, 3)}
              active={isActive(0, 3)}
              onClick={this.props.onKeySelect}
            />
            <Key
              x={217}
              y={33.4}
              row={0}
              col={4}
              layer={this.props.index}
              label={getLabel(0, 4)}
              active={isActive(0, 4)}
              onClick={this.props.onKeySelect}
            />

            <Key
              x={1}
              y={87.4}
              row={1}
              col={0}
              layer={this.props.index}
              label={getLabel(1, 0)}
              active={isActive(1, 0)}
              onClick={this.props.onKeySelect}
            />
            <Key
              x={55}
              y={73.9}
              row={1}
              col={1}
              layer={this.props.index}
              label={getLabel(1, 1)}
              active={isActive(1, 1)}
              onClick={this.props.onKeySelect}
            />
            <Key
              x={109}
              y={55}
              row={1}
              col={2}
              layer={this.props.index}
              label={getLabel(1, 2)}
              active={isActive(1, 2)}
              onClick={this.props.onKeySelect}
            />
            <Key
              x={163}
              y={73.9}
              row={1}
              col={3}
              layer={this.props.index}
              label={getLabel(1, 3)}
              active={isActive(1, 3)}
              onClick={this.props.onKeySelect}
            />
            <Key
              x={217}
              y={87.4}
              row={1}
              col={4}
              layer={this.props.index}
              label={getLabel(1, 4)}
              active={isActive(1, 4)}
              onClick={this.props.onKeySelect}
            />

            <Key
              x={1}
              y={141.4}
              row={2}
              col={0}
              layer={this.props.index}
              label={getLabel(2, 0)}
              active={isActive(2, 0)}
              onClick={this.props.onKeySelect}
            />
            <Key
              x={55}
              y={127.9}
              row={2}
              col={1}
              layer={this.props.index}
              label={getLabel(2, 1)}
              active={isActive(2, 1)}
              onClick={this.props.onKeySelect}
            />
            <Key
              x={109}
              y={109}
              row={2}
              col={2}
              layer={this.props.index}
              label={getLabel(2, 2)}
              active={isActive(2, 2)}
              onClick={this.props.onKeySelect}
            />
            <Key
              x={163}
              y={127.9}
              row={2}
              col={3}
              layer={this.props.index}
              label={getLabel(2, 3)}
              active={isActive(2, 3)}
              onClick={this.props.onKeySelect}
            />
            <Key
              x={217}
              y={141.4}
              row={2}
              col={4}
              layer={this.props.index}
              label={getLabel(2, 4)}
              active={isActive(2, 4)}
              onClick={this.props.onKeySelect}
            />

            <Key
              x={1}
              y={195.4}
              row={3}
              col={0}
              layer={this.props.index}
              label={getLabel(3, 0)}
              active={isActive(3, 0)}
              onClick={this.props.onKeySelect}
            />
            <Key
              x={55}
              y={181.9}
              row={3}
              col={1}
              layer={this.props.index}
              label={getLabel(3, 1)}
              active={isActive(3, 1)}
              onClick={this.props.onKeySelect}
            />
            <Key
              x={109}
              y={163}
              row={3}
              col={2}
              layer={this.props.index}
              label={getLabel(3, 2)}
              active={isActive(3, 2)}
              onClick={this.props.onKeySelect}
            />
            <Key
              x={163}
              y={181.9}
              row={3}
              col={3}
              layer={this.props.index}
              label={getLabel(3, 3)}
              active={isActive(3, 3)}
              onClick={this.props.onKeySelect}
            />
            <Key
              x={217}
              y={195.4}
              row={3}
              col={4}
              layer={this.props.index}
              label={getLabel(3, 4)}
              active={isActive(3, 4)}
              onClick={this.props.onKeySelect}
            />

            <Key
              x={271}
              y={127.9}
              row={2}
              col={5}
              layer={this.props.index}
              label={getLabel(2, 5)}
              active={isActive(2, 5)}
              onClick={this.props.onKeySelect}
            />
            <Key
              x={271}
              y={181.9}
              row={3}
              col={5}
              layer={this.props.index}
              label={getLabel(3, 5)}
              active={isActive(3, 5)}
              onClick={this.props.onKeySelect}
            />
          </g>

          <g transform="rotate(-10)">
            <g transform="translate(0, 114)">
              <Key
                x={392.5}
                y={33.4}
                row={0}
                col={7}
                layer={this.props.index}
                label={getLabel(0, 7)}
                active={isActive(0, 7)}
                onClick={this.props.onKeySelect}
              />
              <Key
                x={446.5}
                y={19.9}
                row={0}
                col={8}
                layer={this.props.index}
                label={getLabel(0, 8)}
                active={isActive(0, 8)}
                onClick={this.props.onKeySelect}
              />
              <Key
                x={500.5}
                y={1}
                row={0}
                col={9}
                layer={this.props.index}
                label={getLabel(0, 9)}
                active={isActive(0, 9)}
                onClick={this.props.onKeySelect}
              />
              <Key
                x={554.5}
                y={19.9}
                row={0}
                col={10}
                layer={this.props.index}
                label={getLabel(0, 10)}
                active={isActive(0, 10)}
                onClick={this.props.onKeySelect}
              />
              <Key
                x={608.5}
                y={33.4}
                row={0}
                col={11}
                layer={this.props.index}
                label={getLabel(0, 11)}
                active={isActive(0, 11)}
                onClick={this.props.onKeySelect}
              />

              <Key
                x={392.5}
                y={87.4}
                row={1}
                col={7}
                layer={this.props.index}
                label={getLabel(1, 7)}
                active={isActive(1, 7)}
                onClick={this.props.onKeySelect}
              />
              <Key
                x={446.5}
                y={73.9}
                row={1}
                col={8}
                layer={this.props.index}
                label={getLabel(1, 8)}
                active={isActive(1, 8)}
                onClick={this.props.onKeySelect}
              />
              <Key
                x={500.5}
                y={55}
                row={1}
                col={9}
                layer={this.props.index}
                label={getLabel(1, 9)}
                active={isActive(1, 9)}
                onClick={this.props.onKeySelect}
              />
              <Key
                x={554.5}
                y={73.9}
                row={1}
                col={10}
                layer={this.props.index}
                label={getLabel(1, 10)}
                active={isActive(1, 10)}
                onClick={this.props.onKeySelect}
              />
              <Key
                x={608.5}
                y={87.4}
                row={1}
                col={11}
                layer={this.props.index}
                label={getLabel(1, 11)}
                active={isActive(1, 11)}
                onClick={this.props.onKeySelect}
              />

              <Key
                x={392.5}
                y={141.4}
                row={2}
                col={7}
                layer={this.props.index}
                label={getLabel(2, 7)}
                active={isActive(2, 7)}
                onClick={this.props.onKeySelect}
              />
              <Key
                x={446.5}
                y={127.9}
                row={2}
                col={8}
                layer={this.props.index}
                label={getLabel(2, 8)}
                active={isActive(2, 8)}
                onClick={this.props.onKeySelect}
              />
              <Key
                x={500.5}
                y={109}
                row={2}
                col={9}
                layer={this.props.index}
                label={getLabel(2, 9)}
                active={isActive(2, 9)}
                onClick={this.props.onKeySelect}
              />
              <Key
                x={554.5}
                y={127.9}
                row={2}
                col={10}
                layer={this.props.index}
                label={getLabel(2, 10)}
                active={isActive(2, 10)}
                onClick={this.props.onKeySelect}
              />
              <Key
                x={608.5}
                y={141.4}
                row={2}
                col={11}
                layer={this.props.index}
                label={getLabel(2, 11)}
                active={isActive(2, 11)}
                onClick={this.props.onKeySelect}
              />

              <Key
                x={392.5}
                y={195.4}
                row={3}
                col={7}
                layer={this.props.index}
                label={getLabel(3, 7)}
                active={isActive(3, 7)}
                onClick={this.props.onKeySelect}
              />
              <Key
                x={446.5}
                y={181.9}
                row={3}
                col={8}
                layer={this.props.index}
                label={getLabel(3, 8)}
                active={isActive(3, 8)}
                onClick={this.props.onKeySelect}
              />
              <Key
                x={500.5}
                y={163}
                row={3}
                col={9}
                layer={this.props.index}
                label={getLabel(3, 9)}
                active={isActive(3, 9)}
                onClick={this.props.onKeySelect}
              />
              <Key
                x={554.5}
                y={181.9}
                row={3}
                col={10}
                layer={this.props.index}
                label={getLabel(3, 10)}
                active={isActive(3, 10)}
                onClick={this.props.onKeySelect}
              />
              <Key
                x={608.5}
                y={195.4}
                row={3}
                col={11}
                layer={this.props.index}
                label={getLabel(3, 11)}
                active={isActive(3, 11)}
                onClick={this.props.onKeySelect}
              />

              <Key
                x={338.5}
                y={127.9}
                row={2}
                col={6}
                layer={this.props.index}
                label={getLabel(2, 6)}
                active={isActive(2, 6)}
                onClick={this.props.onKeySelect}
              />
              <Key
                x={338.5}
                y={181.9}
                row={3}
                col={6}
                layer={this.props.index}
                label={getLabel(3, 6)}
                active={isActive(3, 6)}
                onClick={this.props.onKeySelect}
              />
            </g>
          </g>
        </g>
      </svg>
    );
  }
}

export default Keymap;
