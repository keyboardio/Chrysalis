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
const textOffsetPosition = {
  x: 9,
  xCenter: 25,
  y: 28,
  yCenter: 20
};

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
          <span className={props.class} textAnchor="middle" x={props.x} y={props.y} dy={props.dy} textLength={props.textLength}>
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
            width={69}
            height={57}
            x={1069}
            y={keysRowsPosition.row2}
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
            keyType="regularKey"
            id="R2C15_keyshape"
            onClick={onClick}
            className="key"
            width={115}
            height={57}
            x={1023}
            y={keysRowsPosition.row3}
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
            width={130}
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
            id="R3C2_keyshape"
            onClick={onClick}
            className="key"
            width={57}
            height={57}
            x={224}
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
            x={291}
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
            x={358}
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
            x={425}
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
            x={492}
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
            path="M3.26816 5.5H74.7318C76.3488 5.5 77.5 4.38442 77.5 3C77.5 1.61558 76.3488 0.5 74.7318 0.5H3.26816C1.65118 0.5 0.5 1.61558 0.5 3C0.5 4.38442 1.65118 5.5 3.26816 5.5Z"
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
            path="M3.26816 5.5H74.7318C76.3488 5.5 77.5 4.38442 77.5 3C77.5 1.61558 76.3488 0.5 74.7318 0.5H3.26816C1.65118 0.5 0.5 1.61558 0.5 3C0.5 4.38442 1.65118 5.5 3.26816 5.5Z"
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
            path="M3.26816 5.5H74.7318C76.3488 5.5 77.5 4.38442 77.5 3C77.5 1.61558 76.3488 0.5 74.7318 0.5H3.26816C1.65118 0.5 0.5 1.61558 0.5 3C0.5 4.38442 1.65118 5.5 3.26816 5.5Z"
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
            path="M3.05882 5.5H74.9412C76.4076 5.5 77.5 4.41475 77.5 3C77.5 1.58525 76.4076 0.5 74.9412 0.5H3.05882C1.59243 0.5 0.499992 1.58525 0.499992 3C0.499992 4.40409 1.6834 5.5 3.05882 5.5Z"
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
            path="M3.63919 5.5H84.3608C86.2416 5.5 87.5 4.33785 87.5 3C87.5 1.66215 86.2416 0.5 84.3608 0.5H3.63919C1.75843 0.5 0.5 1.66215 0.5 3C0.5 4.32836 1.8681 5.5 3.63919 5.5Z"
          />
        </g>
      </svg>
    );
  }
}

export default KeymapANSI;
