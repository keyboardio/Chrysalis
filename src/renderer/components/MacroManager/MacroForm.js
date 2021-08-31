import React, { Component } from "react";
import MacroTable from "./MacroTable";
import MacroSelector from "./MacroSelector";

import Styled from "styled-components";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";
import { BiImport, BiExport } from "react-icons/bi";

import i18n from "../../i18n";

const Styles = Styled.div`
.root {
  display: flex;
  flex-wrap: wrap;
}
.margin {
  margin: 1rem;
}
.textField {
  inline-size: -webkit-fill-available;
  display: flex;
}
.code {
  width: -webkit-fill-available;
}
.button {
  float: right;
}
.buttons {
  display: flex;
  position: relative;
  place-content: space-between;
  margin-top: 1rem;
}
.centered {
  place-content: center;
}
.bg {
  margin-right: 0px;
}
.form-row {
  padding: 0;
}
.row-buttons {
  justify-content: center;
}
.applybutton {
  float: right;
  margin-right: 1rem;
}
`;

class MacroForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      macros: props.macros,
      selected: props.selected,
      name:
        props.macros[props.selected] === undefined
          ? ""
          : props.macros[props.selected].name,
      id:
        props.macros[props.selected] === undefined
          ? 0
          : props.macros[props.selected].id,
      actions:
        props.macros[props.selected] === undefined
          ? []
          : props.macros[props.selected].actions,
      text:
        props.macros[props.selected] === undefined
          ? ""
          : props.macros[props.selected].macro
    };

    this.updateMacro = this.updateMacro.bind(this);
    this.updateActions = this.updateActions.bind(this);
    this.updateSelected = this.updateSelected.bind(this);
    this.updateName = this.updateName.bind(this);
    this.toExport = this.toExport.bind(this);
    this.toImport = this.toImport.bind(this);
    this.toRestore = this.toRestore.bind(this);
    this.toBackup = this.toBackup.bind(this);
    this.toBackup = this.toBackup.bind(this);
    this.Importing = this.Importing.bind(this);
    this.Exporting = this.Exporting.bind(this);
  }

  updateMacro(data) {
    let macros = this.state.macros;
    if (macros[this.state.selected] === undefined) {
      this.setState({ macros });
      this.props.accept(macros);
      return;
    }
    macros[this.state.selected].name = data.name;
    macros[this.state.selected].actions = data.actions;
    macros[this.state.selected].macro = data.text;
    this.setState({
      macros,
      name: data.name,
      actions: data.actions,
      macro: data.text
    });
    this.props.accept(macros);
  }

  updateActions(actions, text) {
    this.updateMacro({
      name: this.state.name,
      actions: actions,
      text: text
    });
  }

  updateSelected(selected) {
    this.setState({
      selected
    });
    this.props.changeSelected(selected);
  }

  updateName() {
    this.updateMacro({
      name: this.state.name,
      actions: this.state.actions,
      text: this.state.text
    });
  }

  toImport() {
    let options = {
      title: i18n.editor.macros.loadMacroFile,
      buttonLabel: i18n.editor.macros.loadMacro,
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
          let macro;
          try {
            macro = JSON.parse(require("fs").readFileSync(resp.filePaths[0]));
            console.log(macro.name, macro.actions[0].keyCode, macro.text);
          } catch (e) {
            console.error(e);
            alert("The file is not a valid macro export ");
            return;
          }
          console.log(macro);
          this.updateActions(macro.actions, macro.text);
          const newMacros = this.state.macros;
          newMacros[this.state.selected] = macro;
          this.setState({
            name: macro.name,
            macros: newMacros
          });
        } else {
          console.log("user closed SaveDialog");
        }
      })
      .catch(err => {
        console.log(err);
      });
  }

  toExport() {
    const toExport = JSON.stringify({
      name: this.state.name,
      actions: this.state.actions,
      text: this.state.text
    });
    let options = {
      title: i18n.editor.macros.saveMacrosFile,
      defaultPath: this.state.name + ".json",
      buttonLabel: i18n.editor.macros.saveMacros,
      filters: [
        { name: "Json", extensions: ["json"] },
        { name: i18n.dialog.allFiles, extensions: ["*"] }
      ]
    };
    const remote = require("electron").remote;
    const WIN = remote.getCurrentWindow();
    remote.dialog
      .showSaveDialog(WIN, options)
      .then(resp => {
        if (!resp.canceled) {
          console.log(resp.filePath, toExport);
          require("fs").writeFileSync(resp.filePath, toExport);
        } else {
          console.log("user closed SaveDialog");
        }
      })
      .catch(err => {
        console.log(err);
      });
  }

  toRestore() {
    let options = {
      title: i18n.editor.macros.restoreMacrosFile,
      buttonLabel: i18n.editor.macros.restoreMacros,
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
          let macros;
          try {
            macros = JSON.parse(require("fs").readFileSync(resp.filePaths[0]));
            console.log(macros[0].name, macros[0].actions);
          } catch (e) {
            console.error(e);
            alert("The file is not a valid macros backup");
            return;
          }
          console.log(macros);
          this.setState({
            macros: macros,
            selected: 0,
            name: macros[0].name,
            id: 0,
            actions: macros[0].actions,
            text: macros[0].macro
          });
          this.props.macrosRestore(macros);
          this.forceUpdate();
        } else {
          console.log("user closed SaveDialog");
        }
      })
      .catch(err => {
        console.log(err);
      });
  }

  toBackup() {
    let options = {
      title: i18n.editor.macros.backupMacroFile,
      defaultPath: "allMacros.json",
      buttonLabel: i18n.editor.macros.backupMacros,
      filters: [
        { name: "Json", extensions: ["json"] },
        { name: i18n.dialog.allFiles, extensions: ["*"] }
      ]
    };
    const remote = require("electron").remote;
    const WIN = remote.getCurrentWindow();
    remote.dialog
      .showSaveDialog(WIN, options)
      .then(resp => {
        if (!resp.canceled) {
          console.log(resp.filePath, JSON.stringify(this.state.macros));
          require("fs").writeFileSync(
            resp.filePath,
            JSON.stringify(this.state.macros)
          );
        } else {
          console.log("user closed SaveDialog");
        }
      })
      .catch(err => {
        console.log(err);
      });
  }

  Importing(selection) {
    console.log("importing:", selection);
    if (selection == "import") this.toImport();
    if (selection == "restore") this.toRestore();
  }

  Exporting(selection) {
    console.log("exporting:", selection);
    if (selection == "export") this.toExport();
    if (selection == "backup") this.toBackup();
  }

  render() {
    const { close, keymapDB } = this.props;
    const currentMacro = this.state.macros[this.state.selected];
    return (
      <Styles>
        <Row direction="row" justify="center" className="form-row">
          <Col xs={5} className="bglist">
            <MacroSelector
              key={this.state.macros.lenght + this.state.selected}
              macros={this.state.macros}
              selected={this.state.selected}
              updateSelected={this.updateSelected}
              deleteMacro={this.props.deleteMacro}
              addMacro={this.props.addMacro}
              disableAdd={this.props.disableAdd}
              duplicateMacro={this.props.duplicateMacro}
            />
          </Col>
          <Col xs={7} className="bg">
            <Row>
              <Col xs={10}>
                <Form.Control
                  type="text"
                  className="margin textField my-0"
                  placeholder={i18n.editor.macros.macroName}
                  value={this.state.name}
                  onChange={e => {
                    this.setState({ name: e.target.value });
                  }}
                />
              </Col>
              <Col xs={2}>
                <Button onClick={this.updateName} className="applybutton my-0">
                  {i18n.editor.macros.applyAndExit}
                </Button>
              </Col>
            </Row>
            <MacroTable
              key={
                this.state.selected +
                JSON.stringify(
                  currentMacro !== undefined ? currentMacro.actions : []
                )
              }
              macro={currentMacro}
              updateActions={this.updateActions}
              keymapDB={keymapDB}
              number={this.props.macros.length}
              selected={this.state.selected}
            />
          </Col>
        </Row>
        <Row className="row-buttons">
          <div className={"buttons"}>
            <DropdownButton
              id="exporting-dropdown"
              className="margin grey"
              onSelect={this.Importing}
              title={
                <React.Fragment>
                  <BiImport />
                  {"  "}
                  {i18n.editor.macros.import}
                </React.Fragment>
              }
            >
              <Dropdown.Item eventKey="import">Import macro</Dropdown.Item>
              <Dropdown.Item eventKey="restore">
                Restore all macros
              </Dropdown.Item>
            </DropdownButton>
            <DropdownButton
              id="exporting-dropdown"
              className="margin grey"
              onSelect={this.Exporting}
              title={
                <React.Fragment>
                  <BiExport />
                  {"  "}
                  {i18n.editor.macros.export}
                </React.Fragment>
              }
            >
              <Dropdown.Item eventKey="export">Export macro</Dropdown.Item>
              <Dropdown.Item eventKey="backup">Backup all macros</Dropdown.Item>
            </DropdownButton>
          </div>
        </Row>
      </Styles>
    );
  }
}
export default MacroForm;
