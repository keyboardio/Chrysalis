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

const Style = Styled.div`   
.lineColor {
  stroke: ${({ theme }) => theme.styles.firmwareUpdateProcess.neuronLineColor};
}
.neuronBase {
  path {
    fill: ${({ theme }) => theme.styles.firmwareUpdateProcess.neuronSleepingMode};
  }
}
.neuronBlinking {
    opacity: 0;
    color: #5C61E7;
}   
.neuronSuccess {
    opacity: 0;
    transition: 300ms opacity ease-in-out;
    path {
      fill: ${({ theme }) => theme.styles.neuronStatus.connectionSuccessFill};
      stroke-opacity: ${({ theme }) => theme.styles.neuronStatus.connectionStrokeOpacity};
    }
} 
.neuronUpdate-2 {
    .neuronBlinking {
        animation-name: neuronBlink;
        animation-duration: 4.5s; 
        animation-fill-mode: forwards;
    }
}       
.neuronUpdate-3 {
    .neuronBlinking {
        opacity: 1;
    }
}
.neuronUpdate-4 {
    .neuronSuccess {
        opacity: 1;
    }  
}
@keyframes neuronBlink {
    0% {
        opacity: 0;
    }
    2% {
        opacity: 1;
    }
    4% {
        opacity: 1;
    }
    6% {
        opacity: 0;
    }
    7% {
      color: ${({ theme }) => theme.colors.brandPrimary};
    }
    8% {
        opacity: 1;  
    }
    10% {
      opacity: 0;  
      color: #5D5FEF; 
    }
    11% {
      opacity: 0;  
    }
    12% {
        opacity: 1;
    }
    13% {
        opacity: 0; 
    }
    14% {
      opacity: 1; 
    }
    15% {
        opacity: 0;
    }
    16% {
        opacity: 1;
    }
    18% {
        opacity: 1;
    }
    20% {
        opacity: 1;
    }
    22% {
        opacity: 0;
    }
    24% {
        opacity: 0;
    }
    26% {
        opacity: 1;
    }
    38% {
        opacity: 0;
    }
    40% {
        opacity: 1;
    }
    42% {
        opacity: 0;
    }
    44% {
        opacity: 1;
    }
    46% {
        opacity: 0;
    }
    48% {
        opacity: 1;
    }
    50% {
        opacity: 0;
    }
    52% {
        opacity: 1;
    }
    54% {
        opacity: 0;
    }
    56% {
        opacity: 1;
    }
    58% {
        opacity: 0;
    }   
    59% {
      opacity: 1;
    }     
    60% {
      opacity: 0;
    }
    61% {
      opacity: 1;
    }
    62% {
      opacity: 0;
    }
    63% {
      opacity: 1;
    }
    64% {
        opacity: 0;
    }
    65% {
      opacity: 1;
    }
    66% {
        opacity: 0;
    }
    67% {
        opacity: 1;
    }
    68% {
        opacity: 0;
    }
    69% {
        opacity: 1;
    }
    70% {
      opacity: 0;
    }
    71% {
      opacity: 1;
    }
    72% {
      opacity: 0;
    }
    73% {
      opacity: 1;
    }
    74% {
        opacity: 0;
    }
    75% {
      opacity: 1;
    }
    76% {
        opacity: 0;
    }
    77% {
        opacity: 1;
    }
    78% {
        opacity: 0;
    }
    79% {
        opacity: 1;
    }
    80% {
      opacity: 0;
    }
    81% {
      opacity: 1;
    }
    82% {
      opacity: 0;
    }
    83% {
      opacity: 1;
    }
    84% {
        opacity: 0;
    }
    85% {
      opacity: 1;
    }
    86% {
        opacity: 0;
    }
    87% {
        opacity: 1;
    }
    88% {
        opacity: 0;
    }
    98% {
        opacity: 0;
    }       
    100% {
        opacity: 1;
    }
  }

  
`;

