import React, { Component } from "react";
import Styled from "styled-components";

// React Boostrap Components
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import Tooltip from "react-bootstrap/Tooltip";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import { MdInfo } from "react-icons/md";

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
  padding-top: 3px;
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
.OSButton{
  .dropdown-toggle{
    text-align: left;
    padding-left: 20px;
    overflow-y: visible;
  }
}
.menuitem {
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

class OSMPicker extends Component {
  constructor(props) {
    super(props);

    this.state = {};
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
    const { keyCode, onKeySelect } = this.props;
    const KC = keyCode.base + keyCode.modified;
    const osmtext = "OneShot modifier";
    const osmtext2 =
      "One press modifier key, press and release once to affect the next keypress only";
    const osltext = "OneShot layer";
    const osltext2 =
      "One press layer key, press and release once to move to the selected layer for the next keypress only";
    const osm = [
      { name: "None Selected", keynum: 0, alt: 0 },
      { name: "------------", keynum: -1, alt: -1 },
      { name: "One Shot Left Control", keynum: 49153 },
      { name: "One Shot Left Shift", keynum: 49154 },
      { name: "One Shot Left Alt", keynum: 49155 },
      { name: "One Shot Left OS", keynum: 49156 },
      { name: "One Shot Right Control", keynum: 49157 },
      { name: "One Shot Right Shift", keynum: 49158 },
      { name: "One Shot AltGr", keynum: 49159 },
      { name: "One Shot Right OS", keynum: 49160 }
    ];
    const osl = [
      { name: "None Selected", keynum: 0, alt: 0 },
      { name: "------------", keynum: -1, alt: -1 },
      { name: "One Shot Layer 1", keynum: 49161 },
      { name: "One Shot Layer 2", keynum: 49162 },
      { name: "One Shot Layer 3", keynum: 49163 },
      { name: "One Shot Layer 4", keynum: 49164 },
      { name: "One Shot Layer 5", keynum: 49165 },
      { name: "One Shot Layer 6", keynum: 49166 },
      { name: "One Shot Layer 7", keynum: 49167 },
      { name: "One Shot Layer 8", keynum: 49168 }
    ];

    return (
      <Style>
        <Row className="mx-0 pt-1">
          <Col xs={8} className="px-0 text-center">
            <p className="titles alignvert">ONESHOT MODIFIERS</p>
            <OverlayTrigger
              rootClose
              placement="top"
              delay={{ show: 250, hide: 400 }}
              overlay={this.renderTooltip([osmtext, osmtext2])}
            >
              <MdInfo className={"info"} />
            </OverlayTrigger>
          </Col>
        </Row>
        <Row className="mx-0">
          <DropdownButton
            id="OSMPicker"
            drop={"up"}
            className={`OSButton ${
              keyCode.base + keyCode.modified > 0 &&
              osm
                .map(x => {
                  if (KC == x.keynum) return x.keynum;
                })
                .includes(KC)
                ? "selectedState"
                : ""
            }`}
            title={
              osm[
                isNaN(KC) || KC < 49153 || KC > 49160
                  ? 0
                  : osm.findIndex(o => o.keynum == KC)
              ].name
            }
            value={osm.map(x => {
              if (KC == x.keynum) return x.keynum;
            })}
            onSelect={value => onKeySelect(parseInt(value))}
          >
            {osm.map((x, id) => {
              return (
                <Dropdown.Item
                  eventKey={x.keynum}
                  key={`OSM-${id}`}
                  disabled={x.keynum == -1}
                >
                  <div className="menuitem">
                    <p>{x.name}</p>
                  </div>
                </Dropdown.Item>
              );
            })}
          </DropdownButton>
        </Row>
        <Row className="mx-0 pt-1">
          <Col xs={7} className="px-0 text-center">
            <p className="titles alignvert">ONESHOT LAYERS</p>
            <OverlayTrigger
              rootClose
              placement="top"
              delay={{ show: 250, hide: 400 }}
              overlay={this.renderTooltip([osltext, osltext2])}
            >
              <MdInfo className={"info"} />
            </OverlayTrigger>
          </Col>{" "}
        </Row>
        <Row className="mx-0">
          <DropdownButton
            id="OSLPicker"
            drop={"up"}
            className={`OSButton ${
              keyCode.modified > 0 &&
              osl.map(i => i.keynum).includes(keyCode.base + keyCode.modified)
                ? "selectedState"
                : ""
            }`}
            title={
              osl[
                isNaN(KC) || KC < 49161 || KC > 49168
                  ? 0
                  : osl.findIndex(o => o.keynum == KC)
              ].name
            }
            value={osl.map(x => {
              if (KC == x.keynum) return x.keynum;
            })}
            onSelect={value => onKeySelect(parseInt(value))}
          >
            {osl.map((x, id) => {
              return (
                <Dropdown.Item
                  eventKey={x.keynum}
                  key={`OSL-${id}`}
                  disabled={x.keynum == -1}
                >
                  <div className="menuitem">
                    <p>{x.name}</p>
                  </div>
                </Dropdown.Item>
              );
            })}
          </DropdownButton>
        </Row>
      </Style>
    );
  }
}

export default OSMPicker;
