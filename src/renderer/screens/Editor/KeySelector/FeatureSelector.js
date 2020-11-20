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
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import { withStyles } from "@material-ui/core/styles";

import LayerSwitch from "./Features/LayerSwitch";
import CategorySelector from "./CategorySelector";

import { NewKeymapDB } from "../../../../api/keymap";

const db = new NewKeymapDB();

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
    tab: 0
  };

  onTabChange = (_, tab) => {
    this.setState({ tab: tab });
  };

  UNSAFE_componentWillReceiveProps = nextProps => {
    let newTab = 0;

    if (db.isInCategory(nextProps.currentKeyCode, "layer")) {
      newTab = 0;
    }
    if (db.isInCategory(nextProps.currentKeyCode, "macros")) {
      newTab = 1;
    }

    this.setState({ tab: newTab });
  };

  componentDidMount() {
    let newTab = 0;
    const { currentKeyCode } = this.props;

    if (db.isInCategory(currentKeyCode, "layer")) {
      newTab = 0;
    }
    if (db.isInCategory(currentKeyCode, "macros")) {
      newTab = 1;
    }

    this.setState({ tab: newTab });
  }

  render() {
    const { classes, currentKeyCode, onKeySelect } = this.props;
    const { tab } = this.state;

    return (
      <div className={classes.root}>
        <Tabs
          value={tab}
          variant="scrollable"
          scrollButtons="auto"
          onChange={this.onTabChange}
        >
          <Tab label="Layer switch" />
          <Tab label="Macro" />
        </Tabs>

        <Divider className={classes.divider} />

        <FeaturePanel value={tab} index={0}>
          <LayerSwitch keyCode={currentKeyCode} onKeySelect={onKeySelect} />
        </FeaturePanel>
        <FeaturePanel value={tab} index={1}>
          <CategorySelector
            onKeySelect={onKeySelect}
            currentKeyCode={currentKeyCode}
            category="macros"
            variant="number"
            name="Macro"
          />
        </FeaturePanel>
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(FeatureSelector);
