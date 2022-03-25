// -*- mode: js-jsx -*-
/* Chrysalis -- Kaleidoscope Command Center
 * Copyright (C) 2020-2021  Keyboardio, Inc.
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

import FormGroup from "@mui/material/FormGroup";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormHelperText from "@mui/material/FormHelperText";
import InputLabel from "@mui/material/InputLabel";
import Switch from "@mui/material/Switch";

import withStyles from "@mui/styles/withStyles";

import Collapsible from "../components/Collapsible";
import KeyButton from "../components/KeyButton";

import Focus from "../../../../api/focus";
import { KeymapDB } from "../../../../api/keymap";

const db = new KeymapDB();

const styles = theme => ({
  cancelContainer: {
    margin: `${theme.spacing(2)} 0`
  }
});

const cancelKeyCode = 53630;

class OneShotKeysBase extends React.Component {
  state = {
    escCancel: true
  };

  async componentDidMount() {
    const focus = new Focus();

    let escCancel = await focus.command("escape_oneshot.cancel_key");
    if (escCancel.length == 0) {
      escCancel = false;
    } else {
      escCancel = parseInt(escCancel) == cancelKeyCode;
    }

    this.setState({
      escCacnel: escCancel
    });
  }

  render() {
    const { classes, keymap, selectedKey, layer, onKeyChange } = this.props;
    const key = keymap.custom[layer][selectedKey];

    const toggleEscapeCancel = async event => {
      const focus = new Focus();
      const escCancel = event.target.checked;
      let newCancelKeyCode = cancelKeyCode;

      if (escCancel) {
        newCancelKeyCode = 41; // Esc
      }

      await focus.command("escape_oneshot.cancel_key", newCancelKeyCode);
      this.setState({ escCancel: escCancel });
    };

    const escCancelWidget = (
      <Switch
        checked={this.state.escCancel}
        color="primary"
        onChange={toggleEscapeCancel}
      />
    );

    return (
      <React.Fragment>
        <Collapsible
          expanded={key.code == cancelKeyCode || key.code == 41}
          title={i18n.t("editor.sidebar.oneshot.title")}
          help={i18n.t("editor.sidebar.oneshot.help")}
        >
          <KeyButton
            keyObj={db.lookup(cancelKeyCode)}
            onKeyChange={onKeyChange}
          />

          <div className={classes.cancelContainer}>
            <FormControl component="fieldset" className={classes.mods}>
              <FormGroup row>
                <FormControlLabel
                  control={escCancelWidget}
                  label={i18n.t(
                    "editor.sidebar.oneshot.configuration.escCancelLabel"
                  )}
                />
              </FormGroup>
              <FormHelperText>
                {i18n.t("editor.sidebar.oneshot.configuration.help")}
              </FormHelperText>
            </FormControl>
          </div>
        </Collapsible>
      </React.Fragment>
    );
  }
}
const OneShotKeys = withStyles(styles, { withTheme: true })(OneShotKeysBase);

export { OneShotKeys as default };
