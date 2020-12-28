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

import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";

import KeyButtonList from "../components/KeyButtonList";
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

class ConsumerKeysBase extends React.Component {
  state = {
    expanded: false
  };

  UNSAFE_componentWillReceiveProps = nextProps => {
    this.updateExpandedBasedOnKey(nextProps);
  };

  updateExpandedBasedOnKey = props => {
    const { selectedKey, keymap, layer } = props;
    const key = keymap.custom[layer][selectedKey];

    if (db.isInCategory(key.code, "consumer")) {
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
  };

  render() {
    const { classes, keymap, selectedKey, layer } = this.props;
    const { expanded } = this.state;

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
            <Typography>Consumer control keys</Typography>
          </AccordionSummary>
          <AccordionDetails classes={{ root: classes.accordionDetailsRoot }}>
            <KeyButtonList
              keys={db.selectCategory("consumer")}
              onKeyChange={this.props.onKeyChange}
            />
          </AccordionDetails>
        </Accordion>
      </React.Fragment>
    );
  }
}
const ConsumerKeys = withStyles(styles, { withTheme: true })(ConsumerKeysBase);

export { ConsumerKeys as default };
