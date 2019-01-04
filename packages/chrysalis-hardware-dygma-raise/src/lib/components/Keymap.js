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

class Keymap extends React.Component {
  render() {
    const keymap = this.props.keymap || Array(80).fill().map(() => 0);

    let keyIndex = (row, col) => {
      return row * 16 + col;
    };
    let getLabel = (row, col) => {
      return keymap[keyIndex(row, col)];
    };
    let stroke = (row, col) => {
      return this.props.selectedKey == keyIndex(row, col) ? "#f3b3b3" : "#b3b3b3";
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
           viewBox="0 0 909 351"
           className="layer"
      >
        <g transform="translate(-525.807 -86.074)">
          <g id="keyshapes">
            <path onClick={onClick} className="key" id="R4C9_keyshape" fill="#fff" stroke={stroke(4, 9)} data-key-index={keyIndex(4, 9)} data-layer={layer} strokeWidth="1.501" d="M1115.242 393.004a5.258 5.258 0 0 0-4.302-8.279h-76.867a5.257 5.257 0 0 0-5.257 5.257v40.728a5.257 5.257 0 0 0 5.257 5.257h48.253a5.254 5.254 0 0 0 4.302-2.235l28.614-40.728z" />
            <path onClick={onClick} className="key" id="R4C8_keyshape" fill="#fff" stroke={stroke(4, 8)} data-key-index={keyIndex(4, 8)} data-layer={layer} strokeWidth="1.501" d="M969.498 389.982a5.257 5.257 0 0 1 5.257-5.257h40.728a5.257 5.257 0 0 1 5.257 5.257v40.728a5.257 5.257 0 0 1-5.257 5.257h-40.728a5.257 5.257 0 0 1-5.257-5.257v-40.728z"/>
            <path onClick={onClick} className="key" id="R4C7_keyshape" fill="#fff" stroke={stroke(4, 7)} data-key-index={keyIndex(4, 7)} data-layer={layer} strokeWidth="1.501" d="M879.471 389.982a5.257 5.257 0 0 1 5.257-5.257h40.728a5.257 5.257 0 0 1 5.257 5.257v40.728a5.257 5.257 0 0 1-5.257 5.257h-40.728a5.257 5.257 0 0 1-5.257-5.257v-40.728z"/>
            <path onClick={onClick} className="key" id="R4C6_keyshape" fill="#fff" stroke={stroke(4, 6)} data-key-index={keyIndex(4, 6)} data-layer={layer} strokeWidth="1.501" d="M784.974 393.004a5.258 5.258 0 0 1 4.302-8.279h76.867a5.257 5.257 0 0 1 5.257 5.257v40.728a5.257 5.257 0 0 1-5.257 5.257H817.89a5.254 5.254 0 0 1-4.302-2.235l-28.614-40.728z"/>
            <path onClick={onClick} className="key" id="R4C15_keyshape" fill="#fff" stroke={stroke(4, 15)} data-key-index={keyIndex(4, 15)} data-layer={layer} strokeWidth="1.8" d="M1.25 8.534c0-4.023 2.523-7.284 5.634-7.284h59.732c3.111 0 5.634 3.261 5.634 7.284v56.432c0 4.023-2.523 7.284-5.634 7.284H6.884c-3.111 0-5.634-3.261-5.634-7.284V8.534z" transform="matrix(.933 0 0 .72172 1366.27 324.343)"/>
            <path onClick={onClick} className="key" id="R4C14_keyshape" fill="#fff" stroke={stroke(4, 14)} data-key-index={keyIndex(4, 14)} data-layer={layer} strokeWidth="1.501" d="M1307.412 330.502a5.257 5.257 0 0 1 5.257-5.257h40.728a5.257 5.257 0 0 1 5.257 5.257v40.728a5.257 5.257 0 0 1-5.257 5.257h-40.728a5.257 5.257 0 0 1-5.257-5.257v-40.728z"/>
            <path onClick={onClick} className="key" id="R4C13_keyshape" fill="#fff" stroke={stroke(4, 13)} data-key-index={keyIndex(4, 13)} data-layer={layer} strokeWidth="1.8" d="M1.25 8.534c0-4.023 2.523-7.284 5.634-7.284h59.732c3.111 0 5.634 3.261 5.634 7.284v56.432c0 4.023-2.523 7.284-5.634 7.284H6.884c-3.111 0-5.634-3.261-5.634-7.284V8.534z" transform="matrix(.933 0 0 .72172 1231.22 324.343)"/>
            <path onClick={onClick} className="key" id="R4C12_keyshape" fill="#fff" stroke={stroke(4, 12)} data-key-index={keyIndex(4, 12)} data-layer={layer} strokeWidth="1.8" d="M1.25 8.534c0-4.023 2.523-7.284 5.634-7.284h59.732c3.111 0 5.634 3.261 5.634 7.284v56.432c0 4.023-2.523 7.284-5.634 7.284H6.884c-3.111 0-5.634-3.261-5.634-7.284V8.534z" transform="matrix(.933 0 0 .72172 1156.19 324.343)"/>
            <path onClick={onClick} className="key" id="R4C11_keyshape" fill="#fff" stroke={stroke(4, 11)} data-key-index={keyIndex(4, 11)} data-layer={layer} strokeWidth="1.64" d="M1.25 8.534c0-1.932.516-3.785 1.436-5.151.919-1.366 2.166-2.133 3.466-2.133h61.196c1.3 0 2.547.767 3.466 2.133.92 1.366 1.436 3.219 1.436 5.151v56.432c0 1.932-.516 3.785-1.436 5.151-.919 1.366-2.166 2.133-3.466 2.133H6.152c-1.3 0-2.547-.767-3.466-2.133-.92-1.366-1.436-3.219-1.436-5.151V8.534z" transform="matrix(1.07244 0 0 .72172 1071.09 324.343)"/>
            <path onClick={onClick} className="key" id="R4C10_keyshape" fill="#fff" stroke={stroke(4, 10)} data-key-index={keyIndex(4, 10)} data-layer={layer} strokeWidth="1.41" d="M1.25 8.534c0-1.932.418-3.785 1.161-5.151.744-1.366 1.752-2.133 2.804-2.133h63.07c1.052 0 2.06.767 2.804 2.133.743 1.366 1.161 3.219 1.161 5.151v56.432c0 1.932-.418 3.785-1.161 5.151-.744 1.366-1.752 2.133-2.804 2.133H5.215c-1.052 0-2.06-.767-2.804-2.133-.743-1.366-1.161-3.219-1.161-5.151V8.534z" transform="matrix(1.32596 0 0 .72172 967.841 324.343)"/>
            <path onClick={onClick} className="key" id="R4C4_keyshape" fill="#fff" stroke={stroke(4, 4)} data-key-index={keyIndex(4, 4)} data-layer={layer} strokeWidth="1.41" d="M1.25 8.534c0-1.932.418-3.785 1.161-5.151.744-1.366 1.752-2.133 2.804-2.133h63.07c1.052 0 2.06.767 2.804 2.133.743 1.366 1.161 3.219 1.161 5.151v56.432c0 1.932-.418 3.785-1.161 5.151-.744 1.366-1.752 2.133-2.804 2.133H5.215c-1.052 0-2.06-.767-2.804-2.133-.743-1.366-1.161-3.219-1.161-5.151V8.534z" transform="matrix(1.32596 0 0 .72172 834.913 324.343)"/>
            <path onClick={onClick} className="key" id="R4C3_keyshape" fill="#fff" stroke={stroke(4, 3)} data-key-index={keyIndex(4, 3)} data-layer={layer} strokeWidth="1.64" d="M1.25 8.534c0-1.932.516-3.785 1.436-5.151.919-1.366 2.166-2.133 3.466-2.133h61.196c1.3 0 2.547.767 3.466 2.133.92 1.366 1.436 3.219 1.436 5.151v56.432c0 1.932-.516 3.785-1.436 5.151-.919 1.366-2.166 2.133-3.466 2.133H6.152c-1.3 0-2.547-.767-3.466-2.133-.92-1.366-1.436-3.219-1.436-5.151V8.534z" transform="matrix(1.07244 0 0 .72172 750.301 324.343)"/>
            <path onClick={onClick} className="key" id="R4C2_keyshape" fill="#fff" stroke={stroke(4, 2)} data-key-index={keyIndex(4, 2)} data-layer={layer} strokeWidth="1.8" d="M1.25 8.534c0-4.023 2.523-7.284 5.634-7.284h59.732c3.111 0 5.634 3.261 5.634 7.284v56.432c0 4.023-2.523 7.284-5.634 7.284H6.884c-3.111 0-5.634-3.261-5.634-7.284V8.534z" transform="matrix(.933 0 0 .72172 675.448 324.343)"/>
            <path onClick={onClick} className="key" id="R4C1_keyshape" fill="#fff" stroke={stroke(4, 1)} data-key-index={keyIndex(4, 1)} data-layer={layer} strokeWidth="1.8" d="M1.25 8.534c0-4.023 2.523-7.284 5.634-7.284h59.732c3.111 0 5.634 3.261 5.634 7.284v56.432c0 4.023-2.523 7.284-5.634 7.284H6.884c-3.111 0-5.634-3.261-5.634-7.284V8.534z" transform="matrix(.933 0 0 .72172 600.42 324.343)"/>
            <path onClick={onClick} className="key" id="R4C0_keyshape" fill="#fff" stroke={stroke(4, 0)} data-key-index={keyIndex(4, 0)} data-layer={layer} strokeWidth="1.8" d="M1.25 8.534c0-4.023 2.523-7.284 5.634-7.284h59.732c3.111 0 5.634 3.261 5.634 7.284v56.432c0 4.023-2.523 7.284-5.634 7.284H6.884c-3.111 0-5.634-3.261-5.634-7.284V8.534z" transform="matrix(.933 0 0 .72172 525.392 324.343)"/>
            <path onClick={onClick} className="key" id="R3C15_keyshape" fill="#fff" stroke={stroke(3, 15)} data-key-index={keyIndex(3, 15)} data-layer={layer} strokeWidth=".94" d="M1.25 8.516c0-4.013 1.068-7.266 2.385-7.266h66.23c1.317 0 2.385 3.253 2.385 7.266v56.468c0 4.013-1.068 7.266-2.385 7.266H3.635c-1.317 0-2.385-3.253-2.385-7.266V8.516z" transform="matrix(2.20395 0 0 .72344 1274.44 264.74)"/>
            <path onClick={onClick} className="key" id="R3C14_keyshape" fill="#fff" stroke={stroke(3, 14)} data-key-index={keyIndex(3, 14)} data-layer={layer} strokeWidth="1.505" d="M1218.144 270.9a5.256 5.256 0 0 1 5.257-5.256h40.85a5.256 5.256 0 0 1 5.257 5.257v40.85a5.256 5.256 0 0 1-5.256 5.257H1223.4a5.256 5.256 0 0 1-5.257-5.256V270.9z"/>
            <path onClick={onClick} className="key" id="R3C13_keyshape" fill="#fff" stroke={stroke(3, 13)} data-key-index={keyIndex(3, 13)} data-layer={layer} strokeWidth="1.505" d="M1159.084 270.9a5.256 5.256 0 0 1 5.257-5.256h40.85a5.256 5.256 0 0 1 5.257 5.257v40.85a5.256 5.256 0 0 1-5.256 5.257h-40.851a5.256 5.256 0 0 1-5.257-5.256V270.9z"/>
            <path onClick={onClick} className="key" id="R3C12_keyshape" fill="#fff" stroke={stroke(3, 12)} data-key-index={keyIndex(3, 12)} data-layer={layer} strokeWidth="1.505" d="M1100.024 270.9a5.256 5.256 0 0 1 5.257-5.256h40.85a5.256 5.256 0 0 1 5.257 5.257v40.85a5.256 5.256 0 0 1-5.256 5.257h-40.851a5.256 5.256 0 0 1-5.257-5.256V270.9z"/>
            <path onClick={onClick} className="key" id="R3C11_keyshape" fill="#fff" stroke={stroke(3, 11)} data-key-index={keyIndex(3, 11)} data-layer={layer} strokeWidth="1.505" d="M1040.964 270.9a5.256 5.256 0 0 1 5.257-5.256h40.85a5.256 5.256 0 0 1 5.257 5.257v40.85a5.256 5.256 0 0 1-5.256 5.257h-40.851a5.256 5.256 0 0 1-5.257-5.256V270.9z"/>
            <path onClick={onClick} className="key" id="R3C10_keyshape" fill="#fff" stroke={stroke(3, 10)} data-key-index={keyIndex(3, 10)} data-layer={layer} strokeWidth="1.505" d="M981.908 270.9a5.256 5.256 0 0 1 5.257-5.256h40.85a5.256 5.256 0 0 1 5.257 5.257v40.85a5.256 5.256 0 0 1-5.256 5.257h-40.851a5.256 5.256 0 0 1-5.257-5.256V270.9z"/>
            <path onClick={onClick} className="key" id="R3C6_keyshape" fill="#fff" stroke={stroke(3, 6)} data-key-index={keyIndex(3, 6)} data-layer={layer} strokeWidth="1.505" d="M892.85 270.9a5.256 5.256 0 0 1 5.257-5.256h40.85a5.256 5.256 0 0 1 5.257 5.257v40.85a5.256 5.256 0 0 1-5.256 5.257h-40.851a5.256 5.256 0 0 1-5.257-5.256V270.9z"/>
            <path onClick={onClick} className="key" id="R3C5_keyshape" fill="#fff" stroke={stroke(3, 5)} data-key-index={keyIndex(3, 5)} data-layer={layer} strokeWidth="1.505" d="M833.792 270.9a5.256 5.256 0 0 1 5.257-5.256h40.85a5.256 5.256 0 0 1 5.257 5.257v40.85a5.256 5.256 0 0 1-5.256 5.257h-40.851a5.256 5.256 0 0 1-5.257-5.256V270.9z"/>
            <path onClick={onClick} className="key" id="R3C4_keyshape" fill="#fff" stroke={stroke(3, 4)} data-key-index={keyIndex(3, 4)} data-layer={layer} strokeWidth="1.505" d="M774.733 270.9a5.256 5.256 0 0 1 5.257-5.256h40.85a5.256 5.256 0 0 1 5.257 5.257v40.85a5.256 5.256 0 0 1-5.256 5.257H779.99a5.256 5.256 0 0 1-5.257-5.256V270.9z"/>
            <path onClick={onClick} className="key" id="R3C3_keyshape" fill="#fff" stroke={stroke(3, 3)} data-key-index={keyIndex(3, 3)} data-layer={layer} strokeWidth="1.505" d="M715.675 270.9a5.256 5.256 0 0 1 5.257-5.256h40.85a5.256 5.256 0 0 1 5.257 5.257v40.85a5.256 5.256 0 0 1-5.256 5.257h-40.851a5.256 5.256 0 0 1-5.257-5.256V270.9z"/>
            <path onClick={onClick} className="key" id="R3C2_keyshape" fill="#fff" stroke={stroke(3, 2)} data-key-index={keyIndex(3, 2)} data-layer={layer} strokeWidth="1.505" d="M656.617 270.9a5.256 5.256 0 0 1 5.257-5.256h40.85a5.256 5.256 0 0 1 5.257 5.257v40.85a5.256 5.256 0 0 1-5.256 5.257h-40.851a5.256 5.256 0 0 1-5.257-5.256V270.9z"/>
            <path onClick={onClick} className="key" id="R3C1_keyshape" fill="#fff" stroke={stroke(3, 1)} data-key-index={keyIndex(3, 1)} data-layer={layer} strokeWidth="1.13" d="M1.25 8.516c0-4.013 1.366-7.266 3.05-7.266h64.9c1.684 0 3.05 3.253 3.05 7.266v56.468c0 4.013-1.366 7.266-3.05 7.266H4.3c-1.684 0-3.05-3.253-3.05-7.266V8.516z" transform="matrix(1.72344 0 0 .72344 524.404 264.74)"/>
            <path onClick={onClick} className="key" id="R2C15_keyshape" fill="#fff" stroke={stroke(2, 15)} data-key-index={keyIndex(2, 15)} data-layer={layer} strokeWidth="1.13" d="M1.25 8.516c0-4.013 1.354-7.266 3.024-7.266h64.952c1.67 0 3.024 3.253 3.024 7.266v56.468c0 4.013-1.354 7.266-3.024 7.266H4.274c-1.67 0-3.024-3.253-3.024-7.266V8.516z" transform="matrix(1.73834 0 0 .72344 1308.09 205.139)"/>
            <path onClick={onClick} className="key" id="R2C14_keyshape" fill="#fff" stroke={stroke(2, 14)} data-key-index={keyIndex(2, 14)} data-layer={layer} strokeWidth="1.505" d="M1251.204 211.3a5.256 5.256 0 0 1 5.257-5.257h40.85a5.256 5.256 0 0 1 5.257 5.257v40.85a5.256 5.256 0 0 1-5.256 5.257h-40.851a5.256 5.256 0 0 1-5.257-5.256V211.3z"/>
            <path onClick={onClick} className="key" id="R2C13_keyshape" fill="#fff" stroke={stroke(2, 13)} data-key-index={keyIndex(2, 13)} data-layer={layer} strokeWidth="1.505" d="M1192.144 211.3a5.256 5.256 0 0 1 5.257-5.257h40.85a5.256 5.256 0 0 1 5.257 5.257v40.85a5.256 5.256 0 0 1-5.256 5.257H1197.4a5.256 5.256 0 0 1-5.257-5.256V211.3z"/>
            <path onClick={onClick} className="key" id="R2C12_keyshape" fill="#fff" stroke={stroke(2, 12)} data-key-index={keyIndex(2, 12)} data-layer={layer} strokeWidth="1.505" d="M1133.084 211.3a5.256 5.256 0 0 1 5.257-5.257h40.85a5.256 5.256 0 0 1 5.257 5.257v40.85a5.256 5.256 0 0 1-5.256 5.257h-40.851a5.256 5.256 0 0 1-5.257-5.256V211.3z"/>
            <path onClick={onClick} className="key" id="R2C11_keyshape" fill="#fff" stroke={stroke(2, 11)} data-key-index={keyIndex(2, 11)} data-layer={layer} strokeWidth="1.505" d="M1074.024 211.3a5.256 5.256 0 0 1 5.257-5.257h40.85a5.256 5.256 0 0 1 5.257 5.257v40.85a5.256 5.256 0 0 1-5.256 5.257h-40.851a5.256 5.256 0 0 1-5.257-5.256V211.3z"/>
            <path onClick={onClick} className="key" id="R2C10_keyshape" fill="#fff" stroke={stroke(2, 10)} data-key-index={keyIndex(2, 10)} data-layer={layer} strokeWidth="1.505" d="M1014.964 211.3a5.256 5.256 0 0 1 5.257-5.257h40.85a5.256 5.256 0 0 1 5.257 5.257v40.85a5.256 5.256 0 0 1-5.256 5.257h-40.851a5.256 5.256 0 0 1-5.257-5.256V211.3z"/>
            <path onClick={onClick} className="key" id="R2C9_keyshape" fill="#fff" stroke={stroke(2, 9)} data-key-index={keyIndex(2, 9)} data-layer={layer} strokeWidth="1.505" d="M955.908 211.3a5.256 5.256 0 0 1 5.257-5.257h40.85a5.256 5.256 0 0 1 5.257 5.257v40.85a5.256 5.256 0 0 1-5.256 5.257h-40.851a5.256 5.256 0 0 1-5.257-5.256V211.3z"/>
            <path onClick={onClick} className="key" id="R2C5_keyshape" fill="#fff" stroke={stroke(2, 5)} data-key-index={keyIndex(2, 5)} data-layer={layer} strokeWidth="1.505" d="M866.85 211.3a5.256 5.256 0 0 1 5.257-5.257h40.85a5.256 5.256 0 0 1 5.257 5.257v40.85a5.256 5.256 0 0 1-5.256 5.257h-40.851a5.256 5.256 0 0 1-5.257-5.256V211.3z"/>
            <path onClick={onClick} className="key" id="R2C4_keyshape" fill="#fff" stroke={stroke(2, 4)} data-key-index={keyIndex(2, 4)} data-layer={layer} strokeWidth="1.505" d="M807.792 211.3a5.256 5.256 0 0 1 5.257-5.257h40.85a5.256 5.256 0 0 1 5.257 5.257v40.85a5.256 5.256 0 0 1-5.256 5.257h-40.851a5.256 5.256 0 0 1-5.257-5.256V211.3z"/>
            <path onClick={onClick} className="key" id="R2C3_keyshape" fill="#fff" stroke={stroke(2, 3)} data-key-index={keyIndex(2, 3)} data-layer={layer} strokeWidth="1.505" d="M748.733 211.3a5.256 5.256 0 0 1 5.257-5.257h40.85a5.256 5.256 0 0 1 5.257 5.257v40.85a5.256 5.256 0 0 1-5.256 5.257H753.99a5.256 5.256 0 0 1-5.257-5.256V211.3z"/>
            <path onClick={onClick} className="key" id="R2C2_keyshape" fill="#fff" stroke={stroke(2, 2)} data-key-index={keyIndex(2, 2)} data-layer={layer} strokeWidth="1.505" d="M689.675 211.3a5.256 5.256 0 0 1 5.257-5.257h40.85a5.256 5.256 0 0 1 5.257 5.257v40.85a5.256 5.256 0 0 1-5.256 5.257h-40.851a5.256 5.256 0 0 1-5.257-5.256V211.3z"/>
            <path onClick={onClick} className="key" id="R2C1_keyshape" fill="#fff" stroke={stroke(2, 1)} data-key-index={keyIndex(2, 1)} data-layer={layer} strokeWidth="1.505" d="M630.617 211.3a5.256 5.256 0 0 1 5.257-5.257h40.85a5.256 5.256 0 0 1 5.257 5.257v40.85a5.256 5.256 0 0 1-5.256 5.257h-40.851a5.256 5.256 0 0 1-5.257-5.256V211.3z"/>
            <path onClick={onClick} className="key" id="R2C0_keyshape" fill="#fff" stroke={stroke(2, 0)} data-key-index={keyIndex(2, 0)} data-layer={layer} strokeWidth="1.38" d="M1.25 8.516c0-4.013 1.734-7.266 3.873-7.266h63.254c2.139 0 3.873 3.253 3.873 7.266v56.468c0 4.013-1.734 7.266-3.873 7.266H5.123c-2.139 0-3.873-3.253-3.873-7.266V8.516z" transform="matrix(1.35724 0 0 .72344 524.862 205.139)"/>
            <path onClick={onClick} className="key" id="R1C15_keyshape" fill="#fff" stroke={stroke(1, 15)} data-key-index={keyIndex(1, 15)} data-layer={layer} strokeWidth="1.59" d="M1.25 8.516c0-1.927.495-3.775 1.377-5.138.882-1.362 2.079-2.128 3.326-2.128h61.594c1.247 0 2.444.766 3.326 2.128.882 1.363 1.377 3.211 1.377 5.138v56.468c0 1.927-.495 3.775-1.377 5.138-.882 1.362-2.079 2.128-3.326 2.128H5.953c-1.247 0-2.444-.766-3.326-2.128-.882-1.363-1.377-3.211-1.377-5.138V8.516z" transform="matrix(1.1178 0 0 .72344 1352.92 145.538)"/>
            <path onClick={onClick} className="key" id="R1C14_keyshape" fill="#fff" stroke={stroke(1, 14)} data-key-index={keyIndex(1, 14)} data-layer={layer} strokeWidth="1.505" d="M1295.254 151.699a5.256 5.256 0 0 1 5.257-5.257h40.85a5.256 5.256 0 0 1 5.257 5.257v40.85a5.256 5.256 0 0 1-5.256 5.257h-40.851a5.256 5.256 0 0 1-5.257-5.256v-40.851z"/>
            <path onClick={onClick} className="key" id="R1C13_keyshape" fill="#fff" stroke={stroke(1, 13)} data-key-index={keyIndex(1, 13)} data-layer={layer} strokeWidth="1.505" d="M1236.204 151.699a5.256 5.256 0 0 1 5.257-5.257h40.85a5.256 5.256 0 0 1 5.257 5.257v40.85a5.256 5.256 0 0 1-5.256 5.257h-40.851a5.256 5.256 0 0 1-5.257-5.256v-40.851z"/>
            <path onClick={onClick} className="key" id="R1C12_keyshape" fill="#fff" stroke={stroke(1, 12)} data-key-index={keyIndex(1, 12)} data-layer={layer} strokeWidth="1.505" d="M1177.144 151.699a5.256 5.256 0 0 1 5.257-5.257h40.85a5.256 5.256 0 0 1 5.257 5.257v40.85a5.256 5.256 0 0 1-5.256 5.257H1182.4a5.256 5.256 0 0 1-5.257-5.256v-40.851z"/>
            <path onClick={onClick} className="key" id="R1C11_keyshape" fill="#fff" stroke={stroke(1, 11)} data-key-index={keyIndex(1, 11)} data-layer={layer} strokeWidth="1.505" d="M1118.084 151.699a5.256 5.256 0 0 1 5.257-5.257h40.85a5.256 5.256 0 0 1 5.257 5.257v40.85a5.256 5.256 0 0 1-5.256 5.257h-40.851a5.256 5.256 0 0 1-5.257-5.256v-40.851z"/>
            <path onClick={onClick} className="key" id="R1C10_keyshape" fill="#fff" stroke={stroke(1, 10)} data-key-index={keyIndex(1, 10)} data-layer={layer} strokeWidth="1.505" d="M1059.024 151.699a5.256 5.256 0 0 1 5.257-5.257h40.85a5.256 5.256 0 0 1 5.257 5.257v40.85a5.256 5.256 0 0 1-5.256 5.257h-40.851a5.256 5.256 0 0 1-5.257-5.256v-40.851z"/>
            <path onClick={onClick} className="key" id="R1C9_keyshape" fill="#fff" stroke={stroke(1, 9)} data-key-index={keyIndex(1, 9)} data-layer={layer} strokeWidth="1.505" d="M999.966 151.699a5.256 5.256 0 0 1 5.257-5.257h40.85a5.256 5.256 0 0 1 5.257 5.257v40.85a5.256 5.256 0 0 1-5.256 5.257h-40.851a5.256 5.256 0 0 1-5.257-5.256v-40.851z"/>
            <path onClick={onClick} className="key" id="R1C8_keyshape" fill="#fff" stroke={stroke(1, 8)} data-key-index={keyIndex(1, 8)} data-layer={layer} strokeWidth="1.505" d="M940.908 151.699a5.256 5.256 0 0 1 5.257-5.257h40.85a5.256 5.256 0 0 1 5.257 5.257v40.85a5.256 5.256 0 0 1-5.256 5.257h-40.851a5.256 5.256 0 0 1-5.257-5.256v-40.851z"/>
            <path onClick={onClick} className="key" id="R1C5_keyshape" fill="#fff" stroke={stroke(1, 5)} data-key-index={keyIndex(1, 5)} data-layer={layer} strokeWidth="1.505" d="M851.85 151.699a5.256 5.256 0 0 1 5.257-5.257h40.85a5.256 5.256 0 0 1 5.257 5.257v40.85a5.256 5.256 0 0 1-5.256 5.257h-40.851a5.256 5.256 0 0 1-5.257-5.256v-40.851z"/>
            <path onClick={onClick} className="key" id="R1C4_keyshape" fill="#fff" stroke={stroke(1, 4)} data-key-index={keyIndex(1, 4)} data-layer={layer} strokeWidth="1.505" d="M792.792 151.699a5.256 5.256 0 0 1 5.257-5.257h40.85a5.256 5.256 0 0 1 5.257 5.257v40.85a5.256 5.256 0 0 1-5.256 5.257h-40.851a5.256 5.256 0 0 1-5.257-5.256v-40.851z"/>
            <path onClick={onClick} className="key" id="R1C3_keyshape" fill="#fff" stroke={stroke(1, 3)} data-key-index={keyIndex(1, 3)} data-layer={layer} strokeWidth="1.505" d="M733.733 151.699a5.256 5.256 0 0 1 5.257-5.257h40.85a5.256 5.256 0 0 1 5.257 5.257v40.85a5.256 5.256 0 0 1-5.256 5.257H738.99a5.256 5.256 0 0 1-5.257-5.256v-40.851z"/>
            <path onClick={onClick} className="key" id="R1C2_keyshape" fill="#fff" stroke={stroke(1, 2)} data-key-index={keyIndex(1, 2)} data-layer={layer} strokeWidth="1.505" d="M674.675 151.699a5.256 5.256 0 0 1 5.257-5.257h40.85a5.256 5.256 0 0 1 5.257 5.257v40.85a5.256 5.256 0 0 1-5.256 5.257h-40.851a5.256 5.256 0 0 1-5.257-5.256v-40.851z"/>
            <path onClick={onClick} className="key" id="R1C1_keyshape" fill="#fff" stroke={stroke(1, 1)} data-key-index={keyIndex(1, 1)} data-layer={layer} strokeWidth="1.505" d="M615.617 151.699a5.256 5.256 0 0 1 5.257-5.257h40.85a5.256 5.256 0 0 1 5.257 5.257v40.85a5.256 5.256 0 0 1-5.256 5.257h-40.851a5.256 5.256 0 0 1-5.257-5.256v-40.851z"/>
            <path onClick={onClick} className="key" id="R1C0_keyshape" fill="#fff" stroke={stroke(1, 0)} data-key-index={keyIndex(1, 0)} data-layer={layer} strokeWidth="1.57" d="M1.25 8.516c0-4.013 2.054-7.266 4.587-7.266h61.826c2.533 0 4.587 3.253 4.587 7.266v56.468c0 4.013-2.054 7.266-4.587 7.266H5.837c-2.533 0-4.587-3.253-4.587-7.266V8.516z" transform="matrix(1.14597 0 0 .72344 525.126 145.538)"/>
            <path onClick={onClick} className="key" id="R0C15_keyshape" fill="#fff" stroke={stroke(0, 15)} data-key-index={keyIndex(0, 15)} data-layer={layer} strokeWidth="1.28" d="M1.25 8.516c0-4.013 1.528-7.266 3.413-7.266h64.174c1.885 0 3.413 3.253 3.413 7.266v56.468c0 4.013-1.528 7.266-3.413 7.266H4.663c-1.885 0-3.413-3.253-3.413-7.266V8.516z" transform="matrix(1.54034 0 0 .72344 1322.39 85.937)"/>
            <path onClick={onClick} className="key" id="R0C14_keyshape" fill="#fff" stroke={stroke(0, 14)} data-key-index={keyIndex(0, 14)} data-layer={layer} strokeWidth="1.505" d="M1265.254 92.098a5.256 5.256 0 0 1 5.257-5.257h40.85a5.256 5.256 0 0 1 5.257 5.257v40.85a5.256 5.256 0 0 1-5.256 5.257h-40.851a5.256 5.256 0 0 1-5.257-5.256V92.098z"/>
            <path onClick={onClick} className="key" id="R0C13_keyshape" fill="#fff" stroke={stroke(0, 13)} data-key-index={keyIndex(0, 13)} data-layer={layer} strokeWidth="1.505" d="M1206.204 92.098a5.256 5.256 0 0 1 5.257-5.257h40.85a5.256 5.256 0 0 1 5.257 5.257v40.85a5.256 5.256 0 0 1-5.256 5.257h-40.851a5.256 5.256 0 0 1-5.257-5.256V92.098z"/>
            <path onClick={onClick} className="key" id="R0C12_keyshape" fill="#fff" stroke={stroke(0, 12)} data-key-index={keyIndex(0, 12)} data-layer={layer} strokeWidth="1.505" d="M1147.144 92.098a5.256 5.256 0 0 1 5.257-5.257h40.85a5.256 5.256 0 0 1 5.257 5.257v40.85a5.256 5.256 0 0 1-5.256 5.257H1152.4a5.256 5.256 0 0 1-5.257-5.256V92.098z"/>
            <path onClick={onClick} className="key" id="R0C11_keyshape" fill="#fff" stroke={stroke(0, 11)} data-key-index={keyIndex(0, 11)} data-layer={layer} strokeWidth="1.505" d="M1088.084 92.098a5.256 5.256 0 0 1 5.257-5.257h40.85a5.256 5.256 0 0 1 5.257 5.257v40.85a5.256 5.256 0 0 1-5.256 5.257h-40.851a5.256 5.256 0 0 1-5.257-5.256V92.098z"/>
            <path onClick={onClick} className="key" id="R0C10_keyshape" fill="#fff" stroke={stroke(0, 10)} data-key-index={keyIndex(0, 10)} data-layer={layer} strokeWidth="1.505" d="M1029.024 92.098a5.256 5.256 0 0 1 5.257-5.257h40.85a5.256 5.256 0 0 1 5.257 5.257v40.85a5.256 5.256 0 0 1-5.256 5.257h-40.851a5.256 5.256 0 0 1-5.257-5.256V92.098z"/>
            <path onClick={onClick} className="key" id="R0C9_keyshape" fill="#fff" stroke={stroke(0, 9)} data-key-index={keyIndex(0, 9)} data-layer={layer} strokeWidth="1.505" d="M969.966 92.098a5.256 5.256 0 0 1 5.257-5.257h40.85a5.256 5.256 0 0 1 5.257 5.257v40.85a5.256 5.256 0 0 1-5.256 5.257h-40.851a5.256 5.256 0 0 1-5.257-5.256V92.098z"/>
            <path onClick={onClick} className="key" id="R0C6_keyshape" fill="#fff" stroke={stroke(0, 6)} data-key-index={keyIndex(0, 6)} data-layer={layer} strokeWidth="1.505" d="M880.908 92.098a5.256 5.256 0 0 1 5.257-5.257h40.85a5.256 5.256 0 0 1 5.257 5.257v40.85a5.256 5.256 0 0 1-5.256 5.257h-40.851a5.256 5.256 0 0 1-5.257-5.256V92.098z"/>
            <path onClick={onClick} className="key" id="R0C5_keyshape" fill="#fff" stroke={stroke(0, 5)} data-key-index={keyIndex(0, 5)} data-layer={layer} strokeWidth="1.505" d="M821.85 92.098a5.256 5.256 0 0 1 5.257-5.257h40.85a5.256 5.256 0 0 1 5.257 5.257v40.85a5.256 5.256 0 0 1-5.256 5.257h-40.851a5.256 5.256 0 0 1-5.257-5.256V92.098z"/>
            <path onClick={onClick} className="key" id="R0C4_keyshape" fill="#fff" stroke={stroke(0, 4)} data-key-index={keyIndex(0, 4)} data-layer={layer} strokeWidth="1.505" d="M762.792 92.098a5.256 5.256 0 0 1 5.257-5.257h40.85a5.256 5.256 0 0 1 5.257 5.257v40.85a5.256 5.256 0 0 1-5.256 5.257h-40.851a5.256 5.256 0 0 1-5.257-5.256V92.098z"/>
            <path onClick={onClick} className="key" id="R0C3_keyshape" fill="#fff" stroke={stroke(0, 3)} data-key-index={keyIndex(0, 3)} data-layer={layer} strokeWidth="1.505" d="M703.733 92.098a5.256 5.256 0 0 1 5.257-5.257h40.85a5.256 5.256 0 0 1 5.257 5.257v40.85a5.256 5.256 0 0 1-5.256 5.257H708.99a5.256 5.256 0 0 1-5.257-5.256V92.098z"/>
            <path onClick={onClick} className="key" id="R0C2_keyshape" fill="#fff" stroke={stroke(0, 2)} data-key-index={keyIndex(0, 2)} data-layer={layer} strokeWidth="1.505" d="M644.675 92.098a5.256 5.256 0 0 1 5.257-5.257h40.85a5.256 5.256 0 0 1 5.257 5.257v40.85a5.256 5.256 0 0 1-5.256 5.257h-40.851a5.256 5.256 0 0 1-5.257-5.256V92.098z"/>
            <path onClick={onClick} className="key" id="R0C1_keyshape" fill="#fff" stroke={stroke(0, 1)} data-key-index={keyIndex(0, 1)} data-layer={layer} strokeWidth="1.505" d="M585.617 92.098a5.256 5.256 0 0 1 5.257-5.257h40.85a5.256 5.256 0 0 1 5.257 5.257v40.85a5.256 5.256 0 0 1-5.256 5.257h-40.851a5.256 5.256 0 0 1-5.257-5.256V92.098z"/>
            <path onClick={onClick} className="key" id="R0C0_keyshape" fill="#fff" stroke={stroke(0, 0)} data-key-index={keyIndex(0, 0)} data-layer={layer} strokeWidth="1.505" d="M526.558 92.098a5.256 5.256 0 0 1 5.257-5.257h40.85a5.256 5.256 0 0 1 5.257 5.257v40.85a5.256 5.256 0 0 1-5.256 5.257h-40.851a5.256 5.256 0 0 1-5.257-5.256V92.098z"/>
          </g>
          <g id="labels" pointerEvents="none">
            <g transform="matrix(.9 0 0 1 931.532 236.466)">
              <text id="R4C9_t_primary" x="116" y="177.877">
                {getLabel(4, 9).label}
              </text>
            </g>
            <g transform="translate(919.932 225.314)">
              <text id="R4C9_t_extra" x="116" y="175.01">
                {getLabel(4, 9).extraLabel}
              </text>
            </g>
            <g transform="matrix(.9 0 0 1 905.52 236.466)">
              <text id="R4C8_t_primary" x="79" y="177.877">
                {getLabel(4, 8).label}
              </text>
            </g>
            <g transform="translate(897.62 225.314)">
              <text id="R4C8_t_extra" x="79" y="175.01">
                {getLabel(4, 8).extraLabel}
              </text>
            </g>
            <g transform="matrix(.9 0 0 1 815.492 236.466)">
              <text id="R4C7_t_primary" x="79" y="177.877">
                {getLabel(4, 7).label}
              </text>
            </g>
            <g transform="translate(807.592 225.314)">
              <text id="R4C7_t_extra" x="79" y="175.01">
                {getLabel(4, 7).extraLabel}
              </text>
            </g>
            <g transform="matrix(.9 0 0 1 756.179 236.466)">
              <text id="R4C6_t_primary" x="79" y="177.877">
                {getLabel(4, 6).label}
              </text>
            </g>
            <g transform="translate(748.279 225.314)">
              <text id="R4C6_t_extra" x="79" y="175.01">
                {getLabel(4, 6).extraLabel}
              </text>
            </g>
            <g transform="matrix(.9 0 0 1 1303.46 176.987)">
              <text id="R4C15_t_primary" x="79" y="177.877">
                {getLabel(4, 15).label}
              </text>
            </g>
            <g transform="translate(1295.56 165.835)">
              <text id="R4C15_t_extra" x="79" y="175.01">
                {getLabel(4, 15).extraLabel}
              </text>
            </g>
            <g transform="matrix(.9 0 0 1 1243.43 176.987)">
              <text id="R4C14_t_primary" x="79" y="177.877">
                {getLabel(4, 14).label}
              </text>
            </g>
            <g transform="translate(1235.53 165.835)">
              <text id="R4C14_t_extra" x="79" y="175.01">
                {getLabel(4, 14).extraLabel}
              </text>
            </g>
            <g transform="matrix(.9 0 0 1 1168.4 176.987)">
              <text id="R4C13_t_primary" x="79" y="177.877">
                {getLabel(4, 13).label}
              </text>
            </g>
            <g transform="translate(1160.5 165.835)">
              <text id="R4C13_t_extra" x="79" y="175.01">
                {getLabel(4, 13).extraLabel}
              </text>
            </g>
            <g transform="matrix(.9 0 0 1 1093.38 176.987)">
              <text id="R4C12_t_primary" x="79" y="177.877">
                {getLabel(4, 12).label}
              </text>
            </g>
            <g transform="translate(1085.48 165.835)">
              <text id="R4C12_t_extra" x="79" y="175.01">
                {getLabel(4, 12).extraLabel}
              </text>
            </g>
            <g transform="matrix(.9 0 0 1 1008.45 176.987)">
              <text id="R4C11_t_primary" x="79" y="177.877">
                {getLabel(4, 11).label}
              </text>
            </g>
            <g transform="translate(1000.55 165.835)">
              <text id="R4C11_t_extra" x="79" y="175.01">
                {getLabel(4, 11).extraLabel}
              </text>
            </g>
            <g transform="matrix(.9 0 0 1 905.52 176.987)">
              <text id="R4C10_t_primary" x="79" y="177.877">
                {getLabel(4, 10).label}
              </text>
            </g>
            <g transform="translate(897.62 165.835)">
              <text id="R4C10_t_extra--Frame-Text-" x="79" y="175.01">
                {getLabel(4, 10).extraLabel}
              </text>
            </g>
            <g transform="matrix(.9 0 0 1 772.591 176.987)">
              <text id="R4C4_t_primary" x="79" y="177.877">
                {getLabel(4, 4).label}
              </text>
            </g>
            <g transform="translate(764.691 165.835)">
              <text id="R4C4_t_extra" x="79" y="175.01">
                {getLabel(4, 4).extraLabel}
              </text>
            </g>
            <g transform="matrix(.9 0 0 1 687.663 176.987)">
              <text id="R4C3_t_primary" x="79" y="177.877">
                {getLabel(4, 3).label}
              </text>
            </g>
            <g transform="translate(679.763 165.835)">
              <text id="R4C3_t_extra" x="79" y="175.01">
                {getLabel(4, 3).extraLabel}
              </text>
            </g>
            <g transform="matrix(.9 0 0 1 612.635 176.987)">
              <text id="R4C2_t_primary" x="79" y="177.877">
                {getLabel(4, 2).label}
              </text>
            </g>
            <g transform="translate(604.735 165.835)">
              <text id="R4C2_t_extra" x="79" y="175.01">
                {getLabel(4, 2).extraLabel}
              </text>
            </g>
            <g transform="matrix(.9 0 0 1 537.608 176.987)">
              <text id="R4C1_t_primary" x="79" y="177.877">
                {getLabel(4, 1).label}
              </text>
            </g>
            <g transform="translate(529.708 165.835)">
              <text id="R4C1_t_extra" x="79" y="175.01">
                {getLabel(4, 1).extraLabel}
              </text>
            </g>
            <g transform="matrix(.9 0 0 1 462.58 176.987)">
              <text id="R4C0_t_primary" x="79" y="177.877">
                {getLabel(4, 0).label}
              </text>
            </g>
            <g transform="translate(454.68 165.835)">
              <text id="R4C0_t_extra" x="79" y="175.01">
                {getLabel(4, 0).extraLabel}
              </text>
            </g>
            <g transform="matrix(.9 0 0 1 1213.32 117.432)">
              <text id="R3C15_t_primary" x="78.912" y="177.877">
                {getLabel(3, 15).label}
              </text>
            </g>
            <g transform="translate(1205.43 106.254)">
              <text id="R3C15_t_extra" x="78.912" y="175.01">
                {getLabel(3, 15).extraLabel}
              </text>
            </g>
            <g transform="matrix(.9 0 0 1 1154.26 117.432)">
              <text id="R3C14_t_primary" x="78.912" y="177.877">
                {getLabel(3, 14).label}
              </text>
            </g>
            <g transform="translate(1146.37 106.254)">
              <text id="R3C14_t_extra" x="78.912" y="175.01">
                {getLabel(3, 14).extraLabel}
              </text>
            </g>
            <g transform="matrix(.9 0 0 1 1095.2 117.432)">
              <text id="R3C13_t_primary" x="78.912" y="177.877">
                {getLabel(3, 13).label}
              </text>
            </g>
            <g transform="translate(1087.31 106.254)">
              <text id="R3C13_t_extra" x="78.912" y="175.01">
                {getLabel(3, 13).extraLabel}
              </text>
            </g>
            <g transform="matrix(.9 0 0 1 1036.14 117.432)">
              <text id="R3C12_t_primary" x="78.912" y="177.877">
                {getLabel(3, 12).label}
              </text>
            </g>
            <g transform="translate(1028.25 106.254)">
              <text id="R3C12_t_extra" x="78.912" y="175.01">
                {getLabel(3, 12).extraLabel}
              </text>
            </g>
            <g transform="matrix(.9 0 0 1 977.084 117.432)">
              <text id="R3C11_t_primary" x="78.912" y="177.877">
                {getLabel(3, 11).label}
              </text>
            </g>
            <g transform="translate(969.193 106.254)">
              <text id="R3C11_t_extra" x="78.912" y="175.01">
                {getLabel(3, 11).extraLabel}
              </text>
            </g>
            <g transform="matrix(.9 0 0 1 918.026 117.432)">
              <text id="R3C10_t_primary" x="78.912" y="177.877">
                {getLabel(3, 10).label}
              </text>
            </g>
            <g transform="translate(910.134 106.254)">
              <text id="R3C10_t_extra" x="78.912" y="175.01">
                {getLabel(3, 10).extraLabel}
              </text>
            </g>
            <g transform="matrix(.9 0 0 1 828.967 117.432)">
              <text id="R3C6_t_primary" x="78.912" y="177.877">
                {getLabel(3, 6).label}
              </text>
            </g>
            <g transform="translate(821.076 106.254)">
              <text id="R3C6_t_extra" x="78.912" y="175.01">
                {getLabel(3, 6).extraLabel}
              </text>
            </g>
            <g transform="matrix(.9 0 0 1 769.909 117.432)">
              <text id="R3C5_t_primary" x="78.912" y="177.877">
                {getLabel(3, 5).label}
              </text>
            </g>
            <g transform="translate(762.018 106.254)">
              <text id="R3C5_t_extra" x="78.912" y="175.01">
                {getLabel(3, 5).extraLabel}
              </text>
            </g>
            <g transform="matrix(.9 0 0 1 710.851 117.432)">
              <text id="R3C4_t_primary" x="78.912" y="177.877">
                {getLabel(3, 4).label}
              </text>
            </g>
            <g transform="translate(702.959 106.254)">
              <text id="R3C4_t_extra" x="78.912" y="175.01">
                {getLabel(3, 4).extraLabel}
              </text>
            </g>
            <g transform="matrix(.9 0 0 1 651.792 117.432)">
              <text id="R3C3_t_primary" x="78.912" y="177.877">
                {getLabel(3, 3).label}
              </text>
            </g>
            <g transform="translate(643.901 106.254)">
              <text id="R3C3_t_extra" x="78.912" y="175.01">
                {getLabel(3, 3).extraLabel}
              </text>
            </g>
            <g transform="matrix(.9 0 0 1 592.734 117.432)">
              <text id="R3C2_t_primary" x="78.912" y="177.877">
                {getLabel(3, 2).label}
              </text>
            </g>
            <g transform="translate(584.843 106.254)">
              <text id="R3C2_t_extra" x="78.912" y="175.01">
                {getLabel(3, 2).extraLabel}
              </text>
            </g>
            <g transform="matrix(.9 0 0 1 462.676 117.432)">
              <text id="R3C1_t_primary" x="78.912" y="177.877">
                {getLabel(3, 1).label}
              </text>
            </g>
            <g transform="translate(454.785 106.254)">
              <text id="R3C1_t_extra" x="78.912" y="175.01">
                {getLabel(3, 1).extraLabel}
              </text>
            </g>
            <g transform="matrix(.9 0 0 1 1246.38 57.831)">
              <text id="R2C15_t_primary" x="78.912" y="177.877">
                {getLabel(2, 15).label}
              </text>
            </g>
            <g transform="translate(1238.48 46.653)">
              <text id="R2C15_t_extra" x="78.912" y="175.01">
                {getLabel(2, 15).extraLabel}
              </text>
            </g>
            <g transform="matrix(.9 0 0 1 1187.32 57.831)">
              <text id="R2C14_t_primary" x="78.912" y="177.877">
                {getLabel(2, 14).label}
              </text>
            </g>
            <g transform="translate(1179.43 46.653)">
              <text id="R2C14_t_extra" x="78.912" y="175.01">
                {getLabel(2, 14).extraLabel}
              </text>
            </g>
            <g transform="matrix(.9 0 0 1 1128.26 57.831)">
              <text id="R2C13_t_primary" x="78.912" y="177.877">
                {getLabel(2, 13).label}
              </text>
            </g>
            <g transform="translate(1120.37 46.653)">
              <text id="R2C13_t_extra" x="78.912" y="175.01">
                {getLabel(2, 13).extraLabel}
              </text>
            </g>
            <g transform="matrix(.9 0 0 1 1069.2 57.831)">
              <text id="R2C12_t_primary" x="78.912" y="177.877">
                {getLabel(2, 12).label}
              </text>
            </g>
            <g transform="translate(1061.31 46.653)">
              <text id="R2C12_t_extra" x="78.912" y="175.01">
                {getLabel(2, 12).extraLabel}
              </text>
            </g>
            <g transform="matrix(.9 0 0 1 1010.14 57.831)">
              <text id="R2C11_t_primary" x="78.912" y="177.877">
                {getLabel(2, 11).label}
              </text>
            </g>
            <g transform="translate(1002.25 46.653)">
              <text id="R2C11_t_extra" x="78.912" y="175.01">
                {getLabel(2, 11).extraLabel}
              </text>
            </g>
            <g transform="matrix(.9 0 0 1 951.084 57.831)">
              <text id="R2C10_t_primary" x="78.912" y="177.877">
                {getLabel(2, 10).label}
              </text>
            </g>
            <g transform="translate(943.193 46.653)">
              <text id="R2C10_t_extra" x="78.912" y="175.01">
                {getLabel(2, 10).extraLabel}
              </text>
            </g>
            <g transform="matrix(.9 0 0 1 892.026 57.831)">
              <text id="R2C9_t_primary" x="78.912" y="177.877">
                {getLabel(2, 9).label}
              </text>
            </g>
            <g transform="translate(884.134 46.653)">
              <text id="R2C9_t_extra" x="78.912" y="175.01">
                {getLabel(2, 9).extraLabel}
              </text>
            </g>
            <g transform="matrix(.9 0 0 1 802.967 57.831)">
              <text id="R2C5_t_primary" x="78.912" y="177.877">
                {getLabel(2, 5).label}
              </text>
            </g>
            <g transform="translate(795.076 46.653)">
              <text id="R2C5_t_extra" x="78.912" y="175.01">
                {getLabel(2, 5).extraLabel}
              </text>
            </g>
            <g transform="matrix(.9 0 0 1 743.909 57.831)">
              <text id="R2C4_t_primary" x="78.912" y="177.877">
                {getLabel(2, 4).label}
              </text>
            </g>
            <g transform="translate(736.018 46.653)">
              <text id="R2C4_t_extra" x="78.912" y="175.01">
                {getLabel(2, 4).extraLabel}
              </text>
            </g>
            <g transform="matrix(.9 0 0 1 684.851 57.831)">
              <text id="R2C3_t_primary" x="78.912" y="177.877">
                {getLabel(2, 3).label}
              </text>
            </g>
            <g transform="translate(676.959 46.653)">
              <text id="R2C3_t_extra" x="78.912" y="175.01">
                {getLabel(2, 3).extraLabel}
              </text>
            </g>
            <g transform="matrix(.9 0 0 1 625.792 57.831)">
              <text id="R2C2_t_primary" x="78.912" y="177.877">
                {getLabel(2, 2).label}
              </text>
            </g>
            <g transform="translate(617.901 46.653)">
              <text id="R2C2_t_extra" x="78.912" y="175.01">
                {getLabel(2, 2).extraLabel}
              </text>
            </g>
            <g transform="matrix(.9 0 0 1 566.734 57.831)">
              <text id="R2C1_t_primary" x="78.912" y="177.877">
                {getLabel(2, 1).label}
              </text>
            </g>
            <g transform="translate(558.843 46.653)">
              <text id="R2C1_t_extra" x="78.912" y="175.01">
                {getLabel(2, 1).extraLabel}
              </text>
            </g>
            <g transform="matrix(.9 0 0 1 462.676 57.831)">
              <text id="R2C0_t_primary" x="78.912" y="177.877">
                {getLabel(2, 0).label}
              </text>
            </g>
            <g transform="translate(454.785 46.653)">
              <text id="R2C0_t_extra" x="78.912" y="175.01">
                {getLabel(2, 0).extraLabel}
              </text>
            </g>
            <g transform="matrix(.9 0 0 1 1290.43 -1.77)">
              <text id="R1C15_t_primary" x="78.912" y="177.877">
                {getLabel(1, 15).label}
              </text>
            </g>
            <g transform="translate(1282.54 -12.948)">
              <text id="R1C15_t_extra" x="78.912" y="175.01">
                {getLabel(1, 15).extraLabel}
              </text>
            </g>
            <g transform="matrix(.9 0 0 1 1231.38 -1.77)">
              <text id="R1C14_t_primary" x="78.912" y="177.877">
                {getLabel(1, 14).label}
              </text>
            </g>
            <g transform="translate(1223.48 -12.948)">
              <text id="R1C14_t_extra" x="78.912" y="175.01">
                {getLabel(1, 14).extraLabel}
              </text>
            </g>
            <g transform="matrix(.9 0 0 1 1172.32 -1.77)">
              <text id="R1C13_t_primary" x="78.912" y="177.877">
                {getLabel(1, 13).label}
              </text>
            </g>
            <g transform="translate(1164.43 -12.948)">
              <text id="R1C13_t_extra" x="78.912" y="175.01">
                {getLabel(1, 13).extraLabel}
              </text>
            </g>
            <g transform="matrix(.9 0 0 1 1113.26 -1.77)">
              <text id="R1C12_t_primary" x="78.912" y="177.877">
                {getLabel(1, 12).label}
              </text>
            </g>
            <g transform="translate(1105.37 -12.948)">
              <text id="R1C12_t_extra" x="78.912" y="175.01">
                {getLabel(1, 12).extraLabel}
              </text>
            </g>
            <g transform="matrix(.9 0 0 1 1054.2 -1.77)">
              <text id="R1C11_t_primary" x="78.912" y="177.877">
                {getLabel(1, 11).label}
              </text>
            </g>
            <g transform="translate(1046.31 -12.948)">
              <text id="R1C11_t_extra" x="78.912" y="175.01">
                {getLabel(1, 11).extraLabel}
              </text>
            </g>
            <g transform="matrix(.9 0 0 1 995.142 -1.77)">
              <text id="R1C10_t_primary" x="78.912" y="177.877">
                {getLabel(1, 10).label}
              </text>
            </g>
            <g transform="translate(987.251 -12.948)">
              <text id="R1C10_t_extra" x="78.912" y="175.01">
                {getLabel(1, 10).extraLabel}
              </text>
            </g>
            <g transform="matrix(.9 0 0 1 936.084 -1.77)">
              <text id="R1C9_t_primary" x="78.912" y="177.877">
                {getLabel(1, 9).label}
              </text>
            </g>
            <g transform="translate(928.193 -12.948)">
              <text id="R1C9_t_extra" x="78.912" y="175.01">
                {getLabel(1, 9).extraLabel}
              </text>
            </g>
            <g transform="matrix(.9 0 0 1 877.026 -1.77)">
              <text id="R1C8_t_primary" x="78.912" y="177.877">
                {getLabel(1, 8).label}
              </text>
            </g>
            <g transform="translate(869.134 -12.948)">
              <text id="R1C8_t_extra" x="78.912" y="175.01">
                {getLabel(1, 8).extraLabel}
              </text>
            </g>
            <g transform="matrix(.9 0 0 1 787.967 -1.77)">
              <text id="R1C5_t_primary" x="78.912" y="177.877">
                {getLabel(1, 5).label}
              </text>
            </g>
            <g transform="translate(780.076 -12.948)">
              <text id="R1C5_t_extra" x="78.912" y="175.01">
                {getLabel(1, 5).extraLabel}
              </text>
            </g>
            <g transform="matrix(.9 0 0 1 728.909 -1.77)">
              <text id="R1C4_t_primary" x="78.912" y="177.877">
                {getLabel(1, 4).label}
              </text>
            </g>
            <g transform="translate(721.018 -12.948)">
              <text id="R1C4_t_extra" x="78.912" y="175.01">
                {getLabel(1, 4).extraLabel}
              </text>
            </g>
            <g transform="matrix(.9 0 0 1 669.851 -1.77)">
              <text id="R1C3_t_primary" x="78.912" y="177.877">
                {getLabel(1, 3).label}
              </text>
            </g>
            <g transform="translate(661.959 -12.948)">
              <text id="R1C3_t_extra" x="78.912" y="175.01">
                {getLabel(1, 3).extraLabel}
              </text>
            </g>
            <g transform="matrix(.9 0 0 1 610.792 -1.77)">
              <text id="R1C2_t_primary" x="78.912" y="177.877">
                {getLabel(1, 2).label}
              </text>
            </g>
            <g transform="translate(602.901 -12.948)">
              <text id="R1C2_t_extra" x="78.912" y="175.01">
                {getLabel(1, 2).extraLabel}
              </text>
            </g>
            <g transform="matrix(.9 0 0 1 551.734 -1.77)">
              <text id="R1C1_t_primary" x="78.912" y="177.877">
                {getLabel(1, 1).label}
              </text>
            </g>
            <g transform="translate(543.843 -12.948)">
              <text id="R1C1_t_extra" x="78.912" y="175.01">
                {getLabel(1, 1).extraLabel}
              </text>
            </g>
            <g transform="matrix(.9 0 0 1 462.676 -1.77)">
              <text id="R1C0_t_primary" x="78.912" y="177.877">
                {getLabel(1, 0).label}
              </text>
            </g>
            <g transform="translate(454.785 -12.948)">
              <text id="R1C0_t_extra" x="78.912" y="175.01">
                {getLabel(1, 0).extraLabel}
              </text>
            </g>
            <g transform="matrix(.9 0 0 1 1260.43 -61.37)">
              <text id="R0C15_t_primary" x="78.912" y="177.877">
                {getLabel(0, 15).label}
              </text>
            </g>
            <g transform="translate(1252.54 -72.549)">
              <text id="R0C15_t_extra" x="78.912" y="175.01">
                {getLabel(0, 15).extraLabel}
              </text>
            </g>
            <g transform="matrix(.9 0 0 1 1201.38 -61.37)">
              <text id="R0C14_t_primary" x="78.912" y="177.877">
                {getLabel(0, 14).label}
              </text>
            </g>
            <g transform="translate(1193.48 -72.549)">
              <text id="R0C14_t_extra" x="78.912" y="175.01">
                {getLabel(0, 14).extraLabel}
              </text>
            </g>
            <g transform="matrix(.9 0 0 1 1142.32 -61.37)">
              <text id="R0C13_t_primary" x="78.912" y="177.877">
                {getLabel(0, 13).label}
              </text>
            </g>
            <g transform="translate(1134.43 -72.549)">
              <text id="R0C13_t_extra" x="78.912" y="175.01">
                {getLabel(0, 13).extraLabel}
              </text>
            </g>
            <g transform="matrix(.9 0 0 1 1083.26 -61.37)">
              <text id="R0C12_t_primary" x="78.912" y="177.877">
                {getLabel(0, 12).label}
              </text>
            </g>
            <g transform="translate(1075.37 -72.549)">
              <text id="R0C12_t_extra" x="78.912" y="175.01">
                {getLabel(0, 12).extraLabel}
              </text>
            </g>
            <g transform="matrix(.9 0 0 1 1024.2 -61.37)">
              <text id="R0C11_t_primary" x="78.912" y="177.877">
                {getLabel(0, 11).label}
              </text>
            </g>
            <g transform="translate(1016.31 -72.549)">
              <text id="R0C11_t_extra" x="78.912" y="175.01">
                {getLabel(0, 11).extraLabel}
              </text>
            </g>
            <g transform="matrix(.9 0 0 1 965.142 -61.37)">
              <text id="R0C10_t_primary" x="78.912" y="177.877">
                {getLabel(0, 10).label}
              </text>
            </g>
            <g transform="translate(957.251 -72.549)">
              <text id="R0C10_t_extra" x="78.912" y="175.01">
                {getLabel(0, 10).extraLabel}
              </text>
            </g>
            <g transform="matrix(.9 0 0 1 906.084 -61.37)">
              <text id="R0C9_t_primary" x="78.912" y="177.877">
                {getLabel(0, 9).label}
              </text>
            </g>
            <g transform="translate(898.193 -72.549)">
              <text id="R0C9_t_extra" x="78.912" y="175.01">
                {getLabel(0, 9).extraLabel}
              </text>
            </g>
            <g transform="matrix(.9 0 0 1 817.026 -61.37)">
              <text id="R0C6_t_primary" x="78.912" y="177.877">
                {getLabel(0, 6).label}
              </text>
            </g>
            <g transform="translate(809.134 -72.549)">
              <text id="R0C6_t_extra" x="78.912" y="175.01">
                {getLabel(0, 6).extraLabel}
              </text>
            </g>
            <g transform="matrix(.9 0 0 1 757.967 -61.37)">
              <text id="R0C5_t_primary" x="78.912" y="177.877">
                {getLabel(0, 5).label}
              </text>
            </g>
            <g transform="translate(750.076 -72.549)">
              <text id="R0C5_t_extra" x="78.912" y="175.01">
                {getLabel(0, 5).extraLabel}
              </text>
            </g>
            <g transform="matrix(.9 0 0 1 698.909 -61.37)">
              <text id="R0C4_t_primary" x="78.912" y="177.877">
                {getLabel(0, 4).label}
              </text>
            </g>
            <g transform="translate(691.018 -72.549)">
              <text id="R0C4_t_extra" x="78.912" y="175.01">
                {getLabel(0, 4).extraLabel}
              </text>
            </g>
            <g transform="matrix(.9 0 0 1 639.851 -61.37)">
              <text id="R0C3_t_primary" x="78.912" y="177.877">
                {getLabel(0, 3).label}
              </text>
            </g>
            <g transform="translate(631.959 -72.549)">
              <text id="R0C3_t_extra" x="78.912" y="175.01">
                {getLabel(0, 3).extraLabel}
              </text>
            </g>
            <g transform="matrix(.9 0 0 1 580.792 -61.37)">
              <text id="R0C2_t_primary" x="78.912" y="177.877">
                {getLabel(0, 2).label}
              </text>
            </g>
            <g transform="translate(572.901 -72.549)">
              <text id="R0C2_t_extra" x="78.912" y="175.01">
                {getLabel(0, 2).extraLabel}
              </text>
            </g>
            <g transform="matrix(.9 0 0 1 521.734 -61.37)">
              <text id="R0C1_t_primary" x="78.912" y="177.877">
                {getLabel(0, 1).label}
              </text>
            </g>
            <g transform="translate(513.843 -72.549)">
              <text id="R0C1_t_extra" x="78.912" y="175.01">
                {getLabel(0, 1).extraLabel}
              </text>
            </g>
            <g transform="matrix(.9 0 0 1 462.676 -61.37)">
              <text id="R0C0_t_primary" x="78.912" y="177.877">
                {getLabel(0, 0).label}
              </text>
            </g>
            <g transform="translate(454.785 -72.549)">
              <text id="R0C0_t_extra" x="78.912" y="175.01">
                {getLabel(0, 0).extraLabel}
              </text>
            </g>
          </g>
        </g>
      </svg>
    );
  }
}

export default Keymap;
