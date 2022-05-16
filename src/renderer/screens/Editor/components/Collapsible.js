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

class Collapsible extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      expanded: props.expanded === undefined ? true : props.expanded,
    };
  }

  handleChange = () => {
    return this.setState((oldState) => ({
      expanded: !oldState.expanded,
    }));
  };

  render() {
    const { title, help } = this.props;
    const { expanded } = this.state;

    let summary = (
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        sx={{
          backgroundColor: "rgba(0, 0, 0, .03)",
          border: "1px solid rgba(0, 0, 0, .125)",
          padding: "0 2",
          "&.Mui-expanded": {
            margin: "0 0",
            minHeight: "0",
          },
        }}
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
        sx={{
          boxShadow: "none",
          margin: `0px 0px -1px 0px`,
          "&.Mui-expanded": {
            margin: "0 0",
            minHeight: 48,
          },
          "&:before": {
            display: "none",
          },
        }}
        onChange={this.handleChange}
      >
        {summary}
        <AccordionDetails
          sx={{
            padding: 2,
            margin: "2 0",
            display: "block",
          }}
        >
          {help && <FormHelperText sx={{ mb: 2 }}>{help}</FormHelperText>}
          {this.props.children}
        </AccordionDetails>
      </Accordion>
    );
  }
}

export { Collapsible as default };
