import React, { Component } from "react";

import { withStyles } from "@material-ui/core/styles";
import {
  MenuItem,
  TextField,
  FormControl,
  IconButton,
  ListItemText,
  InputAdornment
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
      action: 8,
      delay: 100
    };
    this.keymapDB = props.keymapDB;
  }

  render() {
    const { classes, actionTypes, onAddSymbol, onAddDelay } = this.props;
    const { keyCode, action, delay } = this.state;
    const keys = (
      <FormControl>
        <TextField
          key={action + keyCode}
          id="Select Key"
          select
          label="Select Key"
          value={keyCode}
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
          key={action + keyCode}
          id="Select Action"
          select
          label="Select Action"
          value={action}
          margin="none"
          variant="outlined"
          size="small"
          className={classes.textField}
          onChange={e => {
            this.setState({
              action: e.target.value
            });
            this.forceUpdate();
          }}
        >
          {actionTypes.map((item, id) => {
            if ((id > 5 && id < 9) || (id < 3 && id > 1)) {
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

    const delayFill = (
      <TextField
        id="outlined-name"
        label="Delay"
        type="number"
        className={classes.textField}
        value={delay}
        onChange={e => {
          if (e.target.value > 65536) {
            this.setState({ delay: 65536 });
          } else {
            this.setState({ delay: e.target.value });
          }
        }}
        InputProps={{
          startAdornment: <InputAdornment position="start">ms</InputAdornment>
        }}
        margin="none"
        variant="outlined"
      />
    );

    const button = (
      <IconButton
        onClick={() => {
          switch (action) {
            case 1:
            case 2:
              onAddDelay(delay, action);
              break;
            case 6:
            case 7:
            case 8:
              onAddSymbol(keyCode, action);
              break;
            default:
              break;
          }
        }}
        className={classes.iconbutton}
      >
        <PublishRounded />
      </IconButton>
    );

    return (
      <div className={classes.root}>
        {actions}
        {action <= 2 ? delayFill : keys}
        {button}
      </div>
    );
  }
}

export default withStyles(styles)(MacroTableTool);
