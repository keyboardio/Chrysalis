import React, { Component } from "react";
import Styled from "styled-components";

import i18n from "../../i18n";

import Title from "../../component/Title";
import { RegularButton, ButtonConfig } from "../../component/Button";

import { IconArrowInBoxDown } from "../../component/Icon";
import Callout from "../../component/Callout";

const Styles = Styled.div`
display: flex;
flex-wrap: wrap;
height: inherit;
h4 {
    font-size: 16px;
    flex: 0 0 100%;
}
.cardButtons {
  margin-top: 8px;
}
`;

class LayersStandardViewTab extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.layerShift = [
      { name: "1", keynum: 17450 },
      { name: "2", keynum: 17451 },
      { name: "3", keynum: 17452 },
      { name: "4", keynum: 17453 },
      { name: "5", keynum: 17454 },
      { name: "6", keynum: 17455 },
      { name: "7", keynum: 17456 },
      { name: "8", keynum: 17457 },
      { name: "9", keynum: 17458 },
      { name: "10", keynum: 17459 }
    ];
  }

  render() {
    const { action, keyCode, onKeySelect, activeTab } = this.props;
    const KC = keyCode.base + keyCode.modified;

    return (
      <Styles>
        <div className="tabContentWrapper">
          <Title text={i18n.editor.standardView.layers.title} headingLevel={4} />
          <Callout content={i18n.editor.standardView.layers.callOut} />
          <div className="cardButtons">
            <Title text={i18n.editor.standardView.layers.layerSwitch} headingLevel={4} />
            <p>{i18n.editor.standardView.layers.layerSwitchDescription}</p>
            <div className="groupButtons">
              {this.layerShift.map((item, id) => {
                return (
                  <ButtonConfig
                    key={`itemLayerShift-${id}`}
                    buttonText={item.name}
                    onClick={() => {
                      onKeySelect(item.keynum);
                    }}
                    selected={keyCode.modified > 0 && item.keynum == keyCode.base + keyCode.modified ? true : false}
                  />
                );
              })}
            </div>
          </div>
          <div className="cardButtons">
            <Title text={i18n.editor.standardView.layers.layerLock} headingLevel={4} />
            <p>{i18n.editor.standardView.layers.layerLockDescription}</p>
            <div className="groupButtons">
              {this.layerShift.map((item, id) => {
                return (
                  <ButtonConfig
                    key={`itemLayerShift-${id}`}
                    buttonText={item.name}
                    onClick={() => {
                      onKeySelect(item.keynum);
                    }}
                    selected={keyCode.modified > 0 && item.keynum == keyCode.base + keyCode.modified ? true : false}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </Styles>
    );
  }
}

export default LayersStandardViewTab;
