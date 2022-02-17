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
import iconKeyboard from "../../../../static/base/icon-keyboard.svg";
import iconConnected from "../../../../static/base/icon-connected.svg";
import iconChevronDown from "../../../../static/base/icon-arrow--chevron-down.svg";

const Style = Styled.div`
.custom-dropdown {
  margin-bottom: 16px;
  &.show {
    .dropdown-toggle.btn.btn-primary,
    .dropdown-toggle.btn.btn-primary:hover {
      border: 1px solid var(--purple-200);
      background: rgba(11, 2, 25, 0.2);
    }  
  }
  .dropdown-toggle.btn.btn-primary {
    background: rgba(11, 2, 25, 0.2);
    border: 1px solid #3F425A;
    border-radius: 6px;
    width: 100%;
    padding: 12px 16px;
    position: relative;
    box-shadow: none;
    &:hover {
      background: rgba(11, 2, 25, 0.35);
      border: 1px solid var(--gray-500);
    }
  }
  .dropdown-toggle::after {
    border: none;
    position: absolute;
    right: 16px;
    top: 50%;
    width: 12px;
    height: 12px;
    background-image: url(${iconChevronDown});
    background-size: cover;
    transform: translate3d(0, -50%, 0);
  }
  .dropdownInner,
  .dropdownItemSelected {
    display: flex;
    align-items: center;
    text-align: left;
  } 
  .dropdownIcon {
    flex: 0 0 24px;
  }
  .dropdownItem {
    padding-left: 12px;
    flex: 0 0 calc(100% - 24px);
    text-align: left;
    h3 {
      font-size: 16px;
      font-weight: 600;
      line-height: 1.5em;
      letter-spacing: -0.03em;
      color: var(--gray-100);
      margin-bottom: 2px;
    }
    h4 {
      font-size: 13px;
      font-weight: 600;
      letter-spacing: -0.03em;
      color: var(--gray-200);
      margin-bottom: 0;
      small {
        font-size: 12px;
      }
    }
  }
  .dropdown-menu {
    padding: 14px 8px;
    background: #3F425A;
    box-shadow: 16px 32px 32px -16px rgba(11, 2, 25, 0.2), 0px 32px 72px -32px rgba(26, 17, 46, 0.5);
    border-radius: 6px;
    border: none;
    min-width: 401px;
    .dropdown-item {
      padding: 8px;
      border-radius: 6px; 
      margin: 2px 0;
      &:hover {
        background-color: rgba(107, 119, 148, 0.2);
      }
      &.active,
      &.active:hover {
        color: #fff;
        background-color: var(--purple-200);
        img {
          filter: invert(0) saturate(0) contrast(1) brightness(2);
        }
        h3, h4 {
          color: #fff;
        }
      }
    }
  }
}

.custom-dropdown.themeLight {
  .dropdown-menu {
    padding: 14px 8px;
    background: #fff;
    box-shadow: 16px 32px 32px -16px rgba(11, 2, 25, 0.2), 0px 32px 72px -32px rgba(26, 17, 46, 0.5);
    .dropdown-item {

    }
    .dropdownItem {
      h3, h4 {
        color: var(--gray-400);
      }
    }
    .dropdown-item {
      &:hover {
        background-color: var(--gray-25);
      }
      &.active,
      &.active:hover {
        color: #fff;
        background-color: var(--purple-200);
        img {
          filter: invert(0) saturate(0) contrast(1) brightness(2);
        }
        h3, h4 {
          color: #fff;
        }
      }
    }
  }
}
`;
const SelectKeyboardDropdown = ({ theme, selectPort, selectedPortIndex, deviceItems, connected }) => {
  let themeMode = theme ? "themeDark" : "themeLight";

  return (
    <Style>
      <Dropdown className={`${themeMode} custom-dropdown`}>
        <Dropdown.Toggle id="dropdown-custom">
          <div className="dropdownItemSelected">
            <div className="dropdownIcon">
              {deviceItems[selectedPortIndex] && connected ? <img src={iconConnected} /> : <img src={iconKeyboard} />}
            </div>
            <div className="dropdownItem">
              <h3>{deviceItems[selectedPortIndex] != null ? deviceItems[selectedPortIndex].userName : "Keyboard not found"}</h3>
              <h4>
                {deviceItems[selectedPortIndex] != null ? deviceItems[selectedPortIndex].displayName : ""}
                <small>{deviceItems[selectedPortIndex] != null ? deviceItems[selectedPortIndex].path : ""}</small>
              </h4>
            </div>
          </div>
        </Dropdown.Toggle>
        <Dropdown.Menu className="super-colors">
          {/* index,displayName,userName,path */}
          {deviceItems.map(item => (
            <Dropdown.Item
              eventKey={item.index}
              key={item.index}
              className={`${selectedPortIndex == item.index ? "active" : ""}`}
            >
              <div className="dropdownInner">
                <div className="dropdownIcon">
                  {selectedPortIndex == item.index && connected ? <img src={iconConnected} /> : <img src={iconKeyboard} />}
                </div>
                <div className="dropdownItem">
                  <h3>{item.userName}</h3>
                  <h4>
                    {item.displayName} <small>{item.path}</small>
                  </h4>
                </div>
              </div>
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>
    </Style>
  );
};

export default SelectKeyboardDropdown;
