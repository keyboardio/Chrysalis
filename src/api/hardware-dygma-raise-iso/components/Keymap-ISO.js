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

const no_key_led_map = [...Array.apply(0, Array(63)).map((_, i) => i + UNDERGLOW)];

const keysRowsPosition = {
  row1: 35,
  row2: 102,
  row3: 169,
  row4: 236,
  row5: 303,
  row6: 370
};

class KeymapISO extends React.Component {
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
      let ledIndex = col !== undefined ? led_map[parseInt(row)][parseInt(col)] : no_key_led_map[row - UNDERGLOW],
        colorIndex = colormap[ledIndex],
        color = palette[colorIndex].rgb;
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
        <span>
          <span
            className={props.class}
            textAnchor="middle"
            key={props.index}
            x={props.x}
            y={props.y}
            dy={props.dy}
            textLength={props.textLength}
          >
            {props.word}
          </span>
        </span>
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
          ? getLabel(row, col).extraLabel && getDivideKeys(getLabel(row, col).extraLabel, xCord, yCord, smallKey)
          : getLabel(row, col).extraLabel && getDivideKeys(getLabel(row, col).extraLabel, xCord, String(+yCord - 5), smallKey)
        : getLabel(row, col).extraLabel === getLabel(row, col).extraLabel.toLowerCase().endsWith("to")
        ? getLabel(row, col).extraLabel && getDivideKeys(getLabel(row, col).extraLabel, xCord, yCord, smallKey)
        : getLabel(row, col).extraLabel;

