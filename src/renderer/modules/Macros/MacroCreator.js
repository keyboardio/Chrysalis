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

    let selected;

    if (props.macros.length <= props.selected) {
      selected = props.macros.length - 1;
    } else {
      selected = props.selected;
    }

    this.state = {
      macros: props.macros,
      selected: selected
    };
  }

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
                    <TextTab />
                  </Tab.Pane>
                  <Tab.Pane eventKey="tabKeys">
                    <KeysTab macros={this.props.macros} />
                  </Tab.Pane>
                  <Tab.Pane eventKey="tabLayers">
                    <LayersTab />
                  </Tab.Pane>
                  <Tab.Pane eventKey="tabMacro">
                    <MacroTab macros={this.state.macros} selectedMacro={this.state.selected} />
                  </Tab.Pane>
                  <Tab.Pane eventKey="tabMedia">
                    <MediaAndLightTab />
                  </Tab.Pane>
                  <Tab.Pane eventKey="tabMouse">
                    <MouseTab />
                  </Tab.Pane>
                  <Tab.Pane eventKey="tabDelay">
                    <DelayTab />
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
