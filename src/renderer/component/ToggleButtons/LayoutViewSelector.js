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
import i18n from "../../i18n";

import Title from "../../component/Title";

import { IconEditModeStandardView, IconEditModeSingleView } from "../../component/Icon";

const Style = Styled.div`
&.layoutSelector {
  position: fixed;
  bottom: 24px;
}
.toggleButtonsContainer {
  padding: 4px;
  background: ${({ theme }) => theme.styles.toogleEditMode.containerBackground};
  border: ${({ theme }) => theme.styles.toogleEditMode.containerBorder};
  border-radius: 6px;
  .toggleButtonsInner {
    margin-left: -2px;
    margin-right: -2px;
    display: flex;
    flex-wrap: nowrap;
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
h5 {
  font-size: 11px;
  letter-spacing: 0.05em;
  color: ${({ theme }) => theme.styles.toogleEditMode.titleColor};
}
`;

const LayoutViewSelector = ({ onToogleStandardView, onToogleSingleView, isStandardView, tooltip }) => {
  return (
    // className={`button-config ${value == item.value ? "active" : ""}`}
    //icoSVG={item.icon}
    <Style className={`layoutSelector`}>
      <Title text={i18n.editor.editMode.title} headingLevel={5} tooltip={tooltip} />
      <div className="toggleButtonsContainer">
        <div className="toggleButtonsInner">
          <ButtonConfig
            onClick={onToogleStandardView}
            icoSVG={<IconEditModeStandardView />}
            selected={isStandardView}
            buttonText={i18n.editor.editMode.standardView}
            size={"sm"}
          />
          <ButtonConfig
            onClick={onToogleSingleView}
            icoSVG={<IconEditModeSingleView />}
            selected={!isStandardView}
            buttonText={i18n.editor.editMode.singleView}
            size={"sm"}
          />
        </div>
      </div>
    </Style>
  );
};

export default LayoutViewSelector;
