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
import KeysTab from "../KeysTabs/KeysTab";
import NoKeyTransparentTab from "../KeysTabs/NoKeyTransparentTab";
import LayersTab from "../KeysTabs/LayersTab";
import MacroTab from "../KeysTabs/MacroTab";
import SuperkeysTab from "../KeysTabs/SuperkeysTab";
import MediaAndLightTab from "../KeysTabs/MediaAndLightTab";
import OneShotTab from "../KeysTabs/OneShotTab";
import MouseTab from "../KeysTabs/MouseTab";

//Icons
import {
  IconKeyboard,
  IconNoKey,
  IconMouse,
  IconLayers,
  IconRobot,
  IconNote,
  IconOneShot,
  IconThunder
} from "../../component/Icon";

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
    overflow: hidden;
    position: relative;
    .contentBody {
        flex-grow: 1;
        margin-bottom: auto;
        padding: 48px 82px 32px 82px;
        padding-bottom: 102px;
        height: 100%;
        overflow-y: auto;
    }
    .contentFooter {
      position: absolute;
      bottom: 0;
        width: 100%;
        padding: 16px 24px;
        margin-top: auto;
        border-radius: 6px;
        background-color: ${({ theme }) => theme.styles.standardView.footerBackground};
        backdrop-filter: blur(6px);
        .button + .button {
            margin-left: 12px;
        }
    }
}
.KeyVisualizer {
  margin-top: 42px;
  margin-bottom: 24px;
  width: calc(100% + 20px);
  background: #25273B;
  border: 1px solid rgba(63, 66, 90, 0.3);
  box-shadow: 32px 32px 64px -12px rgba(11, 2, 25, 0.4), 32px 32px 72px -32px rgba(26, 17, 46, 0.5);
  border-radius: 6px;
  min-height: 262px;
  position: relative;
  z-index: 2;
}
.tabsWrapper.nav {
  position: relative;
  z-index: 2;
}

.standardViewTab {
    width: 100%;
    h3 {
        margin-bottom: 16px;
    }
    h4 {
        flex: 0 0 100%;
        width: 100%;
        margin-top: 24px;
    }
    .description {
        font-size: 14px;
        color: ${({ theme }) => theme.styles.macro.descriptionColor};
        font-weight: 500;
    }
    .tabContentWrapper {
        width: 100%;
    }
    .callOut {
        margin-bottom: 16px;
    }
    .reduceMargin .callOut {
        margin-bottom: 2px;
    }
    .cardButtons {
        h4 {
            margin-top: 0;
            font-size: 14px;
        }
    }
}

@media screen and (max-height: 782px) {
    .standardView {
        padding: 16px 24px 24px 148px;
        h3 {
            font-size: 18px;
            .counterIndicator:before {
                left: -32px;
            }
        }
        .KeyVisualizer {
          margin-top: 24px;
          padding-left: 24px;
      }
    }
    .colContentTabs .contentBody {
        padding: 24px 62px 24px 62px;
        padding-bottom: 102px;
    }
}

