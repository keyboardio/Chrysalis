import React, { Component } from "react";
import Styled from "styled-components";

import i18n from "../../i18n";

import Title from "../../component/Title";
import Callout from "../../component/Callout";
import { ButtonConfig } from "../../component/Button";

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
&.tabsOneShot {
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

class OneShotTab extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { keyCode, onKeySelect, isStandardView } = this.props;
    const OneShotDeltaMod = 49153;
    const OneShotDeltaLayer = 49161;
    return (
      <Styles className={`${isStandardView ? "standardViewTab" : ""} tabsOneShot`}>
        <div className="tabContentWrapper">
          {isStandardView ? (
            <>
              <Title text={i18n.editor.standardView.oneShot.title} headingLevel={3} />
              <Callout content={i18n.editor.standardView.oneShot.callOut} size="sm" />
            </>
          ) : null}

          <div className="cardButtons">
            <Title text={i18n.editor.standardView.oneShot.titleModifiers} headingLevel={4} />
            <p className="description">{i18n.editor.standardView.oneShot.modifiersDescription}</p>
            <div className="groupButtons groupButtonsGrid">
              <div className="buttonsGrid">
                <ButtonConfig
                  buttonText={i18n.editor.standardView.oneShot.leftControl}
                  onClick={() => onKeySelect(OneShotDeltaMod + 0)}
                  selected={isStandardView ? (keyCode === OneShotDeltaMod + 0 ? true : false) : false}
                />
                <ButtonConfig
                  buttonText={i18n.editor.standardView.oneShot.leftShift}
                  onClick={() => onKeySelect(OneShotDeltaMod + 1)}
                  selected={isStandardView ? (keyCode === OneShotDeltaMod + 1 ? true : false) : false}
                />
                <ButtonConfig
                  buttonText={i18n.editor.standardView.oneShot.leftAlt}
                  onClick={() => onKeySelect(OneShotDeltaMod + 2)}
                  selected={isStandardView ? (keyCode === OneShotDeltaMod + 2 ? true : false) : false}
                />
                <ButtonConfig
                  buttonText={i18n.editor.standardView.oneShot.leftOS}
                  onClick={() => onKeySelect(OneShotDeltaMod + 3)}
                  selected={isStandardView ? (keyCode === OneShotDeltaMod + 3 ? true : false) : false}
                />
                <ButtonConfig
                  buttonText={i18n.editor.standardView.oneShot.rightControl}
                  onClick={() => onKeySelect(OneShotDeltaMod + 4)}
                  selected={isStandardView ? (keyCode === OneShotDeltaMod + 4 ? true : false) : false}
                />
                <ButtonConfig
                  buttonText={i18n.editor.standardView.oneShot.rightShift}
                  onClick={() => onKeySelect(OneShotDeltaMod + 5)}
                  selected={isStandardView ? (keyCode === OneShotDeltaMod + 5 ? true : false) : false}
                />
                <ButtonConfig
                  buttonText={i18n.editor.standardView.oneShot.altGr}
                  onClick={() => onKeySelect(OneShotDeltaMod + 6)}
                  selected={isStandardView ? (keyCode === OneShotDeltaMod + 6 ? true : false) : false}
                />
                <ButtonConfig
                  buttonText={i18n.editor.standardView.oneShot.rightOS}
                  onClick={() => onKeySelect(OneShotDeltaMod + 7)}
                  selected={isStandardView ? (keyCode === OneShotDeltaMod + 7 ? true : false) : false}
                />
              </div>
            </div>
          </div>
          <div className="cardButtons">
            <Title text={i18n.editor.standardView.oneShot.titleLayers} headingLevel={4} />
            <p className="description">{i18n.editor.standardView.oneShot.layersDescription}</p>
            <div className="groupButtons">
              <ButtonConfig
                buttonText="1"
                onClick={() => onKeySelect(OneShotDeltaLayer + 0)}
                selected={isStandardView ? (keyCode === OneShotDeltaLayer + 0 ? true : false) : false}
              />
              <ButtonConfig
                buttonText="2"
                onClick={() => onKeySelect(OneShotDeltaLayer + 1)}
                selected={isStandardView ? (keyCode === OneShotDeltaLayer + 1 ? true : false) : false}
              />
              <ButtonConfig
                buttonText="3"
                onClick={() => onKeySelect(OneShotDeltaLayer + 2)}
                selected={isStandardView ? (keyCode === OneShotDeltaLayer + 2 ? true : false) : false}
              />
              <ButtonConfig
                buttonText="4"
                onClick={() => onKeySelect(OneShotDeltaLayer + 3)}
                selected={isStandardView ? (keyCode === OneShotDeltaLayer + 3 ? true : false) : false}
              />
              <ButtonConfig
                buttonText="5"
                onClick={() => onKeySelect(OneShotDeltaLayer + 4)}
                selected={isStandardView ? (keyCode === OneShotDeltaLayer + 4 ? true : false) : false}
              />
              <ButtonConfig
                buttonText="6"
                onClick={() => onKeySelect(OneShotDeltaLayer + 5)}
                selected={isStandardView ? (keyCode === OneShotDeltaLayer + 5 ? true : false) : false}
              />
              <ButtonConfig
                buttonText="7"
                onClick={() => onKeySelect(OneShotDeltaLayer + 6)}
                selected={isStandardView ? (keyCode === OneShotDeltaLayer + 6 ? true : false) : false}
              />
              <ButtonConfig
                buttonText="8"
                onClick={() => onKeySelect(OneShotDeltaLayer + 7)}
                selected={isStandardView ? (keyCode === OneShotDeltaLayer + 7 ? true : false) : false}
              />
              {/* <ButtonConfig
                buttonText="9"
                onClick={() => onKeySelect(OneShotDeltaLayer + 8)}
                selected={isStandardView ? (keyCode === OneShotDeltaLayer + 8 ? true : false) : false}
              />
              <ButtonConfig
                buttonText="10"
                onClick={() => onKeySelect(OneShotDeltaLayer + 9)}
                selected={isStandardView ? (keyCode === OneShotDeltaLayer + 9 ? true : false) : false}
              /> */}
            </div>
          </div>
        </div>
      </Styles>
    );
  }
}

export default OneShotTab;
