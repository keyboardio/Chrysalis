// -*- mode: js-jsx -*-
/* Chrysalis -- Kaleidoscope Command Center
 * Copyright (C) 2020  Keyboardio, Inc.
 *
 * This program is free software: you can redistribute it and/or modify it under
 * the terms of the GNU General Public License as published by the Free Software
 * Foundation, version 3.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

import React from "react";

import Divider from "@material-ui/core/Divider";
//import Grid from "@material-ui/core/Grid";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import { withStyles } from "@material-ui/core/styles";

//import KeyButton from "../../../components/KeyButton";
import LayerSwitch from "./Features/LayerSwitch";

//import { NewKeymapDB } from "../../../../api/keymap";
//const db = new NewKeymapDB();

const styles = theme => ({
  root: {
    flexGrow: 1,
    margin: theme.spacing.unit
  },
  divider: {
    marginTop: theme.spacing.unit
  }
});

const FeaturePanel = props => {
  const { children, value, index, ...other } = props;

  return (
    <div role="tabpanel" id={`featurepanel-${index}`} {...other}>
      {value === index && children}
    </div>
  );
};

class FeatureSelector extends React.Component {
  state = {
    feature: null
  };

  setFeature = feature => {
    return () => {
      this.setState({ feature: feature });
    };
  };

  render() {
    const { classes, currentKeyCode, onKeySelect } = this.props;

    return (
      <div className={classes.root}>
        <Tabs value={0} variant="scrollable" scrollButtons="auto">
          <Tab label="Layer switch" />
          <Tab label="Macro" />
        </Tabs>

        <Divider className={classes.divider} />

        <FeaturePanel value={0} index={0}>
          <LayerSwitch keyCode={currentKeyCode} onKeySelect={onKeySelect} />
        </FeaturePanel>
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(FeatureSelector);
