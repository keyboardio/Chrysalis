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

  // function to handle button click event and to send data to props.onAddSpecial
  handleClick = mouse => {
    this.props.onAddSpecial(mouse, 5);
  };

  render() {
    return (
      <Styles>
        <div className="tabContentWrapper">
          <div className="buttonsRow">
            <div className="clickButtons">
              <Title text={i18n.mouse.mouseClickTitle} headingLevel={4} />
              <p className="description">{i18n.mouse.mouseClickDescription}</p>
              <div className="keysButtonsList">
                <ButtonConfig buttonText={i18n.mouse.clickLeft} tooltipDelay={100} onClick={() => this.handleClick(20545)} />
                <ButtonConfig buttonText={i18n.mouse.clickMiddle} tooltipDelay={100} onClick={() => this.handleClick(20548)} />
                <ButtonConfig buttonText={i18n.mouse.clickRight} tooltipDelay={100} onClick={() => this.handleClick(20546)} />
                <ButtonConfig buttonText={i18n.mouse.clickBack} tooltipDelay={100} onClick={() => this.handleClick(20552)} />
                <ButtonConfig buttonText={i18n.mouse.clickForward} tooltipDelay={100} onClick={() => this.handleClick(20560)} />
              </div>
            </div>
            <div className="movementButtons">
              <Title text={i18n.mouse.movementTitle} headingLevel={4} />
              <p className="description">{i18n.mouse.movementDescription}</p>
              <div className="keysButtonsList">
                <div className="mouseButtons mouseButtonsMovement">
                  <ButtonMouse eventType="movement" direction="up" onClick={() => this.handleClick(20481)} />
                  <ButtonMouse eventType="movement" direction="right" onClick={() => this.handleClick(20488)} />
                  <ButtonMouse eventType="movement" direction="down" onClick={() => this.handleClick(20482)} />
                  <ButtonMouse eventType="movement" direction="left" onClick={() => this.handleClick(20484)} />
                </div>
              </div>
            </div>
            <div className="wheelButtons">
              <Title text={i18n.mouse.wheelTitle} headingLevel={4} />
              <p className="description">{i18n.mouse.wheelDescription}</p>
              <div className="keysButtonsList">
                <div className="mouseButtons mouseButtonsWheel">
                  <ButtonMouse eventType="wheel" direction="up" onClick={() => this.handleClick(20497)} />
                  <ButtonMouse eventType="wheel" direction="right" onClick={() => this.handleClick(20504)} />
                  <ButtonMouse eventType="wheel" direction="down" onClick={() => this.handleClick(20498)} />
                  <ButtonMouse eventType="wheel" direction="left" onClick={() => this.handleClick(20500)} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Styles>
    );
  }
}

export default MouseTab;
