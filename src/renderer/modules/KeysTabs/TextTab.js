import React, { Component } from "react";
import Styled from "styled-components";

import Form from "react-bootstrap/Form";
import i18n from "../../i18n";

import Title from "../../component/Title";
import Callout from "../../component/Callout";
import { RegularButton } from "../../component/Button";

import { IconArrowInBoxDown } from "../../component/Icon";

const Styles = Styled.div`
h4 {
    font-size: 16px;
    margin-top: 32px;
}
.form-control {
    color: ${({ theme }) => theme.styles.form.inputColor};
    background: ${({ theme }) => theme.styles.form.inputBackgroundColor};
    border-color: ${({ theme }) => theme.styles.form.inputBorder};
    &:focus {
        background: ${({ theme }) => theme.styles.form.inputBackgroundColorActive};
        border-color: ${({ theme }) => theme.styles.form.inputBorderActive};
    }
}
`;

class TextTab extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Styles>
        <Callout content={i18n.editor.macros.textTabs.callout} className="mt-lg" size="md" />
        <Title text={i18n.editor.macros.textTabs.title} headingLevel={4} />
        <Form.Control
          type="text"
          placeholder={i18n.editor.macros.textTabs.placeholder}
          rows={50}
          value={this.props.addText}
          onChange={this.props.onTextChange}
        />
        <RegularButton
          buttonText={i18n.editor.macros.textTabs.buttonText}
          style="outline gradient"
          onClick={this.props.onAddText}
          icoSVG={<IconArrowInBoxDown />}
          icoPosition="right"
        />
      </Styles>
    );
  }
}

export default TextTab;
