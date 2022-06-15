// -*- mode: js-jsx -*-
/* Bazecor -- Kaleidoscope Command Center
 * Copyright (C) 2019  Keyboardio, Inc.
 *
 * This program is free software: you can redistribute it and/or modify it under
 * the terms of the GNU General Public License as published by the Free Software
 * Foundation, version 3.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */
import React, { Component } from "react";

import Styled from "styled-components";

import Tab from "react-bootstrap/Tab";
import Nav from "react-bootstrap/Nav";
import i18n from "../../i18n";

import Title from "../../component/Title";
import CustomTab from "../../component/Tab";
import TextTab from "../KeysTabs/TextTab";
import KeysTab from "../KeysTabs/KeysTab";
import LayersTab from "../KeysTabs/LayersTab";
import MacroTab from "../KeysTabs/MacroTab";
import DelayTab from "../KeysTabs/DelayTab";
import MediaAndLightTab from "../KeysTabs/MediaAndLightTab";
import MouseTab from "../KeysTabs/MouseTab";
import { RecordMacroModal } from "../../component/Modal";

import { IconKeyboard, IconLetterColor, IconMouse, IconLayers, IconRobot, IconNote, IconStopWatch } from "../../component/Icon";
import { MdUnfoldLess, MdKeyboardArrowUp, MdKeyboardArrowDown, MdTimer } from "react-icons/md";

const Styles = Styled.div`
.card {
  width: auto;
  height: 100%;
  margin: 2rem;
  padding: 0;
  overflow: auto;
  background-color: ${({ theme }) => theme.card.background};
  color: ${({ theme }) => theme.card.color};
}
.card::-webkit-scrollbar {
  display: none;
}
.macroHeaderMem{
  display: flex;
  justify-content: space-between;
}
.macroHeaderTitle {
  align-self: center;
}
.macroFreeMem {
  width: 40%;
  display: flex;
  align-items: center;
}
.memSlider {
  width: -webkit-fill-available;
  margin-left: 8px;
  margin-right: 8px;
}
.memSlider {
  .rangeslider__fill {
    background-color: lightgreen;
  }
  .rangeslider__handle {
    display: none;
  }
}
.outOfMem {
  .rangeslider__fill {
    background-color: red;
  }
  .rangeslider__handle {
    background-color: red;
  }
}
.cardcontent {
  padding: 0px;
  &:last-child {
    padding-bottom: 0px;
  }
}
.iconFloppy{
  margin-right: 6px;
  width: 27px;
}
.cardHeader {
  background-color: ${({ theme }) => theme.card.background};
  color: ${({ theme }) => theme.card.color};
}
.cardTitle {
  color: ${({ theme }) => theme.card.color};
}


.tabWrapper {
  display: grid;
  grid-template-columns: minmax(auto, 270px) 1fr;
  h3 {
    margin-bottom: 16px;
    color: ${({ theme }) => theme.styles.macro.tabTile};
  }
  margin-top: 24px;
  .tabCategories {
    padding: 32px 14px 32px 32px;
    border-top-left-radius: 16px;
    background-color: ${({ theme }) => theme.styles.macro.tabCategoriesBackground};
    h5 {
      font-size: 11px; 
      line-height: 32px;
      font-weight: 600; 
      margin-bottom: 0;
      letter-spacing: 0.21em;
      text-transform: uppercase;
      color: ${({ theme }) => theme.styles.macro.tabSubTitle};
    }
  }
  .tabContent { 
    padding: 32px ;
    border-top-right-radius: 16px;
    background-color: ${({ theme }) => theme.styles.macro.tabContentBackground};
  }
  .tabContentInner {
    height: 100%;
  }
  .tab-content {
    height: inherit;
  }
  .tab-pane {
    height: calc(100% - 24px);
  }
  .tabContentWrapper {
      display: flex;
      flex-wrap: wrap;
      flex: 0 0 100%;
      height: fit-content;
  }
  .tabSaveButton {
      height: fit-content;
      margin-top: auto;
      margin-left: auto;
      display: flex;
      align-self: flex-end;
  }
}
`;

