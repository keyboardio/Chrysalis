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
import settings from "electron-settings";

// Styling and elements
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import { FiSave, FiTrash2 } from "react-icons/fi";

// Components
import SuperkeyManager from "../../components/SuperkeyManager";
import KeyConfig from "../../components/KeyManager/KeyConfig";

// API's
import i18n from "../../i18n";
import Keymap, { KeymapDB } from "../../../api/keymap";
import Focus from "../../../api/focus";
import Backup from "../../../api/backup";

const Store = window.require("electron-store");
const store = new Store();

const Styles = Styled.div`
height: -webkit-fill-available;
display: flex;
flex-direction: column;
  .toggle-button{
    text-align: center;
    padding-bottom: 8px;
  }
  .save-button {
    text-align: center;
  }
  .supercontainer {
    margin-right: auto;
    margin-left: auto;
    margin-top: 0.4rem;
    width: inherit;
  }
  .keyboardcontainer {
    margin-right: auto;
    margin-left: auto;
    width: 1440px;
    height: -webkit-fill-available;
    display: flex;
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

class SuperkeysConfigurator extends React.Component {
  constructor(props) {
    super(props);

    this.keymapDB = new KeymapDB();
    this.bkp = new Backup();

    this.state = {
      keymap: [],
      macros: [],
      storedMacros: store.get("macros"),
      superkeys: [],
      storedSuper: store.get("superkeys"),
      maxMacros: 64,
      modified: false,
      selectedSuper: 0,
      selectedAction: -1,
      currentLanguageLayout: settings.getSync("keyboard.language") || "english"
    };
    this.changeSelected = this.changeSelected.bind(this);
    this.updateSuper = this.updateSuper.bind(this);
    this.changeAction = this.changeAction.bind(this);
    this.updateAction = this.updateAction.bind(this);
    this.loadSuperkeys = this.loadSuperkeys.bind(this);
    this.onKeyChange = this.onKeyChange.bind(this);
    this.saveName = this.saveName.bind(this);
    this.writeSuper = this.writeSuper.bind(this);
  }

  async componentDidMount() {
    await this.loadSuperkeys();
  }

  async loadSuperkeys() {
    let focus = new Focus();
    try {
      /**
       * Create property language to the object 'options', to call KeymapDB in Keymap and modify languagu layout
       */
      let deviceLang = { ...focus.device, language: true };
      focus.commands.keymap = new Keymap(deviceLang);
      this.keymapDB = focus.commands.keymap.db;
      let kbtype = "iso";
      try {
        kbtype =
          focus.device && focus.device.info.keyboardType === "ISO"
            ? "iso"
            : "ansi";
      } catch (error) {
        console.error("Focus lost connection to Raise: ", error);
        return false;
      }

      let keymap = await focus.command("keymap");
      console.log(keymap);
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
      let parsedSuper = this.superTranslator(raw2);
      if (!Array.isArray(parsedSuper) || parsedSuper.length === 0) {
        parsedSuper = [
          {
            actions: [],
            name: "Empty Superkey",
            id: 0,
            superkey: ""
          }
        ];
      }
      this.setState({
        modified: false,
        macros: parsedMacros,
        storedMacros: store.get("macros"),
        superkeys: parsedSuper,
        keymap,
        kbtype
      });
    } catch (e) {
      console.log("error when loading SuperKeys");
      console.error(e);
      toast.error(e);
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
          macro:
            "RIGHT SHIFT H RIGHT SHIFT E Y , SPACE RIGHT SHIFT D RIGHT SHIFT Y G M A T E",
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
    console.log(macros, stored);
    if (stored === undefined) {
      return macros;
    }
    finalMacros = macros.map((macro, i) => {
      if (stored.length > i && stored.length > 0) {
        console.log("compare between: ", macro.actions, stored[i].actions);
        if (macro.actions.join(",") === stored[i].actions.join(",")) {
          equal[i] = true;
          let aux = macro;
          aux.name = stored[i].name;
          aux.macro = stored[i].actions
            .map(k => this.keymapDB.parse(k.keyCode).label)
            .join(" ");
          return aux;
        } else {
          equal[i] = false;
          return macro;
        }
      } else {
        return macro;
      }
    });
    this.setState({ equalMacros: equal });
    console.log("Checking differences", this.state.macros, finalMacros);
    return finalMacros;
  }

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
        superkeys[superindex] = { actions: superkey, name: "", id: superindex };
        superindex++;
        superkey = [];
      } else {
        superkey.push(raw[iter]);
      }
      iter++;
    }
    superkeys[superindex] = { actions: superkey, name: "" };
    console.log("Got Superkeys:" + JSON.stringify(superkeys) + " from " + raw);

    if (
      superkeys[0].actions == undefined ||
      superkeys[0].actions == [0] ||
      superkeys[0].actions.filter(v => v === 0).length ==
        superkeys[0].length - 1
    )
      return [];
    // TODO: Check if stored superKeys match the received ones, if they match, retrieve name and apply it to current superKeys
    let equal = [];
    let finalSuper = [];
    const stored = store.get("superkeys") ? store.get("superkeys") : [];
    try {
      console.log("check data integrity", superkeys, stored, stored[0].actions);
      if (stored === undefined || stored[0].actions === undefined) {
        return superkeys;
      }
    } catch (error) {
      console.error("unable to retrieve stored superkeys, using loaded ones");
      console.error(error);
      return superkeys;
    }

    finalSuper = superkeys.map((superk, i) => {
      superk.id = i;
      if (stored.length > i && stored.length > 0) {
        console.log(
          "compare between SK: ",
          superk.actions.join(","),
          stored[i].actions.filter(act => act != 0).join(",")
        );
        if (
          superk.actions.join(",") ===
          stored[i].actions.filter(act => act != 0).join(",")
        ) {
          equal[i] = true;
          let aux = superk;
          aux.name = stored[i].name;
          return aux;
        } else {
          equal[i] = false;
          return superk;
        }
      } else {
        return superk;
      }
    });
    console.log("final superkeys", finalSuper);
    this.setState({ storedSuper: stored });
    return finalSuper;
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
      return superkey.actions.filter(act => act != 0).concat([0]);
    });
    const mapped = [].concat.apply([], keyMap.flat()).concat([0]).join(" ");
    console.log(mapped, keyMap);
    return mapped;
  }

  newSuperID() {
    return this.state.superkeys.length;
  }

  setSuperKey(superid, actions, supername) {
    let temp = this.state.superkeys;
    let tempactions = actions;
    let founddata = false;
    tempactions = tempactions
      .reverse()
      .map((elem, index, array) => {
        if (elem != 0) return elem;
        if ((index > 0 && array[index - 1] != 0) || founddata) {
          founddata = true;
          return 1;
        }
        return elem;
      })
      .reverse();
    temp[superid] = { actions: tempactions, name: supername };
    this.setState({ superkeys: temp });
  }

  delSuperKey(superid) {
    let temp = this.state.superkeys;
    let aux = this.state.keymap.custom;
    let result = this.state.keymap;
    temp.splice(superid, 1);
    if (temp.length > superid) {
      aux[this.state.currentLayer]
        .filter(key => key.keyCode > superid + 53916)
        .forEach(key => {
          const auxkey = this.keymapDB.parse(key.keyCode - 1);
          key.label = auxkey.label;
          key.extraLabel = auxkey.extraLabel;
          key.verbose = auxkey.verbose;
          key.keyCode = auxkey.keyCode;
        });
      result.custom = aux;
      this.setState({ keymap: result });
    }
    this.setState({ superkeys: temp });
  }

  macrosMap(macros) {
    if (
      macros.length === 0 ||
      (macros.length === 1 && macros[0].actions === [])
    ) {
      return "255 255 255 255 255 255 255 255 255 255 255 255 255 255 255 255 255 255 255 255 255 255 255 255 255 255 255 255 255 255 255 255 255 255 255 255 255 255 255 255 255 255 255 255 255 255 255 255 255 255 255 255 255 255 255 255 255 255 255 255 255 255 255 255 255 255 255 255 255 255";
    }
    const actionMap = macros.map(macro => {
      return macro.actions
        .map(action => {
          if (action.type > 1 && action.type < 6) {
            return [
              [action.type],
              [action.keyCode >> 8],
              [action.keyCode & 255]
            ];
          } else {
            return [[action.type], [action.keyCode]];
          }
        })
        .concat([0]);
    });
    const mapped = [].concat.apply([], actionMap.flat()).concat([0]).join(" ");
    console.log(mapped);
    return mapped;
  }

  changeSelected(id) {
    this.setState({
      selectedSuper: id < 0 ? 0 : id,
      selectedAction: -1
    });
  }

  changeAction(id) {
    if (id == this.state.selectedAction) {
      this.setState({
        selectedAction: -1
      });
      return;
    }
    this.setState({
      selectedAction: id < 0 ? 0 : id
    });
  }

  updateSuper(newSuper, newID) {
    console.log("launched update super using data:", newSuper, newID);

    this.setState({
      superkeys: newSuper,
      selectedSuper: newID,
      modified: true
    });
  }

  updateAction(newAction) {
    console.log("launched update action using data:", newAction);
    const newData = this.state.superkeys;
    newData[this.state.selectedSuper].actions[
      this.state.selectedAction
    ] = newAction;
    this.setState({
      superkeys: newData,
      modified: true
    });
  }

  onKeyChange(keyCode) {
    const newData = this.state.superkeys;
    newData[this.state.selectedSuper].actions[
      this.state.selectedAction
    ] = keyCode;
    this.setState({
      superkeys: newData,
      modified: true
    });
  }

  saveName(name) {
    let superkeys = this.state.superkeys;
    superkeys[this.state.selectedSuper].name = name;
    this.setState({ superkeys, modified: true });
  }

  async writeSuper() {
    let focus = new Focus();
    let newSuperKeys = this.state.superkeys;
    this.setState({
      modified: false,
      superkeys: newSuperKeys,
      storedMacros: newSuperKeys
    });
    store.set("superkeys", newSuperKeys);
    try {
      await focus.command("superkeys.map", this.superkeyMap(newSuperKeys));
      console.log("Changes saved.");
      const commands = await this.bkp.Commands();
      const backup = await this.bkp.DoBackup(commands);
      this.bkp.SaveBackup(backup);
      toast.success(i18n.editor.macros.successFlash, {
        autoClose: 2000
      });
    } catch (error) {
      toast.error(error);
    }
  }

  render() {
    const {
      currentLanguageLayout,
      kbtype,
      selectedSuper,
      superkeys,
      maxMacros,
      macros,
      selectedAction
    } = this.state;

    let code = 0;
    const tempkey = this.keymapDB.parse(
      superkeys[selectedSuper] != undefined
        ? superkeys[selectedSuper].actions[selectedAction]
        : 0
    );
    code = {
      base:
        tempkey.keyCode > 255
          ? tempkey.keyCode > 53266
            ? tempkey.keyCode == 65535
              ? this.keymapDB.reverse(tempkey.label)
              : parseInt(tempkey.label)
            : this.keymapDB.reverse(tempkey.label)
          : tempkey.keyCode < 20480 || tempkey.keyCode > 20561
          ? this.keymapDB.reverseSub(tempkey.label, tempkey.extraLabel)
          : this.keymapDB.reverse(tempkey.label),
      modified:
        tempkey.keyCode > 255 &&
        (tempkey.keyCode < 20480 || tempkey.keyCode > 20561)
          ? tempkey.keyCode > 53266
            ? tempkey.keyCode == 65535
              ? 0
              : this.keymapDB.reverseSub(tempkey.label, tempkey.extraLabel) -
                parseInt(tempkey.label)
            : this.keymapDB.reverseSub(tempkey.label, tempkey.extraLabel) -
              this.keymapDB.reverse(tempkey.label)
          : 0
    };
    // console.log(selectedSuper, JSON.stringify(code), JSON.stringify(superkeys));
    let actions =
      superkeys.length > 0 && superkeys.length > selectedSuper
        ? superkeys[selectedSuper].actions
        : [];
    let superName =
      superkeys.length > 0 && superkeys.length > selectedSuper
        ? superkeys[selectedSuper].name
        : "";
    return (
      <Styles>
        <Row className="title-row m-0">
          <h4 className="section-title">{i18n.app.menu.superkeys}</h4>
        </Row>
        <Container fluid className="supercontainer">
          <SuperkeyManager
            superkeys={superkeys}
            maxSuperkeys={maxMacros}
            macros={macros}
            saveName={this.saveName}
            selected={selectedSuper}
            updateSuper={this.updateSuper}
            changeSelected={this.changeSelected}
            selectedAction={selectedAction}
            updateAction={this.updateAction}
            changeAction={this.changeAction}
            keymapDB={this.keymapDB}
            key={JSON.stringify(superkeys)}
          />
        </Container>
        <Container
          fluid
          className="keyboardcontainer"
          hidden={selectedAction < 0}
        >
          <KeyConfig
            key={JSON.stringify(superkeys) + selectedAction}
            onKeySelect={this.onKeyChange}
            code={code}
            macros={macros}
            actions={actions}
            action={selectedAction}
            actTab={"super"}
            superName={superName}
            newSuperID={this.newSuperID}
            setSuperKey={this.setSuperKey}
            delSuperKey={this.delSuperKey}
            selectedlanguage={currentLanguageLayout}
            kbtype={kbtype}
          />
        </Container>
        <Row className="save-row">
          <Container fluid>
            <Row>
              <Button
                disabled={!this.state.modified}
                onClick={this.writeSuper}
                className={`button-large pt-0 mt-0 mb-2 ${
                  this.state.modified ? "save-active" : ""
                }`}
                aria-controls="save-changes"
              >
                <FiSave />
              </Button>
            </Row>
            <Row>
              <Button
                disabled={!this.state.modified}
                onClick={this.loadSuperkeys}
                className={`button-large pt-0 mt-0 mb-2 ${
                  this.state.modified ? "cancel-active" : ""
                }`}
                aria-controls="discard-changes"
              >
                <FiTrash2 />
              </Button>
            </Row>
          </Container>
        </Row>
      </Styles>
    );
  }
}

export default SuperkeysConfigurator;
