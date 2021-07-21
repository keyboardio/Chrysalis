import React, { Component } from "react";

// Local components
import PickedKey from "./PickedKey";

// React Components
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import Tooltip from "react-bootstrap/Tooltip";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import { MdInfo } from "react-icons/md";
import Styled from "styled-components";
import { LayerPicker } from "../KeyPicker";

const Style = Styled.div`
.overflow {
  overflow: visible;
}
.select-card {
    min-height: 100%;
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
.showbutton {
  margin 0;
}
.modbuttonrow {
  margin-left: 0;
}
.info {
  vertical-align: middle;
  font-size: 1.2rem;
  color: #666;
}
`;

class Configurator extends Component {
  constructor(props) {
    super(props);

    this.state = {};

    this.layerLock = [
      { name: "None Selected", keynum: 0, alt: 0 },
      { name: "------------", keynum: -1, alt: -1 },
      { name: "Move to Layer 0", keynum: 17492 },
      { name: "Move to Layer 1", keynum: 17493 },
      { name: "Move to Layer 2", keynum: 17494 },
      { name: "Move to Layer 3", keynum: 17495 },
      { name: "Move to Layer 4", keynum: 17496 },
      { name: "Move to Layer 5", keynum: 17497 },
      { name: "Move to Layer 6", keynum: 17498 },
      { name: "Move to Layer 7", keynum: 17499 },
      { name: "Move to Layer 8", keynum: 17500 },
      { name: "Move to Layer 9", keynum: 17501 }
    ];
    this.layerSwitch = [
      { name: "None Selected", keynum: 0, alt: 0 },
      { name: "------------", keynum: -1, alt: -1 },
      { name: "Shift to Layer 0", keynum: 17450 },
      { name: "Shift to Layer 1", keynum: 17451 },
      { name: "Shift to Layer 2", keynum: 17452 },
      { name: "Shift to Layer 3", keynum: 17453 },
      { name: "Shift to Layer 4", keynum: 17454 },
      { name: "Shift to Layer 5", keynum: 17455 },
      { name: "Shift to Layer 6", keynum: 17456 },
      { name: "Shift to Layer 7", keynum: 17457 },
      { name: "Shift to Layer 8", keynum: 17458 },
      { name: "Shift to Layer 9", keynum: 17459 }
    ];
    this.layerKey = [
      { name: "None Selected", keynum: 0, alt: 0 },
      { name: "------------", keynum: -1, alt: -1 },
      { name: "Dual Layer 0", keynum: 51218 },
      { name: "Dual Layer 1", keynum: 51474 },
      { name: "Dual Layer 2", keynum: 51730 },
      { name: "Dual Layer 3", keynum: 51986 },
      { name: "Dual Layer 4", keynum: 52242 },
      { name: "Dual Layer 5", keynum: 52498 },
      { name: "Dual Layer 6", keynum: 52754 },
      { name: "Dual Layer 7", keynum: 53010 }
    ];
  }

  renderTooltip(line1, line2, line3, line4) {
    return (
      <Tooltip id="select-tooltip" className="longtooltip">
        <span>{line1}</span>
        {line2 == "" ? (
          ""
        ) : (
          <React.Fragment>
            <br></br>
            <span>{line2}</span>
          </React.Fragment>
        )}
        {line3 == "" ? (
          ""
        ) : (
          <React.Fragment>
            <br></br>
            <span>{line3}</span>
          </React.Fragment>
        )}
        {line4 == "" ? (
          ""
        ) : (
          <React.Fragment>
            <br></br>
            <span>{line4}</span>
          </React.Fragment>
        )}
      </Tooltip>
    );
  }

