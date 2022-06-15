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

import SuperRow from "./SuperRow";

import Styled from "styled-components";
import ListGroup from "react-bootstrap/ListGroup";
import { MdDeleteForever, MdKeyboardArrowUp, MdKeyboardArrowDown, MdTimer } from "react-icons/md";
import { BsStarFill } from "react-icons/bs";

const Style = Styled.div`
.root {
  display: flex;
  flexWrap: wrap;
}
.margin {
  margin: 1rem;
}
.padding {
  padding: 0rem;
}
.textField {
  flex-basis: 444px;
  margin: 0px;
  margin-right: 2rem;
},
.code {
  width: -webkit-fill-available;
}
.button {
  float: right;
}
.buttonAdd {
  marginLeft: 25%;
}
.list {
  overflow: auto;
  align-items: center;
}
.list::-webkit-scrollbar {
  display: none;
}

.border {
  border: solid 1px #bbbbbb;
  border-radius: 4px;
}
.flex {
  display: flex;
}
.maxwidth {
  width: 100%;
}
.category {
  width: 100px;
  place-self: center;
  text-align: start;
  margin: 0;
}
.iconCategory {
  place-self: center;
  text-align: center;
  margin: 0;
  padding: 0 0.3rem;
}
.selected-act {
  background-color: ${({ theme }) => theme.card.backgroundActive} !important;
}
.pointer {
  cursor: pointer;
}
.rowblock:first-child {
  border-top: 1px solid ${({ theme }) => theme.colors.button.deselected};
  margin-top: 1rem;
}
.rowblock {
  border-bottom: 1px solid ${({ theme }) => theme.colors.button.deselected};
  background-color: transparent;
}
.rowblock:hover {
  background-color: ${({ theme }) => theme.colors.button.hover};
}
.rowblock:last-child {
  border: 0;
}
.actionIcon {
  place-self: center;
  padding: 0rem;
  background-color: ${({ theme }) => theme.card.ballIcon};
  margin-left: 1rem;
  border-radius: 24px;
}
.actionName {
  place-self: center;
  padding: 0.5rem;
}
.actionDelete {
  place-self: center;
  padding: 0.5rem;
  margin-left: 1rem;
  svg {
    font-size: 1.6rem;
  }
}
.iconClass {
  padding-bottom: 4px;
}
`;

class SuperkeyForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      rows: ["TAP", "HOLD", "TAP & HOLD", "2-TAP", "2-TAP & HOLD"]
    };

    this.onDragEnd = this.onDragEnd.bind(this);
  }

  reorder(list, startIndex, endIndex) {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  }

  onDragEnd(result) {
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    const rows = this.reorder(this.state.rows, result.source.index, result.destination.index);

    this.updateRows(rows);
  }

  onDeleteRow(id) {
    let uid = this.state.rows.filter(x => x.id === id)[0].uid;
    let aux = this.state.rows.filter(x => x.uid !== uid);
    this.updateRows(aux);
  }

  updateRows(rows) {
    console.log("SK Form updaterows", rows);
    // let texted = rows.map(k => this.keymapDB.parse(k.keyCode).label).join(" ");
    // let newRows = rows.map((item, index) => {
    //   let aux = item;
    //   aux.id = index;
    //   return aux;
    // });
    // this.setState({
    //   rows: newRows,
    //   macro: texted
    // });

    // this.props.updateActions(this.revertConversion(rows), texted);
  }

  render() {
    const { superkeys, selected, selectedAction, macros, updateAction, changeAction, keymapDB } = this.props;

    return (
      <Style>
        <ListGroup className={"list padding whitebg"}>
          {this.state.rows.map((item, index) => {
            const selecKey = keymapDB.parse(superkeys[selected].actions[index]);
            if (selecKey.extraLabel == "MACRO") {
              if (macros.length > parseInt(selecKey.label) && macros[parseInt(selecKey.label)].name.substr(0, 5) != "") {
                selecKey.label = macros[parseInt(selecKey.label)].name.substr(0, 5).toLowerCase();
              }
            }
            const text = (selecKey.extraLabel != undefined ? selecKey.extraLabel + " " : "") + selecKey.label;
            return (
              <div key={index} className={`rowblock maxwidth flex pointer ${selectedAction == index ? "selected-act" : ""}`}>
                <div
                  className="actionIcon"
                  onClick={e => {
                    changeAction(index);
                  }}
                >
                  <p className="iconCategory">
                    <BsStarFill className={"iconClass"} />
                  </p>
                </div>
                <div
                  className="actionName"
                  onClick={e => {
                    changeAction(index);
                  }}
                >
                  <p className="category">{item}</p>
                </div>
                <SuperRow
                  item={item}
                  id={index}
                  superkey={text}
                  modifiers={this.modifiers}
                  selectedAction={selectedAction}
                  updateAction={updateAction}
                  changeAction={changeAction}
                  actionTypes={this.actionTypes}
                  onDeleteRow={this.onDeleteRow}
                  addModifier={this.addModifier}
                />
                <div className="actionDelete" onClick={e => updateAction(index, 0)}>
                  <MdDeleteForever />
                </div>
              </div>
            );
          })}
        </ListGroup>
      </Style>
    );
  }
}

export default SuperkeyForm;
