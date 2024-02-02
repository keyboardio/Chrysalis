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
import PalettePicker from "./Colormap/PalettePicker";
import FKPCategorySelector from "../components/FKPCategorySelector";
import Stack from "@mui/material/Stack";

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

  const disabled = !colormap || colormap?.palette?.length == 0 || layer >= colormap?.colorMap?.length;

  const colorIndex = colormap?.colorMap?.[layer]?.[selectedLed];
  return (
    <Stack direction="row" spacing={2}>
      <Stack direction="column">
        <FKPCategorySelector category="colors" plugin="LEDControl" disabledInMacroEditor={true} disabled={disabled}>
          <PalettePicker
            color={colorIndex}
            colors={colormap?.palette}
            disabled={disabled}
            onClick={onPaletteSwatchChange}
          />
        </FKPCategorySelector>
      </Stack>
      {disabled || (
        <ChromePicker color={colormap?.palette[colorIndex]} disableAlpha onChangeComplete={colorChangeComplete} />
      )}
    </Stack>
  );
};
export { Colormap as default };
