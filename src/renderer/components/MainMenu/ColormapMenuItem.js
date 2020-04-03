// -*- mode: js-jsx -*-
/* Chrysalis -- Kaleidoscope Command Center
 * Copyright (C) 2018, 2019, 2020  Keyboardio, Inc.
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
import HighlightIcon from "@material-ui/icons/Highlight";
import i18n from "../../i18n";

export default function ColormapMenuItem({ selected, onClick, className }) {
  return (
    <ListItem
      button
      selected={selected}
      onClick={onClick}
      className={className}
    >
      <ListItemIcon>
        <HighlightIcon />
      </ListItemIcon>
      <ListItemText primary={i18n.t("app.menu.colormapEditor")} />
    </ListItem>
  );
}
