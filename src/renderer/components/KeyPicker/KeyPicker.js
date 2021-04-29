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
  .svgContainer{
    height:100%;
    min-width: 60vw;
    max-height: 20vh;
  }

  .keyboard {
    width: fit-content;
    float: left;
    padding:0;
    background-color: ${({ theme }) => theme.card.background};
    border-radius: 10px;
    box-shadow: 0 0 0.5rem 0.3rem rgba(0,0,0,0.1);
    .keys {
      margin: 0px;
      padding: 20px;
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
      <Style
        style={{
          marginLeft: "220px",
          marginRight: "450px",
          marginTop: "30px",
          justifyContent: "center",
          display: "flex"
        }}
      >
        <Container fluid className="keyboard">
          <Row className="keys">
            <svg className="svgContainer" viewBox="0 0 1184 197">
              {keyboard}
            </svg>
          </Row>
        </Container>
      </Style>
    );
  }
}
