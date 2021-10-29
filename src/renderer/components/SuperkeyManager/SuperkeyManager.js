/*
 * Copyright (C) 2021  Dygmalab, Inc.
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
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import i18n from "../../i18n";

// import SuperkeyForm from "./SuperkeyForm";
import SuperkeyList from "./SuperkeyList";

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
.selected: {
  background-color: white;
  color: dimgrey;
}
`;

class SuperkeyManager extends Component {
  constructor(props) {
    super(props);

    let selected;

    if (props.superkeys.length <= props.selected) {
      selected = props.superkeys.length - 1;
    } else {
      selected = props.selected;
    }

    this.state = {
      superkeys: props.superkeys,
      selected: selected,
      open: false
    };

    this.close = this.close.bind(this);
    this.accept = this.accept.bind(this);
    this.deleteSuperkey = this.deleteSuperkey.bind(this);
    this.duplicateSuperkey = this.duplicateSuperkey.bind(this);
    this.addSuperkey = this.addSuperkey.bind(this);
    this.changeSelected = this.changeSelected.bind(this);
    this.exit = this.exit.bind(this);
    this.superkeysRestore = this.superkeysRestore.bind(this);
  }

  close() {
    let superkeys = this.state.superkeys;
    superkeys[this.state.selected] = this.props.superkeys[this.state.selected];
    this.setState({
      superkeys
    });
    this.exit();
  }

  exit() {
    this.setState({
      open: false
    });
  }

  accept(superkeys) {
    this.setState({
      superkeys: superkeys
    });
    this.props.updateSuperkey(superkeys, -1);
    this.props.changeSelected(this.state.selected);
    this.exit();
  }

  addSuperkey() {
    if (this.state.superkeys.length < this.props.maxSuperkeys) {
      let aux = this.state.superkeys;
      const newID = aux.length;
      aux.push({
        actions: [],
        name: "Empty Superkey",
        id: newID,
        superkey: ""
      });
      this.props.updateSuperkey(aux, -1);
      this.changeSelected(newID);
    }
  }

  deleteSuperkey(selected) {
    if (this.state.superkeys.length > 0) {
      let aux = this.state.superkeys;
      aux.splice(selected, 1);
      aux = aux.map((item, index) => {
        let aux = item;
        aux.id = index;
        return aux;
      });
      if (selected >= this.state.superkeys.length - 1) {
        this.changeSelected(this.state.superkeys.length - 1);
      }
      this.props.updateSuperkey(aux, selected);
    }
  }

  duplicateSuperkey(selected) {
    let superkeys = this.state.superkeys;
    let aux = Object.assign({}, this.state.superkeys[selected]);
    aux.id = this.state.superkeys.length;
    aux.name = "Copy of " + aux.name;
    superkeys.push(aux);
    this.props.updateSuperkey(superkeys, -1);
    this.changeSelected(aux.id);
  }

  changeSelected(selected) {
    this.setState({
      selected
    });
    this.props.changeSelected(selected);
  }

  superkeysRestore(superkeys) {
    this.setState({
      superkeys: superkeys
    });
    this.changeSelected(0);
    this.props.updateSuperkey(superkeys, -1);
  }

  render() {
    const {
      superkeys,
      maxSuperkeys,
      selected,
      updateSuper,
      changeSelected,
      keymapDB
    } = this.props;
    console.log(superkeys);

    return (
      <Styles>
        <Card>
          <Card.Header>{i18n.editor.superkeys.title}</Card.Header>
          <Card.Body className="cardcontent">
            <Row>
              <Col xs="4">
                <SuperkeyList
                  superkeys={this.state.superkeys}
                  selected={this.state.selected}
                  changeSelected={this.changeSelected}
                />
              </Col>
              <Col xs="8">Form element</Col>
            </Row>
            {/* <SuperkeyForm
              key={this.state.superkeys.length + this.state.selected}
              superkeys={this.state.superkeys}
              close={this.close}
              selected={this.state.selected}
              accept={this.accept}
              keymapDB={keymapDB}
              deleteSuperkey={this.deleteSuperkey}
              addSuperkey={this.addSuperkey}
              disableAdd={
                this.state.superkeys.length === this.props.maxSuperkeys
              }
              changeSelected={this.changeSelected}
              duplicateSuperkey={this.duplicateSuperkey}
              superkeysRestore={this.superkeysRestore}
            /> */}
          </Card.Body>
        </Card>
      </Styles>
    );
  }
}

export default SuperkeyManager;
