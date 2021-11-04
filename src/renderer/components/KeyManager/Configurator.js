import React, { Component } from "react";

// Local components

// React Components
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import Styled from "styled-components";

// Media

const Style = Styled.div`
.overflow {
  overflow: visible;
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
  .dropdown-toggle{
    font-size: 0.97rem;
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

    this.layerLock = [
      { name: "None Selected", keynum: 0, alt: 0 },
      { name: "------------", keynum: -1, alt: -1 },
      { name: "Layer Lock 1", keynum: 17492 },
      { name: "Layer Lock 2", keynum: 17493 },
      { name: "Layer Lock 3", keynum: 17494 },
      { name: "Layer Lock 4", keynum: 17495 },
      { name: "Layer Lock 5", keynum: 17496 },
      { name: "Layer Lock 6", keynum: 17497 },
      { name: "Layer Lock 7", keynum: 17498 },
      { name: "Layer Lock 8", keynum: 17499 },
      { name: "Layer Lock 9", keynum: 17500 },
      { name: "Layer Lock 10", keynum: 17501 }
    ];
    this.layerSwitch = [
      { name: "None Selected", keynum: 0, alt: 0 },
      { name: "------------", keynum: -1, alt: -1 },
      { name: "Layer Switch 1", keynum: 17450 },
      { name: "Layer Switch 2", keynum: 17451 },
      { name: "Layer Switch 3", keynum: 17452 },
      { name: "Layer Switch 4", keynum: 17453 },
      { name: "Layer Switch 5", keynum: 17454 },
      { name: "Layer Switch 6", keynum: 17455 },
      { name: "Layer Switch 7", keynum: 17456 },
      { name: "Layer Switch 8", keynum: 17457 },
      { name: "Layer Switch 9", keynum: 17458 },
      { name: "Layer Switch 10", keynum: 17459 }
    ];
  }

  render() {
    const { keyCode, onKeySelect } = this.props;
    const KC = keyCode.base + keyCode.modified;

    const layers = (
      <React.Fragment>
        <br />
        <Row className="mx-0">
          <Col xs={6} className="px-0 text-center">
            <p className="titles alignvert">LAYER SWITCH</p>
          </Col>
          <Col xs={6} className="px-0 text-center">
            <DropdownButton
              id="Selectlayers"
              className="selectButton"
              drop={"up"}
              title={
                this.layerSwitch[
                  isNaN(KC) || KC < 17450 || KC > 17459
                    ? 0
                    : this.layerSwitch.findIndex(o => o.keynum == KC)
                ].name
              }
              value={
                KC != 0 ? this.layerSwitch.map(i => i.keynum).includes(KC) : KC
              }
              onSelect={value => onKeySelect(parseInt(value))}
            >
              {this.layerSwitch.map((item, id) => {
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
        <br />
        <Row className="mx-0">
          <Col xs={6} className="px-0 text-center">
            <p className="titles alignvert">LAYER LOCK</p>
          </Col>
          <Col xs={6} className="px-0 text-center">
            <DropdownButton
              id="Selectlayers"
              className="selectButton"
              drop={"up"}
              title={
                this.layerLock[
                  isNaN(KC) || KC < 17492 || KC > 17501
                    ? 0
                    : this.layerLock.findIndex(o => o.keynum == KC)
                ].name
              }
              value={
                KC != 0 ? this.layerLock.map(i => i.keynum).includes(KC) : KC
              }
              onSelect={value => onKeySelect(parseInt(value))}
            >
              {this.layerLock.map((item, id) => {
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
