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

class MediaAndLightTab extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Styles>
        <div className="tabContentWrapper">
          <div className="buttonsRow">
            <div className="mediaButtons">
              <Title text={i18n.editor.superkeys.specialKeys.mediaTitle} headingLevel={4} />
              <p className="description">{i18n.editor.superkeys.specialKeys.mediaDescription}</p>
              <div className="keysButtonsList">
                <ButtonConfig
                  tooltip={i18n.editor.superkeys.specialKeys.playPause}
                  tooltipDelay={100}
                  icoSVG={<IconMediaPlayPause />}
                />
                <ButtonConfig tooltip={i18n.editor.superkeys.specialKeys.stop} tooltipDelay={100} icoSVG={<IconMediaStop />} />
                <ButtonConfig
                  tooltip={i18n.editor.superkeys.specialKeys.rewind}
                  tooltipDelay={100}
                  icoSVG={<IconMediaRewind />}
                />
                <ButtonConfig
                  tooltip={i18n.editor.superkeys.specialKeys.forward}
                  tooltipDelay={100}
                  icoSVG={<IconMediaForward />}
                />
                <ButtonConfig
                  tooltip={i18n.editor.superkeys.specialKeys.shuffle}
                  tooltipDelay={100}
                  icoSVG={<IconMediaShuffle />}
                />
                <ButtonConfig
                  tooltip={i18n.editor.superkeys.specialKeys.mute}
                  tooltipDelay={100}
                  icoSVG={<IconMediaSoundMute />}
                />
                <ButtonConfig
                  tooltip={i18n.editor.superkeys.specialKeys.soundLess}
                  tooltipDelay={100}
                  icoSVG={<IconMediaSoundLess />}
                />
                <ButtonConfig
                  tooltip={i18n.editor.superkeys.specialKeys.soundMore}
                  tooltipDelay={100}
                  icoSVG={<IconMediaSoundMore />}
                />
              </div>
            </div>
            <div className="LEDButtons">
              <Title text={i18n.editor.superkeys.specialKeys.LEDTitle} headingLevel={4} />
              <p className="description">{i18n.editor.superkeys.specialKeys.LEDDescrition}</p>
              <div className="keysButtonsList">
                <ButtonConfig
                  buttonText={i18n.editor.superkeys.specialKeys.ledToggleText}
                  icoPosition="left"
                  tooltip={i18n.editor.superkeys.specialKeys.ledToggleTootip}
                  tooltipDelay={300}
                  icoSVG={<IconLEDSwitchLeft />}
                  className="buttonConfigLED"
                />
                <ButtonConfig
                  tooltip={i18n.editor.superkeys.specialKeys.ledPreviousEffectTootip}
                  tooltipDelay={300}
                  icoSVG={<IconLEDPreviousEffect />}
                />
                <ButtonConfig
                  tooltip={i18n.editor.superkeys.specialKeys.ledNextEffectTootip}
                  tooltipDelay={300}
                  icoSVG={<IconLEDNextEffect />}
                />
              </div>
            </div>
          </div>
          <div className="buttonsRow">
            <div className="othersButtons">
              <Title text={i18n.editor.superkeys.specialKeys.othersTitle} headingLevel={4} />
              <p className="description">{i18n.editor.superkeys.specialKeys.othersDescription}</p>
              <div className="keysButtonsList">
                <ButtonConfig tooltip={i18n.editor.superkeys.specialKeys.eject} tooltipDelay={100} icoSVG={<IconToolsEject />} />

                <ButtonConfig
                  tooltip={i18n.editor.superkeys.specialKeys.calculator}
                  tooltipDelay={100}
                  icoSVG={<IconToolsCalculator />}
                />

                <ButtonConfig
                  tooltip={i18n.editor.superkeys.specialKeys.camera}
                  tooltipDelay={100}
                  icoSVG={<IconToolsCamera />}
                />

                <ButtonConfig
                  tooltip={i18n.editor.superkeys.specialKeys.brightnessLess}
                  tooltipDelay={100}
                  icoSVG={<IconToolsBrightnessLess />}
                />
                <ButtonConfig
                  tooltip={i18n.editor.superkeys.specialKeys.brightnessMore}
                  tooltipDelay={100}
                  icoSVG={<IconToolsBrightnessMore />}
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

export default MediaAndLightTab;
