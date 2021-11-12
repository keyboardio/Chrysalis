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

import SuperkeyForm from "./SuperkeyForm";
import SuperkeyPicker from "./SuperkeyPicker";
import SuperkeyName from "./SuperkeyName";

const Styles = Styled.div`
.card {
  width: 520px;
  height: 100%;
  margin: 2rem;
  padding: 0;
  overflow: auto;
  background-color: ${({ theme }) => theme.card.altBackground};
  color: ${({ theme }) => theme.card.altColor};
  border-radius: 8px;
}
.card::-webkit-scrollbar {
  display: none;
}
.cardcontent {
  padding: 1rem;
  background-color: ${({ theme }) => theme.card.altBackgroundActive};
  border-radius: 8px;
}
.cardHeader {
  background-color: ${({ theme }) => theme.card.altBackground};
  border: 0;
}
.cardTitle {
  color: ${({ theme }) => theme.card.color};
}
.selected: {
  background-color: white;
  color: dimgrey;
}
.pickerRow {
  margin: 0rem;
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
      superkeys: Array.from(props.superkeys),
      selected: selected,
      open: false
    };

    this.close = this.close.bind(this);
    this.deleteSuperkey = this.deleteSuperkey.bind(this);
    this.addSuperkey = this.addSuperkey.bind(this);
    this.changeSelected = this.changeSelected.bind(this);
    this.exit = this.exit.bind(this);
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
      this.props.updateSuper(aux, newID);
    }
  }

  deleteSuperkey() {
    if (this.state.superkeys.length > 0) {
      let aux = Array.from(this.state.superkeys);
      let selected = this.props.selected;
      aux.splice(selected, 1);
      aux = aux.map((item, index) => {
        let aux = item;
        aux.id = index;
        return aux;
      });
      if (selected >= this.state.superkeys.length - 1) {
        this.props.checkKBSuperkeys(
          aux,
          aux.length - 1,
          aux.length - 1 + 53916
        );
      } else {
        this.props.checkKBSuperkeys(aux, selected, selected + 53916);
      }
    }
  }

  changeSelected(selected) {
    this.setState({
      selected
    });
    this.props.changeSelected(selected);
  }

  render() {
    const {
      superkeys,
      maxSuperkeys,
      macros,
      selected,
      updateSuper,
      changeSelected,
      saveName,
      selectedAction,
      updateAction,
      changeAction,
      keymapDB
    } = this.props;

    if (!Array.isArray(superkeys) || superkeys.length === 0)
      return <React.Fragment />;

    return (
      <Styles>
        <Card>
          <Card.Header className="cardHeader">
            <Row className="pickerRow">
              <SuperkeyPicker
                superkeys={superkeys}
                selected={selected}
                changeSelected={changeSelected}
                keymapDB={keymapDB}
                saveName={saveName}
                addSuperkey={this.addSuperkey}
                deleteSuperkey={this.deleteSuperkey}
                key={JSON.stringify(superkeys) + selected}
              />
            </Row>
          </Card.Header>
          <Card.Body className="cardcontent mx-4 mb-4 mt-2">
            <Row className="m-0">
              <SuperkeyName
                superkeys={superkeys}
                selected={selected}
                saveName={saveName}
                key={JSON.stringify(superkeys) + selected}
              />
            </Row>
            <Row className="m-0">
              <SuperkeyForm
                superkeys={superkeys}
                selected={selected}
                macros={macros}
                selectedAction={selectedAction}
                updateAction={updateAction}
                changeAction={changeAction}
                keymapDB={keymapDB}
              />
            </Row>
          </Card.Body>
        </Card>
      </Styles>
    );
  }
}

export default SuperkeyManager;
