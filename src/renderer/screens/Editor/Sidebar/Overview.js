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

import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import CropSquareIcon from "@material-ui/icons/CropSquare";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableFooter from "@material-ui/core/TableFooter";
import TableRow from "@material-ui/core/TableRow";
import { withStyles } from "@material-ui/core/styles";

import LayoutSharing from "./Overview/LayoutSharing";
import { KeymapDB } from "../../../../api/keymap";

const styles = theme => ({
  root: {
    marginBottom: theme.spacing(2)
  },
  tableRow: {
    cursor: "pointer"
  },
  gears: {
    padding: `0px ${theme.spacing(1)}px 0px 0px`
  },
  colorSwatch: {
    width: theme.spacing(3),
    height: theme.spacing(3)
  }
});

class OverviewBase extends React.Component {
  state = {
    showAll: false,
    dialogOpen: false
  };

  selectLayer = index => () => {
    this.props.setLayer(index);
  };

  closeDialog = () => {
    this.setState({ dialogOpen: false });
  };

  openDialog = () => {
    this.setState({ dialogOpen: true });
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
    const {
      classes,
      keymap,
      selectedKey,
      selectedLed,
      layer,
      colormap
    } = this.props;
    const { showAll, dialogOpen } = this.state;
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
      let colorWidget;
      if (colormap && colormap.palette.length > 0) {
        const colorIndex = colormap.colorMap[index][selectedLed];
        const color = colormap.palette[colorIndex];

        colorWidget = (
          <Avatar
            className={classes.colorSwatch}
            variant="square"
            style={{
              color: color.rgb,
              background: color.rgb
            }}
          >
            <CropSquareIcon />
          </Avatar>
        );
      }

      return (
        <TableRow
          key={`key-config-layer-${index}`}
          selected={layer == index}
          onClick={this.selectLayer(index)}
          className={classes.tableRow}
        >
          <TableCell size="small" align="left">
            #{index}
          </TableCell>
          <TableCell>
            {label.hint} {label.main}
          </TableCell>
          {colormap && colormap.palette.length > 0 && (
            <TableCell>{colorWidget}</TableCell>
          )}
        </TableRow>
      );
    });

    const toggleButtonText = showAll
      ? i18n.t("editor.sidebar.overview.hideEmptyLayers")
      : i18n.t("editor.sidebar.overview.showEmptyLayers");

    const footer = lastUsedLayer + 1 < keymap.custom.length && (
      <TableFooter>
        <TableRow>
          <TableCell
            colSpan={colormap && colormap.palette.length > 0 ? 3 : 2}
            align="right"
          >
            <Button onClick={this.toggleAllLayers}>{toggleButtonText}</Button>
          </TableCell>
        </TableRow>
      </TableFooter>
    );

    return (
      <div className={classes.root}>
        <TableContainer component={Paper} className={classes.root}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell size="small">
                  {i18n.t("components.layerRaw")}
                </TableCell>
                <TableCell>
                  {i18n.t("editor.sidebar.overview.key", {
                    index: selectedKey
                  })}
                </TableCell>
                {colormap && colormap.palette.length > 0 && (
                  <TableCell>
                    {i18n.t("editor.sidebar.overview.color")}
                  </TableCell>
                )}
              </TableRow>
            </TableHead>
            <TableBody>{config}</TableBody>
            {footer}
          </Table>
        </TableContainer>
        <Button onClick={this.openDialog} color="secondary" variant="outlined">
          {i18n.t("editor.sidebar.overview.sharing")}
        </Button>
        <LayoutSharing
          open={dialogOpen}
          onClose={this.closeDialog}
          keymap={keymap}
          colormap={colormap}
          layer={layer}
          onKeymapChange={this.props.onKeymapChange}
          onPaletteChange={this.props.onPaletteChange}
          onColormapChange={this.props.onColormapChange}
        />
      </div>
    );
  }
}
const Overview = withStyles(styles, { withTheme: true })(OverviewBase);

export { Overview as default };
