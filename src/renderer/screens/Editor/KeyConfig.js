import React, { Component } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import ToggleButton from "react-bootstrap/ToggleButton";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import Styled from "styled-components";
import { MdDeleteForever } from "react-icons/md";
import {
  KeyPicker,
  LayerPicker,
  LayerMovPicker,
  MiscPicker
} from "../../components/KeyPicker";
import Keymap, { KeymapDB } from "../../../api/keymap";
import { Fragment } from "react";

const Style = Styled.div`
  .svgContainer{
    height:100%;
    min-width: 60vw;
    max-height: 20vh;
  }

.configurator {
  z-index: 100;
  background-color: transparent;
  min-width: 1140px;
  width: 75vw;
  padding: 0;
  border-radius: 10px;
  box-shadow: 0 0 0.5rem 0.3rem rgba(0,0,0,0.1);
  .rows {
    margin: 0px;
    padding: 0px;
    justify-content:center;
    .main-card{
      overflow: visible;
      background-color: transparent;
      padding: 0;
      width: -webkit-fill-available;
  }
}
.type-card {
    min-height: 100%;
}
.select-card {
    min-height: 100%;
    padding: 0;
}
.nospacing{
    padding: 0;
    margin: 0;
}
.dropdown-menu.show {
  display: block;
  overflow-y: auto;
}
.selectButton{
  .dropdown-toggle{
    text-align: left;
    padding-left: 20px;
    width: 50%;
  }
}
.dropup .dropdown-toggle::after {
  border-bottom: 0;
  border-top: .3em solid;
  border-right: .3em solid transparent;
  float: right;
  border-left: .3em solid transparent;
  margin-top: 10px;
}
.titles {
  padding-top: 24px;
  margin-bottom: 0;
}
.menuitem {
  p {
    margin-bottom: 0;
  }
}
.overflow {
  overflow: visible;
}
.modbutton:not(:disabled):not(.disabled).active, .modbutton:not(:disabled):not(.disabled):active {
  background-color: #2a8af1;
  box-shadow: none;
}
.modbutton {
  margin-right: 0.4em;
}
.modbuttonrow {
  margin-left: 0;
}
.selectedkey {
  width: 50%;
  border-radius: 0;
}
.card-title {
  margin-bottom: .3rem;
}
.card-header-tabs {
  margin: 0;
  border: 0;
}
.nav-tabs .nav-link {
  color: ${({ theme }) => theme.colors.button.text};
  background-color: ${({ theme }) => theme.colors.button.background};
  padding: .2rem 1rem;
}
.nav-tabs .nav-link.active {
  color: ${({ theme }) => theme.colors.button.text};
  background-color: ${({ theme }) => theme.card.background};
}
`;

class KeyConfig extends Component {
  constructor(props) {
    super(props);

    this.keymapDB = new KeymapDB();

    let tempModifs = Array(5);
    props.actions.forEach((element, i) => {
      if (element > 255 && element < 8192) {
        tempModifs[i] = this.parseModifs(element);
      } else {
        tempModifs[i] = [];
      }
    });

    const temp = this.props.actions;

    this.state = {
      action: 0,
      actions: temp,
      modifs: tempModifs,
      selectdual: 0,
      selectlayer: 0,
      activeTab: "editor",
      layerData: 0
    };

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

    this.SelectAction = this.SelectAction.bind(this);
    this.SelectModif = this.SelectModif.bind(this);
    this.onReplaceKey = this.onReplaceKey.bind(this);
    this.AssignMacro = this.AssignMacro.bind(this);
    this.parseModifs = this.parseModifs.bind(this);
    this.changeTab = this.changeTab.bind(this);
    this.updatelayer = this.updatelayer.bind(this);
  }
  componentDidUpdate() {
    let dual = 0;
    let disabledual = true;
    if (
      this.props.code != null &&
      this.props.code.modified >= 49169 &&
      this.props.code.modified <= 53266
    ) {
      dual = (this.props.code.modified >>> 8) << 8;
      if (dual >= 51218 - 18) {
        dual += 18;
      } else {
        dual += 17;
      }
      disabledual = false;
    } else {
      dual = 0;
    }

    let tempModifs = Array(5);
    this.props.actions.forEach((element, i) => {
      if (element > 255 && element < 8448) {
        tempModifs[i] = this.parseModifs(element);
      } else {
        tempModifs[i] = [];
      }
    });
    if (this.state.actions !== this.props.actions) {
      this.setState({
        actions: this.props.actions,
        selectdual: dual,
        disabledual: disabledual,
        modifs: tempModifs,
        disablecombo: tempModifs[0].length != 0 ? false : true
      });
    }
  }

