import React, { Component } from "react";
import classNames from "classnames";
import MacroTableRow from "./MacroTableRow";
import MacroTableTool from "./MacroTableTool";

import { withStyles } from "@material-ui/core/styles";
import { TextField, List, IconButton } from "@material-ui/core";
import RootRef from "@material-ui/core/RootRef";
import {
  SwapVert,
  KeyboardArrowUp,
  KeyboardArrowDown,
  PublishRounded
} from "@material-ui/icons";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
// import ArrowDownward from "@material-ui/icons/ArrowDownward";

const styles = theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap"
  },
  margin: {
    margin: theme.spacing.unit,
    marginTop: theme.spacing.unit * 2,
    marginBottom: theme.spacing.unit * 2,
    paddingTop: theme.spacing.unit,
    paddingBottom: theme.spacing.unit
  },
  textField: {
    flexBasis: "444px",
    margin: "0px",
    marginRight: theme.spacing.unit * 4
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
  list: {
    maxHeight: "400px",
    minHeight: "400px",
    overflow: "auto"
  },
  border: {
    border: "solid 1px #bbb",
    borderRadius: "4px"
  },
  iconbutton: {
    width: "56px",
    height: "56px"
  },
  flex: {
    display: "flex",
    position: "relative",
    placeContent: "space-between",
    margin: theme.spacing.unit
  },
  whitebg: {
    backgroundColor: "#fff"
  }
});

class MacroTable extends Component {
  constructor(props) {
    super(props);

    this.state = {
      addText: "",
      rows: [],
      macro: props.macro.macro
    };
    this.keymapDB = props.keymapDB;
    this.modifiers = [
      { name: "LEFT SHIFT", keyCode: 225, color: "lightskyblue" },
      { name: "RIGHT SHIFT", keyCode: 229, color: "lightskyblue" },
      { name: "LEFT CTRL", keyCode: 224, color: "lightcoral" },
      { name: "RIGHT CTRL", keyCode: 228, color: "lightcoral" },
      { name: "LEFT ALT", keyCode: 226, color: "gold" },
      { name: "RIGHT ALT", keyCode: 230, color: "lightseagreen" },
      { name: "LEFT GUI", keyCode: 227, color: "lightgreen" },
      { name: "RIGHT GUI", keyCode: 231, color: "lightgreen" }
    ];
    this.actionTypes = [
      {
        enum: "MACRO_ACTION_END",
        name: "End macro",
        icon: <React.Fragment />,
        smallIcon: <React.Fragment />
      },
      {
        enum: "MACRO_ACTION_STEP_INTERVAL",
        name: "Step Interval",
        icon: <React.Fragment />,
        smallIcon: <React.Fragment />
      },
      {
        enum: "MACRO_ACTION_STEP_WAIT",
        name: "Step Wait",
        icon: <React.Fragment />,
        smallIcon: <React.Fragment />
      },
      {
        enum: "MACRO_ACTION_STEP_KEYDOWN",
        name: "Step Keydown",
        icon: <React.Fragment />,
        smallIcon: <React.Fragment />
      },
      {
        enum: "MACRO_ACTION_STEP_KEYUP",
        name: "Step KeyUp",
        icon: <React.Fragment />,
        smallIcon: <React.Fragment />
      },
      {
        enum: "MACRO_ACTION_STEP_TAP",
        name: "Step Tap",
        icon: <React.Fragment />,
        smallIcon: <React.Fragment />
      },
      {
        enum: "MACRO_ACTION_STEP_KEYCODEDOWN",
        name: "Key Press",
        icon: <KeyboardArrowDown fontSize="large" />,
        smallIcon: <KeyboardArrowDown />
      },
      {
        enum: "MACRO_ACTION_STEP_KEYCODEUP",
        name: "Key Release",
        icon: <KeyboardArrowUp fontSize="large" />,
        smallIcon: <KeyboardArrowUp />
      },
      {
        enum: "MACRO_ACTION_STEP_TAPCODE",
        name: "Key Press & Release",
        icon: <SwapVert fontSize="large" />,
        smallIcon: <SwapVert />
      },
      {
        enum: "MACRO_ACTION_STEP_EXPLICIT_REPORT",
        name: "Explicit Report",
        icon: <React.Fragment />,
        smallIcon: <React.Fragment />
      },
      {
        enum: "MACRO_ACTION_STEP_IMPLICIT_REPORT",
        name: "Implicit Report",
        icon: <React.Fragment />,
        smallIcon: <React.Fragment />
      },
      { enum: "MACRO_ACTION_STEP_SEND_REPORT", id: 11, name: "Send Report" },
      {
        enum: "MACRO_ACTION_STEP_TAP_SEQUENCE",
        name: "Step Tap Sequence",
        icon: <React.Fragment />,
        smallIcon: <React.Fragment />
      },
      {
        enum: "MACRO_ACTION_STEP_TAP_CODE_SEQUENCE",
        name: "Step Code Sequence",
        icon: <React.Fragment />,
        smallIcon: <React.Fragment />
      }
    ];

    this.onDragEnd = this.onDragEnd.bind(this);
    this.onDeleteRow = this.onDeleteRow.bind(this);
    this.onAddText = this.onAddText.bind(this);
    this.addModifier = this.addModifier.bind(this);
    this.updateRows = this.updateRows.bind(this);
    this.createConversion = this.createConversion.bind(this);
    this.assignColor = this.assignColor.bind(this);
    this.onAddSymbol = this.onAddSymbol.bind(this);
  }

