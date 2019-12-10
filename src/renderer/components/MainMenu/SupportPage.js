// -*- mode: js-jsx -*-
/* Chrysalis -- Kaleidoscope Command Center
 * Copyright (C) 2018, 2019  Keyboardio, Inc.
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
import i18n from "../../i18n";
import support from "../../support.png";
import supportWhite from "../../suppport-white.png";

export default function SupportPage({ onClick, className, themeDark }) {
  return (
    <ListItem button onClick={onClick} className={className}>
      <ListItemIcon>
        {themeDark ? (
          <img
            src={supportWhite}
            alt="update"
            style={{ width: 24, height: 24 }}
          />
        ) : (
          <img
            src={support}
            alt="updateWhite"
            style={{ width: 24, height: 24 }}
          />
        )}
      </ListItemIcon>
      <ListItemText primary={i18n.app.menu.supportPage} />
    </ListItem>
  );
}
