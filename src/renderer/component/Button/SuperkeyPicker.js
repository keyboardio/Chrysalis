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
.superkeyAction {  
    color: ${({ theme }) => theme.colors.gray300};
    padding: 24px 16px;
    border-radius: 3px;
    background-color: rgba(87, 97, 126, 0.2);
    h5 {
        color: ${({ theme }) => theme.colors.gray25};
        font-weight: 700;
        font-size: 13px;
        margin-top: 12px;
        letter-spacing: 0.04em;
    }
    .description {
        color: ${({ theme }) => theme.colors.gray100};
        margin-bottom: 8px;
        font-weight: 400;
        font-size: 14px;
    }   
    .superkeyTitle {
        margin-bottom: 16px;    
        &.single {
            display: flex;
            flex-wrap: nowrap;
            align-items: center;
            h5 {
                margin: 0 0 0 8px;
            }
        }
    }
}
.superkeyButton {
    width: 124px;
    background: linear-gradient(0deg, rgba(108, 92, 231, 0.8), rgba(108, 92, 231, 0.8)), linear-gradient(90deg, rgba(255, 255, 255, 0.2) 21.15%, rgba(255, 255, 255, 0) 100%), #303949;
    border: 2px solid #6C5CE7;
    box-shadow: 0px 4px 24px rgba(108, 92, 231, 0.65);
    border-radius: 4px; 
    padding: 1px 3px 6px 3px;
    margin-top: 16px;

    transition-property: box-shadow, border;
    transition: 300ms ease-in-out;

    font-weight: 600;
    font-size: 12px;
    letter-spacing: -0.03em;
    line-height: 15px;
    .superkeyButtonInner {  
        height: 50px;
        margin-top: -1px;
        padding: 8px;
        background: linear-gradient(0deg, rgba(108, 92, 231, 0.3), rgba(108, 92, 231, 0.3)), linear-gradient(90deg, rgba(255, 255, 255, 0.2) 21.15%, rgba(255, 255, 255, 0) 100%), #303949;
        box-shadow: 0px 4px 24px rgba(108, 92, 231, 0.65);
        border-radius: 4px;
        color: ${({ theme }) => theme.colors.gray25};
        transition-property: box-shadow, border;
    }
    &:hover {
        background: linear-gradient(0deg, rgba(108, 92, 231, 0.8), rgba(108, 92, 231, 0.8)), linear-gradient(90deg, rgba(255, 255, 255, 0.2) 21.15%, rgba(255, 255, 255, 0) 100%), #303949;
        border: 2px solid rgba(255, 255, 255, 0.8);
        box-shadow: 0px 4px 12px rgba(108, 92, 231, 0.1);
        cursor: pointer;
        .superkeyButtonInner { 
            background: linear-gradient(0deg, rgba(108, 92, 231, 0.3), rgba(108, 92, 231, 0.3)), linear-gradient(90deg, rgba(255, 255, 255, 0.2) 21.15%, rgba(255, 255, 255, 0) 100%), #303949;
            box-sizing: border-box;
            box-shadow: 0px 4px 24px rgba(108, 92, 231, 0.65), 0px 0px 0px 2px inset rgba(255, 255, 255, 0.1);
        }
    }
}
`;

const SuperkeyPicker = ({
  selected,
  onClick,
  index,
  icon,
  title,
  description,
  selKey,
  isStandardViewSuperkeys,
  superkeys,
  macros,
  keymapDB,
  changeSelected,
  updateSuper
}) => {
  const [actualKey, setActualKey] = React.useState({});
  const [text, setText] = React.useState("Loading...");

  React.useEffect(() => {
    console.log("Superkeys", superkeys);
    console.log("Selected", selected);

    if (Array.isArray(superkeys) && superkeys.length > 0) {
      const auxParse = keymapDB.parse(superkeys[selected].actions[index]);

      console.log("INDEX: ", index);
      console.log("actualKey: ", actualKey);
      console.log("superkeys[selected].actions[index]: ", superkeys[selected].actions[index]);
      console.log("keymapDB.parse(superkeys[selected].actions[index]): ", auxParse);
      setText(superkeys[selected].actions[index]);
      if (auxParse.extraLabel == "MACRO") {
        if (macros.length > parseInt(auxParse.label) && macros[parseInt(auxParse.label)].name.substr(0, 5) != "") {
          setText((auxParse.label = macros[parseInt(auxParse.label)].name.substr(0, 5).toLowerCase()));
        }
      }
      if (auxParse.label) {
        setText((auxParse.extraLabel != undefined ? auxParse.extraLabel + " " : "") + auxParse.label);
      }
    }
  }, [superkeys, selected]);

  if (superkeys === null) return null;
  return (
    <Style>
      <div className={`superkeyAction ${selected ? selected : ""}`} onClick={onClick}>
        <div className={`superkeyTitle ${isStandardViewSuperkeys ? "standard" : "single"}`}>
          {icon}
          <Title text={title} headingLevel={5} />
        </div>
        {isStandardViewSuperkeys && <div className="description">{description}</div>}
        <div className="superkeyButton">
          <div className="superkeyButtonInner">{text}</div>
        </div>
      </div>
    </Style>
  );
};

export default SuperkeyPicker;