  componentDidMount() {}

  parseModifs(keycode) {
    let modifs = [];
    if (keycode & 0b100000000) {
      // Ctrl Decoder
      modifs.push(1);
    }
    if (keycode & 0b1000000000) {
      // Alt Decoder
      modifs.push(2);
    }
    if (keycode & 0b10000000000) {
      // AltGr Decoder
      modifs.push(3);
    }
    if (keycode & 0b100000000000) {
      // Shift Decoder
      modifs.push(0);
    }
    if (keycode & 0b1000000000000) {
      // Win Decoder
      modifs.push(4);
    }
    return modifs;
  }

  SelectAction(event) {
    const action = parseInt(event.target.value);
    let newModifs = this.state.modifs;
    newModifs[action] = this.parseModifs(this.state.actions[action]);
    this.setState({
      action,
      modifs: newModifs,
      disablecombo: newModifs[action].length != 0 ? false : true
    });
  }

  SelectModif(event) {
    let mod = [...this.state.modifs];
    if (mod[this.state.action].includes(event)) {
      mod[this.state.action] = mod[this.state.action].filter(e => e !== event);
    } else {
      mod[this.state.action].push(event);
    }
    this.checkAndReport(
      this.state.actions,
      mod,
      this.state.modifs,
      this.state.selectdual,
      this.state.selectdual
    );
    this.setState({ modifs: mod });
  }

  onReplaceKey(keycode, num) {
    let actions = this.state.actions;
    let action;
    if (num === -1) {
      action = this.state.action;
    } else {
      action = num;
    }
    if (actions === undefined) {
      this.checkAndReport(
        [keycode, 0, 0, 0, 0],
        this.state.modifs,
        this.state.modifs,
        this.state.selectdual,
        this.state.selectdual
      );
      return;
    }
    actions[action] = keycode;
    this.setState({ actions, selectlayer: keycode });
    this.checkAndReport(
      actions,
      this.state.modifs,
      this.state.modifs,
      this.state.selectdual,
      this.state.selectdual
    );
  }

  checkAndReport(actns, modifs, previousmod, selectdual, previousdual) {
    const { action } = this.state;
    let state = 0;
    const ActModifs = modifs[action];
    if (ActModifs.includes(0)) {
      state += 2048;
    }
    if (ActModifs.includes(1)) {
      state += 256;
    }
    if (ActModifs.includes(2)) {
      state += 512;
    }
    if (ActModifs.includes(3)) {
      state += 1024;
    }
    if (ActModifs.includes(4)) {
      state += 4096;
    }
    let actions = actns;
    if (actions.length < 5) {
      while (actions.length < 5) {
        actions.push(0);
      }
    }
    const mask = 0b0000000011111111;
    if (modifs != previousmod) {
      let base =
        actions[action] < 8447 ? actions[action] & mask : actions[action];
      actions[action] = base + state;
    }
    if (previousdual !== selectdual) {
      state = selectdual;
      const aux = modifs;
      aux[action] = [];
      this.setState({ modifs: aux });
      // console.log("testing dualfunc \n");
      // console.log(
      //   "actions[action] value: ",
      //   actions[action],
      //   " y mask ",
      //   (actions[action] & mask) - 17,
      //   "\n"
      // );
      // console.log("state value: ", state, " y selectdual value ", selectdual);
      if (actions[action] >= 51218) {
        actions[action] = (actions[action] & mask) - 18 + state;
      } else {
        if (actions[action] >= 49169) {
          actions[action] = (actions[action] & mask) - 17 + state;
        } else {
          actions[action] = (actions[action] & mask) + state;
        }
      }
    }
    let superid = this.props.code.base + this.props.code.modified - 53916;
    // console.log("before sending: ", superid, actions);
    if (actions[0] !== 0) {
      if (
        actions[1] === 0 &&
        actions[2] === 0 &&
        actions[3] === 0 &&
        actions[4] === 0
      ) {
        if (superid >= 0) {
          this.props.delSuperKey(superid);
        }
        this.props.onKeySelect(actions[0]);
      } else {
        if (superid < 0) superid = this.props.newSuperID();
        this.props.onKeySelect(superid + 53916);
        this.props.setSuperKey(superid, actions);
      }
    } else {
      this.props.onKeySelect(0);
    }
  }

