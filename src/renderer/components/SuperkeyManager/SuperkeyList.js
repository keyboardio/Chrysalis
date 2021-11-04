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
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Modal from "react-bootstrap/Modal";
import { MdClose, MdCreate, MdInfo, MdBuild } from "react-icons/md";

import i18n from "../../i18n";

const Styles = Styled.div`
.selected {
  background-color: white;
  color: dimgrey;
}
.listItem {
  background-color: inherit !important;
}
`;

class SuperkeyList extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { superkeys, selected, changeSelected } = this.props;

    return (
      <Styles>
        <ListGroup>
          {superkeys.map(item => (
            <div
              key={item.id}
              className={selected == item.id ? "selected" : ""}
            >
              <ListGroup.Item
                onClick={() => {
                  changeSelected(item.id);
                }}
                className="listItem"
              >
                <div style={{ display: "flex" }}>
                  <p>
                    {`${("0" + item.id).substr(-2)} - ${item.name}: ${
                      item.actions
                    }`}
                  </p>
                </div>
              </ListGroup.Item>
            </div>
          ))}
        </ListGroup>
      </Styles>
    );
  }
}

export default SuperkeyList;
