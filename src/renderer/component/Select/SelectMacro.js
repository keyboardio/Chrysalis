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
const SelectMacro = ({ onSelect, onKeySelect, value, macros, disabled, keyCode }) => {
  const KC = keyCode.base + keyCode.modified;
  const mcros = Array(macros.length)
    .fill()
    .map((_, i) => i + 53852);
  return (
    <Style>
      <Dropdown
        onSelect={value => {
          onKeySelect(parseInt(value));
        }}
        value={macros[mcros.indexOf(KC)] != undefined ? mcros[mcros.indexOf(KC)] : ""}
        className={`custom-dropdown ${disabled ? "disabled" : ""}`}
      >
        <Dropdown.Toggle id="dropdown-custom">
          <div className="dropdownItemSelected">
            <div className="dropdownItem">
              {macros[mcros.indexOf(KC)] != undefined ? `${mcros.indexOf(KC)} ${macros[mcros.indexOf(KC)].name}` : ""}
            </div>
          </div>
        </Dropdown.Toggle>
        <Dropdown.Menu>
          {mcros.map((x, id) => {
            return (
              <Dropdown.Item eventKey={x} key={`macro-${id}`} disabled={x == -1}>
                <div className="dropdownInner">
                  <div className="dropdownItem">{`${id}. ${macros[id].name}`}</div>
                </div>
              </Dropdown.Item>
            );
          })}
        </Dropdown.Menu>
      </Dropdown>
    </Style>
  );
};

export default SelectMacro;
