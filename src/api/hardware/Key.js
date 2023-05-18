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
  selectedKey,
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
  const [isActive, setIsActive] = React.useState(false);
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
    setExtralabel.current.innerText.includes("O+") ? setOsApplied(true) : setOsApplied(false);
    setExtralabel.current.innerText.includes("S+") ? setShiftApplied(true) : setShiftApplied(false);
    setExtralabel.current.innerText.includes("Meh+") || setExtralabel.current.innerText.includes("M+")
      ? setMehApplied(true)
      : setMehApplied(false);
    setExtralabel.current.innerText.includes("Hyper+") || setExtralabel.current.innerText.includes("H+")
      ? setHyperApplied(true)
      : setHyperApplied(false);
  }, [centerPrimary, centerExtra]);

  // React.useEffect(() => {
  //   console.log("selectedKey internal: ", parseInt(selectedKey));
  //   console.log("dataKeyIndex internal: ", dataKeyIndex);
  //   if (parseInt(selectedKey) === parseInt(dataKeyIndex)) {
  //     setIsActive(true);
  //   }
  // }, [selectedKey]);

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
          <g className="baseShape">
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
          <g>
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
              strokeOpacity="0"
            />
          </g>
          <g xmlns="http://www.w3.org/2000/svg" className="contentForeignObject">
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
          <g className="baseShape">
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
          <g className="baseShape">
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
          <g className="baseShape">
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

      {/* DEFY THUMBS KEYS */}
      {keyType == "defy-t1" ? (
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
              d="M0 4.989a4 4 0 014-4h74.202a4 4 0 013.994 4.217l-2.39 43.81a4 4 0 01-3.994 3.783H4a4 4 0 01-4-4V4.989z"
              fill={color}
            />
          </g>

          <g className="baseShape">
            <path
              d="M0 4.989a4 4 0 014-4h74.202a4 4 0 013.994 4.217l-2.39 43.81a4 4 0 01-3.994 3.783H4a4 4 0 01-4-4V4.989z"
              fill={`#303949`}
            />
            <path
              d="M0 4.989a4 4 0 014-4h74.202a4 4 0 013.994 4.217l-2.39 43.81a4 4 0 01-3.994 3.783H4a4 4 0 01-4-4V4.989z"
              fill={`url(#paintGradient${id})`}
              fillOpacity="0.2"
            />
            <path
              d="M0 4.989a4 4 0 014-4h74.202a4 4 0 013.994 4.217l-2.39 43.81a4 4 0 01-3.994 3.783H4a4 4 0 01-4-4V4.989z"
              fill={color}
              className="keyColorOpacity"
            />
            <path
              d="M0 4.989a4 4 0 014-4h74.202a4 4 0 013.994 4.217l-2.39 43.81a4 4 0 01-3.994 3.783H4a4 4 0 01-4-4V4.989z"
              className="keyOpacityInternal"
              stroke={color}
              strokeWidth="2"
              fill="transparent"
            />
          </g>
          <g className="shadowMiddle" transform={`translate(${0},${12})`}>
            <path
              d="M0 4.989a4 4 0 014-4h74.202a4 4 0 013.994 4.217l-2.39 43.81a4 4 0 01-3.994 3.783H4a4 4 0 01-4-4V4.989z"
              fill={color}
            />
          </g>
          <g transform={`translate(${4},${0})`}>
            <path
              d="M.826 4.989a4 4 0 014-4h68.522a4 4 0 013.992 4.244l-2.336 38.158a4 4 0 01-3.993 3.756H4.826a4 4 0 01-4-4V4.989z"
              className="keyBase"
            />
            <path
              d="M.826 4.989a4 4 0 014-4h68.522a4 4 0 013.992 4.244l-2.336 38.158a4 4 0 01-3.993 3.756H4.826a4 4 0 01-4-4V4.989z"
              fill={`url(#paintGradient${id})`}
              fillOpacity="0.25"
            />
            <path
              d="M.826 4.989a4 4 0 014-4h68.522a4 4 0 013.992 4.244l-2.336 38.158a4 4 0 01-3.993 3.756H4.826a4 4 0 01-4-4V4.989z"
              fill={color}
              fillOpacity="0.2"
            />
            <path
              d="M.826 4.989a4 4 0 014-4h68.522a4 4 0 013.992 4.244l-2.336 38.158a4 4 0 01-3.993 3.756H4.826a4 4 0 01-4-4V4.989z"
              className="keyOpacity"
              stroke="#fff"
              strokeWidth="2"
              fill="transparent"
              strokeOpacity="0"
            />

            <path
              d="M.826 4.989a4 4 0 014-4h68.522a4 4 0 013.992 4.244l-2.336 38.158a4 4 0 01-3.993 3.756H4.826a4 4 0 01-4-4V4.989z"
              className="keyAnimation"
              stroke="#fff"
              strokeWidth="1"
              fill="transparent"
              strokeOpacity="1"
            />
          </g>
          <foreignObject x={3} y={1} width={widthShape2} height={heightShape2}>
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
          <foreignObject x={0} y={1} width={width} height={height}>
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
      {keyType == "defy-t2" ? (
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
              d="M45.102 55.67a335.167 335.167 0 00-41.705-3.605 3.486 3.486 0 01-3.39-3.698L2.88 3.743A4 4 0 016.872 0h51.252c2.635 0 4.55 2.503 3.861 5.046L49.014 52.943a3.461 3.461 0 01-3.912 2.726z"
              fill={color}
            />
          </g>

          <g className="baseShape">
            <path
              d="M45.102 55.67a335.167 335.167 0 00-41.705-3.605 3.486 3.486 0 01-3.39-3.698L2.88 3.743A4 4 0 016.872 0h51.252c2.635 0 4.55 2.503 3.861 5.046L49.014 52.943a3.461 3.461 0 01-3.912 2.726z"
              fill={`#303949`}
            />
            <path
              d="M45.102 55.67a335.167 335.167 0 00-41.705-3.605 3.486 3.486 0 01-3.39-3.698L2.88 3.743A4 4 0 016.872 0h51.252c2.635 0 4.55 2.503 3.861 5.046L49.014 52.943a3.461 3.461 0 01-3.912 2.726z"
              fill={`url(#paintGradient${id})`}
              fillOpacity="0.2"
            />
            <path
              d="M45.102 55.67a335.167 335.167 0 00-41.705-3.605 3.486 3.486 0 01-3.39-3.698L2.88 3.743A4 4 0 016.872 0h51.252c2.635 0 4.55 2.503 3.861 5.046L49.014 52.943a3.461 3.461 0 01-3.912 2.726z"
              fill={color}
              className="keyColorOpacity"
            />
            <path
              d="M45.102 55.67a335.167 335.167 0 00-41.705-3.605 3.486 3.486 0 01-3.39-3.698L2.88 3.743A4 4 0 016.872 0h51.252c2.635 0 4.55 2.503 3.861 5.046L49.014 52.943a3.461 3.461 0 01-3.912 2.726z"
              className="keyOpacityInternal"
              stroke={color}
              strokeWidth="2"
              fill="transparent"
            />
          </g>
          <g className="shadowMiddle" transform={`translate(${0},${12})`}>
            <path
              d="M40.217 49.017c-12.96-1.506-24.553-2.312-36.052-2.604a3.484 3.484 0 01-3.39-3.698L2.753 3.797A4 4 0 016.749 0h45.455c2.663 0 4.582 2.554 3.842 5.112L44.129 46.291a3.461 3.461 0 01-3.912 2.726z"
              fill={color}
            />
          </g>
          <g transform={`translate(${4},${0})`}>
            <path
              d="M40.217 49.017c-12.96-1.506-24.553-2.312-36.052-2.604a3.484 3.484 0 01-3.39-3.698L2.753 3.797A4 4 0 016.749 0h45.455c2.663 0 4.582 2.554 3.842 5.112L44.129 46.291a3.461 3.461 0 01-3.912 2.726z"
              className="keyBase"
            />
            <path
              d="M40.217 49.017c-12.96-1.506-24.553-2.312-36.052-2.604a3.484 3.484 0 01-3.39-3.698L2.753 3.797A4 4 0 016.749 0h45.455c2.663 0 4.582 2.554 3.842 5.112L44.129 46.291a3.461 3.461 0 01-3.912 2.726z"
              fill={`url(#paintGradient${id})`}
              fillOpacity="0.25"
            />
            <path
              d="M40.217 49.017c-12.96-1.506-24.553-2.312-36.052-2.604a3.484 3.484 0 01-3.39-3.698L2.753 3.797A4 4 0 016.749 0h45.455c2.663 0 4.582 2.554 3.842 5.112L44.129 46.291a3.461 3.461 0 01-3.912 2.726z"
              fill={color}
              fillOpacity="0.2"
            />
            <path
              d="M40.217 49.017c-12.96-1.506-24.553-2.312-36.052-2.604a3.484 3.484 0 01-3.39-3.698L2.753 3.797A4 4 0 016.749 0h45.455c2.663 0 4.582 2.554 3.842 5.112L44.129 46.291a3.461 3.461 0 01-3.912 2.726z"
              className="keyOpacity"
              stroke="#fff"
              strokeWidth="2"
              fill="transparent"
              strokeOpacity="0"
            />

            <path
              d="M40.217 49.017c-12.96-1.506-24.553-2.312-36.052-2.604a3.484 3.484 0 01-3.39-3.698L2.753 3.797A4 4 0 016.749 0h45.455c2.663 0 4.582 2.554 3.842 5.112L44.129 46.291a3.461 3.461 0 01-3.912 2.726z"
              className="keyAnimation"
              stroke="#fff"
              strokeWidth="1"
              fill="transparent"
              strokeOpacity="1"
            />
          </g>

          <g className="keyContentLabelRotate">
            <foreignObject x={3} y={1} width={widthShape2} height={heightShape2}>
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
            <foreignObject x={0} y={1} width={width} height={height}>
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
      {keyType == "defy-t3" ? (
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
              d="M2.662 57.508a160.536 160.536 0 0134.165 12.66 3.438 3.438 0 004.481-1.256l31.202-49.79a3.507 3.507 0 00-1.376-4.954C53.5 5.164 35.095.958 15.318.007a3.51 3.51 0 00-3.652 2.774L.078 53.406a3.485 3.485 0 002.513 4.102h.071z"
              fill={color}
            />
          </g>

          <g className="baseShape">
            <path
              d="M2.662 57.508a160.536 160.536 0 0134.165 12.66 3.438 3.438 0 004.481-1.256l31.202-49.79a3.507 3.507 0 00-1.376-4.954C53.5 5.164 35.095.958 15.318.007a3.51 3.51 0 00-3.652 2.774L.078 53.406a3.485 3.485 0 002.513 4.102h.071z"
              fill={`#303949`}
            />
            <path
              d="M2.662 57.508a160.536 160.536 0 0134.165 12.66 3.438 3.438 0 004.481-1.256l31.202-49.79a3.507 3.507 0 00-1.376-4.954C53.5 5.164 35.095.958 15.318.007a3.51 3.51 0 00-3.652 2.774L.078 53.406a3.485 3.485 0 002.513 4.102h.071z"
              fill={`url(#paintGradient${id})`}
              fillOpacity="0.2"
            />
            <path
              d="M2.662 57.508a160.536 160.536 0 0134.165 12.66 3.438 3.438 0 004.481-1.256l31.202-49.79a3.507 3.507 0 00-1.376-4.954C53.5 5.164 35.095.958 15.318.007a3.51 3.51 0 00-3.652 2.774L.078 53.406a3.485 3.485 0 002.513 4.102h.071z"
              fill={color}
              className="keyColorOpacity"
            />
            <path
              d="M2.662 57.508a160.536 160.536 0 0134.165 12.66 3.438 3.438 0 004.481-1.256l31.202-49.79a3.507 3.507 0 00-1.376-4.954C53.5 5.164 35.095.958 15.318.007a3.51 3.51 0 00-3.652 2.774L.078 53.406a3.485 3.485 0 002.513 4.102h.071z"
              className="keyOpacityInternal"
              stroke={color}
              strokeWidth="2"
              fill="transparent"
            />
          </g>
          <g className="shadowMiddle" transform={`translate(${0},${12})`}>
            <path
              d="M3.373 52.798c10.562 2.114 19.562 5.316 28.455 9.835a3.438 3.438 0 004.48-1.257l29.376-43.195a3.51 3.51 0 00-1.375-4.956C44.42 4.053 30.29 1.228 14.143.95a3.51 3.51 0 00-3.651 2.774L.789 48.696a3.485 3.485 0 002.513 4.102h.07z"
              fill={color}
            />
          </g>
          <g transform={`translate(${4},${0})`}>
            <path
              d="M3.373 52.798c10.562 2.114 19.562 5.316 28.455 9.835a3.438 3.438 0 004.48-1.257l29.376-43.195a3.51 3.51 0 00-1.375-4.956C44.42 4.053 30.29 1.228 14.143.95a3.51 3.51 0 00-3.651 2.774L.789 48.696a3.485 3.485 0 002.513 4.102h.07z"
              className="keyBase"
            />
            <path
              d="M3.373 52.798c10.562 2.114 19.562 5.316 28.455 9.835a3.438 3.438 0 004.48-1.257l29.376-43.195a3.51 3.51 0 00-1.375-4.956C44.42 4.053 30.29 1.228 14.143.95a3.51 3.51 0 00-3.651 2.774L.789 48.696a3.485 3.485 0 002.513 4.102h.07z"
              fill={`url(#paintGradient${id})`}
              fillOpacity="0.25"
            />
            <path
              d="M3.373 52.798c10.562 2.114 19.562 5.316 28.455 9.835a3.438 3.438 0 004.48-1.257l29.376-43.195a3.51 3.51 0 00-1.375-4.956C44.42 4.053 30.29 1.228 14.143.95a3.51 3.51 0 00-3.651 2.774L.789 48.696a3.485 3.485 0 002.513 4.102h.07z"
              fill={color}
              fillOpacity="0.2"
            />
            <path
              d="M3.373 52.798c10.562 2.114 19.562 5.316 28.455 9.835a3.438 3.438 0 004.48-1.257l29.376-43.195a3.51 3.51 0 00-1.375-4.956C44.42 4.053 30.29 1.228 14.143.95a3.51 3.51 0 00-3.651 2.774L.789 48.696a3.485 3.485 0 002.513 4.102h.07z"
              className="keyOpacity"
              stroke="#fff"
              strokeWidth="2"
              fill="transparent"
              strokeOpacity="0"
            />

            <path
              d="M40.217 49.017c-12.96-1.506-24.553-2.312-36.052-2.604a3.484 3.484 0 01-3.39-3.698L2.753 3.797A4 4 0 016.749 0h45.455c2.663 0 4.582 2.554 3.842 5.112L44.129 46.291a3.461 3.461 0 01-3.912 2.726z"
              className="keyAnimation"
              stroke="#fff"
              strokeWidth="1"
              fill="transparent"
              strokeOpacity="1"
            />
          </g>
          <g className="keyContentLabelRotate">
            <foreignObject x={3} y={1} width={widthShape2} height={heightShape2}>
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
            <foreignObject x={0} y={1} width={width} height={height}>
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

      {keyType == "defy-t4" ? (
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
              d="M1.484 56.77a113.488 113.488 0 0125.225 23.891 3.368 3.368 0 004.71.666l42.113-29.81a3.447 3.447 0 001.355-1.953 3.476 3.476 0 00-.225-2.374C68.256 33.426 52.758 12.032 35.99.574a3.445 3.445 0 00-2.656-.49 3.482 3.482 0 00-2.197 1.583L.519 52.063a3.522 3.522 0 00-.446 2.548c.18.876.685 1.648 1.412 2.16z"
              fill={color}
            />
          </g>

          <g className="baseShape">
            <path
              d="M1.484 56.77a113.488 113.488 0 0125.225 23.891 3.368 3.368 0 004.71.666l42.113-29.81a3.447 3.447 0 001.355-1.953 3.476 3.476 0 00-.225-2.374C68.256 33.426 52.758 12.032 35.99.574a3.445 3.445 0 00-2.656-.49 3.482 3.482 0 00-2.197 1.583L.519 52.063a3.522 3.522 0 00-.446 2.548c.18.876.685 1.648 1.412 2.16z"
              fill={`#303949`}
            />
            <path
              d="M1.484 56.77a113.488 113.488 0 0125.225 23.891 3.368 3.368 0 004.71.666l42.113-29.81a3.447 3.447 0 001.355-1.953 3.476 3.476 0 00-.225-2.374C68.256 33.426 52.758 12.032 35.99.574a3.445 3.445 0 00-2.656-.49 3.482 3.482 0 00-2.197 1.583L.519 52.063a3.522 3.522 0 00-.446 2.548c.18.876.685 1.648 1.412 2.16z"
              fill={`url(#paintGradient${id})`}
              fillOpacity="0.2"
            />
            <path
              d="M1.484 56.77a113.488 113.488 0 0125.225 23.891 3.368 3.368 0 004.71.666l42.113-29.81a3.447 3.447 0 001.355-1.953 3.476 3.476 0 00-.225-2.374C68.256 33.426 52.758 12.032 35.99.574a3.445 3.445 0 00-2.656-.49 3.482 3.482 0 00-2.197 1.583L.519 52.063a3.522 3.522 0 00-.446 2.548c.18.876.685 1.648 1.412 2.16z"
              fill={color}
              className="keyColorOpacity"
            />
            <path
              d="M1.484 56.77a113.488 113.488 0 0125.225 23.891 3.368 3.368 0 004.71.666l42.113-29.81a3.447 3.447 0 001.355-1.953 3.476 3.476 0 00-.225-2.374C68.256 33.426 52.758 12.032 35.99.574a3.445 3.445 0 00-2.656-.49 3.482 3.482 0 00-2.197 1.583L.519 52.063a3.522 3.522 0 00-.446 2.548c.18.876.685 1.648 1.412 2.16z"
              className="keyOpacityInternal"
              stroke={color}
              strokeWidth="2"
              fill="transparent"
            />
          </g>
          <g className="shadowMiddle" transform={`translate(${0},${12})`}>
            <path
              d="M1.484 51.77C10.5 58.106 15 62 23.709 71.661a3.368 3.368 0 004.71.666l37.113-25.81a3.447 3.447 0 001.355-1.953 3.476 3.476 0 00-.225-2.374C54 22.5 49.5 14.5 31.99.574a3.445 3.445 0 00-2.656-.49 3.482 3.482 0 00-2.197 1.583L.519 47.063a3.522 3.522 0 00-.446 2.548c.18.876.685 1.648 1.412 2.16z"
              fill={color}
            />
          </g>
          <g transform={`translate(${4},${0})`}>
            <path
              d="M1.484 51.77C10.5 58.106 15 62 23.709 71.661a3.368 3.368 0 004.71.666l37.113-25.81a3.447 3.447 0 001.355-1.953 3.476 3.476 0 00-.225-2.374C54 22.5 49.5 14.5 31.99.574a3.445 3.445 0 00-2.656-.49 3.482 3.482 0 00-2.197 1.583L.519 47.063a3.522 3.522 0 00-.446 2.548c.18.876.685 1.648 1.412 2.16z"
              className="keyBase"
            />
            <path
              d="M1.484 51.77C10.5 58.106 15 62 23.709 71.661a3.368 3.368 0 004.71.666l37.113-25.81a3.447 3.447 0 001.355-1.953 3.476 3.476 0 00-.225-2.374C54 22.5 49.5 14.5 31.99.574a3.445 3.445 0 00-2.656-.49 3.482 3.482 0 00-2.197 1.583L.519 47.063a3.522 3.522 0 00-.446 2.548c.18.876.685 1.648 1.412 2.16z"
              fill={`url(#paintGradient${id})`}
              fillOpacity="0.25"
            />
            <path
              d="M1.484 51.77C10.5 58.106 15 62 23.709 71.661a3.368 3.368 0 004.71.666l37.113-25.81a3.447 3.447 0 001.355-1.953 3.476 3.476 0 00-.225-2.374C54 22.5 49.5 14.5 31.99.574a3.445 3.445 0 00-2.656-.49 3.482 3.482 0 00-2.197 1.583L.519 47.063a3.522 3.522 0 00-.446 2.548c.18.876.685 1.648 1.412 2.16z"
              fill={color}
              fillOpacity="0.2"
            />
            <path
              d="M1.484 51.77C10.5 58.106 15 62 23.709 71.661a3.368 3.368 0 004.71.666l37.113-25.81a3.447 3.447 0 001.355-1.953 3.476 3.476 0 00-.225-2.374C54 22.5 49.5 14.5 31.99.574a3.445 3.445 0 00-2.656-.49 3.482 3.482 0 00-2.197 1.583L.519 47.063a3.522 3.522 0 00-.446 2.548c.18.876.685 1.648 1.412 2.16z"
              className="keyOpacity"
              stroke="#fff"
              strokeWidth="2"
              fill="transparent"
              strokeOpacity="0"
            />

            <path
              d="M1.484 51.77C10.5 58.106 15 62 23.709 71.661a3.368 3.368 0 004.71.666l37.113-25.81a3.447 3.447 0 001.355-1.953 3.476 3.476 0 00-.225-2.374C54 22.5 49.5 14.5 31.99.574a3.445 3.445 0 00-2.656-.49 3.482 3.482 0 00-2.197 1.583L.519 47.063a3.522 3.522 0 00-.446 2.548c.18.876.685 1.648 1.412 2.16z"
              className="keyAnimation"
              stroke="#fff"
              strokeWidth="1"
              fill="transparent"
              strokeOpacity="1"
            />
          </g>
          <g className="keyContentLabelRotate">
            <foreignObject x={3} y={1} width={widthShape2} height={heightShape2}>
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
            <foreignObject x={0} y={1} width={width} height={height}>
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
      {keyType == "defy-t5" ? (
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
              d="M23.3 52h46.985a3.527 3.527 0 002.404-.962 3.476 3.476 0 001.086-2.335L75.996 3.63a3.465 3.465 0 00-.969-2.55A3.514 3.514 0 0072.508 0H3.488c-.58.004-1.15.15-1.658.426S.89 1.098.573 1.579a3.47 3.47 0 00-.288 3.284l19.812 45.073a3.494 3.494 0 001.294 1.502A3.532 3.532 0 0023.3 52z"
              fill={color}
            />
          </g>

          <g className="baseShape">
            <path
              d="M23.3 52h46.985a3.527 3.527 0 002.404-.962 3.476 3.476 0 001.086-2.335L75.996 3.63a3.465 3.465 0 00-.969-2.55A3.514 3.514 0 0072.508 0H3.488c-.58.004-1.15.15-1.658.426S.89 1.098.573 1.579a3.47 3.47 0 00-.288 3.284l19.812 45.073a3.494 3.494 0 001.294 1.502A3.532 3.532 0 0023.3 52z"
              fill={`#303949`}
            />
            <path
              d="M23.3 52h46.985a3.527 3.527 0 002.404-.962 3.476 3.476 0 001.086-2.335L75.996 3.63a3.465 3.465 0 00-.969-2.55A3.514 3.514 0 0072.508 0H3.488c-.58.004-1.15.15-1.658.426S.89 1.098.573 1.579a3.47 3.47 0 00-.288 3.284l19.812 45.073a3.494 3.494 0 001.294 1.502A3.532 3.532 0 0023.3 52z"
              fill={`url(#paintGradient${id})`}
              fillOpacity="0.2"
            />
            <path
              d="M23.3 52h46.985a3.527 3.527 0 002.404-.962 3.476 3.476 0 001.086-2.335L75.996 3.63a3.465 3.465 0 00-.969-2.55A3.514 3.514 0 0072.508 0H3.488c-.58.004-1.15.15-1.658.426S.89 1.098.573 1.579a3.47 3.47 0 00-.288 3.284l19.812 45.073a3.494 3.494 0 001.294 1.502A3.532 3.532 0 0023.3 52z"
              fill={color}
              className="keyColorOpacity"
            />
            <path
              d="M23.3 52h46.985a3.527 3.527 0 002.404-.962 3.476 3.476 0 001.086-2.335L75.996 3.63a3.465 3.465 0 00-.969-2.55A3.514 3.514 0 0072.508 0H3.488c-.58.004-1.15.15-1.658.426S.89 1.098.573 1.579a3.47 3.47 0 00-.288 3.284l19.812 45.073a3.494 3.494 0 001.294 1.502A3.532 3.532 0 0023.3 52z"
              className="keyOpacityInternal"
              stroke={color}
              strokeWidth="2"
              fill="transparent"
            />
          </g>
          <g className="shadowMiddle" transform={`translate(${0},${12})`}>
            <path
              d="M23.3 46h40.985a3.527 3.527 0 002.404-.962 3.476 3.476 0 001.086-2.335L69.996 3.63a3.465 3.465 0 00-.969-2.55A3.514 3.514 0 0066.508 0H3.488c-.58.004-1.15.15-1.658.426S.89 1.098.573 1.579a3.47 3.47 0 00-.288 3.284l19.812 39.073a3.494 3.494 0 001.294 1.502A3.532 3.532 0 0023.3 46z"
              fill={color}
            />
          </g>
          <g transform={`translate(${4},${0})`}>
            <path
              d="M23.3 46h40.985a3.527 3.527 0 002.404-.962 3.476 3.476 0 001.086-2.335L69.996 3.63a3.465 3.465 0 00-.969-2.55A3.514 3.514 0 0066.508 0H3.488c-.58.004-1.15.15-1.658.426S.89 1.098.573 1.579a3.47 3.47 0 00-.288 3.284l19.812 39.073a3.494 3.494 0 001.294 1.502A3.532 3.532 0 0023.3 46z"
              className="keyBase"
            />
            <path
              d="M23.3 46h40.985a3.527 3.527 0 002.404-.962 3.476 3.476 0 001.086-2.335L69.996 3.63a3.465 3.465 0 00-.969-2.55A3.514 3.514 0 0066.508 0H3.488c-.58.004-1.15.15-1.658.426S.89 1.098.573 1.579a3.47 3.47 0 00-.288 3.284l19.812 39.073a3.494 3.494 0 001.294 1.502A3.532 3.532 0 0023.3 46z"
              fill={`url(#paintGradient${id})`}
              fillOpacity="0.25"
            />
            <path
              d="M23.3 46h40.985a3.527 3.527 0 002.404-.962 3.476 3.476 0 001.086-2.335L69.996 3.63a3.465 3.465 0 00-.969-2.55A3.514 3.514 0 0066.508 0H3.488c-.58.004-1.15.15-1.658.426S.89 1.098.573 1.579a3.47 3.47 0 00-.288 3.284l19.812 39.073a3.494 3.494 0 001.294 1.502A3.532 3.532 0 0023.3 46z"
              fill={color}
              fillOpacity="0.2"
            />
            <path
              d="M23.3 46h40.985a3.527 3.527 0 002.404-.962 3.476 3.476 0 001.086-2.335L69.996 3.63a3.465 3.465 0 00-.969-2.55A3.514 3.514 0 0066.508 0H3.488c-.58.004-1.15.15-1.658.426S.89 1.098.573 1.579a3.47 3.47 0 00-.288 3.284l19.812 39.073a3.494 3.494 0 001.294 1.502A3.532 3.532 0 0023.3 46z"
              className="keyOpacity"
              stroke="#fff"
              strokeWidth="2"
              fill="transparent"
              strokeOpacity="0"
            />

            <path
              d="M23.3 46h40.985a3.527 3.527 0 002.404-.962 3.476 3.476 0 001.086-2.335L69.996 3.63a3.465 3.465 0 00-.969-2.55A3.514 3.514 0 0066.508 0H3.488c-.58.004-1.15.15-1.658.426S.89 1.098.573 1.579a3.47 3.47 0 00-.288 3.284l19.812 39.073a3.494 3.494 0 001.294 1.502A3.532 3.532 0 0023.3 46z"
              className="keyAnimation"
              stroke="#fff"
              strokeWidth="1"
              fill="transparent"
              strokeOpacity="1"
            />
          </g>
          <g className="keyContentLabelRotate">
            <foreignObject x={16} y={1} width={widthShape2} height={heightShape2}>
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
            <foreignObject x={12} y={1} width={width} height={height}>
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
      {keyType == "defy-t6" ? (
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
              d="M41.715 56.918c-12.026-2.652-25.035-3.56-37.484-3.626-2.298-.013-4.14-1.924-4.032-4.218L2.35 3.367A3.546 3.546 0 013.43.952 3.388 3.388 0 015.852.001a305.77 305.77 0 0151.374 5.747c.477.098.928.298 1.324.587.396.288.728.66.974 1.088a3.592 3.592 0 01.311 2.87l-14.1 44.22a3.499 3.499 0 01-1.55 2.007 3.364 3.364 0 01-2.47.398z"
              fill={color}
            />
          </g>

          <g className="baseShape">
            <path
              d="M41.715 56.918c-12.026-2.652-25.035-3.56-37.484-3.626-2.298-.013-4.14-1.924-4.032-4.218L2.35 3.367A3.546 3.546 0 013.43.952 3.388 3.388 0 015.852.001a305.77 305.77 0 0151.374 5.747c.477.098.928.298 1.324.587.396.288.728.66.974 1.088a3.592 3.592 0 01.311 2.87l-14.1 44.22a3.499 3.499 0 01-1.55 2.007 3.364 3.364 0 01-2.47.398z"
              fill={`#303949`}
            />
            <path
              d="M41.715 56.918c-12.026-2.652-25.035-3.56-37.484-3.626-2.298-.013-4.14-1.924-4.032-4.218L2.35 3.367A3.546 3.546 0 013.43.952 3.388 3.388 0 015.852.001a305.77 305.77 0 0151.374 5.747c.477.098.928.298 1.324.587.396.288.728.66.974 1.088a3.592 3.592 0 01.311 2.87l-14.1 44.22a3.499 3.499 0 01-1.55 2.007 3.364 3.364 0 01-2.47.398z"
              fill={`url(#paintGradient${id})`}
              fillOpacity="0.2"
            />
            <path
              d="M41.715 56.918c-12.026-2.652-25.035-3.56-37.484-3.626-2.298-.013-4.14-1.924-4.032-4.218L2.35 3.367A3.546 3.546 0 013.43.952 3.388 3.388 0 015.852.001a305.77 305.77 0 0151.374 5.747c.477.098.928.298 1.324.587.396.288.728.66.974 1.088a3.592 3.592 0 01.311 2.87l-14.1 44.22a3.499 3.499 0 01-1.55 2.007 3.364 3.364 0 01-2.47.398z"
              fill={color}
              className="keyColorOpacity"
            />
            <path
              d="M41.715 56.918c-12.026-2.652-25.035-3.56-37.484-3.626-2.298-.013-4.14-1.924-4.032-4.218L2.35 3.367A3.546 3.546 0 013.43.952 3.388 3.388 0 015.852.001a305.77 305.77 0 0151.374 5.747c.477.098.928.298 1.324.587.396.288.728.66.974 1.088a3.592 3.592 0 01.311 2.87l-14.1 44.22a3.499 3.499 0 01-1.55 2.007 3.364 3.364 0 01-2.47.398z"
              className="keyOpacityInternal"
              stroke={color}
              strokeWidth="2"
              fill="transparent"
            />
          </g>
          <g className="shadowMiddle" transform={`translate(${0},${12})`}>
            <path
              d="M35.715 49.918c-8.629-1.26-20.638-2.347-31.624-2.574-2.244-.047-4.049-1.89-3.998-4.135L1 3.499a3.546 3.546 0 011.079-2.414A3.388 3.388 0 014.502.133c17.148 1 29.234 2.017 46.174 5.38.477.098.928.298 1.324.587s.728.66.974 1.089a3.613 3.613 0 01.31 2.87l-13.55 37.454a3.498 3.498 0 01-1.55 2.007 3.364 3.364 0 01-2.469.398z"
              fill={color}
            />
          </g>
          <g transform={`translate(${4},${0})`}>
            <path
              d="M35.715 49.918c-8.629-1.26-20.638-2.347-31.624-2.574-2.244-.047-4.049-1.89-3.998-4.135L1 3.499a3.546 3.546 0 011.079-2.414A3.388 3.388 0 014.502.133c17.148 1 29.234 2.017 46.174 5.38.477.098.928.298 1.324.587s.728.66.974 1.089a3.613 3.613 0 01.31 2.87l-13.55 37.454a3.498 3.498 0 01-1.55 2.007 3.364 3.364 0 01-2.469.398z"
              className="keyBase"
            />
            <path
              d="M35.715 49.918c-8.629-1.26-20.638-2.347-31.624-2.574-2.244-.047-4.049-1.89-3.998-4.135L1 3.499a3.546 3.546 0 011.079-2.414A3.388 3.388 0 014.502.133c17.148 1 29.234 2.017 46.174 5.38.477.098.928.298 1.324.587s.728.66.974 1.089a3.613 3.613 0 01.31 2.87l-13.55 37.454a3.498 3.498 0 01-1.55 2.007 3.364 3.364 0 01-2.469.398z"
              fill={`url(#paintGradient${id})`}
              fillOpacity="0.25"
            />
            <path
              d="M35.715 49.918c-8.629-1.26-20.638-2.347-31.624-2.574-2.244-.047-4.049-1.89-3.998-4.135L1 3.499a3.546 3.546 0 011.079-2.414A3.388 3.388 0 014.502.133c17.148 1 29.234 2.017 46.174 5.38.477.098.928.298 1.324.587s.728.66.974 1.089a3.613 3.613 0 01.31 2.87l-13.55 37.454a3.498 3.498 0 01-1.55 2.007 3.364 3.364 0 01-2.469.398z"
              fill={color}
              fillOpacity="0.2"
            />
            <path
              d="M35.715 49.918c-8.629-1.26-20.638-2.347-31.624-2.574-2.244-.047-4.049-1.89-3.998-4.135L1 3.499a3.546 3.546 0 011.079-2.414A3.388 3.388 0 014.502.133c17.148 1 29.234 2.017 46.174 5.38.477.098.928.298 1.324.587s.728.66.974 1.089a3.613 3.613 0 01.31 2.87l-13.55 37.454a3.498 3.498 0 01-1.55 2.007 3.364 3.364 0 01-2.469.398z"
              className="keyOpacity"
              stroke="#fff"
              strokeWidth="2"
              fill="transparent"
              strokeOpacity="0"
            />

            <path
              d="M35.715 49.918c-8.629-1.26-20.638-2.347-31.624-2.574-2.244-.047-4.049-1.89-3.998-4.135L1 3.499a3.546 3.546 0 011.079-2.414A3.388 3.388 0 014.502.133c17.148 1 29.234 2.017 46.174 5.38.477.098.928.298 1.324.587s.728.66.974 1.089a3.613 3.613 0 01.31 2.87l-13.55 37.454a3.498 3.498 0 01-1.55 2.007 3.364 3.364 0 01-2.469.398z"
              className="keyAnimation"
              stroke="#fff"
              strokeWidth="1"
              fill="transparent"
              strokeOpacity="1"
            />
          </g>
          <g className="keyContentLabelRotate">
            <foreignObject x={3} y={1} width={widthShape2} height={heightShape2}>
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
            <foreignObject x={0} y={1} width={width} height={height}>
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
      {keyType == "defy-t7" ? (
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
              d="M2.415 51.18A86.227 86.227 0 0127.432 71.66a3.401 3.401 0 002.22 1.305 3.37 3.37 0 002.487-.635L74.29 42.47c.386-.277.712-.631.958-1.04a3.555 3.555 0 00.384-2.764 3.54 3.54 0 00-.636-1.269C67.793 28.233 50.543 10.527 18.96.166a3.406 3.406 0 00-2.687.253 3.474 3.474 0 00-1.059.895 3.54 3.54 0 00-.632 1.244L.886 47.231a3.548 3.548 0 00.107 2.237 3.479 3.479 0 001.422 1.711z"
              fill={color}
            />
          </g>

          <g className="baseShape">
            <path
              d="M2.415 51.18A86.227 86.227 0 0127.432 71.66a3.401 3.401 0 002.22 1.305 3.37 3.37 0 002.487-.635L74.29 42.47c.386-.277.712-.631.958-1.04a3.555 3.555 0 00.384-2.764 3.54 3.54 0 00-.636-1.269C67.793 28.233 50.543 10.527 18.96.166a3.406 3.406 0 00-2.687.253 3.474 3.474 0 00-1.059.895 3.54 3.54 0 00-.632 1.244L.886 47.231a3.548 3.548 0 00.107 2.237 3.479 3.479 0 001.422 1.711z"
              fill={`#303949`}
            />
            <path
              d="M2.415 51.18A86.227 86.227 0 0127.432 71.66a3.401 3.401 0 002.22 1.305 3.37 3.37 0 002.487-.635L74.29 42.47c.386-.277.712-.631.958-1.04a3.555 3.555 0 00.384-2.764 3.54 3.54 0 00-.636-1.269C67.793 28.233 50.543 10.527 18.96.166a3.406 3.406 0 00-2.687.253 3.474 3.474 0 00-1.059.895 3.54 3.54 0 00-.632 1.244L.886 47.231a3.548 3.548 0 00.107 2.237 3.479 3.479 0 001.422 1.711z"
              fill={`url(#paintGradient${id})`}
              fillOpacity="0.2"
            />
            <path
              d="M2.415 51.18A86.227 86.227 0 0127.432 71.66a3.401 3.401 0 002.22 1.305 3.37 3.37 0 002.487-.635L74.29 42.47c.386-.277.712-.631.958-1.04a3.555 3.555 0 00.384-2.764 3.54 3.54 0 00-.636-1.269C67.793 28.233 50.543 10.527 18.96.166a3.406 3.406 0 00-2.687.253 3.474 3.474 0 00-1.059.895 3.54 3.54 0 00-.632 1.244L.886 47.231a3.548 3.548 0 00.107 2.237 3.479 3.479 0 001.422 1.711z"
              fill={color}
              className="keyColorOpacity"
            />
            <path
              d="M2.415 51.18A86.227 86.227 0 0127.432 71.66a3.401 3.401 0 002.22 1.305 3.37 3.37 0 002.487-.635L74.29 42.47c.386-.277.712-.631.958-1.04a3.555 3.555 0 00.384-2.764 3.54 3.54 0 00-.636-1.269C67.793 28.233 50.543 10.527 18.96.166a3.406 3.406 0 00-2.687.253 3.474 3.474 0 00-1.059.895 3.54 3.54 0 00-.632 1.244L.886 47.231a3.548 3.548 0 00.107 2.237 3.479 3.479 0 001.422 1.711z"
              className="keyOpacityInternal"
              stroke={color}
              strokeWidth="2"
              fill="transparent"
            />
          </g>
          <g className="shadowMiddle" transform={`translate(${0},${12})`}>
            <path
              d="M2.415 48.18c8.84 5.42 13.34 8.82 21.017 16.481a3.37 3.37 0 004.707.67L66.29 40.47c.386-.277.712-.631.958-1.04a3.555 3.555 0 00.384-2.764 3.538 3.538 0 00-.636-1.269C59.793 26.233 40.255 8.926 15.755 1a3.406 3.406 0 00-2.688.254 3.474 3.474 0 00-1.059.895 3.54 3.54 0 00-.631 1.244L.886 44.23a3.548 3.548 0 00.107 2.237 3.479 3.479 0 001.422 1.711z"
              fill={color}
            />
          </g>
          <g transform={`translate(${4},${0})`}>
            <path
              d="M2.415 48.18c8.84 5.42 13.34 8.82 21.017 16.481a3.37 3.37 0 004.707.67L66.29 40.47c.386-.277.712-.631.958-1.04a3.555 3.555 0 00.384-2.764 3.538 3.538 0 00-.636-1.269C59.793 26.233 40.255 8.926 15.755 1a3.406 3.406 0 00-2.688.254 3.474 3.474 0 00-1.059.895 3.54 3.54 0 00-.631 1.244L.886 44.23a3.548 3.548 0 00.107 2.237 3.479 3.479 0 001.422 1.711z"
              className="keyBase"
            />
            <path
              d="M2.415 48.18c8.84 5.42 13.34 8.82 21.017 16.481a3.37 3.37 0 004.707.67L66.29 40.47c.386-.277.712-.631.958-1.04a3.555 3.555 0 00.384-2.764 3.538 3.538 0 00-.636-1.269C59.793 26.233 40.255 8.926 15.755 1a3.406 3.406 0 00-2.688.254 3.474 3.474 0 00-1.059.895 3.54 3.54 0 00-.631 1.244L.886 44.23a3.548 3.548 0 00.107 2.237 3.479 3.479 0 001.422 1.711z"
              fill={`url(#paintGradient${id})`}
              fillOpacity="0.25"
            />
            <path
              d="M2.415 48.18c8.84 5.42 13.34 8.82 21.017 16.481a3.37 3.37 0 004.707.67L66.29 40.47c.386-.277.712-.631.958-1.04a3.555 3.555 0 00.384-2.764 3.538 3.538 0 00-.636-1.269C59.793 26.233 40.255 8.926 15.755 1a3.406 3.406 0 00-2.688.254 3.474 3.474 0 00-1.059.895 3.54 3.54 0 00-.631 1.244L.886 44.23a3.548 3.548 0 00.107 2.237 3.479 3.479 0 001.422 1.711z"
              fill={color}
              fillOpacity="0.2"
            />
            <path
              d="M2.415 48.18c8.84 5.42 13.34 8.82 21.017 16.481a3.37 3.37 0 004.707.67L66.29 40.47c.386-.277.712-.631.958-1.04a3.555 3.555 0 00.384-2.764 3.538 3.538 0 00-.636-1.269C59.793 26.233 40.255 8.926 15.755 1a3.406 3.406 0 00-2.688.254 3.474 3.474 0 00-1.059.895 3.54 3.54 0 00-.631 1.244L.886 44.23a3.548 3.548 0 00.107 2.237 3.479 3.479 0 001.422 1.711z"
              className="keyOpacity"
              stroke="#fff"
              strokeWidth="2"
              fill="transparent"
              strokeOpacity="0"
            />

            <path
              d="M2.415 48.18c8.84 5.42 13.34 8.82 21.017 16.481a3.37 3.37 0 004.707.67L66.29 40.47c.386-.277.712-.631.958-1.04a3.555 3.555 0 00.384-2.764 3.538 3.538 0 00-.636-1.269C59.793 26.233 40.255 8.926 15.755 1a3.406 3.406 0 00-2.688.254 3.474 3.474 0 00-1.059.895 3.54 3.54 0 00-.631 1.244L.886 44.23a3.548 3.548 0 00.107 2.237 3.479 3.479 0 001.422 1.711z"
              className="keyAnimation"
              stroke="#fff"
              strokeWidth="1"
              fill="transparent"
              strokeOpacity="1"
            />
          </g>
          <g className="keyContentLabelRotate">
            <foreignObject x={3} y={1} width={widthShape2} height={heightShape2}>
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
            <foreignObject x={0} y={1} width={width} height={height}>
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
      {keyType == "defy-t8" ? (
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
              d="M.536 71.853l24.591 35.646a3.504 3.504 0 004.642 1.022c14.57-8.626 52.897-31.321 59.8-35.266 19.188-11.027 23.521-36.05 12.403-70.842A3.474 3.474 0 0096.664.631L1.44 67.17a3.493 3.493 0 00-.904 4.682z"
              fill={color}
            />
          </g>

          <g className="baseShape">
            <path
              d="M.536 71.853l24.591 35.646a3.504 3.504 0 004.642 1.022c14.57-8.626 52.897-31.321 59.8-35.266 19.188-11.027 23.521-36.05 12.403-70.842A3.474 3.474 0 0096.664.631L1.44 67.17a3.493 3.493 0 00-.904 4.682z"
              fill={`#303949`}
            />
            <path
              d="M.536 71.853l24.591 35.646a3.504 3.504 0 004.642 1.022c14.57-8.626 52.897-31.321 59.8-35.266 19.188-11.027 23.521-36.05 12.403-70.842A3.474 3.474 0 0096.664.631L1.44 67.17a3.493 3.493 0 00-.904 4.682z"
              fill={`url(#paintGradient${id})`}
              fillOpacity="0.2"
            />
            <path
              d="M.536 71.853l24.591 35.646a3.504 3.504 0 004.642 1.022c14.57-8.626 52.897-31.321 59.8-35.266 19.188-11.027 23.521-36.05 12.403-70.842A3.474 3.474 0 0096.664.631L1.44 67.17a3.493 3.493 0 00-.904 4.682z"
              fill={color}
              className="keyColorOpacity"
            />
            <path
              d="M.536 71.853l24.591 35.646a3.504 3.504 0 004.642 1.022c14.57-8.626 52.897-31.321 59.8-35.266 19.188-11.027 23.521-36.05 12.403-70.842A3.474 3.474 0 0096.664.631L1.44 67.17a3.493 3.493 0 00-.904 4.682z"
              className="keyOpacityInternal"
              stroke={color}
              strokeWidth="2"
              fill="transparent"
            />
          </g>
          <g className="shadowMiddle" transform={`translate(${0},${12})`}>
            <path
              d="M.536 67.853L23.127 98.5a3.5 3.5 0 004.642 1.021c14.57-8.626 46.897-28.321 53.8-32.266C100.757 56.228 105.5 36.5 96.972 2.413A3.467 3.467 0 0094.77.181a3.481 3.481 0 00-3.106.45L1.44 63.17a3.493 3.493 0 00-.904 4.682z"
              fill={color}
            />
          </g>
          <g transform={`translate(${4},${0})`}>
            <path
              d="M.536 67.853L23.127 98.5a3.5 3.5 0 004.642 1.021c14.57-8.626 46.897-28.321 53.8-32.266C100.757 56.228 105.5 36.5 96.972 2.413A3.467 3.467 0 0094.77.181a3.481 3.481 0 00-3.106.45L1.44 63.17a3.493 3.493 0 00-.904 4.682z"
              className="keyBase"
            />
            <path
              d="M.536 67.853L23.127 98.5a3.5 3.5 0 004.642 1.021c14.57-8.626 46.897-28.321 53.8-32.266C100.757 56.228 105.5 36.5 96.972 2.413A3.467 3.467 0 0094.77.181a3.481 3.481 0 00-3.106.45L1.44 63.17a3.493 3.493 0 00-.904 4.682z"
              fill={`url(#paintGradient${id})`}
              fillOpacity="0.25"
            />
            <path
              d="M.536 67.853L23.127 98.5a3.5 3.5 0 004.642 1.021c14.57-8.626 46.897-28.321 53.8-32.266C100.757 56.228 105.5 36.5 96.972 2.413A3.467 3.467 0 0094.77.181a3.481 3.481 0 00-3.106.45L1.44 63.17a3.493 3.493 0 00-.904 4.682z"
              fill={color}
              fillOpacity="0.2"
            />
            <path
              d="M.536 67.853L23.127 98.5a3.5 3.5 0 004.642 1.021c14.57-8.626 46.897-28.321 53.8-32.266C100.757 56.228 105.5 36.5 96.972 2.413A3.467 3.467 0 0094.77.181a3.481 3.481 0 00-3.106.45L1.44 63.17a3.493 3.493 0 00-.904 4.682z"
              className="keyOpacity"
              stroke="#fff"
              strokeWidth="2"
              fill="transparent"
              strokeOpacity="0"
            />

            <path
              d="M.536 67.853L23.127 98.5a3.5 3.5 0 004.642 1.021c14.57-8.626 46.897-28.321 53.8-32.266C100.757 56.228 105.5 36.5 96.972 2.413A3.467 3.467 0 0094.77.181a3.481 3.481 0 00-3.106.45L1.44 63.17a3.493 3.493 0 00-.904 4.682z"
              className="keyAnimation"
              stroke="#fff"
              strokeWidth="1"
              fill="transparent"
              strokeOpacity="1"
            />
          </g>
          <g className="keyContentLabelRotate">
            <foreignObject x={3} y={1} width={widthShape2} height={heightShape2}>
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
            <foreignObject x={0} y={1} width={width} height={height}>
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
      {keyType == "defy-tR8" ? (
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
              d="M107.464 71.853l-24.591 35.646a3.504 3.504 0 01-4.642 1.022C63.66 99.895 25.334 77.2 18.43 73.255-.757 62.228-5.09 37.205 6.028 2.413A3.468 3.468 0 018.23.181a3.481 3.481 0 013.106.45l95.224 66.54a3.485 3.485 0 01.904 4.682z"
              fill={color}
            />
          </g>

          <g className="baseShape">
            <path
              d="M107.464 71.853l-24.591 35.646a3.504 3.504 0 01-4.642 1.022C63.66 99.895 25.334 77.2 18.43 73.255-.757 62.228-5.09 37.205 6.028 2.413A3.468 3.468 0 018.23.181a3.481 3.481 0 013.106.45l95.224 66.54a3.485 3.485 0 01.904 4.682z"
              fill={`#303949`}
            />
            <path
              d="M107.464 71.853l-24.591 35.646a3.504 3.504 0 01-4.642 1.022C63.66 99.895 25.334 77.2 18.43 73.255-.757 62.228-5.09 37.205 6.028 2.413A3.468 3.468 0 018.23.181a3.481 3.481 0 013.106.45l95.224 66.54a3.485 3.485 0 01.904 4.682z"
              fill={`url(#paintGradient${id})`}
              fillOpacity="0.2"
            />
            <path
              d="M107.464 71.853l-24.591 35.646a3.504 3.504 0 01-4.642 1.022C63.66 99.895 25.334 77.2 18.43 73.255-.757 62.228-5.09 37.205 6.028 2.413A3.468 3.468 0 018.23.181a3.481 3.481 0 013.106.45l95.224 66.54a3.485 3.485 0 01.904 4.682z"
              fill={color}
              className="keyColorOpacity"
            />
            <path
              d="M107.464 71.853l-24.591 35.646a3.504 3.504 0 01-4.642 1.022C63.66 99.895 25.334 77.2 18.43 73.255-.757 62.228-5.09 37.205 6.028 2.413A3.468 3.468 0 018.23.181a3.481 3.481 0 013.106.45l95.224 66.54a3.485 3.485 0 01.904 4.682z"
              className="keyOpacityInternal"
              stroke={color}
              strokeWidth="2"
              fill="transparent"
            />
          </g>
          <g className="shadowMiddle" transform={`translate(${0},${12})`}>
            <path
              d="M101.464 67.853L78.873 98.5a3.5 3.5 0 01-4.642 1.021C59.66 90.895 27.334 71.2 20.43 67.255 1.243 56.228-3.5 36.5 5.028 2.413A3.468 3.468 0 017.23.181a3.481 3.481 0 013.106.45l90.224 62.54a3.485 3.485 0 01.904 4.682z"
              fill={color}
            />
          </g>
          <g transform={`translate(${4},${0})`}>
            <path
              d="M101.464 67.853L78.873 98.5a3.5 3.5 0 01-4.642 1.021C59.66 90.895 27.334 71.2 20.43 67.255 1.243 56.228-3.5 36.5 5.028 2.413A3.468 3.468 0 017.23.181a3.481 3.481 0 013.106.45l90.224 62.54a3.485 3.485 0 01.904 4.682z"
              className="keyBase"
            />
            <path
              d="M101.464 67.853L78.873 98.5a3.5 3.5 0 01-4.642 1.021C59.66 90.895 27.334 71.2 20.43 67.255 1.243 56.228-3.5 36.5 5.028 2.413A3.468 3.468 0 017.23.181a3.481 3.481 0 013.106.45l90.224 62.54a3.485 3.485 0 01.904 4.682z"
              fill={`url(#paintGradient${id})`}
              fillOpacity="0.25"
            />
            <path
              d="M101.464 67.853L78.873 98.5a3.5 3.5 0 01-4.642 1.021C59.66 90.895 27.334 71.2 20.43 67.255 1.243 56.228-3.5 36.5 5.028 2.413A3.468 3.468 0 017.23.181a3.481 3.481 0 013.106.45l90.224 62.54a3.485 3.485 0 01.904 4.682z"
              fill={color}
              fillOpacity="0.2"
            />
            <path
              d="M101.464 67.853L78.873 98.5a3.5 3.5 0 01-4.642 1.021C59.66 90.895 27.334 71.2 20.43 67.255 1.243 56.228-3.5 36.5 5.028 2.413A3.468 3.468 0 017.23.181a3.481 3.481 0 013.106.45l90.224 62.54a3.485 3.485 0 01.904 4.682z"
              className="keyOpacity"
              stroke="#fff"
              strokeWidth="2"
              fill="transparent"
              strokeOpacity="0"
            />

            <path
              d="M101.464 67.853L78.873 98.5a3.5 3.5 0 01-4.642 1.021C59.66 90.895 27.334 71.2 20.43 67.255 1.243 56.228-3.5 36.5 5.028 2.413A3.468 3.468 0 017.23.181a3.481 3.481 0 013.106.45l90.224 62.54a3.485 3.485 0 01.904 4.682z"
              className="keyAnimation"
              stroke="#fff"
              strokeWidth="1"
              fill="transparent"
              strokeOpacity="1"
            />
          </g>
          <g className="keyContentLabelRotate">
            <foreignObject x={3} y={1} width={widthShape2} height={heightShape2}>
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
            <foreignObject x={0} y={1} width={width} height={height}>
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
      {keyType == "defy-tR4" ? (
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
              d="M73.516 56.77a113.488 113.488 0 00-25.225 23.891 3.368 3.368 0 01-4.71.666L1.468 51.517a3.447 3.447 0 01-1.355-1.953 3.476 3.476 0 01.225-2.374C6.744 33.426 22.242 12.032 39.01.574a3.445 3.445 0 012.656-.49 3.482 3.482 0 012.197 1.583l30.618 50.396c.466.76.626 1.672.446 2.548a3.497 3.497 0 01-1.412 2.16z"
              fill={color}
            />
          </g>

          <g className="baseShape">
            <path
              d="M73.516 56.77a113.488 113.488 0 00-25.225 23.891 3.368 3.368 0 01-4.71.666L1.468 51.517a3.447 3.447 0 01-1.355-1.953 3.476 3.476 0 01.225-2.374C6.744 33.426 22.242 12.032 39.01.574a3.445 3.445 0 012.656-.49 3.482 3.482 0 012.197 1.583l30.618 50.396c.466.76.626 1.672.446 2.548a3.497 3.497 0 01-1.412 2.16z"
              fill={`#303949`}
            />
            <path
              d="M73.516 56.77a113.488 113.488 0 00-25.225 23.891 3.368 3.368 0 01-4.71.666L1.468 51.517a3.447 3.447 0 01-1.355-1.953 3.476 3.476 0 01.225-2.374C6.744 33.426 22.242 12.032 39.01.574a3.445 3.445 0 012.656-.49 3.482 3.482 0 012.197 1.583l30.618 50.396c.466.76.626 1.672.446 2.548a3.497 3.497 0 01-1.412 2.16z"
              fill={`url(#paintGradient${id})`}
              fillOpacity="0.2"
            />
            <path
              d="M73.516 56.77a113.488 113.488 0 00-25.225 23.891 3.368 3.368 0 01-4.71.666L1.468 51.517a3.447 3.447 0 01-1.355-1.953 3.476 3.476 0 01.225-2.374C6.744 33.426 22.242 12.032 39.01.574a3.445 3.445 0 012.656-.49 3.482 3.482 0 012.197 1.583l30.618 50.396c.466.76.626 1.672.446 2.548a3.497 3.497 0 01-1.412 2.16z"
              fill={color}
              className="keyColorOpacity"
            />
            <path
              d="M73.516 56.77a113.488 113.488 0 00-25.225 23.891 3.368 3.368 0 01-4.71.666L1.468 51.517a3.447 3.447 0 01-1.355-1.953 3.476 3.476 0 01.225-2.374C6.744 33.426 22.242 12.032 39.01.574a3.445 3.445 0 012.656-.49 3.482 3.482 0 012.197 1.583l30.618 50.396c.466.76.626 1.672.446 2.548a3.497 3.497 0 01-1.412 2.16z"
              className="keyOpacityInternal"
              stroke={color}
              strokeWidth="2"
              fill="transparent"
            />
          </g>
          <g className="shadowMiddle" transform={`translate(${0},${12})`}>
            <path
              d="M65.516 51.77C56.5 58.106 52 62 43.291 71.661a3.368 3.368 0 01-4.71.666L1.468 46.517a3.447 3.447 0 01-1.355-1.953 3.476 3.476 0 01.225-2.374C13 22.5 17.5 14.5 35.01.574a3.445 3.445 0 012.656-.49 3.482 3.482 0 012.197 1.583l26.618 45.396c.466.76.626 1.672.446 2.548a3.497 3.497 0 01-1.412 2.16z"
              fill={color}
            />
          </g>
          <g transform={`translate(${4},${0})`}>
            <path
              d="M65.516 51.77C56.5 58.106 52 62 43.291 71.661a3.368 3.368 0 01-4.71.666L1.468 46.517a3.447 3.447 0 01-1.355-1.953 3.476 3.476 0 01.225-2.374C13 22.5 17.5 14.5 35.01.574a3.445 3.445 0 012.656-.49 3.482 3.482 0 012.197 1.583l26.618 45.396c.466.76.626 1.672.446 2.548a3.497 3.497 0 01-1.412 2.16z"
              className="keyBase"
            />
            <path
              d="M65.516 51.77C56.5 58.106 52 62 43.291 71.661a3.368 3.368 0 01-4.71.666L1.468 46.517a3.447 3.447 0 01-1.355-1.953 3.476 3.476 0 01.225-2.374C13 22.5 17.5 14.5 35.01.574a3.445 3.445 0 012.656-.49 3.482 3.482 0 012.197 1.583l26.618 45.396c.466.76.626 1.672.446 2.548a3.497 3.497 0 01-1.412 2.16z"
              fill={`url(#paintGradient${id})`}
              fillOpacity="0.25"
            />
            <path
              d="M65.516 51.77C56.5 58.106 52 62 43.291 71.661a3.368 3.368 0 01-4.71.666L1.468 46.517a3.447 3.447 0 01-1.355-1.953 3.476 3.476 0 01.225-2.374C13 22.5 17.5 14.5 35.01.574a3.445 3.445 0 012.656-.49 3.482 3.482 0 012.197 1.583l26.618 45.396c.466.76.626 1.672.446 2.548a3.497 3.497 0 01-1.412 2.16z"
              fill={color}
              fillOpacity="0.2"
            />
            <path
              d="M65.516 51.77C56.5 58.106 52 62 43.291 71.661a3.368 3.368 0 01-4.71.666L1.468 46.517a3.447 3.447 0 01-1.355-1.953 3.476 3.476 0 01.225-2.374C13 22.5 17.5 14.5 35.01.574a3.445 3.445 0 012.656-.49 3.482 3.482 0 012.197 1.583l26.618 45.396c.466.76.626 1.672.446 2.548a3.497 3.497 0 01-1.412 2.16z"
              className="keyOpacity"
              stroke="#fff"
              strokeWidth="2"
              fill="transparent"
              strokeOpacity="0"
            />

            <path
              d="M65.516 51.77C56.5 58.106 52 62 43.291 71.661a3.368 3.368 0 01-4.71.666L1.468 46.517a3.447 3.447 0 01-1.355-1.953 3.476 3.476 0 01.225-2.374C13 22.5 17.5 14.5 35.01.574a3.445 3.445 0 012.656-.49 3.482 3.482 0 012.197 1.583l26.618 45.396c.466.76.626 1.672.446 2.548a3.497 3.497 0 01-1.412 2.16z"
              className="keyAnimation"
              stroke="#fff"
              strokeWidth="1"
              fill="transparent"
              strokeOpacity="1"
            />
          </g>
          <g className="keyContentLabelRotate">
            <foreignObject x={3} y={1} width={widthShape2} height={heightShape2}>
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
            <foreignObject x={0} y={1} width={width} height={height}>
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
      {keyType == "defy-tR3" ? (
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
              d="M70.368 57.508a160.536 160.536 0 00-34.165 12.66 3.438 3.438 0 01-4.481-1.256L.52 19.122a3.51 3.51 0 011.375-4.954C19.53 5.164 37.936.958 57.714.007a3.51 3.51 0 013.65 2.774l11.588 50.625a3.485 3.485 0 01-2.513 4.102h-.071z"
              fill={color}
            />
          </g>

          <g className="baseShape">
            <path
              d="M70.368 57.508a160.536 160.536 0 00-34.165 12.66 3.438 3.438 0 01-4.481-1.256L.52 19.122a3.51 3.51 0 011.375-4.954C19.53 5.164 37.936.958 57.714.007a3.51 3.51 0 013.65 2.774l11.588 50.625a3.485 3.485 0 01-2.513 4.102h-.071z"
              fill={`#303949`}
            />
            <path
              d="M70.368 57.508a160.536 160.536 0 00-34.165 12.66 3.438 3.438 0 01-4.481-1.256L.52 19.122a3.51 3.51 0 011.375-4.954C19.53 5.164 37.936.958 57.714.007a3.51 3.51 0 013.65 2.774l11.588 50.625a3.485 3.485 0 01-2.513 4.102h-.071z"
              fill={`url(#paintGradient${id})`}
              fillOpacity="0.2"
            />
            <path
              d="M70.368 57.508a160.536 160.536 0 00-34.165 12.66 3.438 3.438 0 01-4.481-1.256L.52 19.122a3.51 3.51 0 011.375-4.954C19.53 5.164 37.936.958 57.714.007a3.51 3.51 0 013.65 2.774l11.588 50.625a3.485 3.485 0 01-2.513 4.102h-.071z"
              fill={color}
              className="keyColorOpacity"
            />
            <path
              d="M70.368 57.508a160.536 160.536 0 00-34.165 12.66 3.438 3.438 0 01-4.481-1.256L.52 19.122a3.51 3.51 0 011.375-4.954C19.53 5.164 37.936.958 57.714.007a3.51 3.51 0 013.65 2.774l11.588 50.625a3.485 3.485 0 01-2.513 4.102h-.071z"
              className="keyOpacityInternal"
              stroke={color}
              strokeWidth="2"
              fill="transparent"
            />
          </g>
          <g className="shadowMiddle" transform={`translate(${0},${12})`}>
            <path
              d="M63.657 52.798c-10.562 2.114-19.562 5.316-28.455 9.835a3.438 3.438 0 01-4.48-1.257L1.345 18.181a3.508 3.508 0 011.375-4.956C22.611 4.053 36.741 1.228 52.887.95a3.51 3.51 0 013.651 2.774l9.704 44.973a3.485 3.485 0 01-2.514 4.102h-.07z"
              fill={color}
            />
          </g>
          <g transform={`translate(${4},${0})`}>
            <path
              d="M63.657 52.798c-10.562 2.114-19.562 5.316-28.455 9.835a3.438 3.438 0 01-4.48-1.257L1.345 18.181a3.508 3.508 0 011.375-4.956C22.611 4.053 36.741 1.228 52.887.95a3.51 3.51 0 013.651 2.774l9.704 44.973a3.485 3.485 0 01-2.514 4.102h-.07z"
              className="keyBase"
            />
            <path
              d="M63.657 52.798c-10.562 2.114-19.562 5.316-28.455 9.835a3.438 3.438 0 01-4.48-1.257L1.345 18.181a3.508 3.508 0 011.375-4.956C22.611 4.053 36.741 1.228 52.887.95a3.51 3.51 0 013.651 2.774l9.704 44.973a3.485 3.485 0 01-2.514 4.102h-.07z"
              fill={`url(#paintGradient${id})`}
              fillOpacity="0.25"
            />
            <path
              d="M63.657 52.798c-10.562 2.114-19.562 5.316-28.455 9.835a3.438 3.438 0 01-4.48-1.257L1.345 18.181a3.508 3.508 0 011.375-4.956C22.611 4.053 36.741 1.228 52.887.95a3.51 3.51 0 013.651 2.774l9.704 44.973a3.485 3.485 0 01-2.514 4.102h-.07z"
              fill={color}
              fillOpacity="0.2"
            />
            <path
              d="M63.657 52.798c-10.562 2.114-19.562 5.316-28.455 9.835a3.438 3.438 0 01-4.48-1.257L1.345 18.181a3.508 3.508 0 011.375-4.956C22.611 4.053 36.741 1.228 52.887.95a3.51 3.51 0 013.651 2.774l9.704 44.973a3.485 3.485 0 01-2.514 4.102h-.07z"
              className="keyOpacity"
              stroke="#fff"
              strokeWidth="2"
              fill="transparent"
              strokeOpacity="0"
            />

            <path
              d="M63.657 52.798c-10.562 2.114-19.562 5.316-28.455 9.835a3.438 3.438 0 01-4.48-1.257L1.345 18.181a3.508 3.508 0 011.375-4.956C22.611 4.053 36.741 1.228 52.887.95a3.51 3.51 0 013.651 2.774l9.704 44.973a3.485 3.485 0 01-2.514 4.102h-.07z"
              className="keyAnimation"
              stroke="#fff"
              strokeWidth="1"
              fill="transparent"
              strokeOpacity="1"
            />
          </g>
          <g className="keyContentLabelRotate">
            <foreignObject x={3} y={1} width={widthShape2} height={heightShape2}>
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
            <foreignObject x={0} y={1} width={width} height={height}>
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
      {keyType == "defy-tR2" ? (
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
              d="M17.25 55.67a335.168 335.168 0 0141.705-3.605 3.486 3.486 0 003.39-3.698L59.472 3.743A4 4 0 0055.48 0H4.227C1.593 0-.323 2.503.367 5.046l12.971 47.897a3.462 3.462 0 003.912 2.726z"
              fill={color}
            />
          </g>

          <g className="baseShape">
            <path
              d="M17.25 55.67a335.168 335.168 0 0141.705-3.605 3.486 3.486 0 003.39-3.698L59.472 3.743A4 4 0 0055.48 0H4.227C1.593 0-.323 2.503.367 5.046l12.971 47.897a3.462 3.462 0 003.912 2.726z"
              fill={`#303949`}
            />
            <path
              d="M17.25 55.67a335.168 335.168 0 0141.705-3.605 3.486 3.486 0 003.39-3.698L59.472 3.743A4 4 0 0055.48 0H4.227C1.593 0-.323 2.503.367 5.046l12.971 47.897a3.462 3.462 0 003.912 2.726z"
              fill={`url(#paintGradient${id})`}
              fillOpacity="0.2"
            />
            <path
              d="M17.25 55.67a335.168 335.168 0 0141.705-3.605 3.486 3.486 0 003.39-3.698L59.472 3.743A4 4 0 0055.48 0H4.227C1.593 0-.323 2.503.367 5.046l12.971 47.897a3.462 3.462 0 003.912 2.726z"
              fill={color}
              className="keyColorOpacity"
            />
            <path
              d="M17.25 55.67a335.168 335.168 0 0141.705-3.605 3.486 3.486 0 003.39-3.698L59.472 3.743A4 4 0 0055.48 0H4.227C1.593 0-.323 2.503.367 5.046l12.971 47.897a3.462 3.462 0 003.912 2.726z"
              className="keyOpacityInternal"
              stroke={color}
              strokeWidth="2"
              fill="transparent"
            />
          </g>
          <g className="shadowMiddle" transform={`translate(${0},${12})`}>
            <path
              d="M16.135 49.017c12.96-1.506 24.553-2.312 36.052-2.604a3.484 3.484 0 003.39-3.698L53.599 3.797A4 4 0 0049.603 0H4.148C1.485 0-.434 2.554.306 5.112l11.917 41.179a3.462 3.462 0 003.912 2.726z"
              fill={color}
            />
          </g>
          <g transform={`translate(${4},${0})`}>
            <path
              d="M16.135 49.017c12.96-1.506 24.553-2.312 36.052-2.604a3.484 3.484 0 003.39-3.698L53.599 3.797A4 4 0 0049.603 0H4.148C1.485 0-.434 2.554.306 5.112l11.917 41.179a3.462 3.462 0 003.912 2.726z"
              className="keyBase"
            />
            <path
              d="M16.135 49.017c12.96-1.506 24.553-2.312 36.052-2.604a3.484 3.484 0 003.39-3.698L53.599 3.797A4 4 0 0049.603 0H4.148C1.485 0-.434 2.554.306 5.112l11.917 41.179a3.462 3.462 0 003.912 2.726z"
              fill={`url(#paintGradient${id})`}
              fillOpacity="0.25"
            />
            <path
              d="M16.135 49.017c12.96-1.506 24.553-2.312 36.052-2.604a3.484 3.484 0 003.39-3.698L53.599 3.797A4 4 0 0049.603 0H4.148C1.485 0-.434 2.554.306 5.112l11.917 41.179a3.462 3.462 0 003.912 2.726z"
              fill={color}
              fillOpacity="0.2"
            />
            <path
              d="M16.135 49.017c12.96-1.506 24.553-2.312 36.052-2.604a3.484 3.484 0 003.39-3.698L53.599 3.797A4 4 0 0049.603 0H4.148C1.485 0-.434 2.554.306 5.112l11.917 41.179a3.462 3.462 0 003.912 2.726z"
              className="keyOpacity"
              stroke="#fff"
              strokeWidth="2"
              fill="transparent"
              strokeOpacity="0"
            />

            <path
              d="M16.135 49.017c12.96-1.506 24.553-2.312 36.052-2.604a3.484 3.484 0 003.39-3.698L53.599 3.797A4 4 0 0049.603 0H4.148C1.485 0-.434 2.554.306 5.112l11.917 41.179a3.462 3.462 0 003.912 2.726z"
              className="keyAnimation"
              stroke="#fff"
              strokeWidth="1"
              fill="transparent"
              strokeOpacity="1"
            />
          </g>
          <g className="keyContentLabelRotate">
            <foreignObject x={3} y={1} width={widthShape2} height={heightShape2}>
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
            <foreignObject x={0} y={1} width={width} height={height}>
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
      {keyType == "defy-tR1" ? (
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
              d="M82.426 4a4 4 0 00-4-4H4.224A4 4 0 00.23 4.218l2.39 43.81a4 4 0 003.994 3.782h71.812a4 4 0 004-4V4z"
              fill={color}
            />
          </g>

          <g className="baseShape">
            <path
              d="M82.426 4a4 4 0 00-4-4H4.224A4 4 0 00.23 4.218l2.39 43.81a4 4 0 003.994 3.782h71.812a4 4 0 004-4V4z"
              fill={`#303949`}
            />
            <path
              d="M82.426 4a4 4 0 00-4-4H4.224A4 4 0 00.23 4.218l2.39 43.81a4 4 0 003.994 3.782h71.812a4 4 0 004-4V4z"
              fill={`url(#paintGradient${id})`}
              fillOpacity="0.2"
            />
            <path
              d="M82.426 4a4 4 0 00-4-4H4.224A4 4 0 00.23 4.218l2.39 43.81a4 4 0 003.994 3.782h71.812a4 4 0 004-4V4z"
              fill={color}
              className="keyColorOpacity"
            />
            <path
              d="M82.426 4a4 4 0 00-4-4H4.224A4 4 0 00.23 4.218l2.39 43.81a4 4 0 003.994 3.782h71.812a4 4 0 004-4V4z"
              className="keyOpacityInternal"
              stroke={color}
              strokeWidth="2"
              fill="transparent"
            />
          </g>
          <g className="shadowMiddle" transform={`translate(${0},${12})`}>
            <path
              d="M76.6 4a4 4 0 00-4-4H4.077A4 4 0 00.086 4.244l2.336 38.159a4 4 0 003.992 3.755H72.6a4 4 0 004-4V4z"
              fill={color}
            />
          </g>
          <g transform={`translate(${4},${0})`}>
            <path
              d="M76.6 4a4 4 0 00-4-4H4.077A4 4 0 00.086 4.244l2.336 38.159a4 4 0 003.992 3.755H72.6a4 4 0 004-4V4z"
              className="keyBase"
            />
            <path
              d="M76.6 4a4 4 0 00-4-4H4.077A4 4 0 00.086 4.244l2.336 38.159a4 4 0 003.992 3.755H72.6a4 4 0 004-4V4z"
              fill={`url(#paintGradient${id})`}
              fillOpacity="0.25"
            />
            <path
              d="M76.6 4a4 4 0 00-4-4H4.077A4 4 0 00.086 4.244l2.336 38.159a4 4 0 003.992 3.755H72.6a4 4 0 004-4V4z"
              fill={color}
              fillOpacity="0.2"
            />
            <path
              d="M76.6 4a4 4 0 00-4-4H4.077A4 4 0 00.086 4.244l2.336 38.159a4 4 0 003.992 3.755H72.6a4 4 0 004-4V4z"
              className="keyOpacity"
              stroke="#fff"
              strokeWidth="2"
              fill="transparent"
              strokeOpacity="0"
            />

            <path
              d="M76.6 4a4 4 0 00-4-4H4.077A4 4 0 00.086 4.244l2.336 38.159a4 4 0 003.992 3.755H72.6a4 4 0 004-4V4z"
              className="keyAnimation"
              stroke="#fff"
              strokeWidth="1"
              fill="transparent"
              strokeOpacity="1"
            />
          </g>
          <g className="keyContentLabelRotate">
            <foreignObject x={3} y={1} width={widthShape2} height={heightShape2}>
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
            <foreignObject x={0} y={1} width={width} height={height}>
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
      {keyType == "defy-tR6" ? (
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
              d="M18.285 56.918c12.026-2.652 25.035-3.56 37.484-3.626 2.298-.013 4.14-1.924 4.032-4.218L57.65 3.367A3.547 3.547 0 0056.57.952a3.388 3.388 0 00-2.423-.951A305.77 305.77 0 002.774 5.748a3.415 3.415 0 00-1.324.587c-.396.288-.728.66-.974 1.088a3.613 3.613 0 00-.31 2.87l14.1 44.22c.252.845.805 1.561 1.55 2.007a3.364 3.364 0 002.469.398z"
              fill={color}
            />
          </g>

          <g className="baseShape">
            <path
              d="M18.285 56.918c12.026-2.652 25.035-3.56 37.484-3.626 2.298-.013 4.14-1.924 4.032-4.218L57.65 3.367A3.547 3.547 0 0056.57.952a3.388 3.388 0 00-2.423-.951A305.77 305.77 0 002.774 5.748a3.415 3.415 0 00-1.324.587c-.396.288-.728.66-.974 1.088a3.613 3.613 0 00-.31 2.87l14.1 44.22c.252.845.805 1.561 1.55 2.007a3.364 3.364 0 002.469.398z"
              fill={`#303949`}
            />
            <path
              d="M18.285 56.918c12.026-2.652 25.035-3.56 37.484-3.626 2.298-.013 4.14-1.924 4.032-4.218L57.65 3.367A3.547 3.547 0 0056.57.952a3.388 3.388 0 00-2.423-.951A305.77 305.77 0 002.774 5.748a3.415 3.415 0 00-1.324.587c-.396.288-.728.66-.974 1.088a3.613 3.613 0 00-.31 2.87l14.1 44.22c.252.845.805 1.561 1.55 2.007a3.364 3.364 0 002.469.398z"
              fill={`url(#paintGradient${id})`}
              fillOpacity="0.2"
            />
            <path
              d="M18.285 56.918c12.026-2.652 25.035-3.56 37.484-3.626 2.298-.013 4.14-1.924 4.032-4.218L57.65 3.367A3.547 3.547 0 0056.57.952a3.388 3.388 0 00-2.423-.951A305.77 305.77 0 002.774 5.748a3.415 3.415 0 00-1.324.587c-.396.288-.728.66-.974 1.088a3.613 3.613 0 00-.31 2.87l14.1 44.22c.252.845.805 1.561 1.55 2.007a3.364 3.364 0 002.469.398z"
              fill={color}
              className="keyColorOpacity"
            />
            <path
              d="M18.285 56.918c12.026-2.652 25.035-3.56 37.484-3.626 2.298-.013 4.14-1.924 4.032-4.218L57.65 3.367A3.547 3.547 0 0056.57.952a3.388 3.388 0 00-2.423-.951A305.77 305.77 0 002.774 5.748a3.415 3.415 0 00-1.324.587c-.396.288-.728.66-.974 1.088a3.613 3.613 0 00-.31 2.87l14.1 44.22c.252.845.805 1.561 1.55 2.007a3.364 3.364 0 002.469.398z"
              className="keyOpacityInternal"
              stroke={color}
              strokeWidth="2"
              fill="transparent"
            />
          </g>
          <g className="shadowMiddle" transform={`translate(${0},${12})`}>
            <path
              d="M18.285 49.918c8.629-1.26 20.638-2.347 31.624-2.574 2.244-.047 4.049-1.89 3.998-4.135L53 3.499a3.546 3.546 0 00-1.079-2.414 3.388 3.388 0 00-2.423-.952c-17.148 1-29.234 2.017-46.174 5.38A3.416 3.416 0 002 6.1c-.396.289-.728.66-.974 1.089a3.613 3.613 0 00-.31 2.87l13.55 37.454c.252.845.805 1.561 1.55 2.007a3.364 3.364 0 002.469.398z"
              fill={color}
            />
          </g>
          <g transform={`translate(${4},${0})`}>
            <path
              d="M18.285 49.918c8.629-1.26 20.638-2.347 31.624-2.574 2.244-.047 4.049-1.89 3.998-4.135L53 3.499a3.546 3.546 0 00-1.079-2.414 3.388 3.388 0 00-2.423-.952c-17.148 1-29.234 2.017-46.174 5.38A3.416 3.416 0 002 6.1c-.396.289-.728.66-.974 1.089a3.613 3.613 0 00-.31 2.87l13.55 37.454c.252.845.805 1.561 1.55 2.007a3.364 3.364 0 002.469.398z"
              className="keyBase"
            />
            <path
              d="M18.285 49.918c8.629-1.26 20.638-2.347 31.624-2.574 2.244-.047 4.049-1.89 3.998-4.135L53 3.499a3.546 3.546 0 00-1.079-2.414 3.388 3.388 0 00-2.423-.952c-17.148 1-29.234 2.017-46.174 5.38A3.416 3.416 0 002 6.1c-.396.289-.728.66-.974 1.089a3.613 3.613 0 00-.31 2.87l13.55 37.454c.252.845.805 1.561 1.55 2.007a3.364 3.364 0 002.469.398z"
              fill={`url(#paintGradient${id})`}
              fillOpacity="0.25"
            />
            <path
              d="M18.285 49.918c8.629-1.26 20.638-2.347 31.624-2.574 2.244-.047 4.049-1.89 3.998-4.135L53 3.499a3.546 3.546 0 00-1.079-2.414 3.388 3.388 0 00-2.423-.952c-17.148 1-29.234 2.017-46.174 5.38A3.416 3.416 0 002 6.1c-.396.289-.728.66-.974 1.089a3.613 3.613 0 00-.31 2.87l13.55 37.454c.252.845.805 1.561 1.55 2.007a3.364 3.364 0 002.469.398z"
              fill={color}
              fillOpacity="0.2"
            />
            <path
              d="M18.285 49.918c8.629-1.26 20.638-2.347 31.624-2.574 2.244-.047 4.049-1.89 3.998-4.135L53 3.499a3.546 3.546 0 00-1.079-2.414 3.388 3.388 0 00-2.423-.952c-17.148 1-29.234 2.017-46.174 5.38A3.416 3.416 0 002 6.1c-.396.289-.728.66-.974 1.089a3.613 3.613 0 00-.31 2.87l13.55 37.454c.252.845.805 1.561 1.55 2.007a3.364 3.364 0 002.469.398z"
              className="keyOpacity"
              stroke="#fff"
              strokeWidth="2"
              fill="transparent"
              strokeOpacity="0"
            />

            <path
              d="M18.285 49.918c8.629-1.26 20.638-2.347 31.624-2.574 2.244-.047 4.049-1.89 3.998-4.135L53 3.499a3.546 3.546 0 00-1.079-2.414 3.388 3.388 0 00-2.423-.952c-17.148 1-29.234 2.017-46.174 5.38A3.416 3.416 0 002 6.1c-.396.289-.728.66-.974 1.089a3.613 3.613 0 00-.31 2.87l13.55 37.454c.252.845.805 1.561 1.55 2.007a3.364 3.364 0 002.469.398z"
              className="keyAnimation"
              stroke="#fff"
              strokeWidth="1"
              fill="transparent"
              strokeOpacity="1"
            />
          </g>
          <g className="keyContentLabelRotate">
            <foreignObject x={3} y={1} width={widthShape2} height={heightShape2}>
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
            <foreignObject x={0} y={1} width={width} height={height}>
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
      {keyType == "defy-tR5" ? (
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
              d="M52.7 52H5.715a3.527 3.527 0 01-2.404-.962 3.476 3.476 0 01-1.085-2.335L.003 3.63A3.464 3.464 0 01.97 1.08 3.514 3.514 0 013.492 0h69.02c.58.004 1.15.15 1.658.426s.94.672 1.257 1.153a3.47 3.47 0 01.288 3.284L55.903 49.936a3.494 3.494 0 01-1.294 1.502A3.532 3.532 0 0152.7 52z"
              fill={color}
            />
          </g>

          <g className="baseShape">
            <path
              d="M52.7 52H5.715a3.527 3.527 0 01-2.404-.962 3.476 3.476 0 01-1.085-2.335L.003 3.63A3.464 3.464 0 01.97 1.08 3.514 3.514 0 013.492 0h69.02c.58.004 1.15.15 1.658.426s.94.672 1.257 1.153a3.47 3.47 0 01.288 3.284L55.903 49.936a3.494 3.494 0 01-1.294 1.502A3.532 3.532 0 0152.7 52z"
              fill={`#303949`}
            />
            <path
              d="M52.7 52H5.715a3.527 3.527 0 01-2.404-.962 3.476 3.476 0 01-1.085-2.335L.003 3.63A3.464 3.464 0 01.97 1.08 3.514 3.514 0 013.492 0h69.02c.58.004 1.15.15 1.658.426s.94.672 1.257 1.153a3.47 3.47 0 01.288 3.284L55.903 49.936a3.494 3.494 0 01-1.294 1.502A3.532 3.532 0 0152.7 52z"
              fill={`url(#paintGradient${id})`}
              fillOpacity="0.2"
            />
            <path
              d="M52.7 52H5.715a3.527 3.527 0 01-2.404-.962 3.476 3.476 0 01-1.085-2.335L.003 3.63A3.464 3.464 0 01.97 1.08 3.514 3.514 0 013.492 0h69.02c.58.004 1.15.15 1.658.426s.94.672 1.257 1.153a3.47 3.47 0 01.288 3.284L55.903 49.936a3.494 3.494 0 01-1.294 1.502A3.532 3.532 0 0152.7 52z"
              fill={color}
              className="keyColorOpacity"
            />
            <path
              d="M52.7 52H5.715a3.527 3.527 0 01-2.404-.962 3.476 3.476 0 01-1.085-2.335L.003 3.63A3.464 3.464 0 01.97 1.08 3.514 3.514 0 013.492 0h69.02c.58.004 1.15.15 1.658.426s.94.672 1.257 1.153a3.47 3.47 0 01.288 3.284L55.903 49.936a3.494 3.494 0 01-1.294 1.502A3.532 3.532 0 0152.7 52z"
              className="keyOpacityInternal"
              stroke={color}
              strokeWidth="2"
              fill="transparent"
            />
          </g>
          <g className="shadowMiddle" transform={`translate(${0},${12})`}>
            <path
              d="M46.7 46H5.715a3.527 3.527 0 01-2.404-.962 3.476 3.476 0 01-1.085-2.335L.003 3.63A3.464 3.464 0 01.97 1.08 3.514 3.514 0 013.492 0h63.02c.58.004 1.15.15 1.658.426s.94.672 1.257 1.153a3.47 3.47 0 01.288 3.284L49.903 43.936a3.494 3.494 0 01-1.294 1.502A3.532 3.532 0 0146.7 46z"
              fill={color}
            />
          </g>
          <g transform={`translate(${4},${0})`}>
            <path
              d="M46.7 46H5.715a3.527 3.527 0 01-2.404-.962 3.476 3.476 0 01-1.085-2.335L.003 3.63A3.464 3.464 0 01.97 1.08 3.514 3.514 0 013.492 0h63.02c.58.004 1.15.15 1.658.426s.94.672 1.257 1.153a3.47 3.47 0 01.288 3.284L49.903 43.936a3.494 3.494 0 01-1.294 1.502A3.532 3.532 0 0146.7 46z"
              className="keyBase"
            />
            <path
              d="M46.7 46H5.715a3.527 3.527 0 01-2.404-.962 3.476 3.476 0 01-1.085-2.335L.003 3.63A3.464 3.464 0 01.97 1.08 3.514 3.514 0 013.492 0h63.02c.58.004 1.15.15 1.658.426s.94.672 1.257 1.153a3.47 3.47 0 01.288 3.284L49.903 43.936a3.494 3.494 0 01-1.294 1.502A3.532 3.532 0 0146.7 46z"
              fill={`url(#paintGradient${id})`}
              fillOpacity="0.25"
            />
            <path
              d="M46.7 46H5.715a3.527 3.527 0 01-2.404-.962 3.476 3.476 0 01-1.085-2.335L.003 3.63A3.464 3.464 0 01.97 1.08 3.514 3.514 0 013.492 0h63.02c.58.004 1.15.15 1.658.426s.94.672 1.257 1.153a3.47 3.47 0 01.288 3.284L49.903 43.936a3.494 3.494 0 01-1.294 1.502A3.532 3.532 0 0146.7 46z"
              fill={color}
              fillOpacity="0.2"
            />
            <path
              d="M46.7 46H5.715a3.527 3.527 0 01-2.404-.962 3.476 3.476 0 01-1.085-2.335L.003 3.63A3.464 3.464 0 01.97 1.08 3.514 3.514 0 013.492 0h63.02c.58.004 1.15.15 1.658.426s.94.672 1.257 1.153a3.47 3.47 0 01.288 3.284L49.903 43.936a3.494 3.494 0 01-1.294 1.502A3.532 3.532 0 0146.7 46z"
              className="keyOpacity"
              stroke="#fff"
              strokeWidth="2"
              fill="transparent"
              strokeOpacity="0"
            />

            <path
              d="M46.7 46H5.715a3.527 3.527 0 01-2.404-.962 3.476 3.476 0 01-1.085-2.335L.003 3.63A3.464 3.464 0 01.97 1.08 3.514 3.514 0 013.492 0h63.02c.58.004 1.15.15 1.658.426s.94.672 1.257 1.153a3.47 3.47 0 01.288 3.284L49.903 43.936a3.494 3.494 0 01-1.294 1.502A3.532 3.532 0 0146.7 46z"
              className="keyAnimation"
              stroke="#fff"
              strokeWidth="1"
              fill="transparent"
              strokeOpacity="1"
            />
          </g>
          <g className="keyContentLabelRotate">
            <foreignObject x={3} y={1} width={widthShape2} height={heightShape2}>
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
            <foreignObject x={0} y={1} width={width} height={height}>
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
      {keyType == "defy-tR7" ? (
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
              d="M73.339 51.18A86.228 86.228 0 0048.322 71.66a3.4 3.4 0 01-2.22 1.305 3.37 3.37 0 01-2.487-.635L1.465 42.47a3.496 3.496 0 01-.958-1.04 3.555 3.555 0 01-.384-2.764 3.54 3.54 0 01.636-1.269C7.961 28.233 25.211 10.527 56.794.166a3.406 3.406 0 012.687.253c.409.224.769.528 1.059.895.29.368.505.79.632 1.244l13.697 44.673a3.549 3.549 0 01-.108 2.237 3.479 3.479 0 01-1.422 1.711z"
              fill={color}
            />
          </g>

          <g className="baseShape">
            <path
              d="M73.339 51.18A86.228 86.228 0 0048.322 71.66a3.4 3.4 0 01-2.22 1.305 3.37 3.37 0 01-2.487-.635L1.465 42.47a3.496 3.496 0 01-.958-1.04 3.555 3.555 0 01-.384-2.764 3.54 3.54 0 01.636-1.269C7.961 28.233 25.211 10.527 56.794.166a3.406 3.406 0 012.687.253c.409.224.769.528 1.059.895.29.368.505.79.632 1.244l13.697 44.673a3.549 3.549 0 01-.108 2.237 3.479 3.479 0 01-1.422 1.711z"
              fill={`#303949`}
            />
            <path
              d="M73.339 51.18A86.228 86.228 0 0048.322 71.66a3.4 3.4 0 01-2.22 1.305 3.37 3.37 0 01-2.487-.635L1.465 42.47a3.496 3.496 0 01-.958-1.04 3.555 3.555 0 01-.384-2.764 3.54 3.54 0 01.636-1.269C7.961 28.233 25.211 10.527 56.794.166a3.406 3.406 0 012.687.253c.409.224.769.528 1.059.895.29.368.505.79.632 1.244l13.697 44.673a3.549 3.549 0 01-.108 2.237 3.479 3.479 0 01-1.422 1.711z"
              fill={`url(#paintGradient${id})`}
              fillOpacity="0.2"
            />
            <path
              d="M73.339 51.18A86.228 86.228 0 0048.322 71.66a3.4 3.4 0 01-2.22 1.305 3.37 3.37 0 01-2.487-.635L1.465 42.47a3.496 3.496 0 01-.958-1.04 3.555 3.555 0 01-.384-2.764 3.54 3.54 0 01.636-1.269C7.961 28.233 25.211 10.527 56.794.166a3.406 3.406 0 012.687.253c.409.224.769.528 1.059.895.29.368.505.79.632 1.244l13.697 44.673a3.549 3.549 0 01-.108 2.237 3.479 3.479 0 01-1.422 1.711z"
              fill={color}
              className="keyColorOpacity"
            />
            <path
              d="M73.339 51.18A86.228 86.228 0 0048.322 71.66a3.4 3.4 0 01-2.22 1.305 3.37 3.37 0 01-2.487-.635L1.465 42.47a3.496 3.496 0 01-.958-1.04 3.555 3.555 0 01-.384-2.764 3.54 3.54 0 01.636-1.269C7.961 28.233 25.211 10.527 56.794.166a3.406 3.406 0 012.687.253c.409.224.769.528 1.059.895.29.368.505.79.632 1.244l13.697 44.673a3.549 3.549 0 01-.108 2.237 3.479 3.479 0 01-1.422 1.711z"
              className="keyOpacityInternal"
              stroke={color}
              strokeWidth="2"
              fill="transparent"
            />
          </g>
          <g className="shadowMiddle" transform={`translate(${0},${12})`}>
            <path
              d="M65.339 48.18C56.499 53.6 51.999 57 44.322 64.66a3.401 3.401 0 01-2.22 1.305 3.37 3.37 0 01-2.487-.635L1.465 40.47a3.496 3.496 0 01-.958-1.04 3.555 3.555 0 01-.384-2.764 3.54 3.54 0 01.636-1.269C7.961 26.233 27.5 8.926 52 1a3.406 3.406 0 012.688.254c.408.223.768.527 1.059.895.29.367.505.79.631 1.244L66.868 44.23a3.549 3.549 0 01-.107 2.237 3.479 3.479 0 01-1.422 1.711z"
              fill={color}
            />
          </g>
          <g transform={`translate(${4},${0})`}>
            <path
              d="M65.339 48.18C56.499 53.6 51.999 57 44.322 64.66a3.401 3.401 0 01-2.22 1.305 3.37 3.37 0 01-2.487-.635L1.465 40.47a3.496 3.496 0 01-.958-1.04 3.555 3.555 0 01-.384-2.764 3.54 3.54 0 01.636-1.269C7.961 26.233 27.5 8.926 52 1a3.406 3.406 0 012.688.254c.408.223.768.527 1.059.895.29.367.505.79.631 1.244L66.868 44.23a3.549 3.549 0 01-.107 2.237 3.479 3.479 0 01-1.422 1.711z"
              className="keyBase"
            />
            <path
              d="M65.339 48.18C56.499 53.6 51.999 57 44.322 64.66a3.401 3.401 0 01-2.22 1.305 3.37 3.37 0 01-2.487-.635L1.465 40.47a3.496 3.496 0 01-.958-1.04 3.555 3.555 0 01-.384-2.764 3.54 3.54 0 01.636-1.269C7.961 26.233 27.5 8.926 52 1a3.406 3.406 0 012.688.254c.408.223.768.527 1.059.895.29.367.505.79.631 1.244L66.868 44.23a3.549 3.549 0 01-.107 2.237 3.479 3.479 0 01-1.422 1.711z"
              fill={`url(#paintGradient${id})`}
              fillOpacity="0.25"
            />
            <path
              d="M65.339 48.18C56.499 53.6 51.999 57 44.322 64.66a3.401 3.401 0 01-2.22 1.305 3.37 3.37 0 01-2.487-.635L1.465 40.47a3.496 3.496 0 01-.958-1.04 3.555 3.555 0 01-.384-2.764 3.54 3.54 0 01.636-1.269C7.961 26.233 27.5 8.926 52 1a3.406 3.406 0 012.688.254c.408.223.768.527 1.059.895.29.367.505.79.631 1.244L66.868 44.23a3.549 3.549 0 01-.107 2.237 3.479 3.479 0 01-1.422 1.711z"
              fill={color}
              fillOpacity="0.2"
            />
            <path
              d="M65.339 48.18C56.499 53.6 51.999 57 44.322 64.66a3.401 3.401 0 01-2.22 1.305 3.37 3.37 0 01-2.487-.635L1.465 40.47a3.496 3.496 0 01-.958-1.04 3.555 3.555 0 01-.384-2.764 3.54 3.54 0 01.636-1.269C7.961 26.233 27.5 8.926 52 1a3.406 3.406 0 012.688.254c.408.223.768.527 1.059.895.29.367.505.79.631 1.244L66.868 44.23a3.549 3.549 0 01-.107 2.237 3.479 3.479 0 01-1.422 1.711z"
              className="keyOpacity"
              stroke="#fff"
              strokeWidth="2"
              fill="transparent"
              strokeOpacity="0"
            />

            <path
              d="M65.339 48.18C56.499 53.6 51.999 57 44.322 64.66a3.401 3.401 0 01-2.22 1.305 3.37 3.37 0 01-2.487-.635L1.465 40.47a3.496 3.496 0 01-.958-1.04 3.555 3.555 0 01-.384-2.764 3.54 3.54 0 01.636-1.269C7.961 26.233 27.5 8.926 52 1a3.406 3.406 0 012.688.254c.408.223.768.527 1.059.895.29.367.505.79.631 1.244L66.868 44.23a3.549 3.549 0 01-.107 2.237 3.479 3.479 0 01-1.422 1.711z"
              className="keyAnimation"
              stroke="#fff"
              strokeWidth="1"
              fill="transparent"
              strokeOpacity="1"
            />
          </g>
          <g className="keyContentLabelRotate">
            <foreignObject x={3} y={1} width={widthShape2} height={heightShape2}>
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
            <foreignObject x={0} y={1} width={width} height={height}>
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
      {/* END DEFY THUMBS KEYS */}

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
