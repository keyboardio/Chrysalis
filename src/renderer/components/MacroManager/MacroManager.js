// -*- mode: js-jsx -*-
/* Bazecor -- Kaleidoscope Command Center
 * Copyright (C) 2019  Keyboardio, Inc.
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

import { withStyles } from "@material-ui/core/styles";
import Fab from "@material-ui/core/Fab";
import CreateIcon from "@material-ui/icons/Create";
import CloseIcon from "@material-ui/icons/Close";
import Modal from "@material-ui/core/Modal";
import IconButton from "@material-ui/core/IconButton";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import i18n from "../../i18n";

import MacroForm from "./MacroForm";

const styles = theme => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    border: "none",
    outline: "none"
  },
  wrapper: {
    width: "90vw",
    position: "relative",
    //TODO perhaps consider changing this to a more flexible / resizable layout?
    maxWidth: "1040px",
    maxHeight: "760px",
    outline: "none"
  },
  root: {
    width: "100%",
    height: "100%",
    backgroundColor: theme.palette.background.default,
    boxShadow: "0 30px 50px rgba(0, 0, 0, 0.7)",
    padding: "13px 8px 0",
    overflowY: "auto",
    [theme.breakpoints.down("md")]: {
      overflowY: "scroll"
    },
    outline: "none",
    alignItems: "flex-start"
  },
  close: {
    position: "absolute",
    right: -20,
    cursor: "pointer"
  },
  margin: {
    display: "flex",
    justifyContent: "start",
    margin: "0 0 15px 30px",
    width: 170,
    height: 34,
    borderRadius: 3,
    padding: 0
  },
  extendedIcon: {
    marginRight: 20,
    marginLeft: 10
  },
  cardHeader: {
    backgroundColor: theme.palette.primary.main,
    color: "#fff"
  },
  cardTitle: {
    color: theme.palette.type === "dark" ? "#000" : "#fff"
  },
  card: {
    width: "100%",
    height: "100%"
  },
  cardcontent: {
    padding: "0px",
    "&:last-child": {
      paddingBottom: "0px"
    }
  }
});

class MacroManager extends Component {
  constructor(props) {
    super(props);

    let selected;

    if (props.macros.length <= props.selected) {
      selected = props.macros.length - 1;
    } else {
      selected = props.selected;
    }

    this.state = {
      macros: props.macros,
      selected: selected,
      open: false
    };

    this.close = this.close.bind(this);
    this.accept = this.accept.bind(this);
    this.deleteMacro = this.deleteMacro.bind(this);
    this.duplicateMacro = this.duplicateMacro.bind(this);
    this.addMacro = this.addMacro.bind(this);
    this.changeSelected = this.changeSelected.bind(this);
    this.exit = this.exit.bind(this);
    this.macrosRestore = this.macrosRestore.bind(this);
  }

  close() {
    let macros = this.state.macros;
    macros[this.state.selected] = this.props.macros[this.state.selected];
    this.setState({
      macros
    });
    this.exit();
  }

  exit() {
    this.setState({
      open: false
    });
  }

  accept(macros) {
    this.setState({
      macros: macros
    });
    this.props.updateMacro(macros);
    this.props.changeSelected(this.state.selected);
    this.exit();
  }

  addMacro() {
    if (this.state.macros.length < this.props.maxMacros) {
      let aux = this.state.macros;
      const newID = aux.length;
      aux.push({
        actions: [],
        name: "Empty Macro",
        id: newID,
        macro: ""
      });
      this.props.updateMacro(aux);
      this.changeSelected(newID);
    }
  }

  deleteMacro(selected) {
    if (this.state.macros.length > 0) {
      let aux = this.state.macros;
      aux.splice(selected, 1);
      aux = aux.map((item, index) => {
        let aux = item;
        aux.id = index;
        return aux;
      });
      if (selected >= this.state.macros.length - 1) {
        this.changeSelected(this.state.macros.length - 1);
      }
      this.props.updateMacro(aux);
    }
  }

  duplicateMacro(selected) {
    let macros = this.state.macros;
    let aux = Object.assign({}, this.state.macros[selected]);
    aux.id = this.state.macros.length;
    aux.name = "Copy of " + aux.name;
    macros.push(aux);
    this.props.updateMacro(macros);
    this.changeSelected(aux.id);
  }

  changeSelected(selected) {
    this.setState({
      selected
    });
  }

  macrosRestore(macros) {
    this.setState({
      macros: macros
    });
    this.changeSelected(0);
    this.props.updateMacro(macros);
  }

  render() {
    const { classes, keymapDB } = this.props;

    return (
      <React.Fragment>
        <Fab
          variant="extended"
          color="primary"
          aria-label="add"
          className={classes.margin}
          onClick={() => {
            this.setState({
              open: true
            });
          }}
        >
          <CreateIcon className={classes.extendedIcon} />
          {i18n.editor.macros.editMacros}
        </Fab>
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          className={classes.modal}
          open={this.state.open}
          onClose={this.exit}
          closeAfterTransition
          disableEnforceFocus
        >
          <div className={classes.wrapper}>
            <Card className={classes.card}>
              <CardHeader
                classes={{
                  root: classes.cardHeader,
                  title: classes.cardTitle
                }}
                action={
                  <IconButton onClick={this.exit} className={classes.cardTitle}>
                    <CloseIcon />
                  </IconButton>
                }
                title={i18n.editor.macros.title}
              />
              <CardContent classes={{ root: classes.cardcontent }}>
                <MacroForm
                  key={this.state.macros.length + this.state.selected}
                  macros={this.state.macros}
                  close={this.close}
                  selected={this.state.selected}
                  accept={this.accept}
                  keymapDB={keymapDB}
                  deleteMacro={this.deleteMacro}
                  addMacro={this.addMacro}
                  disableAdd={this.state.macros.length === this.props.maxMacros}
                  changeSelected={this.changeSelected}
                  duplicateMacro={this.duplicateMacro}
                  macrosRestore={this.macrosRestore}
                />
              </CardContent>
            </Card>
          </div>
        </Modal>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(MacroManager);
