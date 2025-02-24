 // -*- mode: js-jsx -*-
/* chrysalis-hardware-keyboardio-preonic -- Chrysalis Preonic support
 * Copyright (C) 2019-2022  Keyboardio, Inc.
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
import React from "react";

const db = new KeymapDB();

const Keymap = (props) => {
  const keymap =
    props.keymap ||
    Array(72)
      .fill()
      .map(() => 0);
  // Reduce spacing between keys to 2-3px
  const KeySpacingY = 58;  // Reduced from 64
  const keySpacingX = 58;  // Reduced from 64

  // Key dimensions
  const keyWidth = 54;     // Slightly smaller than spacing to create gap
  const keyHeight = 54;    // Same as width for square keys

  const layer = props.index;
  const onKeySelect = props.onKeySelect;

  // Calculate keymap index for a given row and column
  const getKeymapIndex = (row, col) => {
    return  ((row ) * 12) + col;

  };

  const getKey = (row, col) => {
    if (!props.keymap) return null;
    const index = getKeymapIndex(row, col);
    return index !== undefined ? keymap[index] : null;
  };

  const isActive = (row, col) => {
    const index = getKeymapIndex(row, col);
    return index !== undefined && props.selectedKey === index;
  };

  const Key = (props) => {
    const { row, col, x, y } = props;
    const active = isActive(row, col);
    const key = getKey(row, col);
    const onClick = onKeySelect;
    const keyIndex = getKeymapIndex(row, col);
    const strokeColor = "#d4d4d4";  // Lighter grey for border
    const stroke = active ? "#f3b3b3" : strokeColor;
    const height = props.height || keyHeight;
    const width = props.width || keyWidth;
    const bottom = y + height - 5;

    let textColor = "#ffffff";
    const buttonColor = "#000000";
    let legendClass = "";
    let mainLegendClass = "";
    const legend = key && db.format(key, { layerNames: props.layerNames });
    if (key && (legend.main || "").length <= 1 && !legend.hint) legendClass = "short-legend";
    if (key && (legend.main || "").length <= 1) mainLegendClass = "short-legend";
    if (key && key.code == 0) textColor = "#888888";

    return (
      <g onClick={onClick} className="key" data-key-index={keyIndex} data-layer={layer}>
        <rect
          x={x}
          y={y}
          rx="4"
          ry="4"
          width={width}
          height={height}
          stroke={stroke}
          strokeWidth="1"
          fill={buttonColor}
        />
        {legend && (
          <>
            {legend.hint && (
              <text x={x + 5} y={y + 14} fill={textColor} className={legendClass}>
                {legend.hint}
              </text>
            )}
            <text x={x + 5} y={bottom} fill={textColor} className={mainLegendClass}>
              {legend.main}
            </text>
          </>
        )}
      </g>
    );
  };

  const { classes, maxHeight } = props;
  return (
    <svg
      viewBox="0 0 755 428"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMinYMin meet"
      style={{
        maxHeight: maxHeight || "100%",
        backgroundRepeat: "no-repeat",
        backgroundSize: "100%",
      }}
      className={props.className || "layer"}
    >
      <g transform="translate(20,28)">
        {/* Row 0: Top 3-key row */}
        <g>
          {[9, 10, 11].map((col) => (
            <Key key={`0,${col}`} layerNames={props.layerNames} row={0} col={col} x={col * keySpacingX} y={0} />
          ))}
        </g>

        {/* Rows 1-5: Main 5x12 grid */}
        <g>
          {[1, 2, 3, 4, 5].map((row) => (
            <g key={row}>
              {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((col) => (
                <Key
                  key={`${row},${col}`}
                  layerNames={props.layerNames}
                  row={row}
                  col={col}
                  x={col * keySpacingX}
                  y={row * KeySpacingY + KeySpacingY * 0.25}
                />
              ))}
            </g>
          ))}
        </g>
      </g>
    </svg>
  );
};

export default Keymap;
