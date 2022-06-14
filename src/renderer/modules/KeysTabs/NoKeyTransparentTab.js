import React, { Component } from "react";
import Styled from "styled-components";

import i18n from "../../i18n";

import Title from "../../component/Title";
import CallOut from "../../component/Callout";
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

class NoKeyTransparentTab extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      action,
      actions,
      code,
      disableMods,
      disableMove,
      disableAll,
      selectedlanguage,
      superkeys,
      selKeys,
      kbtype,
      macros,
      keyCode,
      onKeySelect,
      activeTab
    } = this.props;
    return (
      <Styles>
        <div className="tabContentWrapper">
          <div className="buttonsRow">
            <Title text={i18n.editor.standardView.noKeyTransparent} headingLevel={4} />
            <CallOut content={i18n.editor.standardView.CallOut} />

            <div className="keysButtonsList">
              <Title text={i18n.editor.standardView.noKey} headingLevel={4} />
              <p className="description">{i18n.editor.standardView.noKeyDescription}</p>
              <ButtonConfig
                buttonText={i18n.editor.standardView.noKey}
                onClick={() => {
                  onKeySelect(0);
                }}
                selected={keyCode.base + keyCode.modified == 0 ? true : false}
              />
            </div>
            <div className="keysButtonsList">
              <Title text={i18n.editor.standardView.transparent} headingLevel={4} />
              <p className="description">{i18n.editor.standardView.transparentDescription}</p>
              <ButtonConfig
                buttonText={i18n.editor.standardView.transparent}
                onClick={() => {
                  onKeySelect(65535);
                }}
                selected={keyCode.base + keyCode.modified == 65535 ? true : false}
              />
            </div>
          </div>
        </div>
      </Styles>
    );
  }
}

export default NoKeyTransparentTab;