class MacroCreator extends Component {
  constructor(props) {
    super(props);

    this.state = {
      addText: "",
      rows: []
    };
    this.keymapDB = props.keymapDB;
    this.modifiers = [
      { name: "LEFT SHIFT", keyCode: 225, color: "#e1f3f7" },
      { name: "RIGHT SHIFT", keyCode: 229, color: "#e1f3f7" },
      { name: "LEFT CTRL", keyCode: 224, color: "#f5e4e4" },
      { name: "RIGHT CTRL", keyCode: 228, color: "#f5e4e4" },
      { name: "LEFT ALT", keyCode: 226, color: "#faf8e1" },
      { name: "RIGHT ALT", keyCode: 230, color: "#f2e7f5" },
      { name: "LEFT GUI", keyCode: 227, color: "#e6f0e4" },
      { name: "RIGHT GUI", keyCode: 231, color: "#e6f0e4" }
    ];
    this.actionTypes = [
      {
        enum: "MACRO_ACTION_END",
        name: "End macro",
        icon: <React.Fragment />,
        smallIcon: <React.Fragment />
      },
      {
        enum: "MACRO_ACTION_STEP_INTERVAL",
        name: "Set Interval",
        icon: <MdTimer fontSize="large" />,
        smallIcon: <MdTimer />
      },
      {
        enum: "MACRO_ACTION_STEP_WAIT",
        name: "Delay",
        icon: <MdTimer fontSize="large" />,
        smallIcon: <MdTimer />
      },
      {
        enum: "MACRO_ACTION_STEP_KEYDOWN",
        name: "Function Key Press",
        icon: <MdKeyboardArrowDown fontSize="large" />,
        smallIcon: <MdKeyboardArrowDown />
      },
      {
        enum: "MACRO_ACTION_STEP_KEYUP",
        name: "Function Key Release",
        icon: <MdKeyboardArrowUp fontSize="large" />,
        smallIcon: <MdKeyboardArrowUp />
      },
      {
        enum: "MACRO_ACTION_STEP_TAP",
        name: "Fn. Press & Release",
        icon: <MdUnfoldLess fontSize="large" />,
        smallIcon: <MdUnfoldLess />
      },
      {
        enum: "MACRO_ACTION_STEP_KEYCODEDOWN",
        name: "Key Press",
        icon: <MdKeyboardArrowDown fontSize="large" />,
        smallIcon: <MdKeyboardArrowDown />
      },
      {
        enum: "MACRO_ACTION_STEP_KEYCODEUP",
        name: "Key Release",
        icon: <MdKeyboardArrowUp fontSize="large" />,
        smallIcon: <MdKeyboardArrowUp />
      },
      {
        enum: "MACRO_ACTION_STEP_TAPCODE",
        name: "Key Press & Rel.",
        icon: <MdUnfoldLess fontSize="large" />,
        smallIcon: <MdUnfoldLess />
      },
      {
        enum: "MACRO_ACTION_STEP_EXPLICIT_REPORT",
        name: "Explicit Report",
        icon: <React.Fragment />,
        smallIcon: <React.Fragment />
      },
      {
        enum: "MACRO_ACTION_STEP_IMPLICIT_REPORT",
        name: "Implicit Report",
        icon: <React.Fragment />,
        smallIcon: <React.Fragment />
      },
      { enum: "MACRO_ACTION_STEP_SEND_REPORT", id: 11, name: "Send Report" },
      {
        enum: "MACRO_ACTION_STEP_TAP_SEQUENCE",
        name: "Intervaled Special Keys",
        icon: <React.Fragment />,
        smallIcon: <React.Fragment />
      },
      {
        enum: "MACRO_ACTION_STEP_TAP_CODE_SEQUENCE",
        name: "Intervaled Key Press & Release",
        icon: <React.Fragment />,
        smallIcon: <React.Fragment />
      }
    ];
  }

