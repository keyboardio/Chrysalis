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
import { toast } from "react-toastify";
import Styled from "styled-components";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import Modal from "react-bootstrap/Modal";
import { FiSave, FiTrash2 } from "react-icons/fi";

import i18n from "../i18n";
import Keymap, { KeymapDB } from "../../api/keymap";
import Focus from "../../api/focus";
import Backup from "../../api/backup";

import PageHeader from "../modules/PageHeader";
import { MacroSelector } from "../component/Select";
import { RegularButton } from "../component/Button";
import Callout from "../component/Callout";
import ToastMessage from "../component/ToastMessage";
import { IconFloppyDisk } from "../component/Icon";

import MacroCreator from "../modules/Macros/MacroCreator";
import TimelineEditorManager from "../modules/Macros/TimelineEditorManager";

const Store = require("electron-store");
const store = new Store();

const Styles = Styled.div`
  .toggle-button{
    text-align: center;
    padding-bottom: 8px;
  }
  .list-group-item {
    border: none !important;
    background-color: ${({ theme }) => theme.card.background};
  }
  .save-button {
    text-align: center;
  }
  .macrocontainer {
    margin-right: auto;
    margin-left: auto;
    /* width: inherit; */
    max-width: 1350px;
  }
  .save-row {
    position: absolute;
    right: 30px;
    top: 65px;
  }
  .button-large {
    font-size: 2rem;
    width: -webkit-fill-available;
    text-align: left;
  }
  .cancel-active{
    background-color: ${({ theme }) => theme.colors.button.cancel};
  }
  .save-active{
    background-color: ${({ theme }) => theme.colors.button.save};
  }
  .button-large:not(:disabled):not(.disabled):hover {
    color: ${({ theme }) => theme.colors.button.text};
    background-color: ${({ theme }) => theme.colors.button.active};
    border: none;
  }
`;

class MacroEditor extends React.Component {
  constructor(props) {
    super(props);

    this.keymapDB = new KeymapDB();
    this.bkp = new Backup();

    this.state = {
      keymap: [],
      macros: [],
      superkeys: [],
      storedMacros: [],
      storedSuper: [],
      maxMacros: 64,
      modified: false,
      selectedMacro: 0,
      showDeleteModal: false,
      listToDelete: [],
      listToDeleteS: [],
      selectedList: 0,
      freeMemory: 0
    };
    this.updateMacros = this.updateMacros.bind(this);
    this.changeSelected = this.changeSelected.bind(this);
    this.loadMacros = this.loadMacros.bind(this);
    this.writeMacros = this.writeMacros.bind(this);
    this.toggleDeleteModal = this.toggleDeleteModal.bind(this);
    this.UpdateList = this.UpdateList.bind(this);
    this.ActUponDelete = this.ActUponDelete.bind(this);
  }

  async componentDidMount() {
    await this.loadMacros();
  }

  async loadMacros() {
    let focus = new Focus();
    try {
      /**
       * Create property language to the object 'options', to call KeymapDB in Keymap and modify languagu layout
       */
      let chipID = (await focus.command("hardware.chip_id")).replace(/\s/g, "");
      let neurons = store.get("neurons");
      let neuron = {};
      console.log(
        "Macro Neuron Check",
        neurons,
        chipID,
        neurons.some(n => n.id == chipID),
        neurons.filter(n => n.id == chipID)
      );
      if (neurons.some(n => n.id == chipID)) {
        console.log(
          "Macro Neuron Check",
          neurons.filter(n => n.id == chipID)
        );
        neuron = neurons.filter(n => n.id == chipID)[0];
      }
      this.setState({
        neurons,
        neuronID: neurons.findIndex(n => n.id == chipID),
        storedMacros: neuron.macros,
        storedSuper: neuron.superkeys
      });
      let deviceLang = { ...focus.device, language: true };
      focus.commands.keymap = new Keymap(deviceLang);
      this.keymapDB = focus.commands.keymap.db;

      let keymap = await focus.command("keymap");
      let raw = await focus.command("macros.map");
      if (raw.search(" 0 0 ") !== -1) {
        raw = raw.split(" 0 0 ")[0].split(" ").map(Number);
      } else {
        raw = "";
      }
      const parsedMacros = this.macroTranslator(raw);
      let raw2 = await focus.command("superkeys.map");
      if (raw2.search(" 0 0 ") !== -1) {
        raw2 = raw2.split(" 0 0 ")[0].split(" ").map(Number);
      } else {
        raw2 = "";
      }
      const parsedSuper = this.superTranslator(raw2);
      console.log("DATA COLLECTED", parsedMacros, parsedSuper, keymap);
      this.setState({
        macros: parsedMacros,
        superkeys: parsedSuper,
        keymap,
        modified: false,
        freeMemory: parsedMacros.map(m => m.actions).flat().length
      });
    } catch (e) {
      console.log("error when loading macros");
      console.error(e);
      toast.error(<ToastMessage title={e} icon={<IconFloppyDisk />} />);
      this.props.onDisconnect();
    }
  }

