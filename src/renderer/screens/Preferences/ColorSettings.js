import React, { Component } from "react";

import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import LinearProgress from "@material-ui/core/LinearProgress";
import Slider from "@material-ui/lab/Slider";
import Switch from "@material-ui/core/Switch";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";

import SaveChangesButton from "../../components/SaveChangesButton";

import i18n from "../../i18n";

const styles = theme => ({
  title: {
    marginTop: theme.spacing.unit * 4,
    marginBottom: theme.spacing.unit
  },
  control: {
    display: "flex",
    marginRight: theme.spacing.unit * 2
  },
  group: {
    display: "block"
  },
  grow: {
    flexGrow: 1
  },
  flex: {
    display: "flex"
  },
  select: {
    paddingTop: theme.spacing.unit * 1,
    width: 200
  },
  selectContainer: {
    marginTop: theme.spacing.unit * 2
  },
  slider: {
    width: 300
  },
  sliderContainer: {
    marginTop: theme.spacing.unit * 2
  },
  advanced: {
    display: "flex",
    justifyContent: "center",
    marginTop: theme.spacing.unit * 4,
    "& button": {
      textTransform: "none",
      "& span svg": {
        marginLeft: "1.5em"
      }
    }
  },
  button: {
    display: "flex",
    marginTop: theme.spacing.unit * 2,
    marginRight: theme.spacing.unit * 2
  }
});

class ColorSettings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      testMode: false,
      balance: props.balance,
      oldBalance: props.balance,
      RedColorB: 255 - props.balance.r,
      GreenColorB: 255 - props.balance.g,
      BlueColorB: 255 - props.balance.b,
      ledIdleTimeLimit: 0,
      working: false,
      modified: false,
      modifications: false
    };
  }

  componentWillUnmount() {
    if (this.state.testMode === true) {
      this.props.stopTestBalance();
    }
  }
  setBrightness = async () => {
    let newBalance = this.state.balance;
    if (this.state.testMode === true && this.state.modified === true) {
      this.setState({
        working: true
      });
      newBalance = {
        r: 255 - this.state.RedColorB,
        g: 255 - this.state.GreenColorB,
        b: 255 - this.state.BlueColorB
      };
      await this.props.testBalance(newBalance);
      this.setState({
        balance: newBalance,
        working: false,
        modified: false,
        modifications: true
      });
    }
  };
  setTestMode = async e => {
    let check = e.target.checked;
    this.setState({
      working: true
    });
    if (e.target.checked === true) {
      this.setState({ oldBalance: this.state.balance });
      await this.props.startTestBalance();
      let newBalance = {
        r: 255 - this.state.RedColorB,
        g: 255 - this.state.GreenColorB,
        b: 255 - this.state.BlueColorB
      };
      await this.props.testBalance(newBalance);
    } else {
      this.setState({
        balance: this.state.oldBalance,
        RedColorB: 255 - this.state.oldBalance.r,
        GreenColorB: 255 - this.state.oldBalance.g,
        BlueColorB: 255 - this.state.oldBalance.b
      });
      await this.props.stopTestBalance();
    }
    this.setState({
      testMode: check,
      working: false
    });
  };
  render() {
    const { classes } = this.props;
    const redColor = (
      <Slider
        max={255}
        min={210}
        disabled={!this.state.testMode}
        value={this.state.RedColorB}
        className={classes.slider}
        step={3}
        onChange={(e, v) => {
          this.setState({ RedColorB: v, modified: true });
        }}
      />
    );
    const greenColor = (
      <Slider
        max={255}
        min={210}
        disabled={!this.state.testMode}
        value={this.state.GreenColorB}
        className={classes.slider}
        step={3}
        onChange={(e, v) => {
          this.setState({ GreenColorB: v, modified: true });
        }}
      />
    );
    const blueColor = (
      <Slider
        max={255}
        min={210}
        disabled={!this.state.testMode}
        value={this.state.BlueColorB}
        className={classes.slider}
        step={3}
        onChange={(e, v) => {
          this.setState({ BlueColorB: v, modified: true });
        }}
      />
    );
    const testSwitch = (
      <Switch
        checked={this.state.testMode}
        disabled={this.state.working}
        value={false}
        onClick={this.setTestMode}
      />
    );
    const applyButton = (
      <Button
        variant="contained"
        color="primary"
        disabled={
          this.state.working || !this.state.testMode || !this.state.modified
        }
        onClick={this.setBrightness}
      >
        {i18n.keyboardSettings.colorSettings.visualizebutton}
      </Button>
    );
    return (
      <React.Fragment>
        {this.state.working && <LinearProgress variant="query" />}
        <Typography
          variant="subtitle1"
          component="h2"
          className={classes.title}
        >
          {i18n.keyboardSettings.colorSettings.title}
        </Typography>
        <Card>
          <CardContent>
            <FormControl className={classes.group}>
              <FormControlLabel
                className={classes.control}
                control={testSwitch}
                classes={{ label: classes.grow }}
                labelPlacement="start"
                label={
                  this.state.testMode
                    ? i18n.keyboardSettings.colorSettings.test.quit
                    : i18n.keyboardSettings.colorSettings.test.enter
                }
              />
              <Divider />
              <FormControlLabel
                className={classes.control}
                classes={{
                  label: classes.grow,
                  root: classes.sliderContainer
                }}
                control={redColor}
                labelPlacement="start"
                label={
                  i18n.keyboardSettings.colorSettings.red +
                  ` - ${((this.state.RedColorB / 255) * 100).toFixed(1)}%`
                }
              />
              <FormControlLabel
                className={classes.control}
                classes={{
                  label: classes.grow,
                  root: classes.sliderContainer
                }}
                control={greenColor}
                labelPlacement="start"
                label={
                  i18n.keyboardSettings.colorSettings.green +
                  ` - ${((this.state.GreenColorB / 255) * 100).toFixed(1)}%`
                }
              />
              <FormControlLabel
                className={classes.control}
                classes={{
                  label: classes.grow,
                  root: classes.sliderContainer
                }}
                control={blueColor}
                labelPlacement="start"
                label={
                  i18n.keyboardSettings.colorSettings.blue +
                  ` - ${((this.state.BlueColorB / 255) * 100).toFixed(1)}%`
                }
              />
            </FormControl>
            <FormControlLabel
              className={classes.button}
              control={applyButton}
              classes={{ label: classes.grow }}
              labelPlacement="start"
              label={" "}
            />
          </CardContent>
          <CardActions className={classes.flex}>
            <span className={classes.grow} />
            <SaveChangesButton
              onClick={() => {
                this.setState({ oldBalance: this.state.balance });
                this.props.setBalance(this.state.balance);
              }}
              disabled={
                this.state.working ||
                !this.state.testMode ||
                !this.state.modifications
              }
            >
              {i18n.components.save.saveChanges}
            </SaveChangesButton>
          </CardActions>
        </Card>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(ColorSettings);
