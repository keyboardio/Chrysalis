import React, { Component } from "react";
import Styled from "styled-components";

import i18n from "../../i18n";

import Title from "../../component/Title";
import CallOut from "../../component/Callout";
import { KeyPickerReduced } from "../../modules/KeyPickerKeyboard";
import ModPicker from "../KeyPickerKeyboard/ModPicker";
import DualFunctionPicker from "../KeyPickerKeyboard/DualFunctionPicker";
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
.groupButtons {
  padding: 0; 
}
.cardButtons .groupButtons .button-config {
  padding: 8px 2px;
}
.cardButtonsModifier .groupButtons{
  background-color: transparent;
  .modPickerInner {
    padding: 0 0 0 4px;
  }
}
.cardButtonsDual {
  .groupButtons {
    padding: 4px 2px;
  }
}
.isDisabled {
  opacity: 0.35;
  &:hover: not-allowed;
}
&.tabsKey {
  .cardButtons {
      border-bottom-left-radius: 0;
      border-bottom-right-radius: 0;
      padding: 8px 16px;
      h4 {
        font-size: 14px; 
        margin-top: 2px;
        margin-bottom: 2px;
      }
  }
  .cardButtons + .cardButtons {
      margin-top: 2px;
      border-bottom-left-radius: 6px;
      border-bottom-right-radius: 6px;
      border-top-left-radius: 0;
      border-top-right-radius: 0;
  }
}
`;

class KeysTab extends Component {
  constructor(props) {
    super(props);
    this.appliedMod = Array(7936)
      .fill()
      .map((_, idx) => 256 + idx);
  }

  render() {
    const { action, actions, keyCode, code, isStandardView, actTab, superkeyAction, kbtype } = this.props;
    return (
      <Styles className={`${isStandardView ? "standardViewTab" : ""} tabsKey`}>
        <div className="tabContentWrapper">
          {isStandardView ? (
            <>
              <Title
                text={i18n.editor.standardView.keys.standardViewTitle}
                headingLevel={3}
                className="counterIndicator counter1"
              />
              <CallOut content={i18n.editor.standardView.keys.callOut} className="reduceMargin" size="sm" />
            </>
          ) : (
            <Title text={i18n.editor.standardView.keys.keys} headingLevel={4} />
          )}
          <KeyPickerReduced
            actions={actions}
            action={action}
            onKeySelect={this.props.onKeyPress}
            code={isStandardView ? code : { base: 4, modified: 0 }}
            showSelected={isStandardView}
            keyCode={keyCode}
            disableMove={false}
            // disableMods={false}
            disableMods={(superkeyAction == 0 || superkeyAction == 3) && actTab == "super" ? true : false}
            //disableMove={![0, 3].includes(actions) && actTab == "super"}
            actTab={actTab}
            superName={"superName"}
            selectedlanguage={"english"}
            kbtype={kbtype}
          />
          {isStandardView ? (
            <div className={`enhanceKeys ${(superkeyAction == 0 || superkeyAction == 3) && actTab == "super" ? "disabled" : ""}`}>
              <Title
                text={i18n.editor.standardView.keys.enhanceTitle}
                headingLevel={3}
                className="counterIndicator counter2 mt-2"
              />
              <CallOut content={i18n.editor.standardView.keys.callOutEnhance} size="sm" />
              <div className="cardButtons cardButtonsModifier">
                <Title text={i18n.editor.standardView.keys.addModifiers} headingLevel={4} />
                <p>{i18n.editor.standardView.keys.descriptionModifiers}</p>
                <ModPicker keyCode={code} onKeySelect={this.props.onKeyPress} isStandardView={isStandardView} />
              </div>
              {actTab != "super" ? (
                <div className="cardButtons cardButtonsDual">
                  <Title text={i18n.editor.standardView.keys.addDualFunction} headingLevel={4} />
                  <p>{i18n.editor.standardView.keys.dualFunctionDescription}</p>
                  <DualFunctionPicker
                    keyCode={code}
                    onKeySelect={this.props.onKeyPress}
                    activeTab={actTab}
                    isStandardView={isStandardView}
                  />
                </div>
              ) : (
                ""
              )}
            </div>
          ) : null}
        </div>
      </Styles>
    );
  }
}

export default KeysTab;
