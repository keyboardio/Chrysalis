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

import Title from "../../component/Title";

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
const LayoutViewSelector = ({ tooltip }) => {
  return (
    // className={`button-config ${value == item.value ? "active" : ""}`}
    <Style className={`toggleButtonsContainer ${style == "flex" ? "toggleButtonsContainerFlex" : ""}`}>
      <Title content={"Edit mode"} headingLevel={6} tooltip={tooltip} />
      <div className="toggleButtonsInner">
        <ButtonConfig onClick={setStandarView} selected={false} icoSVG={item.icon} buttonText={"Standard View"} size={"sm"} />
        <ButtonConfig onClick={setSingleView} selected={true} icoSVG={item.icon} buttonText={"Standard View"} size={"sm"} />
      </div>
    </Style>
  );
};

export default LayoutViewSelector;
