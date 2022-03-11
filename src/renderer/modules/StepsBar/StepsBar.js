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
}
.stepIcon {
  position: absolute;
  left: 0; 
  top: -42px;
  transform: translate3d(-50%,0, 0);
}
.stepBullet {
  position: absolute;
  left: 0;
  transform: translate3d(-50%,0, 0);
  width: 14px;
  height: 14px;
  border-radius: 50%;
  box-shadow: 0px 4px 12px #303949;
  border: 3px solid ${({ theme }) => theme.colors.gray800};
  background-color: ${({ theme }) => theme.colors.gray600};
  z-index: 2;
  top: -5px;
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
  background-color: ${({ theme }) => theme.colors.gray400};
  position: relative;
  .progressBarActive {
    left: 0;
    top: 0;
    width: 50%;
    height: 3px;
    border-radius: 3px;
    background-color: ${({ theme }) => theme.colors.purple300};
    position: absolute;
    transition: width 250ms ease-in-out;
  }
}

`;
const StepsBar = ({ steps }) => {
  const constructGrid = {
    gridTemplateColumns: `repeat(${steps.length - 1}, 1fr)`,
    background: "red"
  };
  return (
    <Style>
      <div className="stepsBarWrapper">
        <div className="stepsBarWrapperInner">
          <div className="stepsElements" style={constructGrid}>
            {steps.map((item, index) => (
              <div className="step" data-order={index + 1} key={`${item.name}-${index}`}>
                <div className="stepIcon">{item.icon}</div>
                <div className="stepBullet"></div>
              </div>
            ))}
          </div>
          <div className="progressBar">
            <div className="progressBarActive"></div>
          </div>
        </div>
      </div>
    </Style>
  );
};

export default StepsBar;
