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
import Special from "./Special.json";
import Media from "./Media.json";
import LED from "./LED.json";
import MouseMov from "./MouseMov.json";
import MouseClick from "./MouseClick.json";
import MouseWheel from "./MouseWheel.json";

const Style = Styled.div`
  .svgContainer{
    width: 100%;
    height:100%;
  }

  .keyboard {
    position: absolute;
    right: 25px;
    width: 180px;
    margin-top: 280px;
    padding:0;
    background-color: ${({ theme }) => theme.card.background};
    border-radius: 10px;
    box-shadow: 0 0 0.5rem 0.3rem rgba(0,0,0,0.1);
    .keys {
      margin: 0px;
      padding: 10px;
      h6{
        margin-top: 5px;
        font-weight:300;
        color: lightgrey;
      }
    }
`;

export default class MiscPicker extends Component {
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
    const special = Special.map(key => {
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
    const media = Media.map(key => {
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
    const led = LED.map(key => {
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
    const mouseMov = MouseMov.map(key => {
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
    const mouseClick = MouseClick.map(key => {
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
    const mouseWheel = MouseWheel.map(key => {
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
        <Container fluid className="keyboard">
          <Row className="keys">
            <h6>Special Keys</h6>
            <svg className="svgContainer" viewBox="0 0 166 36">
              {special}
            </svg>
            <h6>Media Control</h6>
            <svg className="svgContainer" viewBox="-15 0 160 116">
              {media}
            </svg>
            <h6>LED Control</h6>
            <svg className="svgContainer" viewBox="-15 0 160 36">
              {led}
            </svg>
            <h6>Mouse Mov.</h6>
            <svg className="svgContainer" viewBox="-18 0 199 36">
              {mouseMov}
            </svg>
            <h6>Mouse Click</h6>
            <svg className="svgContainer" viewBox="-18 0 199 80">
              {mouseClick}
            </svg>
            <h6>Mouse Wheel</h6>
            <svg className="svgContainer" viewBox="-18 0 199 36">
              {mouseWheel}
            </svg>
          </Row>
        </Container>
      </Style>
    );
  }
}
