/* eslint-disable react/jsx-filename-extension */
/*
 * SVG keyboard representation for key picking
 * Made by Alejandro Parcet González From Dygma S.L.
 */

import React, { Component } from "react";
import Styled from "styled-components";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";

// Key Components

import Key from "./Key";
import ES from "./ES.json";

const Style = Styled.div`
  .keyboard {
    margin: 0;
    padding: 16px;
    .keys {
      margin: 0;
      padding: 0;
      justify-content:center;
    }
`;

export default class KeyPicker extends Component {
  constructor(props) {
    super(props);

    // this.state = { selected: 0 };
    this.onKeyPress = this.onKeyPress.bind(this);
  }

  onKeyPress = keycode => {
    const { onKeySelect } = this.props;
    onKeySelect(keycode);
  };

  render() {
    // const { selected } = this.state;
    const keyboard = ES.map((key, id) => {
      return (
        <Key
          key={`id-${key.content.first}-${id}`}
          x={key.x}
          y={key.y}
          selected={
            this.props.code === null
              ? false
              : this.props.code.base === key.id
              ? true
              : false
          }
          clicked={() => {
            this.onKeyPress(key.id);
          }}
          centered={key.centered}
          content={key.content}
        />
      );
    });
    return (
      <Style>
        <Container fluid className="keyboard">
          <Row className="keys">
            <svg className="" viewBox="0 0 1042 197">
              {keyboard}
            </svg>
          </Row>
        </Container>
      </Style>
    );
  }
}
