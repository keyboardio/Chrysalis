import React, { Component } from "react";
import classNames from "classnames";

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
      macro: {},
      name: "",
      id: "",
      code: ""
    };

    this.updateMacro = this.updateMacro.bind(this);
  }

  componentDidMount() {
    const macro = this.props.macros[this.props.selected];
    console.log("macros arrived with length: ", this.props.macros.length);
    this.setState({
      macro: macro,
      name: macro.name,
      id: macro.id,
      code: macro.macro
    });
  }

  updateMacro() {
    const aux = this.state.macro;
    aux.name = this.state.name;
    aux.macro = this.state.code;
    this.setState({ macro: aux });
    this.props.accept(aux, this.props.selected);
  }

  render() {
    const { classes, close, addMacro, macros, maxMacros } = this.props;
    return (
      <React.Fragment>
        <div>
          <TextField
            id="outlined-adornment-name"
            className={classNames(classes.margin, classes.textField)}
            variant="outlined"
            label="Name"
            value={this.state.name}
            onChange={e => {
              this.setState({ name: e.target.value });
            }}
          />
          <TextField
            id="outlined-adornment-Macro"
            className={classNames(
              classes.margin,
              classes.textField,
              classes.code
            )}
            variant="outlined"
            label="Macro"
            multiline
            value={this.state.code}
            onChange={e => {
              this.setState({ code: e.target.value });
            }}
          />
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
            className={classNames(classes.margin)}
            onClick={addMacro}
            disabled={macros.length === maxMacros}
          >
            {"Add Macro"}
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
      </React.Fragment>
    );
  }
}
export default withStyles(styles)(MacroForm);
