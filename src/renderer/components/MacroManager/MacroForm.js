import React, { Component } from "react";
import classNames from "classnames";
import MacroTable from "./MacroTable";
import MacroSelector from "./MacroSelector";

import {
  ArchiveRounded,
  UnarchiveRounded,
  SaveRounded,
  InputRounded,
  SaveAltRounded
} from "@material-ui/icons";

import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import i18n from "../../i18n";

const styles = theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap"
  },
  margin: {
    margin: theme.spacing()
  },
  textField: {
    flexBasis: 200,
    display: "flex"
  },
  code: {
    width: "-webkit-fill-available"
  },
  button: {
    float: "right"
  },
  buttons: {
    display: "flex",
    position: "relative",
    placeContent: "space-between"
  },
  centered: {
    placeContent: "center"
  }
});

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
    this.toExport = this.toExport.bind(this);
    this.toImport = this.toImport.bind(this);
    this.toRestore = this.toRestore.bind(this);
    this.toBackup = this.toBackup.bind(this);
  }

  updateMacro() {
    let macros = this.state.macros;
    if (macros[this.state.selected] === undefined) {
      this.setState({ macros });
      this.props.accept(macros);
      return;
    }
    macros[this.state.selected].name = this.state.name;
    macros[this.state.selected].actions = this.state.actions;
    macros[this.state.selected].macro = this.state.text;
    this.setState({ macros });
    this.props.accept(macros);
  }

  updateActions(actions, text) {
    this.setState({
      actions,
      text
    });
  }

  updateSelected(selected) {
    this.setState({
      selected
    });
    this.props.changeSelected(selected);
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

  render() {
    const { classes, close, keymapDB } = this.props;
    const currentMacro = this.state.macros[this.state.selected];
    return (
      <Grid container direction="row" justify="center" alignItems="stretch">
        <Grid item xs={5} className={classes.bglist}>
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
          <div className={classNames(classes.buttons, classes.centered)}>
            <div>
              <Button
                variant="outlined"
                className={classNames(classes.margin, classes.grey)}
                onClick={this.toRestore}
                startIcon={<ArchiveRounded />}
              >
                {i18n.editor.macros.restore}
              </Button>

              <Button
                variant="outlined"
                className={classNames(classes.margin, classes.grey)}
                onClick={this.toBackup}
                startIcon={<UnarchiveRounded />}
              >
                {i18n.editor.macros.backup}
              </Button>
            </div>
          </div>
        </Grid>
        <Grid item xs={7} className={classes.bg}>
          <TextField
            id="name"
            className={classNames(classes.margin, classes.textField)}
            variant="outlined"
            label={i18n.editor.macros.macroName}
            value={this.state.name}
            onChange={e => {
              this.setState({ name: e.target.value });
            }}
          />
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
          <div className={classes.buttons}>
            {/* <Button
              variant="outlined"
              color="secondary"
              className={classes.margin}
              onClick={close}
            >
              {i18n.dialog.cancel}
            </Button> */}
            <div>
              <Button
                variant="outlined"
                className={classNames(classes.margin, classes.grey)}
                onClick={this.toImport}
                startIcon={<InputRounded />}
              >
                {i18n.editor.macros.import}
              </Button>
              <Button
                variant="outlined"
                className={classNames(classes.margin, classes.grey)}
                onClick={this.toExport}
                startIcon={<SaveRounded />}
              >
                {i18n.editor.macros.export}
              </Button>
            </div>
            <Button
              variant="contained"
              color="primary"
              className={classNames(classes.margin, classes.button)}
              onClick={this.updateMacro}
              startIcon={<SaveAltRounded />}
            >
              {i18n.editor.macros.applyAndExit}
            </Button>
          </div>
        </Grid>
      </Grid>
    );
  }
}
export default withStyles(styles)(MacroForm);
