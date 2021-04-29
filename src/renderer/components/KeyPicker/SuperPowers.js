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
import Combo from "./Combo.json";
import DualLayer from "./DualLayer.json";
import DualMod from "./DualMod.json";

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
  .title {
    margin: 0px;
    padding: 10px;
    padding-bottom: 3px;
    h6{
      margin-top: 5px;
      font-weight:300;
      color: lightgrey;
    }
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
    const combo = Combo.map(key => {
      return (
        <Key
          key={`id-${key.content.first}`}
          x={key.x}
          y={key.y}
          selected={
            this.props.code === null
              ? false
              : this.props.code.modified === key.id
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
    const dualLayer = DualLayer.map(key => {
      return (
        <Key
          key={`id-${key.content.first}`}
          x={key.x}
          y={key.y}
          selected={
            this.props.code === null
              ? false
              : this.props.code.modified === key.id
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
    const dualMod = DualMod.map(key => {
      return (
        <Key
          key={`id-${key.content.first}`}
          x={key.x}
          y={key.y}
          selected={
            this.props.code === null
              ? false
              : this.props.code.modified === key.id
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
        <Container fluid className="super">
          <Row className="title">
            <h6>Combo</h6>
            <svg className="svgContainer" viewBox="0 0 360 30">
              {combo}
            </svg>
          </Row>
          <Row className="title">
            <h6>Dual Layer</h6>
            <svg className="svgContainer" viewBox="0 0 360 40">
              {dualLayer}
            </svg>
          </Row>
          <Row className="title">
            <h6>Dual Mod</h6>
            <svg className="svgContainer" viewBox="0 0 360 30">
              {dualMod}
            </svg>
          </Row>
        </Container>
      </Style>
    );
  }
}
