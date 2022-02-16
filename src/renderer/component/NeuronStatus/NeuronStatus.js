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
import CheckedIcon from "../../../../static/base/icon-check-aimated.gif";

const Style = Styled.div`
align-self: center;
.neuronStatusInner {
	width: 320px;
	height: 360px;
	background-color: rgba(107, 119, 148, 0.05);
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
`;
const NeuronStatus = props => {
  return (
    <Style>
      <div className="neuronStatusInner">
        <div className="neuronConnectAnimation">
          <img src={CheckedIcon} />
        </div>
        <svg width={157} height={179} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
          {props.loading ? (
            <g className={"connectionLoading"}>
              <path
                clipRule="evenodd"
                d="M68.219 173.573c-1.048 2.516-3.983 3.773-6.498 2.62-.105 0-.105-.104-.21-.104l-50.833-24.107c-7.546-3.563-10.795-12.577-7.231-20.228l30.814-66.24c2.934-6.288 4.402-13.1 4.402-20.018V13.005C38.663 6.926 43.589 2 49.668 2h58.064c6.079 0 11.005 4.926 11.005 11.005v32.49c0 6.918 1.467 13.731 4.402 20.02l30.814 66.239c3.564 7.546.315 16.56-7.232 20.228l-50.832 24.107c-2.516 1.152-5.45.104-6.603-2.411 0-.105-.105-.105-.105-.21-2.41-5.764-9.014-8.489-14.778-6.079-2.935 1.258-5.031 3.459-6.184 6.184z"
                stroke="#3F425A"
                strokeWidth={3}
                strokeMiterlimit={1.5}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
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
                <path transform="rotate(1 3.068 27.49)" fill="url(#prefix__pattern0)" d="M3.068 27.49h145v113h-145z" />
              </g>
              <defs>
                <pattern id="prefix__pattern0" patternContentUnits="objectBoundingBox" width={1} height={1}>
                  <use xlinkHref="#prefix__image0_1082_145292" transform="matrix(.00684 0 0 .00877 .001 0)" />
                </pattern>
                <image
                  id="prefix__image0_1082_145292"
                  width={146}
                  height={114}
                  xlinkHref="data:image/png;base64,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"
                />
              </defs>
            </g>
          ) : (
            ""
          )}
          {!props.scanFoundDevices && !props.loading ? (
            <g className={"connectionFail"}>
              <path
                className="lineStatus"
                clipRule="evenodd"
                d="M68.219 173.573c-1.048 2.516-3.983 3.773-6.498 2.62-.105 0-.105-.104-.21-.104l-50.833-24.107c-7.546-3.563-10.795-12.577-7.231-20.228l30.814-66.24c2.934-6.288 4.402-13.1 4.402-20.018V13.005C38.663 6.926 43.589 2 49.668 2h58.064c6.079 0 11.005 4.926 11.005 11.005v32.49c0 6.918 1.467 13.731 4.402 20.02l30.814 66.239c3.564 7.546.315 16.56-7.232 20.228l-50.832 24.107c-2.516 1.152-5.45.104-6.603-2.411 0-.105-.105-.105-.105-.21-2.41-5.764-9.014-8.489-14.778-6.079-2.935 1.258-5.031 3.459-6.184 6.184z"
                stroke="#3F425A"
                strokeWidth={3}
                strokeMiterlimit={1.5}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
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
              <path
                clipRule="evenodd"
                d="M68.219 173.573c-1.048 2.516-3.983 3.773-6.498 2.62-.105 0-.105-.104-.21-.104l-50.833-24.107c-7.546-3.563-10.795-12.577-7.231-20.228l30.814-66.24c2.934-6.288 4.402-13.1 4.402-20.018V13.005C38.663 6.926 43.589 2 49.668 2h58.064c6.079 0 11.005 4.926 11.005 11.005v32.49c0 6.918 1.467 13.731 4.402 20.02l30.814 66.239c3.564 7.546.315 16.56-7.232 20.228l-50.832 24.107c-2.516 1.152-5.45.104-6.603-2.411 0-.105-.105-.105-.105-.21-2.41-5.764-9.014-8.489-14.778-6.079-2.935 1.258-5.031 3.459-6.184 6.184z"
                stroke="#32EEEE"
                strokeWidth={3}
                strokeMiterlimit={1.5}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
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
                  <feColorMatrix values="0 0 0 0 0.194444 0 0 0 0 0.933333 0 0 0 0 0.933333 0 0 0 0.5 0" />
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
                  <feColorMatrix values="0 0 0 0 0.194444 0 0 0 0 0.933333 0 0 0 0 0.933333 0 0 0 0.5 0" />
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
                  <feColorMatrix values="0 0 0 0 0.194444 0 0 0 0 0.933333 0 0 0 0 0.933333 0 0 0 0.5 0" />
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
