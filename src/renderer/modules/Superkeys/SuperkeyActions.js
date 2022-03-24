import React from "react";
import PropTypes from "prop-types";
import Styled from "styled-components";

import Title from "../../component/Title";

import { IconKeysPress, IconKeysTapHold, IconKeys2Tap, IconKeys2TapHold, IconKeysRelease } from "../../component/Icon";

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
            margin-top: 8px;
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

const SuperkeyActions = ({ isStandardViewSuperkeys }) => {
  return (
    <Style>
      <div className="keyWrapper">
        <div className="superkeyAction">
          <div className={`superkeyTitle ${isStandardViewSuperkeys ? "standard" : "single"}`}>
            <IconKeysPress />
            <Title text="Tap" headingLevel={5} />
          </div>
          {isStandardViewSuperkeys && <div className="description">No secrets, tap once and activate the key.</div>}
          <div className="superkeyButton">
            <div className="superkeyButtonInner">Macro.Hey Dygmate!</div>
          </div>
        </div>

        <div className="superkeyAction">
          <div className={`superkeyTitle ${isStandardViewSuperkeys ? "standard" : "single"}`}>
            <IconKeysTapHold />
            <Title text="Hold" headingLevel={5} />
          </div>
          {isStandardViewSuperkeys && <div className="description">Hold the key top trigger a second key.</div>}
          <div className="superkeyButton">
            <div className="superkeyButtonInner">Macro.Hey Dygmate!</div>
          </div>
        </div>

        <div className="superkeyAction">
          <div className={`superkeyTitle ${isStandardViewSuperkeys ? "standard" : "single"}`}>
            <IconKeysTapHold />
            <Title text="Tap & Hold" headingLevel={5} />
          </div>
          {isStandardViewSuperkeys && (
            <div className="description">Tap once, tap again and keep holding to activate another key.</div>
          )}
          <div className="superkeyButton">
            <div className="superkeyButtonInner">Macro.Hey Dygmate!</div>
          </div>
        </div>
      </div>
    </Style>
  );
};

SuperkeyActions.propTypes = {
  isStandardViewSuperkeys: PropTypes.bool.isRequired
};

export default SuperkeyActions;
