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
import i18n from "i18next";

import { spacing } from "@mui/system";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import withStyles from "@mui/styles/withStyles";

import Collapsible from "../components/Collapsible";
import KeyButton from "../components/KeyButton";
import { KeymapDB } from "../../../../api/keymap";

const db = new KeymapDB();

const styles = theme => ({
  card: {
    marginBottom: theme.spacing(1)
  }
});

const MouseMovementKeys = withStyles(styles)(props => {
  const mouseUp = db.lookup(20481);
  const mouseLeft = db.lookup(20484);
  const mouseDown = db.lookup(20482);
  const mouseRight = db.lookup(20488);

  return (
    <div>
      <Typography color="textSecondary" gutterBottom>
        {i18n.t("editor.sidebar.mousekeys.movement")}
      </Typography>
      <Box mx="auto" p={1} textAlign="center">
        <KeyButton onKeyChange={props.onKeyChange} keyObj={mouseUp} noHint />
        <br />
        <KeyButton onKeyChange={props.onKeyChange} keyObj={mouseLeft} noHint />
        <KeyButton onKeyChange={props.onKeyChange} keyObj={mouseRight} noHint />
        <br />
        <KeyButton onKeyChange={props.onKeyChange} keyObj={mouseDown} noHint />
      </Box>
    </div>
  );
});

const MouseButtonKeys = withStyles(styles)(props => {
  const left = db.lookup(20545);
  const middle = db.lookup(20548);
  const right = db.lookup(20546);
  const back = db.lookup(20552);
  const fwd = db.lookup(20560);

  return (
    <div>
      <Typography color="textSecondary" gutterBottom>
        {i18n.t("editor.sidebar.mousekeys.buttons")}
      </Typography>

      <Box mx="auto" p={1} textAlign="center">
        <KeyButton onKeyChange={props.onKeyChange} keyObj={left} noHint />
        <KeyButton onKeyChange={props.onKeyChange} keyObj={middle} noHint />
        <KeyButton onKeyChange={props.onKeyChange} keyObj={right} noHint />
        <br />
        <KeyButton onKeyChange={props.onKeyChange} keyObj={back} noHint />
        <KeyButton onKeyChange={props.onKeyChange} keyObj={fwd} noHint />
      </Box>
    </div>
  );
});

const MouseWheelKeys = withStyles(styles)(props => {
  const up = db.lookup(20497);
  const down = db.lookup(20498);
  const left = db.lookup(20500);
  const right = db.lookup(20504);
  return (
    <div>
      <Typography color="textSecondary" gutterBottom>
        {i18n.t("editor.sidebar.mousekeys.wheel")}
      </Typography>
      <Box mx="auto" p={1} textAlign="center">
        <KeyButton onKeyChange={props.onKeyChange} keyObj={up} noHint />
        <br />
        <KeyButton onKeyChange={props.onKeyChange} keyObj={left} noHint />
        <KeyButton onKeyChange={props.onKeyChange} keyObj={right} noHint />
        <br />
        <KeyButton onKeyChange={props.onKeyChange} keyObj={down} noHint />
      </Box>
    </div>
  );
});

const MouseWarpKeys = withStyles(styles)(props => {
  const warpNW = db.lookup(20517);
  const warpNE = db.lookup(20521);
  const warpSW = db.lookup(20518);
  const warpSE = db.lookup(20522);
  const warpEnd = db.lookup(20576);

  return (
    <div>
      <Typography color="textSecondary" gutterBottom>
        {i18n.t("editor.sidebar.mousekeys.warp")}
      </Typography>
      <KeyButton onKeyChange={props.onKeyChange} keyObj={warpNW} noHint />
      <KeyButton onKeyChange={props.onKeyChange} keyObj={warpNE} noHint />
      <br />
      <KeyButton onKeyChange={props.onKeyChange} keyObj={warpSW} noHint />
      <KeyButton onKeyChange={props.onKeyChange} keyObj={warpSE} noHint />
      <br />
      <KeyButton onKeyChange={props.onKeyChange} keyObj={warpEnd} noHint />
    </div>
  );
});

class MouseKeysBase extends React.Component {
  render() {
    const { keymap, selectedKey, layer, onKeyChange } = this.props;
    const key = keymap.custom[layer][selectedKey];

    const subWidgets = [
      MouseMovementKeys,
      MouseButtonKeys,
      MouseWheelKeys,
      MouseWarpKeys
    ];
    const widgets = subWidgets.map((Widget, index) => {
      return (
        <Widget key={`mousekeys-group-${index}`} onKeyChange={onKeyChange} />
      );
    });

    return (
      <Collapsible
        expanded={db.isInCategory(key.code, "mousekeys")}
        title={i18n.t("editor.sidebar.mousekeys.title")}
        help={i18n.t("editor.sidebar.mousekeys.help")}
      >
        {widgets}
      </Collapsible>
    );
  }
}
const MouseKeys = withStyles(styles, { withTheme: true })(MouseKeysBase);

export { MouseKeys as default };
