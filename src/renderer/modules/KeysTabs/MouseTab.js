import React, { Component } from "react";
import Styled from "styled-components";

import i18n from "../../i18n";

import Title from "../../component/Title";
import { RegularButton, ButtonConfig, ButtonMouse } from "../../component/Button";

import { IconArrowInBoxDown } from "../../component/Icon";

const Styles = Styled.div`
display: flex;
flex-wrap: wrap;
height: inherit;
h4 {
    font-size: 16px;
    flex: 0 0 100%;
    width: 100%;
    margin-top: 24px;
}
.callOut {
    width: 100%;
    flex: 0 0 100%;
}
.w100 {
    width: 100%;
    flex: 0 0 100%;
}
.description {
    font-size: 14px;
    color: ${({ theme }) => theme.styles.macro.descriptionColor};
    flex: 0 0 100%;
    width: 100%;
}

.keysButtonsList {
    display: flex;
    flex-grow: 1;
    flex: 100%;
    margin-left: -4px;
    margin-right: -4px;
}

.buttonsRow {
    flex: 0 0 100%;
    display: grid;
    grid-template-columns: auto auto auto;
    grid-gap: 24px;
    .button-config {
        margin: 4px;
        padding-top: 12px;
        padding-bottom: 12px;
    }
    padding-bottom: 12px;
}
.clickButtons .keysButtonsList {    
    max-width: 430px;
    flex-wrap: wrap;
    .button-config {
        width: 134px;
        text-align: center;
    }
}

.mouseButtons {
    width: 156px;
    height: 156px;
    border-radius: 50%;
    background:  ${({ theme }) => theme.styles.mouseButtons.background};
    position: relative;
    &.mouseButtonsWheel {
        &:before, &:after {
            content: "";
            position: absolute; 
            left: 50%;
            top: 50%;
            transform: translate3d(-50%, -50%, 0);
        }
        &:before {
            border-radius: 50%; 
            width: 52px;
            height: 52px;
            background:  ${({ theme }) => theme.styles.mouseButtons.backgroundWheelCircle};
            z-index: 2;
        }
        &:after {
            width: 28px;
            height: 70px;
            background-image:  url(${({ theme }) => theme.styles.mouseButtons.mouseWheel});
            z-index: 3;
        }
    }
}
@media screen and (max-width: 1200px) {
  .buttonsRow {
    grid-template-columns: 1fr 1fr;
    .clickButtons {
      grid-column: 1 / -1;
    }
  }
}
`;

class MouseTab extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Styles>
        <div className="tabContentWrapper">
          <div className="buttonsRow">
            <div className="clickButtons">
              <Title text={i18n.mouse.mouseClickTitle} headingLevel={4} />
              <p className="description">{i18n.mouse.mouseClickDescription}</p>
              <div className="keysButtonsList">
                <ButtonConfig buttonText={i18n.mouse.clickLeft} tooltipDelay={100} />
                <ButtonConfig buttonText={i18n.mouse.clickMiddle} tooltipDelay={100} />
                <ButtonConfig buttonText={i18n.mouse.clickRight} tooltipDelay={100} />
                <ButtonConfig buttonText={i18n.mouse.clickBack} tooltipDelay={100} />
                <ButtonConfig buttonText={i18n.mouse.clickForward} tooltipDelay={100} />
              </div>
            </div>
            <div className="movementButtons">
              <Title text={i18n.mouse.movementTitle} headingLevel={4} />
              <p className="description">{i18n.mouse.movementDescription}</p>
              <div className="keysButtonsList">
                <div className="mouseButtons mouseButtonsMovement">
                  <ButtonMouse eventType="movement" direction="up" />
                  <ButtonMouse eventType="movement" direction="right" />
                  <ButtonMouse eventType="movement" direction="down" />
                  <ButtonMouse eventType="movement" direction="left" />
                </div>
              </div>
            </div>
            <div className="wheelButtons">
              <Title text={i18n.mouse.wheelTitle} headingLevel={4} />
              <p className="description">{i18n.mouse.wheelDescription}</p>
              <div className="keysButtonsList">
                <div className="mouseButtons mouseButtonsWheel">
                  <ButtonMouse eventType="wheel" direction="up" />
                  <ButtonMouse eventType="wheel" direction="right" />
                  <ButtonMouse eventType="wheel" direction="down" />
                  <ButtonMouse eventType="wheel" direction="left" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="tabSaveButton">
          <RegularButton
            buttonText={i18n.editor.macros.textTabs.buttonText}
            style="outline gradient"
            onClick={this.props.onAddText}
            icoSVG={<IconArrowInBoxDown />}
            icoPosition="right"
          />
        </div>
      </Styles>
    );
  }
}

export default MouseTab;
