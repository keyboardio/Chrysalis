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
import Dropdown from "react-bootstrap/Dropdown";

const Style = Styled.div`
.custom-dropdown {
  .dropdwonIcon {
    max-width: 24px;
  }
  .dropdownItem {
    padding-left: 12px;
    flex: 0 0 calc(100% - 24px);
    text-align: left;
    text-transform: capitalize;
  }
  .dropdownItemSelected {
    color: ${({ theme }) => theme.styles.dropdown.textButtonColor};
    &:hover {
      color: ${({ theme }) => theme.styles.dropdown.textButtonHover};
    }
  }
}
`;
const Select = ({ onSelect, value, listElements, listIconsElements }) => {
  return (
    <Style>
      <Dropdown
        onSelect={onSelect}
        value={value}
        listElements={listElements}
        listIconsElements={listIconsElements}
        className="custom-dropdown"
      >
        <Dropdown.Toggle id="dropdown-custom">
          <div className="dropdownItemSelected">
            {listIconsElements && listIconsElements.length > 0 ? (
              <div className="dropdownIcon">
                <img
                  src={listIconsElements[listElements.flatMap((item, i) => (item === value ? i : []))]}
                  className="dropdwonIcon"
                />
              </div>
            ) : (
              ""
            )}
            <div className="dropdownItem">{value}</div>
          </div>
        </Dropdown.Toggle>
        <Dropdown.Menu className="super-colors">
          {/* index,displayName,userName,path */}
          {listElements.map((item, index) => (
            <Dropdown.Item eventKey={item} key={index} className={`${value == item ? "active" : ""}`}>
              <div className="dropdownInner">
                {listIconsElements && listIconsElements.length > 0 ? (
                  <div className="dropdownIcon">
                    <img src={listIconsElements[index]} alt={item} className="dropdwonIcon" />
                  </div>
                ) : (
                  ""
                )}
                <div className="dropdownItem">{item}</div>
              </div>
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>
    </Style>
  );
};

export default Select;
