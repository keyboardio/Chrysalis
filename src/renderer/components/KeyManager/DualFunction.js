import React, { Component } from "react";

// Local components

// React Components
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import Styled from "styled-components";

// Media
import OSL from "../../../../static/OSL.png";
import { isUnionTypeNode } from "typescript";

const Style = Styled.div`
.overflow {
  overflow: auto;
}
.overflow::-webkit-scrollbar {
  display: none;
}
.select-card {
    height: 290px;
    padding: 0;
}
.titles {
    margin-bottom: 0;
  }
.modbutton:not(:disabled):not(.disabled).active, .modbutton:not(:disabled):not(.disabled):active {
  background-color: #2a8af1;
  box-shadow: none;
}
.modbutton {
  margin-right: 0.4em;
}
.alignvert {
  padding-top: 10px;
  float: left;
}
.showbutton {
  margin 0;
}
.modbuttonrow {
  margin-left: 0;
}
.info {
  vertical-align: middle;
  font-size: 1.2rem;
  color: ${({ theme }) => theme.card.icon};
}
.selectButton {
  float: left;
  width: 100%;
  .dropdown-toggle{
    font-size: 0.97rem;
    width: 100%;
  }
}
.select-body {
  padding: 0.55rem;
}
.item-layer {
  p {
    margin-bottom: 0;
  }
}
`;
const TooltipStyle = Styled.div`
text-align: left;
.ttip-p {
  margin: 0;
}
.ttip-h {
  margin: 0;
  font-size: 1.3em;
}
`;

class Configurator extends Component {
  constructor(props) {
    super(props);

    this.state = {};

    this.modKey = [
      { name: "Mod.  Select", keynum: 0, alt: 0 },
      { name: "------------", keynum: -1, alt: -1 },
      { name: "Dual Control", keynum: 49169 },
      { name: "Dual Shift  ", keynum: 49425 },
      { name: "Dual Alt    ", keynum: 49681 },
      { name: "Dual Gui/OS ", keynum: 49937 },
      { name: "Dual Alt Gr ", keynum: 50705 }
    ];
    this.layerKey = [
      { name: "Layer Select", keynum: 0, alt: 0 },
      { name: "------------", keynum: -1, alt: -1 },
      { name: "Dual Layer 1", keynum: 51218 },
      { name: "Dual Layer 2", keynum: 51474 },
      { name: "Dual Layer 3", keynum: 51730 },
      { name: "Dual Layer 4", keynum: 51986 },
      { name: "Dual Layer 5", keynum: 52242 },
      { name: "Dual Layer 6", keynum: 52498 },
      { name: "Dual Layer 7", keynum: 52754 },
      { name: "Dual Layer 8", keynum: 53010 }
    ];
  }

  render() {
    const { keyCode, onKeySelect } = this.props;

    const layers = (
      <React.Fragment>
        <p className="titles">LAYER & KEY</p>
        <Row className="mx-0">
          <Col xs={6} className="p-0 pr-1 text-center">
            <DropdownButton
              id="Selectlayers"
              className="selectButton"
              drop={"up"}
              title={
                this.layerKey[
                  isNaN(keyCode.modified) ||
                  this.layerKey.every(e => e.keynum !== keyCode.modified)
                    ? 0
                    : this.layerKey.findIndex(o => o.keynum == keyCode.modified)
                ].name
              }
              value={
                keyCode.modified != 0
                  ? this.layerKey.map(i => i.keynum).includes(keyCode.modified)
                  : keyCode.modified
              }
              onSelect={value => onKeySelect(parseInt(value) + keyCode.base)}
            >
              {this.layerKey.map((item, id) => {
                return (
                  <Dropdown.Item
                    eventKey={item.keynum}
                    key={`item-${id}`}
                    disabled={item.keynum == -1}
                  >
                    <div className="item-layer">
                      <p>{item.name}</p>
                    </div>
                  </Dropdown.Item>
                );
              })}
            </DropdownButton>
          </Col>
          <Col xs={6} className="p-0 pr-1 text-center">
            <DropdownButton
              id="SelectMods"
              className="selectButton"
              drop={"up"}
              title={
                this.modKey[
                  isNaN(keyCode.modified) ||
                  this.modKey.every(e => e.keynum !== keyCode.modified)
                    ? 0
                    : this.modKey.findIndex(o => o.keynum == keyCode.modified)
                ].name
              }
              value={
                keyCode.modified != 0
                  ? this.modKey.map(i => i.keynum).includes(keyCode.modified)
                  : keyCode.modified
              }
              onSelect={value => onKeySelect(parseInt(value) + keyCode.base)}
            >
              {this.modKey.map((item, id) => {
                return (
                  <Dropdown.Item
                    eventKey={item.keynum}
                    key={`item-${id}`}
                    disabled={item.keynum == -1}
                  >
                    <div className="item-layer">
                      <p>{item.name}</p>
                    </div>
                  </Dropdown.Item>
                );
              })}
            </DropdownButton>
          </Col>
        </Row>
      </React.Fragment>
    );

    return <Style>{layers}</Style>;
  }
}

export default Configurator;
