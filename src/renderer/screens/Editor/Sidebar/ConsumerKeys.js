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

import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import { withStyles } from "@material-ui/core/styles";

import KeyButtonList from "../components/KeyButtonList";
import Collapsible from "../components/Collapsible";
import { KeymapDB } from "../../../../api/keymap";

const db = new KeymapDB();

const styles = () => ({});

class ConsumerKeysBase extends React.Component {
  state = {
    pickerOpen: false
  };

  openPicker = () => {
    this.setState({ pickerOpen: true });
  };

  closePicker = () => {
    this.setState({ pickerOpen: false });
  };

  onKeyChange = keyCode => {
    this.props.onKeyChange(keyCode);
    this.closePicker();
  };

  render() {
    const { keymap, selectedKey, layer } = this.props;

    const key = keymap.custom[layer][selectedKey];
    const label = db.format(key, "full");

    return (
      <React.Fragment>
        <Collapsible
          expanded={db.isInCategory(key.code, "consumer")}
          title="Consumer control keys"
        >
          <Button variant="contained" onClick={this.openPicker}>
            {label.hint} {label.main}
          </Button>
        </Collapsible>
        <Dialog
          open={this.state.pickerOpen}
          onClose={this.closePicker}
          fullWidth
          maxWidth="lg"
        >
          <KeyButtonList
            keys={db.selectCategory("consumer")}
            onKeyChange={this.onKeyChange}
          />
        </Dialog>
      </React.Fragment>
    );
  }
}
const ConsumerKeys = withStyles(styles, { withTheme: true })(ConsumerKeysBase);

export { ConsumerKeys as default };
