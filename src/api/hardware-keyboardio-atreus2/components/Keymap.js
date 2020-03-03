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
              x={60}
              y={19.9}
              row={0}
              col={1}
              layer={this.props.index}
              label={getLabel(0, 1)}
              active={isActive(0, 1)}
              onClick={this.props.onKeySelect}
            />
            <Key
              x={125}
              y={6}
              row={0}
              col={2}
              layer={this.props.index}
              label={getLabel(0, 2)}
              active={isActive(0, 2)}
              onClick={this.props.onKeySelect}
            />
            <Key
              x={188}
              y={24.9}
              row={0}
              col={3}
              layer={this.props.index}
              label={getLabel(0, 3)}
              active={isActive(0, 3)}
              onClick={this.props.onKeySelect}
            />
            <Key
              x={252}
              y={38.4}
              row={0}
              col={4}
              layer={this.props.index}
              label={getLabel(0, 4)}
              active={isActive(0, 4)}
              onClick={this.props.onKeySelect}
            />

            <Key
              x={1}
              y={95.4}
              row={1}
              col={0}
              layer={this.props.index}
              label={getLabel(1, 0)}
              active={isActive(1, 0)}
              onClick={this.props.onKeySelect}
            />
            <Key
              x={60}
              y={83.9}
              row={1}
              col={1}
              layer={this.props.index}
              label={getLabel(1, 1)}
              active={isActive(1, 1)}
              onClick={this.props.onKeySelect}
            />
            <Key
              x={124}
              y={71}
              row={1}
              col={2}
              layer={this.props.index}
              label={getLabel(1, 2)}
              active={isActive(1, 2)}
              onClick={this.props.onKeySelect}
            />
            <Key
              x={188}
              y={88.9}
              row={1}
              col={3}
              layer={this.props.index}
              label={getLabel(1, 3)}
              active={isActive(1, 3)}
              onClick={this.props.onKeySelect}
            />
            <Key
              x={250}
              y={107.4}
              row={1}
              col={4}
              layer={this.props.index}
              label={getLabel(1, 4)}
              active={isActive(1, 4)}
              onClick={this.props.onKeySelect}
            />

            <Key
              x={1}
              y={157.4}
              row={2}
              col={0}
              layer={this.props.index}
              label={getLabel(2, 0)}
              active={isActive(2, 0)}
              onClick={this.props.onKeySelect}
            />
            <Key
              x={60}
              y={147.9}
              row={2}
              col={1}
              layer={this.props.index}
              label={getLabel(2, 1)}
              active={isActive(2, 1)}
              onClick={this.props.onKeySelect}
            />
            <Key
              x={129}
              y={129}
              row={2}
              col={2}
              layer={this.props.index}
              label={getLabel(2, 2)}
              active={isActive(2, 2)}
              onClick={this.props.onKeySelect}
            />
            <Key
              x={188}
              y={152.9}
              row={2}
              col={3}
              layer={this.props.index}
              label={getLabel(2, 3)}
              active={isActive(2, 3)}
              onClick={this.props.onKeySelect}
            />
            <Key
              x={252}
              y={166.4}
              row={2}
              col={4}
              layer={this.props.index}
              label={getLabel(2, 4)}
              active={isActive(2, 4)}
              onClick={this.props.onKeySelect}
            />

            <Key
              x={1}
              y={219.4}
              row={3}
              col={0}
              layer={this.props.index}
              label={getLabel(3, 0)}
              active={isActive(3, 0)}
              onClick={this.props.onKeySelect}
            />
            <Key
              x={60}
              y={211.9}
              row={3}
              col={1}
              layer={this.props.index}
              label={getLabel(3, 1)}
              active={isActive(3, 1)}
              onClick={this.props.onKeySelect}
            />
            <Key
              x={129}
              y={193}
              row={3}
              col={2}
              layer={this.props.index}
              label={getLabel(3, 2)}
              active={isActive(3, 2)}
              onClick={this.props.onKeySelect}
            />
            <Key
              x={190}
              y={211.9}
              row={3}
              col={3}
              layer={this.props.index}
              label={getLabel(3, 3)}
              active={isActive(3, 3)}
              onClick={this.props.onKeySelect}
            />
            <Key
              x={252}
              y={230.4}
              row={3}
              col={4}
              layer={this.props.index}
              label={getLabel(3, 4)}
              active={isActive(3, 4)}
              onClick={this.props.onKeySelect}
            />

            <Key
              x={311}
              y={157.9}
              row={2}
              col={5}
              layer={this.props.index}
              label={getLabel(2, 5)}
              active={isActive(2, 5)}
              onClick={this.props.onKeySelect}
            />
            <Key
              x={311}
              y={221.9}
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
                x={368.5}
                y={43.4}
                row={0}
                col={7}
                layer={this.props.index}
                label={getLabel(0, 7)}
                active={isActive(0, 7)}
                onClick={this.props.onKeySelect}
              />
              <Key
                x={430.5}
                y={24.9}
                row={0}
                col={8}
                layer={this.props.index}
                label={getLabel(0, 8)}
                active={isActive(0, 8)}
                onClick={this.props.onKeySelect}
              />
              <Key
                x={492.5}
                y={6}
                row={0}
                col={9}
                layer={this.props.index}
                label={getLabel(0, 9)}
                active={isActive(0, 9)}
                onClick={this.props.onKeySelect}
              />
              <Key
                x={554.5}
                y={22.9}
                row={0}
                col={10}
                layer={this.props.index}
                label={getLabel(0, 10)}
                active={isActive(0, 10)}
                onClick={this.props.onKeySelect}
              />
              <Key
                x={618.5}
                y={33.4}
                row={0}
                col={11}
                layer={this.props.index}
                label={getLabel(0, 11)}
                active={isActive(0, 11)}
                onClick={this.props.onKeySelect}
              />

              <Key
                x={368.5}
                y={107.4}
                row={1}
                col={7}
                layer={this.props.index}
                label={getLabel(1, 7)}
                active={isActive(1, 7)}
                onClick={this.props.onKeySelect}
              />
              <Key
                x={430.5}
                y={90.9}
                row={1}
                col={8}
                layer={this.props.index}
                label={getLabel(1, 8)}
                active={isActive(1, 8)}
                onClick={this.props.onKeySelect}
              />
              <Key
                x={492.5}
                y={70}
                row={1}
                col={9}
                layer={this.props.index}
                label={getLabel(1, 9)}
                active={isActive(1, 9)}
                onClick={this.props.onKeySelect}
              />
              <Key
                x={554.5}
                y={84.9}
                row={1}
                col={10}
                layer={this.props.index}
                label={getLabel(1, 10)}
                active={isActive(1, 10)}
                onClick={this.props.onKeySelect}
              />
              <Key
                x={618.5}
                y={97.4}
                row={1}
                col={11}
                layer={this.props.index}
                label={getLabel(1, 11)}
                active={isActive(1, 11)}
                onClick={this.props.onKeySelect}
              />

              <Key
                x={368.5}
                y={171.4}
                row={2}
                col={7}
                layer={this.props.index}
                label={getLabel(2, 7)}
                active={isActive(2, 7)}
                onClick={this.props.onKeySelect}
              />
              <Key
                x={430.5}
                y={150.9}
                row={2}
                col={8}
                layer={this.props.index}
                label={getLabel(2, 8)}
                active={isActive(2, 8)}
                onClick={this.props.onKeySelect}
              />
              <Key
                x={492.5}
                y={134}
                row={2}
                col={9}
                layer={this.props.index}
                label={getLabel(2, 9)}
                active={isActive(2, 9)}
                onClick={this.props.onKeySelect}
              />
              <Key
                x={554.5}
                y={152.9}
                row={2}
                col={10}
                layer={this.props.index}
                label={getLabel(2, 10)}
                active={isActive(2, 10)}
                onClick={this.props.onKeySelect}
              />
              <Key
                x={618.5}
                y={161.4}
                row={2}
                col={11}
                layer={this.props.index}
                label={getLabel(2, 11)}
                active={isActive(2, 11)}
                onClick={this.props.onKeySelect}
              />

              <Key
                x={368.5}
                y={232.4}
                row={3}
                col={7}
                layer={this.props.index}
                label={getLabel(3, 7)}
                active={isActive(3, 7)}
                onClick={this.props.onKeySelect}
              />
              <Key
                x={430.5}
                y={216.9}
                row={3}
                col={8}
                layer={this.props.index}
                label={getLabel(3, 8)}
                active={isActive(3, 8)}
                onClick={this.props.onKeySelect}
              />
              <Key
                x={492.5}
                y={193}
                row={3}
                col={9}
                layer={this.props.index}
                label={getLabel(3, 9)}
                active={isActive(3, 9)}
                onClick={this.props.onKeySelect}
              />
              <Key
                x={554.5}
                y={211.9}
                row={3}
                col={10}
                layer={this.props.index}
                label={getLabel(3, 10)}
                active={isActive(3, 10)}
                onClick={this.props.onKeySelect}
              />
              <Key
                x={618.5}
                y={225.4}
                row={3}
                col={11}
                layer={this.props.index}
                label={getLabel(3, 11)}
                active={isActive(3, 11)}
                onClick={this.props.onKeySelect}
              />

              <Key
                x={305.5}
                y={157.9}
                row={2}
                col={6}
                layer={this.props.index}
                label={getLabel(2, 6)}
                active={isActive(2, 6)}
                onClick={this.props.onKeySelect}
              />
              <Key
                x={305.5}
                y={221.9}
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

//export default withSnackbar(withStyles(styles, { withTheme: true })(Editor));
//export default Keymap;
export default withStyles(styles, { withTheme: true })(Keymap);
