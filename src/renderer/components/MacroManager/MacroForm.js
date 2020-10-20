import React, { Component } from "react";
import classNames from "classnames";

import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import FormControl from "@material-ui/core/FormControl";
import Paper from "@material-ui/core/Paper";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import ListItemText from "@material-ui/core/ListItemText";
import AddCircle from "@material-ui/icons/AddCircle";
import CloseIcon from "@material-ui/icons/Close";
// import ArrowDownward from "@material-ui/icons/ArrowDownward";
// https://codesandbox.io/s/4qp6vjp319?file=/index.js

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
  },
  buttonAdd: {
    marginLeft: "25%"
  },
  table: {
    minWidth: 700
  },
  select: {
    minWidth: "100px"
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

  handleDelete() {}

  render() {
    const { classes, close, addMacro, macros, maxMacros } = this.props;
    const rows = [
      { symbol: "h", action: 8, id: 0 },
      { symbol: "o", action: 8, id: 1 },
      { symbol: "l", action: 8, id: 2 },
      { symbol: "a", action: 8, id: 3 }
    ];
    const modifiers = [
      { id: 0, name: "Shift" },
      { id: 1, name: "Control" },
      { id: 2, name: "Alt" },
      { id: 3, name: "AltGr" },
      { id: 4, name: "Gui" }
    ];
    const selectItems = modifiers.map(item => (
      <MenuItem value={item.id} key={`item-${item.id}`}>
        <div style={{ display: "flex" }}>
          <ListItemText inset primary={item.name} />
        </div>
      </MenuItem>
    ));
    const actions = [
      { enum: "MACRO_ACTION_END", id: 0, name: "End macro" },
      { enum: "MACRO_ACTION_STEP_INTERVAL", id: 1, name: "Step Interval" },
      { enum: "MACRO_ACTION_STEP_WAIT", id: 2, name: "Step Wait" },
      { enum: "MACRO_ACTION_STEP_KEYDOWN", id: 3, name: "Step Keydown" },
      { enum: "MACRO_ACTION_STEP_KEYUP", id: 4, name: "Step KeyUp" },
      { enum: "MACRO_ACTION_STEP_TAP", id: 5, name: "Step Tap" },
      {
        enum: "MACRO_ACTION_STEP_KEYCODEDOWN",
        id: 6,
        name: "Step KeyCode Down"
      },
      { enum: "MACRO_ACTION_STEP_KEYCODEUP", id: 7, name: "Step KeyCode Up" },
      { enum: "MACRO_ACTION_STEP_TAPCODE", id: 8, name: "Step Tap Code" },
      {
        enum: "MACRO_ACTION_STEP_EXPLICIT_REPORT",
        id: 9,
        name: "Explicit Report"
      },
      {
        enum: "MACRO_ACTION_STEP_IMPLICIT_REPORT",
        id: 10,
        name: "Implicit Report"
      },
      { enum: "MACRO_ACTION_STEP_SEND_REPORT", id: 11, name: "Send Report" },
      {
        enum: "MACRO_ACTION_STEP_TAP_SEQUENCE",
        id: 12,
        name: "Step Tap Sequence"
      },
      {
        enum: "MACRO_ACTION_STEP_TAP_CODE_SEQUENCE",
        id: 13,
        name: "Step Code Sequence"
      }
    ];
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
          <div>
            <InputLabel
              className={classNames(
                classes.margin,
                classes.textField,
                classes.code
              )}
            >
              Add text to Macro
            </InputLabel>
            <Input
              id="AddToMacro"
              className={classNames(
                classes.margin,
                classes.textField,
                classes.code
              )}
              multiline
              endAdornment={
                <InputAdornment position="end">
                  <IconButton>
                    <AddCircle />
                  </IconButton>
                </InputAdornment>
              }
            />
          </div>
          <Paper className={classes.root}>
            <Table className={classes.table}>
              <TableHead>
                <TableRow>
                  <TableCell>Symbol</TableCell>
                  <TableCell align="right">Action Type</TableCell>
                  <TableCell align="right" />
                  <TableCell align="right" />
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map(row => (
                  <TableRow key={row.id}>
                    <TableCell component="th" scope="row">
                      {row.symbol}
                    </TableCell>
                    <TableCell align="right">{row.action}</TableCell>
                    <TableCell align="right">
                      <Select
                        className={classNames(classes.select)}
                        placeholder="Add modifier"
                      >
                        {selectItems}
                      </Select>
                      <Button
                        variant="outlined"
                        color="primary"
                        className={classes.margin}
                        onClick={close}
                      >
                        {"Add"}
                      </Button>
                    </TableCell>
                    <TableCell align="right">
                      <IconButton color="secondary" variant="outlined">
                        <CloseIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Paper>
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
              className={classNames(classes.margin, classes.buttonAdd)}
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
        </div>
      </React.Fragment>
    );
  }
}
export default withStyles(styles)(MacroForm);
