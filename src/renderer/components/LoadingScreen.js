// -*- mode: js-jsx -*-
/* Chrysalis -- Kaleidoscope Command Center
 * Copyright (C) 2020  Keyboardio, Inc.
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

import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";

import i18n from "../i18n";
import { getStatic } from "../config";
import "./LoadingScreen.css";

const styles = theme => ({
  wrapper: {
    margin: theme.spacing.unit * 4,
    overflow: "hidden",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    padding: theme.spacing.unit * 4
  },
  logo: {
    animationName: "spinning-loader",
    animationIterationCount: "infinite",
    animationDuration: "5s",
    animationTimingFunction: "linear",
    marginBottom: theme.spacing.unit * 4
  }
});

function LoadingScreen(props) {
  const logoPath = getStatic("/logo.png");
  return (
    <div className={props.classes.wrapper}>
      <div className={props.classes.logo}>
        <img src={logoPath} />
      </div>
      <Typography component="h2" variant="h2">
        {i18n.t("components.loading")}
      </Typography>
    </div>
  );
}

export default withStyles(styles)(LoadingScreen);
