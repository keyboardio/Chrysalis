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
import Button from "@material-ui/core/Button";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableFooter from "@material-ui/core/TableFooter";
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
    expanded: true,
    showAll: false
  };

  handleChange = () => {
    return this.setState(oldState => ({
      expanded: !oldState.expanded
    }));
  };

  selectLayer = index => () => {
    this.props.setLayer(index);
  };

  findLastUsedLayer = () => {
    let lastUsedLayer = 0;
    const { keymap } = this.props;

    for (let index = 0; index < keymap.custom.length; index++) {
      const layer = keymap.custom[index];
      for (let keyIdx = 0; keyIdx < layer.length; keyIdx++) {
        if (layer[keyIdx].code != 65535) {
          lastUsedLayer = index;
          break;
        }
      }
    }

    return lastUsedLayer;
  };

  toggleAllLayers = () => {
    this.setState(state => ({
      showAll: !state.showAll
    }));
  };

  render() {
    const { classes, keymap, selectedKey, layer } = this.props;
    const { expanded, showAll } = this.state;
    const db = new KeymapDB();

    const lastUsedLayer = this.findLastUsedLayer();
    let usedLayers;

    if (showAll) {
      usedLayers = keymap.custom;
    } else {
      usedLayers = keymap.custom.slice(0, lastUsedLayer + 1);
    }

    const config = usedLayers.map((layerData, index) => {
      const label = db.format(layerData[selectedKey], "full");

      return (
        <TableRow
          key={`key-config-layer-${index}`}
          selected={layer == index}
          onClick={this.selectLayer(index)}
          className={classes.tableRow}
        >
          <TableCell>Layer {index}</TableCell>
          <TableCell>
            {label.hint} {label.main}
          </TableCell>
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
              <TableFooter>
                <TableRow>
                  <TableCell colSpan={2} align="right">
                    <Button onClick={this.toggleAllLayers}>
                      {showAll ? "Less..." : "More..."}
                    </Button>
                  </TableCell>
                </TableRow>
              </TableFooter>
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
