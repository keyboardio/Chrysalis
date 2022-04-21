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

import * as React from "react";
import Styled from "styled-components";
import { useTheme } from "styled-components";

const Style = Styled.div`
align-self: center;
.neuronStatusInner {
	width: 320px;
	height: 360px;
  background-color: ${({ theme }) => theme.styles.neuronStatus.neuronStatusBackgroundColor}; 
	border-radius: 14px;
	display: flex;
    justify-content: center;
    align-items: center;
	position: relative;
}
.neuronConnectAnimation {
	position: absolute;
    top: 0;
    right: 0;
    width: 62px;
	img {
		width: 100%;
	}
}
.neuronConnectAnimation .lineStatus {
	stroke: #3F425A;
}

@keyframes rotating {
	from {
	  transform: rotate(0deg);
	}
	to {
	  transform: rotate(360deg);
	}
  }
.rotating {
	transform-origin: 86% 76%;
	animation: rotating 1s linear infinite;
	animation-play-state: paused;
	&.loading {
		animation-play-state: initial;
	}
}

@keyframes lineAnimation {
	0% {
	  stroke-opacity: 0.25;
	}
	50% {
		stroke-opacity: 1;
	}
	100% {
		stroke-opacity: 0.25;
	}
}
.lineColor {
	transition: all 250ms ease-in-out;
	stroke: ${({ theme }) => theme.styles.neuronStatus.lineStrokeColor};
	&.loading,
	&.scanFoundDevices {
		animation: lineAnimation 600ms linear infinite;
	}
  &.connected {
    stroke: ${({ theme }) => theme.styles.neuronStatus.lineStrokeColorConnected};
  }
}
.connectionSuccess path {
  fill: ${({ theme }) => theme.styles.neuronStatus.connectionSuccessFill};
  stroke-opacity: ${({ theme }) => theme.styles.neuronStatus.connectionStrokeOpacity};
}
.noDeviceFounded path{
  fill: ${({ theme }) => theme.styles.neuronStatus.neuronNotFoundedColor};
}

`;
const NeuronStatus = props => {
  let neuronLoader = useTheme().styles.neuronStatus.neuronLoader;
  let checkedIcon = useTheme().styles.neuronStatus.checkedIcon;
  let connectionColorMatrix = useTheme().styles.neuronStatus.connectionColorMatrix;
  let connectionColorMatrixOnLoading = useTheme().styles.neuronStatus.connectionColorMatrixOnLoading;

  return (
    <Style>
      <div className="neuronStatusInner">
        {props.connected ? (
          <div className="neuronConnectAnimation">
            <img src={checkedIcon} />
          </div>
        ) : (
          ""
        )}
        <svg width={157} height={179} fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            className={`lineColor ${props.loading && props.deviceItems ? "loading" : ""} ${
              props.scanFoundDevices ? "scanFoundDevices" : ""
            } ${props.connected ? "connected" : ""} `}
            clipRule="evenodd"
            d="M68.219 173.573c-1.048 2.516-3.983 3.773-6.498 2.62-.105 0-.105-.104-.21-.104l-50.833-24.107c-7.546-3.563-10.795-12.577-7.231-20.228l30.814-66.24c2.934-6.288 4.402-13.1 4.402-20.018V13.005C38.663 6.926 43.589 2 49.668 2h58.064c6.079 0 11.005 4.926 11.005 11.005v32.49c0 6.918 1.467 13.731 4.402 20.02l30.814 66.239c3.564 7.546.315 16.56-7.232 20.228l-50.832 24.107c-2.516 1.152-5.45.104-6.603-2.411 0-.105-.105-.105-.105-.21-2.41-5.764-9.014-8.489-14.778-6.079-2.935 1.258-5.031 3.459-6.184 6.184z"
            stroke="#3F425A"
            strokeWidth={3}
            strokeMiterlimit={1.5}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {props.deviceItems && !props.connected ? (
            <g className={"connectionLoading connectionScanning "}>
              <g filter="url(#prefix__filter0_d_1082_145292)">
                <path
                  d="M96.15 64.955l-.933-.016-1.868-.033c-3.894.085-7.643.784-11.241 1.791l11.754 4.486 2.783 1.118 2.474.96-4.517 17.96a80.16 80.16 0 01-8.952 22.317l7.775-8.425 2.697-2.858.317-.3 4.124-4.361c.633-.6 1.113-1.357 1.285-2.27l1.481-4.561 7.401-22.65c-4.481-1.912-9.446-2.916-14.58-3.158z"
                  fill="#32C1EE"
                />
              </g>
              <g filter="url(#prefix__filter1_d_1082_145292)">
                <path
                  d="M56.604 82.914c.612.623 1.069 1.242 1.68 1.864a45.503 45.503 0 003.825 3.889l-1.434-7.058-.57-3.067-1.299-5.832 20.362-6.982c4.385-1.452 9.226-2.285 14.206-2.198l.312.005 2.49.044c1.09.019 2.332.193 3.419.365l-3.559-1.285-2.938-1.121-6.653-2.41-5.104-1.923a6.592 6.592 0 00-4.203-.073l-5.793 1.886-18.322 6.1-5.636 1.737c2.075 5.998 5.25 11.404 9.217 16.06z"
                  fill="#32C1EE"
                />
              </g>
              <g filter="url(#prefix__filter2_d_1082_145292)">
                <path
                  d="M85.097 100.534l-3.314 2.541-3.472 2.691-15.19-12.8c-2.147-1.872-4.291-3.897-6.122-6.07-.611-.622-1.068-1.241-1.677-2.016-1.98-2.48-3.647-5.108-5.153-8.04l3.084 10.603.29 1.228 1.029 3.534.585 2.15c.298.77.593 1.692 1.205 2.314.612.623 1.374 1.553 2.29 2.64.608.774 1.373 1.552 2.136 2.482 6.561 7.606 17.09 19.866 17.399 20.025 5.895-7.694 10.252-16.485 12.91-26.07l-6 4.788z"
                  fill="#32C1EE"
                />
              </g>
              <defs>
                <filter
                  id="prefix__filter0_d_1082_145292"
                  x={70.108}
                  y={56.906}
                  width={52.623}
                  height={72.632}
                  filterUnits="userSpaceOnUse"
                  colorInterpolationFilters="sRGB"
                >
                  <feFlood floodOpacity={0} result="BackgroundImageFix" />
                  <feColorMatrix in="SourceAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                  <feOffset dy={4} />
                  <feGaussianBlur stdDeviation={6} />
                  <feComposite in2="hardAlpha" operator="out" />
                  <feColorMatrix values={connectionColorMatrixOnLoading} />
                  <feBlend in2="BackgroundImageFix" result="effect1_dropShadow_1082_145292" />
                  <feBlend in="SourceGraphic" in2="effect1_dropShadow_1082_145292" result="shape" />
                </filter>
                <filter
                  id="prefix__filter1_d_1082_145292"
                  x={35.388}
                  y={48.823}
                  width={76.207}
                  height={55.843}
                  filterUnits="userSpaceOnUse"
                  colorInterpolationFilters="sRGB"
                >
                  <feFlood floodOpacity={0} result="BackgroundImageFix" />
                  <feColorMatrix in="SourceAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                  <feOffset dy={4} />
                  <feGaussianBlur stdDeviation={6} />
                  <feComposite in2="hardAlpha" operator="out" />
                  <feColorMatrix values={connectionColorMatrixOnLoading} />
                  <feBlend in2="BackgroundImageFix" result="effect1_dropShadow_1082_145292" />
                  <feBlend in="SourceGraphic" in2="effect1_dropShadow_1082_145292" result="shape" />
                </filter>
                <filter
                  id="prefix__filter2_d_1082_145292"
                  x={38.169}
                  y={68.841}
                  width={64.928}
                  height={68.975}
                  filterUnits="userSpaceOnUse"
                  colorInterpolationFilters="sRGB"
                >
                  <feFlood floodOpacity={0} result="BackgroundImageFix" />
                  <feColorMatrix in="SourceAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                  <feOffset dy={4} />
                  <feGaussianBlur stdDeviation={6} />
                  <feComposite in2="hardAlpha" operator="out" />
                  <feColorMatrix values={connectionColorMatrixOnLoading} />
                  <feBlend in2="BackgroundImageFix" result="effect1_dropShadow_1082_145292" />
                  <feBlend in="SourceGraphic" in2="effect1_dropShadow_1082_145292" result="shape" />
                </filter>
              </defs>
              <mask
                id="prefix__a"
                style={{
                  maskType: "alpha"
                }}
                maskUnits="userSpaceOnUse"
                x={46}
                y={56}
                width={65}
                height={67}
              >
                <path
                  d="M96.15 64.955l-.933-.016-1.868-.033c-3.894.085-7.643.784-11.241 1.791l11.754 4.486 2.783 1.118 2.474.96-4.517 17.96a80.16 80.16 0 01-8.952 22.317l7.775-8.425 2.697-2.858.317-.3 4.124-4.361c.633-.6 1.113-1.357 1.285-2.27l1.481-4.561 7.401-22.65c-4.481-1.912-9.446-2.916-14.58-3.158z"
                  fill="#32EEEE"
                />
                <path
                  d="M56.604 82.914c.612.623 1.069 1.242 1.68 1.864a45.503 45.503 0 003.825 3.889l-1.434-7.058-.57-3.067-1.299-5.832 20.362-6.982c4.385-1.452 9.226-2.285 14.206-2.198l.312.005 2.49.044c1.09.019 2.332.193 3.419.365l-3.559-1.285-2.938-1.121-6.653-2.41-5.104-1.923a6.592 6.592 0 00-4.203-.073l-5.793 1.886-18.322 6.1-5.636 1.737c2.075 5.998 5.25 11.404 9.217 16.06z"
                  fill="#32EEEE"
                />
                <path
                  d="M85.097 100.534l-3.314 2.541-3.472 2.691-15.19-12.8c-2.147-1.872-4.291-3.897-6.122-6.07-.611-.622-1.068-1.241-1.677-2.016-1.98-2.48-3.647-5.108-5.153-8.04l3.084 10.603.29 1.228 1.029 3.534.585 2.15c.298.77.593 1.692 1.205 2.314.612.623 1.374 1.553 2.29 2.64.608.774 1.373 1.552 2.136 2.482 6.561 7.606 17.09 19.866 17.399 20.025 5.895-7.694 10.252-16.485 12.91-26.07l-6 4.788z"
                  fill="#32EEEE"
                />
              </mask>
              <g mask="url(#prefix__a)">
                <path transform="rotate(1 40.361 48.424)" fill="url(#prefix__pattern0)" d="M40.361 48.424h78v78h-78z" />
              </g>
              <defs>
                <pattern id="prefix__pattern0" patternContentUnits="objectBoundingBox" width={1} height={1}>
                  <use xlinkHref="#prefix__image0_1082_145292" transform="scale(.00357)" />
                </pattern>
                <image
                  className={`rotating ${props.loading || props.scanFoundDevices ? "loading" : ""}`}
                  id="prefix__image0_1082_145292"
                  width={270}
                  height={270}
                  xlinkHref={neuronLoader}
                />
              </defs>
            </g>
          ) : (
            ""
          )}

          {!props.deviceItems ? (
            <g className={"noDeviceFounded"}>
              <path fill="#E2E4EA" d="M58 80.75h1.75V93H58z" />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M65.25 74v24h27.5V74h-27.5zm-1-2a1 1 0 00-1 1v26a1 1 0 001 1h29.5a1 1 0 001-1V73a1 1 0 00-1-1h-29.5z"
                fill="#E2E4EA"
              />
              <path
                fill="#E2E4EA"
                d="M98.25 80.75H100V93h-1.75zM73.828 81.121L71.708 79l-.708.707 2.121 2.121L71 83.95l.707.707 2.121-2.121 2.122 2.12.707-.706-2.121-2.122 2.12-2.12L75.95 79l-2.122 2.121zM83.828 81.121L81.708 79l-.708.707 2.121 2.121L81 83.95l.707.707 2.121-2.121 2.122 2.12.707-.706-2.121-2.122 2.12-2.12L85.95 79l-2.122 2.121zM83.609 92a6.776 6.776 0 00-4.61-1.8 6.776 6.776 0 00-4.608 1.8h-1.637A7.985 7.985 0 0179 89a7.985 7.985 0 016.245 3H83.61z"
              />
            </g>
          ) : (
            ""
          )}

          {props.connected ? (
            <g className={"connectionSuccess"}>
              <g filter="url(#prefix__filter0_d_1082_156043)">
                <path
                  d="M95.722 64.654H92.92c-3.892.152-7.628.917-11.208 1.987l11.83 4.28 2.803 1.07 2.49.916-4.203 18.037a80.18 80.18 0 01-8.561 22.469l7.627-8.56 2.647-2.904.31-.306 4.048-4.433c.623-.61 1.09-1.375 1.246-2.292l1.401-4.586 7.005-22.774c-4.515-1.835-9.496-2.752-14.633-2.904z"
                  fill="#32EEEE"
                />
                <path
                  d="M93.9 69.986l-.009-.003-.008-.003-8.843-3.2c2.566-.608 5.198-1.019 7.9-1.126H95.707c4.71.141 9.264.937 13.419 2.497l-6.732 21.887-.001.002-1.401 4.586-.019.061-.01.063c-.114.671-.457 1.253-.96 1.747l-.02.02-.018.02-4.03 4.412-.291.286-.02.02-.018.02-2.647 2.904h0l-.007.009-2.555 2.866a80.855 80.855 0 005.211-15.892l4.201-18.028.201-.86-.83-.305-2.484-.915-2.797-1.068z"
                  stroke="#3F425A"
                  strokeOpacity={0.15}
                  strokeWidth={2}
                />
              </g>
              <g filter="url(#prefix__filter1_d_1082_156043)">
                <path
                  d="M56.496 83.3c.622.612 1.09 1.223 1.712 1.835a45.486 45.486 0 003.892 3.82l-1.557-7.03-.623-3.057-1.4-5.808 20.236-7.337c4.359-1.529 9.184-2.446 14.166-2.446h2.801c1.09 0 2.336.153 3.425.306l-3.58-1.223-2.958-1.07-6.693-2.293-5.137-1.834a6.593 6.593 0 00-4.203 0l-5.76 1.987-18.213 6.42L47 67.404c2.18 5.961 5.448 11.311 9.496 15.897z"
                  fill="#32EEEE"
                />
                <path
                  d="M48.305 68.03l4.61-1.51.01-.003.011-.004 18.207-6.417.007-.003 5.745-1.982a5.591 5.591 0 013.562-.001l5.124 1.83h0l.012.004 6.685 2.29.13.046c-4.92.061-9.676.989-13.983 2.5h0l-.01.003-20.237 7.337-.84.304.21.87 1.396 5.791.62 3.04v.008l.003.008.859 3.88a45.606 45.606 0 01-1.477-1.557l-.02-.022-.02-.02c-.284-.28-.535-.561-.81-.87l-.009-.009c-.26-.292-.543-.61-.868-.93-3.737-4.24-6.794-9.144-8.917-14.584z"
                  stroke="#3F425A"
                  strokeOpacity={0.15}
                  strokeWidth={2}
                />
              </g>
              <g filter="url(#prefix__filter2_d_1082_156043)">
                <path
                  d="M85.291 100.42l-3.269 2.599-3.424 2.751-15.411-12.534c-2.18-1.834-4.359-3.82-6.227-5.96-.623-.612-1.09-1.224-1.712-1.988-2.024-2.445-3.736-5.044-5.293-7.948l3.27 10.547.31 1.222 1.09 3.516.623 2.14c.311.764.622 1.681 1.245 2.293.623.611 1.401 1.528 2.335 2.598.623.764 1.401 1.529 2.18 2.446 6.693 7.489 17.434 19.564 17.745 19.717 5.76-7.795 9.963-16.66 12.454-26.29l-5.915 4.891z"
                  fill="#32EEEE"
                />
                <path
                  d="M85.914 101.203l.007-.006.008-.006 3.453-2.855c-2.401 7.946-6.013 15.318-10.739 21.934-.3-.325-.675-.734-1.112-1.216a959.3 959.3 0 01-4.512-5.01 5876.154 5876.154 0 01-7.4-8.28 8091.08 8091.08 0 00-3.858-4.319 40.771 40.771 0 00-1.166-1.301 25.069 25.069 0 01-.992-1.12l-.01-.013L59.58 99l-.455-.524c-.73-.84-1.385-1.594-1.932-2.13-.385-.379-.608-.934-.9-1.658l-.1-.251-.609-2.09-.002-.009-.003-.008-1.082-3.491-.305-1.198-.006-.025-.008-.024-1.043-3.367c.431.575.877 1.14 1.339 1.699l.293.362c.472.585.916 1.135 1.464 1.676 1.91 2.185 4.124 4.2 6.31 6.04l.007.006.007.005 15.41 12.534.628.51.63-.506 3.42-2.748.005-.004 3.265-2.595z"
                  stroke="#3F425A"
                  strokeOpacity={0.15}
                  strokeWidth={2}
                />
              </g>
              <defs>
                <filter
                  id="prefix__filter0_d_1082_156043"
                  x={69.712}
                  y={56.654}
                  width={52.643}
                  height={72.759}
                  filterUnits="userSpaceOnUse"
                  colorInterpolationFilters="sRGB"
                >
                  <feFlood floodOpacity={0} result="BackgroundImageFix" />
                  <feColorMatrix in="SourceAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                  <feOffset dy={4} />
                  <feGaussianBlur stdDeviation={6} />
                  <feComposite in2="hardAlpha" operator="out" />
                  <feColorMatrix values={connectionColorMatrix} />
                  <feBlend in2="BackgroundImageFix" result="effect1_dropShadow_1082_156043" />
                  <feBlend in="SourceGraphic" in2="effect1_dropShadow_1082_156043" result="shape" />
                </filter>
                <filter
                  id="prefix__filter1_d_1082_156043"
                  x={35}
                  y={48.819}
                  width={76.148}
                  height={56.137}
                  filterUnits="userSpaceOnUse"
                  colorInterpolationFilters="sRGB"
                >
                  <feFlood floodOpacity={0} result="BackgroundImageFix" />
                  <feColorMatrix in="SourceAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                  <feOffset dy={4} />
                  <feGaussianBlur stdDeviation={6} />
                  <feComposite in2="hardAlpha" operator="out" />
                  <feColorMatrix values={connectionColorMatrix} />
                  <feBlend in2="BackgroundImageFix" result="effect1_dropShadow_1082_156043" />
                  <feBlend in="SourceGraphic" in2="effect1_dropShadow_1082_156043" result="shape" />
                </filter>
                <filter
                  id="prefix__filter2_d_1082_156043"
                  x={37.955}
                  y={69.34}
                  width={65.252}
                  height={68.479}
                  filterUnits="userSpaceOnUse"
                  colorInterpolationFilters="sRGB"
                >
                  <feFlood floodOpacity={0} result="BackgroundImageFix" />
                  <feColorMatrix in="SourceAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                  <feOffset dy={4} />
                  <feGaussianBlur stdDeviation={6} />
                  <feComposite in2="hardAlpha" operator="out" />
                  <feColorMatrix values={connectionColorMatrix} />
                  <feBlend in2="BackgroundImageFix" result="effect1_dropShadow_1082_156043" />
                  <feBlend in="SourceGraphic" in2="effect1_dropShadow_1082_156043" result="shape" />
                </filter>
              </defs>
            </g>
          ) : (
            ""
          )}
        </svg>
      </div>
    </Style>
  );
};

export default NeuronStatus;