  macroTranslator(raw) {
    if (raw === "") {
      return [
        {
          actions: [
            { keyCode: 229, type: 6, id: 0 },
            { keyCode: 11, type: 8, id: 1 },
            { keyCode: 229, type: 7, id: 2 },
            { keyCode: 8, type: 8, id: 3 },
            { keyCode: 28, type: 8, id: 4 },
            { keyCode: 54, type: 8, id: 5 },
            { keyCode: 44, type: 8, id: 6 },
            { keyCode: 229, type: 6, id: 7 },
            { keyCode: 7, type: 8, id: 8 },
            { keyCode: 229, type: 7, id: 9 },
            { keyCode: 28, type: 8, id: 10 },
            { keyCode: 10, type: 8, id: 11 },
            { keyCode: 16, type: 8, id: 12 },
            { keyCode: 4, type: 8, id: 13 },
            { keyCode: 23, type: 8, id: 14 },
            { keyCode: 8, type: 8, id: 15 }
          ],
          id: 0,
          macro: "RIGHT SHIFT H RIGHT SHIFT E Y , SPACE RIGHT SHIFT D RIGHT SHIFT Y G M A T E",
          name: "Hey, Dygmate!"
        }
      ];
    }
    // Translate received macros to human readable text
    let i = 0,
      iter = 0,
      kcs = 0,
      type = 0,
      keyCode = [],
      actions = [],
      macros = [];
    actions = [];
    while (raw.length > iter) {
      if (kcs > 0) {
        keyCode.push(raw[iter]);
        kcs--;
        iter++;
        continue;
      }
      if (iter !== 0 && type !== 0) {
        actions.push({
          type: type,
          keyCode: keyCode
        });
        keyCode = [];
      }
      type = raw[iter];
      if (type > 1 && type < 6) {
        kcs = 2;
      } else {
        kcs = 1;
      }
      if (type === 0) {
        kcs = 0;
        macros[i] = {};
        macros[i].actions = actions;
        macros[i].id = i;
        macros[i].name = "";
        macros[i].macro = "";
        i++;
        actions = [];
        iter++;
        continue;
      }
      iter++;
    }
    actions.push({
      type: type,
      keyCode: keyCode
    });
    macros[i] = {};
    macros[i].actions = actions;
    macros[i].id = i;
    macros[i].name = "";
    macros[i].macro = "";
    macros = macros.map(macro => {
      let aux = macro.actions.map(action => {
        let aux = 0;
        if (action.keyCode.length > 1) {
          aux = (action.keyCode[0] << 8) + action.keyCode[1];
        } else {
          aux = action.keyCode[0];
        }
        return {
          type: action.type,
          keyCode: aux
        };
      });
      return { ...macro, actions: aux };
    });
    // TODO: Check if stored macros match the received ones, if they match, retrieve name and apply it to current macros
    let equal = [];
    let finalMacros = [];
    const stored = this.state.storedMacros;
    if (stored === undefined) {
      return macros;
    }
    finalMacros = macros.map((macro, i) => {
      if (stored.length > i && stored.length > 0) {
        console.log("compare between: ", macro.actions, stored[i].actions);
        let aux = macro;
        aux.name = stored[i].name;
        aux.macro = macro.actions.map(k => this.keymapDB.parse(k.keyCode).label).join(" ");
        return aux;
      } else {
        return macro;
      }
    });
    this.setState({ equalMacros: equal });
    console.log("Checking differences", this.state.macros, finalMacros);
    return finalMacros;
  }

