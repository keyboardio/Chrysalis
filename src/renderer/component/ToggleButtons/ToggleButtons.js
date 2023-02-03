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
import { ButtonConfig } from "../../component/Button";
import Styled from "styled-components";

const Style = Styled.div`
&.toggleButtonsContainer {
  padding: 4px;
  background: ${({ theme }) => theme.styles.toggleButton.background};
  border-radius: 6px;
  .toggleButtonsInner {
    margin-left: -2px;
    margin-right: -2px;
    .button-config {
      margin-left: 2px;
      margin-right: 2px;
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
`;
const ToggleButtons = ({ selectDarkMode, value, listElements, style, size }) => {
  return (
    // className={`button-config ${value == item.value ? "active" : ""}`}
    <Style className={`toggleButtonsContainer ${style == "flex" ? "toggleButtonsContainerFlex" : ""}`}>
      <strong className="sr-only">{value}</strong>
      <div className="toggleButtonsInner">
        {listElements.map((item, index) => (
          <ButtonConfig
            onClick={e => selectDarkMode(item.value)}
            selected={value === item.value ? true : false}
            icoSVG={item.icon}
            icoPosition="left"
            key={index}
            buttonText={item.name}
            size={size}
          />
        ))}
      </div>
    </Style>
  );
};

export default ToggleButtons;
