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

import Focus from "../../api/focus";
import { FlashRaise, FlashDefyWired, FlashDefyWireless } from "../../api/flash";
import Backup from "../../api/backup";
import Tooltip from "../component/Tooltip";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

import { getStaticPath } from "../config";
import i18n from "../i18n";
import { throws } from "assert";

import PageHeader from "../modules/PageHeader";
import FirmwareUpdatePanel from "../modules/FirmwareUpdatePanel";
import FirmwareUpdateProcess from "../modules/FirmwareUpdateProcess";

import ToastMessage from "../component/ToastMessage";
import { IconFloppyDisk } from "../component/Icon";

const Styles = Styled.div`
height: inherit;
.main-container {
  overflow: hidden;
  height: 100vh;  
}
.firmware-update {
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  &.center-content {
    height: 100vh;  
  }
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
    this.FlashDefyWired = null;
    this.FlashDefyWireless = null;
    this.isDevelopment = process.env.NODE_ENV !== "production";
    this.bkp = new Backup();

    this.state = {
      advanced: false,
      firmwareFilename: "",
      selected: "default",
      device: props.device.device || focus.device,
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
      flashProgress: 0,
      bootloader: false
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

    console.log("BOOTLOADER", focus.device.bootloader);
    if (focus.device.bootloader) {
      await this.setState({ countdown: 1, flashProgress: 0, backupDone: true, bootloader: true });
      if (focus.device.info.product == "Defy") {
        if (focus.device.info.keyboardType == "wired") {
          this.FlashDefyWired = new FlashDefyWired(this.props.device);
        } else {
          this.FlashDefyWireless = new FlashDefyWireless(this.props.device);
        }
      } else {
        this.flashRaise = new FlashRaise(this.props.device);
      }
      document.dispatchEvent(new KeyboardEvent("keydown", { keyCode: 27 }));
      return;
    }

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
  selectExperimental = event => {
    console.log("selecting experimental");
    this.setState({ firmwareFilename: "", selected: "experimental" });
  };
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
          name: i18n.firmwareUpdate.dialog.firmwareFiles,
          extensions: ["uf2"]
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
    const { vendor, product, keyboardType } = this.state.device.info;
    let cVendor = vendor.replace("/", ""),
      cProduct = product.replace("/", ""),
      ckeyboardType = keyboardType.replace("/", "");
    if (keyboardType == "ANSI" || keyboardType == "ISO") ckeyboardType = "";
    if (this.state.device.info.product === "Defy" && this.state.device.info.keyboardType === "wired") {
      return path.join(getStaticPath(), cVendor, cProduct, ckeyboardType, "default.uf2");
    } else {
      return path.join(getStaticPath(), cVendor, cProduct, ckeyboardType, "default.hex");
    }
  };
  _defaultFirmwareFilenameSides = () => {
    const { vendor, product, keyboardType } = this.state.device.info;
    const cVendor = vendor.replace("/", ""),
      cProduct = product.replace("/", ""),
      ckeyboardType = keyboardType.replace("/", "");
    return path.join(getStaticPath(), cVendor, cProduct, ckeyboardType, "keyscanner.bin");
  };
  _experimentalFirmwareFilename = () => {
    const { vendor, product, keyboardType } = this.state.device.info;
    let cVendor = vendor.replace("/", ""),
      cProduct = product.replace("/", ""),
      ckeyboardType = keyboardType.replace("/", "");
    if (keyboardType == "ANSI" || keyboardType == "ISO") ckeyboardType = "";
    if (this.state.device.info.product === "Defy") {
      return path.join(getStaticPath(), cVendor, cProduct, ckeyboardType, "experimental.uf2");
    } else {
      return path.join(getStaticPath(), cVendor, cProduct, ckeyboardType, "experimental.hex");
    }
  };
  _experimentalFirmwareFilenameSides = () => {
    const { vendor, product, keyboardType } = this.state.device.info;
    const cVendor = vendor.replace("/", ""),
      cProduct = product.replace("/", ""),
      ckeyboardType = keyboardType.replace("/", "");
    return path.join(getStaticPath(), cVendor, cProduct, ckeyboardType, "keyscannerX.bin");
  };

  _flash = async () => {
    let focus = new Focus();
    this.setState({
      device: focus.device
    });
    let filename;
    let filenameSides;
    if (this.state.selected == "default") {
      filename = this._defaultFirmwareFilename();
      filenameSides = this._defaultFirmwareFilenameSides();
    } else if (this.state.selected == "experimental") {
      filename = this._experimentalFirmwareFilename();
      filenameSides = this._experimentalFirmwareFilenameSides();
    } else {
      filename = this.state.firmwareFilename;
      filenameSides = this.state.firmwareFilenameSides;
    }
    console.log("BOOTLOADER2", focus.device.bootloader);

    if (this.state.device.info.product === "Raise") {
      if (!focus.device.bootloader) {
        try {
          if (focus.device.info.product == "Raise") {
            await this.flashRaise.resetKeyboard(focus._port, this.state.backup, this.stateUpdate);
          }
        } catch (error) {
          console.error("Bootloader Not found: ", error);
          throw new Error(error);
        }
      }
    }

    try {
      console.log("Trying", focus.device, focus.device.bootloader, focus.device.info.product, focus.device.info.keyboardType);
      if (focus.device.bootloader) {
        if (focus.device.info.product == "Defy") {
          if (focus.device.info.keyboardType == "wired") {
            this.FlashDefyWired.currentPort = this.props.device;
          } else {
            this.FlashDefyWireless.currentPort = this.props.device;
          }
        } else {
          this.flashRaise.currentPort = this.props.device;
        }
      }
      if (focus.device.info.product == "Defy") {
        if (focus.device.info.keyboardType == "wired") {
          await focus.close();
          console.log("done closing focus");
          return await this.state.device.flash(focus._port, filename, filenameSides, this.FlashDefyWired, this.stateUpdate);
        } else {
          await focus.close();
          console.log("done closing focus");
          return await this.state.device.flash(focus._port, filename, filenameSides, this.FlashDefyWireless, this.stateUpdate);
        }
      } else {
        await focus.close();
        console.log("done closing focus");
        return await this.state.device.flash(focus._port, filename, this.flashRaise, this.stateUpdate);
      }
    } catch (e) {
      console.error(e);
    }
  };

  stateUpdate = (countdown, flashProgress) => {
    this.setState({ countdown, flashProgress });
  };

  upload = async () => {
    await this.props.toggleFlashing();
    this.props.toggleFwUpdate(true);
    const backup = this.state.backup.backup;
    try {
      await this._flash();
      if (!this.state.bootloader) {
        this.setState({ countdown: 3, flashProgress: 90 });
        if (this.state.device.info.product == "Defy") {
          if (this.state.device.info.keyboardType == "wired") {
            await this.FlashDefyWired.restoreSettings(backup);
          } else {
            await this.FlashDefyWireless.restoreSettings(backup);
          }
        } else {
          await this.flashRaise.restoreSettings();
        }
      }
      this.setState({ countdown: 4, flashProgress: 100 });
      if (this.state.device.info.product == "Defy") {
        if (this.state.device.info.keyboardType == "wired") {
          await this.FlashDefyWired.delay(600);
        } else {
          await this.FlashDefyWireless.delay(600);
        }
      } else {
        await this.flashRaise.delay(600);
      }
      if (this.state.bootloader) {
        this.props.toggleFlashing();
        this.props.toggleFwUpdate(false);
        this.props.onDisconnect();
        this.setState({ confirmationOpen: false });
      }
    } catch (e) {
      console.error(e);
      toast.error(
        <ToastMessage
          title={i18n.firmwareUpdate.flashing.error}
          content={e.message}
          icon={<IconFloppyDisk />}
          onClickAction={() => {
            const shell = Electron.remote && Electron.remote.shell;
            shell.openExternal("https://support.dygma.com/hc/en-us/articles/360017056397");
          }}
          clickActionText={i18n.errors.troubleshooting}
          onClickDismiss={() => toast.dismiss()}
          clickDismissText={i18n.errors.dismiss}
        />
      );
      this.props.toggleFlashing();
      this.props.toggleFwUpdate(false);
      this.props.onDisconnect();
      this.setState({ confirmationOpen: false });
      return;
    }

    return new Promise(async resolve => {
      let focus = new Focus();
      if (this.state.versions) await focus.command("led.mode 0");
      await focus.command(`led.brightness ${this.state.brightness}`);
      // setTimeout(() => {
      toast.success(<ToastMessage title={i18n.firmwareUpdate.flashing.success} icon={<IconFloppyDisk />} />);
      this.props.toggleFlashing();
      this.props.toggleFwUpdate(false);
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
      if (this.state.versions) this.setState({ countdown: 0, backupDone: false, backup: [] });
      else {
        this.setState({ countdown: 2, flashProgress: 0 });
        this.upload();
      }
    } catch (e) {
      console.error(e);
      toast.error(
        <ToastMessage
          title={i18n.firmwareUpdate.flashing.error}
          content={e.message}
          icon={<IconFloppyDisk />}
          onClickAction={() => {
            const shell = Electron.remote && Electron.remote.shell;
            shell.openExternal("https://support.dygma.com/hc/en-us/articles/360007272638");
          }}
          clickActionText={i18n.errors.troubleshooting}
          onClickDismiss={() => toast.dismiss()}
          clickDismissText={i18n.errors.dismiss}
        />
      );
      this.setState({ confirmationOpen: false });
    }
  };

  uploadDefy = async () => {
    let focus = new Focus();
    await focus.command("upgrade.start");
    try {
      if (focus.device.info.product == "Defy") {
        if (focus.device.info.keyboardType == "wired") {
          this.FlashDefyWired = new FlashDefyWired(this.props.device);
        } else {
          this.FlashDefyWireless = new FlashDefyWireless(this.props.device);
        }
      }
      if (this.state.versions) this.setState({ countdown: 0, backupDone: false, backup: [] });
      else {
        this.setState({ countdown: 2, flashProgress: 0 });
        this.upload();
      }
    } catch (e) {
      console.error(e);
      toast.error(
        <ToastMessage
          title={i18n.firmwareUpdate.flashing.error}
          content={e.message}
          icon={<IconFloppyDisk />}
          onClickAction={() => {
            const shell = Electron.remote && Electron.remote.shell;
            shell.openExternal("https://support.dygma.com/hc/en-us/articles/360007272638");
          }}
          clickActionText={i18n.errors.troubleshooting}
          onClickDismiss={() => toast.dismiss()}
          clickDismissText={i18n.errors.dismiss}
        />
      );
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
    const {
      firmwareFilename,
      buttonText,
      countdown,
      backupPressed,
      isBeginUpdate,
      versions,
      firmwareDropdown,
      flashProgress,
      theme,
      device
    } = this.state;

    let filename = null;
    if (firmwareFilename) {
      filename = firmwareFilename.split(/[\\/]/);
      filename = filename[filename.length - 1];
    }

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

    return (
      <Styles>
        <Container fluid className={`firmware-update ${countdown == -1 || countdown == 0 ? "center-content" : ""}`}>
          <PageHeader text={i18n.app.menu.firmwareUpdate} />
          {countdown == -1 || countdown == 0 ? (
            <FirmwareUpdatePanel
              currentlyVersionRunning={currentlyVersionRunning}
              latestVersionAvailable={latestVersionAvailable}
              onClick={
                device.info.product === "Raise"
                  ? this.uploadRaise
                  : device.info.product === "Defy"
                  ? this.uploadDefy
                  : this.upload
              }
              firmwareFilename={firmwareFilename}
              selectFirmware={this.selectFirmware}
              selectExperimental={this.selectExperimental}
              disclaimerCard={countdown + 1}
              onCancelDialog={this.cancelDialog}
              onBackup={this.backup}
            />
          ) : (
            <FirmwareUpdateProcess onCancelDialog={this.cancelDialog} countdown={countdown} flashProgress={flashProgress} />
          )}
        </Container>
      </Styles>
    );
  }
}

export default FirmwareUpdate;
