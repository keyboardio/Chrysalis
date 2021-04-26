// -*- mode: js-jsx -*-
/* Bazecor -- Kaleidoscope Command Center
 * Copyright (C) 2018, 2019  Keyboardio, Inc.
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
import Focus from "../../api/focus";
import Styled from "styled-components";
import { toast } from "react-toastify";
import { withRouter } from "react-router-dom";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

import { MdKeyboard } from "react-icons/md";
import i18n from "../i18n";

const Styles = Styled.div`
  cardsub{
    font-size: 1rem;
  }
  cardmain{
    font-weight: 500;
    padding-bottom: 1rem;
  }
  .welcome-row {
    justify-content: center;
    align-items: center;
    display: flex;
    padding-top: 15vh;
  }
  .welcome-col {
    min-width: 500px;
    max-width: 1000px;
  }
  .firmwareButton{
    justify-content: space-evenly;
  }
`;

class Welcome extends React.Component {
  state = {
    factoryResetStarted: false
  };

  startFactoryReset = () => {
    this.setState({ factoryResetStarted: true });
  };
  cancelFactoryReset = () => {
    this.setState({ factoryResetStarted: false });
  };

  reconnect = async () => {
    let focus = new Focus();
    const device = {
      path: focus._port.path,
      device: focus.device
    };

    try {
      await this.props.onConnect(device);
    } catch (err) {
      toast.error(err.toString());
    }
  };

  render() {
    let focus = new Focus();
    const device = this.props.device.device || focus.device;

    const reconnectButton = focus._port && (
      <Button variant="secondary" onClick={this.reconnect}>
        {i18n.welcome.reconnect}
      </Button>
    );

    return (
      <Styles>
        <Container fluid className="welcome">
          <Row className="title-row">
            <h4 className="section-title">{i18n.welcome.title}</h4>
          </Row>
          <Row className="welcome-row">
            <Col xs="4" className="welcome-col">
              <Card>
                <Card.Header>
                  <Row className="center">
                    <h1>
                      <MdKeyboard />
                    </h1>
                    <h3>{device.info.displayName}</h3>
                  </Row>
                  {focus._port && focus._port.path}
                </Card.Header>
                <Card.Body>
                  <div>
                    <h6 className="cardmain">
                      {"Your Raise is currently on Bootloader Mode"}
                    </h6>
                    <p className="cardsub">
                      {
                        "The LED in your Neuron should be pulsing blue and your Raise keyboard won't type."
                      }
                    </p>
                    <span className="cardsub">
                      <ul style={{ lineHeight: "2rem" }}>
                        <li>
                          {
                            "This process will revert your keyboard's configuration back to factory settings."
                          }
                        </li>
                        <li>
                          {"Before proceeding, we recommend that you "}
                          <a href="https://support.dygma.com/hc/en-us/articles/360014262298">
                            {"export and save your layers"}
                          </a>
                          {"."}
                        </li>
                        <li>
                          {
                            "To exit Bootloader Mode, unplug and replug the USB-C cable to your Neuron."
                          }
                        </li>
                      </ul>
                    </span>
                  </div>
                </Card.Body>
                <Card.Footer>
                  <Row className="firmwareButton">
                    {reconnectButton}
                    <Button
                      variant="primary"
                      onClick={async () => {
                        this.props.history.push("/firmware-update");
                      }}
                    >
                      {i18n.formatString(
                        i18n.welcome.gotoUpdate,
                        i18n.app.menu.firmwareUpdate
                      )}
                    </Button>
                  </Row>
                </Card.Footer>
              </Card>
            </Col>
          </Row>
        </Container>
      </Styles>
    );
  }
}

export default withRouter(Welcome);
