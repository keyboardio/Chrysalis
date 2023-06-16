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
import { ipcRenderer } from "electron";
import Styled from "styled-components";
import i18n from "../i18n";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Spinner from "react-bootstrap/Spinner";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Custom modules imports
import { KeyboardSettings } from "../modules/Settings/KeyboardSettings";
import { BackupSettings, GeneralSettings, NeuronSettings, AdvancedSettings } from "../modules/Settings";

import Focus from "../../api/focus";
import Backup from "../../api/backup";
import PageHeader from "../modules/PageHeader";
import ToastMessage from "../component/ToastMessage";
import { RegularButton } from "../component/Button";
import { IconFloppyDisk } from "../component/Icon";

const Store = require("electron-store");
const store = new Store();

const Styles = Styled.div`
  .toggle-button{
    text-align: center;
    padding-bottom: 8px;
  }
`;

class Preferences extends React.Component {
  constructor(props) {
    super(props);
    this.bkp = new Backup();

    this.kbData = {
      keymap: {
        custom: [],
        default: [],
        onlyCustom: true
      },
      ledBrightness: 255,
      defaultLayer: 126,
      ledIdleTimeLimit: 0,
      qukeysHoldTimeout: 0,
      qukeysOverlapThreshold: 0,
      SuperTimeout: 0,
      SuperRepeat: 20,
      SuperWaitfor: 500,
      SuperHoldstart: 0,
      SuperOverlapThreshold: 0,
      mouseSpeed: 1,
      mouseSpeedDelay: 2,
      mouseAccelSpeed: 1,
      mouseAccelDelay: 2,
      mouseWheelSpeed: 1,
      mouseWheelDelay: 100,
      mouseSpeedLimit: 1,
      modified: props.inContext,
      showDefaults: false
    };

    this.state = {
      devTools: false,
      advanced: false,
      verboseFocus: false,
      darkMode: "system",
      neurons: store.get("neurons"),
      selectedNeuron: 0,
      neuronID: "",
      kbData: this.kbData,
      modified: props.inContext
    };
  }

  async componentDidMount() {
    const devTools = await ipcRenderer.invoke("is-devtools-opened");
    this.setState({ devTools });
    ipcRenderer.on("opened-devtool", (event, arg) => {
      this.setState({ devTools: true });
    });
    ipcRenderer.on("closed-devtool", (event, arg) => {
      this.setState({ devTools: false });
    });

    this.setState({ verboseFocus: focus.debug });

    let darkModeSetting = store.get("settings.darkMode");
    if (darkModeSetting === undefined) {
      darkModeSetting = "system";
    }
    this.setState({ darkMode: darkModeSetting });

    await this.getNeuronData();
  }

