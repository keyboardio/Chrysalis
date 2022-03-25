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

import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import FormHelperText from "@mui/material/FormHelperText";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import withStyles from "@mui/styles/withStyles";

const styles = theme => ({
  accordionRoot: {
    boxShadow: "none",
    margin: `0px 0px -1px 0px`,
    "&.Mui-expanded": {
      margin: `auto auto ${theme.spacing(2)} auto`,
      minHeight: 48
    },
    "&:before": {
      display: "none"
    }
  },
  accordionContentRoot: {
    backgroundColor: "rgba(0, 0, 0, .03)",
    border: "1px solid rgba(0, 0, 0, .125)",
    padding: `0px ${theme.spacing(2)}`
  },
  accordionDetailsRoot: {
    padding: 0,
    margin: `${theme.spacing(2)} 0px`,
    display: "block"
  },
  help: {
    marginBottom: theme.spacing(2)
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

  render() {
    const { classes, title, help } = this.props;
    const { expanded } = this.state;

    let summary = (
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        classes={{ root: classes.accordionContentRoot }}
      >
        <Typography>{title}</Typography>
      </AccordionSummary>
    );
    if (help) {
      summary = <Tooltip title={help}>{summary}</Tooltip>;
    }

    return (
      <Accordion
        square
        expanded={expanded}
        classes={{ root: classes.accordionRoot }}
        onChange={this.handleChange}
      >
        {summary}
        <AccordionDetails classes={{ root: classes.accordionDetailsRoot }}>
          {help && (
            <FormHelperText className={classes.help}>{help}</FormHelperText>
          )}
          {this.props.children}
        </AccordionDetails>
      </Accordion>
    );
  }
}
const Collapsible = withStyles(styles, { withTheme: true })(CollapsibleBase);

export { Collapsible as default };
