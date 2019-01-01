// -*- mode: js-jsx -*-
/* chrysalis-bundle-keyboardio -- Chrysalis Bundle for Keyboard.io
 * Copyright (C) 2018  Keyboardio, Inc.
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

import LinearProgress from "@material-ui/core/LinearProgress";
import Portal from "@material-ui/core/Portal";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";

import { withSnackbar } from "notistack";

import Focus from "@chrysalis-api/focus";

import Palette from "./ColormapEditor/Palette";
import Layer, { led_map } from "./ColormapEditor/Layer";
import SaveChangesButton from "./SaveChangesButton";

const styles = theme => ({
  tabs: {
    flexGrow: 1
  },
  editor: {
    margin: theme.spacing.unit * 3,
    display: "flex"
  },
  palette: {
    marginTop: theme.spacing.unit * 3,
    display: "inline"
  },
  layerRoot: {
    width: "100%"
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
      row = parseInt(event.currentTarget.getAttribute("data-key-row")),
      col = parseInt(event.currentTarget.getAttribute("data-key-col")),
      ledIndex = led_map[row][col];

    if (this.state.selectedPaletteColor != -1) {
      this.setState(state => {
        let colormap = state.colorMap.slice();
        colormap[layer][ledIndex] = this.state.selectedPaletteColor;
        return colormap;
      });
      this.setState({ modified: true });
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
    if (this.state.colorMap.length == 0) {
      return (
        <main>
          <LinearProgress variant="query" />
        </main>
      );
    }

    const { classes } = this.props;

    let tabs = this.state.colorMap.map((_, index) => {
      let label = "Layer #" + index.toString(),
        tabKey = "tab-layer-" + index.toString();
      return <Tab label={label} key={tabKey} />;
    });

    let colormap = (
      <Typography component="div" className={classes.layerRoot}>
        <Layer
          index={this.state.currentLayer}
          palette={this.state.palette}
          colormap={this.state.colorMap[this.state.currentLayer]}
          onKeySelect={this.onKeySelect}
        />
      </Typography>
    );

    return (
      <React.Fragment>
        <Portal container={this.props.titleElement}>Colormap Editor</Portal>
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
        <div className={classes.editor}>
          <div>
            {colormap}
            <SaveChangesButton
              onClick={this.onApply}
              disabled={!this.state.modified}
            >
              Save Changes
            </SaveChangesButton>
          </div>
          <Palette
            palette={this.state.palette}
            className={classes.palette}
            onColorSelect={this.onColorSelect}
            onColorPick={this.onColorPick}
          />
        </div>
      </React.Fragment>
    );
  }
}

ColormapEditor.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withSnackbar(withStyles(styles)(ColormapEditor));
