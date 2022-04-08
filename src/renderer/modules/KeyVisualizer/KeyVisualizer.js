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
        margin-top: 8px;
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

const KeyVisualizer = ({ oldValue, newValue, keyCode }) => {
  const parseModifs = keycode => {
    let modifs = [];
    if (keycode & 0b100000000) {
      // Ctrl Decoder
      modifs.push(1);
    }
    if (keycode & 0b1000000000) {
      // Alt Decoder
      modifs.push(2);
    }
    if (keycode & 0b10000000000) {
      // AltGr Decoder
      modifs.push(3);
    }
    if (keycode & 0b100000000000) {
      // Shift Decoder
      modifs.push(0);
    }
    if (keycode & 0b1000000000000) {
      // Win Decoder
      modifs.push(4);
    }
    return modifs;
  };

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
      {/* this is for a shift */}
      {parseModifs(keyCode).includes(0) == true ? <div>Shift</div> : ""}
      {/* this is for a Control */}
      {parseModifs(keyCode).includes(1) == true ? <div>Control</div> : ""}
      {/* this is for a ALt */}
      {parseModifs(keyCode).includes(2) == true ? <div>ALt</div> : ""}
      {/* this is for a AltGr */}
      {parseModifs(keyCode).includes(3) == true ? <div>AltGr</div> : ""}
      {/* this is for a Gui */}
      {parseModifs(keyCode).includes(4) == true ? <div>Gui</div> : ""}
    </Style>
  );
};

export default KeyVisualizer;
