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

import React from "react";

import Divider from "@mui/material/Divider";

export const dividePreferences = (plugins, components, onSaveChanges, key) => {
  const result = [];
  components.forEach(({ plugin, Component }, index) => {
    if (plugins[plugin]) {
      result.push(
        <Component onSaveChanges={onSaveChanges} key={`${key}/${index}`} />
      );
      result.push(<Divider sx={{ mx: -2, my: 2 }} />);
    }
  });
  result.pop();
  return result;
};
