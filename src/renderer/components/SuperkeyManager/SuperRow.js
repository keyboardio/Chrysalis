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
import { toast } from "react-toastify";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Dropdown from "react-bootstrap/Dropdown";
import ListGroup from "react-bootstrap/ListGroup";
import { MdClose, MdDragHandle } from "react-icons/md";

import PickedKey from "../KeyManager/PickedKey";

import i18n from "../../i18n";

const Styles = Styled.div`
margin-left: auto;
.listitem {
  display: flex;
  flex-direction: row;
  background-color: inherit;
  border: 0;
  margin: 0;
  padding: 0.5rem 0.5rem;
}
.category {
  width: 100px;
  place-self: center;
  text-align: start;
  margin: 0;
}
`;

export default class SuperRow extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  getItemStyle = (isDragging, draggableStyle) => ({
    // styles we need to apply on draggables
    ...draggableStyle,

    ...(isDragging && {
      // HACK This gives us some readability on both light and dark themes
      // , but it actually needs to be refactored to allow theme use
      background: "#9e9e9e"
    })
  });

  render() {
    const {
      provided,
      snapshot,
      superkey,
      selectedAction,
      updateAction,
      changeAction,
      id
    } = this.props;

    return (
      <Styles
        onClick={e => {
          changeAction(id);
        }}
      >
        <ListGroup.Item
          className={`listitem ${selectedAction == id ? "selected-act" : ""}`}
        >
          <PickedKey selKey={superkey} />
        </ListGroup.Item>
      </Styles>
    );
  }
}
