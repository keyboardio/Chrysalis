import React from "react";
import Focus from "../focus";
import path from "path";

const Store = require("electron-store");
const store = new Store();

export default class Backup {
  constructor() {
    this.focus = new Focus();
    this.neurons = store.get("neurons");
    this.Commands = this.Commands.bind(this);
    this.DoBackup = this.DoBackup.bind(this);
    this.SaveBackup = this.SaveBackup.bind(this);
  }

  /**
   * Function that returns the list of available commands excluding the ones that do not return usefull information for the backup
   * @returns An array with strings that contain the serial commands that are capable of returing the keyboard configuration
   */
  async Commands() {
    const notRequired = [
      "eeprom",
      "hardware",
      "settings.valid?",
      "settings.version",
      "settings.crc",
      "layer",
      "help",
      "version",
      "led.mode",
      "led.theme",
      "led.at",
      "led.setMultiple",
      "led.getMultiple",
      "led.setAll",
      "macros.trigger",
      "qukeys",
      "upgrade",
      "settings.printConfig",
      "settings.aliveInterval",
      "settings.spiSpeed",
      "settings.cpuSpeed",
      "settings.ledDriverPullUp",
      "settings.underGlow",
      "settings.ledDriver"
    ];
    let commands = await this.focus.command("help");
    return commands.filter(c => !notRequired.some(v => c.includes(v)));
  }

  /**
   * @typedef {Object} Backup
   * @property {string} neuronID - The ID of the neuron that sourced this backup
   * @property {Object} neuron - The locally stored information for this NeuronID at the backups creation time
   * @property {{bazecor: string, kaleidoscope: string, firmware: string}} versions - The versions of the software and firmware used to flash this backup
   * @property {Array<{command: string, data: string}>} backup - The actual backup with the data from each command
   */

  /**
   * The function is desgned to make a backup of the whole configuration pertaining the Raise keyboard
   *
   * To achieve this it uses both the list of commands provided by the caller and the neuron ID which
   * will help the function retrieve the current neuron configuration stored locally, so it can be added
   * to the backup
   *
   * @param {Array<string>} commands The required list of commands to be executed on the keyboard, they are retrieved using the Backup.commands function of this same module, you can add or remove from that list as needed.
   * @param {string} neuronID This parameter contains the neuronID obtained from the Raise, so the corresponding local settings can be retrieved.
   * @returns {Backup} Backup The function returns the full made backup, so it can be stored wherever is needed, and changed if the module requires it.
   */
  async DoBackup(commands, neuronID) {
    if (this.focus.file !== null) return;
    let backup = {};
    let commandList = [];
    let versions;
    for (let i = 0; i < commands.length; i++) {
      let command = commands[i];
      console.log(command);
      let data = await this.focus.command(command);
      commandList.push({ command, data });
    }
    let vData = await this.focus.command("version");
    let parts = vData.split(" ");
    versions = {
      bazecor: parts[0],
      kaleidoscope: parts[1],
      firmware: parts[2]
    };
    backup.neuronID = neuronID;
    backup.neuron = this.neurons.filter(n => n.id == neuronID)[0];
    backup.neuron.device = this.focus.device;
    backup.versions = versions;
    backup.backup = commandList;
    return backup;
  }

  /**
   * This function physically stores the backup file passed as a variable, the backup is stored in the settings.backupFolder and it uses the following file format
   *
   * RaiseBackup-YYYYMMDDhhmmss.json
   * @param {*} backup The backup data object to be stored locally
   * @returns True when the function has successfully stored the backup locally, and false if something fails, an error log will be also pushed to the console
   */
  SaveBackup(backup) {
    let focus = new Focus();
    if (focus.file !== null) {
      let file = JSON.parse(require("fs").readFileSync(focus.fileData.device.filePath));
      file.virtual = focus.fileData.virtual;
      const json = JSON.stringify(file, null, 2);
      require("fs").writeFileSync(focus.fileData.device.filePath, json, err => {
        if (err) {
          console.error(err);
          throw err;
        }
      });
      return;
    }
    let product = focus.device.info.product;
    const d = new Date();
    const folder = store.get("settings.backupFolder");
    try {
      const folderPath = path.join(folder, product, backup.neuronID);
      const fullPath = path.join(
        folder,
        product,
        backup.neuronID,
        `${
          d.getFullYear() +
          ("0" + (d.getMonth() + 1)).slice(-2) +
          ("0" + d.getDate()).slice(-2) +
          ("0" + d.getHours()).slice(-2) +
          ("0" + d.getMinutes()).slice(-2) +
          ("0" + d.getSeconds()).slice(-2)
        }-${backup.neuron.name.replace(/[^\w\s]/gi, "")}.json`
      );
      const json = JSON.stringify(backup, null, 2);
      console.log(fullPath, folderPath, backup);
      console.log("Creating folders");
      require("fs").mkdir(folderPath, { recursive: true }, err => {
        if (err) {
          console.error(err);
          throw err;
        }
      });
      console.log(`Saving Backup to -> ${fullPath}`);
      require("fs").writeFileSync(fullPath, json, err => {
        if (err) {
          console.error(err);
          throw err;
        }
      });
      return true;
    } catch (error) {
      console.warn("Error ocurred when saving backup to folder");
      return false;
    }
  }
  // saveBackup = backup => {
  //   let options = {
  //     title: "Full Backup file",
  //     defaultPath: "FlashBackup.json",
  //     buttonLabel: "Backup",
  //     filters: [
  //       { name: "Json", extensions: ["json"] },
  //       { name: "All Files", extensions: ["*"] }
  //     ]
  //   };
  //   const remote = require("electron").remote;
  //   const WIN = remote.getCurrentWindow();
  //   remote.dialog
  //     .showSaveDialog(WIN, options)
  //     .then(resp => {
  //       if (!resp.canceled) {
  //         // console.log(resp.filePath, backup);
  //         require("fs").writeFileSync(
  //           resp.filePath,
  //           JSON.stringify(backup, null, 2)
  //         );
  //         toast.success(i18n.firmwareUpdate.backupSuccessful, {
  //           autoClose: 2000
  //         });
  //       } else {
  //         console.log("user closed Save Dialog");
  //       }
  //     })
  //     .catch(err => {
  //       console.error(err);
  //       toast.error(i18n.errors.exportError + err, {
  //         autoClose: 2000
  //       });
  //     });
  // };
}
