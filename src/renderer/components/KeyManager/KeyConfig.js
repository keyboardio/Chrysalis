import React, { Component, Fragment } from "react";
import Styled from "styled-components";

// Internal components
import Keymap, { KeymapDB } from "../../../api/keymap";
import Picker from "./Picker";
import Configurator from "./Configurator";
import Keys from "./Keys";
import Selector from "./Selector";

// React Components
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";

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
  .rows {
    margin: 0px;
    padding: 0px;
    justify-content:center;
    .main-card{
      overflow: visible;
      border: none;
      box-shadow: none;
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
  height: 400px;
}
.selectButton{
  .dropdown-toggle{
    text-align: left;
    margin-top: 0.375rem;
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
.rowsection {
  margin: 0;
  left: 2;
  width: -2%;
}
.section {
  min-height: 100%;
  padding: 0;
}
.pickersection {
  min-height: 100%;
  padding: 0;
  margin-top: 31px;
}
.hidden {
  visibility: hidden;
}
.menuitem {
  p {
    margin-bottom: 0;
  }
}
.overflow {
  overflow: visible;
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
  background-color: ${({ theme }) => theme.card.background};
  padding: .2rem 1rem;
}
.nav-tabs .nav-link.active {
  color: ${({ theme }) => theme.colors.button.text};
  background-color: ${({ theme }) => theme.colors.button.background};
}
.fixed-width {
  max-width: 321px;
}
`;

class KeyConfig extends Component {
  constructor(props) {
    super(props);

    this.keymapDB = new KeymapDB();

    let tempModifs = Array(5);
    const temp = props.actions;
    temp.forEach((element, i) => {
      if (element > 255 && element < 8192) {
        tempModifs[i] = this.parseModifs(element);
      } else {
        tempModifs[i] = [];
      }
    });

    this.state = {
      action: 0,
      actions: temp,
      modifs: tempModifs,
      selectdual: 0,
      selectlayer: 0,
      activeTab: "editor",
      layerData: 0,
      showKB: false,
      pastkeyindex: props.keyIndex
    };

    this.SelectAction = this.SelectAction.bind(this);
    this.SelectModif = this.SelectModif.bind(this);
    this.onReplaceKey = this.onReplaceKey.bind(this);
    this.AssignMacro = this.AssignMacro.bind(this);
    this.parseModifs = this.parseModifs.bind(this);
    this.parseAction = this.parseAction.bind(this);
    this.changeTab = this.changeTab.bind(this);
    this.updatelayer = this.updatelayer.bind(this);
    this.showKeyboard = this.showKeyboard.bind(this);
  }
  componentDidUpdate() {
    let selectdual = 0;
    const keynum =
      this.props.code != null
        ? this.props.code.modified + this.props.code.base
        : 0;
    if (keynum >= 49169 && keynum <= 53266) {
      selectdual = (this.props.code.modified >>> 8) << 8;
      if (selectdual >= 51218 - 18) {
        selectdual += 18;
      } else {
        selectdual += 17;
      }
    } else {
      selectdual = 0;
    }
    let layerData = 0;
    if (keynum >= 17450 && keynum <= 17501) {
      layerData = keynum;
    } else {
      layerData = 0;
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
        selectdual,
        layerData,
        modifs: tempModifs,
        pastkeyindex: this.props.keyIndex
      });
    }
    if (this.props.keyIndex !== this.state.pastkeyindex) {
      this.setState({
        action: 0
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

  SelectAction(action) {
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
    if (actions === undefined || this.state.activeTab == "editor") {
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
    this.onReplaceKey(parseInt(event), -1);
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
    let actions = [this.state.actions[this.state.action], 0, 0, 0, 0];
    if (mov > 20000) {
      this.checkAndReport(
        actions,
        this.state.modifs,
        this.state.modifs,
        mov,
        this.state.selectdual
      );
      this.setState({ selectdual: mov });
      return;
    }
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
    this.setState({ activeTab: tab, action: 0 });
  }

  showKeyboard() {
    // toggle keyboard visibility
    this.setState({ showKB: !this.state.showKB });
  }

  render() {
    const {
      layerData,
      selectdual,
      action,
      actions,
      activeTab,
      showKB,
      modifs
    } = this.state;
    const selKey = this.parseAction(action);
    const selKeys = actions.map((a, i) => this.parseAction(i));

    return (
      <Style
        style={{
          marginLeft: "220px",
          marginTop: "30px",
          justifyContent: "center",
          display: "flex"
        }}
      >
        <Container fluid className="configurator">
          <Row className="rows">
            <Card className="main-card">
              {/* <Card.Header>SUPERPOWERS CONFIGURATOR MENU</Card.Header> */}
              <Card.Body className="section">
                <Row className="rowsection">
                  <Col xs={3} className="section fixed-width">
                    <Tabs
                      activeKey={activeTab}
                      onSelect={this.changeTab}
                      id="uncontrolled-tab-example"
                      className="Tabstyle"
                    >
                      <Tab eventKey="editor" title="KEYS">
                        <Keys
                          action={action}
                          actions={actions}
                          selKey={selKey}
                          modifs={modifs}
                          showKeyboard={this.showKeyboard}
                          activeKB={showKB}
                          SelectModif={this.SelectModif}
                          AssignMacro={this.AssignMacro}
                        />
                      </Tab>
                      <Tab eventKey="layer" title="LAYERS">
                        <Configurator
                          layerData={layerData}
                          selectdual={selectdual}
                          action={action}
                          selKey={selKey}
                          showKeyboard={this.showKeyboard}
                          updatelayer={this.updatelayer}
                          activeKB={showKB}
                        />
                      </Tab>
                      <Tab eventKey="super" title="SUPERKEYS">
                        <Selector
                          action={action}
                          actions={actions}
                          modifs={modifs}
                          selKeys={selKeys}
                          SelectAction={this.SelectAction}
                          SelectModif={this.SelectModif}
                          showKeyboard={this.showKeyboard}
                          onReplaceKey={this.onReplaceKey}
                          activeKB={showKB}
                          AssignMacro={this.AssignMacro}
                        />
                      </Tab>
                    </Tabs>
                  </Col>
                  <Col
                    xs={9}
                    className={showKB ? "pickersection" : "section hidden"}
                  >
                    <Picker
                      actions={actions}
                      action={action}
                      onReplaceKey={this.onReplaceKey}
                      activeTab={activeTab}
                    />
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
