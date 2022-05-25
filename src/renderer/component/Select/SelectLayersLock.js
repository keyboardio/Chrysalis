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

class SelectLayersLock extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.layerLock = [
      { name: "Layer Lock 1", keynum: 17492 },
      { name: "Layer Lock 2", keynum: 17493 },
      { name: "Layer Lock 3", keynum: 17494 },
      { name: "Layer Lock 4", keynum: 17495 },
      { name: "Layer Lock 5", keynum: 17496 },
      { name: "Layer Lock 6", keynum: 17497 },
      { name: "Layer Lock 7", keynum: 17498 },
      { name: "Layer Lock 8", keynum: 17499 },
      { name: "Layer Lock 9", keynum: 17500 },
      { name: "Layer Lock 10", keynum: 17501 }
    ];
  }
  render() {
    const { action, keyCode, onKeySelect, activeTab } = this.props;
    const KC = keyCode.base + keyCode.modified;

    console.log("action", action);
    return (
      <Style>
        <Dropdown
          value={KC != 0 ? this.layerLock.map(i => i.keynum).includes(KC) : KC}
          onSelect={value => onKeySelect(parseInt(value))}
          className={`custom-dropdown dropdownLayerLock ${
            keyCode.modified > 0 && this.layerLock.map(i => i.keynum).includes(keyCode.base + keyCode.modified) ? "active" : ""
          } ${action == 1 || action == 2 || action == 4 ? "disabled" : ""}`}
        >
          <Dropdown.Toggle id="dropdown-custom">
            <div className="dropdownItemSelected">
              <div className="dropdownItem">
                <span className="dropdownLabel">Layer lock</span>
                {`${
                  keyCode.modified > 0 && this.layerLock.map(i => i.keynum).includes(keyCode.base + keyCode.modified)
                    ? this.layerLock[this.layerLock.findIndex(o => o.keynum == KC)].name
                    : "Select Layer"
                }`}
              </div>
            </div>
          </Dropdown.Toggle>
          <Dropdown.Menu>
            {this.layerLock.map((item, id) => {
              return (
                <Dropdown.Item
                  eventKey={item.keynum}
                  key={`item-${id}`}
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

export default SelectLayersLock;
