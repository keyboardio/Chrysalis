// -*- mode: js-jsx -*-
/* Chrysalis -- Kaleidoscope Command Center
 * Copyright (C) 2018, 2019  Keyboardio, Inc.
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
import PropTypes from "prop-types";

import Fade from "@material-ui/core/Fade";
import LinearProgress from "@material-ui/core/LinearProgress";
import Portal from "@material-ui/core/Portal";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import Toolbar from "@material-ui/core/Toolbar";
import { withStyles } from "@material-ui/core/styles";

import { withSnackbar } from "notistack";

import Focus from "@chrysalis-api/focus";

import Palette from "./ColormapEditor/Palette";
import SaveChangesButton from "../components/SaveChangesButton";
import i18n from "../i18n";

const styles = theme => ({
  tabs: {
    flexGrow: 1
  },
  editor: {
    margin: theme.spacing.unit * 3,
    marginBottom: 150,
    textAlign: "center"
  }
});

class ColormapEditor extends React.Component {
  state = {
    currentLayer: 0,
    modified: false,
    saving: false,
    selectedPaletteColor: -1,
    palette: [],
    colorMap: []
  };

  scanKeyboard = async () => {
    let focus = new Focus();

    try {
      let colormap = await focus.command("colormap");

      this.setState({
        palette: colormap.palette,
        colorMap: colormap.colorMap
      });
    } catch (error) {
      this.props.enqueueSnackbar(error, { variant: "error" });
      this.props.onDisconnect();
    }
  };

  selectLayer = (event, value) => {
    this.setState({
      currentLayer: value
    });
  };

  onColorSelect = colorIndex => {
    if (colorIndex == this.state.selectedPaletteColor) colorIndex = -1;
    this.setState({ selectedPaletteColor: colorIndex });
  };

  onColorPick = (colorIndex, r, g, b) => {
    let newPalette = this.state.palette.slice();
    newPalette[colorIndex] = {
      r: r,
      g: g,
      b: b,
      rgb: `rgb(${r}, ${g}, ${b})`
    };
    this.setState({
      palette: newPalette,
      modified: true
    });
  };

  onKeySelect = event => {
    let layer = parseInt(event.currentTarget.getAttribute("data-layer")),
      ledIndex = parseInt(event.currentTarget.getAttribute("data-led-index"));

    if (this.state.selectedPaletteColor != -1) {
      this.setState(state => {
        let colormap = state.colorMap.slice();
        colormap[layer][ledIndex] = this.state.selectedPaletteColor;
        return colormap;
      });
      this.setState({ modified: true });
    } else {
      this.setState({
        selectedPaletteColor: this.state.colorMap[layer][ledIndex]
      });
    }
  };

  onApply = async () => {
    this.setState({ saving: true });
    let focus = new Focus();
    await focus.command("colormap", this.state.palette, this.state.colorMap);
    this.setState({
      modified: false,
      saving: false
    });
    console.log("colormap updated");
  };

  componentDidMount() {
    this.scanKeyboard();
  }

  render() {
    const { classes } = this.props;
    let focus = new Focus();
    const Layer = focus.device.components.keymap;

    let tabs = this.state.colorMap.map((_, index) => {
      let label = i18n.formatString(i18n.components.layer, index),
        tabKey = "tab-layer-" + index.toString();
      return <Tab label={label} key={tabKey} />;
    });

    let colormap = (
      <Fade in appear key={this.state.currentLayer}>
        <div className={classes.editor}>
          <Layer
            index={this.state.currentLayer}
            palette={this.state.palette}
            colormap={this.state.colorMap[this.state.currentLayer]}
            onKeySelect={this.onKeySelect}
          />
        </div>
      </Fade>
    );

    return (
      <React.Fragment>
        <Portal container={this.props.titleElement}>
          {i18n.app.menu.colormapEditor}
        </Portal>
        <Portal container={this.props.appBarElement}>
          <Toolbar>
            <Tabs
              className={classes.tabs}
              value={this.state.currentLayer}
              scrollable
              scrollButtons="auto"
              onChange={this.selectLayer}
            >
              {tabs}
            </Tabs>
          </Toolbar>
        </Portal>
        {this.state.colorMap.length == 0 && <LinearProgress variant="query" />}
        {colormap}
        <Palette
          palette={this.state.palette}
          onColorSelect={this.onColorSelect}
          onColorPick={this.onColorPick}
          selected={this.state.selectedPaletteColor}
        />
        <SaveChangesButton
          floating
          onClick={this.onApply}
          disabled={!this.state.modified}
        >
          {i18n.components.save.saveChanges}
        </SaveChangesButton>
      </React.Fragment>
    );
  }
}

ColormapEditor.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withSnackbar(withStyles(styles)(ColormapEditor));
