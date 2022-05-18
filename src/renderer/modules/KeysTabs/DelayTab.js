import React, { Component } from "react";
import Styled from "styled-components";

import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import i18n from "../../i18n";

import Title from "../../component/Title";
import { RegularButton } from "../../component/Button";
import { CustomRadioCheckBox } from "../../component/Form";

import { IconArrowInBoxDown } from "../../component/Icon";

const Styles = Styled.div`
display: flex;
flex-wrap: wrap;
height: inherit;
h4 {
    font-size: 16px;
    flex: 0 0 100%;
    width: 100%;
}
.description {
    font-size: 14px;
    color: ${({ theme }) => theme.styles.macro.descriptionColor};
    flex: 0 0 100%;
    width: 100%;
}
.form-control {
    color: ${({ theme }) => theme.styles.form.inputColor};
    background: ${({ theme }) => theme.styles.form.inputBackgroundColor};
    border-color: ${({ theme }) => theme.styles.form.inputBorderSolid};
    font-weight: 600;
    padding: 16px;
    height: auto;
    &:focus {
        background: ${({ theme }) => theme.styles.form.inputBackgroundColorActive};
        border-color: ${({ theme }) => theme.styles.form.inputBorderActive};
        box-shadow: none;
    }
    margin-bottom: 0;
}
.input-group {
    max-width: 290px;
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
    .input-group-text {
        margin-left: -1px;
        font-weight: 600;
        padding: 16px 18px;
        color: ${({ theme }) => theme.styles.form.inputGroupColor};
        background: ${({ theme }) => theme.styles.form.inputGroupBackground};
        border-top-left-radius: 0;
        border-bottom-left-radius: 0;
        border-color: ${({ theme }) => theme.styles.form.inputBorderSolid};
    }

}

.formWrapper {
  display: flex;
  flex: 0 0 100%;
}
`;

class DelayTab extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fixedValue: true,
      randomValue: { min: 0, max: 0 }
    };
  }

  setFixedValue = () => {
    this.setState({ fixedValue: true });
  };

  setRandomValue = () => {
    this.setState({ fixedValue: false });
  };

  render() {
    return (
      <Styles>
        <div className="tabContentWrapper">
          <Title text={i18n.editor.macros.delayTabs.title} headingLevel={4} />
          <div className="formWrapper">
            <CustomRadioCheckBox
              label="Fixed value"
              onClick={this.setFixedValue}
              type="radio"
              name="addDelay"
              id="addFixedDelay"
            />
            <CustomRadioCheckBox
              label="Random value"
              onClick={this.setRandomValue}
              type="radio"
              name="addDelay"
              id="addRandomDelay"
              tooltip="You can configure a maximum value and minimum value for each time the macro is executed Bazecor choose a delay between this range."
            />
          </div>
          <div className="inputsrapper">
            {this.state.fixedValue ? (
              <InputGroup>
                <Form.Control placeholder={i18n.editor.macros.delayTabs.title} min={0} type="number" />
                <InputGroup.Text>ms</InputGroup.Text>
              </InputGroup>
            ) : (
              <InputGroup>
                <Form.Control placeholder="Min." min={0} type="number" />
                <Form.Control placeholder="Max" min={1} type="number" />
                <InputGroup.Text>ms</InputGroup.Text>
              </InputGroup>
            )}
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

export default DelayTab;
