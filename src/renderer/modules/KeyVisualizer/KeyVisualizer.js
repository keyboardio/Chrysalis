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
        font-size: 13px;
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
    .oldKeyValue {
      margin-bottom: 24px;
      h4 {
          color: ${({ theme }) => theme.styles.keyVisualizer.color};
      }
      .keySelectedBox {
          padding: 8px 16px;   
          border: 2px solid ${({ theme }) => theme.styles.keyVisualizer.borderOldValue};
          width: 104px;
          height:52px;
          font-size: 12px;
      }
    }
    .showConnection {
      position: relative;
    }
    .showConnection:before {
      position: absolute;
      content: "";
      top: 40px;
      left: -12px;
      width: 12px;
      height: 128px;
      background-repeat: no-repeat;
      background-image: url(${({ theme }) => theme.styles.keyVisualizer.bgOldToNew});
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
    const { keyCode, newValue, oldValue, isStandardView } = this.props;

    return (
      <Style className="KeyVisualizer">
        <div className={`KeyVisualizerInner ${newValue != oldValue && isStandardView ? "showConnection" : ""}`}>
          {oldValue ? (
            <div className="oldKeyValue">
              <Title text="Selected value" headingLevel={4} />
              <div className="keySelectedBox">
                <div className="keySelectedValue">{oldValue}</div>
                <ListModifiers keyCode={keyCode.base ? keyCode.base + keyCode.modified : keyCode} size="sm" />
              </div>
            </div>
          ) : (
            ""
          )}
          {newValue && !isStandardView ? (
            <div className="newKeyValue">
              <Title text="New value" headingLevel={4} />
              <div className="keySelectedBox">
                <div className="keySelectedValue">{newValue}</div>
                <ListModifiers keyCode={keyCode.base ? keyCode.base + keyCode.modified : keyCode} />
              </div>
            </div>
          ) : (
            ""
          )}
          {newValue != oldValue && isStandardView ? (
            <div className="newKeyValue">
              <Title text="New value" headingLevel={4} />
              <div className="keySelectedBox">
                <div className="keySelectedValue">{newValue}</div>
                <ListModifiers keyCode={keyCode.base ? keyCode.base + keyCode.modified : keyCode} />
              </div>
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
