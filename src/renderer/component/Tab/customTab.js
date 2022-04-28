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

const Style = Styled.div`	
.badge {
	border-radius: 3px;
	font-size: 13px;
	font-weight: 600;
	padding: 8px 12px;
	border: 1px solid ${({ theme }) => theme.colors.gray500};
  &.success {
    color: ${({ theme }) => theme.colors.brandSuccess};
    border: 1px solid ${({ theme }) => theme.colors.brandSuccess};
  }
}
`;
/**
 * This CustomTab function returns a component that render a Boostrap Tab element with custom wrapper.
 * The object will accept the following parameters
 *
 * @param {string} text - The content rendered inside the component
 * @param {string} eventKey - The argument that handles the active content
 * @param {string} icon - [Optional] SVG component
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
  icon: PropTypes.string,
  eventKey: PropTypes.string,
  className: PropTypes.string
};

export default CustomTab;
