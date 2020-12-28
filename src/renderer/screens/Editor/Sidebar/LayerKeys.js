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

import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";

import { KeymapDB } from "../../../../api/keymap";

const db = new KeymapDB();

const styles = () => ({
  accordionRoot: {
    boxShadow: "none",
    margin: "auto",
    "&.Mui-expanded": {
      margin: "auto"
    },
    "&:before": {
      display: "none"
    }
  },
  accordionContentRoot: {
    padding: 0
  },
  accordionDetailsRoot: {
    padding: 0,
    display: "block"
  }
});

class LayerKeysBase extends React.Component {
  state = {
    expanded: false
  };

  UNSAFE_componentWillReceiveProps = nextProps => {
    this.updateExpandedBasedOnKey(nextProps);
  };

  updateExpandedBasedOnKey = props => {
    const { selectedKey, keymap, layer } = props;
    const key = keymap.custom[layer][selectedKey];

    if (db.isInCategory(key.code, "layer")) {
      this.setState({ expanded: true });
    } else {
      this.setState({ expanded: false });
    }
  };

  componentDidMount() {
    this.updateExpandedBasedOnKey(this.props);
  }

  handleChange = () => {
    return this.setState(oldState => ({
      expanded: !oldState.expanded
    }));
  };

  onKeyChange = keyCode => {
    this.props.onKeyChange(keyCode);
    this.closePicker();
  };

  onTargetLayerChange = event => {
    const { keymap, selectedKey, layer } = this.props;
    const key = keymap.custom[layer][selectedKey];
    const target = parseInt(event.target.value) || 0;

    this.props.onKeyChange(key.rangeStart + target);
  };

  onTypeChange = event => {
    const typeStarts = {
      locktolayer: 17408,
      shifttolayer: 17450,
      movetolayer: 17492
    };
    const { keymap, selectedKey, layer } = this.props;
    const key = keymap.custom[layer][selectedKey];
    const targetLayer = key.target || 0;

    this.props.onKeyChange(typeStarts[event.target.value] + targetLayer);
  };

  render() {
    const { classes, keymap, selectedKey, layer } = this.props;
    const { expanded } = this.state;
    const key = keymap.custom[layer][selectedKey];

    let type = "none",
      targetLayer = -1;

    if (db.isInCategory(key.code, "layer")) {
      targetLayer = key.target;
      type = key.categories[1];
    }

    return (
      <React.Fragment>
        <Accordion
          square
          expanded={expanded}
          classes={{ root: classes.accordionRoot }}
          onChange={this.handleChange}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            classes={{ root: classes.accordionContentRoot }}
          >
            <Typography>Layer keys</Typography>
          </AccordionSummary>
          <AccordionDetails classes={{ root: classes.accordionDetailsRoot }}>
            <div>
              <FormControl className={classes.form}>
                <InputLabel>{i18n.t("editor.layerswitch.type")}</InputLabel>
                <Select value={type} onChange={this.onTypeChange}>
                  <MenuItem value="none" disabled selected>
                    None
                  </MenuItem>
                  <MenuItem
                    value="shifttolayer"
                    selected={type == "shifttolayer"}
                  >
                    {i18n.t("editor.layerswitch.shiftTo")}
                  </MenuItem>
                  <MenuItem
                    value="locktolayer"
                    selected={type == "locktolayer"}
                  >
                    {i18n.t("editor.layerswitch.lockTo")}
                  </MenuItem>
                  <MenuItem
                    value="movetolayer"
                    selected={type == "movetolayer"}
                  >
                    {i18n.t("editor.layerswitch.moveTo")}
                  </MenuItem>
                </Select>
              </FormControl>
              <FormControl className={classes.form}>
                <InputLabel>{i18n.t("editor.layerswitch.target")}</InputLabel>
                <Input
                  type="number"
                  min={0}
                  max={keymap.custom.length}
                  value={targetLayer < 0 ? "" : targetLayer}
                  disabled={targetLayer < 0}
                  onChange={this.onTargetLayerChange}
                />
              </FormControl>
            </div>
          </AccordionDetails>
        </Accordion>
      </React.Fragment>
    );
  }
}
const LayerKeys = withStyles(styles, { withTheme: true })(LayerKeysBase);

export { LayerKeys as default };
