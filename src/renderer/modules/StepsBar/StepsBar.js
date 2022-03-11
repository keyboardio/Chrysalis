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

const Style = Styled.div` 
width: 100%;
margin-top: 92px;
margin-bottom: 62px;
.stepsElements {
  display: grid;
  grid-auto-flow: column;
}
.step {
  position: relative;
  &.active {  
    .stepIcon {
      color: ${({ theme }) => theme.colors.purple300};
      animation: splashBullet 400ms normal forwards ease-in-out;
      animation-iteration-count: 1;
    }
    .stepBullet {
      box-shadow: 0px 4px 12px #303949;
      border: 3px solid ${({ theme }) => theme.colors.purple200};
      background-color: ${({ theme }) => theme.colors.purple300};
      animation: splashBullet 400ms normal forwards ease-in-out;
      animation-iteration-count: 1;
    }
  }
}
.stepIcon {
  position: absolute;
  left: -3px; 
  top: -42px;
  transition: color 300ms ease-in-out;
  transform: scale(1) translate3d(0,0, 0);
  color: ${({ theme }) => theme.colors.gray300};
}
.stepBullet {
  position: absolute;
  left: 0;
  transform: scale(1) translate3d(0,0, 0);
  transform-origin: center center;
  width: 13px;
  height: 13px;
  border-radius: 50%;
  box-shadow: 0px 4px 12px #303949;
  border: 3px solid ${({ theme }) => theme.colors.gray800};
  background-color: ${({ theme }) => theme.colors.gray600};
  z-index: 2;
  top: -6px;    
  &.active {
    box-shadow: 0px 4px 12px #303949;
    border: 3px solid ${({ theme }) => theme.colors.purple200};
    background-color: ${({ theme }) => theme.colors.purple300};
  }
}
.progressBar {
  width: 100%;
  height: 3px;
  border-radius: 3px;
  background-color: ${({ theme }) => theme.colors.gray600};
  position: relative;
  overflow: hidden;
  .progressBarActive {
    left: 0;
    top: 0;
    width: 50%;
    height: 3px;
    border-radius: 3px;
    background-color: ${({ theme }) => theme.colors.purple300};
    position: absolute;
    transition: width 1s ease-in-out;
  }
}

@keyframes splashBullet {
  0% {
      transform: scale(1) translate3d(0,0, 0);
  }
  25% {
      transform: scale(0.75) translate3d(0,0, 0);
  }
  80% {
    transform: scale(1.2) translate3d(0,0, 0);
  }
  100% {
    transform: scale(1) translate3d(0,0, 0);
  }
}
`;
const StepsBar = ({ steps, stepActive }) => {
  let [stepsPosition, setStepsPosition] = React.useState(parseInt(stepActive));
  let [refreshPositionStyle, setRefreshPositionStyle] = React.useState({
    width: `${(100 / (steps.length - 1)) * stepsPosition}%`
  });
  const constructGrid = {
    gridTemplateColumns: `repeat(${steps.length - 1}, 1fr)`
  };

  const handleClick = event => {
    console.log(event.target);
    if (steps.length > stepsPosition) {
      setStepsPosition(oldValue => oldValue + 1);
      const widthPercentage = {
        width: `${(100 / (steps.length - 1)) * (stepsPosition + 1)}%`
      };
      setRefreshPositionStyle(widthPercentage);
    }
  };

  return (
    <Style>
      <div className="stepsBarWrapper">
        <div className="stepsBarWrapperInner">
          <div className="stepsElements" style={constructGrid}>
            {steps.map((item, index) => (
              <div
                className={`step ${index <= stepsPosition ? "active" : ""}`}
                data-order={index}
                key={`${item.name}-${index}`}
                onClick={handleClick}
              >
                <div className="stepIcon">{item.icon}</div>
                <div className="stepBullet"></div>
              </div>
            ))}
          </div>
          <div className="progressBar">
            <div className="progressBarActive" style={refreshPositionStyle}></div>
          </div>
        </div>
      </div>
      <hr />
      <button className="button primary" onClick={handleClick}>
        Add step
      </button>
    </Style>
  );
};

export default StepsBar;
