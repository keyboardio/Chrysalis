import React, { Component } from "react";
import Styled from "styled-components";

import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import i18n from "../../i18n";

import Title from "../../component/Title";
import { RegularButton } from "../../component/Button";
import { CustomRadioCheckBox } from "../../component/Form";

import { IconArrowInBoxDown, IconMediaShuffle } from "../../component/Icon";

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
    max-width: 280px;
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
  .customCheckbox + .customCheckbox {
    margin-left: 16px;
  }
}
.inputMax {
  text-align: right;
}
.inputGroupRandom {
  position: relative;
  .inputIcon {
    position: absolute;
    top: 50%;
    left: 95px;
    transform: translate3d(0, -50%, 0);
    width: 32px;
    height: 32px;
    padding: 4px;
    border-radius: 50%;
    z-index: 3;
    background-color: ${({ theme }) => theme.styles.form.inputGroup.background};
  }
  .inputMin {
    border-right-color: transparent;
    &:focus {
      border-right: 1px solid ${({ theme }) => theme.styles.form.inputBorderActive};
    }
  }
  .inputMax {
    border-left-color: transparent;
    &:focus {
      border-left: 1px solid ${({ theme }) => theme.styles.form.inputBorderActive};
    }
  }
  .form-control {
    background-color: ${({ theme }) => theme.styles.form.inputGroup.background};
  }
}
`;

class DelayTab extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fixedSelected: true,
      fixedValue: 0,
      randomValue: { min: 0, max: 0 }
    };
  }

  setFixedSelected = () => {
    this.setState({ fixedSelected: true });
  };

  setRandomSelected = () => {
    this.setState({ fixedSelected: false });
  };

  updateFixed = e => {
    const value = parseInt(e.target.value);
    this.setState({ fixedValue: value > 65535 ? 65535 : value });
  };

  updateRandomMin = e => {
    let randomValue = this.state.randomValue;
    let valueMin = parseInt(e.target.value);
    valueMin = valueMin > 65535 ? 65535 : valueMin;
    if (valueMin > randomValue.max) {
      randomValue.max = valueMin;
    }
    randomValue.min = valueMin;
    this.setState({ randomValue: randomValue });
  };

  updateRandomMax = e => {
    let randomValue = this.state.randomValue;
    let valueMax = parseInt(e.target.value);
    valueMax = valueMax > 65535 ? 65535 : valueMax;
    if (valueMax < randomValue.min) {
      randomValue.min = valueMax;
    }
    randomValue.max = valueMax;
    this.setState({ randomValue: randomValue });
  };

  addDelay = () => {
    console.log("add delay", this.state.fixedSelected, this.state.fixedValue, this.state.randomValue);
    if (this.state.fixedSelected) {
      this.props.onAddDelay(this.state.fixedValue, 2);
    } else {
      this.props.onAddDelayRnd(this.state.randomValue.min, this.state.randomValue.max, 2);
    }
    // clean state
    this.setState({
      fixedSelected: true,
      fixedValue: 0,
      randomValue: { min: 0, max: 0 }
    });
  };

  render() {
    const { fixedSelected, fixedValue, randomValue } = this.state;
    const classFixed = fixedSelected ? "active" : "inactive";
    const classRandom = fixedSelected ? "inactive" : "active";
    return (
      <Styles>
        <div className="tabContentWrapper">
          <Title text={i18n.editor.macros.delayTabs.title} headingLevel={4} />
          <div className="formWrapper">
            <CustomRadioCheckBox
              label="Fixed value"
              onClick={this.setFixedSelected}
              type="radio"
              name="addDelay"
              id="addFixedDelay"
              className={classFixed}
            />
            <CustomRadioCheckBox
              label="Random value"
              onClick={this.setRandomSelected}
              type="radio"
              name="addDelay"
              id="addRandomDelay"
              tooltip="You can configure a maximum value and minimum value for each time the macro is executed Bazecor choose a delay between this range."
              className={classRandom}
            />
          </div>
          <div className="inputsWrapper mt-3">
            {this.state.fixedSelected ? (
              <div className="inputGroupFixed">
                <InputGroup>
                  <Form.Control
                    placeholder={i18n.editor.macros.delayTabs.title}
                    min={0}
                    max={65535}
                    type="number"
                    onChange={this.updateFixed}
                    value={fixedValue}
                  />
                  <InputGroup.Text>ms</InputGroup.Text>
                </InputGroup>
              </div>
            ) : (
              <div className="inputGroupRandom">
                <InputGroup>
                  <Form.Control
                    className="inputMin"
                    placeholder="Min."
                    min={0}
                    type="number"
                    onChange={this.updateRandomMin}
                    value={randomValue.min}
                  />
                  <Form.Control
                    className="inputMax"
                    placeholder="Max"
                    min={1}
                    type="number"
                    onChange={this.updateRandomMax}
                    value={randomValue.max}
                  />
                  <InputGroup.Text>ms</InputGroup.Text>
                </InputGroup>
                <div className="inputIcon">
                  <IconMediaShuffle />
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="tabSaveButton">
          <RegularButton
            buttonText={i18n.editor.macros.textTabs.buttonText}
            style="outline gradient"
            onClick={this.addDelay}
            icoSVG={<IconArrowInBoxDown />}
            icoPosition="right"
          />
        </div>
      </Styles>
    );
  }
}

export default DelayTab;
