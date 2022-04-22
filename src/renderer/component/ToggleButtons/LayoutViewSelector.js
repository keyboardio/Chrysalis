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
import PropTypes from "prop-types";
import Styled from "styled-components";
import i18n from "../../i18n";

import Title from "../../component/Title";
import { ButtonConfig } from "../Button";

import { IconEditModeStandardView, IconEditModeSingleView } from "../../component/Icon";

const Style = Styled.div`
&.layoutSelector {
  // position: fixed;
  // bottom: 24px;
  // margin-left: 15px;

  margin-left: 15px;
  align-self: self-end;
  margin-top: auto;
  margin-bottom: 24px;
  padding-top: 24px;
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
  margin-left: 4px;
}
.icon-right svg {
  margin-left: 10px;
}
.icon-left svg {
  margin-right: 10px;
}
`;

/**
 * This LayoutViewSelector function returns a component that render a toogle element that help the user select between Standard View/Single View
 * The object will accept the following parameters
 *
 * @param {function} onToogle - The function that handle the states
 * @param {boolean} isStandardView - The actual state if the Standand View is Selected
 * @param {string} tooltip - [Optional] Help text used next to the title
 * @returns {<LayoutViewSelector>} Badge component.
 */

const LayoutViewSelector = ({ onToogle, isStandardView, tooltip, isDisabled }) => {
  return (
    <Style className={`layoutSelector`}>
      <Title text={i18n.editor.editMode.title} headingLevel={5} tooltip={tooltip ? tooltip : false} />
      <div className="toggleButtonsContainer">
        <div className="toggleButtonsInner">
          <ButtonConfig
            onClick={onToogle}
            icoSVG={<IconEditModeStandardView />}
            icoPosition="left"
            selected={isStandardView}
            buttonText={i18n.editor.editMode.standardView}
            size={"sm"}
            disabled={isDisabled}
            tooltip={"Standard view will be available in future releases of Bazecor Beta"}
          />
          <ButtonConfig
            onClick={onToogle}
            icoPosition="left"
            icoSVG={<IconEditModeSingleView />}
            selected={!isStandardView}
            buttonText={i18n.editor.editMode.singleView}
            size={"sm"}
            disabled={isDisabled}
          />
        </div>
      </div>
    </Style>
  );
};

LayoutViewSelector.propTypes = {
  onToogle: PropTypes.func.isRequired,
  isStandardView: PropTypes.bool.isRequired,
  tooltip: PropTypes.string
};

export default LayoutViewSelector;