  componentDidUpdate(prevProps, prevState) {
    try {
      const prevAux = prevProps.macro.actions.map((x, id) => {
        return { keyCode: x.keyCode, type: x.type, id: id };
      });
      const propAux = this.props.macro.actions.map((x, id) => {
        return { keyCode: x.keyCode, type: x.type, id: id };
      });
      // console.log("Testing: ", JSON.parse(JSON.stringify(prevAux)), JSON.parse(JSON.stringify(propAux)));
      if (JSON.stringify(prevAux) !== JSON.stringify(propAux)) {
        console.log("Updating");
        let auxConv = this.createConversion(this.props.macro.actions);
        let newRows = auxConv.map((item, index) => {
          return { ...item, id: index };
        });
        this.setState({
          rows: newRows
        });
      }
    } catch (e) {
      console.warn("Error Happened", e);
    }
  }

  onAddText = () => {
    // console.log("MacroCreator onAddText", this.state.rows, this.props.macro);
    const aux = this.state.addText;
    let newRows = this.createConversion(this.props.macro.actions);
    newRows = newRows.concat(
      aux.split("").flatMap((symbol, index) => {
        let item = symbol.toUpperCase();
        let upper = false;
        if (symbol.toLowerCase() !== symbol) {
          upper = true;
        }
        switch (item) {
          case " ":
            item = "SPACE";
            break;
          case "    ":
            item = "TAB";
            break;
          default:
            break;
        }
        const randID = new Date().getTime() + Math.floor(Math.random() * 1000);
        let keyCode = this.keymapDB.reverse(item);
        if (upper) {
          keyCode = keyCode + 2048;
        }
        let actions = [
          {
            symbol: item,
            keyCode,
            action: 8,
            id: index + newRows.length,
            color: this.assignColor(keyCode),
            uid: randID,
            ucolor: "transparent"
          }
        ];
        switch (true) {
          case (keyCode & 256) === 256 && (keyCode & 512) === 512:
            //Control pressed to modify (2)
            actions = this.addModToKey(actions, 5, 256);

            break;
          case (keyCode & 256) === 256:
            //Control pressed to modify (2)
            actions = this.addModToKey(actions, 2, 256);

            break;
          case (keyCode & 512) === 512:
            //Left Alt pressed to modify (4)
            actions = this.addModToKey(actions, 4, 512);

            break;
          case (keyCode & 1024) === 1024:
            //Right alt pressed to modify (5)
            actions = this.addModToKey(actions, 5, 1024);

            break;
          case (keyCode & 2048) === 2048:
            //Shift pressed to modify (0)
            actions = this.addModToKey(actions, 0, 2048);

            break;
          case (keyCode & 4096) === 4096:
            //Gui pressed to modify (6)
            actions = this.addModToKey(actions, 6, 4096);

            break;
          default:
            break;
        }
        return actions;
      })
    );
    // console.log("TEST", JSON.stringify(newRows), JSON.stringify(this.props.macros));
    this.setState({
      addText: ""
    });
    this.updateRows(newRows);
  };

  createConversion = actions => {
    let converted = actions.map((action, i) => {
      const randID = new Date().getTime() + Math.floor(Math.random() * 1000);
      let km, txt;
      switch (action.type) {
        case 1:
        case 2:
          return {
            symbol: action.keyCode,
            keyCode: action.keyCode,
            action: action.type,
            id: i,
            color: "#faf0e3",
            uid: randID,
            ucolor: "transparent"
          };
        case 3:
        case 4:
        case 5:
          km = this.keymapDB.parse(action.keyCode);
          if (km.extraLabel !== undefined) {
            txt = km.extraLabel + " " + km.label;
          } else {
            txt = km.label;
          }
          return {
            symbol: txt,
            keyCode: action.keyCode,
            action: action.type,
            id: i,
            color: this.assignColor(action.keyCode),
            uid: randID,
            ucolor: "transparent"
          };
        case 6:
        case 7:
        case 8:
          return {
            symbol: this.keymapDB.parse(action.keyCode).label,
            keyCode: action.keyCode,
            action: action.type,
            id: i,
            color: this.assignColor(action.keyCode),
            uid: randID,
            ucolor: "transparent"
          };
        default:
          break;
      }
    });
    return converted;
  };

