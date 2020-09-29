import React, { Component } from "react";

import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import LinearProgress from "@material-ui/core/LinearProgress";
import Slider from "@material-ui/lab/Slider";
import Switch from "@material-ui/core/Switch";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";

// import i18n from "../../i18n";

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
  }
});

class ColorSettings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      testMode: false,
      ledBrightness: 255,
      ledIdleTimeLimit: 0,
      working: false
    };
  }

  render() {
    const { classes } = this.props;
    const redColor = (
      <Slider
        max={255}
        value={this.state.ledBrightness}
        className={classes.slider}
        onChange={this.setBrightness}
      />
    );
    const blueColor = (
      <Slider
        max={255}
        value={this.state.ledBrightness}
        className={classes.slider}
        onChange={this.setBrightness}
      />
    );
    const greenColor = (
      <Slider
        max={255}
        value={this.state.ledBrightness}
        className={classes.slider}
        onChange={this.setBrightness}
      />
    );
    const testSwitch = (
      <Switch
        checked={this.state.testMode}
        value="Test"
        onClick={this.setOnlyCustom}
      />
    );
    return (
      <React.Fragment>
        {this.state.working && <LinearProgress variant="query" />}
        <Typography
          variant="subtitle1"
          component="h2"
          className={classes.title}
        >
          {"White Balance"}
        </Typography>
        <Card>
          <CardContent>
            <FormControl className={classes.group}>
              <FormControlLabel
                className={classes.control}
                classes={{
                  label: classes.grow,
                  root: classes.sliderContainer
                }}
                control={redColor}
                labelPlacement="start"
                label="Red Color Adjustment"
              />
              <FormControlLabel
                className={classes.control}
                classes={{
                  label: classes.grow,
                  root: classes.sliderContainer
                }}
                control={greenColor}
                labelPlacement="start"
                label="Green Color Adjustment"
              />
              <FormControlLabel
                className={classes.control}
                classes={{
                  label: classes.grow,
                  root: classes.sliderContainer
                }}
                control={blueColor}
                labelPlacement="start"
                label="Blue Color Adjustment"
              />
              <FormControlLabel
                className={classes.control}
                control={testSwitch}
                classes={{ label: classes.grow }}
                labelPlacement="start"
                label={"Test Mode"}
              />
            </FormControl>
          </CardContent>
          <CardActions className={classes.flex}>
            <span className={classes.grow} />
          </CardActions>
        </Card>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(ColorSettings);