  componentDidMount() {
    this.updateRows(this.createConversion(this.props.macro.actions));
  }

  createConversion(actions) {
    let converted = actions.map((action, i) => {
      return {
        symbol: this.keymapDB.parse(action.keyCode).label,
        keyCode: action.keyCode,
        action: action.type,
        id: i,
        color: this.assignColor(action.keyCode)
      };
    });
    return converted;
  }

  revertConversion(actions) {
    let converted = actions.map(({ keyCode, action, id }) => {
      return {
        keyCode: keyCode,
        type: action,
        id: id
      };
    });
    return converted;
  }

  assignColor(keyCode) {
    let color = this.modifiers.filter(x => x.keyCode === keyCode);
    if (color === undefined || color.length == 0) {
      color = "#eee";
    } else {
      color = color[0].color;
    }
    return color;
  }

  assignSymbol(macro) {
    // TODO: redo the function as assingColor to replace keycodes that are not represented (space, enter, tab, etc.. per icons or altcodes to be shown in their stead)
    let action = [];
    for (const char of macro.split("")) {
      let keyCode = this.keymapDB.reverse(char.toUpperCase());
      if (char === " ") {
        keyCode = 44;
      }
      action.push({ keyCode: keyCode, type: 8 });
    }
    return action;
  }

  updateRows(rows) {
    let texted = rows.map(k => this.keymapDB.parse(k.keyCode).label).join("|");
    let newRows = rows.map((item, index) => {
      let aux = item;
      aux.id = index;
      return aux;
    });
    this.setState({
      rows: newRows,
      macro: texted
    });

    this.props.updateActions(this.revertConversion(rows), texted);
  }

  reorder(list, startIndex, endIndex) {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  }

  onDragEnd(result) {
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    const rows = this.reorder(
      this.state.rows,
      result.source.index,
      result.destination.index
    );

    this.updateRows(rows);
  }

  onDeleteRow(id) {
    let aux = this.state.rows.filter(x => x.id !== id);
    this.updateRows(aux);
  }

  onAddText() {
    const aux = this.state.addText;
    let newRows = this.state.rows;
    newRows = newRows.concat(
      aux.split("").map((symbol, index) => {
        let keyCode = this.keymapDB.reverse(symbol.toUpperCase());
        return {
          symbol,
          keyCode,
          action: 8,
          id: index + newRows.length,
          color: this.assignColor(keyCode)
        };
      })
    );
    this.setState({
      addText: ""
    });
    this.updateRows(newRows);
  }

  onAddSymbol(keyCode, action) {
    let newRows = this.state.rows;
    let symbol = this.keymapDB.parse(keyCode).label;
    newRows.push({
      symbol,
      keyCode,
      action,
      id: newRows.length,
      color: this.assignColor(keyCode)
    });

    this.updateRows(newRows);
  }

  addModifier(rowID, modifierID) {
    const { name, keyCode, color } = this.modifiers[modifierID];
    let newRows = this.state.rows;
    newRows.splice(rowID + 1, 0, {
      symbol: name,
      keyCode,
      action: 7,
      id: rowID + 1,
      color
    });
    newRows.splice(rowID, 0, {
      symbol: name,
      keyCode,
      action: 6,
      id: rowID,
      color
    });
    this.updateRows(newRows);
  }

  render() {
    const { classes } = this.props;

    return (
      <React.Fragment>
        <DragDropContext onDragEnd={this.onDragEnd}>
          <Droppable droppableId="droppable">
            {provided => (
              <RootRef rootRef={provided.innerRef}>
                <List
                  className={classNames(
                    classes.list,
                    classes.margin,
                    classes.border,
                    classes.whitebg
                  )}
                  disablePadding
                  dense
                >
                  {this.state.rows.map((item, index) => (
                    <Draggable
                      key={index}
                      draggableId={String(index)}
                      index={index}
                    >
                      {(provided, snapshot) => (
                        <MacroTableRow
                          provided={provided}
                          snapshot={snapshot}
                          item={item}
                          modifiers={this.modifiers}
                          actionTypes={this.actionTypes}
                          onDeleteRow={this.onDeleteRow}
                          addModifier={this.addModifier}
                        />
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </List>
              </RootRef>
            )}
          </Droppable>
        </DragDropContext>
        <div
          className={classNames(
            classes.margin,
            classes.border,
            classes.whitebg
          )}
        >
          <MacroTableTool
            actionTypes={this.actionTypes}
            keymapDB={this.keymapDB}
            onAddSymbol={this.onAddSymbol}
          />
        </div>
        <div
          className={classNames(
            classes.margin,
            classes.border,
            classes.whitebg
          )}
        >
          <div className={classes.flex}>
            <TextField
              id="AddTextToMacro"
              label="Type text into Macro editor"
              className={classNames(classes.textField, classes.code)}
              value={this.state.addText}
              onChange={e => {
                this.setState({ addText: e.target.value });
              }}
              margin="normal"
              variant="outlined"
            />
            <IconButton
              onClick={this.onAddText}
              className={classNames(classes.iconbutton)}
            >
              <PublishRounded />
            </IconButton>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(MacroTable);