  revertConversion = actions => {
    let converted = actions.map(({ keyCode, action, id }) => {
      return {
        keyCode: keyCode,
        type: action,
        id: id
      };
    });
    return converted;
  };

  updateRows = rows => {
    console.log("Macro creator updaterows", rows);
    let texted = rows.map(k => this.keymapDB.parse(k.keyCode).label).join(" ");
    let newRows = rows.map((item, index) => {
      let aux = item;
      aux.id = index;
      return aux;
    });
    this.setState({
      rows: newRows,
      macro: texted
    });

    this.props.addToActions(this.revertConversion(rows));
  };

  onAddSymbol = (keyCode, action) => {
    const randID = new Date().getTime() + Math.floor(Math.random() * 1000);
    let newRows = this.state.rows;
    let symbol = this.keymapDB.parse(keyCode).label;
    newRows.push({
      symbol,
      keyCode,
      action,
      id: newRows.length,
      color: this.assignColor(keyCode),
      uid: randID,
      ucolor: "transparent"
    });
    this.updateRows(newRows);
  };

  onAddDelay = (delay, action) => {
    const randID = new Date().getTime() + Math.floor(Math.random() * 1000);
    let newRows = this.state.rows;
    newRows.push({
      symbol: parseInt(delay),
      keyCode: parseInt(delay),
      action,
      id: newRows.length,
      color: "#faf0e3",
      uid: randID,
      ucolor: "transparent"
    });
    this.updateRows(newRows);
  };

  onAddDelayRnd = (delayMin, delayMax, action) => {
    const randID = new Date().getTime() + Math.floor(Math.random() * 1000);
    let newRows = this.state.rows;
    newRows.push({
      symbol: delayMin,
      keyCode: delayMax,
      action,
      id: newRows.length,
      color: "#faf0e3",
      uid: randID,
      ucolor: "transparent"
    });
    this.updateRows(newRows);
  };

  onAddSpecial = (keyCode, action) => {
    const randID = new Date().getTime() + Math.floor(Math.random() * 1000);
    let newRows = this.state.rows;
    let symbol = this.keymapDB.parse(keyCode);
    if (symbol.extraLabel !== undefined) {
      symbol = symbol.extraLabel + " " + symbol.label;
    } else {
      symbol = symbol.label;
    }
    newRows.push({
      symbol,
      keyCode,
      action,
      id: newRows.length,
      color: this.assignColor(keyCode),
      uid: randID,
      ucolor: "transparent"
    });
    this.updateRows(newRows);
  };

  addModifier = (rowID, modifierID) => {
    const { name, keyCode, color } = this.modifiers[modifierID];
    const randID = new Date().getTime() + Math.floor(Math.random() * 1000);
    const randColor = "#" + Math.floor(Math.abs(Math.sin(randID) * 16777215) % 16777215).toString(16);
    let newRows = this.state.rows;
    newRows.splice(rowID + 1, 0, {
      symbol: name,
      keyCode,
      action: 7,
      id: rowID + 1,
      color,
      uid: randID,
      ucolor: randColor
    });
    newRows.splice(rowID, 0, {
      symbol: name,
      keyCode,
      action: 6,
      id: rowID,
      color,
      uid: randID,
      ucolor: randColor
    });
    this.updateRows(newRows);
  };

