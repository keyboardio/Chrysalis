import React from "react";
import PropTypes from "prop-types";
import Styled from "styled-components";

import { SuperkeyPicker } from "../../component/Button";

import { IconKeysPress, IconKeysTapHold, IconKeysHold, IconKeys2Tap, IconKeys2TapHold } from "../../component/Icon";

const Style = Styled.div` 
.keyWrapper {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    grid-gap: 4px;
    margin-top: 32px;
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

const SuperkeyActions = ({
  isStandardViewSuperkeys,
  superkeys,
  selected,
  selectedAction,
  changeSelected,
  updateSuper,
  macros,
  updateAction,
  changeAction,
  keymapDB
}) => {
  const rows = [
    {
      icon: <IconKeysPress />,
      title: "Tap",
      description: "No secrets, tap once and activate the key."
    },
    {
      icon: <IconKeysHold />,
      title: "Hold",
      description: "Hold the key top trigger a second key."
    },
    {
      icon: <IconKeysTapHold />,
      title: "Tap & hold",
      description: "Tap once, tap again and keep holding to activate another key."
    },
    {
      icon: <IconKeys2Tap />,
      title: "2Tap",
      description: "Tap twice fast and trigger another key."
    },
    {
      icon: <IconKeys2TapHold />,
      title: "2Tap & hold",
      description: "Tap twice fast and hold to see others keyboards crying."
    }
  ];

  console.log("Rows", rows);
  return (
    <Style>
      <div className="keyWrapper">
        {superkeys
          ? rows.map((item, index) => (
              <SuperkeyPicker
                index={index}
                selected={selected}
                superkeys={superkeys}
                icon={item.icon}
                key={index}
                title={item.title}
                isStandardViewSuperkeys={isStandardViewSuperkeys}
                changeSelected={changeSelected}
                updateSuper={updateSuper}
                macros={macros}
                keymapDB={keymapDB}
              />
            ))
          : ""}
      </div>
    </Style>
  );
};

SuperkeyActions.propTypes = {
  isStandardViewSuperkeys: PropTypes.bool.isRequired
};

export default SuperkeyActions;
