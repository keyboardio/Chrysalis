import React, { Component } from "react";
import classNames from "classnames";
import MacroTable from "./MacroTable";

import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

const styles = theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap"
  },
  margin: {
    margin: theme.spacing.unit
  },
  textField: {
    flexBasis: 200
  },
  code: {
    width: "-webkit-fill-available"
  },
  button: {
    float: "right"
  }
});

class MacroForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      macro: props.macro,
      name: props.macro.name,
      id: props.macro.id,
      actions: props.macro.actions
    };

    this.updateMacro = this.updateMacro.bind(this);
    this.updateActions = this.updateActions.bind(this);
  }

  updateMacro() {
    const aux = this.state.macro;
    aux.name = this.state.name;
    aux.actions = this.state.actions;
    aux.macro = this.state.actions
      .map(item => {
        return item.keycode;
      })
      .join(" ");
    this.setState({ macro: aux });
    this.props.accept(aux);
  }

  updateActions(actions) {
    this.setState({
      actions: actions
    });
  }

  render() {
    const { classes, close, keymapDB } = this.props;
    return (
      <React.Fragment>
        <div>
          <TextField
            id="name"
            className={classNames(classes.margin, classes.textField)}
            variant="outlined"
            label="Name"
            value={this.state.name}
            onChange={e => {
              this.setState({ name: e.target.value });
            }}
          />
          <MacroTable
            macro={this.state.macro}
            updateActions={this.updateActions}
            keymapDB={keymapDB}
          />
          <div>
            <Button
              variant="outlined"
              color="secondary"
              className={classes.margin}
              onClick={close}
            >
              {"Cancel"}
            </Button>
            <Button
              variant="contained"
              color="primary"
              className={classNames(classes.margin, classes.button)}
              onClick={this.updateMacro}
            >
              {"Accept"}
            </Button>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
export default withStyles(styles)(MacroForm);
