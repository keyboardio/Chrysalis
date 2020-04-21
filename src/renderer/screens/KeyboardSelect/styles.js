//@ts-check
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

import { green } from "@material-ui/core/colors";

export const styles = theme => ({
  loader: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0
  },
  main: {
    width: "auto",
    display: "block",
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(500 + theme.spacing.unit * 3 * 2)]: {
      width: 500,
      marginLeft: "auto",
      marginRight: "auto"
    },
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px
 ${theme.spacing.unit * 3}px`
  },
  preview: {
    maxWidth: 128,
    marginBottom: theme.spacing.unit * 2,
    "& .key rect, & .key path, & .key ellipse": {
      stroke: "#000000"
    }
  },
  card: {
    marginTop: theme.spacing.unit * 5,
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px
 ${theme.spacing.unit * 3}px`
  },
  content: {
    display: "inline-block",
    width: "100%",
    textAlign: "center"
  },
  selectControl: {
    display: "flex"
  },
  connect: {
    verticalAlign: "bottom",
    marginLeft: 65
  },
  cardActions: {
    justifyContent: "center"
  },
  supported: {
    backgroundColor: theme.palette.secondary.main
  },
  grow: {
    flexGrow: 1
  },
  error: {
    marginTop: theme.spacing.unit * 2,
    marginBottom: theme.spacing.unit * 2,
    textAlign: "center"
  },
  found: {
    color: green[500]
  }
});
