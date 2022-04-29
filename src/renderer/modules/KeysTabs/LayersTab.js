import React, { Component } from "react";
import Styled from "styled-components";

import i18n from "../../i18n";

import Title from "../../component/Title";
import { RegularButton, ButtonConfig } from "../../component/Button";

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
`;

class LayersTab extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Styles>
        <div className="tabContentWrapper">
          <Title text={i18n.editor.layers.title} headingLevel={4} />
          <div className="cardButtons">
            <Title text={i18n.editor.layers.layerLock} headingLevel={4} />
            <p>{i18n.editor.layers.layerLockDescription}</p>
            <div className="groupButtons">
              <ButtonConfig buttonText="1" />
              <ButtonConfig buttonText="2" />
              <ButtonConfig buttonText="3" />
              <ButtonConfig buttonText="4" />
              <ButtonConfig buttonText="5" />
              <ButtonConfig buttonText="6" />
              <ButtonConfig buttonText="7" />
              <ButtonConfig buttonText="8" />
              <ButtonConfig buttonText="9" />
              <ButtonConfig buttonText="10" />
            </div>
          </div>
        </div>
        <div className="tabSaveButton">
          <RegularButton
            buttonText={i18n.editor.macros.textTabs.buttonText}
            style="outline gradient"
            onClick={this.props.onAddText}
            icoSVG={<IconArrowInBoxDown />}
            icoPosition="right"
          />
        </div>
      </Styles>
    );
  }
}

export default LayersTab;
