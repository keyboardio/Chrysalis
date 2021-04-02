import React, { Component } from "react";
import classNames from "classnames";
import MacroTabKeys from "./MacroTabKeys";
import MacroTabSpecial from "./MacroTabSpecial";
import MacroTabMouse from "./MacroTabMouse";

import { withStyles } from "@material-ui/core/styles";
import {
  AppBar,
  TextField,
  IconButton,
  Paper,
  Tabs,
  Tab
} from "@material-ui/core";
import { PublishRounded } from "@material-ui/icons";
import i18n from "../../i18n";

const styles = theme => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    width: "-webkit-fill-available",
    margin: theme.spacing(),
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
    padding: theme.spacing()
    //   ,
    //   paddingTop: theme.spacing(2),
    //   paddingBottom: theme.spacing(2)
  },
  textField: {
    //   flexBasis: "444px",
    //   margin: "0px"
    //   //,
    marginRight: theme.spacing()
  },
  avatar: {
    paddingTop: "4px",
    paddingBottom: "4px"
  },
  iconbutton: {
    width: "58px",
    height: "58px"
  },
  code: {
    width: "-webkit-fill-available"
  },
  flex: {
    display: "flex"
    //,
    //   position: "relative",
    //   placeContent: "space-between"
    //   // ,
    //   // margin: theme.spacing()
  }
  // ,
  // whitebg: {
  //   backgroundColor: "#ffffff"
  // }
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
          label={i18n.editor.macros.inputTextBox}
          className={classNames(classes.textField, classes.code)}
          value={this.props.addText}
          onChange={this.props.onTextChange}
          // margin="normal"
          // variant="outlined"
        />
        <IconButton
          onClick={this.props.onAddText}
          className={classNames(classes.iconbutton)}
        >
          <PublishRounded />
        </IconButton>
      </div>
    );

    const keys = (
      <div className={classes.margin}>
        <MacroTabKeys
          actionTypes={this.props.actionTypes}
          keymapDB={this.props.keymapDB}
          onAddSymbol={this.props.onAddSymbol}
          onAddDelay={this.props.onAddDelay}
        />
      </div>
    );

    const functions = (
      <div className={classes.margin}>
        <MacroTabSpecial
          actionTypes={this.props.actionTypes}
          keymapDB={this.props.keymapDB}
          onAddSpecial={this.props.onAddSpecial}
          number={this.props.number}
        />
      </div>
    );

    const mouse = (
      <div className={classes.margin}>
        <MacroTabMouse
          actionTypes={this.props.actionTypes}
          keymapDB={this.props.keymapDB}
          onAddSpecial={this.props.onAddSpecial}
        />
      </div>
    );

    return (
      <div className={classes.root}>
        <AppBar position="static" color="default">
          <Tabs
            value={value}
            onChange={this.handleChange}
            indicatorColor="primary"
            textColor="primary"
            variant="fullWidth"
          >
            <Tab
              className={classes.tabroot}
              value="Text"
              label={i18n.editor.macros.inputText}
            />
            <Tab
              className={classes.tabroot}
              value="Keys"
              label={i18n.editor.macros.keysAndDelays}
            />
            <Tab
              className={classes.tabroot}
              value="Functions"
              label={i18n.editor.macros.functions}
            />
            <Tab
              className={classes.tabroot}
              value="Mouse"
              label={i18n.editor.macros.mouse}
            />
          </Tabs>
        </AppBar>
        {value === "Text" && text}
        {value === "Keys" && keys}
        {value === "Functions" && functions}
        {value === "Mouse" && mouse}
      </div>
    );
  }
}

export default withStyles(styles)(MacroToolTab);
