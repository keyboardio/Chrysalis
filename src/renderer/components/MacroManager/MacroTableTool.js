import React, { Component } from "react";

import { withStyles } from "@material-ui/core/styles";
import {
  MenuItem,
  TextField,
  FormControl,
  ListItem,
  IconButton,
  ListItemText
} from "@material-ui/core";
import PublishRounded from "@material-ui/icons/PublishRounded";

const styles = theme => ({
  root: {
    placeContent: "space-between",
    display: "flex",
    flexWrap: "wrap",
    margin: theme.spacing.unit,
    backgroundColor: "#fff"
  },
  margin: {
    margin: theme.spacing.unit
  },
  textField: {
    minWidth: "200px"
  },
  menuitem: {
    display: "flex"
  },
  iconbutton: {
    width: "61px",
    height: "61px"
  }
});

class MacroTableTool extends Component {
  constructor(props) {
    super(props);

    this.state = {
      keyCode: 4,
      action: 8
    };
    this.keymapDB = props.keymapDB;
  }

  render() {
    const { classes, actionTypes, onAddSymbol } = this.props;
    const keys = (
      <FormControl>
        <TextField
          id="Select Key"
          select
          label="Select Key"
          value={this.state.keyCode}
          margin="none"
          variant="outlined"
          rows={10}
          className={classes.textField}
          onChange={e => {
            this.setState({
              keyCode: e.target.value
            });
          }}
        >
          {this.keymapDB.allCodes.slice(0, 9).map(group => {
            console.log(group);
            return group.keys.map((item, id) => (
              <MenuItem
                value={item.code}
                key={`item-${id}`}
                margin="none"
                padding="none"
              >
                <div className={classes.menuitem}>
                  <ListItemText
                    inset
                    primary={item.labels.primary}
                    secondary={group.groupName}
                    margin="none"
                    padding="none"
                  />
                </div>
              </MenuItem>
            ));
          })}
        </TextField>
      </FormControl>
    );
    const actions = (
      <FormControl>
        <TextField
          id="Select Action"
          select
          label="Select Action"
          value={this.state.action}
          margin="none"
          variant="outlined"
          size="small"
          className={classes.textField}
          onChange={e => {
            this.setState({
              action: e.target.value
            });
          }}
        >
          {actionTypes.map((item, id) => {
            if (id > 5 && id < 9) {
              return (
                <MenuItem value={id} key={`item-${id}`}>
                  <div className={classes.menuitem}>
                    {item.smallIcon}
                    <ListItemText
                      inset
                      primary={item.name}
                      secondary={"Action"}
                    />
                  </div>
                </MenuItem>
              );
            }
          })}
        </TextField>
      </FormControl>
    );

    const button = (
      <IconButton
        onClick={() => {
          onAddSymbol(this.state.keyCode, this.state.action);
        }}
        className={classes.iconbutton}
      >
        <PublishRounded />
      </IconButton>
    );

    return (
      <div className={classes.root}>
        {keys}
        {actions}
        {button}
      </div>
    );
  }
}

export default withStyles(styles)(MacroTableTool);
