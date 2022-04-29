import React, { Component } from "react";
import Styled from "styled-components";

import Form from "react-bootstrap/Form";
import i18n from "../../i18n";

import Title from "../../component/Title";
import Callout from "../../component/Callout";
import { RegularButton } from "../../component/Button";

import { IconArrowInBoxDown } from "../../component/Icon";

const Styles = Styled.div`
display: flex;
flex-wrap: wrap;
height: inherit;
h4 {
    font-size: 16px;
    margin-top: 32px;
    flex: 0 0 100%;
}
.w100 {
  width: 100%;
  flex: 0 0 100%;
}
.callOut {
  width: 100%;
  flex: 0 0 100%;
}
.form-control {
    color: ${({ theme }) => theme.styles.form.inputColor};
    background: ${({ theme }) => theme.styles.form.inputBackgroundColor};
    border-color: ${({ theme }) => theme.styles.form.inputBorderSolid};
    font-weight: 600;
    &:focus {
        background: ${({ theme }) => theme.styles.form.inputBackgroundColorActive};
        border-color: ${({ theme }) => theme.styles.form.inputBorderActive};
        box-shadow: none;
    }
    margin-bottom: 24px;
}
`;

class TextTab extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Styles>
        <div className="tabContentWrapper">
          <Callout content={i18n.editor.macros.textTabs.callout} className="w100" size="md" />
          <Title text={i18n.editor.macros.textTabs.title} headingLevel={4} />
          <Form.Control
            type="text"
            placeholder={i18n.editor.macros.textTabs.placeholder}
            value={this.props.addText}
            onChange={this.props.onTextChange}
            as="textarea"
            rows={3}
          />
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

export default TextTab;
