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
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";

import i18n from "../../i18n";

const Styles = Styled.div`
width: -webkit-fill-available;
display: flex;
height 40px;
.save-button {
  margin: 0;
  margin-left: 1rem;
  padding: 0 1rem;
  background: transparent;
  border: 2px solid ${({ theme }) => theme.card.altColor};
  color: ${({ theme }) => theme.card.altColor};
}
.fullheight {
  height 100%;
}
.form-container {
  border: 2px solid #DDD;
}
.form-style {
  border-radius: 0px;
  font-weight: 200;
}
`;

class SuperkeyList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      SKName: props.superkeys[props.selected].name
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    if (event.target.value.length <= 20) {
      this.setState({ SKName: event.target.value });
    }
  }

  render() {
    const { superkeys, selected, changeSelected } = this.props;

    return (
      <Styles>
        <Col className="p-0 form-container">
          <Form.Control
            type="text"
            placeholder="Name"
            value={this.state.SKName}
            onChange={this.handleChange}
            className="fullheight form-style"
          />
        </Col>
        <div>
          <Button onClick={e => this.props.saveName(this.state.SKName)} className="save-button fullheight">
            Save Name
          </Button>
        </div>
      </Styles>
    );
  }
}

export default SuperkeyList;
