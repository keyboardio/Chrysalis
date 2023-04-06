import React, { Component, Fragment } from "react";
import Styled from "styled-components";
import i18n from "../../i18n";

// Internal components
import { KeymapDB } from "../../../api/keymap";
import { Picker } from "./../KeyPickerKeyboard";
import ListModifiers from "../../component/ListModifiers/ListModifiers";

import ModPicker from "./ModPicker";
import KeyVisualizer from "../KeyVisualizer";
import DualFunctionPicker from "./DualFunctionPicker";

// Icons
import { IconKeysPress, IconKeysTapHold, IconKeysHold, IconKeys2Tap, IconKeys2TapHold } from "../../component/Icon";

const Style = Styled.div`
width: -webkit-fill-available;
.type-card {
    min-height: 100%;
}
.select-card {
    min-height: 100%;
    padding: 0;
}
.nospacing{
    padding: 0;
    margin: 0;
}
.dropdown-menu.show {
  display: block;
  overflow-y: auto;
  height: 190px;
}
.dropdown-menu.show::-webkit-scrollbar {
  display: none;
}
.selectButton{
  .dropdown-toggle{
    text-align: left;
    margin-top: 0.375rem;
  }
}
.dropup .dropdown-toggle::after {
  border-bottom: 0;
  border-top: .3em solid;
  border-right: .3em solid transparent;
  float: right;
  border-left: .3em solid transparent;
  margin-top: 10px;
}
.rowsection {
  margin: 0;
  flex-wrap: nowrap;
}
.section {
  min-height: 100%;
  padding: 0;
}
.pickersection {
  min-height: 100%;
  padding: 0;
}
.hidden {
  visibility: hidden;
}
.menuitem {
  p {
    margin-bottom: 0;
  }
}
.overflow {
  overflow: visible;
}
.overflow::-webkit-scrollbar {
  display: none;
}
.card-title {
  margin-bottom: .3rem;
}
.card-header-tabs {
  margin: 0;
  border: 0;
}
.nav-tabs .nav-link {
  color: ${({ theme }) => theme.colors.button.text};
  background-color: ${({ theme }) => theme.colors.button.background};
  padding: .2rem 1rem;
}
.nav-tabs .nav-link.active {
  color: ${({ theme }) => theme.colors.button.text};
  background-color: ${({ theme }) => theme.card.background};
}
.ball-container {
  padding: 8px;
  width: 100%;
  
}
.ball-inner {
  display: flex;
  padding: 8px;
  overflow-y: auto; 
  border: 1px solid ${({ theme }) => theme.styles.standardView.superkeys.key.border};
  border-radius: 3px;
  background-color: ${({ theme }) => theme.styles.standardView.superkeys.key.background};
}
.ball-title {
  font-size: 12px;
  margin-top: 8px;
  font-weight: 600;
}
.ball{
  margin: 2px;
  text-align: center;
  padding: 4px;
  font-size: 10px;
  font-weight: 600;
  letter-spacing: -0.03em;
  border: none;
  color: rgba(226,228,234,1);
  background: linear-gradient(90deg,rgba(255,255,255,0.1) -22.96%,rgba(255,255,255,0) 123.24%),linear-gradient(0deg,rgba(87,97,126,0.25),rgba(87,97,126,0.25)),rgba(11,2,25,0.2);
  border: none;
  border-radius: 6px;
  box-shadow: 0px 2px 0px rgba(0, 0, 0, 0.1);
  transition: all 300ms ease-in-out;
}
.Tabstyle {
  margin-left: 322px;
  margin-top: -31px;
  width: 280px;
  position: absolute;
  .tab-content {
    margin-top: 31px;
  }
}

.singleViewWrapper {
  margin-top: 16px;
  display: grid;
  grid-template-columns: minmax(160px, 250px) minmax(840px, auto);
  grid-gap: 24px;
  .newKeyValue h4 span { display: none; }
  .modPickerButtonsList .button-config{
    font-size: 12px;
  }
  .keyBoardPickerWrapper {
    // flex: 0 0 calc(100% - 270px);
    width: 100%;
    background: ${({ theme }) => theme.styles.keyboardPicker.keyBoardPickerBackground};
    box-shadow: ${({ theme }) => theme.styles.keyboardPicker.keyEnhanceWrapperBoxShadow};
    border-radius: 6px;
    padding: 10px 20px;
  }

}

@media (max-height: 890px) {
  .callOut {
    max-width: 100%!important;
  }
}
@media screen and (max-width: 1240px) {
  // .singleViewWrapper {
  //   grid-template-columns: 1fr;
  //   grid-gap: 24px;
  // }
  // .keyEnhanceWrapper {
  //   order: 2;
  // }
  // .KeyVisualizer {
  //   display: none;
  // }
  // .ModPicker {
  //   width: 100%;
  // }
}



.keyEnhanceWrapper {
  background: ${({ theme }) => theme.styles.keyboardPicker.keyEnhanceWrapperBackground};
  border: ${({ theme }) => theme.styles.keyboardPicker.keyEnhanceWrapperBackground};
  box-sizing: border-box;
  box-shadow: ;
  border-radius: 6px;
}
.keyEnhanceInner {
  display: flex;
  flex-wrap: wrap;
  height: 100%;
}
.ModPicker {
  background: ${({ theme }) => theme.styles.keyboardPicker.modPickerBackground};
  box-shadow:  ${({ theme }) => theme.styles.keyboardPicker.modPickerBoxShadow};
  border-radius: 6px;
  margin-left: ${({ theme }) => theme.styles.keyboardPicker.modPickerAlignAdjust};
  margin-right: ${({ theme }) => theme.styles.keyboardPicker.modPickerAlignAdjust};
  margin-bottom: ${({ theme }) => theme.styles.keyboardPicker.modPickerAlignAdjust};
  flex: 0 0 100%;
  &.ModPickerScroll {
    overflow: auto;
  }
  &.ModPickerScrollHidden {
    overflow: hidden;
  }
}

.superkeyHint {
  padding: 8px;
}
.superkeyItem {
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  border-radius: 3px;
  padding: 4px;
  justify-content: space-between;
  background-color: ${({ theme }) => theme.styles.standardView.superkeys.item.background};
}
.superkeyItem + .superkeyItem  {
  margin-top: 1px;
}
.superkeyTitle {
  flex: 0 0 62px;
  padding-right: 18px;
}
.superkeyTitle h5.actionTitle {
  font-size: 8px; 
  text-transform: uppercase;
  font-weight: 700;
  letter-spacing: 0.04em;
  margin: 4px 0 1px 0;
  color: ${({ theme }) => theme.styles.standardView.superkeys.item.titleColor};
}
.superKey {
  position: relative;
  align-self: center;
  padding: 4px;
  flex: 0 0 calc(100% - 62px);
  text-align: center;
  font-size: 10px;
  font-weight: 700;
  border: 1px solid ${({ theme }) => theme.styles.standardView.superkeys.key.border};
  border-radius: 3px;
  background-color: ${({ theme }) => theme.styles.standardView.superkeys.key.background};
  .listModifiersTags .labelModifier {
    font-size: 8px;
    padding: 3px 8px;
  }
}
.superKey > div{
  position: absolute;
  bottom: -12px;
  left: 12px;
}

`;