  AssignMacro(event) {
    this.onReplaceKey(parseInt(event.target.value), -1);
  }

  parseKey(keycode) {
    return this.props.code !== null
      ? this.keymapDB.parse(keycode).extraLabel != undefined
        ? this.keymapDB.parse(keycode).extraLabel +
          "." +
          this.keymapDB.parse(keycode).label
        : this.keymapDB.parse(keycode).label
      : "";
  }

  parseAction(action) {
    let aux;
    try {
      aux = this.parseKey(this.state.actions[action]);
    } catch (error) {
      aux = 0;
    }
    return aux;
  }

  updatelayer(mv) {
    const mov = parseInt(mv);
    console.log("Checking update layer", mov, this.state.layerData);
    this.setState({ layerData: mov });
    if (mov > 20000) {
      this.checkAndReport(
        this.state.actions,
        this.state.modifs,
        this.state.modifs,
        mov,
        this.state.selectdual
      );
      this.setState({ selectdual: mov });
      return;
    }
    let actions = [...this.state.actions];
    actions[this.state.action] = mov;
    this.setState({ actions });
    this.checkAndReport(
      actions,
      this.state.modifs,
      this.state.modifs,
      this.state.selectdual,
      this.state.selectdual
    );
  }

  changeTab(tab) {
    this.setState({ activeTab: tab });
  }

