import React, { Component } from "react";
import Styled from "styled-components";

import i18n from "../../i18n";

import Title from "../../component/Title";
import { KeyPickerReduced } from "../../modules/KeyPickerKeyboard";
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
    return (
      <Styles>
        <div className="tabContentWrapper">
          <Title text="Keys" headingLevel={4} />
          <KeyPickerReduced
            onKeySelect={this.props.onKeyPress}
            code={{ base: 4, modified: 0 }}
            disableMove={false}
            disableMods={false}
            actTab={"super"}
            superName={"superName"}
            selectedlanguage={"english"}
            kbtype={"iso"}
          />
        </div>
      </Styles>
    );
  }
}

export default KeysTab;
