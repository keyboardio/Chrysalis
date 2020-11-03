import React, { Component } from "react";
import classNames from "classnames";
import MacroTableRow from "./MacroTableRow";
import MacroToolTab from "./MacroToolTab";

import { withStyles } from "@material-ui/core/styles";
import { List } from "@material-ui/core";
import RootRef from "@material-ui/core/RootRef";
import {
  UnfoldLessRounded,
  KeyboardArrowUp,
  KeyboardArrowDown,
  TimerRounded
} from "@material-ui/icons";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

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
    maxHeight: "300px",
    minHeight: "300px",
    overflow: "auto"
  },
  border: {
    border: "solid 1px #bbbbbb",
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
    backgroundColor: "#ffffff"
  }
});

class MacroTable extends Component {
  constructor(props) {
    super(props);

    this.state = {
      addText: "",
      rows: [],
      macro: props.macro === undefined ? "" : props.macro.macro
    };
    this.keymapDB = props.keymapDB;
    this.modifiers = [
      { name: "LEFT SHIFT", keyCode: 225, color: "#e1f3f7" },
      { name: "RIGHT SHIFT", keyCode: 229, color: "#e1f3f7" },
      { name: "LEFT CTRL", keyCode: 224, color: "#f5e4e4" },
      { name: "RIGHT CTRL", keyCode: 228, color: "#f5e4e4" },
      { name: "LEFT ALT", keyCode: 226, color: "#faf8e1" },
      { name: "RIGHT ALT", keyCode: 230, color: "#f2e7f5" },
      { name: "LEFT GUI", keyCode: 227, color: "#e6f0e4" },
      { name: "RIGHT GUI", keyCode: 231, color: "#e6f0e4" }
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
        name: "Set Interval",
        icon: <TimerRounded fontSize="large" />,
        smallIcon: <TimerRounded />
      },
      {
        enum: "MACRO_ACTION_STEP_WAIT",
        name: "Delay",
        icon: <TimerRounded fontSize="large" />,
        smallIcon: <TimerRounded />
      },
      {
        enum: "MACRO_ACTION_STEP_KEYDOWN",
        name: "Step Keydown",
        icon: <KeyboardArrowDown />,
        smallIcon: <KeyboardArrowDown />
      },
      {
        enum: "MACRO_ACTION_STEP_KEYUP",
        name: "Step KeyUp",
        icon: <KeyboardArrowUp />,
        smallIcon: <KeyboardArrowUp />
      },
      {
        enum: "MACRO_ACTION_STEP_TAP",
        name: "Step Tap",
        icon: <UnfoldLessRounded />,
        smallIcon: <UnfoldLessRounded />
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
        icon: <UnfoldLessRounded fontSize="large" />,
        smallIcon: <UnfoldLessRounded />
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
        name: "Intervaled Special Keys",
        icon: <React.Fragment />,
        smallIcon: <React.Fragment />
      },
      {
        enum: "MACRO_ACTION_STEP_TAP_CODE_SEQUENCE",
        name: "Intervaled Key Press & Release",
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
    this.onAddDelay = this.onAddDelay.bind(this);
    this.onAddText = this.onAddText.bind(this);
    this.onTextChange = this.onTextChange.bind(this);
  }

  componentDidMount() {
    console.log("cdm: ", this.props.macro);
    if (this.props.macro !== undefined) {
      this.updateRows(this.createConversion(this.props.macro.actions));
    }
  }

  createConversion(actions) {
    let converted = actions.map((action, i) => {
      const randID = new Date().getTime() + Math.floor(Math.random() * 1000);
      switch (action.type) {
        case 1:
        case 2:
          return {
            symbol: action.keyCode,
            keyCode: action.keyCode,
            action: action.type,
            id: i,
            color: "#faf0e3",
            uid: randID,
            ucolor: "transparent"
          };
        case 6:
        case 7:
        case 8:
          return {
            symbol: this.keymapDB.parse(action.keyCode).label,
            keyCode: action.keyCode,
            action: action.type,
            id: i,
            color: this.assignColor(action.keyCode),
            uid: randID,
            ucolor: "transparent"
          };
        default:
          break;
      }
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
      color = "#ededed";
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
    console.log("updaterows", rows);
    let texted = rows.map(k => this.keymapDB.parse(k.keyCode).label).join(" ");
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

  addModifier(rowID, modifierID) {
    const { name, keyCode, color } = this.modifiers[modifierID];
    const randID = new Date().getTime() + Math.floor(Math.random() * 1000);
    const randColor =
      "#" +
      Math.floor(Math.abs(Math.sin(randID) * 16777215) % 16777215).toString(16);
    let newRows = this.state.rows;
    newRows.splice(rowID + 1, 0, {
      symbol: name,
      keyCode,
      action: 7,
      id: rowID + 1,
      color,
      uid: randID,
      ucolor: randColor
    });
    newRows.splice(rowID, 0, {
      symbol: name,
      keyCode,
      action: 6,
      id: rowID,
      color,
      uid: randID,
      ucolor: randColor
    });
    this.updateRows(newRows);
  }

  addModToKey(rows, modID, modBit) {
    const { name, keyCode, color } = this.modifiers[modID];
    const randID = new Date().getTime() + Math.floor(Math.random() * 1000);
    const randColor =
      "#" +
      Math.floor(Math.abs(Math.sin(randID) * 16777215) % 16777215).toString(16);
    let actions = rows;
    actions.splice(1, 0, {
      symbol: name,
      keyCode: keyCode,
      action: 7,
      id: 2,
      color: color,
      uid: randID,
      ucolor: randColor
    });
    actions.splice(0, 0, {
      symbol: name,
      keyCode: keyCode,
      action: 6,
      id: 0,
      color: color,
      uid: randID,
      ucolor: randColor
    });
    actions[1].keyCode = actions[1].keyCode ^ modBit;
    actions[1].symbol = this.keymapDB.parse(actions[1].keyCode).label;
    return actions;
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
    let uid = this.state.rows.filter(x => x.id === id)[0].uid;
    let aux = this.state.rows.filter(x => x.uid !== uid);
    this.updateRows(aux);
  }

  onAddText() {
    const aux = this.state.addText;
    let newRows = this.state.rows;
    newRows = newRows.concat(
      aux.split("").flatMap((symbol, index) => {
        let item = symbol.toUpperCase();
        switch (item) {
          case " ":
            item = "SPACE";
            break;
          case "    ":
            item = "TAB";
            break;
          default:
            break;
        }
        const randID = new Date().getTime() + Math.floor(Math.random() * 1000);
        let keyCode = this.keymapDB.reverse(item);
        let actions = [
          {
            symbol: item,
            keyCode,
            action: 8,
            id: index + newRows.length,
            color: this.assignColor(keyCode),
            uid: randID,
            ucolor: "transparent"
          }
        ];
        switch (true) {
          case (keyCode & 256) === 256 && (keyCode & 512) === 512:
            //Control pressed to modify (2)
            actions = this.addModToKey(actions, 5, 256);

            break;
          case (keyCode & 256) === 256:
            //Control pressed to modify (2)
            actions = this.addModToKey(actions, 2, 256);

            break;
          case (keyCode & 512) === 512:
            //Left Alt pressed to modify (4)
            actions = this.addModToKey(actions, 4, 512);

            break;
          case (keyCode & 1024) === 1024:
            //Right alt pressed to modify (5)
            actions = this.addModToKey(actions, 5, 1024);

            break;
          case (keyCode & 2048) === 2048:
            //Shift pressed to modify (0)
            actions = this.addModToKey(actions, 0, 2048);

            break;
          case (keyCode & 4096) === 4096:
            //Gui pressed to modify (6)
            actions = this.addModToKey(actions, 6, 4096);

            break;
          default:
            break;
        }
        return actions;
      })
    );
    this.setState({
      addText: ""
    });
    this.updateRows(newRows);
  }

  onAddSymbol(keyCode, action) {
    const randID = new Date().getTime() + Math.floor(Math.random() * 1000);
    let newRows = this.state.rows;
    let symbol = this.keymapDB.parse(keyCode).label;
    newRows.push({
      symbol,
      keyCode,
      action,
      id: newRows.length,
      color: this.assignColor(keyCode),
      uid: randID,
      ucolor: "transparent"
    });
    this.updateRows(newRows);
  }

  onAddDelay(delay, action) {
    const randID = new Date().getTime() + Math.floor(Math.random() * 1000);
    let newRows = this.state.rows;
    newRows.push({
      symbol: delay,
      keyCode: delay,
      action,
      id: newRows.length,
      color: "#faf0e3",
      uid: randID,
      ucolor: "transparent"
    });
    this.updateRows(newRows);
  }

  onTextChange(event) {
    this.setState({ addText: event.target.value });
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
        <MacroToolTab
          key={this.state.addText}
          actionTypes={this.actionTypes}
          keymapDB={this.keymapDB}
          onAddSymbol={this.onAddSymbol}
          onAddDelay={this.onAddDelay}
          onTextChange={this.onTextChange}
          addText={this.state.addText}
          onAddText={this.onAddText}
        />
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(MacroTable);
