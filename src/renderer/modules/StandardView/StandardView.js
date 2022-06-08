import React from "react";

import Styled from "styled-components";
import i18n from "../../i18n";

//component
import { RegularButton } from "../../component/Button";
import KeyVisualizer from "../KeyVisualizer";

const Styles = Styled.div`
.standardView {
    position: fixed;
    width: 100%;
    height: 100vh;
    top: 0;
    left: 0;
    background-color: rgba(50,50,50,0.8);
    z-index: 500;
    .standardViewInner {
        width: 100%;
        height: 100vh;
        display: grid;
        grid-template-columns: minmax(200px, 320px) 1fr;
    }
}
.colContentTabs {
    height: 100%;
    .contentFooter {
        padding: 32px;
        background-color: black;
        align-self: end;
    }
}
`;

export default class StandardView extends React.Component {
  constructor(props) {
    super(props);
    this.inputText = React.createRef();
    this.state = {
      name: props.name
    };
  }

  render() {
    const { showStandardView, closeStandardView, handleSave, modalTitle, labelInput, id } = this.props;
    if (!showStandardView) return null;
    return (
      <Styles>
        <div className="standardView">
          <div className="standardViewInner">
            <div className="colVisualizerTabs">
              <KeyVisualizer />
              Tabs
            </div>
            <div className="colContentTabs">
              StandardView
              <div className="contentFooter">
                <RegularButton onClick={closeStandardView} style={"outline"} buttonText={i18n.app.cancelPending.button} />
              </div>
            </div>
          </div>
        </div>
      </Styles>
    );
  }
}
