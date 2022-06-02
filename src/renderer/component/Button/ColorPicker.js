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
    background: rgba(11, 2, 25, 0.2);
    border: 1px solid rgba(123, 134, 158, 0.1);
    border-radius: 4px;
    padding: 3px;
    &.active {
        background: rgba(11, 2, 25, 0.6);
        border: 1px solid #7879F1;
        box-shadow: 0px 4px 24px rgba(108, 92, 231, 0.6);
    }
}
.button-content, 
.colorItem {
    width: 100%;
    height: 100%;
    border-radius: 3px;
}

`;

const ColorPicker = ({ menuKey, key, id, onClick, dataID, selected, buttonStyle }) => {
  return (
    <Style>
      <div key={menuKey} onClick={onClick} className={`colorPickerButton ${selected === id ? "active" : ""}`} data-id={dataID}>
        <div className="button-content">
          <div key={key} className={`colorItem`} style={buttonStyle} />
        </div>
      </div>
    </Style>
  );
};

export default ColorPicker;
