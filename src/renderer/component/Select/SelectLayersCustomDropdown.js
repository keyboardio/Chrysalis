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
      &.show {
        height: auto;
      }
  }
  .large-dropdown-inner {
    
  }
  .dropdownHeader {
    font-size: 12px;
    text-transform: uppercase;
    margin-bottom: 4px;
    color: ${({ theme }) => theme.styles.dropdown.largeDropdown.title};
    margin-top: 6px;
    strong {
        font-weight: 600;
        color: ${({ theme }) => theme.styles.dropdown.largeDropdown.titleStrong};
    }
  }
.dropdown-group {
    background: ${({ theme }) => theme.styles.dropdown.largeDropdown.backgroundInner};
    padding: 8px;
    border-radius: 6px;
}
.dropdown-group {
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
}
.dropdown-group + .dropdown-group {
    margin-top: 2px;
    border-bottom-left-radius: 6px;
    border-bottom-right-radius: 6px;
    border-top-left-radius: 0;
    border-top-right-radius: 0;
}
.dropdown-group-buttons {
    display: flex;
    grid-gap: 3px;
    flex-wrap: nowrap;
    padding: 2px 4px;
    border-radius: 6px;
    background-color: ${({ theme }) => theme.styles.cardButtons.groupButtonsBackground}; 
}

.dropdown-item.dropdown-config-button {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 36px;
    height: 36px;
    text-align: center;
    font-size: 14px;
    font-weight: 600;
    letter-spacing: -0.03em;
    padding: 8px 0;
    border: ${({ theme }) => theme.styles.button.config.border};
    color: ${({ theme }) => theme.styles.button.config.color}; 
    background: ${({ theme }) => theme.styles.button.config.background};
    border: none;
    border-radius: 6px;
    box-shadow: ${({ theme }) => theme.styles.button.config.boxShadow};
    transition-property: background, box-shadow, color
    transition: 300ms ease-in-out;
    .dropdownItem {
        text-align: center;
    }
    &:hover {
        cursor: pointer;
        color: ${({ theme }) => theme.styles.button.config.colorHover}; 
        background: ${({ theme }) => theme.styles.button.config.backgroundHover};
        box-shadow: ${({ theme }) => theme.styles.button.config.boxShadowHover};
    }
    &.active {
        color: ${({ theme }) => theme.styles.button.config.colorActive}; 
        background: ${({ theme }) => theme.styles.button.config.backgroundActive};
        box-shadow: ${({ theme }) => theme.styles.button.config.boxShadowActive};
    }
  }
`;

class SelectLayersCustomDropdown extends Component {
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
    this.layerSwitch = [
      { name: "Layer Shift 1", keynum: 17450 },
      { name: "Layer Shift 2", keynum: 17451 },
      { name: "Layer Shift 3", keynum: 17452 },
      { name: "Layer Shift 4", keynum: 17453 },
      { name: "Layer Shift 5", keynum: 17454 },
      { name: "Layer Shift 6", keynum: 17455 },
      { name: "Layer Shift 7", keynum: 17456 },
      { name: "Layer Shift 8", keynum: 17457 },
      { name: "Layer Shift 9", keynum: 17458 },
      { name: "Layer Shift 10", keynum: 17459 }
    ];
  }
  render() {
    const { action, keyCode, onKeySelect, activeTab } = this.props;
    const KC = keyCode.base + keyCode.modified;

    return (
      <Style>
        <Dropdown
          value={KC != 0 ? this.layerLock.map(i => i.keynum).includes(KC) : KC}
          onSelect={value => onKeySelect(parseInt(value))}
          className={`custom-dropdown  ${
            keyCode.modified > 0 &&
            (this.layerLock.map(i => i.keynum).includes(keyCode.base + keyCode.modified) ||
              this.layerSwitch.map(i => i.keynum).includes(keyCode.base + keyCode.modified))
              ? "active"
              : ""
          } ${action == 1 || action == 2 || action == 4 ? "disabled" : ""}`}
        >
          <Dropdown.Toggle id="dropdown-custom" className="button-config-style">
            <div className="dropdownItemSelected">
              <div className="dropdownItem">
                <div className="dropdownItem">Layers</div>
                <div className="badge-circle"></div>
              </div>
            </div>
          </Dropdown.Toggle>
          <Dropdown.Menu className="large-dropdown">
            <div className="large-dropdown-inner">
              <div className={`dropdown-group ${activeTab == "super" ? "disabled" : ""}`}>
                <div className="dropdownHeader">
                  Layer <strong>Switch</strong>
                </div>
                <div className="dropdown-group-buttons">
                  {this.layerSwitch.map((item, id) => {
                    return (
                      <Dropdown.Item
                        eventKey={item.keynum}
                        key={`layerSwitch-${id}`}
                        disabled={activeTab == "super" ? true : item.keynum == -1 ? true : false}
                        className={`${
                          keyCode.modified > 0 && item.keynum == keyCode.base + keyCode.modified ? "active" : ""
                        } dropdown-config-button`}
                      >
                        <div className="dropdownItem">{id + 1}</div>
                      </Dropdown.Item>
                    );
                  })}
                </div>
              </div>
              <div className="dropdown-group">
                <div className="dropdownHeader">
                  Layer <strong>Lock</strong>
                </div>
                <div className="dropdown-group-buttons">
                  {this.layerLock.map((item, id) => {
                    return (
                      <Dropdown.Item
                        eventKey={item.keynum}
                        key={`layerLock-${id}`}
                        disabled={item.keynum == -1}
                        className={`${
                          keyCode.modified > 0 && item.keynum == keyCode.base + keyCode.modified ? "active" : ""
                        } dropdown-config-button`}
                      >
                        <div className="dropdownItem">{id + 1}</div>
                      </Dropdown.Item>
                    );
                  })}
                </div>
              </div>
            </div>
          </Dropdown.Menu>
        </Dropdown>
      </Style>
    );
  }
}

export default SelectLayersCustomDropdown;
