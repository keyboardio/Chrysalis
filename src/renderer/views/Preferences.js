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
import GeneralSettings from "../modules/GeneralSettings/GeneralSettings";

import Focus from "../../api/focus";
import PageHeader from "../modules/PageHeader";

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
    selectedNeuron: 0
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

  render() {
    const devToolsSwitch = <Form.Check type="switch" checked={this.state.devTools} onChange={this.toggleDevTools} />;

    const verboseSwitch = <Form.Check type="switch" checked={this.state.verboseFocus} onChange={this.toggleVerboseFocus} />;

    return (
      <Styles>
        <Container fluid>
          <PageHeader text={i18n.preferences.title} style={"pageHeaderFlatBottom"} />
          {this.state.working && <Spinner role="status" />}
          <div className="wrapper wrapperBackground">
            <Form className="mb-5">
              <Container fluid>
                <Row className="justify-content-center">
                  <Col lg={6} md={12}>
                    <GeneralSettings
                      startContext={this.props.startContext}
                      cancelContext={this.props.cancelContext}
                      inContext={this.props.inContext}
                      selectDarkMode={this.selectDarkMode}
                      neurons={this.state.neurons}
                      selectedNeuron={this.state.selectedNeuron}
                      darkMode={this.state.darkMode}
                      connected={this.props.connected}
                    />
                  </Col>
                  <Col lg={6} md={12}>
                    <KeyboardSettings
                      startContext={this.props.startContext}
                      cancelContext={this.props.cancelContext}
                      inContext={this.props.inContext}
                      selectDarkMode={this.selectDarkMode}
                      darkMode={this.state.darkMode}
                      devToolsSwitch={devToolsSwitch}
                      verboseSwitch={verboseSwitch}
                      connected={this.props.connected}
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
