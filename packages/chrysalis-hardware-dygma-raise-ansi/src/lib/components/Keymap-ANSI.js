// -*- mode: js-jsx -*-
/* chrysalis-hardware-dygma-raise -- Chrysalis support for Dygma Raise
 * Copyright (C) 2018  Keyboardio, Inc.
 * Copyright (C) 2018  Simon-Claudius Wystrach
 *
 * Based on the SVG done by Simon-Claudius for the previous incarnation of
 * Chrysalis:
 *   https://github.com/Lepidopterarium/Chrysalis/blob/ab7ec1ffba6f79da97c1eb27877195423875fbc2/src/chrysalis/plugin/hardware/raise/dygma-raise.svg
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

const XX = 255;
const LEDS_LEFT_KEYS = 33;
const UNDERGLOW = 79;
const HUBLE = 78;
const led_map = [
  // LHS                            RHS
  [ 0,  1,  2,  3,  4,  5,  6, UNDERGLOW,  HUBLE, 6+LEDS_LEFT_KEYS, 5+LEDS_LEFT_KEYS, 4+LEDS_LEFT_KEYS, 3+LEDS_LEFT_KEYS, 2+LEDS_LEFT_KEYS, 1+LEDS_LEFT_KEYS, 0+LEDS_LEFT_KEYS],
  [ 7,  8,  9, 10, 11, 12, XX, XX,  14+LEDS_LEFT_KEYS, 13+LEDS_LEFT_KEYS, 12+LEDS_LEFT_KEYS, 11+LEDS_LEFT_KEYS, 10+LEDS_LEFT_KEYS, 9+LEDS_LEFT_KEYS, 8+LEDS_LEFT_KEYS, 7 +LEDS_LEFT_KEYS],
  [13, 14, 15, 16, 17, 18, XX, 29,  XX, 21+LEDS_LEFT_KEYS, 20+LEDS_LEFT_KEYS, 19+LEDS_LEFT_KEYS, 18+LEDS_LEFT_KEYS, 17+LEDS_LEFT_KEYS, 16+LEDS_LEFT_KEYS, 15 +LEDS_LEFT_KEYS],
  [19, 20, 21, 22, 23, 24, 25, XX,  XX, XX, 27+LEDS_LEFT_KEYS, 26+LEDS_LEFT_KEYS, 25+LEDS_LEFT_KEYS, 24+LEDS_LEFT_KEYS, 23+LEDS_LEFT_KEYS, 22 +LEDS_LEFT_KEYS],
  [26, 27, 28, 29, 30, XX, 31, 32,  35+LEDS_LEFT_KEYS, 34+LEDS_LEFT_KEYS, 33+LEDS_LEFT_KEYS, 32+LEDS_LEFT_KEYS, 31+LEDS_LEFT_KEYS, 30+LEDS_LEFT_KEYS, 29+LEDS_LEFT_KEYS, 28+LEDS_LEFT_KEYS]];

class KeymapANSI extends React.Component {
  render() {
    const keymap = this.props.keymap || Array(80).fill().map(() => 0);

    const getContrastText = color => {
      return this.props.theme ? this.props.theme.palette.getContrastText(color) : null;
    };
    let keyIndex = (row, col) => {
      return row * 16 + col;
    };
    let getLabel = (row, col) => {
      return keymap[keyIndex(row, col)];
    };
    let stroke = (row, col) => {
      return this.props.selectedKey == keyIndex(row, col) ? "#202020" : "#b3b3b3";
    };

    let getStrokeWidth = (row, col) => {
      return this.props.selectedKey == keyIndex(row, col) ? "3.0" : "1.5";
    };

    const colormap = this.props.colormap || Array(80).fill().map(() => 0);
    const palette = this.props.palette && this.props.palette.length > 0 ? this.props.palette : Array(16).fill().map(() => ({
      rgb: "#ffffff"
    }));

    let getColor = (row, col) => {
      let ledIndex = led_map[parseInt(row)][parseInt(col)],
          colorIndex = colormap[ledIndex],
          color = palette[colorIndex].rgb;
      return color;
    };

    let getLEDIndex = (row, col) => {
      return led_map[parseInt(row)][parseInt(col)];
    };

    const onClick = this.props.onKeySelect;
    const layer = this.props.index;

    return (
      <svg xmlns="http://www.w3.org/2000/svg"
        fillRule="evenodd"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit="1.5"
        clipRule="evenodd"
        viewBox="0 0 1029 634"
        className={this.props.className || "layer"}
      >


    <path id="neuron_outline" fill="none" stroke="#b4b4b4" strokeWidth="1.5" d="M474.769 610.224a4.727 4.727 0 0 1-6.393 2.452l-48.517-23.03c-7.208-3.421-10.307-12.016-6.942-19.251l29.382-63.156a45.23 45.23 0 0 0 4.222-19.081v-30.984a10.493 10.493 0 0 1 10.493-10.494h55.413a10.494 10.494 0 0 1 10.494 10.494v30.984a45.23 45.23 0 0 0 4.221 19.081l29.382 63.156c3.366 7.235.267 15.83-6.942 19.251l-48.516 23.03a4.735 4.735 0 0 1-6.394-2.452l-.001-.002a10.78 10.78 0 0 0-19.901 0l-.001.002z"/>
    <g id="keyshapes">
        <path id="underglow_outline" onClick={onClick} className="key" fill={getColor(0, 7)} color={getColor(0, 7)} stroke={stroke(0, 7)} strokeWidth={getStrokeWidth(0, 7)} data-led-index={getLEDIndex(0, 7)} data-key-index={keyIndex(0, 7)} data-layer={layer} d="M376.655 613.408c-2.562 11.219-12.541 19.176-24.049 19.176H47.609c-18.052 0-32.896-14.229-33.66-32.266L.79 289.393a44.722 44.722 0 0 1 8.468-28.132l23.261-32.097a35 35 0 0 0 6.658-20.534V22.197A21.446 21.446 0 0 1 60.624.75h907.353a21.45 21.45 0 0 1 21.447 21.447V208.63a35 35 0 0 0 6.658 20.534c6.418 8.86 16.188 22.336 23.318 32.174a44.727 44.727 0 0 1 8.47 27.963c-2.09 54.162-9.11 236.202-11.99 310.891-.69 18.088-15.56 32.392-33.661 32.392H620.181a24.668 24.668 0 0 1-23.995-18.943l-48.454-203.048a9.784 9.784 0 0 0-9.517-7.513H432.499a9.783 9.783 0 0 0-9.538 7.605l-46.306 202.723zm-10.198-4.83a15.798 15.798 0 0 1-15.419 12.357H47.977c-11.902 0-21.691-9.381-22.197-21.273L12.734 293.201a44.374 44.374 0 0 1 8.867-28.555l22.17-29.484a36.33 36.33 0 0 0 7.293-21.833V23.747c0-6.054 4.908-10.962 10.962-10.962h904.18c6.055 0 10.963 4.908 10.963 10.962v189.582a36.33 36.33 0 0 0 7.293 21.833c6.274 8.345 15.369 20.44 22.208 29.541a44.38 44.38 0 0 1 8.88 28.429c-2.22 55.682-9.65 242.889-12.18 306.467-.47 11.918-10.273 21.336-22.2 21.336H620.509a14.576 14.576 0 0 1-14.2-11.287l-46.895-202.441a20.61 20.61 0 0 0-20.077-15.959H431.476a20.61 20.61 0 0 0-20.115 16.12l-44.904 201.21z"/>
        <path id="neuron_led" onClick={onClick} className="key" fill={getColor(0, 8)} stroke={stroke(0, 8)} strokeWidth={getStrokeWidth(0, 8)} data-led-index={getLEDIndex(0, 8)} data-key-index={keyIndex(0, 8)} data-layer={layer} d="M454.516 509.962a1.11 1.11 0 0 1 .709-1.345l28.59-9.812c.23-.079.478-.08.709-.004l29.677 9.823c.562.186.878.779.721 1.349l-7.468 26.946c-.046.167-.13.32-.246.448l-22.196 24.568a1.109 1.109 0 0 1-1.664-.02l-21.142-24.555a1.114 1.114 0 0 1-.229-.427l-7.461-26.971zm10.649 4.674a1.11 1.11 0 0 1 .739-1.265l18.116-6.014c.223-.074.464-.076.688-.004l18.822 6.027c.533.171.855.711.751 1.261l-3.696 19.617a1.11 1.11 0 0 1-.401.664l-15.113 11.973a1.109 1.109 0 0 1-1.4-.018l-14.307-11.96a1.106 1.106 0 0 1-.377-.639l-3.822-19.642z"/>
        <path onClick={onClick} className="key" id="R4C9_keyshape" fill={getColor(4, 9)} color={getColor(4, 9)} stroke={stroke(4, 9)} strokeWidth={getStrokeWidth(4, 9)} data-led-index={getLEDIndex(4, 9)} data-key-index={keyIndex(4, 9)} data-layer={layer} d="M649.235 328.679c.622-.885.955-1.94.955-3.021 0-2.884-2.373-5.257-5.257-5.258h-76.867c-2.883 0-5.257 2.373-5.257 5.257v40.728c0 2.884 2.374 5.257 5.257 5.257h48.253a5.257 5.257 0 0 0 4.302-2.235l28.614-40.728z"/>
        <path onClick={onClick} className="key" id="R4C8_keyshape" fill={getColor(4, 8)} color={getColor(4, 8)} stroke={stroke(4, 8)} strokeWidth={getStrokeWidth(4, 8)} data-led-index={getLEDIndex(4, 8)} data-key-index={keyIndex(4, 8)} data-layer={layer} d="M503.491 325.657c0-2.884 2.374-5.257 5.257-5.257h40.728c2.884 0 5.257 2.373 5.257 5.257v40.728c0 2.884-2.373 5.257-5.257 5.257h-40.728c-2.883 0-5.257-2.373-5.257-5.257v-40.728z"/>
        <path onClick={onClick} className="key" id="R4C7_keyshape" fill={getColor(4, 7)} color={getColor(4, 7)} stroke={stroke(4, 7)} strokeWidth={getStrokeWidth(4, 7)} data-led-index={getLEDIndex(4, 7)} data-key-index={keyIndex(4, 7)} data-layer={layer} d="M413.464 325.657c0-2.884 2.374-5.257 5.257-5.257h40.728c2.884 0 5.257 2.373 5.257 5.257v40.728c0 2.884-2.373 5.257-5.257 5.257h-40.728c-2.883 0-5.257-2.373-5.257-5.257v-40.728z"/>
        <path onClick={onClick} className="key" id="R4C6_keyshape" fill={getColor(4, 6)} color={getColor(4, 6)} stroke={stroke(4, 6)} strokeWidth={getStrokeWidth(4, 6)} data-led-index={getLEDIndex(4, 6)} data-key-index={keyIndex(4, 6)} data-layer={layer} d="M318.967 328.679a5.26 5.26 0 0 1-.954-3.021c0-2.884 2.373-5.257 5.256-5.258h76.867c2.884 0 5.257 2.373 5.257 5.257v40.728c0 2.884-2.373 5.257-5.257 5.257h-48.253a5.26 5.26 0 0 1-4.302-2.235l-28.614-40.728z"/>
        <path onClick={onClick} className="key" id="R4C15_keyshape" fill={getColor(4, 15)} color={getColor(4, 15)} stroke={stroke(4, 15)} strokeWidth={getStrokeWidth(4, 15)} data-led-index={getLEDIndex(4, 15)} data-key-index={keyIndex(4, 15)} data-layer={layer} d="M901.43 266.177a5.257 5.257 0 0 1 5.256-5.257h55.73a5.257 5.257 0 0 1 5.257 5.257v40.728a5.257 5.257 0 0 1-5.257 5.257h-55.73a5.257 5.257 0 0 1-5.256-5.257v-40.728z"/>
        <path onClick={onClick} className="key" id="R4C14_keyshape" fill={getColor(4, 14)} color={getColor(4, 14)} stroke={stroke(4, 14)} strokeWidth={getStrokeWidth(4, 14)} data-led-index={getLEDIndex(4, 14)} data-key-index={keyIndex(4, 14)} data-layer={layer} d="M841.405 266.177c0-2.884 2.374-5.257 5.257-5.257h40.728c2.884 0 5.257 2.373 5.257 5.257v40.728c0 2.884-2.373 5.257-5.257 5.257h-40.728c-2.883 0-5.257-2.373-5.257-5.257v-40.728z"/>
        <path onClick={onClick} className="key" id="R4C13_keyshape" fill={getColor(4, 13)} color={getColor(4, 13)} stroke={stroke(4, 13)} strokeWidth={getStrokeWidth(4, 13)} data-led-index={getLEDIndex(4, 13)} data-key-index={keyIndex(4, 13)} data-layer={layer} d="M766.38 266.177a5.257 5.257 0 0 1 5.256-5.257h55.73a5.257 5.257 0 0 1 5.257 5.257v40.728a5.257 5.257 0 0 1-5.257 5.257h-55.73a5.257 5.257 0 0 1-5.256-5.257v-40.728z"/>
        <path onClick={onClick} className="key" id="R4C12_keyshape" fill={getColor(4, 12)} color={getColor(4, 12)} stroke={stroke(4, 12)} strokeWidth={getStrokeWidth(4, 12)} data-led-index={getLEDIndex(4, 12)} data-key-index={keyIndex(4, 12)} data-layer={layer} d="M691.35 266.177a5.257 5.257 0 0 1 5.256-5.257h55.73a5.257 5.257 0 0 1 5.257 5.257v40.728a5.257 5.257 0 0 1-5.257 5.257h-55.73a5.257 5.257 0 0 1-5.256-5.257v-40.728z"/>
        <path onClick={onClick} className="key" id="R4C11_keyshape" fill={getColor(4, 11)} color={getColor(4, 11)} stroke={stroke(4, 11)} strokeWidth={getStrokeWidth(4, 11)} data-led-index={getLEDIndex(4, 11)} data-key-index={keyIndex(4, 11)} data-layer={layer} d="M606.424 266.177a5.257 5.257 0 0 1 5.257-5.257h65.629a5.255 5.255 0 0 1 5.257 5.257v40.728a5.253 5.253 0 0 1-5.257 5.257h-65.629a5.256 5.256 0 0 1-5.257-5.257v-40.728z"/>
        <path onClick={onClick} className="key" id="R4C10_keyshape" fill={getColor(4, 10)} color={getColor(4, 10)} stroke={stroke(4, 10)} strokeWidth={getStrokeWidth(4, 10)} data-led-index={getLEDIndex(4, 10)} data-key-index={keyIndex(4, 10)} data-layer={layer} d="M503.492 266.177a5.258 5.258 0 0 1 5.257-5.257h83.629a5.26 5.26 0 0 1 5.257 5.257v40.728a5.258 5.258 0 0 1-5.257 5.257h-83.629a5.258 5.258 0 0 1-5.257-5.257v-40.728z"/>
        <path onClick={onClick} className="key" id="R4C4_keyshape" fill={getColor(4, 4)} color={getColor(4, 4)} stroke={stroke(4, 4)} strokeWidth={getStrokeWidth(4, 4)} data-led-index={getLEDIndex(4, 4)} data-key-index={keyIndex(4, 4)} data-layer={layer} d="M370.564 266.177a5.258 5.258 0 0 1 5.257-5.257h83.629a5.26 5.26 0 0 1 5.257 5.257v40.728a5.258 5.258 0 0 1-5.257 5.257h-83.629a5.258 5.258 0 0 1-5.257-5.257v-40.728z"/>
        <path onClick={onClick} className="key" id="R4C3_keyshape" fill={getColor(4, 3)} color={getColor(4, 3)} stroke={stroke(4, 3)} strokeWidth={getStrokeWidth(4, 3)} data-led-index={getLEDIndex(4, 3)} data-key-index={keyIndex(4, 3)} data-layer={layer} d="M285.635 266.177a5.257 5.257 0 0 1 5.257-5.257h65.629a5.255 5.255 0 0 1 5.257 5.257v40.728a5.253 5.253 0 0 1-5.257 5.257h-65.629a5.256 5.256 0 0 1-5.257-5.257v-40.728z"/>
        <path onClick={onClick} className="key" id="R4C2_keyshape" fill={getColor(4, 2)} color={getColor(4, 2)} stroke={stroke(4, 2)} strokeWidth={getStrokeWidth(4, 2)} data-led-index={getLEDIndex(4, 2)} data-key-index={keyIndex(4, 2)} data-layer={layer} d="M210.608 266.177a5.257 5.257 0 0 1 5.256-5.257h55.73a5.257 5.257 0 0 1 5.257 5.257v40.728a5.257 5.257 0 0 1-5.257 5.257h-55.73a5.257 5.257 0 0 1-5.256-5.257v-40.728z"/>
        <path onClick={onClick} className="key" id="R4C1_keyshape" fill={getColor(4, 1)} color={getColor(4, 1)} stroke={stroke(4, 1)} strokeWidth={getStrokeWidth(4, 1)} data-led-index={getLEDIndex(4, 1)} data-key-index={keyIndex(4, 1)} data-layer={layer} d="M135.58 266.177a5.257 5.257 0 0 1 5.256-5.257h55.73a5.257 5.257 0 0 1 5.257 5.257v40.728a5.257 5.257 0 0 1-5.257 5.257h-55.73a5.257 5.257 0 0 1-5.256-5.257v-40.728z"/>
        <path onClick={onClick} className="key" id="R4C0_keyshape" fill={getColor(4, 0)} color={getColor(4, 0)} stroke={stroke(4, 0)} strokeWidth={getStrokeWidth(4, 0)} data-led-index={getLEDIndex(4, 0)} data-key-index={keyIndex(4, 0)} data-layer={layer} d="M60.552 266.177a5.257 5.257 0 0 1 5.256-5.257h55.73a5.257 5.257 0 0 1 5.257 5.257v40.728a5.257 5.257 0 0 1-5.257 5.257h-55.73a5.257 5.257 0 0 1-5.256-5.257v-40.728z"/>
        <path onClick={onClick} className="key" id="R3C15_keyshape" fill={getColor(3, 15)} color={getColor(3, 15)} stroke={stroke(3, 15)} strokeWidth={getStrokeWidth(3, 15)} data-led-index={getLEDIndex(3, 15)} data-key-index={keyIndex(3, 15)} data-layer={layer} d="M811.188 206.576a5.257 5.257 0 0 1 5.257-5.257h145.967a5.257 5.257 0 0 1 5.257 5.257v40.851a5.257 5.257 0 0 1-5.257 5.257H816.445a5.257 5.257 0 0 1-5.257-5.257v-40.851z"/>
        <path onClick={onClick} className="key" id="R3C14_keyshape" fill={getColor(3, 14)} color={getColor(3, 14)} stroke={stroke(3, 14)} strokeWidth={getStrokeWidth(3, 14)} data-led-index={getLEDIndex(3, 14)} data-key-index={keyIndex(3, 14)} data-layer={layer} d="M752.137 206.575c0-2.883 2.373-5.256 5.256-5.256h40.852c2.884 0 5.256 2.373 5.256 5.256v40.852c0 2.883-2.372 5.256-5.256 5.256h-40.853c-2.883 0-5.256-2.373-5.256-5.256v-40.852h.001z"/>
        <path onClick={onClick} className="key" id="R3C13_keyshape" fill={getColor(3, 13)} color={getColor(3, 13)} stroke={stroke(3, 13)} strokeWidth={getStrokeWidth(3, 13)} data-led-index={getLEDIndex(3, 13)} data-key-index={keyIndex(3, 13)} data-layer={layer} d="M693.077 206.575c0-2.883 2.373-5.256 5.256-5.256h40.852c2.884 0 5.256 2.373 5.256 5.256v40.852c0 2.883-2.372 5.256-5.256 5.256h-40.852c-2.883 0-5.256-2.373-5.256-5.256v-40.852z"/>
        <path onClick={onClick} className="key" id="R3C12_keyshape" fill={getColor(3, 12)} color={getColor(3, 12)} stroke={stroke(3, 12)} strokeWidth={getStrokeWidth(3, 12)} data-led-index={getLEDIndex(3, 12)} data-key-index={keyIndex(3, 12)} data-layer={layer} d="M634.017 206.575c0-2.883 2.373-5.256 5.256-5.256h40.852c2.884 0 5.256 2.373 5.256 5.256v40.852c0 2.883-2.372 5.256-5.256 5.256h-40.852c-2.883 0-5.256-2.373-5.256-5.256v-40.852z"/>
        <path onClick={onClick} className="key" id="R3C11_keyshape" fill={getColor(3, 11)} color={getColor(3, 11)} stroke={stroke(3, 11)} strokeWidth={getStrokeWidth(3, 11)} data-led-index={getLEDIndex(3, 11)} data-key-index={keyIndex(3, 11)} data-layer={layer} d="M574.957 206.575c0-2.883 2.373-5.256 5.256-5.256h40.852c2.884 0 5.256 2.373 5.256 5.256v40.852c0 2.883-2.372 5.256-5.256 5.256h-40.852c-2.883 0-5.256-2.373-5.256-5.256v-40.852z"/>
        <path onClick={onClick} className="key" id="R3C10_keyshape" fill={getColor(3, 10)} color={getColor(3, 10)} stroke={stroke(3, 10)} strokeWidth={getStrokeWidth(3, 10)} data-led-index={getLEDIndex(3, 10)} data-key-index={keyIndex(3, 10)} data-layer={layer} d="M515.901 206.575c0-2.883 2.373-5.256 5.256-5.256h40.852c2.884 0 5.256 2.373 5.256 5.256v40.852c0 2.883-2.372 5.256-5.256 5.256h-40.852c-2.883 0-5.256-2.373-5.256-5.256v-40.852z"/>
        <path onClick={onClick} className="key" id="R3C6_keyshape" fill={getColor(3, 6)} color={getColor(3, 6)} stroke={stroke(3, 6)} strokeWidth={getStrokeWidth(3, 6)} data-led-index={getLEDIndex(3, 6)} data-key-index={keyIndex(3, 6)} data-layer={layer} d="M426.843 206.575c0-2.883 2.373-5.256 5.256-5.256h40.852c2.884 0 5.256 2.373 5.256 5.256v40.852c0 2.883-2.372 5.256-5.256 5.256h-40.852c-2.883 0-5.256-2.373-5.256-5.256v-40.852z"/>
        <path onClick={onClick} className="key" id="R3C5_keyshape" fill={getColor(3, 5)} color={getColor(3, 5)} stroke={stroke(3, 5)} strokeWidth={getStrokeWidth(3, 5)} data-led-index={getLEDIndex(3, 5)} data-key-index={keyIndex(3, 5)} data-layer={layer} d="M367.785 206.575c0-2.883 2.373-5.256 5.256-5.256h40.852c2.884 0 5.256 2.373 5.256 5.256v40.852c0 2.883-2.372 5.256-5.256 5.256h-40.852c-2.883 0-5.256-2.373-5.256-5.256v-40.852z"/>
        <path onClick={onClick} className="key" id="R3C4_keyshape" fill={getColor(3, 4)} color={getColor(3, 4)} stroke={stroke(3, 4)} strokeWidth={getStrokeWidth(3, 4)} data-led-index={getLEDIndex(3, 4)} data-key-index={keyIndex(3, 4)} data-layer={layer} d="M308.726 206.575c0-2.883 2.373-5.256 5.256-5.256h40.852c2.884 0 5.256 2.373 5.256 5.256v40.852c0 2.883-2.372 5.256-5.256 5.256h-40.852c-2.883 0-5.256-2.373-5.256-5.256v-40.852z"/>
        <path onClick={onClick} className="key" id="R3C3_keyshape" fill={getColor(3, 3)} color={getColor(3, 3)} stroke={stroke(3, 3)} strokeWidth={getStrokeWidth(3, 3)} data-led-index={getLEDIndex(3, 3)} data-key-index={keyIndex(3, 3)} data-layer={layer} d="M249.668 206.575c0-2.883 2.373-5.256 5.256-5.256h40.852c2.884 0 5.256 2.373 5.256 5.256v40.852c0 2.883-2.372 5.256-5.256 5.256h-40.852c-2.883 0-5.256-2.373-5.256-5.256v-40.852z"/>
        <path onClick={onClick} className="key" id="R3C2_keyshape" fill={getColor(3, 2)} color={getColor(3, 2)} stroke={stroke(3, 2)} strokeWidth={getStrokeWidth(3, 2)} data-led-index={getLEDIndex(3, 2)} data-key-index={keyIndex(3, 2)} data-layer={layer} d="M190.61 206.575c0-2.883 2.373-5.256 5.256-5.256h40.852c2.884 0 5.256 2.373 5.256 5.256v40.852c0 2.883-2.372 5.256-5.256 5.256h-40.852c-2.883 0-5.256-2.373-5.256-5.256v-40.852z"/>
        <path onClick={onClick} className="key" id="R3C0_keyshape" fill={getColor(3, 0)} color={getColor(3, 0)} stroke={stroke(3, 0)} strokeWidth={getStrokeWidth(3, 0)} data-led-index={getLEDIndex(3, 0)} data-key-index={keyIndex(3, 0)} data-layer={layer} d="M60.552 206.576a5.257 5.257 0 0 1 5.256-5.257H177.66a5.257 5.257 0 0 1 5.256 5.257v40.851a5.257 5.257 0 0 1-5.256 5.257H65.808a5.257 5.257 0 0 1-5.256-5.257v-40.851z"/>
        <path onClick={onClick} className="key" id="R2C15_keyshape" fill={getColor(1, 15)} color={getColor(1, 15)} stroke={stroke(1, 15)} strokeWidth={getStrokeWidth(1, 15)} data-led-index={getLEDIndex(1, 15)} data-key-index={keyIndex(1, 15)} data-layer={layer} d="M844.256 146.975a5.257 5.257 0 0 1 5.257-5.257h112.909a5.257 5.257 0 0 1 5.257 5.257v40.851a5.257 5.257 0 0 1-5.257 5.257H849.513a5.257 5.257 0 0 1-5.257-5.257v-40.851z"/>
        <path onClick={onClick} className="key" id="R2C14_keyshape" fill={getColor(2, 14)} color={getColor(2, 14)} stroke={stroke(2, 14)} strokeWidth={getStrokeWidth(2, 14)} data-led-index={getLEDIndex(2, 14)} data-key-index={keyIndex(2, 14)} data-layer={layer} d="M785.197 146.975v-.001c0-2.883 2.373-5.256 5.256-5.256h40.852c2.884 0 5.256 2.373 5.256 5.256v40.852c0 2.883-2.372 5.256-5.256 5.256h-40.852c-2.883 0-5.256-2.373-5.256-5.256v-40.851z"/>
        <path onClick={onClick} className="key" id="R2C13_keyshape" fill={getColor(2, 13)} color={getColor(2, 13)} stroke={stroke(2, 13)} strokeWidth={getStrokeWidth(2, 13)} data-led-index={getLEDIndex(2, 13)} data-key-index={keyIndex(2, 13)} data-layer={layer} d="M726.137 146.975v-.001c0-2.883 2.373-5.256 5.256-5.256h40.852c2.884 0 5.256 2.373 5.256 5.256v40.852c0 2.883-2.372 5.256-5.256 5.256h-40.853c-2.883 0-5.256-2.373-5.256-5.256v-40.851h.001z"/>
        <path onClick={onClick} className="key" id="R2C12_keyshape" fill={getColor(2, 12)} color={getColor(2, 12)} stroke={stroke(2, 12)} strokeWidth={getStrokeWidth(2, 12)} data-led-index={getLEDIndex(2, 12)} data-key-index={keyIndex(2, 12)} data-layer={layer} d="M667.077 146.975v-.001c0-2.883 2.373-5.256 5.256-5.256h40.852c2.884 0 5.256 2.373 5.256 5.256v40.852c0 2.883-2.372 5.256-5.256 5.256h-40.852c-2.883 0-5.256-2.373-5.256-5.256v-40.851z"/>
        <path onClick={onClick} className="key" id="R2C11_keyshape" fill={getColor(2, 11)} color={getColor(2, 11)} stroke={stroke(2, 11)} strokeWidth={getStrokeWidth(2, 11)} data-led-index={getLEDIndex(2, 11)} data-key-index={keyIndex(2, 11)} data-layer={layer} d="M608.017 146.975v-.001c0-2.883 2.373-5.256 5.256-5.256h40.852c2.884 0 5.256 2.373 5.256 5.256v40.852c0 2.883-2.372 5.256-5.256 5.256h-40.852c-2.883 0-5.256-2.373-5.256-5.256v-40.851z"/>
        <path onClick={onClick} className="key" id="R2C10_keyshape" fill={getColor(2, 10)} color={getColor(2, 10)} stroke={stroke(2, 10)} strokeWidth={getStrokeWidth(2, 10)} data-led-index={getLEDIndex(2, 10)} data-key-index={keyIndex(2, 10)} data-layer={layer} d="M548.957 146.975v-.001c0-2.883 2.373-5.256 5.256-5.256h40.852c2.884 0 5.256 2.373 5.256 5.256v40.852c0 2.883-2.372 5.256-5.256 5.256h-40.852c-2.883 0-5.256-2.373-5.256-5.256v-40.851z"/>
        <path onClick={onClick} className="key" id="R2C9_keyshape" fill={getColor(2, 9)} color={getColor(2, 9)} stroke={stroke(2, 9)} strokeWidth={getStrokeWidth(2, 9)} data-led-index={getLEDIndex(2, 9)} data-key-index={keyIndex(2, 9)} data-layer={layer} d="M489.901 146.975v-.001c0-2.883 2.373-5.256 5.256-5.256h40.852c2.884 0 5.256 2.373 5.256 5.256v40.852c0 2.883-2.372 5.256-5.256 5.256h-40.852c-2.883 0-5.256-2.373-5.256-5.256v-40.851z"/>
        <path onClick={onClick} className="key" id="R2C5_keyshape" fill={getColor(2, 5)} color={getColor(2, 5)} stroke={stroke(2, 5)} strokeWidth={getStrokeWidth(2, 5)} data-led-index={getLEDIndex(2, 5)} data-key-index={keyIndex(2, 5)} data-layer={layer} d="M400.843 146.975v-.001c0-2.883 2.373-5.256 5.256-5.256h40.852c2.884 0 5.256 2.373 5.256 5.256v40.852c0 2.883-2.372 5.256-5.256 5.256h-40.852c-2.883 0-5.256-2.373-5.256-5.256v-40.851z"/>
        <path onClick={onClick} className="key" id="R2C4_keyshape" fill={getColor(2, 4)} color={getColor(2, 4)} stroke={stroke(2, 4)} strokeWidth={getStrokeWidth(2, 4)} data-led-index={getLEDIndex(2, 4)} data-key-index={keyIndex(2, 4)} data-layer={layer} d="M341.785 146.975v-.001c0-2.883 2.373-5.256 5.256-5.256h40.852c2.884 0 5.256 2.373 5.256 5.256v40.852c0 2.883-2.372 5.256-5.256 5.256h-40.852c-2.883 0-5.256-2.373-5.256-5.256v-40.851z"/>
        <path onClick={onClick} className="key" id="R2C3_keyshape" fill={getColor(2, 3)} color={getColor(2, 3)} stroke={stroke(2, 3)} strokeWidth={getStrokeWidth(2, 3)} data-led-index={getLEDIndex(2, 3)} data-key-index={keyIndex(2, 3)} data-layer={layer} d="M282.726 146.975v-.001c0-2.883 2.373-5.256 5.256-5.256h40.852c2.884 0 5.256 2.373 5.256 5.256v40.852c0 2.883-2.372 5.256-5.256 5.256h-40.852c-2.883 0-5.256-2.373-5.256-5.256v-40.851z"/>
        <path onClick={onClick} className="key" id="R2C2_keyshape" fill={getColor(2, 2)} color={getColor(2, 2)} stroke={stroke(2, 2)} strokeWidth={getStrokeWidth(2, 2)} data-led-index={getLEDIndex(2, 2)} data-key-index={keyIndex(2, 2)} data-layer={layer} d="M223.668 146.975v-.001c0-2.883 2.373-5.256 5.256-5.256h40.852c2.884 0 5.256 2.373 5.256 5.256v40.852c0 2.883-2.372 5.256-5.256 5.256h-40.852c-2.883 0-5.256-2.373-5.256-5.256v-40.851z"/>
        <path onClick={onClick} className="key" id="R2C1_keyshape" fill={getColor(2, 1)} color={getColor(2, 1)} stroke={stroke(2, 1)} strokeWidth={getStrokeWidth(2, 1)} data-led-index={getLEDIndex(2, 1)} data-key-index={keyIndex(2, 1)} data-layer={layer} d="M164.61 146.975v-.001c0-2.883 2.373-5.256 5.256-5.256h40.852c2.884 0 5.256 2.373 5.256 5.256v40.852c0 2.883-2.372 5.256-5.256 5.256h-40.852c-2.883 0-5.256-2.373-5.256-5.256v-40.851z"/>
        <path onClick={onClick} className="key" id="R2C0_keyshape" fill={getColor(2, 0)} color={getColor(2, 0)} stroke={stroke(2, 0)} strokeWidth={getStrokeWidth(2, 0)} data-led-index={getLEDIndex(2, 0)} data-key-index={keyIndex(2, 0)} data-layer={layer} d="M60.552 146.975a5.257 5.257 0 0 1 5.257-5.257h85.85a5.257 5.257 0 0 1 5.257 5.257v40.851a5.257 5.257 0 0 1-5.257 5.257h-85.85a5.257 5.257 0 0 1-5.257-5.257v-40.851z"/>
        <path onClick={onClick} className="key" id="R1C15_keyshape" fill={getColor(2, 15)} color={getColor(2, 15)} stroke={stroke(2, 15)} strokeWidth={getStrokeWidth(2, 15)} data-led-index={getLEDIndex(2, 15)} data-key-index={keyIndex(2, 15)} data-layer={layer} d="M888.311 87.374a5.256 5.256 0 0 1 5.257-5.257h68.85a5.259 5.259 0 0 1 5.257 5.257v40.851a5.257 5.257 0 0 1-5.257 5.257h-68.85a5.256 5.256 0 0 1-5.257-5.257V87.374z"/>
        <path onClick={onClick} className="key" id="R1C14_keyshape" fill={getColor(1, 14)} color={getColor(1, 14)} stroke={stroke(1, 14)} strokeWidth={getStrokeWidth(1, 14)} data-led-index={getLEDIndex(1, 14)} data-key-index={keyIndex(1, 14)} data-layer={layer} d="M829.247 87.374v-.001c0-2.883 2.373-5.256 5.256-5.256h40.852c2.884 0 5.256 2.373 5.256 5.256v40.852c0 2.883-2.372 5.256-5.256 5.256h-40.852c-2.883 0-5.256-2.373-5.256-5.256V87.374z"/>
        <path onClick={onClick} className="key" id="R1C13_keyshape" fill={getColor(1, 13)} color={getColor(1, 13)} stroke={stroke(1, 13)} strokeWidth={getStrokeWidth(1, 13)} data-led-index={getLEDIndex(1, 13)} data-key-index={keyIndex(1, 13)} data-layer={layer} d="M770.197 87.374v-.001c0-2.883 2.373-5.256 5.256-5.256h40.852c2.884 0 5.256 2.373 5.256 5.256v40.852c0 2.883-2.372 5.256-5.256 5.256h-40.852c-2.883 0-5.256-2.373-5.256-5.256V87.374z"/>
        <path onClick={onClick} className="key" id="R1C12_keyshape" fill={getColor(1, 12)} color={getColor(1, 12)} stroke={stroke(1, 12)} strokeWidth={getStrokeWidth(1, 12)} data-led-index={getLEDIndex(1, 12)} data-key-index={keyIndex(1, 12)} data-layer={layer} d="M711.137 87.374v-.001c0-2.883 2.373-5.256 5.256-5.256h40.852c2.884 0 5.256 2.373 5.256 5.256v40.852c0 2.883-2.372 5.256-5.256 5.256h-40.853c-2.883 0-5.256-2.373-5.256-5.256V87.374h.001z"/>
        <path onClick={onClick} className="key" id="R1C11_keyshape" fill={getColor(1, 11)} color={getColor(1, 11)} stroke={stroke(1, 11)} strokeWidth={getStrokeWidth(1, 11)} data-led-index={getLEDIndex(1, 11)} data-key-index={keyIndex(1, 11)} data-layer={layer} d="M652.077 87.374v-.001c0-2.883 2.373-5.256 5.256-5.256h40.852c2.884 0 5.256 2.373 5.256 5.256v40.852c0 2.883-2.372 5.256-5.256 5.256h-40.852c-2.883 0-5.256-2.373-5.256-5.256V87.374z"/>
        <path onClick={onClick} className="key" id="R1C10_keyshape" fill={getColor(1, 10)} color={getColor(1, 10)} stroke={stroke(1, 10)} strokeWidth={getStrokeWidth(1, 10)} data-led-index={getLEDIndex(1, 10)} data-key-index={keyIndex(1, 10)} data-layer={layer} d="M593.017 87.374v-.001c0-2.883 2.373-5.256 5.256-5.256h40.852c2.884 0 5.256 2.373 5.256 5.256v40.852c0 2.883-2.372 5.256-5.256 5.256h-40.852c-2.883 0-5.256-2.373-5.256-5.256V87.374z"/>
        <path onClick={onClick} className="key" id="R1C9_keyshape" fill={getColor(1, 9)} color={getColor(1, 9)} stroke={stroke(1, 9)} strokeWidth={getStrokeWidth(1, 9)} data-led-index={getLEDIndex(1, 9)} data-key-index={keyIndex(1, 9)} data-layer={layer} d="M533.959 87.374v-.001c0-2.883 2.373-5.256 5.256-5.256h40.852c2.884 0 5.256 2.373 5.256 5.256v40.852c0 2.883-2.372 5.256-5.256 5.256h-40.852c-2.883 0-5.256-2.373-5.256-5.256V87.374z"/>
        <path onClick={onClick} className="key" id="R1C8_keyshape" fill={getColor(1, 8)} color={getColor(1, 8)} stroke={stroke(1, 8)} strokeWidth={getStrokeWidth(1, 8)} data-led-index={getLEDIndex(1, 8)} data-key-index={keyIndex(1, 8)} data-layer={layer} d="M474.901 87.374v-.001c0-2.883 2.373-5.256 5.256-5.256h40.852c2.884 0 5.256 2.373 5.256 5.256v40.852c0 2.883-2.372 5.256-5.256 5.256h-40.852c-2.883 0-5.256-2.373-5.256-5.256V87.374z"/>
        <path onClick={onClick} className="key" id="R1C5_keyshape" fill={getColor(1, 5)} color={getColor(1, 5)} stroke={stroke(1, 5)} strokeWidth={getStrokeWidth(1, 5)} data-led-index={getLEDIndex(1, 5)} data-key-index={keyIndex(1, 5)} data-layer={layer} d="M385.843 87.374v-.001c0-2.883 2.373-5.256 5.256-5.256h40.852c2.884 0 5.256 2.373 5.256 5.256v40.852c0 2.883-2.372 5.256-5.256 5.256h-40.852c-2.883 0-5.256-2.373-5.256-5.256V87.374z"/>
        <path onClick={onClick} className="key" id="R1C4_keyshape" fill={getColor(1, 4)} color={getColor(1, 4)} stroke={stroke(1, 4)} strokeWidth={getStrokeWidth(1, 4)} data-led-index={getLEDIndex(1, 4)} data-key-index={keyIndex(1, 4)} data-layer={layer} d="M326.785 87.374v-.001c0-2.883 2.373-5.256 5.256-5.256h40.852c2.884 0 5.256 2.373 5.256 5.256v40.852c0 2.883-2.372 5.256-5.256 5.256h-40.852c-2.883 0-5.256-2.373-5.256-5.256V87.374z"/>
        <path onClick={onClick} className="key" id="R1C3_keyshape" fill={getColor(1, 3)} color={getColor(1, 3)} stroke={stroke(1, 3)} strokeWidth={getStrokeWidth(1, 3)} data-led-index={getLEDIndex(1, 3)} data-key-index={keyIndex(1, 3)} data-layer={layer} d="M267.726 87.374v-.001c0-2.883 2.373-5.256 5.256-5.256h40.852c2.884 0 5.256 2.373 5.256 5.256v40.852c0 2.883-2.372 5.256-5.256 5.256h-40.852c-2.883 0-5.256-2.373-5.256-5.256V87.374z"/>
        <path onClick={onClick} className="key" id="R1C2_keyshape" fill={getColor(1, 2)} color={getColor(1, 2)} stroke={stroke(1, 2)} strokeWidth={getStrokeWidth(1, 2)} data-led-index={getLEDIndex(1, 2)} data-key-index={keyIndex(1, 2)} data-layer={layer} d="M208.668 87.374v-.001c0-2.883 2.373-5.256 5.256-5.256h40.852c2.884 0 5.256 2.373 5.256 5.256v40.852c0 2.883-2.372 5.256-5.256 5.256h-40.852c-2.883 0-5.256-2.373-5.256-5.256V87.374z"/>
        <path onClick={onClick} className="key" id="R1C1_keyshape" fill={getColor(1, 1)} color={getColor(1, 1)} stroke={stroke(1, 1)} strokeWidth={getStrokeWidth(1, 1)} data-led-index={getLEDIndex(1, 1)} data-key-index={keyIndex(1, 1)} data-layer={layer} d="M149.61 87.374v-.001c0-2.883 2.373-5.256 5.256-5.256h40.852c2.884 0 5.256 2.373 5.256 5.256v40.852c0 2.883-2.372 5.256-5.256 5.256h-40.852c-2.883 0-5.256-2.373-5.256-5.256V87.374z"/>
        <path onClick={onClick} className="key" id="R1C0_keyshape" fill={getColor(1, 0)} color={getColor(1, 0)} stroke={stroke(1, 0)} strokeWidth={getStrokeWidth(1, 0)} data-led-index={getLEDIndex(1, 0)} data-key-index={keyIndex(1, 0)} data-layer={layer} d="M60.552 87.374a5.257 5.257 0 0 1 5.256-5.257h70.851a5.257 5.257 0 0 1 5.257 5.257v40.851a5.257 5.257 0 0 1-5.257 5.257H65.808a5.257 5.257 0 0 1-5.256-5.257V87.374z"/>
        <path onClick={onClick} className="key" id="R0C15_keyshape" fill={getColor(0, 15)} color={getColor(0, 15)} stroke={stroke(0, 15)} strokeWidth={getStrokeWidth(0, 15)} data-led-index={getLEDIndex(0, 15)} data-key-index={keyIndex(0, 15)} data-layer={layer} d="M858.309 27.773a5.257 5.257 0 0 1 5.257-5.257h98.85a5.257 5.257 0 0 1 5.257 5.257v40.851a5.257 5.257 0 0 1-5.257 5.257h-98.85a5.257 5.257 0 0 1-5.257-5.257V27.773z"/>
        <path onClick={onClick} className="key" id="R0C14_keyshape" fill={getColor(0, 14)} color={getColor(0, 14)} stroke={stroke(0, 14)} strokeWidth={getStrokeWidth(0, 14)} data-led-index={getLEDIndex(0, 14)} data-key-index={keyIndex(0, 14)} data-layer={layer} d="M799.247 27.773v-.001c0-2.883 2.373-5.256 5.256-5.256h40.852c2.884 0 5.256 2.373 5.256 5.256v40.852c0 2.883-2.372 5.256-5.256 5.256h-40.852c-2.883 0-5.256-2.373-5.256-5.256V27.773z"/>
        <path onClick={onClick} className="key" id="R0C13_keyshape" fill={getColor(0, 13)} color={getColor(0, 13)} stroke={stroke(0, 13)} strokeWidth={getStrokeWidth(0, 13)} data-led-index={getLEDIndex(0, 13)} data-key-index={keyIndex(0, 13)} data-layer={layer} d="M740.197 27.773v-.001c0-2.883 2.373-5.256 5.256-5.256h40.852c2.884 0 5.256 2.373 5.256 5.256v40.852c0 2.883-2.372 5.256-5.256 5.256h-40.852c-2.883 0-5.256-2.373-5.256-5.256V27.773z"/>
        <path onClick={onClick} className="key" id="R0C12_keyshape" fill={getColor(0, 12)} color={getColor(0, 12)} stroke={stroke(0, 12)} strokeWidth={getStrokeWidth(0, 12)} data-led-index={getLEDIndex(0, 12)} data-key-index={keyIndex(0, 12)} data-layer={layer} d="M681.137 27.773v-.001c0-2.883 2.373-5.256 5.256-5.256h40.852c2.884 0 5.256 2.373 5.256 5.256v40.852c0 2.883-2.372 5.256-5.256 5.256h-40.853c-2.883 0-5.256-2.373-5.256-5.256V27.773h.001z"/>
        <path onClick={onClick} className="key" id="R0C11_keyshape" fill={getColor(0, 11)} color={getColor(0, 11)} stroke={stroke(0, 11)} strokeWidth={getStrokeWidth(0, 11)} data-led-index={getLEDIndex(0, 11)} data-key-index={keyIndex(0, 11)} data-layer={layer} d="M622.077 27.773v-.001c0-2.883 2.373-5.256 5.256-5.256h40.852c2.884 0 5.256 2.373 5.256 5.256v40.852c0 2.883-2.372 5.256-5.256 5.256h-40.852c-2.883 0-5.256-2.373-5.256-5.256V27.773z"/>
        <path onClick={onClick} className="key" id="R0C10_keyshape" fill={getColor(0, 10)} color={getColor(0, 10)} stroke={stroke(0, 10)} strokeWidth={getStrokeWidth(0, 10)} data-led-index={getLEDIndex(0, 10)} data-key-index={keyIndex(0, 10)} data-layer={layer} d="M563.017 27.773v-.001c0-2.883 2.373-5.256 5.256-5.256h40.852c2.884 0 5.256 2.373 5.256 5.256v40.852c0 2.883-2.372 5.256-5.256 5.256h-40.852c-2.883 0-5.256-2.373-5.256-5.256V27.773z"/>
        <path onClick={onClick} className="key" id="R0C9_keyshape" fill={getColor(0, 9)} color={getColor(0, 9)} stroke={stroke(0, 9)} strokeWidth={getStrokeWidth(0, 9)} data-led-index={getLEDIndex(0, 9)} data-key-index={keyIndex(0, 9)} data-layer={layer} d="M503.959 27.773v-.001c0-2.883 2.373-5.256 5.256-5.256h40.852c2.884 0 5.256 2.373 5.256 5.256v40.852c0 2.883-2.372 5.256-5.256 5.256h-40.852c-2.883 0-5.256-2.373-5.256-5.256V27.773z"/>
        <path onClick={onClick} className="key" id="R0C6_keyshape" fill={getColor(0, 6)} color={getColor(0, 6)} stroke={stroke(0, 6)} strokeWidth={getStrokeWidth(0, 6)} data-led-index={getLEDIndex(0, 6)} data-key-index={keyIndex(0, 6)} data-layer={layer} d="M414.901 27.773v-.001c0-2.883 2.373-5.256 5.256-5.256h40.852c2.884 0 5.256 2.373 5.256 5.256v40.852c0 2.883-2.372 5.256-5.256 5.256h-40.852c-2.883 0-5.256-2.373-5.256-5.256V27.773z"/>
        <path onClick={onClick} className="key" id="R0C5_keyshape" fill={getColor(0, 5)} color={getColor(0, 5)} stroke={stroke(0, 5)} strokeWidth={getStrokeWidth(0, 5)} data-led-index={getLEDIndex(0, 5)} data-key-index={keyIndex(0, 5)} data-layer={layer} d="M355.843 27.773v-.001c0-2.883 2.373-5.256 5.256-5.256h40.852c2.884 0 5.256 2.373 5.256 5.256v40.852c0 2.883-2.372 5.256-5.256 5.256h-40.852c-2.883 0-5.256-2.373-5.256-5.256V27.773z"/>
        <path onClick={onClick} className="key" id="R0C4_keyshape" fill={getColor(0, 4)} color={getColor(0, 4)} stroke={stroke(0, 4)} strokeWidth={getStrokeWidth(0, 4)} data-led-index={getLEDIndex(0, 4)} data-key-index={keyIndex(0, 4)} data-layer={layer} d="M296.785 27.773v-.001c0-2.883 2.373-5.256 5.256-5.256h40.852c2.884 0 5.256 2.373 5.256 5.256v40.852c0 2.883-2.372 5.256-5.256 5.256h-40.852c-2.883 0-5.256-2.373-5.256-5.256V27.773z"/>
        <path onClick={onClick} className="key" id="R0C3_keyshape" fill={getColor(0, 3)} color={getColor(0, 3)} stroke={stroke(0, 3)} strokeWidth={getStrokeWidth(0, 3)} data-led-index={getLEDIndex(0, 3)} data-key-index={keyIndex(0, 3)} data-layer={layer} d="M237.726 27.773v-.001c0-2.883 2.373-5.256 5.256-5.256h40.852c2.884 0 5.256 2.373 5.256 5.256v40.852c0 2.883-2.372 5.256-5.256 5.256h-40.852c-2.883 0-5.256-2.373-5.256-5.256V27.773z"/>
        <path onClick={onClick} className="key" id="R0C2_keyshape" fill={getColor(0, 2)} color={getColor(0, 2)} stroke={stroke(0, 2)} strokeWidth={getStrokeWidth(0, 2)} data-led-index={getLEDIndex(0, 2)} data-key-index={keyIndex(0, 2)} data-layer={layer} d="M178.668 27.773v-.001c0-2.883 2.373-5.256 5.256-5.256h40.852c2.884 0 5.256 2.373 5.256 5.256v40.852c0 2.883-2.372 5.256-5.256 5.256h-40.852c-2.883 0-5.256-2.373-5.256-5.256V27.773z"/>
        <path onClick={onClick} className="key" id="R0C1_keyshape" fill={getColor(0, 1)} color={getColor(0, 1)} stroke={stroke(0, 1)} strokeWidth={getStrokeWidth(0, 1)} data-led-index={getLEDIndex(0, 1)} data-key-index={keyIndex(0, 1)} data-layer={layer} d="M119.61 27.773v-.001c0-2.883 2.373-5.256 5.256-5.256h40.852c2.884 0 5.256 2.373 5.256 5.256v40.852c0 2.883-2.372 5.256-5.256 5.256h-40.852c-2.883 0-5.256-2.373-5.256-5.256V27.773z"/>
        <path onClick={onClick} className="key" id="R0C0_keyshape" fill={getColor(0, 0)} color={getColor(0, 0)} stroke={stroke(0, 0)} strokeWidth={getStrokeWidth(0, 0)} data-led-index={getLEDIndex(0, 0)} data-key-index={keyIndex(0, 0)} data-layer={layer} d="M60.551 27.773v-.001c0-2.883 2.373-5.256 5.256-5.256h40.852c2.884 0 5.256 2.373 5.256 5.256v40.852c0 2.883-2.372 5.256-5.256 5.256H65.807c-2.883 0-5.256-2.373-5.256-5.256V27.773z"/>
    </g>
    <g id="labels" pointerEvents="none">
        <text fill={getContrastText(getColor(4, 9))} id="R4C9_t_primary" x="569.925" y="350.018">{getLabel(4, 9).label}</text>
        <text fill={getContrastText(getColor(4, 9))} id="R4C9_t_extra" x="569.925" y="335.999">{getLabel(4, 9).extraLabel}</text>
        <text fill={getContrastText(getColor(4, 8))} id="R4C8_t_primary" x="510.613" y="350.018">{getLabel(4, 8).label}</text>
        <text fill={getContrastText(getColor(4, 8))} id="R4C8_t_extra" x="510.613" y="335.999">{getLabel(4, 8).extraLabel}</text>
        <text fill={getContrastText(getColor(4, 7))} id="R4C7_t_primary" x="420.585" y="350.018">{getLabel(4, 7).label}</text>
        <text fill={getContrastText(getColor(4, 7))} id="R4C7_t_extra" x="420.585" y="335.999">{getLabel(4, 7).extraLabel}</text>
        <text fill={getContrastText(getColor(4, 6))} id="R4C6_t_primary" x="361.272" y="350.018">{getLabel(4, 6).label}</text>
        <text fill={getContrastText(getColor(4, 6))} id="R4C6_t_extra" x="361.272" y="335.999">{getLabel(4, 6).extraLabel}</text>
        <text fill={getContrastText(getColor(4, 15))} id="R4C15_t_primary" x="908.553" y="290.539">{getLabel(4, 15).label}</text>
        <text fill={getContrastText(getColor(4, 15))} id="R4C15_t_extra" x="908.553" y="276.52">{getLabel(4, 15).extraLabel}</text>
        <text fill={getContrastText(getColor(4, 14))} id="R4C14_t_primary" x="848.523" y="290.539">{getLabel(4, 14).label}</text>
        <text fill={getContrastText(getColor(4, 14))} id="R4C14_t_extra" x="848.523" y="276.52">{getLabel(4, 14).extraLabel}</text>
        <text fill={getContrastText(getColor(4, 13))} id="R4C13_t_primary" x="773.493" y="290.539">{getLabel(4, 13).label}</text>
        <text fill={getContrastText(getColor(4, 13))} id="R4C13_t_extra" x="773.493" y="276.52">{getLabel(4, 13).extraLabel}</text>
        <text fill={getContrastText(getColor(4, 12))} id="R4C12_t_primary" x="698.473" y="290.539">{getLabel(4, 12).label}</text>
        <text fill={getContrastText(getColor(4, 12))} id="R4C12_t_extra" x="698.473" y="276.52">{getLabel(4, 12).extraLabel}</text>
        <text fill={getContrastText(getColor(4, 11))} id="R4C11_t_primary" x="613.543" y="290.539">{getLabel(4, 11).label}</text>
        <text fill={getContrastText(getColor(4, 11))} id="R4C11_t_extra" x="613.543" y="276.52">{getLabel(4, 11).extraLabel}</text>
        <text fill={getContrastText(getColor(4, 10))} id="R4C10_t_primary" x="510.613" y="290.539">{getLabel(4, 10).label}</text>
        <text fill={getContrastText(getColor(4, 10))} id="R4C10_t_extra" x="510.613" y="276.52">{getLabel(4, 10).extraLabel}</text>
        <text fill={getContrastText(getColor(4, 4))} id="R4C4_t_primary" x="377.684" y="290.539">{getLabel(4, 4).label}</text>
        <text fill={getContrastText(getColor(4, 4))} id="R4C4_t_extra" x="377.684" y="276.52">{getLabel(4, 4).extraLabel}</text>
        <text fill={getContrastText(getColor(4, 3))} id="R4C3_t_primary" x="292.756" y="290.539">{getLabel(4, 3).label}</text>
        <text fill={getContrastText(getColor(4, 3))} id="R4C3_t_extra" x="292.756" y="276.52">{getLabel(4, 3).extraLabel}</text>
        <text fill={getContrastText(getColor(4, 2))} id="R4C2_t_primary" x="217.728" y="290.539">{getLabel(4, 2).label}</text>
        <text fill={getContrastText(getColor(4, 2))} id="R4C2_t_extra" x="217.728" y="276.52">{getLabel(4, 2).extraLabel}</text>
        <text fill={getContrastText(getColor(4, 1))} id="R4C1_t_primary" x="142.701" y="290.539">{getLabel(4, 1).label}</text>
        <text fill={getContrastText(getColor(4, 1))} id="R4C1_t_extra" x="142.701" y="276.52">{getLabel(4, 1).extraLabel}</text>
        <text fill={getContrastText(getColor(4, 0))} id="R4C0_t_primary" x="67.673" y="290.539">{getLabel(4, 0).label}</text>
        <text fill={getContrastText(getColor(4, 0))} id="R4C0_t_extra" x="67.673" y="276.52">{getLabel(4, 0).extraLabel}</text>
        <text fill={getContrastText(getColor(3, 15))} id="R3C15_t_primary" x="818.334" y="230.984">{getLabel(3, 15).label}</text>
        <text fill={getContrastText(getColor(3, 15))} id="R3C15_t_extra" x="818.335" y="216.939">{getLabel(3, 15).extraLabel}</text>
        <text fill={getContrastText(getColor(3, 14))} id="R3C14_t_primary" x="759.274" y="230.984">{getLabel(3, 14).label}</text>
        <text fill={getContrastText(getColor(3, 14))} id="R3C14_t_extra" x="759.275" y="216.939">{getLabel(3, 14).extraLabel}</text>
        <text fill={getContrastText(getColor(3, 13))} id="R3C13_t_primary" x="700.214" y="230.984">{getLabel(3, 13).label}</text>
        <text fill={getContrastText(getColor(3, 13))} id="R3C13_t_extra" x="700.215" y="216.939">{getLabel(3, 13).extraLabel}</text>
        <text fill={getContrastText(getColor(3, 12))} id="R3C12_t_primary" x="641.154" y="230.984">{getLabel(3, 12).label}</text>
        <text fill={getContrastText(getColor(3, 12))} id="R3C12_t_extra" x="641.155" y="216.939">{getLabel(3, 12).extraLabel}</text>
        <text fill={getContrastText(getColor(3, 11))} id="R3C11_t_primary" x="582.098" y="230.984">{getLabel(3, 11).label}</text>
        <text fill={getContrastText(getColor(3, 11))} id="R3C11_t_extra" x="582.098" y="216.939">{getLabel(3, 11).extraLabel}</text>
        <text fill={getContrastText(getColor(3, 10))} id="R3C10_t_primary" x="523.04" y="230.984">{getLabel(3, 10).label}</text>
        <text fill={getContrastText(getColor(3, 10))} id="R3C10_t_extra" x="523.039" y="216.939">{getLabel(3, 10).extraLabel}</text>
        <text fill={getContrastText(getColor(3, 6))} id="R3C6_t_primary" x="433.981" y="230.984">{getLabel(3, 6).label}</text>
        <text fill={getContrastText(getColor(3, 6))} id="R3C6_t_extra" x="433.981" y="216.939">{getLabel(3, 6).extraLabel}</text>
        <text fill={getContrastText(getColor(3, 5))} id="R3C5_t_primary" x="374.923" y="230.984">{getLabel(3, 5).label}</text>
        <text fill={getContrastText(getColor(3, 5))} id="R3C5_t_extra" x="374.923" y="216.939">{getLabel(3, 5).extraLabel}</text>
        <text fill={getContrastText(getColor(3, 4))} id="R3C4_t_primary" x="315.865" y="230.984">{getLabel(3, 4).label}</text>
        <text fill={getContrastText(getColor(3, 4))} id="R3C4_t_extra" x="315.864" y="216.939">{getLabel(3, 4).extraLabel}</text>
        <text fill={getContrastText(getColor(3, 3))} id="R3C3_t_primary" x="256.806" y="230.984">{getLabel(3, 3).label}</text>
        <text fill={getContrastText(getColor(3, 3))} id="R3C3_t_extra" x="256.806" y="216.939">{getLabel(3, 3).extraLabel}</text>
        <text fill={getContrastText(getColor(3, 2))} id="R3C2_t_primary" x="197.748" y="230.984">{getLabel(3, 2).label}</text>
        <text fill={getContrastText(getColor(3, 2))} id="R3C2_t_extra" x="197.748" y="216.939">{getLabel(3, 2).extraLabel}</text>
        <text fill={getContrastText(getColor(3, 1))} id="R3C0_t_primary" x="67.69" y="230.984">{getLabel(3, 0).label}</text>
        <text fill={getContrastText(getColor(3, 1))} id="R3C0_t_extra" x="67.69" y="216.939">{getLabel(3, 0).extraLabel}</text>

        
        <text fill={getContrastText(getColor(2, 15))} id="R2C15_t_primary" x="851.394" y="171.383">{getLabel(1, 15).label}</text>
        <text fill={getContrastText(getColor(2, 15))} id="R2C15_t_extra" x="851.385" y="157.338">{getLabel(1, 15).extraLabel}</text>


        <text fill={getContrastText(getColor(2, 14))} id="R2C14_t_primary" x="792.334" y="171.383">{getLabel(2, 14).label}</text>
        <text fill={getContrastText(getColor(2, 14))} id="R2C14_t_extra" x="792.335" y="157.338">{getLabel(2, 14).extraLabel}</text>
        <text fill={getContrastText(getColor(2, 13))} id="R2C13_t_primary" x="733.274" y="171.383">{getLabel(2, 13).label}</text>
        <text fill={getContrastText(getColor(2, 13))} id="R2C13_t_extra" x="733.275" y="157.338">{getLabel(2, 13).extraLabel}</text>
        <text fill={getContrastText(getColor(2, 12))} id="R2C12_t_primary" x="674.214" y="171.383">{getLabel(2, 12).label}</text>
        <text fill={getContrastText(getColor(2, 12))} id="R2C12_t_extra" x="674.215" y="157.338">{getLabel(2, 12).extraLabel}</text>
        <text fill={getContrastText(getColor(2, 11))} id="R2C11_t_primary" x="615.154" y="171.383">{getLabel(2, 11).label}</text>
        <text fill={getContrastText(getColor(2, 11))} id="R2C11_t_extra" x="615.155" y="157.338">{getLabel(2, 11).extraLabel}</text>
        <text fill={getContrastText(getColor(2, 10))} id="R2C10_t_primary" x="556.098" y="171.383">{getLabel(2, 10).label}</text>
        <text fill={getContrastText(getColor(2, 10))} id="R2C10_t_extra" x="556.098" y="157.338">{getLabel(2, 10).extraLabel}</text>
        <text fill={getContrastText(getColor(2, 9))} id="R2C9_t_primary" x="497.04" y="171.383">{getLabel(2, 9).label}</text>
        <text fill={getContrastText(getColor(2, 9))} id="R2C9_t_extra" x="497.039" y="157.338">{getLabel(2, 9).extraLabel}</text>
        <text fill={getContrastText(getColor(2, 5))} id="R2C5_t_primary" x="407.981" y="171.383">{getLabel(2, 5).label}</text>
        <text fill={getContrastText(getColor(2, 5))} id="R2C5_t_extra" x="407.981" y="157.338">{getLabel(2, 5).extraLabel}</text>
        <text fill={getContrastText(getColor(2, 4))} id="R2C4_t_primary" x="348.923" y="171.383">{getLabel(2, 4).label}</text>
        <text fill={getContrastText(getColor(2, 4))} id="R2C4_t_extra" x="348.923" y="157.338">{getLabel(2, 4).extraLabel}</text>
        <text fill={getContrastText(getColor(2, 3))} id="R2C3_t_primary" x="289.865" y="171.383">{getLabel(2, 3).label}</text>
        <text fill={getContrastText(getColor(2, 3))} id="R2C3_t_extra" x="289.864" y="157.338">{getLabel(2, 3).extraLabel}</text>
        <text fill={getContrastText(getColor(2, 2))} id="R2C2_t_primary" x="230.806" y="171.383">{getLabel(2, 2).label}</text>
        <text fill={getContrastText(getColor(2, 2))} id="R2C2_t_extra" x="230.806" y="157.338">{getLabel(2, 2).extraLabel}</text>
        <text fill={getContrastText(getColor(2, 1))} id="R2C1_t_primary" x="171.748" y="171.383">{getLabel(2, 1).label}</text>
        <text fill={getContrastText(getColor(2, 1))} id="R2C1_t_extra" x="171.748" y="157.338">{getLabel(2, 1).extraLabel}</text>
        <text fill={getContrastText(getColor(2, 0))} id="R2C0_t_primary" x="67.69" y="171.383">{getLabel(2, 0).label}</text>
        <text fill={getContrastText(getColor(2, 0))} id="R2C0_t_extra" x="67.69" y="157.338">{getLabel(2, 0).extraLabel}</text>


        <text fill={getContrastText(getColor(1, 15))} id="R1C15_t_primary" x="895.444" y="111.782">{getLabel(2, 15).label}</text>
        <text fill={getContrastText(getColor(1, 15))} id="R1C15_t_extra" x="895.445" y="97.737">{getLabel(2, 15).extraLabel}</text>
        
        <text fill={getContrastText(getColor(1, 14))} id="R1C14_t_primary" x="836.394" y="111.782">{getLabel(1, 14).label}</text>
        <text fill={getContrastText(getColor(1, 14))} id="R1C14_t_extra" x="836.385" y="97.737">{getLabel(1, 14).extraLabel}</text>
        <text fill={getContrastText(getColor(1, 13))} id="R1C13_t_primary" x="777.334" y="111.782">{getLabel(1, 13).label}</text>
        <text fill={getContrastText(getColor(1, 13))} id="R1C13_t_extra" x="777.335" y="97.737">{getLabel(1, 13).extraLabel}</text>
        <text fill={getContrastText(getColor(1, 12))} id="R1C12_t_primary" x="718.274" y="111.782">{getLabel(1, 12).label}</text>
        <text fill={getContrastText(getColor(1, 12))} id="R1C12_t_extra" x="718.275" y="97.737">{getLabel(1, 12).extraLabel}</text>
        <text fill={getContrastText(getColor(1, 11))} id="R1C11_t_primary" x="659.214" y="111.782">{getLabel(1, 11).label}</text>
        <text fill={getContrastText(getColor(1, 11))} id="R1C11_t_extra" x="659.215" y="97.737">{getLabel(1, 11).extraLabel}</text>
        <text fill={getContrastText(getColor(1, 10))} id="R1C10_t_primary" x="600.156" y="111.782">{getLabel(1, 10).label}</text>
        <text fill={getContrastText(getColor(1, 10))} id="R1C10_t_extra" x="600.156" y="97.737">{getLabel(1, 10).extraLabel}</text>
        <text fill={getContrastText(getColor(1, 9))} id="R1C9_t_primary" x="541.098" y="111.782">{getLabel(1, 9).label}</text>
        <text fill={getContrastText(getColor(1, 9))} id="R1C9_t_extra" x="541.098" y="97.737">{getLabel(1, 9).extraLabel}</text>
        <text fill={getContrastText(getColor(1, 8))} id="R1C8_t_primary" x="482.04" y="111.782">{getLabel(1, 8).label}</text>
        <text fill={getContrastText(getColor(1, 8))} id="R1C8_t_extra" x="482.039" y="97.737">{getLabel(1, 8).extraLabel}</text>
        <text fill={getContrastText(getColor(1, 5))} id="R1C5_t_primary" x="392.981" y="111.782">{getLabel(1, 5).label}</text>
        <text fill={getContrastText(getColor(1, 5))} id="R1C5_t_extra" x="392.981" y="97.737">{getLabel(1, 5).extraLabel}</text>
        <text fill={getContrastText(getColor(1, 4))} id="R1C4_t_primary" x="333.923" y="111.782">{getLabel(1, 4).label}</text>
        <text fill={getContrastText(getColor(1, 4))} id="R1C4_t_extra" x="333.923" y="97.737">{getLabel(1, 4).extraLabel}</text>
        <text fill={getContrastText(getColor(1, 3))} id="R1C3_t_primary" x="274.865" y="111.782">{getLabel(1, 3).label}</text>
        <text fill={getContrastText(getColor(1, 3))} id="R1C3_t_extra" x="274.864" y="97.737">{getLabel(1, 3).extraLabel}</text>
        <text fill={getContrastText(getColor(1, 2))} id="R1C2_t_primary" x="215.806" y="111.782">{getLabel(1, 2).label}</text>
        <text fill={getContrastText(getColor(1, 2))} id="R1C2_t_extra" x="215.806" y="97.737">{getLabel(1, 2).extraLabel}</text>
        <text fill={getContrastText(getColor(1, 1))} id="R1C1_t_primary" x="156.748" y="111.782">{getLabel(1, 1).label}</text>
        <text fill={getContrastText(getColor(1, 1))} id="R1C1_t_extra" x="156.748" y="97.737">{getLabel(1, 1).extraLabel}</text>
        <text fill={getContrastText(getColor(1, 0))} id="R1C0_t_primary" x="67.69" y="111.782">{getLabel(1, 0).label}</text>
        <text fill={getContrastText(getColor(1, 0))} id="R1C0_t_extra" x="67.69" y="97.737">{getLabel(1, 0).extraLabel}</text>
        <text fill={getContrastText(getColor(0, 15))} id="R0C15_t_primary" x="865.444" y="52.182">{getLabel(0, 15).label}</text>
        <text fill={getContrastText(getColor(0, 15))} id="R0C15_t_extra" x="865.445" y="38.136">{getLabel(0, 15).extraLabel}</text>
        <text fill={getContrastText(getColor(0, 14))} id="R0C14_t_primary" x="806.394" y="52.182">{getLabel(0, 14).label}</text>
        <text fill={getContrastText(getColor(0, 14))} id="R0C14_t_extra" x="806.385" y="38.136">{getLabel(0, 14).extraLabel}</text>
        <text fill={getContrastText(getColor(0, 13))} id="R0C13_t_primary" x="747.334" y="52.182">{getLabel(0, 13).label}</text>
        <text fill={getContrastText(getColor(0, 13))} id="R0C13_t_extra" x="747.335" y="38.136">{getLabel(0, 13).extraLabel}</text>
        <text fill={getContrastText(getColor(0, 12))} id="R0C12_t_primary" x="688.274" y="52.182">{getLabel(0, 12).label}</text>
        <text fill={getContrastText(getColor(0, 12))} id="R0C12_t_extra" x="688.275" y="38.136">{getLabel(0, 12).extraLabel}</text>
        <text fill={getContrastText(getColor(0, 11))} id="R0C11_t_primary" x="629.214" y="52.182">{getLabel(0, 11).label}</text>
        <text fill={getContrastText(getColor(0, 11))} id="R0C11_t_extra" x="629.215" y="38.136">{getLabel(0, 11).extraLabel}</text>
        <text fill={getContrastText(getColor(0, 10))} id="R0C10_t_primary" x="570.156" y="52.182">{getLabel(0, 10).label}</text>
        <text fill={getContrastText(getColor(0, 10))} id="R0C10_t_extra" x="570.156" y="38.136">{getLabel(0, 10).extraLabel}</text>
        <text fill={getContrastText(getColor(0, 9))} id="R0C9_t_primary" x="511.098" y="52.182">{getLabel(0, 9).label}</text>
        <text fill={getContrastText(getColor(0, 9))} id="R0C9_t_extra" x="511.098" y="38.136">{getLabel(0, 9).extraLabel}</text>
        <text fill={getContrastText(getColor(0, 6))} id="R0C6_t_primary" x="422.04" y="52.182">{getLabel(0, 6).label}</text>
        <text fill={getContrastText(getColor(0, 6))} id="R0C6_t_extra" x="422.039" y="38.136">{getLabel(0, 6).extraLabel}</text>
        <text fill={getContrastText(getColor(0, 5))} id="R0C5_t_primary" x="362.981" y="52.182">{getLabel(0, 5).label}</text>
        <text fill={getContrastText(getColor(0, 5))} id="R0C5_t_extra" x="362.981" y="38.136">{getLabel(0, 5).extraLabel}</text>
        <text fill={getContrastText(getColor(0, 4))} id="R0C4_t_primary" x="303.923" y="52.182">{getLabel(0, 4).label}</text>
        <text fill={getContrastText(getColor(0, 4))} id="R0C4_t_extra" x="303.923" y="38.136">{getLabel(0, 4).extraLabel}</text>
        <text fill={getContrastText(getColor(0, 3))} id="R0C3_t_primary" x="244.865" y="52.182">{getLabel(0, 3).label}</text>
        <text fill={getContrastText(getColor(0, 3))} id="R0C3_t_extra" x="244.864" y="38.136">{getLabel(0, 3).extraLabel}</text>
        <text fill={getContrastText(getColor(0, 2))} id="R0C2_t_primary" x="185.806" y="52.182">{getLabel(0, 2).label}</text>
        <text fill={getContrastText(getColor(0, 2))} id="R0C2_t_extra" x="185.806" y="38.136">{getLabel(0, 2).extraLabel}</text>
        <text fill={getContrastText(getColor(0, 1))} id="R0C1_t_primary" x="126.748" y="52.182">{getLabel(0, 1).label}</text>
        <text fill={getContrastText(getColor(0, 1))} id="R0C1_t_extra" x="126.748" y="38.136">{getLabel(0, 1).extraLabel}</text>
        <text fill={getContrastText(getColor(0, 0))} id="R0C0_t_primary" x="67.69" y="52.182">{getLabel(0, 0).label}</text>
        <text fill={getContrastText(getColor(0, 0))} id="R0C0_t_extra" x="67.69" y="38.136">{getLabel(0, 0).extraLabel}</text>
    </g>
</svg>

    );
  }
}

export default KeymapANSI;