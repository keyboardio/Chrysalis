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

import Alert from "@mui/material/Alert";
import React from "react";

import { Store } from "@renderer/localStore";
const settings = new Store();

export const BreakingNews = (props) => {
  const { tag, children } = props;

  const seen = settings.get(`breaking-news.seen.${tag}`, false);
  if (seen) return null;

  const onClose = () => {
    settings.set(`breaking-news.seen.${tag}`, true);
  };

  return (
    <Alert severity="warning" onClose={onClose}>
      {children}
    </Alert>
  );
};
