import React, { Component } from "react";
import Styled from "styled-components";

import i18n from "../../i18n";

import Title from "../../component/Title";
import CallOut from "../../component/Callout";
import { KeyPickerReduced } from "../../modules/KeyPickerKeyboard";
import ModPicker from "../KeyPickerKeyboard/ModPicker";
import { RegularButton, ButtonConfig, ButtonMouse } from "../../component/Button";

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
import Callout from "../../component/Callout";

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

`;

class KeysTab extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { keyCode, code, isStandardView } = this.props;
    return (
      <Styles className={`${isStandardView ? "standardViewTab" : ""} tabsKey`}>
        <div className="tabContentWrapper">
          {isStandardView ? (
            <>
              <Title text={i18n.editor.standardView.keys.standardViewTitle} headingLevel={3} />
              <CallOut content={i18n.editor.standardView.keys.callOut} size="sm" />
            </>
          ) : (
            <Title text={i18n.editor.standardView.keys.keys} headingLevel={4} />
          )}
          <KeyPickerReduced
            onKeySelect={this.props.onKeyPress}
            code={isStandardView ? code : { base: 4, modified: 0 }}
            showSelected={isStandardView}
            keyCode={keyCode}
            disableMove={false}
            disableMods={false}
            actTab={"super"}
            superName={"superName"}
            selectedlanguage={"english"}
            kbtype={"iso"}
          />
          {isStandardView ? (
            <div className="enhanceKeys">
              <Title text={i18n.editor.standardView.keys.enhanceTitle} headingLevel={3} />
              <CallOut content={i18n.editor.standardView.keys.callOutEnhance} size="sm" />
              <div className="cardButtons">
                <Title text={i18n.editor.standardView.keys.addModifiers} headingLevel={4} />
                <p>{i18n.editor.standardView.keys.descriptionModifiers}</p>
                <div className="groupButtons">
                  <ModPicker keyCode={code} onKeySelect={this.props.onKeyPress} isStandardView={isStandardView} />
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </Styles>
    );
  }
}

export default KeysTab;