    const getCenterPrimary = (row, col, xCord, yCord, smallKey = false) =>
      getLabel(row, col).extraLabel !== ""
        ? topsArr.includes(getLabel(row, col).extraLabel)
          ? getLabel(row, col).label && getDivideKeys(getLabel(row, col).label, xCord, yCord, smallKey)
          : topsArrTransfer.includes(getLabel(row, col).extraLabel)
          ? getLabel(row, col).label && getDivideKeys(getLabel(row, col).label, String(+xCord + 10), yCord, smallKey)
          : getLabel(row, col).label && getDivideKeys(getLabel(row, col).label, xCord, String(yCord + 2), smallKey)
        : topsArrTransfer.includes(getLabel(row, col).extraLabel)
        ? getLabel(row, col).label &&
          getDivideKeys(getLabel(row, col).label, xCord, yCord, smallKey) &&
          getDivideKeys(getLabel(row, col).label, String(+xCord + 10), yCord, smallKey)
        : getLabel(row, col).label && getDivideKeys(getLabel(row, col).label, xCord, String(yCord + 2), smallKey);

    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fillRule="evenodd"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit="1.5"
        clipRule="evenodd"
        viewBox={this.props.showUnderglow ? "0 0 1222 705" : "0 0 1222 430"}
        className={this.props.className || "layer"}
        height={this.props.showUnderglow ? 705 : 430}
        width={1222}
      >
        <Neuron
          visibility={this.props.showUnderglow ? true : false}
          color="#b4b4b4"
          id="neuron_led"
          onClick={e => {
            setUndeglowIndex(131, e);
          }}
          className="key"
          fill={getColor(131)}
          stroke={stroke(131)}
          strokeWidth={getStrokeWidth(131)}
          dataLedIndex={getLEDIndex(131)}
          dataKeyIndex={keyIndex(131)}
          dataLayer={layer}
        />
        <g id="keyshapes">
          <Key
            keyType="regularKey"
            id="R0C0_keyshape"
            onClick={onClick}
            className="key"
            width={57}
            height={57}
            x={84}
            y={keysRowsPosition.row1}
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
            x={151}
            y={keysRowsPosition.row1}
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
            x={218}
            y={keysRowsPosition.row1}
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
            x={285}
            y={keysRowsPosition.row1}
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
            x={352}
            y={keysRowsPosition.row1}
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
            x={419}
            y={keysRowsPosition.row1}
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
            x={486}
            y={keysRowsPosition.row1}
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
            x={624}
            y={keysRowsPosition.row1}
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
            x={691}
            y={keysRowsPosition.row1}
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
            x={758}
            y={keysRowsPosition.row1}
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
            x={825}
            y={keysRowsPosition.row1}
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
            x={892}
            y={keysRowsPosition.row1}
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
            x={959}
            y={keysRowsPosition.row1}
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
            width={112}
            height={57}
            x={1026}
            y={keysRowsPosition.row1}
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
            width={94}
            height={57}
            x={84}
            y={keysRowsPosition.row2}
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
            x={188}
            y={keysRowsPosition.row2}
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
            x={255}
            y={keysRowsPosition.row2}
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
            x={322}
            y={keysRowsPosition.row2}
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
            x={389}
            y={keysRowsPosition.row2}
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
            x={456}
            y={keysRowsPosition.row2}
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
            id="R1C8_keyshape"
            onClick={onClick}
            className="key"
            width={57}
            height={57}
            x={600}
            y={keysRowsPosition.row2}
            fill={getColor(1, 8)}
            stroke={stroke(1, 8)}
            strokeWidth={getStrokeWidth(1, 8)}
            dataLedIndex={getLEDIndex(1, 8)}
            dataKeyIndex={keyIndex(1, 8)}
            dataLayer={layer}
            contrastText={getContrastText(getColor(1, 8))}
            centerPrimary={getCenterPrimary(1, 8, 0, 0, true)}
            centerExtra={getCenterExtra(1, 8, 0, 0, true)}
          />
          <Key
            keyType="regularKey"
            id="R1C9_keyshape"
            onClick={onClick}
            className="key"
            width={57}
            height={57}
            x={667}
            y={keysRowsPosition.row2}
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
            x={734}
            y={keysRowsPosition.row2}
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
            x={801}
            y={keysRowsPosition.row2}
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
            x={868}
            y={keysRowsPosition.row2}
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
            x={935}
            y={keysRowsPosition.row2}
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
            x={1002}
            y={keysRowsPosition.row2}
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
            x={1023}
            y={keysRowsPosition.row3}
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
            id="R2C0_keyshape"
            onClick={onClick}
            className="key"
            width={112}
            height={57}
            x={84}
            y={keysRowsPosition.row3}
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
            x={206}
            y={keysRowsPosition.row3}
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
            x={273}
            y={keysRowsPosition.row3}
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
            x={340}
            y={keysRowsPosition.row3}
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
            x={407}
            y={keysRowsPosition.row3}
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
            x={474}
            y={keysRowsPosition.row3}
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
            id="R2C9_keyshape"
            onClick={onClick}
            className="key"
            width={57}
            height={57}
            x={621}
            y={keysRowsPosition.row3}
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
            x={688}
            y={keysRowsPosition.row3}
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
            x={755}
            y={keysRowsPosition.row3}
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
            x={822}
            y={keysRowsPosition.row3}
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
            x={889}
            y={keysRowsPosition.row3}
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
            x={956}
            y={keysRowsPosition.row3}
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
            keyType="enterKey"
            id="R2C15_keyshape"
            onClick={onClick}
            className="key"
            width={69}
            height={124}
            x={1069}
            y={keysRowsPosition.row2}
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
            id="R3C0_keyshape"
            onClick={onClick}
            className="key"
            width={67}
            height={57}
            x={84}
            y={keysRowsPosition.row4}
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
            x={162}
            y={keysRowsPosition.row4}
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
            x={229}
            y={keysRowsPosition.row4}
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
            x={296}
            y={keysRowsPosition.row4}
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
            x={363}
            y={keysRowsPosition.row4}
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
            x={430}
            y={keysRowsPosition.row4}
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
            id="R3C6_keyshape"
            onClick={onClick}
            className="key"
            width={57}
            height={57}
            x={497}
            y={keysRowsPosition.row4}
            fill={getColor(3, 6)}
            stroke={stroke(3, 6)}
            strokeWidth={getStrokeWidth(3, 6)}
            dataLedIndex={getLEDIndex(3, 6)}
            dataKeyIndex={keyIndex(3, 6)}
            dataLayer={layer}
            contrastText={getContrastText(getColor(3, 6))}
            centerPrimary={getCenterPrimary(3, 6, 0, 0, true)}
            centerExtra={getCenterExtra(3, 6, 0, 0, true)}
          />
          <Key
            keyType="regularKey"
            id="R3C10_keyshape"
            onClick={onClick}
            className="key"
            width={57}
            height={57}
            x={652}
            y={keysRowsPosition.row4}
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
            x={719}
            y={keysRowsPosition.row4}
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
            x={786}
            y={keysRowsPosition.row4}
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
            x={853}
            y={keysRowsPosition.row4}
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
            x={920}
            y={keysRowsPosition.row4}
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
            width={151}
            height={57}
            x={987}
            y={keysRowsPosition.row4}
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
          <Key
            keyType="regularKey"
            id="R4C0_keyshape"
            onClick={onClick}
            className="key"
            width={67}
            height={57}
            x={84}
            y={keysRowsPosition.row5}
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
            keyType="regularKey"
            id="R4C1_keyshape"
            onClick={onClick}
            className="key"
            width={67}
            height={57}
            x={162}
            y={keysRowsPosition.row5}
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
            keyType="regularKey"
            id="R4C2_keyshape"
            onClick={onClick}
            className="key"
            width={67}
            height={57}
            x={239}
            y={keysRowsPosition.row5}
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
            keyType="regularKey"
            id="R4C3_keyshape"
            onClick={onClick}
            className="key"
            width={115}
            height={57}
            x={316}
            y={keysRowsPosition.row5}
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
            keyType="regularKey"
            id="R4C4_keyshape"
            onClick={onClick}
            className="key"
            width={81}
            height={57}
            x={441}
            y={keysRowsPosition.row5}
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
            keyType="regularKey"
            id="R4C10_keyshape"
            onClick={onClick}
            className="key"
            width={66}
            height={57}
            x={645}
            y={keysRowsPosition.row5}
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
            keyType="regularKey"
            id="R4C11_keyshape"
            onClick={onClick}
            className="key"
            width={115}
            height={57}
            x={719}
            y={keysRowsPosition.row5}
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
          <Key
            keyType="regularKey"
            id="R4C12_keyshape"
            onClick={onClick}
            className="key"
            width={66}
            height={57}
            x={844}
            y={keysRowsPosition.row5}
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
            keyType="regularKey"
            id="R4C13_keyshape"
            onClick={onClick}
            className="key"
            width={66}
            height={57}
            x={920}
            y={keysRowsPosition.row5}
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
            keyType="regularKey"
            id="R4C14_keyshape"
            onClick={onClick}
            className="key"
            width={66}
            height={57}
            x={996}
            y={keysRowsPosition.row5}
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
            keyType="regularKey"
            id="R4C15_keyshape"
            onClick={onClick}
            className="key"
            width={66}
            height={57}
            x={1072}
            y={keysRowsPosition.row5}
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
            keyType="t5"
            id="R4C6_keyshape"
            onClick={onClick}
            className="key"
            width={123}
            height={57}
            x={334}
            y={keysRowsPosition.row6}
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
            keyType="regularKey"
            id="R4C7_keyshape"
            onClick={onClick}
            className="key"
            width={57}
            height={57}
            x={464}
            y={keysRowsPosition.row6}
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
            keyType="regularKey"
            id="R4C8_keyshape"
            onClick={onClick}
            className="key"
            width={57}
            height={57}
            x={644}
            y={keysRowsPosition.row6}
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
            keyType="t8"
            id="R4C9_keyshape"
            onClick={onClick}
            className="key"
            width={113}
            height={57}
            x={710}
            y={keysRowsPosition.row6}
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
        </g>
        <g id="Areas">
          {/* Left side */}
          <UnderGlowStrip
            id="71_undeglow"
            x={54}
            y={14}
            onClick={e => {
              setUndeglowIndex(71, e);
            }}
            visibility={this.props.showUnderglow ? true : false}
            fill={getColor(71)}
            stroke={stroke(71)}
            strokeWidth={getStrokeWidth(71)}
            dataLedIndex={getLEDIndex(71)}
            dataKeyIndex={keyIndex(71)}
            dataLayer={layer}
            path="M3 33C4.7 33 6 31.7 6 30V17C6 10.9 10.9 6 17 6H82.7C84.4 6 85.7 4.7 85.7 3C85.7 1.3 84.4 0 82.7 0H17C7.6 0 0 7.6 0 17V30C0 31.6 1.4 33 3 33Z"
          />
          <UnderGlowStrip
            id="72_undeglow"
            x={144}
            y={14}
            onClick={e => {
              setUndeglowIndex(72, e);
            }}
            visibility={this.props.showUnderglow ? true : false}
            fill={getColor(72)}
            stroke={stroke(72)}
            strokeWidth={getStrokeWidth(72)}
            dataLedIndex={getLEDIndex(72)}
            dataKeyIndex={keyIndex(72)}
            dataLayer={layer}
            path="M3.26816 6H74.7318C76.5838 6 78 4.7 78 3C78 1.3 76.5838 0 74.7318 0H3.26816C1.4162 0 -1.48937e-06 1.3 -1.48937e-06 3C-1.48937e-06 4.7 1.4162 6 3.26816 6Z"
          />
          <UnderGlowStrip
            id="73_undeglow"
            x={226}
            y={14}
            onClick={e => {
              setUndeglowIndex(73, e);
            }}
            visibility={this.props.showUnderglow ? true : false}
            fill={getColor(73)}
            stroke={stroke(73)}
            strokeWidth={getStrokeWidth(73)}
            dataLedIndex={getLEDIndex(73)}
            dataKeyIndex={keyIndex(73)}
            dataLayer={layer}
            path="M3.15921 6H74.7318C76.5838 6 78 4.7 78 3C78 1.3 76.5838 0 74.7318 0H3.26816C1.4162 0 -5.93249e-07 1.3 -5.93249e-07 3C-5.93249e-07 4.7 1.41619 6 3.15921 6Z"
          />
          <UnderGlowStrip
            id="74_undeglow"
            x={308}
            y={14}
            onClick={e => {
              setUndeglowIndex(74, e);
            }}
            visibility={this.props.showUnderglow ? true : false}
            fill={getColor(74)}
            stroke={stroke(74)}
            strokeWidth={getStrokeWidth(74)}
            dataLedIndex={getLEDIndex(74)}
            dataKeyIndex={keyIndex(74)}
            dataLayer={layer}
            path="M3.26816 6H74.7318C76.5838 6 78 4.7 78 3C78 1.3 76.5838 0 74.7318 0H3.26816C1.4162 0 -5.93249e-07 1.3 -5.93249e-07 3C-5.93249e-07 4.7 1.4162 6 3.26816 6Z"
          />
          <UnderGlowStrip
            id="75_undeglow"
            x={390}
            y={14}
            onClick={e => {
              setUndeglowIndex(75, e);
            }}
            visibility={this.props.showUnderglow ? true : false}
            fill={getColor(75)}
            stroke={stroke(75)}
            strokeWidth={getStrokeWidth(75)}
            dataLedIndex={getLEDIndex(75)}
            dataKeyIndex={keyIndex(75)}
            dataLayer={layer}
            path="M3.05882 6H74.9412C76.6745 6 78 4.7 78 3C78 1.3 76.6745 0 74.9412 0H3.05882C1.32549 0 -4.47035e-06 1.3 -4.47035e-06 3C-4.47035e-06 4.7 1.42745 6 3.05882 6Z"
          />
          <UnderGlowStrip
            id="76_undeglow"
            x={472}
            y={14}
            onClick={e => {
              setUndeglowIndex(76, e);
            }}
            visibility={this.props.showUnderglow ? true : false}
            fill={getColor(76)}
            stroke={stroke(76)}
            strokeWidth={getStrokeWidth(76)}
            dataLedIndex={getLEDIndex(76)}
            dataKeyIndex={keyIndex(76)}
            dataLayer={layer}
            path="M3.63919 6H84.3608C86.423 6 88 4.7 88 3C88 1.3 86.423 0 84.3608 0H3.63919C1.57698 0 0 1.3 0 3C0 4.7 1.69829 6 3.63919 6Z"
          />
          <UnderGlowStrip
            id="77_undeglow"
            x={565}
            y={14}
            onClick={e => {
              setUndeglowIndex(77, e);
            }}
            visibility={this.props.showUnderglow ? true : false}
            fill={getColor(77)}
            stroke={stroke(77)}
            strokeWidth={getStrokeWidth(77)}
            dataLedIndex={getLEDIndex(77)}
            dataKeyIndex={keyIndex(77)}
            dataLayer={layer}
            path="M3 72C4.7 72 6 70.6817 6 68.9577V3.04225C6 1.31831 4.7 0 3 0C1.3 0 0 1.31831 0 3.04225V69.0592C0 70.6817 1.3 72 3 72Z"
          />
          <UnderGlowStrip
            id="78_undeglow"
            x={545}
            y={90}
            onClick={e => {
              setUndeglowIndex(78, e);
            }}
            visibility={this.props.showUnderglow ? true : false}
            fill={getColor(78)}
            stroke={stroke(78)}
            strokeWidth={getStrokeWidth(78)}
            dataLedIndex={getLEDIndex(78)}
            dataKeyIndex={keyIndex(78)}
            dataLayer={layer}
            path="M3.90002 44.1469C2.20002 44.1469 0.900024 42.8469 0.900024 41.1469V12C0.900024 9.8 2.70002 8 4.90002 8H20V3C20 1.3 21.3 0 23 0C24.7 0 26 1.3 26 3V10C26 12.2 24.2 14 22 14H6.90002V41.0469C6.90002 42.7469 5.60002 44.1469 3.90002 44.1469Z"
          />
          <UnderGlowStrip
            id="79_undeglow"
            x={546}
            y={137}
            onClick={e => {
              setUndeglowIndex(79, e);
            }}
            visibility={this.props.showUnderglow ? true : false}
            fill={getColor(79)}
            stroke={stroke(79)}
            strokeWidth={getStrokeWidth(79)}
            dataLedIndex={getLEDIndex(79)}
            dataKeyIndex={keyIndex(79)}
            dataLayer={layer}
            path="M24 100H17C14.8 100 13 98.2 13 96V29H4C1.8 29 0 27.2 0 25V3.00001C0 1.30001 1.3 0 3 0C4.7 0 6 1.30001 6 3.00001V23H15C17.2 23 19 24.8 19 27V94H24C25.7 94 27 95.3 27 97C27 98.7 25.6 100 24 100Z"
          />
          <UnderGlowStrip
            id="80_undeglow"
            x={576}
            y={231}
            onClick={e => {
              setUndeglowIndex(80, e);
            }}
            visibility={this.props.showUnderglow ? true : false}
            fill={getColor(80)}
            stroke={stroke(80)}
            strokeWidth={getStrokeWidth(80)}
            dataLedIndex={getLEDIndex(80)}
            dataKeyIndex={keyIndex(80)}
            dataLayer={layer}
            path="M11 54C9.3 54 8 52.7 8 51V6H3C1.3 6 0 4.7 0 3C0 1.3 1.3 0 3 0H10C12.2 0 14 1.8 14 4V51C14 52.7 12.7 54 11 54Z"
          />
          <UnderGlowStrip
            id="81_undeglow"
            x={570}
            y={289}
            onClick={e => {
              setUndeglowIndex(81, e);
            }}
            visibility={this.props.showUnderglow ? true : false}
            fill={getColor(81)}
            stroke={stroke(81)}
            strokeWidth={getStrokeWidth(81)}
            dataLedIndex={getLEDIndex(81)}
            dataKeyIndex={keyIndex(81)}
            dataLayer={layer}
            path="M3 57C1.3 57 0 55.7 0 54V17C0 14.8 1.8 13 4 13H14V3C14 1.3 15.3 0 17 0C18.7 0 20 1.3 20 3V15C20 17.2 18.2 19 16 19H6V54C6 55.6 4.6 57 3 57Z"
          />
          <UnderGlowStrip
            id="82_undeglow"
            x={570}
            y={350}
            onClick={e => {
              setUndeglowIndex(82, e);
            }}
            visibility={this.props.showUnderglow ? true : false}
            fill={getColor(82)}
            stroke={stroke(82)}
            strokeWidth={getStrokeWidth(82)}
            dataLedIndex={getLEDIndex(82)}
            dataKeyIndex={keyIndex(82)}
            dataLayer={layer}
            path="M3 64C4.7 64 6 62.6271 6 60.8317V3.16832C6 1.37294 4.7 0 3 0C1.3 0 0 1.37294 0 3.16832V60.9373C0 62.6271 1.4 64 3 64Z"
          />
          <UnderGlowStrip
            id="83_undeglow"
            x={506}
            y={418}
            onClick={e => {
              setUndeglowIndex(83, e);
            }}
            visibility={this.props.showUnderglow ? true : false}
            fill={getColor(83)}
            stroke={stroke(83)}
            strokeWidth={getStrokeWidth(83)}
            dataLedIndex={getLEDIndex(83)}
            dataKeyIndex={keyIndex(83)}
            dataLayer={layer}
            path="M3 30.2H70V3C70 1.3 68.7 0 67 0C65.3 0 64 1.3 64 3V24.2H3C1.3 24.2 0 25.5 0 27.2C0 28.9 1.3 30.2 3 30.2Z"
          />
          <UnderGlowStrip
            id="84_undeglow"
            x={456}
            y={442}
            onClick={e => {
              setUndeglowIndex(84, e);
            }}
            visibility={this.props.showUnderglow ? true : false}
            fill={getColor(84)}
            stroke={stroke(84)}
            strokeWidth={getStrokeWidth(84)}
            dataLedIndex={getLEDIndex(84)}
            dataKeyIndex={keyIndex(84)}
            dataLayer={layer}
            path="M17.3 12.9999L6.0062 60.528C5.61846 62.1598 3.9664 63.155 2.34265 62.7351C0.763683 62.3268 -0.198242 60.73 0.178802 59.1433L11.5 11.4999C13.2 4.79994 19.1 0.199951 26 0.199951H43C44.7 0.199951 46 1.49995 46 3.19995C46 4.89995 44.7 6.19995 43 6.19995H26C21.9 6.19995 18.3 8.99994 17.3 12.9999Z"
          />
          <UnderGlowStrip
            id="85_undeglow"
            x={438}
            y={509}
            onClick={e => {
              setUndeglowIndex(85, e);
            }}
            visibility={this.props.showUnderglow ? true : false}
            fill={getColor(85)}
            stroke={stroke(85)}
            strokeWidth={getStrokeWidth(85)}
            dataLedIndex={getLEDIndex(85)}
            dataKeyIndex={keyIndex(85)}
            dataLayer={layer}
            path="M2.98818 67.9882C4.28818 67.9882 5.58819 67.0882 5.88819 65.6882L21.5882 3.68821C21.9882 2.08821 20.9882 0.488203 19.3882 0.0882035C17.7882 -0.311797 16.1882 0.688185 15.7882 2.28819L0.0881882 64.2882C-0.311811 65.8882 0.688185 67.4882 2.28819 67.8882C2.48819 67.9882 2.68818 67.9882 2.98818 67.9882Z"
          />
          <UnderGlowStrip
            id="86_undeglow"
            x={419}
            y={581}
            onClick={e => {
              setUndeglowIndex(86, e);
            }}
            visibility={this.props.showUnderglow ? true : false}
            fill={getColor(86)}
            stroke={stroke(86)}
            strokeWidth={getStrokeWidth(86)}
            dataLedIndex={getLEDIndex(86)}
            dataKeyIndex={keyIndex(86)}
            dataLayer={layer}
            path="M3.2 69.2C4.5 69.2 5.80001 68.3 6.10001 66.9L21.8 3.9C22.2 2.3 21.2 0.699995 19.6 0.299995C18 -0.100005 16.4 0.899977 16 2.49998L0.300011 65.5C-0.0999889 67.1 0.900007 68.7 2.50001 69.1C2.70001 69.2 2.90001 69.2 3.2 69.2Z"
          />

