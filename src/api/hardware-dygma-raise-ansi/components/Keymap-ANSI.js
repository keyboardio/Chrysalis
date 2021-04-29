// -*- mode: js-jsx -*-
/* bazecor-hardware-dygma-raise -- Bazecor support for Dygma Raise
 * Copyright (C) 2019  DygmaLab SE
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

const XX = 255;
const LEDS_LEFT_KEYS = 33;
const UNDERGLOW = 69;
const led_map = [
  // LHS                            RHS
  [
    0,
    1,
    2,
    3,
    4,
    5,
    6,
    XX,
    XX,
    6 + LEDS_LEFT_KEYS,
    5 + LEDS_LEFT_KEYS,
    4 + LEDS_LEFT_KEYS,
    3 + LEDS_LEFT_KEYS,
    2 + LEDS_LEFT_KEYS,
    1 + LEDS_LEFT_KEYS,
    0 + LEDS_LEFT_KEYS
  ],
  [
    7,
    8,
    9,
    10,
    11,
    12,
    XX,
    XX,
    14 + LEDS_LEFT_KEYS,
    13 + LEDS_LEFT_KEYS,
    12 + LEDS_LEFT_KEYS,
    11 + LEDS_LEFT_KEYS,
    10 + LEDS_LEFT_KEYS,
    9 + LEDS_LEFT_KEYS,
    8 + LEDS_LEFT_KEYS,
    7 + LEDS_LEFT_KEYS
  ],
  [
    13,
    14,
    15,
    16,
    17,
    18,
    XX,
    29,
    XX,
    21 + LEDS_LEFT_KEYS,
    20 + LEDS_LEFT_KEYS,
    19 + LEDS_LEFT_KEYS,
    18 + LEDS_LEFT_KEYS,
    17 + LEDS_LEFT_KEYS,
    16 + LEDS_LEFT_KEYS,
    15 + LEDS_LEFT_KEYS
  ],
  [
    19,
    20,
    21,
    22,
    23,
    24,
    25,
    XX,
    XX,
    XX,
    27 + LEDS_LEFT_KEYS,
    26 + LEDS_LEFT_KEYS,
    25 + LEDS_LEFT_KEYS,
    24 + LEDS_LEFT_KEYS,
    23 + LEDS_LEFT_KEYS,
    22 + LEDS_LEFT_KEYS
  ],
  [
    26,
    27,
    28,
    29,
    30,
    XX,
    31,
    32,
    35 + LEDS_LEFT_KEYS,
    34 + LEDS_LEFT_KEYS,
    33 + LEDS_LEFT_KEYS,
    32 + LEDS_LEFT_KEYS,
    31 + LEDS_LEFT_KEYS,
    30 + LEDS_LEFT_KEYS,
    29 + LEDS_LEFT_KEYS,
    28 + LEDS_LEFT_KEYS
  ]
];

const no_key_led_map = [
  ...Array.apply(0, Array(63)).map((_, i) => i + UNDERGLOW)
];

class KeymapANSI extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      underglowIndex: null
    };
  }

  render() {
    const { underglowIndex } = this.state;
    const keymap =
      this.props.keymap ||
      Array(80)
        .fill()
        .map(() => 0);

    const getContrastText = color => {
      return this.props.theme
        ? this.props.theme.palette.getContrastText(color)
        : null;
    };
    let keyIndex = (row, col) => {
      return col !== undefined ? row * 16 + col : row + 11;
    };

    let getLabel = (row, col) => {
      return keymap[keyIndex(row, col)];
    };

    let isSelected = (row, col) => {
      const selectIndex = keyIndex(row, col);
      return underglowIndex
        ? underglowIndex == selectIndex
        : this.props.selectedKey == selectIndex;
    };

    let stroke = (row, col) =>
      isSelected(row, col)
        ? this.props.darkMode
          ? "#fff"
          : "#000"
        : "#b3b3b3";

    let getStrokeWidth = (row, col) => (isSelected(row, col) ? "3.0" : "1.5");

    const colormap =
      this.props.colormap ||
      Array(132)
        .fill()
        .map(() => 0);
    const palette =
      this.props.palette && this.props.palette.length > 0
        ? this.props.palette
        : Array(16)
            .fill()
            .map(() => ({
              rgb: "#ffffff"
            }));

    let getColor = (row, col) => {
      let ledIndex =
          col !== undefined
            ? led_map[parseInt(row)][parseInt(col)]
            : no_key_led_map[row - UNDERGLOW],
        colorIndex = colormap[ledIndex],
        color = palette[colorIndex].rgb;
      return color;
    };

    let getLEDIndex = (row, col) => {
      return col !== undefined
        ? led_map[parseInt(row)][parseInt(col)]
        : no_key_led_map[row - UNDERGLOW];
    };

    const onClick = e => {
      this.setState({ underglowIndex: null });
      this.props.onKeySelect(e);
    };
    const layer = this.props.index;

    const setUndeglowIndex = (index, e) => {
      this.setState({ underglowIndex: keyIndex(index) });
      this.props.onKeySelect(e);
    };
    /**
     * GetCurrentKeyElement  on keyboard
     * @props {string} x - horizontal coordinates of the button
     * @props {string} y vertical coordinates of the button
     * @props {string} dy - row spacing
     * @props {string} word - button text
     * @props {string} class - className of the button
     * @props {string} textLength length of the text if the button is small and additional text is longer then button
     */
    const GetCurrentKeyElement = props => {
      return (
        <tspan>
          <tspan
            className={props.class}
            textAnchor="middle"
            x={props.x}
            y={props.y}
            dy={props.dy}
            textLength={props.textLength}
          >
            {props.word}
          </tspan>
        </tspan>
      );
    };
    /**
     * getDivideKeys - divides words on keyboard keys
     * @param {string} str Name of key
     * @param {string} xCord Cord of the center position horisontal of each key
     * @param {string} yCord Cord of the center position vertical of each key
     * @param {boolean} smallKey if the word longer than key switch to true
     */
    const getDivideKeys = (str, xCord, yCord, smallKey = false) => {
      const numbers =
        (str.charCodeAt() >= 48 && str.charCodeAt() <= 57) ||
        (str.charCodeAt() >= 96 && str.charCodeAt() <= 105) ||
        str === "\n".charCodeAt(0);
      const interval = "1.5em";
      const longWords = str.split(" ");
      const shortWords = str.split("");
      if (numbers) {
        return (
          <GetCurrentKeyElement
            key={new Date() + Math.random()}
            x={xCord}
            y={yCord}
            word={str}
            class="key-config"
          />
        );
      } else if (str.length === 1) {
        return shortWords.map((word, index) => (
          <GetCurrentKeyElement
            key={index}
            x={xCord}
            y={yCord}
            word={word}
            class="letter-config"
          />
        ));
      } else if (str.toLowerCase().endsWith("to")) {
        return longWords.map((word, index) => (
          <tspan key={index}>
            <GetCurrentKeyElement
              x={xCord}
              y={String(+yCord + 9)}
              dy={0}
              word={word.slice(0, word.indexOf("to") - 1)}
            />
            <GetCurrentKeyElement
              x={String(+xCord - 5)}
              y={String(+yCord + 9)}
              dy={interval}
              word={word.slice(-2)}
            />
          </tspan>
        ));
      } else if (
        str.length > 8 &&
        smallKey === true &&
        (str.startsWith("C+") || str.startsWith("A+") || str.startsWith("AGr+"))
      ) {
        return (
          <GetCurrentKeyElement
            key={new Date() + Math.random()}
            x={xCord}
            y={yCord}
            word={str}
            textLength="50"
          />
        );
      } else if (
        longWords.length === 1 &&
        shortWords.length > 7 &&
        !str.startsWith("C+") &&
        !str.startsWith("A+") &&
        !str.startsWith("AGr+") &&
        smallKey
      ) {
        return longWords.map((word, index) => (
          <tspan key={index}>
            <GetCurrentKeyElement
              x={xCord}
              y={String(+yCord - 10)}
              word={word.slice(0, 4)}
              dy={"0"}
            />
            <GetCurrentKeyElement
              x={xCord}
              y={String(+yCord - 10)}
              word={word.slice(4)}
              dy={interval}
            />
          </tspan>
        ));
      } else if (longWords.length === 1) {
        return longWords.map((word, index) => (
          <GetCurrentKeyElement key={index} x={xCord} y={yCord} word={word} />
        ));
      } else if (longWords.length > 1 && smallKey === true) {
        return longWords.map((word, index) => (
          <GetCurrentKeyElement
            key={index}
            x={xCord}
            y={String(+yCord - 10)}
            word={word}
            dy={index ? interval : index}
          />
        ));
      } else if (longWords.length > 1) {
        return (
          <GetCurrentKeyElement
            key={new Date() + Math.random()}
            x={xCord}
            y={yCord}
            word={str}
          />
        );
      } else {
        return (
          <GetCurrentKeyElement
            key={new Date() + Math.random()}
            x={xCord}
            y={yCord}
            word={str}
          />
        );
      }
    };
    const topsArr = [
      "LEDEFF.",
      "SCadet",
      "Steno",
      "M.Btn",
      "Leader",
      "Numpad",
      "Media",
      "OSL",
      "Mouse",
      "M.Wheel",
      "M.Warp"
    ];
    const topsArrTransfer = ["SHIFTTO", "LockTo"];
    const getCenterExtra = (row, col, xCord, yCord, smallKey = false) =>
      getLabel(row, col).extraLabel !== ""
        ? topsArr.includes(getLabel(row, col).extraLabel)
          ? getLabel(row, col).extraLabel &&
            getDivideKeys(getLabel(row, col).extraLabel, xCord, yCord, smallKey)
          : getLabel(row, col).extraLabel &&
            getDivideKeys(
              getLabel(row, col).extraLabel,
              xCord,
              String(+yCord - 10),
              smallKey
            )
        : getLabel(row, col).extraLabel ===
          getLabel(row, col).extraLabel.toLowerCase().endsWith("to")
        ? getLabel(row, col).extraLabel &&
          getDivideKeys(getLabel(row, col).extraLabel, xCord, yCord, smallKey)
        : getLabel(row, col).extraLabel;

    const getCenterPrimary = (row, col, xCord, yCord, smallKey = false) =>
      getLabel(row, col).extraLabel !== ""
        ? topsArr.includes(getLabel(row, col).extraLabel)
          ? getLabel(row, col).label &&
            getDivideKeys(getLabel(row, col).label, xCord, yCord, smallKey)
          : topsArrTransfer.includes(getLabel(row, col).extraLabel)
          ? getLabel(row, col).label &&
            getDivideKeys(
              getLabel(row, col).label,
              String(+xCord + 10),
              yCord,
              smallKey
            )
          : getLabel(row, col).label &&
            getDivideKeys(
              getLabel(row, col).label,
              xCord,
              String(yCord - 5),
              smallKey
            )
        : topsArrTransfer.includes(getLabel(row, col).extraLabel)
        ? getLabel(row, col).label &&
          getDivideKeys(getLabel(row, col).label, xCord, yCord, smallKey) &&
          getDivideKeys(
            getLabel(row, col).label,
            String(+xCord + 10),
            yCord,
            smallKey
          )
        : getLabel(row, col).label &&
          getDivideKeys(
            getLabel(row, col).label,
            xCord,
            String(yCord - 5),
            smallKey
          );

    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fillRule="evenodd"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit="1.5"
        clipRule="evenodd"
        viewBox="0 0 1029 634"
        className={this.props.className || "layer"}
      >
        <path
          id="neuron_outline"
          fill="none"
          stroke="#b4b4b4"
          strokeWidth="1.5"
          d="M474.8,610.2c-1,2.4-3.8,3.6-6.2,2.5c-0.1,0-0.1-0.1-0.2-0.1l-48.5-23
	c-7.2-3.4-10.3-12-6.9-19.3l29.4-63.2c2.8-6,4.2-12.5,4.2-19.1v-31c0-5.8,4.7-10.5,10.5-10.5l0,0h55.4c5.8,0,10.5,4.7,10.5,10.5l0,0
	v31c0,6.6,1.4,13.1,4.2,19.1l29.4,63.2c3.4,7.2,0.3,15.8-6.9,19.3l-48.5,23c-2.4,1.1-5.2,0.1-6.3-2.3c0-0.1-0.1-0.1-0.1-0.2l0,0
	c-2.3-5.5-8.6-8.1-14.1-5.8C477.9,605.5,475.9,607.6,474.8,610.2L474.8,610.2z"
        />
        <g id="keyshapes">
          <path
            id="neuron_led"
            onClick={e => {
              setUndeglowIndex(131, e);
            }}
            className="key"
            fill={getColor(131)}
            stroke={stroke(131)}
            strokeWidth={getStrokeWidth(131)}
            data-led-index={getLEDIndex(131)}
            data-key-index={keyIndex(131)}
            data-layer={layer}
            d="M454.5,510c-0.2-0.6,0.2-1.2,0.7-1.3l28.6-9.8c0.2-0.1,0.5-0.1,0.7,0l29.7,9.8
		c0.6,0.2,0.9,0.8,0.7,1.3l-7.5,26.9c0,0.2-0.1,0.3-0.2,0.4L485,561.9c-0.4,0.5-1.1,0.5-1.6,0.1l-0.1-0.1l-21.1-24.6
		c-0.1-0.1-0.2-0.3-0.2-0.4L454.5,510L454.5,510z M465.2,514.6c-0.1-0.5,0.2-1.1,0.7-1.3l18.1-6c0.2-0.1,0.5-0.1,0.7,0l18.8,6
		c0.5,0.2,0.9,0.7,0.8,1.3l-3.7,19.6c0,0.3-0.2,0.5-0.4,0.7l-15.1,12c-0.4,0.3-1,0.3-1.4,0l-14.3-12c-0.2-0.2-0.3-0.4-0.4-0.6
		L465.2,514.6L465.2,514.6z"
          />
          <path
            id="R4C9_keyshape"
            onClick={onClick}
            className="key"
            fill={getColor(4, 9)}
            stroke={stroke(4, 9)}
            strokeWidth={getStrokeWidth(4, 9)}
            data-led-index={getLEDIndex(4, 9)}
            data-key-index={keyIndex(4, 9)}
            data-layer={layer}
            d="M652.4,325.7c0.6-0.9,1-1.9,1-3c0-2.9-2.4-5.3-5.3-5.3h-76.9c-2.9,0-5.3,2.4-5.3,5.3v40.7
		c0,2.9,2.4,5.3,5.3,5.3h48.3c1.7,0,3.3-0.8,4.3-2.2L652.4,325.7z"
          />
          <path
            id="R4C8_keyshape"
            onClick={onClick}
            className="key"
            fill={getColor(4, 8)}
            stroke={stroke(4, 8)}
            strokeWidth={getStrokeWidth(4, 8)}
            data-led-index={getLEDIndex(4, 8)}
            data-key-index={keyIndex(4, 8)}
            data-layer={layer}
            d="M508.2,322.7c0-2.9,2.4-5.3,5.3-5.3H554c2.9,0,5.3,2.4,5.3,5.3v40.7c0,2.9-2.4,5.3-5.3,5.3
		h-40.5c-2.9,0-5.3-2.4-5.3-5.3L508.2,322.7L508.2,322.7z"
          />
          <path
            id="R4C7_keyshape"
            onClick={onClick}
            className="key"
            fill={getColor(4, 7)}
            stroke={stroke(4, 7)}
            strokeWidth={getStrokeWidth(4, 7)}
            data-led-index={getLEDIndex(4, 7)}
            data-key-index={keyIndex(4, 7)}
            data-layer={layer}
            d="M410.6,322.7c0-2.9,2.4-5.3,5.3-5.3h40.5c2.9,0,5.3,2.4,5.3,5.3v40.7
		c0,2.9-2.4,5.3-5.3,5.3h-40.5c-2.9,0-5.3-2.4-5.3-5.3V322.7z"
          />
          <path
            id="R4C6_keyshape"
            onClick={onClick}
            className="key"
            fill={getColor(4, 6)}
            stroke={stroke(4, 6)}
            strokeWidth={getStrokeWidth(4, 6)}
            data-led-index={getLEDIndex(4, 6)}
            data-key-index={keyIndex(4, 6)}
            data-layer={layer}
            d="M317.1,325.7c-0.6-0.9-1-1.9-1-3c0-2.9,2.4-5.3,5.3-5.3h76.9c2.9,0,5.3,2.4,5.3,5.3v40.7
		c0,2.9-2.4,5.3-5.3,5.3H350c-1.7,0-3.3-0.8-4.3-2.2L317.1,325.7z"
          />
          <path
            id="R4C15_keyshape"
            onClick={onClick}
            className="key"
            fill={getColor(4, 15)}
            stroke={stroke(4, 15)}
            strokeWidth={getStrokeWidth(4, 15)}
            data-led-index={getLEDIndex(4, 15)}
            data-key-index={keyIndex(4, 15)}
            data-layer={layer}
            d="M904.4,263.2c0-2.9,2.4-5.3,5.3-5.3h55.7c2.9,0,5.3,2.4,5.3,5.3l0,0v40.7
		c0,2.9-2.4,5.3-5.3,5.3l0,0h-55.7c-2.9,0-5.3-2.4-5.3-5.3V263.2z"
          />
          <path
            id="R4C14_keyshape"
            onClick={onClick}
            className="key"
            fill={getColor(4, 14)}
            stroke={stroke(4, 14)}
            strokeWidth={getStrokeWidth(4, 14)}
            data-led-index={getLEDIndex(4, 14)}
            data-key-index={keyIndex(4, 14)}
            data-layer={layer}
            d="M844.6,263.2c0-2.9,2.4-5.3,5.3-5.3h40.5c2.9,0,5.3,2.4,5.3,5.3v40.7
		c0,2.9-2.4,5.3-5.3,5.3h-40.5c-2.9,0-5.3-2.4-5.3-5.3V263.2z"
          />
          <path
            id="R4C13_keyshape"
            onClick={onClick}
            className="key"
            fill={getColor(4, 13)}
            stroke={stroke(4, 13)}
            strokeWidth={getStrokeWidth(4, 13)}
            data-led-index={getLEDIndex(4, 13)}
            data-key-index={keyIndex(4, 13)}
            data-layer={layer}
            d="M769.4,263.2c0-2.9,2.4-5.3,5.3-5.3h55.7c2.9,0,5.3,2.4,5.3,5.3l0,0v40.7
		c0,2.9-2.4,5.3-5.3,5.3l0,0h-55.7c-2.9,0-5.3-2.4-5.3-5.3V263.2z"
          />
          <path
            id="R4C12_keyshape"
            onClick={onClick}
            className="key"
            fill={getColor(4, 12)}
            stroke={stroke(4, 12)}
            strokeWidth={getStrokeWidth(4, 12)}
            data-led-index={getLEDIndex(4, 12)}
            data-key-index={keyIndex(4, 12)}
            data-layer={layer}
            d="M694.3,263.2c0-2.9,2.4-5.3,5.3-5.3h55.7c2.9,0,5.3,2.4,5.3,5.3l0,0v40.7
		c0,2.9-2.4,5.3-5.3,5.3l0,0h-55.7c-2.9,0-5.3-2.4-5.3-5.3V263.2z"
          />
          <path
            id="R4C11_keyshape"
            onClick={onClick}
            className="key"
            fill={getColor(4, 11)}
            stroke={stroke(4, 11)}
            strokeWidth={getStrokeWidth(4, 11)}
            data-led-index={getLEDIndex(4, 11)}
            data-key-index={keyIndex(4, 11)}
            data-layer={layer}
            d="M609.6,263.2c0-2.9,2.4-5.3,5.3-5.3l0,0h65.6c2.9,0,5.3,2.4,5.3,5.3l0,0v40.7
		c0,2.9-2.3,5.3-5.2,5.3l0,0H615c-2.9,0-5.3-2.4-5.3-5.3l0,0L609.6,263.2L609.6,263.2z"
          />
          <path
            id="R4C10_keyshape"
            onClick={onClick}
            className="key"
            fill={getColor(4, 10)}
            stroke={stroke(4, 10)}
            strokeWidth={getStrokeWidth(4, 10)}
            data-led-index={getLEDIndex(4, 10)}
            data-key-index={keyIndex(4, 10)}
            data-layer={layer}
            d="M508.6,263.2c0-2.9,2.4-5.3,5.3-5.3h83.6c2.9,0,5.3,2.4,5.3,5.3v40.7
		c0,2.9-2.4,5.3-5.3,5.3h-83.6c-2.9,0-5.3-2.4-5.3-5.3V263.2z"
          />
          <path
            id="R4C4_keyshape"
            onClick={onClick}
            className="key"
            fill={getColor(4, 4)}
            stroke={stroke(4, 4)}
            strokeWidth={getStrokeWidth(4, 4)}
            data-led-index={getLEDIndex(4, 4)}
            data-key-index={keyIndex(4, 4)}
            data-layer={layer}
            d="M367.7,263.2c0-2.9,2.4-5.3,5.3-5.3h83.6c2.9,0,5.3,2.4,5.3,5.3v40.7
		c0,2.9-2.4,5.3-5.3,5.3H373c-2.9,0-5.3-2.4-5.3-5.3V263.2z"
          />
          <path
            id="R4C3_keyshape"
            onClick={onClick}
            className="key"
            fill={getColor(4, 3)}
            stroke={stroke(4, 3)}
            strokeWidth={getStrokeWidth(4, 3)}
            data-led-index={getLEDIndex(4, 3)}
            data-key-index={keyIndex(4, 3)}
            data-layer={layer}
            d="M282.8,263.2c0-2.9,2.4-5.3,5.3-5.3h65.6c2.9,0,5.3,2.4,5.3,5.3l0,0v40.7
		c0,2.9-2.3,5.3-5.2,5.3l0,0H288c-2.9,0-5.3-2.4-5.3-5.3l0,0L282.8,263.2L282.8,263.2z"
          />
          <path
            id="R4C2_keyshape"
            onClick={onClick}
            className="key"
            fill={getColor(4, 2)}
            stroke={stroke(4, 2)}
            strokeWidth={getStrokeWidth(4, 2)}
            data-led-index={getLEDIndex(4, 2)}
            data-key-index={keyIndex(4, 2)}
            data-layer={layer}
            d="M207.7,263.2c0-2.9,2.4-5.3,5.3-5.3h55.7c2.9,0,5.3,2.4,5.3,5.3v40.7
		c0,2.9-2.4,5.3-5.3,5.3H213c-2.9,0-5.3-2.4-5.3-5.3V263.2z"
          />
          <path
            id="R4C1_keyshape"
            onClick={onClick}
            className="key"
            fill={getColor(4, 1)}
            stroke={stroke(4, 1)}
            strokeWidth={getStrokeWidth(4, 1)}
            data-led-index={getLEDIndex(4, 1)}
            data-key-index={keyIndex(4, 1)}
            data-layer={layer}
            d="M132.7,263.2c0-2.9,2.4-5.3,5.3-5.3h55.7c2.9,0,5.3,2.4,5.3,5.3v40.7
		c0,2.9-2.4,5.3-5.3,5.3H138c-2.9,0-5.3-2.4-5.3-5.3V263.2z"
          />
          <path
            id="R4C0_keyshape"
            onClick={onClick}
            className="key"
            fill={getColor(4, 0)}
            stroke={stroke(4, 0)}
            strokeWidth={getStrokeWidth(4, 0)}
            data-led-index={getLEDIndex(4, 0)}
            data-key-index={keyIndex(4, 0)}
            data-layer={layer}
            d="M57.7,263.2c0-2.9,2.4-5.3,5.3-5.3h55.7c2.9,0,5.3,2.4,5.3,5.3v40.7c0,2.9-2.4,5.3-5.3,5.3
		H62.9c-2.9,0-5.3-2.4-5.3-5.3L57.7,263.2L57.7,263.2z"
          />
          <path
            id="R3C15_keyshape"
            onClick={onClick}
            className="key"
            fill={getColor(3, 15)}
            stroke={stroke(3, 15)}
            strokeWidth={getStrokeWidth(3, 15)}
            data-led-index={getLEDIndex(3, 15)}
            data-key-index={keyIndex(3, 15)}
            data-layer={layer}
            d="M814.2,203.6c0-2.9,2.4-5.3,5.3-5.3l0,0h146c2.9,0,5.3,2.4,5.3,5.3l0,0v40.9
		c0,2.9-2.4,5.3-5.3,5.3l0,0h-146c-2.9,0-5.3-2.4-5.3-5.3l0,0V203.6z"
          />
          <path
            id="R3C14_keyshape"
            onClick={onClick}
            className="key-config key"
            fill={getColor(3, 14)}
            stroke={stroke(3, 14)}
            strokeWidth={getStrokeWidth(3, 14)}
            data-led-index={getLEDIndex(3, 14)}
            data-key-index={keyIndex(3, 14)}
            data-layer={layer}
            d="M755.7,203.6c0-2.9,2.4-5.3,5.3-5.3h40.7c2.9,0,5.3,2.4,5.3,5.3v40.9
		c0,2.9-2.4,5.3-5.3,5.3h-40.7c-2.9,0-5.3-2.4-5.3-5.3V203.6L755.7,203.6L755.7,203.6z"
          />
          <path
            id="R3C13_keyshape"
            onClick={onClick}
            className="key-config key"
            fill={getColor(3, 13)}
            stroke={stroke(3, 13)}
            strokeWidth={getStrokeWidth(3, 13)}
            data-led-index={getLEDIndex(3, 13)}
            data-key-index={keyIndex(3, 13)}
            data-layer={layer}
            d="M696.9,203.6c0-2.9,2.4-5.3,5.3-5.3h40.7c2.9,0,5.3,2.4,5.3,5.3v40.9
		c0,2.9-2.4,5.3-5.3,5.3h-40.7c-2.9,0-5.3-2.4-5.3-5.3V203.6z"
          />
          <path
            id="R3C12_keyshape"
            onClick={onClick}
            className="key-config key"
            fill={getColor(3, 12)}
            stroke={stroke(3, 12)}
            strokeWidth={getStrokeWidth(3, 12)}
            data-led-index={getLEDIndex(3, 12)}
            data-key-index={keyIndex(3, 12)}
            data-layer={layer}
            d="M638.2,203.6c0-2.9,2.4-5.3,5.3-5.3h40.7c2.9,0,5.3,2.4,5.3,5.3v40.9
		c0,2.9-2.4,5.3-5.3,5.3h-40.7c-2.9,0-5.3-2.4-5.3-5.3V203.6z"
          />
          <path
            id="R3C11_keyshape"
            onClick={onClick}
            className="letter-config key"
            fill={getColor(3, 11)}
            stroke={stroke(3, 11)}
            strokeWidth={getStrokeWidth(3, 11)}
            data-led-index={getLEDIndex(3, 11)}
            data-key-index={keyIndex(3, 11)}
            data-layer={layer}
            d="M579.4,203.6c0-2.9,2.4-5.3,5.3-5.3h40.7c2.9,0,5.3,2.4,5.3,5.3v40.9
		c0,2.9-2.4,5.3-5.3,5.3h-40.7c-2.9,0-5.3-2.4-5.3-5.3V203.6z"
          />
          <path
            id="R3C10_keyshape"
            onClick={onClick}
            className="letter-config key"
            fill={getColor(3, 10)}
            stroke={stroke(3, 10)}
            strokeWidth={getStrokeWidth(3, 10)}
            data-led-index={getLEDIndex(3, 10)}
            data-key-index={keyIndex(3, 10)}
            data-layer={layer}
            d="M522.5,203.6c0-2.9,2.4-5.3,5.3-5.3h40.7c2.9,0,5.3,2.4,5.3,5.3v40.9
		c0,2.9-2.4,5.3-5.3,5.3h-40.7c-2.9,0-5.3-2.4-5.3-5.3V203.6z"
          />
          <path
            id="R3C6_keyshape"
            onClick={onClick}
            className="letter-config key"
            fill={getColor(3, 6)}
            stroke={stroke(3, 6)}
            strokeWidth={getStrokeWidth(3, 6)}
            data-led-index={getLEDIndex(3, 6)}
            data-key-index={keyIndex(3, 6)}
            data-layer={layer}
            d="M411,203.6c0-2.9,2.4-5.3,5.3-5.3H457c2.9,0,5.3,2.4,5.3,5.3v40.9c0,2.9-2.4,5.3-5.3,5.3
		h-40.7c-2.9,0-5.3-2.4-5.3-5.3V203.6z"
          />
          <path
            id="R3C5_keyshape"
            onClick={onClick}
            className="letter-config key"
            fill={getColor(3, 5)}
            stroke={stroke(3, 5)}
            strokeWidth={getStrokeWidth(3, 5)}
            data-led-index={getLEDIndex(3, 5)}
            data-key-index={keyIndex(3, 5)}
            data-layer={layer}
            d="M352.1,203.6c0-2.9,2.4-5.3,5.3-5.3H398c2.9,0,5.3,2.4,5.3,5.3v40.9c0,2.9-2.4,5.3-5.3,5.3
		h-40.7c-2.9,0-5.3-2.4-5.3-5.3L352.1,203.6L352.1,203.6z"
          />
          <path
            id="R3C4_keyshape"
            onClick={onClick}
            className="letter-config key"
            fill={getColor(3, 4)}
            stroke={stroke(3, 4)}
            strokeWidth={getStrokeWidth(3, 4)}
            data-led-index={getLEDIndex(3, 4)}
            data-key-index={keyIndex(3, 4)}
            data-layer={layer}
            d="M293.3,203.6c0-2.9,2.4-5.3,5.3-5.3h40.6c2.9,0,5.3,2.4,5.3,5.3v40.9
		c0,2.9-2.4,5.3-5.3,5.3h-40.7c-2.9,0-5.3-2.4-5.3-5.3L293.3,203.6L293.3,203.6z"
          />
          <path
            id="R3C3_keyshape"
            onClick={onClick}
            className="letter-config key"
            fill={getColor(3, 3)}
            stroke={stroke(3, 3)}
            strokeWidth={getStrokeWidth(3, 3)}
            data-led-index={getLEDIndex(3, 3)}
            data-key-index={keyIndex(3, 3)}
            data-layer={layer}
            d="M234.5,203.6c0-2.9,2.4-5.3,5.3-5.3h40.7c2.9,0,5.3,2.4,5.3,5.3v40.9
		c0,2.9-2.4,5.3-5.3,5.3h-40.7c-2.9,0-5.3-2.4-5.3-5.3V203.6z"
          />
          <path
            id="R3C2_keyshape"
            onClick={onClick}
            className="letter-config key"
            fill={getColor(3, 2)}
            stroke={stroke(3, 2)}
            strokeWidth={getStrokeWidth(3, 2)}
            data-led-index={getLEDIndex(3, 2)}
            data-key-index={keyIndex(3, 2)}
            data-layer={layer}
            d="M175.7,203.6c0-2.9,2.4-5.3,5.3-5.3h40.7c2.9,0,5.3,2.4,5.3,5.3v40.9
		c0,2.9-2.4,5.3-5.3,5.3h-40.8c-2.9,0-5.3-2.4-5.3-5.3L175.7,203.6L175.7,203.6z"
          />
          <path
            id="R3C0_keyshape"
            onClick={onClick}
            className="key"
            fill={getColor(3, 0)}
            stroke={stroke(3, 0)}
            strokeWidth={getStrokeWidth(3, 0)}
            data-led-index={getLEDIndex(3, 0)}
            data-key-index={keyIndex(3, 0)}
            data-layer={layer}
            d="M57.7,203.6c0-2.9,2.1-5.3,4.7-5.3h100.9c2.6,0,4.7,2.4,4.7,5.3v40.9
		c0,2.9-2.1,5.3-4.7,5.3H62.4c-2.6,0-4.7-2.4-4.7-5.3V203.6z"
          />
          <path
            id="R2C15_keyshape"
            onClick={onClick}
            className="key"
            fill={getColor(1, 15)}
            stroke={stroke(1, 15)}
            strokeWidth={getStrokeWidth(1, 15)}
            data-led-index={getLEDIndex(1, 15)}
            data-key-index={keyIndex(1, 15)}
            data-layer={layer}
            d="M861.3,144c0-2.9,2.1-5.3,4.7-5.3l0,0h100c2.6,0,4.7,2.4,4.7,5.3l0,0v40.9
		c0,2.9-2.1,5.3-4.7,5.3l0,0H866c-2.6,0-4.7-2.4-4.7-5.3l0,0V144z"
          />
          <path
            id="R2C14_keyshape"
            onClick={onClick}
            className="key-config key"
            fill={getColor(2, 14)}
            stroke={stroke(2, 14)}
            strokeWidth={getStrokeWidth(2, 14)}
            data-led-index={getLEDIndex(2, 14)}
            data-key-index={keyIndex(2, 14)}
            data-layer={layer}
            d="M802.5,144L802.5,144c0-2.9,2.4-5.3,5.3-5.3h40.7c2.9,0,5.3,2.4,5.3,5.3v40.9
		c0,2.9-2.4,5.3-5.3,5.3h-40.7c-2.9,0-5.3-2.4-5.3-5.3V144z"
          />
          <path
            id="R2C13_keyshape"
            onClick={onClick}
            className="key"
            fill={getColor(2, 13)}
            stroke={stroke(2, 13)}
            strokeWidth={getStrokeWidth(2, 13)}
            data-led-index={getLEDIndex(2, 13)}
            data-key-index={keyIndex(2, 13)}
            data-layer={layer}
            d="M743.7,144L743.7,144c0-2.9,2.4-5.3,5.3-5.3h40.7c2.9,0,5.3,2.4,5.3,5.3v40.9
		c0,2.9-2.4,5.3-5.3,5.3H749c-2.9,0-5.3-2.4-5.3-5.3V144L743.7,144L743.7,144z"
          />
          <path
            id="R2C12_keyshape"
            onClick={onClick}
            className="key"
            fill={getColor(2, 12)}
            stroke={stroke(2, 12)}
            strokeWidth={getStrokeWidth(2, 12)}
            data-led-index={getLEDIndex(2, 12)}
            data-key-index={keyIndex(2, 12)}
            data-layer={layer}
            d="M684.9,144L684.9,144c0-2.9,2.4-5.3,5.3-5.3H731c2.9,0,5.3,2.4,5.3,5.3v40.9
		c0,2.9-2.4,5.3-5.3,5.3h-40.7c-2.9,0-5.3-2.4-5.3-5.3V144z"
          />
          <path
            id="R2C11_keyshape"
            onClick={onClick}
            className="key"
            fill={getColor(2, 11)}
            stroke={stroke(2, 11)}
            strokeWidth={getStrokeWidth(2, 11)}
            data-led-index={getLEDIndex(2, 11)}
            data-key-index={keyIndex(2, 11)}
            data-layer={layer}
            d="M626.2,144L626.2,144c0-2.9,2.4-5.3,5.3-5.3h40.7c2.9,0,5.3,2.4,5.3,5.3v40.9
		c0,2.9-2.4,5.3-5.3,5.3h-40.7c-2.9,0-5.3-2.4-5.3-5.3V144z"
          />
          <path
            id="R2C10_keyshape"
            onClick={onClick}
            className="key"
            fill={getColor(2, 10)}
            stroke={stroke(2, 10)}
            strokeWidth={getStrokeWidth(2, 10)}
            data-led-index={getLEDIndex(2, 10)}
            data-key-index={keyIndex(2, 10)}
            data-layer={layer}
            d="M567.4,144L567.4,144c0-2.9,2.4-5.3,5.3-5.3h40.7c2.9,0,5.3,2.4,5.3,5.3v40.9
		c0,2.9-2.4,5.3-5.3,5.3h-40.7c-2.9,0-5.3-2.4-5.3-5.3V144z"
          />
          <path
            id="R2C9_keyshape"
            onClick={onClick}
            className="key"
            fill={getColor(2, 9)}
            stroke={stroke(2, 9)}
            strokeWidth={getStrokeWidth(2, 9)}
            data-led-index={getLEDIndex(2, 9)}
            data-key-index={keyIndex(2, 9)}
            data-layer={layer}
            d="M508.6,144L508.6,144c0-2.9,2.4-5.3,5.3-5.3h40.7c2.9,0,5.3,2.4,5.3,5.3v40.9
		c0,2.9-2.4,5.3-5.3,5.3h-40.7c-2.9,0-5.3-2.4-5.3-5.3L508.6,144L508.6,144z"
          />
          <path
            id="R2C5_keyshape"
            onClick={onClick}
            className="key"
            fill={getColor(2, 5)}
            stroke={stroke(2, 5)}
            strokeWidth={getStrokeWidth(2, 5)}
            data-led-index={getLEDIndex(2, 5)}
            data-key-index={keyIndex(2, 5)}
            data-layer={layer}
            d="M389,144L389,144c0-2.9,2.4-5.3,5.3-5.3h40.7c2.9,0,5.3,2.4,5.3,5.3v40.9
		c0,2.9-2.4,5.3-5.3,5.3h-40.7c-2.9,0-5.3-2.4-5.3-5.3V144z"
          />
          <path
            id="R2C4_keyshape"
            onClick={onClick}
            className="key"
            fill={getColor(2, 4)}
            stroke={stroke(2, 4)}
            strokeWidth={getStrokeWidth(2, 4)}
            data-led-index={getLEDIndex(2, 4)}
            data-key-index={keyIndex(2, 4)}
            data-layer={layer}
            d="M330.2,144L330.2,144c0-2.9,2.4-5.3,5.3-5.3h40.6c2.9,0,5.3,2.4,5.3,5.3v40.9
		c0,2.9-2.4,5.3-5.3,5.3h-40.7c-2.9,0-5.3-2.4-5.3-5.3L330.2,144L330.2,144z"
          />
          <path
            id="R2C3_keyshape"
            onClick={onClick}
            className="key"
            fill={getColor(2, 3)}
            stroke={stroke(2, 3)}
            strokeWidth={getStrokeWidth(2, 3)}
            data-led-index={getLEDIndex(2, 3)}
            data-key-index={keyIndex(2, 3)}
            data-layer={layer}
            d="M271.4,144L271.4,144c0-2.9,2.4-5.3,5.3-5.3h40.6c2.9,0,5.3,2.4,5.3,5.3v40.9
		c0,2.9-2.4,5.3-5.3,5.3h-40.7c-2.9,0-5.3-2.4-5.3-5.3L271.4,144L271.4,144z"
          />
          <path
            id="R2C2_keyshape"
            onClick={onClick}
            className="key"
            fill={getColor(2, 2)}
            stroke={stroke(2, 2)}
            strokeWidth={getStrokeWidth(2, 2)}
            data-led-index={getLEDIndex(2, 2)}
            data-key-index={keyIndex(2, 2)}
            data-layer={layer}
            d="M212.6,144L212.6,144c0-2.9,2.4-5.3,5.3-5.3h40.7c2.9,0,5.3,2.4,5.3,5.3v40.9
		c0,2.9-2.4,5.3-5.3,5.3h-40.7c-2.9,0-5.3-2.4-5.3-5.3V144z"
          />
          <path
            id="R2C1_keyshape"
            onClick={onClick}
            className="key"
            fill={getColor(2, 1)}
            stroke={stroke(2, 1)}
            strokeWidth={getStrokeWidth(2, 1)}
            data-led-index={getLEDIndex(2, 1)}
            data-key-index={keyIndex(2, 1)}
            data-layer={layer}
            d="M153.8,144L153.8,144c0-2.9,2.4-5.3,5.3-5.3h40.7c2.9,0,5.3,2.4,5.3,5.3v40.9
		c0,2.9-2.4,5.3-5.3,5.3H159c-2.9,0-5.3-2.4-5.3-5.3L153.8,144L153.8,144z"
          />
          <path
            id="R2C0_keyshape"
            onClick={onClick}
            className="key"
            fill={getColor(2, 0)}
            stroke={stroke(2, 0)}
            strokeWidth={getStrokeWidth(2, 0)}
            data-led-index={getLEDIndex(2, 0)}
            data-key-index={keyIndex(2, 0)}
            data-layer={layer}
            d="M57.7,144c0-2.9,2.2-5.3,4.9-5.3l0,0h79.3c2.7,0,4.9,2.4,4.9,5.3l0,0v40.9
		c0,2.9-2.2,5.3-4.9,5.3l0,0H62.6c-2.7,0-4.9-2.4-4.9-5.3l0,0C57.7,184.9,57.7,144,57.7,144z"
          />
          <path
            id="R1C15_keyshape"
            onClick={onClick}
            className="letter-config key"
            fill={getColor(2, 15)}
            stroke={stroke(2, 15)}
            strokeWidth={getStrokeWidth(2, 15)}
            data-led-index={getLEDIndex(2, 15)}
            data-key-index={keyIndex(2, 15)}
            data-layer={layer}
            d="M892.8,84.4c0-2.9,2.3-5.3,5.2-5.3l0,0h67.5c2.9,0,5.2,2.4,5.2,5.3v40.9
		c0,2.9-2.3,5.3-5.2,5.3l0,0H898c-2.9,0-5.2-2.4-5.2-5.3l0,0V84.4z"
          />
          <path
            id="R1C14_keyshape"
            onClick={onClick}
            className="key-config key"
            fill={getColor(1, 14)}
            stroke={stroke(1, 14)}
            strokeWidth={getStrokeWidth(1, 14)}
            data-led-index={getLEDIndex(1, 14)}
            data-key-index={keyIndex(1, 14)}
            data-layer={layer}
            d="M835.4,84.4L835.4,84.4c0-2.9,2.4-5.3,5.3-5.3h40.7c2.9,0,5.3,2.4,5.3,5.3v40.9
		c0,2.9-2.4,5.3-5.3,5.3h-40.7c-2.9,0-5.3-2.4-5.3-5.3V84.4z"
          />
          <path
            id="R1C13_keyshape"
            onClick={onClick}
            className="key-config key"
            fill={getColor(1, 13)}
            stroke={stroke(1, 13)}
            strokeWidth={getStrokeWidth(1, 13)}
            data-led-index={getLEDIndex(1, 13)}
            data-key-index={keyIndex(1, 13)}
            data-layer={layer}
            d="M777.9,84.4L777.9,84.4c0-2.9,2.4-5.3,5.3-5.3h40.7c2.9,0,5.3,2.4,5.3,5.3v40.9
		c0,2.9-2.4,5.3-5.3,5.3h-40.7c-2.9,0-5.3-2.4-5.3-5.3V84.4z"
          />
          <path
            id="R1C12_keyshape"
            onClick={onClick}
            className="letter-config key"
            fill={getColor(1, 12)}
            stroke={stroke(1, 12)}
            strokeWidth={getStrokeWidth(1, 12)}
            data-led-index={getLEDIndex(1, 12)}
            data-key-index={keyIndex(1, 12)}
            data-layer={layer}
            d="M720.5,84.4L720.5,84.4c0-2.9,2.4-5.3,5.3-5.3h40.7c2.9,0,5.3,2.4,5.3,5.3v40.9
		c0,2.9-2.4,5.3-5.3,5.3h-40.7c-2.9,0-5.3-2.4-5.3-5.3V84.4L720.5,84.4L720.5,84.4z"
          />
          <path
            id="R1C11_keyshape"
            onClick={onClick}
            className="letter-config key"
            fill={getColor(1, 11)}
            stroke={stroke(1, 11)}
            strokeWidth={getStrokeWidth(1, 11)}
            data-led-index={getLEDIndex(1, 11)}
            data-key-index={keyIndex(1, 11)}
            data-layer={layer}
            d="M663,84.4L663,84.4c0-2.9,2.4-5.3,5.3-5.3H709c2.9,0,5.3,2.4,5.3,5.3v40.9
		c0,2.9-2.4,5.3-5.3,5.3h-40.7c-2.9,0-5.3-2.4-5.3-5.3V84.4z"
          />
          <path
            id="R1C10_keyshape"
            onClick={onClick}
            className="letter-config key"
            fill={getColor(1, 10)}
            stroke={stroke(1, 10)}
            strokeWidth={getStrokeWidth(1, 10)}
            data-led-index={getLEDIndex(1, 10)}
            data-key-index={keyIndex(1, 10)}
            data-layer={layer}
            d="M605.6,84.4L605.6,84.4c0-2.9,2.4-5.3,5.3-5.3h40.7c2.9,0,5.3,2.4,5.3,5.3v40.9
		c0,2.9-2.4,5.3-5.3,5.3h-40.7c-2.9,0-5.3-2.4-5.3-5.3V84.4z"
          />
          <path
            id="R1C9_keyshape"
            onClick={onClick}
            className="letter-config key"
            fill={getColor(1, 9)}
            stroke={stroke(1, 9)}
            strokeWidth={getStrokeWidth(1, 9)}
            data-led-index={getLEDIndex(1, 9)}
            data-key-index={keyIndex(1, 9)}
            data-layer={layer}
            d="M548.1,84.4L548.1,84.4c0-2.9,2.4-5.3,5.3-5.3h40.7c2.9,0,5.3,2.4,5.3,5.3v40.9
		c0,2.9-2.4,5.3-5.3,5.3h-40.7c-2.9,0-5.3-2.4-5.3-5.3V84.4z"
          />
          <path
            id="R1C8_keyshape"
            onClick={onClick}
            className="letter-config key"
            fill={getColor(1, 8)}
            stroke={stroke(1, 8)}
            strokeWidth={getStrokeWidth(1, 8)}
            data-led-index={getLEDIndex(1, 8)}
            data-key-index={keyIndex(1, 8)}
            data-layer={layer}
            d="M490.7,84.4L490.7,84.4c0-2.9,2.4-5.3,5.3-5.3h40.7c2.9,0,5.3,2.4,5.3,5.3v40.9
		c0,2.9-2.4,5.3-5.3,5.3h-40.7c-2.9,0-5.3-2.4-5.3-5.3L490.7,84.4L490.7,84.4z"
          />
          <path
            id="R1C5_keyshape"
            onClick={onClick}
            className="letter-config key"
            fill={getColor(1, 5)}
            stroke={stroke(1, 5)}
            strokeWidth={getStrokeWidth(1, 5)}
            data-led-index={getLEDIndex(1, 5)}
            data-key-index={keyIndex(1, 5)}
            data-layer={layer}
            d="M381.1,84.4L381.1,84.4c0-2.9,2.4-5.3,5.3-5.3h40.7c2.9,0,5.3,2.4,5.3,5.3v40.9
		c0,2.9-2.4,5.3-5.3,5.3h-40.7c-2.9,0-5.3-2.4-5.3-5.3V84.4z"
          />
          <path
            id="R1C4_keyshape"
            onClick={onClick}
            className="letter-config key"
            fill={getColor(1, 4)}
            stroke={stroke(1, 4)}
            strokeWidth={getStrokeWidth(1, 4)}
            data-led-index={getLEDIndex(1, 4)}
            data-key-index={keyIndex(1, 4)}
            data-layer={layer}
            d="M322.2,84.4L322.2,84.4c0-2.9,2.4-5.3,5.3-5.3h40.6c2.9,0,5.3,2.4,5.3,5.3v40.9
		c0,2.9-2.4,5.3-5.3,5.3h-40.7c-2.9,0-5.3-2.4-5.3-5.3L322.2,84.4L322.2,84.4z"
          />
          <path
            id="R1C3_keyshape"
            onClick={onClick}
            className="letter-config key"
            fill={getColor(1, 3)}
            stroke={stroke(1, 3)}
            strokeWidth={getStrokeWidth(1, 3)}
            data-led-index={getLEDIndex(1, 3)}
            data-key-index={keyIndex(1, 3)}
            data-layer={layer}
            d="M263.5,84.4L263.5,84.4c0-2.9,2.4-5.3,5.3-5.3h40.6c2.9,0,5.3,2.4,5.3,5.3v40.9
		c0,2.9-2.4,5.3-5.3,5.3h-40.7c-2.9,0-5.3-2.4-5.3-5.3L263.5,84.4L263.5,84.4z"
          />
          <path
            id="R1C2_keyshape"
            onClick={onClick}
            className="letter-config key"
            fill={getColor(1, 2)}
            stroke={stroke(1, 2)}
            strokeWidth={getStrokeWidth(1, 2)}
            data-led-index={getLEDIndex(1, 2)}
            data-key-index={keyIndex(1, 2)}
            data-layer={layer}
            d="M204.6,84.4L204.6,84.4c0-2.9,2.4-5.3,5.3-5.3h40.7c2.9,0,5.3,2.4,5.3,5.3v40.9
		c0,2.9-2.4,5.3-5.3,5.3h-40.7c-2.9,0-5.3-2.4-5.3-5.3L204.6,84.4L204.6,84.4z"
          />
          <path
            id="R1C1_keyshape"
            onClick={onClick}
            className="letter-config key"
            fill={getColor(1, 1)}
            stroke={stroke(1, 1)}
            strokeWidth={getStrokeWidth(1, 1)}
            data-led-index={getLEDIndex(1, 1)}
            data-key-index={keyIndex(1, 1)}
            data-layer={layer}
            d="M145.8,84.4L145.8,84.4c0-2.9,2.4-5.3,5.3-5.3h40.7c2.9,0,5.3,2.4,5.3,5.3v40.9
		c0,2.9-2.4,5.3-5.3,5.3H151c-2.9,0-5.3-2.4-5.3-5.3L145.8,84.4L145.8,84.4z"
          />
          <path
            id="R1C0_keyshape"
            onClick={onClick}
            className="key"
            fill={getColor(1, 0)}
            stroke={stroke(1, 0)}
            strokeWidth={getStrokeWidth(1, 0)}
            data-led-index={getLEDIndex(1, 0)}
            data-key-index={keyIndex(1, 0)}
            data-layer={layer}
            d="M57.7,84.4c0-2.9,2.4-5.3,5.3-5.3h70.9c2.9,0,5.3,2.4,5.3,5.3l0,0v40.9
		c0,2.9-2.4,5.3-5.3,5.3l0,0h-71c-2.9,0-5.3-2.4-5.3-5.3L57.7,84.4L57.7,84.4z"
          />
          <path
            id="R0C15_keyshape"
            onClick={onClick}
            className="key"
            fill={getColor(0, 15)}
            stroke={stroke(0, 15)}
            strokeWidth={getStrokeWidth(0, 15)}
            data-led-index={getLEDIndex(0, 15)}
            data-key-index={keyIndex(0, 15)}
            data-layer={layer}
            d="M861.3,24.8c0-2.9,2.4-5.3,5.3-5.3l0,0h98.8c2.9,0,5.3,2.4,5.3,5.3l0,0v40.9
		c0,2.9-2.4,5.3-5.3,5.3l0,0h-98.8c-2.9,0-5.3-2.4-5.3-5.3l0,0V24.8z"
          />
          <path
            id="R0C14_keyshape"
            onClick={onClick}
            className="key-config key"
            fill={getColor(0, 14)}
            stroke={stroke(0, 14)}
            strokeWidth={getStrokeWidth(0, 14)}
            data-led-index={getLEDIndex(0, 14)}
            data-key-index={keyIndex(0, 14)}
            data-layer={layer}
            d="M802.5,24.8L802.5,24.8c0-2.9,2.4-5.3,5.3-5.3h40.7c2.9,0,5.3,2.4,5.3,5.3v40.9
		c0,2.9-2.4,5.3-5.3,5.3h-40.7c-2.9,0-5.3-2.4-5.3-5.3V24.8z"
          />
          <path
            id="R0C13_keyshape"
            onClick={onClick}
            className="key-config key"
            fill={getColor(0, 13)}
            stroke={stroke(0, 13)}
            strokeWidth={getStrokeWidth(0, 13)}
            data-led-index={getLEDIndex(0, 13)}
            data-key-index={keyIndex(0, 13)}
            data-layer={layer}
            d="M743.8,24.8L743.8,24.8c0-2.9,2.4-5.3,5.3-5.3h40.7c2.9,0,5.3,2.4,5.3,5.3v40.9
		c0,2.9-2.4,5.3-5.3,5.3H749c-2.9,0-5.3-2.4-5.3-5.3V24.8z"
          />
          <path
            id="R0C12_keyshape"
            onClick={onClick}
            className="key key-config"
            fill={getColor(0, 12)}
            stroke={stroke(0, 12)}
            strokeWidth={getStrokeWidth(0, 12)}
            data-led-index={getLEDIndex(0, 12)}
            data-key-index={keyIndex(0, 12)}
            data-layer={layer}
            d="M685,24.8L685,24.8c0-2.9,2.4-5.3,5.3-5.3H731c2.9,0,5.3,2.4,5.3,5.3v40.9
		c0,2.9-2.4,5.3-5.3,5.3h-40.7c-2.9,0-5.3-2.4-5.3-5.3V24.8L685,24.8L685,24.8z"
          />
          <path
            id="R0C11_keyshape"
            onClick={onClick}
            className="key-config key"
            fill={getColor(0, 11)}
            stroke={stroke(0, 11)}
            strokeWidth={getStrokeWidth(0, 11)}
            data-led-index={getLEDIndex(0, 11)}
            data-key-index={keyIndex(0, 11)}
            data-layer={layer}
            d="M626.2,24.8L626.2,24.8c0-2.9,2.4-5.3,5.3-5.3h40.7c2.9,0,5.3,2.4,5.3,5.3v40.9
		c0,2.9-2.4,5.3-5.3,5.3h-40.7c-2.9,0-5.3-2.4-5.3-5.3V24.8z"
          />
          <path
            id="R0C10_keyshape"
            onClick={onClick}
            className="key key-config"
            fill={getColor(0, 10)}
            stroke={stroke(0, 10)}
            strokeWidth={getStrokeWidth(0, 10)}
            data-led-index={getLEDIndex(0, 10)}
            data-key-index={keyIndex(0, 10)}
            data-layer={layer}
            d="M567.4,24.8L567.4,24.8c0-2.9,2.4-5.3,5.3-5.3h40.7c2.9,0,5.3,2.4,5.3,5.3v40.9
		c0,2.9-2.4,5.3-5.3,5.3h-40.7c-2.9,0-5.3-2.4-5.3-5.3V24.8z"
          />
          <path
            id="R0C9_keyshape"
            onClick={onClick}
            className="key-config key"
            fill={getColor(0, 9)}
            stroke={stroke(0, 9)}
            strokeWidth={getStrokeWidth(0, 9)}
            data-led-index={getLEDIndex(0, 9)}
            data-key-index={keyIndex(0, 9)}
            data-layer={layer}
            d="M508.7,24.8L508.7,24.8c0-2.9,2.4-5.3,5.3-5.3h40.7c2.9,0,5.3,2.4,5.3,5.3v40.9
		c0,2.9-2.4,5.3-5.3,5.3H514c-2.9,0-5.3-2.4-5.3-5.3L508.7,24.8L508.7,24.8z"
          />
          <path
            id="R0C6_keyshape"
            onClick={onClick}
            className="key-config key"
            fill={getColor(0, 6)}
            stroke={stroke(0, 6)}
            strokeWidth={getStrokeWidth(0, 6)}
            data-led-index={getLEDIndex(0, 6)}
            data-key-index={keyIndex(0, 6)}
            data-layer={layer}
            d="M410,24.8L410,24.8c0-2.9,2.4-5.3,5.3-5.3H456c2.9,0,5.3,2.4,5.3,5.3v40.9
		c0,2.9-2.4,5.3-5.3,5.3h-40.7c-2.9,0-5.3-2.4-5.3-5.3V24.8z"
          />
          <path
            id="R0C5_keyshape"
            onClick={onClick}
            className="key-config key"
            fill={getColor(0, 5)}
            stroke={stroke(0, 5)}
            strokeWidth={getStrokeWidth(0, 5)}
            data-led-index={getLEDIndex(0, 5)}
            data-key-index={keyIndex(0, 5)}
            data-layer={layer}
            d="M351.2,24.8L351.2,24.8c0-2.9,2.4-5.3,5.3-5.3h40.7c2.9,0,5.3,2.4,5.3,5.3v40.9
		c0,2.9-2.4,5.3-5.3,5.3h-40.7c-2.9,0-5.3-2.4-5.3-5.3V24.8z"
          />
          <path
            id="R0C4_keyshape"
            onClick={onClick}
            className="key-config key"
            fill={getColor(0, 4)}
            stroke={stroke(0, 4)}
            strokeWidth={getStrokeWidth(0, 4)}
            data-led-index={getLEDIndex(0, 4)}
            data-key-index={keyIndex(0, 4)}
            data-layer={layer}
            d="M292.3,24.8L292.3,24.8c0-2.9,2.4-5.3,5.3-5.3h40.6c2.9,0,5.3,2.4,5.3,5.3v40.9
		c0,2.9-2.4,5.3-5.3,5.3h-40.7c-2.9,0-5.3-2.4-5.3-5.3L292.3,24.8L292.3,24.8z"
          />
          <path
            id="R0C3_keyshape"
            onClick={onClick}
            className="key-config key"
            fill={getColor(0, 3)}
            stroke={stroke(0, 3)}
            strokeWidth={getStrokeWidth(0, 3)}
            data-led-index={getLEDIndex(0, 3)}
            data-key-index={keyIndex(0, 3)}
            data-layer={layer}
            d="M233.6,24.8L233.6,24.8c0-2.9,2.4-5.3,5.3-5.3h40.6c2.9,0,5.3,2.4,5.3,5.3v40.9
		c0,2.9-2.4,5.3-5.3,5.3h-40.7c-2.9,0-5.3-2.4-5.3-5.3L233.6,24.8L233.6,24.8z"
          />
          <path
            id="R0C2_keyshape"
            onClick={onClick}
            className="key-config key"
            fill={getColor(0, 2)}
            stroke={stroke(0, 2)}
            strokeWidth={getStrokeWidth(0, 2)}
            data-led-index={getLEDIndex(0, 2)}
            data-key-index={keyIndex(0, 2)}
            data-layer={layer}
            d="M174.7,24.8L174.7,24.8c0-2.9,2.4-5.3,5.3-5.3h40.7c2.9,0,5.3,2.4,5.3,5.3v40.9
		c0,2.9-2.4,5.3-5.3,5.3H180c-2.9,0-5.3-2.4-5.3-5.3V24.8z"
          />
          <path
            id="R0C1_keyshape"
            onClick={onClick}
            className="key-config key"
            fill={getColor(0, 1)}
            stroke={stroke(0, 1)}
            strokeWidth={getStrokeWidth(0, 1)}
            data-led-index={getLEDIndex(0, 1)}
            data-key-index={keyIndex(0, 1)}
            data-layer={layer}
            d="M116,24.8L116,24.8c0-2.9,2.4-5.3,5.3-5.3H162c2.9,0,5.3,2.4,5.3,5.3v40.9
		c0,2.9-2.4,5.3-5.3,5.3h-40.8c-2.9,0-5.3-2.4-5.3-5.3L116,24.8L116,24.8z"
          />
          <path
            id="R0C0_keyshape"
            onClick={onClick}
            className="key"
            fill={getColor(0, 0)}
            stroke={stroke(0, 0)}
            strokeWidth={getStrokeWidth(0, 0)}
            data-led-index={getLEDIndex(0, 0)}
            data-key-index={keyIndex(0, 0)}
            data-layer={layer}
            d="M57.1,24.8L57.1,24.8c0-2.9,2.4-5.3,5.3-5.3h40.7c2.9,0,5.3,2.4,5.3,5.3v40.9
		c0,2.9-2.4,5.3-5.3,5.3H62.3c-2.9,0-5.3-2.4-5.3-5.3L57.1,24.8L57.1,24.8z"
          />
        </g>
        <g id="Areas">
          <polygon
            id="83_undeglow"
            onClick={e => {
              setUndeglowIndex(83, e);
            }}
            fill={getColor(83)}
            stroke={stroke(83)}
            strokeWidth={getStrokeWidth(83)}
            data-led-index={getLEDIndex(83)}
            data-key-index={keyIndex(83)}
            data-layer={layer}
            points="479.4,365.6 472.9,365.6 472.9,392.2 467.3,392.2 461.9,392.2 456.7,392.2 451.4,392.2 446.5,392.2
		442.8,392.2 439.3,392.2 435.6,392.2 432.2,392.2 429.3,392.2 429.3,404 432.2,404 435.6,404 438.9,404 442.4,404 446.5,403.6
		450,403.6 455,403.6 459.9,403.6 465.3,403.6 469.8,403.6 474.9,403.6 479.4,403.6 	"
          />
          <polygon
            id="84_undeglow"
            onClick={e => {
              setUndeglowIndex(84, e);
            }}
            fill={getColor(84)}
            stroke={stroke(84)}
            strokeWidth={getStrokeWidth(84)}
            data-led-index={getLEDIndex(84)}
            data-key-index={keyIndex(84)}
            data-layer={layer}
            points="402.4,448.2 391.5,445.4 392.5,440.8 393.5,435.9 394.5,431.6 395.6,427.1 396.2,423.3 396.9,420
		397.9,416.9 398.6,413.8 398.9,410.9 399.6,408.1 400.3,406.4 400.9,404.3 401.8,402.6 402.8,401 403.8,399.3 405.1,397.9
		406.5,396.5 408.2,395.5 409.8,394.4 411.4,393.8 413.4,393.1 415,392.4 417.1,392.2 419.1,392.2 420.1,392.2 420.9,392.2
		421.9,392.2 423.3,392.2 424.3,392.2 425.6,392.2 427,392.2 427,404 424.6,404 422.6,404 422.3,404 421.9,404 421.3,404 420.9,404
		420.6,404 420.3,404 420.1,404 418.7,404 417.4,404.3 416.4,404.6 415.4,405.3 414,406 413.4,406.7 412.4,407.8 411.7,409.1
		411,410.2 410.7,411.6 410.5,413.5 409.8,415.5 409.5,418 408.8,420.4 408.2,423 407.5,426.1 406.8,428.8 406.1,432.5 405.5,436.3
		404.5,440.1 403.5,444 	"
          />
          <polygon
            id="87_undeglow"
            onClick={e => {
              setUndeglowIndex(87, e);
            }}
            fill={getColor(87)}
            stroke={stroke(87)}
            strokeWidth={getStrokeWidth(87)}
            data-led-index={getLEDIndex(87)}
            data-key-index={keyIndex(87)}
            data-layer={layer}
            points="319.2,633 319.2,621.4 322.9,621.4 326.1,621.4 329.5,621.4 332.9,621.4 335.7,621.4 338.4,621.4
		340.8,621.4 341.1,621.4 341.4,621.4 341.8,621 343.1,621 344,620.7 345.3,620.3 347.3,619.8 349,619.1 350.3,617.7 351.7,616.7
		352.9,615.3 353.9,613.9 354.5,612.6 355.2,610.8 355.9,608.9 356.2,606.5 356.9,604.1 357.6,601 358.2,598.4 358.9,594.9
		359.6,591.5 360.3,588.2 361.3,584.4 361.9,580.6 372.4,583.7 371.5,588.5 370.5,593.2 369.5,597.7 368.5,601.7 367.5,605.1
		366.8,608.2 366.1,611.2 365.8,613.9 365.1,616.4 364.1,618.4 363.1,620.3 361.9,622.4 360.6,624.5 358.9,626.2 357.2,627.6
		355.6,629 353.5,630.2 351.7,631.2 349.3,631.9 347.7,632.3 345.6,632.6 343.6,633 343.1,633 342.8,633 342.4,633 339.1,633
		335.4,633 331.9,633 327.8,633 323.6,633 	"
          />
          <polygon
            id="86_undeglow"
            onClick={e => {
              setUndeglowIndex(86, e);
            }}
            fill={getColor(86)}
            stroke={stroke(86)}
            strokeWidth={getStrokeWidth(86)}
            data-led-index={getLEDIndex(86)}
            data-key-index={keyIndex(86)}
            data-layer={layer}
            points="362.4,578.3 363.4,573.2 364.8,567.5 366.1,561.9 367.5,556.2 368.8,550.2 370.5,542.2 372.2,534.4
		373.7,526.3 375.7,518.2 377.4,510.1 388.3,512.7 386,522.9 383.6,532.7 381.8,542.6 379.4,552.4 378.1,558.6 376.7,564.3
		375.4,570.2 374,575.6 373,581.3 	"
          />
          <polygon
            id="85_undeglow"
            onClick={e => {
              setUndeglowIndex(85, e);
            }}
            fill={getColor(85)}
            stroke={stroke(85)}
            strokeWidth={getStrokeWidth(85)}
            data-led-index={getLEDIndex(85)}
            data-key-index={keyIndex(85)}
            data-layer={layer}
            points="378.1,507.7 380.1,498.5 381.9,489.3 384,480.5 385.3,473.6 387,466.9 388.3,460.5 389.7,453.9
		391,447.9 402.1,450.6 400.9,456.7 399.6,462.7 397.9,469.3 396.6,476 394.9,482.8 392.9,491.9 391,501.3 388.7,510.4 	"
          />
          <polyline
            id="92_undeglow"
            onClick={e => {
              setUndeglowIndex(92, e);
            }}
            fill={getColor(92)}
            stroke={stroke(92)}
            strokeWidth={getStrokeWidth(92)}
            data-led-index={getLEDIndex(92)}
            data-key-index={keyIndex(92)}
            data-layer={layer}
            points="32.7,629.7 36.4,618.4 36.4,618.6 34.9,617.7 33.2,616.4 31.8,615 30.5,613.6 29.2,611.9 28.1,610.1
		27.1,608.6 26.1,606.5 25.8,604.4 25.3,602.4 25.3,600.1 25,596.7 25,593.2 24.6,589.6 24.6,585.4 24.3,581.3 24.3,577 23.9,571.8
		23.9,566.1 23.6,560.7 23.3,554.5 11.7,555.2 12,560.9 12.3,566.4 12.3,571.8 12.7,577 12.7,582 13,587.2 13.4,591.8 13.4,596.3
		13.7,600.6 14,603.7 14.4,606.5 15,609.3 16,611.9 17.2,614.6 18.6,617.1 19.9,619.5 21.9,621.7 23.6,623.8 25.6,625.5 27.8,627.3
		30.2,628.6 32.5,630 32.5,630 	"
          />
          <polyline
            id="91_undeglow"
            onClick={e => {
              setUndeglowIndex(91, e);
            }}
            fill={getColor(91)}
            stroke={stroke(91)}
            strokeWidth={getStrokeWidth(91)}
            data-led-index={getLEDIndex(91)}
            data-key-index={keyIndex(91)}
            data-layer={layer}
            points="38.6,619.8 35,630.9 34.9,631.1 37.2,631.7 39.1,632.3 41.4,632.6 44.1,633 46.3,633 46.6,633
		47,633 47.3,633 47.6,633 48,633 50.7,633 53.4,633 56.2,633 60.6,633 65.5,633 70.2,633 76,633 82.1,633 88,633 94.2,633
		100.9,633 107.5,633 107.5,621.4 101.6,621.4 95.9,621.4 90.3,621.4 84.6,621.4 79.4,621.4 74.4,621.4 69.5,621.4 64.8,621.4
		60.2,621.4 55.9,621.4 53.4,621.4 50.7,621.4 48.3,621.4 48,621.4 47.6,621.4 47.3,621.4 47,621.4 46.6,621.4 44.4,621 42.4,620.7
		40.4,620.3 38.6,619.8 	"
          />
          <polygon
            id="90_undeglow"
            onClick={e => {
              setUndeglowIndex(90, e);
            }}
            fill={getColor(90)}
            stroke={stroke(90)}
            strokeWidth={getStrokeWidth(90)}
            data-led-index={getLEDIndex(90)}
            data-key-index={keyIndex(90)}
            data-layer={layer}
            points="109.8,633 118.1,633 126.6,633 135.5,633 144.1,633 153,633 162.3,633 171.2,633 180.4,633
		180.4,621.4 170.2,621.4 160.1,621.4 149.8,621.4 139.9,621.4 132.2,621.4 124.6,621.4 117.1,621.4 109.8,621.4 	"
          />
          <polygon
            id="89_undeglow"
            onClick={e => {
              setUndeglowIndex(89, e);
            }}
            fill={getColor(89)}
            stroke={stroke(89)}
            strokeWidth={getStrokeWidth(89)}
            data-led-index={getLEDIndex(89)}
            data-key-index={keyIndex(89)}
            data-layer={layer}
            points="182.8,633 182.8,621.4 193,621.4 203.3,621.4 213.2,621.4 223.4,621.4 233.4,621.4 242.9,621.4
		252.5,621.4 252.5,633 242.9,633 233.4,633 223.1,633 213.2,633 202.9,633 193,633 	"
          />
          <polygon
            id="88_undeglow"
            onClick={e => {
              setUndeglowIndex(88, e);
            }}
            fill={getColor(88)}
            stroke={stroke(88)}
            strokeWidth={getStrokeWidth(88)}
            data-led-index={getLEDIndex(88)}
            data-key-index={keyIndex(88)}
            data-layer={layer}
            points="254.9,633 262.4,633 270,633 277.2,633 284.3,633 290.2,633 295.7,633 301.4,633 306.6,633 312,633
		316.9,633 316.9,621.4 312,621.4 307,621.4 301.8,621.4 296.1,621.4 290.5,621.4 284.6,621.4 277.6,621.4 270.3,621.4 262.8,621.4
		254.9,621.4 	"
          />
          <polygon
            id="96_undeglow"
            onClick={e => {
              setUndeglowIndex(96, e);
            }}
            fill={getColor(96)}
            stroke={stroke(96)}
            strokeWidth={getStrokeWidth(96)}
            data-led-index={getLEDIndex(96)}
            data-key-index={keyIndex(96)}
            data-layer={layer}
            points="1.1,296.3 12.7,295.6 12.7,298.3 13,301.8 13,305.1 13,308.5 13.4,312.3 13.4,316.7 13.7,320.8
		14,325.5 14,330.3 14.4,335 14.4,340.2 2.8,340.9 2.8,335 2.4,329.3 2.1,323.8 2.1,318.4 1.8,313.2 1.8,309.6 1.4,305.8 1.4,302.5
		1.1,299.4 	"
          />
          <polygon
            id="95_undeglow"
            onClick={e => {
              setUndeglowIndex(95, e);
            }}
            fill={getColor(95)}
            stroke={stroke(95)}
            strokeWidth={getStrokeWidth(95)}
            data-led-index={getLEDIndex(95)}
            data-key-index={keyIndex(95)}
            data-layer={layer}
            points="14.7,342.6 14.7,348.6 15,354.7 15.4,360.9 15.7,367.3 16,374.1 16.2,382.5 16.5,391.5 16.9,400.3
		17.2,409.5 17.6,418.6 6.1,419.3 5.8,410.2 5.5,401 5.1,392.2 4.8,383.2 4.4,374.7 4.1,368.3 3.8,362 3.4,355.4 3.1,349.3
		3.1,343.1 	"
          />
          <polygon
            id="94_undeglow"
            onClick={e => {
              setUndeglowIndex(94, e);
            }}
            fill={getColor(94)}
            stroke={stroke(94)}
            strokeWidth={getStrokeWidth(94)}
            data-led-index={getLEDIndex(94)}
            data-key-index={keyIndex(94)}
            data-layer={layer}
            points="8.6,485.2 8.3,473.3 7.6,461.5 7.3,449.6 6.6,435.6 6.3,421.8 17.6,421.1 18.2,434.9 18.9,448.9
		19.2,460.8 19.9,472.6 20.2,484.5 	"
          />
          <polygon
            id="93_undeglow"
            onClick={e => {
              setUndeglowIndex(93, e);
            }}
            fill={getColor(93)}
            stroke={stroke(93)}
            strokeWidth={getStrokeWidth(93)}
            data-led-index={getLEDIndex(93)}
            data-key-index={keyIndex(93)}
            data-layer={layer}
            points="11.7,552.8 11.3,546 11,538.9 10.7,532 10.3,524.6 10,517.5 9.7,507.7 9.3,497.8 9,487.6 20.6,486.9
		20.9,497.1 21.3,507 21.6,516.8 21.9,524.2 22.3,531.3 22.6,538.6 22.9,545.3 23.3,552.1 	"
          />
          <polygon
            id="97_undeglow"
            onClick={e => {
              setUndeglowIndex(97, e);
            }}
            fill={getColor(97)}
            stroke={stroke(97)}
            strokeWidth={getStrokeWidth(97)}
            data-led-index={getLEDIndex(97)}
            data-key-index={keyIndex(97)}
            data-layer={layer}
            points="9,262.1 11,259.3 13,256.2 15.4,252.9 17.9,249.1 20.6,244.9 32.5,250.1 29.8,253.6 27.5,257.2
		25.3,260 23.3,263.1 21.3,265.7 19.2,268.1 17.6,271.2 16.2,273.8 15.4,276.9 14.4,280 13.4,283.1 13,286.4 12.7,289.9 12.7,293
		1.1,293.5 0.7,292 0.7,290.2 0.7,286.8 1.1,283.5 1.4,280.4 2.4,276.9 3.1,273.8 4.4,270.9 5.8,267.8 7.3,264.6 	"
          />
          <polyline
            id="98_undeglow"
            onClick={e => {
              setUndeglowIndex(98, e);
            }}
            fill={getColor(98)}
            stroke={stroke(98)}
            strokeWidth={getStrokeWidth(98)}
            data-led-index={getLEDIndex(98)}
            data-key-index={keyIndex(98)}
            data-layer={layer}
            points="49.7,178.1 49.7,182.9 49.7,187.9 49.7,192.4 49.7,196.7 49.7,200.2 49.7,202.9 49.7,205.9
		49.7,208.3 49.7,210.4 49.7,211.1 49.7,211.8 49.7,212.8 49.7,213.5 49.7,214.2 49.7,214.4 49.7,214.7 49.7,216.8 49.3,219.2
		49,221.6 48.3,224.2 47.6,226.6 46.6,229.4 45.6,231.8 44.4,233.9 42.8,236.1 41.1,238.5 39.1,241.3 36.7,244.6 34.2,248.1
		21.9,243 23.6,240.3 25.6,237.5 27.1,235.1 28.5,233.2 29.8,231.1 30.8,229.4 32.5,227 33.9,224.2 35.2,221.6 36,218.8 36.7,215.7
		37.1,213.8 37.4,211.8 37.4,209.3 37.4,209 37.4,208.3 37.4,207.3 37.4,205.9 37.4,204.8 37.4,204 37.4,202.9 37.4,200.2
		37.4,197.8 37.4,194.6 37.4,191 37.4,186.9 37.4,182.6 37.4,178.1 	"
          />
          <polygon
            id="69_undeglow"
            onClick={e => {
              setUndeglowIndex(69, e);
            }}
            fill={getColor(69)}
            stroke={stroke(69)}
            strokeWidth={getStrokeWidth(69)}
            data-led-index={getLEDIndex(69)}
            data-key-index={keyIndex(69)}
            data-layer={layer}
            points="37.7,103.7 49.7,103.7 49.7,114.6 49.7,125.3 49.7,136.2 49.7,143.1 49.7,149.9 49.7,156.6
		49.7,163.2 49.7,169.2 49.7,175.3 37.4,175.3 37.4,169.6 37.7,163.5 37.7,157 37.7,150.2 37.7,143.8 37.7,136.6 37.7,125.7
		37.7,114.5 	"
          />
          <polygon
            id="76_undeglow"
            onClick={e => {
              setUndeglowIndex(76, e);
            }}
            fill={getColor(76)}
            stroke={stroke(76)}
            strokeWidth={getStrokeWidth(76)}
            data-led-index={getLEDIndex(76)}
            data-key-index={keyIndex(76)}
            data-layer={layer}
            points="469.8,14 447.8,14 426,14 404.1,14 404.1,2.1 428,2.1 452.4,2.1 476.6,2.1 476.6,14 	"
          />
          <polygon
            id="75_undeglow"
            onClick={e => {
              setUndeglowIndex(75, e);
            }}
            fill={getColor(75)}
            stroke={stroke(75)}
            strokeWidth={getStrokeWidth(75)}
            data-led-index={getLEDIndex(75)}
            data-key-index={keyIndex(75)}
            data-layer={layer}
            points="401.8,2.1 401.8,14 386,14 370.5,14 355.2,14 340.1,14 325.1,14 325.1,1.8 340.4,2.1 355.2,2.1
		370.8,2.1 386,2.1 	"
          />
          <polygon
            id="74_undeglow"
            onClick={e => {
              setUndeglowIndex(74, e);
            }}
            fill={getColor(74)}
            stroke={stroke(74)}
            strokeWidth={getStrokeWidth(74)}
            data-led-index={getLEDIndex(74)}
            data-key-index={keyIndex(74)}
            data-layer={layer}
            points="244.6,14 244.6,1.8 257.1,1.8 270,1.8 282.9,1.8 296.1,1.8 309.3,1.8 322.9,1.8 322.9,14 311.3,14
		299.8,14 288.5,14 277.2,14 266.1,14 255.2,14 	"
          />
          <polygon
            id="73_undeglow"
            onClick={e => {
              setUndeglowIndex(73, e);
            }}
            fill={getColor(73)}
            stroke={stroke(73)}
            strokeWidth={getStrokeWidth(73)}
            data-led-index={getLEDIndex(73)}
            data-key-index={keyIndex(73)}
            data-layer={layer}
            points="242.3,14 242.3,1.8 232.7,1.8 223.1,1.8 213.9,1.8 204.6,1.8 195.7,1.8 186.8,1.8 178.2,1.8 170,1.4
		170,14 178.2,14 186.8,14 195.4,14 204.6,14 213.5,14 223.1,14 232.7,14 	"
          />
          <polygon
            id="72_undeglow"
            onClick={e => {
              setUndeglowIndex(72, e);
            }}
            fill={getColor(72)}
            stroke={stroke(72)}
            strokeWidth={getStrokeWidth(72)}
            data-led-index={getLEDIndex(72)}
            data-key-index={keyIndex(72)}
            data-layer={layer}
            points="93.2,1.4 93.2,14.4 98.2,14.4 103.1,14.4 108.5,14.4 113.7,14.4 119.4,14.4 125,14.4 131.3,14.4
		137.9,14.4 145.1,14 152.4,14 159.7,14 167.3,14 167.3,1.4 160.1,1.4 152.7,1.4 145.5,1.4 138.6,1.4 131.5,1.4 124.6,1.4
		118.1,1.4 111.5,1.4 105.1,1.4 99.2,1.4 	"
          />
          <polygon
            id="71_undeglow"
            onClick={e => {
              setUndeglowIndex(71, e);
            }}
            fill={getColor(71)}
            stroke={stroke(71)}
            strokeWidth={getStrokeWidth(71)}
            data-led-index={getLEDIndex(71)}
            data-key-index={keyIndex(71)}
            data-layer={layer}
            points="37.7,30.3 37.7,28.2 37.7,26 37.7,24.2 37.7,23.9 37.7,23.5 37.7,23.2 37.7,22.9 38.1,20.4 38.4,18.4
		38.7,16.3 39.4,14.7 40.4,12.7 41.4,10.9 42.8,9.2 44.1,7.5 45.3,6.3 46.6,5.2 48.3,4.2 50,3.1 51.7,2.5 53.7,2.1 55.5,1.4
		57.2,1.4 58.2,1.4 58.6,1.4 61.6,1.4 64.8,1.4 68.1,1.4 71.5,1.4 75,1.4 78.7,1.4 82.8,1.4 86.6,1.4 91,1.4 91,14.4 86.6,14.4
		82.8,14.4 78.7,14.4 75,14.4 71.8,14.4 68.5,14.4 65.5,14.4 62.9,14.4 60.2,14.4 59.9,14.4 59.6,14.4 58.6,14.4 57.6,14.7
		56.5,15.1 55.2,15.8 54,16.3 52.7,17.3 52,18.4 51,19.4 50.7,20.8 50,22.2 49.7,23.5 49.7,25.3 49.7,25.6 49.7,26 49.7,27.2
		49.7,28.9 49.7,30.3 	"
          />
          <polygon
            id="70_undeglow"
            onClick={e => {
              setUndeglowIndex(70, e);
            }}
            fill={getColor(70)}
            stroke={stroke(70)}
            strokeWidth={getStrokeWidth(70)}
            data-led-index={getLEDIndex(70)}
            data-key-index={keyIndex(70)}
            data-layer={layer}
            points="37.7,101.3 49.7,101.3 49.7,94.9 49.7,88.4 49.7,82.3 49.7,76.1 49.7,70.4 49.7,64.7 49.7,58.8
		49.7,54.8 49.7,50.7 49.7,46.5 49.7,42.9 49.7,39.4 49.7,36 49.7,33 37.7,33 37.7,37 37.7,41.5 37.7,46 37.7,50.7 37.7,55.5
		37.7,60.2 37.7,66.6 37.7,73.5 37.7,80.2 37.7,87 37.7,94.2 	"
          />
          <rect
            id="77_undeglow"
            onClick={e => {
              setUndeglowIndex(77, e);
            }}
            fill={getColor(77)}
            stroke={stroke(77)}
            strokeWidth={getStrokeWidth(77)}
            data-led-index={getLEDIndex(77)}
            data-key-index={keyIndex(77)}
            data-layer={layer}
            x="469.8"
            y="16.3"
            width="6.6"
            height="47.9"
          />
          <polygon
            id="78_undeglow"
            onClick={e => {
              setUndeglowIndex(78, e);
            }}
            fill={getColor(78)}
            stroke={stroke(78)}
            strokeWidth={getStrokeWidth(78)}
            data-led-index={getLEDIndex(78)}
            data-key-index={keyIndex(78)}
            data-layer={layer}
            points="476.6,66.6 476.6,80.6 476.6,81.3 476.2,82 475.9,82.7 475.6,83.3 474.9,83.7 474.2,84 473.2,84
		451.7,84 451.4,84 451.4,84.4 451,84.4 451,84.7 451,85.1 451,127.8 444.1,127.8 444.1,85.1 444.5,83.3 444.8,82.3 445.1,80.9
		446.1,79.9 447.1,78.8 448.2,78.2 449.2,77.5 450.3,77.1 451.7,77.1 469.8,77.1 469.8,66.6 	"
          />
          <polygon
            id="79_undeglow"
            onClick={e => {
              setUndeglowIndex(79, e);
            }}
            fill={getColor(79)}
            stroke={stroke(79)}
            strokeWidth={getStrokeWidth(79)}
            data-led-index={getLEDIndex(79)}
            data-key-index={keyIndex(79)}
            data-layer={layer}
            points="444.1,130.2 444.1,136.6 444.5,138 444.8,139.3 445.1,140.7 446.1,141.8 446.8,142.5 448.2,143.5
		449.2,143.8 450.3,144.5 451.7,144.5 459.9,144.5 459.9,188.9 466.6,188.9 466.6,141.1 466.6,140 466.3,139.3 466,138.7
		465.3,138.3 464.6,138 464,137.6 463.3,137.6 451.7,137.6 451.4,137.3 451,137.3 451,136.9 451,136.6 451,130.2 	"
          />
          <polygon
            id="80_undeglow"
            onClick={e => {
              setUndeglowIndex(80, e);
            }}
            fill={getColor(80)}
            stroke={stroke(80)}
            strokeWidth={getStrokeWidth(80)}
            data-led-index={getLEDIndex(80)}
            data-key-index={keyIndex(80)}
            data-layer={layer}
            points="467.3,200.2 466,200.2 464.6,199.8 463.6,199.1 462.6,198.5 461.6,197.4 460.9,196.4 460.3,195
		459.9,193.8 459.9,192.4 459.9,191.4 466.6,191.4 466.6,192.4 466.6,192.7 466.6,193.1 467,193.1 467,193.4 467.3,193.4
		487.7,193.4 488.7,193.4 489.3,193.8 490,194.1 490.3,194.5 490.7,195 491,195.7 491.4,196.7 491.4,240.3 484.5,240.3 484.5,200.2
			"
          />
          <polygon
            id="81_undeglow"
            onClick={e => {
              setUndeglowIndex(81, e);
            }}
            fill={getColor(81)}
            stroke={stroke(81)}
            strokeWidth={getStrokeWidth(81)}
            data-led-index={getLEDIndex(81)}
            data-key-index={keyIndex(81)}
            data-layer={layer}
            points="472.9,298.7 472.9,266 472.9,264.6 472.9,263.4 473.2,262.4 473.5,261.4 474.2,260.7 474.5,260
		475.2,259.3 475.9,258.9 476.9,258.6 477.9,258.3 478.4,258.3 484.5,258.3 484.5,242.4 491.4,242.4 491.4,261.7 491,262.7
		491,263.4 490.3,264 490,264.3 489.3,264.6 488.7,265 487.7,265.3 479.4,265.3 479.4,266 479.4,298.7 	"
          />
          <rect
            id="82_undeglow"
            onClick={e => {
              setUndeglowIndex(82, e);
            }}
            fill={getColor(82)}
            stroke={stroke(82)}
            strokeWidth={getStrokeWidth(82)}
            data-led-index={getLEDIndex(82)}
            data-key-index={keyIndex(82)}
            data-layer={layer}
            x="472.9"
            y="301.1"
            width="6.6"
            height="61.9"
          />
          <polygon
            id="112_undeglow"
            onClick={e => {
              setUndeglowIndex(112, e);
            }}
            fill={getColor(112)}
            stroke={stroke(112)}
            strokeWidth={getStrokeWidth(112)}
            data-led-index={getLEDIndex(112)}
            data-key-index={keyIndex(112)}
            data-layer={layer}
            points="484.5,300.1 484.5,273.8 484.5,273.3 484.8,272.6 485.1,271.9 485.8,271.2 486.5,270.9 487.2,270.5
		487.7,270.5 495.4,270.5 495.7,270.5 496.1,270.2 496.4,269.8 496.4,269.5 496.4,243.9 502.9,243.9 502.9,269.5 502.9,270.9
		502.6,272.3 501.9,273.6 501.3,274.5 500.3,275.5 499.3,276.2 497.9,276.9 496.7,277.3 495.4,277.3 491.4,277.3 491.4,299.7 	"
          />
          <polygon
            id="113_undeglow"
            onClick={e => {
              setUndeglowIndex(113, e);
            }}
            fill={getColor(113)}
            stroke={stroke(113)}
            strokeWidth={getStrokeWidth(113)}
            data-led-index={getLEDIndex(113)}
            data-key-index={keyIndex(113)}
            data-layer={layer}
            points="491.4,362.8 491.4,302.2 484.5,302.5 484.5,362.8 	"
          />
          <polygon
            id="114_undeglow"
            onClick={e => {
              setUndeglowIndex(114, e);
            }}
            fill={getColor(114)}
            stroke={stroke(114)}
            strokeWidth={getStrokeWidth(114)}
            data-led-index={getLEDIndex(114)}
            data-key-index={keyIndex(114)}
            data-layer={layer}
            points="491.4,365.6 491.4,391.5 497.9,391.5 504,391.5 509.8,391.5 515.9,391.5 520.4,391.5 524.8,391.9
		529,391.9 533,391.9 536.9,391.9 540.6,391.9 540.6,404 501.3,404 484.5,404 484.5,365.6 	"
          />
          <polygon
            id="116_undeglow"
            onClick={e => {
              setUndeglowIndex(116, e);
            }}
            fill={getColor(116)}
            stroke={stroke(116)}
            strokeWidth={getStrokeWidth(116)}
            data-led-index={getLEDIndex(116)}
            data-key-index={keyIndex(116)}
            data-layer={layer}
            points="582.3,447.9 583.6,453.9 585.1,460.5 586.5,467.2 588.2,473.6 590.2,482.4 592.2,491.4 594,500.2
		596.1,509.4 585.1,511.6 583.3,502.5 580.9,493.7 578.9,484.5 576.9,476 575.2,469.3 574,462.7 572.4,456.7 571,450.6 	"
          />
          <polygon
            id="115_undeglow"
            onClick={e => {
              setUndeglowIndex(115, e);
            }}
            fill={getColor(115)}
            stroke={stroke(115)}
            strokeWidth={getStrokeWidth(115)}
            data-led-index={getLEDIndex(115)}
            data-key-index={keyIndex(115)}
            data-layer={layer}
            points="581.6,445.4 580.6,440.4 579.6,435.6 578.2,430.9 577.2,426.4 576.2,422.3 575.6,419 574.9,416.2
		574.2,413.1 573.7,410.5 573.4,407.8 572.7,406 572,404 571,402.2 570,400.7 568.7,399.3 567.3,397.6 566,396.5 564.6,395.1
		563.1,394.4 561.4,393.4 559.4,392.7 558.1,392.4 556.4,392.2 556.1,392.2 555.4,392.2 555.1,392.2 554.9,392.2 554.5,392.2
		554.2,392.2 553.9,392.2 551.2,392.2 548.5,391.9 545.8,391.9 543,391.9 543,404 552.9,404 554.2,404 555.4,404.3 556.7,405
		558.1,405.7 559.1,406.4 560.1,407.4 561.1,408.8 561.8,410.2 562.1,411.6 562.4,413.5 563.1,415.9 563.8,418.6 564.5,421.4
		565,424.3 565.6,427.8 566.6,431.6 567.7,435.2 568.3,439.4 569.3,443.7 570.3,448.2 	"
          />
          <polygon
            id="117_undeglow"
            onClick={e => {
              setUndeglowIndex(117, e);
            }}
            fill={getColor(117)}
            stroke={stroke(117)}
            strokeWidth={getStrokeWidth(117)}
            data-led-index={getLEDIndex(117)}
            data-key-index={keyIndex(117)}
            data-layer={layer}
            points="596.7,511.6 585.8,514 588.2,524.6 590.5,534.8 592.9,544.6 594.4,551 595.7,557.3 597.1,563.3
		598.8,569.5 600.1,575.2 601.4,580.9 612,578.7 610.7,572.8 609.3,567.5 608,561.2 606.7,555.2 605.3,549.1 603.6,542.6
		602.1,535.1 600.4,527.4 598.4,519.6 	"
          />
          <polygon
            id="118_undeglow"
            onClick={e => {
              setUndeglowIndex(118, e);
            }}
            fill={getColor(118)}
            stroke={stroke(118)}
            strokeWidth={getStrokeWidth(118)}
            data-led-index={getLEDIndex(118)}
            data-key-index={keyIndex(118)}
            data-layer={layer}
            points="612.4,580.9 613.2,584.7 614.2,588.5 614.9,591.8 615.6,595.3 616.6,598.7 617.2,601.7 617.9,604.8
		618.2,607.6 618.9,610 619.6,611.5 619.9,612.9 620.9,614.3 621.9,615.7 622.8,617.1 623.8,618.1 625.1,618.8 626.5,619.8
		628.2,620.3 629.5,620.7 631.2,621 632.7,621 633,621 633.4,621 633.7,621 635.1,621 637.1,621 638.8,621 638.8,633.3 632.4,633.3
		630.2,633 627.8,632.6 625.5,632.3 623.5,631.2 621.6,630.5 619.6,629.3 617.9,628.3 616.2,626.6 614.5,624.8 612.9,623.1
		611.7,621 610.7,619.1 609.7,616.7 609,614.3 608.3,611.2 607.7,608.2 607,605.1 606,601.7 605.3,598.4 604.3,593.6 603.1,588.5
		601.8,583.4 	"
          />
          <polygon
            id="119_undeglow"
            onClick={e => {
              setUndeglowIndex(119, e);
            }}
            fill={getColor(119)}
            stroke={stroke(119)}
            strokeWidth={getStrokeWidth(119)}
            data-led-index={getLEDIndex(119)}
            data-key-index={keyIndex(119)}
            data-layer={layer}
            points="641.1,621 644.3,621 647.7,621 651,621 654.6,621 658.6,621 662.5,621 666.5,621 672,621 677.7,621
		683.6,621 689.8,621 696.2,621 702.8,621 709.7,621 709.7,633.3 641.1,633.3 	"
          />
          <polygon
            id="120_undeglow"
            onClick={e => {
              setUndeglowIndex(120, e);
            }}
            fill={getColor(120)}
            stroke={stroke(120)}
            strokeWidth={getStrokeWidth(120)}
            data-led-index={getLEDIndex(120)}
            data-key-index={keyIndex(120)}
            data-layer={layer}
            points="712,621 719.9,621 728.3,621 736.6,621 745.1,621 753.7,621 762.3,621 771.2,621 780.1,621
		780.1,633.3 712,633.3 	"
          />
          <polygon
            id="121_undeglow"
            onClick={e => {
              setUndeglowIndex(121, e);
            }}
            fill={getColor(121)}
            stroke={stroke(121)}
            strokeWidth={getStrokeWidth(121)}
            data-led-index={getLEDIndex(121)}
            data-key-index={keyIndex(121)}
            data-layer={layer}
            points="782.8,633.3 855.7,633.3 855.7,621 841.3,621 826.7,621 811.9,621 797.2,621 782.8,621 	"
          />
          <polygon
            id="122_undeglow"
            onClick={e => {
              setUndeglowIndex(122, e);
            }}
            fill={getColor(122)}
            stroke={stroke(122)}
            strokeWidth={getStrokeWidth(122)}
            data-led-index={getLEDIndex(122)}
            data-key-index={keyIndex(122)}
            data-layer={layer}
            points="858.1,621 869.3,621 880.3,621 890.9,621 899.1,621 907,621 914.6,621 921.8,621 929.2,621
		929.2,633.3 858.1,633.3 	"
          />
          <polygon
            id="123_undeglow"
            onClick={e => {
              setUndeglowIndex(123, e);
            }}
            fill={getColor(123)}
            stroke={stroke(123)}
            strokeWidth={getStrokeWidth(123)}
            data-led-index={getLEDIndex(123)}
            data-key-index={keyIndex(123)}
            data-layer={layer}
            points="994.6,617.4 992.5,618.8 990.5,619.8 988.2,620.3 987,620.7 985.3,621 984,621 983.3,621 983,621
		982.6,621 979.6,621 976.4,621 972.7,621 969,621 965.5,621 961.1,621 957.2,621 952.2,621 947.3,621 942.3,621 937.1,621
		931.7,621 931.7,633.3 984,633.3 986.7,633 989.2,632.6 991.5,632.3 993.9,631.6 996.2,630.5 998.4,629.7 1000.4,628.6 	"
          />
          <polygon
            id="124_undeglow"
            onClick={e => {
              setUndeglowIndex(124, e);
            }}
            fill={getColor(124)}
            stroke={stroke(124)}
            strokeWidth={getStrokeWidth(124)}
            data-led-index={getLEDIndex(124)}
            data-key-index={keyIndex(124)}
            data-layer={layer}
            points="1006.7,540.3 1005.8,557.3 1005.8,562.3 1005.5,567.5 1005.5,572.1 1005.1,577 1005.1,581.3
		1004.8,585.4 1004.8,589.6 1004.5,592.9 1004.5,596.7 1004.5,600.1 1004.1,602 1003.8,604.1 1003.1,606.2 1002.5,608.2
		1001.5,610.1 1000.4,611.9 999.1,613.3 997.8,615 996.6,616 1002.5,627.3 1004.8,625.5 1006.8,623.8 1008.3,621.7 1010,619.8
		1011.4,617.7 1012.7,615.3 1013.7,613.3 1014.7,610.8 1015.4,608.6 1016.1,606.2 1016.4,603.4 1016.7,601 1016.7,596.3
		1017.1,591.5 1017.1,586.8 1017.3,581.3 1017.3,575.9 1017.6,570.2 1017.9,564.3 1017.9,558.3 1018.8,540.5 	"
          />
          <polygon
            id="125_undeglow"
            onClick={e => {
              setUndeglowIndex(125, e);
            }}
            fill={getColor(125)}
            stroke={stroke(125)}
            strokeWidth={getStrokeWidth(125)}
            data-led-index={getLEDIndex(125)}
            data-key-index={keyIndex(125)}
            data-layer={layer}
            points="1007.3,536.5 1019.4,536.9 1019.8,529.8 1020.1,523 1020.4,515.9 1020.4,508.3 1021.1,498.8
		1021.5,489.3 1021.8,479.5 1022.6,446.3 1010.4,446 1009.5,479.5 1009.2,489.3 1008.8,498.8 1008.5,508.3 1008.2,515.6
		1007.8,522.7 1007.7,529.8 	"
          />
          <polygon
            id="126_undeglow"
            onClick={e => {
              setUndeglowIndex(126, e);
            }}
            fill={getColor(126)}
            stroke={stroke(126)}
            strokeWidth={getStrokeWidth(126)}
            data-led-index={getLEDIndex(126)}
            data-key-index={keyIndex(126)}
            data-layer={layer}
            points="1013.7,350.4 1013.7,357.1 1013.4,363.9 1013,371.1 1012.7,378.2 1012.4,385.6 1012,395.5
		1011.7,405.3 1010.7,443 1022.6,443.4 1024,405.7 1024.3,395.5 1024.6,386 1025,378.5 1025,371.5 1025.3,364.2 1025.7,357.1
		1026,350.7 	"
          />
          <polygon
            id="127_undeglow"
            onClick={e => {
              setUndeglowIndex(127, e);
            }}
            fill={getColor(127)}
            stroke={stroke(127)}
            strokeWidth={getStrokeWidth(127)}
            data-led-index={getLEDIndex(127)}
            data-key-index={keyIndex(127)}
            data-layer={layer}
            points="1015.7,285.4 1016.1,287.8 1016.1,290.2 1016.1,292 1016.1,293.9 1016.1,297 1015.7,300.4
		1015.7,303.7 1015.4,307.9 1015.4,311.7 1015.1,316 1015.1,320.5 1014.7,325.5 1014.7,330.7 1014.4,336.4 1014.1,341.9 1014.1,348
		1026,348 1026.3,341.9 1026.7,335.7 1026.7,329.6 1026.8,323.8 1026.8,318.4 1027.2,314.3 1027.2,310.3 1027.5,306.5 1027.5,303.2
		1027.8,299.4 1027.8,296.3 1027.8,293.3 1028.2,290.6 1028.2,288.2 1027.8,285 	"
          />
          <polygon
            id="128_undeglow"
            onClick={e => {
              setUndeglowIndex(128, e);
            }}
            fill={getColor(128)}
            stroke={stroke(128)}
            strokeWidth={getStrokeWidth(128)}
            data-led-index={getLEDIndex(128)}
            data-key-index={keyIndex(128)}
            data-layer={layer}
            points="1015.4,283.1 1014.7,280.4 1013.7,277.6 1012.7,274.8 1011.7,272.6 1010.4,270.2 1009,267.8
		1007.5,265.7 1005.5,263.1 1003.5,260 1001.5,256.9 999.1,254.1 997.2,251.2 994.9,248.1 992.5,244.9 990.5,242 988.5,239.2
		998.8,232.8 1000.8,235.4 1002.8,237.9 1004.5,241 1006.8,243.7 1008.7,246.3 1010.7,249.4 1012.7,252.2 1014.7,254.8
		1016.4,257.6 1018.3,260 1019.9,262.4 1021.6,265 1023,267.8 1024.3,270.5 1025.7,273.3 1026.7,276.2 1027.2,279.3 1027.5,282.4
		"
          />
          <polygon
            id="129_undeglow"
            onClick={e => {
              setUndeglowIndex(129, e);
            }}
            fill={getColor(129)}
            stroke={stroke(129)}
            strokeWidth={getStrokeWidth(129)}
            data-led-index={getLEDIndex(129)}
            data-key-index={keyIndex(129)}
            data-layer={layer}
            points="978.9,182.4 978.9,199.5 978.9,203.3 978.9,206.6 978.9,209.7 978.9,212.8 978.9,213.5 978.9,214.2
		978.9,214.4 978.9,214.7 979.3,215 979.3,216.1 979.3,217.8 979.6,220.2 979.9,222.6 980.6,224.5 981.6,227 982.3,229.4
		983.6,231.8 985,233.9 986.3,235.8 986.7,236.5 987.3,237.2 997.6,230.8 997.2,230.4 995.9,228.4 994.6,226.3 993.6,224 992.9,222
		991.9,219.5 991.5,217.1 990.9,214.7 990.9,212.5 990.5,209.7 990.5,182.4 	"
          />
          <polygon
            id="130_undeglow"
            onClick={e => {
              setUndeglowIndex(130, e);
            }}
            fill={getColor(130)}
            stroke={stroke(130)}
            strokeWidth={getStrokeWidth(130)}
            data-led-index={getLEDIndex(130)}
            data-key-index={keyIndex(130)}
            data-layer={layer}
            points="978.9,129.8 978.9,136.9 978.9,144.5 978.9,152 978.9,159.2 978.9,163.7 978.9,168.2 978.9,172.5
		978.9,176.7 978.9,180.6 990.5,180.6 990.5,129.8 	"
          />
          <polygon
            id="100_undeglow"
            onClick={e => {
              setUndeglowIndex(100, e);
            }}
            fill={getColor(100)}
            stroke={stroke(100)}
            strokeWidth={getStrokeWidth(100)}
            data-led-index={getLEDIndex(100)}
            data-key-index={keyIndex(100)}
            data-layer={layer}
            points="978.9,31.7 978.9,33.9 978.9,36.2 978.9,38.6 978.9,41.2 978.9,44.1 978.9,47.9 978.9,51.7
		978.9,55.7 978.9,60.2 978.9,64.7 978.9,69.5 978.9,74.4 978.9,79.4 990.5,79.4 990.5,31.7 	"
          />
          <polygon
            id="99_undeglow"
            onClick={e => {
              setUndeglowIndex(99, e);
            }}
            fill={getColor(99)}
            stroke={stroke(99)}
            strokeWidth={getStrokeWidth(99)}
            data-led-index={getLEDIndex(99)}
            data-key-index={keyIndex(99)}
            data-layer={layer}
            points="978.9,80.9 978.9,83.2 978.9,85.4 978.9,87.8 978.9,90.4 978.9,93.4 978.9,97.2 978.9,101
		978.9,104.9 978.9,109.6 978.9,114.1 978.9,118.8 978.9,123.8 978.9,128.8 990.5,128.8 990.5,80.9 	"
          />
          <polygon
            id="101_undeglow"
            onClick={e => {
              setUndeglowIndex(101, e);
            }}
            fill={getColor(101)}
            stroke={stroke(101)}
            strokeWidth={getStrokeWidth(101)}
            data-led-index={getLEDIndex(101)}
            data-key-index={keyIndex(101)}
            data-layer={layer}
            points="917.6,1.4 970,1.4 972.4,1.8 974.7,2.1 977.1,2.8 978.9,3.8 980.3,4.9 982,5.9 983.3,7.1 984.6,8.5
		986,9.9 987,11.3 988,13 988.8,14.7 989.5,16.3 989.9,18 990.2,19.7 990.5,21.8 990.5,23.5 990.5,30.3 978.9,30.3 978.9,27.5
		978.9,24.9 978.9,24.6 978.9,24.2 978.9,23.2 978.6,22.2 978.4,21.1 978.1,19.7 977.1,18.4 976.1,17 975.1,16.3 974.1,15.4
		972.7,14.7 971.4,14.4 970,14 968.5,14 968.2,14 967.8,14 967.5,14 965.8,14 963.8,14 961.8,14 959.3,14 956.6,14 953.9,14
		950.9,14 947,14 942.6,14 938.1,14 933,14 928.2,14 922.8,14 917.6,14 	"
          />
          <polygon
            id="103_undeglow"
            onClick={e => {
              setUndeglowIndex(103, e);
            }}
            fill={getColor(103)}
            stroke={stroke(103)}
            strokeWidth={getStrokeWidth(103)}
            data-led-index={getLEDIndex(103)}
            data-key-index={keyIndex(103)}
            data-layer={layer}
            points="772.5,14 783.1,14 793.4,14 803.3,14 813.2,14 822.8,14 832,14 841.3,14 841.3,1.8 772.5,1.8 	"
          />
          <polygon
            id="104_undeglow"
            onClick={e => {
              setUndeglowIndex(104, e);
            }}
            fill={getColor(104)}
            stroke={stroke(104)}
            strokeWidth={getStrokeWidth(104)}
            data-led-index={getLEDIndex(104)}
            data-key-index={keyIndex(104)}
            data-layer={layer}
            points="701.1,14 713,14 724.6,14 736.6,14 747.7,14 758.9,14 770.2,14 770.2,1.8 701.1,1.8 	"
          />
          <polygon
            id="105_undeglow"
            onClick={e => {
              setUndeglowIndex(105, e);
            }}
            fill={getColor(105)}
            stroke={stroke(105)}
            strokeWidth={getStrokeWidth(105)}
            data-led-index={getLEDIndex(105)}
            data-key-index={keyIndex(105)}
            data-layer={layer}
            points="625.1,14 640.1,14 654.9,14 669.8,14 684.3,14 698.6,14 698.6,1.8 625.1,2.1 	"
          />
          <polygon
            id="106_undeglow"
            onClick={e => {
              setUndeglowIndex(106, e);
            }}
            fill={getColor(106)}
            stroke={stroke(106)}
            strokeWidth={getStrokeWidth(106)}
            data-led-index={getLEDIndex(106)}
            data-key-index={keyIndex(106)}
            data-layer={layer}
            points="553.5,2.1 622.8,2.1 622.8,14 605.6,14 588.2,14 571,14 553.5,14 	"
          />
          <rect
            id="108_undeglow"
            onClick={e => {
              setUndeglowIndex(108, e);
            }}
            fill={getColor(108)}
            stroke={stroke(108)}
            strokeWidth={getStrokeWidth(108)}
            data-led-index={getLEDIndex(108)}
            data-key-index={keyIndex(108)}
            data-layer={layer}
            x="481.4"
            y="16.3"
            width="6.9"
            height="47.2"
          />
          <polygon
            id="109_undeglow"
            onClick={e => {
              setUndeglowIndex(109, e);
            }}
            fill={getColor(109)}
            stroke={stroke(109)}
            strokeWidth={getStrokeWidth(109)}
            data-led-index={getLEDIndex(109)}
            data-key-index={keyIndex(109)}
            data-layer={layer}
            points="462.6,118.9 462.6,96.1 480.8,96.1 482.1,95.8 483.5,95.4 484.8,95.3 485.8,94.2 486.5,93.5
		487.5,92.2 487.7,91.1 488.3,89.7 488.3,88.4 488.3,67.4 481.4,67.4 481.4,88.4 481.4,88.7 481.1,89 480.8,89 480.8,89 459.3,89
		458.4,89.4 457.7,89.4 457.1,90.1 456.7,90.4 456.1,91.1 456.1,91.8 455.7,92.8 455.7,118.9 	"
          />
          <polygon
            id="110_undeglow"
            onClick={e => {
              setUndeglowIndex(110, e);
            }}
            fill={getColor(110)}
            stroke={stroke(110)}
            strokeWidth={getStrokeWidth(110)}
            data-led-index={getLEDIndex(110)}
            data-key-index={keyIndex(110)}
            data-layer={layer}
            points="462.6,121.7 462.6,125.3 470.8,125.3 471.5,125.3 472.5,125.7 473.5,126 474.2,126.7 475.2,127.8
		475.9,128.8 476.6,129.8 477.2,131.2 477.6,132.3 477.9,133.6 478.1,134.7 478.1,135.5 478.1,136.6 478.1,181.2 482.1,181.2
		482.1,187.9 474.9,187.9 474.2,187.9 473.5,187.6 472.9,187.2 472.2,186.9 471.9,186.2 471.5,185.5 471.5,184.5 471.5,136.6
		471.5,135.9 471.5,135.5 471.2,134.7 470.8,134 470.5,133.3 470.2,132.9 470.2,132.3 459.3,132.3 458.4,132.3 457.7,131.9
		457.1,131.6 456.7,131.2 456.1,130.5 456.1,129.8 455.7,128.8 455.7,121.7 	"
          />
          <polygon
            id="111_undeglow"
            onClick={e => {
              setUndeglowIndex(111, e);
            }}
            fill={getColor(111)}
            stroke={stroke(111)}
            strokeWidth={getStrokeWidth(111)}
            data-led-index={getLEDIndex(111)}
            data-key-index={keyIndex(111)}
            data-layer={layer}
            points="484.5,181.2 495.4,181.2 496.7,181.2 497.9,181.9 499.3,182.2 500.3,183.2 501.3,183.9 501.9,185.1
		502.6,186.2 502.9,187.6 502.9,188.9 502.9,241.7 496.4,241.7 496.4,188.9 496.4,188.6 496.1,188.6 496.1,188.3 495.7,188.3
		495.4,187.9 484.5,187.9 	"
          />
          <polyline
            id="107_undeglow"
            onClick={e => {
              setUndeglowIndex(107, e);
            }}
            fill={getColor(107)}
            stroke={stroke(107)}
            strokeWidth={getStrokeWidth(107)}
            data-led-index={getLEDIndex(107)}
            data-key-index={keyIndex(107)}
            data-layer={layer}
            points="551.2,2.1 481.4,2.1 481.4,14 488.3,14 519.8,14 551.2,14 	"
          />
          <polygon
            id="102_undeglow"
            onClick={e => {
              setUndeglowIndex(102, e);
            }}
            fill={getColor(102)}
            stroke={stroke(102)}
            strokeWidth={getStrokeWidth(102)}
            data-led-index={getLEDIndex(102)}
            data-key-index={keyIndex(102)}
            data-layer={layer}
            points="915.2,14 909.7,14 904,14 898.4,14 892.4,14 886.5,14 879.6,14 872.9,14 865.6,14 858.4,14 851.2,14
		843.6,14 843.6,1.8 915.2,1.4 	"
          />
          <g id="labels" pointerEvents="none">
            <text id="R4C9_t_primary" fill={getContrastText(getColor(4, 9))}>
              {getCenterPrimary(4, 9, 600, 351, true)}
            </text>
            <text id="R4C9_t_extra" fill={getContrastText(getColor(4, 9))}>
              {getCenterExtra(4, 9, 600, 337, true)}
            </text>
            <text id="R4C8_t_primary" fill={getContrastText(getColor(4, 8))}>
              {getCenterPrimary(4, 8, 535, 351, true)}
            </text>
            <text id="R4C8_t_extra" fill={getContrastText(getColor(4, 8))}>
              {getCenterExtra(4, 8, 535, 337, true)}
            </text>
            <text id="R4C7_t_primary" fill={getContrastText(getColor(4, 7))}>
              {getCenterPrimary(4, 7, 436, 351, true)}
            </text>
            <text id="R4C7_t_extra" fill={getContrastText(getColor(4, 7))}>
              {getCenterExtra(4, 7, 436, 337, true)}
            </text>
            <text id="R4C6_t_primary" fill={getContrastText(getColor(4, 6))}>
              {getCenterPrimary(4, 6, 368, 351, true)}
            </text>
            <text id="R4C6_t_extra" fill={getContrastText(getColor(4, 6))}>
              {getCenterExtra(4, 6, 368, 337, true)}
            </text>
            <text id="R4C15_t_primary" fill={getContrastText(getColor(4, 15))}>
              {getCenterPrimary(4, 15, 937, 294.5, true)}
            </text>
            <text id="R4C15_t_extra" fill={getContrastText(getColor(4, 15))}>
              {getCenterExtra(4, 15, 937, 280, true)}
            </text>
            <text id="R4C14_t_primary" fill={getContrastText(getColor(4, 14))}>
              {getCenterPrimary(4, 14, 870, 294.5, true)}
            </text>
            <text id="R4C14_t_extra" fill={getContrastText(getColor(4, 14))}>
              {getCenterExtra(4, 14, 870, 280, true)}
            </text>
            <text id="R4C13_t_primary" fill={getContrastText(getColor(4, 13))}>
              {getCenterPrimary(4, 13, 803, 294.5, true)}
            </text>
            <text id="R4C13_t_extra" fill={getContrastText(getColor(4, 13))}>
              {getCenterExtra(4, 13, 803, 280, true)}
            </text>
            <text id="R4C12_t_primary" fill={getContrastText(getColor(4, 12))}>
              {getCenterPrimary(4, 12, 728, 294.5, true)}
            </text>
            <text id="R4C12_t_extra" fill={getContrastText(getColor(4, 12))}>
              {getCenterExtra(4, 12, 728, 280, true)}
            </text>
            <text id="R4C11_t_primary" fill={getContrastText(getColor(4, 11))}>
              {getCenterPrimary(4, 11, 648, 294.5, true)}
            </text>
            <text id="R4C11_t_extra" fill={getContrastText(getColor(4, 11))}>
              {getCenterExtra(4, 11, 648, 280, true)}
            </text>
            <text id="R4C10_t_primary" fill={getContrastText(getColor(4, 10))}>
              {getCenterPrimary(4, 10, 557, 294.5)}
            </text>
            <text id="R4C10_t_extra" fill={getContrastText(getColor(4, 10))}>
              {getCenterExtra(4, 10, 557, 280)}
            </text>
            <text id="R4C4_t_primary" fill={getContrastText(getColor(4, 4))}>
              {getCenterPrimary(4, 4, 414, 294.5)}
            </text>
            <text id="R4C4_t_extra" fill={getContrastText(getColor(4, 4))}>
              {getCenterExtra(4, 4, 414, 280)}
            </text>
            <text id="R4C3_t_primary" fill={getContrastText(getColor(4, 3))}>
              {getCenterPrimary(4, 3, 320, 294.5, true)}
            </text>
            <text id="R4C3_t_extra" fill={getContrastText(getColor(4, 3))}>
              {getCenterExtra(4, 3, 320, 280, true)}
            </text>
            <text id="R4C2_t_primary" fill={getContrastText(getColor(4, 2))}>
              {getCenterPrimary(4, 2, 240, 294.5, true)}
            </text>
            <text id="R4C2_t_extra" fill={getContrastText(getColor(4, 2))}>
              {getCenterExtra(4, 2, 240, 280, true)}
            </text>
            <text id="R4C1_t_primary" fill={getContrastText(getColor(4, 1))}>
              {getCenterPrimary(4, 1, 165, 294.5, true)}
            </text>
            <text id="R4C1_t_extra" fill={getContrastText(getColor(4, 1))}>
              {getCenterExtra(4, 1, 165, 280, true)}
            </text>
            <text id="R4C0_t_primary" fill={getContrastText(getColor(4, 0))}>
              {getCenterPrimary(4, 0, 90, 294.5, true)}
            </text>
            <text id="R4C0_t_extra" fill={getContrastText(getColor(4, 0))}>
              {getCenterExtra(4, 0, 90, 280, true)}
            </text>
            <text id="R3C15_t_primary" fill={getContrastText(getColor(3, 15))}>
              {getCenterPrimary(3, 15, 890, 233.5)}
            </text>
            <text id="R3C15_t_extra" fill={getContrastText(getColor(3, 15))}>
              {getCenterExtra(3, 15, 890, 219)}
            </text>
            <text id="R3C14_t_primary" fill={getContrastText(getColor(3, 14))}>
              {getCenterPrimary(3, 14, 783, 233.5, true)}
            </text>
            <text id="R3C14_t_extra" fill={getContrastText(getColor(3, 14))}>
              {getCenterExtra(3, 14, 783, 219, true)}
            </text>
            <text id="R3C13_t_primary" fill={getContrastText(getColor(3, 13))}>
              {getCenterPrimary(3, 13, 724, 233.5, true)}
            </text>
            <text id="R3C13_t_extra" fill={getContrastText(getColor(3, 13))}>
              {getCenterExtra(3, 13, 724, 219, true)}
            </text>
            <text id="R3C12_t_primary" fill={getContrastText(getColor(3, 12))}>
              {getCenterPrimary(3, 12, 665, 233.5, true)}
            </text>
            <text id="R3C12_t_extra" fill={getContrastText(getColor(3, 12))}>
              {getCenterExtra(3, 12, 665, 219, true)}
            </text>
            <text id="R3C11_t_primary" fill={getContrastText(getColor(3, 11))}>
              {getCenterPrimary(3, 11, 605, 233.5, true)}
            </text>
            <text id="R3C11_t_extra" fill={getContrastText(getColor(3, 11))}>
              {getCenterExtra(3, 11, 605, 219, true)}
            </text>
            <text id="R3C10_t_primary" fill={getContrastText(getColor(3, 10))}>
              {getCenterPrimary(3, 10, 549, 233.5, true)}
            </text>
            <text id="R3C10_t_extra" fill={getContrastText(getColor(3, 10))}>
              {getCenterExtra(3, 10, 549, 219, true)}
            </text>
            <text id="R3C6_t_primary" fill={getContrastText(getColor(3, 6))}>
              {getCenterPrimary(3, 6, 437, 233.5, true)}
            </text>
            <text id="R3C6_t_extra" fill={getContrastText(getColor(3, 6))}>
              {getCenterExtra(3, 6, 437, 219, true)}
            </text>
            <text id="R3C5_t_primary" fill={getContrastText(getColor(3, 5))}>
              {getCenterPrimary(3, 5, 377, 233.5, true)}
            </text>
            <text id="R3C5_t_extra" fill={getContrastText(getColor(3, 5))}>
              {getCenterExtra(3, 5, 377, 219, true)}
            </text>
            <text id="R3C4_t_primary" fill={getContrastText(getColor(3, 4))}>
              {getCenterPrimary(3, 4, 320, 233.5, true)}
            </text>
            <text id="R3C4_t_extra" fill={getContrastText(getColor(3, 4))}>
              {getCenterExtra(3, 4, 320, 219, true)}
            </text>
            <text id="R3C3_t_primary" fill={getContrastText(getColor(3, 3))}>
              {getCenterPrimary(3, 3, 261, 233.5, true)}
            </text>
            <text id="R3C3_t_extra" fill={getContrastText(getColor(3, 3))}>
              {getCenterExtra(3, 3, 261, 219, true)}
            </text>
            <text id="R3C2_t_primary" fill={getContrastText(getColor(3, 2))}>
              {getCenterPrimary(3, 2, 201, 233.5, true)}
            </text>
            <text id="R3C2_t_extra" fill={getContrastText(getColor(3, 2))}>
              {getCenterExtra(3, 2, 201, 219, true)}
            </text>
            <text id="R3C0_t_primary" fill={getContrastText(getColor(3, 0))}>
              {getCenterPrimary(3, 0, 115, 233.5)}
            </text>
            <text id="R3C0_t_extra" fill={getContrastText(getColor(3, 0))}>
              {getCenterExtra(3, 0, 115, 219)}
            </text>
            <text id="R2C15_t_primary" fill={getContrastText(getColor(2, 15))}>
              {getCenterPrimary(2, 15, 930, 115)}
            </text>
            <text id="R2C15_t_extra" fill={getContrastText(getColor(2, 15))}>
              {getCenterExtra(2, 15, 930, 100)}
            </text>
            <text id="R2C14_t_primary" fill={getContrastText(getColor(2, 14))}>
              {getCenterPrimary(2, 14, 828, 174, true)}
            </text>
            <text id="R2C14_t_extra" fill={getContrastText(getColor(2, 14))}>
              {getCenterExtra(2, 14, 828, 159, true)}
            </text>
            <text id="R2C13_t_primary" fill={getContrastText(getColor(2, 13))}>
              {getCenterPrimary(2, 13, 771, 174, true)}
            </text>
            <text id="R2C13_t_extra" fill={getContrastText(getColor(2, 13))}>
              {getCenterExtra(2, 13, 771, 159, true)}
            </text>
            <text id="R2C12_t_primary" fill={getContrastText(getColor(2, 12))}>
              {getCenterPrimary(2, 12, 712, 174, true)}
            </text>
            <text id="R2C12_t_extra" fill={getContrastText(getColor(2, 12))}>
              {getCenterExtra(2, 12, 712, 159, true)}
            </text>
            <text id="R2C11_t_primary" fill={getContrastText(getColor(2, 11))}>
              {getCenterPrimary(2, 11, 654, 174, true)}
            </text>
            <text id="R2C11_t_extra" fill={getContrastText(getColor(2, 11))}>
              {getCenterExtra(2, 11, 654, 159, true)}
            </text>
            <text id="R2C10_t_primary" fill={getContrastText(getColor(2, 10))}>
              {getCenterPrimary(2, 10, 594, 174, true)}
            </text>
            <text id="R2C10_t_extra" fill={getContrastText(getColor(2, 10))}>
              {getCenterExtra(2, 10, 594, 159, true)}
            </text>
            <text id="R2C9_t_primary" fill={getContrastText(getColor(2, 9))}>
              {getCenterPrimary(2, 9, 535, 174, true)}
            </text>
            <text id="R2C9_t_extra" fill={getContrastText(getColor(2, 9))}>
              {getCenterExtra(2, 9, 535, 159, true)}
            </text>
            <text id="R2C5_t_primary" fill={getContrastText(getColor(2, 5))}>
              {getCenterPrimary(2, 5, 413, 174, true)}
            </text>
            <text id="R2C5_t_extra" fill={getContrastText(getColor(2, 5))}>
              {getCenterExtra(2, 5, 413, 159, true)}
            </text>
            <text id="R2C4_t_primary" fill={getContrastText(getColor(2, 4))}>
              {getCenterPrimary(2, 4, 355, 174, true)}
            </text>
            <text id="R2C4_t_extra" fill={getContrastText(getColor(2, 4))}>
              {getCenterExtra(2, 4, 355, 159, true)}
            </text>
            <text id="R2C3_t_primary" fill={getContrastText(getColor(2, 3))}>
              {getCenterPrimary(2, 3, 297, 174, true)}
            </text>
            <text id="R2C3_t_extra" fill={getContrastText(getColor(2, 3))}>
              {getCenterExtra(2, 3, 297, 159, true)}
            </text>
            <text id="R2C2_t_primary" fill={getContrastText(getColor(2, 2))}>
              {getCenterPrimary(2, 2, 238, 174, true)}
            </text>
            <text id="R2C2_t_extra" fill={getContrastText(getColor(2, 2))}>
              {getCenterExtra(2, 2, 238, 159, true)}
            </text>
            <text id="R2C1_t_primary" fill={getContrastText(getColor(2, 1))}>
              {getCenterPrimary(2, 1, 180, 174, true)}
            </text>
            <text id="R2C1_t_extra" fill={getContrastText(getColor(2, 1))}>
              {getCenterExtra(2, 1, 180, 159, true)}
            </text>
            <text id="R2C0_t_primary" fill={getContrastText(getColor(2, 0))}>
              {getCenterPrimary(2, 0, 103, 174)}
            </text>
            <text id="R2C0_t_extra" fill={getContrastText(getColor(2, 0))}>
              {getCenterExtra(2, 0, 103, 159)}
            </text>
            <text id="R1C15_t_primary" fill={getContrastText(getColor(1, 15))}>
              {getCenterPrimary(1, 15, 915, 174)}
            </text>
            <text id="R1C15_t_extra" fill={getContrastText(getColor(1, 15))}>
              {getCenterExtra(1, 15, 915, 158)}
            </text>
            <text id="R1C14_t_primary" fill={getContrastText(getColor(1, 14))}>
              {getCenterPrimary(1, 14, 860, 114.5, true)}
            </text>
            <text id="R1C14_t_extra" fill={getContrastText(getColor(1, 14))}>
              {getCenterExtra(1, 14, 860, 100, true)}
            </text>
            <text id="R1C13_t_primary" fill={getContrastText(getColor(1, 13))}>
              {getCenterPrimary(1, 13, 805, 114.5, true)}
            </text>
            <text id="R1C13_t_extra" fill={getContrastText(getColor(1, 13))}>
              {getCenterExtra(1, 13, 805, 100, true)}
            </text>
            <text id="R1C12_t_primary" fill={getContrastText(getColor(1, 12))}>
              {getCenterPrimary(1, 12, 745, 114.5, true)}
            </text>
            <text id="R1C12_t_extra" fill={getContrastText(getColor(1, 12))}>
              {getCenterExtra(1, 12, 745, 100, true)}
            </text>
            <text id="R1C11_t_primary" fill={getContrastText(getColor(1, 11))}>
              {getCenterPrimary(1, 11, 688, 114.5, true)}
            </text>
            <text id="R1C11_t_extra" fill={getContrastText(getColor(1, 11))}>
              {getCenterExtra(1, 11, 688, 100, true)}
            </text>
            <text id="R1C10_t_primary" fill={getContrastText(getColor(1, 10))}>
              {getCenterPrimary(1, 10, 630, 114.5, true)}
            </text>
            <text id="R1C10_t_extra" fill={getContrastText(getColor(1, 10))}>
              {getCenterExtra(1, 10, 630, 100, true)}
            </text>
            <text id="R1C9_t_primary" fill={getContrastText(getColor(1, 9))}>
              {getCenterPrimary(1, 9, 574, 114.5, true)}
            </text>
            <text id="R1C9_t_extra" fill={getContrastText(getColor(1, 9))}>
              {getCenterExtra(1, 9, 574, 100, true)}
            </text>
            <text id="R1C8_t_primary" fill={getContrastText(getColor(1, 8))}>
              {getCenterPrimary(1, 8, 516, 114.5, true)}
            </text>
            <text id="R1C8_t_extra" fill={getContrastText(getColor(1, 8))}>
              {getCenterExtra(1, 8, 516, 100, true)}
            </text>
            <text id="R1C5_t_primary" fill={getContrastText(getColor(1, 5))}>
              {getCenterPrimary(1, 5, 407, 114.5, true)}
            </text>
            <text id="R1C5_t_extra" fill={getContrastText(getColor(1, 5))}>
              {getCenterExtra(1, 5, 407, 100, true)}
            </text>
            <text id="R1C4_t_primary" fill={getContrastText(getColor(1, 4))}>
              {getCenterPrimary(1, 4, 348, 114.5, true)}
            </text>
            <text id="R1C4_t_extra" fill={getContrastText(getColor(1, 4))}>
              {getCenterExtra(1, 4, 348, 100, true)}
            </text>
            <text id="R1C3_t_primary" fill={getContrastText(getColor(1, 3))}>
              {getCenterPrimary(1, 3, 289, 114.5, true)}
            </text>
            <text id="R1C3_t_extra" fill={getContrastText(getColor(1, 3))}>
              {getCenterExtra(1, 3, 289, 100, true)}
            </text>
            <text id="R1C2_t_primary" fill={getContrastText(getColor(1, 2))}>
              {getCenterPrimary(1, 2, 230, 114.5, true)}
            </text>
            <text id="R1C2_t_extra" fill={getContrastText(getColor(1, 2))}>
              {getCenterExtra(1, 2, 230, 100, true)}
            </text>
            <text id="R1C1_t_primary" fill={getContrastText(getColor(1, 1))}>
              {getCenterPrimary(1, 1, 171, 114.5, true)}
            </text>
            <text id="R1C1_t_extra" fill={getContrastText(getColor(1, 1))}>
              {getCenterExtra(1, 1, 171, 100)}
            </text>
            <text id="R1C0_t_primary" fill={getContrastText(getColor(1, 0))}>
              {getCenterPrimary(1, 0, 100, 114.5)}
            </text>
            <text id="R1C0_t_extra" fill={getContrastText(getColor(1, 0))}>
              {getCenterExtra(1, 0, 100, 100)}
            </text>
            <text id="R0C15_t_primary" fill={getContrastText(getColor(0, 15))}>
              {getCenterPrimary(0, 15, 915, 55)}
            </text>
            <text id="R0C15_t_extra" fill={getContrastText(getColor(0, 15))}>
              {getCenterExtra(0, 15, 915, 40)}
            </text>
            <text id="R0C14_t_primary" fill={getContrastText(getColor(0, 14))}>
              {getCenterPrimary(0, 14, 828, 55, true)}
            </text>
            <text id="R0C14_t_extra" fill={getContrastText(getColor(0, 14))}>
              {getCenterExtra(0, 14, 828, 40, true)}
            </text>
            <text id="R0C13_t_primary" fill={getContrastText(getColor(0, 13))}>
              {getCenterPrimary(0, 13, 769, 55, true)}
            </text>
            <text id="R0C13_t_extra" fill={getContrastText(getColor(0, 13))}>
              {getCenterExtra(0, 13, 769, 40, true)}
            </text>
            <text id="R0C12_t_primary" fill={getContrastText(getColor(0, 12))}>
              {getCenterPrimary(0, 12, 711, 55, true)}
            </text>
            <text id="R0C12_t_extra" fill={getContrastText(getColor(0, 12))}>
              {getCenterExtra(0, 12, 711, 40, true)}
            </text>
            <text id="R0C11_t_primary" fill={getContrastText(getColor(0, 11))}>
              {getCenterPrimary(0, 11, 652, 55, true)}
            </text>
            <text id="R0C11_t_extra" fill={getContrastText(getColor(0, 11))}>
              {getCenterExtra(0, 11, 652, 40, true)}
            </text>
            <text id="R0C10_t_primary" fill={getContrastText(getColor(0, 10))}>
              {getCenterPrimary(0, 10, 593, 55, true)}
            </text>
            <text id="R0C10_t_extra" fill={getContrastText(getColor(0, 10))}>
              {getCenterExtra(0, 10, 593, 40, true)}
            </text>
            <text id="R0C9_t_primary" fill={getContrastText(getColor(0, 9))}>
              {getCenterPrimary(0, 9, 534, 55, true)}
            </text>
            <text id="R0C9_t_extra" fill={getContrastText(getColor(0, 9))}>
              {getCenterExtra(0, 9, 534, 40, true)}
            </text>
            <text id="R0C6_t_primary" fill={getContrastText(getColor(0, 6))}>
              {getCenterPrimary(0, 6, 435.5, 55, true)}
            </text>
            <text id="R0C6_t_extra" fill={getContrastText(getColor(0, 6))}>
              {getCenterExtra(0, 6, 435.5, 40, true)}
            </text>
            <text id="R0C5_t_primary" fill={getContrastText(getColor(0, 5))}>
              {getCenterPrimary(0, 5, 376, 55, true)}
            </text>
            <text id="R0C5_t_extra" fill={getContrastText(getColor(0, 5))}>
              {getCenterExtra(0, 5, 376, 40, true)}
            </text>
            <text id="R0C4_t_primary" fill={getContrastText(getColor(0, 4))}>
              {getCenterPrimary(0, 4, 317, 55, true)}
            </text>
            <text id="R0C4_t_extra" fill={getContrastText(getColor(0, 4))}>
              {getCenterExtra(0, 4, 317, 40, true)}
            </text>
            <text id="R0C3_t_primary" fill={getContrastText(getColor(0, 3))}>
              {getCenterPrimary(0, 3, 257, 55, true)}
            </text>
            <text id="R0C3_t_extra" fill={getContrastText(getColor(0, 3))}>
              {getCenterExtra(0, 3, 257, 40, true)}
            </text>
            <text id="R0C2_t_primary" fill={getContrastText(getColor(0, 2))}>
              {getCenterPrimary(0, 2, 200, 55, true)}
            </text>
            <text id="R0C2_t_extra" fill={getContrastText(getColor(0, 2))}>
              {getCenterExtra(0, 2, 200, 40, true)}
            </text>
            <text id="R0C1_t_primary" fill={getContrastText(getColor(0, 1))}>
              {getCenterPrimary(0, 1, 141, 55, true)}
            </text>
            <text id="R0C1_t_extra" fill={getContrastText(getColor(0, 1))}>
              {getCenterExtra(0, 1, 141, 40, true)}
            </text>
            <text id="R0C0_t_primary" fill={getContrastText(getColor(0, 0))}>
              {getCenterPrimary(0, 0, 83, 55, true)}
            </text>
            <text id="R0C0_t_extra" fill={getContrastText(getColor(0, 0))}>
              {getCenterExtra(0, 0, 83, 40, true)}
            </text>
          </g>
        </g>
      </svg>
    );
  }
}

export default KeymapANSI;
