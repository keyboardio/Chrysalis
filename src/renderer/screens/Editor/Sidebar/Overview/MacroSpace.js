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

import Macros from "@api/macros";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import React from "react";
import { useTranslation } from "react-i18next";

const MacroSpace = (props) => {
  const { macros } = props;

  if (!macros) return null;

  const m = new Macros();
  const size = m.getStoredSize(macros);
  const freeSpace = macros.storageSize - size;

  return (
    <Box sx={{ my: 1.5, mx: 0.5 }}>
      <Typography variant="body1">
        Available macro space:{" "}
        <strong>
          {freeSpace}/{macros.storageSize}
        </strong>{" "}
        bytes.
      </Typography>
    </Box>
  );
};

export { MacroSpace as default };
