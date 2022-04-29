import React, { Component } from "react";
import Styled from "styled-components";

import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import i18n from "../../i18n";

import Title from "../../component/Title";
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
.description {
    font-size: 14px;
    color: ${({ theme }) => theme.styles.macro.descriptionColor};
}
.form-control {
    color: ${({ theme }) => theme.styles.form.inputColor};
    background: ${({ theme }) => theme.styles.form.inputBackgroundColor};
    border-color: ${({ theme }) => theme.styles.form.inputBorder};
    font-weight: 600;
    &:focus {
        background: ${({ theme }) => theme.styles.form.inputBackgroundColorActive};
        border-color: ${({ theme }) => theme.styles.form.inputBorderActive};
        box-shadow: none;
    }
    margin-bottom: 24px;
}
`;

class DelayTab extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Styles>
        <div className="tabContentWrapper">
          <Title text={i18n.editor.macros.delayTabs.title} headingLevel={4} />
          <p className="description">{i18n.editor.macros.delayTabs.description}</p>
          <InputGroup className="mb-3">
            <Form.Control
              placeholder={i18n.editor.macros.delayTabs.title}
              aria-label="Recipient's username"
              aria-describedby="basic-addon2"
              value={100}
              type="number"
            />
            <InputGroup.Text id="basic-addon2">ms</InputGroup.Text>
          </InputGroup>
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

export default DelayTab;
