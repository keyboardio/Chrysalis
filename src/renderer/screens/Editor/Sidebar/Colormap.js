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
import { ChromePicker } from "react-color";

import { withStyles } from "@material-ui/core/styles";

import PalettePicker from "./Colormap/PalettePicker";
import Collapsible from "../components/Collapsible";

const styles = () => ({
  colorPicker: {
    width: "295px !important"
  }
});

class ColormapBase extends React.Component {
  colorChangeComplete = color => {
    const { selectedLed, layer, colormap } = this.props;
    const colorIndex = colormap.colorMap[layer][selectedLed];

    let palette = colormap.palette;
    const { r, g, b } = color.rgb;

    palette[colorIndex] = {
      r: r,
      g: g,
      b: b,
      rgb: `rgb(${r}, ${g}, ${b})`
    };

    this.props.onPaletteChange(palette);
  };

  onPaletteSwatchChange = index => {
    this.props.onLedChange(index);
  };

  render() {
    const { selectedLed, layer, colormap, classes } = this.props;

    if (!colormap || colormap.palette.length == 0) return null;

    const colorIndex = colormap.colorMap[layer][selectedLed];
    const color = colormap.palette[colorIndex];

    return (
      <Collapsible
        title={i18n.t("editor.sidebar.colors.title")}
        help={i18n.t("editor.sidebar.colors.help")}
      >
        <PalettePicker
          color={colorIndex}
          colors={colormap.palette}
          onClick={this.onPaletteSwatchChange}
        />
        <br />
        <ChromePicker
          color={color}
          disableAlpha
          className={classes.colorPicker}
          onChangeComplete={this.colorChangeComplete}
        />
      </Collapsible>
    );
  }
}
const Colormap = withStyles(styles, { withTheme: true })(ColormapBase);

export { Colormap as default };
