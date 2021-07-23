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
import ENi from "./ENi.json";
import ENa from "./ENa.json";
import GR from "./GR.json";
import FR from "./FR.json";
import NR from "./NR.json";

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
    const {
      code,
      disableMods,
      disableMove,
      selectedlanguage,
      kbtype
    } = this.props;
    const liso = {
      english: ENi,
      spanish: ES,
      german: GR,
      french: FR,
      nordic: NR
    };
    const lansi = { english: ENa };
    let Lang = ENa;
    if (selectedlanguage != "" && kbtype == "ansi") {
      if (lansi[selectedlanguage] != undefined) Lang = lansi[selectedlanguage];
    }
    if (selectedlanguage != "" && kbtype == "iso") {
      if (liso[selectedlanguage] != undefined) Lang = liso[selectedlanguage];
    }
    const keyboard = Lang.map((key, id) => {
      return (
        <Key
          key={`id-${key.content.first}-${id}`}
          x={key.x}
          y={key.y}
          selected={code === null ? false : code.base === key.id ? true : false}
          clicked={() => {
            key.mod == disableMods || key.move == disableMove
              ? {}
              : this.onKeyPress(key.id);
          }}
          centered={key.centered}
          content={key.content}
          disabled={key.mod == disableMods || key.move == disableMove}
        />
      );
    });
    return (
      <Style>
        <Container fluid className="keyboard">
          <Row className="keys">
            <svg className="" viewBox="0 0 1042 266">
              {keyboard}
            </svg>
          </Row>
        </Container>
      </Style>
    );
  }
}
