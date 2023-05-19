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
import path from "path";
import Styled from "styled-components";
import { toast } from "react-toastify";
import { fwVersion } from "../../../package.json";
import { Octokit } from "@octokit/core";
import SemVer from "semver";
import axios from "axios";
const { ipcRenderer } = require("electron");

import Focus from "../../api/focus";
import { FlashRaise, FlashDefyWired, FlashDefyWireless } from "../../api/flash";
import Backup from "../../api/backup";

import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Dropdown from "react-bootstrap/Dropdown";

import { getStaticPath } from "../config";
import i18n from "../i18n";

import PageHeader from "../modules/PageHeader";
import FirmwareUpdatePanel from "../modules/FirmwareUpdatePanel";
import FirmwareUpdateProcess from "../modules/FirmwareUpdateProcess";

import Select from "../component/Select";
import ToastMessage from "../component/ToastMessage";
import { IconFloppyDisk, IconChip } from "../component/Icon";

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
    let availableFW = await this.selectFWTypefromGitHub(focus.device.info.product);
    // console.log("FWs from Github!", availableFW);
    this.setState({ commands, neuronID: chipID, firmwareList: availableFW, selectedFirmware: 0 });
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this._handleKeyDown);
  }

  async loadAvailableFirmwareVersions() {
    // Octokit.js
    // https://github.com/octokit/core.js#readme
    const octokit = new Octokit();

    let data = await octokit.request("GET /repos/{owner}/{repo}/releases", {
      owner: "Dygmalab",
      repo: "Firmware-releases",
      headers: {
        "X-GitHub-Api-Version": "2022-11-28"
      }
    });
    let fwReleases = [];
    data.data.forEach(release => {
      let newRelease = {},
        name,
        version;
      const releaseData = release.name.split(" ");
      name = releaseData[0];
      version = releaseData[1];
      newRelease.name = name;
      newRelease.version = version;
      newRelease.assets = [];
      release.assets.forEach(asset => {
        newRelease.assets.push({ name: asset.name, url: asset.browser_download_url });
        //console.log([asset.name, asset.browser_download_url]);
      });
      //console.log(newRelease);
      fwReleases.push(newRelease);
    });
    // console.log("Data from Firmware-releases repo!", fwReleases);
    return fwReleases;
  }

  async selectFWTypefromGitHub(type) {
    const fwReleases = await this.loadAvailableFirmwareVersions();
    let DefyReleases = fwReleases.filter(release => release.name === type);
    DefyReleases.sort((a, b) => {
      return SemVer.ltr(SemVer.clean(a.version), SemVer.clean(b.version)) ? -1 : 1;
    });
    return DefyReleases;
  }

  async obtainFWFiles(type, url) {
    let response,
      firmware = undefined;

    if (type == "keyscanner.bin") {
      response = await axios.request({
        method: "GET",
        url: url,
        responseType: "arraybuffer",
        reponseEncoding: "binary"
      });
      firmware = new Uint8Array(response.data);
    }
    if (type == "Wired_neuron.uf2") {
      response = await axios.request({
        method: "GET",
        url: url,
        responseType: "arraybuffer",
        reponseEncoding: "binary"
      });
      firmware = response.data;
    }
    if (type == "Wireless_neuron.hex") {
      response = await axios.request({
        method: "GET",
        url: url,
        responseType: "text",
        reponseEncoding: "utf8"
      });
      response = response.data.replace(/(?:\r\n|\r|\n)/g, "");
      firmware = response.split(":");
      firmware.splice(0, 1);
    }
    // console.log(firmware);
    return firmware;
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
  selectFirmware = async event => {
    if (this.state.firmwareFilename != "") {
      this.setState({ firmwareFilename: "" });
      return;
    }

    let options = {
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
    };
    let files = await ipcRenderer.invoke("open-dialog", options);
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
      if (this.state.device.info.product == "Defy") {
        if (!this.state.firmwareList) {
          let availableFW = await this.selectFWTypefromGitHub(focus.device.info.product);
          console.log("FWs from Github!", availableFW);
          this.setState({ firmwareList: availableFW, selectedFirmware: availableFW.length - 1 });
        }
        if (this.state.device.info.keyboardType == "wireless") {
          filename = await this.obtainFWFiles(
            "Wireless_neuron.hex",
            this.state.firmwareList[this.state.selectedFirmware].assets[2].url
          );
        } else {
          filename = await this.obtainFWFiles(
            "Wired_neuron.uf2",
            this.state.firmwareList[this.state.selectedFirmware].assets[1].url
          );
        }
        filenameSides = await this.obtainFWFiles(
          "keyscanner.bin",
          this.state.firmwareList[this.state.selectedFirmware].assets[0].url
        );
      } else {
        filename = this._defaultFirmwareFilename();
        filenameSides = this._defaultFirmwareFilenameSides();
      }
    } else if (this.state.selected == "experimental") {
      filename = this._experimentalFirmwareFilename();
      filenameSides = this._experimentalFirmwareFilenameSides();
    } else {
      filename = this.state.firmwareFilename;
      filenameSides = this.state.firmwareFilenameSides;
    }

    if (this.state.device.info.keyboardType !== "wired") {
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
      // console.log(
      //   "Trying to flash",
      //   focus.device,
      //   focus.device.bootloader,
      //   focus.device.info.product,
      //   focus.device.info.keyboardType
      // );
      const bootloader = focus.device.bootloader;
      if (bootloader) {
        if (focus.device.info.product == "Defy") {
          if (focus.device.info.keyboardType == "wired") {
            this.FlashDefyWired.currentPort = this.props.device;
          } else {
            this.FlashDefyWireless.currentPort = this.props.device;
            this.FlashDefyWireless.currentPath = this.props.device.path;
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
          return await this.state.device.flash(
            focus._port,
            filename,
            filenameSides,
            bootloader,
            this.FlashDefyWireless,
            this.stateUpdate
          );
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
    const backup = this.state.backup ? this.state.backup.backup : undefined;
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
            ipcRenderer.invoke("openExternal", "https://support.dygma.com/hc/en-us/articles/360017056397");
          }}
          clickActionText={i18n.errors.troubleshooting}
          onClickDismiss={() => toast.dismiss()}
          clickDismissText={i18n.errors.dismiss}
        />,
        { icon: "" }
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
      toast.success(<ToastMessage title={i18n.firmwareUpdate.flashing.success} icon={<IconFloppyDisk />} />, {
        icon: ""
      });
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
            ipcRenderer.invoke("openExternal", "https://support.dygma.com/hc/en-us/articles/360007272638");
          }}
          clickActionText={i18n.errors.troubleshooting}
          onClickDismiss={() => toast.dismiss()}
          clickDismissText={i18n.errors.dismiss}
        />,
        { icon: "" }
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
            ipcRenderer.invoke("openExternal", "https://support.dygma.com/hc/en-us/articles/360007272638");
          }}
          clickActionText={i18n.errors.troubleshooting}
          onClickDismiss={() => toast.dismiss()}
          clickDismissText={i18n.errors.dismiss}
        />,
        { icon: "" }
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

  changeSelectedFirmware = newSelection => {
    this.setState({ selectedFirmware: newSelection });
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
      device,
      firmwareList,
      selectedFirmware
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

    let listOfFWs;
    if (firmwareList != undefined && firmwareList.length > 0) {
      listOfFWs = firmwareList.map((elem, index) => {
        let selectFormat = {};
        selectFormat.text = elem.version;
        selectFormat.value = index;
        selectFormat.index = index;
        return selectFormat;
      });
    }

    return (
      <Styles>
        <Container fluid className={`firmware-update ${countdown == -1 || countdown == 0 ? "center-content" : ""}`}>
          <PageHeader text={i18n.app.menu.firmwareUpdate} />
          {countdown == -1 || countdown == 0 ? (
            <div>
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
              {selectedFirmware != undefined && selectedFirmware != null && listOfFWs.length > 0 ? ( // Ternary operator checking validity of variables
                <Dropdown onSelect={this.changeSelectedFirmware} value={selectedFirmware} className={`custom-dropdown`}>
                  <div>
                    <Dropdown.Toggle id="dropdown-custom">
                      <div className="dropdownItemSelected">
                        <div className="dropdownItem">{listOfFWs[selectedFirmware].text}</div>
                      </div>
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      {listOfFWs.map((item, index) => (
                        <Dropdown.Item
                          eventKey={item.value}
                          key={index}
                          className={`${selectedFirmware == item.text ? "active" : ""}`}
                          disabled={item.disabled}
                        >
                          <div className="dropdownInner">
                            {selectedFirmware != undefined &&
                            selectedFirmware != "" > 0 &&
                            listOfFWs.length > 0 &&
                            listOfFWs[0].icon != undefined ? (
                              <div className="dropdownIcon">
                                <img src={item.icon} className="dropdwonIcon" />
                              </div>
                            ) : (
                              ""
                            )}
                            <div className="dropdownItem">{item.text}</div>
                          </div>
                        </Dropdown.Item>
                      ))}
                    </Dropdown.Menu>
                  </div>
                </Dropdown>
              ) : (
                ""
              )}
            </div>
          ) : (
            <FirmwareUpdateProcess onCancelDialog={this.cancelDialog} countdown={countdown} flashProgress={flashProgress} />
          )}
        </Container>
      </Styles>
    );
  }
}

export default FirmwareUpdate;
