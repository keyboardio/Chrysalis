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
import { AddRounded, DeleteForever, FileCopy } from "@material-ui/icons";
import i18n from "../../i18n";
import Tooltip from "@material-ui/core/Tooltip";
// import ArrowDownward from "@material-ui/icons/ArrowDownward";

const styles = theme => ({
  list: {
    display: "block",
    height: "515px",
    overflow: "auto",
    backgroundColor: theme.palette.background.default
  },
  selected: {
    backgroundColor: theme.palette.selectItem.main,
    color: theme.palette.primary.main
  },
  notSelected: {
    backgroundColor: theme.palette.selectItem.notSelected,
    cursor: "pointer",
    "&:hover": {
      background: theme.palette.selectItem.hover
    }
  },
  extrapadding: {
    paddingLeft: "10px",
    paddingTop: "10px",
    paddingBottom: "10px"
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
    const highlight = macros.map((item, index) => {
      if (index === selected) {
        return classes.selected;
      } else {
        return classes.notSelected;
      }
    });
    return (
      <React.Fragment>
        <List className={classNames(classes.list)}>
          {macros.length !== 0 ? (
            macros.map((item, index) => {
              if (item !== undefined) {
                return (
                  <div key={index}>
                    <ListItem
                      className={highlight[index]}
                      onClick={() => {
                        this.onSelectMacro(index);
                      }}
                    >
                      <Avatar>{index}</Avatar>
                      <ListItemText
                        primary={item.name}
                        secondary={item.macro}
                        className={classes.extrapadding}
                      />
                      <Tooltip title={i18n.editor.macros.copy}>
                        <IconButton
                          onClick={() => {
                            this.props.duplicateMacro(index);
                          }}
                        >
                          <FileCopy fontSize="small" />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title={i18n.editor.macros.delete}>
                        <IconButton
                          onClick={() => {
                            this.props.deleteMacro(index);
                          }}
                        >
                          <DeleteForever fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    </ListItem>
                    <Divider variant="fullWidth" />
                  </div>
                );
              } else {
                return;
              }
            })
          ) : (
            <React.Fragment />
          )}
          <ListItem>
            {/* <Avatar>N</Avatar>
            <ListItemText primary="Add new Macro" /> */}
            <Tooltip title={i18n.editor.macros.add}>
              <IconButton onClick={this.props.addMacro}>
                <AddRounded />
              </IconButton>
            </Tooltip>
          </ListItem>
        </List>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(MacroSelector);
