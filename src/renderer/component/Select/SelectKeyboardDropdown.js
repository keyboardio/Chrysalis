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

const Style = Styled.div`
.custom-dropdown {
  margin-bottom: 16px;
  .dropdownItemSelected .dropdownItem{
    h3 {
      color: ${({ theme }) => theme.styles.dropdown.titleColor};
    }
    h4 {
      color: ${({ theme }) => theme.styles.dropdown.subTitleColor};
    }
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
      margin-bottom: 2px;
    }
    h4 {
      font-size: 13px;
      font-weight: 600;
      letter-spacing: -0.03em;
      
      margin-bottom: 0;
      small {
        font-size: 12px;
        font-weight: 600;
      }
    }
  }
  .dropdown-menu {
    min-width: 401px;
    .dropdownItem {
      h3 {
        color: ${({ theme }) => theme.colors.gray100};
      }
      h4 {
        color: ${({ theme }) => theme.colors.gray200};
      }
    }
    .active .dropdownItem h3,
    .active .dropdownItem h4{
      color: #fff;
    }
  }
}
`;
const SelectKeyboardDropdown = ({ selectPort, selectedPortIndex, deviceItems, connected }) => {
  return (
    <Style>
      <Dropdown className="custom-dropdown">
        <Dropdown.Toggle id="dropdown-custom">
          <div className="dropdownItemSelected">
            <div className="dropdownIcon">
              {deviceItems[selectedPortIndex] && connected ? <img src={iconConnected} /> : <img src={iconKeyboard} />}
            </div>
            <div className="dropdownItem">
              <h3>{deviceItems[selectedPortIndex] != null ? deviceItems[selectedPortIndex].userName : "Keyboard not found"}</h3>
              <h4>
                {deviceItems[selectedPortIndex] != null ? deviceItems[selectedPortIndex].displayName : ""}{" "}
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
