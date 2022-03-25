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

import Title from "../Title";
import { IconCloseXs } from "../Icon";

const Style = Styled.div` 
.superkeyAction {  
    color: ${({ theme }) => theme.colors.gray300};
    padding: 24px 16px;
    border-radius: 3px;
    background-color: rgba(87, 97, 126, 0.2);
    &.active {
        background-color: rgba(87, 97, 126, 0.5);
    }
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
    .superkeyButtonWrapper {
        position: relative;
    }
    .superkeyDeleteButton {
        width: 24px;
        height: 24px;
        background-color: ${({ theme }) => theme.colors.brandPrimary};
        border-radius: 4px;
        color: #fff;
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
.active {
    .superkeyButton {
        background: linear-gradient(0deg, rgba(108, 92, 231, 0.8), rgba(108, 92, 231, 0.8)), linear-gradient(90deg, rgba(255, 255, 255, 0.2) 21.15%, rgba(255, 255, 255, 0) 100%), #303949;
        border: 2px solid rgba(255, 255, 255, 0.6);
        .superkeyButtonInner { 
            background: linear-gradient(0deg, rgba(108, 92, 231, 0.3), rgba(108, 92, 231, 0.3)), linear-gradient(90deg, rgba(255, 255, 255, 0.2) 21.15%, rgba(255, 255, 255, 0) 100%), #303949;
            box-shadow: 0px 4px 12px rgba(108, 92, 231, 0.1), 0px 0px 0px 2px inset rgba(255, 255, 255, 0.1);
        }
    }
}

`;

const SuperkeyPicker = ({
  selected,
  selectedAction,
  onClick,
  index,
  icon,
  title,
  description,
  selKey,
  isStandardViewSuperkeys,
  elementActive,
  superkeys,
  macros,
  keymapDB,
  changeSelected,
  updateSuper
}) => {
  const [superkeysLocal, setSuperkeysLocal] = React.useState(superkeys);
  const [actualKey, setActualKey] = React.useState({});
  const [keyContent, setKeyContent] = React.useState("Loading...");

  console.log("Superkeys", superkeys);

  React.useEffect(() => {
    console.log("asdasdasdasd", superkeys);
    console.log("Selected", selected);

    setSuperkeysLocal(superkeys);

    const aux = keymapDB.parse(superkeys[selected].actions[index]);
    setKeyContent(aux.label);
    // if (actualKey.extraLabel == "MACRO") {
    //   if (macros.length > parseInt(actualKey.label) && macros[parseInt(actualKey.label)].name.substr(0, 5) != "") {
    //     setText((actualKey.label = macros[parseInt(actualKey.label)].name.substr(0, 5).toLowerCase()));
    //   }
    // }
    // if (actualKey.label) {
    //   setText((actualKey.extraLabel != undefined ? actualKey.extraLabel + " " : "") + actualKey.label);
    // }
  }, [superkeys]);

  if (superkeys === null) return null;
  return (
    <Style>
      <div className={`superkeyAction ${elementActive ? "active" : ""}`}>
        <div className={`superkeyTitle ${isStandardViewSuperkeys ? "standard" : "single"}`}>
          {icon}
          <Title text={title} headingLevel={5} />
        </div>
        {isStandardViewSuperkeys && <div className="description">{description}</div>}
        <div className="superkeyButtonWrapper">
          <div className="superkeyDeleteButton">
            <IconCloseXs />
          </div>
          <div className="superkeyButton" onClick={() => onClick(index)}>
            <div className="superkeyButtonInner">{keyContent}</div>
          </div>
        </div>
      </div>
    </Style>
  );
};

export default SuperkeyPicker;
