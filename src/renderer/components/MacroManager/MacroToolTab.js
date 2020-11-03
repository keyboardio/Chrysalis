import React, { Component } from "react";
import classNames from "classnames";
import MacroTableTool from "./MacroTableTool";

import { withStyles } from "@material-ui/core/styles";
import { TextField, IconButton, Paper, Tabs, Tab } from "@material-ui/core";
import { PublishRounded } from "@material-ui/icons";
const styles = theme => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    width: "-webkit-fill-available",
    margin: theme.spacing.unit,
    border: "solid 1px #bbbbbb",
    borderRadius: "4px"
  },
  tabroot: {
    minWidth: "139px"
  },
  border: {
    border: "solid 1px #bbbbbb",
    borderRadius: "4px"
  },
  margin: {
    padding: theme.spacing.unit
  },
  textField: {
    flexBasis: "444px",
    margin: "0px",
    marginRight: theme.spacing.unit * 4
  },
  code: {
    width: "-webkit-fill-available"
  },
  flex: {
    display: "flex",
    position: "relative",
    placeContent: "space-between",
    margin: theme.spacing.unit
  },
  whitebg: {
    backgroundColor: "#ffffff"
  }
});
class MacroToolTab extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: "Keys"
    };
  }

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { classes } = this.props;
    const { value } = this.state;

    const text = (
      <div className={classNames(classes.flex, classes.margin)}>
        <TextField
          id="AddTextToMacro"
          label="Type text into Macro editor"
          className={classNames(classes.textField, classes.code)}
          value={this.props.addText}
          onChange={this.props.onTextChange}
          margin="normal"
          variant="outlined"
        />
        <IconButton
          onClick={this.state.onAddText}
          className={classNames(classes.iconbutton)}
        >
          <PublishRounded />
        </IconButton>
      </div>
    );

    const keys = (
      <div className={classes.margin}>
        <MacroTableTool
          actionTypes={this.props.actionTypes}
          keymapDB={this.props.keymapDB}
          onAddSymbol={this.props.onAddSymbol}
          onAddDelay={this.props.onAddDelay}
        />
      </div>
    );

    return (
      <div className={classes.root}>
        <Paper>
          <Tabs
            value={value}
            onChange={this.handleChange}
            indicatorColor="primary"
            textColor="primary"
            variant="standard"
          >
            <Tab className={classes.tabroot} value="Text" label="Text" />
            <Tab className={classes.tabroot} value="Keys" label="Keys" />
            <Tab
              className={classes.tabroot}
              value="Functions"
              label="Functions"
            />
            <Tab className={classes.tabroot} value="Mouse" label="Mouse" />
          </Tabs>
        </Paper>
        {value === "Text" && text}
        {value === "Keys" && keys}
        {value === "Functions" && <div>Item Three</div>}
        {value === "Mouse" && <div>Item Four</div>}
      </div>
    );
  }
}

export default withStyles(styles)(MacroToolTab);
