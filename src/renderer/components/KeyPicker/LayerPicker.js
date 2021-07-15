/* eslint-disable react/jsx-filename-extension */
/*
 * SVG keyboard representation for key picking
 * Made by Alejandro Parcet González From Dygma S.L.
 */

import React, { Component } from "react";
import Styled from "styled-components";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Button from "react-bootstrap/Button";

// Key Components

import Key from "./Key";
import Layers from "./Layers.json";

const Style = Styled.div`
  .layers {
    padding:0;
    .keys {
      margin: 0;
      padding: 0;
      width: 10vw;
    }

  .btngrp{
    width: 80%;
    margin-left 10%;
    margin-bottom: 12px;
  }

  .btns{
    background-color: ${({ theme }) => theme.colors.button.background};
    border: 2px solid ${({ theme }) => theme.colors.button.disabled};
    color: ${({ theme }) => theme.colors.button.text};
    font-size: x-small;
    font-weight: 300;
    line-height: 0.5;
  }
`;

export default class LayerPicker extends Component {
  constructor(props) {
    super(props);

    this.onKeyPress = this.onKeyPress.bind(this);
  }

  onKeyPress = keycode => {
    const { onKeySelect, code } = this.props;
    const isMovSel = code.base + code.modified - 17492 < 10;
    const isShiftSel = code.base + code.modified - 17450 < 10;
    let aux = code.base + code.modified;
    if (isMovSel) {
      aux = 17492 + keycode;
    }
    if (isShiftSel) {
      aux = 17450 + keycode;
    }
    onKeySelect(aux);
  };

  render() {
    const { code } = this.props;
    const isMovSel = code.base + code.modified - 17492;
    const isShiftSel = code.base + code.modified - 17450;
    const layers = Layers.map(key => {
      return (
        <Key
          key={`id-${key.content.first}`}
          x={key.x}
          y={key.y}
          selected={
            isMovSel < 10
              ? isMovSel == key.id
                ? true
                : false
              : isShiftSel < 10
              ? isShiftSel == key.id
                ? true
                : false
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
        <Container fluid className="layers">
          <Row className="keys">
            <Col>
              {/* <h5>Layers</h5> */}
              <svg className="" viewBox="0 0 220 90">
                {layers}
              </svg>
            </Col>
          </Row>
        </Container>
      </Style>
    );
  }
}
