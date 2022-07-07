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

import i18n from "../../i18n";

import Title from "../../component/Title";
import Callout from "../../component/Callout";
import MouseEventsReference from "../../component/MouseEventsReference";
import { ButtonConfig, ButtonMouse } from "../../component/Button";

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

&.standardViewTab {
  .mouseWrapper {
    display: grid;
    //grid-template-columns: 1fr minmax(320px, 500px);
    grid-gap: 24px;
  }
  .buttonsRow {
    // grid-template-columns: 1fr 1fr; 
    grid-template-columns: minmax(240px, 370px) auto auto; 
    .clickButtons {
      //grid-column: 1 / -1;
    }
  }
}
`;

const MouseTab = ({ isStandardView, keyCode, onAddSpecial }) => {
  const [isHovering, setIsHovering] = React.useState(false);
  const clickLeft = React.useRef(null);

  // function to handle button click event and to send data to props.onAddSpecial
  const handleClick = mouse => {
    onAddSpecial(mouse, 5);
    setIsHovering(!isHovering);
  };

  const handleEnterAnimations = mouseEvent => {
    setIsHovering(true);
    console.log("MouseEnter", mouseEvent);
  };

  const handleLeaveAnimations = mouseEvent => {
    setIsHovering(true);
    console.log("MouseLeave", mouseEvent);
  };

  return (
    <Styles className={`${isStandardView ? "standardViewTab" : ""} tabsMouse`}>
      <div className="tabContentWrapper">
        {isStandardView ? (
          <>
            <Title text={i18n.editor.standardView.mouse.title} headingLevel={3} />
            <Callout content={i18n.editor.standardView.mouse.callOut} size="sm" />
          </>
        ) : null}
        <div className="mouseWrapper">
          <div className="buttonsRow">
            <div className="clickButtons">
              <Title text={i18n.mouse.mouseClickTitle} headingLevel={4} />
              <p className="description">{i18n.mouse.mouseClickDescription}</p>
              <div className="keysButtonsList">
                <ButtonConfig
                  buttonText={i18n.mouse.clickLeft}
                  tooltipDelay={100}
                  onClick={() => handleClick(20545)}
                  selected={isStandardView ? (keyCode === 20545 ? true : false) : false}
                  onMouseEnter={() => handleClick(20545)}
                  onMouseLeave={() => handleLeaveAnimations("Trigger OUT - Left")}
                />
                <ButtonConfig
                  buttonText={i18n.mouse.clickMiddle}
                  tooltipDelay={100}
                  onClick={() => handleClick(20548)}
                  selected={isStandardView ? (keyCode === 20548 ? true : false) : false}
                  onMouseEnter={() => handleClick(20545)}
                  onMouseLeave={() => handleLeaveAnimations("Trigger OUT - Middle")}
                />
                <ButtonConfig
                  buttonText={i18n.mouse.clickRight}
                  tooltipDelay={100}
                  onClick={() => handleClick(20546)}
                  selected={isStandardView ? (keyCode === 20546 ? true : false) : false}
                />
                <ButtonConfig
                  buttonText={i18n.mouse.clickBack}
                  tooltipDelay={100}
                  onClick={() => handleClick(20552)}
                  selected={isStandardView ? (keyCode === 20552 ? true : false) : false}
                />
                <ButtonConfig
                  buttonText={i18n.mouse.clickForward}
                  tooltipDelay={100}
                  onClick={() => handleClick(20560)}
                  selected={isStandardView ? (keyCode === 20560 ? true : false) : false}
                />
              </div>
            </div>
            <div className="movementButtons">
              <Title text={i18n.mouse.movementTitle} headingLevel={4} />
              <p className="description">{i18n.mouse.movementDescription}</p>
              <div className="keysButtonsList">
                <div className="mouseButtons mouseButtonsMovement">
                  <ButtonMouse
                    eventType="movement"
                    direction="up"
                    onClick={() => handleClick(20481)}
                    selected={isStandardView ? (keyCode === 20481 ? true : false) : false}
                  />
                  <ButtonMouse
                    eventType="movement"
                    direction="right"
                    onClick={() => handleClick(20488)}
                    selected={isStandardView ? (keyCode === 20488 ? true : false) : false}
                  />
                  <ButtonMouse
                    eventType="movement"
                    direction="down"
                    onClick={() => handleClick(20482)}
                    selected={isStandardView ? (keyCode === 20482 ? true : false) : false}
                  />
                  <ButtonMouse
                    eventType="movement"
                    direction="left"
                    onClick={() => handleClick(20484)}
                    selected={isStandardView ? (keyCode === 20484 ? true : false) : false}
                  />
                </div>
              </div>
            </div>
            <div className="wheelButtons">
              <Title text={i18n.mouse.wheelTitle} headingLevel={4} />
              <p className="description">{i18n.mouse.wheelDescription}</p>
              <div className="keysButtonsList">
                <div className="mouseButtons mouseButtonsWheel">
                  <ButtonMouse
                    eventType="wheel"
                    direction="up"
                    onClick={() => handleClick(20497)}
                    selected={isStandardView ? (keyCode === 20497 ? true : false) : false}
                  />
                  <ButtonMouse
                    eventType="wheel"
                    direction="right"
                    onClick={() => handleClick(20504)}
                    selected={isStandardView ? (keyCode === 20504 ? true : false) : false}
                  />
                  <ButtonMouse
                    eventType="wheel"
                    direction="down"
                    onClick={() => handleClick(20498)}
                    selected={isStandardView ? (keyCode === 20498 ? true : false) : false}
                  />
                  <ButtonMouse
                    eventType="wheel"
                    direction="left"
                    onClick={() => handleClick(20500)}
                    selected={isStandardView ? (keyCode === 20500 ? true : false) : false}
                  />
                </div>
              </div>
            </div>
          </div>
          {/* {isStandardView ? <MouseEventsReference /> : ""} */}
        </div>
      </div>
    </Styles>
  );
};

export default MouseTab;
