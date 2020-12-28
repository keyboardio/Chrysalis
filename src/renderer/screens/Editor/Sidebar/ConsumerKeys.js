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

import { withStyles } from "@material-ui/core/styles";

import KeyButtonList from "../components/KeyButtonList";
import Collapsible from "../components/Collapsible";
import { KeymapDB } from "../../../../api/keymap";

const db = new KeymapDB();

const styles = () => ({});

class ConsumerKeysBase extends React.Component {
  onKeyChange = keyCode => {
    this.props.onKeyChange(keyCode);
  };

  render() {
    const { keymap, selectedKey, layer } = this.props;
    const key = keymap.custom[layer][selectedKey];

    return (
      <React.Fragment>
        <Collapsible
          expanded={db.isInCategory(key.code, "consumer")}
          title="Consumer control keys"
        >
          <KeyButtonList
            keys={db.selectCategory("consumer")}
            onKeyChange={this.props.onKeyChange}
          />
        </Collapsible>
      </React.Fragment>
    );
  }
}
const ConsumerKeys = withStyles(styles, { withTheme: true })(ConsumerKeysBase);

export { ConsumerKeys as default };
