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

class CollapsibleBase extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      expanded: props.expanded === undefined ? true : props.expanded
    };
  }

  handleChange = () => {
    return this.setState(oldState => ({
      expanded: !oldState.expanded
    }));
  };

  UNSAFE_componentWillReceiveProps = nextProps => {
    if (nextProps.explicit) return;

    const expanded =
      nextProps.expanded === undefined ? true : nextProps.expanded;

    this.setState({ expanded: expanded });
  };

  render() {
    const { classes, title } = this.props;
    const { expanded } = this.state;

    return (
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
          <Typography>{title}</Typography>
        </AccordionSummary>
        <AccordionDetails classes={{ root: classes.accordionDetailsRoot }}>
          {this.props.children}
        </AccordionDetails>
      </Accordion>
    );
  }
}
const Collapsible = withStyles(styles, { withTheme: true })(CollapsibleBase);

export { Collapsible as default };
