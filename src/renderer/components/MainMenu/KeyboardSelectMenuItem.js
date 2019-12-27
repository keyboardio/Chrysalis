// -*- mode: js-jsx -*-
/* Bazecor -- Kaleidoscope Command Center
 * Copyright (C) 2018, 2019  Keyboardio, Inc.
 * Copyright (C) 2019  DygmaLab SE
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
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import KeyboardIcon from "@material-ui/icons/Keyboard";

export default function KeyboardMenuItem({
  keyboardSelectText,
  onClick,
  selected,
  className
}) {
  return (
    <ListItem
      button
      onClick={onClick}
      className={className}
      selected={selected}
    >
      <ListItemIcon>
        <KeyboardIcon />
      </ListItemIcon>
      <ListItemText primary={keyboardSelectText} />
    </ListItem>
  );
}
