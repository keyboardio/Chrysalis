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

const Style = Styled.div` 

.colorPickerButton {
    width: 38px;
    height: 38px;
    background: ${({ theme }) => theme.styles.colorPanel.colorPickerBase};
    border: 1px solid ${({ theme }) => theme.styles.colorPanel.colorPickerBorder};
    // box-shadow:inset 0px 0px 0px 1px #f00;
    border-radius: 4px;
    
    box-shadow: 0px 0px 24px rgba(108, 92, 231, 0);
    transition-property: background, border, box-shadow, width;
    transition: 300ms ease-in-out;
    &:hover{
      border: 1px solid ${({ theme }) => theme.styles.colorPanel.colorPickerBorderHover};
      cursor: pointer;
      .colorItem:after {
        opacity: 1;
      }
    }
    &.active {
        background: ${({ theme }) => theme.styles.colorPanel.colorPickerBaseActive};
        border: 1px solid ${({ theme }) => theme.styles.colorPanel.colorPickerBorderActive};
        box-shadow: 0px 4px 24px rgba(108, 92, 231, 0.6);
    }
}
.button-content {
  position: relative;
  width: 100%;
  height: 100%;
  padding: 3px;
}
.colorItem {
  width: 100%;
    height: 100%;
    border-radius: 3px;
}
.colorItem {
  position: relative;
  overflow: hidden;
  &:after {
    content: "";
    position: absolute;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, rgba(255, 255, 255, 0.35) 0%, rgba(255, 255, 255, 0) 50%), rgba(255,255,255,0.1);
    opacity: 0;
    transition: 300ms opacity ease-in-out;
  }
}

@media screen and (max-width: 1599px) {
  .colorPickerButton {
    width: 36px;
    height: 36px;
  }
}

@media screen and (max-width: 1499px) {
  .colorPickerButton {
    width: 32px;
    height: 32px;
  }
}
@media screen and (max-width: 1355px) {
  .colorPickerButton {
    width: 16px;
    height: 36px;
    &:hover,
    &.active {
      width: 24px;
    }
  }
}

`;

const ColorPicker = ({ menuKey, id, onClick, dataID, selected, buttonStyle }) => {
  return (
    <Style>
      <div key={menuKey} onClick={onClick} className={`colorPickerButton ${selected === id ? "active" : ""}`} data-id={dataID}>
        <div className="button-content">
          <div className={`colorItem`} style={buttonStyle}>{` `}</div>
        </div>
      </div>
    </Style>
  );
};

export default ColorPicker;
