import React, { Component } from "react";
import classNames from "classnames";

import { withStyles } from "@material-ui/core/styles";
import {
  Avatar,
  List,
  ListItem,
  ListItemText,
  Divider,
  IconButton
} from "@material-ui/core";
import { AddRounded, DeleteForeverRounded } from "@material-ui/icons";
// import ArrowDownward from "@material-ui/icons/ArrowDownward";

const styles = () => ({
  list: {
    display: "block",
    maxHeight: "676px",
    overflow: "auto",
    backgroundColor: "#eee"
  },
  selected: {
    backgroundColor: "#f9f9f9"
  },
  notSelected: {
    backgroundColor: "#eee"
  }
});

class MacroSelector extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  onSelectMacro(id) {
    this.props.updateSelected(id);
  }

  render() {
    const { classes, macros, selected } = this.props;
    const highlight = macros.map(item => {
      if (item.id === selected) {
        return classes.selected;
      } else {
        return classes.notSelected;
      }
    });
    return (
      <React.Fragment>
        <List className={classNames(classes.list)} disablePadding dense>
          {macros.map((item, index) => (
            <div key={index}>
              <ListItem className={highlight[index]}>
                <Avatar
                  onClick={() => {
                    this.onSelectMacro(item.id);
                  }}
                >
                  {item.id}
                </Avatar>
                <ListItemText
                  primary={item.name}
                  secondary={item.macro}
                  onClick={() => {
                    this.onSelectMacro(item.id);
                  }}
                />
                <IconButton
                  onClick={() => {
                    this.props.deleteMacro(item.id);
                  }}
                >
                  <DeleteForeverRounded />
                </IconButton>
              </ListItem>
              <Divider variant="fullWidth" />
            </div>
          ))}
          <ListItem>
            <Avatar>N</Avatar>
            <ListItemText primary="Add new Macro" />
            <IconButton onClick={this.props.addMacro}>
              <AddRounded />
            </IconButton>
          </ListItem>
        </List>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(MacroSelector);
