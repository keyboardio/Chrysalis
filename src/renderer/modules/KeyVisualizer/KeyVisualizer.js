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
import Title from "../../component/Title";

const Style = Styled.div`
&.KeyVisualizer {    
    padding: 16px 24px;
    h4 {
        font-size: 14px;
        color: ${({ theme }) => theme.colors.purple200};
    }
    .keySelectedBox {
        padding: 16px;   
        background: linear-gradient(90deg, rgba(255, 255, 255, 0.2) 21.15%, rgba(63, 66, 90, 0.2) 100%), #303949;
        border: 2px solid #7879F1;
        box-sizing: border-box;
        box-shadow: 24px 0px 32px -12px rgba(93, 95, 239, 0.25), 0px 4px 12px rgba(0, 0, 0, 0.25), 24px 24px 52px -10px rgba(93, 95, 239, 0.25);
        border-radius: 4px;
        width: 132px;
        height:82px;
    }
}

`;

const KeyVisualizer = ({ oldValue, newValue }) => {
  return (
    <Style className="KeyVisualizer">
      <div className="KeyVisualizerInner">
        <Title text="New value" headingLevel={4} />
        {oldValue ? oldValue : ""}
        {newValue ? (
          <div className="keySelectedBox">
            <div className="keySelectedValue">{newValue}</div>
          </div>
        ) : (
          ""
        )}
      </div>
    </Style>
  );
};

export default KeyVisualizer;