          <UnderGlowStrip
            id="87_undeglow"
            x={381}
            y={654}
            onClick={e => {
              setUndeglowIndex(87, e);
            }}
            visibility={this.props.showUnderglow ? true : false}
            fill={getColor(87)}
            stroke={stroke(87)}
            strokeWidth={getStrokeWidth(87)}
            dataLedIndex={getLEDIndex(87)}
            dataKeyIndex={keyIndex(87)}
            dataLayer={layer}
            path="M3.1 40.0999H18.4C26.2 40.0999 32.9 34.7999 34.9 27.2999L40.9 3.69996C41.3 2.09996 40.3 0.49992 38.7 0.0999204C37.1 -0.30008 35.5 0.699932 35.1 2.29993L29.1 25.9C27.9 30.8 23.5 34.2 18.4 34.2H3.1C1.4 34.2 0.0999985 35.5 0.0999985 37.2C0.0999985 38.9 1.5 40.0999 3.1 40.0999Z"
          />
          <UnderGlowStrip
            id="88_undeglow"
            x={295}
            y={688}
            onClick={e => {
              setUndeglowIndex(88, e);
            }}
            visibility={this.props.showUnderglow ? true : false}
            fill={getColor(88)}
            stroke={stroke(88)}
            strokeWidth={getStrokeWidth(88)}
            dataLedIndex={getLEDIndex(88)}
            dataKeyIndex={keyIndex(88)}
            dataLayer={layer}
            path="M3.49929 6.09998H78.5007C80.4836 6.09998 82 4.79998 82 3.09998C82 1.39998 80.4836 0.0999756 78.5007 0.0999756H3.49929C1.51636 0.0999756 2.24619e-06 1.39998 2.24619e-06 3.09998C2.24619e-06 4.79998 1.633 6.09998 3.49929 6.09998Z"
          />
          <UnderGlowStrip
            id="89_undeglow"
            x={209}
            y={688}
            onClick={e => {
              setUndeglowIndex(89, e);
            }}
            visibility={this.props.showUnderglow ? true : false}
            fill={getColor(89)}
            stroke={stroke(89)}
            strokeWidth={getStrokeWidth(89)}
            dataLedIndex={getLEDIndex(89)}
            dataKeyIndex={keyIndex(89)}
            dataLayer={layer}
            path="M3.21568 6.09998H78.7843C80.6065 6.09998 82 4.79998 82 3.09998C82 1.39998 80.6065 0.0999756 78.7843 0.0999756H3.21568C1.39346 0.0999756 -4.23193e-06 1.39998 -4.23193e-06 3.09998C-4.23193e-06 4.79998 1.39346 6.09998 3.21568 6.09998Z"
          />