class KeyPickerKeyboard extends Component {
  constructor(props) {
    super(props);

    this.layoutSelectorWatcherPosition = React.createRef();

    this.keymapDB = new KeymapDB();

    let tempModifs = Array(5);
    let tempActions = props.actions;
    if (props.actions === undefined) {
      tempActions = [[0], [0], [0], [0], [0]];
    } else {
      tempActions = props.actions;
    }
    tempActions.forEach((element, i) => {
      if (element > 255 && element < 8192) {
        tempModifs[i] = 0;
      } else {
        tempModifs[i] = [];
      }
    });

    this.state = {
      action: Number.isInteger(props.action) ? props.action : 0,
      actions: tempActions,
      modifs: tempModifs,
      disable: false,
      selectdual: 0,
      selectlayer: 0,
      activeTab: "editor",
      layerData: 0,
      showKB: false,
      pastkeyindex: props.keyIndex,
      superName: props.superName
    };

    this.parseAction = this.parseAction.bind(this);
    this.changeTab = this.changeTab.bind(this);
  }
  componentDidMount() {
    this.updateSelectorPosition();
    window.addEventListener("resize", this.updateSelectorPosition);
  }
  componentDidUpdate() {
    let selectdual = 0;
    const disable = this.props.code === 0;
    const keynum = this.props.code != null ? this.props.code.modified + this.props.code.base : 0;
    if (keynum >= 51218 && keynum <= 53266) {
      selectdual = (this.props.code.modified >>> 8) << 8;
      if (selectdual >= 51218 - 18) {
        selectdual += 18;
      } else {
        selectdual += 17;
      }
    } else {
      selectdual = 0;
    }
    let layerData = 0;
    if ((keynum >= 17450 && keynum <= 17501) || (keynum >= 49161 && keynum <= 49168)) {
      layerData = keynum;
    } else {
      layerData = 0;
    }

    let tempModifs = Array(5);
    let tempActions;
    if (this.props.actions === undefined) {
      tempActions = [0, 0, 0, 0, 0];
    } else {
      tempActions = this.props.actions;
    }
    tempActions.forEach((element, i) => {
      if (element > 255 && element < 8448) {
        tempModifs[i] = 0;
      } else {
        tempModifs[i] = [];
      }
    });
    let activeTab = "editor";
    if (
      keynum < 256 ||
      (keynum > 53851 && keynum < 53852 + 128) ||
      (keynum > 49152 && keynum < 49161) ||
      keynum == 65535 ||
      disable
    ) {
      activeTab = "editor";
    } else if (layerData > 0 || selectdual > 0) {
      activeTab = "layer";
    } else {
      activeTab = "super";
    }
    if (JSON.stringify(this.state.actions) !== JSON.stringify(tempActions)) {
      this.setState({
        action: this.props.keyIndex !== this.state.pastkeyindex ? 0 : this.state.action,
        actions: tempActions,
        selectdual,
        layerData,
        disable,
        modifs: tempModifs,
        pastkeyindex: this.props.keyIndex,
        activeTab,
        superName: this.props.superName
      });
    }
  }
  componentWillUnmount() {
    window.removeEventListener("resize", this.updateSelectorPosition);
  }

