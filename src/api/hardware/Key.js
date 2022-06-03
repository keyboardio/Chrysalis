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
import ListModifiersKey from "../../renderer/component/ListModifiers/ListModifiersKey";

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

  const [altApplied, setAltApplied] = React.useState(false);
  const [altGrApplied, setAltGrApplied] = React.useState(false);
  const [ctrlApplied, setCtrlApplied] = React.useState(false);
  const [osApplied, setOsApplied] = React.useState(false);
  const [shiftApplied, setShiftApplied] = React.useState(false);
  const [mehApplied, setMehApplied] = React.useState(false);
  const [hyperApplied, setHyperApplied] = React.useState(false);

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
    setExtralabel.current.innerText.includes("C+") ? setCtrlApplied(true) : setCtrlApplied(false);
    setExtralabel.current.innerText.includes("A+") ? setAltApplied(true) : setAltApplied(false);
    setExtralabel.current.innerText.includes("AG") ? setAltGrApplied(true) : setAltGrApplied(false);
    setExtralabel.current.innerText.includes("G+") ? setOsApplied(true) : setOsApplied(false);
    setExtralabel.current.innerText.includes("S+") ? setShiftApplied(true) : setShiftApplied(false);
    setExtralabel.current.innerText.includes("Meh+") || setExtralabel.current.innerText.includes("M+")
      ? setMehApplied(true)
      : setMehApplied(false);
    setExtralabel.current.innerText.includes("Hyper+") || setExtralabel.current.innerText.includes("H+")
      ? setHyperApplied(true)
      : setHyperApplied(false);
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
            <rect
              x={xShape2}
              y={yShape2}
              width={widthShape2}
              height={heightShape2}
              rx="4"
              className="keyAnimation"
              stroke="#fff"
              strokeWidth="1"
              fill="transparent"
              strokeOpacity="1"
            />

            <foreignObject x={xShape2} y={yShape2} width={widthShape2} height={heightShape2}>
              <div xmlns="http://www.w3.org/1999/xhtml" className={`keyContentLabel`}>
                <ul>
                  <li
                    ref={setExtralabel}
                    className={`${extraLabelClass ? "extraLabel" : ""} ${
                      altApplied || altGrApplied || ctrlApplied || osApplied || shiftApplied || mehApplied || hyperApplied
                        ? "hidden-extraLabel"
                        : ""
                    }`}
                  >
                    {centerExtra}
                  </li>
                  <li
                    className={`labelClass ${
                      altApplied || altGrApplied || ctrlApplied || osApplied || shiftApplied || mehApplied || hyperApplied
                        ? "labelClass-withModifiers"
                        : ""
                    }`}
                  >
                    {centerPrimary}
                  </li>
                </ul>
              </div>
            </foreignObject>
            <foreignObject x={x} y={y} width={width + 6} height={height}>
              <ListModifiersKey
                mehApplied={mehApplied}
                hyperApplied={hyperApplied}
                altApplied={altApplied}
                altGrApplied={altGrApplied}
                ctrlApplied={ctrlApplied}
                shiftApplied={shiftApplied}
                osApplied={osApplied}
              />
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

            <path
              d="M0.930799 5.08781C-0.913514 3.18477 0.434998 0 3.0851 0H108C110.209 0 112 1.79086 112 4V47C112 49.2091 110.209 51 108 51H47.9666C46.3427 51 44.7882 50.3418 43.658 49.1756L0.930799 5.08781Z"
              className="keyAnimation"
              stroke="#fff"
              strokeWidth="1"
              fill="transparent"
              strokeOpacity="1"
            />
          </g>
          <foreignObject x={42} y={1} width={widthShape2 - 52} height={heightShape2}>
            <div xmlns="http://www.w3.org/1999/xhtml" className={`keyContentLabel`}>
              <ul>
                <li
                  ref={setExtralabel}
                  className={`${extraLabelClass ? "extraLabel" : ""} ${
                    altApplied || altGrApplied || ctrlApplied || osApplied || shiftApplied || mehApplied || hyperApplied
                      ? "hidden-extraLabel"
                      : ""
                  }`}
                >
                  {centerExtra}
                </li>
                <li
                  className={`labelClass ${
                    altApplied || altGrApplied || ctrlApplied || osApplied || shiftApplied || mehApplied || hyperApplied
                      ? "labelClass-withModifiers"
                      : ""
                  }`}
                >
                  {centerPrimary}
                </li>
              </ul>
            </div>
          </foreignObject>
          <foreignObject x={40} y={1} width={widthShape2 - 52} height={height}>
            <ListModifiersKey
              mehApplied={mehApplied}
              hyperApplied={hyperApplied}
              altApplied={altApplied}
              altGrApplied={altGrApplied}
              ctrlApplied={ctrlApplied}
              shiftApplied={shiftApplied}
              osApplied={osApplied}
            />
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

            <path
              d="M111.825 5.08781C113.67 3.18477 112.321 0 109.671 0H4.75611C2.54697 0 0.756104 1.79086 0.756104 4V47C0.756104 49.2091 2.54696 51 4.7561 51H64.7895C66.4134 51 67.9679 50.3418 69.0981 49.1756L111.825 5.08781Z"
              className="keyAnimation"
              stroke="#fff"
              strokeWidth="1"
              fill="transparent"
              strokeOpacity="1"
            />
          </g>
          <foreignObject x={3} y={1} width={widthShape2 - 52} height={heightShape2}>
            <div xmlns="http://www.w3.org/1999/xhtml" className={`keyContentLabel`}>
              <ul>
                <li
                  ref={setExtralabel}
                  className={`${extraLabelClass ? "extraLabel" : ""} ${
                    altApplied || altGrApplied || ctrlApplied || osApplied || shiftApplied || mehApplied || hyperApplied
                      ? "hidden-extraLabel"
                      : ""
                  }`}
                >
                  {centerExtra}
                </li>
                <li
                  className={`labelClass ${
                    altApplied || altGrApplied || ctrlApplied || osApplied || shiftApplied || mehApplied || hyperApplied
                      ? "labelClass-withModifiers"
                      : ""
                  }`}
                >
                  {centerPrimary}
                </li>
              </ul>
            </div>
          </foreignObject>
          <foreignObject x={0} y={1} width={width - 52} height={height}>
            <ListModifiersKey
              mehApplied={mehApplied}
              hyperApplied={hyperApplied}
              altApplied={altApplied}
              altGrApplied={altGrApplied}
              ctrlApplied={ctrlApplied}
              shiftApplied={shiftApplied}
              osApplied={osApplied}
            />
          </foreignObject>
        </g>
      ) : (
        ""
      )}

      {keyType == "enterKey" ? (
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
              xmlns="http://www.w3.org/2000/svg"
              d="M69 4C69 1.79086 67.2091 0 65 0H4C1.79086 0 0 1.79086 0 4V53C0 55.2091 1.79086 57 4 57H17C19.2091 57 21 58.7909 21 61V120C21 122.209 22.7909 124 25 124H65C67.2091 124 69 122.209 69 120V4Z"
              fill={color}
            />
          </g>
          <g>
            <path
              xmlns="http://www.w3.org/2000/svg"
              d="M69 4C69 1.79086 67.2091 0 65 0H4C1.79086 0 0 1.79086 0 4V53C0 55.2091 1.79086 57 4 57H17C19.2091 57 21 58.7909 21 61V120C21 122.209 22.7909 124 25 124H65C67.2091 124 69 122.209 69 120V4Z"
              fill={`#303949`}
            />
            <path
              xmlns="http://www.w3.org/2000/svg"
              d="M69 4C69 1.79086 67.2091 0 65 0H4C1.79086 0 0 1.79086 0 4V53C0 55.2091 1.79086 57 4 57H17C19.2091 57 21 58.7909 21 61V120C21 122.209 22.7909 124 25 124H65C67.2091 124 69 122.209 69 120V4Z"
              fill={`url(#paintGradient${id})`}
              fillOpacity="0.2"
            />
            <path
              xmlns="http://www.w3.org/2000/svg"
              d="M69 4C69 1.79086 67.2091 0 65 0H4C1.79086 0 0 1.79086 0 4V53C0 55.2091 1.79086 57 4 57H17C19.2091 57 21 58.7909 21 61V120C21 122.209 22.7909 124 25 124H65C67.2091 124 69 122.209 69 120V4Z"
              fill={color}
              className="keyColorOpacity"
            />
            <path
              xmlns="http://www.w3.org/2000/svg"
              d="M69 4C69 1.79086 67.2091 0 65 0H4C1.79086 0 0 1.79086 0 4V53C0 55.2091 1.79086 57 4 57H17C19.2091 57 21 58.7909 21 61V120C21 122.209 22.7909 124 25 124H65C67.2091 124 69 122.209 69 120V4Z"
              className="keyOpacityInternal"
              stroke={color}
              strokeWidth="2"
              fill="transparent"
            />
          </g>
          <g className="shadowMiddle" transform={`translate(${4},${0})`}>
            <path
              xmlns="http://www.w3.org/2000/svg"
              d="M61 4C61 1.79086 59.2091 0 57 0H4C1.79086 0 0 1.79086 0 4V47C0 49.2091 1.79086 51 4 51H17C19.2091 51 21 52.7909 21 55V114C21 116.209 22.7909 118 25 118H57C59.2091 118 61 116.209 61 114V4Z"
              fill={color}
            />
          </g>
          <g xmlns="http://www.w3.org/2000/svg" transform={`translate(${4},${0})`}>
            <path
              xmlns="http://www.w3.org/2000/svg"
              d="M61 4C61 1.79086 59.2091 0 57 0H4C1.79086 0 0 1.79086 0 4V47C0 49.2091 1.79086 51 4 51H17C19.2091 51 21 52.7909 21 55V114C21 116.209 22.7909 118 25 118H57C59.2091 118 61 116.209 61 114V4Z"
              className="keyBase"
            />
            <path
              xmlns="http://www.w3.org/2000/svg"
              d="M61 4C61 1.79086 59.2091 0 57 0H4C1.79086 0 0 1.79086 0 4V47C0 49.2091 1.79086 51 4 51H17C19.2091 51 21 52.7909 21 55V114C21 116.209 22.7909 118 25 118H57C59.2091 118 61 116.209 61 114V4Z"
              fill={`url(#paintGradient${id})`}
              fillOpacity="0.25"
            />
            <path
              xmlns="http://www.w3.org/2000/svg"
              d="M61 4C61 1.79086 59.2091 0 57 0H4C1.79086 0 0 1.79086 0 4V47C0 49.2091 1.79086 51 4 51H17C19.2091 51 21 52.7909 21 55V114C21 116.209 22.7909 118 25 118H57C59.2091 118 61 116.209 61 114V4Z"
              fill={color}
              fillOpacity="0.2"
            />
            <path
              xmlns="http://www.w3.org/2000/svg"
              d="M61 4C61 1.79086 59.2091 0 57 0H4C1.79086 0 0 1.79086 0 4V47C0 49.2091 1.79086 51 4 51H17C19.2091 51 21 52.7909 21 55V114C21 116.209 22.7909 118 25 118H57C59.2091 118 61 116.209 61 114V4Z"
              className="keyOpacity"
              stroke="#fff"
              strokeWidth="2"
              fill="transparent"
              strokeOpacity="0"
            />
            <path
              xmlns="http://www.w3.org/2000/svg"
              d="M61 4C61 1.79086 59.2091 0 57 0H4C1.79086 0 0 1.79086 0 4V47C0 49.2091 1.79086 51 4 51H17C19.2091 51 21 52.7909 21 55V114C21 116.209 22.7909 118 25 118H57C59.2091 118 61 116.209 61 114V4Z"
              className="keyAnimation"
              stroke="#fff"
              strokeWidth="1"
              fill="transparent"
              strokeOpacity="1"
            />
          </g>
          <foreignObject x={3} y={0} width={widthShape2 - 6} height={49}>
            <div xmlns="http://www.w3.org/1999/xhtml" className={`keyContentLabel`}>
              <ul>
                <li
                  ref={setExtralabel}
                  className={`${extraLabelClass ? "extraLabel" : ""} ${
                    altApplied || altGrApplied || ctrlApplied || osApplied || shiftApplied || mehApplied || hyperApplied
                      ? "hidden-extraLabel"
                      : ""
                  }`}
                >
                  {centerExtra}
                </li>
                <li
                  className={`labelClass ${
                    altApplied || altGrApplied || ctrlApplied || osApplied || shiftApplied || mehApplied || hyperApplied
                      ? "labelClass-withModifiers"
                      : ""
                  }`}
                >
                  {centerPrimary}
                </li>
              </ul>
            </div>
          </foreignObject>
          <foreignObject x={0} y={1} width={width} height={60}>
            <ListModifiersKey
              mehApplied={mehApplied}
              hyperApplied={hyperApplied}
              altApplied={altApplied}
              altGrApplied={altGrApplied}
              ctrlApplied={ctrlApplied}
              shiftApplied={shiftApplied}
              osApplied={osApplied}
            />
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
