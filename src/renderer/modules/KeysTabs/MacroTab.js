import React, { Component } from "react";
import Styled from "styled-components";

import Form from "react-bootstrap/Form";
import i18n from "../../i18n";

import Title from "../../component/Title";
import Callout from "../../component/Callout";
import { Select } from "../../component/Select";
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
    margin-top: 24px;
}
.callOut {
    width: 100%;
    flex: 0 0 100%;
}
.w100 {
    width: 100%;
    flex: 0 0 100%;
}
.dropdown {
    max-width: 290px;
}
`;

class MacroTab extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { macros, selectedMacro } = this.props;
    const macrosAux = macros.map(item => {
      const macrosContainer = {};
      if (item.name == "") {
        macrosContainer.text = i18n.general.noname;
      } else {
        macrosContainer.text = item.name;
      }
      return macrosContainer;
    });

    console.log("Macros inside: ", selectedMacro);
    return (
      <Styles>
        <div className="tabContentWrapper">
          <Callout content={i18n.editor.macros.macroTab.callout} className="w100" size="md" />
          <Title text={i18n.editor.macros.macroTab.label} headingLevel={4} />
          <div className="w100">
            <Select value={macrosAux.length > 0 ? macrosAux[0].text : "Loading"} listElements={macrosAux} />
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

export default MacroTab;
