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
import Styled from "styled-components";
import { toast } from "react-toastify";
import { fwVersion } from "../../../package.json";
import escimg from "../../../static/press_esc.png";

import Focus from "../../api/focus";
import FlashRaise from "../../api/flash";
import Backup from "../../api/backup";
import Tooltip from "../../renderer/components/Tooltip";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import ProgressBar from "react-bootstrap/ProgressBar";
import { MdArrowDropDown } from "react-icons/md";

import { getStaticPath } from "../config";
import i18n from "../i18n";
import { throws } from "assert";

import PageHeader from "../modules/PageHeader";
import FirmwareUpdatePanel from "../modules/FirmwareUpdatePanel";
import FirmwareUpdateProcess from "../modules/FirmwareUpdateProcess";

const Styles = Styled.div`
height: 100%;
.main-container {
  overflow: hidden;
  height: 100vh;
}
.firmware-update {
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
.disclaimerContent {
  font-size: 15px;
  margin-top: 32px;
  line-height: 1.5em;
  font-weight: 500;
}

`;

class FirmwareUpdate extends React.Component {
  constructor(props) {
    super(props);

    let focus = new Focus();
    this.flashRaise = null;
    this.isDevelopment = process.env.NODE_ENV !== "production";
    this.bkp = new Backup();

    this.state = {
      advanced: false,
      firmwareFilename: "",
      selected: "default",
      device: props.device || focus.device,
      confirmationOpen: false,
      countdown: -1,
      firmwareDropdown: false,
      brightness: 255,
      buttonText: [
        i18n.firmwareUpdate.milestones.backup,
        i18n.firmwareUpdate.milestones.esc,
        i18n.firmwareUpdate.milestones.flash,
        i18n.firmwareUpdate.milestones.restore
      ],
      versions: null,
      commands: [],
      backup: [],
      backupDone: false,
      backupPressed: false,
      flashProgress: 0
    };
  }

  _handleKeyDown = event => {
    switch (event.keyCode) {
      case 27:
        console.log("esc key logged");
        if (this.state.backupDone && this.state.countdown == 1) {
          // TODO: launch flashing procedure
          console.log("launching the flashing procedure");
          this.setState({ countdown: 2, flashProgress: 0 });
          this.upload();
        }
        break;
      default:
        break;
    }
  };

  async componentDidUpdate() {
    // console.log(
    //   "Testing State Update",
    //   this.state.backup.backup.length,
    //   this.state.commands.length,
    //   !this.state.backupDone && this.state.backup.length >= this.state.commands.length && this.state.commands.length > 0
    // );
    if (
      !this.state.backupDone &&
      this.state.backup.backup &&
      this.state.backup.backup.length == this.state.commands.length &&
      this.state.commands.length > 0
    ) {
      this.setState({ backupDone: true, countdown: 1 });
      await this.bkp.SaveBackup(this.state.backup);
      await this.putEscKey(this.state.backup.backup[0]);
    }
  }

