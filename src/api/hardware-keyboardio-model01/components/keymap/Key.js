// -*- mode: js-jsx -*-
/* chrysalis-bundle-keyboardio -- Chrysalis Bundle for Keyboard.io
 * Copyright (C) 2018-2022  Keyboardio, Inc.
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

import KeymapDB from "@api/focus/keymap/db";
import useTheme from "@mui/material/styles/useTheme";
import React from "react";

const db = new KeymapDB();

const led_map = [
  [3, 4, 11, 12, 19, 20, 26, 27, 36, 37, 43, 44, 51, 52, 59, 60],
  [2, 5, 10, 13, 18, 21, 25, 28, 35, 38, 42, 45, 50, 53, 58, 61],
  [1, 6, 9, 14, 17, 22, 24, 29, 34, 39, 41, 46, 49, 54, 57, 62],
  [0, 7, 8, 15, 16, 23, 31, 30, 33, 32, 40, 47, 48, 55, 56, 63],
];

const getLEDIndex = (row, col) => {
  return led_map[parseInt(row)][parseInt(col)];
};

const Key = (props) => {
  const theme = useTheme();

  let shape;
  const keyIndex = parseInt(props.row) * 16 + parseInt(props.col);
  let extraLabel;

  const key = props.keymap[keyIndex];

  const stroke = props.selectedKey === keyIndex ? theme.palette.primary.light : theme.palette.grey[500];

  const getColor = () => {
    const ledIndex = led_map[parseInt(props.row)][parseInt(props.col)];
    const colorIndex = props.colormap[ledIndex];
    const color = props.palette[colorIndex].rgb;
    return color;
  };

  if (props.palmKey) {
    shape = (
      <ellipse
        fill={getColor()}
        stroke={stroke}
        strokeWidth="5.5"
        cx="610.765"
        cy="953.469"
        rx="75.6"
        ry="56.001"
        transform={props.shape}
      />
    );
  } else {
    shape = <path fill={getColor()} stroke={stroke} strokeWidth="3.5" d={props.shape} />;
  }

  let legendClass = "";
  let mainLegendClass = "";
  const legend = key && db.format(key, { layerNames: props.layerNames });
  if (key && (legend.main || "").length <= 1 && !legend.hint) legendClass = "short-legend";
  if (key && (legend.main || "").length <= 1) mainLegendClass = "short-legend";

  if (props.extraLabelTransform && legend?.hint) {
    extraLabel = (
      <g transform={props.extraLabelTransform}>
        <text x={props.x} y={props.y - 3} className={legendClass} fill={theme.palette.getContrastText(getColor())}>
          {legend?.hint}
        </text>
      </g>
    );
  }

  return (
    <g
      onClick={props.onClick}
      className="key"
      data-key-index={keyIndex}
      data-layer={props.layer}
      data-led-index={getLEDIndex(props.row, props.col)}
    >
      {shape}
      <g transform={props.primaryLabelTransform}>
        <text x={props.x} y={props.y} fill={theme.palette.getContrastText(getColor())} className={mainLegendClass}>
          {legend?.main}
        </text>
      </g>
      {extraLabel}
    </g>
  );
};

export default Key;
