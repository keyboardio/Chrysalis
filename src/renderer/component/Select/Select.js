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
    padding-left: 0;
    flex: 0 0 100%;
    text-align: left;
    text-transform: capitalize;
  }
  .dropdownItemSelected {
    color: ${({ theme }) => theme.styles.dropdown.textButtonColor};
    &:hover {
      color: ${({ theme }) => theme.styles.dropdown.textButtonHover};
    }
  }
  .dropdownIcon + .dropdownItem {
    padding-left: 12px;
    flex: 0 0 calc(100% - 24px);
  }
}
.disabled {
  pointer-events: none;
  opacity: 35%;
}
`;
/**
 * @typedef listElements
 * @type {Object[]}
 * @property {string} listElements[].text - The text to be shown in the selector.
 * @property {*} listElements[].value - The value to be passed when selected.
 * @property {string} listElements[].icon - The icon to be displayed when passed.
 * @property {number} listElements[].index - The index of the element that generates the entity.
 */

/**
 * This select function returns a styled react-bootstrap Dropdown object
 * The object will accept the following parameters
 *
 * @param {function} onSelect - The function that act when a Dropdown.item is clicked.
 * @param {*} value - The current value selected on the Dropdown.
 * @param {listElements} listElements - The array of objects that hold the elements to be selected.\
 * @returns {<Select>} Dropdown object.
 */
const Select = ({ onSelect, value, listElements, disabled }) => {
  return (
    <Style>
      <Dropdown onSelect={onSelect} value={value} className={`custom-dropdown ${disabled ? "disabled" : ""}`}>
        <Dropdown.Toggle id="dropdown-custom">
          <div className="dropdownItemSelected">
            {value != undefined && value != null && listElements.length > 0 ? ( // Ternary operator checking validity of variables
              <React.Fragment>
                {typeof value == "string" && value != "" ? ( // Ternary operator checking if string
                  <React.Fragment>
                    {listElements[0].icon != undefined ? ( // Ternary operator checking if icon exists
                      <React.Fragment>
                        <div className="dropdownIcon">
                          <img src={listElements.filter(elem => elem.value === value)[0].icon} className="dropdwonIcon" />
                        </div>
                        <div className="dropdownItem">{value}</div>
                      </React.Fragment>
                    ) : (
                      <div className="dropdownItem">{value}</div>
                    )}
                  </React.Fragment>
                ) : (
                  ""
                )}
                {typeof value == "number" && value > -1 ? ( // Ternary operator checking if number
                  <React.Fragment>
                    {listElements[0].icon != undefined ? ( // Ternary operator checking if icon exists
                      <React.Fragment>
                        <div className="dropdownIcon">
                          <img src={listElements.filter(elem => elem.value === value)[0].icon} className="dropdwonIcon" />
                        </div>
                        <div className="dropdownItem">{listElements.filter(elem => elem.value === value)[0].text}</div>
                      </React.Fragment>
                    ) : (
                      <div className="dropdownItem">{listElements.filter(elem => elem.value === value)[0].text}</div>
                    )}
                  </React.Fragment>
                ) : (
                  ""
                )}
              </React.Fragment>
            ) : (
              ""
            )}
          </div>
        </Dropdown.Toggle>
        <Dropdown.Menu>
          {listElements.map((item, index) => (
            <Dropdown.Item
              eventKey={item.value}
              key={index}
              className={`${value == item.text ? "active" : ""}`}
              disabled={item.disabled}
            >
              <div className="dropdownInner">
                {value != undefined && value != "" > 0 && listElements.length > 0 && listElements[0].icon != undefined ? (
                  <div className="dropdownIcon">
                    <img src={item.icon} className="dropdwonIcon" />
                  </div>
                ) : (
                  ""
                )}
                <div className="dropdownItem">{item.text}</div>
              </div>
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>
    </Style>
  );
};

export default Select;
