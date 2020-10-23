import React, { Component } from "react";

import { withStyles } from "@material-ui/core/styles";
import {
  MenuItem,
  TextField,
  FormControl,
  Chip,
  ListItem,
  ListItemText,
  ListItemIcon,
  IconButton,
  ListItemSecondaryAction
} from "@material-ui/core";
import {
  SwapVert,
  SpaceBar,
  KeyboardArrowUp,
  KeyboardArrowDown,
  KeyboardReturn
} from "@material-ui/icons";
import CloseIcon from "@material-ui/icons/Close";

const styles = theme => ({
  chip: {
    borderRadius: 4,
    minWidth: "150px",
    marginLeft: theme.spacing.unit * 2,
    marginRight: theme.spacing.unit * 2,
    fontSize: "larger"
  },
  listitem: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    paddingRight: "80px"
  },
  select: {
    inlineSize: "-webkit-fill-available",
    maxWidth: "160px",
    marginLeft: "auto"
  }
});

class MacroTableRow extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  getItemStyle = (isDragging, draggableStyle) => ({
    // styles we need to apply on draggables
    ...draggableStyle,

    ...(isDragging && {
      background: "rgb(235,235,235)"
    })
  });

  render() {
    const {
      classes,
      provided,
      snapshot,
      item,
      modifiers,
      addModifier
    } = this.props;
    const actions = [
      {
        enum: "MACRO_ACTION_END",
        id: 0,
        name: "End macro",
        icon: <React.Fragment />
      },
      {
        enum: "MACRO_ACTION_STEP_INTERVAL",
        id: 1,
        name: "Step Interval",
        icon: <React.Fragment />
      },
      {
        enum: "MACRO_ACTION_STEP_WAIT",
        id: 2,
        name: "Step Wait",
        icon: <React.Fragment />
      },
      {
        enum: "MACRO_ACTION_STEP_KEYDOWN",
        id: 3,
        name: "Step Keydown",
        icon: <React.Fragment />
      },
      {
        enum: "MACRO_ACTION_STEP_KEYUP",
        id: 4,
        name: "Step KeyUp",
        icon: <React.Fragment />
      },
      {
        enum: "MACRO_ACTION_STEP_TAP",
        id: 5,
        name: "Step Tap",
        icon: <React.Fragment />
      },
      {
        enum: "MACRO_ACTION_STEP_KEYCODEDOWN",
        id: 6,
        name: "Step KeyCode Down",
        icon: <KeyboardArrowDown />
      },
      {
        enum: "MACRO_ACTION_STEP_KEYCODEUP",
        id: 7,
        name: "Step KeyCode Up",
        icon: <KeyboardArrowUp />
      },
      {
        enum: "MACRO_ACTION_STEP_TAPCODE",
        id: 8,
        name: "Step Tap Code",
        icon: <SwapVert />
      },
      {
        enum: "MACRO_ACTION_STEP_EXPLICIT_REPORT",
        id: 9,
        name: "Explicit Report",
        icon: <SpaceBar />
      },
      {
        enum: "MACRO_ACTION_STEP_IMPLICIT_REPORT",
        id: 10,
        name: "Implicit Report",
        icon: <KeyboardReturn />
      },
      { enum: "MACRO_ACTION_STEP_SEND_REPORT", id: 11, name: "Send Report" },
      {
        enum: "MACRO_ACTION_STEP_TAP_SEQUENCE",
        id: 12,
        name: "Step Tap Sequence",
        icon: <React.Fragment />
      },
      {
        enum: "MACRO_ACTION_STEP_TAP_CODE_SEQUENCE",
        id: 13,
        name: "Step Code Sequence",
        icon: <React.Fragment />
      }
    ];
    return (
      <div
        ref={provided.innerRef}
        {...provided.draggableProps}
        {...provided.dragHandleProps}
        style={this.getItemStyle(
          snapshot.isDragging,
          provided.draggableProps.style
        )}
      >
        <ListItem className={classes.listitem}>
          <ListItemIcon fontSize="large">
            {actions[item.action].icon}
          </ListItemIcon>
          <Chip
            label={item.symbol}
            variant="outlined"
            className={classes.chip}
            style={{
              backgroundColor: item.color,
              borderColor: item.color
            }}
          />
          <FormControl className={classes.select}>
            <TextField
              id="insert-modifiers"
              select
              label="Insert Modifiers"
              value=""
              margin="none"
              variant="outlined"
              onChange={e => {
                console.log(item.id, e.target.value);
                addModifier(item.id, e.target.value);
              }}
            >
              {modifiers.map(item => (
                <MenuItem value={item.id} key={`item-${item.id}`}>
                  <ListItemText inset primary={item.name} />
                </MenuItem>
              ))}
            </TextField>
          </FormControl>
          <ListItemSecondaryAction>
            <IconButton
              onClick={() => {
                this.props.onDeleteRow(item.id);
              }}
            >
              <CloseIcon />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
      </div>
    );
  }
}

export default withStyles(styles)(MacroTableRow);
