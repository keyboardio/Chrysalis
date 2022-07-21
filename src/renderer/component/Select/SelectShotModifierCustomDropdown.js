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
import i18n from "../../i18n";
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
      min-width: 472px;
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
    span {
        font-weight: 600;
        color: ${({ theme }) => theme.styles.dropdown.largeDropdown.titleStrong};
    }
  }
.dropdown-group {
    background: ${({ theme }) => theme.styles.dropdown.largeDropdown.backgroundInner};
    padding: 8px;
    border-radius: 6px;
    border: ${({ theme }) => theme.styles.dropdown.largeDropdown.border};
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
.mouseMovement.dropdown-group {
    border-radius: 0;
}
.dropdown-group-buttons {
    display: grid;
    grid-gap: 3px;
    flex-wrap: nowrap;
    padding: 2px 4px;
    border-radius: 6px;
    background-color: ${({ theme }) => theme.styles.cardButtons.groupButtonsBackground}; 
}
.oneShotLayer .dropdown-group-buttons {
    grid-template-columns: repeat(8, 1fr);
}
.oneShotModifiers .dropdown-group-buttons {
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: auto;
}
.dropdown-item.dropdown-config-button {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
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

class SelectShotModifierCustomDropdown extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.oneShotLayers = [
      { name: "1", keynum: 49161 },
      { name: "2", keynum: 49162 },
      { name: "3", keynum: 49163 },
      { name: "4", keynum: 49164 },
      { name: "5", keynum: 49165 },
      { name: "6", keynum: 49166 },
      { name: "7", keynum: 49167 },
      { name: "8", keynum: 49168 }
    ];
    this.oneShotModifiers = [
      { name: i18n.editor.standardView.oneShot.leftControl, keynum: 49153 },
      { name: i18n.editor.standardView.oneShot.leftShift, keynum: 49154 },
      { name: i18n.editor.standardView.oneShot.leftAlt, keynum: 49155 },
      { name: i18n.editor.standardView.oneShot.leftOS, keynum: 49156 },
      { name: i18n.editor.standardView.oneShot.rightControl, keynum: 49157 },
      { name: i18n.editor.standardView.oneShot.rightShift, keynum: 49158 },
      { name: i18n.editor.standardView.oneShot.altGr, keynum: 49159 },
      { name: i18n.editor.standardView.oneShot.rightOS, keynum: 49160 }
    ];
  }
  render() {
    const { keyCode, onKeySelect } = this.props;
    const KC = keyCode.base + keyCode.modified;

    return (
      <Style>
        <Dropdown
          value={KC != 0 ? this.oneShotLayers.map(i => i.keynum).includes(KC) : KC}
          onSelect={value => onKeySelect(parseInt(value))}
          className={`custom-dropdown  ${
            this.oneShotLayers.map(i => i.keynum).includes(keyCode.base + keyCode.modified) ||
            this.oneShotModifiers.map(i => i.keynum).includes(keyCode.base + keyCode.modified)
              ? "active"
              : ""
          }`}
        >
          <Dropdown.Toggle id="dropdown-custom" className="button-config-style">
            <div className="dropdownItemSelected">
              <div className="dropdownItem">
                <div className="dropdownItem">OneShot</div>
                <div className="badge-circle"></div>
              </div>
            </div>
          </Dropdown.Toggle>
          <Dropdown.Menu className="large-dropdown">
            <div className="large-dropdown-inner">
              <div className="dropdown-group oneShotLayer">
                <div className="dropdownHeader">
                  OneShot <span>Layer</span>
                </div>
                <div className="dropdown-group-buttons">
                  {this.oneShotLayers.map((item, id) => {
                    return (
                      <Dropdown.Item
                        eventKey={item.keynum}
                        key={`mouseClick-${id}`}
                        disabled={item.keynum == -1}
                        className={`${item.keynum == keyCode.base + keyCode.modified ? "active" : ""} dropdown-config-button`}
                      >
                        <div className="dropdownItem">{item.name}</div>
                      </Dropdown.Item>
                    );
                  })}
                </div>
              </div>
              <div className="dropdown-group oneShotModifiers">
                <div className="dropdownHeader">
                  OneShot <span>Modifiers</span>
                </div>
                <div className="dropdown-group-buttons">
                  {this.oneShotModifiers.map((item, id) => {
                    return (
                      <Dropdown.Item
                        eventKey={item.keynum}
                        key={`mouseClick-${id}`}
                        disabled={item.keynum == -1}
                        className={`${item.keynum == keyCode.base + keyCode.modified ? "active" : ""} dropdown-config-button`}
                      >
                        <div className="dropdownItem">{item.name}</div>
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

export default SelectShotModifierCustomDropdown;