  getNeuronData = async () => {
    let focus = new Focus();

    // Checking if device is wired or wireless
    this.setState({ wireless: focus.device.info.keyboardType === "wireless" });

    // EXTRACTING DATA FROM NEURON

    await focus.command("hardware.chip_id").then(neuronID => {
      neuronID = neuronID.replace(/\s/g, "");
      this.setState({ neuronID });
    });

    await focus.command("settings.defaultLayer").then(layer => {
      layer = layer ? parseInt(layer) : 126;
      this.kbData.defaultLayer = layer <= 126 ? layer : 126;
    });
    await focus.command("keymap").then(keymap => {
      this.kbData.keymap = keymap;
    });
    await focus.command("keymap.onlyCustom").then(onlyCustom => {
      this.kbData.keymap.onlyCustom = onlyCustom;
    });
    await focus.command("led.brightness").then(brightness => {
      brightness = brightness ? parseInt(brightness) : -1;
      this.kbData.ledBrightness = brightness;
    });

    await focus.command("idleleds.time_limit").then(limit => {
      this.kbData.ledIdleTimeLimit = limit ? parseInt(limit) : -1;
    });

    this.kbData.showDefaults = store.get("settings.showDefaults") == undefined ? false : store.get("settings.showDefaults");

    // QUKEYS variables commands
    await focus.command("qukeys.holdTimeout").then(holdTimeout => {
      holdTimeout = holdTimeout ? parseInt(holdTimeout) : 250;
      this.kbData.qukeysHoldTimeout = holdTimeout;
    });

    await focus.command("qukeys.overlapThreshold").then(overlapThreshold => {
      overlapThreshold = overlapThreshold ? parseInt(overlapThreshold) : 80;
      this.kbData.qukeysOverlapThreshold = overlapThreshold;
    });

    // SuperKeys variables commands
    await focus.command("superkeys.timeout").then(timeout => {
      timeout = timeout ? parseInt(timeout) : 250;
      this.kbData.SuperTimeout = timeout;
    });

    // await focus.command("superkeys.repeat").then(repeat => {
    //   repeat = repeat ? parseInt(repeat) : 20;
    //   this.kbData.SuperRepeat = repeat;
    // });

    // await focus.command("superkeys.waitfor").then(waitfor => {
    //   waitfor = waitfor ? parseInt(waitfor) : 500;
    //   this.kbData.SuperWaitfor = waitfor;
    // });

    await focus.command("superkeys.holdstart").then(holdstart => {
      holdstart = holdstart ? parseInt(holdstart) : 200;
      this.kbData.SuperHoldstart = holdstart;
    });

    // await focus.command("superkeys.overlap").then(overlapThreshold => {
    //   overlapThreshold = overlapThreshold ? parseInt(overlapThreshold) : 20;
    //   this.kbData.SuperOverlapThreshold =overlapThreshold;
    // });

    // MOUSE variables commands
    await focus.command("mouse.speed").then(speed => {
      speed = speed ? parseInt(speed) : 1;
      this.kbData.mouseSpeed = speed;
    });

    // await focus.command("mouse.speedDelay").then(speedDelay => {
    //   speedDelay = speedDelay ? parseInt(speedDelay) : 6;
    //   this.kbData.mouseSpeedDelay = speedDelay;
    // });

    await focus.command("mouse.accelSpeed").then(accelSpeed => {
      accelSpeed = accelSpeed ? parseInt(accelSpeed) : 1;
      this.kbData.mouseAccelSpeed = accelSpeed;
    });

    // await focus.command("mouse.accelDelay").then(accelDelay => {
    //   accelDelay = accelDelay ? parseInt(accelDelay) : 64;
    //   this.kbData.mouseAccelDelay = accelDelay;
    // });

    await focus.command("mouse.wheelSpeed").then(wheelSpeed => {
      wheelSpeed = wheelSpeed ? parseInt(wheelSpeed) : 1;
      this.kbData.mouseWheelSpeed = wheelSpeed;
    });

    // await focus.command("mouse.wheelDelay").then(wheelDelay => {
    //   wheelDelay = wheelDelay ? parseInt(wheelDelay) : 128;
    //   this.kbData.mouseWheelDelay: wheelDelay });
    // });

    await focus.command("mouse.speedLimit").then(speedLimit => {
      speedLimit = speedLimit ? parseInt(speedLimit) : 127;
      this.kbData.mouseSpeedLimit = speedLimit;
    });

    if (this.state.wireless) {
      // Use focus commands to retrieve wireless data
      this.kbData.wireless = {};

      // Battery commands
      this.kbData.wireless.battery = {};
      await focus.command("wireless.battery.level").then(batteryLevel => {
        this.kbData.wireless.battery.level = batteryLevel;
      });
      await focus.command("wireless.battery.state").then(batteryState => {
        this.kbData.wireless.battery.state = batteryState;
      });
      await focus.command("wireless.battery.mode").then(batteryMode => {
        this.kbData.wireless.battery.mode = batteryMode;
      });

      // Energy commands
      this.kbData.wireless.energy = {};
      await focus.command("wireless.energy.modes").then(energyModes => {
        this.kbData.wireless.energy.modes = energyModes;
      });
      await focus.command("wireless.energy.currentMode").then(energyMode => {
        this.kbData.wireless.energy.currentMode = energyMode;
      });
      await focus.command("wireless.energy.disable").then(energyDisable => {
        this.kbData.wireless.energy.disable = energyDisable;
      });

      // Bluetooth commands
      this.kbData.wireless.bluetooth = {};
      await focus.command("wireless.bluetooth.devices").then(bluetoothDevices => {
        this.kbData.wireless.bluetooth.devices = bluetoothDevices;
      });
      await focus.command("wireless.bluetooth.state").then(bluetoothState => {
        this.kbData.wireless.bluetooth.state = bluetoothState;
      });
      await focus.command("wireless.bluetooth.stability").then(bluetoothStability => {
        this.kbData.wireless.bluetooth.stability = bluetoothStability;
      });

      // rf commands
      this.kbData.wireless.rf = {};
      await focus.command("wireless.rf.channelHop").then(rfChannelHop => {
        this.kbData.wireless.rf.channelHop = rfChannelHop;
      });
      await focus.command("wireless.rf.state").then(rfState => {
        this.kbData.wireless.rf.state = rfState;
      });
      await focus.command("wireless.rf.stability").then(rfStability => {
        this.kbData.wireless.rf.stability = rfStability;
      });

      // Additional commands
      await focus.command("led.brightness.underglow").then(UGBrightness => {
        this.kbData.ledBrightnessUG = UGBrightness;
      });
    }

    //Save in state
    this.setState({ kbData: this.kbData });
  };

