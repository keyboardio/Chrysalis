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

import CropSquareIcon from "@mui/icons-material/CropSquare";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import React from "react";
import { CustomPicker } from "react-color";

const Swatch = (props) => {
  const { classes, color, active, onClick } = props; // TODO(anyone): The width, height and margin properties should be relative
  // to theme spacings. They were 3/3/0.75 previously. However, using those
  // numbers here gets us 3px "big" swatches, which isn't what we want.

  return (
    <Avatar
      sx={{
        width: "24px",
        height: "24px",
        margin: "2.25px",
      }}
      variant="square"
      style={{
        color: color.rgb,
        background: active ? "transparent" : color.rgb,
      }}
      onClick={onClick}
    >
      <CropSquareIcon />
    </Avatar>
  );
};
const PalettePicker = (props) => {
  const { classes, colors, color, onClick } = props;
  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
      }}
    >
      {colors.map((c, i) => (
        <Swatch
          key={`palette-swatch-${i}`}
          color={colors[i]}
          active={i == color}
          onClick={() => onClick(i)}
        />
      ))}
    </Box>
  );
};

export default CustomPicker(PalettePicker);