  duplicateMacro = () => {
    let macros = this.state.macros;
    let selected = this.state.selectedMacro;
    let aux = Object.assign({}, this.state.macros[selected]);
    aux.id = this.state.macros.length;
    aux.name = "Copy of " + aux.name;
    macros.push(aux);
    this.updateMacros(macros, -1);
    this.changeSelected(aux.id);
  };

  superTranslator(raw) {
    let superkey = [],
      superkeys = [],
      iter = 0,
      superindex = 0;

    if (raw === "") {
      return [];
    }
    // console.log(raw, raw.length);
    while (raw.length > iter) {
      // console.log(iter, raw[iter], superkey);
      if (raw[iter] === 0) {
        superkeys[superindex] = superkey;
        superindex++;
        superkey = [];
      } else {
        superkey.push(raw[iter]);
      }
      iter++;
    }
    superkeys[superindex] = superkey;
    // console.log("SUPERKEYS LEIDAS:" + superkeys + " de " + raw);

    if (superkeys[0] == [0] || superkeys[0].filter(v => v === 0).length == superkeys[0].length - 1) return [];
    return superkeys;
  }

  superkeyMap(superkeys) {
    if (
      superkeys.length === 0 ||
      (superkeys.length === 1 && superkeys[0].actions == []) ||
      (superkeys.length === 1 && superkeys[0].actions == [0])
    ) {
      return "65535 65535 65535 65535 65535 65535 65535 65535 65535 65535 65535 65535 65535 65535 65535 65535 65535 65535 65535 65535 65535";
    }
    const keyMap = superkeys.map(superkey => {
      return superkey
        .map(key => {
          if (key === 0) {
            return;
          } else {
            return key;
          }
        })
        .concat([0]);
    });
    const mapped = [].concat.apply([], keyMap.flat()).concat([0]).join(" ");
    console.log("Mapped SuperKeys", mapped);
    return mapped;
  }

  updateKeyboard(macros, selected) {
    let list = [];
    let listS = [];
    console.log("Updating keyboard", this.state.macros, selected);
    const macroID = this.state.macros[selected].id + 53852;
    for (let layer = 0; layer < this.state.keymap.custom.length; layer++) {
      list.push(
        this.state.keymap.custom[layer]
          .map((key, pos) => {
            return { layer, pos, key };
          })
          .filter(elem => elem.key.keyCode == macroID)
      );
    }
    // console.log(this.state.superkeys);
    for (let i = 0; i < this.state.superkeys.length; i++) {
      listS.push(
        this.state.superkeys[i]
          .map((action, pos) => {
            return { i, pos, action };
          })
          .filter(elem => elem.action == macroID)
      );
    }
    list = list.flat();
    listS = listS.flat();
    console.log("List logging", list, listS);
    this.setState({
      listToDelete: list,
      listToDeleteS: listS,
      showDeleteModal: true
    });
    return;
  }

  updateMacros(recievedMacros, selected) {
    console.log("Updating Macros", recievedMacros);
    if (selected > -1) this.updateKeyboard(recievedMacros, selected);
    this.setState({ macros: recievedMacros, modified: true });
    this.setState({
      freeMemory: recievedMacros.map(m => m.actions).flat().length
    });
    this.props.startContext();
  }

