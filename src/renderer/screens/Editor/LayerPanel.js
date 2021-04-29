/* eslint-disable react/jsx-filename-extension */
import React, { Component, Fragment } from "react";

// Bootstrap components
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import Tooltip from "react-bootstrap/Tooltip";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Styled from "styled-components";

// Icons
import {
  MdLock,
  MdShare,
  MdPublish,
  MdContentCopy,
  MdUnarchive,
  MdDelete,
  MdAdd,
  MdGetApp
} from "react-icons/md";

const toolsWidth = 45;

const Styles = Styled.div`
.layer-editor {
  width: ${toolsWidth * 4}px;
  float: left;
  margin-left: 0.5em;
  margin-top: 0.5em;
  position: absolute;
  padding: 0;
  background-color: ${({ theme }) => theme.card.background};
  border-radius: 10px;
  box-shadow: 0 0 0.5rem 0.3rem rgba(0,0,0,0.1);
  svg {
    vertical-align: initial;
  }

  .layer-tools {
    margin: 0;
    button {
      width: ${toolsWidth}px;
      color: ${({ theme }) => theme.colors.button.text};
      background-color: transparent;
      border: 0px;
      font-size: x-large;
    }
    button:hover {
      background-color: ${({ theme }) => theme.colors.button.disabled};
    }
    button:focus {
      background-color: ${({ theme }) => theme.colors.button.background};
      color: ${({ theme }) => theme.colors.button.text};
      box-shadow: none;
    }
    button:active {
      background-color: ${({ theme }) => theme.colors.button.active};
      box-shadow: none !important;
    }
  }
  .layers {
    margin: 0;
    justify-content: center;
    padding-top: 10px;
    .layer-button {
      width: 95%;
      border: 0px;
      font-size: small;
      color: ${({ theme }) => theme.colors.button.text};
      background-color: transparent;
    }
    button:hover {
      background-color: ${({ theme }) => theme.colors.button.disabled};
    }
    button:focus {
      background-color: ${({ theme }) => theme.colors.button.background};
      color: ${({ theme }) => theme.colors.button.text};
      box-shadow: none;
    }
    button:active {
      background-color: ${({ theme }) => theme.colors.button.active};
      box-shadow: none !important;
    }
    .btn-primary:not(:disabled):not(.disabled).active {
      background-color: ${({ theme }) => theme.colors.button.background};
      color: ${({ theme }) => theme.colors.button.text};
      box-shadow: none !important;
    }
    .button-content,
    .left,
    .right,
    .index {
      display: inline;
    }
    .index{
      float: left;
      border: 1px solid;
      border-radius: 100px;
      width: 22px;
    }
    .left{
      float: left;
      padding-left: 10px;
      vertical-align: middle;
    }
    .right {
      float: right;
      svg {
        vertical-align: sub;
        font-size: larger;
      }
    }
  }
  .layer-share {
    margin: 0;
    button {
      width: 50%;
      color: ${({ theme }) => theme.colors.button.text};
      background-color: transparent;
      border: 0px;
      font-size: x-large;
    }

    button:hover {
      background-color: ${({ theme }) => theme.colors.button.disabled};
    }
    button:focus {
      background-color: ${({ theme }) => theme.colors.button.background};
      color: ${({ theme }) => theme.colors.button.text};
      box-shadow: none;
    }
    button:active {
      background-color: ${({ theme }) => theme.colors.button.active};
      box-shadow: none !important;
    }
  }
}
}`;

export default class LayerPanel extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentLayer: props.currentLayer,
      isReadOnly: props.isReadOnly
    };
  }

  spare() {
    console.log("disabled");
  }

  LayerSel = id => {
    let { selectLayer } = this.props;
    console.log(id);
    selectLayer(id);
    this.setState = {
      currentLayer: id
    };
  };

  CButton(text, func, icon, disable) {
    const id = `tooltip-${text}`;

    return (
      <OverlayTrigger overlay={<Tooltip id={id}>{text}</Tooltip>}>
        <Button disabled={disable} onClick={func}>
          {icon}
        </Button>
      </OverlayTrigger>
    );
  }

  render() {
    const { isReadOnly } = this.state;
    const {
      layers,
      currentLayer,
      importTitle,
      exportTitle,
      exportAllTitle,
      importFunc,
      exportFunc,
      exportAllFunc,
      copyTitle,
      copyFunc,
      clearTitle,
      clearFunc
    } = this.props;

    const layerButtons = layers.map(({ name, id }, idx) => {
      const menuKey = `layer-menu-${id.toString()}`;
      return (
        <Button
          key={menuKey}
          onClick={() => {
            this.LayerSel(id);
          }}
          className="layer-button"
          active={currentLayer === id}
        >
          <div className="button-content">
            <div className="index">{id + 1}</div>
            <div className="left">{name}</div>
            <div className="right">
              {currentLayer === id && isReadOnly ? <MdLock /> : <></>}
            </div>
          </div>
        </Button>
      );
    });

    const buttons = (
      <>
        {/* {this.CButton("Add - Layer", this.spare, <MdAdd />, true)} */}
        {this.CButton(importTitle, importFunc, <MdGetApp />, false)}
        {this.CButton(exportTitle, exportFunc, <MdPublish />, false)}
        {this.CButton(copyTitle, copyFunc, <MdContentCopy />, false)}
        {this.CButton(clearTitle, clearFunc, <MdDelete />, false)}
      </>
    );

    const shareb = (
      <>
        {this.CButton(
          "Share your Layers! comming soon",
          this.spare,
          <MdShare />,
          true
        )}
        {this.CButton(exportAllTitle, exportAllFunc, <MdUnarchive />, false)}
      </>
    );

    return (
      <Styles>
        <Container fluid className="layer-editor">
          <Row className="layers">{layerButtons}</Row>
          <Row className="layer-tools">{buttons}</Row>
          <Row className="layer-share">{shareb}</Row>
        </Container>
      </Styles>
    );
  }
}