  saveKeymapChanges = async () => {
    const focus = new Focus();

    const {
      keymap,
      defaultLayer,
      showDefaults,
      ledBrightness,
      ledIdleTimeLimit,
      qukeysHoldTimeout,
      qukeysOverlapThreshold,
      SuperTimeout,
      SuperRepeat,
      SuperWaitfor,
      SuperHoldstart,
      SuperOverlapThreshold,
      mouseSpeed,
      mouseSpeedDelay,
      mouseAccelSpeed,
      mouseAccelDelay,
      mouseWheelSpeed,
      mouseWheelDelay,
      mouseSpeedLimit,
      wireless,
      ledBrightnessUG
    } = this.kbData;

    await await focus.command("keymap.onlyCustom", keymap.onlyCustom);
    await await focus.command("settings.defaultLayer", defaultLayer);
    await await focus.command("led.brightness", ledBrightness);
    if (ledIdleTimeLimit >= 0) await await focus.command("idleleds.time_limit", ledIdleTimeLimit);
    store.set("settings.showDefaults", showDefaults);
    // QUKEYS
    await await focus.command("qukeys.holdTimeout", qukeysHoldTimeout);
    await await focus.command("qukeys.overlapThreshold", qukeysOverlapThreshold);
    // SUPER KEYS
    await await focus.command("superkeys.timeout", SuperTimeout);
    await await focus.command("superkeys.repeat", SuperRepeat);
    await await focus.command("superkeys.waitfor", SuperWaitfor);
    await await focus.command("superkeys.holdstart", SuperHoldstart);
    // await await focus.command("superkeys.overlap", SuperOverlapThreshold);
    // MOUSE KEYS
    await await focus.command("mouse.speed", mouseSpeed);
    await await focus.command("mouse.speedDelay", mouseSpeedDelay);
    await await focus.command("mouse.accelSpeed", mouseAccelSpeed);
    await await focus.command("mouse.accelDelay", mouseAccelDelay);
    await await focus.command("mouse.wheelSpeed", mouseWheelSpeed);
    await await focus.command("mouse.wheelDelay", mouseWheelDelay);
    await await focus.command("mouse.speedLimit", mouseSpeedLimit);
    // WIRELESS
    if (this.state.wireless) {
      await await focus.command("wireless.battery.level", wireless.battery.level);
      await await focus.command("wireless.battery.state", wireless.battery.state);
      await await focus.command("wireless.battery.mode", wireless.battery.mode);
      await await focus.command("wireless.energy.modes", wireless.energy.modes);
      await await focus.command("wireless.energy.currentMode", wireless.energy.currentMode);
      await await focus.command("wireless.energy.disable", wireless.energy.disable);
      await await focus.command("wireless.bluetooth.devices", wireless.bluetooth.devices);
      await await focus.command("wireless.bluetooth.state", wireless.bluetooth.state);
      await await focus.command("wireless.bluetooth.stability", wireless.bluetooth.stability);
      await await focus.command("wireless.rf.channelHop", wireless.rf.channelHop);
      await await focus.command("wireless.rf.state", wireless.rf.state);
      await await focus.command("wireless.rf.stability", wireless.rf.stability);
      await await focus.command("led.brightness.underglow", ledBrightnessUG);
    }

    //TODO: Review toast popup on try/catch works well.
    try {
      const commands = await this.bkp.Commands();
      const backup = await this.bkp.DoBackup(commands, this.state.neuronID);
      this.bkp.SaveBackup(backup);
      toast.success(<ToastMessage title={i18n.success.preferencesSaved} icon={<IconFloppyDisk />} />, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        icon: ""
      });
    } catch (error) {
      console.error(error);
      toast.error(
        <ToastMessage
          title={i18n.errors.preferenceFailOnSave}
          content={i18n.errors.preferenceFailOnSaveBody}
          icon={<IconFloppyDisk />}
        />,
        {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          icon: ""
        }
      );
    }

