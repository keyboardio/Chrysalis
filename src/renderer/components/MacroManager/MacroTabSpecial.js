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
import i18n from "../../i18n";

const styles = theme => ({
  root: {
    placeContent: "space-between",
    display: "flex",
    flexWrap: "wrap"
  },
  textField: {
    minWidth: "200px",
    padding: "0px"
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

class MacroTabSpecial extends Component {
  constructor(props) {
    super(props);

    this.state = {
      keyCode: 17492,
      action: 5
    };
    this.keymapDB = props.keymapDB;
  }

  render() {
    const { classes, actionTypes, onAddSpecial } = this.props;
    const { keyCode, action } = this.state;
    const keys = (
      <FormControl>
        <TextField
          key={action + keyCode}
          id="Select Function"
          select
          label={i18n.editor.macros.selectFunction}
          value={keyCode}
          rows={10}
          size="small"
          className={classes.textField}
          onChange={e => {
            this.setState({
              keyCode: e.target.value
            });
          }}
        >
          {this.keymapDB.allCodes.slice(11, 15).map(group => {
            return group.keys.map((item, id) => {
              if (
                (group.groupName === "Macros" &&
                  parseInt(item.labels.primary) >= this.props.number) ||
                (group.groupName === "Macros" &&
                  parseInt(item.labels.primary) === this.props.selected)
              ) {
                return;
              }
              return (
                <MenuItem value={item.code} key={`item-${id}`}>
                  <div className={classes.menuitem}>
                    <ListItemText
                      primary={item.labels.top + " " + item.labels.primary}
                    />
                  </div>
                </MenuItem>
              );
            });
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
            if (id > 2 && id < 6) {
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
          switch (action) {
            case 3:
            case 4:
            case 5:
              onAddSpecial(keyCode, action);
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
        {keys}
        {button}
      </div>
    );
  }
}

export default withStyles(styles)(MacroTabSpecial);
