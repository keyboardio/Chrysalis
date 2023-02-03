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
import { ButtonConfig } from "../Button";
import Styled from "styled-components";

const Style = Styled.div`
&.toggleButtonsContainer {
  padding: 3px;
  background: ${({ theme }) => theme.styles.toggleButton.background};
  border-radius: 6px;
  margin-left: 12px;
  height: 44px;
  display: flex;
  .toggleButtonsInner {
    margin-left: 0;
    margin-right: 0;
    .button-config {
      margin-left: 0;
      margin-right: 0;
      width: 92px;
      font-size: 13px;
      padding: 8px 16px 12px 8px; 
    }
    .button-config + .button-config {
      margin-left: 3px;
    }
  } 
}
&.toggleButtonsContainerFlex {
  .toggleButtonsInner {
    display: flex;
    flex-wrap: nowrap;
    .button-config {
      flex: auto;
      text-align: center;
    }
  }
}

.button-config {
  margin-left: 2px;
  margin-right: 2px;
  flex: auto;
  padding: 10px 12px;
  border-radius: 4px;
  font-size: 13px;
  color: ${({ theme }) => theme.styles.toogleEditMode.buttonColor};
  background: ${({ theme }) => theme.styles.toogleEditMode.buttonBackground};
  box-shadow: ${({ theme }) => theme.styles.toogleEditMode.buttonBoxShadow};
  &:hover {
    background: ${({ theme }) => theme.styles.toogleEditMode.buttonBackgroundHover};
    color: ${({ theme }) => theme.styles.toogleEditMode.buttonColorHover};
    box-shadow: ${({ theme }) => theme.styles.toogleEditMode.buttonBoxShadow};
  } 
  &.active {
    background: ${({ theme }) => theme.styles.toogleEditMode.buttonBackgroundActive};
    color: ${({ theme }) => theme.styles.toogleEditMode.buttonColorActive};
    box-shadow: ${({ theme }) => theme.styles.toogleEditMode.buttonBoxShadow};
  }
}
@media screen and (max-width: 1259px) {
  &.toggleButtonsContainer .toggleButtonsInner .button-config {
    width: 42px;
    svg {
      margin-right: 0;
    }
    .buttonLabel {
      display: none;
    }
  }
}
`;
const KeyboardViewSelector = ({ editModeFunc, value, listElements, style, size }) => {
  return (
    // className={`button-config ${value == item.value ? "active" : ""}`}
    <Style className={`toggleButtonsContainer ${style == "flex" ? "toggleButtonsContainerFlex" : ""}`}>
      <strong className="sr-only">{value}</strong>
      <div className="toggleButtonsInner">
        {listElements.map((item, index) => (
          <ButtonConfig
            onClick={e => editModeFunc(item.value)}
            selected={value === item.value ? true : false}
            icoPosition="left"
            icoSVG={item.icon}
            key={index}
            buttonText={item.name}
            size={size}
            tooltip={item.tooltip}
            tooltipPlacement={"bottom"}
            tooltipDelay={300}
            tooltipClassName="tooltipRegular tooltipKeyboardViewSelector"
          />
        ))}
      </div>
    </Style>
  );
};

export default KeyboardViewSelector;
