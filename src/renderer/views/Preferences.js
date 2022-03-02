// -*- mode: js-jsx -*-
/* Bazecor -- Kaleidoscope Command Center
 * Copyright (C) 2018, 2019  Keyboardio, Inc.
 * Copyright (C) 2019  DygmaLab SE
 *
 * This program is free software: you can redistribute it and/or modify it under
 * the terms of the GNU General Public License as published by the Free Software
 * Foundation, version 3.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

import React from "react";
import Electron, { app } from "electron";
import Styled from "styled-components";
import i18n from "../i18n";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Spinner from "react-bootstrap/Spinner";

// Custom modules imports
import { KeyboardSettings } from "../screens/Preferences/KeyboardSettings";
import { BackupSettings, GeneralSettings, NeuronSettings, AdvancedSettings } from "../modules/Settings";

import Focus from "../../api/focus";
import PageHeader from "../modules/PageHeader";
import Saving from "../modules/Saving";

const Store = require("electron-store");
const store = new Store();

const Styles = Styled.div`
  .toggle-button{
    text-align: center;
    padding-bottom: 8px;
  }
`;

class Preferences extends React.Component {
  state = {
    devTools: false,
    advanced: false,
    verboseFocus: false,
    darkMode: "system",
    neurons: store.get("neurons"),
    selectedNeuron: 0,
    neuronID: ""
  };

  componentDidMount() {
    const webContents = Electron.remote.getCurrentWebContents();
    this.setState({ devTools: webContents.isDevToolsOpened() });
    webContents.on("devtools-opened", () => {
      this.setState({ devTools: true });
    });
    webContents.on("devtools-closed", () => {
      this.setState({ devTools: false });
    });

    let focus = new Focus();
    this.setState({ verboseFocus: focus.debug });

    let darkModeSetting = store.get("settings.darkMode");
    if (darkModeSetting === undefined) {
      darkModeSetting = "system";
    }
    this.setState({ darkMode: darkModeSetting });

    focus.command("hardware.chip_id").then(neuronID => {
      neuronID = neuronID.replace(/\s/g, "");
      this.setState({ neuronID });
    });
  }

  toggleDevTools = event => {
    this.setState({ devTools: event.target.checked });
    if (event.target.checked) {
      Electron.remote.getCurrentWebContents().openDevTools();
    } else {
      Electron.remote.getCurrentWebContents().closeDevTools();
    }
  };

  setLanguage = async event => {
    i18n.setLanguage(event.target.value);
    await this.setState({});
    await store.set("settings.language", event.target.value);
  };

  toggleAdvanced = () => {
    this.setState(state => ({
      advanced: !state.advanced
    }));
  };

  selectDarkMode = key => {
    this.setState({ darkMode: key });
    this.props.toggleDarkMode(key);
  };

  toggleVerboseFocus = event => {
    this.setState({ verboseFocus: event.target.checked });
    let focus = new Focus();
    focus.debug = event.target.checked;
  };

  selectNeuron = value => {
    this.setState({
      selectedNeuron: parseInt(value)
    });
  };

  updateNeuronName = data => {
    let temp = this.state.neurons;
    temp[this.state.selectedNeuron].name = data;
    this.setState({
      neurons: temp
    });
    this.applyNeuronName(temp);
  };

  applyNeuronName = neurons => {
    store.set("neurons", neurons);
  };

  deleteNeuron = async () => {
    let result = await window.confirm(i18n.keyboardSettings.neuronManager.deleteNeuron);
    if (result) {
      let temp = JSON.parse(JSON.stringify(this.state.neurons));
      temp.splice(this.state.selectedNeuron, 1);
      this.setState({
        neurons: temp,
        selectedNeuron: temp.length - 1 > this.selectNeuron ? this.selectNeuron : temp.length - 1
      });
      store.set("neurons", temp);
    }
  };

  render() {
    const { neurons, selectedNeuron, darkMode, neuronID, devTools, verboseFocus } = this.state;
    const { startContext, cancelContext, inContext, connected } = this.props;
    const devToolsSwitch = <Form.Check type="switch" checked={devTools} onChange={this.toggleDevTools} />;
    const verboseSwitch = <Form.Check type="switch" checked={verboseFocus} onChange={this.toggleVerboseFocus} />;

    return (
      <Styles>
        <Container fluid>
          <PageHeader text={i18n.preferences.title} style={"pageHeaderFlatBottom"} saving={<Saving />} />
          {this.state.working && <Spinner role="status" />}
          <div className="wrapper wrapperBackground">
            <Form className="mb-5">
              <Container fluid>
                <Row className="justify-content-center">
                  <Col lg={6} md={12}>
                    <GeneralSettings
                      startContext={startContext}
                      cancelContext={cancelContext}
                      inContext={inContext}
                      selectDarkMode={this.selectDarkMode}
                      neurons={neurons}
                      selectedNeuron={selectedNeuron}
                      darkMode={darkMode}
                      connected={connected}
                    />
                    <BackupSettings neurons={neurons} selectedNeuron={selectedNeuron} neuronID={neuronID} connected={connected} />
                    <NeuronSettings
                      neurons={neurons}
                      selectedNeuron={selectedNeuron}
                      selectNeuron={this.selectNeuron}
                      updateNeuronName={this.updateNeuronName}
                      deleteNeuron={this.deleteNeuron}
                    />
                    <AdvancedSettings devToolsSwitch={devToolsSwitch} verboseSwitch={verboseSwitch} connected={connected} />
                  </Col>
                  <Col lg={6} md={12}>
                    <KeyboardSettings
                      startContext={startContext}
                      cancelContext={cancelContext}
                      inContext={inContext}
                      connected={connected}
                    />
                  </Col>
                </Row>
              </Container>
            </Form>
          </div>
        </Container>
      </Styles>
    );
  }
}

export default Preferences;
