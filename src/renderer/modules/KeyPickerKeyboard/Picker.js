import React, { Component } from "react";
import Styled from "styled-components";
import { KeyPicker } from "../KeyPickerKeyboard";

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
  padding: 5px;
  .keyIcon {
    flex: 0 0 42px;
    text-align: center;
    align-self: center;
    color: ${({ theme }) => theme.colors.gray200};
    h4 {
      font-size: 11px;
      font-weight: 700;
      letter-spacing: 0.06em;
      margin: 0;
    }
  }
  .keyTitle {
    font-size: 11px;
    color: ${({ theme }) => theme.colors.gray25}; 
    display: flex;
    flex-grow: 1;
    align-self: center;
    line-height: 1.15em;
    flex-wrap: wrap;
    max-width: 66px;
    span {
      color: ${({ theme }) => theme.colors.gray200};
      display: block;
      flex: 0 0 100%;
    }
  }
}
.keysMediaTools {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 16px;
}
.keysContainerDropdowns {
  display: grid;
  grid-template-columns: 35% 35% auto;
  grid-gap: 16px;
}
.keysButtonsList {
  display: flex;
  flex-direction: row;
  flex-grow: 1;
}
.keysButtonsList .button-config {
  margin-left: 3px;
  height: 34px;
  display: flex;
  flex-grow: 1;
  text-align: center;
  padding: 5px 8px;
  justify-content: center;
  font-size: 14px;
} 
.keysMouseEvents .button-config {
  width: 55px;
}

`;

class Picker extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const { action, actions, onKeySelect, activeTab, selectedlanguage, kbtype, baseCode, modCode, disable, macros, keyCode } =
      this.props;

    return (
      <Style>
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
          keyCode={keyCode}
          macros={macros}
        />
      </Style>
    );
  }
}

export default Picker;
