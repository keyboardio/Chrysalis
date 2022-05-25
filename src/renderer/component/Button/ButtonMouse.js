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

import { IconArrowsMouseMovement, IconArrowsMouseWheel } from "../Icon";

const Styles = Styled.div`
width: 55px; 
height: 35px;
border-radius: 35px;  
line-height: 34px;
text-align: center;
color: ${({ theme }) => theme.styles.button.buttonMouse.color};
background: ${({ theme }) => theme.styles.button.buttonMouse.backgroundColor};
transition: background 300ms ease-in-out;
&:hover {
  color: ${({ theme }) => theme.styles.button.buttonMouse.colorHover};
  background: ${({ theme }) => theme.styles.button.buttonMouse.backgroundColorHover};
  cursor: pointer;
}
&.active {
  color: ${({ theme }) => theme.styles.button.buttonMouse.colorActive};
  background: ${({ theme }) => theme.styles.button.buttonMouse.backgroundColorActive};
}

&.directionup {
  transform: rotate(-90deg) translate(-17px, 51px);
}
&.directiondown {
  transform: rotate(90deg) translate(33px,-51px);
}
&.directionright {
  transform: translate(93px,26px);
}
&.directionleft {
  transform: rotate(180deg) translate(-8px, 44px);
}
`;

const ButtonMouse = ({ selected, onClick, eventType, direction, disabled }) => {
  return (
    <Styles
      onClick={disabled ? () => {} : onClick}
      className={`${selected ? "active" : ""} buttonMouse direction${direction ? direction : ""} eventType${
        eventType ? eventType : ""
      }`}
      disabled={disabled}
    >
      <div className={"buttonInner"}>{eventType == "wheel" ? <IconArrowsMouseWheel /> : <IconArrowsMouseMovement />}</div>
    </Styles>
  );
};

export default ButtonMouse;
