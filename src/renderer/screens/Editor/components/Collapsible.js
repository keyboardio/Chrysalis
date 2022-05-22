// -*- mode: js-jsx -*-
/* Chrysalis -- Kaleidoscope Command Center
 * Copyright (C) 2020-2022  Keyboardio, Inc.
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
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import FormHelperText from "@mui/material/FormHelperText";
import Typography from "@mui/material/Typography";
import React, { useState } from "react";

const Collapsible = (props) => {
  const [expanded, setExpanded] = useState(undefined);

  const show_expanded = expanded !== undefined ? expanded : props.expanded;

  const handleChange = () => {
    setExpanded(!show_expanded);
  };
  const { title, help } = props;
  const summary = (
    <AccordionSummary
      expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: "0.9rem" }} />}
      sx={{
        backgroundColor: "rgba(0, 0, 0, .03)",
        border: "1px solid rgba(0, 0, 0, .125)",
        padding: "0 2",
        flexDirection: "row-reverse",
        "&.Mui-expanded": {
          margin: "0 0",
          minHeight: 0,
        },
        "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
          transform: "rotate(90deg)",
        },
        "& .MuiAccordionSummary-content": {
          marginLeft: 2,
          py: "12px",
          my: "0px",
        },
        "& .MuiAccordionSummary-content.Mui-expanded": {
          marginLeft: 2,
          my: 0,
        },
        "&.MuiButtonBase-root.MuiAccordionSummary-root.Mui-expanded.MuiAccordionSummary-gutters":
          {
            my: 0,
          },
      }}
    >
      <Typography>{title}</Typography>
    </AccordionSummary>
  );

  return (
    <Accordion
      square
      TransitionProps={{ unmountOnExit: true }}
      expanded={show_expanded}
      sx={{
        boxShadow: "none",
        margin: `0px 0px -1px 0px`,
        "&.Mui-expanded": {
          margin: `0px 0px -1px 0px`,
        },
        "&:before": {
          display: "none",
        },
      }}
      onChange={handleChange}
    >
      {summary}
      <AccordionDetails
        sx={{
          padding: 2,
          margin: "2 0",
          display: "block",
        }}
      >
        {help && (
          <FormHelperText
            sx={{
              mb: 2,
            }}
          >
            {help}
          </FormHelperText>
        )}
        {props.children}
      </AccordionDetails>
    </Accordion>
  );
};

export { Collapsible as default };
