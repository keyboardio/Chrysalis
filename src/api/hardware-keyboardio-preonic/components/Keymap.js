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
  const [expandedRotary, setExpandedRotary] = React.useState(false);

  const keymap =
    props.keymap ||
    Array(72)
      .fill()
      .map(() => 0);
  // Reduce spacing between keys to 2-3px
  const KeySpacingY = 58; // Reduced from 64
  const keySpacingX = 58; // Reduced from 64

  // Key dimensions
  const keyWidth = 54; // Slightly smaller than spacing to create gap
  const keyHeight = 54; // Same as width for square keys

  const layer = props.index;
  const onKeySelect = props.onKeySelect;

  // Calculate keymap index for a given row and column
  const getKeymapIndex = (row, col) => {
    return row * 12 + col;
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
    const onClick = (e) => {
      // For rotary encoder, toggle expanded view only in compact mode
      if (row === 0 && col === 11 && !expandedRotary) {
        e.stopPropagation(); // Prevent immediate key selection
        setExpandedRotary(true);
        // Select the push function when expanding
        const pushEvent = {
          currentTarget: {
            getAttribute: (attr) => {
              if (attr === "data-key-index") return keyIndex;
              if (attr === "data-layer") return layer;
              return null;
            },
          },
        };
        onKeySelect(pushEvent);
        return; // Don't trigger key selection when expanding
      }
      // Collapse expanded view when clicking any other key
      if (row !== 0 || (col !== 11 && col !== 4 && col !== 5)) {
        setExpandedRotary(false);
      }
      onKeySelect(e);
    };
    const keyIndex = getKeymapIndex(row, col);
    const strokeColor = "#d4d4d4"; // Lighter grey for border
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

    // Special handling for rotary encoder
    const isRotaryKey = row === 0 && col === 11;
    if (isRotaryKey) {
      const ccwIndex = [0, 4];
      const cwIndex = [0, 5];
      console.log("Expanded Rotary: ", expandedRotary);
      const ccwKey = getKey(ccwIndex[0], ccwIndex[1]);
      const cwKey = getKey(cwIndex[0], cwIndex[1]);
      const cwLegend = cwKey && db.format(cwKey, { layerNames: props.layerNames });
      const ccwLegend = ccwKey && db.format(ccwKey, { layerNames: props.layerNames });

      console.log("CW Legend: ", cwLegend);
      console.log("CCW Legend: ", ccwLegend);
      if (expandedRotary) {
        // Add click handler to close expanded view when clicking outside
        const handleClickOutside = (e) => {
          const expandedArea = document.querySelector(".rotary-expanded");
          if (expandedArea && !expandedArea.contains(e.target)) {
            setExpandedRotary(false);
          }
        };

        React.useEffect(() => {
          // Add the handler after a short delay to avoid the current click
          const timer = setTimeout(() => {
            document.addEventListener("click", handleClickOutside);
          }, 100);

          return () => {
            clearTimeout(timer);
            document.removeEventListener("click", handleClickOutside);
          };
        }, []);

        // Expanded view with three separate clickable areas
        return (
          <g className="rotary-expanded" onClick={(e) => e.stopPropagation()}>
            {/* Background panel */}
            <rect
              x={x - width}
              y={y + 5}
              width={width * 3}
              height={height + 30}
              fill="#1a1a1a"
              stroke={strokeColor}
              strokeWidth="1"
              rx="6"
              ry="6"
            />

            {/* CCW function */}
            <g
              onClick={onClick}
              className="key"
              data-key-index={getKeymapIndex(ccwIndex[0], ccwIndex[1])}
              data-layer={layer}
            >
              <rect
                x={x - width + 10}
                y={y + 10}
                width={width - 10}
                height={height - 10}
                fill={buttonColor}
                stroke={isActive(0, 5) ? "#f3b3b3" : strokeColor}
                strokeWidth="1"
                rx="4"
                ry="4"
              />
              <text x={x - width / 2 + 5} y={y + 25} fill={textColor} fontSize="smaller" textAnchor="middle">
                ↺ CCW
              </text>
              {ccwLegend && (
                <text
                  x={x - width / 2 + 5}
                  y={y + height - 15}
                  fill={textColor}
                  className={mainLegendClass}
                  textAnchor="middle"
                >
                  {ccwLegend.main}
                </text>
              )}
            </g>

            {/* Push function */}
            <g onClick={onClick} className="key" data-key-index={keyIndex} data-layer={layer}>
              <rect
                x={x + 10}
                y={y + 10}
                width={width - 20}
                height={height - 10}
                fill={buttonColor}
                stroke={stroke}
                strokeWidth="1"
                rx="4"
                ry="4"
              />
              <text x={x + width / 2} y={y + 25} fill={textColor} fontSize="smaller" textAnchor="middle">
                Push
              </text>
              {legend && (
                <text
                  x={x + width / 2}
                  y={y + height - 15}
                  fill={textColor}
                  className={mainLegendClass}
                  textAnchor="middle"
                >
                  {legend.main}
                </text>
              )}
            </g>

            {/* CW function */}
            <g
              onClick={onClick}
              className="key"
              data-key-index={getKeymapIndex(cwIndex[0], cwIndex[1])}
              data-layer={layer}
            >
              <rect
                x={x + width}
                y={y + 10}
                width={width - 10}
                height={height - 10}
                fill={buttonColor}
                stroke={isActive(0, 4) ? "#f3b3b3" : strokeColor}
                strokeWidth="1"
                rx="4"
                ry="4"
              />
              <text x={x + width * 1.5 - 5} y={y + 25} fill={textColor} fontSize="smaller" textAnchor="middle">
                CW ↻
              </text>
              {cwLegend && (
                <text
                  x={x + width * 1.5 - 5}
                  y={y + height - 15}
                  fill={textColor}
                  className={mainLegendClass}
                  textAnchor="middle"
                >
                  {cwLegend.main}
                </text>
              )}
            </g>
          </g>
        );
      }

      // Compact view (original rotary encoder display)
      return (
        <g onClick={onClick} className="key" data-key-index={keyIndex} data-layer={layer}>
          <circle
            cx={x + width / 2}
            cy={y + height / 2}
            r={width / 2}
            stroke={stroke}
            strokeWidth="1"
            fill={buttonColor}
          />
          {legend && (
            <>
              {/* Push function */}
              <text
                x={x + width / 2}
                y={y + height / 2}
                fill={textColor}
                className={mainLegendClass}
                textAnchor="middle"
                dominantBaseline="middle"
              >
                {legend.main}
              </text>
              {/* Clockwise function - curved along top right */}
              {cwLegend && (
                <text x={x + width - 10} y={y + 14} fill={textColor} fontSize="1em" textAnchor="end">
                  {cwLegend.main}
                </text>
              )}
              {/* Counter-clockwise function - curved along top left */}
              {ccwLegend && (
                <text x={x + 10} y={y + 14} fill={textColor} fontSize="1em" textAnchor="start">
                  {ccwLegend.main}
                </text>
              )}
            </>
          )}
        </g>
      );
    }

    // Regular key rendering
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
