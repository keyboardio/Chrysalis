// -*- mode: js-jsx -*-
/* Chrysalis -- Kaleidoscope Command Center
 * Copyright (C) 2022  Keyboardio, Inc.
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

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import React from "react";

const PreferenceWithHeading = (props) => {
  return (
    <Box sx={{ display: "flex" }}>
      <Box>
        <Typography variant="body1">{props.heading}</Typography>
        {props.subheading && (
          <Typography variant="body2" color="text.secondary">
            {props.subheading}
          </Typography>
        )}
      </Box>
      <span style={{ flexGrow: 1 }} />
      {props.children}
    </Box>
  );
};

export { PreferenceWithHeading as default };