  render() {
    const selector = (
      <Card className="type-card">
        <Row>
          <Col xs={4}>
            <ButtonGroup vertical toggle>
              <ToggleButton
                type="radio"
                value={0}
                checked={this.state.action === 0}
                onChange={this.SelectAction}
              >
                Tap
              </ToggleButton>
              <ToggleButton
                type="radio"
                value={1}
                checked={this.state.action === 1}
                onChange={this.SelectAction}
              >
                Hold
              </ToggleButton>
              <ToggleButton
                type="radio"
                value={2}
                checked={this.state.action === 2}
                onChange={this.SelectAction}
              >
                T&H
              </ToggleButton>
              <ToggleButton
                type="radio"
                value={3}
                checked={this.state.action === 3}
                onChange={this.SelectAction}
              >
                2Tap
              </ToggleButton>
              <ToggleButton
                type="radio"
                value={4}
                checked={this.state.action === 4}
                onChange={this.SelectAction}
              >
                2T&H
              </ToggleButton>
            </ButtonGroup>
          </Col>
          <Col xs={6}>
            <Card.Text>{this.parseAction(0)}</Card.Text>
            <Card.Text>{this.parseAction(1)}</Card.Text>
            <Card.Text>{this.parseAction(2)}</Card.Text>
            <Card.Text>{this.parseAction(3)}</Card.Text>
            <Card.Text>{this.parseAction(4)}</Card.Text>
          </Col>
          <Col xs={2}>
            <Button size="sm" onClick={e => this.onReplaceKey(0, 0)}>
              <MdDeleteForever />
            </Button>

            <Button size="sm" onClick={e => this.onReplaceKey(0, 1)}>
              <MdDeleteForever />
            </Button>

            <Button size="sm" onClick={e => this.onReplaceKey(0, 2)}>
              <MdDeleteForever />
            </Button>

            <Button size="sm" onClick={e => this.onReplaceKey(0, 3)}>
              <MdDeleteForever />
            </Button>

            <Button size="sm" onClick={e => this.onReplaceKey(0, 4)}>
              <MdDeleteForever />
            </Button>
          </Col>
        </Row>
      </Card>
    );
    let enumerator = [];
    // const skeys = Array(64)
    //   .fill()
    //   .map((_, i) => i + 53916);
    const mcros = Array(64)
      .fill()
      .map((_, i) => i + 53852);
    // const shftto = Array(10)
    //   .fill()
    //   .map((_, i) => i + 17450);
    // const mvto = Array(10)
    //   .fill()
    //   .map((_, i) => i + 17492);
    // const onsht = Array(18)
    //   .fill()
    //   .map((_, i) => i + 49153);
    // enumerator = enumerator.concat(skeys, mcros, shftto, mvto, onsht);

    const mappedKN = this.dualkeys.map(i => {
      return i.keynum;
    });

    const dualFunction = (
      <DropdownButton
        id="SelectDualFunction"
        className="selectButton"
        drop={"up"}
        title={this.dualkeys.map(i => {
          if (this.state.layerData == i.keynum) {
            return i.name;
          }
        })}
        value={this.state.layerData}
        onSelect={this.updatelayer}
      >
        {this.dualkeys.map((item, id) => {
          return (
            <Dropdown.Item
              eventKey={item.keynum}
              key={`item-${id}`}
              disabled={item.keynum == -1}
            >
              <div className={"menuitem"}>
                <p>{item.name}</p>
              </div>
            </Dropdown.Item>
          );
        })}
      </DropdownButton>
    );
    const configurator = (
      <Card className="select-card overflow">
        <Card.Body>
          {this.state.activeTab == "editor" ? (
            <React.Fragment>
              <p className="titles">Add a Layer</p>
              {dualFunction}
            </React.Fragment>
          ) : (
            <React.Fragment>
              {/* <Form.Check
                type="switch"
                id="comboSwitch"
                className="toggle"
                label="Toggle Combo Modifiers"
                checked={!this.state.disablecombo}
                onChange={e => {
                  if (!this.state.disablecombo) {
                    this.clearcombo();
                  }
                  if (this.state.disablecombo && !this.state.disabledual) {
                    this.cleardual();
                  }
                  this.setState(state => {
                    let aux = state.disablecombo;
                    if (aux && !state.disabledual) {
                      aux = true;
                    } else {
                      aux = state.disabledual;
                    }
                    return {
                      disablecombo: !state.disablecombo,
                      disabledual: aux
                    };
                  });
                }}
              /> */}

              {this.state.actions[this.state.action] >= 17450 &&
              this.state.actions[this.state.action] <= 17502 ? (
                <React.Fragment>
                  <p className="titles">Change Layer travel</p>
                  <Row className="modbuttonrow">
                    <LayerPicker
                      onKeySelect={e => this.onReplaceKey(e, -1)}
                      code={{
                        base: this.state.actions[this.state.action],
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
                      active={this.state.modifs[this.state.action].includes(0)}
                      className="modbutton"
                      onClick={e => this.SelectModif(0)}
                    >
                      Shift
                    </Button>
                    <Button
                      active={this.state.modifs[this.state.action].includes(1)}
                      className="modbutton"
                      onClick={e => this.SelectModif(1)}
                    >
                      Ctrl
                    </Button>
                    <Button
                      active={this.state.modifs[this.state.action].includes(2)}
                      className="modbutton"
                      onClick={e => this.SelectModif(2)}
                    >
                      Alt
                    </Button>
                    <Button
                      active={this.state.modifs[this.state.action].includes(3)}
                      className="modbutton"
                      onClick={e => this.SelectModif(3)}
                    >
                      Alt Gr
                    </Button>
                    <Button
                      active={this.state.modifs[this.state.action].includes(4)}
                      className="modbutton"
                      onClick={e => this.SelectModif(4)}
                    >
                      Win
                    </Button>
                  </Row>
                </React.Fragment>
              )}
            </React.Fragment>
          )}
        </Card.Body>
      </Card>
    );
    const MacroPicker = (
      <Form.Group controlId="Macro Picker">
        {/* <Form.Label>
          <h5>Macro Select</h5>
        </Form.Label> */}
        <Form.Control as="select" htmlSize={4} onClick={this.AssignMacro}>
          {mcros.map((x, i) => {
            return (
              <option value={x} key={i}>
                {"Macro " + i}
              </option>
            );
          })}
        </Form.Control>
      </Form.Group>
    );
    const picker = (
      <Card className="select-card">
        <KeyPicker
          onKeySelect={e => this.onReplaceKey(e, -1)}
          code={{ base: this.parseAction(this.state.action), modified: 0 }}
        />
        <Row className="nospacing">
          <Col xs={3} className="nospacing">
            {/* <LayerPicker
              onKeySelect={e => this.onReplaceKey(e, -1)}
              code={{
                base: this.parseAction(this.state.action),
                modified: 0
              }}
            /> */}
            {this.state.activeTab == "super" ? (
              <LayerMovPicker
                onKeySelect={e => this.onReplaceKey(e, -1)}
                code={{
                  base: this.parseAction(this.state.action),
                  modified: 0
                }}
              />
            ) : (
              ""
            )}
          </Col>
          <Col xs={6} className="nospacing">
            <MiscPicker
              onKeySelect={e => this.onReplaceKey(e, -1)}
              code={{
                base: this.parseAction(this.state.action),
                modified: 0
              }}
            />
          </Col>
          <Col xs={2} className="nospacing">
            {MacroPicker}
          </Col>
        </Row>
      </Card>
    );

    return (
      <Style
        style={{
          marginLeft: "220px",
          marginRight: "450px",
          marginTop: "30px",
          justifyContent: "center",
          display: "flex"
        }}
      >
        <Container fluid className="configurator">
          <Row className="rows">
            <Card className="main-card">
              {/* <Card.Header>SUPERPOWERS CONFIGURATOR MENU</Card.Header> */}
              <Card.Body style={{ padding: 0 }}>
                <Row
                  style={{
                    margin: 0,
                    left: 2,
                    width: -2
                  }}
                >
                  {/* <Col xs={2} style={{ minHeight: "100%", padding: 0 }}>
                    {selector}
                  </Col>
                  <Col xs={3} style={{ minHeight: "100%", padding: 0 }}>
                    {configurator}
                  </Col> */}
                  <Col xs={5} style={{ minHeight: "100%", padding: 0 }}>
                    <Tabs
                      activeKey={this.state.activeTab}
                      onSelect={this.changeTab}
                      id="uncontrolled-tab-example"
                    >
                      <Tab eventKey="editor" title="KEY & LAYER">
                        {configurator}
                      </Tab>
                      <Tab eventKey="super" title="SUPERKEY">
                        <Row className="m-0">
                          <Col xs={5} style={{ minHeight: "100%", padding: 0 }}>
                            {selector}
                          </Col>
                          <Col xs={7} style={{ minHeight: "100%", padding: 0 }}>
                            {configurator}
                          </Col>
                        </Row>
                      </Tab>
                    </Tabs>
                  </Col>
                  <Col xs={7} style={{ minHeight: "100%", padding: 0 }}>
                    {picker}
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Row>
        </Container>
      </Style>
    );
  }
}

export default KeyConfig;
