import React, { Component } from "react";
import classNames from "classnames";
import MacroTableRow from "./MacroTableRow";

import { withStyles } from "@material-ui/core/styles";
import { InputAdornment, TextField, List, IconButton } from "@material-ui/core";
import GetAppRounded from "@material-ui/icons/GetAppRounded";
import RootRef from "@material-ui/core/RootRef";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
// import ArrowDownward from "@material-ui/icons/ArrowDownward";

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
  list: { maxHeight: "400px", overflow: "auto" }
});

class MacroTable extends Component {
  constructor(props) {
    super(props);

    this.state = {
      addText: "",
      rows: [],
      modifiers: [
        { id: 0, name: "Shift", color: "lightskyblue" },
        { id: 1, name: "Control", color: "lightcoral" },
        { id: 2, name: "Alt", color: "gold" },
        { id: 3, name: "AltGr", color: "lightseagreen" },
        { id: 4, name: "Gui", color: "lightgrey" }
      ]
    };
    this.onDragEnd = this.onDragEnd.bind(this);
    this.onDeleteRow = this.onDeleteRow.bind(this);
    this.onAddText = this.onAddText.bind(this);
    this.addModifier = this.addModifier.bind(this);
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

    this.setState({
      rows
    });
  }
  reorder(list, startIndex, endIndex) {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  }

  onDeleteRow(id) {
    let aux = this.state.rows;
    this.setState({
      rows: aux.filter(x => x.id !== id)
    });
  }

  onAddText() {
    const aux = this.state.addText;
    let newRows = this.state.rows;
    newRows = newRows.concat(
      aux.split("").map((item, index) => {
        return {
          symbol: item,
          action: 8,
          id: index + newRows.length,
          color: "lightgreen"
        };
      })
    );
    this.setState({
      addText: "",
      rows: newRows
    });
  }

  addModifier(rowID, modifierID) {
    const modifier = this.state.modifiers[modifierID];
    let newRows = this.state.rows;
    newRows.splice(rowID + 1, 0, {
      symbol: modifier.name,
      action: 7,
      id: rowID + 1,
      color: modifier.color
    });
    newRows.splice(rowID, 0, {
      symbol: modifier.name,
      action: 6,
      id: rowID,
      color: modifier.color
    });
    newRows = newRows.map((item, index) => {
      let aux = item;
      aux.id = index;
      return aux;
    });
    this.setState({
      rows: newRows
    });
  }

  render() {
    const { classes } = this.props;

    return (
      <React.Fragment>
        {" "}
        <TextField
          id="AddTextToMacro"
          label="Load text into Macro editor"
          className={classNames(
            classes.margin,
            classes.textField,
            classes.code,
            classes.textField
          )}
          value={this.state.addText}
          onChange={e => {
            this.setState({ addText: e.target.value });
          }}
          margin="normal"
          variant="outlined"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={this.onAddText}>
                  <GetAppRounded />
                </IconButton>
              </InputAdornment>
            )
          }}
        />
        <DragDropContext onDragEnd={this.onDragEnd}>
          <Droppable droppableId="droppable">
            {provided => (
              <RootRef rootRef={provided.innerRef}>
                <List className={classes.list} disablePadding dense>
                  {this.state.rows.map((item, index) => (
                    <Draggable
                      key={item.id}
                      draggableId={String(item.id)}
                      index={index}
                    >
                      {(provided, snapshot) => (
                        <MacroTableRow
                          provided={provided}
                          snapshot={snapshot}
                          item={item}
                          modifiers={this.state.modifiers}
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
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(MacroTable);