  addModToKey = (rows, modID, modBit) => {
    const { name, keyCode, color } = this.modifiers[modID];
    const randID = new Date().getTime() + Math.floor(Math.random() * 1000);
    const randColor = "#" + Math.floor(Math.abs(Math.sin(randID) * 16777215) % 16777215).toString(16);
    let actions = rows;
    actions.splice(1, 0, {
      symbol: name,
      keyCode: keyCode,
      action: 7,
      id: 2,
      color: color,
      uid: randID,
      ucolor: randColor
    });
    actions.splice(0, 0, {
      symbol: name,
      keyCode: keyCode,
      action: 6,
      id: 0,
      color: color,
      uid: randID,
      ucolor: randColor
    });
    actions[1].keyCode = actions[1].keyCode ^ modBit;
    actions[1].symbol = this.keymapDB.parse(actions[1].keyCode).label;
    return actions;
  };

  onTextChange = event => {
    this.setState({ addText: event.target.value });
  };

  // onKeyPress function that pushes the received keyCode on the rows array
  onKeyPress = keyCode => {
    this.onAddSymbol(keyCode, 8);
  };

  onLayerPress = layer => {
    // console.log("layer", layer);
    this.onAddSpecial(layer, 5);
  };

  onMacrosPress = Macro => {
    // console.log("Macro", Macro);
    this.onAddSpecial(Macro, 5);
  };

  assignColor = keyCode => {
    let color = this.modifiers.filter(x => x.keyCode === keyCode);
    if (color === undefined || color.length == 0) {
      color = "#ededed";
    } else {
      color = color[0].color;
    }
    return color;
  };

  render() {
    return (
      <Styles>
        <Tab.Container id="macroCreator" defaultActiveKey="tabText">
          <div className="tabWrapper">
            <div className="tabCategories">
              <Title headingLevel={3} text={i18n.general.actions} />
              <Title headingLevel={5} text={i18n.general.record} />
              <RecordMacroModal />
              <Title headingLevel={5} text={i18n.general.add} />
              <Nav className="flex-column">
                <CustomTab eventKey="tabText" text="Text" icon={<IconLetterColor />} />
                <CustomTab eventKey="tabKeys" text="Keys" icon={<IconKeyboard />} />
                <CustomTab eventKey="tabLayers" text="Layers" icon={<IconLayers />} />
                <CustomTab eventKey="tabMacro" text="Macro" icon={<IconRobot />} />
                <CustomTab eventKey="tabMedia" text="Media & LED" icon={<IconNote />} />
                <CustomTab eventKey="tabMouse" text="Mouse" icon={<IconMouse />} />
                <CustomTab eventKey="tabDelay" text="Delay" icon={<IconStopWatch />} />
              </Nav>
            </div>
            <div className="tabContent">
              <div className="tabContentInner">
                <Title headingLevel={3} text={i18n.general.configure} />
                <Tab.Content>
                  <Tab.Pane eventKey="tabText">
                    <TextTab onAddText={this.onAddText} onTextChange={this.onTextChange} addText={this.state.addText} />
                  </Tab.Pane>
                  <Tab.Pane eventKey="tabKeys">
                    <KeysTab onKeyPress={this.onKeyPress} />
                  </Tab.Pane>
                  <Tab.Pane eventKey="tabLayers">
                    <LayersTab onLayerPress={this.onLayerPress} />
                  </Tab.Pane>
                  <Tab.Pane eventKey="tabMacro">
                    <MacroTab macros={this.props.macros} selectedMacro={this.props.selected} onMacrosPress={this.onMacrosPress} />
                  </Tab.Pane>
                  <Tab.Pane eventKey="tabMedia">
                    <MediaAndLightTab onAddSpecial={this.onAddSpecial} />
                  </Tab.Pane>
                  <Tab.Pane eventKey="tabMouse">
                    <MouseTab onAddSpecial={this.onAddSpecial} />
                  </Tab.Pane>
                  <Tab.Pane eventKey="tabDelay">
                    <DelayTab onAddDelay={this.onAddDelay} onAddDelayRnd={this.onAddDelayRnd} />
                  </Tab.Pane>
                </Tab.Content>
              </div>
            </div>
          </div>
        </Tab.Container>
      </Styles>
    );
  }
}

export default MacroCreator;
