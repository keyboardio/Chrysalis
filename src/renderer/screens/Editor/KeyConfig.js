import React, { Component } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import ToggleButtonGroup from "react-bootstrap/ToggleButtonGroup";
import ToggleButton from "react-bootstrap/ToggleButton";
import Styled from "styled-components";
import { CardDeck } from "react-bootstrap";
import { KeyPicker, LayerPicker, MiscPicker } from "../../components/KeyPicker";
import Keymap, { KeymapDB } from "../../../api/keymap";

const Style = Styled.div`
  .svgContainer{
    height:100%;
    min-width: 60vw;
    max-height: 20vh;
  }

  .configurator {
    z-index: 100;
    min-width: 1140px;
    width: 75vw;
    padding: 0;
    background-color: ${({ theme }) => theme.card.background};
    border-radius: 10px;
    box-shadow: 0 0 0.5rem 0.3rem rgba(0,0,0,0.1);
    .rows {
      margin: 0px;
      padding: 0px;
      justify-content:center;
      .main-card{
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
      modifs: tempModifs
    };

    this.SelectAction = this.SelectAction.bind(this);
    this.SelectModif = this.SelectModif.bind(this);
    this.onReplaceKey = this.onReplaceKey.bind(this);
    this.AssignMacro = this.AssignMacro.bind(this);
    this.parseModifs = this.parseModifs.bind(this);
  }
  componentDidUpdate() {
    if (this.state.actions !== this.props.actions) {
      this.setState({ actions: this.props.actions });
    }
  }

  parseModifs(keycode) {
    let modifs = [];
    let bits = keycode.toString(2);
    if (bits & 0b100000000) {
      // Ctrl Decoder
      modifs.push(1);
    }
    if (bits & 0b1000000000) {
      // Alt Decoder
      modifs.push(2);
    }
    if (bits & 0b10000000000) {
      // AltGr Decoder
      modifs.push(3);
    }
    if (bits & 0b100000000000) {
      // Shift Decoder
      modifs.push(0);
    }
    if (bits & 0b1000000000000) {
      // Win Decoder
      modifs.push(4);
    }
    return modifs;
  }

  SelectAction(event) {
    this.setState({ action: parseInt(event.target.value) });
  }

  SelectModif(event) {
    let mod = this.state.modifs;
    mod[this.state.action] = event;
    this.setState({ modifs: mod });
    this.checkAndReport(this.state.actions);
  }

  onReplaceKey(keycode) {
    let actions = this.state.actions;
    actions[this.state.action] = keycode;
    this.setState({ actions });
    this.checkAndReport(actions);
  }

  checkAndReport(actns) {
    const { action, modifs } = this.state;
    let state = 0;
    const event = modifs[action];
    if (event.includes(0)) {
      state += 2048;
    }
    if (event.includes(1)) {
      state += 256;
    }
    if (event.includes(2)) {
      state += 512;
    }
    if (event.includes(3)) {
      state += 1024;
    }
    if (event.includes(4)) {
      state += 4096;
    }
    let actions = actns;
    if (actions.length < 5) {
      while (actions.length < 5) {
        actions.push(0);
      }
    }
    const mask = 0b0000000011111111;
    let base =
      actions[action] < 8192 ? actions[action] & mask : actions[action];
    actions[action] = base + state;
    let superid = this.props.code.base + this.props.code.modified - 53916;
    console.log(superid, actions);
    if (actions[0] !== 0) {
      if (
        actions[1] === 0 &&
        actions[2] === 0 &&
        actions[3] === 0 &&
        actions[4] === 0
      ) {
        if (superid > 0) {
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
    this.onReplaceKey(event.target.value);
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
    return this.parseKey(this.state.actions[action]);
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
          <Col xs={8}>
            <Card.Text>{this.parseAction(0)}</Card.Text>
            <Card.Text>{this.parseAction(1)}</Card.Text>
            <Card.Text>{this.parseAction(2)}</Card.Text>
            <Card.Text>{this.parseAction(3)}</Card.Text>
            <Card.Text>{this.parseAction(4)}</Card.Text>
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
    const configurator = (
      <Card className="select-card">
        <Card.Body>
          <Card.Title>Select a key</Card.Title>
          <Form.Control
            type="text"
            value={this.parseAction(this.state.action)}
            readOnly
          ></Form.Control>

          <Card.Text>Add a modifier</Card.Text>
          <ToggleButtonGroup
            type="checkbox"
            value={this.state.modifs[this.state.action]}
            onChange={this.SelectModif}
          >
            <ToggleButton value={0}>Shift</ToggleButton>
            <ToggleButton value={1}>Ctrl</ToggleButton>
            <ToggleButton value={2}>Alt</ToggleButton>
            <ToggleButton value={3}>Alt Gr</ToggleButton>
            <ToggleButton value={4}>Win</ToggleButton>
          </ToggleButtonGroup>
        </Card.Body>
      </Card>
    );
    const MacroPicker = (
      <Form.Group controlId="Macro Picker">
        <Form.Label>
          <h5>Macro Select</h5>
        </Form.Label>
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
          onKeySelect={this.onReplaceKey}
          code={{ base: this.state.actions[this.state.action], modified: 0 }}
        />
        <Row className="nospacing">
          <Col xs={3} className="nospacing">
            <LayerPicker
              onKeySelect={this.onReplaceKey}
              code={{
                base: this.state.actions[this.state.action],
                modified: 0
              }}
            />
          </Col>
          <Col xs={6} className="nospacing">
            <MiscPicker
              onKeySelect={this.onReplaceKey}
              code={{
                base: this.state.actions[this.state.action],
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
              <Card.Header>SUPERPOWERS CONFIGURATOR MENU</Card.Header>
              <Card.Body style={{ padding: 0 }}>
                <Row
                  style={{
                    margin: 0,
                    left: 2,
                    width: -2
                  }}
                >
                  <Col xs={2} style={{ minHeight: "100%", padding: 0 }}>
                    {selector}
                  </Col>
                  <Col xs={3} style={{ minHeight: "100%", padding: 0 }}>
                    {configurator}
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
