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

class SelectSuperKey extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.taps = ["TAP", "HOLD", "T&H", "2TAP", "2T&H"];
  }
  render() {
    const { action, actions, selKeys, onKeySelect, superkeys, keyCode } = this.props;

    const KC = keyCode.base + keyCode.modified;
    const superk = Array(superkeys.length)
      .fill()
      .map((_, i) => i + 53916);

    let adjactions = actions;
    if (adjactions.length < 5) {
      while (adjactions.length < 5) {
        adjactions.push(0);
      }
    }

    const skSel = (
      <Dropdown
        value={superkeys[superk.indexOf(KC)] != undefined ? superk[superk.indexOf(KC)] : ""}
        onSelect={value => {
          onKeySelect(parseInt(value));
        }}
        className={`custom-dropdown ${superkeys[superk.indexOf(KC)] != undefined ? "active" : ""}`}
      >
        <Dropdown.Toggle id="dropdown-custom">
          <div className="dropdownItemSelected">
            <div className="dropdownItem">
              <span className="dropdownLabel">Superkeys</span>
              {superkeys[superk.indexOf(KC)] != undefined
                ? `${superk.indexOf(KC) + 1} ${superkeys[superk.indexOf(KC)].name}`
                : "Select superkey"}
            </div>
          </div>
        </Dropdown.Toggle>
        <Dropdown.Menu>
          {superk.map((x, id) => {
            return (
              <Dropdown.Item eventKey={x} key={`super-${id}`} disabled={x == -1}>
                <div className="dropdownInner">
                  <div className="dropdownItem">{`${id + 1}. ${superkeys[id].name}`}</div>
                </div>
              </Dropdown.Item>
            );
          })}
        </Dropdown.Menu>
      </Dropdown>
    );

    return <Style>{skSel}</Style>;
  }
}

export default SelectSuperKey;
