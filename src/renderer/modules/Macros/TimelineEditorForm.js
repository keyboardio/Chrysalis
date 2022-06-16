import React, { Component } from "react";
import Styled from "styled-components";
import i18n from "../../i18n";

import TimelineEditorMacroTable from "./TimelineEditorMacroTable";

const Styles = Styled.div`
.root {
  display: flex;
  flex-wrap: wrap;
}
.margin {
  margin: 1rem;
}
.textField {
  inline-size: -webkit-fill-available;
  display: flex;
}
.code {
  width: -webkit-fill-available;
}
.button {
  float: right;
}
.buttons {
  display: flex;
  position: relative;
  place-content: space-between;
  margin-top: 1rem;
}
.centered {
  place-content: center;
}
.bg {
  margin-right: 0px;
}
.form-row {
  padding: 0;
}
.row-buttons {
  justify-content: center;
}
.applybutton {
  float: right;
  margin-right: 1rem;
}


position: relative;
&:before,
&:after {
  position: absolute;
  top: 0;
  content: "";
  width: 62px;
  height: 100%;
  background: ${({ theme }) => theme.styles.macro.timelineHiddenTracking};
  z-index: 1;
}
&:before {
  left: 0;
  z-index: 2;
  background: ${({ theme }) => theme.styles.macro.timelineHiddenTrackingBefore};
  width: 42px;
}
&:after {
  right: 0;

}
`;

class MacroForm extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { macro, updateActions, keymapDB, componentWidth } = this.props;
    if (macro.actions === undefined) {
      return <div>{i18n.editor.macros.macroTab.noMacro}</div>;
    }
    return (
      <Styles>
        <TimelineEditorMacroTable
          key={JSON.stringify(macro.actions)}
          macro={macro}
          updateActions={updateActions}
          keymapDB={keymapDB}
          componentWidth={componentWidth}
        />
      </Styles>
    );
  }
}
export default MacroForm;
