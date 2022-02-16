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
  .dropdown-toggle.btn.btn-primary {
    background: rgba(11, 2, 25, 0.2);
    border: 1px solid #3F425A;
    border-radius: 6px;
    width: 100%;
    padding: 12px 16px;
    position: relative;
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
    .dropdown-item {
      padding: 8px;
      border-radius: 6px; 
      margin: 2px 0;
      &:hover {
        background-color: rgba(107, 119, 148, 0.2);
      }
    }
  }
}
`;
const SelectKeyboardDropdown = ({ theme, selectPort, selectedPortIndex, deviceItems }) => {
  let themeMode = theme ? "themeDark" : "themeLight";
  const fakeKeyboards = [
    {
      id: "dev/tty.usbmodem14201",
      name: "Dygma Raise ANSI",
      internalName: "Moloko"
    },
    {
      id: "dev/tty.usbmodem13321",
      name: "Dygma Raise ISO",
      internalName: "Office Raise"
    },
    {
      id: "dev/tty.usbmodem19067",
      name: "Dygma Raise ISO",
      internalName: "Home-Office Raise"
    }
  ];

  return (
    <Style>
      <Dropdown className="custom-dropdown">
        <Dropdown.Toggle id="dropdown-custom">
          <div className="dropdownItemSelected">
            <div className="dropdownIcon">
              <img src={iconConnected} />
            </div>
            <div className="dropdownItem">
              <h3>Moloko</h3>
              <h4>
                Dygma Raise ANSI <small>dev/tty.usbmodem14201</small>
              </h4>
            </div>
          </div>
        </Dropdown.Toggle>
        <Dropdown.Menu className="super-colors">
          {/* index,displayName,userName,path */}
          {deviceItems.map(item => (
            <Dropdown.Item eventKey={item.index} key={item.index}>
              <div className="dropdownInner">
                <div className="dropdownIcon">
                  <img src={iconKeyboard} />
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
