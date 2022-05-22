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

import React from "react";
import { ChromePicker } from "react-color";
import { useTranslation } from "react-i18next";
import Collapsible from "../components/Collapsible";
import PalettePicker from "./Colormap/PalettePicker";

const Colormap = (props) => {
  const { t } = useTranslation();

  const colorChangeComplete = (color) => {
    const { selectedLed, layer, colormap } = props;
    const colorIndex = colormap.colorMap[layer][selectedLed];

    const palette = colormap.palette;
    const { r, g, b } = color.rgb;

    palette[colorIndex] = {
      r: r,
      g: g,
      b: b,
      rgb: `rgb(${r}, ${g}, ${b})`,
    };

    props.onPaletteChange(palette);
  };

  const onPaletteSwatchChange = (index) => {
    props.onLedChange(index);
  };

  const { selectedLed, layer, colormap } = props;

  if (!colormap || colormap.palette.length == 0) return null;

  const colorIndex = colormap.colorMap[layer][selectedLed];
  const color = colormap.palette[colorIndex];

  return (
    <Collapsible
      title={t("editor.sidebar.colors.title")}
      help={t("editor.sidebar.colors.help")}
      expanded={false}
    >
      <PalettePicker
        color={colorIndex}
        colors={colormap.palette}
        onClick={onPaletteSwatchChange}
      />
      <br />
      <ChromePicker
        color={color}
        disableAlpha
        sx={{
          width: "295px !important",
        }}
        onChangeComplete={colorChangeComplete}
      />
    </Collapsible>
  );
};
export { Colormap as default };
