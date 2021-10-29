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
import Special from "./Special.json";
import Media from "./Media.json";
import LED from "./LED.json";
import Plugins from "./Plugins.json";
import MouseMov from "./MouseMov.json";
import MouseClick from "./MouseClick.json";
import MouseWheel from "./MouseWheel.json";

const Style = Styled.div`
  .keyboard {
    padding:0;
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
    .keys {
      margin: 0px;
      padding: 0px;
      padding-top: 3px;
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
    const media = Media.map(key => {
      return (
        <Key
          key={`id-${key.content.first}`}
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
    const led = LED.map(key => {
      return (
        <Key
          key={`id-${key.content.first}`}
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
    const plugins = Plugins.map(key => {
      return (
        <Key
          key={`id-${key.content.first}`}
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
    const mouseMov = MouseMov.map(key => {
      return (
        <Key
          key={`id-${key.content.first}`}
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
    const mouseClick = MouseClick.map(key => {
      return (
        <Key
          key={`id-${key.content.first}`}
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
    const mouseWheel = MouseWheel.map(key => {
      return (
        <Key
          key={`id-${key.content.first}`}
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
            <Col sm={4}>
              {/* <h5>Special</h5> */}
              <svg className="" viewBox="0 0 166 36">
                {special}
              </svg>
              <svg className="" viewBox="0 -10 125 46">
                {led}
              </svg>
            </Col>
            <Col sm={4}>
              {/* <h5>Media</h5> */}
              <svg className="" viewBox="0 0 126 130">
                {media}
              </svg>
            </Col>
            <Col sm={4}>
              {/* <h5>Mouse</h5> */}
              <svg className="" viewBox="-18 0 199 36">
                {mouseMov}
              </svg>
              <svg className="" viewBox="-18 0 199 36">
                {mouseWheel}
              </svg>
              <svg className="" viewBox="-18 0 199 80">
                {mouseClick}
              </svg>
            </Col>
          </Row>
        </Container>
      </Style>
    );
  }
}
