import React, { Component } from "react";
import classNames from "classnames";

import { withStyles } from "@material-ui/core/styles";
import {
  Input,
  InputLabel,
  InputAdornment,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  MenuItem,
  IconButton,
  ListItemSecondaryAction
} from "@material-ui/core";
import AddCircle from "@material-ui/icons/AddCircle";
import CloseIcon from "@material-ui/icons/Close";
import RootRef from "@material-ui/core/RootRef";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
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

class MacroTable extends Component {
  constructor(props) {
    super(props);

    this.state = {
      rows: [
        { symbol: "h", action: 8, id: 0 },
        { symbol: "o", action: 8, id: 1 },
        { symbol: "l", action: 8, id: 2 },
        { symbol: "a", action: 8, id: 3 }
      ]
    };
    this.onDragEnd = this.onDragEnd.bind(this);
  }

  onDragEnd(result) {
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    const items = this.reorder(
      this.state.rows,
      result.source.index,
      result.destination.index
    );

    this.setState({
      items
    });
  }
  reorder(list, startIndex, endIndex) {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  }

  render() {
    const { classes } = this.props;
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
    const getItemStyle = (isDragging, draggableStyle) => ({
      // styles we need to apply on draggables
      ...draggableStyle,

      ...(isDragging && {
        background: "rgb(235,235,235)"
      })
    });

    const getListStyle = isDraggingOver => ({
      background: isDraggingOver ? "lightblue" : "lightgrey"
    });
    console.log(selectItems, actions);
    return (
      <React.Fragment>
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
        <DragDropContext onDragEnd={this.onDragEnd}>
          <Droppable droppableId="droppable">
            {(provided, snapshot) => (
              <RootRef rootRef={provided.innerRef}>
                <List style={getListStyle(snapshot.isDraggingOver)}>
                  {this.state.items.map((item, index) => (
                    <Draggable
                      key={item.id}
                      draggableId={item.id}
                      index={index}
                    >
                      {(provided, snapshot) => (
                        <ListItem
                          ContainerComponent="li"
                          ContainerProps={{ ref: provided.innerRef }}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          style={getItemStyle(
                            snapshot.isDragging,
                            provided.draggableProps.style
                          )}
                        >
                          <ListItemIcon>
                            <CloseIcon />
                          </ListItemIcon>
                          <ListItemText
                            primary={item.primary}
                            secondary={item.secondary}
                          />
                          <ListItemSecondaryAction>
                            <IconButton>
                              <CloseIcon />
                            </IconButton>
                          </ListItemSecondaryAction>
                        </ListItem>
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
