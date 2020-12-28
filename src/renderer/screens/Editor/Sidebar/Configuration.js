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

import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableFooter from "@material-ui/core/TableFooter";
import TableRow from "@material-ui/core/TableRow";
import { withStyles } from "@material-ui/core/styles";

import Collapsible from "../components/Collapsible";
import { KeymapDB } from "../../../../api/keymap";

const styles = () => ({
  tableRow: {
    cursor: "pointer"
  }
});

class ConfigurationBase extends React.Component {
  state = {
    showAll: false
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
    const { showAll } = this.state;
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
      <Collapsible title="Configuration">
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
      </Collapsible>
    );
  }
}
const Configuration = withStyles(styles, { withTheme: true })(
  ConfigurationBase
);

export { Configuration as default };
