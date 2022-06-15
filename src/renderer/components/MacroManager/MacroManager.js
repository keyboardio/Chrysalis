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
import Card from "react-bootstrap/Card";
import i18n from "../../i18n";

import MacroForm from "./MacroForm";
import Slider from "react-rangeslider";

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
`;

class MacroManager extends Component {
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
      selected: selected,
      freeMemory: 0,
      open: false
    };

    this.close = this.close.bind(this);
    this.accept = this.accept.bind(this);
    this.deleteMacro = this.deleteMacro.bind(this);
    this.addMacro = this.addMacro.bind(this);
    this.changeSelected = this.changeSelected.bind(this);
    this.exit = this.exit.bind(this);
    this.macrosRestore = this.macrosRestore.bind(this);
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
    const actionMap = macros.map(macro => {
      return macro.actions
        .map(action => {
          if (action.type > 1 && action.type < 6) {
            return [[action.type], [action.keyCode >> 8], [action.keyCode & 255]];
          } else {
            return [[action.type], [action.keyCode]];
          }
        })
        .concat([0]);
    });
    let mem = [].concat.apply([], actionMap.flat()).concat([0]).length;
    console.log(mem);
    this.setState({ freeMemory: mem });
    if (mem > 1999) {
      alert(
        "You exceeded the maximum capacity of actions in your macros. Please decrease the number of actions until the top right bar is no longer red"
      );
    }
  };

  render() {
    const { keymapDB } = this.props;

    return (
      <Styles>
        <Card className={"card"}>
          <Card.Header classes={"cardHeader cardTitle"}>
            <div className="macroHeaderMem">
              <div className="macroHeaderTitle">{i18n.editor.macros.title}</div>
              <div className="macroFreeMem">
                <span className="tagsfix">Keyboard Memory Used - 0%</span>
                <Slider
                  className={`memSlider ${this.state.freeMemory > 1899 ? "outOfMem" : ""}`}
                  min={0}
                  max={2000}
                  value={this.state.freeMemory}
                  tooltip={false}
                />
                <span className="tagsfix">100%</span>
              </div>
            </div>
          </Card.Header>
          <Card.Body classes={"cardcontent"}>
            <MacroForm
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
              macrosRestore={this.macrosRestore}
            />
          </Card.Body>
        </Card>
      </Styles>
    );
  }
}

export default MacroManager;
