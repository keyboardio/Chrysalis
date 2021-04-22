/* eslint-disable react/jsx-filename-extension */
/*
 * SVG keyboard representation for key picking
 * Made by Alejandro Parcet González From Dygma S.L.
 */

import React, { Component } from "react";
import Styled from "styled-components";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Button from "react-bootstrap/Button";

// Key Components

import Key from "./Key";
import Layers from "./Layers.json";

const Style = Styled.div`
  .svgContainer{
    width: 100%;
    height:100%;
  }

  .keyboard {
    position: absolute;
    right: 25px;
    width: 180px;
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
    font-size: xx-small;
    font-weight: 300;
    line-height: 0.5;
    padding: 0.8em;
  }
`;

export default class LayerPicker extends Component {
  constructor(props) {
    super(props);

    this.state = { selected: 0 };
    this.onKeyPress = this.onKeyPress.bind(this);
  }

  onKeyPress = keycode => {
    const { onKeySelect } = this.props;
    const { selected } = this.state;
    const moveTo = 17492 + keycode;
    const shiftTo = 17450 + keycode;
    const oneShotTo = 49161 + keycode;

    switch (selected) {
      case 0:
        onKeySelect(shiftTo);
        break;
      case 1:
        onKeySelect(moveTo);
        break;
      case 2:
        if (keycode > 7) {
          break;
        }
        onKeySelect(oneShotTo);
        break;
      default:
        break;
    }
  };

  render() {
    const { selected } = this.state;
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
        <Container fluid className="keyboard">
          <Row className="keys">
            <h6>Layer Navigation</h6>
            <ButtonGroup className="btngrp">
              <Button
                className={`btns ${selected === 0 ? "active" : ""}`}
                onClick={() => {
                  this.setState({ selected: 0 });
                }}
              >
                Shift
              </Button>
              <Button
                className={`btns ${selected === 1 ? "active" : ""}`}
                onClick={() => {
                  this.setState({ selected: 1 });
                }}
              >
                Move
              </Button>
              <Button
                className={`btns ${selected === 2 ? "active" : ""}`}
                onClick={() => {
                  this.setState({ selected: 2 });
                }}
              >
                One Shot
              </Button>
            </ButtonGroup>
            <svg className="svgContainer" viewBox="-15 0 160 156">
              {layers}
            </svg>
          </Row>
        </Container>
      </Style>
    );
  }
}
