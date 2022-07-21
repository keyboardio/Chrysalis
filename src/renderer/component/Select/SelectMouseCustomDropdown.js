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
.mouseClick .dropdown-group-buttons {
    grid-template-columns: repeat(5, 1fr);
}
.mouseMovement .dropdown-group-buttons, 
.mouseWheel .dropdown-group-buttons {
    grid-template-columns: repeat(4, 1fr);
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

class SelectMouseCustomDropdown extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.mouseClick = [
      { name: i18n.editor.superkeys.specialKeys.left, keynum: 20545 },
      { name: i18n.editor.superkeys.specialKeys.middle, keynum: 20548 },
      { name: i18n.editor.superkeys.specialKeys.right, keynum: 20546 },
      { name: i18n.editor.superkeys.specialKeys.back, keynum: 20552 },
      { name: i18n.editor.superkeys.specialKeys.fwd, keynum: 20560 }
    ];
    this.mouseMovement = [
      { name: i18n.editor.superkeys.specialKeys.left, keynum: 20484 },
      { name: i18n.editor.superkeys.specialKeys.right, keynum: 20488 },
      { name: i18n.editor.superkeys.specialKeys.up, keynum: 20481 },
      { name: i18n.editor.superkeys.specialKeys.down, keynum: 20482 }
    ];
    this.mouseWheel = [
      { name: i18n.editor.superkeys.specialKeys.left, keynum: 20500 },
      { name: i18n.editor.superkeys.specialKeys.right, keynum: 20504 },
      { name: i18n.editor.superkeys.specialKeys.up, keynum: 20497 },
      { name: i18n.editor.superkeys.specialKeys.down, keynum: 20498 }
    ];
  }
  render() {
    const { keyCode, onKeySelect } = this.props;
    const KC = keyCode.base + keyCode.modified;

    return (
      <Style>
        <Dropdown
          value={KC != 0 ? this.mouseClick.map(i => i.keynum).includes(KC) : KC}
          onSelect={value => onKeySelect(parseInt(value))}
          className={`custom-dropdown  ${
            this.mouseClick.map(i => i.keynum).includes(keyCode.base + keyCode.modified) ||
            this.mouseMovement.map(i => i.keynum).includes(keyCode.base + keyCode.modified) ||
            this.mouseWheel.map(i => i.keynum).includes(keyCode.base + keyCode.modified)
              ? "active"
              : ""
          }`}
        >
          <Dropdown.Toggle id="dropdown-custom" className="button-config-style">
            <div className="dropdownItemSelected">
              <div className="dropdownItem">
                <div className="dropdownItem">Mouse events</div>
                <div className="badge-circle"></div>
              </div>
            </div>
          </Dropdown.Toggle>
          <Dropdown.Menu className="large-dropdown">
            <div className="large-dropdown-inner">
              <div className="dropdown-group mouseClick">
                <div
                  className="dropdownHeader"
                  dangerouslySetInnerHTML={{ __html: i18n.editor.superkeys.specialKeys.mouseClick }}
                />
                <div className="dropdown-group-buttons">
                  {this.mouseClick.map((item, id) => {
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
              <div className="dropdown-group mouseMovement">
                <div
                  className="dropdownHeader"
                  dangerouslySetInnerHTML={{ __html: i18n.editor.superkeys.specialKeys.mouseMovement }}
                />
                <div className="dropdown-group-buttons">
                  {this.mouseMovement.map((item, id) => {
                    return (
                      <Dropdown.Item
                        eventKey={item.keynum}
                        key={`mouseMovement-${id}`}
                        disabled={item.keynum == -1}
                        className={`${item.keynum == keyCode.base + keyCode.modified ? "active" : ""} dropdown-config-button`}
                      >
                        <div className="dropdownItem">{item.name}</div>
                      </Dropdown.Item>
                    );
                  })}
                </div>
              </div>
              <div className="dropdown-group mouseWheel">
                <div
                  className="dropdownHeader"
                  dangerouslySetInnerHTML={{ __html: i18n.editor.superkeys.specialKeys.mouseWheel }}
                />
                <div className="dropdown-group-buttons">
                  {this.mouseWheel.map((item, id) => {
                    return (
                      <Dropdown.Item
                        eventKey={item.keynum}
                        key={`mouseWheel-${id}`}
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

export default SelectMouseCustomDropdown;
