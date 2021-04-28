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

// Key Components

import Key from "./Key";
import Layers from "./SuperPowers.json";

const Style = Styled.div`
  .svgContainer{
    width: 100%;
    height:100%;
  }

  .super {
    position: absolute;
    right: 25px;
    width: 400px;
    margin-top: 0.5em;
    padding:0;
    background-color: ${({ theme }) => theme.card.background};
    border-radius: 10px;
    box-shadow: 0 0 0.5rem 0.3rem rgba(0,0,0,0.1);
    .keys {
      margin: 0px;
      padding: 10px;
      h6{
        margin-top: 10px;
        font-weight:300;
        color: lightgrey;
      }
    }

  .btngrp{
    width: 80%;
    margin-left 10%;
    margin-bottom: 12px;
  }

  .btns{
    background-color: white;
    border: 2px solid ${({ theme }) => theme.colors.button.background};
    color: ${({ theme }) => theme.colors.text};
    font-size: small;
    font-weight: 400;
    line-height: 0.5;
    padding: 0.8em;
  }
  .no-padding{
    padding: 0;
  }
`;

export default class SuperPowers extends Component {
  constructor(props) {
    super(props);
    this.onKeyPress = this.onKeyPress.bind(this);
  }

  onKeyPress = keycode => {
    const { onKeySelect } = this.props;
    onKeySelect(keycode);
  };

  render() {
    const layers = Layers.map(key => {
      return (
        <Key
          key={`id-${key.content.first}`}
          x={key.x}
          y={key.y}
          selected={false}
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
        <Container fluid className="super">
          <Row className="keys">
            <h6>Super Powers</h6>
          </Row>
          <Row className="keys">
            <Col sm="2">
              <span>Combo</span>
              <br />
              <span>Dual Layer</span>
              <br />
              <span>Dual Mod</span>
            </Col>
            <Col sm="10" className="no-padding">
              <svg className="svgContainer" viewBox="0 0 420 120">
                {layers}
              </svg>
            </Col>
          </Row>
        </Container>
      </Style>
    );
  }
}
