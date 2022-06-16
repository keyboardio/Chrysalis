import React, { Component } from "react";
import Styled from "styled-components";
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
    this.state = {
      selected: 0 === props.selectedMacro ? 1 : 0
    };
  }

  // update value when dropdown is changed
  changeSelected = selected => {
    this.setState({ selected });
  };

  // sendMacro function to props onMacrosPress function to send macro to MacroCreator
  sendMacro = () => {
    this.props.onMacrosPress(parseInt(this.state.selected) + 53852);
  };

  render() {
    const { macros, selectedMacro } = this.props;
    const macrosAux = macros.map((item, index) => {
      const macrosContainer = {};
      if (item.name == "") {
        macrosContainer.text = i18n.general.noname;
      } else {
        macrosContainer.text = item.name;
      }
      macrosContainer.value = index;
      macrosContainer.disabled = index === selectedMacro;
      return macrosContainer;
    });

    return (
      <Styles>
        <div className="tabContentWrapper">
          <Callout content={i18n.editor.macros.macroTab.callout} className="w100" size="md" />
          <Title text={i18n.editor.macros.macroTab.label} headingLevel={4} />
          <div className="w100">
            <Select
              value={macrosAux.length > 0 ? macrosAux[this.state.selected].text : "Loading"}
              listElements={macrosAux}
              onSelect={this.changeSelected}
            />
          </div>
        </div>
        <div className="tabSaveButton">
          <RegularButton
            buttonText={i18n.editor.macros.textTabs.buttonText}
            style="outline gradient"
            onClick={this.sendMacro}
            icoSVG={<IconArrowInBoxDown />}
            icoPosition="right"
          />
        </div>
      </Styles>
    );
  }
}

export default MacroTab;
