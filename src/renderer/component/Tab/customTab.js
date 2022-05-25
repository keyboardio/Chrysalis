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

import Nav from "react-bootstrap/Nav";

import lightNavImage from "../../../../static/base/light-accent--md.png";

const Style = Styled.div`	
.nav-link {
	border-radius: 6px;
	font-size: 14px;
	font-weight: 600;
	padding: 16px 14px;
  color: ${({ theme }) => theme.styles.tab.color};
  position: relative;
  display: flex;
  align-items: center;
  margin-bottom: 2px;
  white-space: nowrap;
  &:before,
  &:after {
    content: "";
    position: absolute;
    right: 0; 
    top: 50%;
    transform: translateY(-50%);
    opacity: 0;
    transition: 250ms opacity ease-in-out;
  }
  &:before {  
    width: 32px;
    height: 68px;
    right: -14px;
    background: url(${lightNavImage});
  }
  &:after {
    width: 3px;
    height: 24px;
    right: -17px;
    background: linear-gradient(180deg, #FE007C 0%, #6B14F9 100%);
    border-radius: 0px 3px 3px 0px;   
  }
  svg {
    margin-right: 12px;
  }
  &:hover {
    color: ${({ theme }) => theme.styles.tab.colorHover};
    background: ${({ theme }) => theme.styles.tab.backgroundHover};
  } 
  &.active {
    color: ${({ theme }) => theme.styles.tab.colorActive};
    background: ${({ theme }) => theme.styles.tab.backgroundActive};
    &:after {
      opacity: 1;
    }
    &:before {
      opacity: ${({ theme }) => theme.styles.tab.lightOpacity};
    }
  }
}
`;
/**
 * This CustomTab function returns a component that render a Boostrap Tab element with custom wrapper.
 * The object will accept the following parameters
 *
 * @param {string} text - The content rendered inside the component
 * @param {string} eventKey - The argument that handles the active content
 * @param {object} icon - [Optional] SVG component
 * @param {string} className - If special styles/customization is necessary
 * @returns {<CustomTab>} CustomTab component.
 */

const CustomTab = ({ text, eventKey, icon, className }) => {
  return (
    <Style className={className}>
      <Nav.Item>
        <Nav.Link eventKey={eventKey}>
          {icon && icon} {text && <span dangerouslySetInnerHTML={{ __html: text }} />}
        </Nav.Link>
      </Nav.Item>
    </Style>
  );
};

CustomTab.defaultProps = {
  text: ""
};

CustomTab.propTypes = {
  text: PropTypes.string,
  icon: PropTypes.object,
  eventKey: PropTypes.string,
  className: PropTypes.string
};

export default CustomTab;