@media (max-width: 1460px) and (min-height: 783px) {
  .standardView{
    padding: 24px 24px 24px 142px;
    .KeyVisualizer {
      margin-top: 16px;
    }
    .colContentTabs .contentBody {
      padding: 32px 32px 32px 42px;
      padding-bottom: 102px;
    }
    .counterIndicator:before {
      left: -24px;
      bottom: 3px;
      font-size: 12px;
    }
  }
}
@media (max-width: 1360px) {
  .dualFuntionWrapper {
    grid-gap: 16px;
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
    // if(this.props.actTab == "editor") {

    // }
    if (prevProps.keyIndex !== this.props.keyIndex) {
      if (this.props.keyIndex !== -1) {
        if (this.props.actTab == "super") {
          this.setState({ code: this.props.layerData[this.props.keyIndex] });
        } else {
          this.setState({ code: this.props.layerData[this.props.keyIndex].keyCode });
        }
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
    const {
      actions,
      action,
      actTab,
      code,
      closeStandardView,
      handleSave,
      id,
      isStandardView,
      kbtype,
      keyIndex,
      layerData,
      labelInput,
      macros,
      onKeySelect,
      selectedlanguage,
      showStandardView,
      superkeys
    } = this.props;
    let keyCode;
    if (actTab == "super") {
      keyCode = keyIndex !== -1 ? layerData[keyIndex] : 0;
    } else {
      keyCode = keyIndex !== -1 ? layerData[keyIndex].keyCode : 0;
    }

    const selKey = this.parseKey(keyCode);
    const oldKey = this.parseKey(this.state.code);
    if (!showStandardView) return null;
    return (
      <Styles>
        <div className="standardView">
          <Tab.Container id="standardViewCointainer" defaultActiveKey="tabKeys">
            <div className="standardViewInner">
              <div className="colVisualizerTabs">
                <KeyVisualizer
                  keyCode={keyCode}
                  oldKeyCode={this.state.code}
                  oldValue={oldKey}
                  newValue={selKey}
                  isStandardView={isStandardView}
                  superkeyAction={`${actTab == "super" ? keyIndex : 5}`}
                />
                <Nav className="flex-column tabsWrapper">
                  <CustomTab eventKey="tabKeys" text="Keys" icon={<IconKeyboard />} />
                  <CustomTab eventKey="tabNoKeys" text={i18n.editor.standardView.noKeyTransparent} icon={<IconNoKey />} />
                  <CustomTab eventKey="tabLayers" text={i18n.editor.standardView.layers.title} icon={<IconLayers />} />
                  <CustomTab eventKey="tabMacro" text={i18n.editor.standardView.macros.title} icon={<IconRobot />} />
                  {actTab != "super" ? (
                    <>
                      <CustomTab eventKey="tabSuperKeys" text={i18n.editor.standardView.superkeys.title} icon={<IconThunder />} />
                      <CustomTab eventKey="tabOneShot" text={i18n.editor.standardView.oneShot.title} icon={<IconOneShot />} />
                    </>
                  ) : (
                    ""
                  )}
                  <CustomTab eventKey="tabMedia" text={i18n.editor.standardView.mediaAndLED.title} icon={<IconNote />} />
                  <CustomTab eventKey="tabMouse" text={i18n.editor.standardView.mouse.title} icon={<IconMouse />} />
                </Nav>
              </div>
              <div className="colContentTabs">
                <div className="contentBody">
                  <Tab.Content>
                    <Tab.Pane eventKey="tabKeys">
                      <KeysTab
                        keyCode={keyCode}
                        code={code}
                        onKeyPress={onKeySelect}
                        isStandardView={isStandardView}
                        superkeyAction={`${actTab == "super" ? keyIndex : 5}`}
                        actTab={actTab}
                        selectedlanguage={selectedlanguage}
                        kbtype={kbtype}
                      />
                    </Tab.Pane>
                    <Tab.Pane eventKey="tabNoKeys">
                      <NoKeyTransparentTab keyCode={keyCode} onKeySelect={onKeySelect} />
                    </Tab.Pane>
                    <Tab.Pane eventKey="tabLayers">
                      <LayersTab
                        onLayerPress={onKeySelect}
                        keyCode={keyCode}
                        showLayerSwitch={actTab == "super" ? false : true}
                        isStandardView={isStandardView}
                        actTab={actTab}
                      />
                    </Tab.Pane>
                    <Tab.Pane eventKey="tabMacro">
                      <MacroTab
                        macros={macros}
                        selectedMacro={this.state.selected}
                        onMacrosPress={onKeySelect}
                        keyCode={keyCode}
                        isStandardView={isStandardView}
                      />
                    </Tab.Pane>
                    {actTab != "super" ? (
                      <Tab.Pane eventKey="tabSuperKeys">
                        <SuperkeysTab
                          actions={actions}
                          superkeys={superkeys}
                          onKeySelect={onKeySelect}
                          macros={macros}
                          keyCode={keyCode}
                          isStandardView={isStandardView}
                        />
                      </Tab.Pane>
                    ) : (
                      ""
                    )}
                    {actTab != "super" ? (
                      <Tab.Pane eventKey="tabOneShot">
                        <OneShotTab keyCode={keyCode} onKeySelect={onKeySelect} isStandardView={isStandardView} />
                      </Tab.Pane>
                    ) : (
                      ""
                    )}
                    <Tab.Pane eventKey="tabMedia">
                      <MediaAndLightTab onAddSpecial={this.onAddSpecial} keyCode={keyCode} isStandardView={isStandardView} />
                    </Tab.Pane>
                    <Tab.Pane eventKey="tabMouse">
                      <MouseTab onAddSpecial={this.onAddSpecial} keyCode={keyCode} isStandardView={isStandardView} />
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
                      buttonText={i18n.dialog.applyChanges}
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