  async writeMacros() {
    let focus = new Focus();
    let newMacros = this.state.macros;
    let newSuperKeys = this.state.superkeys;
    this.setState({
      modified: false,
      macros: newMacros,
      storedMacros: newMacros
    });
    let neurons = JSON.parse(JSON.stringify(this.state.neurons));
    console.log("Neuron Status", this.state.neuronID, neurons[this.state.neuronID].macros);
    neurons[this.state.neuronID].macros = newMacros;
    store.set("neurons", neurons);
    try {
      await focus.command("macros.map", this.macrosMap(newMacros));
      await focus.command("keymap", this.state.keymap);
      console.log("Changes saved.");
      const commands = await this.bkp.Commands();
      const backup = await this.bkp.DoBackup(commands, this.state.neurons[this.state.neuronID].id);
      this.bkp.SaveBackup(backup);
      toast.success(
        <ToastMessage
          title={i18n.editor.macros.successFlashTitle}
          content={i18n.editor.macros.successFlash}
          icon={<IconFloppyDisk />}
        />,
        {
          autoClose: 2000
        }
      );
    } catch (error) {
      toast.error(<ToastMessage title={error} icon={<IconFloppyDisk />} />);
    }
  }

  macrosMap(macros) {
    if (macros.length === 0 || (macros.length === 1 && macros[0].actions === [])) {
      return "255 255 255 255 255 255 255 255 255 255 255 255 255 255 255 255 255 255 255 255 255 255 255 255 255 255 255 255 255 255 255 255 255 255 255 255 255 255 255 255 255 255 255 255 255 255 255 255 255 255 255 255 255 255 255 255 255 255 255 255 255 255 255 255 255 255 255 255 255 255";
    }
    const actionMap = macros.map(macro => {
      return macro.actions
        .map(action => {
          if (action.type > 1 && action.type < 6) {
            return [[action.type], [action.keyCode >> 8], [action.keyCode & 255]];
          } else {
            return [[action.type], [action.keyCode]];
          }
        })
        .concat([0]);
    });
    const mapped = [].concat.apply([], actionMap.flat()).concat([0]).join(" ");
    return mapped;
  }

  changeSelected(id) {
    this.setState({
      selectedMacro: id < 0 ? 0 : id
    });
  }

  toggleDeleteModal() {
    this.setState({ showDeleteModal: false });
  }

  ActUponDelete() {
    let { selectedList, listToDelete, listToDeleteS, keymap, superkeys } = this.state;
    for (let i = 0; i < listToDelete.length; i++) {
      if (selectedList == -1) {
        keymap[listToDelete[i].layer][listToDelete[i].pos] = this.keymapDB.parse(0);
      } else {
        keymap[listToDelete[i].layer][listToDelete[i].pos] = this.keymapDB.parse(selectedList + 53852);
      }
    }
    for (let i = 0; i < listToDeleteS.length; i++) {
      if (selectedList == -1) {
        superkeys[listToDeleteS[i].i][listToDeleteS[i].pos] = 1;
      } else {
        superkeys[listToDeleteS[i].i][listToDeleteS[i].pos] = selectedList + 53852;
      }
    }
    this.setState({ keymap, superkeys });
    this.toggleDeleteModal();
    return;
  }

  UpdateList(data) {
    this.setState({ selectedList: data });
    return;
  }

  addMacro = name => {
    if (this.state.macros.length < this.state.maxMacros) {
      let aux = this.state.macros;
      const newID = aux.length;
      aux.push({
        actions: [],
        name: name,
        id: newID,
        macro: ""
      });
      console.log("Adding Macro", aux);
      this.updateMacros(aux, -1);
      this.changeSelected(newID);
    }
  };

  deleteMacro = () => {
    if (this.state.macros.length > 0) {
      let aux = JSON.parse(JSON.stringify(this.state.macros));
      let selected = this.state.selectedMacro;
      aux.splice(selected, 1);
      aux = aux.map((item, index) => {
        let aux = item;
        aux.id = index;
        return aux;
      });
      if (selected >= this.state.macros.length - 1) {
        this.changeSelected(this.state.macros.length - 2);
      }
      this.updateMacros(aux, selected);
    }
  };

  saveName = data => {
    // console.log("Saving name: ", data, this.state.macros);
    let macros = JSON.parse(JSON.stringify(this.state.macros));
    macros[this.state.selectedMacro].name = data;
    this.setState({ macros, modified: true });
  };

