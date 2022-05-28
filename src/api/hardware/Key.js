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

import colorMatrixCalc from "../../renderer/utils/colorMatrixCalculation";

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
  const [colorMatrix, setColorMatrix] = React.useState(colorMatrixCalc("rgb(255,255,255)", 0.6));
  const xShape2 = x + 4;
  const yShape2 = y;
  const widthShape2 = width - 8;
  const heightShape2 = height - 8;
  const [extraLabelClass, setExtraLabelClass] = React.useState(false);
  const setExtralabel = React.useRef(null);

  React.useEffect(() => {
    setColor(fill);
    setColorMatrix(colorMatrixCalc(fill, 0.65));
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
          <g xmlns="http://www.w3.org/2000/svg" filter={`url(#filter${id}01)`}>
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
            {/* <text id={`${id}_t_primary`} fill={contrastText}>
        {centerPrimary}
      </text>
      <text id={`${id}_t_extra`} fill={contrastText}>
        {centerExtra}
      </text> */}
            <defs>
              <filter
                id={`filter${id}01`}
                //   x={65}
                // x={x - width / 2}
                //   y="14"
                // y={y - height / 4}
                x={x}
                y={y}
                width={width * 1.5}
                height={height * 1.5}
                filterUnits="userSpaceOnUse"
                colorInterpolationFilters="sRGB"
              >
                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                <feColorMatrix
                  in="SourceAlpha"
                  type="matrix"
                  values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                  result="hardAlpha"
                />
                <feOffset dy="4" />
                <feGaussianBlur stdDeviation="12" />
                <feComposite in2="hardAlpha" operator="out" />
                <feColorMatrix type="matrix" values={colorMatrix} />
                <feBlend mode="normal" in2="BackgroundImageFix" result={`effect1_dropShadow_${id}`} />
                <feBlend mode="normal" in="SourceGraphic" in2={`effect1_dropShadow_${id}`} result="shape" />
              </filter>
              <linearGradient
                id={`paintGradient${id}`}
                x1={xShape2}
                y1={yShape2}
                x2={xShape2 + widthShape2}
                y2={yShape2}
                gradientUnits="userSpaceOnUse"
              >
                <stop offset="25%" stopColor="#ffffff" stopOpacity="1" />
                <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
              </linearGradient>
            </defs>
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
          <g>
            <path
              d="M1.37773 4.98057C-0.325982 3.04224 1.05038 0 3.63103 0H115C117.209 0 119 1.79086 119 4V53C119 55.2091 117.209 57 115 57H49.8154C48.0899 57 46.4479 56.2571 45.3088 54.9611L1.37773 4.98057Z"
              fill={color}
            />
          </g>
          <g>
            <path
              d="M0.916945 5.08532C-0.923996 3.18134 0.425228 0 3.07366 0H110C112.209 0 114 1.79086 114 4V48C114 50.2091 112.209 52 110 52H48.8229C47.1966 52 45.6399 51.3398 44.5095 50.1706L0.916945 5.08532Z"
              fill={`yellow`}
            />
          </g>
          <foreignObject x={1} y={1} width={widthShape2} height={heightShape2}>
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

      {keyType == "t9" ? (
        <g
          id={id}
          className={`${stroke === "#fff" || stroke === "#000" ? "keyOnFocus" : "keyOnHold"} keyItem ${keyType}`}
          onClick={onClick}
          data-led-index={dataLedIndex}
          data-key-index={dataKeyIndex}
          data-layer={dataLayer}
          transform={`translate(${x + 24},${y + 24})`}
        >
          <g className="shadowHover">
            <path
              d="M26.3777 25.9806C24.674 24.0422 26.0504 21 28.631 21H140C142.209 21 144 22.7909 144 25V74C144 76.2091 142.209 78 140 78H74.8154C73.0899 78 71.4479 77.2571 70.3088 75.9611L26.3777 25.9806Z"
              fill={color}
            />
          </g>
          <g filter="url(#filter0_d_409_401)">
            <path
              d="M26.3777 25.9806C24.674 24.0422 26.0504 21 28.631 21H140C142.209 21 144 22.7909 144 25V74C144 76.2091 142.209 78 140 78H74.8154C73.0899 78 71.4479 77.2571 70.3088 75.9611L26.3777 25.9806Z"
              fill="#303949"
            />
            <path
              d="M26.3777 25.9806C24.674 24.0422 26.0504 21 28.631 21H140C142.209 21 144 22.7909 144 25V74C144 76.2091 142.209 78 140 78H74.8154C73.0899 78 71.4479 77.2571 70.3088 75.9611L26.3777 25.9806Z"
              fill="url(#paint0_linear_409_401)"
              fillOpacity="0.2"
            />
            <path
              d="M26.3777 25.9806C24.674 24.0422 26.0504 21 28.631 21H140C142.209 21 144 22.7909 144 25V74C144 76.2091 142.209 78 140 78H74.8154C73.0899 78 71.4479 77.2571 70.3088 75.9611L26.3777 25.9806Z"
              fill="#F178B6"
              fillOpacity="0.8"
            />
            <path
              d="M26.3777 25.9806C24.674 24.0422 26.0504 21 28.631 21H140C142.209 21 144 22.7909 144 25V74C144 76.2091 142.209 78 140 78H74.8154C73.0899 78 71.4479 77.2571 70.3088 75.9611L26.3777 25.9806Z"
              stroke="#F178B6"
              strokeWidth="2"
            />
          </g>
          <g filter="url(#filter1_d_409_401)" transform={`translate(1, 1)`}>
            <path
              d="M28.9169 26.0853C27.076 24.1813 28.4252 21 31.0737 21H138C140.209 21 142 22.7909 142 25V69C142 71.2091 140.209 73 138 73H76.8229C75.1966 73 73.6399 72.3398 72.5095 71.1706L28.9169 26.0853Z"
              fill="#303949"
            />
            <path
              d="M28.9169 26.0853C27.076 24.1813 28.4252 21 31.0737 21H138C140.209 21 142 22.7909 142 25V69C142 71.2091 140.209 73 138 73H76.8229C75.1966 73 73.6399 72.3398 72.5095 71.1706L28.9169 26.0853Z"
              fill="url(#paint1_linear_409_401)"
              fillOpacity="0.2"
            />
            <path
              d="M28.9169 26.0853C27.076 24.1813 28.4252 21 31.0737 21H138C140.209 21 142 22.7909 142 25V69C142 71.2091 140.209 73 138 73H76.8229C75.1966 73 73.6399 72.3398 72.5095 71.1706L28.9169 26.0853Z"
              fill="#F178B6"
              fillOpacity="0.3"
            />
            <foreignObject x={1} y={1} width={width} height={height}>
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
    </>
  );
};
export default Key;