          <UnderGlowStrip
            id="90_undeglow"
            x={123}
            y={688}
            onClick={e => {
              setUndeglowIndex(90, e);
            }}
            visibility={this.props.showUnderglow ? true : false}
            fill={getColor(90)}
            stroke={stroke(90)}
            strokeWidth={getStrokeWidth(90)}
            dataLedIndex={getLEDIndex(90)}
            dataKeyIndex={keyIndex(90)}
            dataLayer={layer}
            path="M3.34235 6.09998H78.6576C80.5516 6.09998 82 4.79998 82 3.09998C82 1.39998 80.5516 0.0999756 78.6576 0.0999756H3.34235C1.44833 0.0999756 -4.05312e-06 1.39998 -4.05312e-06 3.09998C-4.05312e-06 4.79998 1.55974 6.09998 3.34235 6.09998Z"
          />
          <UnderGlowStrip
            id="91_undeglow"
            x={32}
            y={687}
            onClick={e => {
              setUndeglowIndex(91, e);
            }}
            visibility={this.props.showUnderglow ? true : false}
            fill={getColor(91)}
            stroke={stroke(91)}
            strokeWidth={getStrokeWidth(91)}
            dataLedIndex={getLEDIndex(91)}
            dataKeyIndex={keyIndex(91)}
            dataLayer={layer}
            path="M7.90002 7.10002H83C84.7 7.10002 86 5.80002 86 4.10002C86 2.40002 84.7 1.10002 83 1.10002H7.90002C6.70002 1.10002 5.49999 0.900048 4.29999 0.500048C2.69999 4.825e-05 1 0.800073 0.5 2.40007C0 4.00007 0.800024 5.70006 2.40002 6.20006C4.10002 6.80006 6.00002 7.10002 7.90002 7.10002Z"
          />
          <UnderGlowStrip
            id="92_undeglow"
            x={19}
            y={618}
            onClick={e => {
              setUndeglowIndex(92, e);
            }}
            visibility={this.props.showUnderglow ? true : false}
            fill={getColor(92)}
            stroke={stroke(92)}
            strokeWidth={getStrokeWidth(92)}
            dataLedIndex={getLEDIndex(92)}
            dataKeyIndex={keyIndex(92)}
            dataLayer={layer}
            path="M7.59999 68.7001C8.09999 68.7001 8.60001 68.6 9.00001 68.3C10.5 67.5 11 65.7001 10.2 64.2001C9.40002 62.7001 8.90003 61.1001 8.90003 59.4001L6.8 3.20007C6.7 1.50007 5.40002 0.300049 3.70002 0.300049C2.00002 0.400049 0.799998 1.80009 0.799998 3.40009L2.90003 59.6C3.00003 62.2 3.70003 64.8 4.90003 67.1C5.50003 68.2 6.49999 68.7001 7.59999 68.7001Z"
          />
          <UnderGlowStrip
            id="93_undeglow"
            x={18}
            y={553}
            onClick={e => {
              setUndeglowIndex(93, e);
            }}
            visibility={this.props.showUnderglow ? true : false}
            fill={getColor(93)}
            stroke={stroke(93)}
            strokeWidth={getStrokeWidth(93)}
            dataLedIndex={getLEDIndex(93)}
            dataKeyIndex={keyIndex(93)}
            dataLayer={layer}
            path="M4.40002 60.4H4.5C6.2 60.3 7.40002 58.9 7.40002 57.3L6 2.89999C5.9 1.19999 4.60002 0 2.90002 0C1.20002 0.1 0 1.50001 0 3.10001L1.40002 57.5C1.50002 59.1 2.80002 60.4 4.40002 60.4Z"
          />
          <UnderGlowStrip
            id="94_undeglow"
            x={16}
            y={481}
            onClick={e => {
              setUndeglowIndex(94, e);
            }}
            visibility={this.props.showUnderglow ? true : false}
            fill={getColor(94)}
            stroke={stroke(94)}
            strokeWidth={getStrokeWidth(94)}
            dataLedIndex={getLEDIndex(94)}
            dataKeyIndex={keyIndex(94)}
            dataLayer={layer}
            path="M4.59998 67H4.70001C6.40001 66.9 7.59998 65.5 7.59998 63.9L6 2.99997C5.9 1.29997 4.60002 0.0999756 2.90002 0.0999756C1.20002 0.199976 0 1.59998 0 3.19998L1.59998 64.1C1.59998 65.7 2.99998 67 4.59998 67Z"
          />
          <UnderGlowStrip
            id="95_undeglow"
            x={14}
            y={409}
            onClick={e => {
              setUndeglowIndex(95, e);
            }}
            visibility={this.props.showUnderglow ? true : false}
            fill={getColor(95)}
            stroke={stroke(95)}
            strokeWidth={getStrokeWidth(95)}
            dataLedIndex={getLEDIndex(95)}
            dataKeyIndex={keyIndex(95)}
            dataLayer={layer}
            path="M4.59998 66.9H4.70001C6.40001 66.8 7.59998 65.4 7.59998 63.8L6 2.89999C5.9 1.19999 4.60002 0 2.90002 0C1.20002 0.1 0 1.50001 0 3.10001L1.59998 64C1.59998 65.6 2.99998 66.9 4.59998 66.9Z"
          />