  async componentDidMount() {
    let focus = new Focus();
    document.addEventListener("keydown", this._handleKeyDown);
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
    const commands = await this.bkp.Commands();
    let chipID = (await focus.command("hardware.chip_id")).replace(/\s/g, "");
    this.setState({ commands, neuronID: chipID });
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this._handleKeyDown);
  }

  async putEscKey(command) {
    let focus = new Focus();
    let withEsc = command.data.split(/\s+/);
    withEsc[0] = 41;
    await focus.command("keymap.custom", withEsc.join(" "));
    await focus.command("layer.moveTo 0");
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
      this.setState({ firmwareFilename: aux, selected: "custom" });
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
    if (this.state.selected == "default") {
      filename = this._defaultFirmwareFilename();
    } else if (this.state.selected == "experimental") {
      filename = this._experimentalFirmwareFilename();
    } else {
      filename = this.state.firmwareFilename;
    }
    if (this.state.device.device.info.product === "Raise") {
      if (!focus.device.bootloader) {
        try {
          await this.flashRaise.resetKeyboard(focus._port, this.state.backup, this.stateUpdate);
        } catch (error) {
          console.error("Bootloader Not found: ", error);
          throw new Error(error);
        }
      }
    }

    try {
      if (focus.device.bootloader) {
        this.flashRaise.currentPort = this.props.device;
      }
      await focus.close();
      console.log("done closing focus");
      return await this.state.device.device.flash(focus._port, filename, this.flashRaise, this.stateUpdate);
    } catch (e) {
      console.error(e);
    }
  };

  stateUpdate = (countdown, flashProgress) => {
    this.setState({ countdown, flashProgress });
  };

  upload = async () => {
    await this.props.toggleFlashing();

    try {
      await this._flash();
      this.setState({ countdown: 3, flashProgress: 90 });
      await this.flashRaise.restoreSettings();
      this.setState({ countdown: 4, flashProgress: 100 });
      await this.flashRaise.delay(600);
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
                  shell.openExternal("https://support.dygma.com/hc/en-us/articles/360017056397");
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
      await focus.command(`led.brightness ${this.state.brightness}`);
      // setTimeout(() => {
      toast.success(i18n.firmwareUpdate.flashing.success);
      this.props.toggleFlashing();
      this.props.onDisconnect();
      this.setState({ confirmationOpen: false });
      resolve();
      // }, 1000);
    });
  };

  uploadRaise = async () => {
    let focus = new Focus();
    if (this.state.versions) {
      await focus.command("led.mode 1");
      let brightness = await focus.command("led.brightness");
      this.setState({ brightness });
      await focus.command("led.brightness 255");
    }
    // this.setState({
    //   confirmationOpen: true,
    //   isBeginUpdate: true
    // });
    try {
      this.flashRaise = new FlashRaise(this.props.device);
      // if (!focus.device.bootloader) {
      //   await this.flashRaise.backupSettings();
      // }
      if (this.state.versions) this.setState({ countdown: 0, backupDone: false, backup: [] });
      else {
        this.setState({ countdown: 2, flashProgress: 0 });
        this.upload();
      }
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
                  shell.openExternal("https://support.dygma.com/hc/en-us/articles/360007272638");
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
    this.setState({ countdown: -1, backupPressed: false });
    if (this.state.versions) {
      await focus.command("led.mode 0");
      await focus.command(`led.brightness ${this.state.brightness}`);
    }
  };

  backup = async () => {
    this.setState({ backupPressed: true });
    let backup = await this.bkp.DoBackup(this.state.commands, this.state.neuronID);
    this.setState({ backup });
  };

  toggleAdvanced = () => {
    this.setState({ advanced: !this.state.advanced });
  };

  render() {
    const { firmwareFilename, buttonText, countdown, backupPressed, isBeginUpdate, versions, firmwareDropdown, flashProgress } =
      this.state;

    let filename = null;
    if (firmwareFilename) {
      filename = firmwareFilename.split(/[\\/]/);
      filename = filename[filename.length - 1];
    }

    let latestAvailable = <h5 className="title thintext">{`${i18n.firmwareUpdate.texts.latestAvailableText}${fwVersion}`}</h5>;

    let currentlyRunning;
    let currentlyVersionRunning;
    if (versions) {
      currentlyRunning = (
        <React.Fragment>
          <Card bg={versions.bazecor != `v${fwVersion}` ? "warning" : "success"} className="version">
            <Card.Body className={versions.bazecor != `v${fwVersion}` ? "body" : "white body"}>
              <Card.Title className="title">{i18n.firmwareUpdate.texts.currentlyRunningCardTitle}</Card.Title>
              <Card.Text className="text">{versions.bazecor}</Card.Text>
            </Card.Body>
          </Card>
        </React.Fragment>
      );
      currentlyVersionRunning = versions.bazecor;
    }

    const latestVersionAvailable = `v${fwVersion}`;
    const progress = (
      <Card className="firmware-card">
        <Card.Header className="header">
          {versions ? i18n.firmwareUpdate.texts.versionExists : i18n.firmwareUpdate.texts.versionNotExists}
        </Card.Header>

        {countdown > 1 ? (
          <Card.Body className="progressbar my-5">
            <h2>
              {this.state.versions
                ? countdown > 2
                  ? i18n.firmwareUpdate.texts.progressCardStatus3
                  : i18n.firmwareUpdate.texts.progressCardStatus1
                : i18n.firmwareUpdate.texts.progressCardStatus2}
            </h2>
            <ProgressBar className="mt-5 mb-2">
              <ProgressBar striped now={flashProgress} />
            </ProgressBar>
            <h4 className="progressCBText">
              {flashProgress <= 15
                ? i18n.firmwareUpdate.texts.progressCardBar1
                : flashProgress <= 29
                ? i18n.firmwareUpdate.texts.progressCardBar2
                : flashProgress <= 69
                ? i18n.firmwareUpdate.texts.progressCardBar3
                : i18n.firmwareUpdate.texts.progressCardBar4}
            </h4>
          </Card.Body>
        ) : (
          <React.Fragment>
            <Card.Body className="body d-flex flex-column justify-content-center">
              <Card.Title>{i18n.firmwareUpdate.texts.progressCardTitle1}</Card.Title>
              <Card.Title>{i18n.firmwareUpdate.texts.progressCardTitle2}</Card.Title>
            </Card.Body>
            <Card.Img variant="bottom" src={escimg} />
            <Row className="mt-auto">
              <Col className="flashingcol">
                <Button className="custombutton outlined " size="lg" onClick={this.cancelDialog}>
                  {i18n.firmwareUpdate.texts.cancel}
                </Button>
              </Col>
            </Row>
          </React.Fragment>
        )}
      </Card>
    );

    const flashCard = (
      <Card className="firmware-card">
        <Card.Header className="header">
          {versions ? i18n.firmwareUpdate.texts.versionExists : i18n.firmwareUpdate.texts.versionNotExists}
        </Card.Header>
        <Card.Body className="body d-flex flex-column justify-content-center">
          <Card.Title>{i18n.firmwareUpdate.texts.flashCardTitle1}</Card.Title>
          <Card.Title>{i18n.firmwareUpdate.texts.flashCardTitle2}</Card.Title>
        </Card.Body>
        <Card.Img variant="bottom" src={escimg} />
        <Card.Body className="body d-flex flex-column justify-content-center">
          <Row>
            <Col xs={1}>
              <Tooltip
                type="text"
                placement="top"
                texts={[
                  i18n.firmwareUpdate.texts.flashCardOverlay1,
                  i18n.firmwareUpdate.texts.flashCardOverlay2,
                  i18n.firmwareUpdate.texts.flashCardOverlay3,
                  i18n.firmwareUpdate.texts.flashCardOverlay4,
                  i18n.firmwareUpdate.texts.flashCardOverlay5
                ]}
              />
            </Col>
            <Col>{i18n.firmwareUpdate.texts.flashCardHelp}</Col>
          </Row>
        </Card.Body>
        <Row className="mt-auto">
          <Col className="flashingcol">
            <Button className="custombutton outlined " size="lg" onClick={this.cancelDialog}>
              {i18n.firmwareUpdate.texts.cancel}
            </Button>
          </Col>
        </Row>
      </Card>
    );

    const disclaimerCard = (
      <Card className="firmware-card">
        <Card.Header className="header">
          {versions ? i18n.firmwareUpdate.texts.versionExists : i18n.firmwareUpdate.texts.versionNotExists}
        </Card.Header>
        <Card.Body className="body d-flex flex-column">
          <p className="thintext">{i18n.firmwareUpdate.texts.disclaimerCard1}</p>
          <p className="thintext">{i18n.firmwareUpdate.texts.disclaimerCard2}</p>
          <p className="thintext">{i18n.firmwareUpdate.texts.disclaimerCard3}</p>
        </Card.Body>
        <Row className="mt-auto">
          <Col xs={6} className="flashingcol">
            <Button className="custombutton outlined " size="lg" onClick={this.cancelDialog}>
              {i18n.firmwareUpdate.texts.backwds}
            </Button>
          </Col>
          <Col xs={6} className="flashingcol">
            <Button className="flashingbutton nooutlined" size="lg" onClick={this.backup} disabled={backupPressed}>
              {countdown > -1 ? buttonText[countdown] : buttonText[""]}
            </Button>
          </Col>
        </Row>
      </Card>
    );

    const advancedUsers = this.state.advanced ? (
      <Card.Body className="centersection mt-4">
        <p className="subtitle thintext">
          <i>
            <strong>{i18n.firmwareUpdate.texts.advUsersText1}</strong>
            {i18n.firmwareUpdate.texts.advUsersText2}
            <a
              href="https://support.dygma.com/hc/en-us/articles/360017062197"
              color={this.props.darkMode === true ? "primary" : "secondary"}
            >
              {i18n.firmwareUpdate.texts.cstomFW}
            </a>
            {i18n.firmwareUpdate.texts.advUsersText3}
          </i>
        </p>
        <Button className="custombutton mb-3 outlined" size="lg" onClick={this.selectFirmware}>
          {firmwareFilename == "" ? i18n.firmwareUpdate.custom : i18n.firmwareUpdate.rcustom}
        </Button>
        {firmwareFilename}
      </Card.Body>
    ) : (
      ""
    );

    const statusCard = (
      <div className="firmware-wrapper home-firmware">
        <Card className="firmware-card">
          <Card.Header className="header">
            {versions ? i18n.firmwareUpdate.texts.versionExists : i18n.firmwareUpdate.texts.versionNotExists}
          </Card.Header>
          <Card.Body className="body d-flex flex-column">
            <Card.Title className="title">
              Updating your Raise firmware is how we implement new cool features and bug fixes.
            </Card.Title>
            {currentlyRunning}
            {latestAvailable}
          </Card.Body>
          <Row className="mt-auto">
            <Col xs={6} className="flashingcol">
              <Button className="custombutton outlined pr-1" size="lg" onClick={this.toggleAdvanced}>
                {i18n.firmwareUpdate.texts.advUsers}
                <MdArrowDropDown className="arrowicon"></MdArrowDropDown>
              </Button>
            </Col>
            <Col xs={6} className="flashingcol">
              <Button
                className="flashingbutton nooutlined"
                size="lg"
                onClick={this.state.device.device.info.product === "Raise" ? this.uploadRaise : this.upload}
              >
                {i18n.firmwareUpdate.flashing.button}
              </Button>
            </Col>
          </Row>
          <Row className="mt-auto">{advancedUsers}</Row>
        </Card>
      </div>
    );

    //let showCard = countdown == -1 ? statusCard : countdown == 0 ? disclaimerCard : countdown == 1 ? flashCard : progress;
    let showCard =
      countdown == -1 || countdown == 0 ? (
        <FirmwareUpdatePanel
          versions={versions}
          currentlyVersionRunning={currentlyVersionRunning}
          latestVersionAvailable={latestVersionAvailable}
          onClick={this.state.device.device.info.product === "Raise" ? this.uploadRaise : this.upload}
          firmwareFilename={firmwareFilename}
          selectFirmware={this.selectFirmware}
          disclaimerCard={countdown + 1}
          onCancelDialog={this.cancelDialog}
          onBackup={this.backup}
        />
      ) : countdown == 1 ? (
        //flashCard
        <FirmwareUpdateProcess onCancelDialog={this.cancelDialog} />
      ) : (
        progress
      );
    return (
      <Styles>
        <Container fluid className="firmware-update">
          <PageHeader text={i18n.app.menu.firmwareUpdate} />
          {showCard}
        </Container>
      </Styles>
    );
  }
}

export default FirmwareUpdate;
