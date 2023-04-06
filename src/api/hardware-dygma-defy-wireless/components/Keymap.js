// -*- mode: js-jsx -*-
/* Bazecor -- Kaleidoscope Command Center
 * Copyright (C) 2018, 2019  Keyboardio, Inc.
 * Copyright (C) 2019  DygmaLab SE
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
import Neuron from "../../hardware/Neuron";
import Key from "../../hardware/Key";
import UnderGlowStrip from "../../hardware/UnderGlowStrip";

const XX = 255;
const LEDS_LEFT_KEYS = 35;
const UNDERGLOW = 70;
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
    13,
    XX,
    XX,
    13 + LEDS_LEFT_KEYS,
    12 + LEDS_LEFT_KEYS,
    11 + LEDS_LEFT_KEYS,
    10 + LEDS_LEFT_KEYS,
    9 + LEDS_LEFT_KEYS,
    8 + LEDS_LEFT_KEYS,
    7 + LEDS_LEFT_KEYS
  ],
  [
    14,
    15,
    16,
    17,
    18,
    19,
    20,
    XX,
    XX,
    20 + LEDS_LEFT_KEYS,
    19 + LEDS_LEFT_KEYS,
    18 + LEDS_LEFT_KEYS,
    17 + LEDS_LEFT_KEYS,
    16 + LEDS_LEFT_KEYS,
    15 + LEDS_LEFT_KEYS,
    14 + LEDS_LEFT_KEYS
  ],
  [
    21,
    22,
    23,
    24,
    25,
    26,
    XX,
    XX,
    XX,
    XX,
    26 + LEDS_LEFT_KEYS,
    25 + LEDS_LEFT_KEYS,
    24 + LEDS_LEFT_KEYS,
    23 + LEDS_LEFT_KEYS,
    22 + LEDS_LEFT_KEYS,
    21 + LEDS_LEFT_KEYS
  ],
  [
    27,
    28,
    29,
    30,
    31,
    32,
    33,
    34,
    34 + LEDS_LEFT_KEYS,
    33 + LEDS_LEFT_KEYS,
    32 + LEDS_LEFT_KEYS,
    31 + LEDS_LEFT_KEYS,
    30 + LEDS_LEFT_KEYS,
    29 + LEDS_LEFT_KEYS,
    28 + LEDS_LEFT_KEYS,
    27 + LEDS_LEFT_KEYS
  ]
];

const no_key_led_map = [...Array.apply(0, Array(107)).map((_, i) => i + UNDERGLOW)];

const keysRowsPosition = {
  row1: 35,
  row2: 102,
  row3: 169,
  row4: 236,
  row5: 303,
  row6: 370
};

const keysRowsDefyPosition = {
  row1: {
    y0: 111,
    y1: 88,
    y2: 71,
    y3: 121
  },
  row2: {
    y0: 176,
    y1: 153,
    y2: 137,
    y3: 186
  },
  row3: {
    y0: 241,
    y1: 217,
    y2: 203,
    y3: 252
  },
  row4: {
    y0: 306,
    y1: 282,
    y2: 268
  }
};
const keysColumnsPosition = {
  x0: 105,
  x1: 171,
  x2: 236,
  x3: 301,
  x4: 366,
  x5: 431,
  x6: 497,
  x7: 718,
  x8: 783,
  x9: 848,
  x10: 913,
  x11: 978,
  x12: 1043,
  x13: 1107
};

class KeymapDEFY extends React.Component {
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
      // return this.props.theme
      //   ? this.props.theme.palette.getContrastText(color)
      //   : null;
      const colors = color.match(/\d+/g);
      if (colors == null || colors.length == 0) return "#000";
      let aux;
      if (colors[0] < 131 && colors[1] < 131) {
        aux = "#FFF";
      } else {
        aux = "#000";
      }
      return aux;
    };
    let keyIndex = (row, col) => {
      return col !== undefined ? row * 16 + col : row + 11;
    };

    let getLabel = (row, col) => {
      return keymap[keyIndex(row, col)];
    };

    let isSelected = (row, col) => {
      const selectIndex = keyIndex(row, col);
      return underglowIndex ? underglowIndex == selectIndex : this.props.selectedKey == selectIndex;
    };

    let stroke = (row, col) => (isSelected(row, col) ? (this.props.darkMode ? "#fff" : "#000") : "#b3b3b3");

    let getStrokeWidth = (row, col) => (isSelected(row, col) ? "3.0" : "1.5");

    const colormap =
      this.props.colormap ||
      Array(177)
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
    // console.log("showing BARS", colormap, palette, led_map, no_key_led_map);

    let getColor = (row, col) => {
      let ledIndex = col !== undefined ? led_map[parseInt(row)][parseInt(col)] : no_key_led_map[row - UNDERGLOW];
      let colorIndex = colormap[ledIndex];

      // console.log("testing colors", row, col, ledIndex, colorIndex, row - UNDERGLOW);

      let color = palette[colorIndex].rgb;
      return color;
    };

    let getLEDIndex = (row, col) => {
      return col !== undefined ? led_map[parseInt(row)][parseInt(col)] : no_key_led_map[row - UNDERGLOW];
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
        <>
          <span className={props.class} textAnchor="middle" x={props.x} y={props.y} dy={props.dy} textLength={props.textLength}>
            {props.word}{" "}
          </span>
        </>
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
      const interval = "1.1em";
      const longWords = str.split(" ");
      const shortWords = str.split("");
      if (numbers) {
        return (
          <GetCurrentKeyElement key={new Date() + Math.random()} x={xCord} y={String(+yCord - 5)} word={str} class="key-config" />
        );
      } else if (str.length === 1) {
        return shortWords.map((word, index) => (
          <GetCurrentKeyElement key={index} x={xCord} y={String(+yCord - 5)} word={word} class="letter-config" />
        ));
      } else if (str.toLowerCase().endsWith("to")) {
        return longWords.map((word, index) => (
          <span key={index}>
            <GetCurrentKeyElement x={xCord} y={String(+yCord + 9)} dy={0} word={word.slice(0, word.indexOf("to") - 1)} />
            <GetCurrentKeyElement x={String(+xCord - 5)} y={String(+yCord + 9)} dy={interval} word={word.slice(-2)} />
          </span>
        ));
      } else if (
        str.length > 8 &&
        smallKey === true &&
        (str.startsWith("C+") || str.startsWith("A+") || str.startsWith("AGr+"))
      ) {
        return <GetCurrentKeyElement key={new Date() + Math.random()} x={xCord} y={yCord} word={str} textLength="50" />;
      } else if (
        longWords.length === 1 &&
        shortWords.length > 7 &&
        !str.startsWith("C+") &&
        !str.startsWith("A+") &&
        !str.startsWith("AGr+") &&
        smallKey
      ) {
        return longWords.map((word, index) => (
          <span key={index}>
            <GetCurrentKeyElement x={xCord} y={String(+yCord - 10)} word={word.slice(0, 4)} dy={"0"} />
            {` `}
            <GetCurrentKeyElement x={xCord} y={String(+yCord - 10)} word={word.slice(4)} dy={interval} />
          </span>
        ));
      } else if (longWords.length === 1) {
        return longWords.map((word, index) => <GetCurrentKeyElement key={index} x={xCord} y={yCord} word={word} />);
      } else if (longWords.length > 1 && smallKey === true) {
        return longWords.map((word, index) => (
          <GetCurrentKeyElement key={index} x={xCord} y={String(+yCord - 10)} word={word} dy={index ? interval : index} />
        ));
      } else if (longWords.length > 1) {
        return <GetCurrentKeyElement key={new Date() + Math.random()} x={xCord} y={yCord} word={str} />;
      } else {
        return <GetCurrentKeyElement key={new Date() + Math.random()} x={xCord} y={yCord} word={str} />;
      }
    };
    const topsArr = ["LEDEFF.", "SCadet", "Steno", "M.Btn", "Leader", "Numpad", "Media", "OSL", "Mouse", "M.Wheel", "M.Warp"];
    const topsArrTransfer = ["SHIFTTO", "LockTo"];
    const getCenterExtra = (row, col, xCord, yCord, smallKey = false) =>
      getLabel(row, col).extraLabel !== ""
        ? topsArr.includes(getLabel(row, col).extraLabel)
          ? getLabel(row, col).extraLabel && getDivideKeys(getLabel(row, col).extraLabel, xCord, yCord - 5, smallKey)
          : getLabel(row, col).extraLabel && getDivideKeys(getLabel(row, col).extraLabel, xCord, String(+yCord - 5), smallKey)
        : getLabel(row, col).extraLabel === getLabel(row, col).extraLabel.toLowerCase().endsWith("to")
        ? getLabel(row, col).extraLabel && getDivideKeys(getLabel(row, col).extraLabel, xCord, yCord - 5, smallKey)
        : getLabel(row, col).extraLabel;

    const getCenterPrimary = (row, col, xCord, yCord, smallKey = false) =>
      getLabel(row, col).extraLabel !== ""
        ? topsArr.includes(getLabel(row, col).extraLabel)
          ? getLabel(row, col).label && getDivideKeys(getLabel(row, col).label, xCord, yCord + 5, smallKey)
          : topsArrTransfer.includes(getLabel(row, col).extraLabel)
          ? getLabel(row, col).label && getDivideKeys(getLabel(row, col).label, String(+xCord + 10), yCord + 5, smallKey)
          : getLabel(row, col).label && getDivideKeys(getLabel(row, col).label, xCord, String(yCord + 7), smallKey)
        : topsArrTransfer.includes(getLabel(row, col).extraLabel)
        ? getLabel(row, col).label &&
          getDivideKeys(getLabel(row, col).label, xCord, yCord + 5, smallKey) &&
          getDivideKeys(getLabel(row, col).label, String(+xCord + 10), yCord + 5, smallKey)
        : getLabel(row, col).label && getDivideKeys(getLabel(row, col).label, xCord, String(yCord + 7), smallKey);

    // console.log("Selected Key: ", this.props.selectedKey);
    // console.log("Selected LED: ", this.props.selectedLED);
    return (
      <>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fillRule="evenodd"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeMiterlimit="1.5"
          clipRule="evenodd"
          viewBox={this.props.showUnderglow || this.props.isStandardView ? "0 0 1270 790" : "0 0 1270 520"}
          className={this.props.className || "layer"}
          height={this.props.showUnderglow || this.props.isStandardView ? 790 : 520}
          width={1270}
        >
          <Neuron
            selectedLED={this.props.selectedLED}
            visibility={this.props.showUnderglow || this.props.isStandardView ? true : false}
            clickAble={this.props.isStandardView && !this.props.showUnderglow ? false : true}
            color="#b4b4b4"
            id="neuron_led"
            onClick={e => {
              setUndeglowIndex(176, e);
            }}
            className="key"
            fill={getColor(176)}
            stroke={stroke(176)}
            strokeWidth={getStrokeWidth(176)}
            dataLedIndex={getLEDIndex(176)}
            dataKeyIndex={keyIndex(176)}
            dataLayer={layer}
            translateX={50}
            translateY={72}
          />

          <g id="keyshapes">
            <Key
              keyType="regularKey"
              id="R0C0_keyshape"
              onClick={onClick}
              className="key"
              width={57}
              height={57}
              x={keysColumnsPosition.x0}
              y={keysRowsDefyPosition.row1.y0}
              selectedKey={this.props.selectedKey}
              fill={getColor(0, 0)}
              stroke={stroke(0, 0)}
              strokeWidth={getStrokeWidth(0, 0)}
              dataLedIndex={getLEDIndex(0, 0)}
              dataKeyIndex={keyIndex(0, 0)}
              dataLayer={layer}
              contrastText={getContrastText(getColor(0, 0))}
              centerPrimary={getCenterPrimary(0, 0, 0, 0, true)}
              centerExtra={getCenterExtra(0, 0, 0, 0, true)}
            />
            <Key
              keyType="regularKey"
              id="R0C1_keyshape"
              onClick={onClick}
              className="key"
              width={57}
              height={57}
              x={keysColumnsPosition.x1}
              y={keysRowsDefyPosition.row1.y0}
              selectedKey={this.props.selectedKey}
              fill={getColor(0, 1)}
              stroke={stroke(0, 1)}
              strokeWidth={getStrokeWidth(0, 1)}
              dataLedIndex={getLEDIndex(0, 1)}
              dataKeyIndex={keyIndex(0, 1)}
              dataLayer={layer}
              contrastText={getContrastText(getColor(0, 1))}
              centerPrimary={getCenterPrimary(0, 1, 0, 0, true)}
              centerExtra={getCenterExtra(0, 1, 0, 0, true)}
            />
            <Key
              keyType="regularKey"
              id="R0C2_keyshape"
              onClick={onClick}
              className="key"
              width={57}
              height={57}
              x={keysColumnsPosition.x2}
              y={keysRowsDefyPosition.row1.y1}
              selectedKey={this.props.selectedKey}
              fill={getColor(0, 2)}
              stroke={stroke(0, 2)}
              strokeWidth={getStrokeWidth(0, 2)}
              dataLedIndex={getLEDIndex(0, 2)}
              dataKeyIndex={keyIndex(0, 2)}
              dataLayer={layer}
              contrastText={getContrastText(getColor(0, 2))}
              centerPrimary={getCenterPrimary(0, 2, 0, 0, true)}
              centerExtra={getCenterExtra(0, 2, 0, 0, true)}
            />
            <Key
              keyType="regularKey"
              id="R0C3_keyshape"
              onClick={onClick}
              className="key"
              width={57}
              height={57}
              x={keysColumnsPosition.x3}
              y={keysRowsDefyPosition.row1.y2}
              selectedKey={this.props.selectedKey}
              fill={getColor(0, 3)}
              stroke={stroke(0, 3)}
              strokeWidth={getStrokeWidth(0, 3)}
              dataLedIndex={getLEDIndex(0, 3)}
              dataKeyIndex={keyIndex(0, 3)}
              dataLayer={layer}
              contrastText={getContrastText(getColor(0, 3))}
              centerPrimary={getCenterPrimary(0, 3, 0, 0, true)}
              centerExtra={getCenterExtra(0, 3, 0, 0, true)}
            />
            <Key
              keyType="regularKey"
              id="R0C4_keyshape"
              onClick={onClick}
              className="key"
              width={57}
              height={57}
              x={keysColumnsPosition.x4}
              y={keysRowsDefyPosition.row1.y1}
              fill={getColor(0, 4)}
              stroke={stroke(0, 4)}
              strokeWidth={getStrokeWidth(0, 4)}
              dataLedIndex={getLEDIndex(0, 4)}
              dataKeyIndex={keyIndex(0, 4)}
              dataLayer={layer}
              contrastText={getContrastText(getColor(0, 4))}
              centerPrimary={getCenterPrimary(0, 4, 0, 0, true)}
              centerExtra={getCenterExtra(0, 4, 0, 0, true)}
            />
            <Key
              keyType="regularKey"
              id="R0C5_keyshape"
              onClick={onClick}
              className="key"
              width={57}
              height={57}
              x={keysColumnsPosition.x5}
              y={keysRowsDefyPosition.row1.y1}
              fill={getColor(0, 5)}
              stroke={stroke(0, 5)}
              strokeWidth={getStrokeWidth(0, 5)}
              dataLedIndex={getLEDIndex(0, 5)}
              dataKeyIndex={keyIndex(0, 5)}
              dataLayer={layer}
              contrastText={getContrastText(getColor(0, 5))}
              centerPrimary={getCenterPrimary(0, 5, 0, 0, true)}
              centerExtra={getCenterExtra(0, 5, 0, 0, true)}
            />

            <Key
              keyType="regularKey"
              id="R0C6_keyshape"
              onClick={onClick}
              className="key"
              width={57}
              height={57}
              x={keysColumnsPosition.x6}
              y={keysRowsDefyPosition.row1.y3}
              fill={getColor(0, 6)}
              stroke={stroke(0, 6)}
              strokeWidth={getStrokeWidth(0, 6)}
              dataLedIndex={getLEDIndex(0, 6)}
              dataKeyIndex={keyIndex(0, 6)}
              dataLayer={layer}
              contrastText={getContrastText(getColor(0, 6))}
              centerPrimary={getCenterPrimary(0, 6, 0, 0, true)}
              centerExtra={getCenterExtra(0, 6, 0, 0, true)}
            />

            <Key
              keyType="regularKey"
              id="R0C9_keyshape"
              onClick={onClick}
              className="key"
              width={57}
              height={57}
              x={keysColumnsPosition.x7}
              y={keysRowsDefyPosition.row1.y3}
              fill={getColor(0, 9)}
              stroke={stroke(0, 9)}
              strokeWidth={getStrokeWidth(0, 9)}
              dataLedIndex={getLEDIndex(0, 9)}
              dataKeyIndex={keyIndex(0, 9)}
              dataLayer={layer}
              contrastText={getContrastText(getColor(0, 9))}
              centerPrimary={getCenterPrimary(0, 9, 0, 0, true)}
              centerExtra={getCenterExtra(0, 9, 0, 0, true)}
            />
            <Key
              keyType="regularKey"
              id="R0C10_keyshape"
              onClick={onClick}
              className="key"
              width={57}
              height={57}
              x={keysColumnsPosition.x8}
              y={keysRowsDefyPosition.row1.y1}
              fill={getColor(0, 10)}
              stroke={stroke(0, 10)}
              strokeWidth={getStrokeWidth(0, 10)}
              dataLedIndex={getLEDIndex(0, 10)}
              dataKeyIndex={keyIndex(0, 10)}
              dataLayer={layer}
              contrastText={getContrastText(getColor(0, 10))}
              centerPrimary={getCenterPrimary(0, 10, 0, 0, true)}
              centerExtra={getCenterExtra(0, 10, 0, 0, true)}
            />
            <Key
              keyType="regularKey"
              id="R0C11_keyshape"
              onClick={onClick}
              className="key"
              width={57}
              height={57}
              x={keysColumnsPosition.x9}
              y={keysRowsDefyPosition.row1.y1}
              fill={getColor(0, 11)}
              stroke={stroke(0, 11)}
              strokeWidth={getStrokeWidth(0, 11)}
              dataLedIndex={getLEDIndex(0, 11)}
              dataKeyIndex={keyIndex(0, 11)}
              dataLayer={layer}
              contrastText={getContrastText(getColor(0, 11))}
              centerPrimary={getCenterPrimary(0, 11, 0, 0, true)}
              centerExtra={getCenterExtra(0, 11, 0, 0, true)}
            />
            <Key
              keyType="regularKey"
              id="R0C12_keyshape"
              onClick={onClick}
              className="key"
              width={57}
              height={57}
              x={keysColumnsPosition.x10}
              y={keysRowsDefyPosition.row1.y2}
              fill={getColor(0, 12)}
              stroke={stroke(0, 12)}
              strokeWidth={getStrokeWidth(0, 12)}
              dataLedIndex={getLEDIndex(0, 12)}
              dataKeyIndex={keyIndex(0, 12)}
              dataLayer={layer}
              contrastText={getContrastText(getColor(0, 12))}
              centerPrimary={getCenterPrimary(0, 12, 0, 0, true)}
              centerExtra={getCenterExtra(0, 12, 0, 0, true)}
            />

            <Key
              keyType="regularKey"
              id="R0C13_keyshape"
              onClick={onClick}
              className="key"
              width={57}
              height={57}
              x={keysColumnsPosition.x11}
              y={keysRowsDefyPosition.row1.y1}
              fill={getColor(0, 13)}
              stroke={stroke(0, 13)}
              strokeWidth={getStrokeWidth(0, 13)}
              dataLedIndex={getLEDIndex(0, 13)}
              dataKeyIndex={keyIndex(0, 13)}
              dataLayer={layer}
              contrastText={getContrastText(getColor(0, 13))}
              centerPrimary={getCenterPrimary(0, 13, 0, 0, true)}
              centerExtra={getCenterExtra(0, 13, 0, 0, true)}
            />

            <Key
              keyType="regularKey"
              id="R0C14_keyshape"
              onClick={onClick}
              className="key"
              width={57}
              height={57}
              x={keysColumnsPosition.x12}
              y={keysRowsDefyPosition.row1.y0}
              fill={getColor(0, 14)}
              stroke={stroke(0, 14)}
              strokeWidth={getStrokeWidth(0, 14)}
              dataLedIndex={getLEDIndex(0, 14)}
              dataKeyIndex={keyIndex(0, 14)}
              dataLayer={layer}
              contrastText={getContrastText(getColor(0, 14))}
              centerPrimary={getCenterPrimary(0, 14, 0, 0, true)}
              centerExtra={getCenterExtra(0, 14, 0, 0, true)}
            />

            <Key
              keyType="regularKey"
              id="R0C15_keyshape"
              onClick={onClick}
              className="key"
              width={57}
              height={57}
              x={keysColumnsPosition.x13}
              y={keysRowsDefyPosition.row1.y0}
              fill={getColor(0, 15)}
              stroke={stroke(0, 15)}
              strokeWidth={getStrokeWidth(0, 15)}
              dataLedIndex={getLEDIndex(0, 15)}
              dataKeyIndex={keyIndex(0, 15)}
              dataLayer={layer}
              contrastText={getContrastText(getColor(0, 15))}
              centerPrimary={getCenterPrimary(0, 15, 0, 0, true)}
              centerExtra={getCenterExtra(0, 15, 0, 0, true)}
            />

            <Key
              keyType="regularKey"
              id="R1C0_keyshape"
              onClick={onClick}
              className="key"
              width={57}
              height={57}
              x={keysColumnsPosition.x0}
              y={keysRowsDefyPosition.row2.y0}
              fill={getColor(1, 0)}
              stroke={stroke(1, 0)}
              strokeWidth={getStrokeWidth(1, 0)}
              dataLedIndex={getLEDIndex(1, 0)}
              dataKeyIndex={keyIndex(1, 0)}
              dataLayer={layer}
              contrastText={getContrastText(getColor(1, 0))}
              centerPrimary={getCenterPrimary(1, 0, 0, 0, true)}
              centerExtra={getCenterExtra(1, 0, 0, 0, true)}
            />
            <Key
              keyType="regularKey"
              id="R1C1_keyshape"
              onClick={onClick}
              className="key"
              width={57}
              height={57}
              x={keysColumnsPosition.x1}
              y={keysRowsDefyPosition.row2.y0}
              fill={getColor(1, 1)}
              stroke={stroke(1, 1)}
              strokeWidth={getStrokeWidth(1, 1)}
              dataLedIndex={getLEDIndex(1, 1)}
              dataKeyIndex={keyIndex(1, 1)}
              dataLayer={layer}
              contrastText={getContrastText(getColor(1, 1))}
              centerPrimary={getCenterPrimary(1, 1, 0, 0, true)}
              centerExtra={getCenterExtra(1, 1, 0, 0, true)}
            />
            <Key
              keyType="regularKey"
              id="R1C2_keyshape"
              onClick={onClick}
              className="key"
              width={57}
              height={57}
              x={keysColumnsPosition.x2}
              y={keysRowsDefyPosition.row2.y1}
              fill={getColor(1, 2)}
              stroke={stroke(1, 2)}
              strokeWidth={getStrokeWidth(1, 2)}
              dataLedIndex={getLEDIndex(1, 2)}
              dataKeyIndex={keyIndex(1, 2)}
              dataLayer={layer}
              contrastText={getContrastText(getColor(1, 2))}
              centerPrimary={getCenterPrimary(1, 2, 0, 0, true)}
              centerExtra={getCenterExtra(1, 2, 0, 0, true)}
            />
            <Key
              keyType="regularKey"
              id="R1C3_keyshape"
              onClick={onClick}
              className="key"
              width={57}
              height={57}
              x={keysColumnsPosition.x3}
              y={keysRowsDefyPosition.row2.y2}
              fill={getColor(1, 3)}
              stroke={stroke(1, 3)}
              strokeWidth={getStrokeWidth(1, 3)}
              dataLedIndex={getLEDIndex(1, 3)}
              dataKeyIndex={keyIndex(1, 3)}
              dataLayer={layer}
              contrastText={getContrastText(getColor(1, 3))}
              centerPrimary={getCenterPrimary(1, 3, 0, 0, true)}
              centerExtra={getCenterExtra(1, 3, 0, 0, true)}
            />
            <Key
              keyType="regularKey"
              id="R1C4_keyshape"
              onClick={onClick}
              className="key"
              width={57}
              height={57}
              x={keysColumnsPosition.x4}
              y={keysRowsDefyPosition.row2.y1}
              fill={getColor(1, 4)}
              stroke={stroke(1, 4)}
              strokeWidth={getStrokeWidth(1, 4)}
              dataLedIndex={getLEDIndex(1, 4)}
              dataKeyIndex={keyIndex(1, 4)}
              dataLayer={layer}
              contrastText={getContrastText(getColor(1, 4))}
              centerPrimary={getCenterPrimary(1, 4, 0, 0, true)}
              centerExtra={getCenterExtra(1, 4, 0, 0, true)}
            />

            <Key
              keyType="regularKey"
              id="R1C5_keyshape"
              onClick={onClick}
              className="key"
              width={57}
              height={57}
              x={keysColumnsPosition.x5}
              y={keysRowsDefyPosition.row2.y1}
              fill={getColor(1, 5)}
              stroke={stroke(1, 5)}
              strokeWidth={getStrokeWidth(1, 5)}
              dataLedIndex={getLEDIndex(1, 5)}
              dataKeyIndex={keyIndex(1, 5)}
              dataLayer={layer}
              contrastText={getContrastText(getColor(1, 5))}
              centerPrimary={getCenterPrimary(1, 5, 0, 0, true)}
              centerExtra={getCenterExtra(1, 5, 0, 0, true)}
            />
            <Key
              keyType="regularKey"
              id="R1C6_keyshape"
              onClick={onClick}
              className="key"
              width={57}
              height={57}
              x={keysColumnsPosition.x6}
              y={keysRowsDefyPosition.row2.y3}
              fill={getColor(1, 6)}
              stroke={stroke(1, 6)}
              strokeWidth={getStrokeWidth(1, 6)}
              dataLedIndex={getLEDIndex(1, 6)}
              dataKeyIndex={keyIndex(1, 6)}
              dataLayer={layer}
              contrastText={getContrastText(getColor(1, 6))}
              centerPrimary={getCenterPrimary(1, 6, 0, 0, true)}
              centerExtra={getCenterExtra(1, 6, 0, 0, true)}
            />

            <Key
              keyType="regularKey"
              id="R1C9_keyshape"
              onClick={onClick}
              className="key"
              width={57}
              height={57}
              x={keysColumnsPosition.x7}
              y={keysRowsDefyPosition.row2.y3}
              fill={getColor(1, 9)}
              stroke={stroke(1, 9)}
              strokeWidth={getStrokeWidth(1, 9)}
              dataLedIndex={getLEDIndex(1, 9)}
              dataKeyIndex={keyIndex(1, 9)}
              dataLayer={layer}
              contrastText={getContrastText(getColor(1, 9))}
              centerPrimary={getCenterPrimary(1, 9, 0, 0, true)}
              centerExtra={getCenterExtra(1, 9, 0, 0, true)}
            />
            <Key
              keyType="regularKey"
              id="R1C10_keyshape"
              onClick={onClick}
              className="key"
              width={57}
              height={57}
              x={keysColumnsPosition.x8}
              y={keysRowsDefyPosition.row2.y1}
              fill={getColor(1, 10)}
              stroke={stroke(1, 10)}
              strokeWidth={getStrokeWidth(1, 10)}
              dataLedIndex={getLEDIndex(1, 10)}
              dataKeyIndex={keyIndex(1, 10)}
              dataLayer={layer}
              contrastText={getContrastText(getColor(1, 10))}
              centerPrimary={getCenterPrimary(1, 10, 0, 0, true)}
              centerExtra={getCenterExtra(1, 10, 0, 0, true)}
            />
            <Key
              keyType="regularKey"
              id="R1C11_keyshape"
              onClick={onClick}
              className="key"
              width={57}
              height={57}
              x={keysColumnsPosition.x9}
              y={keysRowsDefyPosition.row2.y1}
              fill={getColor(1, 11)}
              stroke={stroke(1, 11)}
              strokeWidth={getStrokeWidth(1, 11)}
              dataLedIndex={getLEDIndex(1, 11)}
              dataKeyIndex={keyIndex(1, 11)}
              dataLayer={layer}
              contrastText={getContrastText(getColor(1, 11))}
              centerPrimary={getCenterPrimary(1, 11, 0, 0, true)}
              centerExtra={getCenterExtra(1, 11, 0, 0, true)}
            />
            <Key
              keyType="regularKey"
              id="R1C12_keyshape"
              onClick={onClick}
              className="key"
              width={57}
              height={57}
              x={keysColumnsPosition.x10}
              y={keysRowsDefyPosition.row2.y2}
              fill={getColor(1, 12)}
              stroke={stroke(1, 12)}
              strokeWidth={getStrokeWidth(1, 12)}
              dataLedIndex={getLEDIndex(1, 12)}
              dataKeyIndex={keyIndex(1, 12)}
              dataLayer={layer}
              contrastText={getContrastText(getColor(1, 12))}
              centerPrimary={getCenterPrimary(1, 12, 0, 0, true)}
              centerExtra={getCenterExtra(1, 12, 0, 0, true)}
            />

            <Key
              keyType="regularKey"
              id="R1C13_keyshape"
              onClick={onClick}
              className="key"
              width={57}
              height={57}
              x={keysColumnsPosition.x11}
              y={keysRowsDefyPosition.row2.y1}
              fill={getColor(1, 13)}
              stroke={stroke(1, 13)}
              strokeWidth={getStrokeWidth(1, 13)}
              dataLedIndex={getLEDIndex(1, 13)}
              dataKeyIndex={keyIndex(1, 13)}
              dataLayer={layer}
              contrastText={getContrastText(getColor(1, 13))}
              centerPrimary={getCenterPrimary(1, 13, 0, 0, true)}
              centerExtra={getCenterExtra(1, 13, 0, 0, true)}
            />

            <Key
              keyType="regularKey"
              id="R1C14_keyshape"
              onClick={onClick}
              className="key"
              width={57}
              height={57}
              x={keysColumnsPosition.x12}
              y={keysRowsDefyPosition.row2.y0}
              fill={getColor(1, 14)}
              stroke={stroke(1, 14)}
              strokeWidth={getStrokeWidth(1, 14)}
              dataLedIndex={getLEDIndex(1, 14)}
              dataKeyIndex={keyIndex(1, 14)}
              dataLayer={layer}
              contrastText={getContrastText(getColor(1, 14))}
              centerPrimary={getCenterPrimary(1, 14, 0, 0, true)}
              centerExtra={getCenterExtra(1, 14, 0, 0, true)}
            />

            <Key
              keyType="regularKey"
              id="R1C15_keyshape"
              onClick={onClick}
              className="key"
              width={57}
              height={57}
              x={keysColumnsPosition.x13}
              y={keysRowsDefyPosition.row2.y0}
              fill={getColor(1, 15)}
              stroke={stroke(1, 15)}
              strokeWidth={getStrokeWidth(1, 15)}
              dataLedIndex={getLEDIndex(1, 15)}
              dataKeyIndex={keyIndex(1, 15)}
              dataLayer={layer}
              contrastText={getContrastText(getColor(1, 15))}
              centerPrimary={getCenterPrimary(1, 15, 0, 0, true)}
              centerExtra={getCenterExtra(1, 15, 0, 0, true)}
            />

            <Key
              keyType="regularKey"
              id="R2C0_keyshape"
              onClick={onClick}
              className="key"
              width={57}
              height={57}
              x={keysColumnsPosition.x0}
              y={keysRowsDefyPosition.row3.y0}
              fill={getColor(2, 0)}
              stroke={stroke(2, 0)}
              strokeWidth={getStrokeWidth(2, 0)}
              dataLedIndex={getLEDIndex(2, 0)}
              dataKeyIndex={keyIndex(2, 0)}
              dataLayer={layer}
              contrastText={getContrastText(getColor(2, 0))}
              centerPrimary={getCenterPrimary(2, 0, 0, 0, true)}
              centerExtra={getCenterExtra(2, 0, 0, 0, true)}
            />
            <Key
              keyType="regularKey"
              id="R2C1_keyshape"
              onClick={onClick}
              className="key"
              width={57}
              height={57}
              x={keysColumnsPosition.x1}
              y={keysRowsDefyPosition.row3.y0}
              fill={getColor(2, 1)}
              stroke={stroke(2, 1)}
              strokeWidth={getStrokeWidth(2, 1)}
              dataLedIndex={getLEDIndex(2, 1)}
              dataKeyIndex={keyIndex(2, 1)}
              dataLayer={layer}
              contrastText={getContrastText(getColor(2, 1))}
              centerPrimary={getCenterPrimary(2, 1, 0, 0, true)}
              centerExtra={getCenterExtra(2, 1, 0, 0, true)}
            />
            <Key
              keyType="regularKey"
              id="R2C2_keyshape"
              onClick={onClick}
              className="key"
              width={57}
              height={57}
              x={keysColumnsPosition.x2}
              y={keysRowsDefyPosition.row3.y1}
              fill={getColor(2, 2)}
              stroke={stroke(2, 2)}
              strokeWidth={getStrokeWidth(2, 2)}
              dataLedIndex={getLEDIndex(2, 2)}
              dataKeyIndex={keyIndex(2, 2)}
              dataLayer={layer}
              contrastText={getContrastText(getColor(2, 2))}
              centerPrimary={getCenterPrimary(2, 2, 0, 0, true)}
              centerExtra={getCenterExtra(2, 2, 0, 0, true)}
            />
            <Key
              keyType="regularKey"
              id="R2C3_keyshape"
              onClick={onClick}
              className="key"
              width={57}
              height={57}
              x={keysColumnsPosition.x3}
              y={keysRowsDefyPosition.row3.y2}
              fill={getColor(2, 3)}
              stroke={stroke(2, 3)}
              strokeWidth={getStrokeWidth(2, 3)}
              dataLedIndex={getLEDIndex(2, 3)}
              dataKeyIndex={keyIndex(2, 3)}
              dataLayer={layer}
              contrastText={getContrastText(getColor(2, 3))}
              centerPrimary={getCenterPrimary(2, 3, 0, 0, true)}
              centerExtra={getCenterExtra(2, 3, 0, 0, true)}
            />
            <Key
              keyType="regularKey"
              id="R2C4_keyshape"
              onClick={onClick}
              className="key"
              width={57}
              height={57}
              x={keysColumnsPosition.x4}
              y={keysRowsDefyPosition.row3.y1}
              fill={getColor(2, 4)}
              stroke={stroke(2, 4)}
              strokeWidth={getStrokeWidth(2, 4)}
              dataLedIndex={getLEDIndex(2, 4)}
              dataKeyIndex={keyIndex(2, 4)}
              dataLayer={layer}
              contrastText={getContrastText(getColor(2, 4))}
              centerPrimary={getCenterPrimary(2, 4, 0, 0, true)}
              centerExtra={getCenterExtra(2, 4, 0, 0, true)}
            />

            <Key
              keyType="regularKey"
              id="R2C5_keyshape"
              onClick={onClick}
              className="key"
              width={57}
              height={57}
              x={keysColumnsPosition.x5}
              y={keysRowsDefyPosition.row3.y1}
              fill={getColor(2, 5)}
              stroke={stroke(2, 5)}
              strokeWidth={getStrokeWidth(2, 5)}
              dataLedIndex={getLEDIndex(2, 5)}
              dataKeyIndex={keyIndex(2, 5)}
              dataLayer={layer}
              contrastText={getContrastText(getColor(2, 5))}
              centerPrimary={getCenterPrimary(2, 5, 0, 0, true)}
              centerExtra={getCenterExtra(2, 5, 0, 0, true)}
            />

            <Key
              keyType="regularKey"
              id="R2C6_keyshape"
              onClick={onClick}
              className="key"
              width={57}
              height={57}
              x={keysColumnsPosition.x6}
              y={keysRowsDefyPosition.row3.y3}
              fill={getColor(2, 6)}
              stroke={stroke(2, 6)}
              strokeWidth={getStrokeWidth(2, 6)}
              dataLedIndex={getLEDIndex(2, 6)}
              dataKeyIndex={keyIndex(2, 6)}
              dataLayer={layer}
              contrastText={getContrastText(getColor(2, 6))}
              centerPrimary={getCenterPrimary(2, 6, 0, 0, true)}
              centerExtra={getCenterExtra(2, 6, 0, 0, true)}
            />

            <Key
              keyType="regularKey"
              id="R2C9_keyshape"
              onClick={onClick}
              className="key"
              width={57}
              height={57}
              x={keysColumnsPosition.x7}
              y={keysRowsDefyPosition.row3.y3}
              fill={getColor(2, 9)}
              stroke={stroke(2, 9)}
              strokeWidth={getStrokeWidth(2, 9)}
              dataLedIndex={getLEDIndex(2, 9)}
              dataKeyIndex={keyIndex(2, 9)}
              dataLayer={layer}
              contrastText={getContrastText(getColor(2, 9))}
              centerPrimary={getCenterPrimary(2, 9, 0, 0, true)}
              centerExtra={getCenterExtra(2, 9, 0, 0, true)}
            />

            <Key
              keyType="regularKey"
              id="R2C10_keyshape"
              onClick={onClick}
              className="key"
              width={57}
              height={57}
              x={keysColumnsPosition.x8}
              y={keysRowsDefyPosition.row3.y1}
              fill={getColor(2, 10)}
              stroke={stroke(2, 10)}
              strokeWidth={getStrokeWidth(2, 10)}
              dataLedIndex={getLEDIndex(2, 10)}
              dataKeyIndex={keyIndex(2, 10)}
              dataLayer={layer}
              contrastText={getContrastText(getColor(2, 10))}
              centerPrimary={getCenterPrimary(2, 10, 0, 0, true)}
              centerExtra={getCenterExtra(2, 10, 0, 0, true)}
            />

            <Key
              keyType="regularKey"
              id="R2C11_keyshape"
              onClick={onClick}
              className="key"
              width={57}
              height={57}
              x={keysColumnsPosition.x9}
              y={keysRowsDefyPosition.row3.y1}
              fill={getColor(2, 11)}
              stroke={stroke(2, 11)}
              strokeWidth={getStrokeWidth(2, 11)}
              dataLedIndex={getLEDIndex(2, 11)}
              dataKeyIndex={keyIndex(2, 11)}
              dataLayer={layer}
              contrastText={getContrastText(getColor(2, 11))}
              centerPrimary={getCenterPrimary(2, 11, 0, 0, true)}
              centerExtra={getCenterExtra(2, 11, 0, 0, true)}
            />

            <Key
              keyType="regularKey"
              id="R2C12_keyshape"
              onClick={onClick}
              className="key"
              width={57}
              height={57}
              x={keysColumnsPosition.x10}
              y={keysRowsDefyPosition.row3.y2}
              fill={getColor(2, 12)}
              stroke={stroke(2, 12)}
              strokeWidth={getStrokeWidth(2, 12)}
              dataLedIndex={getLEDIndex(2, 12)}
              dataKeyIndex={keyIndex(2, 12)}
              dataLayer={layer}
              contrastText={getContrastText(getColor(2, 12))}
              centerPrimary={getCenterPrimary(2, 12, 0, 0, true)}
              centerExtra={getCenterExtra(2, 12, 0, 0, true)}
            />

            <Key
              keyType="regularKey"
              id="R2C13_keyshape"
              onClick={onClick}
              className="key"
              width={57}
              height={57}
              x={keysColumnsPosition.x11}
              y={keysRowsDefyPosition.row3.y1}
              fill={getColor(2, 13)}
              stroke={stroke(2, 13)}
              strokeWidth={getStrokeWidth(2, 13)}
              dataLedIndex={getLEDIndex(2, 13)}
              dataKeyIndex={keyIndex(2, 13)}
              dataLayer={layer}
              contrastText={getContrastText(getColor(2, 13))}
              centerPrimary={getCenterPrimary(2, 13, 0, 0, true)}
              centerExtra={getCenterExtra(2, 13, 0, 0, true)}
            />

            <Key
              keyType="regularKey"
              id="R2C14_keyshape"
              onClick={onClick}
              className="key"
              width={57}
              height={57}
              x={keysColumnsPosition.x12}
              y={keysRowsDefyPosition.row3.y0}
              fill={getColor(2, 14)}
              stroke={stroke(2, 14)}
              strokeWidth={getStrokeWidth(2, 14)}
              dataLedIndex={getLEDIndex(2, 14)}
              dataKeyIndex={keyIndex(2, 14)}
              dataLayer={layer}
              contrastText={getContrastText(getColor(2, 14))}
              centerPrimary={getCenterPrimary(2, 14, 0, 0, true)}
              centerExtra={getCenterExtra(2, 14, 0, 0, true)}
            />

            <Key
              keyType="regularKey"
              id="R2C15_keyshape"
              onClick={onClick}
              className="key"
              width={57}
              height={57}
              x={keysColumnsPosition.x13}
              y={keysRowsDefyPosition.row3.y0}
              fill={getColor(2, 15)}
              stroke={stroke(2, 15)}
              strokeWidth={getStrokeWidth(2, 15)}
              dataLedIndex={getLEDIndex(2, 15)}
              dataKeyIndex={keyIndex(2, 15)}
              dataLayer={layer}
              contrastText={getContrastText(getColor(2, 15))}
              centerPrimary={getCenterPrimary(2, 15, 0, 0, true)}
              centerExtra={getCenterExtra(2, 15, 0, 0, true)}
            />

            <Key
              keyType="regularKey"
              id="R3C0_keyshape"
              onClick={onClick}
              className="key"
              width={57}
              height={57}
              x={keysColumnsPosition.x0}
              y={keysRowsDefyPosition.row4.y0}
              fill={getColor(3, 0)}
              stroke={stroke(3, 0)}
              strokeWidth={getStrokeWidth(3, 0)}
              dataLedIndex={getLEDIndex(3, 0)}
              dataKeyIndex={keyIndex(3, 0)}
              dataLayer={layer}
              contrastText={getContrastText(getColor(3, 0))}
              centerPrimary={getCenterPrimary(3, 0, 0, 0, true)}
              centerExtra={getCenterExtra(3, 0, 0, 0, true)}
            />

            <Key
              keyType="regularKey"
              id="R3C1_keyshape"
              onClick={onClick}
              className="key"
              width={57}
              height={57}
              x={keysColumnsPosition.x1}
              y={keysRowsDefyPosition.row4.y0}
              fill={getColor(3, 1)}
              stroke={stroke(3, 1)}
              strokeWidth={getStrokeWidth(3, 1)}
              dataLedIndex={getLEDIndex(3, 1)}
              dataKeyIndex={keyIndex(3, 1)}
              dataLayer={layer}
              contrastText={getContrastText(getColor(3, 1))}
              centerPrimary={getCenterPrimary(3, 1, 0, 0, true)}
              centerExtra={getCenterExtra(3, 1, 0, 0, true)}
            />

            <Key
              keyType="regularKey"
              id="R3C2_keyshape"
              onClick={onClick}
              className="key"
              width={57}
              height={57}
              x={keysColumnsPosition.x2}
              y={keysRowsDefyPosition.row4.y1}
              fill={getColor(3, 2)}
              stroke={stroke(3, 2)}
              strokeWidth={getStrokeWidth(3, 2)}
              dataLedIndex={getLEDIndex(3, 2)}
              dataKeyIndex={keyIndex(3, 2)}
              dataLayer={layer}
              contrastText={getContrastText(getColor(3, 2))}
              centerPrimary={getCenterPrimary(3, 2, 0, 0, true)}
              centerExtra={getCenterExtra(3, 2, 0, 0, true)}
            />

            <Key
              keyType="regularKey"
              id="R3C3_keyshape"
              onClick={onClick}
              className="key"
              width={57}
              height={57}
              x={keysColumnsPosition.x3}
              y={keysRowsDefyPosition.row4.y2}
              fill={getColor(3, 3)}
              stroke={stroke(3, 3)}
              strokeWidth={getStrokeWidth(3, 3)}
              dataLedIndex={getLEDIndex(3, 3)}
              dataKeyIndex={keyIndex(3, 3)}
              dataLayer={layer}
              contrastText={getContrastText(getColor(3, 3))}
              centerPrimary={getCenterPrimary(3, 3, 0, 0, true)}
              centerExtra={getCenterExtra(3, 3, 0, 0, true)}
            />

            <Key
              keyType="regularKey"
              id="R3C4_keyshape"
              onClick={onClick}
              className="key"
              width={57}
              height={57}
              x={keysColumnsPosition.x4}
              y={keysRowsDefyPosition.row4.y1}
              fill={getColor(3, 4)}
              stroke={stroke(3, 4)}
              strokeWidth={getStrokeWidth(3, 4)}
              dataLedIndex={getLEDIndex(3, 4)}
              dataKeyIndex={keyIndex(3, 4)}
              dataLayer={layer}
              contrastText={getContrastText(getColor(3, 4))}
              centerPrimary={getCenterPrimary(3, 4, 0, 0, true)}
              centerExtra={getCenterExtra(3, 4, 0, 0, true)}
            />

            <Key
              keyType="regularKey"
              id="R3C5_keyshape"
              onClick={onClick}
              className="key"
              width={57}
              height={57}
              x={keysColumnsPosition.x5}
              y={keysRowsDefyPosition.row4.y1}
              fill={getColor(3, 5)}
              stroke={stroke(3, 5)}
              strokeWidth={getStrokeWidth(3, 5)}
              dataLedIndex={getLEDIndex(3, 5)}
              dataKeyIndex={keyIndex(3, 5)}
              dataLayer={layer}
              contrastText={getContrastText(getColor(3, 5))}
              centerPrimary={getCenterPrimary(3, 5, 0, 0, true)}
              centerExtra={getCenterExtra(3, 5, 0, 0, true)}
            />

            <Key
              keyType="regularKey"
              id="R3C10_keyshape"
              onClick={onClick}
              className="key"
              width={57}
              height={57}
              x={keysColumnsPosition.x8}
              y={keysRowsDefyPosition.row4.y1}
              fill={getColor(3, 10)}
              stroke={stroke(3, 10)}
              strokeWidth={getStrokeWidth(3, 10)}
              dataLedIndex={getLEDIndex(3, 10)}
              dataKeyIndex={keyIndex(3, 10)}
              dataLayer={layer}
              contrastText={getContrastText(getColor(3, 10))}
              centerPrimary={getCenterPrimary(3, 10, 0, 0, true)}
              centerExtra={getCenterExtra(3, 10, 0, 0, true)}
            />

            <Key
              keyType="regularKey"
              id="R3C11_keyshape"
              onClick={onClick}
              className="key"
              width={57}
              height={57}
              x={keysColumnsPosition.x9}
              y={keysRowsDefyPosition.row4.y1}
              fill={getColor(3, 11)}
              stroke={stroke(3, 11)}
              strokeWidth={getStrokeWidth(3, 11)}
              dataLedIndex={getLEDIndex(3, 11)}
              dataKeyIndex={keyIndex(3, 11)}
              dataLayer={layer}
              contrastText={getContrastText(getColor(3, 11))}
              centerPrimary={getCenterPrimary(3, 11, 0, 0, true)}
              centerExtra={getCenterExtra(3, 11, 0, 0, true)}
            />

            <Key
              keyType="regularKey"
              id="R3C12_keyshape"
              onClick={onClick}
              className="key"
              width={57}
              height={57}
              x={keysColumnsPosition.x10}
              y={keysRowsDefyPosition.row4.y2}
              fill={getColor(3, 12)}
              stroke={stroke(3, 12)}
              strokeWidth={getStrokeWidth(3, 12)}
              dataLedIndex={getLEDIndex(3, 12)}
              dataKeyIndex={keyIndex(3, 12)}
              dataLayer={layer}
              contrastText={getContrastText(getColor(3, 12))}
              centerPrimary={getCenterPrimary(3, 12, 0, 0, true)}
              centerExtra={getCenterExtra(3, 12, 0, 0, true)}
            />

            <Key
              keyType="regularKey"
              id="R3C13_keyshape"
              onClick={onClick}
              className="key"
              width={57}
              height={57}
              x={keysColumnsPosition.x11}
              y={keysRowsDefyPosition.row4.y1}
              fill={getColor(3, 13)}
              stroke={stroke(3, 13)}
              strokeWidth={getStrokeWidth(3, 13)}
              dataLedIndex={getLEDIndex(3, 13)}
              dataKeyIndex={keyIndex(3, 13)}
              dataLayer={layer}
              contrastText={getContrastText(getColor(3, 13))}
              centerPrimary={getCenterPrimary(3, 13, 0, 0, true)}
              centerExtra={getCenterExtra(3, 13, 0, 0, true)}
            />

            <Key
              keyType="regularKey"
              id="R3C14_keyshape"
              onClick={onClick}
              className="key"
              width={57}
              height={57}
              x={keysColumnsPosition.x12}
              y={keysRowsDefyPosition.row4.y0}
              fill={getColor(3, 14)}
              stroke={stroke(3, 14)}
              strokeWidth={getStrokeWidth(3, 14)}
              dataLedIndex={getLEDIndex(3, 14)}
              dataKeyIndex={keyIndex(3, 14)}
              dataLayer={layer}
              contrastText={getContrastText(getColor(3, 14))}
              centerPrimary={getCenterPrimary(3, 14, 0, 0, true)}
              centerExtra={getCenterExtra(3, 14, 0, 0, true)}
            />

            <Key
              keyType="regularKey"
              id="R3C15_keyshape"
              onClick={onClick}
              className="key"
              width={57}
              height={57}
              x={keysColumnsPosition.x13}
              y={keysRowsDefyPosition.row4.y0}
              fill={getColor(3, 15)}
              stroke={stroke(3, 15)}
              strokeWidth={getStrokeWidth(3, 15)}
              dataLedIndex={getLEDIndex(3, 15)}
              dataKeyIndex={keyIndex(3, 15)}
              dataLayer={layer}
              contrastText={getContrastText(getColor(3, 15))}
              centerPrimary={getCenterPrimary(3, 15, 0, 0, true)}
              centerExtra={getCenterExtra(3, 15, 0, 0, true)}
            />

            {/*
            //
            Thumbs keys
            //
            */}

            <Key
              keyType="defy-t1"
              id="R4C1_keyshape"
              onClick={onClick}
              className="key"
              width={82}
              height={57}
              x={302}
              y={350}
              fill={getColor(4, 0)}
              stroke={stroke(4, 0)}
              strokeWidth={getStrokeWidth(4, 0)}
              dataLedIndex={getLEDIndex(4, 0)}
              dataKeyIndex={keyIndex(4, 0)}
              dataLayer={layer}
              contrastText={getContrastText(getColor(4, 0))}
              centerPrimary={getCenterPrimary(4, 0, 0, 0, true)}
              centerExtra={getCenterExtra(4, 0, 0, 0, true)}
            />

            <Key
              keyType="defy-t2"
              id="R4C2_keyshape"
              onClick={onClick}
              className="key"
              width={57}
              height={57}
              x={390}
              y={350}
              fill={getColor(4, 1)}
              stroke={stroke(4, 1)}
              strokeWidth={getStrokeWidth(4, 1)}
              dataLedIndex={getLEDIndex(4, 1)}
              dataKeyIndex={keyIndex(4, 1)}
              dataLayer={layer}
              contrastText={getContrastText(getColor(4, 1))}
              centerPrimary={getCenterPrimary(4, 1, 0, 0, true)}
              centerExtra={getCenterExtra(4, 1, 0, 0, true)}
            />
            <Key
              keyType="defy-t3"
              onClick={onClick}
              className="key"
              width={57}
              height={57}
              x={449}
              y={351}
              fill={getColor(4, 2)}
              stroke={stroke(4, 2)}
              strokeWidth={getStrokeWidth(4, 2)}
              dataLedIndex={getLEDIndex(4, 2)}
              dataKeyIndex={keyIndex(4, 2)}
              dataLayer={layer}
              contrastText={getContrastText(getColor(4, 2))}
              centerPrimary={getCenterPrimary(4, 2, 0, 0, true)}
              centerExtra={getCenterExtra(4, 2, 0, 0, true)}
            />
            <Key
              keyType="defy-t4"
              id="R4C4_keyshape"
              onClick={onClick}
              className="key"
              width={57}
              height={57}
              x={497}
              y={373}
              fill={getColor(4, 3)}
              stroke={stroke(4, 3)}
              strokeWidth={getStrokeWidth(4, 3)}
              dataLedIndex={getLEDIndex(4, 3)}
              dataKeyIndex={keyIndex(4, 3)}
              dataLayer={layer}
              contrastText={getContrastText(getColor(4, 3))}
              centerPrimary={getCenterPrimary(4, 3, 0, 0, true)}
              centerExtra={getCenterExtra(4, 3, 0, 0, true)}
            />
            <Key
              keyType="defy-t8"
              id="R4C5_keyshape"
              onClick={onClick}
              className="key"
              width={57}
              height={116}
              x={477}
              y={434}
              fill={getColor(4, 4)}
              stroke={stroke(4, 4)}
              strokeWidth={getStrokeWidth(4, 4)}
              dataLedIndex={getLEDIndex(4, 4)}
              dataKeyIndex={keyIndex(4, 4)}
              dataLayer={layer}
              contrastText={getContrastText(getColor(4, 4))}
              centerPrimary={getCenterPrimary(4, 4, 0, 0, true)}
              centerExtra={getCenterExtra(4, 4, 0, 0, true)}
            />
            <Key
              keyType="defy-t5"
              id="R4C6_keyshape"
              onClick={onClick}
              className="key"
              width={65}
              height={57}
              x={305}
              y={411}
              fill={getColor(4, 7)}
              stroke={stroke(4, 7)}
              strokeWidth={getStrokeWidth(4, 7)}
              dataLedIndex={getLEDIndex(4, 7)}
              dataKeyIndex={keyIndex(4, 7)}
              dataLayer={layer}
              contrastText={getContrastText(getColor(4, 7))}
              centerPrimary={getCenterPrimary(4, 7, 0, 0, true)}
              centerExtra={getCenterExtra(4, 7, 0, 0, true)}
            />
            <Key
              keyType="defy-t6"
              id="R4C7_keyshape"
              onClick={onClick}
              className="key"
              width={57}
              height={57}
              x={387}
              y={411}
              fill={getColor(4, 6)}
              stroke={stroke(4, 6)}
              strokeWidth={getStrokeWidth(4, 6)}
              dataLedIndex={getLEDIndex(4, 6)}
              dataKeyIndex={keyIndex(4, 6)}
              dataLayer={layer}
              contrastText={getContrastText(getColor(4, 6))}
              centerPrimary={getCenterPrimary(4, 6, 0, 0, true)}
              centerExtra={getCenterExtra(4, 6, 0, 0, true)}
            />
            <Key
              keyType="defy-t7"
              id="R4C8_keyshape"
              onClick={onClick}
              className="key"
              width={57}
              height={57}
              x={441}
              y={421}
              fill={getColor(4, 5)}
              stroke={stroke(4, 5)}
              strokeWidth={getStrokeWidth(4, 5)}
              dataLedIndex={getLEDIndex(4, 5)}
              dataKeyIndex={keyIndex(4, 5)}
              dataLayer={layer}
              contrastText={getContrastText(getColor(4, 5))}
              centerPrimary={getCenterPrimary(4, 5, 0, 0, true)}
              centerExtra={getCenterExtra(4, 5, 0, 0, true)}
            />

            {/* RIGHT SIDE */}

            <Key
              keyType="defy-tR1"
              id="R4C9_keyshape"
              onClick={onClick}
              className="key"
              width={65}
              height={57}
              x={886}
              y={349}
              fill={getColor(4, 15)}
              stroke={stroke(4, 15)}
              strokeWidth={getStrokeWidth(4, 15)}
              dataLedIndex={getLEDIndex(4, 15)}
              dataKeyIndex={keyIndex(4, 15)}
              dataLayer={layer}
              contrastText={getContrastText(getColor(4, 15))}
              centerPrimary={getCenterPrimary(4, 15, 0, 0, true)}
              centerExtra={getCenterExtra(4, 15, 0, 0, true)}
            />

            <Key
              keyType="defy-tR2"
              id="R4C10_keyshape"
              onClick={onClick}
              className="key"
              width={57}
              height={57}
              x={817}
              y={349}
              fill={getColor(4, 14)}
              stroke={stroke(4, 14)}
              strokeWidth={getStrokeWidth(4, 14)}
              dataLedIndex={getLEDIndex(4, 14)}
              dataKeyIndex={keyIndex(4, 14)}
              dataLayer={layer}
              contrastText={getContrastText(getColor(4, 14))}
              centerPrimary={getCenterPrimary(4, 14, 0, 0, true)}
              centerExtra={getCenterExtra(4, 14, 0, 0, true)}
            />

            <Key
              keyType="defy-tR3"
              id="R4C14_keyshape"
              onClick={onClick}
              className="key"
              width={57}
              height={57}
              x={748}
              y={350}
              fill={getColor(4, 13)}
              stroke={stroke(4, 13)}
              strokeWidth={getStrokeWidth(4, 13)}
              dataLedIndex={getLEDIndex(4, 13)}
              dataKeyIndex={keyIndex(4, 13)}
              dataLayer={layer}
              contrastText={getContrastText(getColor(4, 13))}
              centerPrimary={getCenterPrimary(4, 13, 0, 0, true)}
              centerExtra={getCenterExtra(4, 13, 0, 0, true)}
            />

            <Key
              keyType="defy-tR4"
              id="R4C13_keyshape"
              onClick={onClick}
              className="key"
              width={57}
              height={57}
              x={698}
              y={372}
              fill={getColor(4, 12)}
              stroke={stroke(4, 12)}
              strokeWidth={getStrokeWidth(4, 12)}
              dataLedIndex={getLEDIndex(4, 12)}
              dataKeyIndex={keyIndex(4, 12)}
              dataLayer={layer}
              contrastText={getContrastText(getColor(4, 12))}
              centerPrimary={getCenterPrimary(4, 12, 0, 0, true)}
              centerExtra={getCenterExtra(4, 12, 0, 0, true)}
            />

            <Key
              keyType="defy-tR5"
              id="R4C15_keyshape"
              onClick={onClick}
              className="key"
              width={57}
              height={57}
              x={889}
              y={411}
              fill={getColor(4, 8)}
              stroke={stroke(4, 8)}
              strokeWidth={getStrokeWidth(4, 8)}
              dataLedIndex={getLEDIndex(4, 8)}
              dataKeyIndex={keyIndex(4, 8)}
              dataLayer={layer}
              contrastText={getContrastText(getColor(4, 8))}
              centerPrimary={getCenterPrimary(4, 8, 0, 0, true)}
              centerExtra={getCenterExtra(4, 8, 0, 0, true)}
            />

            <Key
              keyType="defy-tR6"
              id="R4C15_keyshape"
              onClick={onClick}
              className="key"
              width={57}
              height={57}
              x={823}
              y={410}
              fill={getColor(4, 9)}
              stroke={stroke(4, 9)}
              strokeWidth={getStrokeWidth(4, 9)}
              dataLedIndex={getLEDIndex(4, 9)}
              dataKeyIndex={keyIndex(4, 9)}
              dataLayer={layer}
              contrastText={getContrastText(getColor(4, 9))}
              centerPrimary={getCenterPrimary(4, 9, 0, 0, true)}
              centerExtra={getCenterExtra(4, 9, 0, 0, true)}
            />

            <Key
              keyType="defy-tR7"
              id="R4C15_keyshape"
              onClick={onClick}
              className="key"
              width={57}
              height={57}
              x={754}
              y={420}
              fill={getColor(4, 10)}
              stroke={stroke(4, 10)}
              strokeWidth={getStrokeWidth(4, 10)}
              dataLedIndex={getLEDIndex(4, 10)}
              dataKeyIndex={keyIndex(4, 10)}
              dataLayer={layer}
              contrastText={getContrastText(getColor(4, 10))}
              centerPrimary={getCenterPrimary(4, 10, 0, 0, true)}
              centerExtra={getCenterExtra(4, 10, 0, 0, true)}
            />

            <Key
              keyType="defy-tR8"
              id="R4C7_keyshape"
              onClick={onClick}
              className="key"
              width={57}
              height={116}
              x={686}
              y={434}
              fill={getColor(4, 11)}
              stroke={stroke(4, 11)}
              strokeWidth={getStrokeWidth(4, 11)}
              dataLedIndex={getLEDIndex(4, 11)}
              dataKeyIndex={keyIndex(4, 11)}
              dataLayer={layer}
              contrastText={getContrastText(getColor(4, 11))}
              centerPrimary={getCenterPrimary(4, 11, 0, 0, true)}
              centerExtra={getCenterExtra(4, 11, 0, 0, true)}
            />
          </g>
          <g id="Areas">
            {/* Left side */}
            <UnderGlowStrip
              id="70_undeglow"
              x={445}
              y={743}
              onClick={e => {
                setUndeglowIndex(70, e);
              }}
              selectedLED={this.props.selectedLED}
              visibility={this.props.showUnderglow || this.props.isStandardView ? true : false}
              clickAble={this.props.isStandardView && !this.props.showUnderglow ? false : true}
              fill={getColor(70)}
              stroke={stroke(70)}
              strokeWidth={getStrokeWidth(70)}
              dataLedIndex={getLEDIndex(70)}
              dataKeyIndex={keyIndex(70)}
              dataLayer={layer}
              path="M6.20999 19.84H4.47C3.40914 19.84 2.39172 19.4185 1.64157 18.6684C0.891426 17.9182 0.470001 16.9009 0.470001 15.84C0.470001 14.7792 0.891426 13.7617 1.64157 13.0115C2.39172 12.2614 3.40914 11.84 4.47 11.84H6.20999C10.5481 11.8402 14.8393 10.9419 18.8133 9.20196C22.7872 7.46197 26.3577 4.9178 29.3 1.72991C29.6463 1.31366 30.0735 0.972085 30.5558 0.725823C31.038 0.479562 31.5652 0.333774 32.1055 0.297296C32.6457 0.260817 33.1877 0.334406 33.6987 0.513604C34.2097 0.692802 34.6789 0.973855 35.0781 1.33978C35.4772 1.7057 35.7979 2.14887 36.0207 2.64239C36.2435 3.13591 36.3637 3.66949 36.3742 4.21087C36.3847 4.75225 36.2851 5.29016 36.0815 5.79192C35.878 6.29369 35.5747 6.74886 35.19 7.12994C31.5008 11.137 27.0206 14.3355 22.0325 16.5231C17.0444 18.7108 11.6567 19.8402 6.20999 19.84V19.84Z"
            />
            <UnderGlowStrip
              id="71_undeglow"
              x={479}
              y={704}
              onClick={e => {
                setUndeglowIndex(71, e);
              }}
              selectedLED={this.props.selectedLED}
              visibility={this.props.showUnderglow || this.props.isStandardView ? true : false}
              clickAble={this.props.isStandardView && !this.props.showUnderglow ? false : true}
              fill={getColor(71)}
              stroke={stroke(71)}
              strokeWidth={getStrokeWidth(71)}
              dataLedIndex={getLEDIndex(71)}
              dataKeyIndex={keyIndex(71)}
              dataLayer={layer}
              path="M4.3 38.31C3.62973 38.3092 2.97042 38.1399 2.38261 37.8178C1.7948 37.4958 1.29735 37.0311 0.935956 36.4667C0.574561 35.9022 0.360812 35.2559 0.314343 34.5873C0.267874 33.9186 0.390189 33.249 0.670025 32.6399C1.51772 30.7876 2.1874 28.859 2.67003 26.8799L8.34001 3.42997C8.58931 2.39828 9.23825 1.50786 10.1441 0.954627C11.0499 0.401395 12.1383 0.230653 13.17 0.479957C14.2017 0.72926 15.0921 1.37817 15.6453 2.28397C16.1986 3.18977 16.3693 4.27828 16.12 5.30997L10.45 28.7599C9.84265 31.2358 9.00569 33.6496 7.95002 35.9699C7.63091 36.6696 7.1169 37.2623 6.46956 37.6773C5.82221 38.0924 5.06895 38.312 4.3 38.31Z"
            />
            <UnderGlowStrip
              id="72_undeglow"
              x={489}
              y={663}
              onClick={e => {
                setUndeglowIndex(72, e);
              }}
              selectedLED={this.props.selectedLED}
              visibility={this.props.showUnderglow || this.props.isStandardView ? true : false}
              clickAble={this.props.isStandardView && !this.props.showUnderglow ? false : true}
              fill={getColor(72)}
              stroke={stroke(72)}
              strokeWidth={getStrokeWidth(72)}
              dataLedIndex={getLEDIndex(72)}
              dataKeyIndex={keyIndex(72)}
              dataLayer={layer}
              path="M4.77999 38.68C4.46328 38.683 4.14746 38.646 3.83999 38.57C3.32901 38.4468 2.84733 38.224 2.42248 37.9146C1.99763 37.6051 1.63795 37.2149 1.36397 36.7664C1.09 36.3178 0.907126 35.8197 0.825797 35.3004C0.744468 34.7811 0.766265 34.2509 0.889976 33.74L8.17998 3.61C8.30343 3.09916 8.52627 2.6176 8.83581 2.19288C9.14534 1.76817 9.53552 1.40859 9.98403 1.13466C10.4325 0.860724 10.9306 0.677833 11.4498 0.596388C11.969 0.514943 12.4992 0.536544 13.01 0.659987C13.5208 0.783429 14.0024 1.00627 14.4271 1.31581C14.8518 1.62535 15.2114 2.0155 15.4853 2.464C15.7592 2.91251 15.9422 3.41063 16.0236 3.92982C16.1051 4.44902 16.0834 4.97916 15.96 5.49L8.67 35.62C8.45904 36.4926 7.96067 37.2688 7.25509 37.8239C6.5495 38.3789 5.67772 38.6805 4.77999 38.68V38.68Z"
            />
            <UnderGlowStrip
              id="73_undeglow"
              x={500}
              y={623}
              onClick={e => {
                setUndeglowIndex(73, e);
              }}
              selectedLED={this.props.selectedLED}
              visibility={this.props.showUnderglow || this.props.isStandardView ? true : false}
              clickAble={this.props.isStandardView && !this.props.showUnderglow ? false : true}
              fill={getColor(73)}
              stroke={stroke(73)}
              strokeWidth={getStrokeWidth(73)}
              dataLedIndex={getLEDIndex(73)}
              dataKeyIndex={keyIndex(73)}
              dataLayer={layer}
              path="M4.69001 38.91C4.37359 38.9079 4.05836 38.871 3.75001 38.8C3.23453 38.6823 2.74748 38.4636 2.31706 38.1565C1.88664 37.8494 1.52139 37.4599 1.24241 37.0108C0.963432 36.5616 0.776272 36.0616 0.691754 35.5396C0.607236 35.0177 0.627033 34.4842 0.750012 33.9699L8.04002 3.83994C8.28932 2.80825 8.93824 1.91783 9.84404 1.3646C10.7498 0.811368 11.8383 0.640626 12.87 0.88993C13.9017 1.13923 14.7921 1.78821 15.3453 2.69401C15.8986 3.59981 16.0693 4.68825 15.82 5.71995L8.53001 35.85C8.32111 36.7143 7.83018 37.4843 7.13478 38.0385C6.43937 38.5926 5.57915 38.8993 4.69001 38.91V38.91Z"
            />
            <UnderGlowStrip
              id="74_undeglow"
              x={510}
              y={582}
              onClick={e => {
                setUndeglowIndex(74, e);
              }}
              selectedLED={this.props.selectedLED}
              visibility={this.props.showUnderglow || this.props.isStandardView ? true : false}
              clickAble={this.props.isStandardView && !this.props.showUnderglow ? false : true}
              fill={getColor(74)}
              stroke={stroke(74)}
              strokeWidth={getStrokeWidth(74)}
              dataLedIndex={getLEDIndex(74)}
              dataKeyIndex={keyIndex(74)}
              dataLayer={layer}
              path="M4.57 39.04C4.23359 39.0411 3.89813 39.0042 3.57 38.93C2.53988 38.679 1.65156 38.0292 1.10027 37.1235C0.548989 36.2178 0.379843 35.1303 0.629997 34.1L5.05999 15.78C6.0631 11.6424 7.38025 7.58728 8.99999 3.64997C9.17373 3.13244 9.45157 2.65594 9.8164 2.24982C10.1812 1.84371 10.6253 1.5166 11.1213 1.28858C11.6174 1.06057 12.1548 0.936498 12.7006 0.924019C13.2464 0.91154 13.7889 1.01091 14.2949 1.21601C14.8008 1.42112 15.2593 1.72763 15.6424 2.11665C16.0254 2.50566 16.3247 2.96892 16.5219 3.47797C16.7191 3.98703 16.81 4.53109 16.7891 5.07661C16.7681 5.62212 16.6357 6.15756 16.4 6.64997C14.9349 10.2206 13.7447 13.898 12.84 17.65L8.39999 35.97C8.19343 36.8345 7.7048 37.6056 7.01125 38.1615C6.3177 38.7174 5.45875 39.0265 4.57 39.04V39.04Z"
            />
            <UnderGlowStrip
              id="75_undeglow"
              x={523}
              y={549}
              onClick={e => {
                setUndeglowIndex(75, e);
              }}
              selectedLED={this.props.selectedLED}
              visibility={this.props.showUnderglow || this.props.isStandardView ? true : false}
              clickAble={this.props.isStandardView && !this.props.showUnderglow ? false : true}
              fill={getColor(75)}
              stroke={stroke(75)}
              strokeWidth={getStrokeWidth(75)}
              dataLedIndex={getLEDIndex(75)}
              dataKeyIndex={keyIndex(75)}
              dataLayer={layer}
              path="M4.61999 31.3199C3.91709 31.3216 3.22656 31.1351 2.61999 30.78C2.16498 30.5153 1.76669 30.1635 1.44793 29.7446C1.12918 29.3257 0.896226 28.848 0.762449 28.3389C0.628671 27.8298 0.59668 27.2993 0.668333 26.7778C0.739985 26.2563 0.91386 25.7541 1.17999 25.3C6.65188 15.8904 13.9156 7.64482 22.56 1.02996C22.9769 0.710192 23.4528 0.475705 23.9604 0.339836C24.4679 0.203967 24.9973 0.169375 25.5182 0.23809C26.0392 0.306806 26.5415 0.477449 26.9965 0.740287C27.4515 1.00313 27.8502 1.353 28.17 1.76995C28.4898 2.1869 28.7243 2.66276 28.8601 3.17034C28.996 3.67792 29.0306 4.20727 28.9619 4.7282C28.8931 5.24914 28.7225 5.75149 28.4597 6.20647C28.1968 6.66146 27.8469 7.06017 27.43 7.37994C19.6063 13.3775 13.0355 20.8521 8.08999 29.3799C7.73089 29.9777 7.22175 30.4713 6.61307 30.8116C6.00438 31.1519 5.31731 31.3271 4.61999 31.3199V31.3199Z"
            />
            <UnderGlowStrip
              id="76_undeglow"
              x={550}
              y={524}
              onClick={e => {
                setUndeglowIndex(76, e);
              }}
              selectedLED={this.props.selectedLED}
              visibility={this.props.showUnderglow || this.props.isStandardView ? true : false}
              clickAble={this.props.isStandardView && !this.props.showUnderglow ? false : true}
              fill={getColor(76)}
              stroke={stroke(76)}
              strokeWidth={getStrokeWidth(76)}
              dataLedIndex={getLEDIndex(76)}
              dataKeyIndex={keyIndex(76)}
              dataLayer={layer}
              path="M4.78002 26.65C3.93963 26.6486 3.12103 26.3826 2.44039 25.8897C1.75975 25.3967 1.25164 24.7019 0.98821 23.9039C0.724779 23.1058 0.719406 22.2451 0.972829 21.4439C1.22625 20.6426 1.7256 19.9415 2.40001 19.4401L27.31 0.990059C28.1627 0.358844 29.2312 0.0921946 30.2804 0.248787C31.3297 0.40538 32.2738 0.972349 32.905 1.82502C33.5362 2.67769 33.8029 3.74621 33.6463 4.79548C33.4897 5.84475 32.9227 6.78884 32.07 7.42005L7.20003 25.91C6.4928 26.4082 5.64492 26.6675 4.78002 26.65V26.65Z"
            />
            <UnderGlowStrip
              id="77_undeglow"
              x={583}
              y={491}
              onClick={e => {
                setUndeglowIndex(77, e);
              }}
              selectedLED={this.props.selectedLED}
              visibility={this.props.showUnderglow || this.props.isStandardView ? true : false}
              clickAble={this.props.isStandardView && !this.props.showUnderglow ? false : true}
              fill={getColor(77)}
              stroke={stroke(77)}
              strokeWidth={getStrokeWidth(77)}
              dataLedIndex={getLEDIndex(77)}
              dataKeyIndex={keyIndex(77)}
              dataLayer={layer}
              path="M4.13002 34.11C3.33686 34.1087 2.56204 33.8715 1.90395 33.4288C1.24586 32.9861 0.73421 32.3577 0.4341 31.6235C0.13399 30.8893 0.0589337 30.0825 0.218463 29.3055C0.377992 28.5286 0.764904 27.8165 1.33004 27.26C8.32522 20.378 13.7611 12.0742 17.27 2.91001C17.4591 2.41952 17.743 1.97109 18.1054 1.5903C18.4678 1.20952 18.9017 0.903817 19.3822 0.690706C19.8628 0.477596 20.3806 0.36123 20.9061 0.348238C21.4316 0.335245 21.9545 0.425919 22.445 0.615023C22.9355 0.804126 23.3839 1.08794 23.7647 1.45035C24.1455 1.81276 24.4512 2.24666 24.6643 2.72721C24.8774 3.20775 24.9938 3.72555 25.0068 4.25107C25.0198 4.77659 24.9292 5.29952 24.7401 5.79001C20.8172 16.0086 14.7433 25.2644 6.93007 32.93C6.18828 33.6763 5.18223 34.1003 4.13002 34.11Z"
            />
            <UnderGlowStrip
              id="78_undeglow"
              x={594}
              y={415}
              onClick={e => {
                setUndeglowIndex(78, e);
              }}
              selectedLED={this.props.selectedLED}
              visibility={this.props.showUnderglow || this.props.isStandardView ? true : false}
              clickAble={this.props.isStandardView && !this.props.showUnderglow ? false : true}
              fill={getColor(78)}
              stroke={stroke(78)}
              strokeWidth={getStrokeWidth(78)}
              dataLedIndex={getLEDIndex(78)}
              dataKeyIndex={keyIndex(78)}
              dataLayer={layer}
              path="M14.19 73.91C13.8977 73.9098 13.6062 73.8796 13.32 73.82C12.2896 73.5817 11.3956 72.945 10.8334 72.0492C10.2712 71.1534 10.0866 70.0715 10.32 69.04C12.4601 59.4756 12.5317 49.5643 10.53 39.97C10.33 39.05 9.60002 36.1 9.34002 35.2L0.780021 5.36001C0.486957 4.34025 0.61102 3.24583 1.12487 2.31753C1.63872 1.38922 2.50025 0.70306 3.52001 0.409995C4.53977 0.116931 5.63419 0.240994 6.56249 0.754844C7.4908 1.26869 8.17696 2.13023 8.47002 3.14999L17.04 32.95C17.33 33.95 18.15 37.26 18.36 38.29C19.4482 43.4456 19.9946 48.7008 19.99 53.97C19.9895 59.6109 19.3691 65.2347 18.14 70.74C17.9485 71.643 17.4506 72.452 16.7306 73.0298C16.0107 73.6076 15.1131 73.9185 14.19 73.91V73.91Z"
            />
            <UnderGlowStrip
              id="79_undeglow"
              x={582}
              y={374}
              onClick={e => {
                setUndeglowIndex(79, e);
              }}
              selectedLED={this.props.selectedLED}
              visibility={this.props.showUnderglow || this.props.isStandardView ? true : false}
              clickAble={this.props.isStandardView && !this.props.showUnderglow ? false : true}
              fill={getColor(79)}
              stroke={stroke(79)}
              strokeWidth={getStrokeWidth(79)}
              dataLedIndex={getLEDIndex(79)}
              dataKeyIndex={keyIndex(79)}
              dataLayer={layer}
              path="M13.54 38.69C12.672 38.6888 11.8279 38.4051 11.1352 37.882C10.4425 37.3589 9.93872 36.6246 9.7 35.79L1.13 6.00004C0.836932 4.98028 0.960996 3.88586 1.47485 2.95756C1.98869 2.02925 2.85029 1.34309 3.87005 1.05003C4.88981 0.756963 5.98416 0.880966 6.91247 1.39482C7.84077 1.90866 8.52694 2.77026 8.82 3.79002L17.38 33.58C17.5328 34.0882 17.5829 34.6217 17.5275 35.1494C17.472 35.6771 17.3122 36.1885 17.0572 36.6538C16.8022 37.1192 16.4572 37.5292 16.0422 37.8598C15.6272 38.1905 15.1505 38.4353 14.64 38.58C14.2807 38.6701 13.9101 38.7072 13.54 38.69V38.69Z"
            />
            <UnderGlowStrip
              id="80_undeglow"
              x={573}
              y={334}
              onClick={e => {
                setUndeglowIndex(80, e);
              }}
              selectedLED={this.props.selectedLED}
              visibility={this.props.showUnderglow || this.props.isStandardView ? true : false}
              clickAble={this.props.isStandardView && !this.props.showUnderglow ? false : true}
              fill={getColor(80)}
              stroke={stroke(80)}
              strokeWidth={getStrokeWidth(80)}
              dataLedIndex={getLEDIndex(80)}
              dataKeyIndex={keyIndex(80)}
              dataLayer={layer}
              path="M11.93 38.32C11.0633 38.3193 10.2201 38.0372 9.52758 37.516C8.83504 36.9948 8.33055 36.2627 8.09002 35.43L3.38003 19.03C2.0574 14.3875 1.05504 9.65971 0.38003 4.87995C0.30452 4.35992 0.332174 3.83015 0.46142 3.32081C0.590667 2.81146 0.818969 2.33256 1.1333 1.91145C1.76811 1.06097 2.71475 0.497478 3.76501 0.344978C4.81527 0.192479 5.8831 0.463464 6.73358 1.09827C7.58405 1.73308 8.14754 2.67973 8.30004 3.72999C8.93549 8.15259 9.87437 12.5262 11.11 16.82L15.82 33.22C16.1102 34.2384 15.9848 35.3303 15.4711 36.2564C14.9575 37.1824 14.0976 37.867 13.08 38.16C12.7069 38.2708 12.3192 38.3248 11.93 38.32V38.32Z"
            />
            <UnderGlowStrip
              id="81_undeglow"
              x={573}
              y={292}
              onClick={e => {
                setUndeglowIndex(81, e);
              }}
              selectedLED={this.props.selectedLED}
              visibility={this.props.showUnderglow || this.props.isStandardView ? true : false}
              clickAble={this.props.isStandardView && !this.props.showUnderglow ? false : true}
              fill={getColor(81)}
              stroke={stroke(81)}
              strokeWidth={getStrokeWidth(81)}
              dataLedIndex={getLEDIndex(81)}
              dataKeyIndex={keyIndex(81)}
              dataLayer={layer}
              path="M4.31 39.36C3.27295 39.3607 2.27619 38.9585 1.52994 38.2384C0.78369 37.5182 0.346294 36.5364 0.309998 35.5C0.259998 34.24 0.23999 32.98 0.23999 31.72V4.36002C0.23999 3.29915 0.661415 2.28173 1.41156 1.53159C2.16171 0.78144 3.17912 0.360016 4.23999 0.360016C5.30086 0.360016 6.31831 0.78144 7.06845 1.53159C7.8186 2.28173 8.24002 3.29915 8.24002 4.36002V31.72C8.24002 32.88 8.24002 34.05 8.30002 35.21C8.33784 36.2694 7.9536 37.3004 7.23172 38.0767C6.50984 38.853 5.50934 39.3109 4.45001 39.35L4.31 39.36Z"
            />
            <UnderGlowStrip
              id="82_undeglow"
              x={573}
              y={250}
              onClick={e => {
                setUndeglowIndex(82, e);
              }}
              selectedLED={this.props.selectedLED}
              visibility={this.props.showUnderglow || this.props.isStandardView ? true : false}
              clickAble={this.props.isStandardView && !this.props.showUnderglow ? false : true}
              fill={getColor(82)}
              stroke={stroke(82)}
              strokeWidth={getStrokeWidth(82)}
              dataLedIndex={getLEDIndex(82)}
              dataKeyIndex={keyIndex(82)}
              dataLayer={layer}
              path="M4.25 39.36C3.18913 39.36 2.17172 38.9386 1.42157 38.1884C0.671424 37.4383 0.25 36.4209 0.25 35.36V4.36002C0.25 3.29915 0.671424 2.28173 1.42157 1.53159C2.17172 0.78144 3.18913 0.360016 4.25 0.360016C5.31087 0.360016 6.32825 0.78144 7.0784 1.53159C7.82855 2.28173 8.24997 3.29915 8.24997 4.36002V35.36C8.24997 36.4209 7.82855 37.4383 7.0784 38.1884C6.32825 38.9386 5.31087 39.36 4.25 39.36Z"
            />
            <UnderGlowStrip
              id="83_undeglow"
              x={573}
              y={209}
              onClick={e => {
                setUndeglowIndex(83, e);
              }}
              selectedLED={this.props.selectedLED}
              visibility={this.props.showUnderglow || this.props.isStandardView ? true : false}
              clickAble={this.props.isStandardView && !this.props.showUnderglow ? false : true}
              fill={getColor(83)}
              stroke={stroke(83)}
              strokeWidth={getStrokeWidth(83)}
              dataLedIndex={getLEDIndex(83)}
              dataKeyIndex={keyIndex(83)}
              dataLayer={layer}
              path="M4.25 39.36C3.18913 39.36 2.17172 38.9386 1.42157 38.1884C0.671424 37.4383 0.25 36.4209 0.25 35.36V4.36002C0.25 3.29915 0.671424 2.28173 1.42157 1.53159C2.17172 0.78144 3.18913 0.360016 4.25 0.360016C5.31087 0.360016 6.32825 0.78144 7.0784 1.53159C7.82855 2.28173 8.24997 3.29915 8.24997 4.36002V35.36C8.24997 36.4209 7.82855 37.4383 7.0784 38.1884C6.32825 38.9386 5.31087 39.36 4.25 39.36Z"
            />
            <UnderGlowStrip
              id="84_undeglow"
              x={573}
              y={167}
              onClick={e => {
                setUndeglowIndex(84, e);
              }}
              selectedLED={this.props.selectedLED}
              visibility={this.props.showUnderglow || this.props.isStandardView ? true : false}
              clickAble={this.props.isStandardView && !this.props.showUnderglow ? false : true}
              fill={getColor(84)}
              stroke={stroke(84)}
              strokeWidth={getStrokeWidth(84)}
              dataLedIndex={getLEDIndex(84)}
              dataKeyIndex={keyIndex(84)}
              dataLayer={layer}
              path="M4.25 39.36C3.18913 39.36 2.17172 38.9386 1.42157 38.1884C0.671424 37.4383 0.25 36.4209 0.25 35.36V4.36002C0.25 3.29915 0.671424 2.28173 1.42157 1.53159C2.17172 0.78144 3.18913 0.360016 4.25 0.360016C5.31087 0.360016 6.32825 0.78144 7.0784 1.53159C7.82855 2.28173 8.24997 3.29915 8.24997 4.36002V35.36C8.24997 36.4209 7.82855 37.4383 7.0784 38.1884C6.32825 38.9386 5.31087 39.36 4.25 39.36Z"
            />
            <UnderGlowStrip
              id="85_undeglow"
              x={573}
              y={124}
              onClick={e => {
                setUndeglowIndex(85, e);
              }}
              selectedLED={this.props.selectedLED}
              visibility={this.props.showUnderglow || this.props.isStandardView ? true : false}
              clickAble={this.props.isStandardView && !this.props.showUnderglow ? false : true}
              fill={getColor(85)}
              stroke={stroke(85)}
              strokeWidth={getStrokeWidth(85)}
              dataLedIndex={getLEDIndex(85)}
              dataKeyIndex={keyIndex(85)}
              dataLayer={layer}
              path="M4.25 39.36C3.18913 39.36 2.17172 38.9386 1.42157 38.1884C0.671424 37.4383 0.25 36.4209 0.25 35.36V4.36002C0.25 3.29915 0.671424 2.28173 1.42157 1.53159C2.17172 0.78144 3.18913 0.360016 4.25 0.360016C5.31087 0.360016 6.32825 0.78144 7.0784 1.53159C7.82855 2.28173 8.24997 3.29915 8.24997 4.36002V35.36C8.24997 36.4209 7.82855 37.4383 7.0784 38.1884C6.32825 38.9386 5.31087 39.36 4.25 39.36Z"
            />

            <UnderGlowStrip
              id="86_undeglow"
              x={552}
              y={91}
              onClick={e => {
                setUndeglowIndex(86, e);
              }}
              selectedLED={this.props.selectedLED}
              visibility={this.props.showUnderglow || this.props.isStandardView ? true : false}
              clickAble={this.props.isStandardView && !this.props.showUnderglow ? false : true}
              fill={getColor(86)}
              stroke={stroke(86)}
              strokeWidth={getStrokeWidth(86)}
              dataLedIndex={getLEDIndex(86)}
              dataKeyIndex={keyIndex(86)}
              dataLayer={layer}
              path="M23.84 30.38C22.8974 30.3796 21.9851 30.0463 21.2643 29.4389C20.5434 28.8314 20.0603 27.9889 19.9 27.06C19.1211 22.6824 17.1359 18.6091 14.1679 15.2983C11.1999 11.9876 7.36682 9.57083 3.10002 8.32002C2.11714 7.99568 1.29822 7.30298 0.81538 6.38749C0.332543 5.47201 0.223369 4.40502 0.510784 3.41072C0.7982 2.41641 1.45985 1.57223 2.35667 1.05555C3.25349 0.538874 4.31568 0.38993 5.32002 0.640025C11.0268 2.30976 16.1535 5.54075 20.122 9.96864C24.0905 14.3965 26.7429 19.8452 27.78 25.7C27.8791 26.2742 27.8515 26.8631 27.6991 27.4256C27.5468 27.988 27.2735 28.5104 26.8982 28.9562C26.523 29.4019 26.0548 29.7603 25.5266 30.0062C24.9983 30.2522 24.4227 30.3798 23.84 30.38Z"
            />

            <UnderGlowStrip
              id="87_undeglow"
              x={512}
              y={84}
              onClick={e => {
                setUndeglowIndex(87, e);
              }}
              selectedLED={this.props.selectedLED}
              visibility={this.props.showUnderglow || this.props.isStandardView ? true : false}
              clickAble={this.props.isStandardView && !this.props.showUnderglow ? false : true}
              fill={getColor(87)}
              stroke={stroke(87)}
              strokeWidth={getStrokeWidth(87)}
              dataLedIndex={getLEDIndex(87)}
              dataKeyIndex={keyIndex(87)}
              dataLayer={layer}
              path="M33.31 14.39H11.9C9.84222 14.3966 7.86392 13.5959 6.38997 12.16L1.67 7.58998C0.907504 6.85136 0.469655 5.8401 0.452777 4.77864C0.435899 3.71719 0.841347 2.69248 1.57997 1.92998C2.3186 1.16748 3.32989 0.729635 4.39135 0.712756C5.4528 0.695878 6.47748 1.10136 7.23998 1.83998L11.96 6.42H33.31C34.3709 6.42 35.3883 6.84143 36.1384 7.59157C36.8886 8.34172 37.31 9.35914 37.31 10.42C37.31 11.4809 36.8886 12.4983 36.1384 13.2484C35.3883 13.9986 34.3709 14.42 33.31 14.42V14.39Z"
            />
            <UnderGlowStrip
              id="88_undeglow"
              x={480}
              y={59}
              onClick={e => {
                setUndeglowIndex(88, e);
              }}
              selectedLED={this.props.selectedLED}
              visibility={this.props.showUnderglow || this.props.isStandardView ? true : false}
              clickAble={this.props.isStandardView && !this.props.showUnderglow ? false : true}
              fill={getColor(88)}
              stroke={stroke(88)}
              strokeWidth={getStrokeWidth(88)}
              dataLedIndex={getLEDIndex(88)}
              dataKeyIndex={keyIndex(88)}
              dataLayer={layer}
              path="M28.56 27.06C27.519 27.053 26.5217 26.6405 25.78 25.91L12.08 12.62C9.85559 10.4452 6.95595 9.09416 3.85997 8.79C2.7991 8.68258 1.82439 8.15815 1.15019 7.33205C0.475999 6.50595 0.157556 5.44586 0.264969 4.385C0.372382 3.32413 0.896849 2.34938 1.72295 1.67519C2.54904 1.00099 3.60913 0.682582 4.67 0.789995C9.56538 1.26913 14.1511 3.40321 17.67 6.83998L31.37 20.12C31.945 20.6742 32.3409 21.3878 32.5069 22.169C32.6728 22.9502 32.601 23.7632 32.3009 24.5032C32.0008 25.2433 31.486 25.8766 30.8229 26.3216C30.1597 26.7665 29.3786 27.0028 28.58 27L28.56 27.06Z"
            />
            <UnderGlowStrip
              id="89_undeglow"
              x={438}
              y={59}
              onClick={e => {
                setUndeglowIndex(89, e);
              }}
              selectedLED={this.props.selectedLED}
              visibility={this.props.showUnderglow || this.props.isStandardView ? true : false}
              clickAble={this.props.isStandardView && !this.props.showUnderglow ? false : true}
              fill={getColor(89)}
              stroke={stroke(89)}
              strokeWidth={getStrokeWidth(89)}
              dataLedIndex={getLEDIndex(89)}
              dataKeyIndex={keyIndex(89)}
              dataLayer={layer}
              path="M35.27 8.73999H4.26999C3.20912 8.73999 2.1917 8.31857 1.44156 7.56842C0.691413 6.81827 0.269989 5.80086 0.269989 4.73999C0.269989 3.67912 0.691413 2.66174 1.44156 1.91159C2.1917 1.16145 3.20912 0.73999 4.26999 0.73999H35.27C36.3309 0.73999 37.3483 1.16145 38.0984 1.91159C38.8486 2.66174 39.27 3.67912 39.27 4.73999C39.27 5.80086 38.8486 6.81827 38.0984 7.56842C37.3483 8.31857 36.3309 8.73999 35.27 8.73999Z"
            />

            <UnderGlowStrip
              id="90_undeglow"
              x={396}
              y={56}
              onClick={e => {
                setUndeglowIndex(90, e);
              }}
              selectedLED={this.props.selectedLED}
              visibility={this.props.showUnderglow || this.props.isStandardView ? true : false}
              clickAble={this.props.isStandardView && !this.props.showUnderglow ? false : true}
              fill={getColor(90)}
              stroke={stroke(90)}
              strokeWidth={getStrokeWidth(90)}
              dataLedIndex={getLEDIndex(90)}
              dataKeyIndex={keyIndex(90)}
              dataLayer={layer}
              path="M35.27 10.74H11.47C8.23457 10.7269 5.07914 9.7332 2.42002 7.89002C1.96847 7.59882 1.5802 7.21961 1.27842 6.77506C0.976635 6.33051 0.767512 5.82973 0.66352 5.30259C0.559528 4.77544 0.562814 4.23276 0.673164 3.70691C0.783514 3.18106 0.998663 2.68282 1.30579 2.24195C1.61292 1.80108 2.00573 1.4266 2.46076 1.14087C2.91579 0.855146 3.42371 0.664037 3.95423 0.578923C4.48475 0.493808 5.02698 0.516437 5.54856 0.645481C6.07014 0.774526 6.56037 1.00735 6.99 1.33002C8.3067 2.24161 9.86856 2.73315 11.47 2.73999H35.27C36.3309 2.73999 37.3483 3.16145 38.0984 3.91159C38.8486 4.66174 39.27 5.67913 39.27 6.73999C39.27 7.80086 38.8486 8.81828 38.0984 9.56842C37.3483 10.3186 36.3309 10.74 35.27 10.74Z"
            />
            <UnderGlowStrip
              id="91_undeglow"
              x={362}
              y={35}
              onClick={e => {
                setUndeglowIndex(91, e);
              }}
              selectedLED={this.props.selectedLED}
              visibility={this.props.showUnderglow || this.props.isStandardView ? true : false}
              clickAble={this.props.isStandardView && !this.props.showUnderglow ? false : true}
              fill={getColor(91)}
              stroke={stroke(91)}
              strokeWidth={getStrokeWidth(91)}
              dataLedIndex={getLEDIndex(91)}
              dataKeyIndex={keyIndex(91)}
              dataLayer={layer}
              path="M30.99 22.91C30.1074 22.9101 29.2495 22.6183 28.55 22.08L14.68 11.31C11.9041 9.16698 8.49687 8.00311 4.98999 8H4.59C3.52913 8 2.51171 7.57858 1.76157 6.82843C1.01142 6.07828 0.589996 5.06087 0.589996 4C0.589996 2.93913 1.01142 1.92172 1.76157 1.17157C2.51171 0.421424 3.52913 0 4.59 0H4.98999C10.2675 0.0182659 15.3919 1.7756 19.57 5L33.45 15.74C34.1093 16.2517 34.592 16.9567 34.8306 17.7564C35.0692 18.5562 35.0517 19.4105 34.7805 20.1997C34.5093 20.989 33.9981 21.6737 33.3184 22.1579C32.6387 22.6421 31.8245 22.9016 30.99 22.9V22.91Z"
            />
            <UnderGlowStrip
              id="92_undeglow"
              x={319}
              y={35}
              onClick={e => {
                setUndeglowIndex(92, e);
              }}
              selectedLED={this.props.selectedLED}
              visibility={this.props.showUnderglow || this.props.isStandardView ? true : false}
              clickAble={this.props.isStandardView && !this.props.showUnderglow ? false : true}
              fill={getColor(92)}
              stroke={stroke(92)}
              strokeWidth={getStrokeWidth(92)}
              dataLedIndex={getLEDIndex(92)}
              dataKeyIndex={keyIndex(92)}
              dataLayer={layer}
              path="M35.59 8H4.59C3.52913 8 2.51171 7.57858 1.76157 6.82843C1.01142 6.07828 0.589996 5.06087 0.589996 4C0.589996 2.93913 1.01142 1.92172 1.76157 1.17157C2.51171 0.421424 3.52913 0 4.59 0H35.59C36.6509 0 37.6683 0.421424 38.4184 1.17157C39.1686 1.92172 39.59 2.93913 39.59 4C39.59 5.06087 39.1686 6.07828 38.4184 6.82843C37.6683 7.57858 36.6509 8 35.59 8Z"
            />
            <UnderGlowStrip
              id="93_undeglow"
              x={281}
              y={35}
              onClick={e => {
                setUndeglowIndex(93, e);
              }}
              selectedLED={this.props.selectedLED}
              visibility={this.props.showUnderglow || this.props.isStandardView ? true : false}
              clickAble={this.props.isStandardView && !this.props.showUnderglow ? false : true}
              fill={getColor(93)}
              stroke={stroke(93)}
              strokeWidth={getStrokeWidth(93)}
              dataLedIndex={getLEDIndex(93)}
              dataKeyIndex={keyIndex(93)}
              dataLayer={layer}
              path="M4.78001 20.85C3.97057 20.8428 3.18236 20.5902 2.51952 20.1256C1.85669 19.6609 1.35043 19.0061 1.06763 18.2476C0.784835 17.4892 0.738804 16.6627 0.935631 15.8775C1.13246 15.0924 1.56287 14.3854 2.17001 13.85L11.6 5.76999C15.9169 2.07079 21.415 0.0383127 27.1 0.0400096H31.64C32.7009 0.0400096 33.7183 0.461434 34.4684 1.21158C35.2186 1.96172 35.64 2.97914 35.64 4.04001C35.64 5.10088 35.2186 6.11829 34.4684 6.86844C33.7183 7.61859 32.7009 8.04001 31.64 8.04001H27.1C23.3204 8.02518 19.66 9.36233 16.78 11.81L7.33001 19.91C6.61577 20.5113 5.71366 20.8439 4.78001 20.85V20.85Z"
            />

            <UnderGlowStrip
              id="94_undeglow"
              x={243}
              y={55}
              onClick={e => {
                setUndeglowIndex(94, e);
              }}
              selectedLED={this.props.selectedLED}
              visibility={this.props.showUnderglow || this.props.isStandardView ? true : false}
              clickAble={this.props.isStandardView && !this.props.showUnderglow ? false : true}
              fill={getColor(94)}
              stroke={stroke(94)}
              strokeWidth={getStrokeWidth(94)}
              dataLedIndex={getLEDIndex(94)}
              dataKeyIndex={keyIndex(94)}
              dataLayer={layer}
              path="M25.64 11.74H4.39001C3.32915 11.74 2.31173 11.3186 1.56158 10.5684C0.811439 9.81827 0.390015 8.80085 0.390015 7.73998C0.390015 6.67912 0.811439 5.66173 1.56158 4.91158C2.31173 4.16144 3.32915 3.73998 4.39001 3.73998H25.64C27.5112 3.73962 29.3205 3.06916 30.74 1.85L31.74 0.969993C32.547 0.295483 33.5872 -0.0340119 34.6354 0.0528182C35.6836 0.139648 36.6555 0.635813 37.3405 1.43392C38.0255 2.23203 38.3686 3.26783 38.2955 4.31707C38.2225 5.36631 37.7391 6.34456 36.95 7.04L35.95 7.92999C33.0755 10.3852 29.4203 11.736 25.64 11.74Z"
            />
            <UnderGlowStrip
              id="95_undeglow"
              x={207}
              y={59}
              onClick={e => {
                setUndeglowIndex(95, e);
              }}
              selectedLED={this.props.selectedLED}
              visibility={this.props.showUnderglow || this.props.isStandardView ? true : false}
              clickAble={this.props.isStandardView && !this.props.showUnderglow ? false : true}
              fill={getColor(95)}
              stroke={stroke(95)}
              strokeWidth={getStrokeWidth(95)}
              dataLedIndex={getLEDIndex(95)}
              dataKeyIndex={keyIndex(95)}
              dataLayer={layer}
              path="M4.22001 23.8C3.39568 23.8 2.5915 23.5453 1.91746 23.0708C1.24341 22.5962 0.732424 21.9251 0.454412 21.149C0.1764 20.373 0.144943 19.5301 0.364324 18.7355C0.583705 17.9409 1.04321 17.2334 1.68 16.71L14.53 6.14999C18.7944 2.65528 24.1366 0.7438 29.65 0.73999H30.39C31.4509 0.73999 32.4683 1.16145 33.2184 1.91159C33.9686 2.66174 34.39 3.67912 34.39 4.73999C34.39 5.80086 33.9686 6.81827 33.2184 7.56842C32.4683 8.31857 31.4509 8.73999 30.39 8.73999H29.65C26.0028 8.74969 22.4706 10.0178 19.65 12.33L6.78 22.91C6.05624 23.4955 5.15091 23.8103 4.22001 23.8Z"
            />
            <UnderGlowStrip
              id="96_undeglow"
              x={167}
              y={80}
              onClick={e => {
                setUndeglowIndex(96, e);
              }}
              selectedLED={this.props.selectedLED}
              visibility={this.props.showUnderglow || this.props.isStandardView ? true : false}
              clickAble={this.props.isStandardView && !this.props.showUnderglow ? false : true}
              fill={getColor(96)}
              stroke={stroke(96)}
              strokeWidth={getStrokeWidth(96)}
              dataLedIndex={getLEDIndex(96)}
              dataKeyIndex={keyIndex(96)}
              dataLayer={layer}
              path="M30.62 9.48999H4.62C3.55913 9.48999 2.54172 9.06857 1.79157 8.31842C1.04143 7.56828 0.619995 6.55086 0.619995 5.48999C0.619995 4.42913 1.04143 3.41174 1.79157 2.66159C2.54172 1.91145 3.55913 1.48999 4.62 1.48999H30.62C31.7296 1.48578 32.8261 1.25083 33.84 0.80002C34.322 0.560098 34.8475 0.419954 35.385 0.388002C35.9225 0.356049 36.4609 0.432923 36.9679 0.614045C37.475 0.795168 37.9403 1.07679 38.3358 1.44205C38.7314 1.8073 39.0492 2.24867 39.2702 2.73969C39.4911 3.23071 39.6106 3.76127 39.6216 4.29959C39.6325 4.83791 39.5347 5.3729 39.3339 5.8725C39.1331 6.3721 38.8335 6.82602 38.4531 7.20706C38.0727 7.5881 37.6193 7.88841 37.12 8.09C35.0753 9.00668 32.8608 9.48364 30.62 9.48999Z"
            />
            <UnderGlowStrip
              id="97_undeglow"
              x={125}
              y={81}
              onClick={e => {
                setUndeglowIndex(97, e);
              }}
              selectedLED={this.props.selectedLED}
              visibility={this.props.showUnderglow || this.props.isStandardView ? true : false}
              clickAble={this.props.isStandardView && !this.props.showUnderglow ? false : true}
              fill={getColor(97)}
              stroke={stroke(97)}
              strokeWidth={getStrokeWidth(97)}
              dataLedIndex={getLEDIndex(97)}
              dataKeyIndex={keyIndex(97)}
              dataLayer={layer}
              path="M35.63 8.48999H4.63C3.56914 8.48999 2.55172 8.06857 1.80158 7.31842C1.05143 6.56827 0.630005 5.55086 0.630005 4.48999C0.630005 3.42912 1.05143 2.41174 1.80158 1.66159C2.55172 0.911445 3.56914 0.48999 4.63 0.48999H35.63C36.6909 0.48999 37.7083 0.911445 38.4584 1.66159C39.2086 2.41174 39.63 3.42912 39.63 4.48999C39.63 5.55086 39.2086 6.56827 38.4584 7.31842C37.7083 8.06857 36.6909 8.48999 35.63 8.48999Z"
            />
            <UnderGlowStrip
              id="98_undeglow"
              x={87}
              y={81}
              onClick={e => {
                setUndeglowIndex(98, e);
              }}
              selectedLED={this.props.selectedLED}
              visibility={this.props.showUnderglow || this.props.isStandardView ? true : false}
              clickAble={this.props.isStandardView && !this.props.showUnderglow ? false : true}
              fill={getColor(98)}
              stroke={stroke(98)}
              strokeWidth={getStrokeWidth(98)}
              dataLedIndex={getLEDIndex(98)}
              dataKeyIndex={keyIndex(98)}
              dataLayer={layer}
              path="M4.60001 20.91C3.85886 20.9086 3.13267 20.7013 2.50245 20.3113C1.87223 19.9213 1.36276 19.3638 1.0309 18.7011C0.699026 18.0384 0.557805 17.2965 0.622982 16.5583C0.688159 15.82 0.957174 15.1143 1.40001 14.52C4.63694 10.1873 8.83732 6.66688 13.6691 4.23709C18.5009 1.8073 23.8317 0.534727 29.24 0.519989H31.63C32.6909 0.519989 33.7083 0.941444 34.4584 1.69159C35.2086 2.44173 35.63 3.45912 35.63 4.51999C35.63 5.58085 35.2086 6.59827 34.4584 7.34842C33.7083 8.09856 32.6909 8.51999 31.63 8.51999H29.24C25.0697 8.49829 20.953 9.46044 17.2243 11.3283C13.4955 13.1961 10.2599 15.917 7.78001 19.27C7.41365 19.7714 6.93556 20.1807 6.38361 20.4654C5.83165 20.75 5.221 20.9023 4.60001 20.91Z"
            />
            <UnderGlowStrip
              id="99_undeglow"
              x={80}
              y={103}
              onClick={e => {
                setUndeglowIndex(99, e);
              }}
              selectedLED={this.props.selectedLED}
              visibility={this.props.showUnderglow || this.props.isStandardView ? true : false}
              clickAble={this.props.isStandardView && !this.props.showUnderglow ? false : true}
              fill={getColor(99)}
              stroke={stroke(99)}
              strokeWidth={getStrokeWidth(99)}
              dataLedIndex={getLEDIndex(99)}
              dataKeyIndex={keyIndex(99)}
              dataLayer={layer}
              path="M4.5 39.56C3.43913 39.56 2.42172 39.1386 1.67157 38.3884C0.921428 37.6383 0.5 36.6209 0.5 35.56V13.19C0.499544 9.9321 0.957362 6.69034 1.86 3.55999C1.99535 3.04324 2.23283 2.55882 2.55843 2.13534C2.88403 1.71186 3.29116 1.3579 3.75579 1.09432C4.22042 0.830744 4.73313 0.662906 5.26368 0.600701C5.79424 0.538496 6.33187 0.583184 6.84487 0.73214C7.35786 0.881096 7.83583 1.1313 8.25056 1.46798C8.66529 1.80466 9.00837 2.221 9.25958 2.69244C9.51079 3.16387 9.66503 3.68084 9.71319 4.21285C9.76135 4.74486 9.70246 5.28112 9.54 5.79C8.86129 8.19757 8.52466 10.6886 8.54 13.19V35.56C8.54003 36.0887 8.43525 36.6121 8.23174 37.1C8.02822 37.588 7.73 38.0307 7.35432 38.4027C6.97864 38.7746 6.53295 39.0684 6.04302 39.2671C5.55309 39.4657 5.02864 39.5653 4.5 39.56Z"
            />
            <UnderGlowStrip
              id="100_undeglow"
              x={80}
              y={145}
              onClick={e => {
                setUndeglowIndex(100, e);
              }}
              selectedLED={this.props.selectedLED}
              visibility={this.props.showUnderglow || this.props.isStandardView ? true : false}
              clickAble={this.props.isStandardView && !this.props.showUnderglow ? false : true}
              fill={getColor(100)}
              stroke={stroke(100)}
              strokeWidth={getStrokeWidth(100)}
              dataLedIndex={getLEDIndex(100)}
              dataKeyIndex={keyIndex(100)}
              dataLayer={layer}
              path="M4.45999 39.56C3.39913 39.56 2.38171 39.1386 1.63156 38.3884C0.881419 37.6383 0.459991 36.6209 0.459991 35.56V4.56C0.459991 3.49913 0.881419 2.48171 1.63156 1.73157C2.38171 0.981422 3.39913 0.559998 4.45999 0.559998C5.52086 0.559998 6.53827 0.981422 7.28842 1.73157C8.03856 2.48171 8.45999 3.49913 8.45999 4.56V35.56C8.45999 36.6209 8.03856 37.6383 7.28842 38.3884C6.53827 39.1386 5.52086 39.56 4.45999 39.56Z"
            />
            <UnderGlowStrip
              id="101_undeglow"
              x={80}
              y={187}
              onClick={e => {
                setUndeglowIndex(101, e);
              }}
              selectedLED={this.props.selectedLED}
              visibility={this.props.showUnderglow || this.props.isStandardView ? true : false}
              clickAble={this.props.isStandardView && !this.props.showUnderglow ? false : true}
              fill={getColor(101)}
              stroke={stroke(101)}
              strokeWidth={getStrokeWidth(101)}
              dataLedIndex={getLEDIndex(101)}
              dataKeyIndex={keyIndex(101)}
              dataLayer={layer}
              path="M4.41 39.56C3.34914 39.56 2.33172 39.1386 1.58158 38.3884C0.831431 37.6383 0.410004 36.6209 0.410004 35.56V4.56C0.410004 3.49913 0.831431 2.48171 1.58158 1.73157C2.33172 0.981422 3.34914 0.559998 4.41 0.559998C5.47087 0.559998 6.48829 0.981422 7.23843 1.73157C7.98858 2.48171 8.41 3.49913 8.41 4.56V35.56C8.41 36.6209 7.98858 37.6383 7.23843 38.3884C6.48829 39.1386 5.47087 39.56 4.41 39.56Z"
            />
            <UnderGlowStrip
              id="102_undeglow"
              x={80}
              y={229}
              onClick={e => {
                setUndeglowIndex(102, e);
              }}
              selectedLED={this.props.selectedLED}
              visibility={this.props.showUnderglow || this.props.isStandardView ? true : false}
              clickAble={this.props.isStandardView && !this.props.showUnderglow ? false : true}
              fill={getColor(102)}
              stroke={stroke(102)}
              strokeWidth={getStrokeWidth(102)}
              dataLedIndex={getLEDIndex(102)}
              dataKeyIndex={keyIndex(102)}
              dataLayer={layer}
              path="M4.35999 39.56C3.29912 39.56 2.2817 39.1386 1.53156 38.3885C0.781413 37.6383 0.359985 36.6209 0.359985 35.56V4.56003C0.359985 3.49916 0.781413 2.48171 1.53156 1.73157C2.2817 0.981422 3.29912 0.559998 4.35999 0.559998C5.42085 0.559998 6.43827 0.981422 7.18841 1.73157C7.93856 2.48171 8.35999 3.49916 8.35999 4.56003V35.56C8.35999 36.6209 7.93856 37.6383 7.18841 38.3885C6.43827 39.1386 5.42085 39.56 4.35999 39.56Z"
            />
            <UnderGlowStrip
              id="103_undeglow"
              x={74}
              y={271}
              onClick={e => {
                setUndeglowIndex(103, e);
              }}
              selectedLED={this.props.selectedLED}
              visibility={this.props.showUnderglow || this.props.isStandardView ? true : false}
              clickAble={this.props.isStandardView && !this.props.showUnderglow ? false : true}
              fill={getColor(103)}
              stroke={stroke(103)}
              strokeWidth={getStrokeWidth(103)}
              dataLedIndex={getLEDIndex(103)}
              dataKeyIndex={keyIndex(103)}
              dataLayer={layer}
              path="M4.64999 38.7C4.02388 38.6997 3.4066 38.5524 2.8478 38.27C2.289 37.9876 1.8043 37.578 1.43269 37.0741C1.06109 36.5702 0.812963 35.9861 0.708282 35.3688C0.603601 34.7515 0.645288 34.1182 0.829989 33.52L6.32999 15.67V4.56003C6.32999 3.49916 6.75142 2.48174 7.50156 1.7316C8.25171 0.981452 9.26912 0.560028 10.33 0.560028C11.3909 0.560028 12.4083 0.981452 13.1584 1.7316C13.9086 2.48174 14.33 3.49916 14.33 4.56003V16.91L8.46999 35.91C8.21267 36.7208 7.70356 37.4285 7.01661 37.9302C6.32966 38.4319 5.50065 38.7016 4.64999 38.7Z"
            />
            <UnderGlowStrip
              id="104_undeglow"
              x={62}
              y={312}
              onClick={e => {
                setUndeglowIndex(104, e);
              }}
              selectedLED={this.props.selectedLED}
              visibility={this.props.showUnderglow || this.props.isStandardView ? true : false}
              clickAble={this.props.isStandardView && !this.props.showUnderglow ? false : true}
              fill={getColor(104)}
              stroke={stroke(104)}
              strokeWidth={getStrokeWidth(104)}
              dataLedIndex={getLEDIndex(104)}
              dataKeyIndex={keyIndex(104)}
              dataLayer={layer}
              path="M4.27 37.84C3.86988 37.8393 3.47212 37.7787 3.09 37.66C2.07717 37.3466 1.23018 36.6439 0.735161 35.7064C0.240137 34.7688 0.13757 33.6731 0.449999 32.66L9.58 3.03998C9.7343 2.53768 9.98603 2.07068 10.3208 1.66566C10.6556 1.26064 11.0669 0.925525 11.5312 0.67945C11.9955 0.433375 12.5037 0.28118 13.0268 0.231513C13.5499 0.181846 14.0777 0.235657 14.58 0.38996C15.0823 0.544264 15.5493 0.796023 15.9543 1.13081C16.3593 1.46559 16.6945 1.87684 16.9405 2.34113C17.1866 2.80543 17.3388 3.31368 17.3885 3.8368C17.4382 4.35992 17.3843 4.88765 17.23 5.38996L8.09 35.02C7.83794 35.8364 7.33109 36.5507 6.64368 37.0581C5.95627 37.5656 5.12443 37.8396 4.27 37.84Z"
            />
            <UnderGlowStrip
              id="105_undeglow"
              x={54}
              y={352}
              onClick={e => {
                setUndeglowIndex(105, e);
              }}
              selectedLED={this.props.selectedLED}
              visibility={this.props.showUnderglow || this.props.isStandardView ? true : false}
              clickAble={this.props.isStandardView && !this.props.showUnderglow ? false : true}
              fill={getColor(105)}
              stroke={stroke(105)}
              strokeWidth={getStrokeWidth(105)}
              dataLedIndex={getLEDIndex(105)}
              dataKeyIndex={keyIndex(105)}
              dataLayer={layer}
              path="M4.23999 38.91H4.00999C3.4853 38.8806 2.97154 38.7482 2.49807 38.5202C2.0246 38.2921 1.60069 37.973 1.25058 37.5811C0.900474 37.1892 0.631019 36.7322 0.457616 36.2361C0.284213 35.74 0.210261 35.2147 0.239986 34.69C0.836617 24.0939 2.51195 13.5862 5.23999 3.32997C5.37577 2.82232 5.61024 2.34644 5.93001 1.92945C6.24978 1.51246 6.64858 1.16254 7.10363 0.899729C7.55867 0.636917 8.06104 0.466367 8.58203 0.397776C9.10302 0.329184 9.63243 0.36393 10.14 0.50001C11.163 0.774342 12.0354 1.44317 12.566 2.35987C13.0965 3.27658 13.2418 4.36628 12.97 5.38996C10.3727 15.1187 8.77442 25.0869 8.19999 35.14C8.14164 36.1536 7.70002 37.1071 6.96467 37.8072C6.22931 38.5073 5.25526 38.9015 4.23999 38.91Z"
            />
            <UnderGlowStrip
              id="106_undeglow"
              x={54}
              y={394}
              onClick={e => {
                setUndeglowIndex(106, e);
              }}
              selectedLED={this.props.selectedLED}
              visibility={this.props.showUnderglow || this.props.isStandardView ? true : false}
              clickAble={this.props.isStandardView && !this.props.showUnderglow ? false : true}
              fill={getColor(106)}
              stroke={stroke(106)}
              strokeWidth={getStrokeWidth(106)}
              dataLedIndex={getLEDIndex(106)}
              dataKeyIndex={keyIndex(106)}
              dataLayer={layer}
              path="M7.02999 39.91C6.01912 39.9128 5.04465 39.5328 4.30256 38.8464C3.56047 38.16 3.10581 37.218 3.02999 36.21L1.39999 14.38C1.16999 11.28 1.02999 8.14001 0.979994 5.04001C0.962646 4.50723 1.05196 3.97637 1.24269 3.47861C1.43342 2.98084 1.72172 2.52621 2.09065 2.14145C2.45958 1.75669 2.90169 1.44954 3.391 1.23807C3.88031 1.02659 4.40696 0.915052 4.93999 0.910004H4.99999C6.05055 0.909885 7.05897 1.32305 7.80742 2.06027C8.55586 2.79749 8.98424 3.79957 8.99999 4.85001C8.99999 7.79001 9.17999 10.77 9.39999 13.72L11.03 35.54C11.0696 36.064 11.0055 36.5907 10.8414 37.0899C10.6774 37.5892 10.4166 38.0512 10.0739 38.4496C9.7312 38.848 9.31338 39.1749 8.84429 39.4118C8.37519 39.6486 7.86403 39.7908 7.33999 39.83L7.02999 39.91Z"
            />
            <UnderGlowStrip
              id="107_undeglow"
              x={57}
              y={436}
              onClick={e => {
                setUndeglowIndex(107, e);
              }}
              selectedLED={this.props.selectedLED}
              visibility={this.props.showUnderglow || this.props.isStandardView ? true : false}
              clickAble={this.props.isStandardView && !this.props.showUnderglow ? false : true}
              fill={getColor(107)}
              stroke={stroke(107)}
              strokeWidth={getStrokeWidth(107)}
              dataLedIndex={getLEDIndex(107)}
              dataKeyIndex={keyIndex(107)}
              dataLayer={layer}
              path="M7.15001 39.74C6.13913 39.7429 5.16466 39.3629 4.42258 38.6764C3.68049 37.99 3.22582 37.048 3.15001 36.04L0.850007 5.12998C0.810442 4.60597 0.874517 4.07935 1.03857 3.58011C1.20263 3.08088 1.46344 2.61883 1.80612 2.22043C2.1488 1.82203 2.56662 1.49507 3.03572 1.25821C3.50481 1.02135 4.01597 0.879234 4.54001 0.839999C5.59664 0.762866 6.64072 1.10811 7.44313 1.7999C8.24553 2.49169 8.74071 3.47353 8.82001 4.53L11.13 35.45C11.2071 36.5066 10.8619 37.5507 10.1701 38.3531C9.47835 39.1555 8.49648 39.6507 7.44001 39.73L7.15001 39.74Z"
            />
            <UnderGlowStrip
              id="108_undeglow"
              x={60}
              y={478}
              onClick={e => {
                setUndeglowIndex(108, e);
              }}
              selectedLED={this.props.selectedLED}
              visibility={this.props.showUnderglow || this.props.isStandardView ? true : false}
              clickAble={this.props.isStandardView && !this.props.showUnderglow ? false : true}
              fill={getColor(108)}
              stroke={stroke(108)}
              strokeWidth={getStrokeWidth(108)}
              dataLedIndex={getLEDIndex(108)}
              dataKeyIndex={keyIndex(108)}
              dataLayer={layer}
              path="M6.38999 39.51C5.37912 39.5128 4.40465 39.1329 3.66256 38.4464C2.92047 37.76 2.46581 36.818 2.38999 35.81L0.109993 4.90998C0.0317543 3.84912 0.378147 2.80059 1.07297 1.99513C1.76779 1.18966 2.75413 0.693237 3.81499 0.614999C4.87586 0.53676 5.92436 0.883128 6.72982 1.57795C7.53529 2.27277 8.03175 3.25909 8.10999 4.31995L10.39 35.21C10.4296 35.734 10.3655 36.2607 10.2014 36.7599C10.0374 37.2591 9.77656 37.7212 9.43388 38.1196C9.0912 38.518 8.67338 38.8449 8.20428 39.0818C7.73519 39.3187 7.22403 39.4608 6.69999 39.5L6.38999 39.51Z"
            />
            <UnderGlowStrip
              id="109_undeglow"
              x={63}
              y={520}
              onClick={e => {
                setUndeglowIndex(109, e);
              }}
              selectedLED={this.props.selectedLED}
              visibility={this.props.showUnderglow || this.props.isStandardView ? true : false}
              clickAble={this.props.isStandardView && !this.props.showUnderglow ? false : true}
              fill={getColor(109)}
              stroke={stroke(109)}
              strokeWidth={getStrokeWidth(109)}
              dataLedIndex={getLEDIndex(109)}
              dataKeyIndex={keyIndex(109)}
              dataLayer={layer}
              path="M6.38999 39.51C5.37912 39.5128 4.40465 39.1328 3.66256 38.4464C2.92047 37.76 2.46581 36.818 2.38999 35.81L0.109993 4.90998C0.0317543 3.84912 0.378147 2.80059 1.07297 1.99513C1.76779 1.18966 2.75413 0.693237 3.81499 0.614999C4.87586 0.53676 5.92435 0.883128 6.72982 1.57795C7.53529 2.27277 8.03175 3.25909 8.10999 4.31995L10.39 35.21C10.4296 35.734 10.3655 36.2607 10.2014 36.7599C10.0374 37.2591 9.77656 37.7212 9.43388 38.1196C9.0912 38.518 8.67338 38.8449 8.20428 39.0818C7.73519 39.3187 7.22403 39.4608 6.69999 39.5L6.38999 39.51Z"
            />
            <UnderGlowStrip
              id="110_undeglow"
              x={66}
              y={561}
              onClick={e => {
                setUndeglowIndex(110, e);
              }}
              selectedLED={this.props.selectedLED}
              visibility={this.props.showUnderglow || this.props.isStandardView ? true : false}
              clickAble={this.props.isStandardView && !this.props.showUnderglow ? false : true}
              fill={getColor(110)}
              stroke={stroke(110)}
              strokeWidth={getStrokeWidth(110)}
              dataLedIndex={getLEDIndex(110)}
              dataKeyIndex={keyIndex(110)}
              dataLayer={layer}
              path="M6.50998 39.4C5.4975 39.4026 4.52168 39.0212 3.77934 38.3327C3.037 37.6442 2.58339 36.6998 2.50998 35.69L0.229984 4.77997C0.190588 4.25468 0.25504 3.72676 0.419661 3.22638C0.584282 2.726 0.845849 2.26294 1.18943 1.86365C1.533 1.46436 1.95186 1.13665 2.42209 0.899233C2.89231 0.661817 3.4047 0.519379 3.92998 0.479983C4.45527 0.440586 4.98318 0.505059 5.48355 0.66968C5.98393 0.834301 6.44699 1.09582 6.84628 1.43939C7.24557 1.78297 7.57328 2.20183 7.8107 2.67206C8.04811 3.14229 8.19059 3.65471 8.22998 4.17999L10.54 35.1C10.578 35.6287 10.5105 36.1597 10.3414 36.6621C10.1724 37.1645 9.9052 37.6283 9.55535 38.0266C9.20549 38.4248 8.77998 38.7495 8.30352 38.9819C7.82707 39.2142 7.30919 39.3495 6.77998 39.3799L6.50998 39.4Z"
            />
            <UnderGlowStrip
              id="111_undeglow"
              x={69}
              y={603}
              onClick={e => {
                setUndeglowIndex(111, e);
              }}
              selectedLED={this.props.selectedLED}
              visibility={this.props.showUnderglow || this.props.isStandardView ? true : false}
              clickAble={this.props.isStandardView && !this.props.showUnderglow ? false : true}
              fill={getColor(111)}
              stroke={stroke(111)}
              strokeWidth={getStrokeWidth(111)}
              dataLedIndex={getLEDIndex(111)}
              dataKeyIndex={keyIndex(111)}
              dataLayer={layer}
              path="M6.62999 39.28C5.61912 39.2828 4.64465 38.9028 3.90256 38.2164C3.16047 37.5299 2.70581 36.588 2.62999 35.58L0.329994 4.65998C0.251755 3.59912 0.598149 2.55059 1.29297 1.74513C1.98779 0.939657 2.97413 0.443237 4.03499 0.364999C5.09586 0.28676 6.14436 0.633128 6.94982 1.32795C7.75529 2.02277 8.25176 3.00909 8.32999 4.06995L10.64 34.98C10.6796 35.504 10.6155 36.0307 10.4514 36.5299C10.2874 37.0292 10.0266 37.4911 9.68388 37.8895C9.3412 38.2879 8.92338 38.6149 8.45429 38.8518C7.98519 39.0886 7.47403 39.2307 6.94999 39.27L6.62999 39.28Z"
            />
            <UnderGlowStrip
              id="112_undeglow"
              x={72}
              y={645}
              onClick={e => {
                setUndeglowIndex(112, e);
              }}
              selectedLED={this.props.selectedLED}
              visibility={this.props.showUnderglow || this.props.isStandardView ? true : false}
              clickAble={this.props.isStandardView && !this.props.showUnderglow ? false : true}
              fill={getColor(112)}
              stroke={stroke(112)}
              strokeWidth={getStrokeWidth(112)}
              dataLedIndex={getLEDIndex(112)}
              dataKeyIndex={keyIndex(112)}
              dataLayer={layer}
              path="M6.77998 39.16C5.76911 39.1628 4.79464 38.7828 4.05255 38.0964C3.31046 37.41 2.8558 36.468 2.77998 35.46L0.479984 4.55C0.440588 4.02471 0.505041 3.49679 0.669662 2.99641C0.834283 2.49603 1.09585 2.03297 1.43943 1.63367C1.783 1.23438 2.20186 0.906675 2.67209 0.669258C3.14231 0.431842 3.6547 0.289404 4.17998 0.250008C4.70527 0.210611 5.23318 0.275023 5.73355 0.439644C6.23393 0.604265 6.69699 0.865843 7.09628 1.20942C7.49557 1.553 7.82328 1.97186 8.0607 2.44209C8.29811 2.91231 8.44059 3.42467 8.47998 3.94996L10.78 34.91C10.8181 35.434 10.7527 35.9604 10.5874 36.4591C10.4221 36.9577 10.1602 37.419 9.81657 37.8164C9.47298 38.2139 9.05446 38.5397 8.58491 38.7754C8.11536 39.0111 7.60398 39.152 7.07998 39.19L6.77998 39.16Z"
            />
            <UnderGlowStrip
              id="113_undeglow"
              x={75}
              y={687}
              onClick={e => {
                setUndeglowIndex(113, e);
              }}
              selectedLED={this.props.selectedLED}
              visibility={this.props.showUnderglow || this.props.isStandardView ? true : false}
              clickAble={this.props.isStandardView && !this.props.showUnderglow ? false : true}
              fill={getColor(113)}
              stroke={stroke(113)}
              strokeWidth={getStrokeWidth(113)}
              dataLedIndex={getLEDIndex(113)}
              dataKeyIndex={keyIndex(113)}
              dataLayer={layer}
              path="M6.87001 39.05C5.85753 39.0527 4.8817 38.6712 4.13936 37.9827C3.39703 37.2942 2.94341 36.3498 2.87001 35.34L0.570007 4.42999C0.531267 3.9047 0.596369 3.3769 0.761597 2.87677C0.926825 2.37664 1.18894 1.91396 1.53298 1.51514C1.87702 1.11631 2.29625 0.789178 2.76673 0.552368C3.23721 0.315558 3.74972 0.173688 4.27501 0.134948C4.80029 0.0962082 5.32807 0.16131 5.8282 0.326538C6.32832 0.491765 6.79101 0.75392 7.18984 1.09796C7.58866 1.442 7.91582 1.86119 8.15263 2.33166C8.38944 2.80214 8.53127 3.31468 8.57001 3.83997L10.88 34.75C10.9195 35.2748 10.8551 35.8022 10.6904 36.3021C10.5258 36.8019 10.2641 37.2643 9.92034 37.6628C9.57662 38.0614 9.15764 38.3882 8.6874 38.6245C8.21716 38.8608 7.70491 39.002 7.18001 39.04L6.87001 39.05Z"
            />
            <UnderGlowStrip
              id="114_undeglow"
              x={79}
              y={729}
              onClick={e => {
                setUndeglowIndex(114, e);
              }}
              selectedLED={this.props.selectedLED}
              visibility={this.props.showUnderglow || this.props.isStandardView ? true : false}
              clickAble={this.props.isStandardView && !this.props.showUnderglow ? false : true}
              fill={getColor(114)}
              stroke={stroke(114)}
              strokeWidth={getStrokeWidth(114)}
              dataLedIndex={getLEDIndex(114)}
              dataKeyIndex={keyIndex(114)}
              dataLayer={layer}
              path="M23.92 31.7C23.3507 31.6988 22.7881 31.5761 22.27 31.34C17.0077 28.9663 12.3311 25.4653 8.57094 21.0848C4.81081 16.7043 2.05897 11.5513 0.510007 5.98999C0.226226 4.96758 0.360218 3.8743 0.882507 2.95068C1.4048 2.02707 2.2726 1.34878 3.29501 1.065C4.31742 0.781219 5.41068 0.915209 6.3343 1.4375C7.25792 1.95979 7.93623 2.82756 8.22001 3.84997C9.45689 8.28448 11.6529 12.3931 14.6527 15.8854C17.6525 19.3776 21.3828 22.1683 25.58 24.06C26.4114 24.4388 27.0881 25.0908 27.4975 25.9075C27.9069 26.7243 28.0244 27.6565 27.8304 28.5493C27.6364 29.442 27.1426 30.2415 26.4312 30.8148C25.7198 31.388 24.8336 31.7004 23.92 31.7V31.7Z"
            />
            <UnderGlowStrip
              id="115_undeglow"
              x={109}
              y={755}
              onClick={e => {
                setUndeglowIndex(115, e);
              }}
              selectedLED={this.props.selectedLED}
              visibility={this.props.showUnderglow || this.props.isStandardView ? true : false}
              clickAble={this.props.isStandardView && !this.props.showUnderglow ? false : true}
              fill={getColor(115)}
              stroke={stroke(115)}
              strokeWidth={getStrokeWidth(115)}
              dataLedIndex={getLEDIndex(115)}
              dataKeyIndex={keyIndex(115)}
              dataLayer={layer}
              path="M35.47 8.84001H8.41001C6.94654 8.83676 5.48434 8.7533 4.03001 8.59001C3.50472 8.53091 2.99621 8.36894 2.53353 8.11332C2.07084 7.85771 1.66303 7.51336 1.33338 7.10014C1.00373 6.68692 0.758703 6.21291 0.612281 5.705C0.465858 5.19708 0.420911 4.66522 0.480006 4.13993C0.539101 3.61465 0.701079 3.10616 0.956694 2.64347C1.21231 2.18078 1.55655 1.77293 1.96977 1.44328C2.383 1.11363 2.8571 0.86863 3.36502 0.722208C3.87293 0.575786 4.40472 0.530911 4.93001 0.590006C6.08535 0.721699 7.24718 0.788422 8.41001 0.789957H35.47C36.5309 0.789957 37.5483 1.21132 38.2984 1.96147C39.0486 2.71161 39.47 3.72909 39.47 4.78996C39.47 5.85082 39.0486 6.86818 38.2984 7.61833C37.5483 8.36847 36.5309 8.78996 35.47 8.78996V8.84001Z"
            />
            <UnderGlowStrip
              id="116_undeglow"
              x={151}
              y={755}
              onClick={e => {
                setUndeglowIndex(116, e);
              }}
              selectedLED={this.props.selectedLED}
              visibility={this.props.showUnderglow || this.props.isStandardView ? true : false}
              clickAble={this.props.isStandardView && !this.props.showUnderglow ? false : true}
              fill={getColor(116)}
              stroke={stroke(116)}
              strokeWidth={getStrokeWidth(116)}
              dataLedIndex={getLEDIndex(116)}
              dataKeyIndex={keyIndex(116)}
              dataLayer={layer}
              path="M35.47 8.84003H4.47C3.40914 8.84003 2.39172 8.41854 1.64157 7.6684C0.891426 6.91825 0.470001 5.90089 0.470001 4.84003C0.470001 3.77916 0.891426 2.76168 1.64157 2.01154C2.39172 1.26139 3.40914 0.840027 4.47 0.840027H35.47C36.5309 0.840027 37.5483 1.26139 38.2984 2.01154C39.0486 2.76168 39.47 3.77916 39.47 4.84003C39.47 5.90089 39.0486 6.91825 38.2984 7.6684C37.5483 8.41854 36.5309 8.84003 35.47 8.84003Z"
            />
            <UnderGlowStrip
              id="117_undeglow"
              x={193}
              y={755}
              onClick={e => {
                setUndeglowIndex(117, e);
              }}
              selectedLED={this.props.selectedLED}
              visibility={this.props.showUnderglow || this.props.isStandardView ? true : false}
              clickAble={this.props.isStandardView && !this.props.showUnderglow ? false : true}
              fill={getColor(117)}
              stroke={stroke(117)}
              strokeWidth={getStrokeWidth(117)}
              dataLedIndex={getLEDIndex(117)}
              dataKeyIndex={keyIndex(117)}
              dataLayer={layer}
              path="M35.47 8.84003H4.47C3.40914 8.84003 2.39172 8.41854 1.64157 7.6684C0.891426 6.91825 0.470001 5.90089 0.470001 4.84003C0.470001 3.77916 0.891426 2.76168 1.64157 2.01154C2.39172 1.26139 3.40914 0.840027 4.47 0.840027H35.47C36.5309 0.840027 37.5483 1.26139 38.2984 2.01154C39.0486 2.76168 39.47 3.77916 39.47 4.84003C39.47 5.90089 39.0486 6.91825 38.2984 7.6684C37.5483 8.41854 36.5309 8.84003 35.47 8.84003Z"
            />
            <UnderGlowStrip
              id="118_undeglow"
              x={235}
              y={755}
              onClick={e => {
                setUndeglowIndex(118, e);
              }}
              selectedLED={this.props.selectedLED}
              visibility={this.props.showUnderglow || this.props.isStandardView ? true : false}
              clickAble={this.props.isStandardView && !this.props.showUnderglow ? false : true}
              fill={getColor(118)}
              stroke={stroke(118)}
              strokeWidth={getStrokeWidth(118)}
              dataLedIndex={getLEDIndex(118)}
              dataKeyIndex={keyIndex(118)}
              dataLayer={layer}
              path="M35.47 8.84003H4.47C3.40914 8.84003 2.39172 8.41854 1.64157 7.6684C0.891426 6.91825 0.470001 5.90089 0.470001 4.84003C0.470001 3.77916 0.891426 2.76168 1.64157 2.01154C2.39172 1.26139 3.40914 0.840027 4.47 0.840027H35.47C36.5309 0.840027 37.5483 1.26139 38.2984 2.01154C39.0486 2.76168 39.47 3.77916 39.47 4.84003C39.47 5.90089 39.0486 6.91825 38.2984 7.6684C37.5483 8.41854 36.5309 8.84003 35.47 8.84003Z"
            />
            <UnderGlowStrip
              id="119_undeglow"
              x={277}
              y={755}
              onClick={e => {
                setUndeglowIndex(119, e);
              }}
              selectedLED={this.props.selectedLED}
              visibility={this.props.showUnderglow || this.props.isStandardView ? true : false}
              clickAble={this.props.isStandardView && !this.props.showUnderglow ? false : true}
              fill={getColor(119)}
              stroke={stroke(119)}
              strokeWidth={getStrokeWidth(119)}
              dataLedIndex={getLEDIndex(119)}
              dataKeyIndex={keyIndex(119)}
              dataLayer={layer}
              path="M35.47 8.84003H4.47C3.40914 8.84003 2.39172 8.41854 1.64157 7.6684C0.891426 6.91825 0.470001 5.90089 0.470001 4.84003C0.470001 3.77916 0.891426 2.76168 1.64157 2.01154C2.39172 1.26139 3.40914 0.840027 4.47 0.840027H35.47C36.5309 0.840027 37.5483 1.26139 38.2984 2.01154C39.0486 2.76168 39.47 3.77916 39.47 4.84003C39.47 5.90089 39.0486 6.91825 38.2984 7.6684C37.5483 8.41854 36.5309 8.84003 35.47 8.84003Z"
            />
            <UnderGlowStrip
              id="120_undeglow"
              x={319}
              y={755}
              onClick={e => {
                setUndeglowIndex(120, e);
              }}
              selectedLED={this.props.selectedLED}
              visibility={this.props.showUnderglow || this.props.isStandardView ? true : false}
              clickAble={this.props.isStandardView && !this.props.showUnderglow ? false : true}
              fill={getColor(120)}
              stroke={stroke(120)}
              strokeWidth={getStrokeWidth(120)}
              dataLedIndex={getLEDIndex(120)}
              dataKeyIndex={keyIndex(120)}
              dataLayer={layer}
              path="M35.47 8.84003H4.47C3.40914 8.84003 2.39172 8.41854 1.64157 7.6684C0.891426 6.91825 0.470001 5.90089 0.470001 4.84003C0.470001 3.77916 0.891426 2.76168 1.64157 2.01154C2.39172 1.26139 3.40914 0.840027 4.47 0.840027H35.47C36.5309 0.840027 37.5483 1.26139 38.2984 2.01154C39.0486 2.76168 39.47 3.77916 39.47 4.84003C39.47 5.90089 39.0486 6.91825 38.2984 7.6684C37.5483 8.41854 36.5309 8.84003 35.47 8.84003Z"
            />
            <UnderGlowStrip
              id="121_undeglow"
              x={361}
              y={755}
              onClick={e => {
                setUndeglowIndex(121, e);
              }}
              selectedLED={this.props.selectedLED}
              visibility={this.props.showUnderglow || this.props.isStandardView ? true : false}
              clickAble={this.props.isStandardView && !this.props.showUnderglow ? false : true}
              fill={getColor(121)}
              stroke={stroke(121)}
              strokeWidth={getStrokeWidth(121)}
              dataLedIndex={getLEDIndex(121)}
              dataKeyIndex={keyIndex(121)}
              dataLayer={layer}
              path="M35.47 8.84003H4.47C3.40914 8.84003 2.39172 8.41854 1.64157 7.6684C0.891426 6.91825 0.470001 5.90089 0.470001 4.84003C0.470001 3.77916 0.891426 2.76168 1.64157 2.01154C2.39172 1.26139 3.40914 0.840027 4.47 0.840027H35.47C36.5309 0.840027 37.5483 1.26139 38.2984 2.01154C39.0486 2.76168 39.47 3.77916 39.47 4.84003C39.47 5.90089 39.0486 6.91825 38.2984 7.6684C37.5483 8.41854 36.5309 8.84003 35.47 8.84003Z"
            />
            <UnderGlowStrip
              id="122_undeglow"
              x={403}
              y={755}
              onClick={e => {
                setUndeglowIndex(122, e);
              }}
              selectedLED={this.props.selectedLED}
              visibility={this.props.showUnderglow || this.props.isStandardView ? true : false}
              clickAble={this.props.isStandardView && !this.props.showUnderglow ? false : true}
              fill={getColor(122)}
              stroke={stroke(122)}
              strokeWidth={getStrokeWidth(122)}
              dataLedIndex={getLEDIndex(122)}
              dataKeyIndex={keyIndex(122)}
              dataLayer={layer}
              path="M35.47 8.84003H4.47C3.40914 8.84003 2.39172 8.41854 1.64157 7.6684C0.891426 6.91825 0.470001 5.90089 0.470001 4.84003C0.470001 3.77916 0.891426 2.76168 1.64157 2.01154C2.39172 1.26139 3.40914 0.840027 4.47 0.840027H35.47C36.5309 0.840027 37.5483 1.26139 38.2984 2.01154C39.0486 2.76168 39.47 3.77916 39.47 4.84003C39.47 5.90089 39.0486 6.91825 38.2984 7.6684C37.5483 8.41854 36.5309 8.84003 35.47 8.84003Z"
            />
            {/* End Left side */}

            {/* 
            Right side 
            */}

            <UnderGlowStrip
              id="167_undeglow"
              x={1164}
              y={729}
              onClick={e => {
                setUndeglowIndex(167, e);
              }}
              selectedLED={this.props.selectedLED}
              visibility={this.props.showUnderglow || this.props.isStandardView ? true : false}
              clickAble={this.props.isStandardView && !this.props.showUnderglow ? false : true}
              fill={getColor(167)}
              stroke={stroke(167)}
              strokeWidth={getStrokeWidth(167)}
              dataLedIndex={getLEDIndex(167)}
              dataKeyIndex={keyIndex(167)}
              dataLayer={layer}
              path="M0.390066 29.3499C-0.0459419 28.3832 -0.0801932 27.2829 0.294851 26.291C0.669895 25.299 1.42353 24.4965 2.39007 24.06C6.58462 22.166 10.3124 19.3745 13.3102 15.8824C16.3081 12.3904 18.503 8.28294 19.74 3.84997C20.0238 2.82756 20.7022 1.95979 21.6258 1.4375C22.5494 0.915209 23.6427 0.781219 24.6651 1.065C25.6875 1.34878 26.5553 2.02707 27.0776 2.95068C27.5999 3.8743 27.7339 4.96758 27.4501 5.98999C25.9012 11.5513 23.1492 16.7043 19.3891 21.0848C15.629 25.4653 10.9525 28.9663 5.69011 31.34C4.72337 31.776 3.62302 31.8103 2.63103 31.4352C1.63904 31.0602 0.836564 30.3066 0.400076 29.34L0.390066 29.3499Z"
            />
            <UnderGlowStrip
              id="166_undeglow"
              x={1185}
              y={687}
              onClick={e => {
                setUndeglowIndex(166, e);
              }}
              selectedLED={this.props.selectedLED}
              visibility={this.props.showUnderglow || this.props.isStandardView ? true : false}
              clickAble={this.props.isStandardView && !this.props.showUnderglow ? false : true}
              fill={getColor(166)}
              stroke={stroke(166)}
              strokeWidth={getStrokeWidth(166)}
              dataLedIndex={getLEDIndex(166)}
              dataKeyIndex={keyIndex(166)}
              dataLayer={layer}
              path="M3.77002 39.04C3.24598 39.0007 2.73484 38.8586 2.26575 38.6218C1.79665 38.3849 1.37881 38.0579 1.03613 37.6595C0.693452 37.2611 0.432607 36.7991 0.268553 36.2999C0.104498 35.8006 0.0403886 35.274 0.0799541 34.75L2.38 3.83997C2.41874 3.31468 2.56055 2.80214 2.79736 2.33166C3.03417 1.86119 3.3613 1.442 3.76013 1.09796C4.15896 0.75392 4.6217 0.491765 5.12182 0.326538C5.62195 0.16131 6.14976 0.0962082 6.67505 0.134948C7.20033 0.173688 7.71287 0.315558 8.18335 0.552368C8.65382 0.789177 9.07295 1.11631 9.41699 1.51514C9.76103 1.91396 10.0232 2.37664 10.1885 2.87677C10.3537 3.3769 10.4187 3.9047 10.38 4.42999L8.07007 35.34C7.99667 36.3498 7.543 37.2942 6.80066 37.9827C6.05832 38.6712 5.08255 39.0527 4.07007 39.05L3.77002 39.04Z"
            />

            <UnderGlowStrip
              id="165_undeglow"
              x={1188}
              y={645}
              onClick={e => {
                setUndeglowIndex(165, e);
              }}
              selectedLED={this.props.selectedLED}
              visibility={this.props.showUnderglow || this.props.isStandardView ? true : false}
              clickAble={this.props.isStandardView && !this.props.showUnderglow ? false : true}
              fill={getColor(165)}
              stroke={stroke(165)}
              strokeWidth={getStrokeWidth(165)}
              dataLedIndex={getLEDIndex(165)}
              dataKeyIndex={keyIndex(165)}
              dataLayer={layer}
              path="M3.89002 39.15C2.83354 39.0707 1.85171 38.5755 1.15992 37.7731C0.468124 36.9707 0.122944 35.9266 0.200077 34.87L2.5 3.94996C2.57957 2.8891 3.07726 1.90331 3.88367 1.20942C4.69008 0.51554 5.73919 0.170448 6.80005 0.250013C7.86092 0.329578 8.84665 0.827274 9.54053 1.63368C10.2344 2.44009 10.5796 3.48914 10.5 4.55L8.19007 35.46C8.11425 36.468 7.65957 37.41 6.91748 38.0964C6.1754 38.7828 5.20095 39.1628 4.19007 39.16L3.89002 39.15Z"
            />
            <UnderGlowStrip
              id="164_undeglow"
              x={1191}
              y={603}
              onClick={e => {
                setUndeglowIndex(164, e);
              }}
              selectedLED={this.props.selectedLED}
              visibility={this.props.showUnderglow || this.props.isStandardView ? true : false}
              clickAble={this.props.isStandardView && !this.props.showUnderglow ? false : true}
              fill={getColor(164)}
              stroke={stroke(164)}
              strokeWidth={getStrokeWidth(164)}
              dataLedIndex={getLEDIndex(164)}
              dataKeyIndex={keyIndex(164)}
              dataLayer={layer}
              path="M4.01002 39.27C3.48599 39.2307 2.97484 39.0886 2.50575 38.8517C2.03666 38.6149 1.61881 38.2879 1.27613 37.8895C0.933454 37.4911 0.672609 37.0291 0.508555 36.5299C0.3445 36.0307 0.280513 35.504 0.320078 34.98L2.62 4.06995C2.65874 3.54466 2.80055 3.03218 3.03736 2.56171C3.27417 2.09123 3.60143 1.67198 4.00025 1.32794C4.39908 0.9839 4.8617 0.721807 5.36183 0.556579C5.86195 0.391351 6.38976 0.32625 6.91505 0.36499C7.44034 0.40373 7.95287 0.545538 8.42335 0.782348C8.89383 1.01916 9.31295 1.34629 9.65699 1.74512C10.001 2.14394 10.2632 2.60668 10.4285 3.10681C10.5937 3.60694 10.6587 4.13469 10.62 4.65997L8.31007 35.58C8.23426 36.588 7.77957 37.5299 7.03749 38.2164C6.2954 38.9028 5.32095 39.2828 4.31007 39.28L4.01002 39.27Z"
            />

            <UnderGlowStrip
              id="163_undeglow"
              x={1194}
              y={561}
              onClick={e => {
                setUndeglowIndex(163, e);
              }}
              selectedLED={this.props.selectedLED}
              visibility={this.props.showUnderglow || this.props.isStandardView ? true : false}
              clickAble={this.props.isStandardView && !this.props.showUnderglow ? false : true}
              fill={getColor(163)}
              stroke={stroke(163)}
              strokeWidth={getStrokeWidth(163)}
              dataLedIndex={getLEDIndex(163)}
              dataKeyIndex={keyIndex(163)}
              dataLayer={layer}
              path="M4.13001 39.38C3.07353 39.3007 2.0917 38.8055 1.39991 38.0031C0.708114 37.2007 0.362935 36.1566 0.440068 35.1L2.73999 4.18001C2.81956 3.11914 3.31738 2.13329 4.12378 1.43941C4.93019 0.745521 5.97918 0.400429 7.04004 0.479994C8.10091 0.559559 9.08664 1.05732 9.78052 1.86372C10.4744 2.67013 10.8196 3.71912 10.74 4.77998L8.39002 35.69C8.31662 36.6998 7.86295 37.6442 7.12061 38.3327C6.37827 39.0212 5.4025 39.4026 4.39002 39.4L4.13001 39.38Z"
            />

            <UnderGlowStrip
              id="162_undeglow"
              x={1197}
              y={520}
              onClick={e => {
                setUndeglowIndex(162, e);
              }}
              selectedLED={this.props.selectedLED}
              visibility={this.props.showUnderglow || this.props.isStandardView ? true : false}
              clickAble={this.props.isStandardView && !this.props.showUnderglow ? false : true}
              fill={getColor(162)}
              stroke={stroke(162)}
              strokeWidth={getStrokeWidth(162)}
              dataLedIndex={getLEDIndex(162)}
              dataKeyIndex={keyIndex(162)}
              dataLayer={layer}
              path="M4.25001 39.5C3.72598 39.4608 3.21483 39.3186 2.74574 39.0818C2.27665 38.8449 1.8588 38.518 1.51612 38.1196C1.17344 37.7212 0.912599 37.2591 0.748545 36.7599C0.58449 36.2607 0.520503 35.734 0.560068 35.21L2.86 4.29999C2.89874 3.7747 3.04054 3.26216 3.27735 2.79169C3.51416 2.32121 3.84142 1.90196 4.24024 1.55792C4.63907 1.21388 5.10169 0.951787 5.60182 0.78656C6.10194 0.621332 6.62975 0.55623 7.15504 0.59497C7.68033 0.63371 8.19286 0.775519 8.66334 1.01233C9.13382 1.24914 9.55306 1.57633 9.8971 1.97516C10.2411 2.37399 10.5032 2.83666 10.6685 3.33679C10.8337 3.83692 10.8987 4.36467 10.86 4.88995L8.55006 35.81C8.47425 36.818 8.01956 37.76 7.27748 38.4464C6.53539 39.1328 5.56094 39.5128 4.55006 39.5099L4.25001 39.5Z"
            />

            <UnderGlowStrip
              id="161_undeglow"
              x={1201}
              y={478}
              onClick={e => {
                setUndeglowIndex(161, e);
              }}
              selectedLED={this.props.selectedLED}
              visibility={this.props.showUnderglow || this.props.isStandardView ? true : false}
              clickAble={this.props.isStandardView && !this.props.showUnderglow ? false : true}
              fill={getColor(161)}
              stroke={stroke(161)}
              strokeWidth={getStrokeWidth(161)}
              dataLedIndex={getLEDIndex(161)}
              dataKeyIndex={keyIndex(161)}
              dataLayer={layer}
              path="M4.39002 39.62C3.86599 39.5808 3.35484 39.4387 2.88575 39.2018C2.41666 38.965 1.99882 38.638 1.65614 38.2396C1.31346 37.8412 1.05261 37.3792 0.88856 36.8799C0.724505 36.3807 0.660518 35.854 0.700083 35.33L3.00001 4.42001C3.03875 3.89473 3.18056 3.38219 3.41737 2.91171C3.65418 2.44123 3.98131 2.02205 4.38014 1.67801C4.77896 1.33397 5.2417 1.07181 5.74183 0.906585C6.24196 0.741357 6.76977 0.676256 7.29505 0.714996C7.82034 0.753736 8.33288 0.895544 8.80335 1.13235C9.27383 1.36916 9.69296 1.69636 10.037 2.09518C10.381 2.49401 10.6433 2.95669 10.8085 3.45682C10.9737 3.95694 11.0387 4.48469 11 5.00998L8.65003 35.91C8.57663 36.9198 8.12296 37.8642 7.38062 38.5528C6.63829 39.2413 5.66252 39.6227 4.65003 39.62H4.39002Z"
            />
            <UnderGlowStrip
              id="160_undeglow"
              x={1204}
              y={436}
              onClick={e => {
                setUndeglowIndex(160, e);
              }}
              selectedLED={this.props.selectedLED}
              visibility={this.props.showUnderglow || this.props.isStandardView ? true : false}
              clickAble={this.props.isStandardView && !this.props.showUnderglow ? false : true}
              fill={getColor(160)}
              stroke={stroke(160)}
              strokeWidth={getStrokeWidth(160)}
              dataLedIndex={getLEDIndex(160)}
              dataKeyIndex={keyIndex(160)}
              dataLayer={layer}
              path="M4.48999 39.73C3.43352 39.6507 2.45168 39.1555 1.75989 38.3531C1.0681 37.5507 0.72292 36.5066 0.800053 35.45L3.09998 4.53001C3.17955 3.46914 3.67736 2.48336 4.48377 1.78947C5.29018 1.09559 6.33916 0.750433 7.40003 0.829998C8.46089 0.909563 9.44674 1.40732 10.1406 2.21373C10.8345 3.02013 11.1795 4.06912 11.1 5.12999L8.79004 36.04C8.71423 37.0481 8.25955 37.99 7.51746 38.6764C6.77537 39.3629 5.80092 39.7429 4.79004 39.74L4.48999 39.73Z"
            />

            <UnderGlowStrip
              id="159_undeglow"
              x={1206}
              y={394}
              onClick={e => {
                setUndeglowIndex(159, e);
              }}
              selectedLED={this.props.selectedLED}
              visibility={this.props.showUnderglow || this.props.isStandardView ? true : false}
              clickAble={this.props.isStandardView && !this.props.showUnderglow ? false : true}
              fill={getColor(159)}
              stroke={stroke(159)}
              strokeWidth={getStrokeWidth(159)}
              dataLedIndex={getLEDIndex(159)}
              dataKeyIndex={keyIndex(159)}
              dataLayer={layer}
              path="M4.61 39.85C4.08596 39.8108 3.57481 39.6687 3.10572 39.4318C2.63663 39.1949 2.21879 38.868 1.87611 38.4696C1.53343 38.0712 1.27258 37.6091 1.10853 37.1099C0.944476 36.6107 0.880488 36.084 0.920054 35.56L2.54005 13.74C2.76005 10.74 2.89007 7.81003 2.94007 4.87003C2.95583 3.81959 3.38413 2.81751 4.13258 2.08029C4.88102 1.34307 5.88952 0.929905 6.94007 0.930023H7.00001C7.52531 0.937844 8.04394 1.04908 8.52625 1.25735C9.00857 1.46563 9.44517 1.76687 9.81104 2.14389C10.1769 2.52091 10.4649 2.96628 10.6586 3.45462C10.8523 3.94296 10.948 4.46472 10.9401 4.99002C10.9401 8.09002 10.75 11.23 10.52 14.33L8.89002 36.16C8.81421 37.168 8.35953 38.11 7.61744 38.7964C6.87535 39.4828 5.9009 39.8629 4.89002 39.86L4.61 39.85Z"
            />

            <UnderGlowStrip
              id="158_undeglow"
              x={1204}
              y={352}
              onClick={e => {
                setUndeglowIndex(158, e);
              }}
              selectedLED={this.props.selectedLED}
              visibility={this.props.showUnderglow || this.props.isStandardView ? true : false}
              clickAble={this.props.isStandardView && !this.props.showUnderglow ? false : true}
              fill={getColor(158)}
              stroke={stroke(158)}
              strokeWidth={getStrokeWidth(158)}
              dataLedIndex={getLEDIndex(158)}
              dataKeyIndex={keyIndex(158)}
              dataLayer={layer}
              path="M5.71995 35.16C5.14217 25.1066 3.54064 15.1384 0.940038 5.41003C0.675729 4.38791 0.826131 3.30273 1.35862 2.39111C1.8911 1.47949 2.76243 0.815374 3.78257 0.543513C4.80271 0.271652 5.88901 0.414083 6.80454 0.939814C7.72007 1.46554 8.39062 2.33193 8.67002 3.35003C11.3981 13.6063 13.0734 24.1139 13.67 34.71C13.7301 35.768 13.3679 36.8066 12.6629 37.5978C11.958 38.389 10.9679 38.8682 9.91001 38.93H9.68003C8.66476 38.9216 7.69065 38.5273 6.9553 37.8273C6.21994 37.1272 5.77829 36.1737 5.71995 35.16Z"
            />

            <UnderGlowStrip
              id="157_undeglow"
              x={1191}
              y={312}
              onClick={e => {
                setUndeglowIndex(157, e);
              }}
              selectedLED={this.props.selectedLED}
              visibility={this.props.showUnderglow || this.props.isStandardView ? true : false}
              clickAble={this.props.isStandardView && !this.props.showUnderglow ? false : true}
              fill={getColor(157)}
              stroke={stroke(157)}
              strokeWidth={getStrokeWidth(157)}
              dataLedIndex={getLEDIndex(157)}
              dataKeyIndex={keyIndex(157)}
              dataLayer={layer}
              path="M9.84998 35.02L0.719974 5.38998C0.540451 4.88164 0.465555 4.34226 0.499759 3.80423C0.533964 3.2662 0.676618 2.74064 0.919071 2.25912C1.16152 1.7776 1.49879 1.35004 1.91065 1.00217C2.32251 0.654293 2.80051 0.393269 3.3158 0.234771C3.83109 0.0762724 4.37301 0.0235965 4.90918 0.0798637C5.44535 0.136131 5.96464 0.300206 6.43579 0.562225C6.90695 0.824244 7.32034 1.17879 7.651 1.60458C7.98167 2.03038 8.22278 2.51865 8.35999 3.04001L17.5 32.66C17.655 33.1623 17.7095 33.6902 17.6604 34.2136C17.6113 34.737 17.4597 35.2455 17.2141 35.7103C16.9685 36.1751 16.6338 36.5869 16.229 36.9223C15.8242 37.2577 15.3573 37.51 14.855 37.665C14.3527 37.82 13.8248 37.8745 13.3014 37.8254C12.778 37.7763 12.2694 37.6247 11.8047 37.3791C11.3399 37.1334 10.9282 36.7987 10.5928 36.394C10.2574 35.9892 10.0049 35.5223 9.84998 35.02Z"
            />

            <UnderGlowStrip
              id="156_undeglow"
              x={1182}
              y={272}
              onClick={e => {
                setUndeglowIndex(156, e);
              }}
              selectedLED={this.props.selectedLED}
              visibility={this.props.showUnderglow || this.props.isStandardView ? true : false}
              clickAble={this.props.isStandardView && !this.props.showUnderglow ? false : true}
              fill={getColor(156)}
              stroke={stroke(156)}
              strokeWidth={getStrokeWidth(156)}
              dataLedIndex={getLEDIndex(156)}
              dataKeyIndex={keyIndex(156)}
              dataLayer={layer}
              path="M6.46997 35.91L0.609985 16.91V4.56003C0.609985 3.49916 1.03147 2.48174 1.78162 1.7316C2.53176 0.981452 3.54912 0.560028 4.60999 0.560028C5.67085 0.560028 6.68833 0.981452 7.43848 1.7316C8.18862 2.48174 8.60999 3.49916 8.60999 4.56003V15.67L14.12 33.52C14.433 34.5344 14.3301 35.6317 13.8341 36.5703C13.3381 37.5089 12.4894 38.212 11.475 38.525C10.4605 38.8379 9.3633 38.7351 8.42468 38.239C7.48606 37.743 6.78293 36.8944 6.46997 35.88V35.91Z"
            />

            <UnderGlowStrip
              id="155_undeglow"
              x={1182}
              y={230}
              onClick={e => {
                setUndeglowIndex(155, e);
              }}
              selectedLED={this.props.selectedLED}
              visibility={this.props.showUnderglow || this.props.isStandardView ? true : false}
              clickAble={this.props.isStandardView && !this.props.showUnderglow ? false : true}
              fill={getColor(155)}
              stroke={stroke(155)}
              strokeWidth={getStrokeWidth(155)}
              dataLedIndex={getLEDIndex(155)}
              dataKeyIndex={keyIndex(155)}
              dataLayer={layer}
              path="M0.589966 35.56V4.56003C0.589966 3.49916 1.01145 2.48171 1.7616 1.73157C2.51174 0.981422 3.5291 0.559998 4.58997 0.559998C5.65083 0.559998 6.66831 0.981422 7.41846 1.73157C8.1686 2.48171 8.58997 3.49916 8.58997 4.56003V35.56C8.58997 36.6209 8.1686 37.6383 7.41846 38.3885C6.66831 39.1386 5.65083 39.56 4.58997 39.56C3.5291 39.56 2.51174 39.1386 1.7616 38.3885C1.01145 37.6383 0.589966 36.6209 0.589966 35.56Z"
            />

            <UnderGlowStrip
              id="154_undeglow"
              x={1182}
              y={188}
              onClick={e => {
                setUndeglowIndex(154, e);
              }}
              selectedLED={this.props.selectedLED}
              visibility={this.props.showUnderglow || this.props.isStandardView ? true : false}
              clickAble={this.props.isStandardView && !this.props.showUnderglow ? false : true}
              fill={getColor(154)}
              stroke={stroke(154)}
              strokeWidth={getStrokeWidth(154)}
              dataLedIndex={getLEDIndex(154)}
              dataKeyIndex={keyIndex(154)}
              dataLayer={layer}
              path="M0.540039 35.56V4.56C0.540039 3.49913 0.961402 2.48171 1.71155 1.73157C2.46169 0.981422 3.47917 0.559998 4.54004 0.559998C5.6009 0.559998 6.61826 0.981422 7.36841 1.73157C8.11855 2.48171 8.54004 3.49913 8.54004 4.56V35.56C8.54004 36.6209 8.11855 37.6383 7.36841 38.3884C6.61826 39.1386 5.6009 39.56 4.54004 39.56C3.47917 39.56 2.46169 39.1386 1.71155 38.3884C0.961402 37.6383 0.540039 36.6209 0.540039 35.56Z"
            />

            <UnderGlowStrip
              id="153_undeglow"
              x={1182}
              y={145}
              onClick={e => {
                setUndeglowIndex(153, e);
              }}
              selectedLED={this.props.selectedLED}
              visibility={this.props.showUnderglow || this.props.isStandardView ? true : false}
              clickAble={this.props.isStandardView && !this.props.showUnderglow ? false : true}
              fill={getColor(153)}
              stroke={stroke(153)}
              strokeWidth={getStrokeWidth(153)}
              dataLedIndex={getLEDIndex(153)}
              dataKeyIndex={keyIndex(153)}
              dataLayer={layer}
              path="M0.48999 35.56V4.56C0.48999 3.49913 0.911476 2.48171 1.66162 1.73157C2.41177 0.981422 3.42912 0.559998 4.48999 0.559998C5.55086 0.559998 6.56834 0.981422 7.31848 1.73157C8.06863 2.48171 8.48999 3.49913 8.48999 4.56V35.56C8.48999 36.6209 8.06863 37.6383 7.31848 38.3884C6.56834 39.1386 5.55086 39.56 4.48999 39.56C3.42912 39.56 2.41177 39.1386 1.66162 38.3884C0.911476 37.6383 0.48999 36.6209 0.48999 35.56Z"
            />

            <UnderGlowStrip
              id="152_undeglow"
              x={1182}
              y={104}
              onClick={e => {
                setUndeglowIndex(152, e);
              }}
              selectedLED={this.props.selectedLED}
              visibility={this.props.showUnderglow || this.props.isStandardView ? true : false}
              clickAble={this.props.isStandardView && !this.props.showUnderglow ? false : true}
              fill={getColor(152)}
              stroke={stroke(152)}
              strokeWidth={getStrokeWidth(152)}
              dataLedIndex={getLEDIndex(152)}
              dataKeyIndex={keyIndex(152)}
              dataLayer={layer}
              path="M1.44012 35.56V13.19C1.45546 10.6886 1.11883 8.19757 0.440115 5.79C0.277654 5.28112 0.218735 4.74486 0.266897 4.21285C0.315059 3.68084 0.469303 3.16387 0.720511 2.69244C0.971718 2.221 1.31482 1.80466 1.72954 1.46798C2.14427 1.1313 2.62219 0.881096 3.13518 0.73214C3.64818 0.583184 4.18581 0.538496 4.71636 0.600701C5.24691 0.662906 5.75967 0.830744 6.22429 1.09432C6.68892 1.3579 7.09608 1.71186 7.42168 2.13534C7.74728 2.55882 7.9847 3.04324 8.12005 3.55999C9.02754 6.6893 9.48545 9.93176 9.48003 13.19V35.56C9.48003 36.6209 9.05867 37.6383 8.30852 38.3884C7.55838 39.1386 6.5409 39.56 5.48003 39.56C4.95139 39.5653 4.42699 39.4657 3.93706 39.2671C3.44713 39.0684 3.00147 38.7746 2.62578 38.4027C2.2501 38.0307 1.95186 37.588 1.74834 37.1C1.54483 36.6121 1.44009 36.0887 1.44012 35.56Z"
            />

            <UnderGlowStrip
              id="151_undeglow"
              x={1149}
              y={81}
              onClick={e => {
                setUndeglowIndex(151, e);
              }}
              selectedLED={this.props.selectedLED}
              visibility={this.props.showUnderglow || this.props.isStandardView ? true : false}
              clickAble={this.props.isStandardView && !this.props.showUnderglow ? false : true}
              fill={getColor(151)}
              stroke={stroke(151)}
              strokeWidth={getStrokeWidth(151)}
              dataLedIndex={getLEDIndex(151)}
              dataKeyIndex={keyIndex(151)}
              dataLayer={layer}
              path="M28.13 19.27C25.6563 15.9156 22.4268 13.1914 18.7035 11.3185C14.9802 9.44552 10.8679 8.47648 6.70007 8.48999H4.31006C3.24919 8.48999 2.23171 8.06857 1.48157 7.31842C0.731422 6.56827 0.310059 5.55086 0.310059 4.48999C0.310059 3.42912 0.731422 2.41174 1.48157 1.66159C2.23171 0.911445 3.24919 0.48999 4.31006 0.48999H6.70007C12.1095 0.506273 17.4411 1.77947 22.2743 4.20908C27.1075 6.63868 31.31 10.1582 34.55 14.49C35.1839 15.3413 35.4536 16.4096 35.2998 17.4598C35.146 18.51 34.5813 19.4561 33.73 20.09C32.8786 20.7239 31.8103 20.9936 30.7601 20.8398C29.7099 20.686 28.7639 20.1213 28.13 19.27Z"
            />

            <UnderGlowStrip
              id="150_undeglow"
              x={1107}
              y={81}
              onClick={e => {
                setUndeglowIndex(150, e);
              }}
              selectedLED={this.props.selectedLED}
              visibility={this.props.showUnderglow || this.props.isStandardView ? true : false}
              clickAble={this.props.isStandardView && !this.props.showUnderglow ? false : true}
              fill={getColor(150)}
              stroke={stroke(150)}
              strokeWidth={getStrokeWidth(150)}
              dataLedIndex={getLEDIndex(150)}
              dataKeyIndex={keyIndex(150)}
              dataLayer={layer}
              path="M0.310059 4.48999C0.310059 3.42912 0.731422 2.41174 1.48157 1.66159C2.23171 0.911445 3.24919 0.48999 4.31006 0.48999H35.3101C36.3709 0.48999 37.3883 0.911445 38.1384 1.66159C38.8886 2.41174 39.3101 3.42912 39.3101 4.48999C39.3101 5.55086 38.8886 6.56827 38.1384 7.31842C37.3883 8.06857 36.3709 8.48999 35.3101 8.48999H4.31006C3.24919 8.48999 2.23171 8.06857 1.48157 7.31842C0.731422 6.56827 0.310059 5.55086 0.310059 4.48999Z"
            />
            <UnderGlowStrip
              id="149_undeglow"
              x={1065}
              y={80}
              onClick={e => {
                setUndeglowIndex(149, e);
              }}
              selectedLED={this.props.selectedLED}
              visibility={this.props.showUnderglow || this.props.isStandardView ? true : false}
              clickAble={this.props.isStandardView && !this.props.showUnderglow ? false : true}
              fill={getColor(149)}
              stroke={stroke(149)}
              strokeWidth={getStrokeWidth(149)}
              dataLedIndex={getLEDIndex(149)}
              dataKeyIndex={keyIndex(149)}
              dataLayer={layer}
              path="M2.81998 8.09C2.32071 7.88841 1.86727 7.5881 1.48685 7.20706C1.10643 6.82602 0.806888 6.3721 0.606113 5.8725C0.405338 5.3729 0.307505 4.83791 0.318454 4.29959C0.329404 3.76127 0.448909 3.23071 0.669834 2.73969C0.890759 2.24867 1.20856 1.8073 1.60416 1.44205C1.99976 1.07679 2.46503 0.795168 2.97208 0.614045C3.47913 0.432923 4.01748 0.356049 4.55497 0.388002C5.09245 0.419954 5.61799 0.560098 6.10001 0.80002C7.11388 1.25083 8.21041 1.48578 9.31998 1.48999H35.32C36.3809 1.48999 37.3983 1.91145 38.1484 2.66159C38.8986 3.41174 39.32 4.42913 39.32 5.48999C39.32 6.55086 38.8986 7.56828 38.1484 8.31842C37.3983 9.06857 36.3809 9.48999 35.32 9.48999H9.31998C7.07918 9.48364 4.86471 9.00668 2.81998 8.09Z"
            />

            <UnderGlowStrip
              id="148_undeglow"
              x={1030}
              y={60}
              onClick={e => {
                setUndeglowIndex(148, e);
              }}
              selectedLED={this.props.selectedLED}
              visibility={this.props.showUnderglow || this.props.isStandardView ? true : false}
              clickAble={this.props.isStandardView && !this.props.showUnderglow ? false : true}
              fill={getColor(148)}
              stroke={stroke(148)}
              strokeWidth={getStrokeWidth(148)}
              dataLedIndex={getLEDIndex(148)}
              dataKeyIndex={keyIndex(148)}
              dataLayer={layer}
              path="M28.19 22.91L15.39 12.33C12.5541 10.0105 9.00372 8.74228 5.34003 8.73999H4.60999C3.54912 8.73999 2.53176 8.31857 1.78162 7.56842C1.03147 6.81827 0.609985 5.80086 0.609985 4.73999C0.609985 3.67912 1.03147 2.66174 1.78162 1.91159C2.53176 1.16145 3.54912 0.73999 4.60999 0.73999H5.34003C10.8294 0.759917 16.1443 2.67046 20.39 6.14999L33.25 16.71C33.6584 17.0427 33.997 17.4528 34.2465 17.9167C34.4959 18.3807 34.6513 18.8893 34.7036 19.4135C34.756 19.9376 34.7043 20.4669 34.5515 20.971C34.3988 21.4751 34.1479 21.9441 33.8134 22.351C33.4789 22.7579 33.0674 23.0948 32.6024 23.3422C32.1373 23.5897 31.6281 23.7428 31.1037 23.7929C30.5793 23.843 30.0503 23.789 29.5468 23.634C29.0434 23.4791 28.5755 23.2263 28.17 22.89L28.19 22.91Z"
            />

            <UnderGlowStrip
              id="147_undeglow"
              x={989}
              y={55}
              onClick={e => {
                setUndeglowIndex(147, e);
              }}
              selectedLED={this.props.selectedLED}
              visibility={this.props.showUnderglow || this.props.isStandardView ? true : false}
              clickAble={this.props.isStandardView && !this.props.showUnderglow ? false : true}
              fill={getColor(147)}
              stroke={stroke(147)}
              strokeWidth={getStrokeWidth(147)}
              dataLedIndex={getLEDIndex(147)}
              dataKeyIndex={keyIndex(147)}
              dataLayer={layer}
              path="M3 8.91001L2 8.02C1.57572 7.68665 1.22329 7.27094 0.963869 6.79783C0.704448 6.32472 0.543409 5.804 0.49048 5.26704C0.437551 4.73007 0.493831 4.18794 0.655885 3.67329C0.81794 3.15863 1.08244 2.68208 1.43347 2.27232C1.78451 1.86255 2.2148 1.52804 2.69849 1.28892C3.18218 1.04979 3.70926 0.911008 4.24799 0.880898C4.78672 0.850788 5.32593 0.929982 5.83325 1.11372C6.34058 1.29745 6.8055 1.58192 7.20001 1.95002L8.20001 2.83002C9.61956 4.04919 11.4288 4.71965 13.3 4.72001H34.56C35.6209 4.72001 36.6383 5.14143 37.3884 5.89158C38.1386 6.64172 38.56 7.65914 38.56 8.72001C38.56 9.78088 38.1386 10.7983 37.3884 11.5484C36.6383 12.2986 35.6209 12.72 34.56 12.72H13.3C9.52233 12.718 5.8696 11.3669 3 8.91001Z"
            />
            <UnderGlowStrip
              id="146_undeglow"
              x={954}
              y={35}
              onClick={e => {
                setUndeglowIndex(146, e);
              }}
              selectedLED={this.props.selectedLED}
              visibility={this.props.showUnderglow || this.props.isStandardView ? true : false}
              clickAble={this.props.isStandardView && !this.props.showUnderglow ? false : true}
              fill={getColor(146)}
              stroke={stroke(146)}
              strokeWidth={getStrokeWidth(146)}
              dataLedIndex={getLEDIndex(146)}
              dataKeyIndex={keyIndex(146)}
              dataLayer={layer}
              path="M28.61 19.91L19.19 11.84C16.3218 9.38082 12.6682 8.02933 8.89001 8.03H4.39001C3.32915 8.03 2.31173 7.60857 1.56158 6.85843C0.811439 6.10828 0.390015 5.09086 0.390015 4.03C0.390015 2.96913 0.811439 1.95171 1.56158 1.20157C2.31173 0.451423 3.32915 0.0299988 4.39001 0.0299988H8.92999C14.597 0.0321082 20.078 2.0529 24.39 5.73001L33.81 13.81C34.2164 14.1497 34.5514 14.5667 34.7953 15.0369C35.0393 15.5071 35.1874 16.0211 35.2311 16.549C35.2749 17.0768 35.2133 17.6081 35.05 18.1121C34.8868 18.616 34.6251 19.0824 34.2801 19.4844C33.9351 19.8863 33.5137 20.2157 33.0403 20.4535C32.567 20.6913 32.0512 20.8327 31.5228 20.8695C30.9943 20.9063 30.4638 20.8378 29.9621 20.6679C29.4604 20.498 28.9974 20.2302 28.6 19.88L28.61 19.91Z"
            />
            <UnderGlowStrip
              id="145_undeglow"
              x={912}
              y={35}
              onClick={e => {
                setUndeglowIndex(145, e);
              }}
              selectedLED={this.props.selectedLED}
              visibility={this.props.showUnderglow || this.props.isStandardView ? true : false}
              clickAble={this.props.isStandardView && !this.props.showUnderglow ? false : true}
              fill={getColor(145)}
              stroke={stroke(145)}
              strokeWidth={getStrokeWidth(145)}
              dataLedIndex={getLEDIndex(145)}
              dataKeyIndex={keyIndex(145)}
              dataLayer={layer}
              path="M0.390015 4C0.390015 2.93913 0.811439 1.92172 1.56158 1.17157C2.31173 0.421424 3.32915 0 4.39001 0H35.39C36.4509 0 37.4683 0.421424 38.2184 1.17157C38.9686 1.92172 39.39 2.93913 39.39 4C39.39 5.06087 38.9686 6.07828 38.2184 6.82843C37.4683 7.57858 36.4509 8 35.39 8H4.39001C3.32915 8 2.31173 7.57858 1.56158 6.82843C0.811439 6.07828 0.390015 5.06087 0.390015 4Z"
            />

            <UnderGlowStrip
              id="144_undeglow"
              x={875}
              y={35}
              onClick={e => {
                setUndeglowIndex(144, e);
              }}
              selectedLED={this.props.selectedLED}
              visibility={this.props.showUnderglow || this.props.isStandardView ? true : false}
              clickAble={this.props.isStandardView && !this.props.showUnderglow ? false : true}
              fill={getColor(144)}
              stroke={stroke(144)}
              strokeWidth={getStrokeWidth(144)}
              dataLedIndex={getLEDIndex(144)}
              dataKeyIndex={keyIndex(144)}
              dataLayer={layer}
              path="M1.78005 22.33C1.13175 21.4905 0.843398 20.4279 0.978418 19.3759C1.11344 18.3239 1.66075 17.3686 2.50002 16.72L16.39 5.98001C20.5708 2.75353 25.6991 0.996079 30.9801 0.980011H31.39C32.4509 0.980011 33.4683 1.40144 34.2185 2.15158C34.9686 2.90173 35.39 3.91915 35.39 4.98001C35.39 6.04088 34.9686 7.0583 34.2185 7.80844C33.4683 8.55859 32.4509 8.98001 31.39 8.98001H31C27.4931 8.98313 24.0859 10.147 21.31 12.29L7.39004 23.05C6.55057 23.6983 5.48797 23.9866 4.43594 23.8516C3.38391 23.7166 2.4286 23.1693 1.78005 22.33Z"
            />
            <UnderGlowStrip
              id="143_undeglow"
              x={836}
              y={57}
              onClick={e => {
                setUndeglowIndex(143, e);
              }}
              selectedLED={this.props.selectedLED}
              visibility={this.props.showUnderglow || this.props.isStandardView ? true : false}
              clickAble={this.props.isStandardView && !this.props.showUnderglow ? false : true}
              fill={getColor(143)}
              stroke={stroke(143)}
              strokeWidth={getStrokeWidth(143)}
              dataLedIndex={getLEDIndex(143)}
              dataKeyIndex={keyIndex(143)}
              dataLayer={layer}
              path="M0.679993 6.74C0.679993 5.67913 1.10142 4.66174 1.85156 3.9116C2.60171 3.16145 3.61913 2.74 4.67999 2.74H28.47C30.0718 2.73503 31.6342 2.24332 32.95 1.33002C33.8199 0.722677 34.8955 0.485762 35.9401 0.671423C36.9846 0.857084 37.9127 1.4501 38.52 2.32001C39.1274 3.18992 39.3643 4.26546 39.1786 5.31003C38.9929 6.35461 38.3999 7.28267 37.53 7.89002C34.8681 9.73513 31.7089 10.7289 28.47 10.74H4.67999C3.61913 10.74 2.60171 10.3186 1.85156 9.56843C1.10142 8.81828 0.679993 7.80086 0.679993 6.74Z"
            />

            <UnderGlowStrip
              id="142_undeglow"
              x={794}
              y={59}
              onClick={e => {
                setUndeglowIndex(142, e);
              }}
              selectedLED={this.props.selectedLED}
              visibility={this.props.showUnderglow || this.props.isStandardView ? true : false}
              clickAble={this.props.isStandardView && !this.props.showUnderglow ? false : true}
              fill={getColor(142)}
              stroke={stroke(142)}
              strokeWidth={getStrokeWidth(142)}
              dataLedIndex={getLEDIndex(142)}
              dataKeyIndex={keyIndex(142)}
              dataLayer={layer}
              path="M0.679993 4.73999C0.679993 3.67912 1.10142 2.66174 1.85156 1.91159C2.60171 1.16145 3.61913 0.73999 4.67999 0.73999H35.68C36.7409 0.73999 37.7583 1.16145 38.5084 1.91159C39.2586 2.66174 39.68 3.67912 39.68 4.73999C39.68 5.80086 39.2586 6.81827 38.5084 7.56842C37.7583 8.31857 36.7409 8.73999 35.68 8.73999H4.67999C3.61913 8.73999 2.60171 8.31857 1.85156 7.56842C1.10142 6.81827 0.679993 5.80086 0.679993 4.73999Z"
            />

            <UnderGlowStrip
              id="141_undeglow"
              x={758}
              y={59}
              onClick={e => {
                setUndeglowIndex(141, e);
              }}
              selectedLED={this.props.selectedLED}
              visibility={this.props.showUnderglow || this.props.isStandardView ? true : false}
              clickAble={this.props.isStandardView && !this.props.showUnderglow ? false : true}
              fill={getColor(141)}
              stroke={stroke(141)}
              strokeWidth={getStrokeWidth(141)}
              dataLedIndex={getLEDIndex(141)}
              dataKeyIndex={keyIndex(141)}
              dataLayer={layer}
              path="M1.51003 25.84C1.14397 25.4626 0.855923 25.0168 0.66231 24.528C0.468696 24.0392 0.373311 23.517 0.38167 22.9913C0.390029 22.4656 0.501959 21.9468 0.711016 21.4644C0.920072 20.982 1.22218 20.5455 1.60005 20.18L15.3 6.91C18.8166 3.46988 23.4035 1.33522 28.3 0.86001C28.8253 0.807481 29.3558 0.858919 29.8612 1.01141C30.3666 1.1639 30.837 1.41445 31.2456 1.74874C31.6542 2.08303 31.9929 2.49451 32.2424 2.95971C32.492 3.42491 32.6475 3.9347 32.7 4.45999C32.7526 4.98527 32.7011 5.51577 32.5486 6.02117C32.3961 6.52658 32.1456 6.99699 31.8113 7.40557C31.477 7.81415 31.0655 8.15288 30.6003 8.40243C30.1351 8.65198 29.6253 8.80748 29.1001 8.86001C26.0072 9.16481 23.1109 10.5159 20.89 12.69L7.17006 25.91C6.79269 26.2761 6.34685 26.5641 5.85805 26.7577C5.36925 26.9514 4.84705 27.0467 4.32137 27.0384C3.79569 27.03 3.27685 26.9181 2.79445 26.709C2.31206 26.5 1.87557 26.1979 1.51003 25.82V25.84Z"
            />

            <UnderGlowStrip
              id="140_undeglow"
              x={722}
              y={85}
              onClick={e => {
                setUndeglowIndex(140, e);
              }}
              selectedLED={this.props.selectedLED}
              visibility={this.props.showUnderglow || this.props.isStandardView ? true : false}
              clickAble={this.props.isStandardView && !this.props.showUnderglow ? false : true}
              fill={getColor(140)}
              stroke={stroke(140)}
              strokeWidth={getStrokeWidth(140)}
              dataLedIndex={getLEDIndex(140)}
              dataKeyIndex={keyIndex(140)}
              dataLayer={layer}
              path="M0.630005 10.39C0.630005 9.32914 1.05143 8.31172 1.80157 7.56157C2.55172 6.81143 3.56914 6.39 4.63 6.39H25.98L30.7 1.80999C31.4625 1.07136 32.4872 0.665879 33.5486 0.682758C34.6101 0.699636 35.6214 1.13748 36.36 1.89998C37.0986 2.66248 37.5041 3.68719 37.4872 4.74864C37.4704 5.8101 37.0325 6.82136 36.27 7.55999L31.55 12.13C30.076 13.5659 28.0978 14.3666 26.04 14.36H4.63C3.57432 14.36 2.56142 13.9427 1.81213 13.1991C1.06284 12.4554 0.637923 11.4457 0.630005 10.39Z"
            />

            <UnderGlowStrip
              id="139_undeglow"
              x={692}
              y={92}
              onClick={e => {
                setUndeglowIndex(139, e);
              }}
              selectedLED={this.props.selectedLED}
              visibility={this.props.showUnderglow || this.props.isStandardView ? true : false}
              clickAble={this.props.isStandardView && !this.props.showUnderglow ? false : true}
              fill={getColor(139)}
              stroke={stroke(139)}
              strokeWidth={getStrokeWidth(139)}
              dataLedIndex={getLEDIndex(139)}
              dataKeyIndex={keyIndex(139)}
              dataLayer={layer}
              path="M3.39002 30.32C2.34529 30.1392 1.41507 29.551 0.803782 28.6847C0.192496 27.8184 -0.0498507 26.7449 0.130015 25.7C1.16936 19.846 3.8225 14.3985 7.79066 9.97097C11.7588 5.54345 16.8844 2.31182 22.59 0.640009C23.0989 0.477548 23.6352 0.41866 24.1672 0.466822C24.6992 0.514984 25.2161 0.669197 25.6876 0.920405C26.159 1.17161 26.5754 1.51471 26.9121 1.92944C27.2487 2.34417 27.4989 2.82214 27.6479 3.33514C27.7969 3.84814 27.8415 4.38576 27.7793 4.91632C27.7171 5.44687 27.5493 5.95959 27.2857 6.42422C27.0221 6.88885 26.6682 7.29597 26.2447 7.62158C25.8212 7.94718 25.3368 8.18466 24.82 8.32C20.5519 9.57027 16.7173 11.9866 13.7476 15.2973C10.7779 18.608 8.79087 22.6816 8.01002 27.06C7.82924 28.1047 7.24107 29.0349 6.37477 29.6462C5.50846 30.2575 4.43492 30.4999 3.39002 30.32V30.32Z"
            />

            <UnderGlowStrip
              id="138_undeglow"
              x={691}
              y={124}
              onClick={e => {
                setUndeglowIndex(138, e);
              }}
              selectedLED={this.props.selectedLED}
              visibility={this.props.showUnderglow || this.props.isStandardView ? true : false}
              clickAble={this.props.isStandardView && !this.props.showUnderglow ? false : true}
              fill={getColor(138)}
              stroke={stroke(138)}
              strokeWidth={getStrokeWidth(138)}
              dataLedIndex={getLEDIndex(138)}
              dataKeyIndex={keyIndex(138)}
              dataLayer={layer}
              path="M0.690002 35.36V4.36002C0.690002 3.29915 1.11143 2.28173 1.86157 1.53159C2.61172 0.78144 3.62914 0.360016 4.69 0.360016C5.75087 0.360016 6.76829 0.78144 7.51843 1.53159C8.26858 2.28173 8.69 3.29915 8.69 4.36002V35.36C8.69 36.4209 8.26858 37.4383 7.51843 38.1884C6.76829 38.9386 5.75087 39.36 4.69 39.36C3.62914 39.36 2.61172 38.9386 1.86157 38.1884C1.11143 37.4383 0.690002 36.4209 0.690002 35.36Z"
            />

            <UnderGlowStrip
              id="137_undeglow"
              x={691}
              y={166}
              onClick={e => {
                setUndeglowIndex(137, e);
              }}
              selectedLED={this.props.selectedLED}
              visibility={this.props.showUnderglow || this.props.isStandardView ? true : false}
              clickAble={this.props.isStandardView && !this.props.showUnderglow ? false : true}
              fill={getColor(137)}
              stroke={stroke(137)}
              strokeWidth={getStrokeWidth(137)}
              dataLedIndex={getLEDIndex(137)}
              dataKeyIndex={keyIndex(137)}
              dataLayer={layer}
              path="M0.690002 35.36V4.36002C0.690002 3.29915 1.11143 2.28173 1.86157 1.53159C2.61172 0.78144 3.62914 0.360016 4.69 0.360016C5.75087 0.360016 6.76829 0.78144 7.51843 1.53159C8.26858 2.28173 8.69 3.29915 8.69 4.36002V35.36C8.69 36.4209 8.26858 37.4383 7.51843 38.1884C6.76829 38.9386 5.75087 39.36 4.69 39.36C3.62914 39.36 2.61172 38.9386 1.86157 38.1884C1.11143 37.4383 0.690002 36.4209 0.690002 35.36Z"
            />

            <UnderGlowStrip
              id="136_undeglow"
              x={691}
              y={208}
              onClick={e => {
                setUndeglowIndex(136, e);
              }}
              selectedLED={this.props.selectedLED}
              visibility={this.props.showUnderglow || this.props.isStandardView ? true : false}
              clickAble={this.props.isStandardView && !this.props.showUnderglow ? false : true}
              fill={getColor(136)}
              stroke={stroke(136)}
              strokeWidth={getStrokeWidth(136)}
              dataLedIndex={getLEDIndex(136)}
              dataKeyIndex={keyIndex(136)}
              dataLayer={layer}
              path="M0.690002 35.36V4.36002C0.690002 3.29915 1.11143 2.28173 1.86157 1.53159C2.61172 0.78144 3.62914 0.360016 4.69 0.360016C5.75087 0.360016 6.76829 0.78144 7.51843 1.53159C8.26858 2.28173 8.69 3.29915 8.69 4.36002V35.36C8.69 36.4209 8.26858 37.4383 7.51843 38.1884C6.76829 38.9386 5.75087 39.36 4.69 39.36C3.62914 39.36 2.61172 38.9386 1.86157 38.1884C1.11143 37.4383 0.690002 36.4209 0.690002 35.36Z"
            />

            <UnderGlowStrip
              id="135_undeglow"
              x={691}
              y={250}
              onClick={e => {
                setUndeglowIndex(135, e);
              }}
              selectedLED={this.props.selectedLED}
              visibility={this.props.showUnderglow || this.props.isStandardView ? true : false}
              clickAble={this.props.isStandardView && !this.props.showUnderglow ? false : true}
              fill={getColor(135)}
              stroke={stroke(135)}
              strokeWidth={getStrokeWidth(135)}
              dataLedIndex={getLEDIndex(135)}
              dataKeyIndex={keyIndex(135)}
              dataLayer={layer}
              path="M0.690002 35.36V4.36002C0.690002 3.29915 1.11143 2.28173 1.86157 1.53159C2.61172 0.78144 3.62914 0.360016 4.69 0.360016C5.75087 0.360016 6.76829 0.78144 7.51843 1.53159C8.26858 2.28173 8.69 3.29915 8.69 4.36002V35.36C8.69 36.4209 8.26858 37.4383 7.51843 38.1884C6.76829 38.9386 5.75087 39.36 4.69 39.36C3.62914 39.36 2.61172 38.9386 1.86157 38.1884C1.11143 37.4383 0.690002 36.4209 0.690002 35.36Z"
            />
            <UnderGlowStrip
              id="134_undeglow"
              x={691}
              y={292}
              onClick={e => {
                setUndeglowIndex(134, e);
              }}
              selectedLED={this.props.selectedLED}
              visibility={this.props.showUnderglow || this.props.isStandardView ? true : false}
              clickAble={this.props.isStandardView && !this.props.showUnderglow ? false : true}
              fill={getColor(134)}
              stroke={stroke(134)}
              strokeWidth={getStrokeWidth(134)}
              dataLedIndex={getLEDIndex(134)}
              dataKeyIndex={keyIndex(134)}
              dataLayer={layer}
              path="M4.48996 39.35C3.96457 39.3319 3.44793 39.2105 2.96951 38.9926C2.4911 38.7747 2.06031 38.4646 1.70181 38.0801C1.34332 37.6956 1.06413 37.2442 0.88022 36.7517C0.696306 36.2593 0.611266 35.7354 0.629976 35.21C0.629976 34.05 0.689973 32.88 0.689973 31.72V4.36002C0.689973 3.29915 1.1114 2.28173 1.86154 1.53159C2.61169 0.78144 3.62911 0.360016 4.68997 0.360016C5.75084 0.360016 6.76826 0.78144 7.5184 1.53159C8.26855 2.28173 8.68997 3.29915 8.68997 4.36002V31.72C8.68997 32.98 8.66998 34.24 8.62998 35.5C8.59368 36.5364 8.15631 37.5182 7.41007 38.2384C6.66382 38.9585 5.66703 39.3607 4.62998 39.36L4.48996 39.35Z"
            />
            <UnderGlowStrip
              id="133_undeglow"
              x={682}
              y={334}
              onClick={e => {
                setUndeglowIndex(133, e);
              }}
              selectedLED={this.props.selectedLED}
              visibility={this.props.showUnderglow || this.props.isStandardView ? true : false}
              clickAble={this.props.isStandardView && !this.props.showUnderglow ? false : true}
              fill={getColor(133)}
              stroke={stroke(133)}
              strokeWidth={getStrokeWidth(133)}
              dataLedIndex={getLEDIndex(133)}
              dataKeyIndex={keyIndex(133)}
              dataLayer={layer}
              path="M2.90004 38.16C1.88244 37.867 1.02256 37.1824 0.508925 36.2564C-0.00470662 35.3303 -0.130154 34.2384 0.160048 33.22L4.88002 16.82C6.11099 12.525 7.0498 8.15173 7.69002 3.72999C7.84252 2.67973 8.40601 1.73308 9.25648 1.09827C10.107 0.463464 11.1748 0.192479 12.225 0.344978C13.2753 0.497478 14.222 1.06097 14.8568 1.91145C15.4916 2.76192 15.7625 3.82969 15.61 4.87995C14.9303 9.65889 13.928 14.3864 12.61 19.03L7.89003 35.43C7.6495 36.2627 7.14501 36.9948 6.45247 37.516C5.75992 38.0372 4.91677 38.3193 4.05 38.32C3.6608 38.3248 3.27314 38.2708 2.90004 38.16Z"
            />
            <UnderGlowStrip
              id="132_undeglow"
              x={670}
              y={375}
              onClick={e => {
                setUndeglowIndex(132, e);
              }}
              selectedLED={this.props.selectedLED}
              visibility={this.props.showUnderglow || this.props.isStandardView ? true : false}
              clickAble={this.props.isStandardView && !this.props.showUnderglow ? false : true}
              fill={getColor(132)}
              stroke={stroke(132)}
              strokeWidth={getStrokeWidth(132)}
              dataLedIndex={getLEDIndex(132)}
              dataKeyIndex={keyIndex(132)}
              dataLayer={layer}
              path="M3.30002 38.53C2.7895 38.3853 2.3129 38.1405 1.89792 37.8098C1.48293 37.4792 1.13791 37.0692 0.882904 36.6038C0.6279 36.1385 0.467991 35.6271 0.412567 35.0994C0.357143 34.5717 0.407266 34.0382 0.560028 33.53L9.12003 3.74002C9.26514 3.23508 9.50831 2.76365 9.8356 2.35269C10.1629 1.94172 10.5679 1.59925 11.0276 1.34481C11.4872 1.09038 11.9925 0.929004 12.5145 0.869839C13.0365 0.810675 13.5651 0.854916 14.07 1.00003C14.575 1.14514 15.0464 1.38825 15.4574 1.71554C15.8683 2.04284 16.2108 2.44785 16.4652 2.9075C16.7197 3.36715 16.8811 3.87247 16.9402 4.3945C16.9994 4.91653 16.9551 5.44505 16.81 5.94998L8.25003 35.74C8.01132 36.5746 7.50762 37.3089 6.81491 37.832C6.1222 38.3551 5.27812 38.6387 4.41006 38.64C4.03669 38.6571 3.66277 38.6201 3.30002 38.53Z"
            />
            <UnderGlowStrip
              id="131_undeglow"
              x={656}
              y={415}
              onClick={e => {
                setUndeglowIndex(131, e);
              }}
              selectedLED={this.props.selectedLED}
              visibility={this.props.showUnderglow || this.props.isStandardView ? true : false}
              clickAble={this.props.isStandardView && !this.props.showUnderglow ? false : true}
              fill={getColor(131)}
              stroke={stroke(131)}
              strokeWidth={getStrokeWidth(131)}
              dataLedIndex={getLEDIndex(131)}
              dataKeyIndex={keyIndex(131)}
              dataLayer={layer}
              path="M1.85004 70.74C-0.540135 60.0598 -0.615183 48.9916 1.63001 38.28C1.85001 37.28 2.63002 33.95 2.96002 32.95L11.52 3.14999C11.6651 2.64506 11.9082 2.17369 12.2355 1.76272C12.5628 1.35176 12.9679 1.00928 13.4276 0.754849C13.8872 0.500416 14.3925 0.338977 14.9145 0.279812C15.4365 0.220648 15.9651 0.26489 16.47 0.41C16.975 0.555111 17.4463 0.798282 17.8573 1.12558C18.2683 1.45287 18.6107 1.85788 18.8652 2.31753C19.1196 2.77718 19.281 3.28244 19.3402 3.80447C19.3994 4.3265 19.3551 4.85508 19.21 5.36001L10.65 35.16C10.38 36.06 9.65002 39.01 9.46002 39.93C8.49144 44.5338 8.00214 49.2255 8 53.93C8.00451 58.9756 8.56119 64.0055 9.66004 68.93C9.89346 69.9615 9.70887 71.0435 9.14667 71.9392C8.58447 72.835 7.69042 73.4717 6.66003 73.71C6.37387 73.7696 6.08235 73.7998 5.79004 73.8C4.88377 73.8118 4.00036 73.5154 3.28455 72.9595C2.56873 72.4036 2.06295 71.621 1.85004 70.74Z"
            />
            <UnderGlowStrip
              id="130_undeglow"
              x={661}
              y={491}
              onClick={e => {
                setUndeglowIndex(130, e);
              }}
              selectedLED={this.props.selectedLED}
              visibility={this.props.showUnderglow || this.props.isStandardView ? true : false}
              clickAble={this.props.isStandardView && !this.props.showUnderglow ? false : true}
              fill={getColor(130)}
              stroke={stroke(130)}
              strokeWidth={getStrokeWidth(130)}
              dataLedIndex={getLEDIndex(130)}
              dataKeyIndex={keyIndex(130)}
              dataLayer={layer}
              path="M19.01 32.97C11.1997 25.304 5.12914 16.0481 1.21003 5.82996C1.00291 5.33661 0.896879 4.80674 0.898206 4.27167C0.899532 3.73661 1.00816 3.20723 1.21772 2.71491C1.42729 2.22259 1.73351 1.77732 2.11824 1.40546C2.50297 1.0336 2.95843 0.742698 3.45759 0.549993C3.95675 0.357287 4.4895 0.266706 5.0243 0.283574C5.55911 0.300443 6.08509 0.424419 6.57112 0.648198C7.05714 0.871978 7.4933 1.191 7.85383 1.58637C8.21436 1.98174 8.49193 2.44541 8.67006 2.94996C12.1986 12.1068 17.6553 20.3976 24.6701 27.26C25.4272 28.0039 25.8579 29.0181 25.8673 30.0796C25.8766 31.1411 25.464 32.1628 24.72 32.92C23.9761 33.6772 22.9619 34.1078 21.9004 34.1172C20.8389 34.1266 19.8172 33.7139 19.06 32.97H19.01Z"
            />
            <UnderGlowStrip
              id="129_undeglow"
              x={686}
              y={524}
              onClick={e => {
                setUndeglowIndex(129, e);
              }}
              selectedLED={this.props.selectedLED}
              visibility={this.props.showUnderglow || this.props.isStandardView ? true : false}
              clickAble={this.props.isStandardView && !this.props.showUnderglow ? false : true}
              fill={getColor(129)}
              stroke={stroke(129)}
              strokeWidth={getStrokeWidth(129)}
              dataLedIndex={getLEDIndex(129)}
              dataKeyIndex={keyIndex(129)}
              dataLayer={layer}
              path="M26.75 25.91L1.83003 7.45997C0.977354 6.82875 0.410324 5.88466 0.253731 4.8354C0.0971385 3.78613 0.363788 2.71767 0.995003 1.865C1.62622 1.01233 2.57031 0.445297 3.61958 0.288704C4.66884 0.132112 5.73736 0.398761 6.59003 1.02998L31.51 19.48C32.3627 20.1112 32.9297 21.0553 33.0863 22.1046C33.2429 23.1538 32.9763 24.2223 32.345 25.075C31.7138 25.9276 30.7697 26.4947 29.7205 26.6513C28.6712 26.8078 27.6027 26.5412 26.75 25.91Z"
            />
            <UnderGlowStrip
              id="128_undeglow"
              x={719}
              y={549}
              onClick={e => {
                setUndeglowIndex(128, e);
              }}
              selectedLED={this.props.selectedLED}
              visibility={this.props.showUnderglow || this.props.isStandardView ? true : false}
              clickAble={this.props.isStandardView && !this.props.showUnderglow ? false : true}
              fill={getColor(128)}
              stroke={stroke(128)}
              strokeWidth={getStrokeWidth(128)}
              dataLedIndex={getLEDIndex(128)}
              dataKeyIndex={keyIndex(128)}
              dataLayer={layer}
              path="M20.87 29.34C15.9182 20.8166 9.34845 13.3432 1.53003 7.33996C0.72352 6.68329 0.204462 5.73834 0.0829507 4.70543C-0.0385602 3.67252 0.246987 2.6329 0.879093 1.807C1.5112 0.981097 2.44015 0.433886 3.46894 0.281362C4.49773 0.128838 5.54548 0.383002 6.39002 0.98998C15.0349 7.60727 22.3014 15.8521 27.78 25.2599C28.2335 26.1707 28.3228 27.2201 28.0299 28.1944C27.737 29.1688 27.0838 29.9949 26.2033 30.5046C25.3227 31.0143 24.281 31.1693 23.2902 30.9381C22.2994 30.7069 21.434 30.1068 20.87 29.2599V29.34Z"
            />
            <UnderGlowStrip
              id="127_undeglow"
              x={745}
              y={582}
              onClick={e => {
                setUndeglowIndex(127, e);
              }}
              selectedLED={this.props.selectedLED}
              visibility={this.props.showUnderglow || this.props.isStandardView ? true : false}
              clickAble={this.props.isStandardView && !this.props.showUnderglow ? false : true}
              fill={getColor(127)}
              stroke={stroke(127)}
              strokeWidth={getStrokeWidth(127)}
              dataLedIndex={getLEDIndex(127)}
              dataKeyIndex={keyIndex(127)}
              dataLayer={layer}
              path="M8.49002 35.98L4.06002 17.66C3.15528 13.908 1.96515 10.2306 0.500027 6.65998C0.253419 6.16666 0.111481 5.62765 0.0831571 5.07685C0.0548333 4.52605 0.140772 3.97538 0.335476 3.45936C0.530181 2.94334 0.829446 2.47312 1.21457 2.07832C1.59969 1.68351 2.0623 1.37262 2.57333 1.16517C3.08436 0.957715 3.63277 0.858227 4.18411 0.872871C4.73544 0.887514 5.27777 1.01603 5.77707 1.25031C6.27636 1.4846 6.72186 1.81957 7.08548 2.23426C7.4491 2.64895 7.723 3.13435 7.89004 3.65998C9.51426 7.59564 10.8315 11.6511 11.83 15.79L16.27 34.11C16.393 34.6242 16.4129 35.1577 16.3283 35.6797C16.2438 36.2016 16.0566 36.7017 15.7776 37.1508C15.4986 37.6 15.1334 37.9894 14.703 38.2965C14.2725 38.6036 13.7855 38.8223 13.27 38.94C12.9583 39.0111 12.6398 39.048 12.32 39.05C11.4313 39.0366 10.5723 38.7274 9.87875 38.1715C9.1852 37.6156 8.69658 36.8445 8.49002 35.98Z"
            />

            <UnderGlowStrip
              id="126_undeglow"
              x={756}
              y={623}
              onClick={e => {
                setUndeglowIndex(126, e);
              }}
              selectedLED={this.props.selectedLED}
              visibility={this.props.showUnderglow || this.props.isStandardView ? true : false}
              clickAble={this.props.isStandardView && !this.props.showUnderglow ? false : true}
              fill={getColor(126)}
              stroke={stroke(126)}
              strokeWidth={getStrokeWidth(126)}
              dataLedIndex={getLEDIndex(126)}
              dataKeyIndex={keyIndex(126)}
              dataLayer={layer}
              path="M8.39 35.8L1.10002 5.66999C0.953663 5.15217 0.913284 4.61015 0.981309 4.07636C1.04933 3.54258 1.22435 3.02798 1.4959 2.56342C1.76745 2.09886 2.12996 1.69387 2.56169 1.37269C2.99343 1.0515 3.48552 0.820767 4.00853 0.694221C4.53154 0.567675 5.0747 0.547947 5.60552 0.636237C6.13633 0.724528 6.64388 0.91898 7.09776 1.20801C7.55165 1.49705 7.94254 1.87472 8.24706 2.31837C8.55158 2.76201 8.76343 3.26254 8.86998 3.78998L16.14 33.91C16.3902 34.9403 16.221 36.0278 15.6697 36.9335C15.1184 37.8392 14.2301 38.489 13.2 38.74C12.8882 38.8105 12.5697 38.8474 12.25 38.85C11.3588 38.8443 10.495 38.5411 9.7957 37.9885C9.09641 37.436 8.60165 36.6657 8.39 35.8Z"
            />

            <UnderGlowStrip
              id="125_undeglow"
              x={766}
              y={663}
              onClick={e => {
                setUndeglowIndex(125, e);
              }}
              selectedLED={this.props.selectedLED}
              visibility={this.props.showUnderglow || this.props.isStandardView ? true : false}
              clickAble={this.props.isStandardView && !this.props.showUnderglow ? false : true}
              fill={getColor(125)}
              stroke={stroke(125)}
              strokeWidth={getStrokeWidth(125)}
              dataLedIndex={getLEDIndex(125)}
              dataKeyIndex={keyIndex(125)}
              dataLayer={layer}
              path="M8.24999 35.62L0.960007 5.49C0.813648 4.97218 0.77327 4.43015 0.841294 3.89637C0.909319 3.36258 1.08433 2.84799 1.35588 2.38343C1.62743 1.91887 1.98994 1.51388 2.42168 1.1927C2.85341 0.871511 3.3455 0.640774 3.86852 0.514228C4.39153 0.387682 4.93469 0.367955 5.4655 0.456245C5.99631 0.544535 6.50386 0.738988 6.95775 1.02802C7.41164 1.31706 7.80252 1.69473 8.10704 2.13837C8.41156 2.58202 8.62348 3.08254 8.73003 3.60999L16.02 33.74C16.143 34.2542 16.1628 34.7878 16.0783 35.3097C15.9938 35.8316 15.8066 36.3317 15.5276 36.7808C15.2486 37.23 14.8833 37.6194 14.4529 37.9265C14.0225 38.2336 13.5355 38.4523 13.02 38.57C12.7125 38.646 12.3967 38.683 12.08 38.68C11.1926 38.6671 10.3347 38.3595 9.64128 37.8055C8.94791 37.2515 8.45845 36.4827 8.24999 35.62Z"
            />
            <UnderGlowStrip
              id="124_undeglow"
              x={776}
              y={704}
              onClick={e => {
                setUndeglowIndex(124, e);
              }}
              selectedLED={this.props.selectedLED}
              visibility={this.props.showUnderglow || this.props.isStandardView ? true : false}
              clickAble={this.props.isStandardView && !this.props.showUnderglow ? false : true}
              fill={getColor(124)}
              stroke={stroke(124)}
              strokeWidth={getStrokeWidth(124)}
              dataLedIndex={getLEDIndex(124)}
              dataKeyIndex={keyIndex(124)}
              dataLayer={layer}
              path="M9.00999 35.9699C7.94544 33.6531 7.10819 31.2385 6.50999 28.7599L0.829993 5.30997C0.58069 4.27828 0.751431 3.18977 1.30466 2.28397C1.8579 1.37817 2.74831 0.72926 3.78001 0.479957C4.8117 0.230653 5.90014 0.401395 6.80595 0.954627C7.71175 1.50786 8.36066 2.39828 8.60996 3.42997L14.28 26.8799C14.7583 28.8602 15.4281 30.7893 16.28 32.6399C16.5176 33.1198 16.6563 33.6425 16.6881 34.177C16.72 34.7115 16.6441 35.2469 16.4652 35.7516C16.2862 36.2562 16.0078 36.7197 15.6463 37.1148C15.2849 37.5098 14.8478 37.8283 14.361 38.0512C13.8742 38.2742 13.3476 38.3972 12.8124 38.4129C12.2771 38.4286 11.7442 38.3367 11.2452 38.1426C10.7462 37.9485 10.2912 37.6561 9.90726 37.2829C9.52331 36.9097 9.21818 36.4633 9.00999 35.9699Z"
            />

            <UnderGlowStrip
              id="123_undeglow"
              x={790}
              y={743}
              onClick={e => {
                setUndeglowIndex(123, e);
              }}
              selectedLED={this.props.selectedLED}
              visibility={this.props.showUnderglow || this.props.isStandardView ? true : false}
              clickAble={this.props.isStandardView && !this.props.showUnderglow ? false : true}
              fill={getColor(123)}
              stroke={stroke(123)}
              strokeWidth={getStrokeWidth(123)}
              dataLedIndex={getLEDIndex(123)}
              dataKeyIndex={keyIndex(123)}
              dataLayer={layer}
              path="M1.75002 7.12992C1.06076 6.3433 0.707007 5.318 0.764548 4.27372C0.822088 3.22943 1.28637 2.24925 2.05788 1.54313C2.82939 0.837 3.84677 0.46115 4.89205 0.496068C5.93733 0.530986 6.92738 0.973854 7.65005 1.72989C10.5904 4.91751 14.1592 7.46155 18.1314 9.20157C22.1037 10.9416 26.3934 11.84 30.7301 11.84H32.4701C33.5309 11.84 34.5483 12.2614 35.2985 13.0115C36.0486 13.7617 36.4701 14.7791 36.4701 15.84C36.4701 16.9009 36.0486 17.9182 35.2985 18.6684C34.5483 19.4185 33.5309 19.84 32.4701 19.84H30.7301C25.2833 19.8402 19.8957 18.7108 14.9076 16.5231C9.91945 14.3354 5.43927 11.137 1.75002 7.12992Z"
            />

            <UnderGlowStrip
              id="175_undeglow"
              x={828}
              y={755}
              onClick={e => {
                setUndeglowIndex(175, e);
              }}
              selectedLED={this.props.selectedLED}
              visibility={this.props.showUnderglow || this.props.isStandardView ? true : false}
              clickAble={this.props.isStandardView && !this.props.showUnderglow ? false : true}
              fill={getColor(175)}
              stroke={stroke(175)}
              strokeWidth={getStrokeWidth(175)}
              dataLedIndex={getLEDIndex(175)}
              dataKeyIndex={keyIndex(175)}
              dataLayer={layer}
              path="M0.470032 4.84003C0.470032 3.77916 0.891456 2.76168 1.6416 2.01154C2.39175 1.26139 3.40917 0.840027 4.47003 0.840027H35.47C36.5309 0.840027 37.5483 1.26139 38.2985 2.01154C39.0486 2.76168 39.47 3.77916 39.47 4.84003C39.47 5.90089 39.0486 6.91825 38.2985 7.6684C37.5483 8.41854 36.5309 8.84003 35.47 8.84003H4.47003C3.40917 8.84003 2.39175 8.41854 1.6416 7.6684C0.891456 6.91825 0.470032 5.90089 0.470032 4.84003Z"
            />

            <UnderGlowStrip
              id="174_undeglow"
              x={870}
              y={755}
              onClick={e => {
                setUndeglowIndex(174, e);
              }}
              selectedLED={this.props.selectedLED}
              visibility={this.props.showUnderglow || this.props.isStandardView ? true : false}
              clickAble={this.props.isStandardView && !this.props.showUnderglow ? false : true}
              fill={getColor(174)}
              stroke={stroke(174)}
              strokeWidth={getStrokeWidth(174)}
              dataLedIndex={getLEDIndex(174)}
              dataKeyIndex={keyIndex(174)}
              dataLayer={layer}
              path="M0.470032 4.84003C0.470032 3.77916 0.891456 2.76168 1.6416 2.01154C2.39175 1.26139 3.40917 0.840027 4.47003 0.840027H35.47C36.5309 0.840027 37.5483 1.26139 38.2985 2.01154C39.0486 2.76168 39.47 3.77916 39.47 4.84003C39.47 5.90089 39.0486 6.91825 38.2985 7.6684C37.5483 8.41854 36.5309 8.84003 35.47 8.84003H4.47003C3.40917 8.84003 2.39175 8.41854 1.6416 7.6684C0.891456 6.91825 0.470032 5.90089 0.470032 4.84003Z"
            />

            <UnderGlowStrip
              id="173_undeglow"
              x={912}
              y={755}
              onClick={e => {
                setUndeglowIndex(173, e);
              }}
              selectedLED={this.props.selectedLED}
              visibility={this.props.showUnderglow || this.props.isStandardView ? true : false}
              clickAble={this.props.isStandardView && !this.props.showUnderglow ? false : true}
              fill={getColor(173)}
              stroke={stroke(173)}
              strokeWidth={getStrokeWidth(173)}
              dataLedIndex={getLEDIndex(173)}
              dataKeyIndex={keyIndex(173)}
              dataLayer={layer}
              path="M0.470032 4.84003C0.470032 3.77916 0.891456 2.76168 1.6416 2.01154C2.39175 1.26139 3.40917 0.840027 4.47003 0.840027H35.47C36.5309 0.840027 37.5483 1.26139 38.2985 2.01154C39.0486 2.76168 39.47 3.77916 39.47 4.84003C39.47 5.90089 39.0486 6.91825 38.2985 7.6684C37.5483 8.41854 36.5309 8.84003 35.47 8.84003H4.47003C3.40917 8.84003 2.39175 8.41854 1.6416 7.6684C0.891456 6.91825 0.470032 5.90089 0.470032 4.84003Z"
            />

            <UnderGlowStrip
              id="172_undeglow"
              x={954}
              y={755}
              onClick={e => {
                setUndeglowIndex(172, e);
              }}
              selectedLED={this.props.selectedLED}
              visibility={this.props.showUnderglow || this.props.isStandardView ? true : false}
              clickAble={this.props.isStandardView && !this.props.showUnderglow ? false : true}
              fill={getColor(172)}
              stroke={stroke(172)}
              strokeWidth={getStrokeWidth(172)}
              dataLedIndex={getLEDIndex(172)}
              dataKeyIndex={keyIndex(172)}
              dataLayer={layer}
              path="M0.470032 4.84003C0.470032 3.77916 0.891456 2.76168 1.6416 2.01154C2.39175 1.26139 3.40917 0.840027 4.47003 0.840027H35.47C36.5309 0.840027 37.5483 1.26139 38.2985 2.01154C39.0486 2.76168 39.47 3.77916 39.47 4.84003C39.47 5.90089 39.0486 6.91825 38.2985 7.6684C37.5483 8.41854 36.5309 8.84003 35.47 8.84003H4.47003C3.40917 8.84003 2.39175 8.41854 1.6416 7.6684C0.891456 6.91825 0.470032 5.90089 0.470032 4.84003Z"
            />
            <UnderGlowStrip
              id="171_undeglow"
              x={996}
              y={755}
              onClick={e => {
                setUndeglowIndex(171, e);
              }}
              selectedLED={this.props.selectedLED}
              visibility={this.props.showUnderglow || this.props.isStandardView ? true : false}
              clickAble={this.props.isStandardView && !this.props.showUnderglow ? false : true}
              fill={getColor(171)}
              stroke={stroke(171)}
              strokeWidth={getStrokeWidth(171)}
              dataLedIndex={getLEDIndex(171)}
              dataKeyIndex={keyIndex(171)}
              dataLayer={layer}
              path="M0.470032 4.84003C0.470032 3.77916 0.891456 2.76168 1.6416 2.01154C2.39175 1.26139 3.40917 0.840027 4.47003 0.840027H35.47C36.5309 0.840027 37.5483 1.26139 38.2985 2.01154C39.0486 2.76168 39.47 3.77916 39.47 4.84003C39.47 5.90089 39.0486 6.91825 38.2985 7.6684C37.5483 8.41854 36.5309 8.84003 35.47 8.84003H4.47003C3.40917 8.84003 2.39175 8.41854 1.6416 7.6684C0.891456 6.91825 0.470032 5.90089 0.470032 4.84003Z"
            />
            <UnderGlowStrip
              id="170_undeglow"
              x={1038}
              y={755}
              onClick={e => {
                setUndeglowIndex(170, e);
              }}
              selectedLED={this.props.selectedLED}
              visibility={this.props.showUnderglow || this.props.isStandardView ? true : false}
              clickAble={this.props.isStandardView && !this.props.showUnderglow ? false : true}
              fill={getColor(170)}
              stroke={stroke(170)}
              strokeWidth={getStrokeWidth(170)}
              dataLedIndex={getLEDIndex(170)}
              dataKeyIndex={keyIndex(170)}
              dataLayer={layer}
              path="M0.469971 4.84003C0.469971 3.77916 0.891395 2.76168 1.64154 2.01154C2.39169 1.26139 3.4091 0.840027 4.46997 0.840027H35.47C36.5308 0.840027 37.5483 1.26139 38.2984 2.01154C39.0485 2.76168 39.4699 3.77916 39.4699 4.84003C39.4699 5.90089 39.0485 6.91825 38.2984 7.6684C37.5483 8.41854 36.5308 8.84003 35.47 8.84003H4.46997C3.4091 8.84003 2.39169 8.41854 1.64154 7.6684C0.891395 6.91825 0.469971 5.90089 0.469971 4.84003Z"
            />
            <UnderGlowStrip
              id="169_undeglow"
              x={1080}
              y={755}
              onClick={e => {
                setUndeglowIndex(169, e);
              }}
              selectedLED={this.props.selectedLED}
              visibility={this.props.showUnderglow || this.props.isStandardView ? true : false}
              clickAble={this.props.isStandardView && !this.props.showUnderglow ? false : true}
              fill={getColor(169)}
              stroke={stroke(169)}
              strokeWidth={getStrokeWidth(169)}
              dataLedIndex={getLEDIndex(169)}
              dataKeyIndex={keyIndex(169)}
              dataLayer={layer}
              path="M0.469971 4.84003C0.469971 3.77916 0.891456 2.76168 1.6416 2.01154C2.39175 1.26139 3.4091 0.840027 4.46997 0.840027H35.47C36.5308 0.840027 37.5483 1.26139 38.2985 2.01154C39.0486 2.76168 39.47 3.77916 39.47 4.84003C39.47 5.90089 39.0486 6.91825 38.2985 7.6684C37.5483 8.41854 36.5308 8.84003 35.47 8.84003H4.46997C3.4091 8.84003 2.39175 8.41854 1.6416 7.6684C0.891456 6.91825 0.469971 5.90089 0.469971 4.84003Z"
            />
            <UnderGlowStrip
              id="168_undeglow"
              x={1122}
              y={755}
              onClick={e => {
                setUndeglowIndex(168, e);
              }}
              selectedLED={this.props.selectedLED}
              visibility={this.props.showUnderglow || this.props.isStandardView ? true : false}
              clickAble={this.props.isStandardView && !this.props.showUnderglow ? false : true}
              fill={getColor(168)}
              stroke={stroke(168)}
              strokeWidth={getStrokeWidth(168)}
              dataLedIndex={getLEDIndex(168)}
              dataKeyIndex={keyIndex(168)}
              dataLayer={layer}
              path="M0.469917 4.84006C0.469917 3.77919 0.891402 2.76171 1.64155 2.01157C2.39169 1.26142 3.40905 0.840058 4.46992 0.840058H31.53C32.6961 0.838229 33.8612 0.771386 35.02 0.639985C36.0808 0.521964 37.1451 0.830227 37.9787 1.49692C38.8123 2.16361 39.3469 3.13417 39.4649 4.19504C39.5829 5.2559 39.2748 6.32018 38.6081 7.15378C37.9414 7.98738 36.9708 8.52196 35.91 8.63999C34.4556 8.80328 32.9934 8.88674 31.53 8.88999H4.46992C3.9404 8.89003 3.41615 8.78492 2.92756 8.58078C2.43897 8.37664 1.99582 8.07752 1.62373 7.70078C1.25163 7.32403 0.958009 6.87717 0.759956 6.38608C0.561903 5.89499 0.463298 5.36954 0.469917 4.84006Z"
            />

            {/* End Right side */}
          </g>
        </svg>
      </>
    );
  }
}

export default KeymapDEFY;
