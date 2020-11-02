import React, { Component } from "react";

import { withStyles } from "@material-ui/core/styles";
import {
  MenuItem,
  TextField,
  FormControl,
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
    minWidth: "200px",
    padding: "0px"
  },
  menuitem: {
    display: "flex"
  },
  iconbutton: {
    width: "61px",
    height: "61px"
  },
  avatar: {
    fontSize: "18px",
    color: "#999999"
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
            return group.keys.map((item, id) => (
              <MenuItem value={item.code} key={`item-${id}`}>
                <div className={classes.menuitem}>
                  <span className={classes.avatar}>
                    {group.groupName.substring(0, 3)}
                  </span>
                  <ListItemText inset primary={item.labels.primary} />
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
                    <ListItemText inset primary={item.name} />
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