          <UnderGlowStrip
            id="96_undeglow"
            x={11}
            y={336}
            onClick={e => {
              setUndeglowIndex(96, e);
            }}
            visibility={this.props.showUnderglow ? true : false}
            fill={getColor(96)}
            stroke={stroke(96)}
            strokeWidth={getStrokeWidth(96)}
            dataLedIndex={getLEDIndex(96)}
            dataKeyIndex={keyIndex(96)}
            dataLayer={layer}
            path="M5.90747 68H6.00744C7.70744 67.9 8.90747 66.5 8.90747 64.9L6.60748 3.10001C6.50748 1.40001 5.10744 0.100012 3.50744 0.200012C1.80744 0.300012 0.60748 1.70002 0.60748 3.30002L2.90747 65.1C2.90747 66.8 4.30747 68 5.90747 68Z"
          />
          <UnderGlowStrip
            id="97_undeglow"
            x={11}
            y={219}
            onClick={e => {
              setUndeglowIndex(97, e);
            }}
            visibility={this.props.showUnderglow ? true : false}
            fill={getColor(97)}
            stroke={stroke(97)}
            strokeWidth={getStrokeWidth(97)}
            dataLedIndex={getLEDIndex(97)}
            dataKeyIndex={keyIndex(97)}
            dataLayer={layer}
            path="M3.39996 112H3.5C5.2 111.9 6.39996 110.5 6.39996 108.9L6.20001 104.5C5.90001 96.1 8.39998 87.7 13.1 80.8L41 40.6C46.3 33 49 24.1 49 14.9V3C49 1.3 47.7 0 46 0C44.3 0 43 1.3 43 3V15C43 23 40.6 30.7 36 37.2L8.09998 77.4C2.59998 85.3 -0.300024 95 0.0999756 104.7L0.299988 109.1C0.399988 110.7 1.79996 112 3.39996 112Z"
          />
          <UnderGlowStrip
            id="98_undeglow"
            x={54}
            y={163}
            onClick={e => {
              setUndeglowIndex(98, e);
            }}
            visibility={this.props.showUnderglow ? true : false}
            fill={getColor(98)}
            stroke={stroke(98)}
            strokeWidth={getStrokeWidth(98)}
            dataLedIndex={getLEDIndex(98)}
            dataKeyIndex={keyIndex(98)}
            dataLayer={layer}
            path="M3 52C4.7 52 6 50.6693 6 48.9291V3.07087C6 1.33071 4.7 0 3 0C1.3 0 0 1.33071 0 3.07087V48.9291C0 50.6693 1.4 52 3 52Z"
          />
          <UnderGlowStrip
            id="69_undeglow"
            x={54}
            y={107}
            onClick={e => {
              setUndeglowIndex(69, e);
            }}
            visibility={this.props.showUnderglow ? true : false}
            fill={getColor(69)}
            stroke={stroke(69)}
            strokeWidth={getStrokeWidth(69)}
            dataLedIndex={getLEDIndex(69)}
            dataKeyIndex={keyIndex(69)}
            dataLayer={layer}
            path="M3 52C4.7 52 6 50.5556 6 48.6667V3.33333C6 1.44444 4.7 0 3 0C1.3 0 0 1.44444 0 3.33333V48.6667C0 50.5556 1.4 52 3 52Z"
          />
          <UnderGlowStrip
            id="70_undeglow"
            x={54}
            y={51}
            onClick={e => {
              setUndeglowIndex(70, e);
            }}
            visibility={this.props.showUnderglow ? true : false}
            fill={getColor(70)}
            stroke={stroke(70)}
            strokeWidth={getStrokeWidth(70)}
            dataLedIndex={getLEDIndex(70)}
            dataKeyIndex={keyIndex(70)}
            dataLayer={layer}
            path="M3 52C4.7 52 6 50.5556 6 48.6667V3.33333C6 1.44444 4.7 0 3 0C1.3 0 0 1.44444 0 3.33333V48.6667C0 50.4444 1.4 52 3 52Z"
          />
          {/* End Left side */}
          {/* Right side */}
          <UnderGlowStrip
            id="107_undeglow"
            x={601}
            y={14}
            onClick={e => {
              setUndeglowIndex(107, e);
            }}
            visibility={this.props.showUnderglow ? true : false}
            fill={getColor(107)}
            stroke={stroke(107)}
            strokeWidth={getStrokeWidth(107)}
            dataLedIndex={getLEDIndex(107)}
            dataKeyIndex={keyIndex(107)}
            dataLayer={layer}
            path="M71.9673 6H3.03266C1.31415 6 0 4.7 0 3C0 1.3 1.31415 0 3.03266 0H71.9673C73.6858 0 75 1.3 75 3C75 4.7 73.5848 6 71.9673 6Z"
          />
          <UnderGlowStrip
            id="106_undeglow"
            x={680}
            y={14}
            onClick={e => {
              setUndeglowIndex(106, e);
            }}
            visibility={this.props.showUnderglow ? true : false}
            fill={getColor(106)}
            stroke={stroke(106)}
            strokeWidth={getStrokeWidth(106)}
            dataLedIndex={getLEDIndex(106)}
            dataKeyIndex={keyIndex(106)}
            dataLayer={layer}
            path="M70.8908 6H3.10924C1.34734 6 0 4.7 0 3C0 1.3 1.34734 0 3.10924 0H70.8908C72.6527 0 74 1.3 74 3C74 4.7 72.6527 6 70.8908 6Z"
          />
          <UnderGlowStrip
            id="105_undeglow"
            x={758}
            y={14}
            onClick={e => {
              setUndeglowIndex(105, e);
            }}
            visibility={this.props.showUnderglow ? true : false}
            fill={getColor(105)}
            stroke={stroke(105)}
            strokeWidth={getStrokeWidth(105)}
            dataLedIndex={getLEDIndex(105)}
            dataKeyIndex={keyIndex(105)}
            dataLayer={layer}
            path="M82.6275 6H3.37255C1.46144 6 0 4.7 0 3C0 1.3 1.46144 0 3.37255 0H82.6275C84.5386 0 86 1.3 86 3C86 4.7 84.4261 6 82.6275 6Z"
          />
          <UnderGlowStrip
            id="104_undeglow"
            x={848}
            y={14}
            onClick={e => {
              setUndeglowIndex(104, e);
            }}
            visibility={this.props.showUnderglow ? true : false}
            fill={getColor(104)}
            stroke={stroke(104)}
            strokeWidth={getStrokeWidth(104)}
            dataLedIndex={getLEDIndex(104)}
            dataKeyIndex={keyIndex(104)}
            dataLayer={layer}
            path="M68.9832 6H3.01676C1.30726 6 0 4.7 0 3C0 1.3 1.30726 0 3.01676 0H68.9832C70.6927 0 72 1.3 72 3C72 4.7 70.6927 6 68.9832 6Z"
          />
          <UnderGlowStrip
            id="103_undeglow"
            x={924}
            y={14}
            onClick={e => {
              setUndeglowIndex(103, e);
            }}
            visibility={this.props.showUnderglow ? true : false}
            fill={getColor(103)}
            stroke={stroke(103)}
            strokeWidth={getStrokeWidth(103)}
            dataLedIndex={getLEDIndex(103)}
            dataKeyIndex={keyIndex(103)}
            dataLayer={layer}
            path="M71.0028 6H3.10056C1.34358 6 0 4.7 0 3C0 1.3 1.34358 0 3.10056 0H70.8994C72.6564 0 74 1.3 74 3C74 4.7 72.6564 6 71.0028 6Z"
          />
          <UnderGlowStrip
            id="102_undeglow"
            x={1002}
            y={14}
            onClick={e => {
              setUndeglowIndex(102, e);
            }}
            visibility={this.props.showUnderglow ? true : false}
            fill={getColor(102)}
            stroke={stroke(102)}
            strokeWidth={getStrokeWidth(102)}
            dataLedIndex={getLEDIndex(102)}
            dataKeyIndex={keyIndex(102)}
            dataLayer={layer}
            path="M70.8994 6H3.10056C1.34358 6 0 4.7 0 3C0 1.3 1.34358 0 3.10056 0H70.8994C72.6564 0 74 1.3 74 3C74 4.7 72.6564 6 70.8994 6Z"
          />
          <UnderGlowStrip
            id="101_undeglow"
            x={1080}
            y={14}
            onClick={e => {
              setUndeglowIndex(101, e);
            }}
            visibility={this.props.showUnderglow ? true : false}
            fill={getColor(101)}
            stroke={stroke(101)}
            strokeWidth={getStrokeWidth(101)}
            dataLedIndex={getLEDIndex(101)}
            dataKeyIndex={keyIndex(101)}
            dataLayer={layer}
            path="M85.0001 33C83.3001 33 82.0001 31.7 82.0001 30V17C82.0001 10.9 77.1001 6 71.0001 6H3.30005C1.60005 6 0.300049 4.7 0.300049 3C0.300049 1.3 1.60005 0 3.30005 0H71.0001C80.4001 0 88.0001 7.6 88.0001 17V30C88.0001 31.6 86.6001 33 85.0001 33Z"
          />
          <UnderGlowStrip
            id="100_undeglow"
            x={1162}
            y={51}
            onClick={e => {
              setUndeglowIndex(100, e);
            }}
            visibility={this.props.showUnderglow ? true : false}
            fill={getColor(100)}
            stroke={stroke(100)}
            strokeWidth={getStrokeWidth(100)}
            dataLedIndex={getLEDIndex(100)}
            dataKeyIndex={keyIndex(100)}
            dataLayer={layer}
            path="M3 52C1.3 52 0 50.5556 0 48.6667V3.33333C0 1.44444 1.3 0 3 0C4.7 0 6 1.44444 6 3.33333V48.6667C6 50.4444 4.6 52 3 52Z"
          />
          <UnderGlowStrip
            id="99_undeglow"
            x={1162}
            y={107}
            onClick={e => {
              setUndeglowIndex(99, e);
            }}
            visibility={this.props.showUnderglow ? true : false}
            fill={getColor(99)}
            stroke={stroke(99)}
            strokeWidth={getStrokeWidth(99)}
            dataLedIndex={getLEDIndex(99)}
            dataKeyIndex={keyIndex(99)}
            dataLayer={layer}
            path="M3 52C1.3 52 0 50.5556 0 48.6667V3.33333C0 1.44444 1.3 0 3 0C4.7 0 6 1.44444 6 3.33333V48.6667C6 50.5556 4.6 52 3 52Z"
          />
          <UnderGlowStrip
            id="130_undeglow"
            x={1162}
            y={163}
            onClick={e => {
              setUndeglowIndex(130, e);
            }}
            visibility={this.props.showUnderglow ? true : false}
            fill={getColor(130)}
            stroke={stroke(130)}
            strokeWidth={getStrokeWidth(130)}
            dataLedIndex={getLEDIndex(130)}
            dataKeyIndex={keyIndex(130)}
            dataLayer={layer}
            path="M3 52C1.3 52 0 50.6693 0 48.9291V3.07087C0 1.33071 1.3 0 3 0C4.7 0 6 1.33071 6 3.07087V48.9291C6 50.6693 4.6 52 3 52Z"
          />
          <UnderGlowStrip
            id="129_undeglow"
            x={1162}
            y={219}
            onClick={e => {
              setUndeglowIndex(129, e);
            }}
            visibility={this.props.showUnderglow ? true : false}
            fill={getColor(129)}
            stroke={stroke(129)}
            strokeWidth={getStrokeWidth(129)}
            dataLedIndex={getLEDIndex(129)}
            dataKeyIndex={keyIndex(129)}
            dataLayer={layer}
            path="M45.6 112H45.5C43.8 111.9 42.6 110.5 42.6 108.9L42.8 104.5C43.1 96.1 40.6 87.7 35.9 80.8L8 40.6C2.7 33 0 24.1 0 14.9V3C0 1.3 1.3 0 3 0C4.7 0 6 1.3 6 3V15C6 23 8.4 30.7 13 37.2L40.9 77.4C46.4 85.3 49.3 95 48.9 104.7L48.7 109.1C48.6 110.7 47.2 112 45.6 112Z"
          />
          <UnderGlowStrip
            id="128_undeglow"
            x={1201}
            y={336}
            onClick={e => {
              setUndeglowIndex(128, e);
            }}
            visibility={this.props.showUnderglow ? true : false}
            fill={getColor(128)}
            stroke={stroke(128)}
            strokeWidth={getStrokeWidth(128)}
            dataLedIndex={getLEDIndex(128)}
            dataKeyIndex={keyIndex(128)}
            dataLayer={layer}
            path="M3.67102 67.8054H3.57105C1.87105 67.7054 0.671023 66.3054 0.671023 64.7054L2.97101 2.90543C3.07101 1.20543 4.47105 -0.0945679 6.07105 0.00543213C7.77105 0.105432 8.97101 1.50544 8.97101 3.10544L6.67102 64.9054C6.67102 66.6054 5.27102 67.8054 3.67102 67.8054Z"
          />
          <UnderGlowStrip
            id="127_undeglow"
            x={1199}
            y={409}
            onClick={e => {
              setUndeglowIndex(127, e);
            }}
            visibility={this.props.showUnderglow ? true : false}
            fill={getColor(127)}
            stroke={stroke(127)}
            strokeWidth={getStrokeWidth(127)}
            dataLedIndex={getLEDIndex(127)}
            dataKeyIndex={keyIndex(127)}
            dataLayer={layer}
            path="M3.67102 67.8054H3.57105C1.87105 67.7054 0.671023 66.3054 0.671023 64.7054L2.97101 2.90543C3.07101 1.20543 4.47105 -0.0945679 6.07105 0.00543213C7.77105 0.105432 8.97101 1.50544 8.97101 3.10544L6.67102 64.9054C6.67102 66.6054 5.27102 67.8054 3.67102 67.8054Z"
          />
          <UnderGlowStrip
            id="126_undeglow"
            x={1197}
            y={481}
            onClick={e => {
              setUndeglowIndex(126, e);
            }}
            visibility={this.props.showUnderglow ? true : false}
            fill={getColor(126)}
            stroke={stroke(126)}
            strokeWidth={getStrokeWidth(126)}
            dataLedIndex={getLEDIndex(126)}
            dataKeyIndex={keyIndex(126)}
            dataLayer={layer}
            path="M3.97852 67.8054H3.87848C2.17848 67.7054 0.978516 66.3054 0.978516 64.7054L2.57849 3.80539C2.67849 2.10539 3.97847 0.905396 5.67847 0.905396C7.37847 1.0054 8.57849 2.4054 8.57849 4.0054L6.97852 64.9054C6.97852 66.5054 5.57852 67.8054 3.97852 67.8054Z"
          />
          <UnderGlowStrip
            id="125_undeglow"
            x={1195}
            y={553}
            onClick={e => {
              setUndeglowIndex(125, e);
            }}
            visibility={this.props.showUnderglow ? true : false}
            fill={getColor(125)}
            stroke={stroke(125)}
            strokeWidth={getStrokeWidth(125)}
            dataLedIndex={getLEDIndex(125)}
            dataKeyIndex={keyIndex(125)}
            dataLayer={layer}
            path="M3.17847 61.2054H3.07849C1.37849 61.1054 0.178467 59.7054 0.178467 58.1054L1.57849 3.70541C1.67849 2.00541 2.97847 0.80542 4.67847 0.80542C6.37847 0.90542 7.57849 2.30543 7.57849 3.90543L6.17847 58.3054C6.07847 59.9054 4.77847 61.2054 3.17847 61.2054Z"
          />
          <UnderGlowStrip
            id="124_undeglow"
            x={1191}
            y={619}
            onClick={e => {
              setUndeglowIndex(124, e);
            }}
            visibility={this.props.showUnderglow ? true : false}
            fill={getColor(124)}
            stroke={stroke(124)}
            strokeWidth={getStrokeWidth(124)}
            dataLedIndex={getLEDIndex(124)}
            dataKeyIndex={keyIndex(124)}
            dataLayer={layer}
            path="M2.97851 68.5055C2.47851 68.5055 1.97848 68.4055 1.57848 68.1055C0.0784807 67.3055 -0.421532 65.5055 0.378468 64.0055C1.17847 62.5055 1.67846 60.9055 1.67846 59.2055L3.77849 3.00549C3.87849 1.30549 5.17847 0.105469 6.87847 0.105469C8.57847 0.205469 9.77849 1.60551 9.77849 3.20551L7.67846 59.4055C7.57846 62.0055 6.87846 64.6055 5.67846 66.9055C5.07846 68.0055 4.07851 68.5055 2.97851 68.5055Z"
          />
          <UnderGlowStrip
            id="123_undeglow"
            x={1109}
            y={688}
            onClick={e => {
              setUndeglowIndex(123, e);
            }}
            visibility={this.props.showUnderglow ? true : false}
            fill={getColor(123)}
            stroke={stroke(123)}
            strokeWidth={getStrokeWidth(123)}
            dataLedIndex={getLEDIndex(123)}
            dataKeyIndex={keyIndex(123)}
            dataLayer={layer}
            path="M72.1 7.10002H3C1.3 7.10002 0 5.80002 0 4.10002C0 2.40002 1.3 1.10002 3 1.10002H72.1C73.3 1.10002 74.5 0.900048 75.7 0.500048C77.3 4.825e-05 79 0.800073 79.5 2.40007C80 4.00007 79.2 5.70006 77.6 6.20006C75.9 6.80006 74 7.10002 72.1 7.10002Z"
          />
          <UnderGlowStrip
            id="122_undeglow"
            x={1027}
            y={688}
            onClick={e => {
              setUndeglowIndex(122, e);
            }}
            visibility={this.props.showUnderglow ? true : false}
            fill={getColor(122)}
            stroke={stroke(122)}
            strokeWidth={getStrokeWidth(122)}
            dataLedIndex={getLEDIndex(122)}
            dataKeyIndex={keyIndex(122)}
            dataLayer={layer}
            path="M74.9412 6.09998H3.05882C1.32549 6.09998 0 4.79998 0 3.09998C0 1.39998 1.32549 0.0999756 3.05882 0.0999756H74.9412C76.6745 0.0999756 78 1.39998 78 3.09998C78 4.79998 76.6745 6.09998 74.9412 6.09998Z"
          />
          <UnderGlowStrip
            id="121_undeglow"
            x={945}
            y={688}
            onClick={e => {
              setUndeglowIndex(121, e);
            }}
            visibility={this.props.showUnderglow ? true : false}
            fill={getColor(121)}
            stroke={stroke(121)}
            strokeWidth={getStrokeWidth(121)}
            dataLedIndex={getLEDIndex(121)}
            dataKeyIndex={keyIndex(121)}
            dataLayer={layer}
            path="M74.9412 6.09998H3.05882C1.32549 6.09998 0 4.79998 0 3.09998C0 1.39998 1.32549 0.0999756 3.05882 0.0999756H74.9412C76.6745 0.0999756 78 1.39998 78 3.09998C78 4.79998 76.6745 6.09998 74.9412 6.09998Z"
          />

