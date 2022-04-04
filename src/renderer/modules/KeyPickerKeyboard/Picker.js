import React, { Component } from "react";
import Styled from "styled-components";
import { KeyPicker } from "../KeyPickerKeyboard";

import { ButtonConfig } from "../../component/Button";

import {
  IconNote,
  IconLEDNextEffects,
  IconLEDPreviousEffect,
  IconMediaForward,
  IconMediaPlayPause,
  IconMediaRewind,
  IconMediaShuffle,
  IconMediaSoundLess,
  IconMediaSoundMore,
  IconMediaSoundMute,
  IconMediaStop,
  IconToolsCalculator,
  IconToolsCamera,
  IconToolsEject,
  IconToolsBrightnessLess,
  IconToolsBrightnessMore,
  IconWrench
} from "../../component/Icon";

const Style = Styled.div`
.keysContainer {

}
.keysContainer + .keysContainer {
  margin-top: 8px;
}
.keysRow {
  display: flex;
  flex-wrap: nowrap;
  background: rgba(48, 51, 73, 0.6);
  border-radius: 6px;
  padding: 3px;
}
.keysMediaTools {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 24px;
}

`;

class Picker extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const { action, actions, onKeySelect, activeTab, selectedlanguage, kbtype, baseCode, modCode, disable } = this.props;

    return (
      <Style>
        <div className="keysContainer">
          <div className="keysRow keysOrdinaryKeyboard">
            <KeyPicker
              onKeySelect={e => onKeySelect(e)}
              code={{
                base: actions[action] > 255 ? baseCode : actions[action],
                modified: modCode
              }}
              disableMods={[0, 3].includes(action) && activeTab == "super"}
              disableMove={![0, 3].includes(action) && activeTab == "super"}
              disableAll={disable}
              selectedlanguage={selectedlanguage}
              kbtype={kbtype}
            />
          </div>
        </div>
        <div className="keysContainer">
          <div className="keysRow keysMacros">Macros</div>
          <div className="keysRow keysLayerLock">Layer lock</div>
          <div className="keysRow keysLED">LED</div>
        </div>
        <div className="keysContainer keysMediaTools">
          <div className="keysRow keysMedia">
            <div className="keyIcon">
              <IconNote />
            </div>
            <div className="keysButtonsList">
              <ButtonConfig tooltip="Play/Pause" tooltipDelay={100} icoSVG={<IconMediaPlayPause />} />
              <ButtonConfig tooltip="Stop" tooltipDelay={100} icoSVG={<IconMediaStop />} />
              <ButtonConfig tooltip="Rewind" tooltipDelay={100} icoSVG={<IconMediaRewind />} />
              <ButtonConfig tooltip="Forward" tooltipDelay={100} icoSVG={<IconMediaForward />} />
              <ButtonConfig tooltip="Shuffle" tooltipDelay={100} icoSVG={<IconMediaShuffle />} />
              <ButtonConfig tooltip="Sound More" tooltipDelay={100} icoSVG={<IconMediaSoundMore />} />
              <ButtonConfig tooltip="Sound Less" tooltipDelay={100} icoSVG={<IconMediaSoundLess />} />
              <ButtonConfig tooltip="Mute" tooltipDelay={100} icoSVG={<IconMediaSoundMute />} />
            </div>
          </div>
          <div className="keysRow keysTools">
            <div className="keyIcon">
              <IconWrench />
            </div>
            <div className="keysButtonsList">
              <ButtonConfig tooltip="Eject" tooltipDelay={100} icoSVG={<IconToolsEject />} />
              <ButtonConfig tooltip="Calculator" tooltipDelay={100} icoSVG={<IconToolsCalculator />} />
              <ButtonConfig tooltip="IconToolsCamera" tooltipDelay={100} icoSVG={<IconToolsCamera />} />
              <ButtonConfig tooltip="Brightnress More" tooltipDelay={100} icoSVG={<IconToolsBrightnessMore />} />
              <ButtonConfig tooltip="Brightnress Less" tooltipDelay={100} icoSVG={<IconToolsBrightnessLess />} />
            </div>
          </div>
        </div>
        <div className="keysContainer">
          <div className="keysRow keysMouseClick">
            Mouse <span>Click</span>
          </div>
          <div className="keysRow keysMouseMovement">
            Mouse <span>Movement</span>
          </div>
          <div className="keysRow keysMouseWheel">
            Mouse <span>Wheel</span>
          </div>
        </div>
      </Style>
    );
  }
}

export default Picker;
