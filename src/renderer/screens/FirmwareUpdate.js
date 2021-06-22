// -*- mode: js-jsx -*-
/* Bazecor -- Kaleidoscope Command Center
 * Copyright (C) 2018, 2019  Keyboardio, Inc.
 * Copyright (C) 2019, 2020  DygmaLab SE
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
import Electron from "electron";
import path from "path";
import fs from "fs";
import { version } from "../../../package.json";

import Focus from "../../api/focus";
import FlashRaise from "../../api/flash";

import Styled from "styled-components";
import { toast } from "react-toastify";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Dropdown from "react-bootstrap/Dropdown";
import Modal from "react-bootstrap/Modal";
import {
  MdSettingsBackupRestore,
  MdExplore,
  MdInfo,
  MdBuild
} from "react-icons/md";

import { getStaticPath } from "../config";
import i18n from "../i18n";

const ModalStyle = Styled.div`
.flash-modal {
  max-width: 900px !important;
}
`;

const Styles = Styled.div`
.firmware-update {
  .firmware-row {
    justify-content: center;
    align-items: center;
    display: flex;
    padding-top: 15vh;
    .firmware-col {
      min-width: 500px;
      max-width: 500px;
      .firmware-card {
        background: ${({ theme }) => theme.card.background};
        min-height: 600px;
        .header{
          font-size: 2em;
          font-weight: 200;
          padding: 1rem;
          margin: -24px;
          text-align: center;
        }
        .body {
          margin-top: 1.5rem;
          padding 0;
          padding-top: 1.25rem;
          padding-bottom: 1.25rem;
          .flashingcol {
            text-align: center;
            .custombutton{
              float: left;
            }
            .flashingbutton {
              float: right;
            }
          }
        }
        .title {
          text-align: center;
        }
        .subtitle {
          color: darkgrey;
          text-align: center;
        }
        .loader {
          align-self: center;
          .spinner-border {
            width: 4rem;
            height: 4rem;
        }
      }
      .version {
        margin: 2rem;
        padding-top: 12px;
        padding-bottom: 12px;
        .white {
          color: white;
        }
        .body {
          padding: 0;
          margin: 0;
        }
        .title {
          font-weight: 200;
          font-size: 1.4rem;
        }
        .text {
          font-size: 2em;
          font-weight: 500;
          text-align: center;
        }
      }
      .preview {
        justify-content: center;
        align-items: center;
        display: flex;
        padding: 0px;

        .keyboard {
          justify-content: center;
          align-items: center;
          display: flex;
          svg {
            width: 80%;
            margin-bottom: 10px;
          }
        }
        .options {
          text-align: center;
          .selector {
            width: 100%;
            .dropdown-toggle::after{
              position: absolute;
              right: 10px;
              top: 30px;
            }
            .toggler {
              width: 100%;
              background-color: transparent;
              color: ${({ theme }) => theme.colors.button.text};
              border: 0;
              border-bottom: black 1px solid;
              border-radius: 0px;
              padding-bottom: 6px;
              :hover {
                background-color: transparent;
              }
            }
            .toggler:hover {
              border-bottom: black 2px solid;
              padding-bottom: 5px;
            }
            .toggler:focus {
              border-bottom: rgba($color: red, $alpha: 0.8) 2px solid;
              box-shadow: none;
            }
            .menu {
              width: inherit;
              justify-content: center;
              align-items: center;
              text-align: center;
            }
            .key-icon {
              background-color: ${({ theme }) =>
                theme.colors.button.background} !important;
              border-radius: 100%;
              padding: 0;
              max-width: 50px;
              height: 50px;
              svg {
                font-size: 2.1em;
                margin-top: 18%;
                width: 100%;
                color: ${({ theme }) => theme.colors.button.text};
              }
            }
            .key-text {
              span {
                width: 100%;
              }
            }
            .muted {
              color: rgba(140,140,140,0.8) !important;
            }
            a:hover {
              background-color: ${({ theme }) =>
                theme.colors.button.hover} !important;
            }
            .dropdown-item {
              display: inherit;
            }
          }
          .selector-error {
            color: red;
          }
        }
      }
    }
      .buttons {
        padding: 0px;
        button {
          width: 100%;
        }
        }
    }
  }
}
`;

class FirmwareUpdate extends React.Component {
  constructor(props) {
    super(props);

    let focus = new Focus();
    this.flashRaise = null;
    this.isDevelopment = process.env.NODE_ENV !== "production";

    this.state = {
      firmwareFilename: "",
      selected: "default",
      device: props.device || focus.device,
      confirmationOpen: false,
      countdown: null,
      firmwareDropdown: false,
      buttonText: {
        "": "Uploading ...",
        3: "Start countdown",
        2: "Wait",
        1: "Wait",
        0: "Press"
      },
      versions: null
    };
  }

  componentDidMount() {
    const focus = new Focus();
    let versions;

    focus.command("version").then(v => {
      if (!v) return;
      let parts = v.split(" ");
      versions = {
        bazecor: parts[0],
        kaleidoscope: parts[1],
        firmware: parts[2]
      };

      this.setState({ versions: versions });
    });
  }

  selectFirmware = event => {
    if (this.state.firmwareFilename != "") {
      this.setState({ firmwareFilename: "" });
      return;
    }

    let files = Electron.remote.dialog.showOpenDialog({
      title: i18n.firmwareUpdate.dialog.selectFirmware,
      filters: [
        {
          name: i18n.firmwareUpdate.dialog.firmwareFiles,
          extensions: ["hex"]
        },
        {
          name: i18n.firmwareUpdate.dialog.allFiles,
          extensions: ["*"]
        }
      ]
    });
    files.then(result => {
      let aux = result.filePaths[0] != undefined ? result.filePaths[0] : "";
      this.setState({ firmwareFilename: aux });
    });
  };

  _defaultFirmwareFilename = () => {
    const { vendor, product } = this.state.device.device.info;
    const cVendor = vendor.replace("/", ""),
      cProduct = product.replace("/", "");
    return path.join(getStaticPath(), cVendor, cProduct, "default.hex");
  };
  _experimentalFirmwareFilename = () => {
    const { vendor, product } = this.state.device.device.info;
    const cVendor = vendor.replace("/", ""),
      cProduct = product.replace("/", "");
    return path.join(getStaticPath(), cVendor, cProduct, "experimental.hex");
  };

  _flash = async () => {
    let focus = new Focus();
    let filename;
    const delay = ms => new Promise(res => setTimeout(res, ms));

    if (this.state.selected == "default") {
      filename = this._defaultFirmwareFilename();
    } else if (this.state.selected == "experimental") {
      filename = this._experimentalFirmwareFilename();
    } else {
      filename = this.state.firmwareFilename;
    }
    if (this.state.device.device.info.product === "Raise") {
      let count = setInterval(() => {
        const { countdown } = this.state;
        countdown === 0
          ? clearInterval(count)
          : this.setState({ countdown: countdown - 1 });
      }, 1000);
      await delay(3000);
      if (!focus.device.bootloader) {
        await this.flashRaise.resetKeyboard(focus._port);
      }
      this.setState({ countdown: "" });
    }

    try {
      if (focus.device.bootloader) {
        this.flashRaise.currentPort = this.props.device;
      }
      await focus.close();
      console.log("done closing focus");
      return await this.state.device.device.flash(
        focus._port,
        filename,
        this.flashRaise
      );
    } catch (e) {
      console.error(e);
    }
  };

  upload = async () => {
    await this.props.toggleFlashing();

    try {
      await this._flash();
    } catch (e) {
      console.error(e);
      const styles = {
        toastText: {
          fontSize: "1rem"
        },
        toastSubText: {
          fontSize: "0.9rem",
          fontStyle: "italic",
          fontWeight: 200,
          color: "#DDD"
        },
        toastButton1: {
          marginRight: "16px"
        },
        toastButton2: {
          marginLeft: "16px",
          float: "right"
        }
      };
      const action = ({ closeToast }) => (
        <Container container spacing={1}>
          <Row container item xs={12}>
            <p style={styles.toastText}>{i18n.firmwareUpdate.flashing.error}</p>
          </Row>
          <Row container item xs={12}>
            <p style={styles.toastSubText}>{e.message}</p>
          </Row>
          <Row container item xs={12}>
            <Col item xs={6}>
              <Button
                variant="contained"
                style={styles.toastButton1}
                onClick={() => {
                  const shell = Electron.remote && Electron.remote.shell;
                  shell.openExternal(
                    "https://support.dygma.com/hc/en-us/articles/360017056397"
                  );
                }}
              >
                Troubleshooting
              </Button>
            </Col>
            <Col item xs={6}>
              <Button onClick={closeToast} style={styles.toastButton2}>
                Dismiss
              </Button>
            </Col>
          </Row>
        </Container>
      );
      toast.error(action);
      this.props.toggleFlashing();
      this.props.onDisconnect();
      this.setState({ confirmationOpen: false });
      return;
    }

    return new Promise(async resolve => {
      let focus = new Focus();
      if (this.state.versions) await focus.command("led.mode 0");
      setTimeout(() => {
        toast.success(i18n.firmwareUpdate.flashing.success);
        this.props.toggleFlashing();
        this.props.onDisconnect();
        this.setState({ confirmationOpen: false });
        resolve();
      }, 1000);
    });
  };

  uploadRaise = async () => {
    let focus = new Focus();
    if (this.state.versions) await focus.command("led.mode 1");
    this.setState({ confirmationOpen: true, isBeginUpdate: true });
    try {
      this.flashRaise = new FlashRaise(this.props.device);
      if (!focus.device.bootloader) {
        await this.flashRaise.backupSettings();
      }
      this.setState({ countdown: 3 });
    } catch (e) {
      console.error(e);
      const styles = {
        toastText: {
          fontSize: "1rem"
        },
        toastSubText: {
          fontSize: "0.9rem",
          fontStyle: "italic",
          fontWeight: 200,
          color: "#DDD"
        },
        toastButton1: {
          marginRight: "16px"
        },
        toastButton2: {
          marginLeft: "16px",
          float: "right"
        }
      };
      const action = ({ closeToast }) => (
        <Row container spacing={1}>
          <Row container item xs={12}>
            <p style={styles.toastText}>{i18n.firmwareUpdate.flashing.error}</p>
          </Row>
          <Row container item xs={12}>
            <p style={styles.toastSubText}>{e.message}</p>
          </Row>
          <Row container item xs={12}>
            <Col item xs={6}>
              <Button
                variant="contained"
                style={styles.toastButton1}
                onClick={() => {
                  const shell = Electron.remote && Electron.remote.shell;
                  shell.openExternal(
                    "https://support.dygma.com/hc/en-us/articles/360007272638"
                  );
                }}
              >
                Troubleshooting
              </Button>
            </Col>
            <Col item xs={6}>
              <Button onClick={closeToast} style={styles.toastButton2}>
                Dismiss
              </Button>
            </Col>
          </Row>
        </Row>
      );
      toast.error(action);
      this.setState({ confirmationOpen: false });
    }
  };

  cancelDialog = async () => {
    let focus = new Focus();
    if (this.state.versions) await focus.command("led.mode 0");
    this.setState({ confirmationOpen: false });
  };

  render() {
    const {
      firmwareFilename,
      buttonText,
      countdown,
      isBeginUpdate,
      versions,
      firmwareDropdown
    } = this.state;

    let filename = null;
    if (firmwareFilename) {
      filename = firmwareFilename.split(/[\\/]/);
      filename = filename[filename.length - 1];
    }

    const defaultFirmwareItemText = i18n.formatString(
      i18n.firmwareUpdate.defaultFirmware,
      version
    );
    const defaultFirmwareItem = (
      <Dropdown.Item
        value="default"
        selected={this.state.selected == "default"}
      >
        <MdSettingsBackupRestore />
        <Dropdown.ItemText
          primary={defaultFirmwareItemText}
          secondary={i18n.firmwareUpdate.defaultFirmwareDescription}
        />
      </Dropdown.Item>
    );
    let hasDefaultFirmware = true;
    try {
      fs.accessSync(this._defaultFirmwareFilename(), fs.constants.R_OK);
    } catch (_) {
      hasDefaultFirmware = false;
    }

    const experimentalFirmwareItemText = i18n.formatString(
      i18n.firmwareUpdate.experimentalFirmware,
      version
    );
    const experimentalFirmwareItem = (
      <Dropdown.Item
        value="experimental"
        selected={this.state.selected == "experimental"}
      >
        <MdExplore />
        <Dropdown.ItemText
          primary={experimentalFirmwareItemText}
          secondary={i18n.firmwareUpdate.experimentalFirmwareDescription}
        />
      </Dropdown.Item>
    );
    let hasExperimentalFirmware = true;

    try {
      fs.accessSync(this._experimentalFirmwareFilename(), fs.constants.R_OK);
    } catch (_) {
      hasExperimentalFirmware = false;
    }

    const firmwareSelect = (
      <Dropdown
        className="selector"
        show={firmwareDropdown}
        onClick={() =>
          this.setState(state => {
            return { firmwareDropdown: !state.firmwareDropdown };
          })
        }
      >
        <Dropdown.Toggle className="toggler">Select</Dropdown.Toggle>
        <Dropdown.Menu className="menu">
          {hasDefaultFirmware && defaultFirmwareItem}
          {hasExperimentalFirmware && experimentalFirmwareItem}
          <Dropdown.Item
            selected={this.state.selected == "custom"}
            value="custom"
          >
            <MdBuild />
            <Dropdown.ItemText
              primary={i18n.firmwareUpdate.custom}
              secondary={filename}
            />
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    );

    let dialogChildren;
    if (versions) {
      dialogChildren = (
        <React.Fragment>
          <div className={"classes.paper"}>
            <p className={"classes.cardSub"}>
              {
                "During the update, the Neuron will pulse a blue pattern followed by a flash of multiple colors for a few seconds. When the update finishes, your keyboard lights will go back to your personalized color mode."
              }
            </p>
            <h6>{"Follow these steps to update your firmware:"}</h6>
            <span className={"classes.cardSub"}>
              <ol style={{ lineHeight: "2rem" }}>
                <li>
                  {
                    "Make sure to have at least one backup of your layers, just in case!"
                  }
                </li>
                <li>{"Click 'Start Countdown'."}</li>
                <li>
                  {
                    "When the countdown reaches zero and the keyboard's lights turn off, press repeatedly or hold the key on the "
                  }
                  <a
                    href="https://support.dygma.com/hc/en-us/articles/360017056397"
                    color={
                      this.props.darkMode === true ? "primary" : "secondary"
                    }
                  >
                    {"top left corner of your Raise"}
                  </a>
                  {" (usually the Esc key). Do this for 5-7 seconds."}
                </li>
                <li>
                  {
                    "'Firmware flashed successfully!' will appear on Bazecor's screen."
                  }
                </li>
              </ol>
            </span>
            <div className={"classes.cardSnack"}>
              <div>
                <div style={{ display: "flex" }}>
                  <div>
                    <MdInfo />
                  </div>
                  <div>
                    {
                      "Not following the steps can cause the firmware update process to fail. This won't damage your Raise, but will require you to repeat the process. More information "
                    }
                    <a
                      href="https://support.dygma.com/hc/en-us/articles/360007272638"
                      color={
                        this.props.darkMode === true ? "primary" : "secondary"
                      }
                    >
                      {"here"}
                    </a>
                    {"."}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </React.Fragment>
      );
    } else {
      dialogChildren = (
        <React.Fragment>
          <div className={"classes.paper"}>
            <h5 style={{ fontWeight: "500", paddingBottom: "1rem" }}>
              {"Firmware Update Process via Bootloader Mode"}
            </h5>
            <p className={"classes.cardSub"}>
              {
                "Click Start Countdown to start the update. The Neuron will flash in multiple colors for a few seconds."
              }
            </p>
            <p className={"classes.cardSub"}>
              {
                "After the update, you will see the message: 'Firmware flashed successfully!'"
              }
            </p>
            <p className={"classes.cardSub"}>
              {
                "Your keyboard lights will remain off and the layout will be reverted to its original settings."
              }
            </p>
            <br />
            <br />
            <div className={"classes.cardSnack"}>
              <div>
                <div style={{ display: "flex" }}>
                  <div>
                    <MdInfo />
                  </div>
                  <div>
                    {
                      "In case the Firmware Update fails, this won't damage your Raise. Repeat the process or do it in "
                    }
                    <a
                      href="https://support.dygma.com/hc/en-us/articles/360014074997"
                      color={
                        this.props.darkMode === true ? "primary" : "secondary"
                      }
                    >
                      {"another way"}
                    </a>
                    {"."}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </React.Fragment>
      );
    }

    let currentlyRunning;
    if (versions) {
      currentlyRunning = (
        <React.Fragment>
          <Card
            bg={versions.bazecor != "v1.0.0" ? "warning" : "success"}
            className="version"
          >
            <Card.Body
              className={
                (versions.bazecor != "v1.0.0" ? "" : "white") + " body"
              }
            >
              <Card.Title className="title">
                {"Your Raise's firmware version is"}
              </Card.Title>
              <Card.Text className="text">{versions.bazecor}</Card.Text>
            </Card.Body>
          </Card>
        </React.Fragment>
      );
    }

    return (
      <Styles>
        <Container fluid className="firmware-update">
          <Row className="title-row">
            <h4 className="section-title">Firmware Update</h4>
          </Row>
          <Row className="firmware-row">
            <Col className="firmware-col">
              <Card className="firmware-card">
                <Card.Header className="header">
                  {versions
                    ? "Raise Firmware Update"
                    : "Firmware Update Process via Bootloader Mode"}
                </Card.Header>
                <Card.Body className="body d-flex flex-column">
                  <Card.Title className="title">
                    Updating your Raise firmware is how we implement new cool
                    features and bug fixes.
                  </Card.Title>
                  <p className={"subtitle"}>
                    <i>
                      <strong>{"For advanced users: "}</strong>
                      {"If you have installed your own "}
                      <a
                        href="https://support.dygma.com/hc/en-us/articles/360017062197"
                        color={
                          this.props.darkMode === true ? "primary" : "secondary"
                        }
                      >
                        {"custom firmware"}
                      </a>
                      {", this update will overwrite it."}
                    </i>
                  </p>
                  {currentlyRunning}
                  {firmwareFilename}
                  <Row className="mt-auto">
                    <Col xs={6} className="flashingcol">
                      <Button
                        className="custombutton"
                        size="lg"
                        onClick={this.selectFirmware}
                      >
                        {firmwareFilename == ""
                          ? "Load custom FW"
                          : "Remove Custom FW"}
                      </Button>
                    </Col>
                    <Col xs={6} className="flashingcol">
                      <Button
                        className="flashingbutton"
                        size="lg"
                        onClick={
                          this.state.device.device.info.product === "Raise"
                            ? this.uploadRaise
                            : this.upload
                        }
                      >
                        {i18n.firmwareUpdate.flashing.button}
                      </Button>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </Col>
            <Modal
              show={this.state.confirmationOpen}
              onHide={this.cancelDialog}
              backdrop="static"
              keyboard={false}
              size="xl"
              centered
            >
              <ModalStyle>
                <Modal.Header closeButton>
                  <Modal.Title>{i18n.firmwareUpdate.raise.reset}</Modal.Title>
                </Modal.Header>
                <Modal.Body>{dialogChildren}</Modal.Body>
                <Modal.Footer>
                  <Button
                    onClick={this.state.countdown !== 0 ? this.upload : null}
                    variant="contained"
                    color={this.state.countdown ? "primary" : "secondary"}
                    disabled={
                      this.state.countdown !== 0 ? this.props.disabled : null
                    }
                  >
                    {countdown > -1 ? buttonText[countdown] : buttonText[""]}
                  </Button>
                </Modal.Footer>
              </ModalStyle>
            </Modal>
          </Row>
        </Container>
      </Styles>
    );
  }
}

export default FirmwareUpdate;