  updateSelectorPosition = () => {
    const elPosition = this.layoutSelectorWatcherPosition.current.getBoundingClientRect();
    if (this.props.refreshLayoutSelectorPosition) {
      this.props.refreshLayoutSelectorPosition(elPosition.left, elPosition.top);
    }
  };

  parseKey(keycode) {
    if (keycode >= 53980 && keycode <= 53980 + 128) {
      let superk = "";
      console.log(this.props.superkeys[keycode - 53980]);
      superk = `SUPER\n${
        this.props.superkeys[keycode - 53980] ? this.props.superkeys[keycode - 53980].name : keycode - 53980 + 1
      }`;
      return superk;
    }
    if (keycode > 53851 && keycode <= 53851 + 128) {
      let macroN = "";
      console.log(this.props.macros[keycode - 53852]);
      macroN = `MACRO\n${this.props.macros[keycode - 53852] ? this.props.macros[keycode - 53852].name : keycode - 53852}`;
      return macroN;
    }
    return this.props.code !== null
      ? this.keymapDB.parse(keycode).extraLabel != undefined
        ? this.keymapDB.parse(keycode).extraLabel + "." + this.keymapDB.parse(keycode).label
        : this.keymapDB.parse(keycode).label
      : "";
  }

  parseAction(action) {
    let aux;
    try {
      aux = this.parseKey(this.state.actions[action]);
    } catch (error) {
      aux = 0;
    }
    return aux;
  }

  changeTab(tab) {
    this.setState({ activeTab: tab, action: 0 });
  }

