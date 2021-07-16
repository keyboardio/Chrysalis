import React, { Component } from "react";

// Local components
import PickedKey from "./PickedKey";

// React Components
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
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
    padding-top: 24px;
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
`;

class Configurator extends Component {
  constructor(props) {
    super(props);

    this.state = {};

    this.dualkeys = [
      { name: "None Selected", keynum: 0, alt: 0 },
      { name: "----------------", keynum: -1, alt: -1 },
      { name: "Move to Layer 0", keynum: 17492 },
      { name: "Move to Layer 1", keynum: 17493 },
      { name: "Move to Layer 2", keynum: 17494 },
      { name: "Move to Layer 3", keynum: 17495 },
      { name: "Move to Layer 4", keynum: 17496 },
      { name: "Move to Layer 5", keynum: 17497 },
      { name: "Move to Layer 6", keynum: 17498 },
      { name: "Move to Layer 7", keynum: 17499 },
      { name: "Move to Layer 8", keynum: 17500 },
      { name: "Move to Layer 9", keynum: 17501 },
      { name: "Shift to Layer 0", keynum: 17450 },
      { name: "Shift to Layer 1", keynum: 17451 },
      { name: "Shift to Layer 2", keynum: 17452 },
      { name: "Shift to Layer 3", keynum: 17453 },
      { name: "Shift to Layer 4", keynum: 17454 },
      { name: "Shift to Layer 5", keynum: 17455 },
      { name: "Shift to Layer 6", keynum: 17456 },
      { name: "Shift to Layer 7", keynum: 17457 },
      { name: "Shift to Layer 8", keynum: 17458 },
      { name: "Shift to Layer 9", keynum: 17459 },
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

  render() {
    const {
      layerData,
      updatelayer,
      selectdual,
      action,
      actions,
      activeTab,
      selKey,
      showKeyboard,
      onReplaceKey,
      modifs,
      SelectModif
    } = this.props;

    const dualFunction = (
      <DropdownButton
        id="SelectDualFunction"
        className="selectButton"
        drop={"up"}
        title={this.dualkeys.map(i => {
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
        {this.dualkeys.map((item, id) => {
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
    );

    return (
      <Card className="select-card overflow">
        <Card.Body>
          {activeTab == "layer" ? (
            <React.Fragment>
              <p className="titles">Add a Layer</p>
              {dualFunction}
            </React.Fragment>
          ) : (
            <React.Fragment>
              <PickedKey
                action={action}
                selKey={selKey}
                showKeyboard={showKeyboard}
              />
              {actions != undefined ? (
                actions[action] >= 17492 && actions[action] <= 17502 ? (
                  <React.Fragment>
                    <p className="titles">Change Layer</p>
                    <Row className="modbuttonrow">
                      <LayerPicker
                        onKeySelect={e => onReplaceKey(e, -1)}
                        code={{
                          base: actions[action],
                          modified: 0
                        }}
                      />
                    </Row>
                  </React.Fragment>
                ) : (
                  <React.Fragment>
                    <p className="titles">Add a modifier</p>
                    <Row className="modbuttonrow">
                      <Button
                        active={modifs[action].includes(0)}
                        className="modbutton"
                        onClick={e => SelectModif(0)}
                      >
                        Shift
                      </Button>
                      <Button
                        active={modifs[action].includes(1)}
                        className="modbutton"
                        onClick={e => SelectModif(1)}
                      >
                        Ctrl
                      </Button>
                      <Button
                        active={modifs[action].includes(2)}
                        className="modbutton"
                        onClick={e => SelectModif(2)}
                      >
                        Alt
                      </Button>
                      <Button
                        active={modifs[action].includes(3)}
                        className="modbutton"
                        onClick={e => SelectModif(3)}
                      >
                        Alt Gr
                      </Button>
                      <Button
                        active={modifs[action].includes(4)}
                        className="modbutton"
                        onClick={e => SelectModif(4)}
                      >
                        Win
                      </Button>
                    </Row>
                  </React.Fragment>
                )
              ) : (
                ""
              )}
            </React.Fragment>
          )}
        </Card.Body>
      </Card>
    );
  }
}

export default Configurator;
