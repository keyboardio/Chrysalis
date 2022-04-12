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

import ListModifiers from "../../component/ListModifiers/ListModifiers";

const Style = Styled.div`
&.KeyVisualizer {    
    padding: 16px 24px;
    position: relative;
    h4 {
        font-size: 14px;
        color: ${({ theme }) => theme.colors.purple200};
        margin-top: 8px;
    }
    .keySelectedBox {
        padding: 16px;   
        background: ${({ theme }) => theme.styles.keyVisualizer.background};
        border: ${({ theme }) => theme.styles.keyVisualizer.border};
        box-sizing: border-box;
        box-shadow: ${({ theme }) => theme.styles.keyVisualizer.boxShadow};
        border-radius: 4px;
        width: 132px;
        height:82px;
    }
    .listModifiersTags {
      position: relative;
      margin: 5px -46px 0 -5px;
      display: flex;
      flex-wrap: wrap;
    }
    .labelModifier {
      padding: 4px 8px;
      font-weight: 600;
      font-size: 12px;
      letter-spacing: -0.03em;
      color: #E2E4EA;
      margin: 2px;
      background: rgba(107, 119, 148, 0.5);
      border: 1px solid rgba(37, 40, 66, 0.55);
      box-sizing: border-box;
      backdrop-filter: blur(4px);
      border-radius: 14px;
    }
    .labelHyper,
    .labelMeh {
      display: none;
    }
    .hyper-active {
      .labelShift,
      .labelCrtl,
      .labelAlt,
      .labelOs {
        display: none;
      }
      .labelHyper {
        display: inline-block;
      }
    }
    .meh-active {
      .labelShift,
      .labelCrtl,
      .labelAlt {
        display: none;
      }
      .labelMeh {
        display: inline-block;
      }
    }
}

`;
//}= ({ oldValue, newValue, keyCode }) => {
class KeyVisualizer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      //modifs: []
    };
  }

  parseModifs(keycode) {
    let modifs = [];
    if (keycode & 0b100000000) {
      // Ctrl Decoder
      modifs.push(1);
      console.log("modifs", modifs);
    }
    if (keycode & 0b1000000000) {
      // Alt Decoder
      modifs.push(2);
      console.log("modifs", modifs);
    }
    if (keycode & 0b10000000000) {
      // AltGr Decoder
      modifs.push(3);
      console.log("modifs", modifs);
    }
    if (keycode & 0b100000000000) {
      // Shift Decoder
      modifs.push(0);
      console.log("modifs", modifs);
    }
    if (keycode & 0b1000000000000) {
      // Win Decoder
      modifs.push(4);
      console.log("modifs", modifs);
    }
    return modifs;
  }

  render() {
    const { keyCode, newValue, oldValue } = this.props;

    return (
      <Style className="KeyVisualizer">
        <div className="KeyVisualizerInner">
          <Title text="New value" headingLevel={4} />
          {oldValue ? oldValue : ""}
          {newValue ? (
            <div className="keySelectedBox">
              <div className="keySelectedValue">{newValue}</div>
              <ListModifiers keyCode={keyCode.base + keyCode.modified} />
            </div>
          ) : (
            ""
          )}
        </div>
      </Style>
    );
  }
}

export default KeyVisualizer;
