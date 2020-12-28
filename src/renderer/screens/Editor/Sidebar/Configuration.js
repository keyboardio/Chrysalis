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
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableRow from "@material-ui/core/TableRow";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";

import { KeymapDB } from "../../../../api/keymap";

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
  tableRow: {
    cursor: "pointer"
  }
});

class ConfigurationBase extends React.Component {
  state = {
    expanded: true
  };

  handleChange = () => {
    return this.setState(oldState => ({
      expanded: !oldState.expanded
    }));
  };

  selectLayer = index => () => {
    this.props.setLayer(index);
  };

  render() {
    const { classes, keymap, selectedKey, layer } = this.props;
    const { expanded } = this.state;
    const db = new KeymapDB();

    const config = keymap.custom.map((layerData, index) => {
      const label = db.format(layerData[selectedKey], "full").main;

      return (
        <TableRow
          key={`key-config-layer-${index}`}
          selected={layer == index}
          onClick={this.selectLayer(index)}
          className={classes.tableRow}
        >
          <TableCell>Layer {index}</TableCell>
          <TableCell>{label}</TableCell>
        </TableRow>
      );
    });

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
          <Typography>Configuration</Typography>
        </AccordionSummary>
        <AccordionDetails classes={{ root: classes.accordionContentRoot }}>
          <TableContainer component={Paper}>
            <Table size="small">
              <TableBody>{config}</TableBody>
            </Table>
          </TableContainer>
        </AccordionDetails>
      </Accordion>
    );
  }
}
const Configuration = withStyles(styles, { withTheme: true })(
  ConfigurationBase
);

export { Configuration as default };
