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
  let keyInternalType;
  if (keyInternalType === undefined) {
    keyInternalType = "regularKey";
  } else {
    keyInternalType = keyType;
  }
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
    <g
      id={id}
      className={`${stroke === "#fff" ? "keyOnFocus" : "keyOnHold"} ${keyInternalType}`}
      onClick={onClick}
      data-led-index={dataLedIndex}
      data-key-index={dataKeyIndex}
      data-layer={dataLayer}
    >
      {keyInternalType === "regularKey" ? (
        <>
          <g xmlns="http://www.w3.org/2000/svg" filter={`url(#filter${id}01)`} className="shadowHover">
            <rect x={x} y={y} width={width} height={height} rx="4" className="keyBase" />
          </g>
          <g xmlns="http://www.w3.org/2000/svg">
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
          {/* <g className="shadowMiddle">
      <rect x={xShape2 + 10} y={yShape2 + 20} width={widthShape2 - 20} height={heightShape2 - 20} rx="4" fill={`#303949`} />
    </g> */}
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
          </g>
        </>
      ) : (
        ""
      )}

      <defs>
        <filter
          id={`filter${id}01`}
          //   x={65}
          x={x - width / 2}
          //   y="14"
          y={y - height / 4}
          width={width * 2 - 5}
          height={height * 2 - 5}
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
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
  );
};
export default Key;
