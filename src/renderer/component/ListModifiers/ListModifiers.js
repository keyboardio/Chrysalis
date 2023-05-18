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

const Style = Styled.div`
.listModifiersTags {
    margin: 0 -5px 0 -5px;
    display: flex;
    flex-wrap: wrap;
}
.labelModifier {
  padding: 4px 8px;
  font-weight: 600;
  font-size: 11px;
  letter-spacing: -0.03em;
  color:${({ theme }) => theme.styles.keyVisualizer.labelModifierColor};
  margin: 2px;
  background: ${({ theme }) => theme.styles.keyVisualizer.labelModifierBackground};
  border:  ${({ theme }) => theme.styles.keyVisualizer.labelBorder};
  box-sizing: border-box;
  backdrop-filter: blur(4px);
  border-radius: 14px;
}
.sm {
  .labelModifier {
    padding: 3px 6px;
    font-weight: 600;
    font-size: 10px;
    color:${({ theme }) => theme.styles.keyVisualizer.labelModifierColorSm};
    background: ${({ theme }) => theme.styles.keyVisualizer.labelModifierBackgroundSm};
    border:  ${({ theme }) => theme.styles.keyVisualizer.labelBorderSm};
    border-radius: 12px;
  }
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
.display-hidden {
    display: none;
}
`;
//}= ({ oldValue, newValue, keyCode }) => {
class ListModifiers extends Component {
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
  }

  render() {
    const { keyCode, size } = this.props;
    if (keyCode >= 8192) return null;
    return (
      <Style>
        <div
          className={`listModifiersTags 
            ${size == "sm" ? "sm" : ""}
                ${
                  this.parseModifs(keyCode).includes(0) == true &&
                  this.parseModifs(keyCode).includes(1) == true &&
                  this.parseModifs(keyCode).includes(2) == true &&
                  this.parseModifs(keyCode).includes(4) == true
                    ? "hyper-active"
                    : ""
                } 
                ${
                  this.parseModifs(keyCode).includes(0) == true &&
                  this.parseModifs(keyCode).includes(1) == true &&
                  this.parseModifs(keyCode).includes(2) == true &&
                  this.parseModifs(keyCode).includes(4) == false
                    ? "meh-active"
                    : ""
                }`}
        >
          <div className="label labelModifier labelHyper">Hyper</div>
          <div className="label labelModifier labelMeh">Meh</div>
          {/* this is for a shift */}
          {this.parseModifs(keyCode).includes(0) == true ? (
            <div className="label labelModifier labelShift">{size == "xs" ? "S" : "Shift"}</div>
          ) : (
            ""
          )}
          {this.parseModifs(keyCode).includes(1) == true ? (
            <div className="label labelModifier labelCrtl">{size == "xs" ? "C" : "Ctrl"}</div>
          ) : (
            ""
          )}
          {this.parseModifs(keyCode).includes(2) == true ? (
            <div className="label labelModifier labelAlt">{size == "xs" ? "A" : "Alt"}</div>
          ) : (
            ""
          )}
          {this.parseModifs(keyCode).includes(3) == true ? (
            <div className="label labelModifier labelAltGr">{size == "xs" ? "Agr" : "Alt Gr."}</div>
          ) : (
            ""
          )}
          {this.parseModifs(keyCode).includes(4) == true ? <div className="label labelModifier labelOs">OS</div> : ""}

          {/* this is for a Control */}
          {/* {this.parseModifs(keyCode).includes(1) == true ? <div>Control</div> : "Nope"} */}
          {/* this is for a ALt */}
          {/* {this.parseModifs(keyCode).includes(2) == true ? <div>ALt</div> : "Nope"} */}
          {/* this is for a AltGr */}
          {/* {this.parseModifs(keyCode).includes(3) == true ? <div>AltGr</div> : "Nope"} */}
          {/* this is for a Gui */}
          {/* {this.parseModifs(keyCode).includes(4) == true ? <div>Gui</div> : "Nope"} */}
        </div>
      </Style>
    );
  }
}

export default ListModifiers;
