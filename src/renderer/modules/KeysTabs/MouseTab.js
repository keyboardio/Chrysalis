import React, { Component } from "react";
import Styled from "styled-components";

import i18n from "../../i18n";

import Title from "../../component/Title";
import { RegularButton, ButtonConfig } from "../../component/Button";

import {
  IconMediaPlayPause,
  IconMediaStop,
  IconMediaRewind,
  IconMediaForward,
  IconMediaShuffle,
  IconMediaSoundMute,
  IconMediaSoundLess,
  IconMediaSoundMore,
  IconArrowInBoxDown,
  IconToolsBrightnessMore,
  IconToolsBrightnessLess,
  IconToolsCamera,
  IconToolsCalculator,
  IconToolsEject,
  IconLEDSwitchLeft,
  IconLEDPreviousEffect,
  IconLEDNextEffect
} from "../../component/Icon";

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
    margin-left: -8px;
    margin-right: -8px;
}

.buttonsRow {
    flex: 0 0 100%;
    display: grid;
    grid-template-columns: auto auto;
    grtid-gap: 24px;
    .button-config {
        margin-left: 8px;
        height: 34px;
    }
    padding-bottom: 12px;
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
                <ButtonConfig tooltip={i18n.mouse.clickLeft} tooltipDelay={100} />
              </div>
            </div>
            <div className="movementButtons">
              <Title text={i18n.mouse.mouseClickTitle} headingLevel={4} />
              <p className="description">{i18n.mouse.mouseClickDescription}</p>
              <div className="keysButtonsList">
                <ButtonConfig
                  buttonText={i18n.editor.superkeys.specialKeys.ledToggleText}
                  icoPosition="left"
                  tooltip={i18n.editor.superkeys.specialKeys.ledToggleTootip}
                  tooltipDelay={300}
                  icoSVG={<IconLEDSwitchLeft />}
                  className="buttonConfigLED"
                />
              </div>
            </div>
            <div className="wheelButtons">
              <Title text={i18n.mouse.mouseClickTitle} headingLevel={4} />
              <p className="description">{i18n.mouse.mouseClickDescription}</p>
              <div className="keysButtonsList">
                <ButtonConfig
                  buttonText={i18n.editor.superkeys.specialKeys.ledToggleText}
                  icoPosition="left"
                  tooltip={i18n.editor.superkeys.specialKeys.ledToggleTootip}
                  tooltipDelay={300}
                  icoSVG={<IconLEDSwitchLeft />}
                  className="buttonConfigLED"
                />
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
