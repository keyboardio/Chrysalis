import React, { Component } from "react";
import Styled from "styled-components";

// Local components

// React Components
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import Tooltip from "react-bootstrap/Tooltip";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import { MdInfo } from "react-icons/md";

// Media
import OSL from "../../../../static/OSL.png";
import { isUnionTypeNode } from "typescript";

const Style = Styled.div`
padding-top: 10px;
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
.modinfo {
  align-self: center;
  font-size: 1.2rem;
  margin-top: 4px;
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
.selectedState {
  button {
    background-color: ${({ theme }) => theme.colors.button.active};
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
      { name: "Select a Mod.", keynum: 0, alt: 0 },
      { name: "------------ ", keynum: -1, alt: -1 },
      { name: "Dual Control ", keynum: 49169 },
      { name: "Dual Shift   ", keynum: 49425 },
      { name: "Dual Alt     ", keynum: 49681 },
      { name: "Dual Gui/OS  ", keynum: 49937 },
      { name: "Dual Alt Gr  ", keynum: 50705 }
    ];
    this.layerKey = [
      { name: "Select a Layer", keynum: 0, alt: 0 },
      { name: "------------  ", keynum: -1, alt: -1 },
      { name: "Dual Layer 1  ", keynum: 51218 },
      { name: "Dual Layer 2  ", keynum: 51474 },
      { name: "Dual Layer 3  ", keynum: 51730 },
      { name: "Dual Layer 4  ", keynum: 51986 },
      { name: "Dual Layer 5  ", keynum: 52242 },
      { name: "Dual Layer 6  ", keynum: 52498 },
      { name: "Dual Layer 7  ", keynum: 52754 },
      { name: "Dual Layer 8  ", keynum: 53010 }
    ];
  }

  renderTooltip(tooltips) {
    return (
      <Tooltip id="select-tooltip" className="longtooltip">
        <TooltipStyle>
          {tooltips.map((tip, i) => {
            return (
              <React.Fragment key={`Tip-${i}`}>
                {i % 2 == 1 || !isNaN(tip[0]) ? (
                  <p className="ttip-p">{tip}</p>
                ) : (
                  <React.Fragment>
                    {i == 0 ? "" : <br></br>}
                    <h5 className="ttip-h">{tip}</h5>
                  </React.Fragment>
                )}
              </React.Fragment>
            );
          })}
        </TooltipStyle>
      </Tooltip>
    );
  }

  renderImgTooltip(img) {
    return (
      <Tooltip id="select-tooltip" className="longtooltip">
        <img src={img}></img>
      </Tooltip>
    );
  }

  render() {
    const { keyCode, onKeySelect, activeTab } = this.props;
    const isMod = [224, 225, 226, 227, 228, 229, 230, 231, 2530, 3043].includes(keyCode.base + keyCode.modified);
    // console.log("Check ISMOD", isMod);
    const dltext1 = "Dual-function keys";
    const dltext2 = "Dual-function keys have two functionalities:";
    const dltext3 = "1. When tapped, they send a character.";
    const dltext4 = "2. When held, they send a modifier or layer key.";

    const layers = (
      <React.Fragment>
        <Row className="mx-0">
          <p className="titles">ADD A DUAL-FUNCTION</p>
          <OverlayTrigger
            rootClose
            placement="top"
            delay={{ show: 250, hide: 400 }}
            overlay={this.renderTooltip([dltext1, dltext2, dltext3, dltext4])}
          >
            <MdInfo className="modinfo ml-2" />
          </OverlayTrigger>
        </Row>
        <Row className="mx-0">
          <Col xs={6} className="p-0 pr-1 text-center">
            <DropdownButton
              id="Selectlayers"
              className={`selectButton ${
                keyCode.modified > 0 && this.layerKey.map(i => i.keynum).includes(keyCode.modified) ? "selectedState" : ""
              }`}
              drop={"up"}
              disabled={isMod || activeTab == "super"}
              title={
                this.layerKey[
                  isNaN(keyCode.modified) || this.layerKey.every(e => e.keynum !== keyCode.modified)
                    ? 0
                    : this.layerKey.findIndex(o => o.keynum == keyCode.modified)
                ].name
              }
              value={keyCode.modified != 0 ? this.layerKey.map(i => i.keynum).includes(keyCode.modified) : keyCode.modified}
              onSelect={value => onKeySelect(parseInt(value) + keyCode.base)}
            >
              {this.layerKey.map((item, id) => {
                return (
                  <Dropdown.Item eventKey={item.keynum} key={`item-${id}`} disabled={item.keynum == -1}>
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
              className={`selectButton ${
                keyCode.modified > 0 && this.modKey.map(i => i.keynum).includes(keyCode.modified) ? "selectedState" : ""
              }`}
              drop={"up"}
              disabled={isMod || activeTab == "super"}
              title={
                this.modKey[
                  isNaN(keyCode.modified) || this.modKey.every(e => e.keynum !== keyCode.modified)
                    ? 0
                    : this.modKey.findIndex(o => o.keynum == keyCode.modified)
                ].name
              }
              value={keyCode.modified != 0 ? this.modKey.map(i => i.keynum).includes(keyCode.modified) : keyCode.modified}
              onSelect={value => onKeySelect(parseInt(value) + keyCode.base)}
            >
              {this.modKey.map((item, id) => {
                return (
                  <Dropdown.Item eventKey={item.keynum} key={`item-${id}`} disabled={item.keynum == -1}>
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
