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

import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";

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
    <Card variant="outlined" className={props.classes.card}>
      <CardContent>
        <Typography color="textSecondary" gutterBottom>
          {i18n.t("editor.sidebar.mousekeys.movement")}
        </Typography>

        <KeyButton onKeyChange={props.onKeyChange} keyObj={mouseUp} noHint />
        <KeyButton onKeyChange={props.onKeyChange} keyObj={mouseDown} noHint />
        <br />
        <KeyButton onKeyChange={props.onKeyChange} keyObj={mouseLeft} noHint />
        <KeyButton onKeyChange={props.onKeyChange} keyObj={mouseRight} noHint />
      </CardContent>
    </Card>
  );
});

const MouseButtonKeys = withStyles(styles)(props => {
  const buttons = [
    db.lookup(20545), // left
    db.lookup(20548), // midle
    db.lookup(20546), // right
    db.lookup(20552), // back
    db.lookup(20560) // forward
  ];

  const keyButtons = buttons.map((button, index) => {
    return (
      <KeyButton
        key={`mousekey-button-${index}`}
        onKeyChange={props.onKeyChange}
        keyObj={button}
        noHint
      />
    );
  });

  return (
    <Card variant="outlined" className={props.classes.card}>
      <CardContent>
        <Typography color="textSecondary" gutterBottom>
          {i18n.t("editor.sidebar.mousekeys.buttons")}
        </Typography>

        {keyButtons}
      </CardContent>
    </Card>
  );
});

const MouseWheelKeys = withStyles(styles)(props => {
  const buttons = [
    db.lookup(20497), // up
    db.lookup(20498), // down
    db.lookup(20500), // left
    db.lookup(20504) // right
  ];

  const keyButtons = buttons.map((button, index) => {
    return (
      <KeyButton
        key={`mousekey-wheel-${index}`}
        onKeyChange={props.onKeyChange}
        keyObj={button}
        noHint
      />
    );
  });

  return (
    <Card variant="outlined" className={props.classes.card}>
      <CardContent>
        <Typography color="textSecondary" gutterBottom>
          {i18n.t("editor.sidebar.mousekeys.wheel")}
        </Typography>

        {keyButtons}
      </CardContent>
    </Card>
  );
});

const MouseWarpKeys = withStyles(styles)(props => {
  const buttons = [
    db.lookup(20517), // NW
    db.lookup(20521), // NE
    db.lookup(20518), // SW
    db.lookup(20522), // SE
    db.lookup(20576) // end
  ];

  const keyButtons = buttons.map((button, index) => {
    return (
      <KeyButton
        key={`mousekey-warp-${index}`}
        onKeyChange={props.onKeyChange}
        keyObj={button}
        noHint
      />
    );
  });

  return (
    <Card variant="outlined" className={props.classes.card}>
      <CardContent>
        <Typography color="textSecondary" gutterBottom>
          {i18n.t("editor.sidebar.mousekeys.warp")}
        </Typography>

        {keyButtons}
      </CardContent>
    </Card>
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