          <UnderGlowStrip
            id="120_undeglow"
            x={863}
            y={688}
            onClick={e => {
              setUndeglowIndex(120, e);
            }}
            visibility={this.props.showUnderglow ? true : false}
            fill={getColor(120)}
            stroke={stroke(120)}
            strokeWidth={getStrokeWidth(120)}
            dataLedIndex={getLEDIndex(120)}
            dataKeyIndex={keyIndex(120)}
            dataLayer={layer}
            path="M74.6714 6.09998H3.32859C1.44239 6.09998 0 4.79998 0 3.09998C0 1.39998 1.44239 0.0999756 3.32859 0.0999756H74.6714C76.5576 0.0999756 78 1.39998 78 3.09998C78 4.79998 76.4467 6.09998 74.6714 6.09998Z"
          />
          <UnderGlowStrip
            id="119_undeglow"
            x={781}
            y={688}
            onClick={e => {
              setUndeglowIndex(119, e);
            }}
            visibility={this.props.showUnderglow ? true : false}
            fill={getColor(119)}
            stroke={stroke(119)}
            strokeWidth={getStrokeWidth(119)}
            dataLedIndex={getLEDIndex(119)}
            dataKeyIndex={keyIndex(119)}
            dataLayer={layer}
            path="M74.6761 6.09998H3.32386C1.44034 6.09998 0 4.79998 0 3.09998C0 1.39998 1.44034 0.0999756 3.32386 0.0999756H74.6761C76.5597 0.0999756 78 1.39998 78 3.09998C78 4.79998 76.5597 6.09998 74.6761 6.09998Z"
          />
          <UnderGlowStrip
            id="118_undeglow"
            x={744}
            y={654}
            onClick={e => {
              setUndeglowIndex(118, e);
            }}
            visibility={this.props.showUnderglow ? true : false}
            fill={getColor(118)}
            stroke={stroke(118)}
            strokeWidth={getStrokeWidth(118)}
            dataLedIndex={getLEDIndex(118)}
            dataKeyIndex={keyIndex(118)}
            dataLayer={layer}
            path="M29.9 40.0999H22.6C14.8 40.0999 8.10001 34.7999 6.10001 27.2999L0.100013 3.69996C-0.299987 2.09996 0.70001 0.49992 2.30001 0.0999204C3.90001 -0.30008 5.5 0.699932 5.9 2.29993L11.9 25.9C13.1 30.8 17.5 34.2 22.6 34.2H29.9C31.6 34.2 32.9 35.5 32.9 37.2C32.9 38.9 31.5 40.0999 29.9 40.0999Z"
          />
          <UnderGlowStrip
            id="117_undeglow"
            x={725}
            y={581}
            onClick={e => {
              setUndeglowIndex(117, e);
            }}
            visibility={this.props.showUnderglow ? true : false}
            fill={getColor(117)}
            stroke={stroke(117)}
            strokeWidth={getStrokeWidth(117)}
            dataLedIndex={getLEDIndex(117)}
            dataKeyIndex={keyIndex(117)}
            dataLayer={layer}
            path="M19.4764 69.2C18.1764 69.2 16.8764 68.3 16.5764 66.9L0.87641 3.9C0.47641 2.3 1.47641 0.699995 3.07641 0.299995C4.67641 -0.100005 6.27641 0.899977 6.67641 2.49998L22.3764 65.5C22.7764 67.1 21.7764 68.7 20.1764 69.1C19.9764 69.2 19.7764 69.2 19.4764 69.2Z"
          />
          <UnderGlowStrip
            id="116_undeglow"
            x={707}
            y={509}
            onClick={e => {
              setUndeglowIndex(116, e);
            }}
            visibility={this.props.showUnderglow ? true : false}
            fill={getColor(116)}
            stroke={stroke(116)}
            strokeWidth={getStrokeWidth(116)}
            dataLedIndex={getLEDIndex(116)}
            dataKeyIndex={keyIndex(116)}
            dataLayer={layer}
            path="M18.6882 67.9882C17.3882 67.9882 16.0882 67.0882 15.7882 65.6882L0.0882021 3.68821C-0.311798 2.08821 0.688207 0.488203 2.28821 0.0882035C3.88821 -0.311797 5.48821 0.688185 5.88821 2.28819L21.5882 64.2882C21.9882 65.8882 20.9882 67.4882 19.3882 67.8882C19.1882 67.9882 18.9882 67.9882 18.6882 67.9882Z"
          />
          <UnderGlowStrip
            id="115_undeglow"
            x={667}
            y={443}
            onClick={e => {
              setUndeglowIndex(115, e);
            }}
            visibility={this.props.showUnderglow ? true : false}
            fill={getColor(115)}
            stroke={stroke(115)}
            strokeWidth={getStrokeWidth(115)}
            dataLedIndex={getLEDIndex(115)}
            dataKeyIndex={keyIndex(115)}
            dataLayer={layer}
            path="M25.7 12.9999L36.9835 59.5445C37.3774 61.1694 39.0255 62.1571 40.6442 61.7385C42.2284 61.3288 43.1906 59.7235 42.805 58.1332L31.5 11.4999C29.8 4.79994 23.9 0.199951 17 0.199951H3C1.3 0.199951 0 1.49995 0 3.19995C0 4.89995 1.3 6.19995 3 6.19995H17C21.1 6.19995 24.7 8.99994 25.7 12.9999Z"
          />
          <UnderGlowStrip
            id="114_undeglow"
            x={598}
            y={419}
            onClick={e => {
              setUndeglowIndex(114, e);
            }}
            visibility={this.props.showUnderglow ? true : false}
            fill={getColor(114)}
            stroke={stroke(114)}
            strokeWidth={getStrokeWidth(114)}
            dataLedIndex={getLEDIndex(114)}
            dataKeyIndex={keyIndex(114)}
            dataLayer={layer}
            path="M62 30.2H0V3C0 1.3 1.3 0 3 0C4.7 0 6 1.3 6 3V24.2H62C63.7 24.2 65 25.5 65 27.2C65 28.9 63.7 30.2 62 30.2Z"
          />
          <UnderGlowStrip
            id="113_undeglow"
            x={598}
            y={351}
            onClick={e => {
              setUndeglowIndex(113, e);
            }}
            visibility={this.props.showUnderglow ? true : false}
            fill={getColor(113)}
            stroke={stroke(113)}
            strokeWidth={getStrokeWidth(113)}
            dataLedIndex={getLEDIndex(113)}
            dataKeyIndex={keyIndex(113)}
            dataLayer={layer}
            path="M3 64C1.3 64 0 62.6271 0 60.8317V3.16832C0 1.37294 1.3 0 3 0C4.7 0 6 1.37294 6 3.16832V60.9373C6 62.6271 4.6 64 3 64Z"
          />
          <UnderGlowStrip
            id="112_undeglow"
            x={598}
            y={290}
            onClick={e => {
              setUndeglowIndex(112, e);
            }}
            visibility={this.props.showUnderglow ? true : false}
            fill={getColor(112)}
            stroke={stroke(112)}
            strokeWidth={getStrokeWidth(112)}
            dataLedIndex={getLEDIndex(112)}
            dataKeyIndex={keyIndex(112)}
            dataLayer={layer}
            path="M3 57C1.3 57 0 55.7 0 54V27C0 24.8 1.8 23 4 23H14V3C14 1.3 15.3 0 17 0C18.7 0 20 1.3 20 3V25C20 27.2 18.2 29 16 29H6V54C6 55.6 4.6 57 3 57Z"
          />
          <UnderGlowStrip
            id="111_undeglow"
            x={604}
            y={212}
            onClick={e => {
              setUndeglowIndex(111, e);
            }}
            visibility={this.props.showUnderglow ? true : false}
            fill={getColor(111)}
            stroke={stroke(111)}
            strokeWidth={getStrokeWidth(111)}
            dataLedIndex={getLEDIndex(111)}
            dataKeyIndex={keyIndex(111)}
            dataLayer={layer}
            path="M11 74C9.3 74 8 72.7 8 71V6H3C1.3 6 0 4.7 0 3C0 1.3 1.3 0 3 0H10C12.2 0 14 1.8 14 4V71C14 72.7 12.7 74 11 74Z"
          />
          <UnderGlowStrip
            id="110_undeglow"
            x={573}
            y={138}
            onClick={e => {
              setUndeglowIndex(110, e);
            }}
            visibility={this.props.showUnderglow ? true : false}
            fill={getColor(110)}
            stroke={stroke(110)}
            strokeWidth={getStrokeWidth(110)}
            dataLedIndex={getLEDIndex(110)}
            dataKeyIndex={keyIndex(110)}
            dataLayer={layer}
            path="M24 80H17C14.8 80 13 78.2 13 76V19H4C1.8 19 0 17.2 0 15V3.00001C0 1.30001 1.3 0 3 0C4.7 0 6 1.30001 6 3.00001V13H15C17.2 13 19 14.8 19 17V74H24C25.7 74 27 75.3 27 77C27 78.7 25.6 80 24 80Z"
          />
          <UnderGlowStrip
            id="109_undeglow"
            x={573}
            y={90}
            onClick={e => {
              setUndeglowIndex(109, e);
            }}
            visibility={this.props.showUnderglow ? true : false}
            fill={getColor(109)}
            stroke={stroke(109)}
            strokeWidth={getStrokeWidth(109)}
            dataLedIndex={getLEDIndex(109)}
            dataKeyIndex={keyIndex(109)}
            dataLayer={layer}
            path="M3 44.1469C1.3 44.1469 0 42.8469 0 41.1469V22C0 19.8 1.8 18 4 18H19.1V3C19.1 1.3 20.4 0 22.1 0C23.8 0 25.1 1.3 25.1 3V20C25.1 22.2 23.3 24 21.1 24H6V41.0469C6 42.7469 4.7 44.1469 3 44.1469Z"
          />
          <UnderGlowStrip
            id="108_undeglow"
            x={592}
            y={14}
            onClick={e => {
              setUndeglowIndex(108, e);
            }}
            visibility={this.props.showUnderglow ? true : false}
            fill={getColor(108)}
            stroke={stroke(108)}
            strokeWidth={getStrokeWidth(108)}
            dataLedIndex={getLEDIndex(108)}
            dataKeyIndex={keyIndex(108)}
            dataLayer={layer}
            path="M3 72C1.3 72 0 70.6817 0 68.9577V3.04225C0 1.31831 1.3 2.41777e-07 3 2.41777e-07C4.7 2.41777e-07 6 1.31831 6 3.04225V69.0592C6 70.6817 4.7 72 3 72Z"
          />
          {/* End Right side */}
        </g>
      </svg>
    );
  }
}

export default KeymapISO;
