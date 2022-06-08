import React from "react";

import Styled from "styled-components";
import i18n from "../../i18n";
import Tab from "react-bootstrap/Tab";
import Nav from "react-bootstrap/Nav";

//component
import { RegularButton } from "../../component/Button";
import KeyVisualizer from "../KeyVisualizer";
import CustomTab from "../../component/Tab";
import TextTab from "../KeysTabs/TextTab";
import KeysTab from "../KeysTabs/KeysTab";
import LayersTab from "../KeysTabs/LayersTab";
import MacroTab from "../KeysTabs/MacroTab";
import DelayTab from "../KeysTabs/DelayTab";
import MediaAndLightTab from "../KeysTabs/MediaAndLightTab";
import MouseTab from "../KeysTabs/MouseTab";

//Icons
import { IconKeyboard, IconLetterColor, IconMouse, IconLayers, IconRobot, IconNote, IconStopWatch } from "../../component/Icon";

const Styles = Styled.div`
.standardView {
    position: fixed;
    width: 100%;
    height: 100vh;
    top: 0;
    left: 0;
    background-color: rgba(50,50,50,0.8);
    z-index: 500;
    padding: 32px 32px 32px 164px;
    .standardViewInner {
        width: 100%;
        height: 100vh;
        display: grid;
        grid-template-columns: minmax(200px, 320px) 1fr;
    }
}
.colContentTabs {
    height: 100%;
    .contentBody {
        flex-grow: 1;
        margin-bottom: auto;
    }
    .contentFooter {
        padding: 32px;
        background-color: black;
        margin-top: auto;
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
    const { showStandardView, closeStandardView, macros, modalTitle, labelInput, id } = this.props;
    if (!showStandardView) return null;
    return (
      <Styles>
        <div className="standardView">
          <Tab.Container id="macroCreator" defaultActiveKey="tabText">
            <div className="standardViewInner">
              <div className="colVisualizerTabs">
                <KeyVisualizer />
                <Nav className="flex-column">
                  <CustomTab eventKey="tabKeys" text="Keys" icon={<IconKeyboard />} />
                  <CustomTab eventKey="tabLayers" text="Layers" icon={<IconLayers />} />
                  <CustomTab eventKey="tabMacro" text="Macro" icon={<IconRobot />} />
                  <CustomTab eventKey="tabMedia" text="Media & LED" icon={<IconNote />} />
                  <CustomTab eventKey="tabMouse" text="Mouse" icon={<IconMouse />} />
                </Nav>
              </div>
              <div className="colContentTabs">
                <div className="contentBody">
                  <Tab.Content>
                    <Tab.Pane eventKey="tabKeys">
                      <KeysTab macros={macros} />
                    </Tab.Pane>
                    <Tab.Pane eventKey="tabLayers">
                      <LayersTab />
                    </Tab.Pane>
                    <Tab.Pane eventKey="tabMacro">
                      <MacroTab macros={macros} selectedMacro={this.state.selected} />
                    </Tab.Pane>
                    <Tab.Pane eventKey="tabMedia">
                      <MediaAndLightTab />
                    </Tab.Pane>
                    <Tab.Pane eventKey="tabMouse">
                      <MouseTab />
                    </Tab.Pane>
                  </Tab.Content>
                </div>
                <div className="contentFooter">
                  <RegularButton onClick={closeStandardView} style={"outline"} buttonText={i18n.app.cancelPending.button} />
                </div>
              </div>
            </div>
          </Tab.Container>
        </div>
      </Styles>
    );
  }
}