  translateSuperKeyAction = superkeysSelected => {
    let aux;
    if (superkeysSelected === undefined) {
      return null;
    }
    if (superkeysSelected === 1) {
      aux = this.keymapDB.parse(0);
    } else {
      aux = this.keymapDB.parse(superkeysSelected);
    }
    let translatedAction = "";
    // console.log("Try to translate superkey actions inside SuperKeiItem: ", aux);

    if (aux.extraLabel == "MACRO") {
      if (this.props.macros.length > parseInt(aux.label) && this.props.macros[parseInt(aux.label)].name.substr(0, 5) != "") {
        translatedAction = aux.label = this.props.macros[parseInt(aux.label)].name.substr(0, 5).toLowerCase();
      }
    }
    if (aux.label) {
      translatedAction = (aux.extraLabel != undefined ? aux.extraLabel + " " : "") + aux.label;
    }
    return translatedAction;
  };

  render() {
    const { action, actions, showKB, modifs, superName, disable, Keymap, layoutSelectorPosition } = this.state;
    const { selectedlanguage, kbtype, macros, actTab, superkeys, code, onKeySelect } = this.props;
    const activeTab = actTab != undefined ? actTab : this.state.activeTab;
    const selKey = this.parseKey(code.base + code.modified);
    const selKeys = actions.map((a, i) => this.parseAction(i));

    const KC = code.base + code.modified;
    const superk = Array(superkeys.length)
      .fill()
      .map((_, i) => i + 53980);

    let adjactions = actions;
    if (adjactions.length < 5) {
      while (adjactions.length < 5) {
        adjactions.push(0);
      }
    }

    const superKeysActions = [
      {
        title: "TAP",
        icon: <IconKeysPress />
      },
      {
        title: "HOLD",
        icon: <IconKeysTapHold />
      },
      {
        title: "TAP & HOLD",
        icon: <IconKeysHold />
      },
      {
        title: "2TAP",
        icon: <IconKeys2Tap />
      },
      {
        title: "2TAP & HOLD",
        icon: <IconKeys2TapHold />
      }
    ];

    return (
      <Style>
        <div className="singleViewWrapper" ref={this.layoutSelectorWatcherPosition}>
          <div className="keyEnhanceWrapper">
            <div className="keyEnhanceInner">
              <KeyVisualizer newValue={selKey} keyCode={code} />
              <div className={`ModPicker ${this.props.macros[KC - 53852] ? "ModPickerScrollHidden" : ""}`}>
                {superkeys[superk.indexOf(KC)] ? (
                  <div className="superkeyHint">
                    {superKeysActions.map((item, index) => (
                      <div className="superkeyItem" key={`superHint-${index}`}>
                        <div className="superkeyTitle">
                          <h5 className="actionTitle">{item.title}</h5>
                        </div>
                        <div className="superKey">
                          {this.translateSuperKeyAction(superkeys[superk.indexOf(KC)].actions[index])}
                          <ListModifiers keyCode={superkeys[superk.indexOf(KC)].actions[index]} />
                        </div>
                      </div>
                    ))}
                  </div>
                ) : this.props.macros[KC - 53852] ? (
                  <div className="ball-container">
                    <h5 className="ball-title">Preview macro</h5>
                    <div className="ball-inner">
                      {this.props.macros[KC - 53852].macro.split(" ").map((data, index) => {
                        return (
                          <div className="ball" key={`LtrIdx-${index}`}>
                            {data}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ) : (
                  <>
                    <ModPicker key={code} keyCode={code} onKeySelect={onKeySelect}></ModPicker>
                    {actTab == "editor" ? (
                      <DualFunctionPicker keyCode={code} onKeySelect={onKeySelect} activeTab={activeTab}></DualFunctionPicker>
                    ) : (
                      <></>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
          <div className="keyBoardPickerWrapper">
            <Picker
              actions={actions}
              action={action}
              disable={disable}
              baseCode={code.base}
              modCode={code.modified}
              onKeySelect={onKeySelect}
              activeTab={activeTab}
              selectedlanguage={selectedlanguage}
              selKeys={selKeys}
              superkeys={superkeys}
              kbtype={kbtype}
              keyCode={code}
              macros={macros}
            />
          </div>
        </div>
      </Style>
    );
  }
}

export default KeyPickerKeyboard;
