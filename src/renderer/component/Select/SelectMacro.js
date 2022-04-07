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

import React, { Component } from "react";
import Styled from "styled-components";
import Dropdown from "react-bootstrap/Dropdown";

const Style = Styled.div`
width: 100%;
.custom-dropdown {
  .dropdownItem {
    padding-left: 0;
    flex: 0 0 100%;
    text-align: left;
    text-transform: capitalize;
    font-size: 14px;
    line-height: 1em;
  }
  .dropdownItemSelected {
    color: ${({ theme }) => theme.styles.dropdown.textButtonColor};
    &:hover {
      color: ${({ theme }) => theme.styles.dropdown.textButtonHover};
    }
  }
  .dropdownLabel {
    display: block; 
    font-size: 11px;
    color: ${({ theme }) => theme.colors.gray200};
  }
}
.disabled {
  pointer-events: none;
  opacity: 35%;
}
.dropdown-toggle.btn.btn-primary {
  padding: 4px 16px;
  margin-top: 0;
  margin-bottom: 1px;
}
`;

class SelectMacro extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const { keyCode, onKeySelect, macros } = this.props;
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
          className={`custom-dropdown ${macros[mcros.indexOf(KC)] != undefined ? "active" : ""}`}
        >
          <Dropdown.Toggle id="dropdown-custom">
            <div className="dropdownItemSelected">
              <div className="dropdownItem">
                <span className="dropdownLabel">Macro</span>
                {macros[mcros.indexOf(KC)] != undefined
                  ? `${mcros.indexOf(KC) + 1}. ${macros[mcros.indexOf(KC)].name}`
                  : "Select Macro"}
              </div>
            </div>
          </Dropdown.Toggle>
          <Dropdown.Menu>
            {mcros.map((x, id) => {
              return (
                <Dropdown.Item eventKey={x} key={`macro-${id}`} disabled={x == -1}>
                  <div className="dropdownInner">
                    <div className="dropdownItem">{`${id + 1}. ${macros[id].name}`}</div>
                  </div>
                </Dropdown.Item>
              );
            })}
          </Dropdown.Menu>
        </Dropdown>
      </Style>
    );
  }
}

export default SelectMacro;
