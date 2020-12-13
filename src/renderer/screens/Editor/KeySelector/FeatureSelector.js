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
import i18n from "i18next";

import Divider from "@material-ui/core/Divider";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import { withStyles } from "@material-ui/core/styles";

import LayerSwitch from "./Features/LayerSwitch";
import CategorySelector from "./CategorySelector";

import { KeymapDB } from "../../../../api/keymap";
const db = new KeymapDB();

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
  tabs = {
    layer: 0,
    macros: 1,
    tapdance: 2,
    leader: 3,
    ledkeys: 4,
    spacecadet: 5,
    steno: 6,
    oneshot: 7,
    mousekeys: 8
  };

  state = {
    tab: 0
  };

  onTabChange = (_, tab) => {
    this.setState({ tab: tab });
  };

  tabForKey = key => {
    let newTab = 0;

    for (const cat of Object.keys(this.tabs)) {
      if (db.isInCategory(key, cat)) {
        newTab = this.tabs[cat];
      }
    }

    return newTab;
  };

  UNSAFE_componentWillReceiveProps = nextProps => {
    this.setState({ tab: this.tabForKey(nextProps.currentKeyCode) });
  };

  componentDidMount() {
    this.setState({ tab: this.tabForKey(this.props.currentKeyCode) });
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
          <Tab label={i18n.t("editor.tabs._features.layer")} />
          <Tab label={i18n.t("editor.tabs._features.macro")} />
          <Tab label={i18n.t("editor.tabs._features.tapdance")} />
          <Tab label={i18n.t("editor.tabs._features.leader")} />
          <Tab label={i18n.t("editor.tabs._features.leds")} />
          <Tab label={i18n.t("editor.tabs._features.spacecadet")} />
          <Tab label={i18n.t("editor.tabs._features.steno")} />
          <Tab label={i18n.t("editor.tabs._features.oneshot")} />
          <Tab label={i18n.t("editor.tabs._features.mouse")} />
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
            name={i18n.t("editor.tabs._features.macro")}
          />
        </FeaturePanel>
        <FeaturePanel value={tab} index={2}>
          <CategorySelector
            onKeySelect={onKeySelect}
            currentKeyCode={currentKeyCode}
            category="tapdance"
            variant="number"
            name={i18n.t("editor.tabs._features.tapdance")}
          />
        </FeaturePanel>
        <FeaturePanel value={tab} index={3}>
          <CategorySelector
            onKeySelect={onKeySelect}
            currentKeyCode={currentKeyCode}
            category="leader"
            variant="number"
            name={i18n.t("editor.tabs._features.leader")}
          />
        </FeaturePanel>
        <FeaturePanel value={tab} index={4}>
          <CategorySelector
            onKeySelect={onKeySelect}
            currentKeyCode={currentKeyCode}
            category="ledkeys"
            variant="button-grid"
            name={i18n.t("editor.tabs._features.leds")}
          />
        </FeaturePanel>
        <FeaturePanel value={tab} index={5}>
          <CategorySelector
            onKeySelect={onKeySelect}
            currentKeyCode={currentKeyCode}
            category="spacecadet"
            variant="button-grid"
            name={i18n.t("editor.tabs._features.spacecadet")}
          />
        </FeaturePanel>
        <FeaturePanel value={tab} index={6}>
          <CategorySelector
            onKeySelect={onKeySelect}
            currentKeyCode={currentKeyCode}
            category="steno"
            variant="button-grid"
            name={i18n.t("editor.tabs._features.steno")}
          />
        </FeaturePanel>
        <FeaturePanel value={tab} index={7}>
          <CategorySelector
            onKeySelect={onKeySelect}
            currentKeyCode={currentKeyCode}
            category="oneshot"
            variant="button-grid"
            name={i18n.t("editor.tabs._features.oneshot")}
          />
        </FeaturePanel>
        <FeaturePanel value={tab} index={8}>
          <CategorySelector
            onKeySelect={onKeySelect}
            currentKeyCode={currentKeyCode}
            category="mousekeys"
            variant="button-grid"
            name={i18n.t("editor.tabs._features.mouse")}
          />
        </FeaturePanel>
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(FeatureSelector);
