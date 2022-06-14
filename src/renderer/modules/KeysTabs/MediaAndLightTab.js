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
    grid-gap: 24px;
    .button-config {
        margin-left: 8px;
        padding-top: 12px;
        padding-bottom: 12px;
    }
    padding-bottom: 12px;
}
@media screen and (max-width: 1320px) {
  .mediaButtons {
    .keysButtonsList {
      flex-wrap: wrap;
      .button-config {
        margin-bottom: 8px;
      }
    }
  }
}
@media screen and (max-width: 1120px) {
  .buttonsRow {
    grid-template-columns: 1fr;
    grid-gap: 0;
  }
}
`;

class MediaAndLightTab extends Component {
  constructor(props) {
    super(props);
  }

  // function to handle button click with integer parameter and call to props.onAddSpecial
  handleAddSpecial = special => {
    this.props.onAddSpecial(special, 5);
  };

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
                  onClick={() => this.handleAddSpecial(22733)}
                />
                <ButtonConfig
                  tooltip={i18n.editor.superkeys.specialKeys.stop}
                  tooltipDelay={100}
                  icoSVG={<IconMediaStop />}
                  onClick={() => this.handleAddSpecial(22711)}
                />
                <ButtonConfig
                  tooltip={i18n.editor.superkeys.specialKeys.rewind}
                  tooltipDelay={100}
                  icoSVG={<IconMediaRewind />}
                  onClick={() => this.handleAddSpecial(22710)}
                />
                <ButtonConfig
                  tooltip={i18n.editor.superkeys.specialKeys.forward}
                  tooltipDelay={100}
                  icoSVG={<IconMediaForward />}
                  onClick={() => this.handleAddSpecial(22709)}
                />
                <ButtonConfig
                  tooltip={i18n.editor.superkeys.specialKeys.shuffle}
                  tooltipDelay={100}
                  icoSVG={<IconMediaShuffle />}
                  onClick={() => this.handleAddSpecial(22713)}
                />
                <ButtonConfig
                  tooltip={i18n.editor.superkeys.specialKeys.mute}
                  tooltipDelay={100}
                  icoSVG={<IconMediaSoundMute />}
                  onClick={() => this.handleAddSpecial(19682)}
                />
                <ButtonConfig
                  tooltip={i18n.editor.superkeys.specialKeys.soundLess}
                  tooltipDelay={100}
                  icoSVG={<IconMediaSoundLess />}
                  onClick={() => this.handleAddSpecial(23786)}
                />
                <ButtonConfig
                  tooltip={i18n.editor.superkeys.specialKeys.soundMore}
                  tooltipDelay={100}
                  icoSVG={<IconMediaSoundMore />}
                  onClick={() => this.handleAddSpecial(23785)}
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
                  onClick={() => this.handleAddSpecial(17154)}
                />
                <ButtonConfig
                  tooltip={i18n.editor.superkeys.specialKeys.ledPreviousEffectTootip}
                  tooltipDelay={300}
                  icoSVG={<IconLEDPreviousEffect />}
                  className="buttonConfigLED"
                  onClick={() => this.handleAddSpecial(17153)}
                />
                <ButtonConfig
                  tooltip={i18n.editor.superkeys.specialKeys.ledNextEffectTootip}
                  tooltipDelay={300}
                  icoSVG={<IconLEDNextEffect />}
                  onClick={() => this.handleAddSpecial(17152)}
                />
              </div>
            </div>
          </div>
          <div className="buttonsRow">
            <div className="othersButtons">
              <Title text={i18n.editor.superkeys.specialKeys.othersTitle} headingLevel={4} />
              <p className="description">{i18n.editor.superkeys.specialKeys.othersDescription}</p>
              <div className="keysButtonsList">
                <ButtonConfig
                  tooltip={i18n.editor.superkeys.specialKeys.eject}
                  tooltipDelay={100}
                  icoSVG={<IconToolsEject />}
                  onClick={() => this.handleAddSpecial(22712)}
                />

                <ButtonConfig
                  tooltip={i18n.editor.superkeys.specialKeys.calculator}
                  tooltipDelay={100}
                  icoSVG={<IconToolsCalculator />}
                  onClick={() => this.handleAddSpecial(18834)}
                />

                <ButtonConfig
                  tooltip={i18n.editor.superkeys.specialKeys.camera}
                  tooltipDelay={100}
                  icoSVG={<IconToolsCamera />}
                  onClick={() => this.handleAddSpecial(18552)}
                />

                <ButtonConfig
                  tooltip={i18n.editor.superkeys.specialKeys.brightnessLess}
                  tooltipDelay={100}
                  icoSVG={<IconToolsBrightnessLess />}
                  onClick={() => this.handleAddSpecial(23664)}
                />
                <ButtonConfig
                  tooltip={i18n.editor.superkeys.specialKeys.brightnessMore}
                  tooltipDelay={100}
                  icoSVG={<IconToolsBrightnessMore />}
                  onClick={() => this.handleAddSpecial(23663)}
                />
              </div>
            </div>
          </div>
        </div>
      </Styles>
    );
  }
}

export default MediaAndLightTab;
