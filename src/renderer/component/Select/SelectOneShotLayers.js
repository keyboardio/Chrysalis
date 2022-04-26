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

class SelectOneShotLayers extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.oneShotLayers = [
      { name: "One Shot Layer 1", keynum: 49161 },
      { name: "One Shot Layer 2", keynum: 49162 },
      { name: "One Shot Layer 3", keynum: 49163 },
      { name: "One Shot Layer 4", keynum: 49164 },
      { name: "One Shot Layer 5", keynum: 49165 },
      { name: "One Shot Layer 6", keynum: 49166 },
      { name: "One Shot Layer 7", keynum: 49167 },
      { name: "One Shot Layer 8", keynum: 49168 }
    ];
  }
  render() {
    const { action, keyCode, onKeySelect, activeTab } = this.props;
    const KC = keyCode.base + keyCode.modified;

    return (
      <Style>
        <Dropdown
          value={this.oneShotLayers.map(x => {
            if (KC == x.keynum) return x.keynum;
          })}
          onSelect={value => onKeySelect(parseInt(value))}
          className={`custom-dropdown dropdownOneShotLayers
          ${
            keyCode.modified > 0 && this.oneShotLayers.map(i => i.keynum).includes(keyCode.base + keyCode.modified)
              ? "active"
              : ""
          }`}
        >
          <Dropdown.Toggle id="dropdown-custom">
            <div className="dropdownItemSelected">
              <div className="dropdownItem">
                <span className="dropdownLabel">One Shot Layer</span>
                {`${
                  keyCode.modified > 0 && this.oneShotLayers.map(i => i.keynum).includes(keyCode.base + keyCode.modified)
                    ? this.oneShotLayers[this.oneShotLayers.findIndex(o => o.keynum == KC)].name
                    : "Select Layer"
                }`}
              </div>
            </div>
          </Dropdown.Toggle>
          <Dropdown.Menu>
            {this.oneShotLayers.map((item, id) => {
              return (
                <Dropdown.Item
                  eventKey={item.keynum}
                  key={`OSL-${id}`}
                  disabled={item.keynum == -1}
                  className={`${keyCode.modified > 0 && item.keynum == keyCode.base + keyCode.modified ? "active" : ""}`}
                >
                  <div className="dropdownInner">
                    <div className="dropdownItem">{`${id + 1}. ${item.name}`}</div>
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

export default SelectOneShotLayers;
