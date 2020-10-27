import React, { Component } from "react";

import { withStyles } from "@material-ui/core/styles";
import {
  MenuItem,
  TextField,
  FormControl,
  Chip,
  Divider,
  ListItem,
  ListItemText,
  ListItemIcon,
  IconButton,
  ListItemSecondaryAction
} from "@material-ui/core";
import { Close } from "@material-ui/icons";

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
  },
  compact: {
    margin: "0px",
    padding: "0px"
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
      addModifier,
      actionTypes
    } = this.props;
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
          <ListItemIcon>{actionTypes[item.action].icon}</ListItemIcon>
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
              {modifiers.map((item, id) => (
                <MenuItem
                  value={id}
                  key={`item-${id}`}
                  className={classes.compact}
                >
                  <ListItemText
                    inset
                    dense="true"
                    primary={item.name}
                    className={classes.compact}
                  />
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
              <Close />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
        <Divider variant="middle" />
      </div>
    );
  }
}

export default withStyles(styles)(MacroTableRow);