  render() {
    const {
      layerData,
      updatelayer,
      selectdual,
      action,
      selKey,
      showKeyboard,
      activeKB
    } = this.props;

    const swtext =
      "If you hold the key down, the layer becomes active and then deactivates when you let go.";
    const lktext = "Permanently move to a given layer.";
    const lktext2 =
      "To come back to the starting layer, set another Layer Lock key on the layer you moved to.";
    const lktext3 = "This new Layer Lock key must target the initial layer.";
    const dltext = "This key has two functionalities:";
    const dltext2 =
      "1. Hold it to activate the selected layer, but only as long as you keep this key pressed.";
    const dltext3 = "2. Tap it to send a key.";
    const dltext4 = "Previously called dual-function layer.";

    const layers = (
      <React.Fragment>
        <p className="titles">
          LAYER SWITCH{" "}
          <OverlayTrigger
            placement="right"
            delay={{ show: 250, hide: 400 }}
            overlay={this.renderTooltip(swtext, "", "", "")}
          >
            <MdInfo className={"info"} />
          </OverlayTrigger>
        </p>
        <DropdownButton
          id="Selectlayers"
          className="selectButton"
          drop={"up"}
          title={this.layerSwitch.map(i => {
            if (layerData != 0 && layerData == i.keynum) {
              return i.name;
            }
            if (layerData == 0 && selectdual == i.keynum) {
              return i.name;
            }
          })}
          value={layerData == 0 ? selectdual : layerData}
          onSelect={updatelayer}
        >
          {this.layerSwitch.map((item, id) => {
            return (
              <Dropdown.Item
                eventKey={item.keynum}
                key={`item-${id}`}
                disabled={item.keynum == -1}
              >
                <div className="menuitem">
                  <p>{item.name}</p>
                </div>
              </Dropdown.Item>
            );
          })}
        </DropdownButton>
        <hr />
        <p className="titles">
          LAYER LOCK{" "}
          <OverlayTrigger
            placement="right"
            delay={{ show: 250, hide: 400 }}
            overlay={this.renderTooltip(lktext, lktext2, lktext3, "")}
          >
            <MdInfo className={"info"} />
          </OverlayTrigger>
        </p>
        <DropdownButton
          id="Selectlayers"
          className="selectButton"
          drop={"up"}
          title={this.layerLock.map(i => {
            if (layerData != 0 && layerData == i.keynum) {
              return i.name;
            }
            if (layerData == 0 && selectdual == i.keynum) {
              return i.name;
            }
          })}
          value={layerData == 0 ? selectdual : layerData}
          onSelect={updatelayer}
        >
          {this.layerLock.map((item, id) => {
            return (
              <Dropdown.Item
                eventKey={item.keynum}
                key={`item-${id}`}
                disabled={item.keynum == -1}
              >
                <div className="menuitem">
                  <p>{item.name}</p>
                </div>
              </Dropdown.Item>
            );
          })}
        </DropdownButton>
        <hr />
        <p className="titles">
          LAYER & KEY{" "}
          <OverlayTrigger
            placement="right"
            delay={{ show: 250, hide: 400 }}
            overlay={this.renderTooltip(dltext, dltext2, dltext3, dltext4)}
          >
            <MdInfo className={"info"} />
          </OverlayTrigger>
        </p>
        <Row className="mx-0">
          <Col xs={6} className="px-0 text-center">
            <PickedKey
              activeKB={activeKB}
              hideTitle={true}
              action={action}
              selKey={selKey}
              showKeyboard={showKeyboard}
            />
          </Col>
          <Col xs={6} className="px-0 text-center">
            <DropdownButton
              id="Selectlayers"
              className="selectButton"
              drop={"up"}
              title={this.layerKey.map(i => {
                if (layerData != 0 && layerData == i.keynum) {
                  return i.name;
                }
                if (layerData == 0 && selectdual == i.keynum) {
                  return i.name;
                }
              })}
              value={layerData == 0 ? selectdual : layerData}
              onSelect={updatelayer}
            >
              {this.layerKey.map((item, id) => {
                return (
                  <Dropdown.Item
                    eventKey={item.keynum}
                    key={`item-${id}`}
                    disabled={item.keynum == -1}
                  >
                    <div className="menuitem">
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

    return (
      <Style>
        <Card className="select-card overflow">
          <Card.Body>{layers}</Card.Body>
        </Card>
      </Style>
    );
  }
}

export default Configurator;
