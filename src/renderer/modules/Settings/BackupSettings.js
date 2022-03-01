import PropTypes from "prop-types";
import React, { Component } from "react";
import i18n from "../../i18n";
import Slider from "react-rangeslider";
import Focus from "../../../api/focus";
import Backup from "../../../api/backup";
import { isArray } from "lodash";

// React Bootstrap Components
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

// Own Components
import Title from "../../component/Title";
import BackupFolderConfigurator from "../../modules/BackupFolderConfigurator";

// Icons Imports
import { IconFloppyDisk } from "../../component/Icon";

const Store = require("electron-store");
const store = new Store();

export default class BackupSettings extends Component {
  constructor(props) {
    super(props);

    this.bkp = new Backup();

    this.state = {
      backupFolder: "",
      storeBackups: 13
    };
  }

  componentDidMount() {
    this.setState({
      backupFolder: store.get("settings.backupFolder")
    });

    this.setState({
      storeBackups: store.get("settings.backupFrequency")
    });
  }

  ChooseBackupFolder = () => {
    let options = {
      title: i18n.keyboardSettings.backupFolder.title,
      buttonLabel: i18n.keyboardSettings.backupFolder.windowButton,
      properties: ["openDirectory"]
    };
    const remote = require("electron").remote;
    const WIN = remote.getCurrentWindow();
    remote.dialog
      .showOpenDialog(WIN, options)
      .then(resp => {
        if (!resp.canceled) {
          console.log(resp.filePaths);
          this.setState({
            backupFolder: resp.filePaths[0]
          });
          store.set("settings.backupFolder", `${resp.filePaths[0]}`);
        } else {
          console.log("user closed backup folder dialog");
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  GetBackup = async () => {
    let options = {
      title: i18n.keyboardSettings.backupFolder.restoreTitle,
      buttonLabel: i18n.keyboardSettings.backupFolder.windowRestore,
      defaultPath: this.state.backupFolder,
      filters: [
        { name: "Json", extensions: ["json"] },
        { name: i18n.dialog.allFiles, extensions: ["*"] }
      ]
    };
    const remote = require("electron").remote;
    const WIN = remote.getCurrentWindow();
    remote.dialog
      .showOpenDialog(WIN, options)
      .then(resp => {
        if (!resp.canceled) {
          console.log(resp.filePaths);
          let backup;
          try {
            backup = JSON.parse(require("fs").readFileSync(resp.filePaths[0]));
            console.log(
              "loaded backup",
              backup.backup == undefined ? backup[0].command : backup.backup[0].command,
              backup.backup == undefined ? backup[0].data : backup.backup[0].data
            );
          } catch (e) {
            console.error(e);
            alert("The file is not a valid global backup");
            return;
          }
          this.restoreBackup(backup);
        } else {
          console.log("user closed SaveDialog");
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  setStoreBackups = value => {
    console.log("changed backup period to: ", value);
    this.setState({
      storeBackups: value
    });
    store.set("settings.backupFrequency", value);
  };

  async restoreBackup(backup) {
    let focus = new Focus();
    let data = [];
    if (isArray(backup)) {
      data = backup;
    } else {
      data = backup.backup;
      // TODO: IF THE USER WANTS!!
      let neurons = this.props.neurons;
      let index = neurons.findIndex(n => n.id == this.props.neuronID);
      neurons[index] = backup.neuron;
      store.set("neurons", neurons);
    }
    try {
      for (let i = 0; i < data.length; i++) {
        let val = data[i].data;
        // Boolean values needs to be sent as int
        if (typeof val === "boolean") {
          val = +val;
        }
        console.log(`Going to send ${data[i].command} to keyboard`);
        await focus.command(`${data[i].command} ${val}`.trim());
      }
      await focus.command("led.mode 0");
      console.log("Restoring all settings");
      console.log("Firmware update OK");
      return true;
    } catch (e) {
      console.log(`Restore settings: Error: ${e.message}`);
      return false;
    }
  }

  render() {
    const { connected } = this.props;
    const { backupFolder, storeBackups } = this.state;
    return (
      <Card className="overflowFix card-preferences mt-4">
        <Card.Title>
          <Title text={i18n.keyboardSettings.backupFolder.header} headingLevel={3} svgICO={<IconFloppyDisk />} />
        </Card.Title>
        <Card.Body className="pb-0">
          <Form.Group controlId="backupFolder" className="mb-0">
            <Row>
              <Col>
                <BackupFolderConfigurator
                  chooseBackupFolder={this.ChooseBackupFolder}
                  getBackup={this.GetBackup}
                  backupFolder={backupFolder}
                  connected={connected}
                />
              </Col>
            </Row>
            <Row>
              <Col className="mt-3">
                <Form.Label>{i18n.keyboardSettings.backupFolder.storeTime}</Form.Label>
              </Col>
            </Row>
            <Row>
              <Col xs={2} className="p-0 text-center align-self-center">
                <span className="tagsfix">1 month</span>
              </Col>
              <Col xs={8} className="px-1">
                <Slider min={0} max={13} step={1} value={storeBackups} onChange={this.setStoreBackups} />
              </Col>
              <Col xs={2} className="p-0 text-center align-self-center">
                <span className="tagsfix">Forever</span>
              </Col>
            </Row>
          </Form.Group>
        </Card.Body>
      </Card>
    );
  }
}

BackupSettings.propTypes = {
  neurons: PropTypes.array.isRequired,
  selectedNeuron: PropTypes.number.isRequired,
  neuronID: PropTypes.number.isRequired,
  connected: PropTypes.bool.isRequired
};
