import React, { Component } from "react";
import Styled from "styled-components";

import Form from "react-bootstrap/Form";
import i18n from "../../i18n";

import Title from "../../component/Title";
import Callout from "../../component/Callout";
import { SelectMacro } from "../../component/Select";
import { RegularButton } from "../../component/Button";

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
.callOut {
    width: 100%;
    flex: 0 0 100%;
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
`;

class MacroTab extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { macros } = this.props;
    return (
      <Styles>
        <div className="tabContentWrapper">
          <Callout content={i18n.editor.macros.macroTab.callout} className="w100" size="md" />
          <Title text={i18n.editor.macros.macroTab.label} headingLevel={4} />
          <SelectMacro macros={macros} />
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

export default MacroTab;
