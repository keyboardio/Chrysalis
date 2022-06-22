import React, { Component } from "react";
import Styled from "styled-components";

import i18n from "../../i18n";

import Title from "../../component/Title";
import CallOut from "../../component/Callout";
import { ButtonConfig } from "../../component/Button";

const Styles = Styled.div`
width: 100%;
h3 {
    margin-bottom: 16px;
}
h4 {
    font-size: 16px;
    flex: 0 0 100%;
    width: 100%;
    margin-top: 24px;
}
.description {
    font-size: 14px;
    color: ${({ theme }) => theme.styles.macro.descriptionColor};
    font-weight: 500;
}
.keysButtonsList {
    margin-top: 8px;
}
.button-config {
    max-width: 125px;
    text-align: center;
}
`;

class NoKeyTransparentTab extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { keyCode, onKeySelect } = this.props;
    return (
      <Styles>
        <div className="tabContentWrapper">
          <div className="buttonsRow">
            <Title text={i18n.editor.standardView.noKeyTransparent} headingLevel={3} />
            <CallOut content={i18n.editor.standardView.callOut} size="sm" />

            <div className="keysButtonsList">
              <Title text={i18n.editor.standardView.noKey} headingLevel={4} />
              <p className="description">{i18n.editor.standardView.noKeyDescription}</p>
              <ButtonConfig
                buttonText={i18n.editor.standardView.noKey}
                onClick={() => {
                  onKeySelect(0);
                }}
                selected={keyCode.base ? (keyCode.base + keyCode.modified == 0 ? true : false) : keyCode == 0 ? true : false}
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
                selected={
                  keyCode.base ? (keyCode.base + keyCode.modified == 65535 ? true : false) : keyCode == 65535 ? true : false
                }
              />
            </div>
          </div>
        </div>
      </Styles>
    );
  }
}

export default NoKeyTransparentTab;
