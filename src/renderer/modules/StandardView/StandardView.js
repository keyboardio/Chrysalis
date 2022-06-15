import React from "react";

import Styled from "styled-components";
import i18n from "../../i18n";
import Tab from "react-bootstrap/Tab";
import Nav from "react-bootstrap/Nav";

import Keymap, { KeymapDB } from "../../../api/keymap";

//component
import { RegularButton } from "../../component/Button";
import KeyVisualizer from "../KeyVisualizer";
import CustomTab from "../../component/Tab";
import TextTab from "../KeysTabs/TextTab";
import KeysTab from "../KeysTabs/KeysTab";
import NoKeyTransparentTab from "../KeysTabs/NoKeyTransparentTab";
import LayersTab from "../KeysTabs/LayersTab";
import MacroTab from "../KeysTabs/MacroTab";
import DelayTab from "../KeysTabs/DelayTab";
import MediaAndLightTab from "../KeysTabs/MediaAndLightTab";
import MouseTab from "../KeysTabs/MouseTab";

//Icons
import { IconKeyboard, IconNoKey, IconMouse, IconLayers, IconRobot, IconNote, IconStopWatch } from "../../component/Icon";

const Styles = Styled.div`
.standardView {
    position: fixed;
    width: 100%;
    height: 100vh;
    top: 0;
    left: 0;
    background-color: ${({ theme }) => theme.styles.standardView.modalBackground};
    z-index: 500;
    padding: 32px 32px 32px 164px;
    .standardViewInner {
        width: 100%;
        height: 100%;
        display: grid;
        grid-gap: 14px;
        grid-template-columns: minmax(200px, 220px) 1fr;
    }
}
.colContentTabs {
    height: 100%;
    display: flex;
    flex-wrap: wrap;
    background-color: ${({ theme }) => theme.styles.standardView.contentBackground};
    border-radius: 6px;
    .contentBody {
        flex-grow: 1;
        margin-bottom: auto;
        padding: 48px 82px 32px 82px;
    }
    .contentFooter {
        width: 100%;
        padding: 24px;
        background-color: black;
        margin-top: auto;
        border-radius: 6px;
        background-color: ${({ theme }) => theme.styles.standardView.footerBackground};
        .button + .button {
            margin-left: 12px;
        }
    }
}
.KeyVisualizer {
  margin-top: 42px;
  width: calc(100% + 20px);
  background: #25273B;
  border: 1px solid rgba(63, 66, 90, 0.3);
  box-shadow: 32px 32px 64px -12px rgba(11, 2, 25, 0.4), 32px 32px 72px -32px rgba(26, 17, 46, 0.5);
  border-radius: 6px;
  min-height: 262px;
}

.standardViewTab {
    width: 100%;
    h3 {
        margin-bottom: 16px;
    }
    h4 {
        font-size: 16px;
        flex: 0 0 100%;
        width: 100%;
        margin-top: 24px;
    }
    .description {
        font-size: 14px;
        color: ${({ theme }) => theme.styles.macro.descriptionColor};
        font-weight: 500;
    }
    .callOut {
        margin-bottom: 16px;
    }
    .cardButtons {
        h4 {
            margin-top: 0;
        }
    }
}
`;

export default class StandardView extends React.Component {
  constructor(props) {
    super(props);
    this.inputText = React.createRef();
    this.state = {
      name: props.name,
      code: 0
    };
    this.keymapDB = new KeymapDB();
  }

  componentDidUpdate(prevProps) {
    console.log("StandardView componentDidUpdate", prevProps.keyIndex, this.props.keyIndex);
    if (prevProps.keyIndex !== this.props.keyIndex) {
      if (this.props.keyIndex !== -1) {
        this.setState({ code: this.props.layerData[this.props.keyIndex].keyCode });
      } else {
        this.setState({ code: 0 });
      }
    }
  }

  parseKey(keycode) {
    const macro = this.props.macros[parseInt(this.keymapDB.parse(keycode).label)];
    let macroName;
    try {
      macroName = this.props.macros[parseInt(this.keymapDB.parse(keycode).label)].name.substr(0, 5);
    } catch (error) {
      macroName = "*NotFound*";
    }
    if (keycode >= 53852 && keycode <= 53852 + 64) {
      if (this.props.code !== null) return this.keymapDB.parse(keycode).extraLabel + "." + macroName;
    }
    return this.props.code !== null
      ? this.keymapDB.parse(keycode).extraLabel != undefined
        ? this.keymapDB.parse(keycode).extraLabel + "." + this.keymapDB.parse(keycode).label
        : this.keymapDB.parse(keycode).label
      : "";
  }

  onAddSpecial = (keycode, action) => {
    this.props.onKeySelect(keycode);
  };

  render() {
    console.log("StandardView render");
    const {
      showStandardView,
      closeStandardView,
      layerData,
      macros,
      handleSave,
      keyIndex,
      labelInput,
      id,
      onKeySelect,
      isStandardView
    } = this.props;
    const keyCode = keyIndex !== -1 ? layerData[keyIndex].keyCode : 0;
    const selKey = this.parseKey(keyCode);
    const oldKey = this.parseKey(this.state.code);
    if (!showStandardView) return null;
    return (
      <Styles>
        <div className="standardView">
          <Tab.Container id="standardViewCointainer" defaultActiveKey="tabKeys">
            <div className="standardViewInner">
              <div className="colVisualizerTabs">
                <KeyVisualizer keyCode={keyCode} oldValue={oldKey} newValue={selKey} />
                <Nav className="flex-column">
                  <CustomTab eventKey="tabKeys" text="Keys" icon={<IconKeyboard />} />
                  <CustomTab eventKey="tabNoKeys" text={i18n.editor.standardView.noKeyTransparent} icon={<IconNoKey />} />
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
                      <KeysTab onKeyPress={onKeySelect} isStandardView={isStandardView} />
                    </Tab.Pane>
                    <Tab.Pane eventKey="tabNoKeys">
                      <NoKeyTransparentTab keyCode={keyCode} onKeySelect={onKeySelect} />
                    </Tab.Pane>

                    <Tab.Pane eventKey="tabLayers">
                      <LayersTab
                        onLayerPress={onKeySelect}
                        keyCode={keyCode}
                        showLayerSwitch={true}
                        isStandardView={isStandardView}
                      />
                    </Tab.Pane>
                    <Tab.Pane eventKey="tabMacro">
                      <MacroTab macros={macros} selectedMacro={this.state.selected} onMacrosPress={onKeySelect} />
                    </Tab.Pane>
                    <Tab.Pane eventKey="tabMedia">
                      <MediaAndLightTab onAddSpecial={this.onAddSpecial} />
                    </Tab.Pane>
                    <Tab.Pane eventKey="tabMouse">
                      <MouseTab onAddSpecial={this.onAddSpecial} />
                    </Tab.Pane>
                  </Tab.Content>
                </div>
                <div className="contentFooter">
                  <div className="d-flex justify-content-end">
                    <RegularButton
                      onClick={() => closeStandardView(this.state.code)}
                      style={"outline"}
                      size="sm"
                      buttonText={i18n.app.cancelPending.button}
                    />
                    <RegularButton
                      onClick={handleSave}
                      style={"outline gradient"}
                      size="sm"
                      buttonText={i18n.components.save.button}
                    />
                  </div>
                </div>
              </div>
            </div>
          </Tab.Container>
        </div>
      </Styles>
    );
  }
}
