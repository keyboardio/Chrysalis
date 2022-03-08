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
import Styled from "styled-components";
import { useTheme } from "styled-components";
import i18n from "../../i18n";

const Style = Styled.div`
align-self: center;
justify-content: center;
.versionsStatus {
    .fillNeuron {
        fill: ${({ theme }) => theme.styles.firmwareUpdatePanel.neuronStatusLineWarning}; 
    }
    &.isUpdated {
        .fillNeuron {
            fill: ${({ theme }) => theme.styles.firmwareUpdatePanel.neuronStatusLineSuccess}; 
        }
    }
}
.lineColor {
    stroke: ${({ theme }) => theme.styles.firmwareUpdatePanel.neuronStatusLineColor}; 
}

`;
const FirmwareNeuronStatus = ({ isUpdated }) => {
  let connectionColorMatrixSucess = useTheme().styles.firmwareUpdatePanel.neuronLightMatrixSuccess;
  let connectionColorMatrixWarning = useTheme().styles.firmwareUpdatePanel.neuronLightMatrixWarning;

  return (
    <Style>
      <div className={`versionsStatus ${isUpdated && "isUpdated"}`}>
        <div className="versionStatusInner">
          <div className="versionNeuron">
            <svg width={99} height={112} fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                clipRule="evenodd"
                d="M42.7 109.044c-.66 1.584-2.508 2.376-4.092 1.65-.066 0-.066-.066-.132-.066l-32.01-15.18c-4.753-2.244-6.8-7.92-4.555-12.738l19.404-41.713c1.848-3.96 2.772-8.25 2.772-12.606V7.93A6.93 6.93 0 0131.017 1h36.565a6.93 6.93 0 016.93 6.93v20.46c0 4.357.924 8.647 2.772 12.607L96.69 82.71c2.244 4.752.198 10.428-4.554 12.738l-32.01 15.18c-1.585.726-3.433.066-4.159-1.518 0-.066-.066-.066-.066-.132-1.518-3.63-5.676-5.346-9.306-3.828-1.848.792-3.168 2.178-3.894 3.894z"
                stroke="#57617E"
                strokeWidth={2}
                strokeMiterlimit={1.5}
                strokeLinecap="round"
                strokeLinejoin="round"
                className={`lineColor ${isUpdated && "isUpdated"}`}
              />
              <g filter="url(#prefix__filter0_d_1082_146499)">
                <path
                  d="M60.02 40.455h-1.764c-2.45.096-4.803.577-7.058 1.251l7.45 2.695 1.765.674 1.568.578-2.647 11.357a50.484 50.484 0 01-5.391 14.15l4.803-5.39 1.667-1.83.196-.192 2.549-2.791c.392-.385.686-.867.784-1.444l.882-2.888 4.411-14.341c-2.843-1.155-5.98-1.733-9.214-1.83z"
                  fill="#FECA57"
                  className="fillNeuron"
                />
                <path
                  d="M59.005 43.467l-.008-.003-.008-.003-4.356-1.576a24.548 24.548 0 013.643-.43H60.006c2.807.085 5.516.543 7.998 1.43L63.868 56.33v.002l-.883 2.888-.018.061-.011.064c-.056.331-.227.63-.499.897l-.02.02-.018.02-2.53 2.77-.177.174-.02.02-.018.02-1.667 1.829h0l-.007.008-.127.143a51.084 51.084 0 002.437-8.018l2.645-11.35.2-.86-.828-.305-1.563-.575-1.759-.672z"
                  stroke="#3F425A"
                  strokeOpacity={0.15}
                  strokeWidth={2}
                />
              </g>
              <g filter="url(#prefix__filter1_d_1082_146499)">
                <path
                  d="M35.319 52.197c.392.385.686.77 1.078 1.155a28.649 28.649 0 002.45 2.407l-.98-4.428-.392-1.925-.882-3.658 12.743-4.62a27.086 27.086 0 018.921-1.54h1.765c.686 0 1.47.096 2.156.193l-2.255-.77-1.862-.674-4.215-1.444-3.235-1.155a4.151 4.151 0 00-2.647 0l-3.627 1.251-11.47 4.043-3.528 1.155a31.437 31.437 0 005.98 10.01z"
                  fill="#FECA57"
                  className="fillNeuron"
                />
                <path
                  d="M30.65 42.81l2.529-.828.01-.003.011-.004 11.466-4.042h.004l3.612-1.247a3.15 3.15 0 012.006-.002l3.222 1.15h0l.012.005 2.467.845a28.378 28.378 0 00-6.983 1.5h0l-.01.004-12.744 4.62-.841.305.21.87.878 3.64.388 1.908.002.008.002.008.252 1.14-.005-.006-.02-.022-.02-.02a10.66 10.66 0 01-.494-.53l-.008-.008a12.76 12.76 0 00-.55-.591 30.506 30.506 0 01-5.395-8.7z"
                  stroke="#3F425A"
                  strokeOpacity={0.15}
                  strokeWidth={2}
                />
              </g>
              <g filter="url(#prefix__filter2_d_1082_146499)">
                <path
                  d="M53.453 62.978l-2.06 1.636-2.156 1.733-9.705-7.893c-1.372-1.155-2.744-2.406-3.92-3.754-.393-.385-.687-.77-1.079-1.251-1.274-1.54-2.352-3.176-3.333-5.005l2.059 6.641.196.77.686 2.214.392 1.348c.196.48.392 1.058.784 1.444.392.385.883.962 1.47 1.636.393.481.883.962 1.373 1.54 4.215 4.716 10.98 12.32 11.175 12.416 3.627-4.908 6.274-10.491 7.843-16.555l-3.725 3.08z"
                  fill="#FECA57"
                  className="fillNeuron"
                />
                <path
                  d="M54.075 63.76l.007-.005.008-.006 1.207-.998a46.692 46.692 0 01-6.069 12.139l-.389-.427A634.302 634.302 0 0146 71.31c-1.446-1.614-3.1-3.468-4.659-5.213l-2.426-2.717c-.244-.287-.486-.55-.703-.786l-.038-.04a15.493 15.493 0 01-.61-.689l-.01-.013-.012-.013-.283-.325c-.459-.528-.884-1.018-1.24-1.367-.184-.18-.294-.453-.486-.928l-.053-.131-.378-1.298-.002-.009-.003-.008-.678-2.19-.19-.744-.007-.025-.007-.025-.073-.235c.23.28.466.558.742.832 1.219 1.392 2.625 2.671 4.006 3.833l.006.006.007.005 9.704 7.893.627.51.63-.507 2.153-1.729.004-.003 2.055-1.633z"
                  stroke="#3F425A"
                  strokeOpacity={0.15}
                  strokeWidth={2}
                />
              </g>
              <defs>
                <filter
                  id="prefix__filter0_d_1082_146499"
                  x={39.198}
                  y={32.455}
                  width={42.037}
                  height={54.705}
                  filterUnits="userSpaceOnUse"
                  colorInterpolationFilters="sRGB"
                >
                  <feFlood floodOpacity={0} result="BackgroundImageFix" />
                  <feColorMatrix in="SourceAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                  <feOffset dy={4} />
                  <feGaussianBlur stdDeviation={6} />
                  <feComposite in2="hardAlpha" operator="out" />
                  <feColorMatrix values={`${isUpdated ? connectionColorMatrixSucess : connectionColorMatrixWarning}`} />
                  <feBlend in2="BackgroundImageFix" result="effect1_dropShadow_1082_146499" />
                  <feBlend in="SourceGraphic" in2="effect1_dropShadow_1082_146499" result="shape" />
                </filter>
                <filter
                  id="prefix__filter1_d_1082_146499"
                  x={17.339}
                  y={27.521}
                  width={56.839}
                  height={44.237}
                  filterUnits="userSpaceOnUse"
                  colorInterpolationFilters="sRGB"
                >
                  <feFlood floodOpacity={0} result="BackgroundImageFix" />
                  <feColorMatrix in="SourceAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                  <feOffset dy={4} />
                  <feGaussianBlur stdDeviation={6} />
                  <feComposite in2="hardAlpha" operator="out" />
                  <feColorMatrix values={`${isUpdated ? connectionColorMatrixSucess : connectionColorMatrixWarning}`} />
                  <feBlend in2="BackgroundImageFix" result="effect1_dropShadow_1082_146499" />
                  <feBlend in="SourceGraphic" in2="effect1_dropShadow_1082_146499" result="shape" />
                </filter>
                <filter
                  id="prefix__filter2_d_1082_146499"
                  x={19.2}
                  y={40.444}
                  width={49.977}
                  height={52.01}
                  filterUnits="userSpaceOnUse"
                  colorInterpolationFilters="sRGB"
                >
                  <feFlood floodOpacity={0} result="BackgroundImageFix" />
                  <feColorMatrix in="SourceAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                  <feOffset dy={4} />
                  <feGaussianBlur stdDeviation={6} />
                  <feComposite in2="hardAlpha" operator="out" />
                  <feColorMatrix values={`${isUpdated ? connectionColorMatrixSucess : connectionColorMatrixWarning}`} />
                  <feBlend in2="BackgroundImageFix" result="effect1_dropShadow_1082_146499" />
                  <feBlend in="SourceGraphic" in2="effect1_dropShadow_1082_146499" result="shape" />
                </filter>
              </defs>
            </svg>
          </div>
          <div className="versionNeuronText">
            {isUpdated ? i18n.firmwareUpdate.texts.neuronUpdatedText : i18n.firmwareUpdate.texts.neuronOutdatedText}
          </div>
        </div>
      </div>
    </Style>
  );
};

export default FirmwareNeuronStatus;
