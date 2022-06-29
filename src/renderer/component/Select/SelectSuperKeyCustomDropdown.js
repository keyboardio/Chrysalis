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
    font-size: inherit;
    line-height: 1em;
    
  }
  .dropdownItemSelected {
    color: ${({ theme }) => theme.styles.dropdown.textButtonColor};
    position: relative;
    .badge-circle {
      width: 8px;
      height: 8px; 
      border-radius: 50%;
      background-color: rgba(254,0,124,1);
      position: absolute;
      right: -26px;
      top: -13px;
      font-size: 11px;
    }
    &:hover {
      color: ${({ theme }) => theme.styles.dropdown.textButtonHover};
    }
  }
}
.active .dropdownItemSelected .badge-circle {
  opacity: 1;
}
.disabled {
  pointer-events: none;
  opacity: 35%;
}
.dropdown-toggle.btn.btn-primary {
  margin-top: 0;
  padding: 12px 16px;
}

.dropdown-menu.large-dropdown {
    min-width: 362px;
    background: ${({ theme }) => theme.styles.dropdown.largeDropdown.backgroundInner};
    &.show {
      height: auto;
    }
}
.large-dropdown-inner {
  background: ${({ theme }) => theme.styles.dropdown.largeDropdown.backgroundInner};
  padding: 8px;
}
.dropdownHeader {
  font-size: 12px;
  text-transform: uppercase;
  margin-bottom: 4px;
  color: ${({ theme }) => theme.styles.dropdown.largeDropdown.title};
}
.dropdown-list {
  background: ${({ theme }) => theme.styles.dropdown.dropdownMenu.backgroundColor};
  padding: 2px 4px;
  border-radius: 6px;
  height: 142px;
  overflow-y: auto;
}
`;

class SelectSuperKeyCustomDropdown extends Component {
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
        <Dropdown.Toggle id="dropdown-custom" className="button-config-style">
          <div className="dropdownItemSelected">
            <div className="dropdownItem">Superkeys</div>
            <div className="badge-circle"></div>
          </div>
        </Dropdown.Toggle>
        <Dropdown.Menu className="large-dropdown list-inside">
          <div className="large-dropdown-inner">
            <div className="dropdownHeader">Superkeys</div>
            <div className="dropdown-list">
              {superk.map((x, id) => {
                return (
                  <Dropdown.Item
                    eventKey={x}
                    key={`super-${id}`}
                    disabled={x == -1}
                    className={`${superk.indexOf(KC) == id ? "active" : ""}`}
                  >
                    <div className="dropdownInner">
                      <div className="dropdownItem">{`${id + 1}. ${superkeys[id].name}`}</div>
                    </div>
                  </Dropdown.Item>
                );
              })}
            </div>
          </div>
        </Dropdown.Menu>
      </Dropdown>
    );

    return <Style>{skSel}</Style>;
  }
}

export default SelectSuperKeyCustomDropdown;
