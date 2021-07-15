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
import LayerMov from "./LayerMov.json";

const Style = Styled.div`
.layers {
  padding:0;
  .keys {
    margin: 0;
    padding: 0;
    width: 10vw;
  }
`;

export default class LayerMovPicker extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { code } = this.props;
    const isMovSel = code.base + code.modified - 17492 < 10;
    const isShiftSel = code.base + code.modified - 17450 < 10;
    const layers = LayerMov.map(key => {
      return (
        <Key
          key={`id-${key.content.second}`}
          x={key.x}
          y={key.y}
          selected={isMovSel ? true : isShiftSel ? true : false}
          clicked={() => {
            this.props.onKeySelect(key.id);
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
