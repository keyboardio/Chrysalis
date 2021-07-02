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
import { toast } from "react-toastify";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Dropdown from "react-bootstrap/Dropdown";
import Modal from "react-bootstrap/Modal";
import { MdClose, MdCreate, MdInfo, MdBuild } from "react-icons/md";
import i18n from "../../i18n";

import MacroForm from "./MacroForm";

const Styles = Styled.div`
.card {
  width: auto;
  height: 100%;
  margin: 4rem;
  padding: 0;
  overflow: visible;
  background-color: ${({ theme }) => theme.card.background};
  color: ${({ theme }) => theme.card.color};
}
.cardcontent {
  padding: 0px;
  &:last-child {
    padding-bottom: 0px;
  }
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
      open: false
    };

    this.close = this.close.bind(this);
    this.accept = this.accept.bind(this);
    this.deleteMacro = this.deleteMacro.bind(this);
    this.duplicateMacro = this.duplicateMacro.bind(this);
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
    this.props.updateMacro(macros);
    this.props.changeSelected(this.state.selected);
    this.exit();
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
      this.props.updateMacro(aux);
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
      this.props.updateMacro(aux);
    }
  }

  duplicateMacro(selected) {
    let macros = this.state.macros;
    let aux = Object.assign({}, this.state.macros[selected]);
    aux.id = this.state.macros.length;
    aux.name = "Copy of " + aux.name;
    macros.push(aux);
    this.props.updateMacro(macros);
    this.changeSelected(aux.id);
  }

  changeSelected(selected) {
    this.setState({
      selected
    });
  }

  macrosRestore(macros) {
    this.setState({
      macros: macros
    });
    this.changeSelected(0);
    this.props.updateMacro(macros);
  }

  render() {
    const { keymapDB } = this.props;

    return (
      <Styles>
        <Card className={"card"}>
          <Card.Header classes={"cardHeader cardTitle"}>
            {i18n.editor.macros.title}
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
              duplicateMacro={this.duplicateMacro}
              macrosRestore={this.macrosRestore}
            />
          </Card.Body>
        </Card>
      </Styles>
    );
  }
}

export default MacroManager;
