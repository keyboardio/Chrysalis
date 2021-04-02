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
import i18n from "../../i18n";

const styles = theme => ({
  root: {
    placeContent: "space-between",
    display: "flex",
    flexWrap: "wrap"
    //margin: theme.spacing() //,
    // backgroundColor: "#fff"
  },
  margin: {
    margin: theme.spacing()
  },
  textField: {
    minWidth: "200px",
    //height: "61px",
    padding: "0px",
    margin: "none"
  },
  menuitem: {
    display: "flex"
  },
  iconbutton: {
    width: "58px",
    height: "58px"
  },
  avatar: {
    paddingTop: "4px",
    paddingBottom: "4px"
  }
});

class MacroTabKeys extends Component {
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
          label={i18n.editor.macros.selectKey}
          value={keyCode}
          //margin="none"
          //variant="outlined"
          rows={10}
          size="small"
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
                    {/* TODO lets see if we can make this a little nicer? */}
                    {group.groupName}
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
          label={i18n.editor.macros.selectAction}
          value={action}
          //margin="none"
          // variant="outlined"
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
            if ((id > 1 && id < 3) || (id > 5 && id < 9)) {
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
        label={i18n.editor.macros.Delay}
        type="number"
        className={classes.textField}
        value={delay}
        size="small"
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
        //margin="none"
        //variant="outlined"
      />
    );

    const button = (
      <IconButton
        onClick={() => {
          switch (action) {
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

export default withStyles(styles)(MacroTabKeys);
