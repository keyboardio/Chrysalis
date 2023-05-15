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

import React, { Component } from "react";
import Styled from "styled-components";
import { toast } from "react-toastify";
import fs from "fs";
import path from "path";
import { usb, getDeviceList } from "usb";
const { ipcRenderer } = require("electron");

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { RegularButton } from "../component/Button";

import PageHeader from "../modules/PageHeader";

import Card from "react-bootstrap/Card";
import Spinner from "react-bootstrap/Spinner";
import Dropdown from "react-bootstrap/Dropdown";

import Focus from "../../api/focus";
import Hardware from "../../api/hardware";
import { RaiseISO, RaiseANSI, DefyWired, DefyWireless, enumerator } from "../../api/hardware/virtual";

import i18n from "../i18n";
import NeuronConnection from "../modules/NeuronConnection";
import ToastMessage from "../component/ToastMessage";
import { newError } from "builder-util-runtime";

import { IconArrowRight, IconCloudDownload, IconUpload, IconKeyboard } from "../component/Icon";
//import iconKeyboard from "../../../static/base/icon-keyboard.svg";
import Title from "../component/Title";
import { Select } from "../component/Select";

const Store = require("electron-store");
const store = new Store();

const Styles = Styled.div`
height: 100vh;
.main-container {
  overflow: hidden;
  height: 100vh;
}
.cardButton-wrapper {
  display: block;
  width: 100%;
  text-align: left;
  padding-top: 16px;
  margin-top: 16px;
  border-top: 1px solid ${({ theme }) => theme.styles.virtualKeyboard.cardButtonDivider};
  .cardButton {
    padding: 8px 24px;
    background: ${({ theme }) => theme.styles.virtualKeyboard.cardButtonBackground};
    border-radius: 6px;
    width: 100%;
    .button-link {
      padding-left: 0;
      font-size: 14px;
      color: ${({ theme }) => theme.colors.purple200};
    }
  }
}
.keyboard-select {
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  .keyboard-row {
    justify-content: center;
    align-items: center;
    display: flex;
    padding-top: 15vh;
    .keyboard-col {
      min-width: 500px;
      max-width: 500px;

      .keyboard-card {
        background: ${({ theme }) => theme.card.background};
        border: none;
        box-shadow: none;
        .loader {
          align-self: center;
          .spinner-border {
            width: 4rem;
            height: 4rem;
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
                background-color: ${({ theme }) => theme.colors.button.background} !important;
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
                background-color: ${({ theme }) => theme.colors.button.hover} !important;
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

class SelectKeyboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedPortIndex: 0,
      opening: false,
      devices: null,
      loading: true,
      dropdownOpen: false,
      showVirtualKeyboardModal: false,
      selectedVirtualKeyboard: 0
    };

    this.onKeyboardConnect = this.onKeyboardConnect.bind(this);
    this.scanDevices = this.scanDevices.bind(this);
    this.selectPort = this.selectPort.bind(this);
    this.selectVirtualKeyboard = this.selectVirtualKeyboard.bind(this);
  }

  findNonSerialKeyboards = deviceList => {
    const devices = getDeviceList().map(device => device.deviceDescriptor);
    devices.forEach(desc => {
      Hardware.nonSerial.forEach(device => {
        if (desc.idVendor == device.usb.vendorId && desc.idProduct == device.usb.productId) {
          let found = false;
          deviceList.forEach(sDevice => {
            if (sDevice.device.usb.vendorId == desc.idVendor && sDevice.device.usb.productId == desc.idProduct) {
              found = true;
            }
          });
          if (!found) deviceList.push({ device: device });
        }
      });
    });
    return deviceList;
  };

  findKeyboards = async () => {
    this.setState({ loading: true });
    let focus = new Focus();
    const isIterable = this.state.devices != null && typeof this.state.devices[Symbol.iterator] === "function";
    if (focus.closed === false && isIterable) {
      this.setState({
        loading: false
      });
      return;
    }
    return new Promise(resolve => {
      focus
        .find(...Hardware.serial)
        .then(async devices => {
          console.log("Printing devices: ", devices);
          let supported_devices = [];
          for (const device of devices) {
            device.accessible = await focus.isDeviceAccessible(device);
            if (device.accessible && (await focus.isDeviceSupported(device))) {
              supported_devices.push(device);
            } else if (!device.accessible) {
              supported_devices.push(device);
            }
          }
          const list = this.findNonSerialKeyboards(supported_devices);
          this.setState({
            loading: false,
            devices: list
          });
          resolve(list.length > 0);
        })
        .catch(() => {
          const list = this.findNonSerialKeyboards([]);
          this.setState({
            loading: false,
            devices: list
          });
          resolve(list.length > 0);
        });
    });
  };

  scanDevices = async () => {
    let found = await this.findKeyboards();
    this.setState({ scanFoundDevices: found });
    setTimeout(() => {
      this.setState({ scanFoundDevices: undefined });
    }, 1000);
  };

  toggleVirtualKeyboardModal() {
    this.setState({ showVirtualKeyboardModal: !this.state.showVirtualKeyboardModal });
  }

  componentDidMount() {
    this.finder = () => {
      this.findKeyboards();
    };
    usb.on("attach", this.finder);
    usb.on("detach", this.finder);

    this.findKeyboards().then(() => {
      let focus = new Focus();
      if (!focus._port) return;

      for (let device of this.state.devices) {
        if (!device.path) continue;

        if (device.path == focus._port.path) {
          this.setState(state => ({
            selectedPortIndex: state.devices.indexOf(device)
          }));
          break;
        }
      }
    });
  }

  componentWillUnmount() {
    usb.off("attach", this.finder);
    usb.off("detach", this.finder);
  }

  selectVirtualKeyboard = event => {
    console.log(event);
    this.setState({ selectedVirtualKeyboard: event });
  };

  selectPort = event => {
    console.log(event);
    this.setState({ selectedPortIndex: event });
  };

  onKeyboardConnect = async () => {
    this.setState({ opening: true });

    const { devices } = this.state;

    try {
      await this.props.onConnect(devices[this.state.selectedPortIndex], null);
    } catch (err) {
      this.setState({
        opening: false
      });
      toast.error(<ToastMessage title={err.toString()} />, { icon: "" });
    }
    i18n.refreshHardware(devices[this.state.selectedPortIndex]);
  };

  convertBackupToVK = async backup => {
    let vk, fileName;

    for (let device of Hardware.serial) {
      if (
        backup.neuron.device.usb.productId == device.usb.productId &&
        backup.neuron.device.usb.vendorId == device.usb.vendorId &&
        backup.neuron.device.info.keyboardType == device.info.keyboardType
      ) {
        if (device.info.keyboardType == "ANSI") {
          vk = { ...RaiseANSI };
          fileName = "VirtualRaiseANSI";
        }
        if (device.info.keyboardType == "ISO") {
          vk = { ...RaiseISO };
          fileName = "VirtualRaiseISO";
        }
        if (device.info.keyboardType == "wired") {
          vk = { ...DefyWired };
          fileName = "VirtualDefy";
        }
        //TODO: replace this DEFY with the wireless version
        if (device.info.keyboardType == "wireless") {
          vk = { ...DefyWireless };
          fileName = "VirtualDefy";
        }
        vk.device.components = device.components;
      }
    }

    for (let line of backup.backup) {
      vk.virtual[line.command].data = line.data;
    }

    // Ask the user for the place to put the backup

    let options = {
      title: i18n.keyboardSelect.virtualKeyboard.newTitle,
      buttonLabel: i18n.keyboardSelect.virtualKeyboard.buttonLabelSave,
      defaultPath: path.join(store.get("settings.backupFolder"), fileName + ".json"),
      filters: [{ name: "Json", extensions: ["json"] }]
    };
    const newPath = await ipcRenderer.invoke("save-dialog", options);
    console.log("Save file to", newPath);

    // Save the virtual KB in the specified location
    const json = JSON.stringify(vk, null, 2);
    require("fs").writeFileSync(newPath, json, err => {
      if (err) {
        console.error(err);
        throw err;
      }
    });

    vk.device.path = "VIRTUAL";
    vk.device.bootloader = false;
    vk.device.filePath = newPath;
    return vk;
  };

  getDateTime = () => {
    const d = new Date();
    return `-${
      d.getFullYear() +
      ("0" + (d.getMonth() + 1)).slice(-2) +
      ("0" + d.getDate()).slice(-2) +
      ("0" + d.getHours()).slice(-2) +
      ("0" + d.getMinutes()).slice(-2) +
      ("0" + d.getSeconds()).slice(-2)
    }`;
  };

  useAFile = async () => {
    // Read a file that is a backup
    let options = {
      title: i18n.keyboardSelect.virtualKeyboard.useTitle,
      buttonLabel: i18n.keyboardSelect.virtualKeyboard.buttonLabel,
      filters: [
        { name: "Json", extensions: ["json"] },
        { name: i18n.dialog.allFiles, extensions: ["*"] }
      ]
    };
    const data = await ipcRenderer.invoke("open-dialog", options);
    let filePath;
    if (!data.canceled) {
      filePath = data.filePaths[0];
    } else {
      console.log("user closed file connect dialog");
      return;
    }
    console.log("Opening file", filePath);
    // Open the file and load it's contents
    let file;
    try {
      file = JSON.parse(fs.readFileSync(filePath));
      // console.log(file);
      // console.log("loaded backup", file.device.info.product + " " + file.device.info.keyboardType, file.virtual.version.data);
      if (!file.virtual && !file.backup) newError("not a valid file, no virtual or backup objects");
    } catch (e) {
      console.error(e);
      alert(i18n.keyboardSelect.virtualKeyboard.errorLoadingFile);
      return;
    }
    if (!file.virtual && file.backup) {
      if (!confirm(i18n.keyboardSelect.virtualKeyboard.backupTransform)) {
        return;
      }
      file = this.convertBackupToVK(file);
      file.virtual["hardware.chip_id"].data = file.virtual["hardware.chip_id"].data + this.getDateTime();
      await this.props.onConnect(file.device, file);
      return;
    }

    for (let device of Hardware.serial) {
      if (
        file.device.usb.productId == device.usb.productId &&
        file.device.usb.vendorId == device.usb.vendorId &&
        file.device.info.keyboardType == device.info.keyboardType
      ) {
        file.device.components = device.components;
      }
    }

    file.device.path = "VIRTUAL";
    file.device.bootloader = false;
    file.device.filePath = filePath;
    await this.props.onConnect(file.device, file);
  };

  newFile = async (virtualKeyboard, fileName) => {
    // Ask the user for the place to put the backup
    let options = {
      title: i18n.keyboardSelect.virtualKeyboard.newTitle,
      buttonLabel: i18n.keyboardSelect.virtualKeyboard.buttonLabelSave,
      defaultPath: path.join(store.get("settings.backupFolder"), fileName + ".json"),
      filters: [{ name: "Json", extensions: ["json"] }]
    };
    const newPath = await ipcRenderer.invoke("save-dialog", options);
    console.log("Save file to", newPath);

    console.log("Exchange focus for file access");
    for (let device of Hardware.serial) {
      if (
        virtualKeyboard.device.usb.productId == device.usb.productId &&
        virtualKeyboard.device.usb.vendorId == device.usb.vendorId &&
        virtualKeyboard.device.info.keyboardType == device.info.keyboardType
      ) {
        virtualKeyboard.device.components = device.components;
      }
    }

    virtualKeyboard.device.path = "VIRTUAL";
    virtualKeyboard.device.bootloader = false;
    virtualKeyboard.device.filePath = newPath;
    virtualKeyboard.virtual["hardware.chip_id"].data = virtualKeyboard.virtual["hardware.chip_id"].data + this.getDateTime();

    // Retarded virtualKeyboard storage to save ti with new hardware.chipID
    // Save the virtual KB in the specified location
    const json = JSON.stringify(virtualKeyboard, null, 2);
    require("fs").writeFileSync(newPath, json, err => {
      if (err) {
        console.error(err);
        throw err;
      }
    });

    // Final connection function
    await this.props.onConnect(virtualKeyboard.device, virtualKeyboard);
  };

  render() {
    const { scanFoundDevices, devices, loading, selectedPortIndex, opening, dropdownOpen, selectedVirtualKeyboard } = this.state;
    const { onDisconnect, connected } = this.props;

    let loader = null;
    if (loading) {
      loader = (
        <Card.Body className="loader">
          <Spinner className="spinner-border text-danger" role="status" />
        </Card.Body>
      );
    }

    let deviceItems = null;
    let port = null;
    if (devices && devices.length > 0) {
      deviceItems = devices.map((option, index) => {
        let neurons = store.get("neurons");
        let userName = "Neuron";
        if (neurons != undefined && option.serialNumber != undefined)
          userName = neurons.filter(n =>
            n.id.toLowerCase() == option.serialNumber > 6 ? option.serialNumber.slice(0, -6).toLowerCase() : option.serialNumber
          );
        if (userName.length > 0) {
          userName = userName[0].name;
        } else {
          userName = "";
        }
        // console.log("LOGGING", userName, option.serialNumber.slice(0, -6).toLowerCase());
        let label = option.path;
        if (option.device && option.device.info) {
          label = (
            <Col xs="10" className="key-text">
              <Col>
                <span>{option.device.info.displayName}</span>
              </Col>
              <Col>
                <span>{userName}</span>
              </Col>
              <Col>
                <span className="muted">{option.path || i18n.keyboardSelect.unknown}</span>
              </Col>
            </Col>
          );
        } else if (option.info) {
          label = (
            <Col xs="10" className="key-text">
              <Col>
                <span>{option.device.info.displayName}</span>
              </Col>
              <Col>
                <span className="muted" />
              </Col>
            </Col>
          );
        }

        return {
          index,
          displayName: option.device.info.displayName,
          userName,
          path: option.path || i18n.keyboardSelect.unknown
        };
      });

      const title = devices.map(option => {
        let neurons = store.get("neurons");
        let userName = "Neuron";
        if (neurons != undefined && option.serialNumber != undefined)
          userName = neurons.filter(n =>
            n.id.toLowerCase() == option.serialNumber > 6 ? option.serialNumber.slice(0, -6).toLowerCase() : option.serialNumber
          );
        if (userName.length > 0) {
          userName = userName[0].name;
        } else {
          userName = "";
        }
        // console.log("LOGGING", userName, option.serialNumber.slice(0, -6).toLowerCase());
        let label = option.path;
        if (option.device && option.device.info) {
          label = (
            <Col xs="12" className="key-text">
              <Col>
                <span>{option.device.info.displayName}</span>
              </Col>
              <Col>
                <span>{userName}</span>
              </Col>
              <Col>
                <span className="muted">{option.path || i18n.keyboardSelect.unknown}</span>
              </Col>
            </Col>
          );
        } else if (option.info) {
          label = (
            <Col xs="12" className="key-text">
              <Col>
                <span>{option.device.info.displayName}</span>
              </Col>
              <Col>
                <span className="muted" />
              </Col>
            </Col>
          );
        }

        return <Row key={`key-${option}`}>{label}</Row>;
      });

      port = (
        <Dropdown
          className="selector"
          show={dropdownOpen}
          onClick={() =>
            this.setState(state => {
              return { dropdownOpen: !state.dropdownOpen };
            })
          }
        >
          <Dropdown.Toggle className="toggler">{title[0]}</Dropdown.Toggle>
          <Dropdown.Menu className="menu">{deviceItems}</Dropdown.Menu>
        </Dropdown>
      );
    }

    if (devices && devices.length == 0) {
      port = <span className="selector-error">{i18n.keyboardSelect.noDevices}</span>;
    }

    let connectContent = i18n.keyboardSelect.connect;
    if (this.state.opening) {
      connectContent = <circularProgress color="secondary" size={16} />;
    }

    let connectionButton, permissionWarning;
    let focus = new Focus();
    const selectedDevice = devices && devices[this.state.selectedPortIndex];

    if (selectedDevice && !selectedDevice.accessible) {
      permissionWarning = <span className="selector-error">{i18n.keyboardSelect.permissionError}</span>;
    }

    if (focus.device && selectedDevice && selectedDevice.device == focus.device) {
      connectionButton = (
        <Button disabled={opening || (devices && devices.length === 0)} color="secondary" onClick={onDisconnect}>
          {i18n.keyboardSelect.disconnect}
        </Button>
      );
    } else {
      connectionButton = (
        <RegularButton
          disabled={(selectedDevice ? !selectedDevice.accessible : false) || opening || (devices && devices.length === 0)}
          style="primary"
          onClick={this.onKeyboardConnect}
          buttonText={i18n.keyboardSelect.connect}
          className=""
        >
          {connectContent}
        </RegularButton>
      );
    }

    let preview;
    if (
      devices &&
      devices[this.state.selectedPortIndex] &&
      devices[this.state.selectedPortIndex].device &&
      devices[this.state.selectedPortIndex].device.components
    ) {
      const Keymap = devices[this.state.selectedPortIndex].device.components.keymap;
      preview = <Keymap index={0} className="" showUnderglow={true} />;
    }
    console.log("Focus device: ", focus.device);
    return (
      <Styles>
        <Container fluid className="keyboard-select center-content">
          <PageHeader text={i18n.keyboardSelect.title} />
          <div className="keyboardSelection-wrapper">
            <NeuronConnection
              loading={loading}
              scanFoundDevices={scanFoundDevices != undefined ? scanFoundDevices : false}
              scanDevices={this.scanDevices}
              cantConnect={(selectedDevice ? !selectedDevice.accessible : false) || opening || (devices && devices.length === 0)}
              onKeyboardConnect={this.onKeyboardConnect}
              connected={connected}
              onDisconnect={onDisconnect}
              deviceItems={deviceItems != null ? deviceItems : []}
              selectPort={this.selectPort}
              selectedPortIndex={selectedPortIndex}
              isVirtual={focus.file}
              virtualDevice={focus.device}
            />
            <div className="cardButton-wrapper">
              <div className="cardButton">
                <RegularButton
                  buttonText={i18n.keyboardSelect.virtualKeyboard.buttonText}
                  style="button-link"
                  icoSVG={<IconArrowRight />}
                  icoPosition="right"
                  size="sm"
                  onClick={() => {
                    this.toggleVirtualKeyboardModal();
                  }}
                />
              </div>
              <Modal
                show={this.state.showVirtualKeyboardModal}
                size="lg"
                onHide={() => this.toggleVirtualKeyboardModal()}
                aria-labelledby="contained-modal-title-vcenter"
                centered
              >
                <Modal.Header closeButton>
                  <Modal.Title>{i18n.keyboardSelect.virtualKeyboard.modaltitle}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <div className="virtualKeyboards-wrapper">
                    <div className="virtualKeyboards-col">
                      <Title
                        text={i18n.keyboardSelect.virtualKeyboard.newVirtualKeyboardTitle}
                        headingLevel={4}
                        svgICO={<IconCloudDownload />}
                      />
                      <p>{i18n.keyboardSelect.virtualKeyboard.newVirtualKeyboardDescription}</p>
                      <label>{i18n.keyboardSelect.virtualKeyboard.newVirtualKeyboardLabel}</label>
                      <Dropdown className="custom-dropdown" onSelect={this.selectVirtualKeyboard}>
                        <Dropdown.Toggle id="dropdown-custom">
                          <div className="dropdownItemSelected">
                            <div className="dropdownIcon">
                              <IconKeyboard />
                            </div>
                            <div className="dropdownItem">{enumerator[selectedVirtualKeyboard].device.info.displayName}</div>
                          </div>
                        </Dropdown.Toggle>
                        <Dropdown.Menu className="super-colors virtualKeyboardsMenu">
                          {enumerator.map((item, index) => (
                            <Dropdown.Item
                              eventKey={index}
                              key={index}
                              className={`${selectedVirtualKeyboard == index ? "active" : ""}`}
                            >
                              <div className="dropdownInner">
                                <div className="dropdownIcon">
                                  <IconKeyboard />
                                </div>
                                <div className="dropdownItem">{item.device.info.displayName}</div>
                              </div>
                            </Dropdown.Item>
                          ))}
                        </Dropdown.Menu>
                      </Dropdown>
                      <RegularButton
                        buttonText={i18n.keyboardSelect.virtualKeyboard.createButtonLabel}
                        style="primary"
                        onClick={() => {
                          let fileName = enumerator[selectedVirtualKeyboard].device.info.product;
                          fileName =
                            fileName === "Defy"
                              ? "Virtual" + fileName
                              : "Virtual" + fileName + enumerator[selectedVirtualKeyboard].device.info.keyboardType;
                          this.newFile(enumerator[selectedVirtualKeyboard], fileName);
                        }}
                      />
                    </div>
                    <div className="virtualKeyboards-col virtualKeyboards-col--text">
                      <span>OR</span>
                    </div>
                    <div className="virtualKeyboards-col">
                      <Title
                        text={i18n.keyboardSelect.virtualKeyboard.loadVirtualKeyboardTitle}
                        headingLevel={4}
                        svgICO={<IconUpload />}
                      />
                      <p>{i18n.keyboardSelect.virtualKeyboard.loadVirtualKeyboardDescription}</p>
                      <RegularButton buttonText={i18n.general.loadFile} style="primary" onClick={() => this.useAFile()} />
                    </div>
                  </div>
                </Modal.Body>
              </Modal>
            </div>
          </div>
        </Container>
      </Styles>
    );
  }
}

export default SelectKeyboard;