  // Define updateActions function to update the actions of the selected macro
  updateActions = actions => {
    let macrosList = this.state.macros;
    // console.log("MacroEditor Updating Actions", actions, macrosList, this.state.selectedMacro);
    macrosList[this.state.selectedMacro].actions = actions;
    this.setState({ macros: macrosList, modified: true });
  };

  addToActions = actions => {
    // console.log("MacroEditor Adding Action", actions);
    let macrosList = JSON.parse(JSON.stringify(this.state.macros));
    macrosList[this.state.selectedMacro].actions = actions;
    this.setState({ macros: macrosList, modified: true });
  };

  render() {
    const { macros, maxMacros, modified, selectedList, selectedMacro, listToDelete, freeMemory, showDeleteModal } = this.state;
    const ListOfMacros = listToDelete.map(({ layer, pos, key }, id) => {
      return (
        <Row key={id}>
          <Col xs={12} className="px-0 text-center gridded">
            <p className="titles alignvert">{`Key in layer ${layer} and pos ${pos}`}</p>
          </Col>
        </Row>
      );
    });
    const ListCombo = (
      <DropdownButton
        id="Selectlayers"
        className="selectButton"
        // drop={"up"}
        title={macros.length > 0 && selectedList > -1 ? macros[selectedList].name : "No Key"}
        value={selectedList}
        onSelect={this.UpdateList}
      >
        <Dropdown.Item eventKey={-1} key={`macro-${-1}`} disabled={false}>
          {"No Key"}
        </Dropdown.Item>
        {macros.map((macro, id) => (
          <Dropdown.Item eventKey={macro.id} key={`macro-${id}`} disabled={macro.id == -1}>
            {macro.name}
          </Dropdown.Item>
        ))}
      </DropdownButton>
    );
    if (
      macros[selectedMacro] === undefined ||
      macros[selectedMacro].actions === undefined ||
      macros[selectedMacro].actions.length === 0
    ) {
      return <div />;
    }
    return (
      <Styles className="macroEditor">
        <Container fluid>
          <PageHeader
            text={i18n.app.menu.macros}
            contentSelector={
              <MacroSelector
                itemList={macros}
                selectedItem={selectedMacro}
                subtitle="Macros"
                onSelect={this.changeSelected}
                addItem={this.addMacro}
                deleteItem={this.deleteMacro}
                updateItem={this.saveName}
                cloneItem={this.duplicateMacro}
                maxMacros={maxMacros}
                mem={freeMemory}
              />
            }
            showSaving={true}
            saveContext={this.writeMacros}
            destroyContext={this.loadMacros}
            inContext={modified}
          />
          <Callout content={i18n.editor.macros.callout} className="mt-lg" size="md" />
          <MacroCreator
            macro={JSON.parse(JSON.stringify(macros[selectedMacro]))}
            macros={macros}
            selected={selectedMacro}
            addToActions={this.addToActions}
            changeSelected={this.changeSelected}
            keymapDB={this.keymapDB}
          />
          <TimelineEditorManager macro={macros[selectedMacro]} keymapDB={this.keymapDB} updateActions={this.updateActions} />
        </Container>

        <Modal
          show={showDeleteModal}
          onHide={this.toggleDeleteModal}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title>{i18n.editor.macros.deleteModal.title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>{i18n.editor.macros.deleteModal.body}</p>
            {ListOfMacros}
            {ListCombo}
          </Modal.Body>
          <Modal.Footer>
            <RegularButton
              buttonText={i18n.editor.macros.deleteModal.cancelButton}
              style="outline"
              size="sm"
              onClick={this.toggleDeleteModal}
            />
            <RegularButton
              buttonText={i18n.editor.macros.deleteModal.applyButton}
              style="outline gradient"
              size="sm"
              onClick={this.ActUponDelete}
            />
          </Modal.Footer>
        </Modal>
      </Styles>
    );
  }
}

export default MacroEditor;
