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
import { Close, DragIndicator } from "@material-ui/icons";
import i18n from "../../i18n";

const styles = theme => ({
  chip: {
    borderRadius: 4,
    minWidth: "150px",
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
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
      // HACK This gives us some readability on both light and dark themes
      // , but it actually needs to be refactored to allow theme use
      background: "#9e9e9e"
    })
  });

  shadeColor(color, percent) {
    if (color === "transparent") {
      return color;
    }
    var R = parseInt(color.substring(1, 3), 16);
    var G = parseInt(color.substring(3, 5), 16);
    var B = parseInt(color.substring(5, 7), 16);

    R = parseInt((R * (100 - percent)) / 100);
    G = parseInt((G * (100 - percent)) / 100);
    B = parseInt((B * (100 - percent)) / 100);

    R = Math.round((R * 255) / (R + 5));
    G = Math.round((G * 255) / (G + 5));
    B = Math.round((B * 255) / (B + 5));

    var RR = R.toString(16).length == 1 ? "0" + R.toString(16) : R.toString(16);
    var GG = G.toString(16).length == 1 ? "0" + G.toString(16) : G.toString(16);
    var BB = B.toString(16).length == 1 ? "0" + B.toString(16) : B.toString(16);

    return "#" + RR + GG + BB;
  }

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
          <ListItemIcon>
            <DragIndicator />
          </ListItemIcon>
          <ListItemIcon
            style={{
              borderRadius: "100px"
            }}
          >
            {actionTypes[item.action].icon}
          </ListItemIcon>
          <Chip
            label={item.symbol}
            variant="outlined"
            className={classes.chip}
            style={{
              backgroundColor: item.color,
              borderColor: item.color,
              // HACK allow the text to be visible on darkTheme
              // without completely rewriting the code which assigns the background colors
              color: "#000"
            }}
          />
          <FormControl className={classes.select}>
            <TextField
              id="insert-modifiers"
              select
              label={i18n.editor.macros.insertModifiers}
              value=""
              margin="none"
              variant="outlined"
              size="small"
              onChange={e => {
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