    this.destroyContext();
  };

  destroyContext = () => {
    this.kbData.modified = false;
    this.setState({ modified: false });
    this.getNeuronData();
    this.props.cancelContext();
  };

  // GENERAL FUNCTIONS
  setLanguage = async event => {
    i18n.setLanguage(event.target.value);
    await this.setState({});
    await store.set("settings.language", event.target.value);
  };

  setKbData = kbData => {
    if (this.kbData.modified == false && kbData.modified == true) {
      this.kbData = kbData;
      this.props.startContext();
      this.setState({ modified: kbData.modified });
    } else {
      this.kbData = kbData;
    }
  };

  selectDefaultLayer = value => {
    if (this.kbData.modified == false) {
      this.kbData.modified = true;
      this.setState({ modified: true });
      this.props.startContext();
      this.kbData.defaultLayer = parseInt(value);
    } else {
      this.kbData.defaultLayer = parseInt(value);
      this.forceUpdate();
    }
  };

  // ADVANCED FUNCTIONS
  toggleAdvanced = () => {
    this.setState(state => ({
      advanced: !state.advanced
    }));
  };

  toggleDevTools = async event => {
    this.setState({ devTools: event.target.checked });
    await ipcRenderer.invoke("manage-devtools", event.target.checked);
    this.props.startContext();
  };

  // THEME MODE FUNCTIONS
  selectDarkMode = key => {
    this.setState({ darkMode: key });
    this.props.toggleDarkMode(key);
  };

  toggleVerboseFocus = event => {
    this.setState({ verboseFocus: event.target.checked });
    let focus = new Focus();
    focus.debug = event.target.checked;
  };

  toggleOnlyCustom = event => {
    let newkbData = this.kbData;
    newkbData.keymap.onlyCustom = event.target.checked;
    newkbData.modified = true;
    this.setState({ modified: true });
    this.props.startContext();
  };

  // NEURON FUNCTIONS
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

  sendRePairCommand = async () => {
    let focus = new Focus();
    const result = await focus.command("wireless.rf.syncPairing");
    console.log("command returned", result);
  };

  render() {
    const { neurons, selectedNeuron, darkMode, neuronID, devTools, verboseFocus, kbData, modified } = this.state;
    const { inContext, connected } = this.props;
    const { defaultLayer } = this.kbData;
    const devToolsSwitch = <Form.Check type="switch" checked={devTools} onChange={this.toggleDevTools} />;
    const verboseSwitch = <Form.Check type="switch" checked={verboseFocus} onChange={this.toggleVerboseFocus} />;
    const onlyCustomSwitch = <Form.Check type="switch" checked={kbData.keymap.onlyCustom} onChange={this.toggleOnlyCustom} />;
    const pairingButton = <RegularButton buttonText={"Re-Pair RF"} style="short warning sm" onClick={this.sendRePairCommand} />;
    // console.log("CHECKING STATUS MOD", modified);
    // console.log("CHECKING STATUS CTX", inContext);

    return (
      <Styles>
        <Container fluid>
          <PageHeader
            text={i18n.preferences.title}
            style={"pageHeaderFlatBottom"}
            showSaving={true}
            showContentSelector={false}
            saveContext={this.saveKeymapChanges}
            destroyContext={this.destroyContext}
            inContext={modified}
          />
          {this.state.working && <Spinner role="status" />}
          <div className="wrapper wrapperBackground">
            <Container fluid>
              <Row className="justify-content-center">
                <Col lg={9} xl={6}>
                  <GeneralSettings
                    selectDarkMode={this.selectDarkMode}
                    darkMode={darkMode}
                    neurons={neurons}
                    selectedNeuron={selectedNeuron}
                    defaultLayer={defaultLayer}
                    selectDefaultLayer={this.selectDefaultLayer}
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
                  <KeyboardSettings kbData={kbData} setKbData={this.setKbData} connected={connected} />
                  <AdvancedSettings
                    devToolsSwitch={devToolsSwitch}
                    verboseSwitch={verboseSwitch}
                    onlyCustomSwitch={onlyCustomSwitch}
                    pairingButton={this.state.wireless ? pairingButton : <></>}
                    connected={connected}
                  />
                </Col>
              </Row>
            </Container>
          </div>
        </Container>
      </Styles>
    );
  }
}

export default Preferences;
