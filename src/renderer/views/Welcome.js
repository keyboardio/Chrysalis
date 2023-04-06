// -*- mode: js-jsx -*-
/* Bazecor
 * Copyright (C) 2022  Dygmalab, Inc.
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
import Card from "react-bootstrap/Card";
import i18n from "../i18n";

import PageHeader from "../modules/PageHeader";
import Title from "../component/Title";
import ToastMessage from "../component/ToastMessage";
import { RegularButton } from "../component/Button";
import { IconKeyboard, IconFloppyDisk } from "../component/Icon";

const Styles = Styled.div`
height: inherit;
.main-container {
  overflow: hidden;
  height: 100vh;  
}
.welcome {
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  &.center-content {
    height: 100vh;  
  }
}
.welcomeInner {
    max-width: 960px;
    width: 100%;
    margin: auto;
}
.disclaimerContent {
  font-size: 15px;
  margin-top: 32px;
  line-height: 1.5em;
  font-weight: 500;
}
.card {
    padding: 0;
    
}
.card-header {
    padding: 24px 32px;
    background-color: transparent;
}
.card-body {
    padding: 24px 32px;
    font-size: 14px;
    font-weight: 401;
    border-radius: 16px;
    h3 {
        margin-bottom: 16px;
    }
    ul {
        margin: 0;
    }
    a {
        color: ${({ theme }) => theme.styles.dropdown.dropdownMenu.linkColor};
    }
}
.card-footer {
    padding: 24px 32px;
    border: none;
    background-color: ${({ theme }) => theme.styles.standardView.footerBackground};
}
.firmwareButton {
    display: flex;
    justify-content: flex-end;
    grid-gap: 8px;
}

.keyboardSelected {
    display: flex;
    grid-gap: 16px;
    align-items: center; 
    justify-content: space-between;
    h6 {
        opacity: 0.6;
        margin: 0;
    }
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
      await this.props.onConnect(device, null);
    } catch (err) {
      toast.error(<ToastMessage title={i18n.errors.preferenceFailOnSave} content={err.toString()} icon={<IconFloppyDisk />} />);
    }
  };

  render() {
    let focus = new Focus();
    const device = this.props.device.device || focus.device;

    const reconnectButton = focus._port && (
      <RegularButton onClick={this.reconnect} buttonText={i18n.welcome.reconnect} style="outline" />
    );

    return (
      <Styles>
        <Container fluid className="welcome center-content">
          <PageHeader text={i18n.welcome.title} />
          <div className="welcomeWrapper">
            <div className="welcomeInner">
              <Card className="welcomeCard">
                <Card.Header>
                  <div className="keyboardSelected">
                    <div className="content">
                      <Title text={device.info.displayName} headingLevel={4} />
                      {focus._port ? <Title text={focus._port.path} headingLevel={6} /> : ""}
                    </div>
                    <div className="icon">
                      <IconKeyboard />
                    </div>
                  </div>
                </Card.Header>
                <Card.Body>
                  <div>
                    <Title type="warning" text={i18n.welcome.bootloaderTitle} headingLevel={3} />
                    <p>{i18n.welcome.description}</p>

                    <span className="cardsub">
                      <ul style={{ lineHeight: "2rem" }}>
                        <li>{"This process will revert your keyboard's configuration back to factory settings."}</li>
                        <li>
                          {"Before proceeding, we recommend that you "}
                          <a href="https://support.dygma.com/hc/en-us/articles/360014262298">{"export and save your layers"}</a>
                          {"."}
                        </li>
                        <li>{"To exit Bootloader Mode, unplug and replug the USB-C cable to your Neuron."}</li>
                      </ul>
                    </span>
                  </div>
                </Card.Body>
                <Card.Footer>
                  <div className="firmwareButton">
                    {reconnectButton}
                    <RegularButton
                      buttonText={i18n.formatString(i18n.welcome.gotoUpdate, i18n.app.menu.firmwareUpdate)}
                      style={"primary"}
                      onClick={async () => {
                        this.props.history.push("/firmware-update");
                      }}
                    />
                  </div>
                </Card.Footer>
              </Card>
            </div>
          </div>
        </Container>
      </Styles>
    );
  }
}

export default withRouter(Welcome);
