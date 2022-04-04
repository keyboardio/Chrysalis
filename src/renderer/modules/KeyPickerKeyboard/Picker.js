import React, { Component } from "react";
import Styled from "styled-components";
import { KeyPicker } from "../KeyPickerKeyboard";

import { ButtonConfig } from "../../component/Button";
import { IconNote } from "../../component/Icon";

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
            <IconNote />
            <ButtonConfig buttonText="Play/Pause" />
            <ButtonConfig buttonText="Stop" />
            <ButtonConfig buttonText="Rewind" />
            <ButtonConfig buttonText="Forward" />
            <ButtonConfig buttonText="Shuffle" />
            <ButtonConfig buttonText="Sound More" />
            <ButtonConfig buttonText="Sound Less" />
            <ButtonConfig buttonText="Mute" />
          </div>
          <div className="keysRow keysTools">Tools</div>
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
