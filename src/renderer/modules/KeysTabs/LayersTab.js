import React, { Component } from "react";
import Styled from "styled-components";

import i18n from "../../i18n";

import Title from "../../component/Title";
import Callout from "../../component/Callout";
import { ButtonConfig } from "../../component/Button";

import { IconArrowInBoxDown } from "../../component/Icon";

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
.tabContentWrapper {
  width: 100%;
}
&.tabsLayer {
  .cardButtons {
      border-bottom-left-radius: 0;
      border-bottom-right-radius: 0;
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

class LayersTab extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { keyCode, isStandardView, showLayerSwitch } = this.props;
    const layerDeltaSwitch = 17450;
    const layerDelta = 17492;
    return (
      <Styles className={`${isStandardView ? "standardViewTab" : ""} tabsLayer`}>
        <div className="tabContentWrapper">
          <Title text={i18n.editor.layers.title} headingLevel={isStandardView ? 3 : 4} />
          {isStandardView ? <Callout content={i18n.editor.standardView.layers.callOut} /> : null}
          {showLayerSwitch ? (
            <div className="cardButtons">
              <Title text={i18n.editor.standardView.layers.layerSwitch} headingLevel={4} />
              <p>{i18n.editor.standardView.layers.layerSwitchDescription}</p>
              <div className="groupButtons">
                <ButtonConfig
                  buttonText="1"
                  onClick={() => {
                    this.props.onLayerPress(layerDeltaSwitch + 0);
                  }}
                  selected={layerDeltaSwitch + 0 == keyCode ? true : false}
                />
                <ButtonConfig
                  buttonText="2"
                  onClick={() => {
                    this.props.onLayerPress(layerDeltaSwitch + 1);
                  }}
                  selected={layerDeltaSwitch + 1 == keyCode ? true : false}
                />
                <ButtonConfig
                  buttonText="3"
                  onClick={() => {
                    this.props.onLayerPress(layerDeltaSwitch + 2);
                  }}
                  selected={layerDeltaSwitch + 2 == keyCode ? true : false}
                />
                <ButtonConfig
                  buttonText="4"
                  onClick={() => {
                    this.props.onLayerPress(layerDeltaSwitch + 3);
                  }}
                  selected={layerDeltaSwitch + 3 == keyCode ? true : false}
                />
                <ButtonConfig
                  buttonText="5"
                  onClick={() => {
                    this.props.onLayerPress(layerDeltaSwitch + 4);
                  }}
                  selected={layerDeltaSwitch + 4 == keyCode ? true : false}
                />
                <ButtonConfig
                  buttonText="6"
                  onClick={() => {
                    this.props.onLayerPress(layerDeltaSwitch + 5);
                  }}
                  selected={layerDeltaSwitch + 5 == keyCode ? true : false}
                />
                <ButtonConfig
                  buttonText="7"
                  onClick={() => {
                    this.props.onLayerPress(layerDeltaSwitch + 6);
                  }}
                  selected={layerDeltaSwitch + 6 == keyCode ? true : false}
                />
                <ButtonConfig
                  buttonText="8"
                  onClick={() => {
                    this.props.onLayerPress(layerDeltaSwitch + 7);
                  }}
                  selected={layerDeltaSwitch + 7 == keyCode ? true : false}
                />
                <ButtonConfig
                  buttonText="9"
                  onClick={() => {
                    this.props.onLayerPress(layerDeltaSwitch + 8);
                  }}
                  selected={layerDeltaSwitch + 8 == keyCode ? true : false}
                />
                <ButtonConfig
                  buttonText="10"
                  onClick={() => {
                    this.props.onLayerPress(layerDeltaSwitch + 9);
                  }}
                  selected={layerDeltaSwitch + 9 == keyCode ? true : false}
                />
              </div>
            </div>
          ) : null}
          <div className="cardButtons">
            <Title text={i18n.editor.layers.layerLock} headingLevel={4} />
            <p>
              {isStandardView ? i18n.editor.standardView.layers.layerLockDescription : i18n.editor.layers.layerLockDescription}
            </p>
            <div className="groupButtons">
              <ButtonConfig
                buttonText="1"
                onClick={() => {
                  this.props.onLayerPress(layerDelta + 0);
                }}
                selected={layerDelta + 0 == keyCode ? true : false}
              />
              <ButtonConfig
                buttonText="2"
                onClick={() => {
                  this.props.onLayerPress(layerDelta + 1);
                }}
                selected={layerDelta + 1 == keyCode ? true : false}
              />
              <ButtonConfig
                buttonText="3"
                onClick={() => {
                  this.props.onLayerPress(layerDelta + 2);
                }}
                selected={layerDelta + 2 == keyCode ? true : false}
              />
              <ButtonConfig
                buttonText="4"
                onClick={() => {
                  this.props.onLayerPress(layerDelta + 3);
                }}
                selected={layerDelta + 3 == keyCode ? true : false}
              />
              <ButtonConfig
                buttonText="5"
                onClick={() => {
                  this.props.onLayerPress(layerDelta + 4);
                }}
                selected={layerDelta + 4 == keyCode ? true : false}
              />
              <ButtonConfig
                buttonText="6"
                onClick={() => {
                  this.props.onLayerPress(layerDelta + 5);
                }}
                selected={layerDelta + 5 == keyCode ? true : false}
              />
              <ButtonConfig
                buttonText="7"
                onClick={() => {
                  this.props.onLayerPress(layerDelta + 6);
                }}
                selected={layerDelta + 6 == keyCode ? true : false}
              />
              <ButtonConfig
                buttonText="8"
                onClick={() => {
                  this.props.onLayerPress(layerDelta + 7);
                }}
                selected={layerDelta + 7 == keyCode ? true : false}
              />
              <ButtonConfig
                buttonText="9"
                onClick={() => {
                  this.props.onLayerPress(layerDelta + 8);
                }}
                selected={layerDelta + 8 == keyCode ? true : false}
              />
              <ButtonConfig
                buttonText="10"
                onClick={() => {
                  this.props.onLayerPress(layerDelta + 9);
                }}
                selected={layerDelta + 9 == keyCode ? true : false}
              />
            </div>
          </div>
        </div>
      </Styles>
    );
  }
}

export default LayersTab;