const FirmwareNeuronHelp = ({ countdown }) => {
  let connectionColorMatrix = useTheme().styles.neuronStatus.connectionColorMatrix;
  return (
    <Style>
      <div className={`neuronUpdate-${countdown} neuronUpdateAnimation`}>
        <svg width={102} height={116} fill="none" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
          <path
            clipRule="evenodd"
            d="M44.167 112.847c-.683 1.64-2.596 2.46-4.236 1.708-.068 0-.068-.068-.136-.068L6.657 98.772C1.738 96.45-.38 90.573 1.943 85.586L22.03 42.405c1.913-4.1 2.87-8.54 2.87-13.05V8.175A7.173 7.173 0 0132.074 1h37.852A7.173 7.173 0 0177.1 8.174v21.18c0 4.51.957 8.951 2.87 13.05l20.087 43.182c2.323 4.919.205 10.795-4.714 13.186l-33.138 15.715c-1.64.751-3.553.068-4.304-1.572 0-.068-.069-.068-.069-.136-1.571-3.758-5.875-5.534-9.633-3.963-1.913.82-3.28 2.255-4.032 4.031z"
            stroke="currentColor"
            strokeWidth={1.5}
            strokeMiterlimit={1.5}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lineColor"
          />
          <g className="neuronBase">
            <path
              d="M62.098 41.844H60.27c-2.537.1-4.972.598-7.306 1.295l7.712 2.79 1.827.697 1.623.598-2.74 11.758a52.259 52.259 0 01-5.58 14.647l4.972-5.58 1.725-1.893.203-.199 2.638-2.89c.406-.398.71-.896.812-1.494l.913-2.99 4.567-14.846c-2.943-1.196-6.19-1.794-9.54-1.893z"
              fill="#3F425A"
            />
            <path
              d="M36.526 54c.406.398.71.797 1.116 1.195a29.648 29.648 0 002.537 2.491l-1.015-4.583-.405-1.993-.914-3.786 13.193-4.783a28.041 28.041 0 019.234-1.594H62.099c.71 0 1.522.1 2.232.199l-2.334-.797-1.928-.698-4.364-1.495-3.348-1.195a4.298 4.298 0 00-2.74 0l-3.755 1.295-11.873 4.185-3.653 1.196a32.545 32.545 0 006.19 10.362z"
              fill="#3F425A"
            />
            <path
              d="M55.298 65.16l-2.13 1.694-2.233 1.793-10.047-8.17c-1.42-1.196-2.841-2.491-4.059-3.886-.406-.399-.71-.797-1.116-1.296-1.32-1.594-2.435-3.288-3.45-5.181l2.13 6.875.204.797.71 2.292.406 1.395c.203.498.406 1.096.812 1.495.406.398.913.996 1.522 1.694.406.498.913.996 1.42 1.594 4.364 4.882 11.366 12.754 11.57 12.854 3.754-5.082 6.494-10.861 8.117-17.139l-3.856 3.189z"
              fill="#3F425A"
            />
          </g>
          <g className="neuronBlinking">
            <g filter="url(#prefix__filter0_d_2147_218552)">
              <path
                d="M62.098 41.844H60.27c-2.537.1-4.972.598-7.306 1.295l7.712 2.79 1.827.697 1.623.598-2.74 11.758a52.259 52.259 0 01-5.58 14.647l4.972-5.58 1.725-1.893.203-.199 2.638-2.89c.406-.398.71-.896.812-1.494l.913-2.99 4.567-14.846c-2.943-1.196-6.19-1.794-9.54-1.893z"
                fill="currentColor"
              />
            </g>
            <g filter="url(#prefix__filter1_d_2147_218552)">
              <path
                d="M36.526 54c.406.398.71.797 1.116 1.195a29.648 29.648 0 002.537 2.491l-1.015-4.583-.405-1.993-.914-3.786 13.193-4.783a28.041 28.041 0 019.234-1.594H62.099c.71 0 1.522.1 2.232.199l-2.334-.797-1.928-.698-4.364-1.495-3.348-1.195a4.298 4.298 0 00-2.74 0l-3.755 1.295-11.873 4.185-3.653 1.196a32.545 32.545 0 006.19 10.362z"
                fill="currentColor"
              />
            </g>
            <g filter="url(#prefix__filter2_d_2147_218552)">
              <path
                d="M55.298 65.16l-2.13 1.694-2.233 1.793-10.047-8.17c-1.42-1.196-2.841-2.491-4.059-3.886-.406-.399-.71-.797-1.116-1.296-1.32-1.594-2.435-3.288-3.45-5.181l2.13 6.875.204.797.71 2.292.406 1.395c.203.498.406 1.096.812 1.495.406.398.913.996 1.522 1.694.406.498.913.996 1.42 1.594 4.364 4.882 11.366 12.754 11.57 12.854 3.754-5.082 6.494-10.861 8.117-17.139l-3.856 3.189z"
                fill="currentColor"
              />
            </g>
          </g>
          <g className="neuronSuccess">
            <g filter="url(#prefix__filter0_d_1082_162210)">
              <path
                d="M62.098 41.844H60.27c-2.537.1-4.972.598-7.306 1.295l7.712 2.79 1.827.697 1.623.598-2.74 11.758a52.259 52.259 0 01-5.58 14.647l4.972-5.58 1.725-1.893.203-.199 2.638-2.89c.406-.398.71-.896.812-1.494l.913-2.99 4.567-14.846c-2.943-1.196-6.19-1.794-9.54-1.893z"
                fill="#00CEC9"
              />
              <path
                d="M59.768 67.68a52.869 52.869 0 002.595-8.48l2.738-11.749.2-.86-.828-.305-1.618-.596-1.821-.695-.008-.003-.009-.003-4.628-1.675a25.532 25.532 0 013.902-.47H62.083c2.92.088 5.74.566 8.323 1.493l-4.291 13.952-.001.002-.913 2.99-.02.061-.01.063c-.06.352-.24.668-.527.949l-.019.019-.018.02-2.62 2.87-.184.18-.02.02-.018.02-1.726 1.893h0l-.007.008-.264.297z"
                stroke="#3F425A"
                strokeOpacity={0.15}
                strokeWidth={2}
              />
            </g>
            <g filter="url(#prefix__filter1_d_1082_162210)">
              <path
                d="M36.526 54c.406.398.71.797 1.116 1.195a29.662 29.662 0 002.537 2.491l-1.015-4.583-.405-1.993-.914-3.786 13.193-4.783a28.041 28.041 0 019.234-1.594H62.099c.71 0 1.522.1 2.232.199l-2.334-.797-1.928-.698-4.364-1.494-3.348-1.196a4.298 4.298 0 00-2.74 0l-3.755 1.295-11.873 4.185-3.653 1.196A32.546 32.546 0 0036.526 54z"
                fill="#00CEC9"
              />
              <path
                d="M31.647 44.26l2.653-.868.01-.004.012-.004 11.87-4.184h.002l3.741-1.291a3.297 3.297 0 012.099-.002l3.335 1.191h0l.012.005 2.714.93a29.327 29.327 0 00-7.389 1.564h0l-.01.004-13.191 4.782-.842.305.21.87.91 3.77.402 1.974.001.009.002.008.29 1.309a32.434 32.434 0 01-.094-.104l-.02-.022-.021-.02a11.05 11.05 0 01-.512-.55l-.008-.009a13.148 13.148 0 00-.57-.61 31.618 31.618 0 01-5.606-9.053z"
                stroke="#3F425A"
                strokeOpacity={0.15}
                strokeWidth={2}
              />
            </g>
            <g filter="url(#prefix__filter2_d_1082_162210)">
              <path
                d="M55.298 65.16l-2.13 1.694-2.233 1.793-10.047-8.17c-1.42-1.196-2.841-2.491-4.059-3.886-.406-.399-.71-.797-1.116-1.296-1.32-1.594-2.435-3.288-3.45-5.181l2.13 6.875.204.797.71 2.292.406 1.395c.203.498.406 1.096.812 1.495.406.398.913.996 1.522 1.694.406.498.913.996 1.42 1.594 4.364 4.882 11.366 12.754 11.57 12.854 3.754-5.082 6.494-10.861 8.117-17.139l-3.856 3.189z"
                fill="#00CEC9"
              />
              <path
                d="M55.92 65.943l.008-.006.008-.007 1.343-1.11a48.38 48.38 0 01-6.35 12.727l-.433-.474c-.75-.825-1.779-1.969-2.94-3.264-1.496-1.67-3.21-3.59-4.823-5.397l-2.511-2.813c-.252-.296-.503-.568-.728-.813l-.04-.042a16.048 16.048 0 01-.632-.714l-.01-.013-.012-.013-.293-.337c-.475-.547-.914-1.052-1.282-1.413-.195-.192-.312-.48-.51-.97a64.91 64.91 0 00-.056-.14l-.392-1.345-.002-.009-.003-.008-.703-2.267-.196-.773-.007-.024-.007-.025-.13-.418c.274.34.55.674.881 1.002 1.26 1.439 2.716 2.762 4.144 3.965l.007.005.006.005 10.047 8.171.627.51.63-.506 2.228-1.79.005-.004 2.127-1.69z"
                stroke="#3F425A"
                strokeOpacity={0.15}
                strokeWidth={2}
              />
            </g>
          </g>
          <defs>
            <filter
              id="prefix__filter0_d_2147_218552"
              x={40.965}
              y={33.844}
              width={42.672}
              height={55.786}
              filterUnits="userSpaceOnUse"
              colorInterpolationFilters="sRGB"
            >
              <feFlood floodOpacity={0} result="BackgroundImageFix" />
              <feColorMatrix in="SourceAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
              <feOffset dy={4} />
              <feGaussianBlur stdDeviation={6} />
              <feComposite in2="hardAlpha" operator="out" />
              <feColorMatrix values="0 0 0 0 0.364706 0 0 0 0 0.372549 0 0 0 0 0.937255 0 0 0 0.5 0" />
              <feBlend in2="BackgroundImageFix" result="effect1_dropShadow_2147_218552" />
              <feBlend in="SourceGraphic" in2="effect1_dropShadow_2147_218552" result="shape" />
            </filter>
            <filter
              id="prefix__filter1_d_2147_218552"
              x={18.336}
              y={28.737}
              width={57.995}
              height={44.95}
              filterUnits="userSpaceOnUse"
              colorInterpolationFilters="sRGB"
            >
              <feFlood floodOpacity={0} result="BackgroundImageFix" />
              <feColorMatrix in="SourceAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
              <feOffset dy={4} />
              <feGaussianBlur stdDeviation={6} />
              <feComposite in2="hardAlpha" operator="out" />
              <feColorMatrix values="0 0 0 0 0.364706 0 0 0 0 0.372549 0 0 0 0 0.937255 0 0 0 0.5 0" />
              <feBlend in2="BackgroundImageFix" result="effect1_dropShadow_2147_218552" />
              <feBlend in="SourceGraphic" in2="effect1_dropShadow_2147_218552" result="shape" />
            </filter>
            <filter
              id="prefix__filter2_d_2147_218552"
              x={20.263}
              y={42.114}
              width={50.892}
              height={52.996}
              filterUnits="userSpaceOnUse"
              colorInterpolationFilters="sRGB"
            >
              <feFlood floodOpacity={0} result="BackgroundImageFix" />
              <feColorMatrix in="SourceAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
              <feOffset dy={4} />
              <feGaussianBlur stdDeviation={6} />
              <feComposite in2="hardAlpha" operator="out" />
              <feColorMatrix values="0 0 0 0 0.364706 0 0 0 0 0.372549 0 0 0 0 0.937255 0 0 0 0.5 0" />
              <feBlend in2="BackgroundImageFix" result="effect1_dropShadow_2147_218552" />
              <feBlend in="SourceGraphic" in2="effect1_dropShadow_2147_218552" result="shape" />
            </filter>
          </defs>

          <defs>
            <filter
              id="prefix__filter0_d_1082_162210"
              x={40.965}
              y={33.844}
              width={42.672}
              height={55.786}
              filterUnits="userSpaceOnUse"
              colorInterpolationFilters="sRGB"
            >
              <feFlood floodOpacity={0} result="BackgroundImageFix" />
              <feColorMatrix in="SourceAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
              <feOffset dy={4} />
              <feGaussianBlur stdDeviation={6} />
              <feComposite in2="hardAlpha" operator="out" />
              <feColorMatrix values={connectionColorMatrix} />
              <feBlend in2="BackgroundImageFix" result="effect1_dropShadow_1082_162210" />
              <feBlend in="SourceGraphic" in2="effect1_dropShadow_1082_162210" result="shape" />
            </filter>
            <filter
              id="prefix__filter1_d_1082_162210"
              x={18.336}
              y={28.737}
              width={57.995}
              height={44.95}
              filterUnits="userSpaceOnUse"
              colorInterpolationFilters="sRGB"
            >
              <feFlood floodOpacity={0} result="BackgroundImageFix" />
              <feColorMatrix in="SourceAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
              <feOffset dy={4} />
              <feGaussianBlur stdDeviation={6} />
              <feComposite in2="hardAlpha" operator="out" />
              <feColorMatrix values={connectionColorMatrix} />
              <feBlend in2="BackgroundImageFix" result="effect1_dropShadow_1082_162210" />
              <feBlend in="SourceGraphic" in2="effect1_dropShadow_1082_162210" result="shape" />
            </filter>
            <filter
              id="prefix__filter2_d_1082_162210"
              x={20.263}
              y={42.114}
              width={50.892}
              height={52.996}
              filterUnits="userSpaceOnUse"
              colorInterpolationFilters="sRGB"
            >
              <feFlood floodOpacity={0} result="BackgroundImageFix" />
              <feColorMatrix in="SourceAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
              <feOffset dy={4} />
              <feGaussianBlur stdDeviation={6} />
              <feComposite in2="hardAlpha" operator="out" />
              <feColorMatrix values={connectionColorMatrix} />
              <feBlend in2="BackgroundImageFix" result="effect1_dropShadow_1082_162210" />
              <feBlend in="SourceGraphic" in2="effect1_dropShadow_1082_162210" result="shape" />
            </filter>
          </defs>
        </svg>
      </div>
    </Style>
  );
};

export default FirmwareNeuronHelp;
