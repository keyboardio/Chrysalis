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
import i18n from "../../i18n";
import Spinner from "react-bootstrap/Spinner";

import TimelineEditorForm from "./TimelineEditorForm";
import Title from "../../component/Title";
import { RegularButton } from "../../component/Button";

import { IconEye } from "../../component/Icon";

const Styles = Styled.div`
background-color: ${({ theme }) => theme.styles.macro.timelineBackground};
border-radius: 0px 0px 16px 16px;
padding-bottom: 20px;   
margin-top: 2px;
.timelineHeader {
    padding: 24px 32px;
    display: flex;
    align-items: baseline;
    h4 {
        font-size: 21px; 
        color: ${({ theme }) => theme.styles.macro.colorTitle};
        margin: 0;
    }
    .outline-sm {
      padding: 6px 12px;
      border: 1px solid ${({ theme }) => theme.colors.gray600};
      color: ${({ theme }) => theme.colors.gray300};
      margin-left: 24px;
      font-size: 14px;
    }
}
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
`;

class MacroManager extends Component {
  constructor(props) {
    super(props);

    this.trackingWidth = React.createRef();

    let selected;

    if (props.macros.length <= props.selected) {
      selected = props.macros.length - 1;
    } else {
      selected = props.selected;
    }

    this.state = {
      macros: props.macros,
      selected: selected,
      freeMemory: 0,
      open: false,
      componentWidth: 0
    };

    this.close = this.close.bind(this);
    this.accept = this.accept.bind(this);
    this.deleteMacro = this.deleteMacro.bind(this);
    this.duplicateMacro = this.duplicateMacro.bind(this);
    this.addMacro = this.addMacro.bind(this);
    this.changeSelected = this.changeSelected.bind(this);
    this.exit = this.exit.bind(this);
    this.macrosRestore = this.macrosRestore.bind(this);

    this.updateWidth = this.updateWidth.bind(this);
  }

  close() {
    let macros = this.state.macros;
    macros[this.state.selected] = this.props.macros[this.state.selected];
    this.setState({
      macros
    });
    this.exit();
  }

  exit() {
    this.setState({
      open: false
    });
  }

  accept(macros) {
    this.setState({
      macros: macros
    });
    this.props.updateMacro(macros, -1);
    this.props.changeSelected(this.state.selected);
    this.exit();
    this.updateFreeMemory(macros);
  }

  addMacro() {
    if (this.state.macros.length < this.props.maxMacros) {
      let aux = this.state.macros;
      const newID = aux.length;
      aux.push({
        actions: [],
        name: "Empty Macro",
        id: newID,
        macro: ""
      });
      this.props.updateMacro(aux, -1);
      this.changeSelected(newID);
    }
  }

  deleteMacro(selected) {
    if (this.state.macros.length > 0) {
      let aux = this.state.macros;
      aux.splice(selected, 1);
      aux = aux.map((item, index) => {
        let aux = item;
        aux.id = index;
        return aux;
      });
      if (selected >= this.state.macros.length - 1) {
        this.changeSelected(this.state.macros.length - 1);
      }
      this.props.updateMacro(aux, selected);
    }
  }

  duplicateMacro(selected) {
    let macros = this.state.macros;
    let aux = Object.assign({}, this.state.macros[selected]);
    aux.id = this.state.macros.length;
    aux.name = "Copy of " + aux.name;
    macros.push(aux);
    this.props.updateMacro(macros, -1);
    this.changeSelected(aux.id);
  }

  changeSelected(selected) {
    this.setState({
      selected
    });
    this.props.changeSelected(selected);
  }

  macrosRestore(macros) {
    this.setState({
      macros: macros
    });
    this.changeSelected(0);
    this.props.updateMacro(macros, -1);
  }

  updateFreeMemory = macros => {
    let mem = macros.map(m => m.actions).flat().length;
    this.setState({ freeMemory: mem });
    if (mem > 1999) {
      alert(
        "You exceeded the maximum capacity of actions in your macros. Please decrease the number of actions until the top right bar is no longer red"
      );
    }
  };

  updateWidth() {
    this.setState({
      componentWidth: 50
    });
    this.setState({
      componentWidth: this.trackingWidth.current.clientWidth
    });
  }

  componentDidMount() {
    // Additionally I could have just used an arrow function for the binding `this` to the component...
    this.updateWidth();
    window.addEventListener("resize", this.updateWidth);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateWidth);
  }

  render() {
    const { keymapDB } = this.props;

    return (
      <Styles>
        <div className="timelineHeader" ref={this.trackingWidth}>
          <Title text={i18n.editor.macros.timelineTitle} headingLevel={4} />
          <div id="portalPreviewMacroModal"></div>
        </div>
        {this.state.macros.length == 0 || !Array.isArray(this.state.macros) ? (
          <div className="loading marginCenter">
            <Spinner className="spinner-border" role="status" />
          </div>
        ) : (
          <TimelineEditorForm
            key={this.state.macros.length + this.state.selected}
            macros={this.state.macros}
            close={this.close}
            selected={this.state.selected}
            accept={this.accept}
            keymapDB={keymapDB}
            deleteMacro={this.deleteMacro}
            addMacro={this.addMacro}
            disableAdd={this.state.macros.length === this.props.maxMacros}
            changeSelected={this.changeSelected}
            duplicateMacro={this.duplicateMacro}
            macrosRestore={this.macrosRestore}
            componentWidth={this.state.componentWidth}
          />
        )}
        <div id="portalMacro"></div>
      </Styles>
    );
  }
}

export default MacroManager;
