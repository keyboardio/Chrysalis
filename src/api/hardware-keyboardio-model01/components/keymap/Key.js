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

import { KeymapDB } from "@api/keymap";
import React from "react";

const db = new KeymapDB();

const Key = (props) => {
  let shape,
    stroke = "#b3b3b3";

  if (props.active) {
    stroke = "#f3b3b3";
  }

  const { getContrastText } = props;

  if (props.palmKey) {
    shape = (
      <ellipse
        fill={props.color}
        stroke={stroke}
        strokeWidth="2.73"
        cx="610.765"
        cy="953.469"
        rx="75.6"
        ry="56.001"
        transform={props.shape}
      />
    );
  } else {
    shape = (
      <path
        fill={props.color}
        stroke={stroke}
        strokeWidth="1.55"
        d={props.shape}
      />
    );
  }

  const keyIndex = parseInt(props.row) * 16 + parseInt(props.col);
  let extraLabel;
  const key = props.keyObj;
  const label = key && db.format(key);

  if (props.extraLabelTransform && label && label.hint) {
    extraLabel = (
      <g transform={props.extraLabelTransform}>
        <text
          x={props.x}
          y={props.y - 3}
          className="extra-key"
          fill={getContrastText(props.color)}
        >
          {label.hint}
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
      data-led-index={props.ledIndex}
    >
      {shape}
      <g transform={props.primaryLabelTransform}>
        <text x={props.x} y={props.y} fill={getContrastText(props.color)}>
          {label && label.main}
        </text>
      </g>
      {extraLabel}
    </g>
  );
};

export default Key;
