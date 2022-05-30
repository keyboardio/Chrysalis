// -*- mode: js-jsx -*-
/* Bazecor
 * Copyright (C) 2022  Dygmalab, Inc.
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

const Key = ({
  keyType,
  id,
  onClick,
  fill,
  stroke,
  width,
  height,
  x,
  y,
  dataLedIndex,
  dataKeyIndex,
  dataLayer,
  contrastText,
  centerPrimary,
  centerExtra
}) => {
  const [color, setColor] = React.useState("rgb(255,255,255)");
  const xShape2 = x + 4;
  const yShape2 = y;
  const widthShape2 = width - 8;
  const heightShape2 = height - 8;
  const [extraLabelClass, setExtraLabelClass] = React.useState(false);
  const setExtralabel = React.useRef(null);

  React.useEffect(() => {
    setColor(fill);
  }, [fill]);

  React.useEffect(() => {
    if (
      setExtralabel.current.innerText === "LED" ||
      setExtralabel.current.innerText === "SUPER" ||
      setExtralabel.current.innerText === "MACRO" ||
      setExtralabel.current.innerText === "OSL"
    ) {
      setExtraLabelClass(true);
    } else {
      setExtraLabelClass(false);
    }
  }, [centerPrimary, centerExtra]);

  return (
    <>
      {keyType == "regularKey" ? (
        <g
          id={id}
          className={`${stroke === "#fff" || stroke === "#000" ? "keyOnFocus" : "keyOnHold"} keyItem ${keyType}`}
          onClick={onClick}
          data-led-index={dataLedIndex}
          data-key-index={dataKeyIndex}
          data-layer={dataLayer}
        >
          {/* <g xmlns="http://www.w3.org/2000/svg" filter={`url(#filter${id}01)`} className="shadowHover">
            <rect x={x} y={y} width={width} height={height} rx="4" className="keyBase" />
          </g> */}
          <g className="shadowHover">
            <rect x={x} y={y + 4} width={width} height={height} rx="4" fill={color} />
          </g>
          <g>
            <rect x={x} y={y} width={width} height={height} rx="4" fill={`#303949`} />
            <rect x={x} y={y} width={width} height={height} rx="4" fill={`url(#paintGradient${id})`} fillOpacity="0.2" />
            <rect x={x} y={y} width={width} height={height} rx="4" fill={color} className="keyColorOpacity" />
            <rect
              x={x}
              y={y}
              width={width}
              height={height}
              rx="4"
              className="keyOpacityInternal"
              stroke={color}
              strokeWidth="2"
              fill="transparent"
            />
          </g>
          <g className="shadowMiddle">
            <rect x={xShape2} y={yShape2 + 12} width={widthShape2} height={heightShape2} rx="4" fill={color} />
          </g>
          <g xmlns="http://www.w3.org/2000/svg">
            <rect x={xShape2} y={yShape2} width={widthShape2} height={heightShape2} rx="4" className="keyBase" />
            <rect
              x={xShape2}
              y={yShape2}
              width={widthShape2}
              height={heightShape2}
              rx="4"
              fill={`url(#paintGradient${id})`}
              fillOpacity="0.25"
            />
            <rect x={xShape2} y={yShape2} width={widthShape2} height={heightShape2} rx="4" fill={color} fillOpacity="0.2" />
            <rect
              x={xShape2}
              y={yShape2}
              width={widthShape2}
              height={heightShape2}
              rx="4"
              className="keyOpacity"
              stroke="#fff"
              strokeWidth="2"
              fill="transparent"
              strokeOpacity="0"
            />

            <foreignObject x={xShape2} y={yShape2} width={widthShape2} height={heightShape2}>
              <div xmlns="http://www.w3.org/1999/xhtml" className={`keyContentLabel`}>
                <ul>
                  <li ref={setExtralabel} className={`${extraLabelClass ? "extraLabel" : ""}`}>
                    {centerExtra}
                  </li>
                  <li>{centerPrimary}</li>
                </ul>
              </div>
            </foreignObject>
          </g>
        </g>
      ) : (
        ""
      )}

      {keyType == "t5" ? (
        <g
          id={id}
          className={`${stroke === "#fff" || stroke === "#000" ? "keyOnFocus" : "keyOnHold"} keyItem ${keyType}`}
          onClick={onClick}
          data-led-index={dataLedIndex}
          data-key-index={dataKeyIndex}
          data-layer={dataLayer}
          transform={`translate(${x},${y})`}
        >
          <g className="shadowHover" transform={`translate(${0},${3})`}>
            <path
              d="M1.37773 4.98057C-0.325982 3.04224 1.05038 0 3.63103 0H115C117.209 0 119 1.79086 119 4V53C119 55.2091 117.209 57 115 57H49.8154C48.0899 57 46.4479 56.2571 45.3088 54.9611L1.37773 4.98057Z"
              fill={color}
            />
          </g>
          <g>
            <path
              d="M1.37773 4.98057C-0.325982 3.04224 1.05038 0 3.63103 0H115C117.209 0 119 1.79086 119 4V53C119 55.2091 117.209 57 115 57H49.8154C48.0899 57 46.4479 56.2571 45.3088 54.9611L1.37773 4.98057Z"
              fill={`#303949`}
            />
            <path
              d="M1.37773 4.98057C-0.325982 3.04224 1.05038 0 3.63103 0H115C117.209 0 119 1.79086 119 4V53C119 55.2091 117.209 57 115 57H49.8154C48.0899 57 46.4479 56.2571 45.3088 54.9611L1.37773 4.98057Z"
              fill={`url(#paintGradient${id})`}
              fillOpacity="0.2"
            />
            <path
              d="M1.37773 4.98057C-0.325982 3.04224 1.05038 0 3.63103 0H115C117.209 0 119 1.79086 119 4V53C119 55.2091 117.209 57 115 57H49.8154C48.0899 57 46.4479 56.2571 45.3088 54.9611L1.37773 4.98057Z"
              fill={color}
              className="keyColorOpacity"
            />
            <path
              d="M1.37773 4.98057C-0.325982 3.04224 1.05038 0 3.63103 0H115C117.209 0 119 1.79086 119 4V53C119 55.2091 117.209 57 115 57H49.8154C48.0899 57 46.4479 56.2571 45.3088 54.9611L1.37773 4.98057Z"
              className="keyOpacityInternal"
              stroke={color}
              strokeWidth="2"
              fill="transparent"
            />
          </g>
          <g className="shadowMiddle" transform={`translate(${0},${12})`}>
            <path
              d="M0.930799 5.08781C-0.913514 3.18477 0.434998 0 3.0851 0H108C110.209 0 112 1.79086 112 4V47C112 49.2091 110.209 51 108 51H47.9666C46.3427 51 44.7882 50.3418 43.658 49.1756L0.930799 5.08781Z"
              fill={color}
            />
          </g>
          <g transform={`translate(${4},${0})`}>
            <path
              d="M0.930799 5.08781C-0.913514 3.18477 0.434998 0 3.0851 0H108C110.209 0 112 1.79086 112 4V47C112 49.2091 110.209 51 108 51H47.9666C46.3427 51 44.7882 50.3418 43.658 49.1756L0.930799 5.08781Z"
              className="keyBase"
            />
            <path
              d="M0.930799 5.08781C-0.913514 3.18477 0.434998 0 3.0851 0H108C110.209 0 112 1.79086 112 4V47C112 49.2091 110.209 51 108 51H47.9666C46.3427 51 44.7882 50.3418 43.658 49.1756L0.930799 5.08781Z"
              fill={`url(#paintGradient${id})`}
              fillOpacity="0.25"
            />
            <path
              d="M0.930799 5.08781C-0.913514 3.18477 0.434998 0 3.0851 0H108C110.209 0 112 1.79086 112 4V47C112 49.2091 110.209 51 108 51H47.9666C46.3427 51 44.7882 50.3418 43.658 49.1756L0.930799 5.08781Z"
              fill={color}
              fillOpacity="0.2"
            />
            <path
              d="M0.930799 5.08781C-0.913514 3.18477 0.434998 0 3.0851 0H108C110.209 0 112 1.79086 112 4V47C112 49.2091 110.209 51 108 51H47.9666C46.3427 51 44.7882 50.3418 43.658 49.1756L0.930799 5.08781Z"
              className="keyOpacity"
              stroke="#fff"
              strokeWidth="2"
              fill="transparent"
              strokeOpacity="0"
            />
          </g>
          <foreignObject x={42} y={1} width={widthShape2 - 52} height={heightShape2}>
            <div xmlns="http://www.w3.org/1999/xhtml" className={`keyContentLabel`}>
              <ul>
                <li ref={setExtralabel} className={`${extraLabelClass ? "extraLabel" : ""}`}>
                  {centerExtra}
                </li>
                <li>{centerPrimary}</li>
              </ul>
            </div>
          </foreignObject>
        </g>
      ) : (
        ""
      )}

      {keyType == "t8" ? (
        <g
          id={id}
          className={`${stroke === "#fff" || stroke === "#000" ? "keyOnFocus" : "keyOnHold"} keyItem ${keyType}`}
          onClick={onClick}
          data-led-index={dataLedIndex}
          data-key-index={dataKeyIndex}
          data-layer={dataLayer}
          transform={`translate(${x},${y})`}
        >
          <g className="shadowHover" transform={`translate(${0},${3})`}>
            <path
              d="M118.378 4.98057C120.082 3.04224 118.706 0 116.125 0H4.75611C2.54697 0 0.756104 1.79086 0.756104 4V53C0.756104 55.2091 2.54696 57 4.7561 57H69.9407C71.6662 57 73.3082 56.2571 74.4473 54.9611L118.378 4.98057Z"
              fill={color}
            />
          </g>
          <g>
            <path
              d="M118.378 4.98057C120.082 3.04224 118.706 0 116.125 0H4.75611C2.54697 0 0.756104 1.79086 0.756104 4V53C0.756104 55.2091 2.54696 57 4.7561 57H69.9407C71.6662 57 73.3082 56.2571 74.4473 54.9611L118.378 4.98057Z"
              fill={`#303949`}
            />
            <path
              d="M118.378 4.98057C120.082 3.04224 118.706 0 116.125 0H4.75611C2.54697 0 0.756104 1.79086 0.756104 4V53C0.756104 55.2091 2.54696 57 4.7561 57H69.9407C71.6662 57 73.3082 56.2571 74.4473 54.9611L118.378 4.98057Z"
              fill={`url(#paintGradient${id})`}
              fillOpacity="0.2"
            />
            <path
              d="M118.378 4.98057C120.082 3.04224 118.706 0 116.125 0H4.75611C2.54697 0 0.756104 1.79086 0.756104 4V53C0.756104 55.2091 2.54696 57 4.7561 57H69.9407C71.6662 57 73.3082 56.2571 74.4473 54.9611L118.378 4.98057Z"
              fill={color}
              className="keyColorOpacity"
            />
            <path
              d="M118.378 4.98057C120.082 3.04224 118.706 0 116.125 0H4.75611C2.54697 0 0.756104 1.79086 0.756104 4V53C0.756104 55.2091 2.54696 57 4.7561 57H69.9407C71.6662 57 73.3082 56.2571 74.4473 54.9611L118.378 4.98057Z"
              className="keyOpacityInternal"
              stroke={color}
              strokeWidth="2"
              fill="transparent"
            />
          </g>
          <g className="shadowMiddle" transform={`translate(${0},${12})`}>
            <path
              d="M0.930799 5.08781C-0.913514 3.18477 0.434998 0 3.0851 0H108C110.209 0 112 1.79086 112 4V47C112 49.2091 110.209 51 108 51H47.9666C46.3427 51 44.7882 50.3418 43.658 49.1756L0.930799 5.08781Z"
              fill={color}
            />
          </g>
          <g transform={`translate(${4},${0})`}>
            <path
              d="M111.825 5.08781C113.67 3.18477 112.321 0 109.671 0H4.75611C2.54697 0 0.756104 1.79086 0.756104 4V47C0.756104 49.2091 2.54696 51 4.7561 51H64.7895C66.4134 51 67.9679 50.3418 69.0981 49.1756L111.825 5.08781Z"
              className="keyBase"
            />
            <path
              d="M111.825 5.08781C113.67 3.18477 112.321 0 109.671 0H4.75611C2.54697 0 0.756104 1.79086 0.756104 4V47C0.756104 49.2091 2.54696 51 4.7561 51H64.7895C66.4134 51 67.9679 50.3418 69.0981 49.1756L111.825 5.08781Z"
              fill={`url(#paintGradient${id})`}
              fillOpacity="0.25"
            />
            <path
              d="M111.825 5.08781C113.67 3.18477 112.321 0 109.671 0H4.75611C2.54697 0 0.756104 1.79086 0.756104 4V47C0.756104 49.2091 2.54696 51 4.7561 51H64.7895C66.4134 51 67.9679 50.3418 69.0981 49.1756L111.825 5.08781Z"
              fill={color}
              fillOpacity="0.2"
            />
            <path
              d="M111.825 5.08781C113.67 3.18477 112.321 0 109.671 0H4.75611C2.54697 0 0.756104 1.79086 0.756104 4V47C0.756104 49.2091 2.54696 51 4.7561 51H64.7895C66.4134 51 67.9679 50.3418 69.0981 49.1756L111.825 5.08781Z"
              className="keyOpacity"
              stroke="#fff"
              strokeWidth="2"
              fill="transparent"
              strokeOpacity="0"
            />
          </g>
          <foreignObject x={3} y={1} width={widthShape2 - 52} height={heightShape2}>
            <div xmlns="http://www.w3.org/1999/xhtml" className={`keyContentLabel`}>
              <ul>
                <li ref={setExtralabel} className={`${extraLabelClass ? "extraLabel" : ""}`}>
                  {centerExtra}
                </li>
                <li>{centerPrimary}</li>
              </ul>
            </div>
          </foreignObject>
        </g>
      ) : (
        ""
      )}

      <defs>
        <linearGradient
          id={`paintGradient${id}`}
          x1={keyType == "regularKey" ? xShape2 : 0}
          y1={yShape2}
          x2={keyType == "regularKey" ? xShape2 + widthShape2 : widthShape2}
          y2={yShape2}
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="25%" stopColor="#ffffff" stopOpacity="1" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
        </linearGradient>
      </defs>
    </>
  );
};
export default Key;
