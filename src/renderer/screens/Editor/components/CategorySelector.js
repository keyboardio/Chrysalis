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

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import withStyles from "@mui/styles/withStyles";

import KeyButtonList from "../components/KeyButtonList";
import Collapsible from "../components/Collapsible";
import { KeymapDB } from "../../../../api/keymap";

const db = new KeymapDB();

const styles = () => ({});

class CategorySelectorBase extends React.Component {
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
    const { keymap, selectedKey, layer, category, title, help } = this.props;

    const key = keymap.custom[layer][selectedKey];
    const label = db.isInCategory(key.code, category)
      ? db.format(key, "full")
      : { main: title + "..." };

    return (
      <React.Fragment>
        <Collapsible
          expanded={db.isInCategory(key.code, category)}
          title={title}
          help={help}
        >
          <KeyButtonList
            keys={db.selectCategory(category)}
            onKeyChange={this.onKeyChange}
            showHints={false}
          />
        </Collapsible>
      </React.Fragment>
    );
  }
}
const CategorySelector = withStyles(styles, { withTheme: true })(
  CategorySelectorBase
);

export { CategorySelector as default };
